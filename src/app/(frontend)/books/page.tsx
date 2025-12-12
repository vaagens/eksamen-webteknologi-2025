import React from 'react'
import '../globals.css'
import { getPayload } from 'payload'
import config from '@payload-config'
import GenreFilter from '@/components/GenreFilter'

export default async function HomePage() {
  try {
    const payload = await getPayload({ config })

    const { docs: books } = await payload.find({
      collection: 'books',
      limit: 0,
    })

    const { docs: genres } = await payload.find({
      collection: 'genres',
      limit: 0,
    })

    return (
      <div className="max-w-7xl mx-auto px-6 py-8">
        <GenreFilter books={books} genres={genres} />
      </div>
    )
  } catch (error) {
    console.error('Feeil ved henting av bøker', error)
    return (
      <div>
        <p className="text-red-600">Kunne ikke laste bøker. Prøv igjen senere</p>
      </div>
    )
  }
}
