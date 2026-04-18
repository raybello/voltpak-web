export const metadata = { title: "Account · VoltPak" };

export default function AccountPage() {
  return (
    <div className="pt-28 md:pt-32 pb-24">
      <div className="max-w-container mx-auto px-6 md:px-8">
        <div className="max-w-md mx-auto">
          <p className="text-eyebrow uppercase text-accent-hover mb-3">Account</p>
          <h1 className="font-display text-3xl font-bold text-ink-900 mb-2">Sign in</h1>
          <p className="text-ink-500 mb-10 text-sm">
            Register your unit to activate extended warranty, track orders, and access firmware changelogs.
          </p>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-xs font-semibold text-ink-700 mb-1">Email</label>
              <input
                type="email"
                className="w-full h-11 rounded-xl border border-ink-100 bg-white px-4 text-sm text-ink-900 focus:outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink-700 mb-1">Password</label>
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

          <div className="mt-8 pt-8 border-t border-ink-100 text-sm text-center text-ink-500">
            Don&apos;t have an account?{" "}
            <a href="#register" className="text-accent-hover hover:text-accent font-semibold transition-colors">
              Register here →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
