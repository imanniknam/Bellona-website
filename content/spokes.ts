import { facts, fmt } from "./facts";
import type { PillarId } from "./types";

/**
 * New service spokes and decision guides (docs/seo P1-09…P1-11, P1-13), written answer-first (G-04).
 *
 * Publishing rules
 * - status "draft": the page only exists when the build sets SHOW_DRAFTS=1 (preview), with noindex and a
 *   banner; it is out of the sitemap and nothing links to it. Production builds return 404.
 * - status "published": built normally, listed in the sitemap, linked from its pillar page (or the guides hub).
 * - An answer with `a: null` needs a fact from the team (docs/seo/QUESTIONS_FOR_TEAM.md, numbers in `needs`).
 *   On a draft it shows as a "needs answer" note; on a published page it is left out entirely.
 *   Never put a placeholder in `a`.
 * - A guide can only be published with `updated` (ISO date) and `author` (a team member's name) set.
 * - Every figure comes from content/facts.ts.
 */

export type AnswerDetail =
  | { kind: "p"; text: string }
  | { kind: "steps"; items: string[] }
  | { kind: "table"; caption: string; head: string[]; rows: string[][] }
  | { kind: "links"; items: { label: string; href: string }[] };

export interface Answer {
  /** Question-shaped H2, phrased the way people search (docs/seo/seo_keyword_database.csv). */
  q: string;
  /** Direct answer, about 40–60 words. `null` until the team supplies the fact. */
  a: string | null;
  needs?: number[];
  details?: AnswerDetail[];
}

export interface SpokeCopy {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  /** Short definition paragraph at the top (what the thing is), before Bellona's offer. */
  definition: string;
  answers: Answer[];
}

export interface Spoke {
  kind: "service" | "guide";
  /** Last URL segment. Services live at /services/<parent>/<slug>, guides at /guides/<slug>. */
  slug: string;
  /** Pillar slug the service spoke belongs to. */
  parent?: string;
  /** Pre-selects the contact form's "need". */
  need: PillarId;
  status: "draft" | "published";
  /** Guides: ISO date shown as "Last updated" and used as dateModified. */
  updated?: string | null;
  /** Guides: byline, the name of a team member (content/{en,fa}.ts team.members). */
  author?: string | null;
  /** Page-level questions that block publishing, beyond those on individual answers. */
  needs: number[];
  en: SpokeCopy;
  fa: SpokeCopy;
}

const sprintEn = fmt.weeks(facts.timelines.automationSprintWeeks, "en");
const sprintFa = fmt.weeks(facts.timelines.automationSprintWeeks, "fa");
const complexEn = fmt.weeks(facts.timelines.complexAgentWeeks, "en");
const complexFa = fmt.weeks(facts.timelines.complexAgentWeeks, "fa");
const wfEn = fmt.n(facts.projects.realEstate.n8nWorkflows, "en");
const wfFa = fmt.n(facts.projects.realEstate.n8nWorkflows, "fa");
const tablesEn = fmt.n(facts.projects.realEstate.crmTables, "en");
const tablesFa = fmt.n(facts.projects.realEstate.crmTables, "fa");

const processEn = [
  "Audit: we read your current processes, find the bottlenecks and set priorities.",
  "Design: system architecture, each agent's role and how the tools connect.",
  "Build: we build and test it with as little disruption to your team as possible.",
  "Launch: the system goes live and is usable from day one.",
  "Improve: we monitor, fix and extend it as your business grows.",
];
const processFa = [
  "بررسی: فرایندهای فعلی را می‌خوانیم، گلوگاه‌ها را پیدا می‌کنیم و اولویت‌ها را مشخص می‌کنیم.",
  "طراحی: معماری سیستم، نقش هر ایجنت و اتصال ابزارها.",
  "پیاده‌سازی: سیستم را می‌سازیم و تست می‌کنیم، با کمترین اختلال در کار روزانه‌ی تیم.",
  "راه‌اندازی: سیستم در محیط واقعی فعال می‌شود و از روز اول قابل استفاده است.",
  "بهبود مستمر: عملکرد را پایش، اصلاح و با رشد کسب‌وکار گسترش می‌دهیم.",
];

