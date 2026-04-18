"use client";

export default function SignInForm() {
  return (
    <form
      className="space-y-4"
      onSubmit={(e) => e.preventDefault()}
    >
      <div>
        <label className="block text-xs font-semibold text-ink-700 mb-1">
          Email
        </label>
        <input
          type="email"
          className="w-full h-11 rounded-xl border border-ink-100 bg-white px-4 text-sm text-ink-900 focus:outline-none focus:border-accent"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold text-ink-700 mb-1">
          Password
        </label>
        <input
          type="password"
          className="w-full h-11 rounded-xl border border-ink-100 bg-white px-4 text-sm text-ink-900 focus:outline-none focus:border-accent"
        />
      </div>
      <button
        type="submit"
        className="w-full h-11 rounded-full bg-ink-900 text-white text-sm font-semibold hover:bg-ink-700 transition"
      >
        Sign in
      </button>
    </form>
  );
}
