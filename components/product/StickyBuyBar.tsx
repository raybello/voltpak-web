"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/components/cart/CartContext";
import { formatPrice } from "@/lib/format";
import { Product } from "@/lib/products";

const ANCHORS = [
  { id: "overview", label: "Overview" },
  { id: "features", label: "Features" },
  { id: "specs", label: "Specs" },
  { id: "in-the-box", label: "In the Box" },
];

export default function StickyBuyBar({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState<string>("overview");

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    ANCHORS.forEach((a) => {
      const el = document.getElementById(a.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <div
      className={`fixed top-14 left-0 right-0 z-30 glass border-b border-ink-100 transition-all duration-300 ease-smooth ${
        visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
      }`}
      aria-hidden={!visible}
    >
      <div className="max-w-container mx-auto px-6 md:px-8 h-12 flex items-center justify-between gap-4">
        <div className="flex items-center gap-6 min-w-0">
          <span className="font-semibold text-sm text-ink-900 truncate">
            {product.name}
          </span>
          <nav className="hidden md:flex items-center gap-5 text-sm">
            {ANCHORS.map((a) => (
              <a
                key={a.id}
                href={`#${a.id}`}
                className={`transition-colors ${
                  active === a.id
                    ? "text-ink-900 font-medium"
                    : "text-ink-500 hover:text-ink-900"
                }`}
              >
                {a.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline text-sm text-ink-500 tabular">
            {formatPrice(product.price)}
          </span>
          <button
            onClick={() =>
              addItem({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
              })
            }
            className="h-9 px-5 rounded-full bg-ink-900 text-white text-xs font-semibold hover:bg-ink-700 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
