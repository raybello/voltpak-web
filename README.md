# VoltPak Web

The official VoltPak e-commerce website — built with Next.js 14 (App Router) and Payload CMS.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **UI:** React 18, TypeScript, TailwindCSS, shadcn/ui components
- **CMS:** Payload CMS (headless backend with admin panel)
- **Database:** PostgreSQL / MySQL (PlanetScale)
- **Payments:** Stripe
- **Email:** Resend (contact form + pre-launch notifications)
- **Analytics:** PostHog
- **Error monitoring:** Sentry
- **Deployment:** Vercel

## Project Structure

```
├── app/                      # Next.js App Router
│   ├── api/                  # API routes
│   │   ├── contact/route.ts  # Contact form (Resend emails)
│   │   └── notify/route.ts   # Pre-launch notify-me (Resend emails)
│   ├── about/                # Company, engineering, sustainability pages
│   ├── account/              # User account
│   ├── blog/                 # MDX blog
│   ├── cart/                 # Shopping cart
│   ├── checkout/             # Checkout flow
│   ├── compare/              # Side-by-side product comparison
│   ├── press/                # Press room
│   ├── products/[slug]/      # Dynamic product pages
│   ├── shop/                 # Product grid + category filters
│   ├── support/              # Support hub + mods + troubleshooting
│   ├── legal/                # Terms, privacy, accessibility
│   └── og/[slug]/            # Dynamic Open Graph images
├── components/
│   ├── specs/                # Product spec rendering components
│   ├── product/              # Buy card, sticky buy bar, notify-me
│   ├── layout/               # Header, footer
│   ├── cart/                 # Cart context + drawer
│   └── blog/                 # MDX components
├── lib/
│   ├── products.ts           # Product catalog (name, price, stats)
│   ├── specs.ts              # Detailed specs, features, FAQ, certifications
│   ├── config.ts             # Global config (PRE_LAUNCH_MODE, prices)
│   ├── format.ts             # Price formatting
│   ├── blog.ts               # Blog MDX loader
│   └── benchmarks.ts         # Benchmark data for product pages
└── public/                   # Static assets
```

## Product Catalog

| Product | Price | Status |
|---|---|---|
| VoltPak 1000 | $899 | In production |
| VoltPak 2000 | $1,499 | Coming soon |
| Solar Panel 220W | $449 | Active |
| Expansion Battery 2000 | $1,299 | Active |
| VoltPak 1000 · Solar Bundle | $1,249 | Active |

> **Note:** `PRE_LAUNCH_MODE` is currently enabled in `lib/config.ts` — the site shows "Coming Soon" for all products until launch.

## Key Pages

- **Home (`/`):** Hero video, 3 design pillars, product category tiles, design philosophy, use cases, social proof, newsletter signup
- **Shop (`/shop`):** Product grid with filters (power-stations, batteries, solar, bundles, accessories)
- **Products (`/products/[slug]`):** Full product specs, features, FAQ, comparison
- **Compare (`/compare`):** Select any two products to see specs side-by-side
- **Support → Mods (`/support/mods`):** Repair guides, STL downloads, open hardware package
- **About → Sustainability (`/about/sustainability`):** LFP chemistry, cycle life, repairability
- **Press (`/press`):** Editorial resources and press kit
- **Blog (`/blog`):** Engineering deep-dives and product updates

## Support & Modding

The `/support/mods` section hosts:
- **STL Files:** Front panel replacements, fan guards, rack ears, tilt stands (v1.0, Apr 2026)
- **Open Hardware Package:** KiCad schematics, PCB layouts, STEP models, BOM (v1.2, CERN-OHL-S v2)
- **Repair Guides:** Fan swap, BMS access, fuse replacement

## Development

```bash
# Clone
git clone https://github.com/raybello/voltpak-web.git
cd voltpak-web

# Install
pnpm install

# Environment
cp .env.example .env.local
# Configure: DATABASE_URL, STRIPE_SECRET_KEY, NEXTAUTH_SECRET, etc.

# Run dev server
pnpm dev
# http://localhost:3000

# Build
pnpm build
pnpm start
```

### Pre-launch Mode
Toggle `PRE_LAUNCH_MODE` in `lib/config.ts` to switch between production pricing and "Coming Soon" / "Notify Me" mode. Individual products can override via the `preLaunch` flag in `lib/products.ts`.

## Scripts

| Command | Description |
|---|---|
| `dev` | Start development server on port 3000 |
| `build` | Production build |
| `start` | Start production server |
| `lint` | Lint with ESLint |

## Deployment

Deploy on Vercel with:
```bash
vercel --prod
```

The `vercel.json` config handles build settings. On-demand revalidation is wired for product content updates.

## License

Proprietary — VoltPak, Inc.
