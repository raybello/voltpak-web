import Link from "next/link";
import { PRODUCTS } from "@/lib/products";

// Renders a small "works with" card grid for the product pages where
// it's relevant (expansion battery, solar, accessories).  Accepts a
// list of product ids it's compatible with.
export default function CompatibilityMatrix({
  compatibleWith,
  title = "Works with",
  eyebrow = "Compatibility",
}: {
  compatibleWith: string[];
  title?: string;
  eyebrow?: string;
}) {
  const items = compatibleWith
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter(Boolean) as typeof PRODUCTS;

  if (items.length === 0) return null;

  return (
    <section className="bg-white py-24 md:py-section">
      <div className="max-w-container mx-auto px-6 md:px-8">
        <div className="max-w-2xl mb-12 reveal">
          <p className="text-eyebrow uppercase text-accent-hover mb-4">{eyebrow}</p>
          <h2 className="font-display text-section text-ink-900">{title}</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {items.map((p, i) => (
            <Link
              key={p.id}
              href={`/products/${p.slug}`}
              className="reveal group rounded-2xl overflow-hidden border border-ink-100 bg-white"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="aspect-square bg-ink-100 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-smooth group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <div className="text-sm font-semibold text-ink-900">{p.name}</div>
                <div className="text-xs text-ink-500 mt-1">
                  {p.stats?.capacity || p.stats?.output || "Accessory"}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
