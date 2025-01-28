import { MapPin } from "lucide-react"

export function Locations() {
  const locations = [
    {
      name: "Landsvägen 17 c",
      description: "Tar emot plast, papper, ofärgat glas och färgat glas",
    },
    {
      name: "Katarina Bangata 61",
      description: "Tar emot plast, papper, ofärgat glas och färgat glas",
    },
    {
      name: "Landsvägen 17 c",
      description: "Tar emot plast, papper, ofärgat glas och färgat glas",
    },
  ]

  return (
    <div className="space-y-4">
      {locations.map((location, i) => (
        <div key={i} className="flex gap-3">
          <MapPin className="h-5 w-5 flex-shrink-0 text-[#000000]" />
          <div>
            <h3 className="font-medium text-[#000000]">{location.name}</h3>
            <p className="text-sm text-[#000000]/70">{location.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

