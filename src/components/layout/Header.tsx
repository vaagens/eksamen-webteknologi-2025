import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  return (
    <header>
      <nav>
        <Link href="/">
          <Image src="/images/logo.svg" alt="Bookdragons Logo" width={40} height={40} />
        </Link>
      </nav>
    </header>
  )
}
