import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/lib/products";
import { getAllPosts } from "@/lib/blog";
import { SITE_URL } from "@/lib/site";

const STATIC_ROUTES = [
  "",
  "/shop",
  "/compare",
  "/about",
  "/about/engineering",
  "/about/sustainability",
  "/press",
  "/careers",
  "/support",
  "/support/battery",
  "/support/contact",
  "/support/manuals",
  "/support/mods",
  "/support/returns",
  "/support/troubleshooting",
  "/support/warranty",
  "/legal/privacy",
  "/legal/terms",
  "/legal/accessibility",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = STATIC_ROUTES.map((p) => ({
    url: `${SITE_URL}${p}`,
    changeFrequency: "monthly" as const,
    priority: p === "" ? 1 : p.startsWith("/legal") ? 0.3 : 0.6,
  }));

  const productRoutes = PRODUCTS.map((p) => ({
    url: `${SITE_URL}/products/${p.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const postRoutes = getAllPosts().map((p) => ({
    url: `${SITE_URL}/press/${p.slug}`,
    lastModified: new Date(p.frontmatter.date),
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...productRoutes, ...postRoutes];
}
