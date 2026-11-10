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
  admin: {
    user: Users.slug,
  },
  collections: [Users, Products, Media, ProductFiles, FirmwareReleases],
  editor: lexicalEditor(),
  db: postgresAdapter({
    // push: true syncs the schema directly to the DB (dev only).
    // For production, run `npx payload migrate:create` and `npx payload migrate`.
    push: process.env.NODE_ENV !== 'production',
    pool: {
      connectionString: process.env.DATABASE_URL ?? '',
      // Supabase uses valid TLS but the intermediate CA is not always in
      // Windows' / Node's trust store; the connection is still encrypted.
      ssl: { rejectUnauthorized: false },
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
