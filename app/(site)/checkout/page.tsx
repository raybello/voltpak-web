"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/cart/CartContext";
import { formatPrice } from "@/lib/format";

export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="pt-28 md:pt-32 pb-24 max-w-container mx-auto px-6 md:px-8 min-h-[60vh]">
        <div className="max-w-lg mx-auto text-center py-12">
          <div className="w-14 h-14 mx-auto rounded-full bg-accent flex items-center justify-center">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="m5 12 4 4L19 7" stroke="#0A0A0A" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>
          <h1 className="mt-6 font-display text-section text-ink-900">
            Order placed.
          </h1>
          <p className="mt-3 text-ink-500">
            A confirmation is on the way. This is a demo storefront - no real
            charges were made.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex h-11 px-6 items-center justify-center rounded-full bg-ink-900 text-white text-sm font-semibold hover:bg-ink-700 transition"
          >
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 md:pt-32 pb-24">
      <div className="max-w-container mx-auto px-6 md:px-8">
        <h1 className="font-display text-display text-ink-900 mb-10">Checkout</h1>
        <form
          className="grid lg:grid-cols-3 gap-10"
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
            clear();
          }}
        >
          <div className="lg:col-span-2 space-y-10">
            <Section title="Contact">
              <Field label="Email" type="email" required />
              <Field label="Phone (optional)" type="tel" />
            </Section>

            <Section title="Shipping">
              <div className="grid grid-cols-2 gap-4">
                <Field label="First name" required />
                <Field label="Last name" required />
              </div>
              <Field label="Address" required />
              <Field label="Apartment, suite, etc. (optional)" />
              <div className="grid grid-cols-3 gap-4">
                <Field label="City" required />
                <Field label="State" required />
                <Field label="ZIP" required />
              </div>
            </Section>

            <Section title="Payment">
              <div className="grid grid-cols-2 gap-4">
                <Field label="Card number" required />
                <Field label="Name on card" required />
                <Field label="Expiry (MM/YY)" required />
                <Field label="CVC" required />
              </div>
              <p className="text-xs text-ink-500">
                Or pay with Apple Pay, Google Pay, Shop Pay, Affirm or Klarna on
                the next step.
              </p>
            </Section>

            <div>
              <button
                type="submit"
                className="w-full h-12 rounded-full bg-ink-900 text-white font-semibold hover:bg-ink-700 transition"
                disabled={items.length === 0}
              >
                Pay {formatPrice(subtotal + (subtotal >= 500 ? 0 : 29))}
              </button>
            </div>
          </div>

          <aside className="bg-ink-100 rounded-2xl p-6 h-fit lg:sticky lg:top-24">
            <div className="text-lg font-semibold text-ink-900">Order</div>
            <ul className="mt-5 space-y-4">
              {items.length === 0 ? (
                <li className="text-sm text-ink-500">Your cart is empty.</li>
              ) : (
                items.map((i) => (
                  <li key={i.id + (i.variant ?? "")} className="flex gap-3">
                    <div className="w-14 h-14 rounded-lg bg-white overflow-hidden flex-shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={i.image} alt={i.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-ink-900 truncate">
                        {i.name}
                      </div>
                      <div className="text-xs text-ink-500">Qty {i.quantity}</div>
                    </div>
                    <div className="text-sm text-ink-900 tabular">
                      {formatPrice(i.price * i.quantity)}
                    </div>
                  </li>
                ))
              )}
            </ul>
            <dl className="mt-6 space-y-2 text-sm">
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
              <div className="flex justify-between pt-3 mt-3 border-t border-ink-300/50 text-base">
                <dt className="font-semibold text-ink-900">Total</dt>
                <dd className="font-semibold text-ink-900 tabular">
                  {formatPrice(subtotal + (subtotal >= 500 ? 0 : 29))}
                </dd>
              </div>
            </dl>
          </aside>
        </form>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-lg font-semibold text-ink-900 mb-4">{title}</h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function Field({
  label,
  type = "text",
  required,
}: {
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="block text-xs text-ink-500 mb-1">{label}</span>
      <input
        type={type}
        required={required}
        className="w-full h-11 px-4 rounded-lg border border-ink-100 bg-white focus:outline-none focus:border-ink-900 transition"
      />
    </label>
  );
}
