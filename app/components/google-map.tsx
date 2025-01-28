"use client"

import { useEffect, useRef, useState } from "react"
import { Loader } from "@googlemaps/js-api-loader"

interface Location {
  url: string
  categories: string[]
  latitude: number
  longitude: number
  name: string
  distance_km: number
}

interface GoogleMapProps {
  locations: Location[]
  selectedLocation: Location | null
}

export function GoogleMap({ locations, selectedLocation }: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [markers, setMarkers] = useState<google.maps.Marker[]>([])

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
      version: "weekly",
      libraries: ["places"],
    })

    loader.load().then(() => {
      if (mapRef.current && locations.length > 0) {
        const newMap = new google.maps.Map(mapRef.current, {
          center: { lat: locations[0].latitude, lng: locations[0].longitude },
          zoom: 12,
          fullscreenControl: false,
          mapTypeControl: false,
          streetViewControl: false,
        })
        setMap(newMap)
      }
    })
  }, [locations.length, locations[0]?.latitude, locations[0]?.longitude])

  useEffect(() => {
    if (map && locations.length > 0) {
      const typedMap = map as google.maps.Map
      // Clear existing markers
      markers.forEach((marker) => marker.setMap(null))
      const newMarkers: google.maps.Marker[] = []

      const bounds = new google.maps.LatLngBounds()

      locations.forEach((location, index) => {
        const marker = new google.maps.Marker({
          position: { lat: location.latitude, lng: location.longitude },
          map: typedMap,
          label: {
            text: String.fromCharCode(65 + index),
            color: "white",
            fontWeight: "bold",
          },
          title: location.name,
        })

        bounds.extend(marker.getPosition() as google.maps.LatLng)
        newMarkers.push(marker)

        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div class="p-2">
              <h3 class="font-bold">${String.fromCharCode(65 + index)}. ${location.name}</h3>
              <p class="text-sm">${location.categories.join(", ")}</p>
              <p class="text-sm">Avstånd: ${location.distance_km.toFixed(2)} km</p>
            </div>
          `,
        })

        marker.addListener("click", () => {
          infoWindow.open(typedMap, marker)
        })
      })

      setMarkers(newMarkers)
      typedMap.fitBounds(bounds)

      // Adjust zoom if it's too high (e.g., when there's only one location)
      const listener = google.maps.event.addListener(typedMap, "idle", () => {
        const zoom = typedMap.getZoom()
        if (zoom && zoom > 15) {
          typedMap.setZoom(15)
        }
        google.maps.event.removeListener(listener)
      })
    }
  }, [map, locations, markers]) // Added markers to dependencies

  useEffect(() => {
    if (map && selectedLocation) {
      map.panTo({ lat: selectedLocation.latitude, lng: selectedLocation.longitude })
      map.setZoom(15)
    } else if (map && locations.length > 0) {
      const bounds = new google.maps.LatLngBounds()
      locations.forEach((location) => {
        bounds.extend(new google.maps.LatLng(location.latitude, location.longitude))
      })
      map.fitBounds(bounds)
    }
  }, [map, selectedLocation, locations])

  return <div ref={mapRef} className="w-full h-[300px] md:h-[400px] rounded-lg shadow-md" />
}

