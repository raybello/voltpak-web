import Link from "next/link";

export const metadata = { title: "Battery Health · VoltPak Support" };

export default function BatteryPage() {
  return (
    <div className="pt-28 md:pt-32 pb-24">
      <div className="max-w-container mx-auto px-6 md:px-8">
        <nav className="mb-8 text-sm text-ink-500">
          <Link href="/support" className="hover:text-ink-900 transition-colors">Support</Link>
          <span className="mx-2 text-ink-300">/</span>
          <span className="text-ink-900">Battery Health</span>
        </nav>

        <div className="max-w-3xl mb-14">
          <p className="text-eyebrow uppercase text-accent-hover mb-3">Battery Health</p>
          <h1 className="font-display text-display text-ink-900">
            LFP is different. In a good way.
          </h1>
          <p className="mt-4 text-ink-500 leading-relaxed">
            VoltPak uses lithium iron phosphate (LFP) cells — a chemistry built for longevity,
            not energy density. Here's what that means in practice, and how to get the most out of it.
          </p>
        </div>

        {/* LFP basics */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {[
            {
              stat: "3,500+",
              label: "Rated cycles",
              body: "To 80% capacity. That's roughly 10 years of daily use before meaningful degradation. Most lithium-ion products rate 500–1,000 cycles.",
            },
            {
              stat: "0–100%",
              label: "Safe daily range",
              body: "Unlike NMC, LFP doesn't benefit from partial cycling. Charge to 100% and discharge fully — the chemistry handles it.",
            },
            {
              stat: "≤ 30 °C",
              label: "Ideal storage temp",
              body: "Store between –10 °C and 30 °C long-term. If storing more than 3 months, charge to 50% first.",
            },
          ].map((c) => (
            <div key={c.label} className="bg-ink-100 rounded-2xl p-7">
              <div className="font-display text-3xl font-bold text-ink-900">{c.stat}</div>
              <div className="text-sm text-accent-hover font-semibold mt-1 mb-3">{c.label}</div>
              <p className="text-sm text-ink-500 leading-relaxed">{c.body}</p>
            </div>
          ))}
        </div>

        {/* Best practices */}
        <div className="max-w-3xl mb-16">
          <h2 className="font-display text-2xl font-semibold text-ink-900 mb-6">Best practices</h2>
          <div className="space-y-5">
            {[
              {
                q: "Do I need to avoid charging to 100%?",
                a: "No. LFP chemistry is designed to tolerate full charges without the calendar degradation NMC sees at 100%. Charge to full whenever you want.",
              },
              {
                q: "How often should I cycle the battery?",
                a: "At least once every 3 months if it's sitting in storage. Letting LFP sit fully depleted for extended periods can cause cell imbalance that's hard to reverse.",
              },
              {
                q: "What does the BMS actually do?",
                a: "It monitors all 8 cell groups individually — voltage, temperature, and state of charge. It balances cells passively during charge, disconnects the pack if any cell exceeds safe limits, and reports everything to the display over UART. You can see cell-level data in the system info screen.",
              },
              {
                q: "The capacity reading seems lower than rated. Is something wrong?",
                a: "Not necessarily. Displayed capacity is a firmware estimate based on coulomb counting, recalibrated on each full charge-discharge cycle. A new pack may read slightly under rated capacity for the first 5–10 cycles before the estimate stabilises.",
              },
              {
                q: "Can I read raw cell data myself?",
                a: "Yes. The BMS exposes a UART interface at 115,200 baud (3.3 V logic) — connector and pinout in the technical manual. It outputs a JSON-formatted status packet every 2 seconds with per-cell voltage, temperature, and SOC. The protocol is documented in the hardware ZIP.",
              },
              {
                q: "When is a cell actually at end of life?",
                a: "Warranty replacement threshold is 70% capacity retention. In practice, LFP cells tend to hit this point and then plateau — capacity doesn't continue falling sharply. Most packs remain usable well past the warranty threshold, just with reduced runtime.",
              },
            ].map((item) => (
              <details key={item.q} className="group rounded-2xl border border-ink-100 overflow-hidden">
                <summary className="flex items-center justify-between px-6 py-4 cursor-pointer bg-white hover:bg-ink-100/50 transition-colors list-none">
                  <span className="font-medium text-ink-900 pr-4">{item.q}</span>
                  <svg className="flex-shrink-0 text-ink-500 transition-transform group-open:rotate-180" width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </summary>
                <div className="px-6 pb-5 pt-2 bg-white border-t border-ink-100">
                  <p className="text-sm text-ink-700 leading-relaxed">{item.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>

        {/* Diagnostics table */}
        <div className="max-w-3xl">
          <h2 className="font-display text-2xl font-semibold text-ink-900 mb-6">Voltage reference</h2>
          <div className="rounded-2xl border border-ink-100 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-ink-100 text-left">
                  <th className="px-5 py-3 font-semibold text-ink-700">State</th>
                  <th className="px-5 py-3 font-semibold text-ink-700">Per-cell voltage</th>
                  <th className="px-5 py-3 font-semibold text-ink-700">Pack voltage (8S)</th>
                  <th className="px-5 py-3 font-semibold text-ink-700">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100 bg-white">
                {[
                  ["100% — fully charged", "3.65 V", "29.2 V", "BMS top-balance target"],
                  ["80% — typical resting", "3.30 V", "26.4 V", "Normal daily resting voltage"],
                  ["50% — storage voltage", "3.20 V", "25.6 V", "Ideal for long-term storage"],
                  ["20% — low warning", "3.10 V", "24.8 V", "BMS activates low-SOC warning"],
                  ["0% — cutoff", "2.80 V", "22.4 V", "BMS disconnects pack at this point"],
                  ["< 2.50 V — over-discharged", "< 2.50 V", "< 20.0 V", "Contact support — cell may be damaged"],
                ].map(([state, cell, pack, note]) => (
                  <tr key={state} className="hover:bg-ink-100/40 transition-colors">
                    <td className="px-5 py-3 font-medium text-ink-900">{state}</td>
                    <td className="px-5 py-3 text-ink-700 tabular">{cell}</td>
                    <td className="px-5 py-3 text-ink-700 tabular">{pack}</td>
                    <td className="px-5 py-3 text-ink-500">{note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-ink-500">
            Cell voltage readable via BMS UART or the system info screen on the touchscreen display.
          </p>
        </div>
      </div>
    </div>
  );
}
