import { facts, fmt } from "./facts";
import type { Spoke } from "./spokes";

/**
 * New service pages (SEO-GUIDELINE E1): /services/seo, /services/website-design/landing-page,
 * /services/ai-automation/crm and /services/ai-automation/chatbot. (n8n lives in content/spokes.ts.)
 * Answer-first, built only from real work (content/work.ts) and facts (content/facts.ts); no results or prices are
 * stated that the team has not confirmed.
 * TODO(owner): published price ranges (docs/seo/QUESTIONS_FOR_TEAM.md #30-#32) and a chatbot case study if one exists.
 */
const re = facts.projects.realEstate;
const dane = facts.projects.dane;
const sprintEn = fmt.weeks(facts.timelines.automationSprintWeeks, "en");
const sprintFa = fmt.weeks(facts.timelines.automationSprintWeeks, "fa");
const nEn = (v: number) => fmt.n(v, "en");
const nFa = (v: number) => fmt.n(v, "fa");

export const serviceSpokes: Spoke[] = [
  // ======================================================================================= SEO
  {
    kind: "service",
    slug: "seo",
    pillar: "marketing-growth",
    need: "growth",
    status: "published",
    needs: [],
    projects: ["dane-news", "sabzino", "asa-study"],
    guides: ["nextjs-seo-checklist", "ai-search-readiness", "migrate-wordpress-to-nextjs"],
    en: {
      metaTitle: "SEO services: technical, content and Next.js SEO",
      metaDescription: "Website SEO services: technical SEO (speed, rendering, sitemap, hreflang, structured data), content SEO, store SEO and bilingual SEO, with measurement in Search Console.",
      eyebrow: "Marketing & growth",
      h1: "Website **SEO services**",
      definition:
        "SEO (search engine optimisation) is the work that lets search engines find, understand and rank your pages for what people search. It has a technical side (can Google read the site quickly?), a content side (does each page answer a real search?) and a measurement side (is it bringing customers?).",
      answers: [
        {
          q: "What do SEO services include, starting with technical SEO?",
          a: "Technical SEO makes sure Google can read your site quickly and correctly: fast pages, server-rendered text, a clean sitemap, one canonical address per page, hreflang for each language, structured data and no broken links. It is built into the site from the start, not bolted on later.",
          details: [
            {
              kind: "steps",
              items: [
                "Speed on mobile and Core Web Vitals",
                "Server-rendered pages so the full text is in the first response",
                "A real sitemap with accurate last-modified dates, and a robots file",
                "Canonical URLs and hreflang for every language",
                "Structured data (JSON-LD) that matches the visible page",
                "No broken internal links and correct redirects",
              ],
            },
          ],
        },
        {
          q: "What is content SEO and how is it done?",
          a: "Content SEO means each page targets one clear search and answers it fully. We map keywords to pages so two pages never compete for the same term, write answer-first sections and FAQs people can quote, and link related pages together with descriptive anchor text.",
          details: [
            {
              kind: "steps",
              items: [
                "A keyword-to-page map, one main keyword per page",
                "Answer-first sections: the direct answer, then the detail",
                "FAQs written from real customer questions",
                "Internal links with descriptive anchor text",
                "Unique titles and meta descriptions for every page",
              ],
            },
          ],
        },
        {
          q: "How is SEO different for an online store?",
          a: "A store has many near-identical pages, so structure matters: a clear category hierarchy, unique titles and descriptions for products and categories, Product structured data (name, price, availability) and fast mobile pages. Weak structure makes Google treat product pages as duplicates.",
          details: [{ kind: "links", items: [{ label: "E-commerce website design", href: "/services/website-design/ecommerce" }] }],
        },
        {
          q: "How does SEO work for a bilingual Persian–English site?",
          a: "Each language needs its own URLs and full translation, correct hreflang tags pointing both ways, and its own keyword research, since people do not search in two languages the same way. This site is built like that, with Persian at the root and English under /en.",
          details: [
            { kind: "links", items: [{ label: "Bilingual website design", href: "/services/website-design/bilingual" }, { label: "Guide: bilingual website, hreflang and RTL", href: "/guides/bilingual-website-hreflang-rtl" }] },
          ],
        },
        {
          q: "Why does Next.js help SEO?",
          a: "Next.js builds each page on the server, so the complete text is in the first response and Google does not need to run JavaScript to read it. It also gives direct control over metadata, sitemaps, canonical tags and structured data, which is why most of our sites use it.",
          details: [{ kind: "links", items: [{ label: "Next.js website design", href: "/services/website-design/nextjs" }, { label: "Guide: Next.js SEO checklist", href: "/guides/nextjs-seo-checklist" }] }],
        },
        {
          q: "Have you handled an SEO migration?",
          a: `Yes. Dane Scientific News moved from WordPress to a custom Next.js and Payload CMS platform: ${nEn(dane.migratedPosts)} posts with ${nEn(dane.tags)} tags and ${nEn(dane.authors)} authors were migrated, the taxonomy was redesigned into ${nEn(dane.categoriesAfter)} categories and ${nEn(dane.topics)} topics, and ${nEn(dane.redirects)} permanent redirects kept every old link working.`,
          details: [{ kind: "links", items: [{ label: "Case study: Dane Scientific News", href: "/work/dane-news" }, { label: "Guide: migrate from WordPress to Next.js", href: "/guides/migrate-wordpress-to-nextjs" }] }],
        },
        {
          q: "How does an SEO engagement run?",
          a: "Five steps: audit, plan, implement, measure and improve. We start by reading the current site and Search Console data, write a prioritised plan, implement the technical and content work, report monthly on what changed, and adjust the plan from the numbers.",
          details: [
            {
              kind: "steps",
              items: [
                "Audit: technical state, indexed pages, current rankings",
                "Plan: keyword-to-page map and a prioritised list of fixes",
                "Implement: technical work and content",
                "Measure: Search Console, rankings, Core Web Vitals, leads",
                "Improve: drop what does not work, strengthen what does",
              ],
            },
          ],
        },
        {
          q: "What do you measure?",
          a: "Impressions and clicks in Google Search Console, the rankings of the main pages, how many pages are indexed, speed and Core Web Vitals, and, most importantly, how many free-audit requests come from search. Rankings alone do not pay the bills; enquiries do.",
        },
        {
          q: "How long does SEO take to work?",
          a: "SEO is gradual and results usually take months, not days. The time depends on how competitive your field is, the current state of the site and the content published. We do not promise rankings or positions, because nobody outside Google can guarantee them.",
        },
        {
          q: "What about being found by AI assistants?",
          a: "AI assistants often cannot run JavaScript, so pages that put the answer in the first server response, with clear headings and structured data, are far more likely to be read and quoted. The same technical work helps both Google and AI search.",
          details: [{ kind: "links", items: [{ label: "Guide: be visible to AI search", href: "/guides/ai-search-readiness" }] }],
        },
        {
          q: "How do I get a price for SEO?",
          a: "Book the free growth audit. We look at your site and Search Console data, tell you what to fix first and, if it fits, you get a fixed quote in writing with scope, price and timeline. You only pay for the agreed scope.",
          details: [{ kind: "links", items: [{ label: "Book the free growth audit", href: "/contact?need=growth" }] }],
        },
      ],
    },
    fa: {
      metaTitle: "خدمات سئو سایت: تکنیکال، محتوا و Next.js",
      metaDescription: "خدمات سئو سایت: سئو تکنیکال (سرعت، رندر، نقشه‌ی سایت، hreflang، داده‌ی ساختاریافته)، سئوی محتوا، سئوی فروشگاه و سئوی سایت دوزبانه، با سنجش در Search Console.",
      eyebrow: "مارکتینگ و رشد",
      h1: "خدمات **سئو سایت**",
      definition:
        "سئو (بهینه‌سازی برای موتور جست‌وجو) کاری است که باعث می‌شود موتورهای جست‌وجو صفحه‌های شما را پیدا کنند، بفهمند و برای چیزی که مردم جست‌وجو می‌کنند نشان بدهند. سه بخش دارد: تکنیکال (گوگل سایت را سریع و درست می‌خواند؟)، محتوا (هر صفحه به یک جست‌وجوی واقعی جواب می‌دهد؟) و سنجش (مشتری می‌آورد؟).",
      answers: [
        {
          q: "سئو سایت و بخش تکنیکال آن شامل چه چیزهایی است؟",
          a: "سئو تکنیکال تضمین می‌کند گوگل سایت را سریع و درست بخواند: صفحه‌های سریع، متن رندرشده روی سرور، نقشه‌ی سایت تمیز، یک آدرس canonical برای هر صفحه، hreflang برای هر زبان، داده‌ی ساختاریافته و بدون لینک شکسته. این کارها از اول در ساخت سایت هست، نه بعداً اضافه شود.",
          details: [
            {
              kind: "steps",
              items: [
                "سرعت روی موبایل و Core Web Vitals",
                "صفحه‌های رندرشده روی سرور تا متن کامل در پاسخ اول باشد",
                "نقشه‌ی سایت واقعی با تاریخ‌های درست و فایل robots",
                "آدرس canonical و hreflang برای هر زبان",
                "داده‌ی ساختاریافته (JSON-LD) هماهنگ با صفحه‌ی قابل مشاهده",
                "بدون لینک داخلی شکسته و با ریدایرکت‌های درست",
              ],
            },
          ],
        },
        {
          q: "سئوی محتوا چیست و چطور انجام می‌شود؟",
          a: "سئوی محتوا یعنی هر صفحه یک جست‌وجوی مشخص را هدف می‌گیرد و کامل جواب می‌دهد. کلمه‌ها را به صفحه‌ها نگاشت می‌کنیم تا دو صفحه سر یک کلمه رقابت نکنند، بخش‌های پاسخ‌محور و پرسش‌های متداولی می‌نویسیم که قابل نقل باشند و صفحه‌های مرتبط را با متن لینک توصیفی به هم وصل می‌کنیم.",
          details: [
            {
              kind: "steps",
              items: [
                "نقشه‌ی کلمه به صفحه، یک کلمه‌ی اصلی برای هر صفحه",
                "بخش‌های پاسخ‌محور: اول جواب مستقیم، بعد جزئیات",
                "پرسش‌های متداول از سؤال‌های واقعی مشتری‌ها",
                "لینک داخلی با متن توصیفی",
                "عنوان و توضیح متای یکتا برای هر صفحه",
              ],
            },
          ],
        },
        {
          q: "سئوی فروشگاه اینترنتی چه فرقی دارد؟",
          a: "فروشگاه صفحه‌های شبیه به هم زیاد دارد، پس ساختار مهم است: سلسله‌مراتب روشن دسته‌ها، عنوان و توضیح یکتا برای محصول و دسته، داده‌ی ساختاریافته‌ی Product (نام، قیمت، موجودی) و صفحه‌های سریع روی موبایل. ساختار ضعیف باعث می‌شود گوگل صفحه‌های محصول را تکراری ببیند.",
          details: [{ kind: "links", items: [{ label: "طراحی سایت فروشگاهی", href: "/services/website-design/ecommerce" }] }],
        },
        {
          q: "سئوی سایت دوزبانه فارسی و انگلیسی چطور است؟",
          a: "هر زبان آدرس و ترجمه‌ی کامل خودش را لازم دارد، برچسب‌های hreflang دوطرفه و تحقیق کلمه‌ی جدا، چون مردم دو زبان را یک‌جور جست‌وجو نمی‌کنند. همین سایت این‌طور ساخته شده: فارسی روی ریشه و انگلیسی زیر /en.",
          details: [{ kind: "links", items: [{ label: "طراحی سایت دوزبانه", href: "/services/website-design/bilingual" }, { label: "راهنما: سایت دوزبانه، hreflang و RTL", href: "/guides/bilingual-website-hreflang-rtl" }] }],
        },
        {
          q: "چرا نکست جی اس (Next.js) به سئو کمک می‌کند؟",
          a: "نکست جی اس هر صفحه را روی سرور می‌سازد، پس متن کامل در پاسخ اول است و گوگل برای خواندنش لازم نیست جاوااسکریپت اجرا کند. کنترل مستقیم روی متادیتا، نقشه‌ی سایت، canonical و داده‌ی ساختاریافته هم می‌دهد؛ برای همین بیشتر سایت‌های ما با آن ساخته شده‌اند.",
          details: [{ kind: "links", items: [{ label: "طراحی سایت با نکست جی اس", href: "/services/website-design/nextjs" }, { label: "راهنما: چک‌لیست سئو Next.js", href: "/guides/nextjs-seo-checklist" }] }],
        },
        {
          q: "مهاجرت سئو را تجربه کرده‌اید؟",
          a: `بله. پایگاه علمی خبری دانه از وردپرس به پلتفرم اختصاصی Next.js و Payload CMS منتقل شد: ${nFa(dane.migratedPosts)} مطلب با ${nFa(dane.tags)} برچسب و ${nFa(dane.authors)} نویسنده منتقل شد، طبقه‌بندی به ${nFa(dane.categoriesAfter)} دسته و ${nFa(dane.topics)} موضوع بازطراحی شد و ${nFa(dane.redirects)} ریدایرکت دائمی گذاشتیم تا هیچ لینک قدیمی نشکند.`,
          details: [{ kind: "links", items: [{ label: "نمونه‌کار: پایگاه علمی خبری دانه", href: "/work/dane-news" }, { label: "راهنما: انتقال از وردپرس به Next.js", href: "/guides/migrate-wordpress-to-nextjs" }] }],
        },
        {
          q: "یک همکاری سئو چطور پیش می‌رود؟",
          a: "پنج مرحله: بررسی، برنامه، اجرا، سنجش و بهبود. اول سایت فعلی و داده‌ی Search Console را می‌خوانیم، برنامه‌ی اولویت‌بندی‌شده می‌نویسیم، کار تکنیکال و محتوا را اجرا می‌کنیم، هر ماه گزارش می‌دهیم چه چیزی تغییر کرد و برنامه را بر اساس عددها اصلاح می‌کنیم.",
          details: [
            {
              kind: "steps",
              items: [
                "بررسی: وضعیت تکنیکال، صفحه‌های ایندکس‌شده، رتبه‌های فعلی",
                "برنامه: نقشه‌ی کلمه به صفحه و فهرست اولویت‌بندی‌شده‌ی اصلاحات",
                "اجرا: کار تکنیکال و محتوا",
                "سنجش: Search Console، رتبه، Core Web Vitals، سرنخ",
                "بهبود: حذف آنچه جواب نمی‌دهد و تقویت آنچه جواب می‌دهد",
              ],
            },
          ],
        },
        {
          q: "چه چیزی را اندازه‌گیری می‌کنید؟",
          a: "نمایش و کلیک در Google Search Console، رتبه‌ی صفحه‌های اصلی، تعداد صفحه‌های ایندکس‌شده، سرعت و Core Web Vitals و مهم‌تر از همه، تعداد درخواست بررسی رایگان که از جست‌وجو می‌آید. رتبه به‌تنهایی کسب‌وکار را نمی‌چرخاند؛ درخواست مشتری می‌چرخاند.",
        },
        {
          q: "سئو چقدر طول می‌کشد تا نتیجه بدهد؟",
          a: "سئو تدریجی است و نتیجه‌اش معمولاً چند ماه بعد دیده می‌شود، نه چند روز. زمان به رقابت در حوزه‌ی شما، وضعیت فعلی سایت و محتوای منتشرشده بستگی دارد. رتبه یا جایگاه تضمین نمی‌کنیم، چون کسی بیرون از گوگل نمی‌تواند تضمینش کند.",
        },
        {
          q: "دیده شدن توسط دستیارهای هوش مصنوعی چطور؟",
          a: "دستیارهای هوش مصنوعی اغلب نمی‌توانند جاوااسکریپت اجرا کنند؛ پس صفحه‌هایی که جواب را در پاسخ اول سرور می‌گذارند و عنوان‌های روشن و داده‌ی ساختاریافته دارند خیلی بیشتر خوانده و نقل می‌شوند. همین کار تکنیکال هم به گوگل کمک می‌کند هم به جست‌وجوی هوش مصنوعی.",
          details: [{ kind: "links", items: [{ label: "راهنما: دیده شدن در جست‌وجوی هوش مصنوعی", href: "/guides/ai-search-readiness" }] }],
        },
        {
          q: "قیمت سئو را چطور بگیرم؟",
          a: "بررسی رایگان رشد را رزرو کنید. سایت و داده‌ی Search Console شما را می‌خوانیم، می‌گوییم اول چه چیزی را درست کنید و اگر به توافق رسیدیم، پیشنهاد قیمت قطعی و مکتوب با دامنه، قیمت و زمان‌بندی می‌گیرید. فقط برای دامنه‌ی توافق‌شده پرداخت می‌کنید.",
          details: [{ kind: "links", items: [{ label: "رزرو بررسی رایگان رشد", href: "/contact?need=growth" }] }],
        },
      ],
    },
  },

  // ======================================================================================= landing page
  {
    kind: "service",
    slug: "landing-page",
    parent: "website-design",
    need: "web",
    status: "published",
    needs: [],
    projects: ["shamim-house", "konjed"],
    guides: ["website-design-cost"],
    en: {
      metaTitle: "Landing page design: fast pages that convert",
      metaDescription: "Landing page design for campaigns and launches: one clear offer, fast on mobile, forms connected to your CRM, and testing. Hand-coded, with a fixed quote after a free audit.",
      eyebrow: "Website design",
      h1: "Landing page **design**",
      definition:
        "A landing page is a single page built for one goal: turning the visitors of a campaign, an ad or a launch into enquiries or sales. Unlike a full website it has one offer, one call to action and nothing that pulls the visitor away from it.",
      answers: [
        {
          q: "What does landing page design for conversion include?",
          a: "One clear headline that states the offer, proof that you deliver, the benefits in the visitor's words, a single call to action repeated down the page, a short form, and answers to the objections people have. Everything else is left out, so the visitor has one thing to do.",
          details: [
            {
              kind: "steps",
              items: [
                "A headline that states the offer in one line",
                "Proof: real projects, the team, clear process",
                "Benefits in the visitor's words, not ours",
                "One call to action, repeated, with a short form",
                "FAQ that answers the real objections",
              ],
            },
          ],
        },
        {
          q: "Why must a landing page be fast on mobile?",
          a: "Most campaign traffic arrives on a phone, and a slow page loses visitors before they read a word. We build landing pages as light, hand-coded pages that load only what they need, so they stay quick even on weak connections.",
        },
        {
          q: "How does the form connect to a CRM and automation?",
          a: "The form sends each request to your email, Telegram or CRM, and an AI agent can answer and follow up in seconds instead of leaving the enquiry in an inbox. Each submission is tagged with where it came from, so you know which campaign worked.",
          details: [{ kind: "links", items: [{ label: "CRM automation", href: "/services/ai-automation/crm" }, { label: "Business AI automation", href: "/services/ai-automation" }] }],
        },
        {
          q: "Do you set up A/B tests?",
          a: "Yes: after launch we can set up two versions of a headline, offer or form and measure which one gets more enquiries, using events recorded on the page. A test only makes sense with enough visitors, so we tell you honestly whether yours is large enough.",
        },
        {
          q: "Which landing pages have you built?",
          a: "Shamim House has a story-led landing experience with advanced motion and structured partnership forms, and Konjed opens with a cinematic landing experience set in an illustrated game world. Both are built to turn a first visit into the next step.",
          details: [{ kind: "links", items: [{ label: "Shamim House", href: "/work/shamim-house" }, { label: "Konjed", href: "/work/konjed" }] }],
        },
        {
          q: "Landing page or full website?",
          a: "A landing page suits one campaign, one product or one launch. A full website suits a business that needs service pages, case studies and search visibility over time. Many clients start with a landing page and grow it into a website.",
          details: [{ kind: "links", items: [{ label: "Corporate website design", href: "/services/website-design/corporate" }] }],
        },
        {
          q: "How much does a landing page cost?",
          a: "It depends on the content, the integrations and whether copy and design are needed. After the free growth audit you get scope, a fixed price and a timeline in writing, and you pay only for the agreed scope.",
          details: [{ kind: "links", items: [{ label: "Website design cost in 2026: a guide", href: "/guides/website-design-cost" }, { label: "Book the free growth audit", href: "/contact?need=web" }] }],
        },
      ],
    },
    fa: {
      metaTitle: "طراحی لندینگ پیج: سریع و تبدیل‌محور",
      metaDescription: "طراحی لندینگ پیج برای کمپین و لانچ: یک پیشنهاد روشن، سریع روی موبایل، فرم وصل به CRM و آزمون نسخه‌ها. کدنویسی‌شده و با قیمت قطعی بعد از بررسی رایگان.",
      eyebrow: "طراحی سایت",
      h1: "طراحی **لندینگ پیج**",
      definition:
        "لندینگ پیج (صفحه فرود) یک صفحه‌ی تکی برای یک هدف است: تبدیل بازدیدکننده‌ی یک کمپین، تبلیغ یا لانچ به درخواست یا فروش. برخلاف سایت کامل، یک پیشنهاد و یک دعوت به اقدام دارد و هیچ چیزی بازدیدکننده را از آن دور نمی‌کند.",
      answers: [
        {
          q: "یک لندینگ پیج تبدیل‌محور چه چیزهایی دارد؟",
          a: "یک تیتر روشن که پیشنهاد را بگوید، اثبات اینکه کارتان را درست انجام می‌دهید، مزیت‌ها به زبان بازدیدکننده، یک دعوت به اقدام که در صفحه تکرار می‌شود، فرم کوتاه و پاسخ به اعتراض‌های رایج. باقی چیزها حذف می‌شود تا بازدیدکننده یک کار بیشتر نداشته باشد.",
          details: [
            {
              kind: "steps",
              items: [
                "تیتری که پیشنهاد را در یک خط بگوید",
                "اثبات: پروژه‌های واقعی، تیم و فرایند روشن",
                "مزیت‌ها به زبان بازدیدکننده، نه زبان ما",
                "یک دعوت به اقدام تکرارشونده با فرم کوتاه",
                "پرسش‌های متداول که به اعتراض‌های واقعی جواب می‌دهد",
              ],
            },
          ],
        },
        {
          q: "چرا لندینگ پیج باید روی موبایل سریع باشد؟",
          a: "بیشتر ترافیک کمپین با موبایل می‌آید و صفحه‌ی کند بازدیدکننده را قبل از خواندن اولین کلمه از دست می‌دهد. لندینگ را سبک و کدنویسی‌شده می‌سازیم که فقط چیزی را بار می‌کند که لازم دارد، پس حتی با اینترنت ضعیف هم سریع می‌ماند.",
        },
        {
          q: "فرم چطور به CRM و اتوماسیون وصل می‌شود؟",
          a: "فرم هر درخواست را به ایمیل، تلگرام یا CRM شما می‌فرستد و یک ایجنت هوش مصنوعی می‌تواند در چند ثانیه جواب بدهد و پیگیری کند، نه اینکه درخواست در صندوق ایمیل بماند. هر ثبت با منبعش برچسب می‌خورد تا بدانید کدام کمپین جواب داده است.",
          details: [{ kind: "links", items: [{ label: "اتوماسیون CRM", href: "/services/ai-automation/crm" }, { label: "اتوماسیون کسب‌وکار با هوش مصنوعی", href: "/services/ai-automation" }] }],
        },
        {
          q: "آزمون A/B هم راه می‌اندازید؟",
          a: "بله: بعد از لانچ می‌توانیم دو نسخه‌ی یک تیتر، پیشنهاد یا فرم را راه بیندازیم و با رویدادهای ثبت‌شده در صفحه بسنجیم کدام درخواست بیشتری می‌آورد. آزمون فقط با بازدید کافی معنا دارد و صادقانه می‌گوییم بازدید شما کافی هست یا نه.",
        },
        {
          q: "چه لندینگ‌هایی ساخته‌اید؟",
          a: "خانه شمیم لندینگ داستان‌محور با انیمیشن پیشرفته و فرم‌های ساختاریافته‌ی همکاری دارد و کنجد با تجربه‌ی ورود سینمایی در یک دنیای بازی تصویرسازی‌شده شروع می‌شود. هر دو برای این ساخته شده‌اند که اولین بازدید را به قدم بعدی تبدیل کنند.",
          details: [{ kind: "links", items: [{ label: "اکوسیستم خانه شمیم", href: "/work/shamim-house" }, { label: "کنجد", href: "/work/konjed" }] }],
        },
        {
          q: "لندینگ پیج یا سایت کامل؟",
          a: "لندینگ پیج برای یک کمپین، یک محصول یا یک لانچ مناسب است. سایت کامل برای کسب‌وکاری است که به صفحه‌های خدمات، نمونه‌کار و دیده شدن در جست‌وجو در طول زمان نیاز دارد. بسیاری از مشتری‌ها با لندینگ شروع می‌کنند و آن را به سایت تبدیل می‌کنند.",
          details: [{ kind: "links", items: [{ label: "طراحی سایت شرکتی", href: "/services/website-design/corporate" }] }],
        },
        {
          q: "قیمت طراحی لندینگ پیج چقدر است؟",
          a: "به محتوا، اتصال‌ها و اینکه متن و طراحی هم لازم است یا نه بستگی دارد. بعد از بررسی رایگان رشد، دامنه، قیمت قطعی و زمان‌بندی را مکتوب می‌گیرید و فقط برای دامنه‌ی توافق‌شده پرداخت می‌کنید.",
          details: [{ kind: "links", items: [{ label: "راهنمای قیمت طراحی سایت ۱۴۰۵", href: "/guides/website-design-cost" }, { label: "رزرو بررسی رایگان رشد", href: "/contact?need=web" }] }],
        },
      ],
    },
  },

  // ======================================================================================= CRM automation
  {
    kind: "service",
    slug: "crm",
    parent: "ai-automation",
    need: "ai",
    status: "published",
    needs: [],
    projects: ["ai-real-estate-os"],
    guides: ["lead-follow-up-automation-n8n"],
    en: {
      metaTitle: "CRM automation: automatic lead follow-up and sales",
      metaDescription: "CRM automation and sales follow-up with Baserow, HubSpot and n8n: leads logged automatically, followed up on time, scored and reported daily, like our real-estate system.",
      eyebrow: "AI agents & automation",
      h1: "CRM automation **for sales**",
      definition:
        "CRM automation means your customer records update themselves and follow-ups happen on time: a new lead is logged the moment it arrives, the next step is scheduled, reminders go out, and nobody has to remember to type anything in. The CRM stays accurate because people are not responsible for keeping it that way.",
      answers: [
        {
          q: "What does CRM automation do?",
          a: "It logs every new lead from your site, email and messages in the CRM, sends the follow-up messages on schedule, updates the deal status when someone replies, scores leads so the best ones come first, and sends a daily report of what happened. People handle conversations; the system handles the bookkeeping.",
          details: [
            {
              kind: "steps",
              items: [
                "Capture: leads from forms, email and chat are logged automatically",
                "Follow up: messages and reminders go out on schedule",
                "Update: statuses change when someone replies",
                "Score: the strongest leads are surfaced first",
                "Report: a daily digest for the team",
              ],
            },
          ],
        },
        {
          q: "Which CRMs and tools do you connect?",
          a: "Baserow and HubSpot as the CRM, n8n, Make or Zapier for the workflows, Google Workspace, email, website chat and messengers, and any service with an API or webhook. If your CRM is something else, we connect it as long as it can be reached by API.",
        },
        {
          q: "What does a real sales CRM look like?",
          a: `For a real-estate business we built a CRM with ${nEn(re.crmTables)} tables in Baserow for projects, contacts, campaigns, interactions, tasks and documents, kept up to date by ${nEn(re.n8nWorkflows)} n8n workflows: investor discovery and qualification, outreach and replies over email, project analysis, document creation in Google Drive, and a daily digest.`,
          details: [{ kind: "links", items: [{ label: "Case study: AI Real Estate Operating System", href: "/work/ai-real-estate-os" }] }],
        },
        {
          q: "How does lead scoring work?",
          a: "Each new lead is checked against rules you set, such as who they are, what they asked for and how they came in, and gets a score. The team sees the strongest leads first. In the real-estate system, investor discovery and qualification runs automatically before anyone writes a message.",
        },
        {
          q: "How are errors handled?",
          a: "A connection that breaks is reported, not left silent: central error handling alerts the team, and a daily report shows what ran. The real-estate system has both, and backup and security documentation was prepared for handover.",
        },
        {
          q: "How long does CRM automation take?",
          a: `A focused automation sprint, one process automated end to end, goes live in ${sprintEn}. Simple automations take days and multi-agent systems take longer. The timeline is fixed in the quote after the free audit.`,
        },
        {
          q: "How do I get a price for CRM automation?",
          a: "Book the free growth audit. In 30 minutes we look at how leads reach you and what happens next, and estimate the time the automation would save. If it fits, you get a fixed quote in writing and pay only for the agreed scope.",
          details: [{ kind: "links", items: [{ label: "Business AI automation", href: "/services/ai-automation" }, { label: "Book the free growth audit", href: "/contact?need=ai" }] }],
        },
      ],
    },
    fa: {
      metaTitle: "اتوماسیون CRM: پیگیری خودکار لید و فروش",
      metaDescription: "اتوماسیون CRM و فروش با Baserow، HubSpot و n8n: ثبت خودکار لید، پیگیری به‌موقع، امتیازدهی و گزارش روزانه؛ مثل سیستم فروش املاک ما.",
      eyebrow: "ایجنت و اتوماسیون هوش مصنوعی",
      h1: "اتوماسیون **CRM و فروش**",
      definition:
        "اتوماسیون CRM یعنی اطلاعات مشتری خودش به‌روز می‌شود و پیگیری‌ها سر وقت انجام می‌شوند: لید تازه همان لحظه ثبت می‌شود، قدم بعدی زمان‌بندی می‌شود، یادآوری می‌رود و هیچ‌کس مجبور نیست یادش بماند چیزی را تایپ کند. CRM دقیق می‌ماند، چون مسئولیت دقیق ماندنش با آدم‌ها نیست.",
      answers: [
        {
          q: "اتوماسیون CRM چه کاری می‌کند؟",
          a: "هر لید تازه را از سایت، ایمیل و پیام‌ها در CRM ثبت می‌کند، پیام‌های پیگیری را طبق برنامه می‌فرستد، وضعیت معامله را وقتی کسی جواب داد به‌روز می‌کند، لیدها را امتیاز می‌دهد تا قوی‌ترین‌ها اول بیایند و هر روز گزارش می‌دهد چه اتفاقی افتاد. آدم‌ها گفت‌وگو را انجام می‌دهند و سیستم حسابداری کار را.",
          details: [
            {
              kind: "steps",
              items: [
                "ثبت: لید از فرم، ایمیل و چت خودکار ثبت می‌شود",
                "پیگیری: پیام و یادآوری طبق برنامه",
                "به‌روزرسانی: وضعیت با جواب مشتری تغییر می‌کند",
                "امتیاز: قوی‌ترین لیدها اول نشان داده می‌شوند",
                "گزارش: خلاصه‌ی روزانه برای تیم",
              ],
            },
          ],
        },
        {
          q: "به کدام CRM و ابزارها وصل می‌شوید؟",
          a: "Baserow و HubSpot به‌عنوان CRM، n8n و Make و Zapier برای گردش‌کارها، Google Workspace، ایمیل، چت سایت و پیام‌رسان‌ها، و هر سرویسی که API یا وب‌هوک داشته باشد. اگر CRM شما چیز دیگری است، تا وقتی با API در دسترس باشد وصلش می‌کنیم.",
        },
        {
          q: "یک CRM فروش واقعی چه شکلی است؟",
          a: `برای یک کسب‌وکار املاک CRM با ${nFa(re.crmTables)} جدول در Baserow ساختیم برای پروژه‌ها، مخاطبان، کمپین‌ها، تعامل‌ها، وظایف و اسناد، که ${nFa(re.n8nWorkflows)} گردش‌کار n8n آن را به‌روز نگه می‌دارند: پیدا کردن و امتیازدهی سرمایه‌گذار، ارسال و دریافت ایمیل، تحلیل پروژه، ساخت سند در Google Drive و گزارش روزانه.`,
          details: [{ kind: "links", items: [{ label: "نمونه‌کار: سیستم‌عامل هوشمند فروش املاک", href: "/work/ai-real-estate-os" }] }],
        },
        {
          q: "امتیازدهی به لید چطور کار می‌کند؟",
          a: "هر لید تازه با قواعدی که شما تعیین می‌کنید، مثل اینکه کیست، چه خواسته و از کجا آمده، سنجیده می‌شود و امتیاز می‌گیرد. تیم قوی‌ترین لیدها را اول می‌بیند. در سیستم املاک، پیدا کردن و ارزیابی سرمایه‌گذار پیش از اینکه کسی پیامی بنویسد خودکار انجام می‌شود.",
        },
        {
          q: "اگر خطایی پیش بیاید چه می‌شود؟",
          a: "اتصالی که قطع شود بی‌صدا نمی‌ماند: مدیریت متمرکز خطا به تیم هشدار می‌دهد و گزارش روزانه نشان می‌دهد چه چیزی اجرا شد. سیستم املاک هر دو را دارد و مستندات پشتیبان‌گیری و امنیت هم برای تحویل آماده شد.",
        },
        {
          q: "اتوماسیون CRM چقدر طول می‌کشد؟",
          a: `یک اسپرینت اتوماسیون متمرکز، یعنی یک فرایند کامل از اول تا آخر، در ${sprintFa} راه می‌افتد. اتوماسیون‌های ساده چند روز و سیستم‌های چندایجنتی بیشتر طول می‌کشند. زمان‌بندی بعد از بررسی رایگان در پیشنهاد قیمت قطعی می‌آید.`,
        },
        {
          q: "قیمت اتوماسیون CRM را چطور بگیرم؟",
          a: "بررسی رایگان رشد را رزرو کنید. در ۳۰ دقیقه می‌بینیم لیدها چطور به شما می‌رسند و بعدش چه می‌شود و زمانی را که اتوماسیون صرفه‌جویی می‌کند برآورد می‌کنیم. اگر به توافق رسیدیم، قیمت قطعی و مکتوب می‌گیرید و فقط برای دامنه‌ی توافق‌شده پرداخت می‌کنید.",
          details: [{ kind: "links", items: [{ label: "اتوماسیون کسب‌وکار با هوش مصنوعی", href: "/services/ai-automation" }, { label: "رزرو بررسی رایگان رشد", href: "/contact?need=ai" }] }],
        },
      ],
    },
  },

  // ======================================================================================= chatbot
  {
    kind: "service",
    slug: "chatbot",
    parent: "ai-automation",
    need: "ai",
    status: "published",
    needs: [],
    projects: ["ai-real-estate-os"],
    guides: ["lead-follow-up-automation-n8n"],
    en: {
      metaTitle: "AI chatbot for your website: answers customers 24/7",
      metaDescription: "An AI chatbot for your website and messengers that answers customers in seconds, hands special cases to a person and logs every conversation in your CRM.",
      eyebrow: "AI agents & automation",
      h1: "AI chatbot **for your website**",
      definition:
        "An AI chatbot answers customer questions on your website or in a messenger, at any hour, using your own content. Good ones know their limits: they hand anything unusual to a person and log every conversation, so a customer is never left waiting and your team never loses context.",
      answers: [
        {
          q: "What does an AI chatbot do for a business?",
          a: "It answers common questions in seconds, collects the details of a new enquiry, books or routes the next step, and hands special cases to a person with the conversation attached. Customers get an answer at any hour, and your team spends its time on the conversations that need a human.",
          details: [
            {
              kind: "steps",
              items: [
                "Answers common questions instantly from your own content",
                "Collects the details of a new enquiry",
                "Routes the next step: booking, quote request, handover",
                "Hands special cases to a person with the full conversation",
                "Logs every conversation in the CRM",
              ],
            },
          ],
        },
        {
          q: "Where can the chatbot live?",
          a: "On your website chat, in messengers, and by email. We connect it to the channels your customers already use, so they do not have to learn a new one, and everything lands in one place for your team.",
        },
        {
          q: "How does it hand over to a person?",
          a: "You decide the rules: a complaint, a price negotiation, a question the bot cannot answer confidently, or a customer who asks for a person. The conversation is passed on with everything said so far, so the customer never has to repeat themselves.",
        },
        {
          q: "How are conversations recorded in the CRM?",
          a: "Each conversation is logged against the customer's record, with the enquiry, the answers given and the next step, so follow-up does not depend on someone remembering. This is the same pattern as our real-estate system, where every interaction is stored in a Baserow CRM.",
          details: [{ kind: "links", items: [{ label: "CRM automation", href: "/services/ai-automation/crm" }] }],
        },
        {
          q: "Have you built something like this?",
          a: "The closest example is our real-estate system, where AI assists with content and handles replies to outreach over email, inside n8n workflows and a CRM. We have not published a website chatbot case study, so we do not present one; in the free audit we say plainly what we have and have not built.",
          details: [{ kind: "links", items: [{ label: "Case study: AI Real Estate Operating System", href: "/work/ai-real-estate-os" }] }],
        },
        {
          q: "What should a chatbot not do?",
          a: "It should not invent answers, promise prices or deadlines, or pretend to be a person. A well-built bot answers only from your approved content, says when it does not know and passes the customer to a human instead of guessing.",
        },
        {
          q: "How long does it take and what does it cost?",
          a: `A focused automation sprint goes live in ${sprintEn}; the chatbot's scope decides where in that range it falls. After the free growth audit you get a fixed quote in writing and pay only for the agreed scope.`,
          details: [{ kind: "links", items: [{ label: "Business AI automation", href: "/services/ai-automation" }, { label: "Book the free growth audit", href: "/contact?need=ai" }] }],
        },
      ],
    },
    fa: {
      metaTitle: "چت‌بات هوش مصنوعی برای سایت: پاسخ ۲۴ ساعته",
      metaDescription: "چت‌بات هوش مصنوعی برای سایت و پیام‌رسان: پاسخ به مشتری در چند ثانیه، ارجاع موارد خاص به انسان و ثبت همه‌ی گفت‌وگوها در CRM.",
      eyebrow: "ایجنت و اتوماسیون هوش مصنوعی",
      h1: "چت‌بات هوش مصنوعی **برای سایت**",
      definition:
        "چت‌بات هوش مصنوعی در سایت یا پیام‌رسان شما، در هر ساعتی و با محتوای خودتان به سؤال‌های مشتری جواب می‌دهد. چت‌بات خوب حد خودش را می‌داند: هر چیز غیرمعمول را به انسان می‌سپارد و همه‌ی گفت‌وگوها را ثبت می‌کند، پس مشتری منتظر نمی‌ماند و تیم شما زمینه را از دست نمی‌دهد.",
      answers: [
        {
          q: "چت‌بات هوش مصنوعی برای یک کسب‌وکار چه کاری می‌کند؟",
          a: "به سؤال‌های رایج در چند ثانیه جواب می‌دهد، جزئیات درخواست تازه را جمع می‌کند، قدم بعدی را زمان‌بندی یا هدایت می‌کند و موارد خاص را با گفت‌وگوی ضمیمه‌شده به انسان می‌سپارد. مشتری در هر ساعتی جواب می‌گیرد و تیم شما وقتش را روی گفت‌وگوهایی می‌گذارد که انسان لازم دارند.",
          details: [
            {
              kind: "steps",
              items: [
                "جواب فوری به سؤال‌های رایج از محتوای خودتان",
                "جمع کردن جزئیات درخواست تازه",
                "هدایت قدم بعدی: رزرو، درخواست قیمت، تحویل به انسان",
                "تحویل موارد خاص به انسان با کل گفت‌وگو",
                "ثبت همه‌ی گفت‌وگوها در CRM",
              ],
            },
          ],
        },
        {
          q: "چت‌بات کجا قرار می‌گیرد؟",
          a: "در چت سایت، در پیام‌رسان‌ها و ایمیل. آن را به کانال‌هایی وصل می‌کنیم که مشتری‌های شما همین حالا استفاده می‌کنند، پس لازم نیست کانال تازه‌ای یاد بگیرند و همه‌چیز برای تیم شما یک‌جا جمع می‌شود.",
        },
        {
          q: "تحویل به انسان چطور انجام می‌شود؟",
          a: "قاعده را شما تعیین می‌کنید: شکایت، چانه‌زنی روی قیمت، سؤالی که بات با اطمینان جوابش را نمی‌داند، یا مشتری‌ای که انسان می‌خواهد. گفت‌وگو با همه‌ی حرف‌های قبلی منتقل می‌شود تا مشتری مجبور نباشد حرفش را تکرار کند.",
        },
        {
          q: "گفت‌وگوها چطور در CRM ثبت می‌شوند؟",
          a: "هر گفت‌وگو روی پرونده‌ی مشتری، با درخواست، جواب‌های داده‌شده و قدم بعدی ثبت می‌شود تا پیگیری به یاد کسی بستگی نداشته باشد. همین الگو در سیستم املاک ما هست که هر تعامل در یک CRM روی Baserow ذخیره می‌شود.",
          details: [{ kind: "links", items: [{ label: "اتوماسیون CRM", href: "/services/ai-automation/crm" }] }],
        },
        {
          q: "چیزی شبیه این ساخته‌اید؟",
          a: "نزدیک‌ترین نمونه سیستم فروش املاک ماست که در آن هوش مصنوعی در تولید محتوا کمک می‌کند و پاسخ‌های ایمیل را داخل گردش‌کارهای n8n و یک CRM مدیریت می‌کند. نمونه‌کار چت‌بات سایت منتشر نکرده‌ایم، پس ادعایش را هم نمی‌کنیم؛ در بررسی رایگان روشن می‌گوییم چه چیزی ساخته‌ایم و چه چیزی نه.",
          details: [{ kind: "links", items: [{ label: "نمونه‌کار: سیستم‌عامل هوشمند فروش املاک", href: "/work/ai-real-estate-os" }] }],
        },
        {
          q: "چت‌بات نباید چه کارهایی بکند؟",
          a: "نباید جواب بسازد، قیمت یا زمان تحویل قول بدهد یا خودش را انسان جا بزند. بات درست‌ساخته فقط از محتوای تأییدشده‌ی شما جواب می‌دهد، وقتی نمی‌داند می‌گوید نمی‌داند و به‌جای حدس زدن مشتری را به انسان می‌سپارد.",
        },
        {
          q: "چقدر طول می‌کشد و هزینه‌اش چقدر است؟",
          a: `یک اسپرینت اتوماسیون متمرکز در ${sprintFa} راه می‌افتد و دامنه‌ی چت‌بات تعیین می‌کند در کجای این بازه قرار می‌گیرد. بعد از بررسی رایگان رشد، قیمت قطعی و مکتوب می‌گیرید و فقط برای دامنه‌ی توافق‌شده پرداخت می‌کنید.`,
          details: [{ kind: "links", items: [{ label: "اتوماسیون کسب‌وکار با هوش مصنوعی", href: "/services/ai-automation" }, { label: "رزرو بررسی رایگان رشد", href: "/contact?need=ai" }] }],
        },
      ],
    },
  },
];
