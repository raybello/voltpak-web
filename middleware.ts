import { NextResponse, type NextRequest } from "next/server";
import { COMMERCE_ENABLED } from "@/lib/config";

// Path A (pre-launch): the demo cart/checkout/account pages are not
// reachable. Flip COMMERCE_ENABLED in lib/config.ts to restore them.
export function middleware(req: NextRequest) {
  if (!COMMERCE_ENABLED) {
    return NextResponse.redirect(new URL("/shop", req.url), 307);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/cart/:path*", "/checkout/:path*", "/account/:path*"],
};
