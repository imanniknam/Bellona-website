import type { Metadata } from "next";
import { BlogPostPage, findPost } from "@/components/pages/BlogPages";
import { postPath, publishedPosts } from "@/content/blog";
import { pageMetadata } from "@/lib/metadata";

const locale = "fa";
type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return publishedPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = findPost(slug);
  if (!p) return {};
  const c = p[locale];
  return pageMetadata({
    locale,
    path: postPath(p),
    title: c.metaTitle,
    ogTitle: p.en.metaTitle,
    description: c.metaDescription,
    article: { publishedTime: p.published, modifiedTime: p.updated, author: p.author.split("|").at(-1) },
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  return <BlogPostPage locale={locale} slug={slug} />;
}
