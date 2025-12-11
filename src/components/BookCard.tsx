'use client'

import { Book, AgeGroup, Genre, Author } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'
import { AddToCartButton } from '@/components/AddToCartButton'

interface BookCardProps {
  book: Book
}

export default function BookCard({ book }: BookCardProps) {
  const authors = book.author as Author[]
  const age = book.ageGroup as AgeGroup
  const genres = book.genres as Genre[]

  return (
    <article className="border rounded-lg p-4 flex flex-col h-full shadow-lg">
      <Link href={`/books/${book.slug}`}>
        <div className="aspect-[3/4] relative mb-4 bg-gray-100  rounded-lg">
          {book.coverImage && typeof book.coverImage !== 'number' && book.coverImage.sizes?.card ? (
            <Image
              src={book.coverImage.sizes.card.url || ''}
              alt={book.title}
              fill
              sizes="(max-width: 768px) 100vw, 200px"
              className="object-cover rounded hover:scale-105 hover:shadow-lg transition-transform "
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">Ingen bilde</div>
          )}
        </div>

        <header className="pb-3">
          <h1 className="font-bold line-clamp-2 min-h-[3rem] hover:underline transition-transform">
            {book.title}
          </h1>
        </header>
      </Link>

      <section className="font-semibold pb-5 mt-auto">
        {authors.map((author, index) => (
          <span key={author.slug}>
            <Link
              href={`/authors/${author.slug}`}
              onClick={(e) => e.stopPropagation()}
              className="hover:underline"
            >
              {author.name}
            </Link>
            {index < authors.length - 1 && ', '}
          </span>
        ))}
      </section>

      <section className="mt-auto">
        <div className="flex items-baseline justify-between">
          <dt className="font-semibold">Sjanger:</dt>
          <dd className="truncate max-w-[70%]">{genres.map((g) => g.name).join(', ')}</dd>
        </div>
        <div className="flex items-baseline justify-between">
          <dt className="font-semibold">Aldersgruppe:</dt>
          <dd>{age?.ageGroup || 'Ukjent'}</dd>
        </div>
        <div className="flex items-baseline justify-between">
          <div className="flex items-baseline gap-1">
            <dt className="font-semibold">Pris:</dt>
            <dd>{book.price} kr</dd>
          </div>
          <div className="flex items-baseline gap-1">
            <dt className="font-semibold">Lagerstatus:</dt>
            <dd>{book.stock}</dd>
          </div>
        </div>
      </section>

      <footer className="flex justify-center pt-4">
        <AddToCartButton />
      </footer>
    </article>
  )
}
