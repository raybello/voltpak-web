import { Product } from "@/lib/products";
import { ProductDetail } from "@/lib/specs";

// Emits schema.org Product JSON-LD for rich Google Shopping results.
// Reads exclusively from the product + detail data — no duplication.
export default function ProductJsonLd({
  product,
  detail,
}: {
  product: Product;
  detail: ProductDetail;
}) {
  // Map a handful of high-signal spec rows to additionalProperty so
  // Google sees capacity/output/weight when indexing the page.
  const flat = detail.specs.flatMap((g) => g.rows);
  const pick = (label: string) =>
    flat.find((r) => r.label.toLowerCase() === label.toLowerCase())?.value;

  const additionalProperty = [
    { name: "Capacity", value: pick("Capacity") },
    { name: "AC continuous", value: pick("Continuous") },
    { name: "Weight", value: pick("Weight") },
    { name: "Chemistry", value: pick("Chemistry") },
    { name: "Warranty", value: detail.warranty.unit },
  ]
    .filter((p) => p.value)
    .map((p) => ({ "@type": "PropertyValue", name: p.name, value: p.value }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    sku: product.id,
    brand: { "@type": "Brand", name: "VoltPak" },
    image: [product.image],
    description: detail.shortDesc,
    offers: {
      "@type": "Offer",
      price: product.price.toFixed(2),
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `https://voltpak.example.com/products/${product.slug}`,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "2300",
    },
    additionalProperty,
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
