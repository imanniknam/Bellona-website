import type { NextConfig } from "next";

// Old industry URLs from the previous site. Most match the /industries/<id> pages exactly; the camel-case one
// moved, and sectors we have no published work in yet now point to the industries overview.
const industrySlugs: Record<string, string> = {
  realEstate: "/industries/real-estate",
  finance: "/industries",
  healthcare: "/industries",
  consulting: "/industries",
};

const nextConfig: NextConfig = {
  experimental: {
    // Needed because /(en) and /(fa)/fa are separate root layouts (different <html lang/dir>).
    globalNotFound: true,
  },
  poweredByHeader: false,
  async redirects() {
    return Object.entries(industrySlugs).flatMap(([oldSlug, id]) => [
      { source: `/industries/${oldSlug}`, destination: id, permanent: true },
      { source: `/fa/industries/${oldSlug}`, destination: `/fa${id}`, permanent: true },
    ]);
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
