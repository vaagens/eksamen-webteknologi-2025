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
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'URL-vennlig navn',
      admin: {
        description: 'Brukes i URL, feks "fantasy"',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Beskrivelse av sjangeren',
      admin: {
        description: 'Hva kjennetegner denne sjangeren?',
        rows: 4,
      }
    }
  ],
}
