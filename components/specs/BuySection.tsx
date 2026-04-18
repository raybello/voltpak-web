import BuyCard from "@/components/product/BuyCard";
import { Product } from "@/lib/products";

export default function BuySection({ product }: { product: Product }) {
  return (
    <section
      id="buy"
      className="bg-ink-100 py-24 md:py-section border-t border-ink-100"
    >
      <div className="max-w-container mx-auto px-6 md:px-8 grid md:grid-cols-2 gap-12 items-start">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.image}
            alt={product.name}
            className="w-full rounded-2xl bg-white object-contain aspect-square"
          />
        </div>
        <div>
          <BuyCard product={product} />
        </div>
      </div>
    </section>
  );
}
