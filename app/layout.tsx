import type { Metadata } from "next"
import "./globals.css"
import { ThemeToggle } from "./components/theme-toggle"

export const metadata: Metadata = {
  title: "Återvinningsguiden",
  description: "Hitta återvinningscentraler nära dig",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="sv" className="light">
      <body className="bg-white dark:bg-gray-900 text-black dark:text-white">
        <div className="mx-auto max-w-md min-h-screen bg-white dark:bg-gray-900">
          <header className="flex justify-between items-center p-4 border-b dark:border-gray-700">
            <h1 className="text-lg font-semibold">Återvinningsguiden</h1>
            <ThemeToggle />
          </header>
          {children}
        </div>
      </body>
    </html>
  )
}

