import type { MetadataRoute } from "next";
import { INDUSTRY_KEYS } from "@/lib/constants";
import { absoluteUrl } from "@/lib/locale-path";
import { routing } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", ...INDUSTRY_KEYS.map((key) => `/industries/${key}`)];

  return routing.locales.flatMap((locale) =>
    paths.map((path) => ({
      url: absoluteUrl(locale, path),
      lastModified: new Date(),
      changeFrequency: path === "" ? "weekly" : "monthly",
      priority: path === "" ? 1 : 0.8,
    }))
  );
}
