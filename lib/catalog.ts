// Payload CMS data layer. Replaces the static PRODUCTS / SPECS arrays.
// All functions are async and use the Payload Local API (zero network hop).
//
// Type adapters map Payload documents back to the existing Product /
// ProductDetail shapes so that all existing components keep working
// without changing their prop types.

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Product } from './products'
import type { ProductDetail } from './specs'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PayloadDoc = Record<string, any>

async function getClient() {
  return getPayload({ config: configPromise })
}

function mediaUrl(
  media: PayloadDoc | string | null | undefined,
  legacyPath?: string | null,
): string {
  if (media) {
    if (typeof media === 'string') return media
    if (media.url) return media.url as string
  }
  return legacyPath ?? '/media/product-front.webp'
}

function toProduct(doc: PayloadDoc): Product {
  return {
    id: doc.productId as string,
    slug: doc.slug as string,
    name: doc.name as string,
    tagline: doc.tagline as string,
    category: doc.category as Product['category'],
    price: doc.price as number,
    compareAt: (doc.compareAt as number) ?? undefined,
    image: mediaUrl(doc.image, doc.imagePath as string | null),
    stats: doc.stats
      ? {
          capacity: (doc.stats.capacity as string) || undefined,
          output: (doc.stats.output as string) || undefined,
          weight: (doc.stats.weight as string) || undefined,
        }
      : undefined,
    preLaunch:
      doc.preLaunch === 'true' ? true : doc.preLaunch === 'false' ? false : undefined,
  }
}

function toProductDetail(doc: PayloadDoc): ProductDetail {
  return {
    id: doc.productId as string,
    shortDesc: doc.shortDesc as string,
    longDesc: doc.longDesc as string,
    heroTagline: {
      lineA: doc.heroTagline?.lineA as string,
      lineB: doc.heroTagline?.lineB as string,
    },
    heroMedia: {
      type: (doc.heroMediaType ?? 'image') as 'image' | 'video',
      src: mediaUrl(doc.heroMedia, doc.heroMediaPath as string | null),
    },
    highlights:
      (doc.highlights as PayloadDoc[])?.map((h) => ({
        stat: h.stat as string,
        label: h.label as string,
        note: (h.note as string) || undefined,
      })) ?? [],
    features:
      (doc.features as PayloadDoc[])?.map((f) => ({
        id: f.featureId as string,
        eyebrow: f.eyebrow as string,
        title: f.title as string,
        body: f.body as string,
        media: {
          type: (f.featureMediaType ?? 'image') as 'image' | 'video',
          src: mediaUrl(f.featureMedia, f.featureMediaPath as string | null),
          alt: f.featureMediaAlt as string,
        },
        callouts:
          (f.callouts as PayloadDoc[])?.map((c) => ({
            label: c.label as string,
            value: c.value as string,
          })) || undefined,
        tone: (f.tone as 'light' | 'dark') || undefined,
      })) ?? [],
    inTheBox: (doc.inTheBox as PayloadDoc[])?.map((i) => i.item as string) ?? [],
    specs:
      (doc.specs as PayloadDoc[])?.map((s) => ({
        group: s.group as string,
        rows:
          (s.rows as PayloadDoc[])?.map((r) => ({
            label: r.label as string,
            value: r.value as string,
            note: (r.note as string) || undefined,
          })) ?? [],
      })) ?? [],
    faq:
      (doc.faq as PayloadDoc[])?.map((f) => ({
        q: f.q as string,
        a: f.a as string,
      })) ?? [],
    compareAgainst:
      (doc.compareAgainst as PayloadDoc[])?.map((c) => c.benchmarkKey as string) ?? undefined,
    certifications:
      (doc.certifications as PayloadDoc[])?.map((c) => c.cert as string) ?? [],
    warranty: {
      unit: doc.warranty?.unit as string,
      battery: doc.warranty?.battery as string,
      accessories: (doc.warranty?.accessories as string) || undefined,
    },
    shipping: {
      usFreeOver: doc.shipping?.usFreeOver as number,
      intlAvailable: (doc.shipping?.intlAvailable as boolean) ?? false,
    },
    compatibleWith:
      (doc.compatibleWith as PayloadDoc[])?.map((p) =>
        typeof p === 'string' ? p : (p.productId as string),
      ) || undefined,
  }
}

// ── Public API ───────────────────────────────────────────────────────────────
// All functions catch DB errors (e.g. tables not yet migrated) and return
// empty results so the build succeeds before the first migration run.

export async function getAllProducts(): Promise<Product[]> {
  try {
    const payload = await getClient()
    const { docs } = await payload.find({ collection: 'products', limit: 100, depth: 1 })
    return docs.map(toProduct)
  } catch {
    return []
  }
}

export async function getProduct(slugOrId: string): Promise<Product | undefined> {
  try {
    const payload = await getClient()
    const { docs } = await payload.find({
      collection: 'products',
      where: {
        or: [{ slug: { equals: slugOrId } }, { productId: { equals: slugOrId } }],
      },
      limit: 1,
      depth: 1,
    })
    return docs[0] ? toProduct(docs[0]) : undefined
  } catch {
    return undefined
  }
}

export async function getProductDetail(slugOrId: string): Promise<ProductDetail | undefined> {
  try {
    const payload = await getClient()
    const { docs } = await payload.find({
      collection: 'products',
      where: {
        or: [{ slug: { equals: slugOrId } }, { productId: { equals: slugOrId } }],
      },
      limit: 1,
      depth: 2,
    })
    return docs[0] ? toProductDetail(docs[0]) : undefined
  } catch {
    return undefined
  }
}

export async function getFlagship(): Promise<Product | undefined> {
  try {
    const payload = await getClient()
    const { docs } = await payload.find({
      collection: 'products',
      where: { productId: { equals: 'vp-1000' } },
      limit: 1,
      depth: 1,
    })
    return docs[0] ? toProduct(docs[0]) : undefined
  } catch {
    return undefined
  }
}

export async function getProductsByCategory(
  category: Product['category'],
): Promise<Product[]> {
  try {
    const payload = await getClient()
    const { docs } = await payload.find({
      collection: 'products',
      where: { category: { equals: category } },
      limit: 100,
      depth: 1,
    })
    return docs.map(toProduct)
  } catch {
    return []
  }
}
