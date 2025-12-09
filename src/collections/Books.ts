import { CollectionConfig } from 'payload'

export const Books: CollectionConfig = {
  slug: 'books',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['coverImage', 'title', 'author', 'stock', 'price'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Boktittel',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Beskrivelse',
    },
    {
      name: 'isbn',
      type: 'text',
      label: 'ISBN-nummer',
    },
    {
      name: 'price',
      type: 'number',
      label: 'Pris',
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'authors',
      required: true,
      hasMany: true,
      label: 'Forfattere',
    },
    {
      name: 'genres',
      type: 'relationship',
      relationTo: 'genres',
      hasMany: true,
      label: 'Sjangere',
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Bilde av bok',
      admin: {
        description: 'Last opp et bilde som er minst 400x600 piksler for best kvalitet',
      },
    },
    {
      name: 'stock',
      type: 'number',
      defaultValue: 0,
      label: 'Antall på lager',
      admin: {
        description: 'Oppdater når du mottar eller selger bøker',
        position: 'sidebar',
      },
    },
    {
      name: 'ageGroup',
      type: 'relationship',
      relationTo: 'ageGroup',
      label: 'Aldersgruppe',
      hasMany: false,
    },
  ],
}
