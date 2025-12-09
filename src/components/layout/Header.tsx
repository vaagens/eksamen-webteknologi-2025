import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart } from 'lucide-react'

export default function Header() {
  return (
    <header>
      <nav>
        <Link href="/" className="flex items-center gap-2">
          <Image src="/images/logo.svg" alt="Bookdragons Logo" width={40} height={40} />
          <span className="text-xl font-bold">Bookdragons</span>
        </Link>

        <div>
          <Link href="/authors">Forfattere</Link>
        </div>

        <button>
          <ShoppingCart size={24} />
        </button>
      </nav>
    </header>
  )
}
