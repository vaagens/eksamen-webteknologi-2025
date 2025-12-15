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
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],

    imageSizes: [
      {
        name: 'thumbnail',
        width: 200,
        height: 300,
        position: 'centre',
        formatOptions: {
          format: 'webp',
          options: {
            quality: 80,
          },
        },
      },
      {
        name: 'card',
        width: 400,
        height: 600,
        position: 'centre',
        formatOptions: {
          format: 'webp',
          options: {
            quality: 85,
          },
        },
      },
    ],
    formatOptions: {
      format: 'webp',
      options: {
        quality: 90,
      },
    },
    resizeOptions: {
      width: 1200,
      fit: 'inside',
    },
  },
}
