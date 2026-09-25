// Single source of truth for site-wide identity. Set NEXT_PUBLIC_SITE_URL
// per environment (e.g. the Vercel preview URL); production defaults to
// the canonical domain.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://voltpak.ca"
).replace(/\/$/, "");

export const SITE_NAME = "VoltPak";

export const EMAILS = {
  support: "support@voltpak.ca",
  privacy: "privacy@voltpak.ca",
  press: "press@voltpak.ca",
  returns: "returns@voltpak.ca",
} as const;

export const ABSOLUTE = (path = "") => `${SITE_URL}${path}`;
