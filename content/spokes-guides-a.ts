import { facts, fmt } from "./facts";
import type { Spoke } from "./spokes";

/**
 * Guides (SEO-GUIDELINE E2), part 1: WordPress migration, store builder vs custom, bilingual sites.
 * Each is 1,000+ words per language in answer-first sections with a table of contents; all claims about Bellona come
 * from content/work.ts and content/facts.ts, the rest is general technical advice.
 * TODO(owner): confirm the byline of each guide with the named team member before relying on it (SEO-GUIDELINE E2);
 * add a measurable result from the client for the Dane migration (e.g. traffic before/after) if they agree to publish it.
 */
const dane = facts.projects.dane;
const nEn = (v: number) => fmt.n(v, "en");
const nFa = (v: number) => fmt.n(v, "fa");
const UPDATED = "2026-11-02";
const BAZDAR = "Amirhossein Bazdar|امیرحسین بازدار";

export const guidesA: Spoke[] = [
  // ======================================================================================= migrate WordPress to Next.js
  {
    kind: "guide",
    slug: "migrate-wordpress-to-nextjs",
    pillar: "website-design",
    need: "web",
    status: "published",
    updated: UPDATED,
    author: BAZDAR,
    needs: [],
    projects: ["dane-news"],
    guides: ["nextjs-seo-checklist", "website-design-cost"],
    en: {
      metaTitle: "Migrate WordPress to Next.js without losing SEO",
      metaDescription: "How to migrate from WordPress to Next.js without losing traffic: a step-by-step checklist with the URL map, 301 redirects, taxonomy clean-up, sitemap and monitoring, with the real Dane migration.",
      eyebrow: "Guide",
      h1: "Migrate from WordPress to **Next.js without losing SEO**",
      definition:
        "Moving a site from WordPress to Next.js changes how every page is built, but it should not change what Google already knows about you. The risk is losing addresses, titles and links; the work is mapping every old page to a new one before launch and proving afterwards that nothing was lost.",
      answers: [
        {
          q: "Why migrate from WordPress to Next.js, and when not to?",
          a: "People move for speed, security and control: a custom Next.js site loads only what it needs, has less third-party code to patch and gives full control of structure and SEO. Do not move if your team edits layout daily without a developer and you have no budget for engineering.",
          details: [
            { kind: "p", text: "WordPress is a good choice when non-technical staff need to rebuild pages themselves, when the budget is small, or when the site is simple. The costs show up later: plugins that need constant updating, themes that limit design, and pages that are slower than they need to be." },
            { kind: "p", text: "Next.js builds pages on the server, so the complete text arrives in the first response, which search engines and AI assistants read easily. Content editing does not have to disappear: a headless CMS such as Payload sits behind Next.js and gives the newsroom or marketing team an editor, as on Dane Scientific News." },
          ],
        },
        {
          q: "What should you inventory before you start?",
          a: "Everything that Google or visitors already depend on: every URL, every content type, categories and tags, authors, images and files, forms, titles and meta descriptions, redirects that already exist, and the pages that bring the most traffic. The inventory is the contract the new site has to honour.",
          details: [
            {
              kind: "steps",
              items: [
                "Export all URLs from the sitemap and from a crawl",
                "List content types: posts, pages, custom post types",
                "List the taxonomy: categories, tags, authors",
                "Export media and note where images are used",
                "Record titles, descriptions and canonical tags of the main pages",
                "Note forms, integrations and tracking that must keep working",
                "Find the pages with the most traffic and links from Search Console",
              ],
            },
          ],
        },
        {
          q: "What is the full migration checklist?",
          a: "Ten steps: inventory, URL map, new structure, content migration, taxonomy clean-up, 301 redirects, titles and metadata, a staging review, launch, and monitoring. Each step has an owner and a test, and nothing launches until the redirect map has been tested against the real list of old URLs.",
          details: [
            {
              kind: "steps",
              items: [
                "Inventory every URL, content type and taxonomy",
                "Build the URL map: old address to new address",
                "Design the new structure and templates",
                "Migrate content with its tags, authors and media",
                "Clean up the taxonomy before it is carried over",
                "Write a permanent (301) redirect for every old URL",
                "Carry titles, descriptions and structured data across",
                "Review on a staging site that is blocked from search engines",
                "Launch, then submit the new sitemap in Search Console",
                "Monitor 404 errors, indexing and traffic for the first weeks",
              ],
            },
          ],
        },
        {
          q: "How do you map URLs and write 301 redirects?",
          a: "Every old URL gets exactly one destination: the equivalent page, or the closest relevant page if there is none. Use permanent 301 redirects, one hop only, never to the home page by default. In Next.js they live in next.config, generated from your URL map so none is forgotten.",
          details: [
            {
              kind: "table",
              caption: "Example of a URL map",
              head: ["Old WordPress URL", "New URL", "Redirect"],
              rows: [
                ["/2023/05/example-post/", "/articles/example-post", "301"],
                ["/category/science/", "/topics/science", "301"],
                ["/author/jane/", "/authors/jane", "301"],
                ["/?p=1234", "/articles/example-post", "301 (from the post ID)"],
              ],
            },
            {
              kind: "code",
              lang: "ts",
              text: `// next.config.ts: redirects generated from the URL map
import type { NextConfig } from "next";
import { urlMap } from "./redirects";

const config: NextConfig = {
  async redirects() {
    return urlMap.map(([from, to]) => ({ source: from, destination: to, permanent: true }));
  },
};

export default config;`,
            },
          ],
        },
        {
          q: "How do you migrate posts, tags, authors and media?",
          a: `Export from WordPress, transform to the new content model and import in one repeatable script, so the migration can be re-run until it is right. On Dane Scientific News this moved ${nEn(dane.migratedPosts)} posts, ${nEn(dane.tags)} tags and ${nEn(dane.authors)} authors into Payload CMS with their relationships intact.`,
          details: [
            { kind: "p", text: "A repeatable script matters more than the first run. Content is never clean: posts have missing images, broken internal links and inconsistent categories. Running the migration repeatedly against a staging database lets you fix those in the script instead of by hand." },
            { kind: "links", items: [{ label: "Case study: Dane Scientific News", href: "/work/dane-news" }] },
          ],
        },
        {
          q: "Why clean up the taxonomy before migrating?",
          a: `A sprawling taxonomy carried over unchanged becomes a sprawling taxonomy in the new site. At Dane, ${nEn(dane.categoriesBefore)} categories and ${nEn(dane.tags)} tags were consolidated into ${nEn(dane.categoriesAfter)} categories and ${nEn(dane.topics)} topics before the move, which is easier for readers and for search engines to understand.`,
          details: [
            { kind: "p", text: "When categories and tags are merged, their old archive pages need redirects too. Decide for every old category and tag where it goes (a new category, a topic, or the most relevant article list) as part of the URL map, not after launch." },
          ],
        },
        {
          q: "What must stay the same: titles, descriptions and structured data?",
          a: "Keep the title and meta description of pages that already rank unless you have a reason to change them, keep one canonical address per page, and carry structured data across. Changing a ranking page's title and URL in the same release makes it hard to tell what caused any drop.",
          details: [
            {
              kind: "steps",
              items: [
                "Reuse titles and descriptions of pages that already bring traffic",
                "One canonical URL per page, matching the new address",
                "Re-create structured data (Article, Breadcrumb, Organization)",
                "Keep heading structure and the main text of key pages",
                "Preserve image alt text and file names where possible",
              ],
            },
          ],
        },
        {
          q: "What do you do with the sitemap and Search Console?",
          a: "Generate a new sitemap that lists only the final URLs, with true last-modified dates, and submit it in Search Console the day you launch. Keep the old property, watch the Pages report for errors, and use URL inspection on the most important pages to confirm Google sees the redirects.",
          details: [
            {
              kind: "code",
              lang: "ts",
              text: `// app/sitemap.ts
import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getAllArticles();
  return articles.map((a) => ({
    url: \`https://example.com/articles/\${a.slug}\`,
    lastModified: a.updatedAt, // the real update date, never the build time
  }));
}`,
            },
          ],
        },
        {
          q: "What should you check on launch day and in the first month?",
          a: "On launch day, test every old URL against the redirect map, check that the site is no longer blocked from search engines, and submit the sitemap. For the first weeks, watch 404 errors, the number of indexed pages, impressions and clicks, and fix gaps in the redirect map immediately.",
          details: [
            {
              kind: "steps",
              items: [
                "Crawl the old URL list and confirm each one returns a single 301 to a 200 page",
                "Remove any noindex or robots block left from staging",
                "Submit the new sitemap",
                "Check Search Console: coverage, 404s and impressions daily at first",
                "Fix every missing redirect and re-test",
              ],
            },
          ],
        },
        {
          q: "Which mistakes do migrations most often make?",
          a: "Redirecting everything to the home page, chains of two or more redirects, temporary (302) instead of permanent redirects, forgetting images and files, leaving staging blocked from search engines, and changing every URL and title at once. Each is avoidable with the URL map and a test crawl.",
          details: [
            {
              kind: "steps",
              items: [
                "Mass-redirecting old URLs to the home page",
                "Redirect chains instead of a single hop",
                "302 redirects where 301 was intended",
                "Missing redirects for images, PDFs and archive pages",
                "A staging noindex or robots block left on after launch",
                "Changing URLs, titles and content all in one release",
              ],
            },
          ],
        },
        {
          q: "What did the Dane migration look like in numbers?",
          a: `Dane Scientific News moved from WordPress to a custom Next.js and Payload CMS platform: ${nEn(dane.migratedPosts)} posts, ${nEn(dane.categoriesBefore)} categories, ${nEn(dane.tags)} tags and ${nEn(dane.authors)} authors migrated, a taxonomy redesigned into ${nEn(dane.categoriesAfter)} categories and ${nEn(dane.topics)} topics, and ${nEn(dane.redirects)} permanent redirects so no old link broke.`,
          details: [{ kind: "links", items: [{ label: "Case study: Dane Scientific News", href: "/work/dane-news" }] }],
        },
        {
          q: "How can Bellona help with a migration?",
          a: "We start with the free growth audit: we read your current site, URLs and risks, and give you a fixed quote in writing for the migration. The site stays online throughout, and monitoring after launch is part of the work.",
          details: [{ kind: "links", items: [{ label: "Website redesign and migration", href: "/services/website-design/redesign" }, { label: "Book the free growth audit", href: "/contact?need=web" }] }],
        },
      ],
    },
    fa: {
      metaTitle: "انتقال سایت از وردپرس به Next.js بدون افت سئو",
      metaDescription: "چک‌لیست قدم‌به‌قدم انتقال سایت از وردپرس به Next.js بدون از دست دادن ترافیک: نقشه‌ی آدرس‌ها، ریدایرکت ۳۰۱، مرتب‌سازی طبقه‌بندی، نقشه‌ی سایت و پایش؛ با مهاجرت واقعی دانه.",
      eyebrow: "راهنما",
      h1: "انتقال سایت از وردپرس به نکست جی اس (Next.js) **بدون افت سئو**",
      definition:
        "انتقال سایت از وردپرس به نکست جی اس شیوه‌ی ساخت هر صفحه را عوض می‌کند، ولی نباید چیزی را که گوگل از شما می‌داند عوض کند. ریسک اصلی از دست رفتن آدرس‌ها، عنوان‌ها و لینک‌هاست؛ کار اصلی هم این است که قبل از انتشار هر صفحه‌ی قدیمی به یک صفحه‌ی جدید نگاشت شود و بعد از آن ثابت شود چیزی گم نشده است.",
      answers: [
        {
          q: "چرا انتقال سایت از وردپرس به Next.js و چه وقت نه؟",
          a: "دلیل‌ها سرعت، امنیت و کنترل است: سایت اختصاصی Next.js فقط چیزی را بار می‌کند که لازم دارد، کد شخص ثالث کمتری برای به‌روزرسانی دارد و کنترل کامل روی ساختار و سئو می‌دهد. اگر تیم شما هر روز بدون برنامه‌نویس چیدمان را عوض می‌کند و بودجه‌ی مهندسی ندارید، نروید.",
          details: [
            { kind: "p", text: "وردپرس وقتی انتخاب خوبی است که کارمندان غیرفنی باید خودشان صفحه بسازند، بودجه کم است یا سایت ساده است. هزینه‌ها بعداً پیدا می‌شوند: افزونه‌هایی که مدام باید به‌روز شوند، قالب‌هایی که طراحی را محدود می‌کنند و صفحه‌هایی که کندتر از لازم‌اند." },
            { kind: "p", text: "نکست جی اس صفحه‌ها را روی سرور می‌سازد، پس متن کامل در پاسخ اول می‌رسد و موتور جست‌وجو و دستیارهای هوش مصنوعی راحت می‌خوانندش. ویرایش محتوا هم لازم نیست از بین برود: یک CMS هدلس مثل Payload پشت نکست جی اس می‌نشیند و مثل پایگاه علمی خبری دانه ویرایشگر را به تحریریه یا تیم بازاریابی می‌دهد." },
          ],
        },
        {
          q: "قبل از شروع باید چه چیزهایی را فهرست کرد؟",
          a: "همه‌ی چیزهایی که گوگل یا بازدیدکننده‌ها همین حالا به آن‌ها وابسته‌اند: همه‌ی آدرس‌ها، همه‌ی انواع محتوا، دسته‌ها و برچسب‌ها، نویسنده‌ها، تصویرها و فایل‌ها، فرم‌ها، عنوان و توضیح متای صفحه‌ها، ریدایرکت‌هایی که از قبل هست و صفحه‌هایی که بیشترین ترافیک را می‌آورند. این فهرست قراردادی است که سایت جدید باید به آن وفادار بماند.",
          details: [
            {
              kind: "steps",
              items: [
                "همه‌ی آدرس‌ها را از نقشه‌ی سایت و یک خزش (crawl) بیرون بکشید",
                "انواع محتوا را فهرست کنید: نوشته، صفحه، نوع سفارشی",
                "طبقه‌بندی را فهرست کنید: دسته، برچسب، نویسنده",
                "رسانه را خروجی بگیرید و جای استفاده‌ی تصویرها را یادداشت کنید",
                "عنوان، توضیح و canonical صفحه‌های اصلی را ثبت کنید",
                "فرم‌ها، اتصال‌ها و ردیابی‌هایی را که باید کار کنند یادداشت کنید",
                "صفحه‌های پرترافیک و پرلینک را از Search Console پیدا کنید",
              ],
            },
          ],
        },
        {
          q: "چک‌لیست کامل مهاجرت چیست؟",
          a: "ده قدم: فهرست‌برداری، نقشه‌ی آدرس‌ها، ساختار جدید، انتقال محتوا، مرتب‌سازی طبقه‌بندی، ریدایرکت ۳۰۱، عنوان و متادیتا، بازبینی روی سایت آزمایشی، انتشار و پایش. هر قدم مسئول و آزمونی دارد و تا نقشه‌ی ریدایرکت روی فهرست واقعی آدرس‌های قدیمی آزموده نشده، چیزی منتشر نمی‌شود.",
          details: [
            {
              kind: "steps",
              items: [
                "فهرست‌برداری از همه‌ی آدرس‌ها، انواع محتوا و طبقه‌بندی",
                "ساخت نقشه‌ی آدرس‌ها: آدرس قدیمی به آدرس جدید",
                "طراحی ساختار و قالب‌های جدید",
                "انتقال محتوا همراه با برچسب‌ها، نویسنده‌ها و رسانه",
                "مرتب کردن طبقه‌بندی پیش از انتقال",
                "نوشتن ریدایرکت دائمی (۳۰۱) برای هر آدرس قدیمی",
                "انتقال عنوان‌ها، توضیح‌ها و داده‌ی ساختاریافته",
                "بازبینی روی سایت آزمایشی که از موتور جست‌وجو بسته است",
                "انتشار و ثبت نقشه‌ی سایت جدید در Search Console",
                "پایش خطاهای ۴۰۴، ایندکس و ترافیک در هفته‌های اول",
              ],
            },
          ],
        },
        {
          q: "نقشه‌ی آدرس‌ها و ریدایرکت ۳۰۱ را چطور بنویسیم؟",
          a: "هر آدرس قدیمی دقیقاً یک مقصد می‌گیرد: صفحه‌ی معادل یا اگر نبود نزدیک‌ترین صفحه‌ی مرتبط. از ریدایرکت دائمی ۳۰۱ و فقط یک گام استفاده کنید و هیچ‌وقت به‌طور پیش‌فرض به صفحه‌ی اصلی نفرستید. در Next.js ریدایرکت‌ها در next.config هستند و از نقشه‌ی آدرس‌ها تولید می‌شوند تا هیچ‌کدام جا نماند.",
          details: [
            {
              kind: "table",
              caption: "نمونه‌ای از نقشه‌ی آدرس‌ها",
              head: ["آدرس قدیمی وردپرس", "آدرس جدید", "ریدایرکت"],
              rows: [
                ["/2023/05/example-post/", "/articles/example-post", "۳۰۱"],
                ["/category/science/", "/topics/science", "۳۰۱"],
                ["/author/jane/", "/authors/jane", "۳۰۱"],
                ["/?p=1234", "/articles/example-post", "۳۰۱ (از روی شناسه‌ی مطلب)"],
              ],
            },
            {
              kind: "code",
              lang: "ts",
              text: `// next.config.ts: redirects generated from the URL map
import type { NextConfig } from "next";
import { urlMap } from "./redirects";

const config: NextConfig = {
  async redirects() {
    return urlMap.map(([from, to]) => ({ source: from, destination: to, permanent: true }));
  },
};

export default config;`,
            },
          ],
        },
        {
          q: "مطلب‌ها، برچسب‌ها، نویسنده‌ها و رسانه را چطور منتقل کنیم؟",
          a: `از وردپرس خروجی بگیرید، به مدل محتوای جدید تبدیل کنید و با یک اسکریپت تکرارپذیر وارد کنید تا بتوان مهاجرت را تا درست شدن دوباره اجرا کرد. در پایگاه علمی خبری دانه ${nFa(dane.migratedPosts)} مطلب، ${nFa(dane.tags)} برچسب و ${nFa(dane.authors)} نویسنده با روابطشان به Payload CMS منتقل شد.`,
          details: [
            { kind: "p", text: "اسکریپت تکرارپذیر از اجرای اول مهم‌تر است. محتوا هیچ‌وقت تمیز نیست: مطلب‌ها تصویر گم‌شده، لینک داخلی شکسته و دسته‌بندی ناهماهنگ دارند. اجرای مکرر مهاجرت روی یک پایگاه داده‌ی آزمایشی باعث می‌شود این‌ها را در اسکریپت اصلاح کنید، نه دستی." },
            { kind: "links", items: [{ label: "نمونه‌کار: پایگاه علمی خبری دانه", href: "/work/dane-news" }] },
          ],
        },
        {
          q: "چرا طبقه‌بندی را قبل از مهاجرت مرتب کنیم؟",
          a: `طبقه‌بندی شلوغی که بدون تغییر منتقل شود در سایت جدید هم شلوغ می‌ماند. در دانه ${nFa(dane.categoriesBefore)} دسته و ${nFa(dane.tags)} برچسب پیش از انتقال به ${nFa(dane.categoriesAfter)} دسته و ${nFa(dane.topics)} موضوع تبدیل شد که برای خواننده و موتور جست‌وجو ساده‌تر است.`,
          details: [
            { kind: "p", text: "وقتی دسته‌ها و برچسب‌ها ادغام می‌شوند، صفحه‌ی آرشیو قدیمی‌شان هم ریدایرکت می‌خواهد. برای هر دسته و برچسب قدیمی از همان ابتدا و در نقشه‌ی آدرس‌ها مشخص کنید به کجا می‌رود (دسته‌ی جدید، موضوع یا نزدیک‌ترین فهرست مطلب)، نه بعد از انتشار." },
          ],
        },
        {
          q: "عنوان، توضیح و داده‌ی ساختاریافته چه می‌شود؟",
          a: "عنوان و توضیح متای صفحه‌هایی را که همین حالا رتبه دارند نگه دارید مگر دلیلی برای تغییر داشته باشید، یک آدرس canonical برای هر صفحه بگذارید و داده‌ی ساختاریافته را منتقل کنید. اگر عنوان و آدرس یک صفحه‌ی رتبه‌دار را در یک انتشار با هم عوض کنید، تشخیص علت افت سخت می‌شود.",
          details: [
            {
              kind: "steps",
              items: [
                "عنوان و توضیح صفحه‌های ترافیک‌آور را دوباره استفاده کنید",
                "یک آدرس canonical برای هر صفحه، منطبق بر آدرس جدید",
                "داده‌ی ساختاریافته (Article، Breadcrumb، Organization) را بازسازی کنید",
                "ساختار عنوان‌ها و متن اصلی صفحه‌های کلیدی را نگه دارید",
                "متن جایگزین تصویر و نام فایل‌ها را تا جای ممکن حفظ کنید",
              ],
            },
          ],
        },
        {
          q: "با نقشه‌ی سایت و Search Console چه کنیم؟",
          a: "نقشه‌ی سایت جدیدی بسازید که فقط آدرس‌های نهایی را با تاریخ‌های واقعی آخرین تغییر فهرست کند و همان روز انتشار در Search Console ثبت کنید. دارایی قبلی را نگه دارید، گزارش Pages را برای خطا ببینید و با بازرسی آدرس روی صفحه‌های مهم مطمئن شوید گوگل ریدایرکت‌ها را می‌بیند.",
          details: [
            {
              kind: "code",
              lang: "ts",
              text: `// app/sitemap.ts
import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getAllArticles();
  return articles.map((a) => ({
    url: \`https://example.com/articles/\${a.slug}\`,
    lastModified: a.updatedAt, // the real update date, never the build time
  }));
}`,
            },
          ],
        },
        {
          q: "روز انتشار و ماه اول چه چیزهایی را باید بررسی کرد؟",
          a: "روز انتشار هر آدرس قدیمی را با نقشه‌ی ریدایرکت آزمایش کنید، مطمئن شوید سایت دیگر از موتور جست‌وجو بسته نیست و نقشه‌ی سایت را ثبت کنید. در هفته‌های اول خطاهای ۴۰۴، تعداد صفحه‌های ایندکس‌شده، نمایش و کلیک را ببینید و جاهای خالی نقشه‌ی ریدایرکت را فوراً پر کنید.",
          details: [
            {
              kind: "steps",
              items: [
                "فهرست آدرس‌های قدیمی را خزش کنید و ببینید هر کدام با یک ۳۰۱ به صفحه‌ی ۲۰۰ می‌رسد",
                "هر noindex یا مسدودسازی robots باقی‌مانده از سایت آزمایشی را بردارید",
                "نقشه‌ی سایت جدید را ثبت کنید",
                "در ابتدا هر روز Search Console را ببینید: پوشش، ۴۰۴ و نمایش",
                "هر ریدایرکت جاافتاده را درست و دوباره آزمایش کنید",
              ],
            },
          ],
        },
        {
          q: "مهاجرت‌ها بیشتر چه اشتباه‌هایی می‌کنند؟",
          a: "ریدایرکت همه‌چیز به صفحه‌ی اصلی، زنجیره‌ی دو یا چند ریدایرکت، ریدایرکت موقت (۳۰۲) به‌جای دائمی، فراموش کردن تصویرها و فایل‌ها، رها کردن مسدودسازی سایت آزمایشی و عوض کردن همه‌ی آدرس‌ها و عنوان‌ها در یک انتشار. همه با نقشه‌ی آدرس‌ها و یک خزش آزمایشی قابل پیشگیری‌اند.",
          details: [
            {
              kind: "steps",
              items: [
                "ریدایرکت انبوه آدرس‌های قدیمی به صفحه‌ی اصلی",
                "زنجیره‌ی ریدایرکت به‌جای یک گام",
                "ریدایرکت ۳۰۲ در جایی که ۳۰۱ لازم بود",
                "ریدایرکت‌های جاافتاده برای تصویر، PDF و صفحه‌های آرشیو",
                "مسدودسازی noindex یا robots سایت آزمایشی که بعد از انتشار مانده",
                "عوض کردن آدرس‌ها، عنوان‌ها و محتوا همه در یک انتشار",
              ],
            },
          ],
        },
        {
          q: "مهاجرت دانه در عدد چه بود؟",
          a: `پایگاه علمی خبری دانه از وردپرس به پلتفرم اختصاصی Next.js و Payload CMS منتقل شد: ${nFa(dane.migratedPosts)} مطلب، ${nFa(dane.categoriesBefore)} دسته، ${nFa(dane.tags)} برچسب و ${nFa(dane.authors)} نویسنده منتقل شد، طبقه‌بندی به ${nFa(dane.categoriesAfter)} دسته و ${nFa(dane.topics)} موضوع بازطراحی شد و ${nFa(dane.redirects)} ریدایرکت دائمی گذاشتیم تا هیچ لینک قدیمی نشکند.`,
          details: [{ kind: "links", items: [{ label: "نمونه‌کار: پایگاه علمی خبری دانه", href: "/work/dane-news" }] }],
        },
        {
          q: "بلونا در مهاجرت چطور کمک می‌کند؟",
          a: "با بررسی رایگان رشد شروع می‌کنیم: سایت فعلی، آدرس‌ها و ریسک‌ها را می‌خوانیم و برای مهاجرت قیمت قطعی و مکتوب می‌دهیم. سایت در تمام مدت آنلاین می‌ماند و پایش بعد از انتشار جزو کار است.",
          details: [{ kind: "links", items: [{ label: "بازطراحی سایت و انتقال از وردپرس", href: "/services/website-design/redesign" }, { label: "رزرو بررسی رایگان رشد", href: "/contact?need=web" }] }],
        },
      ],
    },
  },

  // ======================================================================================= store builder vs custom
  {
    kind: "guide",
    slug: "custom-vs-store-builder",
    pillar: "website-design",
    need: "web",
    status: "published",
    updated: UPDATED,
    author: BAZDAR,
    needs: [],
    projects: ["sabzino", "mojasame-saidi", "nira-perfume", "elm-kala"],
    guides: ["website-design-cost", "nextjs-seo-checklist"],
    en: {
      metaTitle: "Custom store or store builder? A buyer's guide",
      metaDescription: "Custom online store or store builder? A table comparing cost, speed, design, features, SEO and ownership, when each is right, and examples from four stores we built.",
      eyebrow: "Guide",
      h1: "Custom **online store or store builder?**",
      definition:
        "A store builder is a ready-made platform where you rent a shop and pick a template. A custom online store is built around how you sell, with its own design, code and data. Neither is better in general: the right one depends on your products, your volume and how much your buying experience matters.",
      answers: [
        {
          q: "Custom online store or store builder: what is the real difference?",
          a: "With a store builder you rent a platform: it is quick to open, but you work within its templates and rules. With a custom store you own the code and design, so it can fit your buying path exactly, at the cost of a bigger start. The decision is flexibility and ownership against speed and a lower start.",
          details: [
            {
              kind: "table",
              caption: "Store builder compared with a custom online store",
              head: ["Criterion", "Store builder", "Custom store"],
              rows: [
                ["Time to open", "Days to weeks", "Weeks to months, depending on scope"],
                ["Starting cost", "Lower", "Higher, with a fixed quote"],
                ["Running cost", "Subscription and extra plugins", "Hosting and maintenance"],
                ["Design", "Limited to the template", "Built around your brand and buying path"],
                ["Special features", "Depend on available plugins", "Whatever the business needs"],
                ["Speed", "Depends on the platform and plugins", "Planned from the start"],
                ["SEO control", "Depends on the platform", "Full control of structure and metadata"],
                ["Ownership", "Depends on the platform's terms", "Code and data are yours"],
              ],
            },
          ],
        },
        {
          q: "When is a store builder the right choice?",
          a: "When you are testing a new product, selling a small catalogue of standard items, have a small budget or need to open this month. A store builder gets you selling quickly, and you can move to a custom store later once you know what your customers actually need.",
          details: [
            {
              kind: "steps",
              items: [
                "You are validating a product and want to sell fast",
                "A small catalogue of standard products",
                "A limited budget for the first launch",
                "No need for features that a plugin cannot give",
              ],
            },
          ],
        },
        {
          q: "When is a custom online store worth it?",
          a: "When the buying experience is part of what you sell, when you need features a template does not offer (guided buying, custom orders, special payment or admin flows), when speed and SEO are central, or when you want to own the code and data. A premium brand and a complex catalogue are typical reasons.",
          details: [
            {
              kind: "steps",
              items: [
                "The brand needs a distinctive, premium look",
                "Guided buying or consultation before purchase",
                "Custom orders, such as made-to-order products for companies",
                "Local payment and admin flows that plugins do not cover",
                "Long-term SEO and speed targets",
                "Ownership of code and customer data",
              ],
            },
          ],
        },
        {
          q: "What drives the cost of a custom store?",
          a: "Mostly scope: the number of product and page types, payment and shipping integrations, customer accounts, the admin panel, content and photography, and the design. We do not publish a fixed price, because two stores of the same size can differ by a large factor; you get a fixed quote after the free audit.",
          details: [{ kind: "links", items: [{ label: "Website design cost in 2026: a guide", href: "/guides/website-design-cost" }] }],
        },
        {
          q: "What does a custom store cost to run after launch?",
          a: "Domain, hosting and any paid services the store uses, such as email delivery or payment fees, plus maintenance for updates, monitoring and small changes. Ask any agency to list these separately from the build price, so you can compare running costs against a store builder's subscription.",
        },
        {
          q: "What does SEO look like for each?",
          a: "Both can rank, but a custom store gives you full control of category structure, URLs, metadata and Product structured data, and keeps pages fast. On a store builder you work within what the platform exposes. Either way, a clear category hierarchy and unique page titles matter most.",
          details: [{ kind: "links", items: [{ label: "SEO services", href: "/services/seo" }, { label: "Guide: Next.js SEO checklist", href: "/guides/nextjs-seo-checklist" }] }],
        },
        {
          q: "What did we build for Sabzino and Mojasame Saidi?",
          a: "Sabzino, a social enterprise, wanted a real store: we built a responsive cart, accounts, checkout, Zarinpal payments and an independent admin panel. Mojasame Saidi needed a premium, mobile-first, SEO-focused store for handmade sculpture, with a persistent cart, validated checkout forms and a Prisma and PostgreSQL data layer.",
          details: [{ kind: "links", items: [{ label: "Sabzino", href: "/work/sabzino" }, { label: "Mojasame Saidi", href: "/work/mojasame-saidi" }] }],
        },
        {
          q: "What did we build for Nira Perfume and Elm-Kala?",
          a: "Nira sells original perfume and makes custom perfume for companies, so we built a brand-led storefront with a corporate perfume section, gallery pages, search and a cart. Elm-Kala sells lab, robotics and classroom equipment to people who often do not know what fits, so it is a guided store with use-case guidance and a consultation path.",
          details: [{ kind: "links", items: [{ label: "Nira Perfume", href: "/work/nira-perfume" }, { label: "Elm-Kala", href: "/work/elm-kala" }] }],
        },
        {
          q: "How do you decide? A short checklist",
          a: "Answer five questions: is the buying experience part of your brand, do you need a feature a plugin cannot give, how much do speed and SEO matter, how long will you keep this store, and who must own the code. Mostly yes means custom; mostly no means a store builder is a sensible start.",
          details: [
            {
              kind: "steps",
              items: [
                "Is the buying experience part of what makes your brand special?",
                "Do you need a feature no ready-made plugin provides?",
                "Are speed and search visibility central to your growth?",
                "Will you run this store for several years?",
                "Do you want to own the code, design and customer data?",
              ],
            },
          ],
        },
        {
          q: "Can you start with a store builder and move to custom later?",
          a: "Yes, and it is often sensible. Start on a store builder to learn what customers buy, then move to a custom store when the limits start to cost you. Plan the move like any migration: map every product and category URL and add permanent redirects so search rankings carry over.",
          details: [{ kind: "links", items: [{ label: "Guide: migrate without losing SEO", href: "/guides/migrate-wordpress-to-nextjs" }] }],
        },
        {
          q: "How do I get a quote for a custom store?",
          a: "Book the free growth audit. We look at your products and how you sell, tell you honestly whether a custom store or a builder fits, and, if custom fits, give you a fixed quote in writing with scope, price and timeline.",
          details: [{ kind: "links", items: [{ label: "E-commerce website design", href: "/services/website-design/ecommerce" }, { label: "Book the free growth audit", href: "/contact?need=web" }] }],
        },
      ],
    },
    fa: {
      metaTitle: "فروشگاه‌ساز یا فروشگاه اینترنتی اختصاصی؟",
      metaDescription: "فروشگاه‌ساز یا فروشگاه اینترنتی اختصاصی: جدول مقایسه‌ی هزینه، سرعت، طراحی، امکانات، سئو و مالکیت، اینکه هر کدام کی درست است و نمونه از چهار فروشگاه ساخته‌ی ما.",
      eyebrow: "راهنما",
      h1: "فروشگاه‌ساز یا **فروشگاه اینترنتی اختصاصی؟**",
      definition:
        "فروشگاه‌ساز پلتفرم آماده‌ای است که در آن فروشگاهی اجاره می‌کنید و یک قالب برمی‌دارید. فروشگاه اینترنتی اختصاصی حول شیوه‌ی فروش شما با طراحی، کد و داده‌ی خودش ساخته می‌شود. هیچ‌کدام به‌طور کلی بهتر نیست: انتخاب درست به محصولات، حجم فروش و اهمیت تجربه‌ی خرید برای شما بستگی دارد.",
      answers: [
        {
          q: "فروشگاه‌ساز یا فروشگاه اینترنتی اختصاصی: فرق واقعی چیست؟",
          a: "در فروشگاه‌ساز پلتفرمی را اجاره می‌کنید: سریع باز می‌شود ولی در چارچوب قالب‌ها و قواعد آن کار می‌کنید. در فروشگاه اختصاصی کد و طراحی مال شماست و می‌تواند دقیقاً با مسیر خرید شما بخواند، به قیمت شروع بزرگ‌تر. تصمیم میان انعطاف و مالکیت از یک طرف و سرعت و شروع ارزان‌تر از طرف دیگر است.",
          details: [
            {
              kind: "table",
              caption: "مقایسه‌ی فروشگاه‌ساز آماده با فروشگاه اینترنتی اختصاصی",
              head: ["معیار", "فروشگاه‌ساز", "فروشگاه اختصاصی"],
              rows: [
                ["زمان باز شدن", "چند روز تا چند هفته", "چند هفته تا چند ماه، بسته به دامنه"],
                ["هزینه‌ی شروع", "کمتر", "بیشتر، با قیمت قطعی"],
                ["هزینه‌ی جاری", "اشتراک و افزونه‌های اضافه", "هاست و نگهداری"],
                ["طراحی", "محدود به قالب", "حول برند و مسیر خرید شما"],
                ["امکانات خاص", "وابسته به افزونه‌های موجود", "هر چیزی که کسب‌وکار نیاز دارد"],
                ["سرعت", "وابسته به پلتفرم و افزونه‌ها", "از ابتدا برنامه‌ریزی می‌شود"],
                ["کنترل سئو", "وابسته به پلتفرم", "کنترل کامل روی ساختار و متادیتا"],
                ["مالکیت", "وابسته به شرایط پلتفرم", "کد و داده مال شماست"],
              ],
            },
          ],
        },
        {
          q: "فروشگاه‌ساز کی انتخاب درستی است؟",
          a: "وقتی محصول تازه‌ای را آزمایش می‌کنید، فهرست کوچکی از اقلام استاندارد می‌فروشید، بودجه‌ی کمی دارید یا باید همین ماه باز کنید. فروشگاه‌ساز زود به فروش می‌رساند و وقتی فهمیدید مشتری‌ها واقعاً چه لازم دارند، می‌توانید بعداً به فروشگاه اختصاصی بروید.",
          details: [
            {
              kind: "steps",
              items: [
                "محصول را اعتبارسنجی می‌کنید و می‌خواهید سریع بفروشید",
                "فهرست کوچکی از محصولات استاندارد",
                "بودجه‌ی محدود برای اولین راه‌اندازی",
                "نیازی به امکاناتی که افزونه نمی‌دهد ندارید",
              ],
            },
          ],
        },
        {
          q: "فروشگاه اختصاصی کی می‌ارزد؟",
          a: "وقتی تجربه‌ی خرید بخشی از چیزی است که می‌فروشید، به امکاناتی نیاز دارید که قالب نمی‌دهد (خرید هدایت‌شده، سفارش اختصاصی، جریان‌های ویژه‌ی پرداخت یا مدیریت)، سرعت و سئو برایتان مرکزی است یا می‌خواهید کد و داده مال خودتان باشد. برند پریمیوم و کاتالوگ پیچیده دو دلیل معمول‌اند.",
          details: [
            {
              kind: "steps",
              items: [
                "برند به ظاهر متمایز و پریمیوم نیاز دارد",
                "خرید هدایت‌شده یا مشاوره پیش از خرید",
                "سفارش اختصاصی، مثل محصول سفارشی برای شرکت‌ها",
                "جریان‌های پرداخت و مدیریت محلی که افزونه‌ها پوشش نمی‌دهند",
                "هدف بلندمدت سئو و سرعت",
                "مالکیت کد و داده‌ی مشتری",
              ],
            },
          ],
        },
        {
          q: "هزینه‌ی فروشگاه اختصاصی را چه چیزی تعیین می‌کند؟",
          a: "بیشتر از همه دامنه‌ی کار: تعداد نوع محصول و صفحه، اتصال به پرداخت و ارسال، حساب مشتری، پنل مدیریت، محتوا و عکاسی و طراحی. قیمت ثابتی منتشر نمی‌کنیم، چون دو فروشگاه هم‌اندازه می‌توانند چند برابر فرق داشته باشند؛ بعد از بررسی رایگان قیمت قطعی می‌گیرید.",
          details: [{ kind: "links", items: [{ label: "راهنمای قیمت طراحی سایت ۱۴۰۵", href: "/guides/website-design-cost" }] }],
        },
        {
          q: "فروشگاه اختصاصی بعد از راه‌اندازی چه هزینه‌ای دارد؟",
          a: "دامنه، هاست و سرویس‌های پولی‌ای که فروشگاه استفاده می‌کند، مثل ارسال ایمیل یا کارمزد پرداخت، به‌علاوه‌ی نگهداری برای به‌روزرسانی، پایش و تغییرات کوچک. از هر آژانسی بخواهید این‌ها را جدا از قیمت ساخت بنویسد تا هزینه‌ی جاری را با اشتراک فروشگاه‌ساز مقایسه کنید.",
        },
        {
          q: "سئو در هر کدام چطور است؟",
          a: "هر دو می‌توانند رتبه بگیرند، ولی فروشگاه اختصاصی کنترل کامل روی ساختار دسته‌ها، آدرس‌ها، متادیتا و داده‌ی ساختاریافته‌ی Product می‌دهد و صفحه‌ها را سریع نگه می‌دارد. در فروشگاه‌ساز در چارچوب چیزی کار می‌کنید که پلتفرم اجازه می‌دهد. در هر دو، سلسله‌مراتب روشن دسته‌ها و عنوان‌های یکتا از همه مهم‌تر است.",
          details: [{ kind: "links", items: [{ label: "خدمات سئو سایت", href: "/services/seo" }, { label: "راهنما: چک‌لیست سئو Next.js", href: "/guides/nextjs-seo-checklist" }] }],
        },
        {
          q: "برای سبزینو و مجسمه سعیدی چه ساختیم؟",
          a: "سبزینو، یک کسب‌وکار اجتماعی، فروشگاه واقعی می‌خواست: سبد خرید واکنش‌گرا، حساب مشتری، تسویه‌حساب، پرداخت زرین‌پال و پنل مدیریت مستقل ساختیم. مجسمه سعیدی فروشگاه پریمیوم، موبایل‌محور و سئومحور برای مجسمه‌ی دست‌ساز می‌خواست، با سبد خرید پایدار، فرم‌های اعتبارسنجی‌شده‌ی خرید و لایه‌ی داده‌ی Prisma و PostgreSQL.",
          details: [{ kind: "links", items: [{ label: "سبزینو", href: "/work/sabzino" }, { label: "مجسمه سعیدی", href: "/work/mojasame-saidi" }] }],
        },
        {
          q: "برای عطر نیرا و علم‌کالا چه ساختیم؟",
          a: "نیرا عطر اورجینال می‌فروشد و برای شرکت‌ها عطر اختصاصی می‌سازد؛ پس ویترین برندمحور با بخش عطر سازمانی، صفحه‌های گالری، جست‌وجو و سبد خرید ساختیم. علم‌کالا تجهیزات آزمایشگاه، رباتیک و کلاس را به کسانی می‌فروشد که اغلب نمی‌دانند چه چیزی مناسب است؛ فروشگاهی هدایت‌شده با راهنمای کاربرد و مسیر مشاوره است.",
          details: [{ kind: "links", items: [{ label: "عطر نیرا", href: "/work/nira-perfume" }, { label: "علم‌کالا", href: "/work/elm-kala" }] }],
        },
        {
          q: "چطور تصمیم بگیریم؟ یک چک‌لیست کوتاه",
          a: "به پنج سؤال جواب بدهید: تجربه‌ی خرید بخشی از برند شماست؟ به امکانی نیاز دارید که افزونه نمی‌دهد؟ سرعت و سئو چقدر مهم‌اند؟ این فروشگاه را چند سال نگه می‌دارید؟ و کد را چه کسی باید داشته باشد؟ بیشتر «بله» یعنی اختصاصی و بیشتر «نه» یعنی فروشگاه‌ساز شروع معقولی است.",
          details: [
            {
              kind: "steps",
              items: [
                "آیا تجربه‌ی خرید بخشی از چیزی است که برند شما را خاص می‌کند؟",
                "آیا به امکانی نیاز دارید که هیچ افزونه‌ی آماده‌ای نمی‌دهد؟",
                "آیا سرعت و دیده شدن در جست‌وجو برای رشد شما مرکزی است؟",
                "آیا چند سال این فروشگاه را اداره می‌کنید؟",
                "آیا می‌خواهید کد، طراحی و داده‌ی مشتری مال شما باشد؟",
              ],
            },
          ],
        },
        {
          q: "می‌شود با فروشگاه‌ساز شروع کرد و بعداً اختصاصی شد؟",
          a: "بله، و اغلب معقول است. با فروشگاه‌ساز شروع کنید تا بفهمید مشتری‌ها چه می‌خرند و وقتی محدودیت‌ها هزینه ساختند به فروشگاه اختصاصی بروید. انتقال را مثل هر مهاجرتی برنامه‌ریزی کنید: آدرس هر محصول و دسته را نگاشت و ریدایرکت دائمی بگذارید تا رتبه‌ی جست‌وجو منتقل شود.",
          details: [{ kind: "links", items: [{ label: "راهنما: انتقال بدون افت سئو", href: "/guides/migrate-wordpress-to-nextjs" }] }],
        },
        {
          q: "قیمت فروشگاه اختصاصی را چطور بگیرم؟",
          a: "بررسی رایگان رشد را رزرو کنید. محصولات و شیوه‌ی فروش شما را می‌خوانیم، صادقانه می‌گوییم فروشگاه اختصاصی مناسب است یا فروشگاه‌ساز، و اگر اختصاصی مناسب بود، پیشنهاد قیمت قطعی و مکتوب با دامنه، قیمت و زمان‌بندی می‌گیرید.",
          details: [{ kind: "links", items: [{ label: "طراحی سایت فروشگاهی", href: "/services/website-design/ecommerce" }, { label: "رزرو بررسی رایگان رشد", href: "/contact?need=web" }] }],
        },
      ],
    },
  },

  // ======================================================================================= bilingual, hreflang and RTL
  {
    kind: "guide",
    slug: "bilingual-website-hreflang-rtl",
    pillar: "website-design",
    need: "web",
    status: "published",
    updated: UPDATED,
    author: BAZDAR,
    needs: [],
    projects: ["asa-study"],
    guides: ["nextjs-seo-checklist", "migrate-wordpress-to-nextjs"],
    en: {
      metaTitle: "Bilingual Persian-English website: hreflang, RTL",
      metaDescription: "Persian–English bilingual website: how to build one, with URL structure, hreflang with examples, true right-to-left layout, common mistakes, and the ASA-Study example.",
      eyebrow: "Guide",
      h1: "Persian–English bilingual website: **hreflang and RTL done right**",
      definition:
        "A bilingual website is two complete versions of the same site, each with its own addresses, translation and keywords. For Persian and English that also means a true right-to-left layout for Persian. Done badly it confuses visitors and search engines; done well, each language ranks on its own.",
      answers: [
        {
          q: "How should URLs be structured on a Persian–English bilingual website?",
          a: "Give each language its own addresses: either a path prefix (/ for one language and /en for the other), a subdomain or a separate domain. A prefix on one domain is the simplest to run and keeps all links and authority in one place. Avoid one address that switches language with JavaScript, because search engines index addresses.",
          details: [
            {
              kind: "table",
              caption: "Three ways to separate languages",
              head: ["Approach", "Example", "Notes"],
              rows: [
                ["Path prefix", "example.com/ and example.com/en", "Simplest to run; authority stays on one domain"],
                ["Subdomain", "en.example.com", "Treated more like a separate site; more to maintain"],
                ["Separate domain", "example.com and example.ir", "Strongest local signal; the most work and cost"],
              ],
            },
          ],
        },
        {
          q: "What is hreflang and what does a correct setup look like?",
          a: "hreflang tells search engines which page is the equivalent in another language, so a Persian reader is shown the Persian page and an English reader the English one. Every page must list itself and its counterpart, and the counterpart must point back. One version is marked x-default as the fallback.",
          details: [
            {
              kind: "code",
              lang: "html",
              text: `<!-- In the <head> of https://example.com/services (Persian) -->
<link rel="canonical" href="https://example.com/services" />
<link rel="alternate" hreflang="fa" href="https://example.com/services" />
<link rel="alternate" hreflang="en" href="https://example.com/en/services" />
<link rel="alternate" hreflang="x-default" href="https://example.com/services" />

<!-- The English page lists exactly the same four lines,
     with its own canonical: https://example.com/en/services -->`,
            },
            {
              kind: "code",
              lang: "ts",
              text: `// Next.js: the same thing with the metadata API
export const metadata = {
  alternates: {
    canonical: "/services",
    languages: {
      fa: "/services",
      en: "/en/services",
      "x-default": "/services",
    },
  },
};`,
            },
          ],
        },
        {
          q: "Which hreflang mistakes are most common?",
          a: "One-way links (A points to B but B does not point back), a missing self-reference, hreflang pointing to a redirected or noindex page, wrong language codes, and a canonical that points at the other language. Any of these makes search engines ignore the whole set.",
          details: [
            {
              kind: "steps",
              items: [
                "The counterpart page does not link back",
                "A page does not list itself",
                "hreflang URLs that redirect or are blocked",
                "Wrong codes: use fa and en, with regions only if needed",
                "A canonical that points to the other language's page",
              ],
            },
          ],
        },
        {
          q: "What does a real right-to-left (RTL) layout need?",
          a: "More than right-aligned text: the whole layout mirrors, so columns, navigation order, icons and arrows flip; the typeface supports Persian properly; digits follow the language; and spacing is tuned for joined letters. The page also sets lang and dir attributes so browsers and assistive tools behave correctly.",
          details: [
            {
              kind: "steps",
              items: [
                "dir=\"rtl\" and lang=\"fa\" on the document",
                "Mirrored layout, column order and navigation",
                "Arrows and icons that point the right way",
                "A Persian typeface with the weights you need",
                "Persian digits in Persian text",
                "No letter-spacing on Persian, which breaks the joins",
              ],
            },
          ],
        },
        {
          q: "Which Persian typography details are easy to miss?",
          a: "The half-space (zero-width non-joiner) inside compound words, the Persian forms of y and k rather than the Arabic ones, Persian digits, and not tracking out letters. They are small, but readers notice them immediately, and search queries use the correct forms.",
          details: [
            { kind: "p", text: "Use the Persian letters ی and ک, not the Arabic ي and ك, so text matches what people type. Put a zero-width non-joiner in words such as «می‌شود» and «نمونه‌کار». Never apply letter-spacing to Persian text." },
          ],
        },
        {
          q: "How should content be managed in both languages?",
          a: "From one place with one structure, so no page exists in only one language and nothing is forgotten. Give each page a translation status, review translations rather than publishing machine output, and keep a shared list of terms so the same thing is always called the same thing.",
          details: [{ kind: "p", text: "In ASA-Study each university is an independent, localised document, so the English and Persian versions of one university are kept together and edited as a pair." }],
        },
        {
          q: "Does each language need its own SEO?",
          a: "Yes. People do not search in two languages the same way, so each version needs its own keyword research, titles, descriptions and headings, not a literal translation. Both versions are indexed separately, and hreflang connects them.",
          details: [{ kind: "links", items: [{ label: "SEO services", href: "/services/seo" }] }],
        },
        {
          q: "How did ASA-Study handle two languages?",
          a: "International students choosing a university in Iran have to compare cities, universities and programmes in their own language. We built English and Persian routing with complete RTL behaviour, a searchable university directory with a city filter, data-driven profiles and a CMS-ready structure where each university is a localised document.",
          details: [{ kind: "links", items: [{ label: "Case study: ASA-Study", href: "/work/asa-study" }] }],
        },
        {
          q: "How do you test that a bilingual site is correct?",
          a: "Crawl the site and check that every page returns 200, every hreflang pair links both ways, canonicals point at themselves and the language switch goes to the same page in the other language. Then read both versions as a reader would, on a phone.",
          details: [
            {
              kind: "steps",
              items: [
                "Crawl all URLs: status 200, no redirect chains",
                "Check hreflang reciprocity for every page pair",
                "Confirm each canonical points to its own page",
                "Test the language switch lands on the equivalent page",
                "Review the RTL layout and typography on a phone",
              ],
            },
          ],
        },
        {
          q: "How can Bellona help with a bilingual site?",
          a: "We design and build Persian–English sites with separate URLs, true RTL and correct hreflang, as on this site and on ASA-Study. Start with the free growth audit and you get a fixed quote in writing.",
          details: [{ kind: "links", items: [{ label: "Bilingual website design", href: "/services/website-design/bilingual" }, { label: "Book the free growth audit", href: "/contact?need=web" }] }],
        },
      ],
    },
    fa: {
      metaTitle: "سایت دوزبانه فارسی و انگلیسی: hreflang و RTL",
      metaDescription: "راهنمای ساخت سایت دوزبانه فارسی و انگلیسی: ساختار آدرس‌ها، hreflang با نمونه، چیدمان راست‌به‌چپ واقعی، اشتباه‌های رایج و نمونه‌ی ASA-Study.",
      eyebrow: "راهنما",
      h1: "سایت دوزبانه فارسی و انگلیسی: **hreflang و RTL درست**",
      definition:
        "سایت دوزبانه دو نسخه‌ی کامل از یک سایت است، هر کدام با آدرس، ترجمه و کلمات کلیدی خودش. برای فارسی و انگلیسی یعنی چیدمان راست‌به‌چپ واقعی برای فارسی هم هست. اگر بد انجام شود بازدیدکننده و موتور جست‌وجو را گیج می‌کند؛ اگر درست انجام شود، هر زبان جدا رتبه می‌گیرد.",
      answers: [
        {
          q: "ساختار آدرس در سایت دوزبانه فارسی و انگلیسی چطور باشد؟",
          a: "به هر زبان آدرس جدا بدهید: پیشوند مسیر (/ برای یک زبان و /en برای دیگری)، زیردامنه یا دامنه‌ی جدا. پیشوند روی یک دامنه ساده‌ترین راه برای اداره کردن است و همه‌ی لینک‌ها و اعتبار را یک‌جا نگه می‌دارد. از یک آدرس که با جاوااسکریپت زبان را عوض می‌کند دوری کنید، چون موتور جست‌وجو آدرس‌ها را ایندکس می‌کند.",
          details: [
            {
              kind: "table",
              caption: "سه راه برای جدا کردن زبان‌ها",
              head: ["روش", "نمونه", "نکته"],
              rows: [
                ["پیشوند مسیر", "example.com/ و example.com/en", "ساده‌ترین در اداره؛ اعتبار روی یک دامنه می‌ماند"],
                ["زیردامنه", "en.example.com", "بیشتر شبیه سایت جداست؛ نگهداری بیشتر"],
                ["دامنه‌ی جدا", "example.com و example.ir", "قوی‌ترین سیگنال محلی؛ بیشترین کار و هزینه"],
              ],
            },
          ],
        },
        {
          q: "hreflang چیست و تنظیم درستش چه شکلی است؟",
          a: "hreflang به موتور جست‌وجو می‌گوید کدام صفحه معادل زبان دیگر است تا خواننده‌ی فارسی صفحه‌ی فارسی و خواننده‌ی انگلیسی صفحه‌ی انگلیسی را ببیند. هر صفحه باید خودش و معادلش را فهرست کند و معادل هم باید به آن برگردد. یک نسخه به‌عنوان x-default و پیش‌فرض مشخص می‌شود.",
          details: [
            {
              kind: "code",
              lang: "html",
              text: `<!-- In the <head> of https://example.com/services (Persian) -->
<link rel="canonical" href="https://example.com/services" />
<link rel="alternate" hreflang="fa" href="https://example.com/services" />
<link rel="alternate" hreflang="en" href="https://example.com/en/services" />
<link rel="alternate" hreflang="x-default" href="https://example.com/services" />

<!-- The English page lists exactly the same four lines,
     with its own canonical: https://example.com/en/services -->`,
            },
            {
              kind: "code",
              lang: "ts",
              text: `// Next.js: the same thing with the metadata API
export const metadata = {
  alternates: {
    canonical: "/services",
    languages: {
      fa: "/services",
      en: "/en/services",
      "x-default": "/services",
    },
  },
};`,
            },
          ],
        },
        {
          q: "رایج‌ترین اشتباه‌های hreflang چیست؟",
          a: "لینک یک‌طرفه (الف به ب اشاره می‌کند ولی ب برنمی‌گردد)، نبودن اشاره‌ی صفحه به خودش، hreflang به صفحه‌ای که ریدایرکت یا noindex است، کد زبان اشتباه و canonical که به زبان دیگر اشاره می‌کند. هر کدام باعث می‌شود موتور جست‌وجو کل مجموعه را نادیده بگیرد.",
          details: [
            {
              kind: "steps",
              items: [
                "صفحه‌ی معادل به این صفحه برنمی‌گردد",
                "صفحه خودش را فهرست نکرده",
                "آدرس‌های hreflang که ریدایرکت می‌شوند یا مسدودند",
                "کد اشتباه: fa و en بنویسید و منطقه فقط در صورت نیاز",
                "canonical که به صفحه‌ی زبان دیگر اشاره می‌کند",
              ],
            },
          ],
        },
        {
          q: "چیدمان راست‌به‌چپ (RTL) واقعی چه لازم دارد؟",
          a: "بیشتر از راست‌چین کردن متن: کل چیدمان آینه می‌شود، یعنی ستون‌ها، ترتیب ناوبری، آیکن‌ها و فلش‌ها برعکس می‌شوند؛ فونت فارسی درست پشتیبانی می‌شود؛ ارقام با زبان هماهنگ‌اند و فاصله‌ها برای حروف چسبیده تنظیم می‌شود. صفحه lang و dir هم دارد تا مرورگر و ابزارهای کمکی درست رفتار کنند.",
          details: [
            {
              kind: "steps",
              items: [
                "dir=\"rtl\" و lang=\"fa\" روی سند",
                "چیدمان، ترتیب ستون‌ها و ناوبری آینه‌ای",
                "فلش‌ها و آیکن‌ها در جهت درست",
                "فونت فارسی با وزن‌های لازم",
                "ارقام فارسی در متن فارسی",
                "بدون letter-spacing روی فارسی که اتصال حروف را می‌شکند",
              ],
            },
          ],
        },
        {
          q: "کدام جزئیات تایپوگرافی فارسی راحت از قلم می‌افتد؟",
          a: "نیم‌فاصله (ZWNJ) داخل کلمه‌های مرکب، «ی» و «ک» فارسی به‌جای عربی، ارقام فارسی و کشیده نکردن فاصله‌ی حروف. جزئی‌اند ولی خواننده فوراً می‌بیند و عبارت‌های جست‌وجو هم شکل درست را به کار می‌برند.",
          details: [
            { kind: "p", text: "از حروف فارسی ی و ک استفاده کنید، نه ي و ك عربی، تا متن با چیزی که مردم تایپ می‌کنند یکی باشد. در کلمه‌هایی مثل «می‌شود» و «نمونه‌کار» نیم‌فاصله بگذارید. هیچ‌وقت روی متن فارسی letter-spacing نگذارید." },
          ],
        },
        {
          q: "محتوا در دو زبان چطور مدیریت شود؟",
          a: "از یک جا و با یک ساختار، تا هیچ صفحه‌ای فقط در یک زبان نماند و چیزی فراموش نشود. برای هر صفحه وضعیت ترجمه بگذارید، ترجمه‌ها را بازبینی کنید و خروجی ماشینی را بدون بازبینی منتشر نکنید و فهرست مشترکی از اصطلاح‌ها داشته باشید تا یک چیز همیشه یک اسم داشته باشد.",
          details: [{ kind: "p", text: "در ASA-Study هر دانشگاه یک سند مستقل و بومی‌سازی‌شده است، پس نسخه‌ی فارسی و انگلیسی یک دانشگاه کنار هم نگه داشته و به‌صورت جفت ویرایش می‌شود." }],
        },
        {
          q: "هر زبان سئوی جدا لازم دارد؟",
          a: "بله. مردم دو زبان را یک‌جور جست‌وجو نمی‌کنند، پس هر نسخه تحقیق کلمه، عنوان، توضیح و عنوان‌بندی جدا می‌خواهد، نه ترجمه‌ی تحت‌اللفظی. هر دو نسخه جدا ایندکس می‌شوند و hreflang آن‌ها را به هم وصل می‌کند.",
          details: [{ kind: "links", items: [{ label: "خدمات سئو سایت", href: "/services/seo" }] }],
        },
        {
          q: "ASA-Study دو زبان را چطور مدیریت کرد؟",
          a: "دانشجوهای بین‌المللی که دانشگاه ایران انتخاب می‌کنند باید شهرها، دانشگاه‌ها و رشته‌ها را به زبان خودشان مقایسه کنند. مسیریابی فارسی و انگلیسی با رفتار کامل RTL، فهرست قابل جست‌وجوی دانشگاه‌ها با فیلتر شهر، پروفایل داده‌محور و ساختار آماده‌ی CMS ساختیم که هر دانشگاه یک سند بومی‌سازی‌شده است.",
          details: [{ kind: "links", items: [{ label: "نمونه‌کار: ASA-Study", href: "/work/asa-study" }] }],
        },
        {
          q: "چطور درست بودن سایت دوزبانه را آزمایش کنیم؟",
          a: "سایت را خزش کنید و ببینید هر صفحه ۲۰۰ می‌دهد، هر جفت hreflang دوطرفه است، canonicalها به خودشان اشاره می‌کنند و تغییر زبان به همان صفحه در زبان دیگر می‌رود. بعد هر دو نسخه را مثل یک خواننده روی موبایل بخوانید.",
          details: [
            {
              kind: "steps",
              items: [
                "همه‌ی آدرس‌ها را خزش کنید: وضعیت ۲۰۰ و بدون زنجیره‌ی ریدایرکت",
                "دوطرفه بودن hreflang را برای هر جفت صفحه بررسی کنید",
                "مطمئن شوید هر canonical به صفحه‌ی خودش اشاره می‌کند",
                "تغییر زبان را آزمایش کنید که به صفحه‌ی معادل برسد",
                "چیدمان RTL و تایپوگرافی را روی موبایل بازبینی کنید",
              ],
            },
          ],
        },
        {
          q: "بلونا در سایت دوزبانه چطور کمک می‌کند؟",
          a: "سایت فارسی و انگلیسی را با آدرس جدا، RTL واقعی و hreflang درست طراحی و می‌سازیم، مثل همین سایت و ASA-Study. با بررسی رایگان رشد شروع کنید تا قیمت قطعی و مکتوب بگیرید.",
          details: [{ kind: "links", items: [{ label: "طراحی سایت دوزبانه", href: "/services/website-design/bilingual" }, { label: "رزرو بررسی رایگان رشد", href: "/contact?need=web" }] }],
        },
      ],
    },
  },
];
