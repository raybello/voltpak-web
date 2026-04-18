export default function FaqSection({
  items,
  title = "Answers, before you ask.",
  eyebrow = "FAQ",
}: {
  items: { q: string; a: string }[];
  title?: string;
  eyebrow?: string;
}) {
  if (items.length === 0) return null;
  return (
    <section className="bg-white py-24 md:py-section">
      <div className="max-w-3xl mx-auto px-6 md:px-8">
        <div className="text-center mb-12 reveal">
          <p className="text-eyebrow uppercase text-accent-hover mb-4">{eyebrow}</p>
          <h2 className="font-display text-section text-ink-900">{title}</h2>
        </div>
        <div className="divide-y divide-ink-100 border-t border-b border-ink-100">
          {items.map((f, i) => (
            <details
              key={f.q}
              className="group py-5 reveal"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              <summary className="flex justify-between items-center cursor-pointer list-none">
                <span className="text-ink-900 font-medium pr-4">{f.q}</span>
                <span className="text-ink-500 group-open:rotate-45 transition-transform text-2xl leading-none shrink-0">
                  +
                </span>
              </summary>
              <p className="mt-3 text-ink-500 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
