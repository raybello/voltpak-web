// Email plumbing for the launch-list flow (double opt-in + unsubscribe).
//
//   POST /api/notify            -> confirmation email (no list membership yet)
//   GET  /api/notify/confirm    -> adds contact to Resend audience, welcome + admin emails
//   GET|POST /api/notify/unsubscribe -> marks the contact unsubscribed
//
// Sender domain must be verified in Resend (see docs/LAUNCH.md).

import fs from "node:fs";
import path from "node:path";
import { Resend } from "resend";
import { SITE_URL } from "./site";
import { escapeHtml } from "./security";

const LOGO_CID = "voltpak-logo";
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

export type NotifyEnv = {
  resend: Resend;
  from: string;
  adminTo: string;
  audienceId: string;
};

/** Returns null (and logs) when required env vars are missing. */
export function getNotifyEnv(): NotifyEnv | null {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const adminTo = process.env.NOTIFY_TO_EMAIL;
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (!apiKey || !from || !adminTo || !audienceId || !process.env.NOTIFY_SIGNING_SECRET) {
    console.error(
      "[notify] missing one of RESEND_API_KEY, RESEND_FROM_EMAIL, NOTIFY_TO_EMAIL, RESEND_AUDIENCE_ID, NOTIFY_SIGNING_SECRET"
    );
    return null;
  }
  return { resend: new Resend(apiKey), from, adminTo, audienceId };
}

export async function sendMail(
  env: NotifyEnv,
  payload: { to: string; subject: string; html: string; headers?: Record<string, string> }
): Promise<boolean> {
  try {
    const logo = getLogoBuffer();
    const res = await env.resend.emails.send({
      from: env.from,
      to: [payload.to],
      subject: payload.subject.replace(/[\r\n]+/g, " "),
      html: payload.html,
      headers: payload.headers,
      ...(logo
        ? {
            attachments: [
              {
                filename: "voltpak-logo.png",
                content: logo,
                contentType: "image/png",
                inlineContentId: LOGO_CID,
              },
            ],
          }
        : {}),
    });
    if (res.error) {
      console.error("[notify] resend error:", res.error);
      return false;
    }
    return true;
  } catch (err) {
    console.error("[notify] resend threw:", err);
    return false;
  }
}

const button = (href: string, label: string) => `
  <div style="margin:32px 0;">
    <a href="${escapeHtml(href)}"
       style="display:inline-block;padding:14px 28px;background:#1A1A1A;color:#FFFFFF;text-decoration:none;border-radius:999px;font-weight:600;font-size:14px;font-family:-apple-system,BlinkMacSystemFont,sans-serif;">
      ${label}
    </a>
  </div>`;

const p = (html: string, color = "#3C3C43") =>
  `<p style="margin:0 0 20px;font-size:16px;line-height:1.6;color:${color};">${html}</p>`;

const h1 = (t: string) =>
  `<h1 style="margin:0 0 16px;font-size:28px;line-height:1.2;color:#1A1A1A;font-weight:700;">${t}</h1>`;

export function confirmHtml(productName: string, confirmUrl: string) {
  return baseShell(
    h1("Confirm your email") +
      p(
        `Tap the button below to join the VoltPak Launch List for <strong style="color:#1A1A1A;">${escapeHtml(productName)}</strong>.`
      ) +
      button(confirmUrl, "Confirm my email") +
      p("If you didn&rsquo;t request this, you can ignore this email and you won&rsquo;t be added to anything.", "#6E6E73"),
    "You received this email because someone entered this address on voltpak.ca. The link expires in 7 days."
  );
}

export function welcomeHtml(productName: string, productSlug: string, unsubUrl: string) {
  const productUrl = productSlug
    ? `${SITE_URL}/products/${encodeURIComponent(productSlug)}`
    : SITE_URL;
  return baseShell(
    h1("You&rsquo;re on the list.") +
      p(
        `Thanks for joining the VoltPak Launch List for <strong style="color:#1A1A1A;">${escapeHtml(productName)}</strong>. We&rsquo;ll email you once, when it&rsquo;s ready to order &mdash; plus the occasional teardown, mod guide or firmware note.`
      ) +
      button(productUrl, "See the product page →"),
    `You joined the VoltPak Launch List. <a href="${escapeHtml(unsubUrl)}" style="color:#86868B;">Unsubscribe</a> at any time. VoltPak, Ottawa, Ontario, Canada.`
  );
}

export function adminHtml(rows: Array<[string, string]>) {
  const body = rows
    .map(
      ([k, v]) => `<tr>
        <td style="padding:12px 16px;font-size:13px;color:#6E6E73;border-bottom:1px solid #E5E5EA;width:140px;">${escapeHtml(k)}</td>
        <td style="padding:12px 16px;font-size:13px;color:#1A1A1A;border-bottom:1px solid #E5E5EA;font-family:'SF Mono',ui-monospace,monospace;">${escapeHtml(v)}</td>
      </tr>`
    )
    .join("");
  return baseShell(
    h1("New Launch List signup") +
      `<table role="presentation" cellspacing="0" cellpadding="0" border="0" style="width:100%;border-collapse:collapse;background:#F5F5F7;border-radius:12px;overflow:hidden;">${body}</table>`,
    "Sent automatically by voltpak-web."
  );
}

function baseShell(inner: string, footer: string) {
  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:0;background:#FAFAFA;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="width:100%;background:#FAFAFA;padding:40px 16px;">
    <tr><td align="center">
      <table role="presentation" cellspacing="0" cellpadding="0" border="0"
        style="width:100%;max-width:560px;background:#FFFFFF;border-radius:16px;box-shadow:0 1px 3px rgba(0,0,0,0.04),0 0 0 1px rgba(0,0,0,0.04);overflow:hidden;">
        <tr><td style="padding:32px 36px 8px;">
          <img src="cid:${LOGO_CID}" alt="VoltPak" width="140" style="display:block;height:auto;max-width:140px;width:140px;border:0;" />
        </td></tr>
        <tr><td style="padding:8px 36px 36px;">${inner}</td></tr>
        <tr><td style="padding:20px 36px;background:#F5F5F7;border-top:1px solid #E5E5EA;">
          <p style="margin:0;font-size:11px;color:#86868B;line-height:1.5;">${footer}</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}
