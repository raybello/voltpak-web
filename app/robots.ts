import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/cart", "/checkout"] },
    ],
    sitemap: "https://voltpak.example.com/sitemap.xml",
    host: "https://voltpak.example.com",
  };
}
