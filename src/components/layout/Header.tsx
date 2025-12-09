'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart, PanelsTopLeftIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()

  return (
    <header className="border-b sticky top-0 bg-amber-50 z-50">
      <nav className="px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link
            href="/admin"
            className="flex flex-col items-center text-sm font-semibold hover:scale-110 transition-transform"
          >
            <PanelsTopLeftIcon size={24} />
            <span>Admin</span>
          </Link>

          <Link href="/" className="flex items-center gap-2">
            <Image src="/images/logo.svg" alt="Bookdragons Logo" width={40} height={40} />
            <span className="text-xl font-bold hidden md:inline">Bookdragons</span>
          </Link>
        </div>

        <div className="flex items-center gap-5 md:gap-10">
          <Link
            href="/books"
            className={
              pathname === '/books' || pathname.startsWith('/books')
                ? 'font-bold border-b-2 border-black pb-1 pt-2'
                : 'font-bold hover:scale-105 transition-transform border-b-2 border-transparent pb-1 pt-2'
            }
          >
            Bøker
          </Link>

          <Link
            href="/authors"
            className={
              pathname === '/authors' || pathname.startsWith('/authors/')
                ? 'font-bold border-b-2 border-black pb-1 pt-2'
                : 'font-bold hover:scale-105 transition-transform border-b-2 border-transparent pb-1 pt-2'
            }
          >
            Forfattere
          </Link>

          <button className="cursor-pointer pt-1 hover:scale-115 transition-transform">
            <ShoppingCart size={24} />
          </button>
        </div>
      </nav>
    </header>
  )
}
