import { DOWNLOADS_AVAILABLE } from "@/lib/downloads";
import type { ReactNode, HTMLAttributes, AnchorHTMLAttributes, ImgHTMLAttributes } from "react";

/**
 * MDXComponents
 * -------------
 * Two layers live here:
 *   1. Element overrides (h1, h2, p, a, img, table…) that style plain markdown.
 *   2. Custom JSX components authors can import-for-free inside .mdx:
 *        <Callout />, <DownloadCard />, <SpecLink />, <Figure />, <SpecTable />
 *
 * All styling uses the site's existing ink/accent palette so posts inherit the
 * Apple/DJI/Google-esque aesthetic of the rest of the site with no extra CSS.
 */

/* ──────────────────────────────────────────────────────────────
 * Markdown element overrides
 * ──────────────────────────────────────────────────────────────*/

function H1(props: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      className="font-display text-display text-ink-900 mt-0 mb-6 tracking-tight"
      {...props}
    />
  );
}

function H2(props: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className="font-display text-3xl md:text-4xl font-semibold text-ink-900 mt-16 mb-5 tracking-tight"
      {...props}
    />
  );
}

function H3(props: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className="font-display text-xl md:text-2xl font-semibold text-ink-900 mt-10 mb-3 tracking-tight"
      {...props}
    />
  );
}

function H4(props: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h4
      className="font-display text-lg font-semibold text-ink-900 mt-8 mb-2"
      {...props}
    />
  );
}

function Paragraph(props: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className="text-ink-700 leading-[1.75] text-[1.0625rem] mb-6"
      {...props}
    />
  );
}

function Anchor({ href = "#", ...rest }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const isExternal = /^https?:\/\//i.test(href);
  return (
    <a
      href={href}
      className="text-accent-hover underline decoration-ink-300 underline-offset-4 hover:decoration-accent-hover transition-colors"
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      {...rest}
    />
  );
}

function UnorderedList(props: HTMLAttributes<HTMLUListElement>) {
  return (
    <ul
      className="list-disc pl-6 marker:text-ink-300 text-ink-700 leading-[1.75] mb-6 space-y-2"
      {...props}
    />
  );
}

function OrderedList(props: HTMLAttributes<HTMLOListElement>) {
  return (
    <ol
      className="list-decimal pl-6 marker:text-ink-500 text-ink-700 leading-[1.75] mb-6 space-y-2"
      {...props}
    />
  );
}

function Blockquote(props: HTMLAttributes<HTMLQuoteElement>) {
  return (
    <blockquote
      className="border-l-2 border-accent pl-5 italic text-ink-700 my-8"
      {...props}
    />
  );
}

function InlineCode(props: HTMLAttributes<HTMLElement>) {
  return (
    <code
      className="bg-ink-100 text-ink-900 px-1.5 py-0.5 rounded text-[0.9em] font-mono"
      {...props}
    />
  );
}

function Pre(props: HTMLAttributes<HTMLPreElement>) {
  return (
    <pre
      className="bg-ink-900 text-ink-100 rounded-2xl p-6 overflow-x-auto text-sm leading-relaxed my-8 font-mono"
      {...props}
    />
  );
}

function Hr() {
  return <hr className="border-0 border-t border-ink-100 my-12" />;
}

function Table(props: HTMLAttributes<HTMLTableElement>) {
  return (
    <div className="my-8 overflow-x-auto">
      <table
        className="w-full text-sm border-collapse border border-ink-100 rounded-2xl overflow-hidden"
        {...props}
      />
    </div>
  );
}

function Thead(props: HTMLAttributes<HTMLTableSectionElement>) {
  return <thead className="bg-ink-100" {...props} />;
}

function Th(props: HTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className="text-left font-semibold text-ink-900 px-4 py-3 border-b border-ink-100"
      {...props}
    />
  );
}

function Td(props: HTMLAttributes<HTMLTableCellElement>) {
  return (
    <td
      className="text-ink-700 px-4 py-3 border-b border-ink-100 align-top"
      {...props}
    />
  );
}

function MdImage({ src = "", alt = "", ...rest }: ImgHTMLAttributes<HTMLImageElement>) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className="w-full h-auto rounded-2xl my-8 border border-ink-100"
      loading="lazy"
      {...rest}
    />
  );
}

/* ──────────────────────────────────────────────────────────────
 * Custom JSX components for authors
 * ──────────────────────────────────────────────────────────────*/

