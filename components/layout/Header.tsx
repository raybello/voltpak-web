"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useCart } from "@/components/cart/CartContext";

const LINKS = [
  { href: "/shop", label: "Power Stations" },
  { href: "/shop?category=battery", label: "Batteries" },
  { href: "/shop?category=solar", label: "Solar" },
  { href: "/shop?category=accessory", label: "Accessories" },
  { href: "/compare", label: "Compare" },
  { href: "/support", label: "Support" },
];

export default function Header() {
  const { itemCount, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-smooth ${
        scrolled
          ? "glass border-b border-ink-100"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-container mx-auto px-6 md:px-8">
        <div className="flex items-center justify-between h-14">
          <Link
            href="/"
            className="flex items-center"
            aria-label="VoltPak home"
          >
            <Image
              src="/media/logo.png"
              alt="VoltPak"
              width={120}
              height={34}
              className="h-8 w-auto object-contain"
              priority
            />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm text-ink-700 hover:text-accent-hover transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <button
              aria-label="Search"
              className="hidden sm:inline-flex text-ink-700 hover:text-accent-hover transition-colors"
            >
              <SearchIcon />
            </button>
            <Link
              href="/account"
              aria-label="Account"
              className="hidden sm:inline-flex text-ink-700 hover:text-accent-hover transition-colors"
            >
              <UserIcon />
            </Link>
            <button
              aria-label={`Cart, ${itemCount} items`}
              onClick={openCart}
              className="relative text-ink-700 hover:text-accent-hover transition-colors"
            >
              <BagIcon />
              {itemCount > 0 && (
                <span
                  className="absolute -top-1.5 -right-1.5 bg-accent text-[10px] font-semibold h-4 min-w-[16px] px-1 rounded-full flex items-center justify-center text-ink-900"
                  aria-hidden
                >
                  {itemCount}
                </span>
              )}
            </button>
            <button
              className="md:hidden text-ink-700"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Menu"
            >
              {mobileOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden glass border-t border-ink-100">
          <nav className="px-6 py-4 flex flex-col gap-4">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-base text-ink-700 hover:text-accent-hover"
                onClick={() => setMobileOpen(false)}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function UserIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4 20c1.5-4 5-6 8-6s6.5 2 8 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function BagIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 8h14l-1 12H6L5 8Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M9 8a3 3 0 1 1 6 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
