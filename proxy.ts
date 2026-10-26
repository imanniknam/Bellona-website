import { type NextRequest, NextResponse } from "next/server";
import { siteUrl } from "@/lib/site";

/**
 * One public host (docs/seo backlog P0-04). Next 16 "proxy" (formerly middleware).
 *
 * Off unless CANONICAL_HOST_MODE is set, so nothing changes until the domain cutover:
 *   "redirect": any host other than the one in NEXT_PUBLIC_SITE_URL (e.g. bellona-web.onrender.com,
 *               www.) gets a 301 to the same path and query on the canonical host.
 *   "noindex":  other hosts are served normally but with `X-Robots-Tag: noindex`.
 * The canonical host and localhost are never touched.
 */
const canonical = new URL(siteUrl);
const LOCAL = new Set(["localhost", "127.0.0.1", "[::1]"]);

export function proxy(request: NextRequest) {
  const mode = process.env.CANONICAL_HOST_MODE?.trim();
  if (mode !== "redirect" && mode !== "noindex") return NextResponse.next();

  const host = (request.headers.get("x-forwarded-host") ?? request.headers.get("host") ?? "")
    .split(",")[0]
    .trim()
    .toLowerCase()
    .replace(/:\d+$/, "");
  if (!host || host === canonical.hostname || LOCAL.has(host)) return NextResponse.next();

  if (mode === "redirect") {
    const target = new URL(request.nextUrl.pathname + request.nextUrl.search, canonical);
    return NextResponse.redirect(target, 301);
  }
  const res = NextResponse.next();
  res.headers.set("X-Robots-Tag", "noindex");
  return res;
}

export const config = {
  // Static assets don't need the check.
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
