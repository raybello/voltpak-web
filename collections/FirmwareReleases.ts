import type { CollectionConfig } from 'payload'

export const FirmwareReleases: CollectionConfig = {
  slug: 'firmware-releases',
  upload: true,
  admin: {
    useAsTitle: 'version',
    defaultColumns: ['version', 'product', 'isLatest', 'publishedAt'],
  },
  fields: [
    {
      name: 'version',
      type: 'text',
      required: true,
      admin: { description: 'Semantic version, e.g. 1.2.3' },
    },
    {
      name: 'product',
      type: 'relationship',
      relationTo: 'products',
      required: true,
    },
    {
      name: 'releaseNotes',
      type: 'textarea',
      required: true,
      admin: { description: 'Markdown-compatible release notes shown on the downloads page' },
    },
    {
      name: 'minHardwareRev',
      type: 'text',
      admin: { description: 'Minimum hardware revision required, e.g. rev-B or 1.0' },
    },
    {
      name: 'isLatest',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Mark as the current recommended firmware. Uncheck the previous release after uploading a new one.' },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        description: 'Release date shown publicly',
        date: { pickerAppearance: 'dayOnly' },
      },
    },
  ],
}
