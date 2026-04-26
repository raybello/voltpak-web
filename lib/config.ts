// Global site configuration flags.
//
// PRE_LAUNCH_MODE
// ----------------
// Flip this to `true` to put the entire catalog into "Coming Soon" mode.
// Behavior when ON:
//   - Prices are replaced with "Coming Soon" everywhere (cards, hero,
//     product page, compare table, sticky buy bar, final CTA, JSON-LD).
//   - The "Add to Cart" button is replaced with a "Notify Me" button that
//     opens a dialog and posts the email to /api/notify (Resend).
//
// Per-product override
// --------------------
// Any product can opt out (or in) by setting `preLaunch: false` (or `true`)
// on its entry in lib/products.ts. The product-level value always wins.
export const PRE_LAUNCH_MODE = true;

// Copy used everywhere a price would normally appear in pre-launch mode.
export const PRE_LAUNCH_PRICE_LABEL = "Coming Soon";

import type { Product } from "./products";

/**
 * Returns true if a given product should be rendered in pre-launch mode
 * (no price, "Notify Me" instead of "Add to Cart").
 *
 * Resolution order:
 *   1. If product.preLaunch is explicitly true/false, that wins.
 *   2. Otherwise fall back to PRE_LAUNCH_MODE.
 */
export function isPreLaunch(product: Pick<Product, "preLaunch">): boolean {
  if (typeof product.preLaunch === "boolean") return product.preLaunch;
  return PRE_LAUNCH_MODE;
}
