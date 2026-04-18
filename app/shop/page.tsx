import Link from "next/link";
import { PRODUCTS } from "@/lib/products";
import { formatPrice } from "@/lib/format";

export const metadata = { title: "Shop · VoltPak" };

const CATEGORIES = [
  { key: "all", label: "All" },
  { key: "power-station", label: "Power Stations" },
  { key: "battery", label: "Batteries" },
  { key: "solar", label: "Solar" },
  { key: "bundle", label: "Bundles" },
  { key: "accessory", label: "Accessories" },
];

export default function ShopPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const cat = searchParams.category ?? "all";
  const list =
    cat === "all"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === cat);

  return (
    <div className="pt-28 md:pt-32 pb-24">
      <div className="max-w-container mx-auto px-6 md:px-8">
        <div className="mb-10">
          <p className="text-eyebrow uppercase text-accent-hover mb-3">Shop</p>
          <h1 className="font-display text-display text-ink-900">Pick your build.</h1>
          <p className="mt-4 text-ink-500 max-w-2xl">
            Start with a complete system or build from the inverter core up.
            Every component is designed to work together — and designed to be understood.
          </p>
        </div>

        {/* Filter bar */}
        <div className="mb-10 flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <Link
              key={c.key}
              href={c.key === "all" ? "/shop" : `/shop?category=${c.key}`}
              className={`h-9 px-4 inline-flex items-center rounded-full text-sm transition border ${
                cat === c.key
                  ? "bg-ink-900 text-white border-ink-900"
                  : "bg-white text-ink-700 border-ink-100 hover:border-ink-300"
              }`}
            >
              {c.label}
            </Link>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {list.map((p) => (
            <Link
              key={p.id}
              href={`/products/${p.slug}`}
              className="group bg-white rounded-2xl overflow-hidden border border-ink-100 flex flex-col hover:border-ink-300 transition"
            >
              <div className="aspect-square bg-ink-100 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-smooth group-hover:scale-105"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <div className="text-base font-semibold text-ink-900">{p.name}</div>
                <p className="mt-1 text-sm text-ink-500 line-clamp-2">
                  {p.tagline}
                </p>
                {p.stats && (
                  <div className="mt-3 flex flex-wrap gap-3 text-xs text-ink-500">
                    {p.stats.capacity && (
                      <span className="bg-ink-100 px-2 py-0.5 rounded-full">{p.stats.capacity}</span>
                    )}
                    {p.stats.output && (
                      <span className="bg-ink-100 px-2 py-0.5 rounded-full">{p.stats.output}</span>
                    )}
                    {p.stats.weight && (
                      <span className="bg-ink-100 px-2 py-0.5 rounded-full">{p.stats.weight}</span>
                    )}
                  </div>
                )}
                <div className="mt-auto pt-4 flex items-center justify-between">
                  <div>
                    <span className="text-base font-semibold text-ink-900 tabular">
                      {formatPrice(p.price)}
                    </span>
                    {p.compareAt && (
                      <span className="ml-2 text-xs text-ink-500 line-through tabular">
                        {formatPrice(p.compareAt)}
                      </span>
                    )}
                  </div>
                  <span className="text-sm text-accent-hover font-semibold group-hover:translate-x-1 transition-transform">
                    View →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom note */}
        <div className="mt-16 border-t border-ink-100 pt-12 grid md:grid-cols-3 gap-8 text-sm text-ink-500">
          {[
            { t: "Free US shipping", b: "On all orders over $500. Expedited available at checkout." },
            { t: "30-day returns", b: "If it's not right, return it. No questions, no restocking fee." },
            { t: "5-year warranty", b: "Standard on all VoltPak hardware. Extend to 7 with registration." },
          ].map((n) => (
            <div key={n.t}>
              <div className="font-semibold text-ink-900 mb-1">{n.t}</div>
              <p>{n.b}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
