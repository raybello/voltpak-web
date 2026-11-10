// POST /api/revalidate
//
// Payload CMS webhook handler that triggers on-demand ISR revalidation.
// Configure in Payload admin: Collections → hooks → afterChange → HTTP POST
// to https://voltpak.ca/api/revalidate with the REVALIDATE_SECRET header.

import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const secret = req.headers.get("x-revalidate-secret");
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: Record<string, unknown> = {};
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const collection = body.collection as string | undefined;
  const slug = (body.doc as Record<string, unknown>)?.slug as string | undefined;

  if (collection === "products") {
    if (slug) {
      revalidatePath(`/products/${slug}`);
    }
    // Revalidate listing pages on any product change
    revalidatePath("/shop");
    revalidatePath("/compare");
    revalidatePath("/");
    revalidateTag("products");
  }

  return NextResponse.json({ revalidated: true, collection, slug });
}
