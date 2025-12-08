import { CollectionConfig } from 'payload'

export const Books: CollectionConfig = {
  slug: 'books',
  admin: {
    useAsTitle: 'title',
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
  ]
}