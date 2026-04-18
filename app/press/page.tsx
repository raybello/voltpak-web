import Link from "next/link";
import { getAllPosts, formatPostDate } from "@/lib/blog";

export const metadata = { title: "Press · VoltPak" };

export default function PressPage() {
  const posts = getAllPosts();

  return (
    <div className="pt-28 md:pt-32 pb-24">
      <div className="max-w-container mx-auto px-6 md:px-8">
        <div className="max-w-3xl mb-14">
          <p className="text-eyebrow uppercase text-accent-hover mb-3">Press</p>
          <h1 className="font-display text-display text-ink-900">
            Media resources.
          </h1>
          <p className="mt-4 text-ink-500 leading-relaxed">
            Engineering notes, manufacturing deep-dives, and company perspective.
            For review units and press inquiries, reach out to press@voltpak.com.
          </p>
        </div>

        {/* Blog feed - replaces the old Recent coverage list. */}
        <div className="mb-16">
          <h2 className="font-display text-2xl font-semibold text-ink-900 mb-8">
            From the VoltPak team
          </h2>

          {posts.length === 0 ? (
            <div className="bg-ink-100 rounded-2xl p-8 text-ink-500">
              New posts are on the way. Check back soon.
            </div>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/press/${post.slug}`}
                  className="group flex items-start justify-between gap-6 bg-white rounded-2xl border border-ink-100 px-6 py-5 hover:border-ink-300 transition"
                >
                  <div className="min-w-0">
                    {post.frontmatter.tags && post.frontmatter.tags.length > 0 ? (
                      <div className="text-xs font-semibold text-accent-hover mb-1 uppercase tracking-wider">
                        {post.frontmatter.tags[0]}
                      </div>
                    ) : null}
                    <div className="font-medium text-ink-900 leading-snug group-hover:text-accent-hover transition-colors text-lg">
                      {post.frontmatter.title}
                    </div>
                    <p className="text-sm text-ink-500 mt-2 leading-relaxed line-clamp-2">
                      {post.frontmatter.description}
                    </p>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <div className="text-xs text-ink-500 whitespace-nowrap">
                      {formatPostDate(post.frontmatter.date)}
                    </div>
                    <div className="text-ink-300 group-hover:text-accent-hover mt-2 transition-colors">
                      →
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Brand assets */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-ink-100 rounded-2xl p-8">
            <h3 className="font-semibold text-ink-900 mb-3">Brand assets</h3>
            <p className="text-sm text-ink-500 leading-relaxed mb-5">
              Logo files in SVG, PNG (light and dark variants), and EPS.
              Product photography - high-res, white background and lifestyle.
              Brand guidelines PDF.
            </p>
            <a
              href="mailto:press@voltpak.com?subject=Brand assets request"
              className="text-sm font-semibold text-accent-hover hover:text-accent transition-colors"
            >
              Request press kit →
            </a>
          </div>
          <div className="bg-ink-100 rounded-2xl p-8">
            <h3 className="font-semibold text-ink-900 mb-3">Review units</h3>
            <p className="text-sm text-ink-500 leading-relaxed mb-5">
              We send review units to journalists, YouTubers, and community builders.
              We don&apos;t restrict what you say. We&apos;re confident enough in the hardware.
            </p>
            <a
              href="mailto:press@voltpak.com?subject=Review unit request"
              className="text-sm font-semibold text-accent-hover hover:text-accent transition-colors"
            >
              Request a review unit →
            </a>
          </div>
        </div>

        {/* Contact */}
        <div className="border-t border-ink-100 pt-10">
          <h3 className="font-semibold text-ink-900 mb-2">Press contact</h3>
          <p className="text-sm text-ink-500">
            <a
              href="mailto:press@voltpak.com"
              className="text-accent-hover hover:text-accent transition-colors font-medium"
            >
              press@voltpak.com
            </a>
            {" "}· Replies within one business day.
          </p>
        </div>
      </div>
    </div>
  );
}
