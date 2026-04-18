import { Highlight } from "@/lib/specs";

export default function HighlightsBand({ items }: { items: Highlight[] }) {
  return (
    <section className="bg-white py-24 md:py-section border-b border-ink-100">
      <div className="max-w-container mx-auto px-6 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 text-center">
        {items.map((s, i) => (
          <div
            key={s.label}
            className="reveal"
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <div className="font-display text-display text-ink-900 tabular">
              {s.stat}
            </div>
            <div className="mt-3 text-ink-900 font-semibold text-sm uppercase tracking-wider">
              {s.label}
            </div>
            {s.note && <div className="mt-1 text-ink-500 text-sm">{s.note}</div>}
          </div>
        ))}
      </div>
    </section>
  );
}
