import Link from "next/link";
import { formatPrice } from "@/lib/format";

export default function FinalCta({
  name,
  price,
  headline = "Ready when the lights aren't.",
}: {
  name: string;
  price: number;
  headline?: string;
}) {
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
          {formatPrice(price)} · Free shipping · 5-year warranty
        </p>
        <div className="mt-10">
          <Link
            href="#buy"
            className="h-14 px-10 inline-flex items-center justify-center rounded-full bg-accent text-ink-900 font-semibold hover:bg-white transition"
          >
            Buy {name}
          </Link>
        </div>
      </div>
    </section>
  );
}
