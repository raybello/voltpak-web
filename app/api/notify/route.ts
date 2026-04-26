// POST /api/notify
//
// Captures a "Notify me" sign-up for a pre-launch product:
//   1. Adds the email to the VoltPak Launch List audience in Resend.
//      (Audience auto-resolved/created on first call when RESEND_AUDIENCE_ID
//      is not set.)
//   2. Sends a promotional confirmation email to the subscriber.
//   3. Sends an internal notification to the team inbox so we know who
//      just joined the launch list.
//
// Sender domain: sales.voltpak.ca (must be verified in Resend before this
// will deliver to anyone other than the account owner).
//
// All Resend operations are wrapped in try/catch so a single failure (e.g.
// duplicate contact) doesn't kill the whole flow. The route only returns
// 500 if BOTH outbound emails fail.

import { NextResponse } from "next/server";
import { Resend } from "resend";
import fs from "node:fs";
import path from "node:path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Inline logo embedded via CID (Resend `inlineContentId`).
// Using CID is the most universally compatible way to ship a logo in
// transactional email - it bypasses the "Display images below" prompt
// in Gmail and renders inline in Outlook (web + desktop), Apple Mail,
// iOS Mail, Yahoo, and Thunderbird without any extra config.
const LOGO_CID = "voltpak-logo";
const LOGO_FILENAME = "voltpak-logo.png";
const LOGO_PATH = path.join(process.cwd(), "public", "media", "logo.png");

let cachedLogo: Buffer | null = null;
function getLogoBuffer(): Buffer | null {
  if (cachedLogo) return cachedLogo;
  try {
    cachedLogo = fs.readFileSync(LOGO_PATH);
    return cachedLogo;
  } catch (err) {
    console.warn("[notify] could not read logo at", LOGO_PATH, err);
    return null;
  }
}

const RESEND_API_KEY =
  process.env.RESEND_API_KEY ?? "";
const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ?? "";
const NOTIFY_TO_EMAIL =
  process.env.NOTIFY_TO_EMAIL ?? "";
const AUDIENCE_NAME =
  process.env.RESEND_AUDIENCE_NAME ?? "";

// Simple email regex - good enough for client-side validation parity.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type NotifyBody = {
  email?: string;
  productName?: string;
  productSlug?: string;
  productId?: string;
};

