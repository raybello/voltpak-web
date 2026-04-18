import Link from "next/link";

export const metadata = { title: "Returns & Shipping · VoltPak Support" };

export default function ReturnsPage() {
  return (
    <div className="pt-28 md:pt-32 pb-24">
      <div className="max-w-container mx-auto px-6 md:px-8">
        <nav className="mb-8 text-sm text-ink-500">
          <Link href="/support" className="hover:text-ink-900 transition-colors">Support</Link>
          <span className="mx-2 text-ink-300">/</span>
          <span className="text-ink-900">Returns &amp; Shipping</span>
        </nav>

        <div className="max-w-3xl mb-14">
          <p className="text-eyebrow uppercase text-accent-hover mb-3">Returns &amp; Shipping</p>
          <h1 className="font-display text-display text-ink-900">
            Straightforward. No fine print.
          </h1>
          <p className="mt-4 text-ink-500 leading-relaxed">
            30 days to decide. Free shipping on orders over $500. No restocking fees.
            If it's not right, we make it right.
          </p>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { stat: "30 days", label: "Return window" },
            { stat: "$0", label: "Restocking fee" },
            { stat: "Free", label: "US shipping over $500" },
            { stat: "5 days", label: "Refund processing" },
          ].map((s) => (
            <div key={s.label} className="bg-ink-100 rounded-2xl p-6 text-center">
              <div className="font-display text-2xl font-bold text-ink-900">{s.stat}</div>
              <div className="text-sm text-ink-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl">
          {/* Returns */}
          <div>
            <h2 className="font-display text-2xl font-semibold text-ink-900 mb-5">Returns</h2>
            <div className="space-y-4 text-sm text-ink-700 leading-relaxed">
              <p>
                Return any VoltPak product within 30 days of delivery — opened or unopened, no questions asked.
                Unit must be in working condition with no physical damage caused after delivery.
              </p>
              <p>
                To start a return, email returns@voltpak.com with your order number.
                We'll reply within one business day with a prepaid shipping label.
              </p>
              <p>
                Refunds are issued to the original payment method within 5 business days of receiving
                the unit at our warehouse. You'll get an email confirmation when it lands.
              </p>
              <div className="bg-ink-100 rounded-xl p-4 mt-2">
                <div className="font-semibold text-ink-900 mb-2">What's not returnable</div>
                <ul className="space-y-1 text-ink-500">
                  {["Accessories under $30 (all sales final)", "Solar panels with visible field use or mounting marks", "Units with physical damage not present at delivery"].map(i => (
                    <li key={i} className="flex gap-2"><span className="text-ink-300 mt-1">·</span>{i}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Shipping */}
          <div>
            <h2 className="font-display text-2xl font-semibold text-ink-900 mb-5">Shipping</h2>
            <div className="space-y-5">
              {[
                { title: "Standard (Free on orders $500+)", body: "4–7 business days via FedEx or UPS Ground. Tracking emailed at dispatch." },
                { title: "Expedited — $19.99", body: "2–3 business days. Available at checkout. All 48 contiguous states." },
                { title: "Overnight — $39.99", body: "Next business day if ordered before 2 pm PT. Weekdays only." },
                { title: "Canada & international", body: "Available at checkout. Duties and import fees are the buyer's responsibility. We don't mark down values on customs forms." },
              ].map((s) => (
                <div key={s.title} className="border-t border-ink-100 pt-4 first:border-0 first:pt-0">
                  <div className="font-semibold text-ink-900 text-sm">{s.title}</div>
                  <p className="text-sm text-ink-500 mt-1">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14">
          <Link href="/support/contact" className="h-11 px-6 inline-flex items-center justify-center rounded-full bg-ink-900 text-white text-sm font-semibold hover:bg-ink-700 transition">
            Start a return or ask a shipping question →
          </Link>
        </div>
      </div>
    </div>
  );
}
