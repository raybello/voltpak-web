import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/components/cart/CartContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import RevealInit from "@/components/motion/RevealInit";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "VoltPak - Silent power. Serious output.",
  description:
    "VoltPak builds portable power stations, expandable battery systems and solar solutions for home backup, the outdoors and the job site.",
  metadataBase: new URL("https://voltpak.example.com"),
  openGraph: {
    title: "VoltPak - Silent power. Serious output.",
    description:
      "Portable power stations, expandable batteries and solar - engineered for home backup, the outdoors and the job site.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Mark the document as JS-capable BEFORE CSS paints.
            Our `.reveal` utility is visible by default so that
            anyone with JS disabled or a slow main thread always
            sees content.  This class promotes it to the
            hidden-until-observed state used by our scroll reveal. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('has-js');",
          }}
        />
        <link rel="preconnect" href="https://rsms.me/" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </head>
      <body className="font-sans text-ink-700 bg-white">
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
        <RevealInit />
        <Analytics />
      </body>
    </html>
  );
}
