// scripts/seed-payload.ts
//
// Seeds Payload CMS with the existing static product data from lib/products.ts
// and lib/specs.ts. Run once after setting up the database:
//
//   npx tsx scripts/seed-payload.ts
//
// Requires DATABASE_URL and PAYLOAD_SECRET in .env.local.

import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
import { getPayload } from 'payload'
import configPromise from '../payload.config'
import { PRODUCTS } from '../lib/products'
import { SPECS } from '../lib/specs'

async function seed() {
  const payload = await getPayload({ config: configPromise })

  // Clear existing products to avoid duplicates on re-seed.
  const existing = await payload.find({ collection: 'products', limit: 200 })
  for (const doc of existing.docs) {
    await payload.delete({ collection: 'products', id: String(doc.id) })
  }

  for (const product of PRODUCTS) {
    const detail = SPECS[product.id]
    if (!detail) {
      console.warn(`No detail for ${product.id}, skipping`)
      continue
    }

    await payload.create({
      collection: 'products',
      data: {
        productId: product.id,
        slug: product.slug,
        name: product.name,
        tagline: product.tagline,
        category: product.category,
        price: product.price,
        compareAt: product.compareAt ?? null,
        preLaunch: product.preLaunch === true ? 'true' : product.preLaunch === false ? 'false' : 'inherit',
        stats: product.stats
          ? {
              capacity: product.stats.capacity ?? null,
              output: product.stats.output ?? null,
              weight: product.stats.weight ?? null,
            }
          : null,
        shortDesc: detail.shortDesc,
        longDesc: detail.longDesc,
        heroTagline: {
          lineA: detail.heroTagline.lineA,
          lineB: detail.heroTagline.lineB,
        },
        heroMediaType: detail.heroMedia.type,
        highlights: detail.highlights.map((h) => ({
          stat: h.stat,
          label: h.label,
          note: h.note ?? null,
        })),
        features: detail.features.map((f) => ({
          featureId: f.id,
          eyebrow: f.eyebrow,
          title: f.title,
          body: f.body,
          featureMediaType: f.media.type,
          featureMediaAlt: f.media.alt,
          callouts: f.callouts?.map((c) => ({ label: c.label, value: c.value })) ?? [],
          tone: f.tone ?? null,
        })),
        inTheBox: detail.inTheBox.map((item) => ({ item })),
        specs: detail.specs.map((s) => ({
          group: s.group,
          rows: s.rows.map((r) => ({
            label: r.label,
            value: r.value,
            note: r.note ?? null,
          })),
        })),
        faq: detail.faq.map((f) => ({ q: f.q, a: f.a })),
        compareAgainst: detail.compareAgainst?.map((key) => ({ benchmarkKey: key })) ?? [],
        certifications: detail.certifications.map((cert) => ({ cert })),
        warranty: {
          unit: detail.warranty.unit,
          battery: detail.warranty.battery,
          accessories: detail.warranty.accessories ?? null,
        },
        shipping: {
          usFreeOver: detail.shipping.usFreeOver,
          intlAvailable: detail.shipping.intlAvailable,
        },
        // compatibleWith is populated after all products exist via a second pass
      },
    })
    console.log(`Seeded: ${product.name}`)
  }

  // Second pass: wire up compatibleWith relationships by productId
  for (const product of PRODUCTS) {
    const detail = SPECS[product.id]
    if (!detail?.compatibleWith?.length) continue

    const { docs } = await payload.find({
      collection: 'products',
      where: { productId: { equals: product.id } },
      limit: 1,
    })
    if (!docs[0]) continue

    const relatedIds: string[] = []
    for (const relatedProductId of detail.compatibleWith) {
      const { docs: related } = await payload.find({
        collection: 'products',
        where: { productId: { equals: relatedProductId } },
        limit: 1,
      })
      if (related[0]) relatedIds.push(String(related[0].id))
    }

    if (relatedIds.length) {
      await payload.update({
        collection: 'products',
        id: String(docs[0].id),
        data: { compatibleWith: relatedIds },
      })
      console.log(`Linked compatibleWith for ${product.id}: [${relatedIds.join(', ')}]`)
    }
  }

  console.log('Seed complete.')
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
