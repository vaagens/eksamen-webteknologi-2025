import { Book } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'

interface BookCardProps {
  book: Book
}

export default function BookCard({ book }: BookCardProps) {
  return (
    <Link
      href={`/books/${book.id}`}
      className="border rounded-lg p-4 hover:shadow-lg transition-shadow"
    >
      <article>
        <div className="aspect-[3/4] relative mb-4 bg-gray-100">
          {book.coverImage && typeof book.coverImage !== 'number' && book.coverImage.sizes?.card ? (
            <Image
              src={book.coverImage.sizes.card.url || ''}
              alt={book.title}
              fill
              className="object-cover rounded"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">Ingen bilde</div>
          )}
        </div>
        <h3 className="font-bold text-lg">{book.title}</h3>
        <p>Pris: {book.price} kr</p>
      </article>
    </Link>
  )
}
