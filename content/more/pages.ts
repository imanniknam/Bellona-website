import { facts, fmt } from "../facts";
import type { Answer } from "../spokes";
import type { Locale } from "../types";
import { projects } from "../work";

/**
 * Extra questions for the top-level pages (SEO-GUIDELINE D11, D12), keyed by locale-less path.
 * Facts come from the site's own copy (content/{en,fa}.ts), content/work.ts and content/facts.ts.
 * TODO(owner): the founding year and a fuller story for /about (D11), quick chat channels and phone/address for /contact (B9).
 */
type More = Record<string, Record<Locale, Answer[]>>;

const published = projects.filter((p) => p.status === "published");
const byType = (t: string) => published.filter((p) => p.type === t).length;
const sprintFa = fmt.weeks(facts.timelines.automationSprintWeeks, "fa");
const sprintEn = fmt.weeks(facts.timelines.automationSprintWeeks, "en");
const nFa = (v: number) => fmt.n(v, "fa");
const nEn = (v: number) => fmt.n(v, "en");

export const more: More = {
  // ======================================================================================= about (D11)
  "/about": {
    fa: [
      {
        q: "بلونا چطور شروع شد؟",
        a: "بلونا به‌عنوان یک استودیوی هوش مصنوعی و اتوماسیون شروع شد: ایجنت‌ها، گردش‌کارها و یکپارچه‌سازی‌هایی که کارهای تکراری را از دوش تیم برمی‌دارند. ساختن این سیستم‌ها همیشه به یک نقطه می‌رسید: اتوماسیون به سایتی بهتر برای تغذیه، محصولی برای زندگی در آن و برنامه‌ای برای رشد نیاز داشت. پس به شریک دیجیتال کامل تبدیل شدیم.",
      },
      {
        q: "آژانس بلونا چه کسانی هستند؟",
        a: "یک تیم کوچک از مهندس‌های دانشگاه صنعتی شریف، آگاهانه کوچک: مستقیم با کسانی حرف می‌زنید که سیستم‌تان را طراحی، کدنویسی و خودکار می‌کنند، پس تصمیم‌ها در ساعت گرفته می‌شود، نه هفته. هر عضو تخصص مشخصی دارد که در بخش تیم آمده است.",
      },
      {
        q: "شیوه‌ی کار بلونا چیست؟",
        a: "یک تیم، یک برنامه، از اول تا آخر: استراتژی، طراحی، ساخت، خودکارسازی، رشد و پشتیبانی. از هر مرحله‌ای می‌توانید شروع کنید: با استراتژی، با سایتی که باید خودکار شود یا با محصولی که مشتری لازم دارد.",
        details: [{ kind: "steps", items: ["استراتژی: کجا هستید، به کجا می‌روید و اول چه چیزی ساخته شود", "طراحی: رابط‌ها و مسیرهای هماهنگ با برند", "ساخت: سایت، محصول و یکپارچه‌سازی", "خودکارسازی: ایجنت‌ها و گردش‌کارها", "رشد: کمپین، محتوا و سیستم فروش", "پشتیبانی: پایش، نگهداری و بهبود"] }],
      },
      {
        q: "ارزش‌های کاری ما چیست؟",
        a: "قیمت قطعی و مکتوب قبل از شروع، پیشرفت هر هفته با دموی کوتاه، مالکیت کد و حساب‌ها با شما، کار مستقیم با سازنده‌ها بدون واسطه، و ماندن بعد از تحویل. این‌ها تعهدهایی است که در صفحه‌ی پکیج‌ها هم نوشته شده است.",
        details: [{ kind: "links", items: [{ label: "پکیج‌ها و تعهدهای ما", href: "/offers" }] }],
      },
      {
        q: "کارهای شما را کجا ببینم؟",
        a: `${nFa(published.length)} پروژه‌ی منتشرشده داریم: ${nFa(byType("website"))} سایت، ${nFa(byType("product"))} پلتفرم و محصول، ${nFa(byType("automation"))} سیستم اتوماسیون و ${nFa(byType("mobile-app"))} اپلیکیشن موبایل. همه‌ی آن‌ها با شرح چالش و راه‌حل در صفحه‌ی نمونه‌کارها هستند.`,
        details: [{ kind: "links", items: [{ label: "نمونه‌کارهای بلونا", href: "/work" }] }],
      },
    ],
    en: [
      {
        q: "How did Bellona start?",
        a: "Bellona started as an AI and automation studio: agents, workflows and integrations that take repetitive work off a team's plate. Building those systems kept leading to the same place: the automation needed a better website feeding it, a product to live in and a growth plan to point it at. So we became a complete digital partner.",
      },
      {
        q: "Who is Bellona Agency?",
        a: "A small team of engineers from Sharif University of Technology, small on purpose: you talk directly to the people who design, code and automate your system, so decisions take hours, not weeks. Each member's specialism is listed in the team section.",
      },
      {
        q: "How does Bellona work?",
        a: "One team, one plan, end to end: strategy, design, build, automation, growth and support. You can start from any stage: with strategy, with a website that needs automating, or with a product that needs customers.",
        details: [{ kind: "steps", items: ["Strategy: where you are, where you are going and what to build first", "Design: interfaces and flows that match your brand", "Build: the website, product and integrations", "Automation: agents and workflows", "Growth: campaigns, content and a sales system", "Support: monitoring, maintenance and improvement"] }],
      },
      {
        q: "What are our working values?",
        a: "A fixed price in writing before we start, progress every week with a short demo, code and accounts owned by you, direct work with the builders without middlemen, and staying on after delivery. These commitments are also written on the offers page.",
        details: [{ kind: "links", items: [{ label: "Offers and our commitments", href: "/offers" }] }],
      },
      {
        q: "Where can I see your work?",
        a: `We have ${nEn(published.length)} published projects: ${nEn(byType("website"))} websites, ${nEn(byType("product"))} platforms and products, ${nEn(byType("automation"))} automation system and ${nEn(byType("mobile-app"))} mobile app. Each one is in the case studies with its challenge and solution.`,
        details: [{ kind: "links", items: [{ label: "Bellona case studies", href: "/work" }] }],
      },
    ],
  },

  // ======================================================================================= offers (D12)
  "/offers": {
    fa: [
      {
        q: "کدام پکیج برای من مناسب است؟",
        a: "اگر نمی‌دانید مشکل کجاست، با بررسی رایگان رشد شروع کنید. اگر سایت می‌خواهید، لانچ؛ اگر زیر کارهای تکراری مانده‌اید، اسپرینت اتوماسیون؛ و اگر می‌خواهید یک تیم مسئول کل رشد باشد، سیستم رشد بلونا.",
        details: [
          {
            kind: "table",
            caption: "راهنمای انتخاب پکیج",
            head: ["اگر…", "پکیج پیشنهادی"],
            rows: [
              ["نمی‌دانید مشتری کجا از دست می‌رود", "بررسی رایگان رشد"],
              ["سایتی می‌خواهید که مشتری بیاورد", "لانچ: سایت فروش‌محور"],
              ["زیر بار کارهای تکراری و پیگیری‌های عقب‌افتاده‌اید", "اتوماسیون: اسپرینت هوش مصنوعی"],
              ["می‌خواهید یک تیم مسئول کل رشد باشد", "سیستم رشد بلونا"],
            ],
          },
        ],
      },
      {
        q: "«قیمت قطعی» یعنی چه؟",
        a: "یعنی دامنه، قیمت و زمان‌بندی قبل از شروع کار مکتوب می‌شود و فقط برای همان دامنه پرداخت می‌کنید؛ بدون هزینه‌ی پیش‌بینی‌نشده. هر پکیج با بررسی رایگان و برآورد روشن شروع می‌شود.",
      },
      {
        q: "اسپرینت اتوماسیون چقدر طول می‌کشد؟",
        a: `اسپرینت اتوماسیون هوش مصنوعی ${sprintFa} طول می‌کشد. زمان‌بندی سایت و پلتفرم به دامنه بستگی دارد و در پیش‌فاکتور مکتوب می‌آید. بعد از بررسی رایگان، تاریخ دقیق شروع و تحویل هم همان‌جا نوشته می‌شود.`,
        details: [{ kind: "links", items: [{ label: "اتوماسیون کسب‌وکار با هوش مصنوعی", href: "/services/ai-automation" }] }],
      },
      {
        q: "محصول یا پلتفرم می‌سازید، نه فقط سایت؟",
        a: "بله. وب‌اپ، پلتفرم، فروشگاه اینترنتی، MVP و اپلیکیشن موبایل را به‌صورت پروژه‌ای می‌سازیم. کدچی، کنجد و Prowem همین‌طور شروع شدند و قیمت قطعی و زمان‌بندی بعد از بررسی رایگان مکتوب می‌شود.",
        details: [{ kind: "links", items: [{ label: "توسعه‌ی فول‌استک و محصول", href: "/services/full-stack-development" }] }],
      },
      {
        q: "تفاوت پکیج لانچ و سیستم رشد چیست؟",
        a: "لانچ یک سایت اختصاصی و فروش‌محور است که یک‌بار ساخته و تحویل می‌شود. سیستم رشد بلونا همه‌ی موارد لانچ را دارد و روی آن یک اسپرینت اتوماسیون برای پیگیری مشتری‌ها، سئو و محتوا و کمپین ماهانه، گزارش ماهانه‌ی ترافیک و سرنخ و فروش و بهبود مستمر اضافه می‌کند؛ یعنی بعد از انتشار هم یک تیم مسئول نتیجه می‌ماند. اگر فقط سایت لازم دارید، لانچ کافی است.",
      },
      {
        q: "بعد از اسپرینت اتوماسیون چه تحویل می‌گیرم؟",
        a: "یک فرایند کاملاً خودکار و کارکردنی، همراه نقشه‌ی فرایند و برآورد زمانی که صرفه‌جویی می‌شود، ایجنت هوش مصنوعی و گردش‌کار n8n (روی سرور خودتان اگر بخواهید)، CRM راه‌اندازی یا مرتب‌شده، اتصال به ایمیل، چت سایت یا پیام‌رسان، هشدار خطا، مستندات و آموزش تیم شما.",
        details: [{ kind: "links", items: [{ label: "پیاده‌سازی n8n", href: "/services/ai-automation/n8n" }, { label: "اتوماسیون CRM", href: "/services/ai-automation/crm" }] }],
      },
      // TODO(owner): «پرداخت چند مرحله‌ای است؟» needs the real payment terms. Not written (and so not rendered) until they are known.
    ],
    en: [
      {
        q: "Which package is right for me?",
        a: "If you do not know where the problem is, start with the free growth audit. If you want a website, Launch; if you are buried in repetitive work, the automation sprint; and if you want one team responsible for all growth, the Bellona Growth System.",
        details: [
          {
            kind: "table",
            caption: "How to choose a package",
            head: ["If…", "Suggested package"],
            rows: [
              ["You do not know where customers are lost", "Free growth audit"],
              ["You want a website that brings customers", "Launch: a sales website"],
              ["You are buried in repetitive work and late follow-ups", "Automation: an AI sprint"],
              ["You want one team responsible for all growth", "Bellona Growth System"],
            ],
          },
        ],
      },
      {
        q: "What does \"fixed price\" mean?",
        a: "It means scope, price and timeline are written down before work starts and you pay only for that scope, with no unplanned costs. Every package begins with a free audit and a clear estimate.",
      },
      {
        q: "How long does the automation sprint take?",
        a: `The AI automation sprint takes ${sprintEn}. Website and platform timelines depend on scope and are written into the quote. After the free audit, exact start and delivery dates are written there too.`,
        details: [{ kind: "links", items: [{ label: "Business AI automation", href: "/services/ai-automation" }] }],
      },
      {
        q: "Do you build products and platforms, not just websites?",
        a: "Yes. We build web apps, platforms, online stores, MVPs and mobile apps as projects. Codechee, Konjed and Prowem started this way, and the fixed price and timeline are written down after the free audit.",
        details: [{ kind: "links", items: [{ label: "Full-stack and product development", href: "/services/full-stack-development" }] }],
      },
      {
        q: "What is the difference between Launch and the Growth System?",
        a: "Launch is a custom, sales-focused website that is built and handed over once. The Bellona Growth System includes everything in Launch and adds an automation sprint for customer follow-up, monthly SEO, content and campaigns, a monthly report on traffic, leads and sales, and continuous improvement, so a team stays responsible for results after the site is live. If you only need a website, Launch is enough.",
      },
      {
        q: "What do I get after the automation sprint?",
        a: "One fully automated, working process, with a process map and an estimate of the time it saves, an AI agent and n8n workflow (on your own server if you prefer), a CRM that is set up or tidied, a connection to email, website chat or a messenger, error alerts, documentation and training for your team.",
        details: [{ kind: "links", items: [{ label: "n8n implementation", href: "/services/ai-automation/n8n" }, { label: "CRM automation", href: "/services/ai-automation/crm" }] }],
      },
    ],
  },

  // ======================================================================================= services index (D12)
  "/services": {
    fa: [
      {
        q: "بلونا چه خدماتی ارائه می‌دهد؟",
        a: "پنج خدمت که یک سیستم رشد را می‌سازند: طراحی سایت، توسعه‌ی فول‌استک و محصول، ایجنت و اتوماسیون هوش مصنوعی، مارکتینگ و رشد، و توسعه‌ی کسب‌وکار. هر خدمت جداگانه هم ارائه می‌شود، ولی طوری ساخته شده که به بقیه وصل شود.",
        details: [
          {
            kind: "links",
            items: [
              { label: "طراحی سایت", href: "/services/website-design" },
              { label: "توسعه‌ی فول‌استک و محصول", href: "/services/full-stack-development" },
              { label: "ایجنت و اتوماسیون هوش مصنوعی", href: "/services/ai-automation" },
              { label: "مارکتینگ و رشد", href: "/services/marketing-growth" },
              { label: "توسعه‌ی کسب‌وکار", href: "/services/business-development" },
            ],
          },
        ],
      },
      {
        q: "از کدام خدمت شروع کنم؟",
        a: "اگر مطمئن نیستید، از بررسی رایگان رشد شروع کنید تا بدانید اول کجا باید درست شود. اگر سایتتان جواب نمی‌دهد، طراحی سایت؛ اگر مشتری‌ها سرد می‌شوند، اتوماسیون؛ و اگر مشتری کم دارید، مارکتینگ و رشد.",
        details: [{ kind: "links", items: [{ label: "بررسی رایگان رشد", href: "/contact?need=unsure" }] }],
      },
    ],
    en: [
      {
        q: "What services does Bellona offer?",
        a: "Five services that build a growth system: website design, full-stack and product development, AI agents and automation, marketing and growth, and business development. Each is also offered separately, but built to connect to the others.",
        details: [
          {
            kind: "links",
            items: [
              { label: "Website design", href: "/services/website-design" },
              { label: "Full-stack and product development", href: "/services/full-stack-development" },
              { label: "AI agents and automation", href: "/services/ai-automation" },
              { label: "Marketing and growth", href: "/services/marketing-growth" },
              { label: "Business development", href: "/services/business-development" },
            ],
          },
        ],
      },
      {
        q: "Which service should I start with?",
        a: "If you are not sure, start with the free growth audit to learn where to fix things first. If your site is not converting, website design; if customers go cold, automation; and if you have too few customers, marketing and growth.",
        details: [{ kind: "links", items: [{ label: "Free growth audit", href: "/contact?need=unsure" }] }],
      },
    ],
  },

  // ======================================================================================= industries index
  "/industries": {
    fa: [
      {
        q: "برای کدام صنعت‌ها سایت و اتوماسیون ساخته‌اید؟",
        a: "آموزش، فروش آنلاین، املاک و رسانه و انتشار. هر صنعت صفحه‌ی خودش را دارد که مشکل رایج آن حوزه، آنچه می‌سازیم و نمونه‌کارها را توضیح می‌دهد. صنعت شما در فهرست نیست؟ احتمالاً باز هم می‌توانیم کمک کنیم.",
        details: [
          {
            kind: "links",
            items: [
              { label: "آموزش", href: "/industries/education" },
              { label: "فروش آنلاین", href: "/industries/ecommerce" },
              { label: "املاک", href: "/industries/real-estate" },
              { label: "رسانه و انتشار", href: "/industries/media" },
            ],
          },
        ],
      },
    ],
    en: [
      {
        q: "Which industries have you built websites and automation for?",
        a: "Education, online sales, real estate and media and publishing. Each industry has its own page explaining the common problem in that field, what we build and the case studies. Your industry is not on the list? We can probably still help.",
        details: [
          {
            kind: "links",
            items: [
              { label: "Education", href: "/industries/education" },
              { label: "Online sales", href: "/industries/ecommerce" },
              { label: "Real estate", href: "/industries/real-estate" },
              { label: "Media and publishing", href: "/industries/media" },
            ],
          },
        ],
      },
    ],
  },

  // ======================================================================================= portfolio
  "/work": {
    fa: [
      {
        q: "نمونه‌کارهای بلونا چه نوع پروژه‌هایی هستند؟",
        a: `${nFa(published.length)} پروژه‌ی منتشرشده: ${nFa(byType("website"))} سایت، ${nFa(byType("product"))} پلتفرم و محصول، ${nFa(byType("automation"))} سیستم اتوماسیون و ${nFa(byType("mobile-app"))} اپلیکیشن موبایل؛ از فروشگاه و آموزش تا املاک و رسانه. می‌توانید بر اساس خدمت یا صنعت فیلتر کنید.`,
      },
    ],
    en: [
      {
        q: "What kinds of projects are in Bellona's portfolio?",
        a: `${nEn(published.length)} published projects: ${nEn(byType("website"))} websites, ${nEn(byType("product"))} platforms and products, ${nEn(byType("automation"))} automation system and ${nEn(byType("mobile-app"))} mobile app, from online stores and education to real estate and media. You can filter by service or industry.`,
      },
    ],
  },

  // ======================================================================================= contact (D12)
  "/contact": {
    fa: [
      {
        q: "بعد از فرستادن پیام چه می‌شود؟",
        a: "پیام شما به تیم می‌رسد و با شما تماس می‌گیریم. اگر بخواهید، یک تماس رایگان ۳۰ دقیقه‌ای با یک مهندس رزرو کنید تا مشکل را بررسی کنیم و اگر به توافق رسیدیم، قیمت قطعی و مکتوب بگیرید.",
      },
      {
        q: "لازم است برنامه‌ی کامل داشته باشم؟",
        a: "نه. مسئله را بگویید، نه برنامه را. در تماس رایگان ۳۰ دقیقه‌ای پیدا می‌کنیم کجا مشتری از دست می‌دهید و اول چه چیزی باید درست شود؛ لازم نیست چیزی از قبل آماده کرده باشید.",
      },
      {
        q: "به چه زبانی کار می‌کنید؟",
        a: "فارسی و انگلیسی. با مشتری‌های داخل و خارج از ایران کار می‌کنیم و ارتباط از راه دور انجام می‌شود. سایت‌ها را هم فارسی، انگلیسی یا دوزبانه می‌سازیم.",
      },
    ],
    en: [
      {
        q: "What happens after I send a message?",
        a: "Your message reaches the team and we get in touch. If you like, book a free 30-minute call with an engineer so we can look at the problem and, if it fits, give you a fixed quote in writing.",
      },
      {
        q: "Do I need a complete plan?",
        a: "No. Bring the problem, not the plan. In the free 30-minute call we find where you are losing customers and what to fix first; you do not need to prepare anything in advance.",
      },
      {
        q: "What languages do you work in?",
        a: "Persian and English. We work with clients in and outside Iran and communicate remotely. We also build websites in Persian, English or both languages, so the language of the project is your choice.",
      },
    ],
  },
};
