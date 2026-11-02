import { execFileSync } from "node:child_process";
import type { MetadataRoute } from "next";
import { en } from "@/content/en";
import type { Locale } from "@/content/types";
import { projects } from "@/content/work";
import { publishedSpokes, spokePath } from "@/lib/drafts";
import { spokes } from "@/content/spokes";
import { localePath } from "@/lib/i18n";
import { siteUrl } from "@/lib/site";

/**
 * The files a page is built from, for its lastmod (docs/seo TA-13): its language's copy plus the page
 * component, and for case studies the project data and screenshots.
 */
const spokePaths = new Set([...publishedSpokes("service"), ...publishedSpokes("guide")].map(spokePath));

function sources(path: string, locale: Locale): string[] {
  const copy = `content/${locale}.ts`;
  if (path === "/") return [copy, "components/pages/HomePage.tsx"];
  if (path.startsWith("/guides") || path.split("/").length > 3 || spokePaths.has(path)) return ["content/spokes.ts", "content/more/spokes.ts", "content/facts.ts", "components/pages/SpokePages.tsx"];
  if (path.startsWith("/services")) return [copy, "components/pages/ServicePages.tsx"];
  if (path.startsWith("/work/")) return [copy, "content/work.ts", "components/pages/OtherPages.tsx", `public/work/${path.slice(6)}`];
  if (path.startsWith("/work") || path.startsWith("/industries")) return [copy, "content/work.ts", "components/pages/OtherPages.tsx"];
  return [copy, "components/pages/OtherPages.tsx"];
}

/** Last git commit date touching those files. Undefined (lastmod omitted) if git isn't available. */
function lastCommit(files: string[]): Date | undefined {
  try {
    const out = execFileSync("git", ["log", "-1", "--format=%cI", "--", ...files], { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
    return out ? new Date(out) : undefined;
  } catch {
    return undefined;
  }
}

// Only real, indexable pages (no placeholder case studies, no legal stubs until they have text).
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/offers",
    "/services",
    ...en.pillars.items.map((p) => `/services/${p.slug}`),
    // Spokes and guides only once published (drafts never reach the sitemap).
    ...publishedSpokes("service").map(spokePath),
    "/partner",
    "/industries",
    ...en.industries.items.map((i) => `/industries/${i.id}`),
    "/work",
    ...projects.filter((p) => p.status === "published").map((p) => `/work/${p.slug}`),
    ...(publishedSpokes("guide").length ? ["/guides", ...publishedSpokes("guide").map(spokePath)] : []),
    "/about",
    "/contact",
  ];
  return paths.flatMap((path) =>
    (["en", "fa"] as const).map((locale) => {
      // A guide's own "last updated" date wins; everything else uses the last commit touching its sources.
      const own = spokes.find((s) => s.kind === "guide" && path === `/guides/${s.slug}`)?.updated;
      const lastModified = own ? new Date(own) : lastCommit(sources(path, locale));
      return {
        url: `${siteUrl}${localePath(locale, path)}`,
        ...(lastModified ? { lastModified } : {}),
        alternates: {
          languages: {
            fa: `${siteUrl}${localePath("fa", path)}`,
            en: `${siteUrl}${localePath("en", path)}`,
            "x-default": `${siteUrl}${localePath("fa", path)}`,
          },
        },
      };
    }),
  );
}
