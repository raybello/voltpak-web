# VoltPak Web

Marketing and catalog site for VoltPak (voltpak.ca), built with Next.js 14 (App Router), TypeScript and Tailwind.

**Current mode: pre-launch.** Products show "Coming Soon", visitors can join a double opt-in Launch List, and cart/checkout/account are disabled. See [docs/LAUNCH.md](docs/LAUNCH.md) for the launch checklist and [docs/PATH-B-COMMERCE.md](docs/PATH-B-COMMERCE.md) for what it takes to add real ordering.

## Stack

- Next.js 14, React 18, TypeScript, Tailwind CSS
- MDX press/engineering posts (`public/blog/*.mdx`, `next-mdx-remote`, KaTeX)
- Email: [Resend](https://resend.com) (contact form, Launch List double opt-in)
- Rate limiting: Upstash Redis REST (optional; in-memory fallback)
- Hosting: Vercel
- Tests: Vitest (unit) + `scripts/smoke.mjs` (HTTP smoke test); CI in GitHub Actions

There is no CMS, database, payment processor or analytics in this repo today.

## Getting started

```bash
nvm use            # Node 20+
npm ci
cp .env.example .env.local   # fill in Resend values to test email flows
npm run dev        # http://localhost:3000
```

| Command | Description |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` / `npm start` | Production build / server |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` | Unit tests |
| `npm run smoke` | HTTP smoke test against `BASE_URL` (default `localhost:3000`) |

CI runs lint, typecheck, tests, build and the smoke test on every PR.

## Project structure

```
app/
  api/contact/            Support contact form -> Resend
  api/notify/             Launch List signup (sends confirmation link)
  api/notify/confirm/     Double opt-in confirm -> adds to Resend audience
  api/notify/unsubscribe/ One-click + link unsubscribe
  notify/[status]/        Result pages for the above
  products/[slug]/        Product pages (data from lib/products.ts + lib/specs.ts)
  press/                  MDX posts
  support/, about/, legal/, compare/, shop/
  cart/, checkout/, account/   DISABLED (middleware.ts) until COMMERCE_ENABLED
  og/[slug]/              Dynamic Open Graph images
components/               specs/, product/, layout/, cart/, blog/, support/
lib/
  config.ts               PRE_LAUNCH_MODE, COMMERCE_ENABLED
  downloads.ts            DOWNLOADS_AVAILABLE
  site.ts                 SITE_URL / email addresses (single source of truth)
  security.ts             origin check, rate limit, signed tokens, validation helpers
  notify-email.ts         Launch List email templates + Resend helpers
  products.ts, specs.ts   Catalog + product content
docs/                     LAUNCH.md, PATH-B-COMMERCE.md, placeholder-downloads/
```

## Switches

- `PRE_LAUNCH_MODE` (`lib/config.ts`): prices vs "Coming Soon". Per-product override via `preLaunch` in `lib/products.ts`.
- `COMMERCE_ENABLED` (`lib/config.ts`): cart/checkout/account. Leave `false` until Path B is built.
- `DOWNLOADS_AVAILABLE` (`lib/downloads.ts`): set `true` after adding real files to `public/downloads/`.

## Deployment

Deploy on Vercel (`vercel.json` uses `npm ci` + `npm run build`). Set the environment variables in `.env.example`. Preview deployments are automatically `noindex`.
