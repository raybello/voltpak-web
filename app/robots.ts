import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  // Block crawling everywhere except production so preview deployments
  // never compete with the real site in search results.
  if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production") {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/cart", "/checkout", "/account", "/notify/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
