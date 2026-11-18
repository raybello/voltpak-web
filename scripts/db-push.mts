// CI/build schema-push helper. Run with NODE_ENV=development so the postgres
// adapter's `push: true` fires and creates all tables before next build.
//
// Payload v3 loadEnv.js does `require('@next/env').default.loadEnvConfig`,
// but Next.js 16 exports loadEnvConfig as a named export with no .default.
// Pre-require the module and add .default before payload imports it.
import { createRequire } from 'module'
const _require = createRequire(import.meta.url)
const nextEnv = _require('@next/env')
if (nextEnv && !nextEnv.default) {
  nextEnv.default = { loadEnvConfig: nextEnv.loadEnvConfig }
}

const { getPayload } = await import('payload')
const { default: configPromise } = await import('../payload.config')
const { importMap } = await import('../app/(payload)/admin/customImportMap')

const payload = await getPayload({ config: configPromise, importMap })
console.log('Payload schema push complete.')
await (payload.db as any).destroy?.()
process.exit(0)
