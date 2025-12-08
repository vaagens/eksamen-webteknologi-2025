import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
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
        position: 'center',
      },
      {
        name: 'card',
        width: 400,
        height: 600,
        position: 'center',
      }
    ],
    mimeTypes: ['image/*'],
  }
}
