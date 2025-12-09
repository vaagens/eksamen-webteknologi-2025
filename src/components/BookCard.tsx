import { Book } from '@/payload-types'

interface BookCardProps {
  book: Book
}

export default function BookCard({book}: BookCardProps) {
  return (
    <article>
      <h3>{book.title}</h3>
      <p>Pris: {book.price} kr</p>
    </article>
  )
}