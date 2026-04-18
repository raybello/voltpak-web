export const metadata = { title: "Privacy Policy · VoltPak" };

export default function PrivacyPage() {
  const updated = "April 2026";
  return (
    <div className="pt-28 md:pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-6 md:px-8">
        <p className="text-eyebrow uppercase text-accent-hover mb-3">Legal</p>
        <h1 className="font-display text-2xl md:text-4xl font-bold text-ink-900 mb-2">Privacy Policy</h1>
        <p className="text-sm text-ink-500 mb-12">Last updated: {updated}</p>

        <div className="space-y-10 text-ink-700 leading-relaxed">
          {[
            {
              heading: "What we collect",
              body: "When you make a purchase, we collect the information necessary to process and ship your order: name, email, shipping address, and payment details. Payment data is handled by our payment processor (Stripe) and is never stored on our servers. If you register a product, we store your email and unit serial number. If you contact support, we store your messages to provide assistance.",
            },
            {
              heading: "What we don't collect",
              body: "We don't sell your data. We don't run ad targeting. We don't build profiles for marketing partners. We collect the minimum required to operate the store and provide support. If you don't buy anything or contact us, we have nothing on you.",
            },
            {
              heading: "Newsletter and email",
              body: "If you sign up for the newsletter, we store your email address and send you product updates, firmware changelogs, and early access offers. You can unsubscribe at any time via the link in any email. We use Mailchimp for email delivery. Mailchimp receives your email address and tracks open rates — this is noted in their own privacy policy.",
            },
            {
              heading: "Analytics",
              body: "This site uses Plausible Analytics, a privacy-first analytics tool that does not use cookies, does not fingerprint visitors, and does not send data to Google. We can see aggregate traffic numbers — pages visited, referrers, country-level location — but nothing that identifies individual visitors.",
            },
            {
              heading: "Cookies",
              body: "We use session cookies for cart functionality. That's it. No tracking cookies, no third-party advertising cookies.",
            },
            {
              heading: "Data retention",
              body: "Order records are retained for 7 years for accounting and warranty purposes. Support conversations are retained for 3 years. Newsletter subscribers are retained until you unsubscribe. You can request deletion of your personal data at any time by emailing privacy@voltpak.com.",
            },
            {
              heading: "Your rights",
              body: "You have the right to access, correct, or delete any personal data we hold about you. To make a request, email privacy@voltpak.com. We'll respond within 30 days. If you are in the EU or UK, you also have the right to lodge a complaint with your local data protection authority.",
            },
            {
              heading: "Contact",
              body: "VoltPak, Inc. · 100 Brannan Street, San Francisco, CA 94107 · privacy@voltpak.com",
            },
          ].map((s) => (
            <div key={s.heading}>
              <h2 className="font-semibold text-ink-900 text-lg mb-2">{s.heading}</h2>
              <p className="text-ink-500">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
