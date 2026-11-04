import type { ModelName } from "@/components/voxel/models";
import { facts, fmt } from "./facts";
import type { PillarId, ProjectType } from "./types";

// Project figures live in content/facts.ts (docs/seo G-06).
const re = facts.projects.realEstate;
const dane = facts.projects.dane;
const en = (v: number) => fmt.n(v, "en");
const fa = (v: number) => fmt.n(v, "fa");

/**
 * Case studies. See README › "Add a case study".
 * Order matters: the list is ranked, strongest first. `featured` projects also appear on the home page.
 *
 * status:
 *   "published"   – shown in grids, gets its own /work/[slug] page, listed in the sitemap.
 *   "placeholder" – an empty, designed slot in the grids (no link, no page).
 *   "preview"     – gets a noindex page so you can see the template; hidden from grids and the sitemap.
 *
 * Never put a number in `results` that you cannot source.
 */

export type ProjectStatus = "published" | "placeholder" | "preview";
export type ProjectTone = "ink" | "orange" | "paper" | "graphite";

export interface ProjectCopy {
  title: string;
  client: string;
  sector: string;
  summary: string;
  challenge: string;
  built: string[];
  results: { value: string; label: string }[];
  quote?: { text: string; name: string; role: string };
  /** Delivered together with a partner (shown on the case study). */
  partner?: string;
}

export interface ProjectImage {
  src: string;
  width: number;
  height: number;
  kind: "desktop" | "mobile";
}

export interface Project {
  slug: string;
  status: ProjectStatus;
  /** What it is: drives the card label, cover alt text and the Persian case-study title. */
  type: ProjectType;
  featured?: boolean;
  pillars: PillarId[];
  /** Industry ids (content › industries.items) this project is listed under on /industries. */
  industries?: string[];
  tone: ProjectTone;
  /** Voxel shape shown instead of a screenshot, e.g. for private back-office work. */
  model?: ModelName;
  /** Live site. */
  url?: string;
  year?: string;
  /** Image under /public, e.g. "/work/acme/cover.jpg" (16:10, at least 1440px wide). */
  cover?: string;
  gallery?: ProjectImage[];
  stack?: string[];
  en: ProjectCopy;
  fa: ProjectCopy;
}

const desktop = (src: string): ProjectImage => ({ src, width: 1440, height: 900, kind: "desktop" });
const mobile = (src: string): ProjectImage => ({ src, width: 780, height: 1688, kind: "mobile" });
/** /work/<slug>/shot-1..n.jpg plus mobile.jpg. */
const shots = (slug: string, n: number): ProjectImage[] => [
  ...Array.from({ length: n }, (_, i) => desktop(`/work/${slug}/shot-${i + 1}.jpg`)),
  mobile(`/work/${slug}/mobile.jpg`),
];
const SHAMIM = { en: "Shamim startup", fa: "استارتاپ شمیم" };

