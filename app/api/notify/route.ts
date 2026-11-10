// POST /api/notify
//
// Step 1 of the launch-list double opt-in. Validates the request, then emails
// the address a signed confirmation link. Nobody is added to the audience
// until the link is clicked (see ./confirm), so the endpoint can't be used to
// enrol or spam a third party.

import { NextResponse } from "next/server";
import { getProduct } from "@/lib/catalog";
import { SITE_URL } from "@/lib/site";
import { EMAIL_RE, clientIp, originAllowed, rateLimit, signToken, str } from "@/lib/security";
import { confirmHtml, getNotifyEnv, sendMail } from "@/lib/notify-email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CONFIRM_TTL_SEC = 7 * 24 * 3600;

export async function POST(req: Request) {
  if (!originAllowed(req)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  if (!(await rateLimit(`notify:ip:${clientIp(req)}`, 10, 3600))) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  }

  let raw: Record<string, unknown> = {};
  try {
    raw = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  // Honeypot: pretend success so bots learn nothing.
  if (str(raw.website, 200)) return NextResponse.json({ ok: true });

  const email = str(raw.email, 254).toLowerCase();
  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  // Only accept known products; never echo arbitrary client text into email.
  const product = await getProduct(str(raw.productSlug, 100));
  const productName = product?.name ?? "the VoltPak launch";
  const productSlug = product?.slug ?? "";

  // One confirmation email per address per day.
  if (!(await rateLimit(`notify:email:${email}`, 1, 24 * 3600))) {
    return NextResponse.json({ ok: true });
  }

  const env = getNotifyEnv();
  if (!env) {
    return NextResponse.json({ error: "Signup is temporarily unavailable." }, { status: 500 });
  }

  const token = signToken("confirm", { email, slug: productSlug }, CONFIRM_TTL_SEC);
  const confirmUrl = `${SITE_URL}/api/notify/confirm?token=${encodeURIComponent(token)}`;

  const sent = await sendMail(env, {
    to: email,
    subject: `Confirm your spot on the VoltPak Launch List`,
    html: confirmHtml(productName, confirmUrl),
  });

  if (!sent) {
    return NextResponse.json(
      { error: "We couldn't send the confirmation right now. Please try again in a moment." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, confirmationRequired: true });
}
