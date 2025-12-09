import { CollectionConfig } from 'payload'

export const AgeGroup: CollectionConfig = {
  slug: 'ageGroup',
  admin: {
    useAsTitle: 'ageGroup',
  },
  fields: [
    {
      name: 'ageGroup',
      type: 'text',
      required: true,
      label: 'Aldersgruppe (År)',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Beskrivelse',
    },
  ],
}
