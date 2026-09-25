"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Picked up by Vercel logs; swap for Sentry.captureException when added.
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6 text-center">
      <div>
        <p className="text-eyebrow uppercase text-accent-hover mb-3">Error</p>
        <h1 className="font-display text-display text-ink-900">Something went wrong.</h1>
        <p className="mt-4 text-ink-500">An unexpected error occurred. Please try again.</p>
        <button
          onClick={reset}
          className="mt-8 inline-flex h-11 px-6 items-center justify-center rounded-full bg-ink-900 text-white text-sm font-semibold hover:bg-ink-700 transition"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
