import Link from "next/link";

export const metadata = { title: "Sustainability · VoltPak" };

export default function SustainabilityPage() {
  return (
    <div className="pt-28 md:pt-32 pb-24">
      <div className="max-w-container mx-auto px-6 md:px-8">
        <nav className="mb-8 text-sm text-ink-500">
          <Link href="/about" className="hover:text-ink-900 transition-colors">About</Link>
          <span className="mx-2 text-ink-300">/</span>
          <span className="text-ink-900">Sustainability</span>
        </nav>

        <div className="max-w-3xl mb-16">
          <p className="text-eyebrow uppercase text-accent-hover mb-3">Sustainability</p>
          <h1 className="font-display text-display text-ink-900">
            The most sustainable product is one that doesn't break.
          </h1>
          <p className="mt-4 text-lg text-ink-500 leading-relaxed">
            LFP chemistry. 3,500-cycle rated packs. Replaceable components. Open hardware.
            Longevity is the sustainability story - not certifications.
          </p>
        </div>

        {/* Core commitments */}
        <div className="grid md:grid-cols-2 gap-6 mb-20">
          {[
            {
              title: "LFP - the right chemistry",
              body: "Lithium iron phosphate contains no cobalt or nickel - two of the most environmentally costly mining outputs in consumer electronics. LFP is also substantially less prone to thermal runaway, which means lower failure rates and less e-waste from fires.",
            },
            {
              title: "3,500 cycles means 10 years",
              body: "A product that lasts a decade doesn't get thrown away after two years. VoltPak packs are rated for 3,500 cycles to 80% capacity. That's the sustainability argument. Not a carbon offset program.",
            },
            {
              title: "Serviceable by design",
              body: "Replaceable panels. Standard M3 fasteners. Serviceable fans. Isolated battery compartment. If a component fails, replace the component - not the unit. We stock spare parts, and the hardware files are open so third parties can manufacture them.",
            },
            {
              title: "Open hardware extends product life",
              body: "When the PCB files are open, the product doesn't die when we stop selling it. Community members can fabricate replacement boards, improve on the design, and keep units running long after they'd otherwise become landfill.",
            },
            {
              title: "No unnecessary packaging",
              body: "Recycled cardboard throughout. No foam where paper honeycomb works. No plastic bags where none are needed. We're not finished on packaging, but we're not adding material to solve problems that don't exist.",
            },
            {
              title: "Honest numbers",
              body: "We don't publish a carbon offset number because we don't trust the accounting well enough yet. We'd rather ship a product that genuinely lasts longer and say that plainly than buy credits and claim neutrality.",
            },
          ].map((c) => (
            <div key={c.title} className="bg-ink-100 rounded-2xl p-8">
              <div className="font-semibold text-ink-900 mb-3">{c.title}</div>
              <p className="text-sm text-ink-500 leading-relaxed">{c.body}</p>
            </div>
          ))}
        </div>

        {/* End of life */}
        <div className="max-w-3xl">
          <h2 className="font-display text-2xl font-semibold text-ink-900 mb-5">End of life</h2>
          <div className="space-y-4 text-ink-500 leading-relaxed">
            <p>
              When a VoltPak battery pack reaches end of useful life, we accept it back.
              We work with certified LFP recycling partners to ensure cells are processed
              properly - not landfilled.
            </p>
            <p>
              Contact us at returns@voltpak.ca with subject line "Battery recycling" and
              we'll arrange a prepaid return label. No purchase required.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
