import { BENCHMARKS, alignBenchmark } from "@/lib/benchmarks";
import { ProductDetail } from "@/lib/specs";

// Picks a subset of the product's spec rows (the ones most commonly
// compared in this category) and lines them up against one or more
// competitor benchmarks.
const COMPARE_ROW_LABELS: Record<string, string[]> = {
  "power-station": [
    "Capacity",
    "Chemistry",
    "Cycle life",
    "AC continuous",
    "AC surge",
    "USB-C",
    "USB-A",
    "AC outlets",
    "Wireless pad",
    "AC recharge (full)",
    "Solar input",
    "Noise (ECO)",
    "UPS switchover",
    "Weight",
    "Warranty",
  ],
  battery: [
    "Capacity",
    "Chemistry",
    "Connection",
    "Max output (paired)",
    "Max chain",
    "Hot-swap",
    "Warranty",
  ],
  solar: [
    "Rated power",
    "Efficiency",
    "Cell type",
    "Open-circuit V",
    "Short-circuit A",
    "Folded",
    "Deployed",
    "Weight",
    "IP rating",
    "Kickstand",
    "Connector",
    "Operating temp",
    "Warranty",
  ],
};

// Normalize the product's own spec rows into the same label set so we
// can line them up 1:1 with competitors.  Falls back to "-" when the
// product doesn't publish that label.
function pickProductValues(
  product: ProductDetail,
  labels: string[]
): { label: string; value: string }[] {
  return labels.map((label) => {
    const hit = product.specs
      .flatMap((g) => g.rows)
      .find((r) => r.label.toLowerCase() === label.toLowerCase());
    return { label, value: hit?.value ?? "-" };
  });
}

export default function CompareTable({
  product,
  productName,
  against,
  category,
}: {
  product: ProductDetail;
  productName: string;
  against: string[];
  category: "power-station" | "battery" | "solar";
}) {
  const labels = COMPARE_ROW_LABELS[category];
  if (!labels) return null;

  const productRows = pickProductValues(product, labels);
  const competitors = against
    .map((id) => BENCHMARKS[id])
    .filter(Boolean)
    .map((b) => ({
      b,
      rows: alignBenchmark(b, labels),
    }));

  if (competitors.length === 0) return null;

  return (
    <section className="bg-white py-24 md:py-section border-t border-ink-100">
      <div className="max-w-container mx-auto px-6 md:px-8">
        <div className="max-w-2xl mb-10 reveal">
          <p className="text-eyebrow uppercase text-accent-hover mb-4">Head to head</p>
          <h2 className="font-display text-section text-ink-900">
            The numbers, side-by-side.
          </h2>
          <p className="mt-4 text-ink-500 text-sm">
            Published specs, April 2026. Sourced from each brand's public
            product page.
          </p>
        </div>

        <div className="reveal overflow-x-auto -mx-6 md:mx-0">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-ink-900">
                <th
                  scope="col"
                  className="text-left py-4 px-4 text-ink-500 font-medium"
                >
                  Spec
                </th>
                <th
                  scope="col"
                  className="text-left py-4 px-4 font-semibold text-ink-900 bg-ink-100/60 rounded-t-xl"
                >
                  {productName}
                  <span className="block text-xs text-accent-hover font-medium mt-0.5">
                    VoltPak
                  </span>
                </th>
                {competitors.map(({ b }) => (
                  <th
                    key={b.id}
                    scope="col"
                    className="text-left py-4 px-4 text-ink-900 font-medium"
                  >
                    {b.product}
                    <span className="block text-xs text-ink-500 font-normal mt-0.5">
                      {b.brand}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {labels.map((label, i) => (
                <tr
                  key={label}
                  className={`border-b border-ink-100 ${i % 2 === 1 ? "bg-ink-100/30" : ""
                    }`}
                >
                  <th
                    scope="row"
                    className="text-left text-ink-500 font-normal py-3 px-4 whitespace-nowrap"
                  >
                    {label}
                  </th>
                  <td className="py-3 px-4 tabular text-ink-900 font-medium bg-ink-100/60">
                    {productRows[i].value}
                  </td>
                  {competitors.map(({ b, rows }) => (
                    <td
                      key={b.id}
                      className="py-3 px-4 tabular text-ink-700"
                    >
                      {rows[i].value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
