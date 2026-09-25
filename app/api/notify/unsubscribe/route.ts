// GET  /api/notify/unsubscribe?token=...   (link in the email footer)
// POST /api/notify/unsubscribe?token=...   (RFC 8058 one-click, sent by mail clients)
import { NextResponse } from "next/server";
import { SITE_URL } from "@/lib/site";
import { verifyToken } from "@/lib/security";
import { getNotifyEnv } from "@/lib/notify-email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function unsubscribe(req: Request): Promise<boolean> {
  const token = new URL(req.url).searchParams.get("token") ?? "";
  try {
    const data = verifyToken("unsub", token);
    const env = getNotifyEnv();
    if (!data?.email || !env) return false;
    const res = await env.resend.contacts.update({
      audienceId: env.audienceId,
      email: data.email,
      unsubscribed: true,
    });
    if (res.error) {
      console.error("[unsubscribe] resend error:", res.error);
      return false;
    }
    return true;
  } catch (err) {
    console.error("[unsubscribe] failed:", err);
    return false;
  }
}

export async function GET(req: Request) {
  const ok = await unsubscribe(req);
  return NextResponse.redirect(`${SITE_URL}/notify/${ok ? "unsubscribed" : "error"}`, 303);
}

export async function POST(req: Request) {
  const ok = await unsubscribe(req);
  return NextResponse.json({ ok }, { status: ok ? 200 : 400 });
}
