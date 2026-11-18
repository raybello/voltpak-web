import { formatPrice } from "@/lib/format";
import { ProductDetail } from "@/lib/specs";
import { Product } from "@/lib/products";
import { isPreLaunch, PRE_LAUNCH_PRICE_LABEL } from "@/lib/config";
import NotifyMeButton from "@/components/product/NotifyMeButton";

export default function ProductHero({
  product,
  detail,
}: {
  product: Product;
  detail: ProductDetail;
}) {
  const preLaunch = isPreLaunch(product);

  return (
    <section
      id="overview"
      className="relative bg-ink-900 text-white overflow-hidden noise"
    >
      {/* Subtle glow behind product image side */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 70% at 75% 50%, #00D4FF 0%, transparent 60%)" }}
      />

      <div className="relative max-w-container mx-auto px-6 md:px-8 pt-28 pb-20 md:pb-28">
        <div className="grid md:grid-cols-[55%_45%] gap-10 md:gap-16 items-center">

          {/* ── Left: identity, specs, CTA ── */}
          <div className="order-2 md:order-1">
            <p className="text-eyebrow uppercase text-accent mb-4 tracking-widest">{product.name}</p>
            <h1 className="font-display text-hero">
              {detail.heroTagline.lineA}
              <br />
              <span className="bg-gradient-to-r from-accent to-white bg-clip-text text-transparent">
                {detail.heroTagline.lineB}
              </span>
            </h1>
            <p className="mt-5 text-lg text-ink-300 max-w-xl leading-relaxed">
              {detail.shortDesc}
            </p>

            {/* Key highlights — the top-line numbers */}
            {detail.highlights.length > 0 && (
              <div className="mt-8 grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
                {detail.highlights.map((h) => (
                  <div key={h.label}>
                    <div className="font-display text-xl md:text-2xl font-bold tabular text-white whitespace-nowrap">{h.stat}</div>
                    <div className="text-xs text-ink-500 mt-1 uppercase tracking-wider">{h.label}</div>
                    {h.note && <div className="text-xs text-ink-700 mt-0.5">{h.note}</div>}
                  </div>
                ))}
              </div>
            )}

            {/* Price / availability */}
            <div className="mt-8">
              {preLaunch ? (
                <p className="text-sm font-semibold uppercase tracking-widest text-accent">
                  {PRE_LAUNCH_PRICE_LABEL} · Pricing announced at launch
                </p>
              ) : (
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold tabular">{formatPrice(product.price)}</span>
                  {product.compareAt && (
                    <span className="text-ink-500 line-through tabular text-lg">{formatPrice(product.compareAt)}</span>
                  )}
                </div>
              )}
            </div>

            <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-3">
              {preLaunch ? (
                <NotifyMeButton product={product} variant="hero" />
              ) : (
                <a
                  href="#buy"
                  className="h-12 px-8 inline-flex items-center justify-center rounded-full bg-white text-ink-900 font-semibold hover:bg-ink-100 transition"
                >
                  Buy — {formatPrice(product.price)}
                </a>
              )}
              <a
                href="#features"
                className="h-12 px-8 inline-flex items-center justify-center rounded-full border border-white/30 text-white font-semibold hover:bg-white/10 transition"
              >
                See full specs ↓
              </a>
            </div>
          </div>

          {/* ── Right: product image ── */}
          <div className="order-1 md:order-2 flex items-center justify-center">
            <div className="relative w-full max-w-xs md:max-w-none mx-auto aspect-square">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain drop-shadow-2xl"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
