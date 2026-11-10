import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllProducts, getProduct, getProductDetail } from "@/lib/catalog";
import StickyBuyBar from "@/components/product/StickyBuyBar";
import ProductHero from "@/components/specs/ProductHero";
import HighlightsBand from "@/components/specs/HighlightsBand";
import FeatureBlock from "@/components/specs/FeatureBlock";
import InTheBoxList from "@/components/specs/InTheBoxList";
import SpecSheet from "@/components/specs/SpecSheet";
import CompareTable from "@/components/specs/CompareTable";
import CompatibilityMatrix from "@/components/specs/CompatibilityMatrix";
import WarrantyBadge from "@/components/specs/WarrantyBadge";
import CertificationsRow from "@/components/specs/CertificationsRow";
import FaqSection from "@/components/specs/FaqSection";
import BuySection from "@/components/specs/BuySection";
import FinalCta from "@/components/specs/FinalCta";
import ProductJsonLd from "@/components/specs/ProductJsonLd";

export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const products = await getAllProducts();
    return products.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  const detail = product ? await getProductDetail(product.id) : undefined;
  if (!product || !detail) return { title: "Not found · VoltPak" };

  return {
    title: `${product.name} - ${product.tagline} | VoltPak`,
    description: detail.shortDesc,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title: `${product.name} | VoltPak`,
      description: detail.shortDesc,
      images: [{ url: `/og/${product.slug}`, width: 1200, height: 630 }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | VoltPak`,
      description: detail.shortDesc,
      images: [`/og/${product.slug}`],
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return notFound();
  const detail = await getProductDetail(product.id);
  if (!detail) return notFound();

  const compareCategory =
    product.category === "bundle" ? "power-station" : product.category;
  const canCompare =
    detail.compareAgainst &&
    detail.compareAgainst.length > 0 &&
    ["power-station", "battery", "solar"].includes(compareCategory);

  const compatibleProducts = detail.compatibleWith && detail.compatibleWith.length > 0
    ? (await Promise.all(detail.compatibleWith.map((id) => getProduct(id)))).filter(
        (p): p is Awaited<ReturnType<typeof getProduct>> & NonNullable<unknown> => p != null
      )
    : [];

  return (
    <>
      <ProductJsonLd product={product} detail={detail} />
      <StickyBuyBar product={product} />

      <ProductHero product={product} detail={detail} />

      <HighlightsBand items={detail.highlights} />

      <div id="features" />
      {detail.features.map((f, i) => (
        <FeatureBlock key={f.id} feature={f} index={i} />
      ))}

      {compatibleProducts.length > 0 && (
        <CompatibilityMatrix products={compatibleProducts} />
      )}

      <InTheBoxList items={detail.inTheBox} />

      <SpecSheet groups={detail.specs} title="Every number, documented." />

      {canCompare && (
        <CompareTable
          product={detail}
          productName={product.name}
          against={detail.compareAgainst!}
          category={compareCategory as "power-station" | "battery" | "solar"}
        />
      )}

      <CertificationsRow items={detail.certifications} />

      <WarrantyBadge warranty={detail.warranty} />

      <BuySection product={product} />

      <FaqSection items={detail.faq} />

      <FinalCta product={product} />
    </>
  );
}
