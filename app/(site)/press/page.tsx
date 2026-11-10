import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts, formatPostDate } from "@/lib/blog";

const SITE_URL = "https://voltpak.ca";
const POSTS_PER_PAGE = 4;

export const metadata: Metadata = {
  title: "Press · VoltPak",
  description:
    "Engineering notes, manufacturing deep-dives, and company perspective from the VoltPak team. For review units and press inquiries contact press@voltpak.ca.",
  alternates: { canonical: "/press" },
  openGraph: {
    title: "Press · VoltPak",
    description:
      "Engineering notes, manufacturing deep-dives, and company perspective from the VoltPak team.",
    url: `${SITE_URL}/press`,
    siteName: "VoltPak",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Press · VoltPak",
    description:
      "Engineering notes, manufacturing deep-dives, and company perspective from the VoltPak team.",
  },
};

export default async function PressPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const allPosts = getAllPosts();
  const { page: pageParam } = await searchParams;
  const rawPage = parseInt(pageParam ?? "1", 10);
  const totalPages = Math.max(1, Math.ceil(allPosts.length / POSTS_PER_PAGE));
  const currentPage = Math.min(Math.max(1, isNaN(rawPage) ? 1 : rawPage), totalPages);
  const posts = allPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE,
  );

  return (
    <div className="pt-28 md:pt-32 pb-24">
      <div className="max-w-container mx-auto px-6 md:px-8">

        {/* Page header */}
        <div className="max-w-3xl mb-14">
          <p className="text-eyebrow uppercase text-accent-hover mb-3">Press</p>
          <h1 className="font-display text-display text-ink-900">
            Media resources.
          </h1>
          <p className="mt-4 text-ink-500 leading-relaxed">
            Engineering notes, manufacturing deep-dives, and company perspective.
            For review units and press inquiries, reach out to{" "}
            <a
              href="mailto:press@voltpak.ca"
              className="text-accent-hover hover:text-accent transition-colors font-medium"
            >
              press@voltpak.ca
            </a>
            .
          </p>
        </div>

        {/* Blog feed */}
        <div className="mb-16">
          <div className="flex items-baseline justify-between mb-8">
            <h2 className="font-display text-2xl font-semibold text-ink-900">
              From the VoltPak team
            </h2>
            {totalPages > 1 && (
              <p className="text-sm text-ink-500">
                Page {currentPage} of {totalPages}
              </p>
            )}
          </div>

          {posts.length === 0 ? (
            <div className="bg-ink-100 rounded-2xl p-8 text-ink-500">
              New posts are on the way. Check back soon.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/press/${post.slug}`}
                  className="group flex flex-col bg-white rounded-2xl border border-ink-100 overflow-hidden hover:border-ink-300 hover:shadow-sm transition-all duration-200"
                >
                  {/* Thumbnail */}
                  <div className="relative w-full aspect-[16/9] bg-ink-100 overflow-hidden">
                    {post.frontmatter.cover ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={post.frontmatter.cover}
                        alt=""
                        className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-ink-800 flex items-center justify-center">
                        <span className="text-ink-500 text-sm font-medium">VoltPak</span>
                      </div>
                    )}
                    {/* Tag badge */}
                    {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
                      <span className="absolute top-3 left-3 text-xs font-semibold uppercase tracking-wider bg-ink-900/80 text-amber-volt backdrop-blur-sm px-2.5 py-1 rounded-full">
                        {post.frontmatter.tags[0]}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 p-5">
                    <div className="flex-1">
                      <div className="font-semibold text-ink-900 leading-snug group-hover:text-accent-hover transition-colors text-base mb-2">
                        {post.frontmatter.title}
                      </div>
                      <p className="text-sm text-ink-500 leading-relaxed line-clamp-2">
                        {post.frontmatter.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-ink-100">
                      <span className="text-xs text-ink-500">
                        {formatPostDate(post.frontmatter.date)}
                        {post.frontmatter.author ? (
                          <> · {post.frontmatter.author}</>
                        ) : null}
                      </span>
                      <span className="text-ink-300 group-hover:text-accent-hover transition-colors text-sm">
                        →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              {currentPage > 1 && (
                <Link
                  href={`/press${currentPage - 1 === 1 ? "" : `?page=${currentPage - 1}`}`}
                  className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-ink-700 bg-white border border-ink-100 rounded-lg hover:border-ink-300 hover:text-accent-hover transition-all"
                >
                  ← Prev
                </Link>
              )}

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Link
                  key={page}
                  href={`/press${page === 1 ? "" : `?page=${page}`}`}
                  className={`w-9 h-9 flex items-center justify-center text-sm font-medium rounded-lg border transition-all ${
                    page === currentPage
                      ? "bg-ink-900 text-white border-ink-900"
                      : "bg-white text-ink-700 border-ink-100 hover:border-ink-300 hover:text-accent-hover"
                  }`}
                >
                  {page}
                </Link>
              ))}

              {currentPage < totalPages && (
                <Link
                  href={`/press?page=${currentPage + 1}`}
                  className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-ink-700 bg-white border border-ink-100 rounded-lg hover:border-ink-300 hover:text-accent-hover transition-all"
                >
                  Next →
                </Link>
              )}
            </div>
          )}
        </div>

        {/* Review units CTA */}
        <div className="bg-ink-100 rounded-2xl p-8 mb-16">
          <h3 className="font-semibold text-ink-900 mb-3">Review units</h3>
          <p className="text-sm text-ink-500 leading-relaxed mb-5">
            We send review units to journalists, YouTubers, and community
            builders. We don&apos;t restrict what you say. We&apos;re confident
            enough in the hardware.
          </p>
          <a
            href="mailto:press@voltpak.ca?subject=Review unit request"
            className="text-sm font-semibold text-accent-hover hover:text-accent transition-colors"
          >
            Request a review unit →
          </a>
        </div>

        {/* Press contact */}
        <div className="border-t border-ink-100 pt-10">
          <h3 className="font-semibold text-ink-900 mb-2">Press contact</h3>
          <p className="text-sm text-ink-500">
            <a
              href="mailto:press@voltpak.ca"
              className="text-accent-hover hover:text-accent transition-colors font-medium"
            >
              press@voltpak.ca
            </a>
            {" "}· Replies within one business day.
          </p>
        </div>
      </div>
    </div>
  );
}
