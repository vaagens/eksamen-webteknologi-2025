import { CollectionConfig, slugField } from 'payload'

export const Authors: CollectionConfig = {
  slug: 'authors',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Forfatterens navn',
    },
    slugField({
      useAsSlug: 'name',
    }),
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Bilde av forfatter',
      required: false,
    },
    {
      name: 'bio',
      type: 'richText',
      label: 'Kort presentasjon av forfatteren',
      admin: {
        description: 'Skriv en kort biografi av forfatteren som vises på nettsiden',
      },
    },
  ],
}
