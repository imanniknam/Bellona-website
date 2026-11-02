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
const dane = facts.projects.dane;
const sprintFa = fmt.weeks(facts.timelines.automationSprintWeeks, "fa");
const sprintEn = fmt.weeks(facts.timelines.automationSprintWeeks, "en");
const en = (v: number) => fmt.n(v, "en");
const fa = (v: number) => fmt.n(v, "fa");

const askFa = (href: string, label: string): Answer["details"] => [{ kind: "links", items: [{ label, href }, { label: "رزرو بررسی رایگان", href: "/contact" }] }];
const askEn = (href: string, label: string): Answer["details"] => [{ kind: "links", items: [{ label, href }, { label: "Book the free audit", href: "/contact" }] }];

const raw: More = {
  // ============================================================================================ priority 1
  "dane-news": {
    fa: [
      {
        q: "مهاجرت از وردپرس به پلتفرم اختصاصی چطور انجام شد؟",
        a: `ابتدا همه‌ی محتوا فهرست شد: ${fa(dane.migratedPosts)} مطلب، ${fa(dane.categoriesBefore)} دسته، ${fa(dane.tags)} برچسب و ${fa(dane.authors)} نویسنده. بعد طبقه‌بندی بازطراحی شد، مطالب با برچسب‌ها و نویسنده‌هایشان منتقل شدند و برای هر مطلب ریدایرکت دائمی تعریف شد.`,
        details: [
          {
            kind: "steps",
            items: [
              `فهرست‌برداری: ${fa(dane.migratedPosts)} مطلب، ${fa(dane.tags)} برچسب و ${fa(dane.authors)} نویسنده`,
              `بازطراحی طبقه‌بندی: از ${fa(dane.categoriesBefore)} دسته به ${fa(dane.categoriesAfter)} دسته و ${fa(dane.topics)} موضوع`,
              "انتقال مطالب همراه با برچسب‌ها و نویسنده‌ها",
              `${fa(dane.redirects)} ریدایرکت دائمی (۳۰۱) تا هیچ لینک قدیمی نشکند`,
              "اعتبارسنجی تحریریه برای منبع، لید، کپشن، اعتبار تصویر و ساختار مطالب بلند",
            ],
          },
        ],
      },
      {
        q: "چرا Next.js و Payload CMS؟",
        a: "دانه پلتفرمی اختصاصی برای انتشار علمی می‌خواست که قواعد تحریریه را بفهمد. Payload CMS (یک CMS هدلس) مدیریت مطلب‌ها، برچسب‌ها و نویسنده‌ها را به تحریریه می‌دهد و نکست جی اس (Next.js) صفحه‌ها را روی سرور می‌سازد تا سریع و برای گوگل خواندنی باشند. پایگاه داده PostgreSQL و فضای ذخیره‌ی فایل S3 است.",
      },
      {
        q: "نتیجه‌ی قابل اندازه‌گیری این پروژه چیست؟",
        a: `${fa(dane.migratedPosts)} مطلب منتقل شد و هرکدام ریدایرکت دائمی دارد؛ و طبقه‌بندی از ${fa(dane.categoriesBefore)} دسته به ${fa(dane.categoriesAfter)} دسته با ${fa(dane.topics)} موضوع کاهش یافت. عدد دیگری، مثل ترافیک بعد از مهاجرت، بدون سند ذکر نمی‌شود.`,
        // TODO(owner): organic traffic before/after the migration, if the client agrees to publish it.
      },
      {
        q: "پروژه‌ای مثل دانه دارید؟ از کجا شروع کنیم؟",
        a: "اگر سایتتان روی وردپرس است و می‌خواهید بدون افت سئو به پلتفرم اختصاصی بروید، با بررسی رایگان شروع می‌کنیم: وضعیت فعلی، آدرس‌ها و ریسک‌ها را می‌خوانیم و قیمت قطعی و مکتوب می‌دهیم.",
        details: askFa("/services/website-design/redesign", "بازطراحی سایت و انتقال از وردپرس"),
      },
    ],
    en: [
      {
        q: "How was the migration from WordPress to a custom platform done?",
        a: `First all content was inventoried: ${en(dane.migratedPosts)} posts, ${en(dane.categoriesBefore)} categories, ${en(dane.tags)} tags and ${en(dane.authors)} authors. Then the taxonomy was redesigned, posts moved with their tags and authors, and a permanent redirect was defined for each one.`,
        details: [
          {
            kind: "steps",
            items: [
              `Inventory: ${en(dane.migratedPosts)} posts, ${en(dane.tags)} tags and ${en(dane.authors)} authors`,
              `Taxonomy redesign: from ${en(dane.categoriesBefore)} categories to ${en(dane.categoriesAfter)} categories and ${en(dane.topics)} topics`,
              "Moving the posts together with their tags and authors",
              `${en(dane.redirects)} permanent (301) redirects so no old link breaks`,
              "Editorial validation for sources, leads, captions, image credits and long-form structure",
            ],
          },
        ],
      },
      {
        q: "Why Next.js and Payload CMS?",
        a: "Dane wanted a purpose-built science publishing platform that understands editorial rules. Payload CMS, a headless CMS, gives the newsroom control of posts, tags and authors, and Next.js builds pages on the server so they are fast and readable to Google. The database is PostgreSQL and file storage is S3.",
      },
      {
        q: "What is the measurable result of this project?",
        a: `${en(dane.migratedPosts)} posts moved and each one has a permanent redirect; the taxonomy shrank from ${en(dane.categoriesBefore)} categories to ${en(dane.categoriesAfter)} categories with ${en(dane.topics)} topics. No other number, such as traffic after the migration, is stated without a source.`,
        // TODO(owner): organic traffic before/after the migration, if the client agrees to publish it.
      },
      {
        q: "Do you do projects like Dane? Where do we start?",
        a: "If your site is on WordPress and you want to move to a custom platform without losing SEO, we start with the free audit: we read the current state, the URLs and the risks, and give you a fixed quote in writing.",
        details: askEn("/services/website-design/redesign", "Website redesign and WordPress migration"),
      },
    ],
  },

  "ai-real-estate-os": {
    fa: [
      {
        q: "سیستم فروش املاک از چه بخش‌هایی ساخته شده است؟",
        a: `سه بخش اصلی: ${fa(re.n8nWorkflows)} گردش‌کار n8n که عملیات را می‌چرخانند (از مدیریت متمرکز خطا تا گزارش روزانه)، یک CRM با ${fa(re.crmTables)} جدول در Baserow برای پروژه‌ها، مخاطبان، کمپین‌ها، تعامل‌ها، وظایف و اسناد، و تولید محتوا با Claude همراه با ارسال و دریافت ایمیل با SMTP و IMAP.`,
      },
      {
        q: "یک مشتری بالقوه چه مسیری را طی می‌کند؟",
        a: "گردش‌کارها سرمایه‌گذار را پیدا می‌کنند، ارزیابی و امتیازدهی می‌کنند، برایش پیام می‌نویسند و ارسال می‌کنند، پاسخ‌ها را مدیریت می‌کنند، پروژه را تحلیل می‌کنند و سند آماده می‌کنند. همه‌ی تعامل‌ها در CRM ثبت می‌شوند و گزارش روزانه به دست تیم می‌رسد.",
        details: [
          {
            kind: "steps",
            items: ["پیدا کردن و امتیازدهی سرمایه‌گذار", "نوشتن و ارسال پیام با کمک Claude و ایمیل", "مدیریت پاسخ‌ها", "تحلیل پروژه و ساخت سند در Google Drive", "ثبت همه‌چیز در CRM و گزارش روزانه"],
          },
        ],
      },
      {
        q: "فناوری‌ها چه نقشی دارند؟",
        a: "n8n ابزار ساخت گردش‌کار خودکار است و Baserow پایگاه‌داده‌ی جدولی برای CRM. Claude API هوش مصنوعی تولید محتواست، SMTP و IMAP ارسال و دریافت ایمیل را انجام می‌دهند، Google Drive اسناد را نگه می‌دارد و Docker اجرای ایمن سیستم را روی سرور ممکن می‌کند.",
      },
      {
        q: "تحویل پروژه چه چیزهایی داشت؟",
        a: "علاوه بر خود سیستم، مستندات کامل پشتیبان‌گیری و امنیت برای تحویل آماده شد تا کسب‌وکار به ما وابسته نماند و بتواند سیستم را نگه دارد و گسترش دهد.",
        // TODO(owner): a measurable result for this system (e.g. hours saved per week, leads handled) and a client quote.
      },
      {
        q: "می‌خواهم فروشم را خودکار کنم؛ از کجا شروع کنیم؟",
        a: `از بررسی رایگان: فرایند فعلی فروش را می‌خوانیم و می‌گوییم کدام بخش‌ها خودکار می‌شوند. اتوماسیون متمرکز در ${sprintFa} راه می‌افتد و قیمت قطعی و مکتوب می‌گیرید.`,
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

  sabzino: {
    fa: [
      {
        q: "چرا سبزینو «فروشگاه واقعی» می‌خواست و چه ساختیم؟",
        a: "سبزینو، کسب‌وکاری اجتماعی با محصولات سبزی‌محور، ادویه‌های بین‌المللی و نوشیدنی‌های طبیعی، کاتالوگ نمی‌خواست. فروشگاه واقعی ساختیم: سبد خرید واکنش‌گرا، حساب مشتری، تسویه‌حساب، پرداخت آنلاین با زرین‌پال و پنل مدیریت مستقل برای محصول، موجودی، قیمت و سفارش‌ها.",
      },
      {
        q: "پرداخت و پنل مدیریت چطور کار می‌کنند؟",
        a: "مشتری در تسویه‌حساب با درگاه زرین‌پال پرداخت می‌کند و سفارش در پنل مدیریت ثبت می‌شود. پنل مستقل است و تیم سبزینو بدون برنامه‌نویس محصول، موجودی، قیمت و سفارش را مدیریت می‌کند.",
      },
      {
        q: "فناوری‌ها چه نقشی دارند؟",
        a: "React 19 و TypeScript رابط کاربری را می‌سازند، Cloudflare D1 پایگاه‌داده‌ی SQL روی زیرساخت Cloudflare است و Drizzle ORM دسترسی به آن را با نوع‌های مشخص انجام می‌دهد. زرین‌پال درگاه پرداخت ایرانی است و ابزار استقرار امن انتشار نسخه‌ها را کنترل می‌کند.",
      },
      {
        q: "فروشگاه اینترنتی اختصاصی می‌خواهم؛ چه کنم؟",
        a: "بررسی رایگان را رزرو کنید. محصولات و روش فروش شما را می‌خوانیم و قیمت قطعی و مکتوب می‌دهیم.",
        details: askFa("/services/website-design/ecommerce", "طراحی سایت فروشگاهی"),
        // TODO(owner): a measurable result (orders, conversion) and a client quote for this store.
      },
    ],
    en: [
      {
        q: "Why did Sabzino need a real store and what did we build?",
        a: "Sabzino, a social enterprise with vegetable-based products, international spices and natural drinks, did not want a catalog. We built a real store: a responsive cart, customer accounts, checkout, online payment through Zarinpal and an independent admin for products, stock, prices and orders.",
      },
      {
        q: "How do payments and the admin panel work?",
        a: "The customer pays at checkout through the Zarinpal gateway and the order is recorded in the admin panel. The panel is independent, so the Sabzino team manages products, stock, prices and orders without a developer.",
      },
      {
        q: "What do the technologies do?",
        a: "React 19 and TypeScript build the interface, Cloudflare D1 is the SQL database on Cloudflare's infrastructure and Drizzle ORM accesses it with defined types. Zarinpal is the Iranian payment gateway and secure deployment tooling controls how releases ship.",
      },
      {
        q: "I want a custom online store; what do I do?",
        a: "Book the free audit. We read your products and how you sell, and give you a fixed quote in writing.",
        details: askEn("/services/website-design/ecommerce", "E-commerce website design"),
        // TODO(owner): a measurable result (orders, conversion) and a client quote for this store.
      },
    ],
  },

  // ============================================================================================ education
  codechee: {
    fa: [
      {
        q: "کدچی چطور ساخته شد؟",
        a: "کدچی پایتون، داده، هوش مصنوعی و امنیت سایبری را به دانش‌آموزان آموزش می‌دهد و یادگیری باید حس بازی می‌داد. مسیرهای یادگیری گیمیفای‌شده (استارکمپ) با دوره‌های سطح‌بندی‌شده، بخش‌های گیم‌پلی، کوییز و اتاق فرار، برنامه‌هایی برای مدارس و رویدادهایی مثل شریف کاپ و حساب کاربری دانش‌آموز با پیگیری پیشرفت ساختیم.",
      },
      {
        q: "پلتفرم آموزشی گیمیفای‌شده می‌خواهم؛ از کجا شروع کنم؟",
        a: "با بررسی رایگان: نیاز آموزشی و مخاطب را می‌خوانیم و برای ساخت پلتفرم قیمت قطعی و مکتوب می‌دهیم.",
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

  yasin: {
    fa: [
      {
        q: "چطور سایتی ماجراجویانه ساختیم که روی موبایل کند نشود؟",
        a: "یاسین می‌خواست یادگیری مهارت حس ماجراجویی بدهد، نه بروشور. روایت بازی‌گونه را با GSAP و Three.js و Lenis ساختیم که روان می‌ماند، تصاویر و رسانه‌ی جدا برای دسکتاپ و موبایل بهینه شد و افکت‌ها با توان دستگاه هماهنگ‌اند.",
      },
      {
        q: "برای اینترنت ایران چه کردید؟",
        a: "فونت‌ها self-host شدند تا به سرویس خارجی وابسته نباشند و رسانه برای هر دستگاه جدا بهینه شد. این کار هم سرعت را بالا می‌برد و هم سایت را در شرایط ضعیف اینترنت پایدار نگه می‌دارد.",
      },
      {
        q: "فناوری‌ها چه نقشی دارند؟",
        a: "نکست جی اس 15 صفحه‌ها را سمت سرور می‌سازد، GSAP کتابخانه‌ی انیمیشن، Three.js ابزار گرافیک سه‌بعدی در مرورگر، Lenis اسکرول نرم و TypeScript نوع‌ها را کنترل می‌کند.",
      },
      {
        q: "سایت آموزشی با تجربه‌ی تعاملی می‌خواهم؛ چه کنم؟",
        a: "بررسی رایگان را رزرو کنید؛ نیاز و مخاطب را می‌خوانیم و قیمت قطعی و مکتوب می‌دهیم.",
        details: askFa("/industries/education", "طراحی سایت آموزشی"),
        // TODO(owner): a measurable result (registrations) and a client quote.
      },
    ],
    en: [
      {
        q: "How did we build an adventurous site that does not slow down on phones?",
        a: "Yasin wanted learning a skill to feel like an adventure, not a brochure. We built the game-like narrative with GSAP, Three.js and Lenis so it stays responsive, optimized desktop and mobile media separately and made the effects adapt to device capability.",
      },
      {
        q: "What was done for Iranian internet conditions?",
        a: "Fonts are self-hosted so the site does not depend on an external service, and media is optimized separately per device. This both speeds the site up and keeps it dependable on weak connections.",
      },
      {
        q: "What do the technologies do?",
        a: "Next.js 15 builds pages on the server, GSAP is the animation library, Three.js handles 3D graphics in the browser, Lenis provides smooth scrolling and TypeScript checks types.",
      },
      {
        q: "I want an education site with an interactive experience; what do I do?",
        a: "Book the free audit; we read your needs and audience and give you a fixed quote in writing.",
        details: askEn("/industries/education", "Education websites"),
        // TODO(owner): a measurable result (registrations) and a client quote.
      },
    ],
  },

  konjed: {
    fa: [
      {
        q: "کنجد چطور ساخته شد؟",
        a: "کنجد مهارت‌های زندگی مثل مدیریت پول، حل مسئله و کارآفرینی را آموزش می‌دهد و محصول باید اول حس بازی می‌داد و بعد حس کلاس. تجربه‌ی ورود سینمایی در یک دنیای بازی تصویرسازی‌شده، آرکید بازی با مینی‌گیم‌های مهارتی، مأموریت، امتیاز و دستاورد، مدرسه‌ی مهارت و ویترین پروژه‌های مهارت‌آموزها را ساختیم.",
      },
      {
        q: "آرکید و مأموریت‌ها برای چیست؟",
        a: "هر مینی‌گیم یک مهارت را تمرین می‌دهد (مثلاً مدیریت پول یا حل مسئله) و مأموریت‌ها و امتیازها پیشرفت را پاداش می‌دهند تا یادگیری با انگیزه ادامه پیدا کند.",
      },
      {
        q: "پلتفرم آموزشی بازی‌گونه برای نوجوان‌ها می‌خواهم؛ شروع کار چیست؟",
        a: "بررسی رایگان را رزرو کنید؛ مخاطب و مهارت‌های هدف را می‌خوانیم و قیمت قطعی و مکتوب می‌دهیم.",
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

  microshamim: {
    fa: [
      {
        q: "میکروشمیم چه سایتی نیاز داشت؟",
        a: "میکروشمیم یادگیری، کار اشتراکی و تولید محتوا را زیر یک سقف آورده است و سایت باید همه‌ی فضاها را روشن توضیح می‌داد و در عین حال جسور و جوان می‌ماند. طراحی هنری بازیگوش با حال‌وهوای کلاژ، صفحه‌هایی برای مدرسه‌ی مهارت، فضای کار اشتراکی، استودیو محتوا و رویدادها، دعوت به درخواست استفاده از فضا در سراسر سایت و بخش مجله ساختیم.",
      },
      {
        q: "بازدیدکننده‌ها چطور فضا را قبل از آمدن می‌بینند؟",
        a: "سایت ماکت پلان فضای میکروشمیم را نشان می‌دهد تا بازدیدکننده قبل از مراجعه ببیند اتاق‌ها و بخش‌ها کجا هستند، و همان‌جا می‌تواند درخواست بازدید حضوری بدهد.",
      },
      {
        q: "سایت برای مرکز نوآوری یا فضای کار اشتراکی می‌خواهم؛ چه کنم؟",
        a: "بررسی رایگان را رزرو کنید؛ فضاها و مخاطبان را می‌خوانیم و قیمت قطعی و مکتوب می‌دهیم.",
        details: askFa("/services/website-design/corporate", "طراحی سایت شرکتی و سازمانی"),
        // TODO(owner): a measurable result and a client quote.
      },
    ],
    en: [
      {
        q: "What site did Microshamim need?",
        a: "Microshamim brings learning, co-working and content production under one roof, and the site had to explain every space clearly and still feel bold and youthful. We built a playful collage-style art direction, pages for the skill school, co-working space, content studio and events, a request-to-use-the-space call to action throughout and a magazine section.",
      },
      {
        q: "How do visitors see the space before coming?",
        a: "The site shows a floor-plan model of the Microshamim space so a visitor can see where rooms and areas are before visiting, and request an in-person visit right there.",
      },
      {
        q: "I want a site for an innovation hub or coworking space; what do I do?",
        a: "Book the free audit; we read your spaces and audience and give you a fixed quote in writing.",
        details: askEn("/services/website-design/corporate", "Corporate website design"),
        // TODO(owner): a measurable result and a client quote.
      },
    ],
  },

  "asa-study": {
    fa: [
      {
        q: "ASA-Study چطور ساخته شد؟",
        a: "دانشجوی بین‌المللی برای انتخاب دانشگاه در ایران باید شهرها، دانشگاه‌ها و رشته‌ها را به زبان خودش مقایسه کند. مسیریابی فارسی و انگلیسی با رفتار کامل راست‌به‌چپ، فهرست قابل جست‌وجوی دانشگاه‌ها با فیلتر شهر، پروفایل داده‌محور برای هر دانشگاه و ساختار آماده‌ی CMS ساختیم که هر دانشگاه یک سند مستقل و دوزبانه است.",
      },
      {
        q: "فناوری‌ها چه نقشی دارند؟",
        a: "نکست جی اس 15 صفحه‌ها را سمت سرور می‌سازد و next-intl مسیریابی و ترجمه‌ی دو زبان را مدیریت می‌کند. Radix UI اجزای دسترس‌پذیر رابط را می‌دهد، Framer Motion انیمیشن‌ها را و TypeScript نوع‌ها را کنترل می‌کند.",
      },
      {
        q: "سایت دوزبانه می‌خواهم؛ چه کنم؟",
        a: "بررسی رایگان را رزرو کنید؛ مخاطبان هر دو زبان و محتوای موجود را می‌خوانیم و قیمت قطعی و مکتوب می‌دهیم.",
        details: askFa("/services/website-design/bilingual", "طراحی سایت دوزبانه"),
        // TODO(owner): a measurable result and a client quote.
      },
    ],
    en: [
      {
        q: "How was ASA-Study built?",
        a: "An international student choosing a university in Iran must compare cities, universities and programs in their own language. We built English/Persian routing with complete RTL behavior, a searchable university directory with a city filter, data-driven university profiles and a CMS-ready structure where each university is its own localized document.",
      },
      {
        q: "What do the technologies do?",
        a: "Next.js 15 builds pages on the server and next-intl manages routing and translation for the two languages. Radix UI provides accessible interface components, Framer Motion the animations and TypeScript checks types.",
      },
      {
        q: "I want a bilingual site; what do I do?",
        a: "Book the free audit; we read both audiences and your existing content and give you a fixed quote in writing.",
        details: askEn("/services/website-design/bilingual", "Bilingual website design"),
        // TODO(owner): a measurable result and a client quote.
      },
    ],
  },

  // ============================================================================================ stores and brands
  "nira-perfume": {
    fa: [
      {
        q: "فروشگاه عطر نیرا چطور ساخته شد؟",
        a: "نیرا عطر اورجینال می‌فروشد و برای برندها عطر اختصاصی می‌سازد و سایت باید هر دو را با حس آرام و پریمیوم یک خانه‌ی عطر، به فارسی، نشان می‌داد. ویترین برندمحور با مجموعه‌ی نیرا، بخش ساخت عطر سازمانی، صفحه‌های گالری و آرشیو و جست‌وجوی محصول و سبد خرید ساختیم.",
      },
      {
        q: "فروشگاه برای یک برند لوکس می‌خواهم؛ چه کنم؟",
        a: "بررسی رایگان را رزرو کنید؛ محصولات و برند را می‌خوانیم و قیمت قطعی و مکتوب می‌دهیم.",
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
        a: "اثر دست‌ساز باید دیده شود. فروشگاه باید روی موبایل حس لوکس می‌داد، در جست‌وجو پیدا می‌شد و برای پنل مدیریت آینده آماده بود. فروشگاه موبایل‌محور و سئومحور با دسته‌بندی روشن محصولات، سبد خرید پایدار با مرزبندی روشن احراز هویت، فرم‌های اعتبارسنجی‌شده در مسیر خرید و لایه‌ی داده‌ی آماده‌ی تولید ساختیم.",
      },
      {
        q: "فناوری‌ها چه نقشی دارند؟",
        a: "نکست جی اس 15 صفحه‌ها را سمت سرور می‌سازد، Prisma ORM و PostgreSQL داده را مدیریت می‌کنند، Zustand حالت سبد خرید را نگه می‌دارد و Zod ورودی فرم‌ها را اعتبارسنجی می‌کند.",
      },
      {
        q: "فروشگاه برای محصول دست‌ساز می‌خواهم؛ چه کنم؟",
        a: "بررسی رایگان را رزرو کنید؛ محصولات را می‌خوانیم و قیمت قطعی و مکتوب می‌دهیم.",
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

  "elm-kala": {
    fa: [
      {
        q: "علم‌کالا چطور ساخته شد؟",
        a: "خریدار تجهیزات آزمایشگاه، رباتیک یا کلاس معمولاً نمی‌داند کدام محصول به کارش می‌آید و فروشگاه باید راهنمایی‌اش می‌کرد، نه اینکه فقط فهرست نشان بدهد. کشف محصول بر پایه‌ی دسته‌بندی و محصولات منتخب، راهنمای کاربرد برای هر دسته و مسیر مشاوره‌محور برای خریدارانی که در انتخاب کمک می‌خواهند ساختیم.",
      },
      {
        q: "فروشگاه هدایت‌شده برای کسب‌وکار من هم مناسب است؟",
        a: "اگر مشتریان شما معمولاً نمی‌دانند کدام محصول مناسب است، بله. در بررسی رایگان صادقانه می‌گوییم کدام مدل برای شما بهتر است، چون هر کسب‌وکاری به فروشگاه هدایت‌شده نیاز ندارد.",
        details: askFa("/services/website-design/ecommerce", "طراحی سایت فروشگاهی"),
        // TODO(owner): a measurable result and a client quote.
      },
    ],
    en: [
      {
        q: "How was Elm-Kala built?",
        a: "People buying lab, robotics or classroom equipment often do not know which product fits, and the store had to guide them, not just list items. We built category-led discovery with featured products, use-case guidance for each category and a consultation-first path for buyers who need help choosing.",
      },
      {
        q: "Is a guided store right for my business too?",
        a: "If your customers usually do not know which product fits, yes. In the free audit we tell you honestly which model suits you better, because not every business needs a guided store.",
        details: askEn("/services/website-design/ecommerce", "E-commerce website design"),
        // TODO(owner): a measurable result and a client quote.
      },
    ],
  },

  // ============================================================================================ platforms and portals
  contemo: {
    fa: [
      {
        q: "کانتمو چطور ساخته شد؟",
        a: "کانتمو خدمات محتوا می‌فروشد و تولیدکننده جذب می‌کند؛ بازدیدکننده باید همان لحظه قیمت را می‌دید و تیم باید بدون برنامه‌نویس متن‌ها را عوض می‌کرد. یک موتور قیمت‌گذاری مشترک برای برآورد هزینه و ثبت پروژه، جذب کارپذیر و منابع تحریریه، محتوای متمرکز برای ویرایش توسط تیم غیرفنی و انیمیشن دسترس‌پذیر با جزئیات دقیق راست‌به‌چپ ساختیم.",
      },
      {
        q: "فناوری‌ها چه نقشی دارند؟",
        a: "نکست جی اس (Next.js) 16 صفحه‌ها را سمت سرور می‌سازد و TypeScript نوع‌ها را کنترل می‌کند. Tailwind CSS استایل را مدیریت می‌کند، Motion انیمیشن‌های دسترس‌پذیر را می‌سازد و Canvas برای جلوه‌های گرافیکی در مرورگر به کار رفته است.",
      },
      {
        q: "پلتفرم خدمات با قیمت‌گذاری زنده می‌خواهم؛ چه کنم؟",
        a: "بررسی رایگان را رزرو کنید؛ مدل قیمت‌گذاری و جریان پروژه را می‌خوانیم و قیمت قطعی و مکتوب می‌دهیم.",
        details: askFa("/services/full-stack-development", "توسعه‌ی فول‌استک و محصول"),
        // TODO(owner): a measurable result and a client quote.
      },
    ],
    en: [
      {
        q: "How was Contemo built?",
        a: "Contemo sells content services and recruits creators; visitors needed a price on the spot and the team needed to change copy without a developer. We built one pricing engine behind both the estimate and project intake, creator recruitment and editorial resources, centralised content for non-technical staff and accessible motion with careful RTL details.",
      },
      {
        q: "What do the technologies do?",
        a: "Next.js 16 builds the pages on the server and TypeScript checks the types. Tailwind CSS manages styling, Motion builds the accessible animation and Canvas is used for graphic effects in the browser.",
      },
      {
        q: "I want a services platform with live pricing; what do I do?",
        a: "Book the free audit; we read your pricing model and project flow and give you a fixed quote in writing.",
        details: askEn("/services/full-stack-development", "Full-stack and product development"),
        // TODO(owner): a measurable result and a client quote.
      },
    ],
  },

  "shamim-house": {
    fa: [
      {
        q: "سایت خانه شمیم چطور ساخته شد؟",
        a: "خانه شمیم اکوسیستمی از کسب‌وکارهای به‌هم‌پیوسته است و سایت باید نشان می‌داد این‌ها چطور کنار هم قرار می‌گیرند و راه ورود شریک‌ها را روشن می‌کرد. لندینگ داستان‌محور با انیمیشن پیشرفته، فرم‌های ساختاریافته‌ی همکاری، سیستم طراحی مقیاس‌پذیر مشترک بین برندهای زیرمجموعه و چیدمان واکنش‌گرا ساختیم.",
      },
      {
        q: "فناوری‌ها چه نقشی دارند؟",
        a: "نکست جی اس 16 و React 19 پایه‌اند؛ Framer Motion و GSAP انیمیشن را می‌سازند و React Hook Form و Zod فرم‌های همکاری را مدیریت و اعتبارسنجی می‌کنند.",
      },
      {
        q: "سایتی برای یک اکوسیستم یا چند برند می‌خواهم؛ چه کنم؟",
        a: "بررسی رایگان را رزرو کنید؛ ساختار برندها و مخاطبان را می‌خوانیم و قیمت قطعی و مکتوب می‌دهیم.",
        details: askFa("/services/website-design/corporate", "طراحی سایت شرکتی و سازمانی"),
        // TODO(owner): a measurable result and a client quote.
      },
    ],
    en: [
      {
        q: "How was the Shamim House site built?",
        a: "Shamim House is an ecosystem of connected ventures, and the site had to show how they fit together and give partners a clear way in. We built a story-led landing experience with advanced motion, structured partnership forms, a scalable design system shared by the venture brands and responsive layouts.",
      },
      {
        q: "What do the technologies do?",
        a: "Next.js 16 and React 19 are the base; Framer Motion and GSAP build the animation, and React Hook Form with Zod manages and validates the partnership forms.",
      },
      {
        q: "I want a site for an ecosystem or several brands; what do I do?",
        a: "Book the free audit; we read the brand structure and audiences and give you a fixed quote in writing.",
        details: askEn("/services/website-design/corporate", "Corporate website design"),
        // TODO(owner): a measurable result and a client quote.
      },
    ],
  },

  "school-builders": {
    fa: [
      {
        q: "پرتال جامعه خیرین مدرسه‌ساز چطور ساخته شد؟",
        a: "یک خیریه‌ی ملی جایی عمومی می‌خواست برای پروژه‌های اخیر، خبرهای همه‌ی استان‌ها و راه‌های روشن مشارکت خیرین. معماری اطلاعات را حول خبر، پروژه و استان ساختیم، مسیرهای روشن مشارکت برای خیرین گذاشتیم و طراحی فارسی واکنش‌گرا انجام دادیم.",
      },
      {
        q: "فناوری‌ها چه نقشی دارند؟",
        a: "نکست جی اس (Next.js) 16 صفحه‌ها را سمت سرور می‌سازد، TypeScript نوع‌ها را کنترل می‌کند و Motion انیمیشن‌های سایت را می‌سازد. معماری اطلاعات پرتال، یعنی خبر و پروژه و استان، روی همین پایه ساخته شده است.",
      },
      {
        q: "پرتال برای یک سازمان غیرانتفاعی می‌خواهم؛ چه کنم؟",
        a: "بررسی رایگان را رزرو کنید؛ نیازها و مخاطبان را می‌خوانیم و قیمت قطعی و مکتوب می‌دهیم.",
        details: askFa("/services/website-design/corporate", "طراحی سایت شرکتی و سازمانی"),
        // TODO(owner): a measurable result, a live address for the portal and a client quote.
      },
    ],
    en: [
      {
        q: "How was the Iran School-Builders Charity portal built?",
        a: "A national charity wanted one public place for its recent projects, news from every province and clear ways for donors to get involved. We built the information architecture around news, projects and provinces, put clear participation paths for donors in place and did responsive Persian design.",
      },
      {
        q: "What do the technologies do?",
        a: "Next.js 16 builds the pages on the server, TypeScript checks the types and Motion builds the site's animation. The portal's information architecture, meaning news, projects and provinces, is built on this base.",
      },
      {
        q: "I want a portal for a non-profit; what do I do?",
        a: "Book the free audit; we read your needs and audiences and give you a fixed quote in writing.",
        details: askEn("/services/website-design/corporate", "Corporate website design"),
        // TODO(owner): a measurable result, a live address for the portal and a client quote.
      },
    ],
  },

  prowem: {
    fa: [
      {
        q: "اپلیکیشن Prowem چطور ساخته شد؟",
        a: "مسابقات، تیم‌ها، بازیکن‌ها و مکان‌ها باید بین iOS، اندروید و پلتفرم رویداد هماهنگ می‌ماندند و نتیجه‌ها همان وقتِ بازی به‌روز می‌شدند. نتیجه‌ی زنده‌ی بازی‌ها، برنامه‌ی مسابقات، جدول رده‌بندی و گلزنان، مدیریت تیم و بازیکن با معماری ماژولار Flutter و همگام‌سازی داده با REST API ساختیم.",
      },
      {
        q: "چرا Flutter؟",
        a: "Flutter و زبان Dart امکان می‌دهند با یک کد، هم iOS و هم اندروید را ساخت. REST API و بک‌اند PHP داده را میان اپ موبایل و پلتفرم رویداد همگام نگه می‌دارند.",
      },
      {
        q: "اپلیکیشن موبایل می‌خواهم؛ چه کنم؟",
        a: "بررسی رایگان را رزرو کنید؛ محصول و مخاطب را می‌خوانیم و قیمت قطعی و مکتوب می‌دهیم.",
        details: askFa("/services/full-stack-development", "توسعه‌ی فول‌استک و محصول"),
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
  fa: (title) => ` تماس ۳۰ دقیقه‌ای است؛ برای پروژه‌ای مثل «${title}» مسئله را بیاورید، نه برنامه را، و فقط برای دامنه‌ی توافق‌شده‌ی مکتوب پرداخت می‌کنید.`,
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
