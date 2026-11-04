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
        q: "انتقال از وردپرس به پلتفرم اختصاصی چطور انجام شد؟",
        a: `اول همه‌ی محتوا فهرست شد: ${fa(dane.migratedPosts)} مطلب، ${fa(dane.categoriesBefore)} دسته، ${fa(dane.tags)} برچسب و ${fa(dane.authors)} نویسنده. بعد دسته‌بندی از نو طراحی شد، مطلب‌ها همراه برچسب‌ها و نویسنده‌هایشان منتقل شدند و برای هر مطلب ریدایرکت دائمی تعریف شد.`,
        details: [
          {
            kind: "steps",
            items: [
              `فهرست‌برداری: ${fa(dane.migratedPosts)} مطلب، ${fa(dane.tags)} برچسب و ${fa(dane.authors)} نویسنده`,
              `بازطراحی طبقه‌بندی: از ${fa(dane.categoriesBefore)} دسته به ${fa(dane.categoriesAfter)} دسته و ${fa(dane.topics)} موضوع`,
              "انتقال مطلب‌ها همراه برچسب‌ها و نویسنده‌ها",
              `${fa(dane.redirects)} ریدایرکت دائمی (۳۰۱) تا هیچ لینک قدیمی‌ای نشکند`,
              "بررسی خودکار منبع، لید خبر، زیرنویس و اعتبار تصویر پیش از انتشار، همراه با ساختار مطالب بلند",
            ],
          },
        ],
      },
      {
        q: "چرا Next.js و Payload CMS؟",
        a: "دانه پلتفرمی اختصاصی برای انتشار علمی می‌خواست که قواعد تحریریه را بشناسد. Payload CMS (یک CMS هدلس) مدیریت مطلب‌ها، برچسب‌ها و نویسنده‌ها را به دست تحریریه می‌دهد و نکست جی اس (Next.js) صفحه‌ها را روی سرور می‌سازد تا سریع باشند و گوگل راحت بخواندشان. پایگاه داده PostgreSQL است و فایل‌ها در S3 ذخیره می‌شوند.",
      },
      {
        q: "نتیجه‌ی این پروژه به زبان عدد چیست؟",
        a: `${fa(dane.migratedPosts)} مطلب منتقل شد و هر کدام ریدایرکت دائمی دارد؛ دسته‌بندی هم از ${fa(dane.categoriesBefore)} دسته به ${fa(dane.categoriesAfter)} دسته با ${fa(dane.topics)} موضوع رسید. عدد دیگری، مثل بازدید پس از انتقال، را بی‌سند نمی‌آوریم.`,
        // TODO(owner): organic traffic before/after the migration, if the client agrees to publish it.
      },
      {
        q: "پروژه‌ای مثل دانه دارید؟ از کجا شروع کنیم؟",
        a: "اگر سایتتان روی وردپرس است و می‌خواهید بی‌افت سئو به پلتفرم اختصاصی بروید، با بررسی رایگان شروع می‌کنیم: وضعیت فعلی، آدرس‌ها و خطرها را بررسی می‌کنیم و قیمت قطعی و مکتوب می‌دهیم.",
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

  sabzino: {
    fa: [
      {
        q: "چرا سبزینو «فروشگاه واقعی» می‌خواست و چه ساختیم؟",
        a: "سبزینو، کسب‌وکاری اجتماعی با محصولات بر پایه‌ی سبزی، ادویه‌های بین‌المللی و نوشیدنی‌های طبیعی، کاتالوگ نمی‌خواست. فروشگاه واقعی ساختیم: سبد خرید واکنش‌گرا، حساب کاربری مشتری، تسویه‌حساب، پرداخت آنلاین با زرین‌پال و پنل مدیریت مستقل برای محصولات، موجودی، قیمت و سفارش‌ها.",
      },
      {
        q: "پرداخت و پنل مدیریت چطور کار می‌کنند؟",
        a: "مشتری هنگام تسویه‌حساب از درگاه زرین‌پال پرداخت می‌کند و سفارش در پنل مدیریت ثبت می‌شود. پنل مستقل است و تیم سبزینو بی‌برنامه‌نویس محصولات، موجودی، قیمت و سفارش‌ها را مدیریت می‌کند.",
      },
      {
        q: "هر فناوری چه نقشی دارد؟",
        a: "React 19 و TypeScript رابط کاربری را می‌سازند، Cloudflare D1 پایگاه داده‌ی SQL روی زیرساخت Cloudflare است و Drizzle ORM دسترسی به آن را با نوع‌داده‌های مشخص فراهم می‌کند. زرین‌پال درگاه پرداخت ایرانی است و ابزار انتشار امن، بیرون دادن نسخه‌ها را کنترل می‌کند.",
      },
      {
        q: "فروشگاه اینترنتی اختصاصی می‌خواهم؛ چه کنم؟",
        a: "بررسی رایگان را رزرو کنید. محصولات و شیوه‌ی فروشتان را بررسی می‌کنیم و قیمت قطعی و مکتوب می‌دهیم.",
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

  yasin: {
    fa: [
      {
        q: "چطور سایتی ماجراجویانه ساختیم که روی موبایل کند نباشد؟",
        a: "یاسین می‌خواست یادگیری مهارت حس ماجراجویی بدهد، نه حس بروشور. روایت بازی‌گونه را با GSAP، Three.js و Lenis طوری ساختیم که روان بماند، تصویرها و رسانه‌ها را جداگانه برای دسکتاپ و موبایل بهینه کردیم و جلوه‌ها با توان دستگاه هماهنگ می‌شوند.",
      },
      {
        q: "برای اینترنت ایران چه کردید؟",
        a: "فونت‌ها روی خود سایت میزبانی می‌شوند تا به سرویس خارجی وابسته نباشند و رسانه‌ها برای هر دستگاه جدا بهینه شدند. این کار هم سرعت را بالا می‌برد و هم سایت را با اینترنت ضعیف پایدار نگه می‌دارد.",
      },
      {
        q: "هر فناوری چه نقشی دارد؟",
        a: "نکست جی اس 15 صفحه‌ها را سمت سرور می‌سازد، GSAP کتابخانه‌ی انیمیشن است، Three.js گرافیک سه‌بعدی را در مرورگر می‌سازد، Lenis اسکرول را نرم می‌کند و TypeScript نوع‌داده‌ها را کنترل می‌کند.",
      },
      {
        q: "سایت آموزشی با تجربه‌ی تعاملی می‌خواهم؛ چه کنم؟",
        a: "بررسی رایگان را رزرو کنید؛ نیاز و مخاطبتان را بررسی می‌کنیم و قیمت قطعی و مکتوب می‌دهیم.",
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

  microshamim: {
    fa: [
      {
        q: "میکروشمیم چه سایتی لازم داشت؟",
        a: "میکروشمیم یادگیری، کار اشتراکی و تولید محتوا را زیر یک سقف جمع کرده است و سایت باید همه‌ی فضاها را روشن معرفی کند و در عین حال جسور و جوان بماند. طراحی هنری بازیگوش با حال‌وهوای کلاژ، صفحه‌هایی برای مدرسه‌ی مهارت، فضای کار اشتراکی، استودیوی محتوا و رویدادها، دعوت به درخواست استفاده از فضا در سرتاسر سایت و بخش مجله ساختیم.",
      },
      {
        q: "بازدیدکننده‌ها پیش از آمدن، فضا را چطور می‌بینند؟",
        a: "سایت ماکت پلان میکروشمیم را نشان می‌دهد تا بازدیدکننده پیش از آمدن ببیند اتاق‌ها و بخش‌ها کجا هستند، و همان‌جا درخواست بازدید حضوری بدهد.",
      },
      {
        q: "سایت برای مرکز نوآوری یا فضای کار اشتراکی می‌خواهم؛ چه کنم؟",
        a: "بررسی رایگان را رزرو کنید؛ فضاها و مخاطبانتان را بررسی می‌کنیم و قیمت قطعی و مکتوب می‌دهیم.",
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
        a: "دانشجوی بین‌المللی برای انتخاب دانشگاه در ایران باید شهرها، دانشگاه‌ها و رشته‌ها را به زبان خودش مقایسه کند. ناوبری فارسی و انگلیسی با رفتار کامل راست‌چین، فهرست جست‌وجوپذیر دانشگاه‌ها با فیلتر شهر، صفحه‌ی داده‌محور برای هر دانشگاه و ساختاری آماده‌ی CMS ساختیم که در آن هر دانشگاه یک سند مستقل و دوزبانه است.",
      },
      {
        q: "هر فناوری چه نقشی دارد؟",
        a: "نکست جی اس 15 صفحه‌ها را سمت سرور می‌سازد و next-intl مسیرها و ترجمه‌ی دو زبان را مدیریت می‌کند. Radix UI اجزای دسترس‌پذیر رابط را فراهم می‌کند، Framer Motion انیمیشن‌ها را می‌سازد و TypeScript نوع‌داده‌ها را کنترل می‌کند.",
      },
      {
        q: "سایت دوزبانه می‌خواهم؛ چه کنم؟",
        a: "بررسی رایگان را رزرو کنید؛ مخاطبان هر دو زبان و محتوای فعلی‌تان را بررسی می‌کنیم و قیمت قطعی و مکتوب می‌دهیم.",
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

  "elm-kala": {
    fa: [
      {
        q: "علم‌کالا چطور ساخته شد؟",
        a: "خریدار تجهیزات آزمایشگاه، رباتیک یا کلاس معمولاً نمی‌داند کدام محصول به کارش می‌آید و فروشگاه باید راهنمایی‌اش کند، نه اینکه فقط فهرست نشان دهد. گشتن میان محصولات بر پایه‌ی دسته‌بندی و محصولات برگزیده، راهنمای کاربرد برای هر دسته و مسیر مشاوره برای خریدارهایی که در انتخاب کمک می‌خواهند ساختیم.",
      },
      {
        q: "فروشگاه راهنما به کار کسب‌وکار من هم می‌آید؟",
        a: "اگر مشتری‌هایتان معمولاً نمی‌دانند کدام محصول به کارشان می‌آید، بله. در بررسی رایگان رک می‌گوییم کدام مدل برایتان بهتر است، چون هر کسب‌وکاری به فروشگاهی با راهنمای خرید نیاز ندارد.",
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
        a: "کانتمو خدمات محتوا می‌فروشد و تولیدکننده‌ی محتوا جذب می‌کند؛ قیمت باید بی‌معطلی جلوی چشم بازدیدکننده باشد و ویرایش متن‌ها نباید به برنامه‌نویس گره بخورد. یک سیستم قیمت‌گذاری مشترک برای برآورد هزینه و ثبت پروژه، جذب همکار و منابع تحریریه، محتوای یک‌جا که تیم غیرفنی خودش ویرایشش کند و انیمیشن دسترس‌پذیر با ریزه‌کاری‌های دقیق راست‌چین ساختیم.",
      },
      {
        q: "هر فناوری چه نقشی دارد؟",
        a: "نکست جی اس (Next.js) 16 صفحه‌ها را سمت سرور می‌سازد و TypeScript نوع‌داده‌ها را کنترل می‌کند. Tailwind CSS ظاهر صفحه‌ها را مدیریت می‌کند، Motion انیمیشن‌های دسترس‌پذیر را می‌سازد و Canvas برای جلوه‌های گرافیکی در مرورگر به کار رفته است.",
      },
      {
        q: "پلتفرم خدمات با قیمت‌گذاری زنده می‌خواهم؛ چه کنم؟",
        a: "بررسی رایگان را رزرو کنید؛ مدل قیمت‌گذاری و روند پروژه‌هایتان را بررسی می‌کنیم و قیمت قطعی و مکتوب می‌دهیم.",
        details: askFa("/services/full-stack-development", "نرم‌افزار و محصول"),
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
        a: "خانه شمیم اکوسیستمی از کسب‌وکارهای به‌هم‌پیوسته است و سایت باید نشان دهد این‌ها چطور کنار هم قرار می‌گیرند و راه ورود شریک‌ها را روشن کند. لندینگ داستان‌محور با انیمیشن پیشرفته، فرم‌های منظم همکاری، سیستم طراحی گسترش‌پذیر و مشترک میان برندهای زیرمجموعه و چیدمان واکنش‌گرا ساختیم.",
      },
      {
        q: "هر فناوری چه نقشی دارد؟",
        a: "نکست جی اس 16 و React 19 پایه‌ی کارند؛ Framer Motion و GSAP انیمیشن‌ها را می‌سازند و React Hook Form و Zod فرم‌های همکاری را مدیریت و بررسی می‌کنند.",
      },
      {
        q: "سایتی برای یک اکوسیستم یا چند برند می‌خواهم؛ چه کنم؟",
        a: "بررسی رایگان را رزرو کنید؛ ساختار برندها و مخاطبانتان را بررسی می‌کنیم و قیمت قطعی و مکتوب می‌دهیم.",
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
        a: "یک خیریه‌ی سراسری می‌خواست پروژه‌های تازه، خبر استان‌ها و راه‌های مشارکت را یک‌جا و برای همه نشان دهد. ساختار اطلاعات را بر پایه‌ی خبر، پروژه و استان چیدیم، مسیرهای روشن مشارکت برای خیرین گذاشتیم و سایت را با طراحی واکنش‌گرای فارسی ساختیم.",
      },
      {
        q: "هر فناوری چه نقشی دارد؟",
        a: "نکست جی اس (Next.js) 16 صفحه‌ها را سمت سرور می‌سازد، TypeScript نوع‌داده‌ها را کنترل می‌کند و Motion انیمیشن‌های سایت را می‌سازد. ساختار اطلاعات پرتال، یعنی خبر و پروژه و استان، روی همین پایه بنا شده است.",
      },
      {
        q: "پرتال برای یک سازمان غیرانتفاعی می‌خواهم؛ چه کنم؟",
        a: "بررسی رایگان را رزرو کنید؛ نیازها و مخاطبانتان را بررسی می‌کنیم و قیمت قطعی و مکتوب می‌دهیم.",
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
