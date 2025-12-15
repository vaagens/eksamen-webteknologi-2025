import { getPayload } from 'payload'
import config from '@payload-config'
import { Media } from '@/payload-types'
import Image from 'next/image'
import { BackButton } from '@/components/BackButton'
import { RichText } from '@payloadcms/richtext-lexical/react'
import BookCard from '@/components/BookCard'

export default async function AuthorDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payload = await getPayload({ config })

  try {
    const { docs: authors } = await payload.find({
      collection: 'authors',
      where: {
        slug: {
          equals: slug,
        },
      },
      limit: 1,
    })

    const author = authors[0]

    const { docs: authorBooks } = await payload.find({
      collection: 'books',
      where: {
        author: {
          equals: author.id,
        },
      },
    })

    const image = author.image as Media

    return (
      <article className="m-2 grid gap-8 md:grid-cols-2">
        <section className="m-2 flex flex-col items-center">
          <header>
            <h1 className="mb-8 text-3xl font-bold">{author.name}</h1>
          </header>

          <div className="relative w-80 aspect-[2/3] mx-auto">
            {image?.url ? (
              <Image
                src={image.url}
                alt={author.name}
                fill
                sizes="(max-width: 768px) 100vw, 200px"
                className="rounded object-cover shadow-lg"
              />
            ) : (
              <div className="flex h-96 w-64 items-center justify-center rounded border border-gray-200 bg-white shadow-lg">
                <p className="text-gray-400">Ingen bilde</p>
              </div>
            )}
          </div>

          <div className="max-w-prose text-center">
            <h2 className="text-xl font-bold">Bio:</h2>
            <div>
              {author.bio ? <RichText data={author.bio} /> : <p>Ingen beskrivelse tilgjengelig</p>}
            </div>
          </div>
        </section>
        <section className="m-2 flex flex-col text-center">
          <h2 className="mb-8 text-2xl font-bold">Bøker av {author.name}</h2>
          {authorBooks.length > 0 ? (
            <div className="grid origin-top scale-70 grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
              {authorBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          ) : (
            <p className="text-gray-600">Ingen bøker funnet for denne forfatteren.</p>
          )}
        </section>
      </article>
    )
  } catch (error) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-2xl font-semibold">Fant ikke forfatteren</h1>
        <p className="m-2">Det finnes ingen forfatter med denne adressen.</p>
        <BackButton />
      </div>
    )
  }
}