export const projects: Project[] = [
  {
    slug: "ai-real-estate-os",
    status: "published",
    type: "automation",
    featured: true,
    pillars: ["ai", "growth"],
    industries: ["real-estate"],
    tone: "ink",
    model: "house",
    url: "https://kharazie.at",
    cover: "/work/ai-real-estate-os/cover-art.jpg",
    gallery: shots("ai-real-estate-os", 4),
    stack: ["n8n", "Baserow", "Claude API", "Google Drive", "SMTP / IMAP", "Docker"],
    en: {
      title: "AI Real Estate Operating System",
      client: "kharazie.at",
      sector: "Real estate · AI automation",
      summary:
        "A complete sales-automation system for a real-estate business: investor discovery, qualification, outreach, replies, project analysis, documents and daily operations.",
      challenge:
        "Selling real-estate projects to investors meant finding them, qualifying them, writing to them, following up and preparing documents, every single day. The system had to run that whole chain and be ready to hand over.",
      built: [
        `${en(re.n8nWorkflows)} n8n workflows, from centralised error handling to a daily digest`,
        `A ${en(re.crmTables)}-table Baserow CRM for projects, contacts, campaigns, interactions, tasks and documents`,
        "Claude-assisted content with SMTP/IMAP outreach and reply handling",
        "Google Drive documents, plus backup and security documentation for handover",
      ],
      results: [
        { value: `${en(re.n8nWorkflows)}`, label: "n8n workflows running the sales operation" },
        { value: `${en(re.crmTables)}`, label: "CRM tables in one Baserow base" },
      ],
    },
    fa: {
      title: "سیستم هوشمند فروش املاک",
      client: "kharazie.at",
      sector: "املاک · اتوماسیون هوش مصنوعی",
      summary: "سیستم کامل اتوماسیون فروش برای یک کسب‌وکار املاک: از پیدا کردن و امتیازدهی سرمایه‌گذارها تا ارتباط، پاسخ‌گویی، تحلیل پروژه، تهیه‌ی سند و کارهای روزانه.",
      challenge:
        "فروش پروژه‌های ملکی به سرمایه‌گذارها یعنی هر روز پیدا کردنشان، سنجیدنشان، نوشتن برایشان، پیگیری و آماده کردن سند. قرار بود سیستم کل این زنجیره را خودش پیش ببرد و آماده‌ی تحویل باشد.",
      built: [
        `${fa(re.n8nWorkflows)} گردش‌کار n8n؛ از مدیریت متمرکز خطا تا گزارش روزانه`,
        `CRM با ${fa(re.crmTables)} جدول در Baserow برای پروژه‌ها، مخاطبان، کمپین‌ها، تعامل‌ها، کارها و اسناد`,
        "نوشتن محتوا با Claude و ارسال و دریافت ایمیل با SMTP/IMAP",
        "ساخت سند در Google Drive و مستندات کامل پشتیبان‌گیری و امنیت برای تحویل",
      ],
      results: [
        { value: `${fa(re.n8nWorkflows)}`, label: "گردش‌کار n8n که کارهای فروش را پیش می‌برد" },
        { value: `${fa(re.crmTables)}`, label: "جدول CRM در یک پایگاه Baserow" },
      ],
    },
  },
  {
    slug: "codechee",
    status: "published",
    type: "product",
    featured: true,
    pillars: ["product", "web"],
    industries: ["education"],
    tone: "graphite",
    url: "https://codechee.ir",
    cover: "/work/codechee/cover-art.jpg",
    gallery: [
      desktop("/work/codechee/shot-1.jpg"),
      desktop("/work/codechee/shot-2.jpg"),
      desktop("/work/codechee/shot-3.jpg"),
      desktop("/work/codechee/shot-4.jpg"),
      mobile("/work/codechee/mobile.jpg"),
    ],
    en: {
      title: "Codechee",
      client: "Codechee",
      sector: "Education · Programming & AI",
      summary: "A platform that teaches programming and AI to students through play, with learning paths, gameplay, quizzes and an escape room.",
      challenge:
        "Codechee teaches Python, data, AI and cybersecurity to school students. Learning had to feel like play, with clear levels and visible progress.",
      built: [
        "Gamified learning paths (Starcamps) with leveled courses",
        "Gameplay, quiz and escape-room sections",
        "Programs for schools and events such as Sharif Cup",
        "Student accounts with progress tracking",
      ],
      results: [], // TODO(owner): a measurable result and a client quote for this project (SEO-GUIDELINE D10)
    },
    fa: {
      title: "کدچی",
      client: "کدچی",
      sector: "آموزش · برنامه‌نویسی و هوش مصنوعی",
      summary: "پلتفرمی که برنامه‌نویسی و هوش مصنوعی را با بازی به دانش‌آموزان یاد می‌دهد؛ با مسیرهای آموزشی، بازی، آزمونک و اتاق فرار.",
      challenge: "کدچی پایتون، داده، هوش مصنوعی و امنیت سایبری را به دانش‌آموزان یاد می‌دهد. یادگیری باید حس بازی داشته باشد، با مرحله‌های روشن و پیشرفتی که به چشم بیاید.",
      built: ["مسیرهای یادگیری بازی‌وار (استارکمپ) با دوره‌های مرحله‌بندی‌شده", "بخش‌های بازی، آزمونک و اتاق فرار", "برنامه‌هایی برای مدارس و رویدادهایی مثل شریف کاپ", "حساب کاربری دانش‌آموز با پیگیری پیشرفت"],
      results: [], // TODO(owner): a measurable result and a client quote for this project (SEO-GUIDELINE D10)
    },
  },
  {
    slug: "yasin",
    status: "published",
    type: "website",
    featured: true,
    pillars: ["web"],
    industries: ["education"],
    tone: "graphite",
    url: "https://yasinow.ir",
    cover: "/work/yasin/cover-art.jpg",
    gallery: shots("yasin", 3),
    stack: ["Next.js 15", "GSAP", "Three.js", "Lenis", "TypeScript"],
    en: {
      title: "Yasin Skill School",
      client: "Yasin Skill School",
      sector: "Education · Immersive learning",
      summary: "An immersive Persian learning experience that turns skill-building into a visual adventure across courses, mentors and registration.",
      challenge:
        "Yasin wanted learning a skill to feel like an adventure, not a brochure, without the site turning slow on phones or on Iranian internet connections.",
      built: [
        "A game-like narrative with GSAP, Three.js and Lenis that stays responsive",
        "Journeys for courses, mentors and registration",
        "Centralised copy and separately optimized desktop and mobile media",
        "Device-aware effects and self-hosted fonts for reliable performance in Iran",
      ],
      results: [], // TODO(owner): a measurable result and a client quote for this project (SEO-GUIDELINE D10)
      partner: SHAMIM.en,
    },
    fa: {
      title: "مدرسه مهارت یاسین",
      client: "مدرسه مهارت یاسین",
      sector: "آموزش · تجربه‌ی تعاملی",
      summary: "تجربه‌ی آموزشی فارسی و فراگیری که یادگیری مهارت را به ماجراجویی‌ای تصویری میان دوره‌ها، مربی‌ها و ثبت‌نام تبدیل می‌کند.",
      challenge: "یاسین می‌خواست یادگیری مهارت حس ماجراجویی بدهد، نه حس بروشور؛ بی‌آنکه سایت روی موبایل یا با اینترنت ایران کند شود.",
      built: [
        "روایت بازی‌گونه با GSAP، Three.js و Lenis، بی‌آنکه روانی صفحه فدا شود",
        "مسیرهای دوره‌ها، مربی‌ها و ثبت‌نام",
        "محتوای یک‌جا و تصویرهای بهینه‌ی جداگانه برای دسکتاپ و موبایل",
        "جلوه‌های بصری متناسب با توان دستگاه و فونت‌هایی که روی سرور خود سایت میزبانی می‌شوند تا در ایران پایدار بماند",
      ],
      results: [], // TODO(owner): a measurable result and a client quote for this project (SEO-GUIDELINE D10)
      partner: SHAMIM.fa,
    },
  },
  {
    slug: "konjed",
    status: "published",
    type: "product",
    pillars: ["product", "web"],
    industries: ["education"],
    tone: "ink",
    url: "https://konjed.top",
    cover: "/work/konjed/cover-art.jpg",
    gallery: [desktop("/work/konjed/shot-1.jpg"), desktop("/work/konjed/shot-2.jpg"), mobile("/work/konjed/mobile.jpg")],
    en: {
      title: "Konjed",
      client: "Konjed",
      sector: "Education · Gamified learning",
      summary: "A gamified learning platform where teenagers build life skills by playing: games, missions, achievements and a showcase of their own projects.",
      challenge:
        "Konjed teaches life skills such as money management, problem solving and entrepreneurship. The product had to feel like a game first and a course second, in Persian and on any screen.",
      built: [
        "A cinematic landing experience set in an illustrated game world",
        "A game arcade of skill-based mini games",
        "Missions, points and achievements that reward progress",
        "A skill school and a showcase of learners' projects",
      ],
      results: [], // TODO(owner): a measurable result and a client quote for this project (SEO-GUIDELINE D10)
    },
    fa: {
      title: "کنجد",
      client: "کنجد",
      sector: "آموزش · یادگیری بازی‌وار",
      summary: "پلتفرم یادگیری بازی‌واری که نوجوان‌ها در آن با بازی مهارت‌های زندگی را یاد می‌گیرند: بازی، مأموریت، دستاورد و ویترینی از پروژه‌های خودشان.",
      challenge:
        "کنجد مهارت‌هایی مثل مدیریت پول، حل مسئله و کارآفرینی را یاد می‌دهد. محصول باید اول حس بازی بدهد و بعد حس کلاس؛ به فارسی و روی هر صفحه‌نمایشی.",
      built: [
        "ورودی سینمایی در دنیایی بازی‌گونه و تصویرسازی‌شده",
        "بخش بازی با مینی‌گیم‌های مهارتی",
        "مأموریت، امتیاز و دستاورد برای پاداش دادن به پیشرفت",
        "مدرسه‌ی مهارت و ویترین پروژه‌های هنرجوها",
      ],
      results: [], // TODO(owner): a measurable result and a client quote for this project (SEO-GUIDELINE D10)
    },
  },
  {
    slug: "microshamim",
    status: "published",
    type: "website",
    pillars: ["web"],
    industries: ["education"],
    tone: "orange",
    // TODO(owner): final domain of the Microshamim site. The Vercel test address below is not linked or indexed (SEO-GUIDELINE 8).
    // url: "https://microshamim-rosy.vercel.app",
    cover: "/work/microshamim/cover-art.jpg",
    gallery: [desktop("/work/microshamim/shot-1.jpg"), desktop("/work/microshamim/shot-2.jpg"), mobile("/work/microshamim/mobile.jpg")],
    en: {
      title: "Microshamim",
      client: "Shamim innovation micro-factory",
      sector: "Innovation hub · Education",
      summary: "The website for Shamim's innovation micro-factory: a space for young women with a skill school, co-working space, content studio and events.",
      challenge:
        "Microshamim brings learning, co-working and content production under one roof. The site had to explain every space clearly and still feel bold and youthful.",
      built: [
        "A playful, collage-style art direction",
        "Pages for the skill school, co-working space, content studio and events",
        "A request-to-use-the-space call to action throughout",
        "A magazine section",
      ],
      results: [], // TODO(owner): a measurable result and a client quote for this project (SEO-GUIDELINE D10)
    },
    fa: {
      title: "میکروشمیم",
      client: "میکروکارخانه‌ی نوآوری شمیم",
      sector: "مرکز نوآوری · آموزش",
      summary: "سایت میکروکارخانه‌ی نوآوری شمیم: فضایی برای دختران و زنان جوان با مدرسه‌ی مهارت، فضای کار اشتراکی، استودیوی تولید محتوا و رویدادها.",
      challenge: "میکروشمیم یادگیری، کار اشتراکی و تولید محتوا را زیر یک سقف جمع کرده است. سایت باید همه‌ی فضاها را روشن معرفی کند و در عین حال جسور و جوان بماند.",
      built: ["طراحی هنری بازیگوش با حال‌وهوای کلاژ", "صفحه‌های مدرسه‌ی مهارت، فضای کار اشتراکی، استودیوی محتوا و رویدادها", "دعوت به درخواست استفاده از فضا در سرتاسر سایت", "بخش مجله"],
      results: [], // TODO(owner): a measurable result and a client quote for this project (SEO-GUIDELINE D10)
    },
  },
  {
    slug: "sabzino",
    status: "published",
    type: "website",
    pillars: ["product", "web"],
    industries: ["ecommerce"],
    tone: "paper",
    url: "https://sabzinow.ir",
    cover: "/work/sabzino/cover-art.jpg",
    gallery: shots("sabzino", 3),
    stack: ["React 19", "TypeScript", "Cloudflare D1", "Drizzle", "Zarinpal"],
    en: {
      title: "Sabzino",
      client: "Sabzino",
      sector: "E-commerce · Social enterprise",
      summary: "An online store for a social enterprise selling vegetable-based products, international spices and natural drinks.",
      challenge: "Sabzino needed a real store, not a catalog: online payments, customer accounts and an admin the team can run on its own.",
      built: [
        "Responsive cart, customer accounts and checkout",
        "Online payments through Zarinpal",
        "An independent admin for products, inventory, pricing and orders",
        "A Cloudflare D1 data layer with Drizzle ORM and secure deployment tooling",
      ],
      results: [], // TODO(owner): a measurable result and a client quote for this project (SEO-GUIDELINE D10)
      partner: SHAMIM.en,
    },
    fa: {
      title: "فروشگاه اجتماعی سبزینو",
      client: "سبزینو",
      sector: "فروشگاه اینترنتی · کسب‌وکار اجتماعی",
      summary: "فروشگاه اینترنتی یک کسب‌وکار اجتماعی برای محصولات بر پایه‌ی سبزی، ادویه‌های بین‌المللی و نوشیدنی‌های طبیعی.",
      challenge: "سبزینو یک فروشگاه واقعی می‌خواست، نه کاتالوگ: پرداخت آنلاین، حساب کاربری مشتری و پنل مدیریتی که تیم خودش بگرداند.",
      built: [
        "سبد خرید واکنش‌گرا، حساب کاربری مشتری و تسویه‌حساب",
        "پرداخت آنلاین با زرین‌پال",
        "پنل مستقل مدیریت محصول، موجودی، قیمت و سفارش‌ها",
        "لایه‌ی داده‌ی Cloudflare D1 با Drizzle ORM و ابزار انتشار امن",
      ],
      results: [], // TODO(owner): a measurable result and a client quote for this project (SEO-GUIDELINE D10)
      partner: SHAMIM.fa,
    },
  },
  {
    slug: "dane-news",
    status: "published",
    type: "product",
    pillars: ["web", "product"],
    industries: ["media"],
    tone: "paper",
    url: "https://danenews.ir",
    cover: "/work/dane-news/cover-art.jpg",
    gallery: shots("dane-news", 3),
    stack: ["Next.js 16", "Payload CMS", "PostgreSQL", "TypeScript", "S3"],
    en: {
      title: "Dane Scientific News",
      client: "Dane",
      sector: "Media · Science publishing",
      summary: "A purpose-built science publishing platform that replaced WordPress with an editorially governed Next.js and Payload CMS stack.",
      challenge:
        "Dane ran on WordPress. Moving to a platform of its own meant carrying every post, tag and author across, tidying a sprawling taxonomy and keeping every old link working.",
      built: [
        `Migrated ${en(dane.migratedPosts)} posts, ${en(dane.categoriesBefore)} categories, ${en(dane.tags)} tags and ${en(dane.authors)} authors`,
        `Consolidated the taxonomy into ${en(dane.categoriesAfter)} categories and ${en(dane.topics)} topics`,
        `${en(dane.redirects)} permanent redirects so no old link breaks`,
        "Editorial validation for sources, leads, captions, credits and long-form structure",
      ],
      results: [
        { value: `${en(dane.migratedPosts)}`, label: "posts migrated, each with a permanent redirect" },
        { value: `${en(dane.topics)}`, label: `topics in ${en(dane.categoriesAfter)} categories after the taxonomy clean-up` },
      ],
      partner: SHAMIM.en,
    },
    fa: {
      title: "پایگاه علمی‌خبری دانه",
      client: "دانه",
      sector: "رسانه · انتشار علمی",
      summary: "پلتفرم اختصاصی انتشار علمی که با معماری Next.js و Payload CMS و قواعد حرفه‌ای تحریریه جای وردپرس را گرفت.",
      challenge: "دانه روی وردپرس بود. رفتن به پلتفرم اختصاصی یعنی جابه‌جا کردن همه‌ی مطلب‌ها، برچسب‌ها و نویسنده‌ها، سامان دادن به دسته‌بندی شلوغ و سالم نگه داشتن همه‌ی لینک‌های قدیمی.",
      built: [
        `مهاجرت ${fa(dane.migratedPosts)} مطلب، ${fa(dane.categoriesBefore)} دسته، ${fa(dane.tags)} برچسب و ${fa(dane.authors)} نویسنده`,
        `بازطراحی طبقه‌بندی به ${fa(dane.categoriesAfter)} دسته و ${fa(dane.topics)} موضوع`,
        `${fa(dane.redirects)} ریدایرکت دائمی تا هیچ لینک قدیمی‌ای نشکند`,
        "بررسی تحریریه‌ای برای منبع، لید خبر، زیرنویس، اعتبار تصویر و ساختار مطالب بلند",
      ],
      results: [
        { value: `${fa(dane.migratedPosts)}`, label: "مطلب منتقل‌شده، هر کدام با ریدایرکت دائمی" },
        { value: `${fa(dane.topics)}`, label: `موضوع در ${fa(dane.categoriesAfter)} دسته، پس از بازطراحی دسته‌بندی` },
      ],
      partner: SHAMIM.fa,
    },
  },
  {
    slug: "nira-perfume",
    status: "published",
    type: "website",
    pillars: ["web", "product"],
    industries: ["ecommerce"],
    tone: "paper",
    url: "https://niraperfume.com",
    cover: "/work/nira-perfume/cover-art.jpg",
    gallery: [
      desktop("/work/nira-perfume/shot-1.jpg"),
      desktop("/work/nira-perfume/shot-2.jpg"),
      desktop("/work/nira-perfume/shot-3.jpg"),
      mobile("/work/nira-perfume/mobile.jpg"),
    ],
    en: {
      title: "Nira Perfume",
      client: "Nira",
      sector: "Retail · Fragrance",
      summary: "An online home for Nira's fragrances: original perfumes, a curated collection and custom scents designed for companies.",
      challenge:
        "Nira sells original fragrances and creates custom perfumes for brands. The site needed to present both with the calm, premium feel of a luxury house, in Persian.",
      built: [
        "A brand-led storefront with the Nira collection",
        "A dedicated section for custom corporate perfumes",
        "Gallery and archive pages",
        "Product search and shopping cart",
      ],
      results: [], // TODO(owner): a measurable result and a client quote for this project (SEO-GUIDELINE D10)
    },
    fa: {
      title: "عطر نیرا",
      client: "نیرا",
      sector: "فروشگاه اینترنتی · عطر",
      summary: "خانه‌ی آنلاین رایحه‌های نیرا: عطرهای اصل، مجموعه‌ی برگزیده و عطرهای اختصاصی که برای شرکت‌ها طراحی می‌شود.",
      challenge: "نیرا عطر اصل می‌فروشد و برای برندها عطر اختصاصی می‌سازد. سایت باید هر دو را با حس آرام و لوکس یک عطرسرا و به زبان فارسی نشان دهد.",
      built: ["ویترین فروشگاهی برندمحور با مجموعه‌ی نیرا", "بخش اختصاصی ساخت عطر سازمانی", "صفحه‌های گالری و آرشیو", "جست‌وجوی محصول و سبد خرید"],
      results: [], // TODO(owner): a measurable result and a client quote for this project (SEO-GUIDELINE D10)
    },
  },
  {
    slug: "contemo",
    status: "published",
    type: "product",
    pillars: ["web", "product"],
    tone: "orange",
    url: "https://contemo.ir",
    cover: "/work/contemo/cover-art.jpg",
    gallery: shots("contemo", 3),
    stack: ["Next.js 16", "TypeScript", "Tailwind CSS", "Motion", "Canvas"],
    en: {
      title: "Contemo",
      client: "Contemo",
      sector: "Services · Content production",
      summary: "A content-services platform with project intake, creator recruitment, editorial resources and a shared live pricing engine.",
      challenge: "Contemo sells content services and recruits creators. Visitors needed a price on the spot, and the team needed to change copy without a developer.",
      built: [
        "One pricing engine behind both the estimate and project intake",
        "Creator recruitment and editorial resources",
        "Centralised content so non-technical staff can update copy",
        "Accessible motion, careful RTL details and responsive menus",
      ],
      results: [], // TODO(owner): a measurable result and a client quote for this project (SEO-GUIDELINE D10)
      partner: SHAMIM.en,
    },
    fa: {
      title: "پلتفرم محتوایی کانتمو",
      client: "کانتمو",
      sector: "خدمات · تولید محتوا",
      summary: "پلتفرم خدمات محتوا با ثبت پروژه، جذب همکار، منابع تحریریه و سیستم قیمت‌گذاری زنده و مشترک.",
      challenge: "کانتمو خدمات محتوا می‌فروشد و تولیدکننده‌ی محتوا جذب می‌کند. بازدیدکننده باید همان لحظه قیمت را ببیند و تیم باید بی‌برنامه‌نویس متن‌ها را عوض کند.",
      built: [
        "یک سیستم قیمت‌گذاری مشترک برای برآورد هزینه و ثبت پروژه",
        "جذب همکار و منابع تحریریه",
        "محتوای یک‌جا تا تیم غیرفنی خودش متن‌ها را ویرایش کند",
        "انیمیشن دسترس‌پذیر، ریزه‌کاری‌های دقیق راست‌چین و منوی واکنش‌گرا",
      ],
      results: [], // TODO(owner): a measurable result and a client quote for this project (SEO-GUIDELINE D10)
      partner: SHAMIM.fa,
    },
  },
  {
    slug: "shamim-house",
    status: "published",
    type: "website",
    pillars: ["web"],
    tone: "graphite",
    url: "https://shamimhouse.ir",
    cover: "/work/shamim-house/cover-art.jpg",
    gallery: shots("shamim-house", 3),
    stack: ["Next.js 16", "React 19", "Framer Motion", "GSAP", "Zod"],
    en: {
      title: "Shamim House",
      client: "Shamim House",
      sector: "Venture building · Brand platform",
      summary: "A brand platform for a venture-building ecosystem: its subsidiaries, capabilities and partnership journeys.",
      challenge: "Shamim House is an ecosystem of connected ventures. The site had to show how they fit together and give partners a clear way in.",
      built: [
        "A story-led landing experience with advanced motion",
        "Structured partnership forms with React Hook Form and Zod",
        "A scalable design system shared by the venture brands",
        "Responsive layouts across every section",
      ],
      results: [], // TODO(owner): a measurable result and a client quote for this project (SEO-GUIDELINE D10)
      partner: SHAMIM.en,
    },
    fa: {
      title: "اکوسیستم خانه شمیم",
      client: "خانه شمیم",
      sector: "استارتاپ‌سازی · پلتفرم برند",
      summary: "پلتفرم برند برای معرفی یک اکوسیستم استارتاپ‌سازی: زیرمجموعه‌ها، توانایی‌ها و راه‌های همکاری.",
      challenge: "خانه شمیم مجموعه‌ای از کسب‌وکارهای به‌هم‌پیوسته است. سایت باید نشان دهد این‌ها چطور کنار هم قرار می‌گیرند و راه ورود شریک‌ها را روشن کند.",
      built: [
        "لندینگ داستان‌محور با انیمیشن پیشرفته",
        "فرم‌های منظم همکاری با React Hook Form و Zod",
        "سیستم طراحی گسترش‌پذیر برای چند برند زیرمجموعه",
        "چیدمان واکنش‌گرا در همه‌ی بخش‌ها",
      ],
      results: [], // TODO(owner): a measurable result and a client quote for this project (SEO-GUIDELINE D10)
      partner: SHAMIM.fa,
    },
  },
  {
    slug: "asa-study",
    status: "published",
    type: "website",
    pillars: ["web"],
    industries: ["education"],
    tone: "paper",
    // TODO(owner): final domain of the ASA-Study site. The Vercel test address below is not linked or indexed (SEO-GUIDELINE 8).
    // url: "https://asastudy-website.vercel.app",
    cover: "/work/asa-study/cover-art.jpg",
    gallery: shots("asa-study", 3),
    stack: ["Next.js 15", "next-intl", "TypeScript", "Radix UI", "Framer Motion"],
    en: {
      title: "ASA-Study",
      client: "ASA-Study",
      sector: "Education · International admissions",
      summary: "A bilingual admissions platform that guides international students through Iranian universities, programs and application services.",
      challenge: "International students choosing a university in Iran need to compare cities, universities and programs, in their own language.",
      built: [
        "English/Persian routing with complete RTL behavior",
        "A searchable university directory you can filter by city",
        "Data-driven university profiles",
        "A CMS-ready structure: each university is its own localized document",
      ],
      results: [], // TODO(owner): a measurable result and a client quote for this project (SEO-GUIDELINE D10)
      partner: SHAMIM.en,
    },
    fa: {
      title: "سامانه‌ی پذیرش ASA-Study",
      client: "ASA-Study",
      sector: "آموزش · پذیرش دانشجوی بین‌المللی",
      summary: "پلتفرم دوزبانه‌ی پذیرش که دانشجویان بین‌المللی را در انتخاب دانشگاه و رشته در ایران و خدمات اپلای راهنمایی می‌کند.",
      challenge: "دانشجوی بین‌المللی برای انتخاب دانشگاه در ایران باید شهرها، دانشگاه‌ها و رشته‌ها را به زبان خودش مقایسه کند.",
      built: [
        "ناوبری فارسی و انگلیسی با رفتار کامل راست‌چین",
        "فهرست جست‌وجوپذیر دانشگاه‌ها با فیلتر شهر",
        "صفحه‌ی داده‌محور برای هر دانشگاه",
        "ساختار آماده‌ی CMS؛ هر دانشگاه یک سند مستقل و دوزبانه",
      ],
      results: [], // TODO(owner): a measurable result and a client quote for this project (SEO-GUIDELINE D10)
      partner: SHAMIM.fa,
    },
  },
  {
    slug: "prowem",
    status: "published",
    type: "mobile-app",
    pillars: ["product"],
    tone: "orange",
    // prowem.com only shows "Coming soon"; a cube illustration until app screenshots arrive (TODO-OWNER).
    model: "code",
    url: "https://prowem.com",
    cover: "/work/prowem/cover-art.jpg",
    gallery: [desktop("/work/prowem/cover.jpg")],
    stack: ["Flutter", "Dart", "REST API", "PHP", "iOS", "Android"],
    en: {
      title: "Prowem Sports Platform",
      client: "Prowem",
      sector: "Sports · Mobile app",
      summary: "A cross-platform sports management and live-score app for tournaments, teams, venues and event publishing.",
      challenge:
        "Tournaments, teams, players and venues had to stay in sync between iOS, Android and the event platform, with scores updating while the match is still on.",
      built: [
        "Live match updates, schedules, standings and top scorers",
        "Team and player administration on a modular Flutter architecture",
        "REST API sync between the mobile apps and the event platform",
        "One codebase for iOS and Android",
      ],
      results: [], // TODO(owner): a measurable result and a client quote for this project (SEO-GUIDELINE D10)
    },
    fa: {
      title: "پلتفرم ورزشی Prowem",
      client: "Prowem",
      sector: "ورزش · اپلیکیشن موبایل",
      summary: "اپلیکیشن چندسکویی برای مدیریت ورزش و نتایج زنده‌ی مسابقات، تیم‌ها، بازیکنان، مکان‌های ورزشی و انتشار رویدادها.",
      challenge: "مسابقات، تیم‌ها، بازیکن‌ها و مکان‌ها باید میان iOS، اندروید و پلتفرم رویداد هماهنگ بمانند و نتیجه‌ها همان لحظه‌ی بازی به‌روز شوند.",
      built: [
        "نتیجه‌ی زنده‌ی بازی‌ها، برنامه‌ی مسابقات، جدول رده‌بندی و گلزنان",
        "مدیریت تیم و بازیکن با معماری ماژولار Flutter",
        "هماهنگ‌سازی داده با REST API میان اپ موبایل و پلتفرم رویداد",
        "یک پایه‌ی کد برای iOS و اندروید",
      ],
      results: [], // TODO(owner): a measurable result and a client quote for this project (SEO-GUIDELINE D10)
    },
  },
  {
    slug: "mojasame-saidi",
    status: "published",
    type: "website",
    pillars: ["web", "product"],
    industries: ["ecommerce"],
    tone: "ink",
    // The site did not load from our network for screenshots; a cube illustration until it does (TODO-OWNER).
    model: "shop",
    url: "https://mojasamesaidi.ir",
    cover: "/work/mojasame-saidi/cover-art.jpg",
    gallery: [desktop("/work/mojasame-saidi/cover.jpg")],
    stack: ["Next.js 15", "Prisma", "PostgreSQL", "Zustand", "Zod"],
    en: {
      title: "Mojasame Saidi",
      client: "Mojasame Saidi",
      sector: "E-commerce · Handcrafted decor",
      summary: "A premium Persian storefront for handcrafted sculpture and decor, built for product discovery, cart, checkout and future admin workflows.",
      challenge: "Handcrafted pieces need room to be seen. The store had to feel premium on a phone, be found in search and be ready for admin workflows later.",
      built: [
        "A mobile-first, SEO-focused storefront and product taxonomy",
        "A persistent cart with clear authentication boundaries",
        "Validated forms through checkout",
        "A production-ready data layer with Prisma and PostgreSQL",
      ],
      results: [], // TODO(owner): a measurable result and a client quote for this project (SEO-GUIDELINE D10)
    },
    fa: {
      title: "فروشگاه مجسمه سعیدی",
      client: "مجسمه سعیدی",
      sector: "فروشگاه اینترنتی · دکور دست‌ساز",
      summary: "فروشگاه فارسی لوکس برای مجسمه و دکور دست‌ساز؛ ساخته‌شده برای گشتن میان محصولات، سبد خرید، تسویه‌حساب و توسعه‌ی پنل مدیریت.",
      challenge: "اثر دست‌ساز باید دیده شود. فروشگاه باید روی موبایل حس لوکس بدهد، در جست‌وجو پیدا شود و برای پنل مدیریت آینده آماده باشد.",
      built: [
        "فروشگاه موبایل‌محور و سئومحور با دسته‌بندی روشن محصولات",
        "سبد خرید پایدار با مرز روشن میان کاربر مهمان و واردشده",
        "فرم‌های مسیر خرید با بررسی خودکار ورودی‌ها",
        "لایه‌ی داده‌ی آماده‌ی بهره‌برداری با Prisma و PostgreSQL",
      ],
      results: [], // TODO(owner): a measurable result and a client quote for this project (SEO-GUIDELINE D10)
    },
  },
  {
    slug: "elm-kala",
    status: "published",
    type: "website",
    pillars: ["web"],
    industries: ["ecommerce", "education"],
    tone: "graphite",
    // The Railway address from the portfolio returns 404; no link or screenshot until a live address arrives (TODO-OWNER).
    model: "robot",
    cover: "/work/elm-kala/cover-art.jpg",
    gallery: [desktop("/work/elm-kala/cover.jpg")],
    // TODO(owner): the real technology stack of Elm-Kala. "Production web app" and "Railway" were placeholders, so the
    // technology section is not rendered until a stack is listed here.
    // stack: [],
    en: {
      title: "Elm-Kala",
      client: "Elm-Kala",
      sector: "E-commerce · Scientific equipment",
      summary: "A guided marketplace for scientific, laboratory, robotics and educational equipment.",
      challenge: "People buying lab, robotics or classroom equipment often don't know which product fits their use. The store had to guide them, not just list items.",
      built: ["Category-led discovery with featured products", "Use-case guidance for each category", "A consultation-first path for buyers who need help choosing"],
      results: [], // TODO(owner): a measurable result and a client quote for this project (SEO-GUIDELINE D10)
      partner: SHAMIM.en,
    },
    fa: {
      title: "فروشگاه تخصصی علم‌کالا",
      client: "علم‌کالا",
      sector: "فروشگاه اینترنتی · تجهیزات علمی",
      summary: "فروشگاهی که خریدار تجهیزات علمی، آزمایشگاهی، رباتیک و آموزشی را راهنمایی می‌کند.",
      challenge: "خریدار تجهیزات آزمایشگاه، رباتیک یا کلاس معمولاً نمی‌داند کدام محصول به کارش می‌آید. فروشگاه باید راهنمایی‌اش کند، نه اینکه فقط فهرست نشان دهد.",
      built: ["گشتن میان محصولات بر پایه‌ی دسته‌بندی و محصولات برگزیده", "راهنمای کاربرد برای هر دسته", "مسیر مشاوره برای خریدارهایی که در انتخاب کمک می‌خواهند"],
      results: [], // TODO(owner): a measurable result and a client quote for this project (SEO-GUIDELINE D10)
      partner: SHAMIM.fa,
    },
  },
  {
    slug: "school-builders",
    status: "published",
    type: "website",
    pillars: ["web"],
    tone: "orange",
    // The Railway address from the portfolio returns 404; no link or screenshot until a live address arrives (TODO-OWNER).
    model: "cap",
    cover: "/work/school-builders/cover-art.jpg",
    gallery: [desktop("/work/school-builders/cover.jpg")],
    stack: ["Next.js 16", "TypeScript", "Motion"],
    en: {
      title: "Iran School-Builders Charity",
      client: "Iran School-Builders Charity",
      sector: "Non-profit · Public portal",
      summary: "A national portal for school-building philanthropy: recent projects, provincial news and ways for donors to take part.",
      challenge: "A national charity needed one public place for its recent projects, news from every province and clear ways for donors to get involved.",
      built: ["Information architecture around news, projects and provinces", "Clear participation paths for donors", "Responsive Persian design"],
      results: [], // TODO(owner): a measurable result and a client quote for this project (SEO-GUIDELINE D10)
      partner: SHAMIM.en,
    },
    fa: {
      title: "جامعه خیرین مدرسه‌ساز کشور",
      client: "جامعه خیرین مدرسه‌ساز کشور",
      sector: "خیریه · پرتال عمومی",
      summary: "پرتال ملی برای معرفی فعالیت‌های مدرسه‌سازی خیرین، پروژه‌های تازه، اخبار استان‌ها و مشارکت خیرین.",
      challenge: "یک خیریه‌ی ملی جایی عمومی می‌خواست برای پروژه‌های تازه، خبرهای همه‌ی استان‌ها و راه‌های روشن مشارکت خیرین.",
      built: ["معماری اطلاعات بر پایه‌ی خبر، پروژه و استان", "مسیرهای روشن مشارکت برای خیرین", "طراحی فارسی واکنش‌گرا"],
      results: [], // TODO(owner): a measurable result and a client quote for this project (SEO-GUIDELINE D10)
      partner: SHAMIM.fa,
    },
  },
  {
    // Template preview at /work/example (noindex). Copy this entry to add a case study.
    slug: "example",
    status: "preview",
    type: "website",
    pillars: ["web", "ai"],
    tone: "ink",
    year: "[YEAR]",
    stack: ["[TOOL]", "[TOOL]", "[TOOL]"],
    en: {
      title: "[PROJECT NAME]",
      client: "[CLIENT]",
      sector: "[SECTOR]",
      summary: "[ONE-LINE SUMMARY: what we built and for whom]",
      challenge: "[THE CHALLENGE: two or three sentences on the situation before Bellona]",
      built: ["[WHAT WE BUILT 1]", "[WHAT WE BUILT 2]", "[WHAT WE BUILT 3]"],
      results: [
        { value: "[X]", label: "[SOURCED RESULT]" },
        { value: "[Y]", label: "[SOURCED RESULT]" },
      ],
      quote: { text: "[CLIENT QUOTE]", name: "[NAME]", role: "[ROLE, COMPANY]" },
    },
    fa: {
      title: "[نام پروژه]",
      client: "[مشتری]",
      sector: "[حوزه]",
      summary: "[خلاصه‌ی یک‌خطی: چه ساختیم و برای چه کسی]",
      challenge: "[چالش: دو سه جمله درباره‌ی وضعیت پیش از بلونا]",
      built: ["[آنچه ساختیم ۱]", "[آنچه ساختیم ۲]", "[آنچه ساختیم ۳]"],
      results: [
        { value: "[X]", label: "[نتیجه‌ی مستند]" },
        { value: "[Y]", label: "[نتیجه‌ی مستند]" },
      ],
      quote: { text: "[نقل‌قول مشتری]", name: "[نام]", role: "[نقش، شرکت]" },
    },
  },
];

/** Grid items: published (in ranked order), then any placeholder slots. */
export const gridProjects = () => [
  ...projects.filter((p) => p.status === "published"),
  ...projects.filter((p) => p.status === "placeholder"),
];

/** Home page: the featured projects, in ranked order. */
export const featuredProjects = () => projects.filter((p) => p.status === "published" && p.featured);

/** Published projects for one service, in ranked order. */
export const projectsForPillar = (id: PillarId) => projects.filter((p) => p.status === "published" && p.pillars.includes(id));

/** Published projects for one industry, in ranked order. */
export const projectsForIndustry = (id: string) => projects.filter((p) => p.status === "published" && p.industries?.includes(id));

/** Slugs that get a /work/[slug] page. */
export const pageProjects = () => projects.filter((p) => p.status !== "placeholder");
