import React from 'react'
import '../globals.css'
import { getPayload } from 'payload'
import config from '@payload-config'
import BookCard from '@/components/BookCard'

export default async function HomePage() {
  try {
    const payload = await getPayload({ config })

    const { docs: books} = await payload.find({
      collection: 'books',
    })
    return (
      <div>
        <section>Filtrering TODO</section>

        <section>
          {books.map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </section>
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
