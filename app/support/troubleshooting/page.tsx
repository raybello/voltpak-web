import Link from "next/link";

export const metadata = { title: "Troubleshooting · VoltPak Support" };

const ISSUES = [
  {
    problem: "Unit won't power on",
    steps: [
      "Confirm the battery is not fully depleted - connect AC and wait 60 seconds before pressing power.",
      "Hold the power button for 3 full seconds. A brief press only activates standby.",
      "Check the internal fuse (rear panel, single M3 screw). If blown, replace with a 30 A ATO blade fuse.",
      "If the display flickers and dies, the BMS may have tripped on an over-discharge condition. Leave on charge for 2 hours and retry.",
    ],
    links: [{ label: "Fuse replacement guide", href: "/support/mods" }],
  },
  {
    problem: "AC outlets have no output",
    steps: [
      "On the touchscreen, confirm the AC rail is enabled - tap the AC button to toggle it on (LED should be amber).",
      "Check that you're not in ECO mode with no load - ECO mode disables AC until draw exceeds 3 W.",
      "Verify the unit is above 5% battery state of charge - AC output is disabled below this threshold.",
      "If a large surge load caused a trip, the inverter will auto-reset after 30 seconds. Try again.",
    ],
  },
  {
    problem: "USB-C won't fast-charge my device",
    steps: [
      "Confirm you're using a USB-C cable rated for 5 A (20 V × 5 A = 100 W+). Cheap cables cap at 3 A.",
      "PD negotiation can take 2–3 seconds after plug-in before switching to high wattage.",
      "Some older devices don't support PD 3.0 - they'll charge at 5 V / 3 A regardless.",
      "Check the touchscreen: the USB-C live watt reading will show what's actually being drawn.",
    ],
  },
  {
    problem: "Fan is louder than expected",
    steps: [
      "Confirm the unit is not in a high-ambient environment. At > 35 °C ambient, fans will run faster.",
      "Check the air path: intake (left side) and exhaust (rear) must not be blocked.",
      "If the noise is a rattle rather than airflow noise, a fan blade may have debris on it - swap is straightforward (see mod guide).",
      "ECO mode runs fans at minimum speed. Enable ECO via the touchscreen if noise is a priority over performance.",
    ],
    links: [{ label: "Fan swap guide", href: "/support/mods" }],
  },
  {
    problem: "Capacity reads lower than rated",
    steps: [
      "State of charge estimation is calibrated over full charge-discharge cycles. New units can read slightly low for the first 5–10 cycles.",
      "Run one full charge (to 100%) followed by a full discharge (to auto-shutoff) to recalibrate the coulomb counter.",
      "Capacity at cold temperatures (< 5 °C) will appear lower - this is normal. Capacity recovers at room temp.",
      "If capacity has dropped below 80% after fewer than 1,000 cycles, this is covered under warranty.",
    ],
    links: [{ label: "Battery health guide", href: "/support/battery" }],
  },
  {
    problem: "Touchscreen is unresponsive or shows garbled display",
    steps: [
      "Hold the power button for 10 seconds to force a hard reset.",
      "If the issue persists after reboot, check the display ribbon cable at the board (rear panel access, 4× M3 screws).",
      "A firmware update may be available - check the changelog at voltpak.com/support/manuals.",
      "If hard reset and cable check don't resolve it, contact support for a warranty replacement.",
    ],
    links: [{ label: "Contact support", href: "/support/contact" }],
  },
  {
    problem: "Expansion battery not recognised",
    steps: [
      "Power off the host station before connecting or disconnecting the expansion battery.",
      "Press the SB50 connector firmly until it clicks - a partial seat will prevent BMS communication.",
      "After connecting, boot the station and wait 10 seconds. The display should show combined capacity.",
      "If still not recognised, check the BMS UART passthrough connection on the expansion battery side (see technical manual for connector pinout).",
    ],
    links: [
      { label: "Expansion Battery manual", href: "/support/manuals" },
      { label: "Contact support", href: "/support/contact" },
    ],
  },
];

export default function TroubleshootingPage() {
  return (
    <div className="pt-28 md:pt-32 pb-24">
      <div className="max-w-container mx-auto px-6 md:px-8">
        <nav className="mb-8 text-sm text-ink-500">
          <Link href="/support" className="hover:text-ink-900 transition-colors">Support</Link>
          <span className="mx-2 text-ink-300">/</span>
          <span className="text-ink-900">Troubleshooting</span>
        </nav>

        <div className="max-w-3xl mb-12">
          <p className="text-eyebrow uppercase text-accent-hover mb-3">Troubleshooting</p>
          <h1 className="font-display text-display text-ink-900">
            Step-by-step fixes.
          </h1>
          <p className="mt-4 text-ink-500 leading-relaxed">
            Common issues, diagnosed from first principles. If you've gone through these
            steps and something still isn't right, we're on Discord and email.
          </p>
        </div>

        <div className="space-y-4 max-w-3xl">
          {ISSUES.map((issue) => (
            <details key={issue.problem} className="group rounded-2xl border border-ink-100 overflow-hidden">
              <summary className="flex items-center justify-between px-6 py-5 cursor-pointer bg-white hover:bg-ink-100/50 transition-colors list-none">
                <span className="font-semibold text-ink-900">{issue.problem}</span>
                <svg className="flex-shrink-0 ml-4 text-ink-500 transition-transform group-open:rotate-180" width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </summary>
              <div className="px-6 pb-6 pt-2 bg-white border-t border-ink-100">
                <ol className="space-y-3 mb-4">
                  {issue.steps.map((step, i) => (
                    <li key={i} className="flex gap-3 text-sm text-ink-700 leading-relaxed">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-ink-100 text-ink-500 text-xs font-semibold flex items-center justify-center mt-0.5">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
                {issue.links && (
                  <div className="flex flex-wrap gap-3 pt-3 border-t border-ink-100">
                    {issue.links.map((l) => (
                      <Link key={l.href} href={l.href} className="text-xs font-semibold text-accent-hover hover:text-accent transition-colors">
                        {l.label} →
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </details>
          ))}
        </div>

        <div className="mt-14 bg-ink-100 rounded-2xl p-8 max-w-3xl">
          <div className="font-semibold text-ink-900 mb-2">Still stuck?</div>
          <p className="text-sm text-ink-500 leading-relaxed mb-5">
            Post in the Discord #support channel - someone who's already dug into their
            VoltPak probably has the answer. Or email us and we'll work through it together.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="https://discord.gg/voltpak" className="h-10 px-5 inline-flex items-center rounded-full bg-ink-900 text-white text-sm font-semibold hover:bg-ink-700 transition">
              Discord community
            </a>
            <Link href="/support/contact" className="h-10 px-5 inline-flex items-center rounded-full border border-ink-900 text-ink-900 text-sm font-semibold hover:bg-white transition">
              Email support →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
