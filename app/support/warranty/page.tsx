import Link from "next/link";

export const metadata = { title: "Warranty · VoltPak Support" };

export default function WarrantyPage() {
  return (
    <div className="pt-28 md:pt-32 pb-24">
      <div className="max-w-container mx-auto px-6 md:px-8">
        <nav className="mb-8 text-sm text-ink-500">
          <Link href="/support" className="hover:text-ink-900 transition-colors">Support</Link>
          <span className="mx-2 text-ink-300">/</span>
          <span className="text-ink-900">Warranty</span>
        </nav>

        <div className="max-w-3xl mb-14">
          <p className="text-eyebrow uppercase text-accent-hover mb-3">Warranty</p>
          <h1 className="font-display text-display text-ink-900">
            We stand behind what we build.
          </h1>
          <p className="mt-4 text-ink-500 leading-relaxed">
            5 years standard on all VoltPak hardware. Register your unit to extend to 7.
            No asterisks. No "limited" buried in footnotes.
          </p>
        </div>

        {/* Coverage cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {[
            {
              title: "5-year standard",
              sub: "All products, all buyers",
              items: [
                "Manufacturing defects",
                "Electrical component failure",
                "BMS and inverter board",
                "Display and physical controls",
                "Structural chassis failure",
              ],
            },
            {
              title: "7-year extended",
              sub: "Register within 90 days of purchase",
              items: [
                "Everything in standard coverage",
                "Battery degradation below 70% at year 5",
                "Priority repair / replacement",
                "Free shipping both ways on claims",
                "Access to refurbished unit pool",
              ],
            },
            {
              title: "Not covered",
              sub: "What voids the warranty",
              items: [
                "Physical damage from drops or water",
                "Overcharging from non-VoltPak chargers",
                "Damage from third-party firmware flashing*",
                "Normal capacity fade within spec",
                "Cosmetic wear and scratches",
              ],
              note: "* Opening the unit, swapping fans, printing parts, and accessing PCBs does NOT void the warranty. Flashing unauthorised firmware onto the MCU does.",
            },
          ].map((card, i) => (
            <div key={card.title} className={`rounded-2xl p-7 ${i < 2 ? "bg-ink-100" : "bg-white border border-ink-100"}`}>
              <div className="font-display text-2xl font-semibold text-ink-900">{card.title}</div>
              <div className="text-sm text-ink-500 mt-1 mb-5">{card.sub}</div>
              <ul className="space-y-2.5">
                {card.items.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm text-ink-700">
                    <span className={`mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0 ${i < 2 ? "bg-accent" : "bg-ink-300"}`} />
                    {item}
                  </li>
                ))}
              </ul>
              {card.note && (
                <p className="mt-5 text-xs text-ink-500 leading-relaxed border-t border-ink-100 pt-4">{card.note}</p>
              )}
            </div>
          ))}
        </div>

        {/* Modder note */}
        <div className="bg-ink-900 text-white rounded-2xl p-8 mb-16">
          <div className="font-semibold text-white text-lg mb-2">A note for modders and hackers</div>
          <p className="text-ink-300 leading-relaxed">
            Opening your VoltPak does not void your warranty. Replacing the fans, printing new panels,
            accessing the BMS PCB, or wiring in your own expansion battery does not void your warranty.
            We designed the hardware to be opened. The only action that voids coverage is flashing
            unauthorised firmware onto the MCU - because that directly affects inverter safety behaviour
            in ways we can't verify or support.
          </p>
          <p className="text-ink-300 mt-3 leading-relaxed">
            If you're reverse-engineering the firmware anyway, come talk to us on Discord.
            We send hardware to builders who go deep.
          </p>
        </div>

        {/* Claim process */}
        <div className="max-w-2xl">
          <h2 className="font-display text-2xl font-semibold text-ink-900 mb-6">How to make a claim</h2>
          <ol className="space-y-4">
            {[
              { n: "01", t: "Register your unit", b: "Go to voltpak.com/account and add your serial number. Takes 2 minutes. Required for extended coverage." },
              { n: "02", t: "Contact support", b: "Email support@voltpak.com or open a chat weekdays 8am–6pm PT. Include your serial number and a brief description." },
              { n: "03", t: "Ship or in-store", b: "We'll issue a prepaid label for mail-in, or direct you to a service partner if one is nearby." },
              { n: "04", t: "Repair or replace", b: "We aim to resolve claims within 10 business days. Replacement units ship from our warehouse stock." },
            ].map((s) => (
              <li key={s.n} className="flex gap-5">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-ink-100 text-ink-500 text-xs font-semibold flex items-center justify-center">{s.n}</span>
                <div>
                  <div className="font-semibold text-ink-900">{s.t}</div>
                  <p className="text-sm text-ink-500 mt-1">{s.b}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-10 flex gap-4 flex-wrap">
            <Link href="/support/contact" className="h-11 px-6 inline-flex items-center justify-center rounded-full bg-ink-900 text-white text-sm font-semibold hover:bg-ink-700 transition">
              Contact support
            </Link>
            <a href="#register" className="h-11 px-6 inline-flex items-center justify-center rounded-full border border-ink-900 text-ink-900 text-sm font-semibold hover:bg-ink-100 transition">
              Register your unit →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
