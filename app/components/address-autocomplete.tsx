"use client"

import { useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"

interface AddressAutocompleteProps {
  value: string
  onChange: (value: string) => void
  onSelect: (address: string) => void
  placeholder: string
  className?: string
}

export function AddressAutocomplete({ value, onChange, onSelect, placeholder, className }: AddressAutocompleteProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      // This block will run only on the client (browser)
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
      if (!apiKey) {
        console.error('Google Maps API key is not configured')
        return
      }

      if (!window.google) {
        const script = document.createElement("script")
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`
        script.async = true
        script.defer = true
        document.head.appendChild(script)
        script.onload = initAutocomplete
      } else {
        initAutocomplete()
      }
    }

    return () => {
      if (autocompleteRef.current) {
        google.maps.event.clearInstanceListeners(autocompleteRef.current)
      }
    }
  }, [])

  const initAutocomplete = () => {
    if (!inputRef.current) return

    autocompleteRef.current = new google.maps.places.Autocomplete(inputRef.current, {
      types: ["geocode"],
      componentRestrictions: { country: "se" },
    })

    autocompleteRef.current.addListener("place_changed", () => {
      const place = autocompleteRef.current?.getPlace()
      if (place?.formatted_address) {
        onSelect(place.formatted_address)
      }
    })
  }

  return (
    <Input
      ref={inputRef}
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`w-full bg-gray-200 dark:bg-gray-700 border-0 px-4 py-3 rounded-full text-base ${className}`}
    />
  )
}

