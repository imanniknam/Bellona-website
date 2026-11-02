import type { Metadata } from "next";
import { BlogHubPage } from "@/components/pages/BlogPages";
import { blogHub } from "@/content/blog";
import { pageMetadata } from "@/lib/metadata";

const locale = "fa";
const h = blogHub[locale];

export const metadata: Metadata = pageMetadata({ locale, path: "/blog", title: h.metaTitle, ogTitle: blogHub.en.metaTitle, description: h.metaDescription });

export default function Page() {
  return <BlogHubPage locale={locale} />;
}
