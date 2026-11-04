import { facts, fmt } from "./facts";

/**
 * The blog (/blog). Posts come from the content plan (bellona_content_plan.xlsx); each one is written only from
 * what the site already states about Bellona's work, so no figure, client or result appears that is not in the
 * project data. A post is listed and routed once its status is "published".
 */
export type Block =
  | { kind: "p"; text: string }
  | { kind: "list"; items: string[] }
  | { kind: "steps"; items: string[] }
  | { kind: "table"; caption: string; head: string[]; rows: string[][] }
  | { kind: "callout"; title: string; text: string };

export type Section = { id: string; h2: string; blocks: Block[] };

export type PostCopy = {
  /** Page title (before the brand suffix) and social-image title. */
  metaTitle: string;
  metaDescription: string;
  /** H1, with **accent** markup. */
  h1: string;
  /** The short, quotable answer shown straight under the title. */
  answer: string;
  /** Intro paragraph before the table of contents. */
  intro: string;
  sections: Section[];
  faq: { q: string; a: string }[];
  /** Closing line before the contact form. */
  closing: string;
};

export type Post = {
  slug: string;
  status: "published" | "draft";
  /** ISO date of publication and last update. */
  published: string;
  updated: string;
  author: string;
  category: "ai" | "web" | "growth";
  /** Minutes to read. */
  minutes: number;
  /** Primary keyword from the content plan. */
  keyword: string;
  /** Service and project pages this post links to. */
  links: { href: string; en: string; fa: string }[];
  en: PostCopy;
  fa: PostCopy;
};

const re = facts.projects.realEstate;
const NIKNAM = "Iman Niknam|ایمان نیک‌نام";

