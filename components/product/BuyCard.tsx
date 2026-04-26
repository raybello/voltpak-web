"use client";

import { useState } from "react";
import { useCart } from "@/components/cart/CartContext";
import { formatPrice } from "@/lib/format";
import { Product } from "@/lib/products";
import { isPreLaunch, PRE_LAUNCH_PRICE_LABEL } from "@/lib/config";
import NotifyMeButton from "./NotifyMeButton";

export default function BuyCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [bundle, setBundle] = useState<"station" | "solar" | "battery">("station");

  const preLaunch = isPreLaunch(product);

  const bundlePrice =
    bundle === "solar"
      ? product.price + 449
      : bundle === "battery"
        ? product.price + 699
        : product.price;

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 border border-ink-100 shadow-sm">
      <div className="text-xs font-semibold uppercase tracking-wider text-accent-hover mb-2">
        {preLaunch ? "Coming soon · Reserve your spot" : "In stock · Ships free"}
      </div>
      <h3 className="font-display font-bold text-2xl text-ink-900">{product.name}</h3>
      <p className="text-ink-500 mt-1">{product.tagline}</p>

      <div className="mt-5 flex items-baseline gap-3">
        {preLaunch ? (
          <span className="text-3xl font-bold text-ink-900">
            {PRE_LAUNCH_PRICE_LABEL}
          </span>
        ) : (
          <>
            <span className="text-3xl font-bold text-ink-900 tabular">
              {formatPrice(bundlePrice)}
            </span>
            {product.compareAt && bundle === "station" && (
              <span className="text-ink-500 line-through tabular">
                {formatPrice(product.compareAt)}
              </span>
            )}
          </>
        )}
      </div>
      {preLaunch ? (
        <p className="text-xs text-ink-500 mt-2">
          Pricing announced at launch · Join the list for first access
        </p>
      ) : (
        <p className="text-xs text-ink-500 mt-2">
          or 4 payments of {formatPrice(Math.round(bundlePrice / 4))} with Affirm
        </p>
      )}

      {!preLaunch && (
        <div className="mt-6">
          <div className="text-sm font-semibold text-ink-900 mb-2">Choose your bundle</div>
          <div className="space-y-2">
            {[
              { key: "station", label: "Power Station only", sub: "Included: unit + AC cable" },
              { key: "solar", label: "+ Solar Panel 220W", sub: "Charge anywhere off-grid", add: "+$449" },
              { key: "battery", label: "+ Expansion Battery", sub: "Double your runtime", add: "+$699" },
            ].map((opt) => (
              <label
                key={opt.key}
                className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition ${bundle === opt.key
                    ? "border-ink-900 bg-ink-100/60"
                    : "border-ink-100 hover:border-ink-300"
                  }`}
              >
                <input
                  type="radio"
                  name="bundle"
                  className="mt-1 accent-ink-900"
                  checked={bundle === opt.key}
                  onChange={() => setBundle(opt.key as typeof bundle)}
                />
                <div className="flex-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-ink-900">{opt.label}</span>
                    {opt.add && (
                      <span className="text-ink-500 tabular">{opt.add}</span>
                    )}
                  </div>
                  <div className="text-xs text-ink-500">{opt.sub}</div>
                </div>
              </label>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 flex items-center gap-4">
        {preLaunch ? (
          <NotifyMeButton product={product} variant="primary" />
        ) : (
          <>
            <div className="inline-flex items-center border border-ink-100 rounded-full">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Decrease"
                className="w-10 h-10 text-ink-500 hover:text-ink-900"
              >
                −
              </button>
              <span className="w-8 text-center tabular">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                aria-label="Increase"
                className="w-10 h-10 text-ink-500 hover:text-ink-900"
              >
                +
              </button>
            </div>
            <button
              onClick={() =>
                addItem({
                  id: `${product.id}-${bundle}`,
                  name: product.name,
                  variant:
                    bundle === "solar"
                      ? "Solar bundle"
                      : bundle === "battery"
                        ? "Expansion bundle"
                        : undefined,
                  price: bundlePrice,
                  image: product.image,
                  quantity: qty,
                })
              }
              className="flex-1 h-12 rounded-full bg-ink-900 text-white text-sm font-semibold hover:bg-ink-700 transition"
            >
              Add to Cart
            </button>
          </>
        )}
      </div>

      <ul className="mt-6 space-y-2 text-xs text-ink-500">
        {preLaunch ? (
          <>
            <li className="flex items-center gap-2">
              <Check /> Be the first to know when it ships
            </li>
            <li className="flex items-center gap-2">
              <Check /> Early-access window before public launch
            </li>
            <li className="flex items-center gap-2">
              <Check /> No spam - only launch updates for this product
            </li>
          </>
        ) : (
          <>
            <li className="flex items-center gap-2">
              <Check /> Free shipping in the contiguous US
            </li>
            <li className="flex items-center gap-2">
              <Check /> 30-day returns, no questions asked
            </li>
            <li className="flex items-center gap-2">
              <Check /> 5-year VoltPak warranty included
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

function Check() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="m5 12 4 4L19 7"
        stroke="#00A8CC"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
