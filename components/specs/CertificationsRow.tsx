export default function CertificationsRow({ items }: { items: string[] }) {
  if (items.length === 0) return null;
  return (
    <section className="bg-white py-16 border-t border-ink-100">
      <div className="max-w-container mx-auto px-6 md:px-8 text-center">
        <p className="text-eyebrow uppercase text-accent-hover mb-4">
          Certification roadmap
        </p>
        <p className="text-sm text-ink-500 max-w-xl mx-auto mb-6">
          Not yet certified. These are the standards we are designing to and
          plan to pursue before shipping. No certification has been granted
          and no listing should be assumed.
        </p>
        <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-3 text-sm tabular text-ink-700">
          {items.map((c) => (
            <span
              key={c}
              className="px-3 py-1 rounded-full border border-ink-100 bg-ink-100/50 font-semibold tracking-wide"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
