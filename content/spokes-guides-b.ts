import { facts, fmt } from "./facts";
import type { Spoke } from "./spokes";

/**
 * Guides (SEO-GUIDELINE E2), part 2: Next.js SEO checklist, AI-search readiness, lead follow-up automation with n8n.
 * 1,000+ words per language, answer-first, with a table of contents. Technical advice is general and the code was
 * written for the Next.js App Router (the same patterns this site uses); claims about Bellona come from
 * content/work.ts and content/facts.ts.
 * TODO(owner): confirm the byline of each guide with the named team member (SEO-GUIDELINE E2); add a measurable
 * result for the real-estate system (e.g. hours saved, leads handled) if the client agrees to publish it.
 */
const re = facts.projects.realEstate;
const sprintEn = fmt.weeks(facts.timelines.automationSprintWeeks, "en");
const sprintFa = fmt.weeks(facts.timelines.automationSprintWeeks, "fa");
const nEn = (v: number) => fmt.n(v, "en");
const nFa = (v: number) => fmt.n(v, "fa");
const UPDATED = "2026-11-02";
const BAZDAR = "Amirhossein Bazdar|امیرحسین بازدار";
const NIKNAM = "Iman Niknam|ایمان نیک‌نام";

const metadataCode = `// app/layout.tsx: site-wide defaults
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  title: { default: "Example | What we do", template: "%s · Example" },
  description: "One clear sentence about what the site offers.",
};

// app/services/[slug]/page.tsx: per-page metadata
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = await getService(slug);
  return {
    title: service.title,
    description: service.description,
    alternates: { canonical: \`/services/\${slug}\` },
    openGraph: { type: "website", title: service.title, description: service.description, url: \`/services/\${slug}\` },
  };
}`;

const robotsCode = `// app/robots.ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: ["/", "/api/og"], disallow: ["/api/"] }],
    sitemap: "https://example.com/sitemap.xml",
  };
}`;

const jsonLdCode = `// components/JsonLd.tsx
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // "<" is escaped so content can never close the script tag
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\\\u003c") }}
    />
  );
}

// usage on a service page
<JsonLd
  data={{
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    provider: { "@id": "https://example.com/#organization" },
  }}
/>`;

const imageCode = `import Image from "next/image";

// The first large image on the page is usually the LCP: mark it priority and give honest sizes
<Image
  src="/work/project/cover.jpg"
  alt="Descriptive text of what the image shows"
  width={1440}
  height={900}
  priority
  sizes="(min-width: 1024px) 800px, 100vw"
/>`;

