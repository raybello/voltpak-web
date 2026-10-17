import { Product } from "@/lib/products";
import { ProductDetail } from "@/lib/specs";
import { SITE_URL } from "@/lib/site";
import { isPreLaunch } from "@/lib/config";

// Emits schema.org Product JSON-LD for rich Google Shopping results.
// Reads exclusively from the product + detail data - no duplication.
export default function ProductJsonLd({
  product,
  detail,
}: {
  product: Product;
  detail: ProductDetail;
}) {
  const preLaunch = isPreLaunch(product);
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
    image: [`${SITE_URL}${product.image}`],
    description: detail.shortDesc,
    offers: preLaunch
      ? {
          "@type": "Offer",
          availability: "https://schema.org/PreOrder",
          url: `${SITE_URL}/products/${product.slug}`,
        }
      : {
          "@type": "Offer",
          price: product.price.toFixed(2),
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: `${SITE_URL}/products/${product.slug}`,
        },
    additionalProperty,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
