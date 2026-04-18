import Link from "next/link";

export const metadata = { title: "About · VoltPak" };

export default function AboutPage() {
  return (
    <div className="pt-28 md:pt-32 pb-24">
      {/* ── INTRO ── */}
      <div className="max-w-3xl mx-auto px-6 md:px-8">
        <p className="text-eyebrow uppercase text-accent-hover mb-3">About VoltPak</p>
        <h1 className="font-display text-display text-ink-900">
          Power, exposed.
        </h1>
        <div className="mt-10 space-y-6 text-lg text-ink-500 leading-relaxed">
          <p>
            VoltPak builds portable inverter systems for people who want to understand
            their gear. Not just use it — understand it. Open it, mod it, and trust it
            because they've seen what's inside.
          </p>
          <p>
            Most portable power stations are sealed appliances.
            Gloss plastic. Hidden fans. Proprietary screws. You press a button and
            hope it works. We think that's the wrong approach — especially for
            something you're counting on.
          </p>
          <p>
            So we started from a different premise: <em className="text-ink-700 not-italic font-medium">function dictates form</em>.
            Every vent exists for airflow. Every fastener is standard hardware.
            Every spec on the display is real. Nothing is decorative.
            Nothing is hidden.
          </p>
        </div>
      </div>

      {/* ── DESIGN PILLARS ── */}
      <div className="mt-24 bg-ink-100 py-20">
        <div className="max-w-container mx-auto px-6 md:px-8">
          <p className="text-eyebrow uppercase text-accent-hover mb-4">Our principles</p>
          <h2 className="font-display text-section text-ink-900 mb-14">
            What we believe about hardware.
          </h2>
          <div className="grid md:grid-cols-2 gap-10">
            {[
              {
                n: "01",
                t: "Functional futurism",
                b: "Design should communicate what a product does — not what it costs. Airflow geometry is honest. Smooth surfaces are theater.",
              },
              {
                n: "02",
                t: "Transparent by default",
                b: "Real-time wattage. Port-level LED status. Thermal readout on screen. If the system knows it, you should too.",
              },
              {
                n: "03",
                t: "Mod-friendly, not mod-hostile",
                b: "Internal mounting points, standard M3 screws, isolated battery compartment. We ship with the assumption you'll want to look inside.",
              },
              {
                n: "04",
                t: "Honest power",
                b: "We don't round up. Rated capacity, tested output, actual noise figures. If a spec isn't verified, it doesn't go on the box.",
              },
            ].map((p) => (
              <div key={p.t} className="flex gap-5">
                <div className="text-accent-hover tabular text-sm font-semibold mt-1 flex-shrink-0">
                  {p.n}
                </div>
                <div>
                  <div className="text-xl font-semibold text-ink-900">{p.t}</div>
                  <p className="mt-2 text-ink-500 leading-relaxed">{p.b}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── PRODUCT DETAIL IMAGE ── */}
      <div className="max-w-container mx-auto px-6 md:px-8 mt-20">
        <div className="grid md:grid-cols-2 gap-4 rounded-2xl overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/media/front-ports.jpg" alt="VoltPak port array" className="w-full aspect-[4/3] object-cover rounded-2xl" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/media/rear.jpg" alt="VoltPak rear vents" className="w-full aspect-[4/3] object-cover rounded-2xl" />
        </div>
        <p className="mt-4 text-xs text-ink-500 text-center">
          Left: port array — USB-A, USB-C, and AC outlets with individual status LEDs.
          Right: rear exhaust geometry — functional, not styled.
        </p>
      </div>

      {/* ── WHO IT'S FOR ── */}
      <div className="max-w-3xl mx-auto px-6 md:px-8 mt-20">
        <p className="text-eyebrow uppercase text-accent-hover mb-3">Who it's for</p>
        <h2 className="font-display text-section text-ink-900 mb-6">
          Built for people with a screwdriver and a question.
        </h2>
        <div className="space-y-5 text-lg text-ink-500 leading-relaxed">
          <p>
            If you've ever soldered a Raspberry Pi hat, swapped a laptop battery,
            or printed an enclosure from Printables — VoltPak was built around
            the way you think about hardware.
          </p>
          <p>
            You can buy the complete kit: inverter, 256 Wh LFP battery, display,
            and full I/O in one chassis. Or you can buy the inverter core and
            wire it to your own battery pack. Either way, the screws are Phillips,
            the tolerances are documented, and the internals are laid out to make sense.
          </p>
          <p>
            This isn't a product for passive use. It's a product for people who
            want to understand what they own.
          </p>
        </div>
      </div>

      {/* ── BOTTOM CTA ── */}
      <div className="max-w-container mx-auto px-6 md:px-8 mt-24">
        <div className="bg-ink-900 text-white rounded-2xl p-10 md:p-16 text-center relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{ background: "radial-gradient(circle at 50% 120%, #00D4FF 0%, transparent 55%)" }}
          />
          <div className="relative">
            <p className="text-eyebrow uppercase text-accent mb-4">Get started</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold">
              "I could open this. I could understand this."
            </h2>
            <p className="mt-4 text-ink-300 max-w-lg mx-auto">
              That feeling is the product. Start with the VoltPak 1000 or
              spec out your own build.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
              <Link
                href="/products/voltpak-1000"
                className="h-12 px-8 inline-flex items-center justify-center rounded-full bg-white text-ink-900 font-semibold hover:bg-ink-100 transition"
              >
                Explore VoltPak 1000
              </Link>
              <Link
                href="/shop"
                className="h-12 px-8 inline-flex items-center justify-center rounded-full border border-white/30 text-white font-semibold hover:bg-white/10 transition"
              >
                Browse the lineup →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
