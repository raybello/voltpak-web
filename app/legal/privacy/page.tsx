export const metadata = { title: "Privacy Policy · VoltPak" };

export default function PrivacyPage() {
  const updated = "September 2026";
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
              body: "VoltPak is not yet selling products, so today we collect only what you give us: your email address if you join the Launch List (and the product you signed up for), and the name, email, optional serial number and message if you use the support contact form. When ordering opens, we will also collect the information needed to process and ship orders, and this policy will be updated before that happens.",
            },
            {
              heading: "What we don't collect",
              body: "We don't sell your data. We don't run ad targeting. We don't build profiles for marketing partners. We collect the minimum required to operate the site and answer your questions.",
            },
            {
              heading: "Newsletter and email",
              body: "When you join the Launch List we first send a confirmation email; you are only added to the list after you click the link (double opt-in). We then email you about product availability and occasional launch updates such as teardowns, mod guides and firmware notes. Every email includes an unsubscribe link and you can unsubscribe at any time. Email delivery and the list itself are handled by our email provider, Resend, which processes your address on our behalf.",
            },
            {
              heading: "Analytics",
              body: "This site does not currently use analytics or advertising trackers. If we add privacy-friendly analytics in future we will list it here before enabling it.",
            },
            {
              heading: "Cookies",
              body: "We do not set tracking or advertising cookies. Your shopping cart, if you use it, is saved in your browser's local storage on your own device and is never sent to us until checkout opens.",
            },
            {
              heading: "Data retention",
              body: "Launch List addresses are kept until you unsubscribe. Support messages are kept for up to 3 years. Order and warranty records, once ordering opens, will be retained as required for accounting and warranty purposes. To request deletion of your personal data, email privacy@voltpak.ca.",
            },
            {
              heading: "Your rights",
              body: "You have the right to access, correct, or delete any personal data we hold about you. To make a request, email privacy@voltpak.ca. We'll respond within 30 days. If you are in the EU or UK, you also have the right to lodge a complaint with your local data protection authority.",
            },
            {
              heading: "Contact",
              body: "VoltPak, Inc. · Ottawa, Ontario, Canada · privacy@voltpak.ca",
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
