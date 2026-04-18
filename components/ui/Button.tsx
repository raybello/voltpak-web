import Link from "next/link";
import { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "light";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200 ease-smooth focus-visible:outline-none";

const variants: Record<Variant, string> = {
  primary: "bg-ink-900 text-white hover:bg-ink-700",
  secondary:
    "bg-white text-ink-900 border border-ink-900/10 hover:border-ink-900/30",
  ghost:
    "bg-transparent text-ink-900 border border-ink-900 hover:bg-ink-900 hover:text-white",
  light:
    "bg-white text-ink-900 hover:bg-ink-100",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-5 text-sm",
  md: "h-12 px-7 text-sm",
  lg: "h-14 px-9 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
};

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...rest
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

export function LinkButton({
  href,
  variant = "primary",
  size = "md",
  className = "",
  children,
}: CommonProps & { href: string }) {
  return (
    <Link
      href={href}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </Link>
  );
}
