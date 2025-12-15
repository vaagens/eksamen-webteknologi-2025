import React from 'react'
import './globals.css'
import Image from 'next/image'

export default async function HomePage() {
  return (
    <article className="m-20 flex flex-col items-center gap-2 text-center">
      <Image src="/images/logo.svg" alt="Bookdragons Logo" width={100} height={100} />
      <h1 className="text-3xl font-bold">Velkommen til BookDragons</h1>
      <p>Vi brenner for brukte bøker!</p>
    </article>
  )
}
