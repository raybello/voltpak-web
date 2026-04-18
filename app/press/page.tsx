export const metadata = { title: "Press · VoltPak" };

export default function PressPage() {
  return (
    <div className="pt-28 md:pt-32 pb-24">
      <div className="max-w-container mx-auto px-6 md:px-8">
        <div className="max-w-3xl mb-14">
          <p className="text-eyebrow uppercase text-accent-hover mb-3">Press</p>
          <h1 className="font-display text-display text-ink-900">
            Media resources.
          </h1>
          <p className="mt-4 text-ink-500 leading-relaxed">
            Press inquiries, product images, and company background.
            For review units, reach out to press@voltpak.com.
          </p>
        </div>

        {/* Coverage */}
        <div className="mb-16">
          <h2 className="font-display text-2xl font-semibold text-ink-900 mb-8">Recent coverage</h2>
          <div className="space-y-4">
            {[
              { pub: "Hackaday", title: "VoltPak's Open Hardware Inverter Is What Power Stations Should Have Been All Along", date: "Mar 2026", href: "#" },
              { pub: "Tom's Hardware", title: "VoltPak 1000 Review: A Portable Power Station Built for People Who Understand Electronics", date: "Feb 2026", href: "#" },
              { pub: "Wirecutter", title: "Best Portable Power Stations 2026 — VoltPak 1000 (Best for Makers)", date: "Feb 2026", href: "#" },
              { pub: "Engadget", title: "The VoltPak 1000 Lets You Actually Open and Repair Your Power Station", date: "Jan 2026", href: "#" },
              { pub: "Make: Magazine", title: "Hands-On: VoltPak's Modular Power Kit Is a Hacker's Dream", date: "Dec 2025", href: "#" },
              { pub: "Crowd Supply", title: "Why VoltPak's Firmware-Closed, Hardware-Open Model Is Generating Community Heat", date: "Nov 2025", href: "#" },
            ].map((item) => (
              <a
                key={item.title}
                href={item.href}
                className="group flex items-start justify-between gap-6 bg-white rounded-2xl border border-ink-100 px-6 py-5 hover:border-ink-300 transition"
              >
                <div>
                  <div className="text-xs font-semibold text-accent-hover mb-1">{item.pub}</div>
                  <div className="font-medium text-ink-900 leading-snug group-hover:text-accent-hover transition-colors">{item.title}</div>
                </div>
                <div className="flex-shrink-0 text-right">
                  <div className="text-xs text-ink-500">{item.date}</div>
                  <div className="text-ink-300 group-hover:text-accent-hover mt-2 transition-colors">→</div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Brand assets */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-ink-100 rounded-2xl p-8">
            <h3 className="font-semibold text-ink-900 mb-3">Brand assets</h3>
            <p className="text-sm text-ink-500 leading-relaxed mb-5">
              Logo files in SVG, PNG (light and dark variants), and EPS.
              Product photography — high-res, white background and lifestyle.
              Brand guidelines PDF.
            </p>
            <a href="mailto:press@voltpak.com?subject=Brand assets request" className="text-sm font-semibold text-accent-hover hover:text-accent transition-colors">
              Request press kit →
            </a>
          </div>
          <div className="bg-ink-100 rounded-2xl p-8">
            <h3 className="font-semibold text-ink-900 mb-3">Review units</h3>
            <p className="text-sm text-ink-500 leading-relaxed mb-5">
              We send review units to journalists, YouTubers, and community builders.
              We don't restrict what you say. We're confident enough in the hardware.
            </p>
            <a href="mailto:press@voltpak.com?subject=Review unit request" className="text-sm font-semibold text-accent-hover hover:text-accent transition-colors">
              Request a review unit →
            </a>
          </div>
        </div>

        {/* Contact */}
        <div className="border-t border-ink-100 pt-10">
          <h3 className="font-semibold text-ink-900 mb-2">Press contact</h3>
          <p className="text-sm text-ink-500">
            <a href="mailto:press@voltpak.com" className="text-accent-hover hover:text-accent transition-colors font-medium">press@voltpak.com</a>
            {" "}· Replies within one business day.
          </p>
        </div>
      </div>
    </div>
  );
}