export const posts: Post[] = [
  {
    slug: "what-is-business-automation",
    status: "published",
    published: "2026-11-02",
    updated: "2026-11-02",
    author: NIKNAM,
    category: "ai",
    minutes: 8,
    keyword: "اتوماسیون کسب و کار",
    links: [
      { href: "/services/ai-automation", en: "AI automation service", fa: "خدمت اتوماسیون هوش مصنوعی" },
      { href: "/services/ai-automation/n8n", en: "Automation with n8n", fa: "اتوماسیون با n8n" },
      { href: "/work/ai-real-estate-os", en: "Case study: AI real estate operating system", fa: "نمونه‌کار: سیستم هوشمند فروش املاک" },
      { href: "/guides/lead-follow-up-automation-n8n", en: "Guide: automate lead follow-up with n8n", fa: "راهنما: خودکارسازی پیگیری لید با n8n" },
    ],
    fa: {
      metaTitle: "اتوماسیون کسب‌وکار چیست؟ تفاوت با اداری و صنعتی",
      metaDescription:
        "اتوماسیون کسب‌وکار یعنی سپردن کارهای تکراری فروش، پشتیبانی و عملیات به نرم‌افزار. فرقش با اتوماسیون اداری و صنعتی، مثال و نقطه‌ی شروع.",
      h1: "اتوماسیون **کسب‌وکار** چیست؟ تفاوت آن با اتوماسیون اداری و صنعتی",
      answer:
        "اتوماسیون کسب‌وکار یعنی سپردن کارهای تکراری و قاعده‌مند فروش، پشتیبانی و عملیات به نرم‌افزار: پیام یا فرمی می‌رسد، سیستم آن را بررسی می‌کند، داده را در جای درست ثبت می‌کند و قدم بعدی را برمی‌دارد. هدف حذف تأخیر و فراموشی است، نه حذف آدم‌ها.",
      intro:
        "اگر «اتوماسیون چیست» را جست‌وجو کنید، بیشتر نتیجه‌ها درباره‌ی کنترل ماشین‌ها در کارخانه یا مکاتبات اداری است. این مطلب درباره‌ی معنای سوم است، همان که صاحب کسب‌وکار هر روز با آن سروکار دارد: مسیری که مشتری از اولین پیام تا پیگیری و خرید طی می‌کند و آدم‌ها وسط آن وقت می‌گذارند تا داده را از یک ابزار به ابزار دیگر ببرند.",
      sections: [
        {
          id: "three-meanings",
          h2: "سه معنای «اتوماسیون»؛ مرزشان کجاست؟",
          blocks: [
            { kind: "p", text: "یک واژه برای سه دنیای متفاوت به کار می‌رود. اگر مرزشان را نشناسید، یا مطلب اشتباهی می‌خوانید یا از پیمانکار اشتباهی پیشنهاد می‌گیرید." },
            {
              kind: "table",
              caption: "مقایسه‌ی سه معنای رایج اتوماسیون",
              head: ["نوع", "چه چیزی را خودکار می‌کند", "ابزار معمول", "مخاطب"],
              rows: [
                ["اتوماسیون صنعتی", "حرکت ماشین، خط تولید و حسگرها", "PLC و سیستم‌های کنترل", "کارخانه و مهندس صنعت"],
                ["اتوماسیون اداری", "نامه‌نگاری، بایگانی و گردش مدارک در سازمان", "نرم‌افزار اتوماسیون اداری و کارتابل", "سازمان و ادارات"],
                ["اتوماسیون کسب‌وکار", "مسیر مشتری و عملیات: سرنخ فروش، پیگیری، پاسخ، گزارش", "ابزارهای گردش‌کار مثل n8n، CRM و دستیار هوش مصنوعی", "صاحب کسب‌وکار و تیم فروش"],
              ],
            },
            { kind: "p", text: "این سه رقیب هم نیستند؛ هر کدام درباره‌ی مسئله‌ای جداگانه است. کارخانه‌ای که خط تولیدش خودکار است ممکن است هنوز پیگیری فروشش را دستی انجام دهد، و همین بخش دوم موضوع این مطلب است." },
          ],
        },
        {
          id: "how-it-works",
          h2: "اتوماسیون کسب‌وکار دقیقاً چطور کار می‌کند؟",
          blocks: [
            { kind: "p", text: "هر اتوماسیون از سه جزء ساخته می‌شود و پیچیده‌ترین سیستم‌ها هم ترکیبی از همین سه‌اند." },
            {
              kind: "steps",
              items: [
                "رویداد شروع: اتفاقی می‌افتد؛ فرم سایت پر می‌شود، ایمیلی می‌رسد، پیامی به دایرکت می‌آید یا ساعت هشت صبح می‌شود.",
                "شرط و تصمیم: سیستم می‌بیند چه اتفاقی افتاده؛ این مشتری از کدام کانال آمده و چه می‌خواهد، پیامش فوری است یا عادی.",
                "اقدام: داده در CRM ثبت می‌شود، پاسخی فرستاده می‌شود، کاری برای یک نفر تعریف می‌شود یا گزارشی آماده می‌شود.",
              ],
            },
            { kind: "p", text: "وقتی بخشی از تصمیم به فهمیدن متن نیاز دارد، مثلاً اینکه پیام مشتری درباره‌ی قیمت است یا شکایت، یک دستیار هوش مصنوعی جای آن شرط را می‌گیرد. بقیه‌ی مسیر همچنان قاعده‌مند و قابل ردگیری می‌ماند." },
          ],
        },
        {
          id: "examples",
          h2: "چهار کاری که معمولاً اول خودکار می‌شوند",
          blocks: [
            {
              kind: "list",
              items: [
                "ثبت و تقسیم سرنخ‌ها: هر فرم یا پیامی که می‌رسد، خودکار در CRM ثبت می‌شود و به دست مسئولش می‌رسد، بی‌آنکه کسی دستی کپی کند.",
                "پیگیری به‌موقع: اگر مشتری‌ای چند روز بی‌جواب بماند، سیستم پیش از آنکه سرد شود یادآوری یا پیام پیگیری می‌فرستد.",
                "جواب اول به پیام‌ها: پرسش‌های تکراری فوراً جواب می‌گیرند و موارد پیچیده به آدم سپرده می‌شوند.",
                "گزارش روزانه: به‌جای جمع کردن عددها از چند ابزار، خلاصه‌ی روز هر صبح آماده است.",
              ],
            },
          ],
        },
        {
          id: "real-example",
          h2: "یک نمونه‌ی واقعی از کار خودمان",
          blocks: [
            {
              kind: "p",
              text: `برای کسب‌وکار املاک kharazie.at یک سیستم کامل فروش ساختیم: پیدا کردن و امتیازدهی به سرمایه‌گذارها، ارتباط و پاسخ‌گویی، تحلیل پروژه و تهیه‌ی سند. این سیستم از ${fmt.n(re.n8nWorkflows, "fa")} گردش‌کار n8n و یک CRM با ${fmt.n(re.crmTables, "fa")} جدول در Baserow ساخته شده، خطاها را یک‌جا مدیریت می‌کند، هر روز گزارش می‌دهد و مستندات پشتیبان‌گیری و امنیت هم همراهش تحویل شده است.`,
            },
            { kind: "p", text: "نکته‌ی این نمونه تعداد گردش‌کارها نیست؛ این است که زنجیره‌ی کار از اول تا آخر تعریف شده بود. اتوماسیون وقتی جواب می‌دهد که کل مسیر را ببینید، نه فقط یک مرحله‌اش را." },
          ],
        },
        {
          id: "what-to-automate",
          h2: "چه کاری را خودکار کنیم و چه کاری را نه؟",
          blocks: [
            { kind: "p", text: "اتوماسیون به کار کاری می‌آید که این چهار نشانه را با هم داشته باشد:" },
            {
              kind: "list",
              items: [
                "تکراری است و هفته‌ای چند بار انجام می‌شود.",
                "قاعده دارد و می‌شود برایش نوشت «اگر این شد، آن کار را بکن».",
                "فراموش شدنش هزینه دارد، مثل پیگیری مشتری یا جواب دادن به او.",
                "داده‌اش دستی از یک ابزار به ابزار دیگر منتقل می‌شود.",
              ],
            },
            { kind: "p", text: "کاری را که هنوز خودتان هم دقیق نمی‌دانید چطور انجام می‌شود، یا گفت‌وگوی حساس با مشتری مهم را، اول مستند کنید و دستی نگه دارید. خودکار کردن فرایندی نامنظم فقط بی‌نظمی را سریع‌تر می‌کند." },
          ],
        },
        {
          id: "where-to-start",
          h2: "از کجا شروع کنیم؟",
          blocks: [
            {
              kind: "steps",
              items: [
                "یک هفته یادداشت کنید کدام کارهای تکراری وقت تیم را می‌گیرد.",
                "از میان آن‌ها کاری را انتخاب کنید که فراموش شدنش بیشترین ضرر را دارد؛ معمولاً پیگیری مشتری‌ها.",
                "مسیرش را روی کاغذ بنویسید: رویداد، شرط، اقدام.",
                "اول یک مسیر کوچک را راه بیندازید و چند هفته بعد سراغ مسیر بعدی بروید.",
              ],
            },
            { kind: "callout", title: "می‌خواهید مسیر خودتان را بسنجیم؟", text: "در بررسی رایگان، فرایند فروش و پیگیری‌تان را با هم مرور می‌کنیم و می‌گوییم کدام بخش خودکارشدنی است و کدام نه." },
          ],
        },
      ],
      faq: [
        { q: "اتوماسیون کسب‌وکار جای نیروی انسانی را می‌گیرد؟", a: "هدفش برداشتن کار تکراری از دوش آدم‌هاست، نه حذف آن‌ها. نیروها از کپی کردن داده و یادآوری آزاد می‌شوند تا برای گفت‌وگو با مشتری و تصمیم‌های مهم وقت بگذارند." },
        { q: "کسب‌وکار کوچک هم به اتوماسیون نیاز دارد؟", a: "اگر هفته‌ای چند سرنخ فروش یا پیام دارد و پیگیری‌شان گاهی جا می‌ماند، بله. با یک مسیر کوچک مثل ثبت و پیگیری مشتری‌ها شروع می‌شود و لازم نیست سیستم بزرگی ساخت." },
        { q: "فرق اتوماسیون با دستیار هوش مصنوعی چیست؟", a: "اتوماسیون مسیر ثابتی از رویداد تا اقدام است. دستیار هوش مصنوعی در همان مسیر بخش‌هایی را انجام می‌دهد که به فهمیدن متن نیاز دارند، مثل دسته‌بندی پیام‌ها." },
        { q: "از چه ابزاری استفاده کنیم؟", a: "ابزار را پس از تعریف مسیر انتخاب می‌کنیم. ما برای گردش‌کارها معمولاً n8n را به کار می‌بریم و داده را در یک CRM مثل Baserow نگه می‌داریم." },
      ],
      closing: "اگر در کسب‌وکارتان کاری هست که هر هفته دستی تکرار می‌شود، همان نقطه‌ی خوبی برای شروع است.",
    },
    en: {
      metaTitle: "What is business automation? A plain answer",
      metaDescription:
        "Business automation hands repetitive sales, support and operations work to software. How it differs from office and industrial automation, with examples.",
      h1: "What is **business** automation, and how is it different from office and industrial automation?",
      answer:
        "Business automation hands the repetitive, rule-based parts of sales, support and operations to software: a message or form arrives, the system checks it, records the data in the right place and takes the next step. The goal is to remove delay and forgetting, not people.",
      intro:
        "Search for “what is automation” and most results are about controlling machines on a factory floor or processing paperwork in an office. This post is about the third meaning, the one a business owner meets every day: the path a customer takes from the first message to a follow-up and a sale, with people spending time in the middle moving data from one tool to another.",
      sections: [
        {
          id: "three-meanings",
          h2: "Three meanings of “automation”: where are the lines?",
          blocks: [
            { kind: "p", text: "One word covers three different worlds. Without the lines between them you either read the wrong article or ask the wrong contractor for a quote." },
            {
              kind: "table",
              caption: "The three common meanings of automation compared",
              head: ["Type", "What it automates", "Typical tools", "Who it is for"],
              rows: [
                ["Industrial automation", "Machine movement, production lines and sensors", "PLCs and control systems", "Factories and industrial engineers"],
                ["Office automation", "Letters, filing and the flow of documents inside an organization", "Office automation software and inboxes", "Organizations and offices"],
                ["Business automation", "The customer path and operations: leads, follow-up, replies, reports", "Workflow tools such as n8n, CRMs, AI agents", "Business owners and sales teams"],
              ],
            },
            { kind: "p", text: "They do not compete; they answer three separate problems. A factory with an automated line can still follow up its sales by hand, and that second part is what this post is about." },
          ],
        },
        {
          id: "how-it-works",
          h2: "How does business automation actually work?",
          blocks: [
            { kind: "p", text: "Every automation is built from three pieces, and even the most complex systems are combinations of them." },
            {
              kind: "steps",
              items: [
                "A trigger: something happens, such as a site form is filled in, an email arrives, a direct message comes in or it turns eight in the morning.",
                "A condition: the system checks what happened, such as which channel the lead came from, what it needs and whether the message is urgent.",
                "An action: data is saved in the CRM, a reply is sent, a task is created for someone or a report is prepared.",
              ],
            },
            { kind: "p", text: "When part of the decision needs an understanding of text, for example telling a price question from a complaint, an AI agent takes the place of that condition. The rest of the path stays rule-based and easy to trace." },
          ],
        },
        {
          id: "examples",
          h2: "Four jobs that usually get automated first",
          blocks: [
            {
              kind: "list",
              items: [
                "Capturing and routing leads: every form or message goes into the CRM and reaches the right person, with no copying by hand.",
                "Timely follow-up: if a lead stays unanswered for days, the system sends a reminder or a follow-up message before it goes cold.",
                "First replies: repeated questions get an answer at once and complex ones reach a person.",
                "A daily report: instead of collecting numbers from several tools, the day’s summary is built every morning.",
              ],
            },
          ],
        },
        {
          id: "real-example",
          h2: "A real example from our own work",
          blocks: [
            {
              kind: "p",
              text: `For the real estate business kharazie.at we built a complete sales system: finding and scoring investors, outreach and replies, project analysis and document generation. It runs on ${fmt.n(re.n8nWorkflows, "en")} n8n workflows and a CRM with ${fmt.n(re.crmTables, "en")} tables in Baserow, with centralized error handling and a daily digest, plus backup and security documentation for handover.`,
            },
            { kind: "p", text: "The point is not the number of workflows; it is that the whole chain of work was defined from start to finish. Automation pays off when you look at the whole path, not just one step." },
          ],
        },
        {
          id: "what-to-automate",
          h2: "What should you automate, and what should you not?",
          blocks: [
            { kind: "p", text: "A job suits automation when it has all four of these signs:" },
            {
              kind: "list",
              items: [
                "It is repetitive and happens several times a week.",
                "It is rule-based, so you can write down “if this, then that”.",
                "Forgetting it costs something, like following up a lead or answering a customer.",
                "Its data is moved by hand from one tool to another.",
              ],
            },
            { kind: "p", text: "If you do not yet know exactly how a job is done, or it is a sensitive conversation with an important customer, document it first and keep it manual. Automating a messy process only makes the mess faster." },
          ],
        },
        {
          id: "where-to-start",
          h2: "Where do you start?",
          blocks: [
            {
              kind: "steps",
              items: [
                "For one week, write down which repetitive jobs take your team’s time.",
                "Pick the one where forgetting hurts most; it is usually lead follow-up.",
                "Write its path on paper: trigger, condition, action.",
                "Run one small path first and move to the next after a few weeks.",
              ],
            },
            { kind: "callout", title: "Want us to look at your path?", text: "In the free audit we go through your sales and follow-up process together and tell you which parts can be automated and which should not be." },
          ],
        },
      ],
      faq: [
        { q: "Does business automation replace people?", a: "It aims to take repetitive work off people, not to remove them. Staff are freed from copying data and sending reminders to spend time on conversations with customers and on important decisions." },
        { q: "Does a small business need automation?", a: "If it gets a few leads or messages a week and follow-up sometimes slips, yes. It starts with one small path such as capturing and following up leads; no large system is needed." },
        { q: "What is the difference between automation and an AI agent?", a: "Automation is a fixed path from trigger to action. An AI agent can handle the steps on that path that need an understanding of text, such as sorting a message." },
        { q: "Which tool should you use?", a: "The tool comes after the path is defined. For workflows we usually use n8n and keep the data in a CRM such as Baserow." },
      ],
      closing: "If a job in your business is repeated by hand every week, that is a good place to start.",
    },
  },
];

