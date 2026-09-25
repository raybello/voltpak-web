export const metadata = { title: "Accessibility · VoltPak" };

export default function AccessibilityPage() {
  return (
    <div className="pt-28 md:pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-6 md:px-8">
        <p className="text-eyebrow uppercase text-accent-hover mb-3">Legal</p>
        <h1 className="font-display text-2xl md:text-4xl font-bold text-ink-900 mb-2">Accessibility Statement</h1>
        <p className="text-sm text-ink-500 mb-12">Last updated: April 2026</p>

        <div className="space-y-8 text-ink-500 leading-relaxed">
          <p>
            VoltPak is committed to making this website accessible to all users, including those using
            assistive technologies. We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 at Level AA.
          </p>
          {[
            {
              heading: "Current status",
              body: "We are actively working toward WCAG 2.1 AA compliance. Known areas of ongoing improvement include keyboard navigation for all interactive elements, sufficient color contrast across all UI states, and screen reader compatibility for dynamic content.",
            },
            {
              heading: "What we've done",
              body: "Semantic HTML throughout. ARIA labels on all icon-only buttons and interactive elements. Skip-to-content link available on every page. All product images include descriptive alt text. Color is not used as the sole indicator of state.",
            },
            {
              heading: "Feedback",
              body: "If you encounter a barrier on this site, please email accessibility@voltpak.ca. Include the URL of the page, the issue you encountered, and the assistive technology or browser you were using. We aim to respond within 5 business days.",
            },
            {
              heading: "Contact",
              body: "accessibility@voltpak.ca · VoltPak, Inc. · Ottawa, Ontario, Canada",
            },
          ].map((s) => (
            <div key={s.heading}>
              <h2 className="font-semibold text-ink-900 text-lg mb-2">{s.heading}</h2>
              <p>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
