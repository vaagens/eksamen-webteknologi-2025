import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    description: 'Last opp bilder som er minst 400x600 piksler for best kvalitet',
    },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    staticDir: 'media',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 200,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 400,
        height: 600,
        position: 'centre',
      }
    ],
    mimeTypes: ['image/*'],
  }
}
