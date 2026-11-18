// CI schema-push helper. Run with NODE_ENV=development so the postgres
// adapter's `push: true` fires and creates all tables before next build.
import { getPayload } from 'payload'
import configPromise from '../payload.config'
import { importMap } from '../app/(payload)/admin/customImportMap'

const payload = await getPayload({ config: configPromise, importMap })
console.log('Payload schema push complete.')
await (payload.db as any).destroy?.()
process.exit(0)
