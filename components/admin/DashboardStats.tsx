import { getPayload } from 'payload'
import configPromise from '@payload-config'

type CategoryCount = { label: string; count: number }

async function getStats() {
  try {
    const payload = await getPayload({ config: configPromise })
    const { docs, totalDocs } = await payload.find({
      collection: 'products',
      limit: 100,
      depth: 0,
    })

    const byCategory: Record<string, number> = {}
    for (const doc of docs) {
      const cat = (doc as any).category as string
      byCategory[cat] = (byCategory[cat] ?? 0) + 1
    }

    const categories: CategoryCount[] = Object.entries(byCategory).map(([label, count]) => ({
      label,
      count,
    }))

    const { totalDocs: mediaCount } = await payload.find({
      collection: 'media',
      limit: 0,
      depth: 0,
    })

    const { totalDocs: userCount } = await payload.find({
      collection: 'users',
      limit: 0,
      depth: 0,
    })

    return { totalProducts: totalDocs, categories, mediaCount, userCount }
  } catch {
    return { totalProducts: 0, categories: [], mediaCount: 0, userCount: 0 }
  }
}

const CATEGORY_LABELS: Record<string, string> = {
  'power-station': 'Power Stations',
  battery: 'Batteries',
  solar: 'Solar Panels',
  accessory: 'Accessories',
  bundle: 'Bundles',
}

export default async function DashboardStats() {
  const { totalProducts, categories, mediaCount, userCount } = await getStats()

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '1rem',
        marginBottom: '2rem',
      }}
    >
      <StatCard
        label="Total Products"
        value={String(totalProducts)}
        href="/admin/collections/products"
        accent="#00A8CC"
      />
      <StatCard
        label="Media Files"
        value={String(mediaCount)}
        href="/admin/collections/media"
        accent="#6366f1"
      />
      <StatCard
        label="Admin Users"
        value={String(userCount)}
        href="/admin/collections/users"
        accent="#f59e0b"
      />
      {categories.map(({ label, count }) => (
        <StatCard
          key={label}
          label={CATEGORY_LABELS[label] ?? label}
          value={String(count)}
          href={`/admin/collections/products?where[category][equals]=${label}`}
          accent="#10b981"
        />
      ))}
    </div>
  )
}

function StatCard({
  label,
  value,
  href,
  accent,
}: {
  label: string
  value: string
  href: string
  accent: string
}) {
  return (
    <a
      href={href}
      style={{
        display: 'block',
        padding: '1.25rem',
        borderRadius: '0.5rem',
        border: '1px solid var(--theme-elevation-150, #e5e7eb)',
        background: 'var(--theme-elevation-50, #fafafa)',
        textDecoration: 'none',
        color: 'inherit',
        transition: 'border-color 0.15s',
      }}
    >
      <div
        style={{
          fontSize: '2rem',
          fontWeight: 700,
          lineHeight: 1,
          color: accent,
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {value}
      </div>
      <div
        style={{
          marginTop: '0.375rem',
          fontSize: '0.8125rem',
          color: 'var(--theme-elevation-500, #6b7280)',
          textTransform: 'capitalize',
        }}
      >
        {label}
      </div>
    </a>
  )
}
