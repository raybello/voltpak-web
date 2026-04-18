"use client";

import Link from "next/link";
import { useCart } from "@/components/cart/CartContext";
import { formatPrice } from "@/lib/format";

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal } = useCart();

  return (
    <div className="pt-28 md:pt-32 pb-24">
      <div className="max-w-container mx-auto px-6 md:px-8">
        <h1 className="font-display text-display text-ink-900 mb-10">Cart</h1>

        {items.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-ink-500">Your cart is empty.</p>
            <Link
              href="/shop"
              className="mt-6 inline-flex items-center justify-center h-11 px-6 rounded-full bg-ink-900 text-white text-sm font-semibold hover:bg-ink-700 transition"
            >
              Shop all
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <ul className="divide-y divide-ink-100 border-y border-ink-100">
                {items.map((item) => (
                  <li key={item.id + (item.variant ?? "")} className="flex gap-6 py-6">
                    <div className="w-28 h-28 rounded-xl bg-ink-100 overflow-hidden flex-shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col">
                      <div className="flex justify-between gap-4">
                        <div>
                          <div className="font-semibold text-ink-900">{item.name}</div>
                          {item.variant && (
                            <div className="text-sm text-ink-500">{item.variant}</div>
                          )}
                        </div>
                        <div className="text-ink-900 font-semibold tabular">
                          {formatPrice(item.price * item.quantity)}
                        </div>
                      </div>
                      <div className="mt-auto pt-4 flex items-center justify-between">
                        <div className="inline-flex items-center border border-ink-100 rounded-full">
                          <button
                            aria-label="Decrease"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-9 h-9 text-ink-500 hover:text-ink-900"
                          >
                            −
                          </button>
                          <span className="w-8 text-center text-sm tabular">{item.quantity}</span>
                          <button
                            aria-label="Increase"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-9 h-9 text-ink-500 hover:text-ink-900"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-sm text-ink-500 hover:text-ink-900 underline underline-offset-2"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <aside className="bg-ink-100 rounded-2xl p-6 h-fit">
              <div className="text-lg font-semibold text-ink-900">Order summary</div>
              <dl className="mt-5 space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-ink-500">Subtotal</dt>
                  <dd className="text-ink-900 tabular">{formatPrice(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-ink-500">Shipping</dt>
                  <dd className="text-ink-900">
                    {subtotal >= 500 ? "Free" : formatPrice(29)}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-ink-500">Estimated tax</dt>
                  <dd className="text-ink-500">At checkout</dd>
                </div>
              </dl>
              <div className="mt-5 pt-5 border-t border-ink-300/50 flex justify-between text-base">
                <span className="font-semibold text-ink-900">Total</span>
                <span className="font-semibold text-ink-900 tabular">
                  {formatPrice(subtotal + (subtotal >= 500 ? 0 : 29))}
                </span>
              </div>
              <Link
                href="/checkout"
                className="mt-6 h-12 flex items-center justify-center rounded-full bg-ink-900 text-white text-sm font-semibold hover:bg-ink-700 transition"
              >
                Checkout
              </Link>
              <p className="mt-4 text-xs text-ink-500 text-center">
                Apple Pay · Google Pay · Affirm · Klarna · Shop Pay
              </p>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
