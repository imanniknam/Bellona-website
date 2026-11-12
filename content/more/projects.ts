import { facts, fmt } from "../facts";
import type { Answer } from "../spokes";
import type { Locale } from "../types";
import { care } from "./projects-care";
import { projects } from "../work";
import { extra } from "./projects-extra";

/**
 * Extra case-study sections (SEO-GUIDELINE D10), keyed by project slug: how it was built, what each technology is
 * for, and where to see the same kind of work. Everything stated about a project comes from content/work.ts and
 * content/facts.ts; the "what is X" notes are general descriptions of the tools.
 * TODO(owner): a measurable result and a client quote for every project that has none (marked in content/work.ts).
 */
type More = Record<string, Record<Locale, Answer[]>>;

const re = facts.projects.realEstate;
const sprintFa = fmt.weeks(facts.timelines.automationSprintWeeks, "fa");
const sprintEn = fmt.weeks(facts.timelines.automationSprintWeeks, "en");
const en = (v: number) => fmt.n(v, "en");
const fa = (v: number) => fmt.n(v, "fa");

const askFa = (href: string, label: string): Answer["details"] => [{ kind: "links", items: [{ label, href }, { label: "رزرو بررسی رایگان", href: "/contact" }] }];
const askEn = (href: string, label: string): Answer["details"] => [{ kind: "links", items: [{ label, href }, { label: "Book the free audit", href: "/contact" }] }];

