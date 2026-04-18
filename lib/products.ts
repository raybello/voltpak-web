// Top-level product catalog. Every product here has a matching entry
// in lib/specs.ts keyed by `id` — that's where the detailed content
// (features, specs, FAQ) lives.

export type Product = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  category: "power-station" | "battery" | "solar" | "accessory" | "bundle";
  price: number;
  compareAt?: number;
  image: string;
  stats?: { capacity?: string; output?: string; weight?: string };
};

export const PRODUCTS: Product[] = [
  {
    id: "vp-1000",
    slug: "voltpak-1000",
    name: "VoltPak 1000",
    tagline: "1,024 Wh. Fully serviceable. No black box.",
    category: "power-station",
    price: 899,
    compareAt: 999,
    image: "/media/product-front.png",
    stats: { capacity: "1,024 Wh", output: "2,200 W", weight: "28 lb" },
  },
  {
    id: "vp-2000",
    slug: "voltpak-2000",
    name: "VoltPak 2000",
    tagline: "2,048 Wh. More capacity, same open architecture.",
    category: "power-station",
    price: 1499,
    image: "/media/side.png",
    stats: { capacity: "2,048 Wh", output: "3,000 W", weight: "46 lb" },
  },
  {
    id: "vp-1000-solar",
    slug: "voltpak-1000-solar-bundle",
    name: "VoltPak 1000 · Solar Bundle",
    tagline: "VoltPak 1000 + 220 W foldable panel. Off-grid ready.",
    category: "bundle",
    price: 1249,
    compareAt: 1348,
    image: "/media/lifestyle.png",
    stats: { capacity: "1,024 Wh", output: "2,200 W" },
  },
  {
    id: "vp-2000-solar",
    slug: "voltpak-2000-solar-kit",
    name: "VoltPak 2000 · Solar Kit",
    tagline: "VoltPak 2000 + 2× 220 W panels. Serious off-grid build.",
    category: "bundle",
    price: 2000,
    compareAt: 2397,
    image: "/media/lifestyle-2.png",
    stats: { capacity: "2,048 Wh", output: "3,000 W" },
  },
  {
    id: "vp-battery-2k",
    slug: "voltpak-expansion-2000",
    name: "Expansion Battery 2000",
    tagline: "Add capacity without swapping the core. Same isolated LFP compartment.",
    category: "battery",
    price: 1299,
    image: "/media/rear.jpg",
    stats: { capacity: "2,048 Wh", weight: "45 lb" },
  },
  {
    id: "vp-solar-220",
    slug: "voltpak-solar-220",
    name: "Solar Panel 220W",
    tagline: "Foldable. Weather-sealed. Charges VoltPak 1000 from flat in 5 hours.",
    category: "solar",
    price: 449,
    image: "/media/lifestyle.png",
    stats: { output: "220 W", weight: "15 lb" },
  },
  {
    id: "vp-solar-400",
    slug: "voltpak-solar-400",
    name: "Solar Panel 400W Bifacial",
    tagline: "Rigid bifacial. Generates on both sides. Built for fixed installs.",
    category: "solar",
    price: 699,
    image: "/media/side.png",
    stats: { output: "400 W", weight: "40 lb" },
  },
  {
    id: "vp-car-cable",
    slug: "voltpak-car-cable",
    name: "Car Charge Cable",
    tagline: "12 V DC input. Recharge from any vehicle, no adapter needed.",
    category: "accessory",
    price: 39,
    image: "/media/front-ports.jpg",
  },
  {
    id: "vp-mc4-adapter",
    slug: "voltpak-mc4-adapter",
    name: "MC4 Solar Adapter",
    tagline: "Standard MC4 to VoltPak input. Use any third-party solar panel.",
    category: "accessory",
    price: 29,
    image: "/media/front-ports.jpg",
  },
];

export const getProduct = (slugOrId: string) =>
  PRODUCTS.find((p) => p.slug === slugOrId || p.id === slugOrId);

export const FLAGSHIP = PRODUCTS[0];
