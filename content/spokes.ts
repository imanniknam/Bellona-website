import { facts, fmt } from "./facts";
import { more as spokeExtra } from "./more/spokes";
import { guidesA } from "./spokes-guides-a";
import { guidesB } from "./spokes-guides-b";
import { serviceSpokes } from "./spokes-services";
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
  | { kind: "links"; items: { label: string; href: string }[] }
  | { kind: "code"; lang: string; text: string };

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
  /** Pillar slug the service spoke belongs to (the URL is /services/<parent>/<slug>); omit for a standalone page (/services/<slug>). */
  parent?: string;
  /** The pillar a standalone service page or a guide relates to: its service link, breadcrumb context and "go deeper" listing. */
  pillar?: string;
  /** Pre-selects the contact form's "need". */
  need: PillarId;
  status: "draft" | "published";
  /** Guides: ISO date shown as "Last updated" and used as dateModified. */
  updated?: string | null;
  /** Guides: byline, the name of a team member (content/{en,fa}.ts team.members). */
  author?: string | null;
  /** Page-level questions that block publishing, beyond those on individual answers. */
  needs: number[];
  /** Case studies this page links to (project slugs): proof, and a link back from the case study. */
  projects?: string[];
  /** Guides this page links to (guide slugs). */
  guides?: string[];
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
  "بررسی: فرایندهای فعلی را بررسی می‌کنیم، گلوگاه‌ها را پیدا می‌کنیم و اولویت‌ها را مشخص می‌کنیم.",
  "طراحی: معماری سیستم، نقش هر دستیار و اتصال ابزارها.",
  "پیاده‌سازی: سیستم را می‌سازیم و می‌آزماییم، با کمترین اختلال در کار روزانه‌ی تیم.",
  "راه‌اندازی: سیستم در محیط واقعی به کار می‌افتد و از روز اول قابل استفاده است.",
  "بهبود پیوسته: عملکرد را پایش و اصلاح می‌کنیم و پابه‌پای رشد کسب‌وکار گسترشش می‌دهیم.",
];

