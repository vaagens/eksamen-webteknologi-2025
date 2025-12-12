import { getPayload } from 'payload'
import config from '@payload-config'
import { AgeGroup, Author, Genre, Media } from '@/payload-types'
import Image from 'next/image'
import { BackButton } from '@/components/BackButton'
import { AddToCartButton } from '@/components/AddToCartButton'
import { RichText } from '@payloadcms/richtext-lexical/react'

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
      depth: 2,
      limit: 1,
    })

    const author = authors[0]


    const image = author.image as Media


    return (
      <article className="grid gap-8 md:grid-cols-2">
        <section>
          <header>
            <h1 className="text-3xl font-bold">{author.name}</h1>
          </header>

          <div className="relative h-96 w-64">
            {image?.sizes?.card?.url ? (
              <Image
                src={image.sizes.card.url}
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
        <section>

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
