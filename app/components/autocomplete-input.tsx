"use client"

import { useState, useEffect, useRef, type KeyboardEvent } from "react"
import { Input } from "@/components/ui/input"

const keywords = ["plast", "kartong", "färgat glas", "ofärgat glas", "glas","Tidningar"]

interface AutocompleteInputProps {
  placeholder: string
  value: string
  onChange: (value: string) => void
  onSelect: () => void
  className?: string
}

export function AutocompleteInput({ placeholder, value, onChange, onSelect, className }: AutocompleteInputProps) {
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (value.length >= 2 && isOpen) {
      const matches = keywords.filter(
        (keyword) =>
          keyword.toLowerCase().includes(value.toLowerCase()) && keyword.toLowerCase() !== value.toLowerCase(),
      )
      setSuggestions(matches)
    } else {
      setSuggestions([])
    }
  }, [value, isOpen])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
    setIsOpen(true)
  }

  const handleSuggestionSelect = (suggestion: string) => {
    onChange(suggestion)
    setIsOpen(false)
    onSelect()
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (isOpen) {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault()
          setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev))
          break
        case "ArrowUp":
          e.preventDefault()
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev))
          break
        case "Enter":
          e.preventDefault()
          if (selectedIndex >= 0) {
            handleSuggestionSelect(suggestions[selectedIndex])
          } else {
            setIsOpen(false)
            onSelect()
          }
          break
        case "Escape":
          setIsOpen(false)
          setSelectedIndex(-1)
          break
      }
    } else if (e.key === "Enter") {
      onSelect()
    }
  }

  const handleBlur = () => {
    // Delay closing the suggestions to allow for click events on suggestions
    setTimeout(() => setIsOpen(false), 200)
  }

  return (
    <div className="relative">
      <Input
        ref={inputRef}
        className={`w-full bg-gray-200 dark:bg-gray-700 border-0 px-4 py-3 rounded-full text-base ${className}`}
        placeholder={placeholder}
        type="text"
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
      />
      {isOpen && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md mt-1 max-h-60 overflow-auto shadow-lg">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className={`px-4 py-3 cursor-pointer text-base ${
                index === selectedIndex ? "bg-gray-100 dark:bg-gray-700" : "hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
              onClick={() => handleSuggestionSelect(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