const rawSpokes: Spoke[] = [
  // --------------------------------------------------------------------------------------- AI agents (C6)
  {
    kind: "service",
    slug: "ai-agents",
    parent: "ai-automation",
    need: "ai",
    status: "draft",
    needs: [19, 20, 30, 31],
    projects: ["ai-real-estate-os"],
    guides: ["lead-follow-up-automation-n8n"],
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
          a: "An agent takes over repetitive work that follows rules but needs judgment: replying to new leads, qualifying them, following up until there is an answer, logging everything in the CRM and preparing reports. Your team keeps the decisions that need a person, and the agent hands those over with the context attached.",
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
      metaDescription: `ایجنت هوش مصنوعی اختصاصی که مشتری‌های بالقوه را غربال و پیگیری می‌کند، به مشتری جواب می‌دهد و CRM را به‌روز نگه می‌دارد. بیشتر سیستم‌ها ظرف ${sprintFa} راه می‌افتند.`,
      eyebrow: "دستیار و اتوماسیون هوش مصنوعی",
      h1: "ساخت ایجنت هوش مصنوعی **برای کسب‌وکار شما**",
      definition:
        "ایجنت هوش مصنوعی نرم‌افزاری است که با کمک یک مدل زبانی موقعیت را می‌فهمد، درباره‌ی قدم بعدی تصمیم می‌گیرد و آن را با ابزارهای خودتان (ایمیل، CRM، سایت یا پیام‌رسان) انجام می‌دهد. برخلاف چت‌بات، فقط به سؤال جواب نمی‌دهد؛ یک فرایند را از اول تا آخر پیش می‌برد.",
      answers: [
        {
          q: "ایجنت هوش مصنوعی برای کسب‌وکار چه می‌کند؟",
          a: "ایجنت کارهای تکراری‌ای را به دوش می‌گیرد که قاعده دارند ولی کمی قضاوت هم می‌خواهند: جواب دادن به مشتری تازه، سنجیدنش، پیگیری تا گرفتن جواب، ثبت همه‌چیز در CRM و آماده کردن گزارش. تصمیم‌هایی که به آدم نیاز دارند دست تیم شما می‌ماند و ایجنت آن‌ها را با سابقه‌ی کامل به تیم می‌سپارد.",
        },
        {
          q: "ساخت ایجنت هوش مصنوعی چقدر طول می‌کشد؟",
          a: `یک دوره‌ی متمرکز اتوماسیون ظرف ${sprintFa} راه می‌افتد و اتوماسیون‌های ساده چند روز طول می‌کشند. سیستم‌های پیچیده‌تر که چند ایجنت در آن‌ها با هم کار می‌کنند ${complexFa} زمان می‌برند. پس از بررسی رایگان، تاریخ قطعی در پیشنهاد قیمت می‌آید تا پیش از شروع کار سر زمان توافق کرده باشیم.`,
          details: [{ kind: "steps", items: processFa }],
        },
        {
          q: "ایجنت هوش مصنوعی به CRM، سایت و ایمیل وصل می‌شود؟",
          a: `بله؛ بیشتر کار همین اتصال‌هاست. در سیستم هوشمند فروشی که برای یک کسب‌وکار املاک ساختیم، ${wfFa} گردش‌کار n8n یک CRM با ${tablesFa} جدول در Baserow، ایمیل ورودی و خروجی، اسناد Google Drive و محتوایی را که با Claude نوشته می‌شود به هم وصل می‌کنند؛ از مدیریت خطا تا گزارش روزانه.`,
          details: [{ kind: "links", items: [{ label: "نمونه‌کار: سیستم هوشمند فروش املاک", href: "/work/ai-real-estate-os" }] }],
        },
        { q: "ایجنت با کدام ابزارها و پیام‌رسان‌های ایرانی کار می‌کند؟", a: null, needs: [20] },
        { q: "هزینه‌ی ساخت ایجنت هوش مصنوعی چقدر است؟", a: null, needs: [30, 31] },
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
    // Published 2026-11-02 (SEO-GUIDELINE E1); the two answers that need prices stay hidden until the team provides them.
    status: "published",
    needs: [30, 32],
    projects: ["ai-real-estate-os"],
    guides: ["lead-follow-up-automation-n8n"],
    en: {
      metaTitle: "n8n automation and workflow implementation",
      metaDescription: `n8n automation: we design, build and run n8n workflows that connect your CRM, email, documents and AI. Our real-estate sales system runs on ${wfEn} n8n workflows.`,
      eyebrow: "AI agents & automation",
      h1: "n8n automation **and workflow implementation**",
      definition:
        "n8n is a workflow automation tool: you connect apps and services as a chain of steps (a trigger, then actions and decisions) instead of writing a custom integration for each one. It can run on n8n's cloud or on your own server, and it includes nodes for AI models and agents.",
      answers: [
        {
          q: "What does an n8n implementation include?",
          a: "Mapping the process first, then building the workflows, connecting each tool, handling errors so failures alert someone instead of silently stopping, and documenting it so your team understands what runs where. Where a step needs judgment, we add an AI node or agent inside the workflow.",
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
      metaDescription: `اتوماسیون n8n: گردش‌کار طراحی و راه‌اندازی می‌کنیم تا CRM، ایمیل و هوش مصنوعی به هم وصل شوند. سیستم فروش املاکی که ساختیم ${wfFa} گردش‌کار n8n دارد. بررسی رایگان.`,
      eyebrow: "دستیار و اتوماسیون هوش مصنوعی",
      h1: "اتوماسیون n8n **و پیاده‌سازی گردش‌کار**",
      definition:
        "n8n ابزاری برای خودکار کردن گردش‌کار است: به‌جای نوشتن اتصال جداگانه برای هر ابزار، اپ‌ها و سرویس‌ها را به شکل زنجیره‌ای از مراحل (یک رویداد شروع، بعد اقدام‌ها و تصمیم‌ها) به هم وصل می‌کنید. هم روی سرویس ابری n8n اجرا می‌شود و هم روی سرور خودتان، و برای مدل‌ها و ایجنت‌های هوش مصنوعی هم ماژول دارد.",
      answers: [
        {
          q: "پیاده‌سازی n8n چه کارهایی را در بر می‌گیرد؟",
          a: "اول نقشه‌ی فرایند را می‌کشیم، بعد گردش‌کارها را می‌سازیم، ابزارها را یکی‌یکی وصل می‌کنیم، خطاها را طوری مدیریت می‌کنیم که به‌جای توقف بی‌صدا به کسی هشدار بدهند، و همه را مستند می‌کنیم تا تیمتان بداند چه چیزی کجا اجرا می‌شود. هر جا قدمی به قضاوت نیاز داشته باشد، یک ماژول یا ایجنت هوش مصنوعی در گردش‌کار می‌گذاریم.",
        },
        {
          q: "چه سیستمی با n8n ساخته‌اید؟",
          a: `برای یک کسب‌وکار فروش املاک ${wfFa} گردش‌کار n8n ساختیم: پیدا کردن و امتیازدهی سرمایه‌گذارها، ارسال و دریافت ایمیل، تحلیل پروژه، ساخت سند در Google Drive، یک CRM با ${tablesFa} جدول در Baserow، مدیریت متمرکز خطا و گزارش روزانه.`,
          details: [{ kind: "links", items: [{ label: "نمونه‌کار: سیستم هوشمند فروش املاک", href: "/work/ai-real-estate-os" }] }],
        },
        {
          q: "پیاده‌سازی n8n چقدر طول می‌کشد؟",
          a: `یک دوره‌ی معمول اتوماسیون، یعنی یک فرایند کامل از اول تا آخر، ظرف ${sprintFa} راه می‌افتد. گردش‌کارهای ساده چند روز طول می‌کشند و سیستم‌هایی با چند ایجنت ${complexFa}. تاریخ دقیق پس از بررسی رایگان در پیشنهاد قیمت می‌آید.`,
        },
        {
          q: "n8n یا Make یا Zapier: کدام را انتخاب کنیم؟",
          a: "هر سه بی‌کدنویسی اختصاصی اپ‌ها را به هم وصل می‌کنند. Zapier و Make سرویس ابری‌اند و به اندازه‌ی مصرف هزینه می‌گیرند. n8n روی سرور خودتان هم اجرا می‌شود؛ داده درون زیرساخت شما می‌ماند و برای گردش‌کارهای طولانی یا پر از هوش مصنوعی مناسب‌تر است. انتخاب درست به ابزارها، حجم کار و جای نگهداری داده بستگی دارد.",
        },
        { q: "n8n را روی سرور خودمان راه‌اندازی می‌کنید و ماهانه نگهش می‌دارید؟", a: null, needs: [32] },
        { q: "هزینه‌ی پیاده‌سازی n8n چقدر است؟", a: null, needs: [30, 32] },
      ],
    },
  },

  // --------------------------------------------------------------------------------------- Next.js (C1a)
  {
    kind: "service",
    slug: "nextjs",
    parent: "website-design",
    need: "web",
    // Published 2026-10-27 (owner: push SEO). Questions still waiting on facts stay hidden until answered.
    status: "published",
    needs: [3, 4, 30],
    projects: ["mojasame-saidi"],
    guides: ["nextjs-seo-checklist","website-design-cost"],
    en: {
      metaTitle: "Next.js website design: fast and SEO-ready",
      metaDescription: "Next.js website design: server rendering so Google and AI assistants read every page, fast on mobile, with bilingual RTL support. Free audit.",
      eyebrow: "Website design",
      h1: "Next.js **website design**",
      definition:
        "Next.js is a framework built on React for websites and web apps. Pages can be rendered on the server, so the full text arrives in the first response, which search engines and AI assistants can read without running JavaScript. It also handles routing, images and multiple languages.",
      answers: [
        {
          q: "Why choose Next.js website design?",
          a: "Speed and visibility. Server rendering sends complete pages, so they load fast on mobile and every word is readable by search engines. One codebase can serve a marketing site and a full product, and bilingual Persian–English routing with right-to-left layout is built in rather than bolted on.",
        },
        {
          q: "Which Next.js projects have you built?",
          a: "This site is one. Another is the Mojasame Saidi store (Next.js 15 with Prisma).",
          details: [
            {
              kind: "links",
              items: [
                
                
                
              ],
            },
          ],
        },
        {
          q: "Next.js or WordPress?",
          a: "WordPress is quick to start with templates and plugins; Next.js is custom-built, so it is faster, leaner and easier to keep secure, but needs developers for structural changes. For editing content without a developer, a headless CMS can sit behind Next.js,; Payload CMS is one such option.",
        },
        {
          q: "Can a Next.js site be bilingual, Persian and English?",
          a: "Yes. Each language gets its own URLs and full translation, with right-to-left layout for Persian and the right language tags for search engines. This site works this way, with separate Persian and English pages linked to each other.",
        },
        { q: "Which CMS do you use with Next.js?", a: null, needs: [3] },
        { q: "How long does a Next.js website take?", a: null, needs: [4] },
        { q: "How much does a Next.js website cost?", a: null, needs: [30] },
      ],
    },
    fa: {
      metaTitle: "طراحی سایت با نکست جی اس (Next.js)؛ سریع و سئومحور",
      metaDescription: "طراحی سایت با نکست جی اس (Next.js): رندر سمت سرور برای دیده شدن در گوگل، سرعت بالا روی موبایل و پشتیبانی از فارسی و انگلیسی با راست‌چین درست.",
      eyebrow: "طراحی سایت",
      h1: "طراحی سایت با **نکست جی اس (Next.js)**",
      definition:
        "نکست جی اس (Next.js) چارچوبی بر پایه‌ی React برای ساخت سایت و وب‌اپلیکیشن است. صفحه‌ها می‌توانند روی سرور ساخته شوند؛ یعنی متن کامل در همان پاسخ اول می‌رسد و موتورهای جست‌وجو و دستیارهای هوش مصنوعی بی‌اجرای جاوااسکریپت آن را می‌خوانند. مسیرها، تصویرها و چندزبانگی را هم مدیریت می‌کند.",
      answers: [
        {
          q: "چرا طراحی سایت با نکست جی اس (Next.js)؟",
          a: "به خاطر سرعت و دیده شدن. رندر سمت سرور صفحه‌ی کامل را می‌فرستد، پس سایت روی موبایل سریع باز می‌شود و موتور جست‌وجو همه‌ی متن را می‌خواند. با یک پایه‌ی کد می‌شود هم سایت معرفی ساخت و هم محصول کامل، و مسیرهای دوزبانه‌ی فارسی و انگلیسی با چیدمان راست‌چین از اول در ساختار هست، نه وصله‌ای که بعداً اضافه شود.",
        },
        {
          q: "چه پروژه‌هایی را با Next.js ساخته‌اید؟",
          a: "همین سایت یکی از آن‌هاست. نمونه‌ی دیگر فروشگاه مجسمه سعیدی (Next.js 15 با Prisma) است.",
          details: [
            {
              kind: "links",
              items: [
                
                
                
              ],
            },
          ],
        },
        {
          q: "Next.js یا وردپرس؟",
          a: "وردپرس با قالب و افزونه زود راه می‌افتد؛ Next.js اختصاصی ساخته می‌شود، پس سریع‌تر، سبک‌تر و امن‌تر می‌ماند، ولی تغییرات ساختاری به برنامه‌نویس نیاز دارد. برای ویرایش محتوا بی‌برنامه‌نویس، می‌شود یک CMS هدلس پشت Next.js گذاشت؛ Payload CMS یکی از این گزینه‌هاست.",
        },
        {
          q: "سایت Next.js می‌تواند دوزبانه‌ی فارسی و انگلیسی باشد؟",
          a: "بله. هر زبان آدرس و ترجمه‌ی کامل خودش را دارد، فارسی با چیدمان راست‌چین، و برچسب زبانِ درست برای موتورهای جست‌وجو. همین سایت همین‌طور است: صفحه‌های جداگانه‌ی فارسی و انگلیسی که به هم لینک شده‌اند.",
        },
        { q: "با Next.js از کدام CMS استفاده می‌کنید؟", a: null, needs: [3] },
        { q: "طراحی سایت با Next.js چقدر طول می‌کشد؟", a: null, needs: [4] },
        { q: "قیمت طراحی سایت با Next.js چقدر است؟", a: null, needs: [30] },
      ],
    },
  },

  // --------------------------------------------------------------------------------------- e-commerce website design (C1)
  {
    kind: "service",
    slug: "ecommerce",
    parent: "website-design",
    need: "web",
    status: "published",
    needs: [],
    projects: ["nira-perfume", "mojasame-saidi"],
    guides: ["custom-vs-store-builder","website-design-cost"],
    en: {
      metaTitle: "E-commerce website design: custom online stores",
      metaDescription:
        "E-commerce website design: custom online stores with cart, online payment and an admin panel. Examples: Nira Perfume and Mojasame Saidi. Free audit.",
      eyebrow: "Website design",
      h1: "E-commerce **website design**",
      definition:
        "An e-commerce website is a store that sells online end to end: customers find products, add them to a cart, pay online and track orders, while the team manages products, stock, prices and orders from an admin panel.",
      answers: [
        {
          q: "What does e-commerce website design include?",
          a: "Product categories and search, product pages, a cart and checkout, customer accounts, online payment, and an admin panel for products, stock, prices and orders. It is fast on mobile, ready for search engines, and every form is validated so orders arrive complete.",
          details: [
            {
              kind: "steps",
              items: [
                "Categories, search and curated collections",
                "Cart, checkout and customer accounts",
                "Online payment through an Iranian gateway (e.g. Zarinpal)",
                "Admin panel: products, stock, prices and orders",
                "Mobile-first, SEO-ready pages",
              ],
            },
          ],
        },
        {
          q: "Which online stores have you built?",
          a: "Nira Perfume (a brand-led storefront with search and cart) and Mojasame Saidi (a premium, mobile-first store on Next.js with Prisma and PostgreSQL).",
          details: [
            {
              kind: "links",
              items: [
                
                { label: "Nira Perfume", href: "/work/nira-perfume" },
                { label: "Mojasame Saidi", href: "/work/mojasame-saidi" },
                
              ],
            },
          ],
        },
        {
          q: "Custom store or a ready-made platform?",
          a: "A ready-made platform is quicker to open; a custom store is built around how you sell, so it is faster, looks like your brand, and can grow features a template cannot, such as guided buying or a custom-order flow. We design and code the store itself, without a template.",
        },
        {
          q: "How do I get a price for my online store?",
          a: "Book the free growth audit. In 30 minutes we look at your products and how you sell, and if it fits you get a fixed quote in writing with scope, price and timeline.",
          details: [{ kind: "links", items: [{ label: "Book the free growth audit", href: "/contact?need=web" }] }],
        },
      ],
    },
    fa: {
      metaTitle: "طراحی سایت فروشگاهی و فروشگاه اینترنتی اختصاصی",
      metaDescription:
        "طراحی سایت فروشگاهی اختصاصی بدون قالب آماده: جست‌وجوی محصول، سبد خرید، پرداخت آنلاین و پنل سفارش‌ها. از جمله عطر نیرا و مجسمه سعیدی. بررسی رایگان.",
      eyebrow: "طراحی سایت",
      h1: "طراحی سایت **فروشگاهی**",
      definition:
        "سایت فروشگاهی (فروشگاه اینترنتی) فروش را از اول تا آخر آنلاین می‌کند: مشتری محصول را پیدا می‌کند، به سبد خرید می‌برد، آنلاین پرداخت می‌کند و سفارشش را پیگیری می‌کند؛ تیم شما هم محصولات، موجودی، قیمت‌ها و سفارش‌ها را از پنل مدیریت اداره می‌کند.",
      answers: [
        {
          q: "طراحی سایت فروشگاهی چه چیزهایی را در بر می‌گیرد؟",
          a: "دسته‌بندی و جست‌وجوی محصول، صفحه‌ی محصول، سبد خرید و تسویه‌حساب، حساب کاربری مشتری، پرداخت آنلاین و پنل مدیریت محصول، موجودی، قیمت و سفارش. فروشگاه روی موبایل سریع است، برای سئو آماده است و فرم‌های مسیر خرید بررسی می‌شوند تا سفارش کامل و بی‌نقص برسد.",
          details: [
            {
              kind: "steps",
              items: [
                "دسته‌بندی، جست‌وجو و مجموعه‌های منتخب",
                "سبد خرید، تسویه‌حساب و حساب مشتری",
                "پرداخت آنلاین با درگاه ایرانی (مثل زرین‌پال)",
                "پنل مدیریت: محصول، موجودی، قیمت و سفارش",
                "صفحه‌های موبایل‌محور و آماده‌ی سئو",
              ],
            },
          ],
        },
        {
          q: "چه فروشگاه‌های اینترنتی‌ای طراحی کرده‌اید؟",
          a: "عطر نیرا (فروشگاه برندمحور با جست‌وجو و سبد خرید) و فروشگاه مجسمه سعیدی (فروشگاه لوکس و موبایل‌محور با Next.js، Prisma و PostgreSQL).",
          details: [
            {
              kind: "links",
              items: [
                
                { label: "عطر نیرا", href: "/work/nira-perfume" },
                { label: "فروشگاه مجسمه سعیدی", href: "/work/mojasame-saidi" },
                
              ],
            },
          ],
        },
        {
          q: "فروشگاه اختصاصی بهتر است یا فروشگاه‌ساز آماده؟",
          a: "فروشگاه‌ساز آماده زودتر راه می‌افتد؛ فروشگاه اختصاصی بر پایه‌ی شیوه‌ی فروش شما ساخته می‌شود، پس سریع‌تر است، شبیه برند شماست و امکاناتی دارد که قالب‌ها ندارند، مثل راهنمایی در خرید یا سفارش اختصاصی. ما خود فروشگاه را طراحی و کدنویسی می‌کنیم، بی‌قالب آماده.",
        },
        {
          q: "قیمت طراحی سایت فروشگاهی را چطور بگیرم؟",
          a: "بررسی رایگان رشد را رزرو کنید. در ۳۰ دقیقه محصولات و شیوه‌ی فروشتان را بررسی می‌کنیم و اگر به توافق رسیدیم، قیمت قطعی و مکتوب با دامنه‌ی کار و زمان‌بندی می‌گیرید.",
          details: [{ kind: "links", items: [{ label: "رزرو بررسی رایگان", href: "/contact?need=web" }] }],
        },
      ],
    },
  },

  // --------------------------------------------------------------------------------------- corporate website design (C1)
  {
    kind: "service",
    slug: "corporate",
    parent: "website-design",
    need: "web",
    status: "published",
    needs: [],
    projects: [],
    guides: ["website-design-cost"],
    en: {
      metaTitle: "Corporate website design: fast and SEO-ready",
      metaDescription:
        "Corporate website design: company sites coded from scratch, with clear service and about pages, forms into your CRM, fast and SEO-ready. Free audit.",
      eyebrow: "Website design",
      h1: "Corporate **website design**",
      definition:
        "A corporate website is a company's main presence online: who you are, what you offer, proof that you deliver, and a clear way to get in touch. Its job is to turn the right visitors into enquiries.",
      answers: [
        {
          q: "What does corporate website design include?",
          a: "A home page built around one clear offer, service pages, an about page, case studies or a portfolio, and a contact page with forms that go straight to your email, Telegram or CRM. A content system lets your team edit text without a developer, and the site is fast and ready for search engines.",
          details: [
            {
              kind: "steps",
              items: [
                "Offer, page structure and copy direction",
                "Custom UI/UX design, coded without a template",
                "Service, about, portfolio and contact pages",
                "Forms connected to email, Telegram or a CRM",
                "Fast on mobile, SEO-ready, with analytics",
              ],
            },
          ],
        },
        {
          q: "Will the site help us get customers, not just look good?",
          a: "That is what it is designed for: one clear offer, a strong call to action on every page and forms that are easy to fill. Forms can connect to AI automation, so every enquiry is answered and followed up in seconds instead of waiting in an inbox.",
        },
        {
          q: "How do I get a price for our company website?",
          a: "Book the free growth audit. We review what you have and what you need, and if it fits you get a fixed quote in writing with scope, price and timeline.",
          details: [{ kind: "links", items: [{ label: "Book the free growth audit", href: "/contact?need=web" }] }],
        },
      ],
    },
    fa: {
      metaTitle: "طراحی سایت شرکتی اختصاصی؛ سریع و آماده‌ی سئو",
      metaDescription:
        "طراحی سایت شرکتی اختصاصی و کدنویسی‌شده: پیشنهاد روشن، صفحه‌های خدمات و درباره‌ی ما، فرم وصل به ایمیل یا CRM، سریع و آماده‌ی سئو. بررسی رایگان.",
      eyebrow: "طراحی سایت",
      h1: "طراحی سایت **شرکتی**",
      definition:
        "سایت شرکتی ویترین اصلی هر شرکت در اینترنت است: شما که هستید، چه چیزی ارائه می‌دهید، چه کارهایی کرده‌اید و چطور می‌شود با شما تماس گرفت. کارش این است که بازدیدکننده‌ی درست را به مشتری برساند.",
      answers: [
        {
          q: "طراحی سایت شرکتی چه چیزهایی را در بر می‌گیرد؟",
          a: "صفحه‌ی اصلی با یک پیشنهاد روشن، صفحه‌های خدمات، درباره‌ی ما، نمونه‌کار و تماس، با فرم‌هایی که مستقیم به ایمیل، تلگرام یا CRM شما می‌رسند. تیمتان می‌تواند متن‌ها را بی‌برنامه‌نویس ویرایش کند و سایت سریع و آماده‌ی موتورهای جست‌وجوست.",
          details: [
            {
              kind: "steps",
              items: [
                "پیشنهاد اصلی، ساختار صفحه‌ها و مسیر متن‌ها",
                "طراحی رابط کاربری اختصاصی و کدنویسی‌شده، بدون قالب",
                "صفحه‌های خدمات، درباره‌ی ما، نمونه‌کار و تماس",
                "فرم‌های وصل به ایمیل، تلگرام یا CRM",
                "سریع روی موبایل، آماده‌ی سئو، با ابزار آمار",
              ],
            },
          ],
        },
        {
          q: "سایت شرکتی برایمان مشتری هم می‌آورد یا فقط ظاهرش خوب است؟",
          a: "اصلاً برای همین طراحی می‌شود: یک پیشنهاد روشن، دعوت به اقدامِ واضح در هر صفحه و فرم‌هایی که راحت پر می‌شوند. فرم‌ها می‌توانند به اتوماسیون هوش مصنوعی وصل شوند تا هر درخواست در چند ثانیه جواب بگیرد و پیگیری شود، به‌جای آنکه در صندوق ایمیل بماند.",
        },
        {
          q: "قیمت طراحی سایت شرکتی را چطور بگیرم؟",
          a: "بررسی رایگان رشد را رزرو کنید. وضعیت فعلی و نیازتان را بررسی می‌کنیم و اگر به توافق رسیدیم، قیمت قطعی و مکتوب با دامنه‌ی کار و زمان‌بندی می‌گیرید.",
          details: [{ kind: "links", items: [{ label: "رزرو بررسی رایگان", href: "/contact?need=web" }] }],
        },
      ],
    },
  },

  // --------------------------------------------------------------------------------------- bilingual website design (C1)
  {
    kind: "service",
    slug: "bilingual",
    parent: "website-design",
    need: "web",
    status: "published",
    needs: [],
    projects: [],
    guides: ["bilingual-website-hreflang-rtl","website-design-cost"],
    en: {
      metaTitle: "Bilingual website design: Persian, English, RTL",
      metaDescription:
        "Bilingual website design in Persian and English: separate URLs per language, full right-to-left layout, correct hreflang. Free audit.",
      eyebrow: "Website design",
      h1: "Bilingual **website design**",
      definition:
        "A bilingual website serves two languages as two complete versions of the same site, each with its own addresses and full translation. For Persian and English that also means a true right-to-left layout for Persian, not a mirrored English page.",
      answers: [
        {
          q: "What makes a bilingual Persian–English website done right?",
          a: "Each language has its own URLs and full translation; Persian gets a real right-to-left layout with Persian digits and proper fonts; the two versions link to each other with hreflang tags, so search engines show the right language; and editors manage both versions side by side.",
          details: [
            {
              kind: "steps",
              items: [
                "Separate URLs per language (e.g. / and /en)",
                "True right-to-left layout and Persian typography",
                "hreflang and language tags for search engines",
                "Language switch to the same page in the other language",
                "Content edited in both languages from one place",
              ],
            },
          ],
        },
        {
          q: "Which bilingual websites have you built?",
          a: "This site, which serves Persian and English as two linked versions of every page.",
          details: [],
        },
        {
          q: "Does a bilingual website help SEO?",
          a: "Yes, when it is built correctly. Each language version can rank on its own for searches in that language, and hreflang tells search engines which version to show. A machine-translated or mirrored page usually does the opposite.",
        },
        {
          q: "How do I get a price for a bilingual website?",
          a: "Book the free growth audit. We look at both audiences and the content you have, and if it fits you get a fixed quote in writing.",
          details: [{ kind: "links", items: [{ label: "Book the free growth audit", href: "/contact?need=web" }] }],
        },
      ],
    },
    fa: {
      metaTitle: "طراحی سایت دوزبانه فارسی و انگلیسی (RTL و LTR)",
      metaDescription:
        "طراحی سایت دوزبانه‌ی فارسی و انگلیسی با آدرس جدا برای هر زبان، چیدمان راست‌چین واقعی و برچسب زبان درست برای گوگل. بررسی رایگان.",
      eyebrow: "طراحی سایت",
      h1: "طراحی سایت **دوزبانه**",
      definition:
        "سایت دوزبانه دو نسخه‌ی کامل از یک سایت است که هر زبان آدرس‌ها و ترجمه‌ی کامل خودش را دارد. در فارسی و انگلیسی یعنی نسخه‌ی فارسی چیدمان راست‌چین واقعی دارد، نه اینکه صفحه‌ی انگلیسی فقط برعکس شده باشد.",
      answers: [
        {
          q: "سایت دوزبانه‌ی فارسی و انگلیسیِ درست چه ویژگی‌هایی دارد؟",
          a: "هر زبان آدرس و ترجمه‌ی کامل خودش را دارد؛ نسخه‌ی فارسی چیدمان راست‌چین واقعی، ارقام فارسی و فونت مناسب دارد؛ دو نسخه با برچسب hreflang به هم وصل‌اند تا گوگل زبان درست را نشان دهد؛ و تیمتان محتوای هر دو زبان را کنار هم ویرایش می‌کند.",
          details: [
            {
              kind: "steps",
              items: [
                "آدرس جدا برای هر زبان (مثل / و /en)",
                "چیدمان راست‌چین واقعی و تایپوگرافی فارسی",
                "برچسب‌های hreflang و زبان برای موتور جست‌وجو",
                "دکمه‌ی تغییر زبان که به همان صفحه در زبان دیگر می‌رود",
                "ویرایش محتوای هر دو زبان از یک جا",
              ],
            },
          ],
        },
        {
          q: "چه سایت‌های دوزبانه‌ای طراحی کرده‌اید؟",
          a: "همین سایت، که هر صفحه‌اش دو نسخه‌ی فارسی و انگلیسیِ به‌هم‌پیوسته دارد.",
          details: [],
        },
        {
          q: "سایت دوزبانه به سئو کمک می‌کند؟",
          a: "بله، اگر درست ساخته شود. هر نسخه برای جست‌وجوهای زبان خودش جدا رتبه می‌گیرد و hreflang به گوگل می‌گوید کدام نسخه را نشان دهد. صفحه‌ی ترجمه‌ی ماشینی یا برعکس‌شده معمولاً نتیجه‌ی عکس می‌دهد.",
        },
        {
          q: "قیمت طراحی سایت دوزبانه را چطور بگیرم؟",
          a: "بررسی رایگان رشد را رزرو کنید. مخاطبان هر دو زبان و محتوای فعلی‌تان را بررسی می‌کنیم و اگر به توافق رسیدیم، قیمت قطعی و مکتوب می‌گیرید.",
          details: [{ kind: "links", items: [{ label: "رزرو بررسی رایگان", href: "/contact?need=web" }] }],
        },
      ],
    },
  },

  // --------------------------------------------------------------------------------------- website redesign (C1)
  {
    kind: "service",
    slug: "redesign",
    parent: "website-design",
    need: "web",
    status: "published",
    needs: [],
    projects: [],
    guides: ["migrate-wordpress-to-nextjs","website-design-cost"],
    en: {
      metaTitle: "Website redesign and migration, no SEO loss",
      metaDescription:
        "Website redesign without losing traffic: migrate off WordPress with every post and tag, redirect old links, stay online. Free audit.",
      eyebrow: "Website design",
      h1: "Website **redesign**",
      definition:
        "A website redesign rebuilds an existing site's design, structure or platform while keeping what already works: its content, its search rankings and the links people already use.",
      answers: [
        {
          q: "How do you handle a website redesign without losing SEO?",
          a: "We start by listing what works: pages that bring traffic, links others point to, content worth keeping. Then every old address gets a permanent redirect to its new page, content and metadata are migrated, and the new site is checked before and after launch so no link breaks.",
          details: [
            {
              kind: "steps",
              items: [
                "Audit: traffic pages, backlinks and content worth keeping",
                "New structure, design and build",
                "Content migration: posts, tags, authors, media",
                "Permanent (301) redirects for every old URL",
                "Launch check: no broken links, sitemap resubmitted",
              ],
            },
          ],
        },
        {
          q: "Does our site go offline during the redesign?",
          a: "No. The new site is built and tested separately and replaces the old one only when it is ready. We can also improve the current site step by step, for example by connecting automation first.",
        },
        {
          q: "How do I get a price for a redesign?",
          a: "Book the free growth audit. We review the current site and what should change, and if it fits you get a fixed quote in writing.",
          details: [{ kind: "links", items: [{ label: "Book the free growth audit", href: "/contact?need=web" }] }],
        },
      ],
    },
    fa: {
      metaTitle: "بازطراحی سایت و انتقال از وردپرس بدون افت سئو",
      metaDescription:
        "بازطراحی سایت یا انتقال از وردپرس بی‌افت بازدید: انتقال مطلب‌ها و برچسب‌ها، ریدایرکت لینک‌های قدیمی و در دسترس ماندن سایت. بررسی رایگان.",
      eyebrow: "طراحی سایت",
      h1: "بازطراحی **سایت**",
      definition:
        "بازطراحی سایت یعنی طراحی، ساختار یا پلتفرم سایت فعلی را از نو بسازید و در همان حال چیزهایی را که خوب کار می‌کنند نگه دارید: محتوا، رتبه در گوگل و لینک‌هایی که سایت‌های دیگر به شما داده‌اند.",
      answers: [
        {
          q: "چطور سایت را بازطراحی کنیم بی‌آنکه سئو افت کند؟",
          a: "اول فهرست می‌کنیم چه چیزهایی جواب می‌دهد: صفحه‌های پربازدید، لینک‌هایی که سایت‌های دیگر داده‌اند و محتوای ارزشمند. بعد برای هر آدرس قدیمی ریدایرکت دائمی به صفحه‌ی تازه می‌گذاریم، محتوا و متادیتا را منتقل می‌کنیم و سایت تازه را پیش و پس از انتشار بررسی می‌کنیم تا هیچ لینکی نشکند.",
          details: [
            {
              kind: "steps",
              items: [
                "بررسی: صفحه‌های پربازدید، بک‌لینک‌ها و محتوای ارزشمند",
                "ساختار، طراحی و ساخت تازه",
                "انتقال محتوا: مطلب‌ها، برچسب‌ها، نویسنده‌ها و تصویرها",
                "ریدایرکت دائمی (۳۰۱) برای همه‌ی آدرس‌های قدیمی",
                "بررسی پس از انتشار: بی‌لینک شکسته، ثبت دوباره‌ی نقشه‌ی سایت",
              ],
            },
          ],
        },
        {
          q: "سایت ما هنگام بازطراحی از دسترس خارج می‌شود؟",
          a: "نه. سایت تازه جداگانه ساخته و آزموده می‌شود و فقط وقتی آماده شد جای قبلی را می‌گیرد. می‌شود سایت فعلی را هم قدم‌به‌قدم بهتر کرد؛ مثلاً اول اتوماسیون را به آن وصل کنیم.",
        },
        {
          q: "قیمت بازطراحی سایت را چطور بگیرم؟",
          a: "بررسی رایگان رشد را رزرو کنید. سایت فعلی و چیزهایی را که باید عوض شود بررسی می‌کنیم و اگر به توافق رسیدیم، قیمت قطعی و مکتوب می‌گیرید.",
          details: [{ kind: "links", items: [{ label: "رزرو بررسی رایگان", href: "/contact?need=web" }] }],
        },
      ],
    },
  },

  // --------------------------------------------------------------------------------------- website cost guide (C2)
  {
    kind: "guide",
    slug: "website-design-cost",
    need: "web",
    // Published without figures: the price questions stay hidden until docs/seo/QUESTIONS_FOR_TEAM.md #30 is answered.
    status: "published",
    updated: "2026-10-27",
    author: "Amirhossein Bazdar|امیرحسین بازدار",
    needs: [30, 33],
    projects: ["mojasame-saidi"],
    guides: ["custom-vs-store-builder"],
    en: {
      metaTitle: "Website design cost in 2026: what sets the price",
      metaDescription: "Website design cost explained: what a website costs and why, the factors that move the price, running costs after launch, and how to get a fixed quote.",
      eyebrow: "Guide",
      h1: "How much does **website design cost?**",
      definition:
        "The cost of a website is mostly the time it takes to plan, design, build and test it, plus a smaller yearly cost to keep it online. Scope drives both, which is why two sites that look similar can be priced very differently.",
      answers: [
        { q: "How much does a custom website cost?", a: null, needs: [30] },
        {
          q: "What drives website design cost up or down?",
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
      metaTitle: "قیمت طراحی سایت ۱۴۰۵؛ هزینه به چه بستگی دارد؟",
      metaDescription: "قیمت طراحی سایت چقدر است و چرا: عواملی که قیمت را بالا و پایین می‌برند، هر سطح چه چیزهایی دارد، هزینه‌های پس از راه‌اندازی و راه گرفتن قیمت قطعی.",
      eyebrow: "راهنما",
      h1: "قیمت طراحی سایت **چقدر است؟**",
      definition:
        "بیشتر هزینه‌ی سایت، بهای زمانی است که صرف برنامه‌ریزی، طراحی، ساخت و آزمودنش می‌شود، به‌اضافه‌ی هزینه‌ی سالانه‌ی کمتری برای در دسترس نگه داشتنش. دامنه‌ی کار هر دو را تعیین می‌کند؛ برای همین دو سایتی که شبیه هم به نظر می‌رسند ممکن است قیمت‌های خیلی متفاوتی داشته باشند.",
      answers: [
        { q: "قیمت طراحی سایت اختصاصی در ۱۴۰۵ چقدر است؟", a: null, needs: [30] },
        {
          q: "چه چیزی قیمت طراحی سایت را بالا یا پایین می‌برد؟",
          a: "بیش از همه دامنه‌ی کار: چند نوع صفحه، طراحی اختصاصی یا قالب آماده، شیوه‌ی ویرایش محتوا، یک‌زبانه یا دوزبانه بودن، اتصال به سیستم‌های دیگر (CRM، پرداخت، اتوماسیون) و اینکه محتوا را چه کسی می‌نویسد و آماده می‌کند. هر کدام زمان طراحی، ساخت و آزمون را بیشتر می‌کند.",
          details: [
            {
              kind: "steps",
              items: [
                "تعداد نوع صفحه‌ها و قابلیت‌ها",
                "طراحی اختصاصی یا قالب آماده",
                "ویرایش محتوا: با CMS یا به دست برنامه‌نویس",
                "یک‌زبانه یا دوزبانه با چیدمان راست‌چین",
                "اتصال‌ها: فرم به CRM، پرداخت، اتوماسیون",
                "محتوا: آماده از طرف شما یا نوشته‌شده به دست ما",
              ],
            },
          ],
        },
        { q: "هر سطح بودجه چه چیزهایی را در بر می‌گیرد؟", a: null, needs: [30] },
        {
          q: "سایت پس از راه‌اندازی چه هزینه‌هایی دارد؟",
          a: "هزینه‌های تکرارشونده شامل دامنه، هاست و سرویس‌های پولی‌ای است که سایت از آن‌ها استفاده می‌کند، مثل ارسال ایمیل یا اشتراک CMS. خیلی از سایت‌ها برای نگهداری هم بودجه کنار می‌گذارند: به‌روزرسانی، پایش و تغییرات کوچک. از هر آژانسی بخواهید این‌ها را جدا بنویسد تا هزینه‌ی ساخت و هزینه‌ی نگهداری روشن باشد.",
        },
        {
          q: "قیمت دقیق سایت خودم را چطور بگیرم؟",
          a: "بررسی رایگان رشد را رزرو کنید: یک تماس ۳۰ دقیقه‌ای که در آن نیاز و وضعیت فعلی‌تان را بررسی می‌کنیم. اگر به توافق رسیدیم، پیشنهاد قیمت قطعی و مکتوب با دامنه‌ی کار، قیمت و زمان‌بندی می‌گیرید و فقط برای همان دامنه‌ی توافق‌شده پرداخت می‌کنید.",
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
    projects: ["ai-real-estate-os"],
    guides: [],
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
      metaTitle: "هزینه‌ی ساخت ایجنت هوش مصنوعی در ایران (۱۴۰۵)",
      metaDescription: "ایجنت هوش مصنوعی چقدر خرج دارد: هزینه‌ی یک‌باره‌ی ساخت، هزینه‌ی ماهانه‌ی مدل و سرور، عواملی که قیمت را تغییر می‌دهند و راه گرفتن قیمت قطعی.",
      eyebrow: "راهنما",
      h1: "هزینه‌ی ساخت ایجنت هوش مصنوعی **چقدر است؟**",
      definition:
        "ایجنت هوش مصنوعی دو جور هزینه دارد: هزینه‌ی یک‌باره‌ی ساخت (طراحی فرایند، اتصال ابزارها، آزمون) و هزینه‌ی ماهانه‌ی اجرا (مصرف مدل زبانی، سرور و نگهداری). پیشنهادها را فقط وقتی می‌شود مقایسه کرد که هر دو را بدانید.",
      answers: [
        { q: "هزینه‌ی ساخت ایجنت هوش مصنوعی چقدر است؟", a: null, needs: [30] },
        { q: "هزینه‌ی ماهانه‌ی اجرای ایجنت چقدر است؟", a: null, needs: [31] },
        {
          q: "هزینه‌ی ایجنت هوش مصنوعی به چه بستگی دارد؟",
          a: "تعداد مرحله‌ها و تصمیم‌های فرایند، تعداد ابزارهایی که باید به آن وصل شود، حجم اجرا (هر اجرا از مدل زبانی استفاده می‌کند)، اینکه بعضی کارها تأیید آدم لازم دارند یا نه، و جایی که اجرا می‌شود. یک فرایند مشخص و تک، ارزان‌ترین و سریع‌ترین نقطه‌ی شروع است.",
        },
        {
          q: "چقدر طول می‌کشد تا ایجنت راه بیفتد؟",
          a: `یک دوره‌ی متمرکز اتوماسیون ظرف ${sprintFa} راه می‌افتد؛ اتوماسیون‌های ساده چند روز و سیستم‌هایی با چند ایجنت ${complexFa}. زمان‌بندی بخشی از پیشنهاد قیمت قطعی است، پس از قبل سرش توافق می‌کنیم.`,
        },
        { q: "استفاده از مدل‌های هوش مصنوعی در ایران چه ملاحظاتی دارد؟", a: null, needs: [19] },
        {
          q: "قیمت ایجنت خودم را چطور بگیرم؟",
          a: "بررسی رایگان رشد را رزرو کنید. در ۳۰ دقیقه فرایندی را که می‌خواهید خودکار شود بررسی می‌کنیم و اگر به توافق رسیدیم، پیشنهاد قیمت قطعی و مکتوب با دامنه‌ی کار، قیمت و زمان‌بندی می‌گیرید. فقط برای همان دامنه‌ی توافق‌شده پرداخت می‌کنید.",
          details: [{ kind: "links", items: [{ label: "رزرو بررسی رایگان رشد", href: "/contact?need=ai" }] }],
        },
      ],
    },
  },
];

/**
 * The published list. Extra questions (content/more/spokes.ts, keyed by slug) are inserted before each page's last
 * answer, which is always the "how do I get a price" call to action, so that stays at the end.
 */
export const spokes: Spoke[] = [...rawSpokes, ...serviceSpokes, ...guidesA, ...guidesB].map((s) => {
  const extra = spokeExtra[s.slug];
  if (!extra) return s;
  const merge = (c: SpokeCopy, add: Answer[]): SpokeCopy => ({ ...c, answers: [...c.answers.slice(0, -1), ...add, ...c.answers.slice(-1)] });
  return { ...s, en: merge(s.en, extra.en), fa: merge(s.fa, extra.fa) };
});

/** Copy for the guides hub (/guides). The hub only exists while at least one guide is visible. */
export const guidesHub = {
  en: {
    metaTitle: "Website and AI automation guides",
    metaDescription: "Practical guides on what websites and AI agents cost, how long they take and how to choose, written by the Bellona team.",
    eyebrow: "Guides",
    h1: "Guides for **deciding well**",
    sub: "Straight answers to the questions we hear most before a project starts.",
    intro:
      "These guides answer the questions we hear most before a project starts: what a website costs, moving off WordPress, bilingual sites, Next.js SEO, being visible in AI search and automating customer follow-up. Each guide shows its author and the date it was last updated, and draws on real Bellona projects.",
    groups: { web: "Website design", growth: "SEO and visibility", ai: "AI automation" },
    read: "Read the guide",
    deeper: "Go deeper",
    relatedWork: "Related work",
    relatedPages: "Related pages",
    toc: "In this guide",
    all: "Guides",
    lastUpdated: "Last updated",
    by: "By",
    draftBanner: "Draft: not published, not indexed, linked from nowhere. Questions still open:",
    needsAnswer: "Needs the team's answer to question",
  },
  fa: {
    metaTitle: "راهنمای طراحی سایت و اتوماسیون هوش مصنوعی",
    metaDescription: "راهنماهای کاربردی درباره‌ی هزینه و زمان ساخت سایت و ایجنت هوش مصنوعی و شیوه‌ی انتخاب، نوشته‌ی تیم بلونا.",
    eyebrow: "راهنما",
    h1: "راهنماهایی برای **تصمیم درست**",
    sub: "جواب روشن به سؤال‌هایی که پیش از شروع پروژه بیش از همه می‌شنویم.",
    intro:
      "این راهنماها جواب سؤال‌هایی است که پیش از شروع پروژه بیش از همه می‌شنویم: هزینه‌ی طراحی سایت، انتقال از وردپرس، سایت دوزبانه، سئوی Next.js، دیده شدن در جست‌وجوی هوش مصنوعی و خودکار کردن پیگیری مشتری. هر راهنما نویسنده و تاریخ آخرین به‌روزرسانی‌اش را نشان می‌دهد و بر پایه‌ی پروژه‌های واقعی بلونا نوشته شده است.",
    groups: { web: "طراحی سایت", growth: "سئو و دیده شدن", ai: "اتوماسیون هوش مصنوعی" },
    read: "خواندن راهنما",
    deeper: "بیشتر بدانید",
    relatedWork: "نمونه‌کارهای مرتبط",
    relatedPages: "صفحه‌های مرتبط",
    toc: "در این راهنما",
    all: "راهنماها",
    lastUpdated: "آخرین به‌روزرسانی",
    by: "نویسنده",
    draftBanner: "پیش‌نویس: منتشر نشده، در گوگل نمایه نمی‌شود و از هیچ جا به آن لینک داده نشده. پرسش‌های باز:",
    needsAnswer: "در انتظار پاسخ تیم به این پرسش",
  },
} as const;
