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
    <article className="flex h-full flex-col rounded-lg border p-4 shadow-lg">
      <Link href={`/books/${book.slug}`}>
        <div className="relative mb-4 aspect-[3/4] rounded-lg bg-gray-100">
          {book.coverImage && typeof book.coverImage !== 'number' && book.coverImage.sizes?.card ? (
            <Image
              src={book.coverImage.sizes.card.url || ''}
              alt={book.title}
              fill
              sizes="(max-width: 768px) 100vw, 200px"
              className="rounded object-cover transition-transform hover:scale-105 hover:shadow-lg"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-gray-400">Ingen bilde</div>
          )}
        </div>

        <header className="pb-3">
          <h1 className="line-clamp-2 min-h-[3rem] font-bold transition-transform hover:underline">
            {book.title}
          </h1>
        </header>
      </Link>

      <section className="mt-auto pb-5 font-semibold">
        {authors.map((author, index) => (
          <span key={author.slug}>
            <Link href={`/authors/${author.slug}`} className="hover:underline">
              {author.name}
            </Link>
            {index < authors.length - 1 && ', '}
          </span>
        ))}
      </section>

      <section className="mt-auto">
        <div className="flex items-baseline justify-between">
          <dt className="font-semibold">Sjanger:</dt>
          <dd className="max-w-[70%] truncate">{genres.map((g) => g.name).join(', ')}</dd>
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
        <AddToCartButton book={book} />
      </footer>
    </article>
  )
}