export const spokes: Spoke[] = [
  // --------------------------------------------------------------------------------------- AI agents (C6)
  {
    kind: "service",
    slug: "ai-agents",
    parent: "ai-automation",
    need: "ai",
    status: "draft",
    needs: [19, 20, 30, 31],
    en: {
      metaTitle: "AI agent development for businesses",
      metaDescription: `Custom AI agents that qualify leads, follow up, answer customers and keep your CRM current. Built and connected by Bellona; most go live in ${sprintEn}.`,
      eyebrow: "AI agents & automation",
      h1: "AI agent development **for your business**",
      definition:
        "An AI agent is software that uses a language model to read a situation, decide the next step and act through your tools: email, CRM, website or messengers. Unlike a chatbot, it doesn't only answer questions; it carries out a process from start to finish.",
      answers: [
        {
          q: "What can an AI agent do for a business?",
          a: "An agent takes over repetitive work that follows rules but needs judgement: replying to new leads, qualifying them, following up until there is an answer, logging everything in the CRM and preparing reports. Your team keeps the decisions that need a person, and the agent hands those over with the context attached.",
        },
        {
          q: "How long does it take to build an AI agent?",
          a: `A focused automation sprint goes live in ${sprintEn}; simple automations take days. Complex systems with several agents working together take ${complexEn}. You get a firm date in your quote after the free audit, so the timeline is agreed before any work starts.`,
          details: [{ kind: "steps", items: processEn }],
        },
        {
          q: "Can an AI agent connect to our CRM, website and email?",
          a: `Yes, that is most of the work. In the AI sales system we built for a real-estate business, ${wfEn} n8n workflows connect a ${tablesEn}-table Baserow CRM, outgoing and incoming email, Google Drive documents and Claude-written content, from error handling to a daily digest.`,
          details: [{ kind: "links", items: [{ label: "Case study: AI Real Estate Operating System", href: "/work/ai-real-estate-os" }] }],
        },
        { q: "Which Iranian tools and messengers can an agent work with?", a: null, needs: [20] },
        { q: "How much does it cost to build an AI agent?", a: null, needs: [30, 31] },
        { q: "How do AI agents run for businesses in Iran (models, data, access)?", a: null, needs: [19] },
      ],
    },
    fa: {
      metaTitle: "ساخت ایجنت هوش مصنوعی برای کسب‌وکار",
      metaDescription: `ایجنت هوش مصنوعی اختصاصی که لید را غربال و پیگیری می‌کند، به مشتری جواب می‌دهد و CRM را به‌روز نگه می‌دارد. بیشتر سیستم‌ها در ${sprintFa} راه می‌افتند.`,
      eyebrow: "ایجنت و اتوماسیون هوش مصنوعی",
      h1: "ساخت ایجنت هوش مصنوعی **برای کسب‌وکار شما**",
      definition:
        "ایجنت هوش مصنوعی نرم‌افزاری است که با یک مدل زبانی موقعیت را می‌خواند، قدم بعدی را تصمیم می‌گیرد و از طریق ابزارهای شما (ایمیل، CRM، سایت یا پیام‌رسان) انجامش می‌دهد. برخلاف چت‌بات، فقط به سؤال جواب نمی‌دهد؛ یک فرایند را از اول تا آخر جلو می‌برد.",
      answers: [
        {
          q: "ایجنت هوش مصنوعی برای کسب‌وکار چه کاری انجام می‌دهد؟",
          a: "ایجنت کارهای تکراری‌ای را برعهده می‌گیرد که قاعده دارند ولی قضاوت هم می‌خواهند: جواب دادن به لید جدید، غربال کردنش، پیگیری تا گرفتن جواب، ثبت همه‌چیز در CRM و آماده کردن گزارش. تصمیم‌هایی که آدم لازم دارند پیش تیم شما می‌ماند و ایجنت آن‌ها را همراه با سابقه‌ی کامل تحویل می‌دهد.",
        },
        {
          q: "ساخت ایجنت هوش مصنوعی چقدر طول می‌کشد؟",
          a: `یک اسپرینت اتوماسیون متمرکز در ${sprintFa} راه می‌افتد و اتوماسیون‌های ساده چند روز طول می‌کشند. سیستم‌های پیچیده‌تر با چند ایجنت که با هم کار می‌کنند ${complexFa} زمان می‌برند. بعد از بررسی رایگان، تاریخ قطعی در پیشنهاد قیمت می‌آید تا قبل از شروع کار روی زمان توافق شده باشد.`,
          details: [{ kind: "steps", items: processFa }],
        },
        {
          q: "ایجنت هوش مصنوعی به CRM، سایت و ایمیل وصل می‌شود؟",
          a: `بله؛ بیشتر کار همین اتصال‌هاست. در سیستم فروش هوشمندی که برای یک کسب‌وکار املاک ساختیم، ${wfFa} گردش‌کار n8n یک CRM با ${tablesFa} جدول در Baserow، ایمیل ورودی و خروجی، اسناد Google Drive و محتوای تولیدشده با Claude را به هم وصل می‌کنند؛ از مدیریت خطا تا گزارش روزانه.`,
          details: [{ kind: "links", items: [{ label: "نمونه‌کار: سیستم‌عامل هوشمند فروش املاک", href: "/work/ai-real-estate-os" }] }],
        },
        { q: "ایجنت با کدام ابزارها و پیام‌رسان‌های ایرانی کار می‌کند؟", a: null, needs: [20] },
        { q: "هزینه ساخت ایجنت هوش مصنوعی چقدر است؟", a: null, needs: [30, 31] },
        { q: "ایجنت هوش مصنوعی در ایران چطور اجرا می‌شود (مدل، داده، دسترسی)؟", a: null, needs: [19] },
      ],
    },
  },

  // --------------------------------------------------------------------------------------- n8n (C8)
  {
    kind: "service",
    slug: "n8n",
    parent: "ai-automation",
    need: "ai",
    status: "draft",
    needs: [30, 32],
    en: {
      metaTitle: "n8n implementation and workflow automation",
      metaDescription: `We design, build and run n8n workflows that connect your CRM, email, documents and AI. Our real-estate sales system runs on ${wfEn} n8n workflows.`,
      eyebrow: "AI agents & automation",
      h1: "n8n implementation **and process automation**",
      definition:
        "n8n is a workflow automation tool: you connect apps and services as a chain of steps (a trigger, then actions and decisions) instead of writing a custom integration for each one. It can run on n8n's cloud or on your own server, and it includes nodes for AI models and agents.",
      answers: [
        {
          q: "What does an n8n implementation include?",
          a: "Mapping the process first, then building the workflows, connecting each tool, handling errors so failures alert someone instead of silently stopping, and documenting it so your team understands what runs where. Where a step needs judgement, we add an AI node or agent inside the workflow.",
        },
        {
          q: "What is an example of an n8n system you have built?",
          a: `For a real-estate sales operation we built ${wfEn} n8n workflows: investor discovery and qualification, outreach and reply handling over email, project analysis, document generation in Google Drive, a ${tablesEn}-table Baserow CRM, central error handling and a daily digest.`,
          details: [{ kind: "links", items: [{ label: "Case study: AI Real Estate Operating System", href: "/work/ai-real-estate-os" }] }],
        },
        {
          q: "How long does an n8n project take?",
          a: `A typical automation sprint, one process automated end to end, goes live in ${sprintEn}. Simple workflows take days; systems with several agents take ${complexEn}. The date is fixed in your quote after the free audit.`,
        },
        {
          q: "n8n, Make or Zapier: which one should we use?",
          a: "All three connect apps without custom code. Zapier and Make are hosted services billed by usage. n8n can also run on your own server, which keeps data in your infrastructure and suits long or AI-heavy workflows. The right choice depends on your tools, volume and where your data must live.",
        },
        { q: "Do you set up self-hosted n8n and maintain it monthly?", a: null, needs: [32] },
        { q: "How much does n8n implementation cost?", a: null, needs: [30, 32] },
      ],
    },
    fa: {
      metaTitle: "پیاده‌سازی و اتوماسیون n8n برای کسب‌وکار",
      metaDescription: `گردش‌کارهای n8n را طراحی، پیاده‌سازی و راه‌اندازی می‌کنیم تا CRM، ایمیل، اسناد و هوش مصنوعی به هم وصل شوند. سیستم فروش املاک ما روی ${wfFa} گردش‌کار n8n می‌چرخد.`,
      eyebrow: "ایجنت و اتوماسیون هوش مصنوعی",
      h1: "پیاده‌سازی n8n **و اتوماسیون فرایند**",
      definition:
        "n8n ابزار اتوماسیون گردش‌کار است: به‌جای نوشتن اتصال اختصاصی برای هر ابزار، اپ‌ها و سرویس‌ها را به‌شکل زنجیره‌ای از مراحل (یک محرک، بعد اقدام‌ها و تصمیم‌ها) به هم وصل می‌کنید. هم روی فضای ابری n8n اجرا می‌شود و هم روی سرور خودتان، و برای مدل‌ها و ایجنت‌های هوش مصنوعی هم ماژول دارد.",
      answers: [
        {
          q: "پیاده‌سازی n8n شامل چه کارهایی است؟",
          a: "اول فرایند را نقشه می‌کشیم، بعد گردش‌کارها را می‌سازیم، هر ابزار را وصل می‌کنیم، خطاها را مدیریت می‌کنیم تا به‌جای توقف بی‌صدا به کسی هشدار بدهند، و همه را مستند می‌کنیم تا تیم شما بداند چه چیزی کجا اجرا می‌شود. هر جا قدمی قضاوت لازم داشته باشد، یک ماژول یا ایجنت هوش مصنوعی داخل گردش‌کار می‌گذاریم.",
        },
        {
          q: "نمونه‌ای از سیستم n8n که ساخته‌اید چیست؟",
          a: `برای یک کسب‌وکار فروش املاک ${wfFa} گردش‌کار n8n ساختیم: پیدا کردن و امتیازدهی سرمایه‌گذار، ارسال و دریافت ایمیل، تحلیل پروژه، ساخت سند در Google Drive، یک CRM با ${tablesFa} جدول در Baserow، مدیریت متمرکز خطا و گزارش روزانه.`,
          details: [{ kind: "links", items: [{ label: "نمونه‌کار: سیستم‌عامل هوشمند فروش املاک", href: "/work/ai-real-estate-os" }] }],
        },
        {
          q: "پیاده‌سازی n8n چقدر طول می‌کشد؟",
          a: `یک اسپرینت اتوماسیون معمولی، یعنی یک فرایند کامل از اول تا آخر، در ${sprintFa} راه می‌افتد. گردش‌کارهای ساده چند روز طول می‌کشند و سیستم‌های چندایجنتی ${complexFa}. تاریخ دقیق بعد از بررسی رایگان در پیشنهاد قیمت می‌آید.`,
        },
        {
          q: "n8n یا Make یا Zapier: کدام را انتخاب کنیم؟",
          a: "هر سه بدون کدنویسی اختصاصی اپ‌ها را به هم وصل می‌کنند. Zapier و Make سرویس‌های ابری‌اند و بر اساس میزان استفاده هزینه می‌گیرند. n8n روی سرور خودتان هم اجرا می‌شود؛ داده داخل زیرساخت شما می‌ماند و برای گردش‌کارهای طولانی یا پر از هوش مصنوعی مناسب‌تر است. انتخاب درست به ابزارها، حجم کار و محل نگهداری داده بستگی دارد.",
        },
        { q: "n8n را روی سرور خودمان راه‌اندازی و ماهانه نگهداری می‌کنید؟", a: null, needs: [32] },
        { q: "هزینه پیاده‌سازی n8n چقدر است؟", a: null, needs: [30, 32] },
      ],
    },
  },

  // --------------------------------------------------------------------------------------- Next.js (C1a)
  {
    kind: "service",
    slug: "nextjs",
    parent: "website-design",
    need: "web",
    status: "draft",
    needs: [3, 4, 30],
    en: {
      metaTitle: "Next.js website design: fast, bilingual, SEO-ready",
      metaDescription: "Websites built with Next.js: rendered on the server so search engines and AI assistants read every word, fast on mobile, and properly bilingual in Persian and English.",
      eyebrow: "Website design",
      h1: "Website design **with Next.js**",
      definition:
        "Next.js is a framework built on React for websites and web apps. Pages can be rendered on the server, so the full text arrives in the first response, which search engines and AI assistants can read without running JavaScript. It also handles routing, images and multiple languages.",
      answers: [
        {
          q: "Why build a website with Next.js?",
          a: "Speed and visibility. Server rendering sends complete pages, so they load fast on mobile and every word is readable by search engines. One codebase can serve a marketing site and a full product, and bilingual Persian–English routing with right-to-left layout is built in rather than bolted on.",
        },
        {
          q: "Which Next.js projects have you built?",
          a: "This site is one. Others include Yasin Skill School (Next.js 15 with GSAP and Three.js), Dane Scientific News (Next.js 16 with Payload CMS), ASA-Study (bilingual English/Persian with next-intl), Mojasame Saidi's store (Next.js 15 with Prisma), and Contemo and Shamim House (Next.js 16).",
          details: [
            {
              kind: "links",
              items: [
                { label: "Yasin Skill School", href: "/work/yasin" },
                { label: "Dane Scientific News", href: "/work/dane-news" },
                { label: "ASA-Study", href: "/work/asa-study" },
              ],
            },
          ],
        },
        {
          q: "Next.js or WordPress?",
          a: "WordPress is quick to start with templates and plugins; Next.js is custom-built, so it is faster, leaner and easier to keep secure, but needs developers for structural changes. For editing content without a developer, a headless CMS can sit behind Next.js, as Payload CMS does on Dane Scientific News.",
        },
        {
          q: "Can a Next.js site be bilingual, Persian and English?",
          a: "Yes. Each language gets its own URLs and full translation, with right-to-left layout for Persian and the right language tags for search engines. This site and ASA-Study both work this way, with separate Persian and English pages linked to each other.",
        },
        { q: "Which CMS do you use with Next.js?", a: null, needs: [3] },
        { q: "How long does a Next.js website take?", a: null, needs: [4] },
        { q: "How much does a Next.js website cost?", a: null, needs: [30] },
      ],
    },
    fa: {
      metaTitle: "طراحی سایت با Next.js؛ سریع، دوزبانه، سئومحور",
      metaDescription: "سایتی که با Next.js ساخته می‌شود: روی سرور رندر می‌شود تا موتورهای جست‌وجو و دستیارهای هوش مصنوعی همه‌ی متن را بخوانند، روی موبایل سریع است و فارسی و انگلیسی‌اش اصولی است.",
      eyebrow: "طراحی سایت",
      h1: "طراحی سایت **با Next.js**",
      definition:
        "Next.js فریم‌ورکی بر پایه‌ی React برای ساخت سایت و وب‌اپلیکیشن است. صفحه‌ها می‌توانند روی سرور رندر شوند، یعنی متن کامل در همان پاسخ اول می‌رسد و موتورهای جست‌وجو و دستیارهای هوش مصنوعی بدون اجرای جاوااسکریپت آن را می‌خوانند. مسیرها، تصاویر و چندزبانه بودن را هم مدیریت می‌کند.",
      answers: [
        {
          q: "چرا سایت را با Next.js بسازیم؟",
          a: "به خاطر سرعت و دیده شدن. رندر سمت سرور صفحه‌ی کامل می‌فرستد، پس سایت روی موبایل سریع باز می‌شود و موتور جست‌وجو همه‌ی متن را می‌خواند. با یک کد می‌شود هم سایت معرفی ساخت و هم محصول کامل، و مسیرهای دوزبانه‌ی فارسی و انگلیسی با چیدمان راست‌به‌چپ از اول در ساختار هست، نه وصله‌ی بعدی.",
        },
        {
          q: "چه پروژه‌هایی را با Next.js ساخته‌اید؟",
          a: "همین سایت یکی از آن‌هاست. بقیه: مدرسه مهارت یاسین (Next.js 15 با GSAP و Three.js)، پایگاه علمی خبری دانه (Next.js 16 با Payload CMS)، سامانه پذیرش ASA-Study (دوزبانه با next-intl)، فروشگاه مجسمه سعیدی (Next.js 15 با Prisma)، و کانتمو و خانه شمیم (Next.js 16).",
          details: [
            {
              kind: "links",
              items: [
                { label: "مدرسه مهارت یاسین", href: "/work/yasin" },
                { label: "پایگاه علمی خبری دانه", href: "/work/dane-news" },
                { label: "سامانه پذیرش ASA-Study", href: "/work/asa-study" },
              ],
            },
          ],
        },
        {
          q: "Next.js یا وردپرس؟",
          a: "وردپرس با قالب و افزونه سریع راه می‌افتد؛ Next.js اختصاصی ساخته می‌شود، پس سریع‌تر، سبک‌تر و امن‌تر نگه داشته می‌شود، ولی تغییرات ساختاری برنامه‌نویس می‌خواهد. برای ویرایش محتوا بدون برنامه‌نویس، می‌شود یک CMS هدلس پشت Next.js گذاشت؛ همان کاری که Payload CMS در پایگاه علمی خبری دانه انجام می‌دهد.",
        },
        {
          q: "سایت Next.js می‌تواند دوزبانه، فارسی و انگلیسی باشد؟",
          a: "بله. هر زبان آدرس و ترجمه‌ی کامل خودش را دارد، فارسی با چیدمان راست‌به‌چپ، و برچسب زبان درست برای موتورهای جست‌وجو. همین سایت و ASA-Study هر دو همین‌طورند: صفحه‌های جدای فارسی و انگلیسی که به هم لینک شده‌اند.",
        },
        { q: "با Next.js از چه CMSی استفاده می‌کنید؟", a: null, needs: [3] },
        { q: "طراحی سایت با Next.js چقدر طول می‌کشد؟", a: null, needs: [4] },
        { q: "قیمت طراحی سایت با Next.js چقدر است؟", a: null, needs: [30] },
      ],
    },
  },

  // --------------------------------------------------------------------------------------- website cost guide (C2)
  {
    kind: "guide",
    slug: "website-design-cost",
    need: "web",
    status: "draft",
    updated: null,
    author: null,
    needs: [30, 33],
    en: {
      metaTitle: "Website design cost in 2026: real ranges and cost drivers",
      metaDescription: "What a website costs and why: the factors that move the price, what each level includes, running costs after launch, and how to get a fixed quote.",
      eyebrow: "Guide",
      h1: "How much does **a website** cost?",
      definition:
        "The cost of a website is mostly the time it takes to plan, design, build and test it, plus a smaller yearly cost to keep it online. Scope drives both, which is why two sites that look similar can be priced very differently.",
      answers: [
        { q: "How much does a custom website cost?", a: null, needs: [30] },
        {
          q: "What makes a website more or less expensive?",
          a: "Mostly scope: how many page types, whether the design is custom or from a template, how content is edited, whether it is in one language or two, which systems it connects to (CRM, payments, automation) and who writes and prepares the content. Each adds design, build and testing time.",
          details: [
            {
              kind: "steps",
              items: [
                "Number of page types and features",
                "Custom design or a template",
                "Content editing: a CMS or developer-edited",
                "One language or bilingual with right-to-left layout",
                "Integrations: forms to CRM, payments, automation",
                "Content: supplied by you or written for you",
              ],
            },
          ],
        },
        { q: "What does each budget level include?", a: null, needs: [30] },
        {
          q: "What does a website cost to run after launch?",
          a: "The recurring costs are a domain name, hosting, and any paid services the site uses, such as email delivery or a CMS plan. Many sites also budget for maintenance: updates, monitoring and small changes. Ask any agency to list these separately so the build price and the running price are clear.",
        },
        {
          q: "How do I get an exact price for my website?",
          a: "Book the free growth audit: a 30-minute call where we look at what you need and what you have. If it fits, you get a fixed quote in writing with scope, price and timeline, and you only pay for the agreed scope.",
          details: [{ kind: "links", items: [{ label: "Book the free growth audit", href: "/contact?need=web" }] }],
        },
      ],
    },
    fa: {
      metaTitle: "قیمت طراحی سایت ۱۴۰۵؛ بازه‌های واقعی و عوامل هزینه",
      metaDescription: "طراحی سایت چقدر هزینه دارد و چرا: عواملی که قیمت را بالا و پایین می‌برند، هر سطح چه چیزی دارد، هزینه‌های بعد از راه‌اندازی و راه گرفتن قیمت قطعی.",
      eyebrow: "راهنما",
      h1: "قیمت طراحی سایت **چقدر است؟**",
      definition:
        "هزینه‌ی سایت بیشتر زمانی است که برای برنامه‌ریزی، طراحی، ساخت و تست آن صرف می‌شود، به‌علاوه‌ی هزینه‌ی سالانه‌ی کمتری برای آنلاین نگه داشتنش. دامنه‌ی کار هر دو را تعیین می‌کند؛ برای همین دو سایتی که شبیه هم به نظر می‌رسند ممکن است قیمت خیلی متفاوتی داشته باشند.",
      answers: [
        { q: "قیمت طراحی سایت اختصاصی در ۱۴۰۵ چقدر است؟", a: null, needs: [30] },
        {
          q: "چه چیزی هزینه‌ی طراحی سایت را بالا یا پایین می‌برد؟",
          a: "بیشتر از همه دامنه‌ی کار: چند نوع صفحه، طراحی اختصاصی یا قالب آماده، روش ویرایش محتوا، یک‌زبانه یا دوزبانه بودن، اتصال به سیستم‌های دیگر (CRM، پرداخت، اتوماسیون) و اینکه محتوا را چه کسی می‌نویسد و آماده می‌کند. هر کدام زمان طراحی، ساخت و تست را بیشتر می‌کند.",
          details: [
            {
              kind: "steps",
              items: [
                "تعداد نوع صفحه‌ها و قابلیت‌ها",
                "طراحی اختصاصی یا قالب آماده",
                "ویرایش محتوا: با CMS یا توسط برنامه‌نویس",
                "یک‌زبانه یا دوزبانه با چیدمان راست‌به‌چپ",
                "اتصال‌ها: فرم به CRM، پرداخت، اتوماسیون",
                "محتوا: آماده از طرف شما یا نوشتن برایتان",
              ],
            },
          ],
        },
        { q: "هر سطح بودجه شامل چه چیزهایی می‌شود؟", a: null, needs: [30] },
        {
          q: "سایت بعد از راه‌اندازی چه هزینه‌هایی دارد؟",
          a: "هزینه‌های تکراری شامل دامنه، هاست و سرویس‌های پولی‌ای است که سایت استفاده می‌کند، مثل ارسال ایمیل یا اشتراک CMS. خیلی از سایت‌ها برای نگهداری هم بودجه می‌گذارند: به‌روزرسانی، پایش و تغییرات کوچک. از هر آژانسی بخواهید این‌ها را جدا بنویسد تا قیمت ساخت و هزینه‌ی نگهداری روشن باشد.",
        },
        {
          q: "قیمت دقیق سایت خودم را چطور بگیرم؟",
          a: "بررسی رایگان رشد را رزرو کنید: یک تماس ۳۰ دقیقه‌ای که در آن نیاز و وضعیت فعلی شما را بررسی می‌کنیم. اگر به هم خوردیم، پیشنهاد قیمت قطعی و مکتوب با دامنه، قیمت و زمان‌بندی می‌گیرید و فقط برای دامنه‌ی توافق‌شده پرداخت می‌کنید.",
          details: [{ kind: "links", items: [{ label: "رزرو بررسی رایگان رشد", href: "/contact?need=web" }] }],
        },
      ],
    },
  },

  // --------------------------------------------------------------------------------------- AI agent cost guide (C7)
  {
    kind: "guide",
    slug: "ai-agent-cost",
    need: "ai",
    status: "draft",
    updated: null,
    author: null,
    needs: [19, 30, 31, 33],
    en: {
      metaTitle: "AI agent development cost: build fee and running costs",
      metaDescription: "What an AI agent costs: the one-time build, the monthly running costs for models and hosting, what changes the price, and how to get a fixed quote.",
      eyebrow: "Guide",
      h1: "How much does **an AI agent** cost?",
      definition:
        "An AI agent has two kinds of cost: a one-time build (designing the process, connecting your tools, testing) and a running cost every month (the language-model usage, hosting and upkeep). Comparing offers only makes sense when both are stated.",
      answers: [
        { q: "How much does it cost to build an AI agent?", a: null, needs: [30] },
        { q: "What does an AI agent cost to run each month?", a: null, needs: [31] },
        {
          q: "What changes the cost of an AI agent?",
          a: "How many steps and decisions the process has, how many tools it must connect to, how much it runs (every run uses the language model), whether it needs a person to approve some actions, and where it is hosted. A single, well-defined process is the cheapest and fastest place to start.",
        },
        {
          q: "How long does it take before the agent is working?",
          a: `A focused automation sprint goes live in ${sprintEn}; simple automations take days and systems with several agents ${complexEn}. The timeline is part of the fixed quote, so build time is agreed up front.`,
        },
        { q: "What does using AI models from Iran involve?", a: null, needs: [19] },
        {
          q: "How do I get a price for my AI agent?",
          a: "Book the free growth audit. In 30 minutes we look at the process you want to automate and, if it fits, you get a fixed quote in writing with scope, price and timeline. You only pay for the agreed scope.",
          details: [{ kind: "links", items: [{ label: "Book the free growth audit", href: "/contact?need=ai" }] }],
        },
      ],
    },
    fa: {
      metaTitle: "هزینه ساخت ایجنت هوش مصنوعی در ایران (۱۴۰۵)",
      metaDescription: "ایجنت هوش مصنوعی چقدر هزینه دارد: هزینه‌ی یک‌باره‌ی ساخت، هزینه‌ی ماهانه‌ی مدل و سرور، عواملی که قیمت را تغییر می‌دهند و راه گرفتن قیمت قطعی.",
      eyebrow: "راهنما",
      h1: "هزینه ساخت ایجنت هوش مصنوعی **چقدر است؟**",
      definition:
        "ایجنت هوش مصنوعی دو نوع هزینه دارد: هزینه‌ی یک‌باره‌ی ساخت (طراحی فرایند، اتصال ابزارها، تست) و هزینه‌ی ماهانه‌ی اجرا (مصرف مدل زبانی، سرور و نگهداری). مقایسه‌ی پیشنهادها فقط وقتی معنا دارد که هر دو را بدانید.",
      answers: [
        { q: "هزینه ساخت ایجنت هوش مصنوعی چقدر است؟", a: null, needs: [30] },
        { q: "هزینه‌ی ماهانه‌ی اجرای ایجنت چقدر است؟", a: null, needs: [31] },
        {
          q: "چه چیزی هزینه‌ی ایجنت هوش مصنوعی را تغییر می‌دهد؟",
          a: "تعداد مراحل و تصمیم‌های فرایند، تعداد ابزارهایی که باید به آن‌ها وصل شود، حجم اجرا (هر اجرا از مدل زبانی استفاده می‌کند)، اینکه بعضی کارها تأیید انسانی لازم دارند یا نه، و محل اجرای آن. یک فرایند مشخص و تکی ارزان‌ترین و سریع‌ترین نقطه‌ی شروع است.",
        },
        {
          q: "چقدر طول می‌کشد تا ایجنت راه بیفتد؟",
          a: `یک اسپرینت اتوماسیون متمرکز در ${sprintFa} راه می‌افتد؛ اتوماسیون‌های ساده چند روز و سیستم‌های چندایجنتی ${complexFa}. زمان‌بندی بخشی از پیشنهاد قیمت قطعی است، پس از قبل روی آن توافق می‌شود.`,
        },
        { q: "استفاده از مدل‌های هوش مصنوعی در ایران چه ملاحظاتی دارد؟", a: null, needs: [19] },
        {
          q: "قیمت ایجنت خودم را چطور بگیرم؟",
          a: "بررسی رایگان رشد را رزرو کنید. در ۳۰ دقیقه فرایندی را که می‌خواهید خودکار شود بررسی می‌کنیم و اگر به هم خوردیم، پیشنهاد قیمت قطعی و مکتوب با دامنه، قیمت و زمان‌بندی می‌گیرید. فقط برای دامنه‌ی توافق‌شده پرداخت می‌کنید.",
          details: [{ kind: "links", items: [{ label: "رزرو بررسی رایگان رشد", href: "/contact?need=ai" }] }],
        },
      ],
    },
  },
];

