import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { MetadataRoute } from "next";
import { en } from "@/content/en";
import type { Locale } from "@/content/types";
import { postPath, publishedPosts } from "@/content/blog";
import { projects } from "@/content/work";
import { publishedSpokes, spokePath } from "@/lib/drafts";
import { spokes } from "@/content/spokes";
import { localePath } from "@/lib/i18n";
import { siteUrl } from "@/lib/site";

/**
 * The content files a page is built from, for its lastmod (SEO-GUIDELINE 7-1): its language's copy plus the data
 * files that hold the rest of its text. Page components are layout, not content, so they do not count.
 */
const spokePaths = new Set([...publishedSpokes("service"), ...publishedSpokes("guide")].map(spokePath));
const SPOKE_FILES = ["content/spokes.ts", "content/spokes-services.ts", "content/spokes-guides-a.ts", "content/spokes-guides-b.ts", "content/more/spokes.ts", "content/facts.ts"];

function sources(path: string, locale: Locale): string[] {
  const copy = `content/${locale}.ts`;
  if (path === "/") return [copy];
  if (path.startsWith("/blog")) return ["content/blog.ts"];
  if (path.startsWith("/guides") || path.split("/").length > 3 || spokePaths.has(path)) return SPOKE_FILES;
  if (path.startsWith("/services")) return [copy, "content/more/pillars.ts"];
  if (path.startsWith("/work/")) return [copy, "content/work.ts", "content/work-alt.ts", "content/more/projects.ts", `public/work/${path.slice(6)}`];
  if (path.startsWith("/work")) return [copy, "content/work.ts", "content/more/pages.ts"];
  if (path.startsWith("/industries")) return [copy, "content/work.ts", "content/more/industries.ts", "content/more/pages.ts"];
  return [copy, "content/more/pages.ts"];
}

/**
 * Date a path last changed. content-dates.json (scripts/content-dates.mjs) holds the last commit date per file and is
 * committed, because deploy hosts clone shallowly and git there cannot tell. Falls back to git, then to no lastmod.
 */
let recorded: Record<string, string> | undefined;
function lastCommit(files: string[]): Date | undefined {
  try {
    recorded ??= JSON.parse(readFileSync(join(process.cwd(), "content-dates.json"), "utf8")) as Record<string, string>;
  } catch {
    recorded = {};
  }
  const times = Object.entries(recorded)
    .filter(([file]) => files.some((f) => file === f || file.startsWith(`${f}/`)))
    .map(([, date]) => new Date(date).getTime());
  if (times.length) return new Date(Math.max(...times));
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
    ...(publishedPosts().length ? ["/blog", ...publishedPosts().map(postPath)] : []),
    "/about",
    "/contact",
  ];
  return paths.flatMap((path) =>
    (["en", "fa"] as const).map((locale) => {
      // A guide's own "last updated" date wins; everything else uses the last commit touching its sources.
      const own = spokes.find((s) => s.kind === "guide" && path === `/guides/${s.slug}`)?.updated ?? publishedPosts().find((p) => path === postPath(p))?.updated;
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
