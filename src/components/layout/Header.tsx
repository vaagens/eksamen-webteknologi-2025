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
    <header className="sticky top-0 z-50 border-b bg-amber-50">
      <nav className="flex items-center justify-between px-6 py-6">
        <div className="flex items-center gap-6">
          <Link
            href="/admin"
            className="flex flex-col items-center text-sm font-semibold transition-transform hover:scale-110"
          >
            <PanelsTopLeftIcon size={24} />
            <span>Admin</span>
          </Link>
          <Link href="/" className="flex items-center gap-2">
            <Image src="/images/logo.svg" alt="Bookdragons Logo" width={40} height={40} />
            <span className="hidden text-xl font-bold md:inline">BookDragons</span>
          </Link>
        </div>
        <div className="flex items-center gap-30">
          <div className="hidden gap-30 md:flex">
            <Link
              href="/books"
              className={
                pathname === '/books'
                  ? 'border-b-2 border-black pt-2 pb-1 font-bold'
                  : 'border-b-2 border-transparent pt-2 pb-1 font-bold transition-transform hover:scale-105'
              }
            >
              Bøker
            </Link>
            <Link
              href="/authors"
              className={
                pathname === '/authors'
                  ? 'border-b-2 border-black pt-2 pb-1 font-bold'
                  : 'border-b-2 border-transparent pt-2 pb-1 font-bold transition-transform hover:scale-105'
              }
            >
              Forfattere
            </Link>
          </div>
          <div className="flex items-center gap-10">
            <button
              className="cursor-pointer transition-transform hover:scale-115 md:hidden"
              onClick={() => setMenuOpen(!isMenuOpen)}
              aria-label="Meny"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <button
              onClick={() => setCartOpen(true)}
              className="cursor-pointer transition-transform hover:scale-115"
              aria-label="Åpne handlekurv"
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
        <div className="flex flex-col gap-4 border-t bg-amber-50 px-6 py-4 md:hidden">
          <Link
            href="/books"
            onClick={() => {
              setMenuOpen(false)
            }}
            className={
              pathname === '/books' || pathname.startsWith('/books')
                ? 'border-b border-black pb-2 font-bold'
                : 'pb-2 font-bold transition-opacity hover:opacity-70'
            }
          >
            Bøker
          </Link>
          <Link
            href="/authors"
            onClick={() => setMenuOpen(false)}
            className={
              pathname === '/authors' || pathname.startsWith('/authors/')
                ? 'border-b border-black pb-2 font-bold'
                : 'pb-2 font-bold transition-opacity hover:opacity-70'
            }
          >
            Forfattere
          </Link>
        </div>
      )}
    </header>
  )
}