type CalloutVariant = "info" | "warn" | "success" | "note";

const calloutStyles: Record<CalloutVariant, string> = {
  info: "bg-accent/5 border-accent/30 text-ink-900",
  warn: "bg-amber-volt/5 border-amber-volt/40 text-ink-900",
  success: "bg-emerald-50 border-emerald-300 text-ink-900",
  note: "bg-ink-100 border-ink-100 text-ink-700",
};

export function Callout({
  variant = "info",
  title,
  children,
}: {
  variant?: CalloutVariant;
  title?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`my-8 border rounded-2xl px-6 py-5 ${calloutStyles[variant]}`}
    >
      {title ? (
        <div className="font-semibold text-ink-900 mb-2 text-sm uppercase tracking-wider">
          {title}
        </div>
      ) : null}
      <div className="text-[0.95rem] leading-relaxed [&>p]:mb-0">{children}</div>
    </div>
  );
}

type DownloadKind = "pdf" | "stl" | "zip" | "spec" | "manual";

const downloadLabel: Record<DownloadKind, string> = {
  pdf: "PDF",
  stl: "STL",
  zip: "ZIP",
  spec: "SPEC",
  manual: "MANUAL",
};

export function DownloadCard({
  href,
  title,
  description,
  type = "pdf",
}: {
  href: string;
  title: string;
  description?: string;
  type?: DownloadKind;
}) {
  const available = DOWNLOADS_AVAILABLE;
  const Tag = available ? "a" : "div";
  return (
    <Tag
      {...(available ? { href } : { "aria-disabled": true })}
      className="group not-prose flex items-start justify-between gap-6 bg-white rounded-2xl border border-ink-100 px-6 py-5 my-4 hover:border-ink-300 transition-colors no-underline"
    >
      <div className="min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-semibold tracking-wider text-accent-hover uppercase">
            {downloadLabel[type]}
          </span>
        </div>
        <div className="font-medium text-ink-900 leading-snug group-hover:text-accent-hover transition-colors">
          {title}
        </div>
        {description ? (
          <div className="text-sm text-ink-500 mt-1 leading-relaxed">
            {description}
          </div>
        ) : null}
      </div>
      <div className="flex-shrink-0 text-ink-300 group-hover:text-accent-hover mt-1 transition-colors text-xs">
        {available ? "↓" : "Available at launch"}
      </div>
    </Tag>
  );
}

export function SpecLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-1 text-accent-hover font-medium hover:text-accent transition-colors"
    >
      {children}
      <span aria-hidden>→</span>
    </a>
  );
}

export function Figure({
  src,
  caption,
  alt,
}: {
  src: string;
  caption?: string;
  alt?: string;
}) {
  return (
    <figure className="my-10">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt ?? caption ?? ""}
        className="w-full h-auto rounded-2xl border border-ink-100"
        loading="lazy"
      />
      {caption ? (
        <figcaption className="mt-3 text-sm text-ink-500 text-center">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

export function SpecTable({
  rows = [],
}: {
  rows?: Array<{ label: string; value: string; note?: string }>;
}) {
  if (!Array.isArray(rows) || rows.length === 0) return null;
  return (
    <div className="my-8 border border-ink-100 rounded-2xl overflow-hidden">
      <dl className="divide-y divide-ink-100">
        {rows.map((r) => (
          <div
            key={r.label}
            className="grid grid-cols-3 gap-4 px-6 py-4 items-baseline"
          >
            <dt className="text-sm text-ink-500 uppercase tracking-wider font-medium col-span-1">
              {r.label}
            </dt>
            <dd className="text-ink-900 font-medium col-span-2">
              {r.value}
              {r.note ? (
                <span className="block text-sm text-ink-500 mt-1 font-normal">
                  {r.note}
                </span>
              ) : null}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
 * Exported component map for next-mdx-remote
 * ──────────────────────────────────────────────────────────────*/

export const mdxComponents = {
  // Element overrides
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  p: Paragraph,
  a: Anchor,
  ul: UnorderedList,
  ol: OrderedList,
  blockquote: Blockquote,
  code: InlineCode,
  pre: Pre,
  hr: Hr,
  table: Table,
  thead: Thead,
  th: Th,
  td: Td,
  img: MdImage,
  // Custom JSX available inside any .mdx post
  Callout,
  DownloadCard,
  SpecLink,
  Figure,
  SpecTable,
};
