import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { Users } from './collections/Users'
import { Products } from './collections/Products'
import { Media } from './collections/Media'
import { ProductFiles } from './collections/ProductFiles'
import { FirmwareReleases } from './collections/FirmwareReleases'

export default buildConfig({
  // Canonical origin: voltpak.ca 307-redirects to www.voltpak.ca, so every
  // admin request runs with Origin https://www.voltpak.ca. Payload adds
  // `serverURL` to its CSRF allowlist and drops cookie auth for any
  // state-changing request whose Origin isn't on that list — so a serverURL
  // that doesn't match the served host makes POSTs (sign out, saves,
  // uploads) run as anonymous ("No User" 400). Keep fallback in sync with
  // the real host, and allowlist both hosts.
  serverURL: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.voltpak.ca',
  csrf: [
    'https://www.voltpak.ca',
    'https://voltpak.ca',
    ...(process.env.NEXT_PUBLIC_SITE_URL &&
    !['https://www.voltpak.ca', 'https://voltpak.ca'].includes(process.env.NEXT_PUBLIC_SITE_URL)
      ? [process.env.NEXT_PUBLIC_SITE_URL]
      : []),
  ],
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '- VoltPak',
    },
    components: {
      graphics: {
        Logo: '@/components/admin/Logo',
        Icon: '@/components/admin/Icon',
      },
      beforeDashboard: ['@/components/admin/DashboardStats'],
    },
  },
  collections: [Users, Products, Media, ProductFiles, FirmwareReleases],
  editor: lexicalEditor(),
  db: postgresAdapter({
    // push: true is intentional in all environments. drizzle makes it idempotent
    // (no-op when schema is already in sync), so it is safe on cold starts.
    push: true,
    pool: {
      connectionString: process.env.DATABASE_URL ?? '',
      // Supabase needs SSL but local/CI postgres doesn't support it.
      ssl: (process.env.DATABASE_URL ?? '').includes('localhost') ? false : { rejectUnauthorized: false },
      // Supabase transaction pooler recommends low max for serverless
      max: process.env.NODE_ENV === 'production' ? 2 : 10,
      idleTimeoutMillis: 10_000,
      connectionTimeoutMillis: 10_000,
    },
  }),
  plugins: [
    vercelBlobStorage({
      enabled: !!process.env.BLOB_READ_WRITE_TOKEN,
      collections: {
        media: true,
        'product-files': { disableLocalStorage: true },
        'firmware-releases': { disableLocalStorage: true },
      },
      token: process.env.BLOB_READ_WRITE_TOKEN ?? '',
    }),
  ],
  onInit: async (payload) => {
    const dashboard = payload.config.admin.dashboard
    if (dashboard?.widgets) {
      const seen = new Set<string>()
      dashboard.widgets = dashboard.widgets.filter((w) => {
        if (seen.has(w.slug)) return false
        seen.add(w.slug)
        return true
      })
    }
  },
  secret: process.env.PAYLOAD_SECRET ?? 'dev-secret-change-in-production',
  typescript: {
    outputFile: 'payload-types.ts',
  },
  upload: {
    limits: {
      fileSize: 100_000_000,
    },
  },
})
