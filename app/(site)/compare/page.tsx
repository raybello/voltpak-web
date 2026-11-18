import { getAllProducts, getProductDetail } from "@/lib/catalog";
import type { ProductDetail } from "@/lib/specs";
import CompareClient from "@/components/compare/CompareClient";

export const metadata = { title: "Compare · VoltPak" };

export default async function ComparePage() {
  const products = await getAllProducts();
  const detailEntries = await Promise.all(
    products.map(async (p) => {
      const detail = await getProductDetail(p.id);
      return [p.id, detail] as [string, ProductDetail | undefined];
    })
  );
  const specs = Object.fromEntries(
    detailEntries.filter((e): e is [string, ProductDetail] => e[1] != null)
  );

  return <CompareClient products={products} specs={specs} />;
}
