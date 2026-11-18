import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { SITE_URL } from "@/lib/site";
import "../globals.css";
import Script from "next/script";
import { CartProvider } from "@/components/cart/CartContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import RevealInit from "@/components/motion/RevealInit";
import { COMMERCE_ENABLED } from "@/lib/config";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
};

export const metadata: Metadata = {
  title: "VoltPak - Silent power. Serious output.",
  description:
    "VoltPak builds portable power stations, expandable battery systems and solar solutions for home backup, the outdoors and the job site.",
  metadataBase: new URL(SITE_URL),
  applicationName: "VoltPak",
  robots: { index: true, follow: true },
  openGraph: {
    title: "VoltPak - Silent power. Serious output.",
    description:
      "Portable power stations, expandable batteries and solar - engineered for home backup, the outdoors and the job site.",
    type: "website",
    siteName: "VoltPak",
    locale: "en_CA",
    url: "/",
    images: [{ url: "/og/voltpak-1000", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "VoltPak - Silent power. Serious output.",
    description:
      "Portable power stations, expandable batteries and solar - engineered for home backup, the outdoors and the job site.",
    images: ["/og/voltpak-1000"],
  },
};

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="font-sans text-ink-700 bg-white">
        <Script id="has-js" strategy="beforeInteractive">
          {`document.documentElement.classList.add('has-js');`}
        </Script>
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          {COMMERCE_ENABLED && <CartDrawer />}
          <RevealInit />
        </CartProvider>
      </body>
    </html>
  );
}
