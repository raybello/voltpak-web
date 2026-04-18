import { Feature } from "@/lib/specs";

// Alternates media left/right based on the row index supplied by the
// caller.  `tone` in the feature drives the dark/light background.
export default function FeatureBlock({
  feature,
  index,
}: {
  feature: Feature;
  index: number;
}) {
  const dark = feature.tone === "dark";
  const imageRight = index % 2 === 0;

  return (
    <section
      id={feature.id}
      className={`relative py-24 md:py-section overflow-hidden ${
        dark ? "bg-ink-900 text-white noise" : "bg-ink-100"
      }`}
    >
      <div className="max-w-container mx-auto px-6 md:px-8 grid md:grid-cols-2 gap-12 items-center">
        <div className={`reveal ${imageRight ? "order-1" : "order-1 md:order-2"}`}>
          <p
            className={`text-eyebrow uppercase mb-4 ${
              dark ? "text-accent" : "text-accent-hover"
            }`}
          >
            {feature.eyebrow}
          </p>
          <h2
            className={`font-display text-section ${
              dark ? "text-white" : "text-ink-900"
            }`}
          >
            {feature.title}
          </h2>
          <p
            className={`mt-6 text-lg leading-relaxed max-w-lg ${
              dark ? "text-ink-300" : "text-ink-500"
            }`}
          >
            {feature.body}
          </p>
          {feature.callouts && feature.callouts.length > 0 && (
            <div
              className={`mt-8 grid gap-6 max-w-md ${
                feature.callouts.length > 3 ? "grid-cols-4" : "grid-cols-3"
              }`}
            >
              {feature.callouts.map((c) => (
                <div key={c.label}>
                  <div
                    className={`text-2xl font-bold tabular ${
                      dark ? "text-accent" : "text-ink-900"
                    }`}
                  >
                    {c.value}
                  </div>
                  <div
                    className={`text-xs mt-1 ${
                      dark ? "text-ink-300" : "text-ink-500"
                    }`}
                  >
                    {c.label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={`reveal ${imageRight ? "order-2" : "order-2 md:order-1"}`}>
          {feature.media.type === "video" ? (
            <video
              className="rounded-2xl w-full aspect-[4/3] object-cover"
              src={feature.media.src}
              poster={feature.media.poster}
              autoPlay
              loop
              muted
              playsInline
            />
          ) : (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={feature.media.src}
              alt={feature.media.alt}
              className="rounded-2xl w-full aspect-[4/3] object-cover"
            />
          )}
        </div>
      </div>
    </section>
  );
}
