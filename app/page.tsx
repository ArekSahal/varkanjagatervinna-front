"use client"

import { useState, useRef } from "react"
import { Nav } from "./components/nav"
import { RecycleIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { AutocompleteInput } from "./components/autocomplete-input"
import { LocationInput } from "./components/location-input"

export default function Home() {
  const [recycleItem, setRecycleItem] = useState("")
  const [location, setLocation] = useState("")
  const [errors, setErrors] = useState({ recycleItem: false, location: false })
  const router = useRouter()
  const locationInputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors = {
      recycleItem: recycleItem.trim() === "",
      location: location.trim() === "",
    }
    setErrors(newErrors)

    if (!newErrors.recycleItem && !newErrors.location) {
      router.push(`/results?item=${encodeURIComponent(recycleItem)}&location=${encodeURIComponent(location)}`)
    }
  }

  const handleRecycleItemSelect = () => {
    locationInputRef.current?.focus()
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <main className="flex-1 flex flex-col p-6">
        <div className="flex-1 flex flex-col items-center justify-center space-y-8 max-w-md mx-auto w-full">
          <h1 className="text-3xl font-serif text-center dark:text-white">Återvinningsguiden</h1>
          <RecycleIcon className="h-16 w-16 text-black/70 dark:text-white/70" />
          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <div>
              <AutocompleteInput
                placeholder="Vad vill du återvinna?"
                value={recycleItem}
                onChange={(value) => {
                  setRecycleItem(value)
                  setErrors((prev) => ({ ...prev, recycleItem: false }))
                }}
                onSelect={handleRecycleItemSelect}
                className={errors.recycleItem ? "border-2 border-red-500" : ""}
              />
              <div className="text-xs text-black/70 dark:text-white/70 mt-1.5 px-4">
                Skriv t.ex. "Plast" eller "Textil" för att se var du närmast kan återvinna ditt avfall och vilka boxar
                som finns i återvinningscentralen.
              </div>
              {errors.recycleItem && (
                <p className="text-red-500 text-xs mt-1 px-4" role="alert">
                  Vänligen ange vad du vill återvinna
                </p>
              )}
            </div>
            <div>
              <LocationInput
                value={location}
                onChange={(value) => {
                  setLocation(value)
                  setErrors((prev) => ({ ...prev, location: false }))
                }}
                onSelect={(address) => setLocation(address)}
                placeholder="Vilken ort vill du leta i?"
                error={errors.location}
              />
              {errors.location && (
                <p className="text-red-500 text-xs mt-1 px-4" role="alert">
                  Vänligen ange en ort
                </p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full bg-black dark:bg-white text-white dark:text-black hover:bg-black/90 dark:hover:bg-white/90 rounded-full py-6 text-base"
            >
              Sök
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}

