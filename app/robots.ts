import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

/**
 * AI search / answer crawlers (docs/seo/SEO_GEO_AEO_AUDIT.md §4.1), listed explicitly so a future blanket
 * rule can't shut them out by accident. AI training crawlers (GPTBot, ClaudeBot, Google-Extended, CCBot)
 * are not named: they fall under "*" and stay allowed (owner decision, docs/seo/QUESTIONS_FOR_TEAM.md #29).
 */
const AI_SEARCH_CRAWLERS = ["OAI-SearchBot", "ChatGPT-User", "Claude-SearchBot", "Claude-User", "PerplexityBot", "Perplexity-User"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      { userAgent: AI_SEARCH_CRAWLERS, allow: "/", disallow: ["/api/"] },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