const raw: More = {
  "ai-real-estate-os": {
    fa: [
      {
        q: "سیستم فروش املاک از چه بخش‌هایی ساخته شده است؟",
        a: `سه بخش اصلی: ${fa(re.n8nWorkflows)} گردش‌کار n8n که کارها را پیش می‌برند (از مدیریت متمرکز خطا تا گزارش روزانه)، یک CRM با ${fa(re.crmTables)} جدول در Baserow برای پروژه‌ها، مخاطبان، کمپین‌ها، تعامل‌ها، کارها و اسناد، و نوشتن محتوا با Claude همراه با ارسال و دریافت ایمیل با SMTP و IMAP.`,
      },
      {
        q: "یک مشتری بالقوه از چه مسیری می‌گذرد؟",
        a: "گردش‌کارها سرمایه‌گذار را پیدا می‌کنند، ارزیابی‌اش می‌کنند و امتیاز می‌دهند، برایش پیام می‌نویسند و می‌فرستند، پاسخ‌ها را مدیریت می‌کنند، پروژه را تحلیل می‌کنند و سند آماده می‌کنند. همه‌ی تعامل‌ها در CRM ثبت می‌شود و گزارش روزانه به دست تیم می‌رسد.",
        details: [
          {
            kind: "steps",
            items: ["پیدا کردن و امتیازدهی سرمایه‌گذارها", "نوشتن و فرستادن پیام با کمک Claude و ایمیل", "مدیریت پاسخ‌ها", "تحلیل پروژه و ساخت سند در Google Drive", "ثبت همه‌چیز در CRM و گزارش روزانه"],
          },
        ],
      },
      {
        q: "هر فناوری چه نقشی دارد؟",
        a: "n8n ابزار ساخت گردش‌کار خودکار است و Baserow پایگاه داده‌ای جدولی برای CRM. Claude API بخش هوش مصنوعی نوشتن محتواست، SMTP و IMAP ایمیل‌ها را می‌فرستند و دریافت می‌کنند، Google Drive اسناد را نگه می‌دارد و Docker اجرای امن سیستم را روی سرور ممکن می‌کند.",
      },
      {
        q: "در تحویل پروژه چه چیزهایی بود؟",
        a: "افزون بر خود سیستم، مستندات کامل پشتیبان‌گیری و امنیت هم آماده شد تا کسب‌وکار به ما وابسته نماند و بتواند سیستم را نگه دارد و گسترش دهد.",
        // TODO(owner): a measurable result for this system (e.g. hours saved per week, leads handled) and a client quote.
      },
      {
        q: "می‌خواهم فروشم را خودکار کنم؛ از کجا شروع کنیم؟",
        a: `از بررسی رایگان: فرایند فعلی فروشتان را بررسی می‌کنیم و می‌گوییم کدام بخش‌ها خودکارشدنی‌اند. یک دوره‌ی متمرکز اتوماسیون ظرف ${sprintFa} راه می‌افتد و قیمت قطعی و مکتوب می‌گیرید.`,
        details: askFa("/services/ai-automation", "اتوماسیون کسب‌وکار با هوش مصنوعی"),
      },
    ],
    en: [
      {
        q: "What is the real-estate sales system made of?",
        a: `Three main parts: ${en(re.n8nWorkflows)} n8n workflows that run operations (from central error handling to a daily digest), a ${en(re.crmTables)}-table Baserow CRM for projects, contacts, campaigns, interactions, tasks and documents, and Claude-assisted content with SMTP and IMAP email sending and receiving.`,
      },
      {
        q: "What path does a prospect take through the system?",
        a: "Workflows find and qualify an investor, write and send outreach, handle replies, analyze the project and prepare documents. Every interaction is logged in the CRM and a daily report reaches the team.",
        details: [
          {
            kind: "steps",
            items: ["Find and score an investor", "Write and send outreach with Claude and email", "Handle replies", "Analyze the project and create documents in Google Drive", "Log everything in the CRM and send a daily report"],
          },
        ],
      },
      {
        q: "What does each technology do?",
        a: "n8n is the workflow automation tool and Baserow the table database behind the CRM. The Claude API generates content, SMTP and IMAP send and receive email, Google Drive stores documents and Docker lets the system run safely on a server.",
      },
      {
        q: "What did the handover include?",
        a: "Besides the system itself, full backup and security documentation was prepared for handover, so the business does not depend on us and can maintain and extend the system.",
        // TODO(owner): a measurable result for this system (e.g. hours saved per week, leads handled) and a client quote.
      },
      {
        q: "I want to automate my sales; where do we start?",
        a: `With the free audit: we read your current sales process and tell you which parts can be automated. A focused automation sprint goes live in ${sprintEn} and you get a fixed quote in writing.`,
        details: askEn("/services/ai-automation", "Business AI automation"),
      },
    ],
  },

  // ============================================================================================ education
  codechee: {
    fa: [
      {
        q: "کدچی چطور ساخته شد؟",
        a: "کدچی پایتون، داده، هوش مصنوعی و امنیت سایبری را به دانش‌آموزان یاد می‌دهد و یادگیری‌اش باید حس بازی داشت. مسیرهای یادگیری بازی‌وار (استارکمپ) با دوره‌های مرحله‌بندی‌شده، بخش‌های بازی، آزمونک و اتاق فرار، برنامه‌هایی برای مدرسه‌ها و رویدادهایی مثل شریف کاپ، و حساب کاربری دانش‌آموز با پیگیری پیشرفت ساختیم.",
      },
      {
        q: "پلتفرم آموزشی بازی‌وار می‌خواهم؛ از کجا شروع کنم؟",
        a: "با بررسی رایگان: نیاز آموزشی و مخاطبتان را بررسی می‌کنیم و برای ساخت پلتفرم قیمت قطعی و مکتوب می‌دهیم.",
        details: askFa("/industries/education", "طراحی سایت و پلتفرم آموزشی"),
        // TODO(owner): a measurable result (students, courses) and a client quote.
      },
    ],
    en: [
      {
        q: "How was Codechee built?",
        a: "Codechee teaches Python, data, AI and cybersecurity to school students, and learning had to feel like play. We built gamified learning paths (Starcamps) with leveled courses, gameplay, quiz and escape-room sections, programs for schools and events such as Sharif Cup, and student accounts with progress tracking.",
      },
      {
        q: "I want a gamified learning platform; where do I start?",
        a: "With the free audit: we read your learning needs and audience and give you a fixed quote in writing for building the platform.",
        details: askEn("/industries/education", "Education websites and platforms"),
        // TODO(owner): a measurable result (students, courses) and a client quote.
      },
    ],
  },

  konjed: {
    fa: [
      {
        q: "کنجد چطور ساخته شد؟",
        a: "کنجد مهارت‌های زندگی مثل مدیریت پول، حل مسئله و کارآفرینی را یاد می‌دهد و محصول باید اول حس بازی بدهد و بعد حس کلاس. ورودی سینمایی در دنیایی بازی‌گونه و تصویرسازی‌شده، بخش بازی با مینی‌گیم‌های مهارتی، مأموریت، امتیاز و دستاورد، مدرسه‌ی مهارت و ویترین پروژه‌های هنرجوها را ساختیم.",
      },
      {
        q: "بخش بازی و مأموریت‌ها به چه کاری می‌آیند؟",
        a: "هر مینی‌گیم یک مهارت را تمرین می‌دهد (مثلاً مدیریت پول یا حل مسئله) و مأموریت‌ها و امتیازها به پیشرفت پاداش می‌دهند تا یادگیری با انگیزه ادامه پیدا کند.",
      },
      {
        q: "پلتفرم آموزشی بازی‌گونه برای نوجوان‌ها می‌خواهم؛ از کجا شروع کنم؟",
        a: "بررسی رایگان را رزرو کنید؛ مخاطب و مهارت‌های هدف را بررسی می‌کنیم و قیمت قطعی و مکتوب می‌دهیم.",
        details: askFa("/industries/education", "پلتفرم‌های آموزشی"),
        // TODO(owner): a measurable result and a client quote.
      },
    ],
    en: [
      {
        q: "How was Konjed built?",
        a: "Konjed teaches life skills such as money management, problem solving and entrepreneurship, and the product had to feel like a game first and a course second. We built a cinematic entry experience in an illustrated game world, an arcade of skill-based mini games, missions, points and achievements, a skill school and a showcase of learners' projects.",
      },
      {
        q: "What are the arcade and missions for?",
        a: "Each mini game practises one skill (for example money management or problem solving), and missions and points reward progress so learning keeps going with motivation.",
      },
      {
        q: "I want a play-based learning platform for teenagers; where do I start?",
        a: "Book the free audit; we read your audience and target skills and give you a fixed quote in writing.",
        details: askEn("/industries/education", "Education platforms"),
        // TODO(owner): a measurable result and a client quote.
      },
    ],
  },

  // ============================================================================================ stores and brands
  "nira-perfume": {
    fa: [
      {
        q: "فروشگاه عطر نیرا چطور ساخته شد؟",
        a: "نیرا عطر اصل می‌فروشد و برای برندها عطر اختصاصی می‌سازد و سایت باید هر دو را با حس آرام و لوکس یک عطرسرا و به زبان فارسی نشان دهد. ویترینی برندمحور با مجموعه‌ی نیرا، بخش ساخت عطر سازمانی، صفحه‌های گالری و آرشیو و جست‌وجوی محصول و سبد خرید ساختیم.",
      },
      {
        q: "فروشگاه برای یک برند لوکس می‌خواهم؛ چه کنم؟",
        a: "بررسی رایگان را رزرو کنید؛ محصولات و برندتان را بررسی می‌کنیم و قیمت قطعی و مکتوب می‌دهیم.",
        details: askFa("/services/website-design/ecommerce", "طراحی سایت فروشگاهی"),
        // TODO(owner): a measurable result and a client quote.
      },
    ],
    en: [
      {
        q: "How was the Nira Perfume store built?",
        a: "Nira sells original fragrances and creates custom perfumes for brands, and the site had to present both with the calm, premium feel of a luxury house, in Persian. We built a brand-led storefront with the Nira collection, a dedicated section for custom corporate perfumes, gallery and archive pages, product search and a cart.",
      },
      {
        q: "I want a store for a luxury brand; what do I do?",
        a: "Book the free audit; we read your products and brand and give you a fixed quote in writing.",
        details: askEn("/services/website-design/ecommerce", "E-commerce website design"),
        // TODO(owner): a measurable result and a client quote.
      },
    ],
  },

  "mojasame-saidi": {
    fa: [
      {
        q: "فروشگاه مجسمه سعیدی چطور ساخته شد؟",
        a: "اثر دست‌ساز باید دیده شود. هدف فروشگاهی بود که روی گوشی لوکس به نظر برسد، در گوگل پیدا شود و بعدها پنل مدیریت هم بپذیرد. فروشگاهی موبایل‌محور و سئومحور با دسته‌بندی روشن محصولات، سبد خرید پایدار با مرز روشن میان کاربر مهمان و واردشده، فرم‌های خرید با بررسی خودکار ورودی‌ها و لایه‌ی داده‌ی آماده‌ی بهره‌برداری ساختیم.",
      },
      {
        q: "هر فناوری چه نقشی دارد؟",
        a: "نکست جی اس 15 صفحه‌ها را سمت سرور می‌سازد، Prisma ORM و PostgreSQL داده‌ها را مدیریت می‌کنند، Zustand وضعیت سبد خرید را نگه می‌دارد و Zod ورودی فرم‌ها را بررسی می‌کند.",
      },
      {
        q: "فروشگاه برای محصول دست‌ساز می‌خواهم؛ چه کنم؟",
        a: "بررسی رایگان را رزرو کنید؛ محصولاتتان را بررسی می‌کنیم و قیمت قطعی و مکتوب می‌دهیم.",
        details: askFa("/services/website-design/ecommerce", "طراحی سایت فروشگاهی"),
        // TODO(owner): a measurable result and a client quote.
      },
    ],
    en: [
      {
        q: "How was the Mojasame Saidi store built?",
        a: "Handcrafted pieces need room to be seen. The store had to feel premium on a phone, be found in search and be ready for admin workflows later. We built a mobile-first, SEO-focused storefront with clear product categories, a persistent cart with clear authentication boundaries, validated forms through checkout and a production-ready data layer.",
      },
      {
        q: "What do the technologies do?",
        a: "Next.js 15 builds pages on the server, Prisma ORM and PostgreSQL manage the store's data, Zustand holds the cart state and Zod validates form input so incomplete orders are caught before checkout.",
      },
      {
        q: "I want a store for handmade products; what do I do?",
        a: "Book the free audit; we read your products and give you a fixed quote in writing.",
        details: askEn("/services/website-design/ecommerce", "E-commerce website design"),
        // TODO(owner): a measurable result and a client quote.
      },
    ],
  },

  prowem: {
    fa: [
      {
        q: "اپلیکیشن Prowem چطور ساخته شد؟",
        a: "داده‌ی مسابقات، تیم‌ها، بازیکن‌ها و مکان‌ها نباید میان iOS، اندروید و پلتفرم رویداد ناهماهنگ شود و نتیجه باید حین بازی به‌روز باشد. نتیجه‌ی زنده‌ی بازی‌ها، برنامه‌ی مسابقات، جدول رده‌بندی و گلزنان، مدیریت تیم و بازیکن با معماری ماژولار Flutter و هماهنگ‌سازی داده با REST API ساختیم.",
      },
      {
        q: "چرا Flutter؟",
        a: "Flutter و زبان Dart این امکان را می‌دهند که با یک پایه‌ی کد هم اپ iOS ساخت و هم اندروید. REST API و بک‌اند PHP داده را میان اپ موبایل و پلتفرم رویداد هماهنگ نگه می‌دارند.",
      },
      {
        q: "اپلیکیشن موبایل می‌خواهم؛ چه کنم؟",
        a: "بررسی رایگان را رزرو کنید؛ محصول و مخاطبتان را بررسی می‌کنیم و قیمت قطعی و مکتوب می‌دهیم.",
        details: askFa("/services/full-stack-development", "نرم‌افزار و محصول"),
        // TODO(owner): a measurable result, store links for the app and a client quote.
      },
    ],
    en: [
      {
        q: "How was the Prowem app built?",
        a: "Tournaments, teams, players and venues had to stay in sync between iOS, Android and the event platform, with scores updating while the match is still on. We built live match updates, schedules, standings and top scorers, team and player administration on a modular Flutter architecture and REST API sync.",
      },
      {
        q: "Why Flutter?",
        a: "Flutter and the Dart language let one codebase build both iOS and Android. A REST API and a PHP back end keep data in sync between the mobile app and the event platform.",
      },
      {
        q: "I want a mobile app; what do I do?",
        a: "Book the free audit; we read your product and audience and give you a fixed quote in writing.",
        details: askEn("/services/full-stack-development", "Full-stack and product development"),
        // TODO(owner): a measurable result, store links for the app and a client quote.
      },
    ],
  },
};

