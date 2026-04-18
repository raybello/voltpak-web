"use client";

export default function ContactForm() {
  return (
    <div className="bg-ink-100 rounded-2xl p-8">
      <h2 className="font-semibold text-ink-900 mb-5">Send a message</h2>
      <form
        className="space-y-4"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-ink-700 mb-1">
              First name
            </label>
            <input
              type="text"
              className="w-full h-10 rounded-lg border border-ink-100 bg-white px-3 text-sm text-ink-900 focus:outline-none focus:border-accent"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-ink-700 mb-1">
              Last name
            </label>
            <input
              type="text"
              className="w-full h-10 rounded-lg border border-ink-100 bg-white px-3 text-sm text-ink-900 focus:outline-none focus:border-accent"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-ink-700 mb-1">
            Email
          </label>
          <input
            type="email"
            className="w-full h-10 rounded-lg border border-ink-100 bg-white px-3 text-sm text-ink-900 focus:outline-none focus:border-accent"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-ink-700 mb-1">
            Subject
          </label>
          <select className="w-full h-10 rounded-lg border border-ink-100 bg-white px-3 text-sm text-ink-900 focus:outline-none focus:border-accent">
            <option>Order or shipping question</option>
            <option>Warranty claim</option>
            <option>Return or refund</option>
            <option>Technical issue</option>
            <option>Mod / hardware question</option>
            <option>Press or partnerships</option>
            <option>Other</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-ink-700 mb-1">
            Serial number (if applicable)
          </label>
          <input
            type="text"
            placeholder="VP1000-XXXXXX"
            className="w-full h-10 rounded-lg border border-ink-100 bg-white px-3 text-sm text-ink-900 placeholder:text-ink-300 focus:outline-none focus:border-accent"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-ink-700 mb-1">
            Message
          </label>
          <textarea
            rows={4}
            className="w-full rounded-lg border border-ink-100 bg-white px-3 py-2 text-sm text-ink-900 focus:outline-none focus:border-accent resize-none"
          />
        </div>
        <button
          type="submit"
          className="w-full h-11 rounded-full bg-ink-900 text-white text-sm font-semibold hover:bg-ink-700 transition"
        >
          Send message
        </button>
      </form>
    </div>
  );
}
