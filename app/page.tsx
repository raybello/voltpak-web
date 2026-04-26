import Link from "next/link";
import { PRODUCTS, FLAGSHIP } from "@/lib/products";
import { formatPrice } from "@/lib/format";
import { isPreLaunch, PRE_LAUNCH_PRICE_LABEL } from "@/lib/config";

export default function Home() {
  const stations = PRODUCTS.filter((p) => p.category === "power-station");

  return (
    <>
      {/* ───────────────────────── HERO ───────────────────────── */}
      <section className="relative h-screen min-h-[680px] flex items-end justify-center bg-ink-900 text-white overflow-hidden noise">
        <video
          className="absolute inset-0 w-full h-full object-cover opacity-80"
          src="/media/hero.mp4"
          autoPlay
          loop
          muted
          playsInline
          poster="/media/hero.png"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-900/40 via-transparent to-ink-900/80" />
        <div className="relative max-w-container mx-auto px-6 md:px-8 pb-24 text-center">
          <p className="text-eyebrow uppercase text-accent mb-4 tracking-widest">Built to be open</p>
          <h1 className="font-display text-hero">
            Power, without
            <br />
            the mystery.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-ink-300 max-w-2xl mx-auto">
            A modular inverter system engineered for tinkerers, hackers, and anyone
            who believes their gear should make sense. 256 Wh. Fully serviceable.
            No black box.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href={`/products/${FLAGSHIP.slug}`}
              className="h-12 px-8 inline-flex items-center justify-center rounded-full bg-white text-ink-900 font-semibold hover:bg-ink-100 transition"
            >
              Explore VoltPak 1000
            </Link>
            <Link
              href="/shop"
              className="h-12 px-8 inline-flex items-center justify-center rounded-full border border-white/30 text-white font-semibold hover:bg-white/10 transition"
            >
              See the full lineup →
            </Link>
          </div>
        </div>
      </section>

      {/* ───────────────────────── THREE PILLARS ───────────────────────── */}
      <section className="bg-ink-900 text-white border-t border-white/10 py-6">
        <div className="max-w-container mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
            {[
              { label: "Modular by design", sub: "Swap the battery. Upgrade the core." },
              { label: "Hackable by intent", sub: "Standard fasteners. Open internals." },
              { label: "Minimal by necessity", sub: "No gloss. No theater. Just function." },
            ].map((p) => (
              <div key={p.label} className="py-5 sm:py-4 sm:px-10 first:pl-0 last:pr-0">
                <div className="text-sm font-semibold text-white">{p.label}</div>
                <div className="text-xs text-ink-500 mt-1">{p.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────── CATEGORY TILES ───────────────────────── */}
      <section className="bg-white py-24 md:py-section">
        <div className="max-w-container mx-auto px-6 md:px-8">
          <div className="mb-10 reveal">
            <p className="text-eyebrow uppercase text-accent-hover mb-3">The system</p>
            <h2 className="font-display text-section text-ink-900">
              Every component does its job.
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { title: "Power Stations", href: "/shop", img: "/media/product-front.png", sub: "Integrated inverter + battery" },
              { title: "Expansion Batteries", href: "/shop?category=battery", img: "/media/battery.png", sub: "Add capacity, stay modular" },
              { title: "Solar Panels", href: "/shop?category=solar", img: "/media/lifestyle.png", sub: "Foldable or rigid, weather-sealed" },
              // { title: "Accessories", href: "/shop?category=accessory", img: "/media/front-ports.jpg", sub: "Cables, adapters, add-ons" },
            ].map((t, i) => (
              <Link
                key={t.title}
                href={t.href}
                className="reveal group relative rounded-2xl overflow-hidden aspect-[4/5] bg-ink-100"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={t.img}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-smooth group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-900/85 via-ink-900/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <div className="text-lg md:text-xl font-semibold">{t.title}</div>
                  <div className="mt-1 text-xs text-ink-300">{t.sub}</div>
                  <div className="mt-2 text-sm text-ink-300 flex items-center gap-1">
                    Shop <span aria-hidden>→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────── DESIGN PHILOSOPHY ───────────────────────── */}
      <section className="bg-ink-900 text-white py-24 md:py-section overflow-hidden">
        <div className="max-w-container mx-auto px-6 md:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="reveal">
              <p className="text-eyebrow uppercase text-accent mb-4">Design philosophy</p>
              <h2 className="font-display text-section">
                Function dictates form.
              </h2>
              <p className="mt-6 text-ink-300 leading-relaxed">
                Every vent, port, and fastener on a VoltPak exists because it has to.
                No decorative grilles. No gloss finishes. No mystery about what's inside.
              </p>
              <p className="mt-4 text-ink-300 leading-relaxed">
                Matte ABS chassis. Visible airflow paths. Standard hardware.
                The kind of product you can open, understand, and make your own.
              </p>
              <div className="mt-8 flex flex-wrap gap-6 text-sm">
                {["Matte ABS chassis", "Non-proprietary fasteners", "Mod-ready internals", "3-inch touchscreen"].map((f) => (
                  <div key={f} className="flex items-center gap-2 text-ink-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
            </div>
            <div className="reveal aspect-[4/3] rounded-2xl overflow-hidden bg-ink-800">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/media/front-qtr.jpg" alt="VoltPak design detail" className="w-full h-full object-cover opacity-90" />
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────── WHY VOLTPAK ───────────────────────── */}
      <section className="bg-ink-100 py-24 md:py-section">
        <div className="max-w-container mx-auto px-6 md:px-8 text-center">
          <p className="text-eyebrow uppercase text-accent-hover mb-4 reveal">
            Why VoltPak
          </p>
          <h2 className="font-display text-section text-ink-900 reveal">
            Engineered for people who ask how it works.
          </h2>
          <div className="mt-16 grid md:grid-cols-3 gap-10">
            {[
              {
                n: "01",
                t: "Transparent",
                b: "Touchscreen shows real-time wattage, battery state, port status, and temperatures. No hidden states. No guesswork.",
              },
              {
                n: "02",
                t: "Modular",
                b: "Buy the inverter core standalone. Bring your own battery. Expand when you need to. Upgrade without replacing everything.",
              },
              {
                n: "03",
                t: "Serviceable",
                b: "Standard screws throughout. Replaceable panels. Battery compartment isolated. Designed to be opened, not voided.",
              },
            ].map((p, i) => (
              <div
                key={p.t}
                className="reveal text-left"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="text-accent-hover tabular text-sm font-semibold mb-3">
                  {p.n}
                </div>
                <div className="text-2xl font-display font-semibold text-ink-900">
                  {p.t}
                </div>
                <p className="mt-3 text-ink-500">{p.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────── USE CASES ───────────────────────── */}
      <section className="bg-white py-24 md:py-section">
        <div className="max-w-container mx-auto px-6 md:px-8 mb-12">
          <div className="flex justify-between items-end flex-wrap gap-4 reveal">
            <div>
              <p className="text-eyebrow uppercase text-accent-hover mb-4">Use cases</p>
              <h2 className="font-display text-section text-ink-900">
                Wherever the work happens.
              </h2>
            </div>
            <Link
              href="/shop"
              className="text-sm font-semibold text-ink-900 hover:text-accent-hover"
            >
              Shop all →
            </Link>
          </div>
        </div>

        <div className="overflow-x-auto no-scrollbar">
          <div className="flex gap-5 px-6 md:px-8 pb-2 max-w-container mx-auto">
            {[
              { t: "Makers & Hackers", b: "Power your bench. Mod it if you want. We designed for that.", img: "/media/hacker.png" },
              { t: "Van life & off-grid", b: "Silent. Compact. Runs all night off a 220W panel.", img: "/media/van-life.png" },
              { t: "Job site", b: "Circular saw, lights, drill - all day, no generator.", img: "/media/job-site.png" },
              { t: "Home backup", b: "Fridge, router, CPAP. Ready before the outage starts.", img: "/media/home-life.png" },
              // { t: "Disaster prep", b: "100% charge in 1.8 hours from the wall. Always ready.", img: "/media/side.png" },
            ].map((c) => (
              <div
                key={c.t}
                className="relative flex-shrink-0 w-[300px] md:w-[380px] aspect-[4/5] rounded-2xl overflow-hidden bg-ink-900"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.img} alt="" className="absolute inset-0 w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-900/90 via-ink-900/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <div className="text-xl font-semibold">{c.t}</div>
                  <p className="mt-1 text-sm text-ink-300">{c.b}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────── LINEUP ───────────────────────── */}
      <section className="bg-ink-100 py-24 md:py-section">
        <div className="max-w-container mx-auto px-6 md:px-8">
          <div className="mb-12 reveal">
            <p className="text-eyebrow uppercase text-accent-hover mb-4">The lineup</p>
            <h2 className="font-display text-section text-ink-900">
              Pick your build.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {stations.concat(PRODUCTS.filter(p => p.category === "battery")).slice(0, 3).map((p, i) => (
              <Link
                key={p.id}
                href={`/products/${p.slug}`}
                className="reveal group bg-white rounded-2xl overflow-hidden border border-ink-100 flex flex-col"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="aspect-square bg-ink-100 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-smooth group-hover:scale-105"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="text-xl font-semibold text-ink-900">{p.name}</div>
                  <p className="mt-1 text-ink-500 text-sm">{p.tagline}</p>
                  {p.stats && (
                    <div className="mt-4 flex gap-4 text-xs text-ink-500">
                      {p.stats.capacity && <span>{p.stats.capacity}</span>}
                      {p.stats.output && <span>· {p.stats.output}</span>}
                    </div>
                  )}
                  <div className="mt-auto pt-4 flex items-baseline justify-between">
                    {isPreLaunch(p) ? (
                      <span className="text-lg font-semibold text-accent-hover">
                        {PRE_LAUNCH_PRICE_LABEL}
                      </span>
                    ) : (
                      <span className="text-lg font-semibold text-ink-900 tabular">
                        {formatPrice(p.price)}
                      </span>
                    )}
                    <span className="text-sm text-accent-hover font-semibold group-hover:translate-x-1 transition-transform">
                      {isPreLaunch(p) ? "Notify me →" : "View specs →"}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center reveal">
            <Link
              href="/shop"
              className="h-12 px-8 inline-flex items-center justify-center rounded-full border border-ink-900 text-ink-900 font-semibold hover:bg-ink-900 hover:text-white transition"
            >
              Browse all products →
            </Link>
          </div>
        </div>
      </section>

      {/* ───────────────────────── SOCIAL PROOF ───────────────────────── */}
      <section className="bg-white py-24 md:py-section">
        <div className="max-w-container mx-auto px-6 md:px-8">
          <div className="text-center mb-12 reveal">
            <p className="text-eyebrow uppercase text-accent-hover mb-4">From the community</p>
            <p className="font-display text-section text-ink-900">
              4.9 / 5 from 2,300+ verified buyers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                q: "Finally a power station I can actually open. Swapped the fan for a quieter one in 20 minutes. Everything is exactly where you'd expect it.",
                n: "T. Nakamura",
                c: "Verified buyer · Maker / Electronics",
              },
              {
                q: "Ran our fridge, router and CPAPs through a 14-hour outage without a hiccup. The display showing real wattage draw is genuinely useful.",
                n: "Jordan M.",
                c: "Verified buyer · Home backup",
              },
              {
                q: "Bought the inverter core first with my own LiFePO4 pack. Worked first try. Added the VoltPak battery six months later. Exactly as advertised.",
                n: "Sam R.",
                c: "Verified buyer · DIY build",
              },
            ].map((t, i) => (
              <div
                key={t.n}
                className="reveal bg-ink-100 rounded-2xl p-6"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <p className="text-ink-700 leading-relaxed">&ldquo;{t.q}&rdquo;</p>
                <div className="mt-5 text-sm">
                  <div className="font-semibold text-ink-900">{t.n}</div>
                  <div className="text-ink-500">{t.c}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-ink-500 text-xs uppercase tracking-widest reveal">
            <span>Featured in</span>
            {["Hackaday", "Wirecutter", "Engadget", "Tom's Hardware", "Make:"].map((p) => (
              <span key={p} className="font-semibold text-ink-700">{p}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────── FINAL CTA ───────────────────────── */}
      <section className="relative bg-ink-900 text-white py-32 overflow-hidden noise">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background: "radial-gradient(circle at 50% 100%, #00D4FF 0%, transparent 50%)",
          }}
        />
        <div className="relative max-w-container mx-auto px-6 md:px-8 text-center">
          <p className="text-eyebrow uppercase text-accent mb-4">Stay in the loop</p>
          <h2 className="font-display text-display">
            Designed for the curious.
          </h2>
          <p className="mt-6 text-ink-300 text-lg max-w-xl mx-auto">
            Early access, mod guides, teardowns, and firmware updates - straight to your inbox. No noise.
          </p>
          <form className="mt-8 max-w-md mx-auto flex gap-2">
            <input
              type="email"
              placeholder="Email address"
              className="flex-1 h-12 bg-white/10 border border-white/20 rounded-full px-5 text-white placeholder:text-ink-300 focus:outline-none focus:border-accent"
            />
            <button className="h-12 px-6 rounded-full bg-white text-ink-900 font-semibold hover:bg-ink-100 transition">
              Join
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
