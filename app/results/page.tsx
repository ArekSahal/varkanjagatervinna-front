import { Suspense } from "react"
import { ResultsContent } from "./results-content"
import { Nav } from "../components/nav"

export default function Results() {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <Suspense
        fallback={
          <main className="flex-1 p-4 md:p-6">
            <p className="text-center text-xl dark:text-white">Loading...</p>
          </main>
        }
      >
        <ResultsContent />
      </Suspense>
    </div>
  )
}

