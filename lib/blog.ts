import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

/**
 * Blog pipeline
 * -------------
 * Marketing blog posts live as `.mdx` files in `public/blog`.
 *
 * Why `public/blog`?
 *   • Single source of truth - non-engineers can drop a file there and it ships.
 *   • Images referenced with absolute paths like `/media/assembly.jpg` just work.
 *   • Files are read at build time on the server; they do not ship to the client as-is.
 *     (The raw .mdx is also publicly fetchable as a static asset, which is fine for
 *     marketing content. Move this directory to `/content/blog` if you want it private.)
 */

export type BlogFrontmatter = {
  title: string;
  description: string;
  date: string; // ISO 8601 (YYYY-MM-DD)
  author?: string;
  cover?: string; // absolute path under /public, e.g. "/media/assembly.jpg"
  tags?: string[];
};

export type BlogPost = {
  slug: string;
  frontmatter: BlogFrontmatter;
  content: string;
};

const BLOG_DIR = path.join(process.cwd(), "public", "blog");

function safeReadDir(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));
}

function toSlug(filename: string): string {
  return filename.replace(/\.(mdx|md)$/i, "");
}

function readPostFile(filename: string): BlogPost | null {
  const full = path.join(BLOG_DIR, filename);
  if (!fs.existsSync(full)) return null;

  const raw = fs.readFileSync(full, "utf8");
  const { data, content } = matter(raw);

  // Minimal validation so missing frontmatter fails loudly at build time.
  const fm = data as Partial<BlogFrontmatter>;
  if (!fm.title || !fm.description || !fm.date) {
    throw new Error(
      `Blog post "${filename}" is missing required frontmatter (title, description, date).`,
    );
  }

  return {
    slug: toSlug(filename),
    frontmatter: {
      title: fm.title,
      description: fm.description,
      date: fm.date,
      author: fm.author,
      cover: fm.cover,
      tags: fm.tags ?? [],
    },
    content,
  };
}

/** Returns every post, newest first. */
export function getAllPosts(): BlogPost[] {
  return safeReadDir()
    .map(readPostFile)
    .filter((p): p is BlogPost => p !== null)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime(),
    );
}

/** Returns a single post by slug (the filename without extension). */
export function getPostBySlug(slug: string): BlogPost | null {
  const files = safeReadDir();
  const match = files.find((f) => toSlug(f) === slug);
  if (!match) return null;
  return readPostFile(match);
}

/** Formats an ISO date like "Mar 12, 2026". Safe for server rendering. */
export function formatPostDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
