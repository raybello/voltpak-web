import Link from "next/link";

export const metadata = { title: "Contact · VoltPak Support" };

export default function ContactPage() {
  return (
    <div className="pt-28 md:pt-32 pb-24">
      <div className="max-w-container mx-auto px-6 md:px-8">
        <nav className="mb-8 text-sm text-ink-500">
          <Link href="/support" className="hover:text-ink-900 transition-colors">Support</Link>
          <span className="mx-2 text-ink-300">/</span>
          <span className="text-ink-900">Contact</span>
        </nav>

        <div className="max-w-3xl mb-14">
          <p className="text-eyebrow uppercase text-accent-hover mb-3">Contact</p>
          <h1 className="font-display text-display text-ink-900">
            Real answers. No scripts.
          </h1>
          <p className="mt-4 text-ink-500 leading-relaxed">
            Our support team knows the product — not just the FAQ. Weekdays 8 am–6 pm PT.
            We aim to reply within 24 hours, usually less.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Contact channels */}
          <div className="space-y-4">
            {[
              {
                title: "Email support",
                sub: "support@voltpak.com",
                body: "Best for warranty claims, returns, and detailed technical issues. Reply within 24 h on business days.",
                cta: "Send an email →",
                href: "mailto:support@voltpak.com",
              },
              {
                title: "Live chat",
                sub: "Weekdays 8 am–6 pm PT",
                body: "Open a chat from any page using the icon at the bottom right. Average wait under 3 minutes during business hours.",
                cta: "Start a chat →",
                href: "#chat",
              },
              {
                title: "Discord — community + team",
                sub: "discord.gg/voltpak",
                body: "The fastest way to get a technical answer from someone who has already taken apart their VoltPak. Our engineers are in here too.",
                cta: "Join the server →",
                href: "https://discord.gg/voltpak",
              },
            ].map((c) => (
              <a
                key={c.title}
                href={c.href}
                className="group block bg-white rounded-2xl border border-ink-100 p-6 hover:border-ink-300 transition"
              >
                <div className="font-semibold text-ink-900">{c.title}</div>
                <div className="text-xs text-accent-hover font-medium mt-0.5 mb-2">{c.sub}</div>
                <p className="text-sm text-ink-500 leading-relaxed">{c.body}</p>
                <div className="mt-3 text-sm font-semibold text-accent-hover group-hover:translate-x-1 transition-transform">
                  {c.cta}
                </div>
              </a>
            ))}
          </div>

          {/* Contact form */}
          <div className="bg-ink-100 rounded-2xl p-8">
            <h2 className="font-semibold text-ink-900 mb-5">Send a message</h2>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-ink-700 mb-1">First name</label>
                  <input type="text" className="w-full h-10 rounded-lg border border-ink-100 bg-white px-3 text-sm text-ink-900 focus:outline-none focus:border-accent" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-ink-700 mb-1">Last name</label>
                  <input type="text" className="w-full h-10 rounded-lg border border-ink-100 bg-white px-3 text-sm text-ink-900 focus:outline-none focus:border-accent" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-ink-700 mb-1">Email</label>
                <input type="email" className="w-full h-10 rounded-lg border border-ink-100 bg-white px-3 text-sm text-ink-900 focus:outline-none focus:border-accent" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-ink-700 mb-1">Subject</label>
                <select className="w-full h-10 rounded-lg border border-ink-100 bg-white px-3 text-sm text-ink-900 focus:outline-none focus:border-accent">
                  <option>Order or shipping question</option>
                  <option>Warranty claim</option>
                  <option>Return or refund</option>
                  <option>Technical issue</option>
                  <option>Mod / hardware question</option>
                  <option>Press or partnerships</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-ink-700 mb-1">Serial number (if applicable)</label>
                <input type="text" placeholder="VP1000-XXXXXX" className="w-full h-10 rounded-lg border border-ink-100 bg-white px-3 text-sm text-ink-900 placeholder:text-ink-300 focus:outline-none focus:border-accent" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-ink-700 mb-1">Message</label>
                <textarea rows={4} className="w-full rounded-lg border border-ink-100 bg-white px-3 py-2 text-sm text-ink-900 focus:outline-none focus:border-accent resize-none" />
              </div>
              <button type="submit" className="w-full h-11 rounded-full bg-ink-900 text-white text-sm font-semibold hover:bg-ink-700 transition">
                Send message
              </button>
            </form>
          </div>
        </div>

        {/* Office info */}
        <div className="border-t border-ink-100 pt-10 grid md:grid-cols-3 gap-8 text-sm text-ink-500">
          {[
            { label: "Support hours", value: "Mon–Fri, 8 am–6 pm PT\nSat–Sun: email only" },
            { label: "Response time", value: "< 24 h on business days\nUsually < 4 h" },
            { label: "Headquarters", value: "VoltPak, Inc.\nSan Francisco, CA 94107" },
          ].map((i) => (
            <div key={i.label}>
              <div className="text-xs uppercase tracking-widest text-ink-300 mb-2">{i.label}</div>
              <div className="text-ink-900 font-medium whitespace-pre-line">{i.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