// Names the project, so the closing sentence is not the same word for word on a dozen case studies.
const CTA: Record<Locale, (title: string) => string> = {
  fa: (title) => ` تماس ۳۰ دقیقه‌ای است؛ برای پروژه‌ای مثل «${title}» مسئله را بیاورید، لازم نیست برنامه داشته باشید، و فقط برای دامنه‌ی توافق‌شده و مکتوب پرداخت می‌کنید.`,
  en: (title) => ` The call takes 30 minutes: for a project like ${title}, bring the problem, not a plan, and you pay only for the scope agreed in writing.`,
};
const words = (t: string) => t.trim().split(/\s+/).length;

/** A call-to-action answer (one that links to /contact) shorter than a direct answer should be gets the standard call details. */
export const more: More = Object.fromEntries(
  Object.entries(raw).map(([slug, byLocale]) => [
    slug,
    Object.fromEntries(
      (Object.keys(byLocale) as Locale[]).map((locale) => [
        locale,
        // Longer case-study sections (projects-extra.ts) go in before the closing "where do we start" question.
        [...byLocale[locale].slice(0, -1), ...(extra[slug]?.[locale] ?? []), ...(care[slug]?.[locale] ?? []), ...byLocale[locale].slice(-1)].map((x) =>
          x.a && words(x.a) < 25 && x.details?.some((d) => d.kind === "links" && d.items.some((i) => i.href === "/contact")) ? { ...x, a: x.a + CTA[locale](projects.find((p) => p.slug === slug)?.[locale].title ?? "") } : x,
        ),
      ]),
    ),
  ]),
) as More;
