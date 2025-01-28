"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"
import { AddressAutocomplete } from "./address-autocomplete"

interface LocationInputProps {
  value: string
  onChange: (value: string) => void
  onSelect: (address: string) => void
  placeholder: string
  className?: string
  error?: boolean
}

export function LocationInput({ value, onChange, onSelect, placeholder, className, error }: LocationInputProps) {
  const [isLocating, setIsLocating] = useState(false)

  const handleUseCurrentLocation = () => {
    setIsLocating(true)
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords
          try {
            if (typeof window !== "undefined" && window.google) {
              const response = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key="AIzaSyBmml_2DzcExvh-wUkzMz9B8iqhKRIrqsw"`,
              )
              const data = await response.json()
              if (data.results && data.results.length > 0) {
                const address = data.results[0].formatted_address
                onChange(address)
                onSelect(address)
              }
            } else {
              console.error("Google Maps API not loaded")
            }
          } catch (error) {
            console.error("Error fetching address:", error)
          } finally {
            setIsLocating(false)
          }
        },
        (error) => {
          console.error("Error getting location:", error)
          setIsLocating(false)
        },
      )
    } else {
      console.error("Geolocation is not supported by this browser.")
      setIsLocating(false)
    }
  }

  return (
    <div className="relative">
      <AddressAutocomplete
        value={value}
        onChange={onChange}
        onSelect={onSelect}
        placeholder={placeholder}
        className={`pr-12 ${className} ${error ? "border-2 border-red-500" : ""}`}
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="absolute right-1 top-1/2 -translate-y-1/2"
        onClick={handleUseCurrentLocation}
        disabled={isLocating}
      >
        <MapPin className={`h-4 w-4 ${isLocating ? "animate-pulse" : ""}`} />
      </Button>
    </div>
  )
}

