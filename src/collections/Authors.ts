import { CollectionConfig} from 'payload'

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
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'URL-vennlig navn',
      admin: {
        description: 'Brukes i URL, feks "jo-nesbo"',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Bilde av forfatter',
      required: false,
    },
  ],
}