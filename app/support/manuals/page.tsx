import Link from "next/link";

export const metadata = { title: "Manuals & Hardware Files · VoltPak Support" };

const DOCS = [
  {
    category: "Quick-Start Guides",
    files: [
      {
        name: "VoltPak 1000 - Quick-Start Guide",
        desc: "Get running in under 5 minutes. In-the-box checklist, first charge, port overview.",
        version: "v1.2",
        date: "Apr 2026",
        size: "420 KB",
        type: "PDF",
        href: "/downloads/voltpak-1000-quickstart.pdf",
      },
    ],
  },
  {
    category: "Technical Reference Manuals",
    files: [
      {
        name: "VoltPak 1000 - Technical Reference Manual",
        desc: "Full electrical architecture, block diagrams, thermal specs, BMS UART protocol, fastener reference.",
        version: "v1.2",
        date: "Apr 2026",
        size: "1.8 MB",
        type: "PDF",
        href: "/downloads/voltpak-1000-technical-manual.pdf",
      },
      {
        name: "Expansion Battery 2000 - Installation & Technical Reference",
        desc: "SB50 connector wiring, BMS passthrough protocol, cell spec, installation sequence.",
        version: "v1.0",
        date: "Apr 2026",
        size: "680 KB",
        type: "PDF",
        href: "/downloads/voltpak-expansion-battery-manual.pdf",
      },
    ],
  },
  {
    category: "Open Hardware Files",
    note: "Released under CERN-OHL-S v2. Hardware is open. Firmware is not.",
    files: [
      {
        name: "VoltPak Hardware - Open Source Package",
        desc: "KiCad schematics, PCB layouts, STEP mechanical model, BOM with Mouser/DigiKey PNs. Covers main inverter board, BMS interface board, and USB-PD controller.",
        version: "v1.2",
        date: "Apr 2026",
        size: "14 MB",
        type: "ZIP",
        href: "/downloads/voltpak-hardware-open-source.zip",
      },
    ],
  },
];

const TYPE_STYLE: Record<string, string> = {
  PDF: "bg-red-50 text-red-700 border border-red-200",
  ZIP: "bg-blue-50 text-blue-700 border border-blue-200",
  STL: "bg-emerald-50 text-emerald-700 border border-emerald-200",
};

export default function ManualsPage() {
  return (
    <div className="pt-28 md:pt-32 pb-24">
      <div className="max-w-container mx-auto px-6 md:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-ink-500">
          <Link href="/support" className="hover:text-ink-900 transition-colors">Support</Link>
          <span className="mx-2 text-ink-300">/</span>
          <span className="text-ink-900">Manuals &amp; Hardware Files</span>
        </nav>

        <div className="max-w-3xl mb-12">
          <p className="text-eyebrow uppercase text-accent-hover mb-3">Manuals &amp; Hardware Files</p>
          <h1 className="font-display text-display text-ink-900">
            Every number, documented.
          </h1>
          <p className="mt-4 text-ink-500 leading-relaxed">
            Hardware documentation, PCB files, schematics, and BOM - all open.
            The firmware running the inverter MCU is proprietary. We don't release it.
            That's our moat. The hardware is yours to study, modify, and build on.
          </p>
        </div>

        {/* Firmware notice */}
        <div className="mb-12 bg-ink-900 text-white rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                  stroke="#00D4FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
          <div>
            <div className="font-semibold text-white mb-1">A note on firmware</div>
            <p className="text-ink-300 text-sm leading-relaxed">
              The firmware that runs on the inverter MCU is proprietary. We don't publish it - not binaries,
              not source. It's our engineering moat. You're welcome to reverse-engineer it. Builders who go
              deep and share findings publicly in our Discord get hardware, pre-release units, and direct
              access to our engineering team.
            </p>
            <a
              href="https://discord.gg/voltpak"
              className="mt-3 inline-flex items-center gap-2 text-sm text-accent hover:text-accent-hover transition-colors font-semibold"
            >
              Join the Discord community →
            </a>
          </div>
        </div>

        {/* Download tables */}
        <div className="space-y-14">
          {DOCS.map((section) => (
            <div key={section.category}>
              <div className="mb-4 flex items-baseline gap-4 flex-wrap">
                <h2 className="font-display text-xl font-semibold text-ink-900">
                  {section.category}
                </h2>
                {section.note && (
                  <span className="text-xs text-ink-500 italic">{section.note}</span>
                )}
              </div>
              <div className="rounded-2xl border border-ink-100 overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-ink-100 text-left">
                      <th className="px-5 py-3 font-semibold text-ink-700 w-[35%]">Document</th>
                      <th className="px-5 py-3 font-semibold text-ink-700 hidden md:table-cell">Description</th>
                      <th className="px-5 py-3 font-semibold text-ink-700 w-16 text-center">Type</th>
                      <th className="px-5 py-3 font-semibold text-ink-700 w-20 hidden sm:table-cell">Version</th>
                      <th className="px-5 py-3 font-semibold text-ink-700 w-20 hidden lg:table-cell">Size</th>
                      <th className="px-5 py-3 w-28"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ink-100">
                    {section.files.map((f) => (
                      <tr key={f.href} className="bg-white hover:bg-ink-100/50 transition-colors">
                        <td className="px-5 py-4">
                          <div className="font-medium text-ink-900 leading-snug">{f.name}</div>
                          <div className="text-xs text-ink-500 mt-0.5 md:hidden">{f.desc}</div>
                        </td>
                        <td className="px-5 py-4 text-ink-500 hidden md:table-cell leading-relaxed">{f.desc}</td>
                        <td className="px-5 py-4 text-center">
                          <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded ${TYPE_STYLE[f.type] ?? "bg-ink-100 text-ink-700"}`}>
                            {f.type}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-ink-500 hidden sm:table-cell">{f.version}<div className="text-xs text-ink-300">{f.date}</div></td>
                        <td className="px-5 py-4 text-ink-500 hidden lg:table-cell">{f.size}</td>
                        <td className="px-5 py-4 text-right">
                          <a
                            href={f.href}
                            download
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-hover hover:text-accent transition-colors"
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                              <path d="M12 3v13m0 0-4-4m4 4 4-4M3 21h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Download
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>

        {/* Changelog note */}
        <div className="mt-16 bg-ink-100 rounded-2xl p-8">
          <h3 className="font-semibold text-ink-900 mb-2">Firmware changelog</h3>
          <p className="text-sm text-ink-500 leading-relaxed">
            We publish a public changelog for each firmware update - version number,
            what changed, and any safety-relevant notes. Binaries are not included.
            The changelog is the record. If something in a release affects how you interact
            with the hardware, you'll find it here.
          </p>
          <div className="mt-6 space-y-3">
            {[
              { ver: "v2.4.1", date: "Apr 2026", note: "BMS UART timeout fix - prevents false OCP trips when expansion battery connects cold." },
              { ver: "v2.4.0", date: "Mar 2026", note: "PD3.1 48V/5A EPR support on USB-C ports. ECO mode hysteresis tuning." },
              { ver: "v2.3.2", date: "Jan 2026", note: "Surge detection improvement - reduced false trip rate on reactive loads by 40%." },
              { ver: "v2.3.0", date: "Nov 2025", note: "Touchscreen UI redesign. Per-port watt display. Thermal graph added to system info." },
            ].map((entry) => (
              <div key={entry.ver} className="flex gap-4 text-sm">
                <span className="font-semibold text-ink-900 w-14 flex-shrink-0 tabular">{entry.ver}</span>
                <span className="text-ink-500 w-20 flex-shrink-0">{entry.date}</span>
                <span className="text-ink-700">{entry.note}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
