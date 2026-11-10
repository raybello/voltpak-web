import Link from "next/link";
import { DOWNLOADS_AVAILABLE } from "@/lib/downloads";

export const metadata = { title: "Mod & Repair Guides · VoltPak Support" };

const MOD_FILES = [
  {
    category: "Printable Parts - STL Files",
    note: "Print in PETG or ASA. PLA works indoors at low ambient temps.",
    files: [
      {
        name: "Front Panel - Replacement",
        desc: "Drop-in replacement front panel. Sized for stock display and port array cutouts. Modify to add custom labels, badge mounts, or cable routing.",
        version: "v1.0",
        date: "Apr 2026",
        size: "2.1 MB",
        type: "STL",
        href: "/downloads/voltpak-1000-front-panel.stl",
      },
      {
        name: "60 mm Fan Guard",
        desc: "Replacement fan guard for intake fans. Standard 60 mm bolt pattern. Print in PETG. Includes 5mm finger-safe grid geometry.",
        version: "v1.0",
        date: "Apr 2026",
        size: "340 KB",
        type: "STL",
        href: "/downloads/voltpak-1000-fan-guard-60mm.stl",
      },
      {
        name: "Rack Ears - 1U Flush Mount",
        desc: "Adapter ears for mounting VoltPak 1000 in a standard 19\" rack. 1U height. M5 rack holes.",
        version: "v1.0",
        date: "Apr 2026",
        size: "480 KB",
        type: "STL",
        href: "/downloads/voltpak-1000-rack-ears.stl",
      },
      {
        name: "Desk Tilt Stand",
        desc: "15-degree tilt stand for bench use. Improves touchscreen viewing angle. Friction-fit to base.",
        version: "v1.0",
        date: "Apr 2026",
        size: "290 KB",
        type: "STL",
        href: "/downloads/voltpak-desk-tilt-stand.stl",
      },
      {
        name: "Expansion Battery - Housing Top Cover",
        desc: "Replacement top cover for the Expansion Battery 2000. Add vents, labels, or additional mounting tabs.",
        version: "v1.0",
        date: "Apr 2026",
        size: "1.4 MB",
        type: "STL",
        href: "/downloads/voltpak-expansion-housing-top.stl",
      },
    ],
  },
  {
    category: "Hardware Files - PCB & Schematics",
    note: "CERN-OHL-S v2. Study, modify, manufacture - with attribution.",
    files: [
      {
        name: "VoltPak Hardware - Open Source Package",
        desc: "KiCad schematics and PCB layouts for the inverter board, BMS interface, and USB-PD controller. STEP mechanical model and full BOM included.",
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

const GUIDES = [
  {
    title: "Fan swap",
    difficulty: "Easy",
    time: "20 min",
    tools: "Phillips #2, 4-pin JST PH2.0 crimper",
    steps: [
      "Power off and unplug all inputs.",
      "Remove the left side panel - 4× M3 Phillips screws.",
      "Disconnect the 4-pin JST fan connector.",
      "Unscrew the fan (4× M3 × 8 mm socket head).",
      "Install the replacement (standard 60 mm bolt pattern).",
      "Reconnect JST, reinstall panel.",
      "Boot and verify fan curve from the system info screen.",
    ],
  },
  {
    title: "BMS access & cell inspection",
    difficulty: "Intermediate",
    time: "45 min",
    tools: "Phillips #2, multimeter",
    steps: [
      "Power off. Remove AC and DC inputs. Wait 10 min for capacitors to discharge.",
      "Remove the rear panel (6× M3 Phillips).",
      "The BMS board is mounted on the left - 4× M3 standoff screws.",
      "Cell voltage can be read at the BMS test points: TP1–TP8 (0 V reference at GND pad).",
      "Nominal per-cell: 3.2 V resting. Fully charged: 3.65 V. Minimum: 2.8 V.",
      "If any cell reads < 2.8 V at rest, the pack requires reconditioning or replacement.",
      "Reinstall in reverse order. Torque M3 screws to 0.4 N·m.",
    ],
  },
  {
    title: "Fuse replacement",
    difficulty: "Easy",
    time: "5 min",
    tools: "Phillips #2",
    steps: [
      "Power off and disconnect all cables.",
      "Locate the fuse access panel on the rear - single M3 countersunk screw.",
      "Remove the blade fuse (30 A, standard ATO).",
      "Inspect for visible burn or break. Replace with identical spec.",
      "Reinstall panel. If fuse blows again immediately, do not replace - contact support.",
    ],
  },
];

const DIFFICULTY_COLOR: Record<string, string> = {
  Easy: "bg-emerald-50 text-emerald-700",
  Intermediate: "bg-amber-50 text-amber-700",
  Advanced: "bg-red-50 text-red-700",
};

export default function ModsPage() {
  return (
    <div className="pt-28 md:pt-32 pb-24">
      <div className="max-w-container mx-auto px-6 md:px-8">

        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-ink-500">
          <Link href="/support" className="hover:text-ink-900 transition-colors">Support</Link>
          <span className="mx-2 text-ink-300">/</span>
          <span className="text-ink-900">Mod &amp; Repair Guides</span>
        </nav>

        <div className="max-w-3xl mb-12">
          <p className="text-eyebrow uppercase text-accent-hover mb-3">Mod &amp; Repair Guides</p>
          <h1 className="font-display text-display text-ink-900">
            Open it. Understand it. Make it yours.
          </h1>
          <p className="mt-4 text-ink-500 leading-relaxed">
            STL files for printable parts, PCB files for the hardware, and step-by-step repair guides.
            Every fastener is M3. Every panel is replaceable. We designed it this way.
          </p>
        </div>

        {/* Community CTA */}
        <div className="mb-12 grid md:grid-cols-3 gap-4">
          {[
            { label: "Discord server", sub: "Where the mods live. Share builds, ask questions, get hardware.", href: "https://discord.gg/voltpak" },
            { label: "Printables - community parts", sub: "Community-submitted STL files, brackets, and enclosure mods.", href: "https://printables.com/@voltpak" },
          ].map((c) => (
            <a key={c.label} href={c.href} className="group block bg-ink-100 rounded-xl p-5 hover:bg-ink-900 hover:text-white transition-colors">
              <div className="font-semibold text-ink-900 group-hover:text-white mb-1 transition-colors">{c.label}</div>
              <p className="text-xs text-ink-500 group-hover:text-ink-300 transition-colors leading-relaxed">{c.sub}</p>
              <span className="mt-3 inline-block text-xs text-accent-hover group-hover:text-accent font-semibold">Open →</span>
            </a>
          ))}
        </div>

        {/* Download tables */}
        <div className="space-y-14 mb-20">
          {MOD_FILES.map((section) => (
            <div key={section.category}>
              <div className="mb-4 flex items-baseline gap-4 flex-wrap">
                <h2 className="font-display text-xl font-semibold text-ink-900">{section.category}</h2>
                {section.note && (
                  <span className="text-xs text-ink-500 italic">{section.note}</span>
                )}
              </div>
              <div className="rounded-2xl border border-ink-100 overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-ink-100 text-left">
                      <th className="px-5 py-3 font-semibold text-ink-700 w-[30%]">File</th>
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
                        <td className="px-5 py-4 text-ink-500 hidden sm:table-cell">{DOWNLOADS_AVAILABLE ? f.version : "—"}<div className="text-xs text-ink-300">{DOWNLOADS_AVAILABLE ? f.date : ""}</div></td>
                        <td className="px-5 py-4 text-ink-500 hidden lg:table-cell">{DOWNLOADS_AVAILABLE ? f.size : "—"}</td>
                        <td className="px-5 py-4 text-right">
                          {DOWNLOADS_AVAILABLE ? (
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
                          ) : (
                            <span className="text-xs text-ink-500">Available at launch</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>

        {/* Step-by-step repair guides */}
        <div>
          <h2 className="font-display text-2xl font-semibold text-ink-900 mb-8">Repair guides</h2>
          <div className="space-y-6">
            {GUIDES.map((g) => (
              <details key={g.title} className="group rounded-2xl border border-ink-100 overflow-hidden">
                <summary className="flex items-center justify-between px-6 py-5 cursor-pointer bg-white hover:bg-ink-100/50 transition-colors list-none">
                  <div className="flex items-center gap-4 flex-wrap">
                    <span className="font-semibold text-ink-900">{g.title}</span>
                    <span className={`text-xs px-2 py-0.5 rounded font-medium ${DIFFICULTY_COLOR[g.difficulty]}`}>
                      {g.difficulty}
                    </span>
                    <span className="text-xs text-ink-500">{g.time}</span>
                    <span className="text-xs text-ink-500 hidden sm:inline">Tools: {g.tools}</span>
                  </div>
                  <svg className="flex-shrink-0 ml-4 text-ink-500 transition-transform group-open:rotate-180" width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </summary>
                <div className="px-6 pb-6 pt-2 bg-white border-t border-ink-100">
                  <p className="text-sm text-ink-500 mb-4">Tools required: {g.tools}</p>
                  <ol className="space-y-2">
                    {g.steps.map((step, i) => (
                      <li key={i} className="flex gap-3 text-sm text-ink-700">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-ink-100 text-ink-500 text-xs font-semibold flex items-center justify-center mt-0.5">
                          {i + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              </details>
            ))}
          </div>
        </div>

        {/* Print settings note */}
        <div className="mt-16 bg-ink-100 rounded-2xl p-8">
          <h3 className="font-semibold text-ink-900 mb-3">Recommended print settings for STL files</h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 text-sm">
            {[
              { label: "Material", value: "PETG (preferred) or ASA" },
              { label: "Layer height", value: "0.2 mm" },
              { label: "Infill", value: "25–40% gyroid" },
              { label: "Wall count", value: "4 perimeters" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-xs text-ink-500 uppercase tracking-wide mb-1">{s.label}</div>
                <div className="font-medium text-ink-900">{s.value}</div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-ink-500">
            Avoid PLA near the fan areas - ambient temps inside the chassis can reach 45 °C under load.
            PETG handles this comfortably. All tolerances assume a 0.4 mm nozzle with a 0.2 mm layer height.
          </p>
        </div>
      </div>
    </div>
  );
}
