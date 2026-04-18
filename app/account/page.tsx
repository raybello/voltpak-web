import SignInForm from "@/components/account/SignInForm";

export const metadata = { title: "Account · VoltPak" };

export default function AccountPage() {
  return (
    <div className="pt-28 md:pt-32 pb-24">
      <div className="max-w-container mx-auto px-6 md:px-8">
        <div className="max-w-md mx-auto">
          <p className="text-eyebrow uppercase text-accent-hover mb-3">Account</p>
          <h1 className="font-display text-3xl font-bold text-ink-900 mb-2">Sign in</h1>
          <p className="text-ink-500 mb-10 text-sm">
            Register your unit to activate extended warranty, track orders, and access
            firmware changelogs.
          </p>

          <SignInForm />

          <div className="mt-8 pt-8 border-t border-ink-100 text-sm text-center text-ink-500">
            Don&apos;t have an account?{" "}
            <a
              href="#register"
              className="text-accent-hover hover:text-accent font-semibold transition-colors"
            >
              Register here →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
