import { facts, fmt } from "../facts";
import type { Answer } from "../spokes";
import type { Locale } from "../types";
import { projects } from "../work";

/**
 * In-depth questions for each service pillar (SEO-GUIDELINE D1, D7, D8, D12), keyed by pillar id.
 * Answer-first: a direct answer of about 40–80 words, then detail. Every claim about Bellona comes from the
 * case studies (content/work.ts), the team copy or content/facts.ts; general explanations are labeled as such.
 * TODO(owner): published price ranges and a typical website timeline (docs/seo/QUESTIONS_FOR_TEAM.md #4, #30).
 */
type More = Record<string, Record<Locale, Answer[]>>;

const re = facts.projects.realEstate;
const sprintEn = fmt.weeks(facts.timelines.automationSprintWeeks, "en");
const sprintFa = fmt.weeks(facts.timelines.automationSprintWeeks, "fa");
const complexEn = fmt.weeks(facts.timelines.complexAgentWeeks, "en");
const complexFa = fmt.weeks(facts.timelines.complexAgentWeeks, "fa");
const nEn = (v: number) => fmt.n(v, "en");
const nFa = (v: number) => fmt.n(v, "fa");
const shipped = projects.filter((p) => p.status === "published").length;

export const more: More = {
  // ======================================================================================= website design (D1)
  web: {
    fa: [
      {
        q: "شرکت طراحی سایت بلونا چه کارهایی انجام می‌دهد؟",
        a: "بلونا آژانس طراحی سایت اختصاصی است: سایت شرکتی، فروشگاهی، لندینگ‌پیج و پلتفرم را طراحی و کدنویسی می‌کنیم. هیچ سایتی با قالب آماده ساخته نمی‌شود؛ هر صفحه حول پیشنهاد شما، سرعت روی موبایل، سئو و تبدیل بازدیدکننده به مشتری طراحی می‌شود.",
        details: [
          {
            kind: "steps",
            items: [
              "طراحی UI/UX: مسیر کاربر، وایرفریم و رابط کاربری اختصاصی",
              "لندینگ‌پیج برای کمپین، لانچ و پیشنهاد ویژه",
              "سایت با CMS تا تیم شما بدون برنامه‌نویس متن را ویرایش کند",
              "طراحی برای تبدیل: پیشنهاد روشن، دعوت به اقدام قوی و فرم‌هایی که پر می‌شوند",
              "دوزبانه و راست‌به‌چپ، فارسی و انگلیسی با آدرس جدا",
              "سرعت و سئوی پایه: کد تمیز، نقشه‌ی سایت و داده‌ی ساختاریافته",
            ],
          },
        ],
      },
      {
        q: "طراحی سایت با شرکت، فریلنسر یا قالب آماده؟",
        a: "قالب آماده سریع‌ترین و ارزان‌ترین شروع است، فریلنسر برای کارهای کوچک و مشخص مناسب است و آژانس طراحی سایت وقتی که سایت باید بخش جدی کسب‌وکار باشد: چند نفر مسئول طراحی، کد، سئو و نگهداری‌اند و نتیجه یک نفر را وابسته نمی‌کند.",
        details: [
          {
            kind: "table",
            caption: "مقایسه‌ی سه راه برای داشتن سایت",
            head: ["معیار", "قالب آماده", "فریلنسر", "آژانس (مثل بلونا)"],
            rows: [
              ["شخصی‌سازی", "محدود به امکانات قالب", "بسته به مهارت یک نفر", "طراحی و کد اختصاصی"],
              ["سرعت و سئو", "وابسته به افزونه‌ها و قالب", "وابسته به تجربه‌ی یک نفر", "ساختار، سرعت و سئو از اول جزو کار است"],
              ["مسئولیت بعد از تحویل", "با خودتان", "با یک نفر؛ در دسترس بودنش قطعی نیست", "پایش، رفع اشکال و بهبود بخشی از همکاری است"],
              ["تنوع تخصص", "ندارد", "معمولاً یک تخصص", "طراحی، برنامه‌نویسی، اتوماسیون و رشد کنار هم"],
              ["هزینه‌ی شروع", "کمترین", "متوسط", "بیشترین؛ ولی قیمت قطعی و مکتوب است"],
            ],
          },
        ],
      },
      {
        q: "چرا سایت را بدون قالب آماده طراحی کنیم؟",
        a: "طراحی سایت بدون قالب یعنی ساختار و کد را برای کسب‌وکار شما می‌نویسیم، نه اینکه کسب‌وکارتان را در قالب دیگران جا بدهیم. نتیجه سایتی است که شبیه برند شماست، فقط چیزهای لازم را بار می‌کند و گوگل راحت‌تر آن را می‌خواند.",
        details: [
          {
            kind: "steps",
            items: [
              "کد سبک: صفحه فقط چیزی را بار می‌کند که لازم دارد",
              "ساختار عنوان‌ها و آدرس‌ها از همان ابتدا برای سئو طراحی می‌شود، نه بعداً اضافه",
              "قابلیت‌های خاص (پرداخت، فرم هوشمند، اتصال به CRM) بدون افزونه‌ی اضافه",
              "مالکیت کد، دامنه، هاست و داده‌ها از روز اول با شماست",
            ],
          },
        ],
      },
      {
        q: "طراحی سایت با چه فناوری‌هایی انجام می‌شود؟",
        a: "پروژه‌های ما بیشتر با Next.js ساخته شده‌اند: مدرسه مهارت یاسین با Next.js 15 و GSAP و Three.js، پایگاه علمی خبری دانه با Next.js 16 و Payload CMS و PostgreSQL، و فروشگاه مجسمه سعیدی با Next.js 15 و Prisma. انتخاب فناوری با نیاز هر پروژه است.",
        details: [
          {
            kind: "links",
            items: [
              { label: "مدرسه مهارت یاسین", href: "/work/yasin" },
              { label: "پایگاه علمی خبری دانه", href: "/work/dane-news" },
              { label: "فروشگاه مجسمه سعیدی", href: "/work/mojasame-saidi" },
            ],
          },
        ],
      },
      {
        q: "مراحل طراحی سایت چطور پیش می‌رود؟",
        a: "پروژه شش مرحله دارد: شناخت، وایرفریم، طراحی، ساخت، انتشار و بهبود. قبل از شروع، دامنه، قیمت و زمان‌بندی مکتوب می‌شود و در طول کار هر هفته لینک پیش‌نمایش و دمویی کوتاه می‌گیرید.",
        details: [
          {
            kind: "steps",
            items: [
              "شناخت: کسب‌وکار، مخاطب و هدف سایت را می‌شناسیم",
              "وایرفریم: چیدمان صفحه‌ها و مسیر بازدیدکننده را می‌کشیم",
              "طراحی: رابط کاربری اختصاصی در هماهنگی با برند",
              "ساخت: کدنویسی، اتصال فرم‌ها و تست روی موبایل و دسکتاپ",
              "انتشار: راه‌اندازی روی دامنه‌ی شما و ثبت در موتور جست‌وجو",
              "بهبود: پایش و اصلاح بر اساس رفتار واقعی بازدیدکننده‌ها",
            ],
          },
        ],
      },
      {
        q: "چه نوع سایتی طراحی می‌کنید؟",
        a: "سایت شرکتی و سازمانی، فروشگاه اینترنتی، سایت آموزشی، رسانه و پایگاه خبری، سایت دوزبانه، لندینگ‌پیج و بازطراحی سایت موجود. هر نوع صفحه‌ی مخصوص خودش را دارد که هدف، ساختار و نمونه‌کارهایش را توضیح می‌دهد.",
      },
      {
        q: "نمونه‌ی سایت‌هایی که طراحی کرده‌اید کدام‌اند؟",
        a: `${nFa(shipped)} پروژه‌ی منتشرشده داریم؛ از جمله فروشگاه سبزینو و عطر نیرا، مدرسه مهارت یاسین و کنجد، پایگاه علمی خبری دانه که از وردپرس منتقل شد و سایت دوزبانه ASA-Study. همه‌ی آن‌ها در صفحه‌ی نمونه‌کارها با شرح چالش و راه‌حل آمده‌اند.`,
        details: [
          {
            kind: "links",
            items: [
              { label: "همه‌ی نمونه‌کارها", href: "/work" },
              { label: "فروشگاه اجتماعی سبزینو", href: "/work/sabzino" },
              { label: "پایگاه علمی خبری دانه", href: "/work/dane-news" },
              { label: "سامانه پذیرش ASA-Study", href: "/work/asa-study" },
            ],
          },
        ],
      },
      {
        q: "هزینه‌ی طراحی سایت چقدر است؟",
        a: "هزینه و زمان به تعداد صفحه‌ها، امکانات و اتصال‌ها بستگی دارد؛ برای همین قیمت ثابتی منتشر نمی‌کنیم. بعد از بررسی رایگان رشد، دامنه، قیمت قطعی و زمان‌بندی را مکتوب می‌گیرید و فقط برای همان دامنه پرداخت می‌کنید.",
        details: [{ kind: "links", items: [{ label: "راهنمای قیمت طراحی سایت ۱۴۰۵", href: "/guides/website-design-cost" }] }],
      },
      {
        q: "کد و دامنه‌ی سایت بعد از تحویل مال کیست؟",
        a: "کد، دامنه، حساب‌های هاست و داده‌ها از روز اول به نام شماست. وابسته به ما نمی‌مانید: اگر روزی بخواهید سایت را جای دیگری ببرید یا با تیم دیگری ادامه دهید، همه‌چیز در اختیار خودتان است.",
      },
      {
        q: "بعد از تحویل سایت پشتیبانی می‌کنید؟",
        a: "بله. پایش، رفع اشکال و بهبود بخشی از هر همکاری است. می‌توانید با همراهی ماهانه‌ی رشد ادامه دهید تا صفحه‌ها، اتوماسیون و محتوا مدام بهتر شوند.",
      },
      {
        q: "سایت برای موبایل و سرعت بهینه می‌شود؟",
        a: "بله. تمام صفحه‌ها اول برای موبایل طراحی می‌شوند، تصویرها با اندازه‌ی درست بارگذاری می‌شوند و کتابخانه‌های سنگین فقط در صفحه‌هایی می‌آیند که واقعاً لازم‌اند. سرعت بخشی از سئو است، نه کار جانبی.",
      },
      {
        q: "آیا سایت دوزبانه یا چندزبانه هم می‌سازید؟",
        a: "بله. فارسی و انگلیسی با آدرس جدا برای هر زبان، چیدمان راست‌به‌چپ واقعی و برچسب‌های زبان درست برای گوگل. همین سایت و سامانه‌ی ASA-Study همین‌طور ساخته شده‌اند.",
        details: [{ kind: "links", items: [{ label: "طراحی سایت دوزبانه", href: "/services/website-design/bilingual" }] }],
      },
    ],
    en: [
      {
        q: "What does Bellona's website design agency do?",
        a: "Bellona is a custom website design agency: we design and hand-code corporate sites, online stores, landing pages and platforms. Nothing is built from a ready-made template; every page is shaped around your offer, speed on mobile, SEO and turning visitors into customers.",
        details: [
          {
            kind: "steps",
            items: [
              "UI/UX design: user journey, wireframes and a custom interface",
              "Landing pages for campaigns, launches and special offers",
              "CMS-based sites so your team edits text without a developer",
              "Conversion-focused design: a clear offer, strong calls to action and forms that get filled",
              "Bilingual and right-to-left: Persian and English with separate URLs",
              "Speed and baseline SEO: clean code, sitemap and structured data",
            ],
          },
        ],
      },
      {
        q: "Website design agency, freelancer or ready-made template?",
        a: "A ready-made template is the fastest and cheapest start, a freelancer suits small, well-defined jobs, and an agency fits when the site is a serious part of the business: several people own design, code, SEO and upkeep, so the result never depends on one person.",
        details: [
          {
            kind: "table",
            caption: "Three ways to get a website",
            head: ["Criterion", "Ready-made template", "Freelancer", "Agency (like Bellona)"],
            rows: [
              ["Customization", "Limited to what the template offers", "Depends on one person's skills", "Custom design and code"],
              ["Speed and SEO", "Depends on plugins and the template", "Depends on one person's experience", "Structure, speed and SEO are part of the build"],
              ["Responsibility after delivery", "Yours", "One person; availability is not guaranteed", "Monitoring, fixes and improvement are part of the work"],
              ["Range of skills", "None", "Usually one specialty", "Design, engineering, automation and growth together"],
              ["Starting cost", "Lowest", "Medium", "Highest, but the quote is fixed and in writing"],
            ],
          },
        ],
      },
      {
        q: "Why design a website without a template?",
        a: "A site without a template means we write the structure and code for your business instead of squeezing your business into someone else's layout. The result looks like your brand, loads only what it needs and is easier for Google to read.",
        details: [
          {
            kind: "steps",
            items: [
              "Lean code: a page loads only what it needs",
              "Headings and URLs are planned for SEO from the start",
              "Special features (payments, smart forms, CRM connections) without extra plugins",
              "Code, domain, hosting and data are yours from day one",
            ],
          },
        ],
      },
      {
        q: "Which technologies do you build websites with?",
        a: "Most of our projects run on Next.js: Yasin Skill School on Next.js 15 with GSAP and Three.js, Dane Scientific News on Next.js 16 with Payload CMS and PostgreSQL, and the Mojasame Saidi store on Next.js 15 with Prisma. The technology follows each project's needs.",
        details: [
          {
            kind: "links",
            items: [
              { label: "Yasin Skill School", href: "/work/yasin" },
              { label: "Dane Scientific News", href: "/work/dane-news" },
              { label: "Mojasame Saidi store", href: "/work/mojasame-saidi" },
            ],
          },
        ],
      },
      {
        q: "How does a website design project run, step by step?",
        a: "A project has six steps: discovery, wireframes, design, build, launch and improvement. Before work starts, scope, price and timeline are written down, and during the work you get a preview link and a short demo every week.",
        details: [
          {
            kind: "steps",
            items: [
              "Discovery: we learn the business, the audience and the goal of the site",
              "Wireframes: we sketch page layouts and the visitor's path",
              "Design: a custom interface that matches your brand",
              "Build: coding, connecting forms, testing on mobile and desktop",
              "Launch: going live on your domain and registering with search engines",
              "Improvement: monitoring and refining from real visitor behavior",
            ],
          },
        ],
      },
      {
        q: "What kinds of websites do you design?",
        a: "Corporate and organization sites, online stores, education sites, media and news platforms, bilingual sites, landing pages and redesigns of existing sites. Each type has its own page explaining its goal, structure and examples.",
      },
      {
        q: "Which websites have you designed?",
        a: `We have ${nEn(shipped)} published projects, including the Sabzino and Nira Perfume stores, Yasin Skill School and Konjed, Dane Scientific News (migrated from WordPress) and the bilingual ASA-Study site. Each case study explains the challenge and what we built.`,
        details: [
          {
            kind: "links",
            items: [
              { label: "All case studies", href: "/work" },
              { label: "Sabzino online store", href: "/work/sabzino" },
              { label: "Dane Scientific News", href: "/work/dane-news" },
              { label: "ASA-Study admissions platform", href: "/work/asa-study" },
            ],
          },
        ],
      },
      {
        q: "How much does website design cost?",
        a: "Cost and time depend on the number of pages, the features and the integrations, so we do not publish a fixed price list. After the free growth audit you get scope, a fixed price and a timeline in writing, and you pay only for that scope.",
        details: [{ kind: "links", items: [{ label: "Website design cost in 2026: a guide", href: "/guides/website-design-cost" }] }],
      },
      {
        q: "Who owns the code and the domain after delivery?",
        a: "You do. Code, domain, hosting accounts and data belong to you from day one, so you never depend on us: if you want to move the site or continue with another team, everything is in your hands.",
      },
      {
        q: "Do you support the site after launch?",
        a: "Yes. Monitoring, fixes and improvement are part of every engagement. You can continue with the monthly growth partnership so pages, automation and content keep getting better.",
      },
      {
        q: "Is the site optimized for mobile and speed?",
        a: "Yes. Every page is designed mobile-first, images load at the right size, and heavy libraries only load on the pages that need them. Speed is part of SEO, not a side job.",
      },
      {
        q: "Do you build bilingual or multilingual websites?",
        a: "Yes: Persian and English with separate URLs per language, a true right-to-left layout and correct language tags for Google. This site and the ASA-Study platform are built this way.",
        details: [{ kind: "links", items: [{ label: "Bilingual website design", href: "/services/website-design/bilingual" }] }],
      },
    ],
  },

  // ======================================================================================= product / full-stack (D12)
  product: {
    fa: [
      {
        q: "طراحی وب‌اپ و محصول دیجیتال با بلونا چطور است؟",
        a: "وب‌اپ را از دیتابیس تا رابط کاربری یک‌جا می‌سازیم: حساب کاربری، پنل مدیریت، پرداخت و API. نمونه‌ها کدچی (پلتفرم یادگیری گیمیفای‌شده با حساب دانش‌آموز و پیگیری پیشرفت) و کنجد (پلتفرم مهارت‌آموزی بازی‌گونه برای نوجوان‌ها) هستند.",
        details: [
          {
            kind: "links",
            items: [
              { label: "کدچی", href: "/work/codechee" },
              { label: "کنجد", href: "/work/konjed" },
              { label: "پلتفرم محتوایی کانتمو", href: "/work/contemo" },
            ],
          },
        ],
      },
      {
        q: "ساخت MVP یعنی چه و چطور شروع می‌شود؟",
        a: "MVP کوچک‌ترین نسخه‌ی محصول است که می‌شود به کاربر واقعی داد و از او یاد گرفت. دامنه را روی مهم‌ترین مسیر کاربر می‌بندیم، در اسپرینت‌های کوتاه می‌سازیم و هر هفته دمو می‌دهیم تا قبل از هزینه‌ی بیشتر، فرض‌ها آزموده شوند.",
        details: [
          {
            kind: "steps",
            items: ["تعریف دامنه و مهم‌ترین مسیر کاربر", "معماری و انتخاب فناوری", "ساخت در اسپرینت‌های کوتاه با دموی هفتگی", "تست و عرضه", "نگهداری و نسخه‌ی بعدی بر اساس بازخورد کاربران"],
          },
        ],
      },
      {
        q: "اپلیکیشن موبایل با Flutter برای iOS و اندروید می‌سازید؟",
        a: "بله. پلتفرم ورزشی Prowem اپلیکیشن چندسکویی مدیریت ورزش و نتایج زنده است که با Flutter و Dart ساخته شده و با REST API به پلتفرم رویداد وصل است. با یک کد، هم iOS و هم اندروید پوشش داده می‌شود.",
        details: [{ kind: "links", items: [{ label: "پلتفرم ورزشی Prowem", href: "/work/prowem" }] }],
      },
      {
        q: "داشبورد و ابزار داخلی چه فایده‌ای دارد؟",
        a: "داشبورد اعداد لازم را زنده و یک‌جا نشان می‌دهد و ابزار داخلی جای همان اکسلی را می‌گیرد که کسب‌وکار را می‌چرخاند. پنل مدیریت فروشگاه سبزینو برای محصول، موجودی، قیمت و سفارش‌ها نمونه‌ای از ابزاری است که تیم خودش اداره می‌کند.",
        details: [{ kind: "links", items: [{ label: "فروشگاه اجتماعی سبزینو", href: "/work/sabzino" }] }],
      },
      {
        q: "API و یکپارچه‌سازی با ابزارهای دیگر چطور انجام می‌شود؟",
        a: "برای اتصال محصول به ابزارهای دیگر، API و وب‌هوک می‌نویسیم تا داده بدون کپی‌پیست جابه‌جا شود. در اپلیکیشن Prowem، REST API داده‌ی اپ موبایل و پلتفرم رویداد را همگام نگه می‌دارد؛ در سیستم املاک هم گردش‌کارها ابزارها را به هم وصل می‌کنند.",
        details: [{ kind: "links", items: [{ label: "سیستم‌عامل هوشمند فروش املاک", href: "/work/ai-real-estate-os" }] }],
      },
      {
        q: "نگهداری محصول بعد از عرضه چطور است؟",
        a: "پایش، به‌روزرسانی و رفع اشکال بعد از انتشار بخشی از کار است. محصول سرپا می‌ماند و با بازخورد کاربران نسخه‌ی بعدی ساخته می‌شود؛ می‌توانید با همراهی ماهانه یا تیم اختصاصی ادامه دهید.",
      },
      {
        q: "هزینه و زمان ساخت وب‌اپ یا MVP چقدر است؟",
        a: "به دامنه‌ی محصول بستگی دارد و بعد از بررسی رایگان رشد، قیمت قطعی و زمان‌بندی را مکتوب می‌گیرید. قیمتی که از قبل اعلام شود برای هر محصولی درست نیست، چون دو محصول هم‌نام می‌توانند چند برابر فرق داشته باشند.",
      },
    ],
    en: [
      {
        q: "How do you approach web app development and digital products?",
        a: "We build the web app end to end, from database to interface: accounts, admin panel, payments and API. Examples are Codechee (a gamified learning platform with student accounts and progress tracking) and Konjed (a play-based skills platform for teenagers).",
        details: [
          {
            kind: "links",
            items: [
              { label: "Codechee", href: "/work/codechee" },
              { label: "Konjed", href: "/work/konjed" },
              { label: "Contemo content platform", href: "/work/contemo" },
            ],
          },
        ],
      },
      {
        q: "What is an MVP and how does it start?",
        a: "An MVP is the smallest version of a product you can put in front of real users and learn from. We fix the scope on the most important user path, build in short sprints and demo every week, so assumptions are tested before you spend more.",
        details: [
          {
            kind: "steps",
            items: ["Define the scope and the most important user path", "Architecture and technology choice", "Build in short sprints with a weekly demo", "Test and launch", "Maintain and plan the next version from user feedback"],
          },
        ],
      },
      {
        q: "Do you build Flutter mobile apps for iOS and Android?",
        a: "Yes. The Prowem sports platform is a cross-platform sports management and live-score app built with Flutter and Dart, connected to the event platform through a REST API. One codebase covers both iOS and Android.",
        details: [{ kind: "links", items: [{ label: "Prowem sports platform", href: "/work/prowem" }] }],
      },
      {
        q: "What are dashboards and internal tools for?",
        a: "A dashboard shows the numbers you need, live and in one place, and an internal tool replaces the spreadsheet that quietly runs the business. The Sabzino admin panel, for products, stock, prices and orders, is an example of a tool the team runs itself.",
        details: [{ kind: "links", items: [{ label: "Sabzino online store", href: "/work/sabzino" }] }],
      },
      {
        q: "How do APIs and integrations with other tools work?",
        a: "To connect a product to other tools we write APIs and webhooks so data moves without copy and paste. In the Prowem app a REST API keeps the mobile apps and the event platform in sync; in the real-estate system, workflows connect the tools to each other.",
        details: [{ kind: "links", items: [{ label: "AI Real Estate Operating System", href: "/work/ai-real-estate-os" }] }],
      },
      {
        q: "What does maintenance after launch involve?",
        a: "Monitoring, updates and fixes after release are part of the work. The product stays healthy and the next version is built from user feedback; you can continue with the monthly partnership or a dedicated team.",
      },
      {
        q: "How much does a web app or MVP cost, and how long does it take?",
        a: "It depends on the scope of the product, and after the free growth audit you get a fixed quote and a timeline in writing. A price announced in advance would be wrong for most products, since two products with the same name can differ many times over.",
      },
    ],
  },

  // ======================================================================================= AI automation (D7)
  ai: {
    fa: [
      {
        q: "ایجنت هوش مصنوعی و اتوماسیون کسب‌وکار دقیقاً چه کاری می‌کند؟",
        a: "ایجنت هوش مصنوعی دستیاری دیجیتال است که پیام‌ها، پیگیری‌ها و کارهای تکراری را بدون حضور شما انجام می‌دهد؛ اتوماسیون، مسیر کار را از دریافت داده تا اقدام نهایی بدون دخالت دستی می‌چرخاند. هدف این است که تیم شما به کارهایی برسد که فقط از آدم‌ها برمی‌آید.",
        details: [
          {
            kind: "steps",
            items: [
              "ایجنت هوش مصنوعی: پیام‌ها و پیگیری‌ها را انجام می‌دهد",
              "اتوماسیون فرایند: دریافت داده تا اقدام نهایی بدون دخالت دستی",
              "جذب و غربال مشتری: پیدا کردن، ارزیابی و تحویل آماده‌ی فروش",
              "پشتیبانی هوشمند: پاسخ سریع و ارجاع موارد خاص به انسان",
              "مدیریت فروش خودکار: پیگیری و به‌روزرسانی وضعیت معاملات",
              "اتصال ابزارها: همه‌ی نرم‌افزارها در یک جریان قابل اعتماد",
            ],
          },
        ],
      },
      {
        q: "با چه ابزارهایی کار می‌کنید؟",
        a: "n8n، Make، Zapier، HubSpot، Baserow، Google Workspace، ایمیل، چت سایت و پیام‌رسان‌ها، و هر سرویسی که API یا وب‌هوک داشته باشد. اگر بخواهید، n8n را روی سرور خودتان راه‌اندازی می‌کنیم.",
      },
      {
        q: "نمونه‌ی واقعی اتوماسیون فروش چیست؟",
        a: `برای یک کسب‌وکار املاک (kharazie.at) سیستمی ساختیم که فروش را خودکار می‌کند: ${nFa(re.n8nWorkflows)} گردش‌کار n8n، یک CRM با ${nFa(re.crmTables)} جدول در Baserow برای پروژه‌ها، مخاطبان، کمپین‌ها، تعامل‌ها، وظایف و اسناد، تولید محتوا با Claude و ارسال و دریافت ایمیل با SMTP و IMAP.`,
        details: [{ kind: "links", items: [{ label: "نمونه‌کار: سیستم‌عامل هوشمند فروش املاک", href: "/work/ai-real-estate-os" }] }],
      },
      {
        q: "این سیستم از کجا تا کجا کار را انجام می‌دهد؟",
        a: "در سیستم املاک، گردش‌کارها از پیدا کردن و امتیازدهی سرمایه‌گذار شروع می‌کنند، به ارتباط، پاسخ‌ها، تحلیل پروژه و ساخت سند در Google Drive می‌رسند و با مدیریت متمرکز خطا و گزارش روزانه تمام می‌شوند؛ مستندات پشتیبان‌گیری و امنیت هم برای تحویل آماده است.",
      },
      {
        q: "از شروع تا راه‌افتادن چقدر زمان می‌برد؟",
        a: `یک اسپرینت اتوماسیون متمرکز در ${sprintFa} راه می‌افتد. اتوماسیون‌های ساده چند روز زمان می‌برند و سیستم‌های چندایجنتی پیچیده ${complexFa}. زمان‌بندی بخشی از پیشنهاد قیمت قطعی است.`,
      },
      {
        q: "مراحل راه‌اندازی چیست؟",
        a: "پنج مرحله: بررسی، طراحی، پیاده‌سازی، راه‌اندازی و بهبود مستمر. اول فرایند فعلی و گلوگاه‌ها را می‌خوانیم، بعد معماری و نقش ایجنت‌ها را طراحی می‌کنیم، می‌سازیم و تست می‌کنیم، در محیط واقعی فعال می‌کنیم و با رشد کسب‌وکار گسترش می‌دهیم.",
        details: [
          {
            kind: "steps",
            items: [
              "بررسی: فرایندها، گلوگاه‌ها و اولویت‌ها",
              "طراحی: معماری، نقش ایجنت‌ها و اتصال ابزارها",
              "پیاده‌سازی: ساخت و تست با کمترین اختلال برای کار روزانه",
              "راه‌اندازی: فعال‌سازی در محیط واقعی",
              "بهبود مستمر: پایش، اصلاح و گسترش",
            ],
          },
        ],
      },
      {
        q: "اگر خطایی پیش بیاید چه می‌شود؟",
        a: "هشدار خطا جزو کار است: اتصالی که قطع شود بی‌صدا نمی‌ماند و گزارش می‌شود. در سیستم املاک هم مدیریت متمرکز خطا و گزارش روزانه وجود دارد، و بعد از تحویل پایش و رفع اشکال ادامه دارد.",
      },
      {
        q: "تیم ما باید فنی باشد؟",
        a: "خیر. رابط ساده طراحی می‌کنیم و تیم شما را آموزش می‌دهیم؛ پیچیدگی را سیستم مدیریت می‌کند و تیم شما فقط از آن استفاده می‌کند. مستندات و آموزش تیم هم جزو اسپرینت اتوماسیون است.",
      },
      {
        q: "چرا به‌جای استخدام نیرو سراغ اتوماسیون برویم؟",
        a: "استخدام یعنی هزینه‌ی ثابت ماهانه. سیستم یک‌بار ساخته می‌شود و با رشد شما بزرگ‌تر می‌شود، بی‌آنکه هزینه‌ی نیرو هم پابه‌پایش بالا برود. اتوماسیون جای تصمیم‌گیری انسان را نمی‌گیرد؛ کار تکراری را برمی‌دارد.",
      },
      {
        q: "قیمت اتوماسیون چطور تعیین می‌شود؟",
        a: "با بررسی رایگان شروع می‌کنیم: در ۳۰ دقیقه فرایندی را که می‌خواهید خودکار شود بررسی و ساعت‌ها و هزینه‌ای را که صرفه‌جویی می‌شود برآورد می‌کنیم. اگر به توافق رسیدیم، قیمت قطعی و مکتوب می‌گیرید.",
        details: [{ kind: "links", items: [{ label: "رزرو بررسی رایگان", href: "/contact?need=ai" }] }],
      },
    ],
    en: [
      {
        q: "What does AI automation actually do for a business?",
        a: "An AI agent is a digital assistant that handles messages, follow-ups and repetitive tasks without you; automation runs the whole work path from receiving data to the final action without manual steps. The aim is for your team to get to the work only people can do.",
        details: [
          {
            kind: "steps",
            items: [
              "AI agent: handles messages and follow-ups",
              "Process automation: from receiving data to the final action, no manual steps",
              "Lead generation and qualification: find, assess and hand over sales-ready",
              "Smart support: fast answers, with special cases handed to a person",
              "Automated sales management: follow-up and deal-status updates",
              "Tool connections: all your software in one reliable flow",
            ],
          },
        ],
      },
      {
        q: "Which tools do you work with?",
        a: "n8n, Make, Zapier, HubSpot, Baserow, Google Workspace, email, website chat and messengers, and any service with an API or webhook. If you prefer, we set up n8n on your own server.",
      },
      {
        q: "What does a real sales automation look like?",
        a: `For a real-estate business (kharazie.at) we built a system that automates sales: ${nEn(re.n8nWorkflows)} n8n workflows, a CRM with ${nEn(re.crmTables)} tables in Baserow for projects, contacts, campaigns, interactions, tasks and documents, content generation with Claude, and email sending and receiving over SMTP and IMAP.`,
        details: [{ kind: "links", items: [{ label: "Case study: AI Real Estate Operating System", href: "/work/ai-real-estate-os" }] }],
      },
      {
        q: "How far does the system go?",
        a: "In the real-estate system, workflows start from finding and qualifying investors, run through outreach, replies, project analysis and document creation in Google Drive, and end with central error handling and a daily report; backup and security documentation is ready for handover.",
      },
      {
        q: "How long does it take to go live?",
        a: `A focused automation sprint goes live in ${sprintEn}. Simple automations take a few days and complex multi-agent systems ${complexEn}. The timeline is part of the fixed quote.`,
      },
      {
        q: "What are the steps to launch?",
        a: "Five steps: audit, design, build, launch and continuous improvement. We first read your current process and bottlenecks, then design the architecture and each agent's role, build and test it, switch it on in the real environment and extend it as your business grows.",
        details: [
          {
            kind: "steps",
            items: [
              "Audit: processes, bottlenecks and priorities",
              "Design: architecture, agent roles and tool connections",
              "Build: construction and testing with minimal disruption to daily work",
              "Launch: activation in the real environment",
              "Continuous improvement: monitoring, fixing and extending",
            ],
          },
        ],
      },
      {
        q: "What happens if something breaks?",
        a: "Error alerts are part of the build: a connection that fails does not stay silent, it is reported. The real-estate system has central error handling and a daily report, and monitoring and fixes continue after handover.",
      },
      {
        q: "Does our team need to be technical?",
        a: "No. We design a simple interface and train your team; the system handles the complexity and your team just uses it. Documentation and team training are part of the automation sprint.",
      },
      {
        q: "Why automate instead of hiring?",
        a: "Hiring means a fixed monthly cost. A system is built once and grows with you without labour cost rising in step. Automation does not replace human judgment; it takes the repetitive work away.",
      },
      {
        q: "How is automation priced?",
        a: "We start with the free audit: in 30 minutes we look at the process you want automated and estimate the hours and cost it would save. If it fits, you get a fixed quote in writing.",
        details: [{ kind: "links", items: [{ label: "Book the free audit", href: "/contact?need=ai" }] }],
      },
    ],
  },

  // ======================================================================================= marketing & growth (D8)
  growth: {
    fa: [
      {
        q: "مارکتینگ، جذب لید و رشد در بلونا شامل چه چیزهایی است؟",
        a: "کمپین، سئو و محتوا، سیستم جذب لید و گزارش‌دهی. هدف این است که مخاطب درست به سایتی برسد که برای تبدیل ساخته شده و ایجنت‌ها خودکار پیگیری‌اش کنند، و شما با گزارشی ساده ببینید کدام کانال واقعاً فروش دارد.",
        details: [
          {
            kind: "steps",
            items: [
              "کمپین: پولی و ارگانیک، حول یک هدف مشخص",
              "سئو و محتوا: برای همان چیزی که واقعاً می‌فروشید دیده شوید",
              "سیستم جذب لید: پیدا کردن، تکمیل اطلاعات و غربال خودکار مشتری بالقوه",
              "گزارش: یک نمای واحد از اینکه چه چیزی جواب می‌دهد",
            ],
          },
        ],
      },
      {
        q: "فرایند کار چطور پیش می‌رود؟",
        a: "پنج مرحله: تحقیق، برنامه، اجرا، سنجش و بهبود. اول بازار و مخاطب را می‌شناسیم، برنامه‌ی مشخص با هدف و مسئول می‌نویسیم، اجرا می‌کنیم، نتیجه را با عدد می‌سنجیم و هر ماه بر اساس آن اصلاح می‌کنیم.",
        details: [
          {
            kind: "steps",
            items: [
              "تحقیق: مخاطب، رقبا و فرصت‌ها",
              "برنامه: کانال‌ها، پیام و هدف هر ماه",
              "اجرا: کمپین، محتوا و سئو",
              "سنجش: ترافیک، سرنخ و فروش در یک گزارش",
              "بهبود: حذف آنچه جواب نمی‌دهد و تقویت آنچه جواب می‌دهد",
            ],
          },
        ],
      },
      {
        q: "گزارش ماهانه چه ساختاری دارد؟",
        a: "گزارش ماهانه سه بخش دارد: ترافیک (چه کسانی از کجا آمدند)، سرنخ (چند نفر درخواست دادند و از کدام کانال) و فروش (چه تعداد به مشتری تبدیل شدند). فقط شاخص‌هایی می‌آید که تصمیم را عوض می‌کند، نه عددهای تزئینی.",
        details: [
          {
            kind: "table",
            caption: "ساختار گزارش ماهانه",
            head: ["بخش", "چه چیزی نشان می‌دهد", "برای چه تصمیمی"],
            rows: [
              ["ترافیک", "بازدیدکننده‌ها به تفکیک کانال و صفحه", "روی کدام کانال و محتوا سرمایه‌گذاری شود"],
              ["سرنخ", "درخواست‌های ثبت‌شده و منبع هر کدام", "کدام کانال سرنخ باکیفیت می‌آورد"],
              ["فروش", "سرنخ‌هایی که مشتری شدند", "کجای قیف فروش مشتری از دست می‌رود"],
              ["اقدام‌های ماه بعد", "فهرست کوتاه کارها با مسئول", "اولویت‌ها"],
            ],
          },
        ],
      },
      {
        q: "نتیجه‌ی مارکتینگ و سئو معمولاً کی دیده می‌شود؟",
        a: "سئو کاری تدریجی است و نتیجه‌ی آن معمولاً بعد از چند ماه دیده می‌شود، نه چند روز؛ مدت دقیق به رقابت در حوزه‌ی شما، وضعیت فعلی سایت و محتوای تولیدشده بستگی دارد. هر کسی نتیجه‌ی تضمینی و سریع بدهد، ادعایی را مطرح می‌کند که نمی‌شود تضمین کرد.",
      },
      {
        q: "کدام شاخص‌های رشد را پیگیری می‌کنید؟",
        a: "نمایش و کلیک در نتایج گوگل، رتبه‌ی صفحه‌های اصلی، تعداد ایندکس‌شده‌ها، سرعت و Core Web Vitals، تعداد درخواست بررسی رایگان و منبع هر درخواست. فرم‌های سایت رویداد ثبت می‌کنند تا بدانید کدام صفحه مشتری می‌آورد.",
      },
      {
        q: "مارکتینگ با سایت و اتوماسیون چه ارتباطی دارد؟",
        a: "سه لایه یک سیستم‌اند: سایت می‌فروشد، اتوماسیون هر مشتری را جواب می‌دهد و پیگیری می‌کند، و مارکتینگ مشتری درست را می‌آورد. اگر یکی نباشد، دو تای دیگر هم کم‌اثر می‌شوند؛ برای همین هر سه را کنار هم می‌سازیم.",
        details: [{ kind: "links", items: [{ label: "سیستم رشد بلونا", href: "/offers" }, { label: "نمونه: سیستم فروش املاک", href: "/work/ai-real-estate-os" }] }],
      },
    ],
    en: [
      {
        q: "What do marketing, lead generation and growth at Bellona include?",
        a: "Campaigns, SEO and content, a lead-generation system and reporting. The aim is that the right audience reaches a site built to convert, agents follow up automatically, and a simple report shows you which channel really sells.",
        details: [
          {
            kind: "steps",
            items: [
              "Campaigns: paid and organic, around one clear goal",
              "SEO and content: be found for what you actually sell",
              "Lead-generation system: find, enrich and qualify prospects automatically",
              "Reporting: one view of what is working",
            ],
          },
        ],
      },
      {
        q: "How does the work run?",
        a: "Five steps: research, plan, execute, measure and improve. We first learn the market and audience, write a plan with goals and owners, execute, measure results in numbers and adjust every month.",
        details: [
          {
            kind: "steps",
            items: [
              "Research: audience, competitors and opportunities",
              "Plan: channels, message and each month's goal",
              "Execute: campaigns, content and SEO",
              "Measure: traffic, leads and sales in one report",
              "Improve: drop what does not work and strengthen what does",
            ],
          },
        ],
      },
      {
        q: "What does the monthly report look like?",
        a: "The monthly report has three parts: traffic (who came from where), leads (how many enquiries, from which channel) and sales (how many became customers). Only indicators that change a decision go in, not decorative numbers.",
        details: [
          {
            kind: "table",
            caption: "Structure of the monthly report",
            head: ["Section", "What it shows", "Decision it supports"],
            rows: [
              ["Traffic", "Visitors by channel and page", "Which channel and content to invest in"],
              ["Leads", "Enquiries logged and the source of each", "Which channel brings quality leads"],
              ["Sales", "Leads that became customers", "Where the sales funnel loses customers"],
              ["Next month's actions", "A short list of tasks with owners", "Priorities"],
            ],
          },
        ],
      },
      {
        q: "When do marketing and SEO results usually show?",
        a: "SEO is gradual and results usually show after months, not days; the exact time depends on competition in your field, the current state of the site and the content produced. Anyone promising guaranteed fast results is promising something that cannot be guaranteed.",
      },
      {
        q: "Which growth metrics do you track?",
        a: "Impressions and clicks in Google results, rankings of the main pages, the number of indexed pages, speed and Core Web Vitals, the number of free-audit requests and the source of each. The site's forms log events so you know which page brings customers.",
      },
      {
        q: "How does marketing fit with the website and automation?",
        a: "The three layers are one system: the site sells, automation answers and follows up every customer, and marketing brings the right customers. If one is missing the other two do less, which is why we build all three together.",
        details: [{ kind: "links", items: [{ label: "The Bellona Growth System", href: "/offers" }, { label: "Example: the real-estate sales system", href: "/work/ai-real-estate-os" }] }],
      },
    ],
  },

  // ======================================================================================= business development (D12)
  bizdev: {
    fa: [
      {
        q: "توسعه کسب‌وکار در بلونا یعنی چه؟",
        a: "یعنی «باید رشد کنیم» را به برنامه‌ای قابل اجرا تبدیل کنیم: تحقیق بازار و رقبا، برنامه‌ی ورود به بازار، فرایند فروش و راه‌اندازی CRM، همکاری‌های تجاری و استراتژی رشد با مسئول و عدد مشخص.",
      },
      {
        q: "فرایند چطور پیش می‌رود؟",
        a: "پنج مرحله: تحقیق، استراتژی، راه‌اندازی، اجرا و بازبینی. اول بازار و رقبا را بررسی می‌کنیم، بعد استراتژی و برنامه‌ی فصل‌به‌فصل می‌نویسیم، CRM و فرایند فروش را راه می‌اندازیم، اجرا می‌کنیم و نتیجه را بازبینی می‌کنیم.",
        details: [
          {
            kind: "steps",
            items: [
              "تحقیق: بازار، رقبا و فرصت‌ها",
              "استراتژی: به چه کسی، با چه پیشنهادی، از چه کانالی",
              "راه‌اندازی: CRM و قیف فروش",
              "اجرا: همکاری‌های تجاری و فروش",
              "بازبینی: مقایسه‌ی نتیجه با برنامه و اصلاح",
            ],
          },
        ],
      },
      {
        q: "راه‌اندازی CRM چه کمکی می‌کند؟",
        a: `CRM جایی است که هر مشتری بالقوه، تعامل و وظیفه‌ی پیگیری ثبت می‌شود تا هیچ فرصتی فراموش نشود. در سیستم املاک، CRM با ${nFa(re.crmTables)} جدول در Baserow برای پروژه‌ها، مخاطبان، کمپین‌ها، تعامل‌ها، وظایف و اسناد ساخته شد و گردش‌کارها آن را خودکار به‌روز می‌کنند.`,
        details: [{ kind: "links", items: [{ label: "سیستم‌عامل هوشمند فروش املاک", href: "/work/ai-real-estate-os" }] }],
      },
      {
        q: "این مشاوره است یا اجرا؟",
        a: "هر دو. برنامه را می‌نویسیم و بعد CRM، فرایند فروش و سیستم‌هایی را که اجرایش می‌کنند راه می‌اندازیم؛ می‌توانید فقط برنامه را بگیرید یا با تیم ما اجرا را هم جلو ببرید.",
      },
      {
        q: "با بقیه‌ی خدمات بلونا چه ارتباطی دارد؟",
        a: "برنامه تعیین می‌کند چه چیزی طراحی، ساخته، خودکار و بازاریابی شود تا همه برای رسیدن به یک هدف کار کنند. اگر برنامه‌ای ندارید، از بررسی رایگان رشد شروع کنید.",
        details: [{ kind: "links", items: [{ label: "بررسی رایگان رشد", href: "/contact?need=unsure" }] }],
      },
    ],
    en: [
      {
        q: "What does business development at Bellona mean?",
        a: "It means turning \"we need to grow\" into a plan you can execute: market and competitor research, a go-to-market plan, a sales process and CRM setup, commercial partnerships and a growth strategy with owners and numbers.",
      },
      {
        q: "How does the process run?",
        a: "Five steps: research, strategy, setup, execution and review. We first study the market and competitors, then write a strategy and a quarter-by-quarter plan, set up the CRM and sales process, execute and review results.",
        details: [
          {
            kind: "steps",
            items: [
              "Research: market, competitors and opportunities",
              "Strategy: to whom, with what offer, through which channel",
              "Setup: CRM and sales funnel",
              "Execution: commercial partnerships and sales",
              "Review: compare results with the plan and adjust",
            ],
          },
        ],
      },
      {
        q: "How does setting up a CRM help?",
        a: `A CRM is where every prospect, interaction and follow-up task is recorded so no opportunity is forgotten. In the real-estate system, a CRM with ${nEn(re.crmTables)} tables in Baserow covers projects, contacts, campaigns, interactions, tasks and documents, and workflows keep it updated automatically.`,
        details: [{ kind: "links", items: [{ label: "AI Real Estate Operating System", href: "/work/ai-real-estate-os" }] }],
      },
      {
        q: "Is this consulting or hands-on work?",
        a: "Both. We write the plan and then set up the CRM, the sales process and the systems that run it; you can take only the plan or let our team carry the execution too.",
      },
      {
        q: "How does it connect to Bellona's other services?",
        a: "The plan decides what gets designed, built, automated and marketed so everything works toward one goal. If you do not have a plan yet, start with the free growth audit.",
        details: [{ kind: "links", items: [{ label: "Free growth audit", href: "/contact?need=unsure" }] }],
      },
    ],
  },
};