/** Copy for the guides hub (/guides). The hub only exists while at least one guide is visible. */
export const guidesHub = {
  en: {
    metaTitle: "Website and AI automation guides",
    metaDescription: "Practical guides on what websites and AI agents cost, how long they take and how to choose, written by the Bellona team.",
    eyebrow: "Guides",
    h1: "Guides for **deciding well**",
    sub: "Straight answers to the questions we hear most before a project starts.",
    read: "Read the guide",
    deeper: "Go deeper",
    lastUpdated: "Last updated",
    by: "By",
    draftBanner: "Draft: not published, not indexed, linked from nowhere. Questions still open:",
    needsAnswer: "Needs the team's answer to question",
  },
  fa: {
    metaTitle: "راهنمای طراحی سایت و اتوماسیون هوش مصنوعی",
    metaDescription: "راهنماهای کاربردی درباره‌ی هزینه و زمان ساخت سایت و ایجنت هوش مصنوعی و نحوه‌ی انتخاب، نوشته‌ی تیم بلونا.",
    eyebrow: "راهنما",
    h1: "راهنماهایی برای **تصمیم درست**",
    sub: "جواب روشن به سؤال‌هایی که قبل از شروع پروژه بیشتر از همه می‌شنویم.",
    read: "خواندن راهنما",
    deeper: "بیشتر بدانید",
    lastUpdated: "آخرین به‌روزرسانی",
    by: "نویسنده",
    draftBanner: "پیش‌نویس: منتشر نشده، ایندکس نمی‌شود و از هیچ جا لینک ندارد. پرسش‌های باز:",
    needsAnswer: "نیازمند پاسخ تیم به پرسش",
  },
} as const;