export const guidesB: Spoke[] = [
  // ======================================================================================= Next.js SEO checklist
  {
    kind: "guide",
    slug: "nextjs-seo-checklist",
    pillar: "marketing-growth",
    need: "growth",
    status: "published",
    updated: UPDATED,
    author: BAZDAR,
    needs: [],
    projects: ["dane-news", "yasin"],
    guides: ["bilingual-website-hreflang-rtl", "ai-search-readiness"],
    en: {
      metaTitle: "Next.js SEO checklist: metadata, sitemap and JSON-LD",
      metaDescription: "A practical Next.js SEO checklist with code: the metadata API, canonical and hreflang, sitemap.ts, robots.ts, JSON-LD, images, fonts and redirects, plus how to test each item.",
      eyebrow: "Guide",
      h1: "Next.js **SEO checklist**",
      definition:
        "Next.js builds pages on the server, which already gives search engines the complete text in the first response. The rest of Next.js SEO is a checklist: correct metadata, one canonical address per page, a real sitemap, a robots file, structured data, fast images and fonts, and redirects. This guide lists each item with code for the App Router.",
      answers: [
        {
          q: "Why is Next.js SEO easier to get right?",
          a: "Next.js renders each page on the server, so the full HTML text is in the first response and a search engine, or an AI assistant that does not run JavaScript, can read it immediately. It also gives you direct control of metadata, sitemaps, robots, redirects and image optimisation, which are the main SEO levers.",
          details: [
            { kind: "p", text: "A page that builds its text in the browser forces the crawler to run JavaScript before it sees anything. Server rendering (or static generation) removes that step. It is the reason most of our own sites, including this one, are built with Next.js." },
            { kind: "links", items: [{ label: "Next.js website design", href: "/services/website-design/nextjs" }] },
          ],
        },
        {
          q: "How do you set titles, descriptions and canonical tags?",
          a: "With the Metadata API: set site-wide defaults and a title template in the root layout, and a generateMetadata function on dynamic pages. Give every page a unique title and description, one canonical address, and set metadataBase so relative URLs become absolute.",
          details: [{ kind: "code", lang: "ts", text: metadataCode }],
        },
        {
          q: "How do you add hreflang for two languages?",
          a: "In the same metadata object, under alternates.languages, list each language's address plus x-default. Every language version must list the full set, and each version's canonical points to itself. The bilingual guide explains the rules and the common mistakes.",
          details: [
            {
              kind: "code",
              lang: "ts",
              text: `alternates: {
  canonical: "/services",
  languages: { fa: "/services", en: "/en/services", "x-default": "/services" },
},`,
            },
            { kind: "links", items: [{ label: "Guide: bilingual website, hreflang and RTL", href: "/guides/bilingual-website-hreflang-rtl" }] },
          ],
        },
        {
          q: "How do you generate a sitemap with real dates?",
          a: "Add app/sitemap.ts that returns every public URL, with lastModified set to the date the content really changed, never the build time. Include each language's alternates, leave out redirected, noindex and API URLs, and generate the list from the same data source that builds the pages.",
          details: [
            {
              kind: "code",
              lang: "ts",
              text: `// app/sitemap.ts
import type { MetadataRoute } from "next";
import { getAllServices } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const services = await getAllServices();
  return services.map((s) => ({
    url: \`https://example.com/services/\${s.slug}\`,
    lastModified: s.updatedAt, // the real update date
    alternates: { languages: { fa: \`https://example.com/services/\${s.slug}\`, en: \`https://example.com/en/services/\${s.slug}\` } },
  }));
}`,
            },
          ],
        },
        {
          q: "What should robots.txt contain?",
          a: "Allow crawling of the site, point to the sitemap, and disallow only what has no value in search, such as your API routes. Keep the generated Open Graph image route allowed so link previews work. Do not block CSS or JavaScript files that pages need to render.",
          details: [{ kind: "code", lang: "ts", text: robotsCode }],
        },
        {
          q: "How do you add structured data (JSON-LD)?",
          a: "Render a small component that outputs a script tag of type application/ld+json, with values taken from the real page data. Use an Organization on every page, a Service or Article where it applies, and a BreadcrumbList that matches the visible breadcrumb. Never add data that the page does not show.",
          details: [{ kind: "code", lang: "tsx", text: jsonLdCode }],
        },
        {
          q: "How do you optimise images?",
          a: "Use next/image with honest width and height so nothing shifts, give a sizes attribute so a phone does not download a desktop-sized file, mark the first large image on the page priority, and write descriptive alt text. Decorative images get an empty alt.",
          details: [{ kind: "code", lang: "tsx", text: imageCode }],
        },
        {
          q: "What about fonts and heavy libraries?",
          a: "Load fonts with next/font so they are self-hosted and do not shift the layout, use font-display swap and only the weights you use. Load heavy libraries such as animation or 3D only on the pages that need them, using dynamic imports, so service and article pages stay light.",
          details: [
            {
              kind: "code",
              lang: "tsx",
              text: `import dynamic from "next/dynamic";
import localFont from "next/font/local";

export const body = localFont({ src: "./fonts/Body.woff2", display: "swap" });

// Only the pages that render the 3D scene pay for it
const Scene = dynamic(() => import("@/components/Scene"));`,
            },
          ],
        },
        {
          q: "How do you handle redirects and 404s?",
          a: "Define permanent redirects in next.config, one hop each, and let unknown dynamic URLs return a real 404 by setting dynamicParams to false and calling notFound(). A page that returns 200 with a \"not found\" message (a soft 404) is worse than a true 404.",
          details: [
            {
              kind: "code",
              lang: "ts",
              text: `// next.config.ts
async redirects() {
  return [{ source: "/old-page", destination: "/new-page", permanent: true }];
},

// app/services/[slug]/page.tsx
export const dynamicParams = false; // unknown slugs return a real 404
export function generateStaticParams() { return getAllServices().map((s) => ({ slug: s.slug })); }`,
            },
          ],
        },
        {
          q: "How do you test every item?",
          a: "View the page source and check that the text, title, canonical, hreflang and JSON-LD are all in the raw HTML. Fetch the sitemap and robots with curl, run Lighthouse on mobile for speed, validate structured data, and crawl the site for broken links. Then watch Search Console after launch.",
          details: [
            {
              kind: "steps",
              items: [
                "curl the page: is the text, title and JSON-LD in the first response?",
                "Check canonical and hreflang reciprocity for every page",
                "Fetch /sitemap.xml and /robots.txt and read them",
                "Run Lighthouse on mobile: LCP under 2.5 s, CLS under 0.1",
                "Validate structured data and fix every warning",
                "Crawl for broken internal links and redirect chains",
                "Submit the sitemap and monitor Search Console",
              ],
            },
          ],
        },
        {
          q: "Where do teams most often go wrong?",
          a: "Forgetting metadataBase so canonicals are relative, a sitemap that uses the build time for every date, hreflang that does not link back, structured data that disagrees with the page, images without a sizes attribute, and a staging noindex that is still on after launch. All are caught by the tests above.",
        },
        {
          q: "Can Bellona audit or build this for us?",
          a: "Yes. We build Next.js sites with this checklist from the start and can audit an existing one. The free growth audit tells you what to fix first and, if it fits, you get a fixed quote in writing.",
          details: [{ kind: "links", items: [{ label: "SEO services", href: "/services/seo" }, { label: "Book the free growth audit", href: "/contact?need=growth" }] }],
        },
      ],
    },
    fa: {
      metaTitle: "چک‌لیست سئو Next.js: متادیتا، سایت‌مپ و JSON-LD",
      metaDescription: "چک‌لیست عملی سئو Next.js با کد: Metadata API، canonical و hreflang، sitemap.ts، robots.ts، JSON-LD، تصویرها، فونت‌ها و ریدایرکت‌ها، و راه آزمودن هر مورد.",
      eyebrow: "راهنما",
      h1: "چک‌لیست **سئو Next.js**",
      definition:
        "نکست جی اس (Next.js) صفحه‌ها را روی سرور می‌سازد و همین الان متن کامل را در پاسخ اول به موتور جست‌وجو می‌رساند. بقیه‌ی سئو در نکست جی اس یک چک‌لیست است: متادیتای درست، یک آدرس canonical برای هر صفحه، نقشه‌ی سایت واقعی، فایل robots، داده‌ی ساختاریافته، تصویر و فونت سریع و ریدایرکت. این راهنما هر مورد را با کد برای App Router فهرست می‌کند.",
      answers: [
        {
          q: "سئو Next.js از کجا شروع می‌شود؟",
          a: "نکست جی اس هر صفحه را روی سرور رندر می‌کند، پس متن کامل HTML در پاسخ اول است و موتور جست‌وجو، یا دستیار هوش مصنوعی که جاوااسکریپت اجرا نمی‌کند، بلافاصله می‌خواندش. کنترل مستقیم روی متادیتا، نقشه‌ی سایت، robots، ریدایرکت و بهینه‌سازی تصویر هم می‌دهد که اهرم‌های اصلی سئو هستند.",
          details: [
            { kind: "p", text: "صفحه‌ای که متنش را در مرورگر می‌سازد، خزنده را وادار می‌کند قبل از دیدن هر چیزی جاوااسکریپت اجرا کند. رندر سمت سرور (یا تولید ایستا) این مرحله را حذف می‌کند. به همین دلیل بیشتر سایت‌های خودمان، از جمله همین سایت، با نکست جی اس ساخته شده‌اند." },
            { kind: "links", items: [{ label: "طراحی سایت با نکست جی اس", href: "/services/website-design/nextjs" }] },
          ],
        },
        {
          q: "عنوان، توضیح و canonical را چطور تنظیم کنیم؟",
          a: "با Metadata API: مقدارهای پیش‌فرض کل سایت و قالب عنوان را در layout ریشه و تابع generateMetadata را روی صفحه‌های پویا بگذارید. برای هر صفحه عنوان و توضیح یکتا، یک آدرس canonical بدهید و metadataBase را تنظیم کنید تا آدرس‌های نسبی مطلق شوند.",
          details: [{ kind: "code", lang: "ts", text: metadataCode }],
        },
        {
          q: "hreflang برای دو زبان را چطور اضافه کنیم؟",
          a: "در همان شیء متادیتا و زیر alternates.languages آدرس هر زبان به‌علاوه‌ی x-default را فهرست کنید. هر نسخه‌ی زبانی باید کل مجموعه را فهرست کند و canonical هر نسخه به خودش اشاره کند. راهنمای سایت دوزبانه قواعد و اشتباه‌های رایج را توضیح می‌دهد.",
          details: [
            {
              kind: "code",
              lang: "ts",
              text: `alternates: {
  canonical: "/services",
  languages: { fa: "/services", en: "/en/services", "x-default": "/services" },
},`,
            },
            { kind: "links", items: [{ label: "راهنما: سایت دوزبانه، hreflang و RTL", href: "/guides/bilingual-website-hreflang-rtl" }] },
          ],
        },
        {
          q: "نقشه‌ی سایت با تاریخ‌های واقعی را چطور بسازیم؟",
          a: "فایل app/sitemap.ts را اضافه کنید که همه‌ی آدرس‌های عمومی را برگرداند و lastModified را روی تاریخ واقعی تغییر محتوا بگذارد، نه زمان build. alternates هر زبان را هم بیاورید، آدرس‌های ریدایرکت‌شده، noindex و API را کنار بگذارید و فهرست را از همان منبع داده‌ای بسازید که صفحه‌ها را می‌سازد.",
          details: [
            {
              kind: "code",
              lang: "ts",
              text: `// app/sitemap.ts
import type { MetadataRoute } from "next";
import { getAllServices } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const services = await getAllServices();
  return services.map((s) => ({
    url: \`https://example.com/services/\${s.slug}\`,
    lastModified: s.updatedAt, // the real update date
    alternates: { languages: { fa: \`https://example.com/services/\${s.slug}\`, en: \`https://example.com/en/services/\${s.slug}\` } },
  }));
}`,
            },
          ],
        },
        {
          q: "robots.txt چه چیزی باید داشته باشد؟",
          a: "خزش سایت را مجاز کنید، به نقشه‌ی سایت اشاره کنید و فقط چیزهایی را ببندید که در جست‌وجو ارزشی ندارند، مثل مسیرهای API. مسیر تصویر Open Graph تولیدی را باز بگذارید تا پیش‌نمایش لینک کار کند. فایل‌های CSS و JavaScript را که صفحه برای رندر لازم دارد نبندید.",
          details: [{ kind: "code", lang: "ts", text: robotsCode }],
        },
        {
          q: "داده‌ی ساختاریافته (JSON-LD) را چطور اضافه کنیم؟",
          a: "کامپوننت کوچکی بسازید که تگ script از نوع application/ld+json را با مقدارهایی از داده‌ی واقعی صفحه تولید کند. روی همه‌ی صفحه‌ها Organization، جایی که لازم است Service یا Article و BreadcrumbList هماهنگ با breadcrumb قابل مشاهده بگذارید. هرگز داده‌ای را که صفحه نشان نمی‌دهد اضافه نکنید.",
          details: [{ kind: "code", lang: "tsx", text: jsonLdCode }],
        },
        {
          q: "تصویرها را چطور بهینه کنیم؟",
          a: "از next/image با width و height درست استفاده کنید تا چیزی جابه‌جا نشود، sizes بدهید تا موبایل فایل اندازه‌ی دسکتاپ نگیرد، اولین تصویر بزرگ صفحه را priority کنید و متن جایگزین توصیفی بنویسید. تصویرهای تزئینی alt خالی می‌گیرند.",
          details: [{ kind: "code", lang: "tsx", text: imageCode }],
        },
        {
          q: "فونت‌ها و کتابخانه‌های سنگین چه می‌شوند؟",
          a: "فونت‌ها را با next/font بارگذاری کنید تا self-host شوند و چیدمان را جابه‌جا نکنند، از font-display swap و فقط وزن‌هایی که استفاده می‌کنید بهره ببرید. کتابخانه‌های سنگین مثل انیمیشن یا سه‌بعدی را فقط در صفحه‌هایی که لازم‌اند و با dynamic import بارگذاری کنید تا صفحه‌های خدمات و مقاله سبک بمانند.",
          details: [
            {
              kind: "code",
              lang: "tsx",
              text: `import dynamic from "next/dynamic";
import localFont from "next/font/local";

export const body = localFont({ src: "./fonts/Body.woff2", display: "swap" });

// Only the pages that render the 3D scene pay for it
const Scene = dynamic(() => import("@/components/Scene"));`,
            },
          ],
        },
        {
          q: "ریدایرکت و خطای ۴۰۴ را چطور مدیریت کنیم؟",
          a: "ریدایرکت‌های دائمی را در next.config و هرکدام یک گام تعریف کنید و با dynamicParams برابر false و فراخوانی notFound() بگذارید آدرس‌های پویای ناشناخته ۴۰۴ واقعی بدهند. صفحه‌ای که با پیام «پیدا نشد» وضعیت ۲۰۰ می‌دهد (soft 404) بدتر از ۴۰۴ واقعی است.",
          details: [
            {
              kind: "code",
              lang: "ts",
              text: `// next.config.ts
async redirects() {
  return [{ source: "/old-page", destination: "/new-page", permanent: true }];
},

// app/services/[slug]/page.tsx
export const dynamicParams = false; // unknown slugs return a real 404
export function generateStaticParams() { return getAllServices().map((s) => ({ slug: s.slug })); }`,
            },
          ],
        },
        {
          q: "هر مورد را چطور آزمایش کنیم؟",
          a: "منبع صفحه را ببینید و مطمئن شوید متن، عنوان، canonical، hreflang و JSON-LD همه در HTML خام هستند. نقشه‌ی سایت و robots را با curl بگیرید، Lighthouse موبایل را برای سرعت اجرا کنید، داده‌ی ساختاریافته را اعتبارسنجی کنید و سایت را برای لینک شکسته خزش کنید. بعد از انتشار هم Search Console را ببینید.",
          details: [
            {
              kind: "steps",
              items: [
                "صفحه را با curl بگیرید: متن، عنوان و JSON-LD در پاسخ اول هست؟",
                "canonical و دوطرفه بودن hreflang را برای هر صفحه بررسی کنید",
                "/sitemap.xml و /robots.txt را بگیرید و بخوانید",
                "Lighthouse موبایل: LCP زیر ۲٫۵ ثانیه و CLS زیر ۰٫۱",
                "داده‌ی ساختاریافته را اعتبارسنجی کنید و هر هشدار را رفع کنید",
                "لینک‌های داخلی شکسته و زنجیره‌ی ریدایرکت را خزش کنید",
                "نقشه‌ی سایت را ثبت و Search Console را پایش کنید",
              ],
            },
          ],
        },
        {
          q: "تیم‌ها بیشتر کجا اشتباه می‌کنند؟",
          a: "فراموش کردن metadataBase که canonical را نسبی می‌کند، نقشه‌ی سایتی که برای همه‌ی تاریخ‌ها زمان build می‌گذارد، hreflang که برنمی‌گردد، داده‌ی ساختاریافته‌ای که با صفحه نمی‌خواند، تصویر بدون sizes و noindex سایت آزمایشی که بعد از انتشار مانده. همه با آزمون‌های بالا پیدا می‌شوند.",
        },
        {
          q: "بلونا می‌تواند این را برای ما بسنجد یا بسازد؟",
          a: "بله. سایت‌های Next.js را از ابتدا با همین چک‌لیست می‌سازیم و سایت موجود را هم می‌توانیم بسنجیم. بررسی رایگان رشد می‌گوید اول چه چیزی را درست کنید و اگر به توافق برسیم، قیمت قطعی و مکتوب می‌گیرید.",
          details: [{ kind: "links", items: [{ label: "خدمات سئو سایت", href: "/services/seo" }, { label: "رزرو بررسی رایگان رشد", href: "/contact?need=growth" }] }],
        },
      ],
    },
  },

  // ======================================================================================= AI search readiness
  {
    kind: "guide",
    slug: "ai-search-readiness",
    pillar: "marketing-growth",
    need: "growth",
    status: "published",
    updated: UPDATED,
    author: BAZDAR,
    needs: [],
    projects: ["dane-news"],
    guides: ["nextjs-seo-checklist", "bilingual-website-hreflang-rtl"],
    en: {
      metaTitle: "Be visible to AI search: ChatGPT and AI assistants",
      metaDescription: "AI search visibility, making your website readable by ChatGPT and other AI assistants: server rendering, answer-first structure, structured data, robots rules for AI crawlers and a consistent brand identity.",
      eyebrow: "Guide",
      h1: "Be visible in **AI search**",
      definition:
        "AI assistants such as ChatGPT, Claude and Perplexity answer questions by reading web pages, then quoting or summarising them. Being visible to them is mostly the same work as good SEO, with extra weight on pages that state their answer plainly, are readable without JavaScript and say the same thing about you everywhere.",
      answers: [
        {
          q: "AI search: how do AI assistants actually read a website?",
          a: "They fetch your page as HTML, often without running JavaScript, pull out the text and structure, and use the relevant parts to answer. Pages that put the complete text, headings and data in the first server response are readable; pages that build their text in the browser may look empty.",
          details: [
            { kind: "p", text: "Some tools can render JavaScript and many cannot, so do not rely on it. The safe rule is the same one search engines reward: the full content should be in the HTML that the server returns." },
          ],
        },
        {
          q: "Why does server rendering matter?",
          a: "A server-rendered or statically generated page delivers its full text in the first response, so any reader, crawler or assistant can use it at once. A page that needs JavaScript to show its content depends on the reader running that script, which many assistants do not. Next.js gives you the safe default.",
          details: [{ kind: "links", items: [{ label: "Guide: Next.js SEO checklist", href: "/guides/nextjs-seo-checklist" }] }],
        },
        {
          q: "What is an answer-first page structure?",
          a: "Each question is a heading, followed straight away by a short, direct answer of about 40 to 60 words, then the detail. An assistant can quote the answer on its own, and a human gets the answer first. This site is written that way: question headings with a plain answer underneath.",
          details: [
            {
              kind: "steps",
              items: [
                "A heading phrased as the question people ask",
                "A direct answer in the first paragraph, about 40–60 words",
                "Then the detail: steps, a table or links",
                "One topic per section, so an answer can be lifted cleanly",
              ],
            },
          ],
        },
        {
          q: "Does structured data help AI search?",
          a: "It helps both search engines and assistants understand what a page is: an Organization, a Service, an Article with an author and date, an FAQ, a breadcrumb. It must match the visible page exactly. It makes your pages easier to interpret; it does not guarantee that an assistant will quote you.",
          details: [{ kind: "p", text: "Useful types: Organization with name, logo, contact and sameAs profiles; Service for each service page; Article for guides, with author, datePublished and dateModified; FAQPage for visible questions and answers; BreadcrumbList for the navigation path." }],
        },
        {
          q: "Which robots rules matter for AI crawlers?",
          a: "Search-oriented assistant crawlers (such as OAI-SearchBot, ChatGPT-User, Claude-SearchBot, Claude-User, PerplexityBot and Perplexity-User) fetch pages to answer questions. If you want to appear in those answers, do not block them. Training crawlers are a separate decision, and you can allow or block them independently.",
          details: [
            {
              kind: "code",
              lang: "text",
              text: `# robots.txt: allow search-oriented assistant crawlers
User-Agent: OAI-SearchBot
User-Agent: ChatGPT-User
User-Agent: Claude-SearchBot
User-Agent: Claude-User
User-Agent: PerplexityBot
User-Agent: Perplexity-User
Allow: /
Disallow: /api/`,
            },
          ],
        },
        {
          q: "Why does a consistent brand identity matter?",
          a: "Assistants and search engines build an idea of who you are from what every page and profile says. Use the same business name, description, logo and contact details everywhere, link your official profiles with sameAs, and spell the name the ways people search for it, in both languages.",
          details: [
            {
              kind: "steps",
              items: [
                "One name and description, used identically across the site and profiles",
                "An Organization entity on every page, with the same logo and contact",
                "sameAs links to your official profiles",
                "Alternate names for the ways people write your brand, in each language",
              ],
            },
          ],
        },
        {
          q: "Why do dates, sources and real numbers help?",
          a: "Assistants prefer pages they can trust and check. A visible update date, a named author, and specific, sourced facts (a real count, a real project) are easier to quote than vague claims. Never invent a statistic; a made-up number is worse than none.",
          details: [{ kind: "p", text: "For example, we state the figures from the Dane migration (278 posts, 278 redirects, 8 categories, 105 topics) because they are the real ones, and we leave a result out when we have no verified number." }],
        },
        {
          q: "Can you guarantee that ChatGPT will mention us?",
          a: "No, and be wary of anyone who says they can. Assistants choose what to quote by their own rules, which change. What you can control is whether your pages are readable, clear, structured and trustworthy, and those are also what ranks in ordinary search.",
        },
        {
          q: "How do you measure AI-search visibility?",
          a: "Watch referrals from AI assistants in your analytics, searches for your brand name in Search Console, and ask the assistants questions about your field from time to time to see what they say. Treat these as signals rather than exact figures, since AI answers vary from one request to the next.",
        },
        {
          q: "A short checklist",
          a: "Server-render every page, structure content answer-first, add matching structured data, allow search-oriented AI crawlers, keep your brand identity consistent, show dates and authors, and use only real facts. None of this is new; it is the foundation of good SEO, applied carefully.",
          details: [
            {
              kind: "steps",
              items: [
                "The full text is in the first server response",
                "Question headings with a direct answer underneath",
                "Structured data that matches the page",
                "Search-oriented AI crawlers are not blocked",
                "The same brand name and details everywhere",
                "Visible dates and named authors",
                "Only real, checkable facts",
              ],
            },
          ],
        },
        {
          q: "How can Bellona help?",
          a: "We build sites with these properties from the start and can audit an existing site for AI-search readiness as part of the free growth audit. You get a fixed quote in writing if there is work to do.",
          details: [{ kind: "links", items: [{ label: "SEO services", href: "/services/seo" }, { label: "Book the free growth audit", href: "/contact?need=growth" }] }],
        },
      ],
    },
    fa: {
      metaTitle: "دیده شدن در ChatGPT و جست‌وجوی هوش مصنوعی",
      metaDescription: "دیده شدن در ChatGPT و دستیارهای هوش مصنوعی: رندر سمت سرور، ساختار پاسخ‌محور، داده‌ی ساختاریافته، قواعد robots برای خزنده‌های هوش مصنوعی و هویت برند یکدست.",
      eyebrow: "راهنما",
      h1: "دیده شدن در **ChatGPT و جست‌وجوی هوش مصنوعی**",
      definition:
        "دستیارهای هوش مصنوعی مثل ChatGPT، Claude و Perplexity با خواندن صفحه‌های وب به سؤال‌ها جواب می‌دهند و از آن‌ها نقل یا خلاصه می‌کنند. دیده شدن برای آن‌ها بیشتر همان کار سئوی خوب است، با تأکید بیشتر روی صفحه‌هایی که جوابشان را روشن می‌گویند، بدون جاوااسکریپت خواندنی‌اند و همه‌جا درباره‌ی شما یک حرف را می‌زنند.",
      answers: [
        {
          q: "دیده شدن در ChatGPT: دستیارها سایت را واقعاً چطور می‌خوانند؟",
          a: "صفحه‌ی شما را به‌صورت HTML می‌گیرند، اغلب بدون اجرای جاوااسکریپت، متن و ساختار را بیرون می‌کشند و بخش‌های مرتبط را برای جواب به کار می‌برند. صفحه‌هایی که متن کامل، عنوان‌ها و داده را در پاسخ اول سرور می‌گذارند خواندنی‌اند؛ صفحه‌هایی که متنشان را در مرورگر می‌سازند ممکن است خالی دیده شوند.",
          details: [
            { kind: "p", text: "بعضی ابزارها می‌توانند جاوااسکریپت را رندر کنند و خیلی‌هایشان نه، پس به آن تکیه نکنید. قاعده‌ی ایمن همان است که موتورهای جست‌وجو هم پاداشش را می‌دهند: محتوای کامل باید در HTML‌ای باشد که سرور برمی‌گرداند." },
          ],
        },
        {
          q: "رندر سمت سرور چرا مهم است؟",
          a: "صفحه‌ی رندرشده روی سرور (یا تولیدشده‌ی ایستا) متن کاملش را در پاسخ اول می‌رساند، پس هر خواننده، خزنده یا دستیاری بلافاصله می‌تواند از آن استفاده کند. صفحه‌ای که برای نشان دادن محتوا جاوااسکریپت می‌خواهد به اجرای آن اسکریپت توسط خواننده وابسته است که خیلی از دستیارها نمی‌کنند. نکست جی اس پیش‌فرض ایمن را می‌دهد.",
          details: [{ kind: "links", items: [{ label: "راهنما: چک‌لیست سئو Next.js", href: "/guides/nextjs-seo-checklist" }] }],
        },
        {
          q: "ساختار پاسخ‌محور صفحه یعنی چه؟",
          a: "هر پرسش یک عنوان است، بلافاصله بعدش یک پاسخ کوتاه و مستقیم حدود ۴۰ تا ۶۰ کلمه می‌آید و بعد جزئیات. دستیار می‌تواند پاسخ را جدا نقل کند و آدم هم اول جواب را می‌گیرد. همین سایت این‌طور نوشته شده: عنوان پرسشی با یک جواب روشن زیرش.",
          details: [
            {
              kind: "steps",
              items: [
                "عنوانی به‌شکل همان پرسشی که مردم می‌پرسند",
                "پاسخ مستقیم در پاراگراف اول، حدود ۴۰ تا ۶۰ کلمه",
                "بعد جزئیات: قدم‌ها، جدول یا لینک",
                "یک موضوع در هر بخش تا پاسخ تمیز جدا شود",
              ],
            },
          ],
        },
        {
          q: "داده‌ی ساختاریافته به جست‌وجوی هوش مصنوعی کمک می‌کند؟",
          a: "هم به موتور جست‌وجو و هم به دستیار کمک می‌کند بفهمند صفحه چیست: Organization، Service، Article با نویسنده و تاریخ، FAQ، breadcrumb. باید دقیقاً با صفحه‌ی قابل مشاهده بخواند. تفسیر صفحه‌ها را ساده‌تر می‌کند؛ ولی تضمین نمی‌کند دستیاری از شما نقل کند.",
          details: [{ kind: "p", text: "نوع‌های مفید: Organization با نام، لوگو، تماس و پروفایل‌های sameAs؛ Service برای هر صفحه‌ی خدمت؛ Article برای راهنماها با نویسنده، datePublished و dateModified؛ FAQPage برای پرسش و پاسخ‌های قابل مشاهده؛ BreadcrumbList برای مسیر ناوبری." }],
        },
        {
          q: "کدام قواعد robots برای خزنده‌های هوش مصنوعی مهم است؟",
          a: "خزنده‌های دستیارهای جست‌وجومحور (مثل OAI-SearchBot، ChatGPT-User، Claude-SearchBot، Claude-User، PerplexityBot و Perplexity-User) صفحه‌ها را برای جواب دادن می‌گیرند. اگر می‌خواهید در آن جواب‌ها باشید، مسدودشان نکنید. خزنده‌های آموزش مدل تصمیم جدایی‌اند و مستقل از این‌ها می‌توانید مجاز یا مسدودشان کنید.",
          details: [
            {
              kind: "code",
              lang: "text",
              text: `# robots.txt: allow search-oriented assistant crawlers
User-Agent: OAI-SearchBot
User-Agent: ChatGPT-User
User-Agent: Claude-SearchBot
User-Agent: Claude-User
User-Agent: PerplexityBot
User-Agent: Perplexity-User
Allow: /
Disallow: /api/`,
            },
          ],
        },
        {
          q: "چرا هویت برند یکدست مهم است؟",
          a: "دستیارها و موتورهای جست‌وجو تصویرشان از شما را از چیزی می‌سازند که هر صفحه و پروفایل می‌گوید. همه‌جا همان نام کسب‌وکار، توضیح، لوگو و اطلاعات تماس را بنویسید، پروفایل‌های رسمی را با sameAs وصل کنید و نام را به شکل‌هایی که مردم جست‌وجو می‌کنند، در هر دو زبان بیاورید.",
          details: [
            {
              kind: "steps",
              items: [
                "یک نام و یک توضیح، یکسان در سایت و پروفایل‌ها",
                "موجودیت Organization روی همه‌ی صفحه‌ها با همان لوگو و تماس",
                "لینک sameAs به پروفایل‌های رسمی",
                "نام‌های جایگزین برای شکل‌های نوشتن برند در هر زبان",
              ],
            },
          ],
        },
        {
          q: "تاریخ، منبع و عدد واقعی چرا کمک می‌کنند؟",
          a: "دستیارها صفحه‌هایی را ترجیح می‌دهند که بشود به آن‌ها اعتماد و آن‌ها را وارسی کرد. تاریخ به‌روزرسانی قابل مشاهده، نویسنده‌ی مشخص و واقعیت‌های دقیق و مستند (یک تعداد واقعی، یک پروژه‌ی واقعی) راحت‌تر از ادعای مبهم نقل می‌شوند. هیچ‌وقت آمار نسازید؛ عددی که ساختگی باشد از نبود عدد بدتر است.",
          details: [{ kind: "p", text: "مثلاً عددهای مهاجرت دانه (۲۷۸ مطلب، ۲۷۸ ریدایرکت، ۸ دسته، ۱۰۵ موضوع) را می‌نویسیم چون واقعی‌اند، و وقتی عدد تأییدشده‌ای نداریم نتیجه را نمی‌گذاریم." }],
        },
        {
          q: "می‌توانید تضمین کنید ChatGPT از ما نام ببرد؟",
          a: "نه، و از هر کسی که می‌گوید می‌تواند محتاط باشید. دستیارها با قواعد خودشان که تغییر می‌کند انتخاب می‌کنند چه چیزی را نقل کنند. چیزی که زیر کنترل شماست این است که صفحه‌هایتان خواندنی، روشن، ساختاریافته و قابل اعتماد باشند، و همین‌ها هستند که در جست‌وجوی معمولی هم رتبه می‌آورند.",
        },
        {
          q: "دیده شدن در جست‌وجوی هوش مصنوعی را چطور بسنجیم؟",
          a: "ارجاع از دستیارهای هوش مصنوعی را در آنالیتیکس ببینید، جست‌وجوی نام برندتان را در Search Console و هر از چندگاهی از دستیارها درباره‌ی حوزه‌تان سؤال کنید تا ببینید چه می‌گویند. این‌ها را نشانه بدانید نه عدد دقیق، چون جواب هوش مصنوعی از یک درخواست به درخواست دیگر فرق می‌کند.",
        },
        {
          q: "یک چک‌لیست کوتاه",
          a: "هر صفحه را سمت سرور رندر کنید، محتوا را پاسخ‌محور بنویسید، داده‌ی ساختاریافته‌ی هماهنگ اضافه کنید، خزنده‌های هوش مصنوعی جست‌وجومحور را باز بگذارید، هویت برند را یکدست نگه دارید، تاریخ و نویسنده را نشان دهید و فقط از واقعیت استفاده کنید. هیچ‌کدام تازه نیست؛ پایه‌ی سئوی خوب است که با دقت اجرا می‌شود.",
          details: [
            {
              kind: "steps",
              items: [
                "متن کامل در پاسخ اول سرور است",
                "عنوان پرسشی با پاسخ مستقیم زیرش",
                "داده‌ی ساختاریافته‌ی منطبق بر صفحه",
                "خزنده‌های هوش مصنوعی جست‌وجومحور مسدود نیستند",
                "همه‌جا یک نام و اطلاعات برند",
                "تاریخ‌ها و نویسنده‌های قابل مشاهده",
                "فقط واقعیت‌های قابل وارسی",
              ],
            },
          ],
        },
        {
          q: "بلونا چطور کمک می‌کند؟",
          a: "سایت‌ها را از ابتدا با این ویژگی‌ها می‌سازیم و می‌توانیم سایت موجود را در بررسی رایگان رشد از نظر آمادگی برای جست‌وجوی هوش مصنوعی بسنجیم. اگر کاری لازم باشد، قیمت قطعی و مکتوب می‌گیرید.",
          details: [{ kind: "links", items: [{ label: "خدمات سئو سایت", href: "/services/seo" }, { label: "رزرو بررسی رایگان رشد", href: "/contact?need=growth" }] }],
        },
      ],
    },
  },

  // ======================================================================================= lead follow-up automation with n8n
  {
    kind: "guide",
    slug: "lead-follow-up-automation-n8n",
    pillar: "ai-automation",
    need: "ai",
    status: "published",
    updated: UPDATED,
    author: NIKNAM,
    needs: [],
    projects: ["ai-real-estate-os"],
    guides: ["ai-search-readiness"],
    en: {
      metaTitle: "Lead follow-up automation with n8n: a workflow guide",
      metaDescription: "Lead follow-up automation with n8n: the workflow architecture from form to CRM, scoring, timed messages, stop-on-reply, human handover and error handling, with a real-estate example.",
      eyebrow: "Guide",
      h1: "Lead follow-up automation **with n8n**",
      definition:
        "Lead follow-up automation answers every new enquiry within seconds and keeps following up on schedule until the person replies, so no lead goes cold because someone forgot. n8n is the workflow tool that ties the form, the CRM, email and an AI model into one chain of steps.",
      answers: [
        {
          q: "Why does lead follow-up automation matter?",
          a: "Leads cool quickly, and follow-up is the first thing that slips when a team is busy. An automated chain replies in seconds, remembers every follow-up and stops the moment the person answers, so response speed no longer depends on who is at their desk.",
          details: [
            { kind: "p", text: "The usual failure is not a bad offer but a slow or forgotten reply. Automation does not replace the human conversation; it makes sure the human conversation starts with a lead who is still warm, and that nothing falls between two people." },
          ],
        },
        {
          q: "What does the workflow architecture look like?",
          a: "A trigger (a form or message arriving) starts the chain: check for duplicates, enrich and score the lead, log it in the CRM, send the first reply, schedule the next follow-ups, stop when a reply arrives, and hand the conversation to a person. A daily digest and central error handling wrap around it.",
          details: [
            {
              kind: "steps",
              items: [
                "Trigger: a webhook from the form, or an email or message arrives",
                "Deduplicate: is this person already in the CRM?",
                "Enrich and score: who are they, how strong is the lead?",
                "Log: create or update the CRM record",
                "Reply: send the first message within seconds",
                "Schedule: wait, then send the next follow-up",
                "Stop on reply: when the person answers, end the sequence",
                "Handover: assign to a human with the full history",
                "Digest and errors: a daily report and alerts when something fails",
              ],
            },
          ],
        },
        {
          q: "Which n8n nodes do you use?",
          a: "A Webhook or email trigger to start, IF and Switch nodes for rules, a Baserow or HubSpot node for the CRM, Send Email and an IMAP trigger for outgoing and incoming mail, Wait for timing, an AI node where a step needs judgement, a Schedule trigger for the digest, and an Error Trigger workflow for failures.",
          details: [
            {
              kind: "table",
              caption: "Building blocks of a follow-up workflow",
              head: ["Step", "n8n building block"],
              rows: [
                ["Receive the lead", "Webhook trigger, or an email/IMAP trigger"],
                ["Rules and routing", "IF and Switch nodes"],
                ["Store in the CRM", "Baserow or HubSpot node, or an HTTP Request node"],
                ["Send messages", "Send Email node (SMTP)"],
                ["Wait between messages", "Wait node"],
                ["Detect a reply", "Email trigger (IMAP)"],
                ["Judgement and wording", "An AI model node"],
                ["Daily digest", "Schedule trigger"],
                ["Failures", "A separate workflow starting with an Error Trigger"],
              ],
            },
          ],
        },
        {
          q: "How does scoring work?",
          a: "Each lead is checked against rules you define, such as who they are, what they asked for and how they arrived, and receives a score that decides how it is handled: a strong lead is routed to a person quickly, a weak one gets a lighter sequence. The rules live in the workflow, so you can change them without code.",
          details: [{ kind: "p", text: "In our real-estate system, investor discovery and qualification runs automatically before any message is written, so the team spends its time on the investors most likely to respond." }],
        },
        {
          q: "How do you stop the sequence when the person replies?",
          a: "An incoming-mail trigger watches the inbox, matches each reply to the lead in the CRM and marks the sequence as answered, so no further automatic message is sent. This is the step that keeps automation polite: nobody gets a scheduled follow-up after they have already responded.",
        },
        {
          q: "When and how does a human take over?",
          a: "You decide the rules: a reply that is not a simple yes or no, a high score, a complaint or a request for a person. The lead is assigned to someone with the full history attached, and an alert is sent, so the person starts with the context instead of repeating questions.",
        },
        {
          q: "What does error handling look like?",
          a: "A separate workflow starts with an Error Trigger, so any failing workflow sends an alert instead of stopping silently. Add retries for temporary failures, keep credentials in n8n's credential store, and log what ran. The real-estate system has central error handling and a daily digest.",
          details: [
            {
              kind: "steps",
              items: [
                "One central error workflow that alerts the team",
                "Retries for temporary failures, such as a mail server timing out",
                "Credentials stored in n8n, never inside a workflow",
                "A daily digest showing what ran and what failed",
                "Backup and security notes kept for handover",
              ],
            },
          ],
        },
        {
          q: "What does a real example look like?",
          a: `For a real-estate business (kharazie.at) we built ${nEn(re.n8nWorkflows)} n8n workflows and a ${nEn(re.crmTables)}-table Baserow CRM: investor discovery and qualification, outreach and replies over email with Claude-assisted content, project analysis, documents in Google Drive, central error handling and a daily digest.`,
          details: [{ kind: "links", items: [{ label: "Case study: AI Real Estate Operating System", href: "/work/ai-real-estate-os" }] }],
        },
        {
          q: "What are the common pitfalls?",
          a: "Sending too many messages, no stop-on-reply, duplicates in the CRM, workflows that fail silently, and credentials left inside a workflow. Keep sequences short, always stop on a reply, deduplicate on arrival, route every failure to the error workflow and store secrets in n8n's credential store.",
        },
        {
          q: "How long does it take to build?",
          a: `A focused automation sprint, one process automated end to end, goes live in ${sprintEn}. Simple workflows take days; larger systems take longer. The timeline is part of the fixed quote after the free audit.`,
        },
        {
          q: "How can Bellona help?",
          a: "We design, build and run n8n workflows like this one, including self-hosted n8n if you want your data on your own server. Start with the free growth audit and you get a fixed quote in writing.",
          details: [{ kind: "links", items: [{ label: "n8n implementation", href: "/services/ai-automation/n8n" }, { label: "CRM automation", href: "/services/ai-automation/crm" }, { label: "Book the free growth audit", href: "/contact?need=ai" }] }],
        },
      ],
    },
    fa: {
      metaTitle: "اتوماسیون پیگیری لید با n8n: راهنمای گردش‌کار",
      metaDescription: "اتوماسیون پیگیری لید با n8n: معماری گردش‌کار از فرم تا CRM، امتیازدهی، پیام زمان‌بندی‌شده، توقف با جواب، تحویل به انسان و مدیریت خطا؛ با نمونه‌ی املاک.",
      eyebrow: "راهنما",
      h1: "اتوماسیون پیگیری لید **با n8n**",
      definition:
        "اتوماسیون پیگیری لید به هر درخواست تازه در چند ثانیه جواب می‌دهد و طبق برنامه پیگیری می‌کند تا طرف مقابل جواب بدهد، پس هیچ لیدی فقط به این دلیل که کسی یادش رفت سرد نمی‌شود. n8n ابزار گردش‌کاری است که فرم، CRM، ایمیل و یک مدل هوش مصنوعی را در یک زنجیره‌ی مراحل به هم وصل می‌کند.",
      answers: [
        {
          q: "چرا اتوماسیون پیگیری لید مهم است؟",
          a: "لیدها زود سرد می‌شوند و وقتی تیم شلوغ است اولین چیزی که عقب می‌افتد پیگیری است. زنجیره‌ی خودکار در چند ثانیه جواب می‌دهد، همه‌ی پیگیری‌ها را به یاد دارد و همین که طرف جواب داد متوقف می‌شود؛ پس سرعت پاسخ دیگر به این بستگی ندارد که چه کسی پشت میزش است.",
          details: [
            { kind: "p", text: "شکست معمول از پیشنهاد بد نیست، از جواب کند یا فراموش‌شده است. اتوماسیون جای گفت‌وگوی انسانی را نمی‌گیرد؛ مطمئن می‌شود گفت‌وگوی انسانی با لیدی شروع شود که هنوز گرم است و چیزی بین دو نفر گم نمی‌شود." },
          ],
        },
        {
          q: "معماری گردش‌کار چه شکلی است؟",
          a: "یک محرک (رسیدن فرم یا پیام) زنجیره را شروع می‌کند: بررسی تکراری بودن، غنی‌سازی و امتیازدهی لید، ثبت در CRM، ارسال اولین پاسخ، زمان‌بندی پیگیری‌های بعدی، توقف وقتی جواب برسد و تحویل گفت‌وگو به انسان. گزارش روزانه و مدیریت متمرکز خطا دور این زنجیره را می‌گیرد.",
          details: [
            {
              kind: "steps",
              items: [
                "محرک: وب‌هوک فرم یا رسیدن ایمیل یا پیام",
                "حذف تکراری: این شخص قبلاً در CRM هست؟",
                "غنی‌سازی و امتیاز: کیست و لید چقدر قوی است؟",
                "ثبت: ساخت یا به‌روزرسانی رکورد CRM",
                "پاسخ: ارسال اولین پیام در چند ثانیه",
                "زمان‌بندی: صبر و بعد ارسال پیگیری بعدی",
                "توقف با جواب: وقتی شخص جواب داد زنجیره پایان می‌یابد",
                "تحویل: ارجاع به انسان با کل تاریخچه",
                "گزارش و خطا: گزارش روزانه و هشدار هنگام شکست",
              ],
            },
          ],
        },
        {
          q: "از چه نودهایی در n8n استفاده می‌کنید؟",
          a: "Webhook یا محرک ایمیل برای شروع، نودهای IF و Switch برای قواعد، نود Baserow یا HubSpot برای CRM، Send Email و محرک IMAP برای ایمیل خروجی و ورودی، Wait برای زمان‌بندی، یک نود هوش مصنوعی جایی که قدمی قضاوت می‌خواهد، محرک Schedule برای گزارش روزانه و یک گردش‌کار Error Trigger برای شکست‌ها.",
          details: [
            {
              kind: "table",
              caption: "اجزای یک گردش‌کار پیگیری",
              head: ["قدم", "جزء n8n"],
              rows: [
                ["دریافت لید", "محرک Webhook یا محرک ایمیل/IMAP"],
                ["قواعد و مسیردهی", "نودهای IF و Switch"],
                ["ثبت در CRM", "نود Baserow یا HubSpot یا نود HTTP Request"],
                ["ارسال پیام", "نود Send Email (SMTP)"],
                ["صبر بین پیام‌ها", "نود Wait"],
                ["تشخیص جواب", "محرک ایمیل (IMAP)"],
                ["قضاوت و نوشتن متن", "نود مدل هوش مصنوعی"],
                ["گزارش روزانه", "محرک Schedule"],
                ["شکست‌ها", "گردش‌کار جدا که با Error Trigger شروع می‌شود"],
              ],
            },
          ],
        },
        {
          q: "امتیازدهی چطور کار می‌کند؟",
          a: "هر لید با قواعدی که شما تعریف می‌کنید، مثل اینکه کیست، چه خواسته و چطور رسیده، سنجیده می‌شود و امتیازی می‌گیرد که تعیین می‌کند چطور با آن رفتار شود: لید قوی سریع به یک نفر می‌رسد و لید ضعیف زنجیره‌ی سبک‌تری می‌گیرد. قواعد داخل گردش‌کار هستند و بدون کد قابل تغییرند.",
          details: [{ kind: "p", text: "در سیستم املاک ما، پیدا کردن و ارزیابی سرمایه‌گذار پیش از نوشتن هر پیامی خودکار انجام می‌شود، پس تیم وقتش را روی سرمایه‌گذارهایی می‌گذارد که بیشتر احتمال دارد جواب بدهند." }],
        },
        {
          q: "وقتی طرف جواب می‌دهد زنجیره را چطور متوقف می‌کنید؟",
          a: "یک محرک ایمیل ورودی صندوق را می‌پاید، هر جواب را با لید در CRM تطبیق می‌دهد و زنجیره را «جواب‌داده‌شده» علامت می‌زند تا پیام خودکار دیگری نرود. همین قدم اتوماسیون را مؤدب نگه می‌دارد: کسی بعد از اینکه جواب داده پیگیری زمان‌بندی‌شده نمی‌گیرد.",
        },
        {
          q: "انسان کی و چطور کار را در دست می‌گیرد؟",
          a: "قاعده را شما تعیین می‌کنید: جوابی که یک «بله» یا «نه» ساده نیست، امتیاز بالا، شکایت یا درخواست صحبت با انسان. لید با کل تاریخچه به یک نفر ارجاع می‌شود و هشدار می‌رود تا آن نفر با زمینه شروع کند و پرسش‌ها را تکرار نکند.",
        },
        {
          q: "مدیریت خطا چه شکلی است؟",
          a: "یک گردش‌کار جدا با Error Trigger شروع می‌شود تا هر گردش‌کاری که شکست بخورد به‌جای توقف بی‌صدا هشدار بفرستد. برای شکست‌های موقت تلاش مجدد بگذارید، اعتبارنامه‌ها را در مخزن اعتبارنامه‌ی n8n نگه دارید و ثبت کنید چه چیزی اجرا شد. سیستم املاک مدیریت متمرکز خطا و گزارش روزانه دارد.",
          details: [
            {
              kind: "steps",
              items: [
                "یک گردش‌کار خطای متمرکز که به تیم هشدار می‌دهد",
                "تلاش مجدد برای شکست‌های موقت، مثل timeout سرور ایمیل",
                "اعتبارنامه‌ها در n8n، نه داخل گردش‌کار",
                "گزارش روزانه‌ای که نشان می‌دهد چه اجرا شد و چه شکست خورد",
                "یادداشت‌های پشتیبان‌گیری و امنیت برای تحویل",
              ],
            },
          ],
        },
        {
          q: "یک نمونه‌ی واقعی چه شکلی است؟",
          a: `برای یک کسب‌وکار املاک (kharazie.at) ${nFa(re.n8nWorkflows)} گردش‌کار n8n و یک CRM با ${nFa(re.crmTables)} جدول در Baserow ساختیم: پیدا کردن و امتیازدهی سرمایه‌گذار، ارسال و دریافت ایمیل با محتوای کمک‌گرفته از Claude، تحلیل پروژه، اسناد در Google Drive، مدیریت متمرکز خطا و گزارش روزانه.`,
          details: [{ kind: "links", items: [{ label: "نمونه‌کار: سیستم‌عامل هوشمند فروش املاک", href: "/work/ai-real-estate-os" }] }],
        },
        {
          q: "دام‌های رایج چیست؟",
          a: "فرستادن پیام‌های زیاد، نبودن توقف با جواب، تکراری شدن رکوردها در CRM، گردش‌کارهایی که بی‌صدا شکست می‌خورند و اعتبارنامه‌ی رها شده داخل گردش‌کار. زنجیره‌ها را کوتاه نگه دارید، همیشه با جواب متوقف کنید، هنگام رسیدن تکراری‌ها را حذف کنید، هر شکست را به گردش‌کار خطا بفرستید و رمزها را در مخزن اعتبارنامه‌ی n8n نگه دارید.",
        },
        {
          q: "ساختنش چقدر طول می‌کشد؟",
          a: `یک اسپرینت اتوماسیون متمرکز، یعنی یک فرایند کامل از اول تا آخر، در ${sprintFa} راه می‌افتد. گردش‌کارهای ساده چند روز و سیستم‌های بزرگ‌تر بیشتر طول می‌کشند. زمان‌بندی بعد از بررسی رایگان بخشی از پیشنهاد قیمت قطعی است.`,
        },
        {
          q: "بلونا چطور کمک می‌کند؟",
          a: "گردش‌کارهای n8n مثل همین را طراحی، پیاده‌سازی و اجرا می‌کنیم، از جمله n8n روی سرور خودتان اگر بخواهید داده‌ها پیش خودتان بماند. با بررسی رایگان رشد شروع کنید تا قیمت قطعی و مکتوب بگیرید.",
          details: [{ kind: "links", items: [{ label: "پیاده‌سازی n8n", href: "/services/ai-automation/n8n" }, { label: "اتوماسیون CRM", href: "/services/ai-automation/crm" }, { label: "رزرو بررسی رایگان رشد", href: "/contact?need=ai" }] }],
        },
      ],
    },
  },
];
