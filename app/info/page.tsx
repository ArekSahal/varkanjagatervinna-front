import { Nav } from "../components/nav"

export default function Info() {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-serif text-center mb-8 dark:text-white">Om oss</h1>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 max-w-md mx-auto">
          <p className="text-base leading-relaxed dark:text-white">
            Hitta enkelt närmaste återvinningscentral genom att skriva vad du vill återvinna och din adress. Du blir
            även informerad om det materialet du vill återvinna tas emot på de återvinningscentralerna eller inte.
          </p>
        </div>
      </main>
    </div>
  )
}

