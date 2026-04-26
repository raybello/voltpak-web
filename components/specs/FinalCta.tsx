import Link from "next/link";
import { formatPrice } from "@/lib/format";
import { Product } from "@/lib/products";
import { isPreLaunch, PRE_LAUNCH_PRICE_LABEL } from "@/lib/config";
import NotifyMeButton from "@/components/product/NotifyMeButton";

export default function FinalCta({
  product,
  headline = "Ready when the lights aren't.",
}: {
  product: Product;
  headline?: string;
}) {
  const preLaunch = isPreLaunch(product);

  return (
    <section className="relative bg-ink-900 text-white py-32 overflow-hidden noise">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, #00D4FF 0%, transparent 50%)",
        }}
      />
      <div className="relative max-w-container mx-auto px-6 md:px-8 text-center">
        <h2 className="font-display text-display">{headline}</h2>
        <p className="mt-6 text-ink-300 text-lg">
          {preLaunch
            ? `${PRE_LAUNCH_PRICE_LABEL} · Free shipping · 5-year warranty`
            : `${formatPrice(product.price)} · Free shipping · 5-year warranty`}
        </p>
        <div className="mt-10">
          {preLaunch ? (
            <NotifyMeButton
              product={product}
              variant="dark"
              label={`Notify me - ${product.name}`}
            />
          ) : (
            <Link
              href="#buy"
              className="h-14 px-10 inline-flex items-center justify-center rounded-full bg-accent text-ink-900 font-semibold hover:bg-white transition"
            >
              Buy {product.name}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
