import { formatPrice } from "@/lib/format";
import { ProductDetail } from "@/lib/specs";

export default function ProductHero({
  name,
  price,
  detail,
}: {
  name: string;
  price: number;
  detail: ProductDetail;
}) {
  const hasVideo = detail.heroMedia.type === "video";

  return (
    <section
      id="overview"
      className="relative min-h-screen flex items-center justify-center bg-ink-900 text-white overflow-hidden noise"
    >
      {hasVideo ? (
        <video
          className="absolute inset-0 w-full h-full object-cover opacity-70"
          src={detail.heroMedia.src}
          poster={detail.heroMedia.poster}
          autoPlay
          loop
          muted
          playsInline
        />
      ) : (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={detail.heroMedia.src}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-ink-900/30 via-ink-900/10 to-ink-900/80" />
      <div className="relative max-w-container mx-auto px-6 md:px-8 text-center pt-28 pb-20">
        <p className="text-eyebrow uppercase text-accent mb-4">{name}</p>
        <h1 className="font-display text-hero">
          {detail.heroTagline.lineA}
          <br />
          <span className="bg-gradient-to-r from-accent to-white bg-clip-text text-transparent">
            {detail.heroTagline.lineB}
          </span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-ink-300 max-w-2xl mx-auto">
          {detail.shortDesc}
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="#buy"
            className="h-12 px-8 inline-flex items-center justify-center rounded-full bg-white text-ink-900 font-semibold hover:bg-ink-100 transition"
          >
            Buy - {formatPrice(price)}
          </a>
          <a
            href="#features"
            className="h-12 px-8 inline-flex items-center justify-center rounded-full border border-white/30 text-white font-semibold hover:bg-white/10 transition"
          >
            Learn more ↓
          </a>
        </div>
        <div className="mt-16 animate-bounce text-white/60 text-xs tracking-widest uppercase">
          Scroll ↓
        </div>
      </div>
    </section>
  );
}
