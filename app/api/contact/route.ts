import { NextResponse } from "next/server";
import { Resend } from "resend";
import { SITE_URL } from "@/lib/site";
import { EMAIL_RE, clientIp, escapeHtml, originAllowed, rateLimit, str } from "@/lib/security";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  if (!originAllowed(req)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const ip = clientIp(req);
  if (!(await rateLimit(`contact:ip:${ip}`, 5, 3600))) {
    return NextResponse.json(
      { error: "Too many messages. Please try again later." },
      { status: 429 }
    );
  }

  let raw: Record<string, unknown> = {};
  try {
    raw = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  // Honeypot: real users never see or fill this field. Pretend success.
  if (str(raw.website, 200)) {
    return NextResponse.json({ ok: true });
  }

  const firstName = str(raw.firstName, 80);
  const lastName = str(raw.lastName, 80);
  const email = str(raw.email, 254).toLowerCase();
  const subject = str(raw.subject, 120);
  const serialNumber = str(raw.serialNumber, 60);
  const message = str(raw.message, 5000);

  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  if (!message) {
    return NextResponse.json({ error: "Message is required." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY ?? "";
  const fromEmail = process.env.RESEND_FROM_EMAIL ?? "";
  const toEmail = process.env.CONTACT_TO_EMAIL ?? "";

  if (!apiKey || !fromEmail || !toEmail) {
    console.error("[contact] missing RESEND_API_KEY, RESEND_FROM_EMAIL or CONTACT_TO_EMAIL");
    return NextResponse.json({ error: "Email service not configured." }, { status: 500 });
  }

  const resend = new Resend(apiKey);
  const senderName = [firstName, lastName].filter(Boolean).join(" ") || email;

  try {
    const res = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email,
      // Strip CR/LF so user input can never inject headers into the subject.
      subject: `[VoltPak Support] ${subject || "General inquiry"} — ${senderName}`.replace(/[\r\n]+/g, " "),
      html: buildEmailHtml({ firstName, lastName, email, subject, serialNumber, message }),
    });

    if (res.error) {
      console.error("[contact] resend error:", res.error);
      return NextResponse.json({ error: "Failed to send message. Please try again." }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] send threw:", err);
    return NextResponse.json({ error: "Failed to send message. Please try again." }, { status: 500 });
  }
}

function buildEmailHtml({
  firstName,
  lastName,
  email,
  subject,
  serialNumber,
  message,
}: {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  serialNumber: string;
  message: string;
}) {
  const rows: Array<[string, string]> = [
    ["Name", [firstName, lastName].filter(Boolean).join(" ") || "—"],
    ["Email", email],
    ["Subject", subject || "—"],
    ["Serial number", serialNumber || "—"],
    ["Submitted", new Date().toISOString()],
  ];

  const tableRows = rows
    .map(
      ([k, v]) => `
      <tr>
        <td style="padding:10px 16px;font-size:13px;color:#6E6E73;border-bottom:1px solid #E5E5EA;width:130px;white-space:nowrap;">
          ${escapeHtml(k)}
        </td>
        <td style="padding:10px 16px;font-size:13px;color:#1A1A1A;border-bottom:1px solid #E5E5EA;font-family:'SF Mono',ui-monospace,monospace;">
          ${escapeHtml(v)}
        </td>
      </tr>`
    )
    .join("");

  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"/></head>
<body style="margin:0;padding:0;background:#FAFAFA;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0"
    style="width:100%;background:#FAFAFA;padding:40px 16px;">
    <tr><td align="center">
      <table role="presentation" cellspacing="0" cellpadding="0" border="0"
        style="width:100%;max-width:560px;background:#FFFFFF;border-radius:16px;
               box-shadow:0 1px 3px rgba(0,0,0,0.04),0 0 0 1px rgba(0,0,0,0.04);overflow:hidden;">
        <tr><td style="padding:32px 36px 8px;">
          <p style="margin:0;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;color:#86868B;">VoltPak Support</p>
          <h1 style="margin:8px 0 0;font-size:22px;font-weight:700;color:#1A1A1A;">New contact form message</h1>
        </td></tr>
        <tr><td style="padding:20px 36px;">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0"
            style="width:100%;border-collapse:collapse;background:#F5F5F7;border-radius:12px;overflow:hidden;">
            ${tableRows}
          </table>
        </td></tr>
        <tr><td style="padding:0 36px 36px;">
          <p style="margin:0 0 10px;font-size:13px;font-weight:600;color:#1A1A1A;">Message</p>
          <div style="background:#F5F5F7;border-radius:12px;padding:16px;font-size:14px;color:#3C3C43;line-height:1.7;white-space:pre-wrap;">
            ${escapeHtml(message)}
          </div>
          <p style="margin:20px 0 0;font-size:13px;color:#6E6E73;">
            Reply directly to this email to respond to ${escapeHtml(email)}.
          </p>
        </td></tr>
        <tr><td style="padding:16px 36px;background:#F5F5F7;border-top:1px solid #E5E5EA;">
          <p style="margin:0;font-size:11px;color:#86868B;">
            Sent from ${escapeHtml(SITE_URL.replace(/^https?:\/\//, ""))}/support/contact
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}
