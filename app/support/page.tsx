import Link from "next/link";

export const metadata = { title: "Support · VoltPak" };

export default function SupportPage() {
  return (
    <div className="pt-28 md:pt-32 pb-24">
      <div className="max-w-container mx-auto px-6 md:px-8">
        <div className="max-w-2xl mb-14">
          <p className="text-eyebrow uppercase text-accent-hover mb-3">Support</p>
          <h1 className="font-display text-display text-ink-900">
            Open hardware deserves open support.
          </h1>
          <p className="mt-4 text-ink-500 max-w-lg">
            Manuals, firmware, mod guides, warranty, and direct access to people
            who actually understand the product. Everything you need, one click away.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              t: "Manuals & Hardware Files",
              b: "Quick-start guides, full technical manuals, open PCB files, schematics, and firmware changelog.",
              href: "/support/manuals",
            },
            {
              t: "Mod & Repair Guides",
              b: "Fan swaps, battery compartment access, board layout diagrams, and torque specs.",
              href: "/support/mods",
            },
            {
              t: "Warranty",
              b: "5 years standard on all VoltPak hardware. Register your unit to extend to 7.",
              href: "/support/warranty",
            },
            {
              t: "Returns & Shipping",
              b: "30-day no-questions returns. Free shipping on US orders over $500.",
              href: "/support/returns",
            },
            {
              t: "Battery Health",
              b: "LFP cycle guide, storage voltage recommendations, and firmware diagnostics.",
              href: "/support/battery",
            },
            {
              t: "Contact",
              b: "Weekdays 8 am – 6 pm PT. Real answers within 24 hours, not canned scripts.",
              href: "/support/contact",
            },
          ].map((c) => (
            <Link
              key={c.t}
              href={c.href}
              className="group block bg-white rounded-2xl border border-ink-100 p-6 hover:border-ink-300 transition"
            >
              <div className="text-lg font-semibold text-ink-900">{c.t}</div>
              <p className="mt-2 text-sm text-ink-500 leading-relaxed">{c.b}</p>
              <div className="mt-4 text-sm font-semibold text-accent-hover group-hover:translate-x-1 transition-transform">
                Open →
              </div>
            </Link>
          ))}
        </div>

        {/* Community note */}
        <div className="mt-16 bg-ink-100 rounded-2xl p-8 md:p-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-eyebrow uppercase text-accent-hover mb-3">Community</p>
              <h2 className="font-display text-2xl md:text-3xl text-ink-900 font-semibold">
                The community fixes things faster than we do.
              </h2>
              <p className="mt-4 text-ink-500 leading-relaxed">
                Thousands of tinkerers have documented mods, edge cases, and fixes
                on Reddit, Discord, and Hackaday. We link to the best of it here
                and contribute back whenever we can.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              {[
                { label: "Reddit · r/VoltPak", href: "#", sub: "Mods, builds, questions" },
                { label: "Discord server", href: "#", sub: "Real-time help from the community" },
                { label: "GitHub · Firmware", href: "#", sub: "Open changelog + issue tracker" },
              ].map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className="group flex items-center justify-between bg-white rounded-xl border border-ink-100 px-5 py-4 hover:border-ink-300 transition"
                >
                  <div>
                    <div className="text-sm font-semibold text-ink-900">{l.label}</div>
                    <div className="text-xs text-ink-500 mt-0.5">{l.sub}</div>
                  </div>
                  <span className="text-ink-300 group-hover:text-accent-hover group-hover:translate-x-1 transition">→</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
