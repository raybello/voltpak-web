import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata = { title: "Launch List · VoltPak", robots: { index: false } };

const COPY: Record<string, { title: string; body: string }> = {
  confirmed: {
    title: "You're on the list.",
    body: "Thanks for confirming. We'll email you once when it's ready to order.",
  },
  unsubscribed: {
    title: "You've been unsubscribed.",
    body: "You won't receive any more Launch List emails from us.",
  },
  invalid: {
    title: "That link isn't valid.",
    body: "It may have expired. Head back to the site and sign up again.",
  },
  error: {
    title: "Something went wrong.",
    body: "We couldn't complete that request. Please try again in a moment.",
  },
};

export default async function NotifyStatusPage({ params }: { params: Promise<{ status: string }> }) {
  const { status } = await params;
  const c = COPY[status];
  if (!c) notFound();
  return (
    <div className="pt-28 md:pt-32 pb-24 max-w-container mx-auto px-6 md:px-8 min-h-[60vh]">
      <div className="max-w-lg mx-auto text-center py-12">
        <h1 className="font-display text-section text-ink-900">{c.title}</h1>
        <p className="mt-3 text-ink-500">{c.body}</p>
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