export const blogHub = {
  en: {
    metaTitle: "Blog: automation, websites and growth",
    metaDescription: "Plain-language articles on business automation, AI agents, websites and growth, written by the Bellona team from real projects.",
    eyebrow: "Blog",
    h1: "Notes on **automation**, websites and growth",
    sub: "Plain answers from the work we do every day, written for people who run a business.",
    categories: { ai: "AI and automation", web: "Websites", growth: "Growth" },
    read: "Read the article",
    by: "By",
    published: "Published",
    updated: "Last updated",
    minutes: "min read",
    toc: "In this article",
    faq: "Frequently asked questions",
    related: "Keep reading",
    all: "All articles",
  },
  fa: {
    metaTitle: "وبلاگ اتوماسیون، طراحی سایت و رشد",
    metaDescription: "مطلب‌های ساده درباره‌ی اتوماسیون کسب‌وکار، دستیار هوش مصنوعی، طراحی سایت و رشد، نوشته‌ی تیم بلونا بر پایه‌ی پروژه‌های واقعی.",
    eyebrow: "وبلاگ",
    h1: "یادداشت‌هایی درباره‌ی **اتوماسیون**، سایت و رشد",
    sub: "جواب‌های روشن از دل کارهای هر روزمان، برای کسی که کسب‌وکاری را می‌گرداند.",
    categories: { ai: "هوش مصنوعی و اتوماسیون", web: "طراحی سایت", growth: "رشد" },
    read: "خواندن مطلب",
    by: "نویسنده",
    published: "انتشار",
    updated: "آخرین به‌روزرسانی",
    minutes: "دقیقه مطالعه",
    toc: "در این مطلب",
    faq: "پرسش‌های متداول",
    related: "ادامه‌ی مطالعه",
    all: "همه‌ی مطلب‌ها",
  },
} as const;

export const publishedPosts = () => posts.filter((p) => p.status === "published");
export const postPath = (p: Post) => `/blog/${p.slug}`;
