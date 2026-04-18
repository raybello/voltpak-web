import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProduct, PRODUCTS } from "@/lib/products";
import { getSpecs } from "@/lib/specs";
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

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = getProduct(params.slug);
  const detail = product ? getSpecs(product.id) : undefined;
  if (!product || !detail) return { title: "Not found · VoltPak" };

  return {
    title: `${product.name} - ${product.tagline} | VoltPak`,
    description: detail.shortDesc,
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

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  if (!product) return notFound();
  const detail = getSpecs(product.id);
  if (!detail) return notFound();

  const compareCategory =
    product.category === "bundle" ? "power-station" : product.category;
  const canCompare =
    detail.compareAgainst &&
    detail.compareAgainst.length > 0 &&
    ["power-station", "battery", "solar"].includes(compareCategory);

  return (
    <>
      <ProductJsonLd product={product} detail={detail} />
      <StickyBuyBar product={product} />

      <ProductHero name={product.name} price={product.price} detail={detail} />

      <HighlightsBand items={detail.highlights} />

      <div id="features" />
      {detail.features.map((f, i) => (
        <FeatureBlock key={f.id} feature={f} index={i} />
      ))}

      {detail.compatibleWith && detail.compatibleWith.length > 0 && (
        <CompatibilityMatrix compatibleWith={detail.compatibleWith} />
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

      <FinalCta name={product.name} price={product.price} />
    </>
  );
}
