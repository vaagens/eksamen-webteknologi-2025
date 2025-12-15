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
      unique: true,
      admin: {
        description: 'Må være unik. Sjekk eksisterende aldersgrupper før du lager en ny',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Beskrivelse',
    },
  ],
}
