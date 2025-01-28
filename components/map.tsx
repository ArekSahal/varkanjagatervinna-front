import { MapPin } from "lucide-react"

export function Map() {
  return (
    <div className="relative w-full aspect-[16/9] bg-[#d9d9d9] rounded-lg overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-full">
          <MapPin className="absolute top-1/4 left-1/4 h-6 w-6 text-[#000000]" />
          <MapPin className="absolute top-1/2 left-1/2 h-6 w-6 text-[#000000]" />
          <MapPin className="absolute bottom-1/4 right-1/4 h-6 w-6 text-[#000000]" />
        </div>
      </div>
    </div>
  )
}

