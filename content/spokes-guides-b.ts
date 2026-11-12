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
const RAZI = "Sina Razi|سینا راضی";

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
    projects: [],
    guides: ["bilingual-website-hreflang-rtl", "ai-search-readiness"],
    en: {
      metaTitle: "Next.js SEO checklist: metadata and JSON-LD",
      metaDescription: "A practical Next.js SEO checklist with code: metadata API, canonical and hreflang, sitemap.ts, robots.ts, JSON-LD, images, fonts and redirects.",
      eyebrow: "Guide",
      h1: "Next.js **SEO checklist**",
      definition:
        "Next.js builds pages on the server, which already gives search engines the complete text in the first response. The rest of Next.js SEO is a checklist: correct metadata, one canonical address per page, a real sitemap, a robots file, structured data, fast images and fonts, and redirects. This guide lists each item with code for the App Router.",
      answers: [
        {
          q: "Why is Next.js SEO easier to get right?",
          a: "Next.js renders each page on the server, so the full HTML text is in the first response and a search engine, or an AI assistant that does not run JavaScript, can read it immediately. It also gives you direct control of metadata, sitemaps, robots, redirects and image optimization, which are the main SEO levers.",
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
          q: "How do you optimize images?",
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
      metaTitle: "چک‌لیست سئوی Next.js: متادیتا، سایت‌مپ و JSON-LD",
      metaDescription: "چک‌لیست عملی سئوی Next.js با کد: Metadata API، canonical و hreflang، sitemap.ts، robots.ts، JSON-LD، تصویر، فونت و ریدایرکت، و روش آزمودن هر مورد.",
      eyebrow: "راهنما",
      h1: "چک‌لیست **سئوی Next.js**",
      definition:
        "نکست جی اس (Next.js) صفحه‌ها را روی سرور می‌سازد و از همان اول متن کامل را در پاسخ نخست به موتور جست‌وجو تحویل می‌دهد. باقی سئو در نکست جی اس یک چک‌لیست است: متادیتای درست، یک آدرس canonical برای هر صفحه، نقشه‌ی سایت واقعی، فایل robots، داده‌ی ساختاریافته، تصویر و فونت سریع، و ریدایرکت. این راهنما هر مورد را با کدش برای App Router آورده است.",
      answers: [
        {
          q: "سئوی Next.js از کجا شروع می‌شود؟",
          a: "نکست جی اس هر صفحه را روی سرور رندر می‌کند، پس HTML کامل در همان پاسخ اول است و موتور جست‌وجو، یا دستیار هوش مصنوعی‌ای که جاوااسکریپت اجرا نمی‌کند، بی‌درنگ آن را می‌خواند. متادیتا، نقشه‌ی سایت، robots، ریدایرکت و بهینه‌سازی تصویر هم مستقیم دست شماست؛ یعنی همان اهرم‌های اصلی سئو.",
          details: [
            { kind: "p", text: "صفحه‌ای که متنش را در مرورگر می‌سازد، خزنده را مجبور می‌کند پیش از دیدن هر چیزی جاوااسکریپت اجرا کند. رندر سمت سرور (یا تولید ایستا) این مرحله را حذف می‌کند. برای همین بیشتر سایت‌هایمان، از جمله همین سایت، با نکست جی اس ساخته شده‌اند." },
            { kind: "links", items: [{ label: "طراحی سایت با نکست جی اس", href: "/services/website-design/nextjs" }] },
          ],
        },
        {
          q: "عنوان، توضیح و canonical را چطور تنظیم کنیم؟",
          a: "با Metadata API: پیش‌فرض‌های کل سایت و الگوی عنوان را در layout ریشه بگذارید و تابع generateMetadata را در صفحه‌های پویا. به هر صفحه عنوان و توضیح یکتا و یک آدرس canonical بدهید و metadataBase را تنظیم کنید تا آدرس‌های نسبی کامل شوند.",
          details: [{ kind: "code", lang: "ts", text: metadataCode }],
        },
        {
          q: "hreflang را برای دو زبان چطور اضافه کنیم؟",
          a: "در همان شیء متادیتا، زیر alternates.languages، آدرس هر زبان و x-default را فهرست کنید. هر نسخه‌ی زبانی باید کل مجموعه را فهرست کند و canonical هر نسخه به خودش اشاره کند. قواعد و اشتباه‌های رایج در راهنمای سایت دوزبانه آمده است.",
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
          q: "نقشه‌ی سایت را با تاریخ‌های واقعی چطور بسازیم؟",
          a: "فایل app/sitemap.ts را اضافه کنید تا همه‌ی آدرس‌های عمومی را برگرداند و lastModified را تاریخ واقعی تغییر محتوا بگذارد، نه زمان build. alternates هر زبان را هم بیاورید، آدرس‌های ریدایرکت‌شده، noindex و API را کنار بگذارید و فهرست را از همان منبع داده‌ای بسازید که صفحه‌ها از آن ساخته می‌شوند.",
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
          q: "robots.txt چه چیزهایی باید داشته باشد؟",
          a: "اجازه‌ی خزش سایت را بدهید، به نقشه‌ی سایت اشاره کنید و فقط چیزهایی را ببندید که در جست‌وجو به کاری نمی‌آیند، مثل مسیرهای API. مسیر تصویرهای Open Graph را باز بگذارید تا پیش‌نمایش لینک‌ها کار کند. فایل‌های CSS و JavaScript را که صفحه برای نمایش لازم دارد نبندید.",
          details: [{ kind: "code", lang: "ts", text: robotsCode }],
        },
        {
          q: "داده‌ی ساختاریافته (JSON-LD) را چطور اضافه کنیم؟",
          a: "یک کامپوننت کوچک بسازید که تگ script از نوع application/ld+json را با مقدارهای واقعی صفحه تولید کند. در همه‌ی صفحه‌ها Organization، هر جا لازم است Service یا Article، و BreadcrumbList هماهنگ با مسیر ناوبری قابل‌دیدن بگذارید. هرگز داده‌ای را که در صفحه دیده نمی‌شود اضافه نکنید.",
          details: [{ kind: "code", lang: "tsx", text: jsonLdCode }],
        },
        {
          q: "تصویرها را چطور بهینه کنیم؟",
          a: "next/image را با width و height درست به کار ببرید تا چیزی جابه‌جا نشود، sizes بدهید تا موبایل فایلِ اندازه‌ی دسکتاپ نگیرد، اولین تصویر بزرگ صفحه را priority کنید و متن جایگزین توصیفی بنویسید. تصویرهای تزئینی alt خالی می‌گیرند.",
          details: [{ kind: "code", lang: "tsx", text: imageCode }],
        },
        {
          q: "فونت‌ها و کتابخانه‌های سنگین را چه کنیم؟",
          a: "فونت‌ها را با next/font بارگذاری کنید تا روی سرور خودتان میزبانی شوند و چیدمان را به هم نریزند؛ font-display swap و فقط وزن‌هایی را که لازم دارید به کار ببرید. کتابخانه‌های سنگین مثل انیمیشن یا سه‌بعدی را فقط در صفحه‌هایی که لازمشان دارند و با dynamic import بارگذاری کنید تا صفحه‌های خدمات و مقاله سبک بمانند.",
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
          a: "ریدایرکت‌های دائمی را در next.config تعریف کنید، هر کدام در یک گام، و با dynamicParams برابر false و فراخوانی notFound() کاری کنید که آدرس‌های پویای ناشناخته ۴۰۴ واقعی برگردانند. صفحه‌ای که پیام «پیدا نشد» دارد ولی وضعیت ۲۰۰ برمی‌گرداند (soft 404) از ۴۰۴ واقعی بدتر است.",
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
          q: "هر مورد را چطور بیازماییم؟",
          a: "کد منبع صفحه را ببینید و مطمئن شوید متن، عنوان، canonical، hreflang و JSON-LD همه در HTML خام هستند. نقشه‌ی سایت و robots را با curl بگیرید، Lighthouse موبایل را برای سرعت اجرا کنید، داده‌ی ساختاریافته را اعتبارسنجی کنید و سایت را برای یافتن لینک شکسته خزش کنید. پس از انتشار هم Search Console را زیر نظر بگیرید.",
          details: [
            {
              kind: "steps",
              items: [
                "صفحه را با curl بگیرید: متن، عنوان و JSON-LD در پاسخ اول هستند؟",
                "canonical و دوطرفه بودن hreflang را برای هر صفحه بررسی کنید",
                "/sitemap.xml و /robots.txt را بگیرید و بخوانید",
                "Lighthouse موبایل: LCP زیر ۲٫۵ ثانیه و CLS زیر ۰٫۱",
                "داده‌ی ساختاریافته را اعتبارسنجی کنید و هر هشداری را برطرف کنید",
                "سایت را برای یافتن لینک داخلی شکسته و زنجیره‌ی ریدایرکت خزش کنید",
                "نقشه‌ی سایت را ثبت کنید و Search Console را زیر نظر بگیرید",
              ],
            },
          ],
        },
        {
          q: "تیم‌ها بیشتر کجا اشتباه می‌کنند؟",
          a: "فراموش کردن metadataBase که canonical را نسبی می‌کند، نقشه‌ی سایتی که برای همه‌ی صفحه‌ها زمان build را می‌گذارد، hreflang یک‌طرفه، داده‌ی ساختاریافته‌ای که با صفحه نمی‌خواند، تصویر بدون sizes و noindex سایت آزمایشی که پس از انتشار جا مانده. آزمون‌های بالا همه‌ی این‌ها را پیدا می‌کنند.",
        },
        {
          q: "بلونا می‌تواند سایت ما را بسنجد یا بسازد؟",
          a: "بله. سایت‌های Next.js را از اول با همین چک‌لیست می‌سازیم و سایت فعلی‌تان را هم می‌توانیم بسنجیم. بررسی رایگان رشد نشان می‌دهد اول چه چیزی را درست کنید و اگر به توافق برسیم، قیمت قطعی و مکتوب می‌گیرید.",
          details: [{ kind: "links", items: [{ label: "خدمات سئوی سایت", href: "/services/seo" }, { label: "رزرو بررسی رایگان رشد", href: "/contact?need=growth" }] }],
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
    author: RAZI,
    needs: [],
    projects: [],
    guides: ["nextjs-seo-checklist", "bilingual-website-hreflang-rtl"],
    en: {
      metaTitle: "Be visible in AI search: ChatGPT and assistants",
      metaDescription: "AI search visibility: make your website readable by ChatGPT and other AI assistants with server rendering, answer-first structure, schema and robots rules.",
      eyebrow: "Guide",
      h1: "Be visible in **AI search**",
      definition:
        "AI assistants such as ChatGPT, Claude and Perplexity answer questions by reading web pages, then quoting or summarizing them. Being visible to them is mostly the same work as good SEO, with extra weight on pages that state their answer plainly, are readable without JavaScript and say the same thing about you everywhere.",
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
          q: "How can Bellona help with AI-search readiness?",
          a: "We build sites with these properties from the start and can audit an existing site for AI-search readiness as part of the free growth audit. You get a fixed quote in writing if there is work to do.",
          details: [{ kind: "links", items: [{ label: "SEO services", href: "/services/seo" }, { label: "Book the free growth audit", href: "/contact?need=growth" }] }],
        },
      ],
    },
    fa: {
      metaTitle: "دیده شدن در ChatGPT و جست‌وجوی هوش مصنوعی",
      metaDescription: "دیده شدن در ChatGPT و دستیارهای هوش مصنوعی: رندر سمت سرور، ساختار پاسخ‌محور، داده‌ی ساختاریافته، قواعد robots برای خزنده‌های هوش مصنوعی و هویت یکدست برند.",
      eyebrow: "راهنما",
      h1: "دیده شدن در **ChatGPT و جست‌وجوی هوش مصنوعی**",
      definition:
        "دستیارهای هوش مصنوعی مثل ChatGPT، Claude و Perplexity با خواندن صفحه‌های وب به پرسش‌ها جواب می‌دهند و از آن‌ها نقل‌قول یا خلاصه می‌آورند. دیده شدن در آن‌ها بیشتر همان سئوی خوب است، با تأکید بیشتر بر صفحه‌هایی که جوابشان را روشن می‌گویند، بی‌جاوااسکریپت خوانا هستند و همه‌جا یک حرف را درباره‌ی شما می‌زنند.",
      answers: [
        {
          q: "دیده شدن در ChatGPT: دستیارها سایت را دقیقاً چطور می‌خوانند؟",
          a: "صفحه‌ی شما را به شکل HTML دریافت می‌کنند، اغلب بی‌آنکه جاوااسکریپت را اجرا کنند، متن و ساختار را بیرون می‌کشند و بخش‌های مرتبط را در جواب به کار می‌برند. صفحه‌هایی که متن کامل، عنوان‌ها و داده را در پاسخ اول سرور دارند خوانا هستند؛ صفحه‌هایی که متنشان را در مرورگر می‌سازند ممکن است خالی دیده شوند.",
          details: [
            { kind: "p", text: "بعضی ابزارها جاوااسکریپت را اجرا می‌کنند و خیلی‌ها نه؛ پس رویش حساب نکنید. قاعده‌ی مطمئن همانی است که موتورهای جست‌وجو هم به آن پاداش می‌دهند: محتوای کامل باید در HTML‌ای باشد که سرور برمی‌گرداند." },
          ],
        },
        {
          q: "رندر سمت سرور چرا مهم است؟",
          a: "صفحه‌ای که روی سرور رندر شده (یا ایستا تولید شده) متن کاملش را در پاسخ اول می‌فرستد، پس هر خواننده، خزنده یا دستیاری بی‌درنگ از آن استفاده می‌کند. صفحه‌ای که برای نمایش محتوا به جاوااسکریپت نیاز دارد، به این بستگی دارد که خواننده اسکریپت را اجرا کند؛ کاری که خیلی از دستیارها نمی‌کنند. نکست جی اس از اول همین حالت مطمئن را دارد.",
          details: [{ kind: "links", items: [{ label: "راهنما: چک‌لیست سئوی Next.js", href: "/guides/nextjs-seo-checklist" }] }],
        },
        {
          q: "ساختار پاسخ‌محور یعنی چه؟",
          a: "هر پرسش یک تیتر است، بلافاصله زیرش پاسخی کوتاه و مستقیم در حدود ۴۰ تا ۶۰ کلمه می‌آید و بعد جزئیات. دستیار می‌تواند همان پاسخ را جدا نقل کند و خواننده هم اول جوابش را می‌گیرد. همین سایت به همین شکل نوشته شده: تیتر پرسشی و جوابی روشن زیرش.",
          details: [
            {
              kind: "steps",
              items: [
                "تیتری به شکل همان پرسشی که مردم می‌پرسند",
                "پاسخ مستقیم در پاراگراف اول، حدود ۴۰ تا ۶۰ کلمه",
                "بعد جزئیات: مرحله‌ها، جدول یا لینک",
                "هر بخش یک موضوع، تا پاسخ تمیز جدا شود",
              ],
            },
          ],
        },
        {
          q: "داده‌ی ساختاریافته به جست‌وجوی هوش مصنوعی کمک می‌کند؟",
          a: "هم به موتور جست‌وجو و هم به دستیار کمک می‌کند بفهمند صفحه درباره‌ی چیست: Organization، Service، Article با نویسنده و تاریخ، FAQ و breadcrumb. باید دقیقاً با محتوای قابل‌دیدن صفحه بخواند. فهم صفحه را آسان‌تر می‌کند، ولی تضمین نمی‌کند دستیاری از شما نقل کند.",
          details: [{ kind: "p", text: "انواع مفید: Organization با نام، لوگو، راه تماس و پروفایل‌های sameAs؛ Service برای هر صفحه‌ی خدمت؛ Article برای راهنماها با نویسنده، datePublished و dateModified؛ FAQPage برای پرسش و پاسخ‌های قابل‌دیدن؛ BreadcrumbList برای مسیر ناوبری." }],
        },
        {
          q: "کدام قواعد robots برای خزنده‌های هوش مصنوعی مهم‌اند؟",
          a: "خزنده‌های دستیارهای جست‌وجومحور (مثل OAI-SearchBot، ChatGPT-User، Claude-SearchBot، Claude-User، PerplexityBot و Perplexity-User) صفحه‌ها را برای جواب دادن دریافت می‌کنند. اگر می‌خواهید در این جواب‌ها باشید، جلویشان را نگیرید. خزنده‌های آموزش مدل موضوع جدایی‌اند و می‌توانید مستقل از این‌ها اجازه‌شان را بدهید یا نه.",
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
          q: "چرا هویت یکدست برند مهم است؟",
          a: "دستیارها و موتورهای جست‌وجو تصویرشان از شما را از حرف تک‌تک صفحه‌ها و پروفایل‌ها می‌سازند. همه‌جا همان نام کسب‌وکار، توضیح، لوگو و اطلاعات تماس را بیاورید، پروفایل‌های رسمی را با sameAs وصل کنید و نام برند را به همان شکل‌هایی که مردم جست‌وجو می‌کنند، در هر دو زبان بنویسید.",
          details: [
            {
              kind: "steps",
              items: [
                "یک نام و یک توضیح، یکسان در سایت و پروفایل‌ها",
                "موجودیت Organization روی همه‌ی صفحه‌ها با همان لوگو و تماس",
                "لینک sameAs به پروفایل‌های رسمی",
                "شکل‌های دیگر نوشتن نام برند در هر زبان",
              ],
            },
          ],
        },
        {
          q: "چرا تاریخ، منبع و عدد واقعی کمک می‌کند؟",
          a: "دستیارها صفحه‌هایی را ترجیح می‌دهند که بشود به آن‌ها اعتماد کرد و درستی‌شان را سنجید. تاریخ به‌روزرسانی پیدا، نویسنده‌ی مشخص و واقعیت‌های دقیق و مستند (یک عدد واقعی، یک پروژه‌ی واقعی) راحت‌تر از ادعای کلی نقل می‌شوند. هیچ‌وقت آمار نسازید؛ عدد ساختگی از نبودن عدد بدتر است.",
        },
        {
          q: "می‌توانید تضمین کنید ChatGPT از ما نام ببرد؟",
          a: "نه، و به هر کسی که چنین قولی می‌دهد شک کنید. دستیارها با قواعد خودشان، که مدام تغییر می‌کند، انتخاب می‌کنند از چه چیزی نقل کنند. چیزی که دست شماست این است که صفحه‌هایتان خوانا، روشن، ساختارمند و قابل اعتماد باشند؛ همان چیزهایی که در جست‌وجوی معمولی هم رتبه می‌آورند.",
        },
        {
          q: "دیده شدن در جست‌وجوی هوش مصنوعی را چطور بسنجیم؟",
          a: "بازدیدهایی را که از دستیارهای هوش مصنوعی می‌آید در ابزار آمار ببینید، جست‌وجوی نام برندتان را در Search Console دنبال کنید و هر از گاهی از دستیارها درباره‌ی حوزه‌ی کارتان بپرسید تا ببینید چه می‌گویند. این‌ها را نشانه بدانید نه عدد دقیق، چون جواب هوش مصنوعی از پرسشی به پرسش دیگر فرق می‌کند.",
        },
        {
          q: "یک چک‌لیست کوتاه",
          a: "هر صفحه را سمت سرور رندر کنید، محتوا را پاسخ‌محور بنویسید، داده‌ی ساختاریافته‌ی هماهنگ بگذارید، راه خزنده‌های جست‌وجومحور هوش مصنوعی را باز بگذارید، هویت برند را یکدست نگه دارید، تاریخ و نویسنده را نشان دهید و فقط از واقعیت بنویسید. هیچ‌کدام تازه نیست؛ همان پایه‌های سئوی خوب است که با دقت اجرا شده.",
          details: [
            {
              kind: "steps",
              items: [
                "متن کامل در پاسخ اول سرور است",
                "عنوان پرسشی با پاسخ مستقیم زیرش",
                "داده‌ی ساختاریافته‌ی مطابق با صفحه",
                "راه خزنده‌های جست‌وجومحور هوش مصنوعی باز است",
                "همه‌جا یک نام و یک اطلاعات برند",
                "تاریخ‌ها و نویسنده‌های پیدا",
                "فقط واقعیت‌هایی که می‌شود سنجید",
              ],
            },
          ],
        },
        {
          q: "بلونا برای آمادگی جست‌وجوی هوش مصنوعی چه کمکی می‌کند؟",
          a: "سایت‌ها را از اول با همین ویژگی‌ها می‌سازیم و در بررسی رایگان رشد می‌توانیم آمادگی سایت فعلی‌تان را برای جست‌وجوی هوش مصنوعی بسنجیم. اگر کاری لازم باشد، قیمت قطعی و مکتوب می‌گیرید.",
          details: [{ kind: "links", items: [{ label: "خدمات سئوی سایت", href: "/services/seo" }, { label: "رزرو بررسی رایگان رشد", href: "/contact?need=growth" }] }],
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
      metaTitle: "Lead follow-up automation with n8n: a guide",
      metaDescription: "Lead follow-up automation with n8n: workflow architecture from form to CRM, scoring, timed messages, stop-on-reply, human handover and error handling.",
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
          a: "A Webhook or email trigger to start, IF and Switch nodes for rules, a Baserow or HubSpot node for the CRM, Send Email and an IMAP trigger for outgoing and incoming mail, Wait for timing, an AI node where a step needs judgment, a Schedule trigger for the digest, and an Error Trigger workflow for failures.",
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
                ["Judgment and wording", "An AI model node"],
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
          q: "How can Bellona help with lead follow-up automation?",
          a: "We design, build and run n8n workflows like this one, including self-hosted n8n if you want your data on your own server. Begin with the free growth audit and a fixed quote in writing follows.",
          details: [{ kind: "links", items: [{ label: "n8n implementation", href: "/services/ai-automation/n8n" }, { label: "CRM automation", href: "/services/ai-automation/crm" }, { label: "Book the free growth audit", href: "/contact?need=ai" }] }],
        },
      ],
    },
    fa: {
      metaTitle: "اتوماسیون پیگیری لید با n8n: راهنمای گردش‌کار",
      metaDescription: "اتوماسیون پیگیری لید با n8n: ساختار گردش‌کار از فرم تا CRM، امتیازدهی، پیام زمان‌بندی‌شده، توقف با پاسخ مشتری، سپردن کار به آدم و مدیریت خطا؛ با نمونه‌ی املاک.",
      eyebrow: "راهنما",
      h1: "اتوماسیون پیگیری لید **با n8n**",
      definition:
        "اتوماسیون پیگیری لید به هر درخواست تازه در چند ثانیه جواب می‌دهد و طبق برنامه پیگیری می‌کند تا طرف پاسخ بدهد؛ پس هیچ مشتری‌ای فقط چون کسی یادش رفته سرد نمی‌شود. n8n ابزاری برای ساخت گردش‌کار است که فرم، CRM، ایمیل و یک مدل هوش مصنوعی را در زنجیره‌ای از مراحل به هم وصل می‌کند.",
      answers: [
        {
          q: "چرا خودکار کردن پیگیری لید مهم است؟",
          a: "سرنخ‌های فروش زود سرد می‌شوند و وقتی تیم سرش شلوغ است، اولین چیزی که عقب می‌افتد پیگیری است. زنجیره‌ی خودکار در چند ثانیه جواب می‌دهد، هیچ پیگیری‌ای را فراموش نمی‌کند و همین که طرف جواب داد، متوقف می‌شود؛ پس سرعت پاسخ دیگر به این بستگی ندارد که چه کسی پشت میز نشسته.",
          details: [
            { kind: "p", text: "معمولاً فروش به خاطر پیشنهاد بد از دست نمی‌رود، به خاطر جواب دیر یا فراموش‌شده از دست می‌رود. اتوماسیون جای گفت‌وگوی انسانی را نمی‌گیرد؛ مطمئن می‌شود گفت‌وگو با مشتری‌ای شروع شود که هنوز گرم است و چیزی میان آدم‌ها گم نشود." },
          ],
        },
        {
          q: "ساختار گردش‌کار چه شکلی است؟",
          a: "یک رویداد (رسیدن فرم یا پیام) زنجیره را شروع می‌کند: بررسی تکراری بودن، تکمیل اطلاعات و امتیازدهی، ثبت در CRM، فرستادن اولین پاسخ، زمان‌بندی پیگیری‌های بعدی، توقف با رسیدن جواب و سپردن گفت‌وگو به یک نفر. گزارش روزانه و مدیریت متمرکز خطا هم دور این زنجیره را گرفته‌اند.",
          details: [
            {
              kind: "steps",
              items: [
                "شروع: وب‌هوک فرم یا رسیدن ایمیل یا پیام",
                "حذف تکراری: این شخص از قبل در CRM هست؟",
                "تکمیل و امتیاز: این شخص کیست و چقدر احتمال خرید دارد؟",
                "ثبت: ساخت یا به‌روزرسانی رکورد CRM",
                "پاسخ: فرستادن اولین پیام در چند ثانیه",
                "زمان‌بندی: صبر، و بعد فرستادن پیگیری بعدی",
                "توقف با جواب: وقتی شخص جواب داد، زنجیره تمام می‌شود",
                "سپردن به آدم: ارجاع به یک نفر با کل سابقه",
                "گزارش و خطا: گزارش روزانه و هشدار در صورت خرابی",
              ],
            },
          ],
        },
        {
          q: "در n8n از چه نودهایی استفاده می‌کنید؟",
          a: "Webhook یا محرک ایمیل برای شروع، نودهای IF و Switch برای قواعد، نود Baserow یا HubSpot برای CRM، Send Email و محرک IMAP برای ایمیل خروجی و ورودی، Wait برای زمان‌بندی، یک نود هوش مصنوعی هر جا قدمی به قضاوت نیاز دارد، محرک Schedule برای گزارش روزانه و یک گردش‌کار Error Trigger برای خرابی‌ها.",
          details: [
            {
              kind: "table",
              caption: "اجزای یک گردش‌کار پیگیری",
              head: ["قدم", "جزء n8n"],
              rows: [
                ["دریافت سرنخ", "محرک Webhook یا محرک ایمیل/IMAP"],
                ["قواعد و مسیردهی", "نودهای IF و Switch"],
                ["ثبت در CRM", "نود Baserow یا HubSpot یا نود HTTP Request"],
                ["ارسال پیام", "نود Send Email (SMTP)"],
                ["صبر بین پیام‌ها", "نود Wait"],
                ["تشخیص پاسخ", "محرک ایمیل (IMAP)"],
                ["تصمیم‌گیری و نوشتن متن", "نود مدل هوش مصنوعی"],
                ["گزارش روزانه", "محرک Schedule"],
                ["خرابی‌ها", "گردش‌کار جدا که با Error Trigger شروع می‌شود"],
              ],
            },
          ],
        },
        {
          q: "امتیازدهی چطور کار می‌کند؟",
          a: "هر سرنخ با قواعدی که خودتان تعریف می‌کنید، مثل اینکه کیست، چه خواسته و از کجا آمده، سنجیده می‌شود و امتیازی می‌گیرد که تعیین می‌کند با آن چه شود: سرنخ قوی زود به دست یک نفر می‌رسد و سرنخ ضعیف وارد زنجیره‌ی سبک‌تری می‌شود. قواعد داخل خود گردش‌کار است و بی‌کدنویسی عوض می‌شود.",
          details: [{ kind: "p", text: "در سیستم املاکی که ساختیم، پیدا کردن و ارزیابی سرمایه‌گذارها پیش از نوشتن هر پیامی خودکار انجام می‌شود؛ پس تیم وقتش را روی سرمایه‌گذارهایی می‌گذارد که احتمال پاسخشان بیشتر است." }],
        },
        {
          q: "وقتی طرف جواب می‌دهد، زنجیره را چطور متوقف می‌کنید؟",
          a: "یک محرک ایمیل، صندوق ورودی را زیر نظر دارد، هر پاسخ را با رکورد همان شخص در CRM تطبیق می‌دهد و زنجیره را «پاسخ داده» علامت می‌زند تا پیام خودکار دیگری نرود. همین قدم اتوماسیون را مؤدب نگه می‌دارد: کسی که جواب داده، دیگر پیگیری زمان‌بندی‌شده نمی‌گیرد.",
        },
        {
          q: "آدم‌ها کی و چطور کار را به دست می‌گیرند؟",
          a: "قاعده را خودتان تعیین می‌کنید: پاسخی که یک «بله» یا «نه» ساده نیست، امتیاز بالا، شکایت یا درخواست صحبت با یک آدم. سرنخ با کل سابقه‌اش به یک نفر سپرده می‌شود و هشداری برایش می‌رود تا با اطلاع کامل شروع کند و سؤال‌ها را تکرار نکند.",
        },
        {
          q: "مدیریت خطا چه شکلی است؟",
          a: "یک گردش‌کار جدا با Error Trigger شروع می‌شود تا هر گردش‌کاری که خراب شود، به‌جای توقف بی‌صدا، هشدار بفرستد. برای خرابی‌های موقت تلاش دوباره بگذارید، اطلاعات ورود را در مخزن اعتبارنامه‌ی n8n نگه دارید و ثبت کنید چه چیزی اجرا شده. سیستم املاک ما مدیریت متمرکز خطا و گزارش روزانه دارد.",
          details: [
            {
              kind: "steps",
              items: [
                "یک گردش‌کار خطای مرکزی که به تیم هشدار می‌دهد",
                "تلاش دوباره برای خرابی‌های موقت، مثل timeout سرور ایمیل",
                "اطلاعات ورود در n8n، نه داخل گردش‌کار",
                "گزارش روزانه‌ای که نشان می‌دهد چه اجرا شد و چه خراب شد",
                "یادداشت‌های پشتیبان‌گیری و امنیت همراه تحویل",
              ],
            },
          ],
        },
        {
          q: "یک نمونه‌ی واقعی چه شکلی است؟",
          a: `برای یک کسب‌وکار املاک (kharazie.at) ${nFa(re.n8nWorkflows)} گردش‌کار n8n و یک CRM با ${nFa(re.crmTables)} جدول در Baserow ساختیم: پیدا کردن و امتیازدهی سرمایه‌گذارها، ارسال و دریافت ایمیل با متن‌هایی که Claude در نوشتنشان کمک می‌کند، تحلیل پروژه، اسناد در Google Drive، مدیریت متمرکز خطا و گزارش روزانه.`,
          details: [{ kind: "links", items: [{ label: "نمونه‌کار: سیستم هوشمند فروش املاک", href: "/work/ai-real-estate-os" }] }],
        },
        {
          q: "رایج‌ترین اشتباه‌ها چیست؟",
          a: "فرستادن پیام‌های زیاد، توقف نکردن با رسیدن پاسخ، رکوردهای تکراری در CRM، گردش‌کارهایی که بی‌صدا خراب می‌شوند و اطلاعات ورودی که داخل گردش‌کار رها شده. زنجیره‌ها را کوتاه نگه دارید، همیشه با پاسخ متوقفشان کنید، تکراری‌ها را همان لحظه‌ی ورود حذف کنید، هر خرابی را به گردش‌کار خطا بفرستید و رمزها را در مخزن اعتبارنامه‌ی n8n نگه دارید.",
        },
        {
          q: "ساختنش چقدر طول می‌کشد؟",
          a: `یک دوره‌ی متمرکز اتوماسیون، یعنی یک فرایند کامل از اول تا آخر، در ${sprintFa} راه می‌افتد. گردش‌کارهای ساده چند روز و سیستم‌های بزرگ‌تر بیشتر طول می‌کشند. زمان‌بندی پس از بررسی رایگان، بخشی از پیشنهاد قیمت قطعی است.`,
        },
        {
          q: "بلونا پیگیری خودکار لید را چطور راه می‌اندازد؟",
          a: "گردش‌کارهای n8n مثل همین را طراحی، پیاده‌سازی و اجرا می‌کنیم؛ اگر بخواهید داده‌ها پیش خودتان بماند، n8n را روی سرور خودتان راه می‌اندازیم. با بررسی رایگان رشد شروع کنید تا قیمت قطعی و مکتوب بگیرید.",
          details: [{ kind: "links", items: [{ label: "پیاده‌سازی n8n", href: "/services/ai-automation/n8n" }, { label: "اتوماسیون CRM", href: "/services/ai-automation/crm" }, { label: "رزرو بررسی رایگان رشد", href: "/contact?need=ai" }] }],
        },
      ],
    },
  },
];
