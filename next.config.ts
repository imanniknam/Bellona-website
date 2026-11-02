import type { NextConfig } from "next";

// Old industry URLs from the previous site. The camel-case one moved, and sectors we have no published work in
// yet point to the industries overview. (education and ecommerce keep their slugs, only the old /fa prefix goes.)
const industrySlugs: Record<string, string> = {
  realEstate: "/industries/real-estate",
  finance: "/industries",
  healthcare: "/industries",
  consulting: "/industries",
};

const nextConfig: NextConfig = {
  experimental: {
    // Needed because /(fa) and /(en)/en are separate root layouts (different <html lang/dir>).
    globalNotFound: true,
  },
  poweredByHeader: false,
  async redirects() {
    return [
      // One public host: www → apex (SEO-GUIDELINE A5).
      { source: "/:path*", has: [{ type: "host", value: "www.bellonaagency.com" }], destination: "https://bellonaagency.com/:path*", permanent: true },
      // Old industry pages first, so /fa/industries/realEstate lands on the new page in ONE hop (A2).
      ...Object.entries(industrySlugs).flatMap(([oldSlug, id]) => [
        { source: `/industries/${oldSlug}`, destination: id, permanent: true },
        { source: `/fa/industries/${oldSlug}`, destination: id, permanent: true },
        { source: `/en/industries/${oldSlug}`, destination: `/en${id}`, permanent: true },
      ]),
      // Persian moved from /fa to the root (2026-10-26): every other old /fa URL maps to the same path without it.
      { source: "/fa", destination: "/", permanent: true },
      { source: "/fa/:path*", destination: "/:path*", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
