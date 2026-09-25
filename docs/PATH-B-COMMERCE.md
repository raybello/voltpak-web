# Path B: turning the site into a real store

Everything needed to go from the Path A pre-launch site to accepting orders.
Estimated effort: 3-6 weeks, dominated by shipping/regulatory work, not code.

## 0. Business prerequisites (start now, they have long lead times)

- **Dangerous goods shipping.** Lithium batteries are UN3480/UN3481 (Class 9).
  A 1,024 Wh pack is above the 100 Wh carrier limit, so parcel shipping requires
  DG-trained handling, UN 38.3 test reports, and carrier agreements (or a
  3PL that ships DG). Decide markets: Canada only, or Canada + US.
- **Product certification** before selling: CSA/UL (UL 2743 / UL 9540 if
  targeted), FCC/ISED (EMC), transport UN 38.3. Marketing may only claim what has
  been granted. Update `certifications` in `lib/specs.ts`, then rename the
  "Certification roadmap" copy in `components/specs/CertificationsRow.tsx`.
- **Tax & currency:** GST/HST/PST (Canada), US sales-tax nexus, CAD vs USD pricing
  (the catalog is USD today; `formatPrice` assumes it).
- **Legal:** final Terms, Privacy (add Stripe, order data, accounts), Returns and
  Warranty pages, and lithium-battery safety/recycling disclosures.
- **Support ops:** who answers `support@`, returns/RMA workflow, warranty registration.

## 1. Choose the commerce stack

| Option | Fit | Notes |
|---|---|---|
| **Stripe Checkout + Stripe Tax** (recommended to start) | Small catalog (5 SKUs), custom frontend already built | Hosted payment page = no card data on our pages (SAQ-A). You own orders/inventory logic. |
| Shopify (Storefront API / Hydrogen-lite) | Want inventory, fulfillment, tax and shipping apps out of the box | Replace `lib/products.ts` pricing with Shopify as source of truth. |
| Medusa / Saleor | Full custom control | Most engineering. |

The rest of this doc assumes Stripe Checkout.

## 2. Code changes

1. **Server-side catalog as source of truth.** Cart currently stores `price` in
   localStorage (`components/cart/CartContext.tsx`). The client must send only
   `{productId, variant, quantity}`; the server looks up price from
   `lib/products.ts` (or Stripe Price IDs) - never trust client prices. Validate
   stored cart JSON on load (schema check; drop unknown ids).
2. **`POST /api/checkout`**: validate items against the catalog, refuse products
   where `isPreLaunch(product)`, compute shipping server-side (replace the
   hardcoded `subtotal >= 500 ? 0 : 29` in `app/checkout/page.tsx` and
   `CartDrawer.tsx`), create a Stripe Checkout Session (`automatic_tax`,
   `shipping_address_collection`, allowed countries), return the session URL.
   Apply the same rate limit + origin helpers in `lib/security.ts`.
3. **Replace `app/checkout/page.tsx`.** Delete the raw card-number inputs and the
   fake "Order placed" state. The page becomes an order summary + button that calls
   `/api/checkout` and redirects to Stripe. Add `/checkout/success` and
   `/checkout/cancel`.
4. **`POST /api/webhooks/stripe`**: verify the signature with the raw body,
   handle `checkout.session.completed` (idempotent on event id), persist the order,
   send confirmation via Resend, decrement inventory. Needs a datastore
   (Vercel Postgres / Neon / Supabase) - add `orders`, `order_items`,
   `stripe_events` tables.
5. **Accounts** (optional for v1): prefer "order lookup by email link" (reuse the
   signed-token helpers in `lib/security.ts`). If full accounts are required, use
   Auth.js or Clerk and rebuild `components/account/SignInForm.tsx`, currently a no-op form.
6. **Per-product launch.** Set `preLaunch: false` on a product in
   `lib/products.ts` once it is shippable; the flag wins over `PRE_LAUNCH_MODE`.
   Emit real prices in JSON-LD (`components/specs/ProductJsonLd.tsx` already
   branches on `isPreLaunch`) and add `priceCurrency`.
7. **Flip flags:** `COMMERCE_ENABLED = true` in `lib/config.ts` (restores header
   cart/account icons, `CartDrawer`, and removes the middleware redirect). Update
   `tests/config.test.ts` and `scripts/smoke.mjs`, which assert the Path A state.
8. **Sitemap/robots:** `/cart`, `/checkout` and `/account` stay disallowed in
   `app/robots.ts`; add `noindex` metadata to those pages.
9. **CSP:** add `https://js.stripe.com` (script/frame) and `https://checkout.stripe.com`
   (form-action) to `next.config.js` if Stripe.js is embedded.
10. **Env vars to add:** `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`,
    `DATABASE_URL`, and (if using Elements) `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`.

## 3. Operations

- Order status emails (confirmed / shipped with tracking / delivered).
- Returns/RMA process matching `app/support/returns` and warranty pages.
- Fraud: enable Stripe Radar; consider address verification for high-value orders.
- Monitoring: add Sentry (or similar) and alerts on webhook failures.
- Runbook: rollback (Vercel instant rollback), refund procedure, incident contact.

## 4. Test plan before enabling

- Stripe test mode end-to-end: success, cancel, declined card, 3DS, tax by region.
- Webhook replay/idempotency test; forged-signature test.
- Attempt to tamper cart price/quantity from the browser; server must ignore it.
- Shipping-rate and DG-surcharge checks for each destination.
- Accessibility pass on cart/checkout; Lighthouse on `/checkout`.
- Update privacy policy to list Stripe and order/account data **before** launch.
