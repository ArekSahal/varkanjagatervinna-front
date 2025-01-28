import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function SearchForm() {
  return (
    <div className="space-y-4 max-w-md">
      <div className="relative">
        <Input
          className="w-full bg-[#d9d9d9] border-0 px-4 py-2 rounded-full"
          placeholder="Vad vill du återvinna?"
          type="text"
        />
        <div className="text-xs text-[#000000]/70 mt-1 px-4">
          Skriv t.ex. "Plast" eller "Textil" för att se var du närmast kan återvinna ditt avfall och vilka boxar som
          finns i återvinningscentralen.
        </div>
      </div>
      <div className="flex gap-2">
        <Input
          className="flex-1 bg-[#d9d9d9] border-0 px-4 py-2 rounded-full"
          placeholder="Vilken ort vill du leta i?"
          type="text"
        />
        <Button className="bg-[#000000] text-white hover:bg-[#000000]/90 rounded-full px-6">Sök</Button>
      </div>
    </div>
  )
}

