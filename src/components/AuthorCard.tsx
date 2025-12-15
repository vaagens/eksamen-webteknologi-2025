import { Author } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'

interface AuthorCardProps {
  author: Author
}

export default function AuthorCard({ author }: AuthorCardProps) {
  return (
    <Link
      href={`/authors/${author.slug}`}
      className="transition-transform hover:scale-105 hover:shadow-lg"
    >
      <article className="flex h-full flex-col rounded-lg border p-4 shadow-lg">
        <div className="relative mb-4 aspect-[3/4] rounded-lg bg-gray-100">
          {author.image && typeof author.image !== 'number' && author.image.sizes?.card ? (
            <Image
              src={author.image.sizes.card.url || ''}
              alt={author.name}
              fill
              sizes="(max-width: 768px) 100vw, 200px"
              className="rounded object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-gray-400">Ingen bilde</div>
          )}
        </div>

        <header className="pb-3">
          <h1 className="font-bold">{author.name}</h1>
        </header>
      </article>
    </Link>
  )
}
