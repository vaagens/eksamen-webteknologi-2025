import { CollectionConfig } from 'payload'

export const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    useAsTitle: 'customerName',
  },
  access: {
    create: () => true,
    },
  fields: [
    {
      name: 'customerName',
      type: 'text',
      required: true,
      label: 'Kundens navn',
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
      label: 'Telefonnummer',
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      label: 'Bestilte bøker',
      fields: [
        {
          name: 'book',
          type: 'relationship',
          relationTo: 'books',
          required: true,
          label: 'Bok',
        },
        {
          name: 'quantity',
          type: 'number',
          required: true,
          label: 'Antall',
          min: 1,
          defaultValue: 1,
        },
        {
          name: 'priceAtOrder',
          type: 'number',
          required: true,
          label: 'Pris ved bestilling',
          admin: {
            description: 'Prisen som gjaldt da bestillingen ble lagt',
          },
        },
      ],
    },
    {
      name: 'totalPrice',
      type: 'number',
      required: true,
      label: 'Totalpris',
      admin: {
        description: 'Sum av alle bøker i bestillingen',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      label: 'Status',
      defaultValue: 'pending',
      options: [
        { label: 'Venter på henting', value: 'pending' },
        { label: 'Hentet', value: 'completed' },
        { label: 'Kansellert', value: 'cancelled' },
      ],
    },
  ],
}
