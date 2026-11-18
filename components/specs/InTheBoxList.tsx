export default function InTheBoxList({
  items,
  image = "/media/assembly.jpg",
  title = "Everything you need. Nothing you don't.",
}: {
  items: string[];
  image?: string;
  title?: string;
}) {
  if (items.length === 0) return null;
  return (
    <section id="in-the-box" className="bg-ink-100 py-24 md:py-section">
      <div className="max-w-container mx-auto px-6 md:px-8 grid md:grid-cols-1 gap-12 items-center">
        <div className="reveal">
          <p className="text-eyebrow uppercase text-accent-hover mb-4">In the box</p>
          <h2 className="font-display text-section text-ink-900">{title}</h2>
          <ul className="mt-8 space-y-4 text-ink-700">
            {items.map((i) => (
              <li
                key={i}
                className="flex items-start gap-3 border-b border-ink-300/50 pb-4"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="mt-0.5 shrink-0">
                  <path
                    d="m5 12 4 4L19 7"
                    stroke="#00A8CC"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <span>{i}</span>
              </li>
            ))}
          </ul>
        </div>
        {/* <div className="reveal">
          <img
            src={image}
            alt="In-the-box contents"
            className="rounded-2xl w-full object-cover aspect-square"
          />
        </div> */}
      </div>
    </section>
  );
}
