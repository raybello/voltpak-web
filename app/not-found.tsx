import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6 text-center">
      <div>
        <p className="text-eyebrow uppercase text-accent-hover mb-3">404</p>
        <h1 className="font-display text-display text-ink-900">
          This page is off-grid.
        </h1>
        <p className="mt-4 text-ink-500">
          We couldn't find what you're looking for.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex h-11 px-6 items-center justify-center rounded-full bg-ink-900 text-white text-sm font-semibold hover:bg-ink-700 transition"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
