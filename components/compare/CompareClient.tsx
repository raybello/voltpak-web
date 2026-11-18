"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Product } from "@/lib/products";
import type { ProductDetail } from "@/lib/specs";
import { formatPrice } from "@/lib/format";
import { isPreLaunch, PRE_LAUNCH_PRICE_LABEL } from "@/lib/config";

const COMPARE_LABELS = [
  "Capacity",
  "Chemistry",
  "Cycle life",
  "Continuous",
  "Surge",
  "Motor peak",
  "Outlets",
  "USB-C",
  "USB-A",
  "Car outlet",
  "Wireless pad",
  "AC Turbo (VoltLink)",
  "AC fast",
  "Solar MPPT",
  "Switchover",
  "EPS switchover",
  "Dimensions",
  "Weight",
  "Noise (ECO)",
  "Noise (standard)",
  "IP rating",
  "Rated power",
  "Efficiency",
  "Cell type",
  "Kickstand",
];

function pick(detail: ProductDetail, label: string) {
  const hit = detail.specs
    .flatMap((g) => g.rows)
    .find((r) => r.label.toLowerCase() === label.toLowerCase());
  return hit?.value ?? "-";
}

export default function CompareClient({
  products,
  specs,
}: {
  products: Product[];
  specs: Record<string, ProductDetail>;
}) {
  const [left, setLeft] = useState(products[0]?.id ?? "");
  const [right, setRight] = useState(products[1]?.id ?? "");

  const leftProduct = products.find((p) => p.id === left);
  const rightProduct = products.find((p) => p.id === right);
  const leftSpecs = left ? specs[left] : undefined;
  const rightSpecs = right ? specs[right] : undefined;

  const rows = useMemo(
    () =>
      COMPARE_LABELS.map((label) => ({
        label,
        l: leftSpecs ? pick(leftSpecs, label) : "-",
        r: rightSpecs ? pick(rightSpecs, label) : "-",
      })).filter((r) => r.l !== "-" || r.r !== "-"),
    [leftSpecs, rightSpecs]
  );

  return (
    <div className="pt-28 md:pt-32 pb-24 bg-white">
      <div className="max-w-container mx-auto px-6 md:px-8">
        <div className="mb-10 reveal">
          <p className="text-eyebrow uppercase text-accent-hover mb-3">Compare</p>
          <h1 className="font-display text-display text-ink-900">
            Two VoltPaks. Side-by-side.
          </h1>
          <p className="mt-4 text-ink-500 max-w-xl">
            Pick any two products from the VoltPak line to see every spec
            lined up 1:1. Nothing hidden.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          <ProductPicker
            label="Left"
            value={left}
            onChange={setLeft}
            exclude={right}
            product={leftProduct}
            products={products}
            specs={specs}
          />
          <ProductPicker
            label="Right"
            value={right}
            onChange={setRight}
            exclude={left}
            product={rightProduct}
            products={products}
            specs={specs}
          />
        </div>

        <div className="grid grid-cols-[1fr_2fr_2fr] md:grid-cols-[1fr_3fr_3fr] border-y-2 border-ink-900 text-sm">
          <div className="py-4 text-xs uppercase tracking-widest text-ink-500 font-semibold">
            Product
          </div>
          <HeaderCell product={leftProduct} />
          <HeaderCell product={rightProduct} />
        </div>

        {rows.map((r, i) => (
          <div
            key={r.label}
            className={`grid grid-cols-[1fr_2fr_2fr] md:grid-cols-[1fr_3fr_3fr] text-sm border-b border-ink-100 ${
              i % 2 === 1 ? "bg-ink-100/30" : ""
            }`}
          >
            <div className="py-3 pr-3 text-ink-500">{r.label}</div>
            <div className="py-3 pr-3 text-ink-900 tabular">{r.l}</div>
            <div className="py-3 pr-3 text-ink-900 tabular">{r.r}</div>
          </div>
        ))}

        <div className="mt-12 text-center">
          <Link
            href="/shop"
            className="inline-flex h-11 px-6 items-center rounded-full border border-ink-100 text-sm font-semibold text-ink-900 hover:border-ink-900 transition"
          >
            ← Back to the lineup
          </Link>
        </div>
      </div>
    </div>
  );
}

function ProductPicker({
  label,
  value,
  onChange,
  exclude,
  product,
  products,
  specs,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  exclude: string;
  product: Product | undefined;
  products: Product[];
  specs: Record<string, ProductDetail>;
}) {
  if (!product) return null;
  return (
    <label className="block bg-ink-100 rounded-2xl p-5">
      <div className="text-xs uppercase tracking-widest font-semibold text-ink-500 mb-2">
        {label}
      </div>
      <div className="flex items-center gap-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.name}
          className="w-16 h-16 rounded-xl object-cover bg-white"
        />
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 h-10 bg-white rounded-full px-4 text-sm text-ink-900 border border-ink-100 focus:outline-none focus:border-ink-900 cursor-pointer"
        >
          {products.filter((p) => p.id !== exclude && specs[p.id]).map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>
    </label>
  );
}

function HeaderCell({ product }: { product: Product | undefined }) {
  if (!product) return null;
  return (
    <div className="py-4 pr-3">
      <div className="text-sm font-semibold text-ink-900">{product.name}</div>
      <div className="text-xs text-accent-hover font-medium mt-0.5 tabular">
        {isPreLaunch(product) ? PRE_LAUNCH_PRICE_LABEL : formatPrice(product.price)}
      </div>
    </div>
  );
}
