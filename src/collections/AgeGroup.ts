import { CollectionConfig } from 'payload'

export const AgeGroup: CollectionConfig = {
  slug: 'ageGroup',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'ageGroup',
      type: 'text',
      required: true,
      label: 'Aldersgruppe',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Beskrivelse',
    },
  ],
}
