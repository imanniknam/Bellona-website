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
const RAZI = "Sina Razi|سینا راضی";

export const guidesA: Spoke[] = [
  // ======================================================================================= migrate WordPress to Next.js
  {
    kind: "guide",
    slug: "migrate-wordpress-to-nextjs",
    pillar: "website-design",
    need: "web",
    status: "published",
    updated: UPDATED,
    author: RAZI,
    needs: [],
    projects: ["dane-news"],
    guides: ["nextjs-seo-checklist", "website-design-cost"],
    en: {
      metaTitle: "Migrate from WordPress to Next.js, keep your SEO",
      metaDescription: "Migrate from WordPress to Next.js without losing traffic: URL map, 301 redirects, taxonomy clean-up, sitemap and monitoring, with the real Dane migration.",
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
      metaDescription: "انتقال سایت از وردپرس به Next.js بی‌آنکه بازدید از دست برود: نقشه‌ی آدرس‌ها، ریدایرکت ۳۰۱، دسته‌بندی، نقشه‌ی سایت و پایش؛ با تجربه‌ی انتقال واقعی دانه.",
      eyebrow: "راهنما",
      h1: "انتقال سایت از وردپرس به نکست جی اس (Next.js) **بدون افت سئو**",
      definition:
        "انتقال از وردپرس به نکست جی اس شیوه‌ی ساخت صفحه‌ها را عوض می‌کند، ولی نباید چیزی را که گوگل از سایت شما می‌شناسد عوض کند. خطر اصلی گم شدن آدرس‌ها، عنوان‌ها و لینک‌هاست؛ پس کار اصلی این است که پیش از انتشار، هر صفحه‌ی قدیمی به یک صفحه‌ی تازه وصل شود و بعد از انتشار ثابت شود چیزی گم نشده است.",
      answers: [
        {
          q: "چرا از وردپرس به Next.js برویم و کی نرویم؟",
          a: "دلیل‌ها سرعت، امنیت و کنترل است: سایت اختصاصی Next.js فقط چیزی را بار می‌کند که لازم دارد، کد شخص ثالث کمتری برای به‌روزرسانی دارد و ساختار و سئو کاملاً دست خودتان است. اگر تیمتان هر روز بی‌برنامه‌نویس چیدمان صفحه‌ها را عوض می‌کند و بودجه‌ی فنی ندارید، این انتقال به کارتان نمی‌آید.",
          details: [
            { kind: "p", text: "وردپرس وقتی انتخاب خوبی است که کارمندان غیرفنی باید خودشان صفحه بسازند، بودجه کم است یا سایت ساده است. هزینه‌ها بعدها خودشان را نشان می‌دهند: افزونه‌هایی که مدام به‌روزرسانی می‌خواهند، قالب‌هایی که دست طراحی را می‌بندند و صفحه‌هایی که بی‌دلیل کندند." },
            { kind: "p", text: "نکست جی اس صفحه‌ها را روی سرور می‌سازد، پس متن کامل در همان پاسخ اول می‌رسد و موتورهای جست‌وجو و دستیارهای هوش مصنوعی راحت آن را می‌خوانند. امکان ویرایش محتوا هم از دست نمی‌رود: یک CMS هدلس مثل Payload پشت نکست جی اس قرار می‌گیرد و، مثل پایگاه علمی‌خبری دانه، ابزار ویرایش را در اختیار تحریریه یا تیم بازاریابی می‌گذارد." },
          ],
        },
        {
          q: "پیش از شروع چه چیزهایی را باید فهرست کرد؟",
          a: "هر چیزی که گوگل یا بازدیدکننده‌ها همین الان به آن تکیه دارند: همه‌ی آدرس‌ها، همه‌ی انواع محتوا، دسته‌ها و برچسب‌ها، نویسنده‌ها، تصویرها و فایل‌ها، فرم‌ها، عنوان و توضیح متای صفحه‌ها، ریدایرکت‌های موجود و صفحه‌هایی که بیشترین بازدید را دارند. این فهرست حکم قراردادی را دارد که سایت تازه باید به آن پایبند بماند.",
          details: [
            {
              kind: "steps",
              items: [
                "همه‌ی آدرس‌ها را از نقشه‌ی سایت و یک بار خزش (crawl) استخراج کنید",
                "انواع محتوا را فهرست کنید: نوشته، صفحه، نوع سفارشی",
                "طبقه‌بندی را فهرست کنید: دسته، برچسب، نویسنده",
                "از رسانه‌ها خروجی بگیرید و یادداشت کنید هر تصویر کجا به کار رفته",
                "عنوان، توضیح و canonical صفحه‌های اصلی را ثبت کنید",
                "فرم‌ها، اتصال‌ها و ردیابی‌هایی را که باید کار کنند یادداشت کنید",
                "صفحه‌های پربازدید و پرلینک را از Search Console پیدا کنید",
              ],
            },
          ],
        },
        {
          q: "چک‌لیست کامل انتقال چیست؟",
          a: "ده قدم: فهرست‌برداری، نقشه‌ی آدرس‌ها، ساختار تازه، انتقال محتوا، مرتب کردن دسته‌بندی، ریدایرکت ۳۰۱، عنوان و متادیتا، بازبینی روی سایت آزمایشی، انتشار و پایش. هر قدم مسئول و آزمون خودش را دارد و تا نقشه‌ی ریدایرکت روی فهرست واقعی آدرس‌های قدیمی آزموده نشود، چیزی منتشر نمی‌شود.",
          details: [
            {
              kind: "steps",
              items: [
                "فهرست‌برداری از همه‌ی آدرس‌ها، انواع محتوا و طبقه‌بندی",
                "ساخت نقشه‌ی آدرس‌ها: آدرس قدیمی به آدرس جدید",
                "طراحی ساختار و قالب‌های صفحه‌ی تازه",
                "انتقال محتوا همراه با برچسب‌ها، نویسنده‌ها و رسانه",
                "مرتب کردن دسته‌بندی پیش از انتقال",
                "نوشتن ریدایرکت دائمی (۳۰۱) برای هر آدرس قدیمی",
                "انتقال عنوان‌ها، توضیح‌ها و داده‌ی ساختاریافته",
                "بازبینی روی سایت آزمایشی که موتورهای جست‌وجو به آن دسترسی ندارند",
                "انتشار و ثبت نقشه‌ی سایت جدید در Search Console",
                "پایش خطاهای ۴۰۴، نمایه‌شدن صفحه‌ها و بازدید در هفته‌های اول",
              ],
            },
          ],
        },
        {
          q: "نقشه‌ی آدرس‌ها و ریدایرکت ۳۰۱ را چطور بنویسیم؟",
          a: "هر آدرس قدیمی دقیقاً یک مقصد دارد: صفحه‌ی معادلش، یا اگر نبود، نزدیک‌ترین صفحه‌ی مرتبط. ریدایرکت دائمی ۳۰۱ بگذارید، فقط در یک گام، و هیچ‌وقت همه را بی‌حساب به صفحه‌ی اصلی نفرستید. در Next.js ریدایرکت‌ها در next.config قرار می‌گیرند و از روی نقشه‌ی آدرس‌ها ساخته می‌شوند تا هیچ‌کدام جا نماند.",
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
          q: "مطلب‌ها، برچسب‌ها، نویسنده‌ها و رسانه‌ها را چطور منتقل کنیم؟",
          a: `از وردپرس خروجی بگیرید، آن را به مدل محتوای تازه تبدیل کنید و با اسکریپتی که بارها قابل اجراست وارد کنید تا انتقال را تا درست شدن کامل تکرار کنید. در پایگاه علمی‌خبری دانه ${nFa(dane.migratedPosts)} مطلب، ${nFa(dane.tags)} برچسب و ${nFa(dane.authors)} نویسنده با همه‌ی ارتباط‌هایشان به Payload CMS منتقل شدند.`,
          details: [
            { kind: "p", text: "اسکریپتی که بشود دوباره اجرایش کرد از اجرای اول مهم‌تر است. محتوا هیچ‌وقت تمیز نیست: تصویر گم‌شده، لینک داخلی شکسته و دسته‌بندی ناهماهنگ همیشه پیدا می‌شود. اجرای مکرر انتقال روی پایگاه داده‌ی آزمایشی کمک می‌کند این‌ها را در خود اسکریپت درست کنید، نه دستی." },
            { kind: "links", items: [{ label: "نمونه‌کار: پایگاه علمی‌خبری دانه", href: "/work/dane-news" }] },
          ],
        },
        {
          q: "چرا دسته‌بندی را پیش از انتقال مرتب کنیم؟",
          a: `دسته‌بندی شلوغی که دست‌نخورده منتقل شود، در سایت تازه هم شلوغ می‌ماند. در دانه ${nFa(dane.categoriesBefore)} دسته و ${nFa(dane.tags)} برچسب پیش از انتقال به ${nFa(dane.categoriesAfter)} دسته و ${nFa(dane.topics)} موضوع رسید که هم برای خواننده ساده‌تر است و هم برای موتور جست‌وجو.`,
          details: [
            { kind: "p", text: "وقتی دسته‌ها و برچسب‌ها با هم ادغام می‌شوند، صفحه‌ی بایگانی قدیمی‌شان هم ریدایرکت لازم دارد. برای هر دسته و برچسب قدیمی از همان اول، در نقشه‌ی آدرس‌ها، مشخص کنید به کجا برود (دسته‌ی تازه، موضوع یا نزدیک‌ترین فهرست مطلب)، نه پس از انتشار." },
          ],
        },
        {
          q: "عنوان، توضیح و داده‌ی ساختاریافته چه می‌شوند؟",
          a: "عنوان و توضیح متای صفحه‌هایی را که همین الان رتبه دارند نگه دارید، مگر دلیل روشنی برای تغییرشان داشته باشید؛ برای هر صفحه یک آدرس canonical بگذارید و داده‌ی ساختاریافته را منتقل کنید. اگر عنوان و آدرس یک صفحه‌ی رتبه‌دار را هم‌زمان عوض کنید، پیدا کردن علت افت سخت می‌شود.",
          details: [
            {
              kind: "steps",
              items: [
                "عنوان و توضیح صفحه‌های پربازدید را دوباره به کار ببرید",
                "برای هر صفحه یک آدرس canonical، مطابق آدرس تازه",
                "داده‌ی ساختاریافته (Article، Breadcrumb، Organization) را بازسازی کنید",
                "ساختار عنوان‌ها و متن اصلی صفحه‌های کلیدی را نگه دارید",
                "متن جایگزین تصویرها و نام فایل‌ها را تا جای ممکن نگه دارید",
              ],
            },
          ],
        },
        {
          q: "با نقشه‌ی سایت و Search Console چه کنیم؟",
          a: "نقشه‌ی سایت تازه‌ای بسازید که فقط آدرس‌های نهایی را با تاریخ واقعی آخرین تغییر فهرست کند و همان روز انتشار آن را در Search Console ثبت کنید. ملک (property) قبلی را نگه دارید، گزارش Pages را برای یافتن خطا بررسی کنید و با بازرسی آدرس صفحه‌های مهم مطمئن شوید گوگل ریدایرکت‌ها را می‌بیند.",
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
          a: "روز انتشار، تک‌تک آدرس‌های قدیمی را با نقشه‌ی ریدایرکت بیازمایید، مطمئن شوید دسترسی موتورهای جست‌وجو باز شده و نقشه‌ی سایت را ثبت کنید. در هفته‌های اول خطاهای ۴۰۴، تعداد صفحه‌های نمایه‌شده، نمایش و کلیک را زیر نظر بگیرید و هر جای خالی نقشه‌ی ریدایرکت را فوراً پر کنید.",
          details: [
            {
              kind: "steps",
              items: [
                "فهرست آدرس‌های قدیمی را خزش کنید و ببینید هر کدام با یک ۳۰۱ به صفحه‌ای با وضعیت ۲۰۰ می‌رسد یا نه",
                "هر noindex یا محدودیت robots را که از سایت آزمایشی مانده بردارید",
                "نقشه‌ی سایت جدید را ثبت کنید",
                "روزهای اول هر روز Search Console را ببینید: پوشش، ۴۰۴ و نمایش",
                "هر ریدایرکت جاافتاده را درست کنید و دوباره بیازمایید",
              ],
            },
          ],
        },
        {
          q: "رایج‌ترین اشتباه‌های انتقال سایت چیست؟",
          a: "فرستادن همه‌چیز به صفحه‌ی اصلی، زنجیره‌ی دو یا چند ریدایرکت، ریدایرکت موقت (۳۰۲) به‌جای دائمی، فراموش کردن تصویرها و فایل‌ها، جا ماندن محدودیت سایت آزمایشی و عوض کردن همه‌ی آدرس‌ها و عنوان‌ها در یک انتشار. جلوی همه‌ی این‌ها را می‌شود با نقشه‌ی آدرس‌ها و یک خزش آزمایشی گرفت.",
          details: [
            {
              kind: "steps",
              items: [
                "ریدایرکت انبوه آدرس‌های قدیمی به صفحه‌ی اصلی",
                "زنجیره‌ی ریدایرکت به‌جای یک گام",
                "ریدایرکت ۳۰۲ در جایی که ۳۰۱ لازم بود",
                "ریدایرکت‌های جاافتاده برای تصویر، PDF و صفحه‌های آرشیو",
                "محدودیت noindex یا robots سایت آزمایشی که پس از انتشار جا مانده",
                "عوض کردن آدرس‌ها، عنوان‌ها و محتوا، همه با هم در یک انتشار",
              ],
            },
          ],
        },
        {
          q: "انتقال دانه به زبان عدد",
          a: `پایگاه علمی‌خبری دانه از وردپرس به پلتفرم اختصاصی Next.js و Payload CMS منتقل شد: ${nFa(dane.migratedPosts)} مطلب، ${nFa(dane.categoriesBefore)} دسته، ${nFa(dane.tags)} برچسب و ${nFa(dane.authors)} نویسنده جابه‌جا شدند، دسته‌بندی به ${nFa(dane.categoriesAfter)} دسته و ${nFa(dane.topics)} موضوع بازطراحی شد و ${nFa(dane.redirects)} ریدایرکت دائمی گذاشتیم تا هیچ لینک قدیمی‌ای نشکند.`,
          details: [{ kind: "links", items: [{ label: "نمونه‌کار: پایگاه علمی‌خبری دانه", href: "/work/dane-news" }] }],
        },
        {
          q: "بلونا در انتقال سایت چه کمکی می‌کند؟",
          a: "کار را با بررسی رایگان رشد شروع می‌کنیم: سایت فعلی، آدرس‌ها و خطرها را بررسی می‌کنیم و برای انتقال قیمت قطعی و مکتوب می‌دهیم. سایت در تمام این مدت در دسترس می‌ماند و پایش پس از انتشار هم بخشی از کار است.",
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
      metaTitle: "Custom online store or store builder? A guide",
      metaDescription: "Custom online store or store builder? Compare cost, speed, design, SEO and ownership, when each is right, with examples from four stores we built.",
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
          a: "When you are testing a new product, selling a small catalog of standard items, have a small budget or need to open this month. A store builder gets you selling quickly, and you can move to a custom store later once you know what your customers actually need.",
          details: [
            {
              kind: "steps",
              items: [
                "You are validating a product and want to sell fast",
                "A small catalog of standard products",
                "A limited budget for the first launch",
                "No need for features that a plugin cannot give",
              ],
            },
          ],
        },
        {
          q: "When is a custom online store worth it?",
          a: "When the buying experience is part of what you sell, when you need features a template does not offer (guided buying, custom orders, special payment or admin flows), when speed and SEO are central, or when you want to own the code and data. A premium brand and a complex catalog are typical reasons.",
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
      metaDescription: "فروشگاه‌ساز یا فروشگاه اینترنتی اختصاصی: مقایسه‌ی هزینه، سرعت، طراحی، امکانات، سئو و مالکیت، اینکه هر کدام کجا درست است، با نمونه‌ی چهار فروشگاه ما.",
      eyebrow: "راهنما",
      h1: "فروشگاه‌ساز یا **فروشگاه اینترنتی اختصاصی؟**",
      definition:
        "فروشگاه‌ساز پلتفرم آماده‌ای است که در آن فروشگاهی اجاره می‌کنید و یکی از قالب‌هایش را برمی‌دارید. فروشگاه اینترنتی اختصاصی بر پایه‌ی شیوه‌ی فروش خودتان، با طراحی، کد و داده‌ی مخصوص خودش ساخته می‌شود. هیچ‌کدام همیشه بهتر نیست: انتخاب درست به محصولات، حجم فروش و اهمیت تجربه‌ی خرید برای شما بستگی دارد.",
      answers: [
        {
          q: "فروشگاه‌ساز یا فروشگاه اختصاصی: فرق اصلی کجاست؟",
          a: "در فروشگاه‌ساز، پلتفرمی را اجاره می‌کنید: زود راه می‌افتد، ولی باید در چارچوب قالب‌ها و قواعدش کار کنید. در فروشگاه اختصاصی، کد و طراحی مال شماست و می‌تواند دقیقاً با مسیر خرید مشتری‌هایتان جور شود، به بهای هزینه‌ی شروع بیشتر. در واقع میان انعطاف و مالکیت از یک سو، و سرعت و شروع ارزان‌تر از سوی دیگر انتخاب می‌کنید.",
          details: [
            {
              kind: "table",
              caption: "مقایسه‌ی فروشگاه‌ساز آماده با فروشگاه اینترنتی اختصاصی",
              head: ["معیار", "فروشگاه‌ساز", "فروشگاه اختصاصی"],
              rows: [
                ["زمان راه‌اندازی", "چند روز تا چند هفته", "چند هفته تا چند ماه، بسته به دامنه"],
                ["هزینه‌ی شروع", "کمتر", "بیشتر، با قیمت قطعی"],
                ["هزینه‌ی جاری", "اشتراک و افزونه‌های جانبی", "هاست و نگهداری"],
                ["طراحی", "محدود به قالب", "بر پایه‌ی برند و مسیر خرید شما"],
                ["امکانات خاص", "وابسته به افزونه‌های موجود", "هر چه کسب‌وکارتان لازم دارد"],
                ["سرعت", "وابسته به پلتفرم و افزونه‌ها", "از اول برایش برنامه‌ریزی می‌شود"],
                ["کنترل سئو", "وابسته به پلتفرم", "کنترل کامل روی ساختار و متادیتا"],
                ["مالکیت", "وابسته به شرایط پلتفرم", "کد و داده مال شماست"],
              ],
            },
          ],
        },
        {
          q: "فروشگاه‌ساز کجا انتخاب درستی است؟",
          a: "وقتی محصول تازه‌ای را محک می‌زنید، تعداد کمی کالای استاندارد می‌فروشید، بودجه‌تان کم است یا باید همین ماه فروش را شروع کنید. فروشگاه‌ساز زود شما را به فروش می‌رساند و وقتی فهمیدید مشتری‌ها واقعاً چه می‌خواهند، می‌توانید سراغ فروشگاه اختصاصی بروید.",
          details: [
            {
              kind: "steps",
              items: [
                "محصول را محک می‌زنید و می‌خواهید زود بفروشید",
                "تعداد کمی محصول استاندارد",
                "بودجه‌ی محدود برای راه‌اندازی اول",
                "امکانی لازم ندارید که افزونه‌ها نداشته باشند",
              ],
            },
          ],
        },
        {
          q: "فروشگاه اختصاصی کجا ارزشش را دارد؟",
          a: "وقتی تجربه‌ی خرید بخشی از چیزی است که می‌فروشید، امکاناتی لازم دارید که قالب‌ها ندارند (راهنمایی در خرید، سفارش اختصاصی، روند ویژه‌ی پرداخت یا مدیریت)، سرعت و سئو برایتان حیاتی است یا می‌خواهید کد و داده مال خودتان باشد. برند لوکس و فهرست محصول پیچیده دو دلیل رایج‌اند.",
          details: [
            {
              kind: "steps",
              items: [
                "برند به ظاهری متمایز و لوکس نیاز دارد",
                "راهنمایی یا مشاوره پیش از خرید",
                "سفارش اختصاصی، مثل محصول سفارشی برای شرکت‌ها",
                "روندهای پرداخت و مدیریت داخلی که افزونه‌ها پوشش نمی‌دهند",
                "هدف بلندمدت در سئو و سرعت",
                "مالکیت کد و داده‌ی مشتری",
              ],
            },
          ],
        },
        {
          q: "هزینه‌ی فروشگاه اختصاصی به چه بستگی دارد؟",
          a: "بیش از همه به دامنه‌ی کار: تعداد انواع محصول و صفحه، اتصال به درگاه پرداخت و ارسال، حساب کاربری مشتری، پنل مدیریت، محتوا، عکاسی و طراحی. قیمت ثابتی منتشر نمی‌کنیم، چون هزینه‌ی دو فروشگاه هم‌اندازه می‌تواند چند برابر فرق کند؛ پس از بررسی رایگان قیمت قطعی می‌گیرید.",
          details: [{ kind: "links", items: [{ label: "راهنمای قیمت طراحی سایت ۱۴۰۵", href: "/guides/website-design-cost" }] }],
        },
        {
          q: "فروشگاه اختصاصی پس از راه‌اندازی چه هزینه‌ای دارد؟",
          a: "دامنه، هاست و سرویس‌های پولی‌ای که فروشگاه از آن‌ها استفاده می‌کند، مثل ارسال ایمیل یا کارمزد درگاه، به‌اضافه‌ی هزینه‌ی نگهداری برای به‌روزرسانی، پایش و تغییرات کوچک. از هر آژانسی بخواهید این‌ها را جدا از هزینه‌ی ساخت بنویسد تا بتوانید هزینه‌ی جاری را با اشتراک فروشگاه‌ساز مقایسه کنید.",
        },
        {
          q: "سئو در هر کدام چطور است؟",
          a: "هر دو می‌توانند رتبه بگیرند، ولی در فروشگاه اختصاصی ساختار دسته‌ها، آدرس‌ها، متادیتا و داده‌ی ساختاریافته‌ی Product کاملاً دست شماست و صفحه‌ها سریع می‌مانند. در فروشگاه‌ساز تا جایی پیش می‌روید که پلتفرم اجازه می‌دهد. در هر دو، سلسله‌مراتب روشن دسته‌ها و عنوان‌های یکتا از همه مهم‌تر است.",
          details: [{ kind: "links", items: [{ label: "خدمات سئوی سایت", href: "/services/seo" }, { label: "راهنما: چک‌لیست سئوی Next.js", href: "/guides/nextjs-seo-checklist" }] }],
        },
        {
          q: "برای سبزینو و مجسمه سعیدی چه ساختیم؟",
          a: "سبزینو، که یک کسب‌وکار اجتماعی است، فروشگاه واقعی می‌خواست: سبد خرید واکنش‌گرا، حساب کاربری مشتری، تسویه‌حساب، درگاه زرین‌پال و پنل مدیریت مستقل برایش ساختیم. مجسمه سعیدی فروشگاهی لوکس، موبایل‌محور و سئومحور برای مجسمه‌های دست‌ساز می‌خواست، با سبد خرید پایدار، فرم‌های خرید با اعتبارسنجی و لایه‌ی داده‌ی Prisma و PostgreSQL.",
          details: [{ kind: "links", items: [{ label: "سبزینو", href: "/work/sabzino" }, { label: "مجسمه سعیدی", href: "/work/mojasame-saidi" }] }],
        },
        {
          q: "برای عطر نیرا و علم‌کالا چه ساختیم؟",
          a: "نیرا عطر اصل می‌فروشد و برای شرکت‌ها عطر اختصاصی می‌سازد؛ پس فروشگاهی برندمحور با بخش عطر سازمانی، صفحه‌های گالری، جست‌وجو و سبد خرید ساختیم. علم‌کالا تجهیزات آزمایشگاه، رباتیک و کلاس را به کسانی می‌فروشد که اغلب نمی‌دانند چه چیزی به کارشان می‌آید؛ فروشگاهش خریدار را با راهنمای کاربرد و مسیر مشاوره همراهی می‌کند.",
          details: [{ kind: "links", items: [{ label: "عطر نیرا", href: "/work/nira-perfume" }, { label: "علم‌کالا", href: "/work/elm-kala" }] }],
        },
        {
          q: "چطور تصمیم بگیریم؟ یک چک‌لیست کوتاه",
          a: "به پنج سؤال جواب بدهید: تجربه‌ی خرید بخشی از برند شماست؟ امکانی لازم دارید که افزونه‌ها ندارند؟ سرعت و سئو چقدر برایتان مهم است؟ این فروشگاه را چند سال نگه می‌دارید؟ و کد باید دست چه کسی باشد؟ اگر بیشتر جواب‌ها «بله» است، اختصاصی؛ اگر بیشتر «نه» است، فروشگاه‌ساز شروع معقولی است.",
          details: [
            {
              kind: "steps",
              items: [
                "تجربه‌ی خرید بخشی از چیزی است که برندتان را خاص می‌کند؟",
                "امکانی لازم دارید که هیچ افزونه‌ی آماده‌ای ندارد؟",
                "سرعت و دیده شدن در جست‌وجو برای رشدتان حیاتی است؟",
                "این فروشگاه را چند سال اداره خواهید کرد؟",
                "می‌خواهید کد، طراحی و داده‌ی مشتری‌ها مال خودتان باشد؟",
              ],
            },
          ],
        },
        {
          q: "می‌شود با فروشگاه‌ساز شروع کرد و بعد سراغ فروشگاه اختصاصی رفت؟",
          a: "بله، و اغلب کار معقولی است. با فروشگاه‌ساز شروع کنید تا ببینید مشتری‌ها چه می‌خرند و وقتی محدودیت‌ها برایتان هزینه‌ساز شد، سراغ فروشگاه اختصاصی بروید. این انتقال را هم مثل هر جابه‌جایی دیگری برنامه‌ریزی کنید: برای آدرس هر محصول و دسته مقصد مشخص کنید و ریدایرکت دائمی بگذارید تا رتبه‌ی جست‌وجو منتقل شود.",
          details: [{ kind: "links", items: [{ label: "راهنما: انتقال سایت بدون افت سئو", href: "/guides/migrate-wordpress-to-nextjs" }] }],
        },
        {
          q: "قیمت فروشگاه اختصاصی را چطور بگیرم؟",
          a: "بررسی رایگان رشد را رزرو کنید. محصولات و شیوه‌ی فروشتان را بررسی می‌کنیم، رک می‌گوییم فروشگاه اختصاصی به کارتان می‌آید یا فروشگاه‌ساز، و اگر اختصاصی مناسب بود، پیشنهاد قیمت قطعی و مکتوب با دامنه‌ی کار، قیمت و زمان‌بندی می‌گیرید.",
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
      metaTitle: "Persian–English bilingual website: hreflang, RTL",
      metaDescription: "Persian–English bilingual website: URL structure, hreflang with examples, true right-to-left layout, common mistakes, and the ASA-Study example.",
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
          details: [{ kind: "p", text: "In ASA-Study each university is an independent, localized document, so the English and Persian versions of one university are kept together and edited as a pair." }],
        },
        {
          q: "Does each language need its own SEO?",
          a: "Yes. People do not search in two languages the same way, so each version needs its own keyword research, titles, descriptions and headings, not a literal translation. Both versions are indexed separately, and hreflang connects them.",
          details: [{ kind: "links", items: [{ label: "SEO services", href: "/services/seo" }] }],
        },
        {
          q: "How did ASA-Study handle two languages?",
          a: "International students choosing a university in Iran have to compare cities, universities and programs in their own language. We built English and Persian routing with complete RTL behavior, a searchable university directory with a city filter, data-driven profiles and a CMS-ready structure where each university is a localized document.",
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
      metaDescription: "راهنمای ساخت سایت دوزبانه‌ی فارسی و انگلیسی: ساختار آدرس‌ها، hreflang با مثال، چیدمان راست‌چین درست، اشتباه‌های رایج و نمونه‌ی ASA-Study.",
      eyebrow: "راهنما",
      h1: "سایت دوزبانه‌ی فارسی و انگلیسی: **hreflang و RTL درست**",
      definition:
        "سایت دوزبانه دو نسخه‌ی کامل از یک سایت است که هر کدام آدرس، ترجمه و کلمات کلیدی خودش را دارد. در فارسی و انگلیسی یعنی نسخه‌ی فارسی چیدمان راست‌چینِ واقعی هم می‌خواهد. اگر بد ساخته شود، هم بازدیدکننده گیج می‌شود و هم موتور جست‌وجو؛ اگر درست ساخته شود، هر زبان جداگانه رتبه می‌گیرد.",
      answers: [
        {
          q: "ساختار آدرس در سایت دوزبانه‌ی فارسی و انگلیسی چطور باشد؟",
          a: "به هر زبان آدرس جدا بدهید: پیشوند مسیر (/ برای یک زبان و /en برای دیگری)، زیردامنه یا دامنه‌ی جدا. پیشوند روی یک دامنه ساده‌ترین روش برای اداره است و همه‌ی لینک‌ها و اعتبار را یک‌جا نگه می‌دارد. سراغ آدرس واحدی که زبان را با جاوااسکریپت عوض می‌کند نروید، چون موتور جست‌وجو آدرس‌ها را نمایه می‌کند، نه دکمه‌ها را.",
          details: [
            {
              kind: "table",
              caption: "سه راه برای جدا کردن زبان‌ها",
              head: ["روش", "نمونه", "نکته"],
              rows: [
                ["پیشوند مسیر", "example.com/ و example.com/en", "ساده‌ترین برای اداره؛ اعتبار روی یک دامنه می‌ماند"],
                ["زیردامنه", "en.example.com", "بیشتر شبیه سایتی جداست؛ نگهداری‌اش بیشتر است"],
                ["دامنه‌ی جدا", "example.com و example.ir", "قوی‌ترین نشانه‌ی محلی؛ بیشترین کار و هزینه"],
              ],
            },
          ],
        },
        {
          q: "hreflang چیست و تنظیم درستش چه شکلی دارد؟",
          a: "hreflang به موتور جست‌وجو می‌گوید کدام صفحه معادل همین صفحه در زبان دیگر است تا خواننده‌ی فارسی‌زبان صفحه‌ی فارسی و خواننده‌ی انگلیسی‌زبان صفحه‌ی انگلیسی را ببیند. هر صفحه باید خودش و معادلش را فهرست کند و معادل هم باید به آن اشاره کند. یک نسخه هم با x-default پیش‌فرض اعلام می‌شود.",
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
          a: "لینک یک‌طرفه (الف به ب اشاره می‌کند ولی ب به الف نه)، اشاره نکردن صفحه به خودش، hreflang به صفحه‌ای که ریدایرکت یا noindex شده، کد زبان اشتباه و canonical که به زبان دیگر اشاره می‌کند. هر کدام از این‌ها کافی است تا موتور جست‌وجو کل مجموعه را نادیده بگیرد.",
          details: [
            {
              kind: "steps",
              items: [
                "صفحه‌ی معادل به این صفحه اشاره نمی‌کند",
                "صفحه خودش را فهرست نکرده است",
                "آدرس‌های hreflang که ریدایرکت می‌شوند یا مسدودند",
                "کد اشتباه: fa و en بنویسید و منطقه را فقط در صورت نیاز",
                "canonical که به صفحه‌ی زبان دیگر اشاره می‌کند",
              ],
            },
          ],
        },
        {
          q: "چیدمان راست‌چین (RTL) واقعی چه چیزهایی لازم دارد؟",
          a: "خیلی بیشتر از راست‌چین کردن متن: کل چیدمان قرینه می‌شود، یعنی ستون‌ها، ترتیب منو، آیکن‌ها و فلش‌ها برعکس می‌شوند؛ فونت فارسی درست پشتیبانی می‌شود؛ ارقام با زبان یکی‌اند و فاصله‌ها برای حروف پیوسته تنظیم می‌شود. صفحه ویژگی‌های lang و dir هم دارد تا مرورگر و ابزارهای دسترس‌پذیری درست رفتار کنند.",
          details: [
            {
              kind: "steps",
              items: [
                "dir=\"rtl\" و lang=\"fa\" روی سند",
                "چیدمان، ترتیب ستون‌ها و منوی قرینه",
                "فلش‌ها و آیکن‌ها در جهت درست",
                "فونت فارسی با وزن‌های لازم",
                "ارقام فارسی در متن فارسی",
                "بدون letter-spacing روی فارسی، چون اتصال حروف را می‌شکند",
              ],
            },
          ],
        },
        {
          q: "کدام ریزه‌کاری‌های تایپوگرافی فارسی راحت از قلم می‌افتند؟",
          a: "نیم‌فاصله (ZWNJ) در کلمه‌های مرکب، «ی» و «ک» فارسی به‌جای عربی، ارقام فارسی و فاصله نینداختن میان حروف. ریز به نظر می‌رسند، ولی خواننده فوراً متوجه می‌شود و عبارت‌های جست‌وجو هم شکل درست را به کار می‌برند.",
          details: [
            { kind: "p", text: "حروف فارسی ی و ک را به کار ببرید، نه ي و ك عربی، تا متن با چیزی که مردم تایپ می‌کنند یکی باشد. در کلمه‌هایی مثل «می‌شود» و «نمونه‌کار» نیم‌فاصله بگذارید. هیچ‌وقت روی متن فارسی letter-spacing نگذارید." },
          ],
        },
        {
          q: "محتوای دو زبان را چطور مدیریت کنیم؟",
          a: "از یک جا و با یک ساختار، تا هیچ صفحه‌ای فقط به یک زبان نماند و چیزی از قلم نیفتد. برای هر صفحه وضعیت ترجمه تعیین کنید، ترجمه‌ها را بازبینی کنید و خروجی ماشینی را بی‌بازبینی منتشر نکنید؛ و یک واژه‌نامه‌ی مشترک داشته باشید تا هر چیز همیشه یک نام داشته باشد.",
          details: [{ kind: "p", text: "در ASA-Study هر دانشگاه یک سند مستقل و بومی‌شده است، پس نسخه‌ی فارسی و انگلیسی هر دانشگاه کنار هم نگه داشته و با هم ویرایش می‌شود." }],
        },
        {
          q: "هر زبان سئوی جداگانه لازم دارد؟",
          a: "بله. مردم در دو زبان یک‌جور جست‌وجو نمی‌کنند؛ پس هر نسخه تحقیق کلمه‌ی کلیدی، عنوان، توضیح و تیترهای خودش را می‌خواهد، نه ترجمه‌ی کلمه‌به‌کلمه. هر دو نسخه جدا نمایه می‌شوند و hreflang آن‌ها را به هم وصل می‌کند.",
          details: [{ kind: "links", items: [{ label: "خدمات سئوی سایت", href: "/services/seo" }] }],
        },
        {
          q: "ASA-Study دو زبان را چطور مدیریت کرد؟",
          a: "دانشجویان بین‌المللی که برای تحصیل در ایران دانشگاه انتخاب می‌کنند، باید شهرها، دانشگاه‌ها و رشته‌ها را به زبان خودشان مقایسه کنند. برایشان ناوبری فارسی و انگلیسی با رفتار کامل راست‌چین، فهرست جست‌وجوپذیر دانشگاه‌ها با فیلتر شهر، صفحه‌ی داده‌محور هر دانشگاه و ساختاری آماده‌ی CMS ساختیم که در آن هر دانشگاه یک سند بومی‌شده است.",
          details: [{ kind: "links", items: [{ label: "نمونه‌کار: ASA-Study", href: "/work/asa-study" }] }],
        },
        {
          q: "درستی سایت دوزبانه را چطور بیازماییم؟",
          a: "سایت را خزش کنید و ببینید هر صفحه وضعیت ۲۰۰ دارد، هر جفت hreflang دوطرفه است، هر canonical به خود صفحه اشاره می‌کند و تغییر زبان به همان صفحه در زبان دیگر می‌رود. بعد هر دو نسخه را مثل یک خواننده‌ی واقعی روی موبایل بخوانید.",
          details: [
            {
              kind: "steps",
              items: [
                "همه‌ی آدرس‌ها را خزش کنید: وضعیت ۲۰۰ و بی‌زنجیره‌ی ریدایرکت",
                "دوطرفه بودن hreflang را برای هر جفت صفحه بررسی کنید",
                "مطمئن شوید هر canonical به صفحه‌ی خودش اشاره می‌کند",
                "بیازمایید که تغییر زبان به صفحه‌ی معادل می‌رسد",
                "چیدمان RTL و تایپوگرافی را روی موبایل بازبینی کنید",
              ],
            },
          ],
        },
        {
          q: "بلونا در ساخت سایت دوزبانه چه کمکی می‌کند؟",
          a: "سایت فارسی و انگلیسی را با آدرس جدا، راست‌چین واقعی و hreflang درست طراحی می‌کنیم و می‌سازیم؛ مثل همین سایت و ASA-Study. با بررسی رایگان رشد شروع کنید تا قیمت قطعی و مکتوب بگیرید.",
          details: [{ kind: "links", items: [{ label: "طراحی سایت دوزبانه", href: "/services/website-design/bilingual" }, { label: "رزرو بررسی رایگان رشد", href: "/contact?need=web" }] }],
        },
      ],
    },
  },
];
