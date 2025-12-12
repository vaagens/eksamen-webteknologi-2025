import React from 'react'
import '../globals.css'
import { getPayload } from 'payload'
import config from '@payload-config'
import AuthorCard from '@/components/AuthorCard'

export default async function AuthorPage() {
  try {
    const payload = await getPayload({ config })

    const { docs: authors } = await payload.find({
      collection: 'authors',
      limit: 0,
    })

    return (
      <article className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-8">Forfattere</h1>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {authors.map((author) => (
            <AuthorCard key={author.id} author={author} />
          ))}
        </section>
      </article>
    )
  } catch (error) {
    console.error('Feeil ved henting av forfatter', error)
    return (
      <div>
        <p className="text-red-600">Kunne ikke laste forfattere. Prøv igjen senere</p>
      </div>
    )
  }
}
