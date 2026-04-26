"use client";

import { useState } from "react";
import { Product } from "@/lib/products";
import NotifyMeDialog from "./NotifyMeDialog";

type Variant = "primary" | "compact" | "hero" | "dark";

type Props = {
  product: Product;
  variant?: Variant;
  className?: string;
  label?: string;
  // When true, renders only the dialog trigger with no styling - useful when
  // the parent wants to provide its own button shell.
  asChild?: boolean;
  children?: React.ReactNode;
};

const variantClass: Record<Variant, string> = {
  // Used in BuyCard - full-width pill on the product page.
  primary:
    "h-12 px-6 rounded-full bg-ink-900 text-white text-sm font-semibold hover:bg-ink-700 transition w-full inline-flex items-center justify-center",
  // Used in StickyBuyBar - small pill in the header.
  compact:
    "h-9 px-5 rounded-full bg-ink-900 text-white text-xs font-semibold hover:bg-ink-700 transition inline-flex items-center justify-center",
  // Used in ProductHero / FinalCta on dark backgrounds - white pill.
  hero:
    "h-12 px-8 inline-flex items-center justify-center rounded-full bg-white text-ink-900 font-semibold hover:bg-ink-100 transition",
  // Used on dark sections where we want the brand accent.
  dark:
    "h-14 px-10 inline-flex items-center justify-center rounded-full bg-accent text-ink-900 font-semibold hover:bg-white transition",
};

export default function NotifyMeButton({
  product,
  variant = "primary",
  className,
  label = "Notify Me",
  asChild = false,
  children,
}: Props) {
  const [open, setOpen] = useState(false);

  if (asChild) {
    return (
      <>
        <span onClick={() => setOpen(true)} className={className}>
          {children ?? label}
        </span>
        <NotifyMeDialog
          product={product}
          open={open}
          onClose={() => setOpen(false)}
        />
      </>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={className ?? variantClass[variant]}
      >
        {children ?? label}
      </button>
      <NotifyMeDialog
        product={product}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
