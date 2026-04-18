"use client";

import Link from "next/link";
import { useCart } from "./CartContext";
import { formatPrice } from "@/lib/format";
import { PRODUCTS } from "@/lib/products";

const UPSELL_IDS = ["vp-solar-220", "vp-car-cable", "vp-battery-ext"];

export default function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    subtotal,
    addItem,
  } = useCart();

  const upsells = PRODUCTS.filter(
    (p) => UPSELL_IDS.includes(p.id) && !items.some((i) => i.id === p.id)
  ).slice(0, 2);

  const freeShipThreshold = 500;
  const progress = Math.min(1, subtotal / freeShipThreshold);
  const remaining = Math.max(0, freeShipThreshold - subtotal);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeCart}
        aria-hidden={!isOpen}
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 h-full z-50 w-full sm:w-[440px] bg-white shadow-2xl flex flex-col transition-transform duration-400 ease-smooth ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!isOpen}
        role="dialog"
        aria-label="Shopping cart"
      >
        <header className="flex items-center justify-between px-6 h-14 border-b border-ink-100">
          <div className="flex items-center gap-2">
            <span className="font-display font-semibold text-ink-900">Your Cart</span>
            <span className="text-ink-500 text-sm">
              ({items.reduce((s, i) => s + i.quantity, 0)})
            </span>
          </div>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            className="text-ink-500 hover:text-ink-900"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </header>

        {/* Free shipping bar */}
        {items.length > 0 && (
          <div className="px-6 py-3 border-b border-ink-100 bg-ink-100/50">
            {remaining > 0 ? (
              <p className="text-xs text-ink-700">
                You're <span className="font-semibold">{formatPrice(remaining)}</span> away from free shipping
              </p>
            ) : (
              <p className="text-xs text-ink-700 font-semibold">
                🎉 You've unlocked free shipping
              </p>
            )}
            <div className="mt-2 h-1 rounded-full bg-ink-100 overflow-hidden">
              <div
                className="h-full bg-accent transition-all duration-500"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Items */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center px-8">
              <div className="w-14 h-14 rounded-full bg-ink-100 flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M5 8h14l-1 12H6L5 8Z" stroke="#6E6E73" strokeWidth="1.5" strokeLinejoin="round" />
                  <path d="M9 8a3 3 0 1 1 6 0" stroke="#6E6E73" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <p className="text-ink-900 font-semibold">Your cart is empty</p>
              <p className="text-sm text-ink-500 mt-1">
                Add a power station or bundle to get started.
              </p>
              <Link
                href="/shop"
                onClick={closeCart}
                className="mt-6 inline-flex items-center justify-center px-5 h-11 rounded-full bg-ink-900 text-white text-sm font-semibold hover:bg-ink-700 transition"
              >
                Shop all
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-ink-100">
              {items.map((item) => (
                <li key={item.id + (item.variant ?? "")} className="flex gap-4 px-6 py-5">
                  <div className="w-20 h-20 rounded-lg bg-ink-100 overflow-hidden flex-shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-3">
                      <div className="min-w-0">
                        <div className="font-medium text-ink-900 text-sm truncate">{item.name}</div>
                        {item.variant && (
                          <div className="text-xs text-ink-500 mt-0.5">{item.variant}</div>
                        )}
                      </div>
                      <div className="text-sm text-ink-900 tabular">
                        {formatPrice(item.price * item.quantity)}
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="inline-flex items-center border border-ink-100 rounded-full">
                        <button
                          aria-label="Decrease quantity"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-ink-500 hover:text-ink-900"
                        >
                          −
                        </button>
                        <span className="w-7 text-center text-sm tabular">{item.quantity}</span>
                        <button
                          aria-label="Increase quantity"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-ink-500 hover:text-ink-900"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-xs text-ink-500 hover:text-ink-900 underline underline-offset-2"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {/* Upsells */}
          {items.length > 0 && upsells.length > 0 && (
            <div className="px-6 py-6 border-t border-ink-100 bg-ink-100/40">
              <div className="text-xs font-semibold uppercase tracking-wider text-ink-500 mb-3">
                Frequently bought with
              </div>
              <div className="space-y-3">
                {upsells.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center gap-3 bg-white rounded-lg p-3 border border-ink-100"
                  >
                    <div className="w-12 h-12 rounded-md bg-ink-100 overflow-hidden flex-shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-ink-900 truncate">{p.name}</div>
                      <div className="text-xs text-ink-500 tabular">{formatPrice(p.price)}</div>
                    </div>
                    <button
                      onClick={() =>
                        addItem({ id: p.id, name: p.name, price: p.price, image: p.image })
                      }
                      className="text-xs font-semibold text-accent-hover hover:text-ink-900"
                    >
                      Add +
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <footer className="border-t border-ink-100 px-6 py-5 bg-white">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-ink-500">Subtotal</span>
              <span className="text-lg font-semibold text-ink-900 tabular">
                {formatPrice(subtotal)}
              </span>
            </div>
            <p className="text-xs text-ink-500 mb-4">
              Shipping and taxes calculated at checkout. Affirm & Klarna financing available.
            </p>
            <div className="flex gap-3">
              <Link
                href="/cart"
                onClick={closeCart}
                className="flex-1 h-12 flex items-center justify-center text-sm font-semibold border border-ink-900 text-ink-900 rounded-full hover:bg-ink-900 hover:text-white transition"
              >
                View Cart
              </Link>
              <Link
                href="/checkout"
                onClick={closeCart}
                className="flex-1 h-12 flex items-center justify-center text-sm font-semibold bg-ink-900 text-white rounded-full hover:bg-ink-700 transition"
              >
                Checkout
              </Link>
            </div>
          </footer>
        )}
      </aside>
    </>
  );
}
