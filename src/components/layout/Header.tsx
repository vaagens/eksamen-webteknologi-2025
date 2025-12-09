import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  return (
    <header>
      <nav>
        <Link href="/" className="flex items-center gap-2">
          <Image src="/images/logo.svg" alt="Bookdragons Logo" width={40} height={40} />
          <span className="text-xl font-bold">Bookdragons</span>
        </Link>

      </nav>
    </header>
  )
}
