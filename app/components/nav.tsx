import { Home, Info } from "lucide-react"
import Link from "next/link"

export function Nav() {
  return (
    <nav className="flex gap-6 p-4 border-b dark:border-gray-700">
      <Link href="/" className="flex items-center gap-2 text-sm text-black dark:text-white hover:opacity-80">
        <Home className="h-4 w-4" />
        <span>Hem</span>
      </Link>
      <Link href="/info" className="flex items-center gap-2 text-sm text-black dark:text-white hover:opacity-80">
        <Info className="h-4 w-4" />
        <span>Om oss</span>
      </Link>
    </nav>
  )
}

