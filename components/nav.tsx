import { Home, Info } from "lucide-react"
import Link from "next/link"

export function Nav() {
  return (
    <nav className="flex gap-6 p-4">
      <Link href="/" className="flex items-center gap-2 text-sm text-[#000000] hover:opacity-80">
        <Home className="h-4 w-4" />
        <span>Hem</span>
      </Link>
      <Link href="/about" className="flex items-center gap-2 text-sm text-[#000000] hover:opacity-80">
        <Info className="h-4 w-4" />
        <span>Om oss</span>
      </Link>
    </nav>
  )
}

