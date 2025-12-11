'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart, PanelsTopLeftIcon, Menu, X } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import Cart from '@/components/Cart'

export default function Header() {
  const pathname = usePathname()
  const [isMenuOpen, setMenuOpen] = useState(false)
  const [isCartOpen, setCartOpen] = useState(false)

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
            <span className="text-xl font-bold hidden md:inline">BookDragons</span>
          </Link>
        </div>
        <div className="flex items-center gap-30">
          <div className="hidden md:flex gap-30">
            <Link
              href="/books"
              className={
                pathname === '/books'
                  ? 'font-bold border-b-2 border-black pb-1 pt-2'
                  : 'font-bold hover:scale-105 transition-transform border-b-2 border-transparent pb-1 pt-2'
              }
            >
              Bøker
            </Link>
            <Link
              href="/authors"
              className={
                pathname === '/authors'
                  ? 'font-bold border-b-2 border-black pb-1 pt-2'
                  : 'font-bold hover:scale-105 transition-transform border-b-2 border-transparent pb-1 pt-2'
              }
            >
              Forfattere
            </Link>
          </div>
          <div className="flex items-center gap-10">
            <button
              className="md:hidden cursor-pointer hover:scale-115 transition-transform"
              onClick={() => setMenuOpen(!isMenuOpen)}
              aria-label="Meny"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <button
              onClick={() => setCartOpen(true)}
              className="cursor-pointer hover:scale-115 transition-transform"
            >
              <ShoppingCart size={24} />
            </button>

            <Cart
              isOpen={isCartOpen}
              onClose={() => {
                setCartOpen(false)
              }}
            />
          </div>
        </div>
      </nav>

      {/*Mobilmeny*/}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-amber-50 py-4 px-6 flex flex-col gap-4">
          <Link
            href="/books"
            onClick={() => {
              setMenuOpen(false)
            }}
            className={
              pathname === '/books' || pathname.startsWith('/books')
                ? 'font-bold border-b border-black pb-2'
                : 'font-bold hover:opacity-70 transition-opacity pb-2'
            }
          >
            Bøker
          </Link>
          <Link
            href="/authors"
            onClick={() => setMenuOpen(false)}
            className={
              pathname === '/authors' || pathname.startsWith('/authors/')
                ? 'font-bold border-b border-black pb-2'
                : 'font-bold hover:opacity-70 transition-opacity pb-2'
            }
          >
            Forfattere
          </Link>
        </div>
      )}
    </header>
  )
}
