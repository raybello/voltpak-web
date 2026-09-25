// Shared helpers for the public POST endpoints (contact, notify).
import { createHmac, timingSafeEqual } from "node:crypto";
import { SITE_URL } from "./site";

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Trim + cap a value that came from untrusted JSON. */
export function str(v: unknown, max: number): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

export function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  return (fwd?.split(",")[0] ?? req.headers.get("x-real-ip") ?? "unknown").trim();
}

/**
 * Reject cross-site browser POSTs. Requests with no Origin header (curl,
 * server-to-server) are not blocked here; the rate limiter covers those.
 */
export function originAllowed(req: Request): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return true;
  try {
    const host = new URL(origin).host;
    const allowed = new Set([new URL(SITE_URL).host, req.headers.get("host") ?? ""]);
    // www variant of the canonical host
    allowed.add(`www.${new URL(SITE_URL).host}`);
    return allowed.has(host);
  } catch {
    return false;
  }
}

// ---- Rate limiting ---------------------------------------------------
//
// Uses Upstash Redis (REST) when UPSTASH_REDIS_REST_URL / _TOKEN are set —
// required for real protection on serverless, where instances don't share
// memory. Falls back to a per-instance in-memory window otherwise (fine for
// local dev, best-effort in production).

const memory = new Map<string, { count: number; reset: number }>();

export async function rateLimit(
  key: string,
  limit: number,
  windowSec: number
): Promise<boolean> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (url && token) {
    try {
      const res = await fetch(`${url}/pipeline`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify([
          ["INCR", key],
          ["EXPIRE", key, String(windowSec), "NX"],
        ]),
        cache: "no-store",
      });
      const data = (await res.json()) as Array<{ result?: number }>;
      return (data?.[0]?.result ?? 0) <= limit;
    } catch (err) {
      console.error("[rateLimit] upstash failed, falling back to memory:", err);
    }
  }

  const now = Date.now();
  const entry = memory.get(key);
  if (!entry || entry.reset < now) {
    if (memory.size > 5000) memory.clear();
    memory.set(key, { count: 1, reset: now + windowSec * 1000 });
    return true;
  }
  entry.count += 1;
  return entry.count <= limit;
}

// ---- Signed tokens (double opt-in / unsubscribe) --------------------

function secret(): string {
  const s = process.env.NOTIFY_SIGNING_SECRET;
  if (!s) throw new Error("NOTIFY_SIGNING_SECRET is not set");
  return s;
}

const b64 = (s: string) => Buffer.from(s).toString("base64url");
const unb64 = (s: string) => Buffer.from(s, "base64url").toString();

/** purpose scopes a token so a confirm link can't be used to unsubscribe. */
export function signToken(purpose: "confirm" | "unsub", payload: Record<string, string>, ttlSec?: number): string {
  const body = b64(
    JSON.stringify({ ...payload, p: purpose, ...(ttlSec ? { exp: Date.now() + ttlSec * 1000 } : {}) })
  );
  const sig = createHmac("sha256", secret()).update(body).digest("base64url");
  return `${body}.${sig}`;
}

export function verifyToken(
  purpose: "confirm" | "unsub",
  token: string
): Record<string, string> | null {
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;
  const expected = createHmac("sha256", secret()).update(body).digest("base64url");
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    const data = JSON.parse(unb64(body));
    if (data.p !== purpose) return null;
    if (data.exp && Date.now() > data.exp) return null;
    return data;
  } catch {
    return null;
  }
}

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
