// TEMPORARY — delete this file after seeding. Only accessible locally.
import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { PRODUCTS } from '@/lib/products'
import { SPECS } from '@/lib/specs'

export const dynamic = 'force-dynamic'
export const maxDuration = 60

export async function POST(req: Request) {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Only available in development' }, { status: 403 })
  }

  const payload = await getPayload({ config: configPromise })

  // Clear existing products
  const existing = await payload.find({ collection: 'products', limit: 200 })
  for (const doc of existing.docs) {
    await payload.delete({ collection: 'products', id: doc.id })
  }

  const seeded: string[] = []

  for (const product of PRODUCTS) {
    const detail = SPECS[product.id]
    if (!detail) continue

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
        imagePath: product.image,
        stats: product.stats
          ? {
              capacity: product.stats.capacity ?? null,
              output: product.stats.output ?? null,
              weight: product.stats.weight ?? null,
            }
          : null,
        shortDesc: detail.shortDesc,
        longDesc: detail.longDesc,
        heroTagline: { lineA: detail.heroTagline.lineA, lineB: detail.heroTagline.lineB },
        heroMediaType: detail.heroMedia.type,
        heroMediaPath: detail.heroMedia.src,
        highlights: detail.highlights.map((h) => ({ stat: h.stat, label: h.label, note: h.note ?? null })),
        features: detail.features.map((f) => ({
          featureId: f.id,
          eyebrow: f.eyebrow,
          title: f.title,
          body: f.body,
          featureMediaType: f.media.type,
          featureMediaPath: f.media.src,
          featureMediaAlt: f.media.alt,
          callouts: f.callouts?.map((c) => ({ label: c.label, value: c.value })) ?? [],
          tone: f.tone ?? null,
        })),
        inTheBox: detail.inTheBox.map((item) => ({ item })),
        specs: detail.specs.map((s) => ({
          group: s.group,
          rows: s.rows.map((r) => ({ label: r.label, value: r.value, note: r.note ?? null })),
        })),
        faq: detail.faq.map((f) => ({ q: f.q, a: f.a })),
        compareAgainst: detail.compareAgainst?.map((key) => ({ benchmarkKey: key })) ?? [],
        certifications: detail.certifications.map((cert) => ({ cert })),
        warranty: { unit: detail.warranty.unit, battery: detail.warranty.battery, accessories: detail.warranty.accessories ?? null },
        shipping: { usFreeOver: detail.shipping.usFreeOver, intlAvailable: detail.shipping.intlAvailable },
      },
    })
    seeded.push(product.name)
  }

  // Second pass: wire up compatibleWith relationships
  for (const product of PRODUCTS) {
    const detail = SPECS[product.id]
    if (!detail?.compatibleWith?.length) continue

    const { docs } = await payload.find({ collection: 'products', where: { productId: { equals: product.id } }, limit: 1 })
    if (!docs[0]) continue

    const relatedIds: (number | string)[] = []
    for (const relatedId of detail.compatibleWith) {
      const { docs: rel } = await payload.find({ collection: 'products', where: { productId: { equals: relatedId } }, limit: 1 })
      if (rel[0]) relatedIds.push(rel[0].id)
    }
    if (relatedIds.length) {
      await payload.update({ collection: 'products', id: docs[0].id, data: { compatibleWith: relatedIds } })
    }
  }

  return NextResponse.json({ ok: true, seeded })
}
