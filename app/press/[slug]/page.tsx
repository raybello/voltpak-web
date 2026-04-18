import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

import { getAllPosts, getPostBySlug, formatPostDate } from "@/lib/blog";
import { mdxComponents } from "@/components/blog/MDXComponents";

type Params = { slug: string };

/**
 * Pre-render every post at build time so pages are static-fast.
 * New posts: add a file under public/blog and redeploy.
 */
export async function generateStaticParams(): Promise<Params[]> {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: "Post not found · VoltPak" };

  const { title, description, cover } = post.frontmatter;
  return {
    title: `${title} · VoltPak`,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      images: cover ? [{ url: cover }] : undefined,
    },
  };
}

export default function BlogPostPage({ params }: { params: Params }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const { frontmatter, content } = post;

  return (
    <article className="pt-28 md:pt-32 pb-24">
      <div className="max-w-container mx-auto px-6 md:px-8">
        <Link
          href="/press"
          className="inline-flex items-center gap-2 text-sm text-ink-500 hover:text-accent-hover transition-colors mb-10"
        >
          <span aria-hidden>←</span> All posts
        </Link>

        <header className="max-w-3xl mb-14">
          {frontmatter.tags && frontmatter.tags.length > 0 ? (
            <p className="text-eyebrow uppercase text-accent-hover mb-3">
              {frontmatter.tags[0]}
            </p>
          ) : null}
          <h1 className="font-display text-display text-ink-900 tracking-tight">
            {frontmatter.title}
          </h1>
          <p className="mt-4 text-ink-500 leading-relaxed text-lg">
            {frontmatter.description}
          </p>
          <div className="mt-6 flex items-center gap-4 text-sm text-ink-500">
            <span>{formatPostDate(frontmatter.date)}</span>
            {frontmatter.author ? (
              <>
                <span aria-hidden>·</span>
                <span>{frontmatter.author}</span>
              </>
            ) : null}
          </div>
        </header>

        {frontmatter.cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={frontmatter.cover}
            alt=""
            className="w-full h-auto rounded-2xl border border-ink-100 mb-14"
          />
        ) : null}

        <div className="max-w-3xl mx-auto">
          <MDXRemote
            source={content}
            components={mdxComponents}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm, remarkMath],
                rehypePlugins: [rehypeKatex],
              },
            }}
          />
        </div>

        <div className="max-w-3xl mx-auto border-t border-ink-100 mt-20 pt-8">
          <Link
            href="/press"
            className="text-sm font-semibold text-accent-hover hover:text-accent transition-colors"
          >
            ← Back to press
          </Link>
        </div>
      </div>
    </article>
  );
}
