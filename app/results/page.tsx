"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Nav } from "../components/nav"
import { GoogleMap } from "../components/google-map"
import { geocodeAddress } from "../utils/geocoding"
import { MapPin, ChevronDown, ChevronUp, Navigation } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Location {
  url: string
  categories: string[]
  latitude: number
  longitude: number
  name: string
  distance_km: number
}

export default function Results() {
  return (
    <Suspense fallback={
      <div className="flex flex-col min-h-screen">
        <Nav />
        <main className="flex-1 p-4 md:p-6">
          <p className="text-center text-xl dark:text-white">Loading...</p>
        </main>
      </div>
    }>
      <ResultsContent />
    </Suspense>
  )
}

function ResultsContent() {
  const [locations, setLocations] = useState<Location[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)
  const searchParams = useSearchParams()
  const recycleItem = searchParams.get("item")?.toLowerCase() || "avfall"
  const location = searchParams.get("location") || ""
  const capitalizedRecycleItem = recycleItem.charAt(0).toUpperCase() + recycleItem.slice(1)

  useEffect(() => {
    async function fetchLocations() {
      try {
        setLoading(true)
        setError(null)

        const coordinates = await geocodeAddress(location)
        if (!coordinates) {
          throw new Error("Unable to geocode the provided location")
        }

        console.log(`Sending request to API with parameters:`, {
          latitude: coordinates.lat,
          longitude: coordinates.lng,
          categories: [capitalizedRecycleItem],
        })

        const response = await fetch("https://varkanjagatervinna-production.up.railway.app/closest-locations", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            latitude: coordinates.lat,
            longitude: coordinates.lng,
            categories: [capitalizedRecycleItem],
          }),
        })

        console.log(`Received response from API:`, {
          status: response.status,
          statusText: response.statusText,
        })

        if (!response.ok) {
          const errorText = await response.text()
          throw new Error(`Failed to fetch locations: ${response.status} ${response.statusText}. ${errorText}`)
        }

        const data: Location[] = await response.json()
        console.log(`Parsed response data:`, data)
        setLocations(data)
      } catch (err) {
        console.error("Error fetching locations:", err)
        setError(err instanceof Error ? err.message : "An unknown error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchLocations()
  }, [location, capitalizedRecycleItem])

  const handleLocationClick = (clickedLocation: Location) => {
    setSelectedLocation((prevLocation) =>
      prevLocation && prevLocation.name === clickedLocation.name ? null : clickedLocation,
    )
  }

  const handleNavigate = (location: Location) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${location.latitude},${location.longitude}`
    window.open(url, "_blank")
  }

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Nav />
        <main className="flex-1 p-4 md:p-6">
          <p className="text-center text-xl dark:text-white">Loading...</p>
        </main>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-screen">
        <Nav />
        <main className="flex-1 p-4 md:p-6">
          <p className="text-center text-xl text-red-600 dark:text-red-400">{error}</p>
        </main>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <main className="flex-1 p-4 md:p-6">
        <h2 className="text-xl md:text-2xl font-medium mb-4 md:mb-6 dark:text-white text-center md:text-left">
          Vi hittade {locations.length} återvinningscentraler nära dig som återvinner {capitalizedRecycleItem}.
        </h2>

        <div className="mb-6">
          <GoogleMap locations={locations} selectedLocation={selectedLocation} />
        </div>

        <div className="space-y-4 md:space-y-6">
          {locations.map((location, i) => (
            <div
              key={i}
              className={`bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md transition-all duration-200 ${
                selectedLocation && selectedLocation.name === location.name ? "ring-2 ring-blue-500" : "hover:shadow-lg"
              }`}
            >
              <div
                className="flex justify-between items-start cursor-pointer"
                onClick={() => handleLocationClick(location)}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-lg">
                    {String.fromCharCode(65 + i)}
                  </div>
                  <div>
                    <h3 className="font-medium text-lg text-black dark:text-white">{location.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      <MapPin className="inline-block w-4 h-4 mr-1" />
                      {location.distance_km.toFixed(2)} km
                    </p>
                  </div>
                </div>
                {selectedLocation && selectedLocation.name === location.name ? (
                  <ChevronUp className="w-6 h-6 text-gray-400" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-gray-400" />
                )}
              </div>
              {selectedLocation && selectedLocation.name === location.name && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <h4 className="font-medium text-black dark:text-white mb-2">Återvinner:</h4>
                  <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    {location.categories.map((category, index) => (
                      <li key={index}>{category}</li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                    <a
                      href={location.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
                    >
                      Mer information
                    </a>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleNavigate(location)
                      }}
                      className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white"
                    >
                      <Navigation className="w-4 h-4 mr-2" />
                      Navigera hit
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

