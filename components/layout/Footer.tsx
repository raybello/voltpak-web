import Link from "next/link";
import Image from "next/image";

const COLUMNS = [
  {
    title: "Shop",
    links: [
      { href: "/shop", label: "Power Stations" },
      { href: "/shop?category=battery", label: "Expansion Batteries" },
      { href: "/shop?category=solar", label: "Solar Panels" },
      { href: "/shop?category=accessory", label: "Accessories" },
      { href: "/shop?sale=1", label: "Deals" },
    ],
  },
  {
    title: "Support",
    links: [
      { href: "/support", label: "Help Center" },
      { href: "/support/manuals", label: "Manuals & Hardware Files" },
      { href: "/support/mods", label: "Mod & Repair Guides" },
      { href: "/support/troubleshooting", label: "Troubleshooting" },
      { href: "/support/warranty", label: "Warranty" },
      { href: "/support/battery", label: "Battery Health" },
      { href: "/support/returns", label: "Returns & Shipping" },
      { href: "/support/contact", label: "Contact" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About VoltPak" },
      { href: "/about/engineering", label: "Design Philosophy" },
      { href: "/about/sustainability", label: "Sustainability" },
      { href: "/press", label: "Press" },
      { href: "/careers", label: "Careers" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/legal/privacy", label: "Privacy" },
      { href: "/legal/terms", label: "Terms of Service" },
      { href: "/legal/accessibility", label: "Accessibility" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-ink-900 text-ink-300">
      <div className="max-w-container mx-auto px-6 md:px-8 py-20">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          <div className="col-span-2">
            <div className="flex items-center">
              <Image
                src="/media/logo-white.png"
                alt="VoltPak"
                width={110}
                height={31}
                className="h-7 w-auto object-contain"
              />
            </div>
            <p className="mt-4 text-sm max-w-sm text-ink-500 leading-relaxed">
              Modular inverter systems for tinkerers, hackers, and people who
              want to understand their power. Built to be open.
            </p>
            <p className="mt-3 text-xs text-ink-500">
              "I could open this. I could understand this. I could make it mine."
            </p>
            <form className="mt-6 flex gap-2 max-w-sm">
              <input
                type="email"
                placeholder="Email address"
                className="flex-1 bg-ink-800 border border-white/10 rounded-md px-3 py-2 text-sm text-white placeholder:text-ink-500 focus:outline-none focus:border-accent"
              />
              <button
                type="submit"
                className="bg-white text-ink-900 text-sm font-semibold px-4 rounded-md hover:bg-ink-100 transition-colors"
              >
                Join
              </button>
            </form>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <div className="text-white font-semibold text-sm mb-4">
                {col.title}
              </div>
              <ul className="space-y-3 text-sm">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-ink-300 hover:text-white transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="text-xs text-ink-500">
            © {new Date().getFullYear()} VoltPak, Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-xs text-ink-500">
            <span>United States · English</span>
            <span>·</span>
            <Link href="/legal/privacy" className="hover:text-white">Privacy</Link>
            <Link href="/legal/terms" className="hover:text-white">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
