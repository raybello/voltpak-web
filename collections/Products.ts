import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'price', 'preLaunch', 'updatedAt'],
  },
  fields: [
    // ── Identity ──────────────────────────────────────────────────────────
    {
      name: 'productId',
      type: 'text',
      required: true,
      unique: true,
      admin: { description: 'Short product id used in URLs and code, e.g. vp-1000' },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: { description: 'URL slug, e.g. voltpak-1000' },
    },
    { name: 'name', type: 'text', required: true },
    { name: 'tagline', type: 'text', required: true },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Power Station', value: 'power-station' },
        { label: 'Battery', value: 'battery' },
        { label: 'Solar', value: 'solar' },
        { label: 'Accessory', value: 'accessory' },
        { label: 'Bundle', value: 'bundle' },
      ],
    },

    // ── Pricing ───────────────────────────────────────────────────────────
    { name: 'price', type: 'number', required: true },
    { name: 'compareAt', type: 'number' },
    {
      name: 'preLaunch',
      type: 'select',
      options: [
        { label: 'Inherit global setting', value: 'inherit' },
        { label: 'Force pre-launch (Coming Soon)', value: 'true' },
        { label: 'Force live (show price)', value: 'false' },
      ],
      defaultValue: 'inherit',
      admin: { description: 'Override the global PRE_LAUNCH_MODE flag in lib/config.ts' },
    },

    // ── Card image & stats ────────────────────────────────────────────────
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: { description: 'Product card / listing image' },
    },
    {
      name: 'stats',
      type: 'group',
      fields: [
        { name: 'capacity', type: 'text' },
        { name: 'output', type: 'text' },
        { name: 'weight', type: 'text' },
      ],
    },

    // ── Descriptions ──────────────────────────────────────────────────────
    { name: 'shortDesc', type: 'textarea', required: true },
    { name: 'longDesc', type: 'textarea', required: true },

    // ── Hero ──────────────────────────────────────────────────────────────
    {
      name: 'heroTagline',
      type: 'group',
      fields: [
        { name: 'lineA', type: 'text', required: true },
        { name: 'lineB', type: 'text', required: true },
      ],
    },
    {
      name: 'heroMediaType',
      type: 'select',
      options: [
        { label: 'Image', value: 'image' },
        { label: 'Video', value: 'video' },
      ],
      defaultValue: 'image',
      required: true,
    },
    {
      name: 'heroMedia',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: { description: 'Hero image or video file' },
    },

    // ── Highlights band (3-up stat strip) ─────────────────────────────────
    {
      name: 'highlights',
      type: 'array',
      minRows: 1,
      maxRows: 4,
      fields: [
        { name: 'stat', type: 'text', required: true },
        { name: 'label', type: 'text', required: true },
        { name: 'note', type: 'text' },
      ],
    },

    // ── Features ──────────────────────────────────────────────────────────
    {
      name: 'features',
      type: 'array',
      fields: [
        {
          name: 'featureId',
          type: 'text',
          required: true,
          admin: { description: 'Anchor id, e.g. safety (lowercase, dash-separated)' },
        },
        { name: 'eyebrow', type: 'text', required: true },
        { name: 'title', type: 'text', required: true },
        { name: 'body', type: 'textarea', required: true },
        {
          name: 'featureMediaType',
          type: 'select',
          options: [
            { label: 'Image', value: 'image' },
            { label: 'Video', value: 'video' },
          ],
          defaultValue: 'image',
          required: true,
        },
        {
          name: 'featureMedia',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'featureMediaAlt',
          type: 'text',
          required: true,
          admin: { description: 'Alt text for accessibility' },
        },
        {
          name: 'callouts',
          type: 'array',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'value', type: 'text', required: true },
          ],
        },
        {
          name: 'tone',
          type: 'select',
          options: [
            { label: 'Light background', value: 'light' },
            { label: 'Dark background', value: 'dark' },
          ],
        },
      ],
    },

    // ── In the box ────────────────────────────────────────────────────────
    {
      name: 'inTheBox',
      type: 'array',
      fields: [{ name: 'item', type: 'text', required: true }],
    },

    // ── Spec sheet ────────────────────────────────────────────────────────
    {
      name: 'specs',
      type: 'array',
      label: 'Spec Groups',
      fields: [
        { name: 'group', type: 'text', required: true },
        {
          name: 'rows',
          type: 'array',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'value', type: 'text', required: true },
            { name: 'note', type: 'text' },
          ],
        },
      ],
    },

    // ── FAQ ───────────────────────────────────────────────────────────────
    {
      name: 'faq',
      type: 'array',
      fields: [
        { name: 'q', type: 'text', required: true },
        { name: 'a', type: 'textarea', required: true },
      ],
    },

    // ── Certifications ────────────────────────────────────────────────────
    {
      name: 'certifications',
      type: 'array',
      fields: [{ name: 'cert', type: 'text', required: true }],
    },

    // ── Warranty & shipping ───────────────────────────────────────────────
    {
      name: 'warranty',
      type: 'group',
      fields: [
        { name: 'unit', type: 'text', required: true },
        { name: 'battery', type: 'text', required: true },
        { name: 'accessories', type: 'text' },
      ],
    },
    {
      name: 'shipping',
      type: 'group',
      fields: [
        { name: 'usFreeOver', type: 'number', required: true, defaultValue: 100 },
        { name: 'intlAvailable', type: 'checkbox', defaultValue: false },
      ],
    },

    // ── Compare & compatibility ───────────────────────────────────────────
    {
      name: 'compareAgainst',
      type: 'array',
      admin: { description: 'Benchmark keys from lib/benchmarks.ts, e.g. dji-power-1000' },
      fields: [{ name: 'benchmarkKey', type: 'text', required: true }],
    },
    {
      name: 'compatibleWith',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
      admin: { description: 'Other products this pairs with (expansion batteries, solar panels, accessories)' },
    },
  ],
}
