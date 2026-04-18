import Link from "next/link";

export const metadata = { title: "Design Philosophy · VoltPak" };

export default function EngineeringPage() {
  return (
    <div className="pt-28 md:pt-32 pb-24">
      <div className="max-w-container mx-auto px-6 md:px-8">
        <nav className="mb-8 text-sm text-ink-500">
          <Link href="/about" className="hover:text-ink-900 transition-colors">About</Link>
          <span className="mx-2 text-ink-300">/</span>
          <span className="text-ink-900">Design Philosophy</span>
        </nav>

        {/* Hero */}
        <div className="max-w-3xl mb-16">
          <p className="text-eyebrow uppercase text-accent-hover mb-3">Design Philosophy</p>
          <h1 className="font-display text-display text-ink-900">
            Function dictates form.
          </h1>
          <p className="mt-4 text-lg text-ink-500 leading-relaxed">
            Every decision in a VoltPak starts with a question: does this serve a function?
            If the answer is no, it doesn't ship.
          </p>
        </div>

        {/* Full-width image */}
        <div className="rounded-2xl overflow-hidden mb-20 aspect-[21/9]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/media/front-ports.jpg" alt="VoltPak port detail" className="w-full h-full object-cover" />
        </div>

        {/* Hardware open source section */}
        <div className="grid md:grid-cols-2 gap-16 items-start mb-20">
          <div>
            <p className="text-eyebrow uppercase text-accent-hover mb-3">Open hardware</p>
            <h2 className="font-display text-3xl font-semibold text-ink-900 mb-5">
              The hardware is yours to study.
            </h2>
            <div className="space-y-4 text-ink-500 leading-relaxed">
              <p>
                Every VoltPak PCB — the main inverter board, the BMS interface, the USB-PD controller —
                is released as open source under the CERN Open Hardware Licence v2 (Strongly Reciprocal).
                KiCad schematics, PCB layouts, STEP mechanical models, and a full BOM with
                Mouser/DigiKey part numbers are available on this site and on GitHub.
              </p>
              <p>
                We do this because we believe hardware you can understand is hardware you can trust.
                We also do it because a community of engineers poring over your design finds things
                you missed, improves things you got lazy on, and builds mods that make the product better.
              </p>
              <p>
                The CERN-OHL-S licence means you can study it, modify it, and manufacture from it —
                as long as you release your changes under the same terms.
              </p>
            </div>
            <div className="mt-6">
              <Link href="/support/manuals" className="inline-flex items-center gap-2 text-sm font-semibold text-accent-hover hover:text-accent transition-colors">
                Download hardware files →
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-ink-100 rounded-2xl p-6">
              <div className="font-semibold text-ink-900 mb-3">What&apos;s open</div>
              <ul className="space-y-2 text-sm text-ink-700">
                {[
                  "Inverter board — schematic and PCB layout (KiCad 7)",
                  "BMS interface board — schematic and PCB",
                  "USB-PD controller board — schematic and PCB",
                  "Chassis STEP and IGES mechanical models",
                  "All STL files for user-replaceable panels",
                  "Full BOM with manufacturer PNs",
                ].map((i) => (
                  <li key={i} className="flex gap-2.5">
                    <span className="text-accent mt-0.5 flex-shrink-0">✓</span>
                    {i}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-ink-900 text-white rounded-2xl p-6">
              <div className="font-semibold mb-3">What&apos;s not open — and why</div>
              <p className="text-sm text-ink-300 leading-relaxed">
                The MCU firmware is proprietary. It's our primary engineering moat —
                the control logic, protection algorithms, and display stack took years
                to develop and are what separate a good inverter from a reliable one.
                We don't publish it. The community is welcome to reverse-engineer it.
                Builders who go deep and share findings in our Discord get hardware,
                pre-release units, and direct engineering access.
              </p>
              <a href="https://discord.gg/voltpak" className="mt-4 inline-block text-sm font-semibold text-accent hover:text-accent-hover transition-colors">
                Join the firmware RE community →
              </a>
            </div>
          </div>
        </div>

        {/* Design principles */}
        <div className="bg-ink-100 rounded-2xl py-16 px-8 md:px-16 mb-20">
          <p className="text-eyebrow uppercase text-accent-hover mb-4">The brief</p>
          <h2 className="font-display text-3xl font-semibold text-ink-900 mb-10">
            What we tell ourselves when we design.
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: "No unnecessary curves", body: "Softened edges where tooling demands it. Nothing else. The shape should communicate purpose, not brand personality." },
              { title: "No fake vents", body: "If there's a vent opening, air moves through it. Decorative geometry that implies airflow is dishonest design. We don't do it." },
              { title: "No gloss", body: "Matte ABS. Industrial grain texture. Hides wear. Survives a bench. Doesn't fingerprint. Consumer gloss finishes don't belong on tools." },
              { title: "Visible fasteners", body: "Standard M3 Phillips or hex socket throughout. Visible and reachable. Anyone with a screwdriver should be able to open this product." },
              { title: "Instrumentation, not decoration", body: "LEDs exist to convey state — per-port status, not ambiance. The display is a dashboard, not a brand moment." },
              { title: "Modular by default", body: "Battery compartment isolated. Fans on standard bolt patterns. Panels replaceable. The architecture invites modification." },
            ].map((p) => (
              <div key={p.title}>
                <div className="font-semibold text-ink-900 mb-2">{p.title}</div>
                <p className="text-sm text-ink-500 leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Aesthetic references */}
        <div className="max-w-3xl">
          <p className="text-eyebrow uppercase text-accent-hover mb-3">Aesthetic references</p>
          <h2 className="font-display text-2xl font-semibold text-ink-900 mb-5">
            Where the visual language comes from.
          </h2>
          <div className="space-y-4 text-ink-500 leading-relaxed">
            <p>
              The target feeling is somewhere between Blade Runner utility and Dune's brutal
              material honesty. Sci-fi with restraint. Futurism that earned it.
            </p>
            <p>
              Color palette: graphite, charcoal, desert tan. UI accents: white, amber,
              cold blue — used sparingly. The accent colors on the display and LEDs are
              instrument colors, not brand colors. They mean something.
            </p>
            <p>
              When someone sees a VoltPak on a bench, the goal is for them to think:
              "I could open that. I could understand that. I could make it mine."
            </p>
            <p className="italic text-ink-700 font-medium border-l-2 border-accent pl-4">
              "That feeling is the product."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
