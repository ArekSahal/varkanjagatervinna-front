import { Nav } from "./components/nav"
import { SearchForm } from "./components/search-form"
import { Map } from "./components/map"
import { Locations } from "./components/locations"
import { RecycleIcon } from "lucide-react"

export default function Page() {
  return (
    <div className="min-h-screen bg-[#ffffff]">
      <Nav />
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8 space-y-6">
          <h1 className="text-4xl font-serif text-[#000000]">Återvinningsguiden</h1>
          <RecycleIcon className="h-16 w-16 text-[#000000]/70" />
          <SearchForm />
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-xl font-medium mb-4 text-[#000000]">
              Vi hittade 3 återvinningscentraler nära dig som återvinner plast
            </h2>
            <Map />
          </div>
          <Locations />
        </div>
      </main>
    </div>
  )
}

