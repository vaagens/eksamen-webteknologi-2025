import { CollectionConfig } from 'payload'

export const Genres: CollectionConfig = {
  slug: 'genres',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Sjangerens navn',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Beskrivelse av sjangeren',
      admin: {
        description: 'Hva kjennetegner denne sjangeren?',
        rows: 4,
      },
    },
  ],
}
