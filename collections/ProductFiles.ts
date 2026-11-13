import type { CollectionConfig } from 'payload'

export const ProductFiles: CollectionConfig = {
  slug: 'product-files',
  upload: true,
  admin: {
    useAsTitle: 'displayName',
    defaultColumns: ['displayName', 'fileType', 'product', 'updatedAt'],
  },
  fields: [
    {
      name: 'displayName',
      type: 'text',
      required: true,
      admin: { description: 'Human-readable label shown in the downloads section, e.g. "VoltPak 1000 Schematic Rev B"' },
    },
    {
      name: 'fileType',
      type: 'select',
      required: true,
      options: [
        { label: 'Schematic PDF', value: 'schematic-pdf' },
        { label: '3D Model — STL', value: '3d-stl' },
        { label: '3D Model — STEP', value: '3d-step' },
        { label: 'Certification Doc', value: 'certification' },
        { label: 'App Screenshot', value: 'app-screenshot' },
        { label: 'Video', value: 'video' },
      ],
    },
    {
      name: 'product',
      type: 'relationship',
      relationTo: 'products',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      admin: { description: 'Optional short note shown with the download link' },
    },
    {
      name: 'isPublic',
      type: 'checkbox',
      defaultValue: true,
      admin: { description: 'Uncheck to hide from the public downloads section' },
    },
    {
      name: 'version',
      type: 'text',
      admin: { description: 'Optional version tag, e.g. Rev B, 2024-Q1' },
    },
  ],
}
