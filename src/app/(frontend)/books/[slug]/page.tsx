import { getPayload } from 'payload'
import config from '@payload-config'
import { AgeGroup, Author, Genre, Media } from '@/payload-types'
import Image from 'next/image'
import { BackButton } from '@/components/BackButton'
import { AddToCartButton } from '@/components/AddToCartButton'

export default async function BookDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payload = await getPayload({ config })

  try {
    const { docs: books } = await payload.find({
      collection: 'authors',
      where: {
        slug: {
          equals: slug,
        },
      },
      depth: 2,
      limit: 1,
    })

    const book = books[0]

    const authors = book.author as Author[]
    const cover = book.coverImage as Media
    const genres = book.genres as Genre[]
    const age = book.ageGroup as AgeGroup

    return (
      <article className="m-2 flex flex-col items-center gap-6">
        <header>
          <h1 className="text-3xl font-bold">{book.title}</h1>
        </header>

        <section className="flex items-baseline gap-3">
          <h2 className="text-xl font-bold">Forfatter:</h2>
          <p>{authors.map((a) => a.name).join(', ') || 'Ukjent'} </p>
        </section>

        <section className="relative h-96 w-64">
          {cover?.sizes?.card?.url ? (
            <Image
              src={cover.sizes.card.url}
              alt={book.title}
              fill
              sizes="(max-width: 768px) 100vw, 200px"
              className="rounded object-cover shadow-lg"
            />
          ) : (
            <div className="flex h-96 w-64 items-center justify-center rounded border border-gray-200 bg-white shadow-lg">
              <p className="text-gray-400">Ingen bilde</p>
            </div>
          )}
        </section>

        <section className="max-w-prose text-center">
          <h2 className="text-xl font-bold">Beskrivelse:</h2>
          <p>{book.description}</p>
        </section>

        <section className="max-w-prose text-center">
          <h2 className="text-xl font-bold">Detaljer:</h2>
          <div className="flex items-baseline gap-3">
            <dt className="font-semibold">Sjanger:</dt>
            <dd>{genres.map((g) => g.name).join(', ') || 'Ukjent'}</dd>
          </div>
          <div className="flex items-baseline gap-3">
            <dt className="font-semibold">Aldersgruppe:</dt>
            <dd>{age?.ageGroup || 'Ukjent'}</dd>
          </div>
          <div className="flex items-baseline gap-3">
            <dt className="font-semibold">ISBN:</dt>
            <dd>{book.isbn}</dd>
          </div>
        </section>

        <section className="flex items-baseline gap-6">
          <div className="flex items-baseline gap-1">
            <dt className="font-semibold">Pris:</dt>
            <dd>{book.price} kr</dd>
          </div>
          <div className="flex items-baseline gap-1">
            <dt className="font-semibold">Lagerstatus:</dt>
            <dd>{book.stock}</dd>
          </div>
        </section>

        <section className="flex items-baseline gap-6">
          <BackButton />
          <AddToCartButton book={book} />
        </section>
      </article>
    )
  } catch (error) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-2xl font-semibold">Fant ikke boken</h1>
        <p className="m-2">Det finnes ingen bok med denne adressen.</p>
        <BackButton />
      </div>
    )
  }
}
