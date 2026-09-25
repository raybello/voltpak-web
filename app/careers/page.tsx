export const metadata = { title: "Careers · VoltPak" };

const ROLES: { title: string; type: string; location: string; body: string }[] = [];

export default function CareersPage() {
  return (
    <div className="pt-28 md:pt-32 pb-24">
      <div className="max-w-container mx-auto px-6 md:px-8">
        <div className="max-w-3xl mb-14">
          <p className="text-eyebrow uppercase text-accent-hover mb-3">Careers</p>
          <h1 className="font-display text-display text-ink-900">
            Build hardware that people actually open.
          </h1>
          <p className="mt-4 text-lg text-ink-500 leading-relaxed">
            Small team. Real engineering problems. We release our hardware as open source
            and keep the firmware proprietary. It's an unusual position to design for -
            and the people who find that interesting are the people we want to work with.
          </p>
        </div>

        {/* Values */}
        <div className="grid md:grid-cols-3 gap-5 mb-16">
          {[
            { t: "Small team, full ownership", b: "We don't have layers. If you design it, you ship it, you answer questions about it on Discord." },
            { t: "Honest work", b: "No performance theater. The product is the work. We measure by hardware that works and community that grows." },
            { t: "Community-first engineering", b: "Our open hardware model means you're designing for engineers who will pull apart your work and tell you exactly what they think." },
          ].map((v) => (
            <div key={v.t} className="bg-ink-100 rounded-2xl p-7">
              <div className="font-semibold text-ink-900 mb-2">{v.t}</div>
              <p className="text-sm text-ink-500 leading-relaxed">{v.b}</p>
            </div>
          ))}
        </div>

        {/* Open roles */}
        <h2 className="font-display text-2xl font-semibold text-ink-900 mb-6">Open roles</h2>
        <div className="space-y-4 mb-14">
          {ROLES.length === 0 ? (
            <div className="bg-ink-100 rounded-2xl p-7 text-ink-500">
              No open roles at this time. Check back soon.
            </div>
          ) : (
            ROLES.map((role) => (
              <div key={role.title} className="bg-white rounded-2xl border border-ink-100 p-7 hover:border-ink-300 transition">
                <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
                  <div>
                    <div className="font-semibold text-ink-900 text-lg">{role.title}</div>
                    <div className="text-sm text-ink-500 mt-0.5">{role.location} · {role.type}</div>
                  </div>
                  <a
                    href={`mailto:careers@voltpak.ca?subject=Application - ${role.title}`}
                    className="flex-shrink-0 h-9 px-5 inline-flex items-center rounded-full bg-ink-900 text-white text-sm font-semibold hover:bg-ink-700 transition"
                  >
                    Apply
                  </a>
                </div>
                <p className="text-sm text-ink-500 leading-relaxed">{role.body}</p>
              </div>
            ))
          )}
        </div>

        <div className="border-t border-ink-100 pt-10">
          <h3 className="font-semibold text-ink-900 mb-2">Don&apos;t see your role?</h3>
          <p className="text-sm text-ink-500 leading-relaxed">
            If you're a hardware or firmware engineer who's dug into our open hardware files
            or is active in the Discord, send us an email anyway at{" "}
            <a href="mailto:careers@voltpak.ca" className="text-accent-hover hover:text-accent transition-colors font-medium">careers@voltpak.ca</a>.
            People who understand the product from the inside are hard to find.
          </p>
        </div>
      </div>
    </div>
  );
}
