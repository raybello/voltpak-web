export const metadata = { title: "Terms of Service · VoltPak" };

export default function TermsPage() {
  return (
    <div className="pt-28 md:pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-6 md:px-8">
        <p className="text-eyebrow uppercase text-accent-hover mb-3">Legal</p>
        <h1 className="font-display text-2xl md:text-4xl font-bold text-ink-900 mb-2">Terms of Service</h1>
        <p className="text-sm text-ink-500 mb-12">Last updated: April 2026</p>

        <div className="space-y-10 text-ink-500 leading-relaxed">
          {[
            {
              heading: "1. The product",
              body: "VoltPak, Inc. sells portable power inverter systems and accessories through this website. By purchasing, you agree to these terms.",
            },
            {
              heading: "2. Open hardware licence",
              body: "Hardware design files released on this site (schematics, PCB layouts, mechanical models) are provided under the CERN Open Hardware Licence v2 — Strongly Reciprocal. You may use, modify, and manufacture from them subject to those terms. The firmware running on VoltPak MCUs is proprietary and is not licensed for use, reproduction, or distribution.",
            },
            {
              heading: "3. Warranty",
              body: "All VoltPak products carry a 5-year limited warranty against manufacturing defects. Full warranty terms are available at voltpak.com/support/warranty. Opening the product for maintenance, fan replacement, or hardware inspection does not void the warranty. Flashing unauthorised firmware onto the MCU voids the warranty.",
            },
            {
              heading: "4. Returns",
              body: "Products may be returned within 30 days of delivery for a full refund, provided they are in working condition. See voltpak.com/support/returns for the complete policy.",
            },
            {
              heading: "5. Limitation of liability",
              body: "VoltPak hardware is designed and tested for safe operation within its rated parameters. We are not liable for damage resulting from operation outside rated parameters, physical damage, unauthorised modifications to firmware, or use in environments outside the stated operating range. Our total liability in any matter is limited to the purchase price of the product.",
            },
            {
              heading: "6. Governing law",
              body: "These terms are governed by the laws of the State of California. Any disputes will be resolved in the courts of San Francisco County, California.",
            },
            {
              heading: "7. Changes to these terms",
              body: "We may update these terms. Material changes will be communicated by email to registered users. Continued use of the site after changes constitutes acceptance.",
            },
            {
              heading: "8. Contact",
              body: "VoltPak, Inc. · legal@voltpak.com · 100 Brannan Street, San Francisco, CA 94107",
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
