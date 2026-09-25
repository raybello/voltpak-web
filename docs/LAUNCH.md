# Launch guide: Path A (pre-launch marketing site)

Path A ships the site as a **"Coming Soon" catalog + Launch List**. There is no
checkout, no accounts, and no real downloads yet. Path B (real store) is in
[PATH-B-COMMERCE.md](./PATH-B-COMMERCE.md).

## Master switches

| Flag | File | Path A | Effect |
|---|---|---|---|
| `PRE_LAUNCH_MODE` | `lib/config.ts` | `true` | Prices -> "Coming Soon", "Notify Me" instead of Add to Cart |
| `COMMERCE_ENABLED` | `lib/config.ts` | `false` | Hides cart/account UI; `middleware.ts` redirects `/cart`, `/checkout`, `/account` to `/shop` |
| `DOWNLOADS_AVAILABLE` | `lib/downloads.ts` | `false` | Manuals / STL / hardware zip show "Available at launch" |

`tests/config.test.ts` asserts these invariants so they can't flip by accident.

## Environment variables (Vercel -> Settings -> Environment Variables)

See `.env.example` for the full list. **Required in Production:**
`RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `CONTACT_TO_EMAIL`, `NOTIFY_TO_EMAIL`,
`RESEND_AUDIENCE_ID`, `NOTIFY_SIGNING_SECRET`.
**Strongly recommended:** `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN`
(without them rate limiting is per serverless instance only).

If any required variable is missing the routes return a generic 500 and log
which are missing; they no longer fall back to a hardcoded address.

## One-time setup checklist

- [ ] Vercel project: domain `voltpak.ca` (+ `www` redirect), set env vars above.
- [ ] Resend: verify the sending domain (SPF, DKIM, DMARC); create the
      "VoltPak Launch List" audience and copy its id into `RESEND_AUDIENCE_ID`.
- [ ] Create the mailboxes referenced on the site: `support@`, `privacy@`,
      `press@`, `returns@`, `careers@`, `legal@`, `accessibility@`,
      `engineering@` `voltpak.ca` (the site was updated from `.com` to `.ca`).
- [ ] Add Upstash Redis via the Vercel Marketplace.
- [ ] Submit `https://voltpak.ca/sitemap.xml` to Google Search Console / Bing.
- [ ] Verify security headers at securityheaders.com and run Lighthouse on the
      production URL (target 90+).
- [ ] Preview deployments are `noindex` automatically (`app/robots.ts` checks `VERCEL_ENV`).

## What Phases 1-3 changed

**Security / abuse (Phase 1)**
- `/api/contact`, `/api/notify`: Origin check, per-IP rate limit, honeypot field,
  length caps, CR/LF stripped from subjects. Recipient is `CONTACT_TO_EMAIL`.
- Launch List is **double opt-in**: `/api/notify` only emails a signed
  confirmation link; `/api/notify/confirm` adds the contact; every welcome email
  carries an unsubscribe link and `List-Unsubscribe` headers
  (`/api/notify/unsubscribe`, supports RFC 8058 one-click). Required for CASL.
- Security headers (CSP, HSTS, X-Frame-Options, Referrer-Policy,
  Permissions-Policy) in `next.config.js`. Font self-hosted via `next/font`.

**Content integrity (Phase 2)**
- Removed fabricated social proof (testimonials, "4.9/5 from 2,300+ buyers",
  "Featured in" logos) and the fake `aggregateRating` in product JSON-LD.
- Certifications are shown as a **roadmap with a "not yet certified"
  disclaimer**; "26 SGS certifications" removed.
- Placeholder downloads moved to `docs/placeholder-downloads/` (out of `public/`).
- Privacy policy and Terms rewritten to match reality (Resend, no analytics, local
  storage cart, CASL double opt-in). Domain unified on `voltpak.ca`; hours use ET.
- Dead links removed (`github.com/voltpak-hw` 404s, `href="#"` community links,
  warranty "Register" button).

**Performance / SEO / ops (Phase 3)**
- `public/media` 31 MB -> 2 MB (PNG -> WebP, hero.mp4 10 MB -> 0.7 MB, unused files deleted).
- `images.unoptimized` removed; media caching headers.
- Canonical domain everywhere via `lib/site.ts` (`NEXT_PUBLIC_SITE_URL`); full
  sitemap; robots blocks `/api`, `/cart`, `/checkout`, `/account`; Twitter/OG defaults.
- `error.tsx` / `global-error.tsx`; GitHub Actions CI (lint, typecheck, unit
  tests, build, HTTP smoke test); Dependabot; `.nvmrc`; `npm ci` on Vercel.

## Before you flip the switch: items that need a human

1. **Legal review** of `app/legal/*`, the warranty (5 yr, +2 on registration) and
   returns (30 day) policies. These describe commitments for a product that is
   not shipping yet, and warranty registration does not exist.
2. **Blog / press copy** (`public/blog/*.mdx`) is written in the present tense
   ("every VoltPak 1000 comes off the line through a 14-station jig", "FCC Part
   15 Class B sweep"). Reword to design/plan language until it is true.
3. **Certifications** (`certifications` arrays in `lib/specs.ts`) are targets only.
   Remove any you do not intend to pursue. Also review spec numbers and
   competitor comparisons (`compareAgainst`) for accuracy you can substantiate.
4. **Real downloads**: add real files to `public/downloads/`, update sizes/versions in
   `app/support/manuals` and `app/support/mods`, then set `DOWNLOADS_AVAILABLE = true`.
5. **External links**: confirm the Discord invite (`discord.gg/voltpak`) and
   Printables profile (`printables.com/@voltpak`, returned 403 to a bot) are yours.
6. **Analytics / error tracking**: none installed. If added, update the privacy policy
   first (Plausible or Vercel Analytics are cookieless). `app/error.tsx` has a
   marked spot for `Sentry.captureException`.

## Known follow-ups (not done)

- **Dependencies:** `npm audit --omit=dev` still reports 2 advisories (PostCSS
  bundled inside Next 14). The fix is a major upgrade to Next 15/16 - plan it
  separately (React 19, async request APIs).
- **CSP** currently allows `'unsafe-inline'` scripts (Next bootstrap). Move to
  nonce-based CSP via middleware when convenient.
- ~20 raw `<img>` tags remain. Files are now small WebP so impact is low, but
  converting to `next/image` (with width/height) would add responsive sizes/AVIF.
- Accessibility: contact form and notify dialog were fixed (labels, autocomplete,
  focus trap/restore). A full WCAG 2.1 AA audit (axe + manual keyboard/screen
  reader pass) is still needed before publishing the accessibility statement's claims.
- Browser E2E (Playwright) is not set up; CI uses unit tests + `scripts/smoke.mjs`.
- Custom `/og/[slug]` images are generated at the edge; verify rendering with
  the production domain in a social-card debugger.
