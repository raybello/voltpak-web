import { SpecGroup } from "@/lib/specs";

export default function SpecSheet({
  groups,
  title = "Specifications",
  eyebrow = "Specs",
}: {
  groups: SpecGroup[];
  title?: string;
  eyebrow?: string;
}) {
  return (
    <section id="specs" className="bg-white py-24 md:py-section">
      <div className="max-w-container mx-auto px-6 md:px-8">
        <div className="max-w-2xl mb-10 reveal">
          <p className="text-eyebrow uppercase text-accent-hover mb-4">
            {eyebrow}
          </p>
          <h2 className="font-display text-section text-ink-900">{title}</h2>
        </div>

        {/* Two-column flow layout - long groups wrap naturally */}
        <div className="grid md:grid-cols-2 gap-x-12">
          {groups.map((g) => (
            <div key={g.group} className="reveal mb-8 break-inside-avoid-page">
              <div className="text-xs uppercase tracking-widest font-semibold text-ink-500 mb-4">
                {g.group}
              </div>
              <dl>
                {g.rows.map((r) => (
                  <div
                    key={r.label}
                    className="flex justify-between gap-6 py-3 border-b border-ink-100"
                  >
                    <dt className="text-ink-500 text-sm">{r.label}</dt>
                    <dd className="text-ink-900 text-sm text-right tabular">
                      {r.value}
                      {r.note && (
                        <span className="block text-ink-500 text-xs font-normal mt-0.5">
                          {r.note}
                        </span>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