export async function POST(req: Request) {
  let body: NotifyBody = {};
  try {
    body = (await req.json()) as NotifyBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const email = (body.email ?? "").trim().toLowerCase();
  const productName = (body.productName ?? "the VoltPak launch").trim();
  const productSlug = (body.productSlug ?? "").trim();
  const productId = (body.productId ?? "").trim();

  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  const resend = new Resend(RESEND_API_KEY);

  // ---- 1) Resolve audience ID ----------------------------------------
  let audienceId = process.env.RESEND_AUDIENCE_ID;
  if (!audienceId) {
    try {
      const list = await resend.audiences.list();
      // SDK shape: { data: { data: Audience[] } } or { data: Audience[] } depending on version
      const items =
        (list as any)?.data?.data ??
        (list as any)?.data ??
        [];
      const found = Array.isArray(items)
        ? items.find((a: any) => a?.name === AUDIENCE_NAME)
        : null;
      if (found?.id) {
        audienceId = found.id;
      } else {
        const created = await resend.audiences.create({ name: AUDIENCE_NAME });
        audienceId =
          (created as any)?.data?.id ?? (created as any)?.id ?? undefined;
      }
    } catch (err) {
      // Non-fatal: still attempt to send the emails.
      console.warn("[notify] audience resolution failed:", err);
    }
  }

  // ---- 2) Add subscriber to audience ---------------------------------
  if (audienceId) {
    try {
      await resend.contacts.create({
        email,
        audienceId,
        unsubscribed: false,
      });
    } catch (err) {
      // Likely duplicate contact - safe to ignore.
      console.warn("[notify] contacts.create failed (probably duplicate):", err);
    }
  }

  // ---- 3) Send the two emails ----------------------------------------
  const subscriberRes = await safeSend(resend, {
    from: FROM_EMAIL,
    to: email,
    subject: `You're on the VoltPak Launch List - ${productName}`,
    html: subscriberHtml({ productName, productSlug }),
  });

  const adminRes = await safeSend(resend, {
    from: FROM_EMAIL,
    to: NOTIFY_TO_EMAIL,
    subject: `🔔 New Launch List signup: ${email}`,
    html: adminHtml({
      email,
      productName,
      productSlug,
      productId,
      audienceId,
    }),
  });

  if (!subscriberRes.ok && !adminRes.ok) {
    return NextResponse.json(
      {
        error:
          "We couldn't send the confirmation right now. Please try again in a moment.",
      },
      { status: 500 }
    );
  }

  return NextResponse.json({
    ok: true,
    subscriber: subscriberRes.ok,
    admin: adminRes.ok,
    audienceId: audienceId ?? null,
  });
}

// ----------------------------- helpers --------------------------------

async function safeSend(
  resend: Resend,
  payload: { from: string; to: string; subject: string; html: string }
): Promise<{ ok: boolean; id?: string; error?: string }> {
  try {
    const logo = getLogoBuffer();
    const attachments = logo
      ? [
        {
          filename: LOGO_FILENAME,
          content: logo,
          contentType: "image/png",
          inlineContentId: LOGO_CID,
        },
      ]
      : undefined;

    const res = await resend.emails.send({
      from: payload.from,
      to: [payload.to],
      subject: payload.subject,
      html: payload.html,
      ...(attachments ? { attachments } : {}),
    });
    const id = (res as any)?.data?.id ?? (res as any)?.id;
    if ((res as any)?.error) {
      console.error("[notify] resend.emails.send error:", (res as any).error);
      return { ok: false, error: String((res as any).error?.message ?? "send failed") };
    }
    return { ok: true, id };
  } catch (err: any) {
    console.error("[notify] resend.emails.send threw:", err);
    return { ok: false, error: err?.message ?? "send threw" };
  }
}

function subscriberHtml({
  productName,
  productSlug,
}: {
  productName: string;
  productSlug: string;
}) {
  const productUrl = productSlug
    ? `https://voltpak.ca/products/${encodeURIComponent(productSlug)}`
    : "https://voltpak.ca";

  return baseShell(`
    <h1 style="margin:0 0 16px;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;font-size:28px;line-height:1.2;color:#1A1A1A;font-weight:700;">
      You're on the list.
    </h1>
    <p style="margin:0 0 20px;font-size:16px;line-height:1.6;color:#3C3C43;">
      Thanks for joining the VoltPak Launch List for
      <strong style="color:#1A1A1A;">${escapeHtml(productName)}</strong>.
    </p>
    <p style="margin:0 0 20px;font-size:16px;line-height:1.6;color:#3C3C43;">
      You'll be the first to know when it ships, the first to see pricing,
      and the first to get an early-access window before it goes live to
      the general public.
    </p>
    <div style="margin:32px 0;">
      <a href="${productUrl}"
         style="display:inline-block;padding:14px 28px;background:#1A1A1A;color:#FFFFFF;
                text-decoration:none;border-radius:999px;font-weight:600;font-size:14px;
                font-family:-apple-system,BlinkMacSystemFont,sans-serif;letter-spacing:0.01em;">
        See the product page →
      </a>
    </div>
    <p style="margin:0 0 12px;font-size:14px;line-height:1.6;color:#6E6E73;">
      No noise, no spam. Just one heads-up when ${escapeHtml(productName)}
      is ready, plus the occasional teardown, mod guide, or firmware note
      from the engineering team.
    </p>
    <p style="margin:24px 0 0;font-size:14px;line-height:1.6;color:#6E6E73;">
      - The VoltPak team
    </p>
  `);
}

function adminHtml({
  email,
  productName,
  productSlug,
  productId,
  audienceId,
}: {
  email: string;
  productName: string;
  productSlug: string;
  productId: string;
  audienceId?: string;
}) {
  const rows: Array<[string, string]> = [
    ["Email", email],
    ["Product", productName],
    ["Product slug", productSlug || "-"],
    ["Product ID", productId || "-"],
    ["Audience", audienceId ? `${AUDIENCE_NAME} (${audienceId})` : AUDIENCE_NAME],
    ["Timestamp", new Date().toISOString()],
  ];

  return baseShell(`
    <h1 style="margin:0 0 8px;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif;font-size:24px;line-height:1.2;color:#1A1A1A;font-weight:700;">
      🔔 New Launch List signup
    </h1>
    <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#3C3C43;">
      Someone just joined the launch list for
      <strong style="color:#1A1A1A;">${escapeHtml(productName)}</strong>.
    </p>
    <table role="presentation" cellspacing="0" cellpadding="0" border="0"
      style="width:100%;border-collapse:collapse;background:#F5F5F7;border-radius:12px;overflow:hidden;">
      ${rows
      .map(
        ([k, v]) => `
        <tr>
          <td style="padding:12px 16px;font-size:13px;color:#6E6E73;border-bottom:1px solid #E5E5EA;font-family:-apple-system,sans-serif;width:140px;">
            ${escapeHtml(k)}
          </td>
          <td style="padding:12px 16px;font-size:13px;color:#1A1A1A;border-bottom:1px solid #E5E5EA;font-family:'SF Mono',ui-monospace,monospace;">
            ${escapeHtml(v)}
          </td>
        </tr>`
      )
      .join("")}
    </table>
    <p style="margin:24px 0 0;font-size:13px;color:#6E6E73;">
      Sent automatically by voltpak-web · /api/notify
    </p>
  `);
}

function baseShell(inner: string) {
  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:0;background:#FAFAFA;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0"
    style="width:100%;background:#FAFAFA;padding:40px 16px;">
    <tr><td align="center">
      <table role="presentation" cellspacing="0" cellpadding="0" border="0"
        style="width:100%;max-width:560px;background:#FFFFFF;border-radius:16px;
               box-shadow:0 1px 3px rgba(0,0,0,0.04),0 0 0 1px rgba(0,0,0,0.04);overflow:hidden;">
        <tr><td style="padding:32px 36px 8px;">
          <img src="cid:${LOGO_CID}"
               alt="VoltPak"
               width="140"
               style="display:block;height:auto;max-width:140px;width:140px;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;" />
        </td></tr>
        <tr><td style="padding:8px 36px 36px;">
          ${inner}
        </td></tr>
        <tr><td style="padding:20px 36px;background:#F5F5F7;border-top:1px solid #E5E5EA;">
          <p style="margin:0;font-size:11px;color:#86868B;line-height:1.5;font-family:-apple-system,sans-serif;">
            VoltPak · sales.voltpak.ca · You received this email because you joined the
            VoltPak Launch List. We'll only contact you about launch availability and
            related product updates.
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
