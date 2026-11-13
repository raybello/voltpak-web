// GET /api/notify/confirm?token=...  (link from the confirmation email)
import { NextResponse } from "next/server";
import { getProduct } from "@/lib/catalog";
import { SITE_URL } from "@/lib/site";
import { signToken, verifyToken } from "@/lib/security";
import { adminHtml, getNotifyEnv, sendMail, welcomeHtml } from "@/lib/notify-email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const to = (status: string) => NextResponse.redirect(`${SITE_URL}/notify/${status}`, 303);

export async function GET(req: Request) {
  const token = new URL(req.url).searchParams.get("token") ?? "";
  let data: Record<string, string> | null = null;
  try {
    data = verifyToken("confirm", token);
  } catch {
    return to("error");
  }
  if (!data?.email) return to("invalid");

  const env = getNotifyEnv();
  if (!env) return to("error");

  const { email, slug } = data;

  try {
    // A repeat confirm click returns an error for the duplicate; that's fine.
    await env.resend.contacts.create({ email, audienceId: env.audienceId, unsubscribed: false });
  } catch (err) {
    console.warn("[notify] contacts.create failed (likely duplicate):", err);
  }

  const product = await getProduct(slug);
  const productName = product?.name ?? "the VoltPak launch";
  const unsubUrl = `${SITE_URL}/api/notify/unsubscribe?token=${encodeURIComponent(
    signToken("unsub", { email })
  )}`;

  await sendMail(env, {
    to: email,
    subject: `You're on the VoltPak Launch List`,
    html: welcomeHtml(productName, product?.slug ?? "", unsubUrl),
    headers: {
      "List-Unsubscribe": `<${unsubUrl}>`,
      "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
    },
  });
  await sendMail(env, {
    to: env.adminTo,
    subject: `New Launch List signup: ${email}`,
    html: adminHtml([
      ["Email", email],
      ["Product", productName],
      ["Timestamp", new Date().toISOString()],
    ]),
  });

  return to("confirmed");
}
