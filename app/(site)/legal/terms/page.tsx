export const metadata = { title: "Terms of Service · VoltPak" };

export default function TermsPage() {
  return (
    <div className="pt-28 md:pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-6 md:px-8">
        <p className="text-eyebrow uppercase text-accent-hover mb-3">Legal</p>
        <h1 className="font-display text-2xl md:text-4xl font-bold text-ink-900 mb-2">Terms of Service</h1>
        <p className="text-sm text-ink-500 mb-12">Last updated: September 2026</p>

        <div className="space-y-10 text-ink-500 leading-relaxed">
          {[
            {
              heading: "1. The product",
              body: "VoltPak, Inc. designs portable power inverter systems and accessories. Products shown on this website are pre-launch and are not yet available to order; specifications, pricing and availability are subject to change and are not an offer for sale. By using this site (and, once ordering opens, by purchasing), you agree to these terms.",
            },
            {
              heading: "2. Open hardware licence",
              body: "Hardware design files released on this site (schematics, PCB layouts, mechanical models) are provided under the CERN Open Hardware Licence v2 - Strongly Reciprocal. You may use, modify, and manufacture from them subject to those terms. The firmware running on VoltPak MCUs is proprietary and is not licensed for use, reproduction, or distribution.",
            },
            {
              heading: "3. Warranty",
              body: "All VoltPak products carry a 5-year limited warranty against manufacturing defects. Full warranty terms are available at voltpak.ca/support/warranty. Opening the product for maintenance, fan replacement, or hardware inspection does not void the warranty. Flashing unauthorised firmware onto the MCU voids the warranty.",
            },
            {
              heading: "4. Returns",
              body: "Products may be returned within 30 days of delivery for a full refund, provided they are in working condition. See voltpak.ca/support/returns for the complete policy.",
            },
            {
              heading: "5. Limitation of liability",
              body: "VoltPak hardware is designed and tested for safe operation within its rated parameters. We are not liable for damage resulting from operation outside rated parameters, physical damage, unauthorised modifications to firmware, or use in environments outside the stated operating range. Our total liability in any matter is limited to the purchase price of the product.",
            },
            {
              heading: "6. Governing law",
              body: "These terms are governed by the laws of the Province of Ontario and the federal laws of Canada applicable therein. Any disputes will be resolved in the courts of Ottawa, Ontario, Canada.",
            },
            {
              heading: "7. Changes to these terms",
              body: "We may update these terms. Material changes will be communicated by email to registered users. Continued use of the site after changes constitutes acceptance.",
            },
            {
              heading: "8. Contact",
              body: "VoltPak, Inc. · legal@voltpak.ca · Ottawa, Ontario, Canada",
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
