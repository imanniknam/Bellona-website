import { facts, fmt } from "../facts";
import type { Answer } from "../spokes";
import type { Locale } from "../types";

/**
 * Extra questions for the sub-pages and guides (SEO-GUIDELINE D2–D6, D9), keyed by spoke slug. content/spokes.ts
 * inserts them before each page's last answer. Every claim about Bellona comes from content/work.ts or
 * content/facts.ts; general explanations (what Next.js is, how hreflang works) are labelled as general.
 * TODO(owner): a price range per level for the cost guide, CMS choice and typical timelines
 * (docs/seo/QUESTIONS_FOR_TEAM.md #3, #4, #30); they stay out of the text until confirmed.
 */
type More = Record<string, Record<Locale, Answer[]>>;

const dane = facts.projects.dane;
const en = (v: number) => fmt.n(v, "en");
const fa = (v: number) => fmt.n(v, "fa");

export const more: More = {
  // ======================================================================================= Next.js (D2)
  nextjs: {
    fa: [
      {
        q: "نکست جی اس (Next.js) چیست و چرا برای سئو مناسب است؟",
        a: "نکست جی اس (Next.js) فریم‌ورک ساخت سایت بر پایه‌ی React است که صفحه را روی سرور کامل می‌سازد. متن کامل در همان پاسخ اول به گوگل می‌رسد و لازم نیست موتور جست‌وجو برای دیدن محتوا جاوااسکریپت اجرا کند؛ این یعنی ایندکس راحت‌تر و بارگذاری سریع‌تر روی موبایل.",
      },
      {
        q: "رندر سمت سرور چه فایده‌ای برای دیده شدن توسط هوش مصنوعی دارد؟",
        a: "ایجنت‌ها و دستیارهای هوش مصنوعی که صفحه را می‌خوانند معمولاً جاوااسکریپت اجرا نمی‌کنند. اگر متن فقط بعد از اجرای اسکریپت ساخته شود، آن‌ها صفحه‌ی خالی می‌بینند. در رندر سمت سرور، همه‌ی متن در همان پاسخ اول است و برای موتور جست‌وجو و دستیار هوش مصنوعی خواندنی می‌ماند.",
      },
      {
        q: "نکست جی اس بهتر است یا وردپرس؟",
        a: "وردپرس سریع راه می‌افتد و برای ویرایش محتوا آماده است؛ نکست جی اس اختصاصی ساخته می‌شود و سریع‌تر، سبک‌تر و امن‌تر می‌ماند ولی تغییر ساختار برنامه‌نویس می‌خواهد. با CMS هدلس مثل Payload، ویرایش بدون برنامه‌نویس هم ممکن است.",
        details: [
          {
            kind: "table",
            caption: "مقایسه‌ی نکست جی اس و وردپرس (Next.js و WordPress)",
            head: ["معیار", "Next.js", "وردپرس"],
            rows: [
              ["سرعت", "کد اختصاصی و سبک؛ فقط آنچه لازم است بار می‌شود", "وابسته به قالب و افزونه‌ها"],
              ["امنیت", "سطح حمله‌ی کوچک‌تر؛ افزونه‌ی شخص ثالث کمتر", "افزونه‌ها بیشترین منبع آسیب‌پذیری‌اند و باید مدام به‌روز شوند"],
              ["ویرایش محتوا", "با CMS هدلس (مثل Payload) ممکن است", "از ابتدا آماده و آشنا"],
              ["هزینه‌ی نگهداری", "کمتر وابسته به به‌روزرسانی افزونه‌ها؛ تغییر ساختار با برنامه‌نویس", "به‌روزرسانی مداوم هسته، قالب و افزونه‌ها"],
              ["سئو", "کنترل کامل روی ساختار، متادیتا و داده‌ی ساختاریافته", "با افزونه‌ی سئو؛ کنترل کمتر روی کد"],
            ],
          },
        ],
      },
      {
        q: "سایت دوزبانه با next-intl چطور ساخته می‌شود؟",
        a: "next-intl کتابخانه‌ای برای مسیریابی و ترجمه در نکست جی اس است. هر زبان آدرس و ترجمه‌ی کامل خودش را می‌گیرد، فارسی با چیدمان راست‌به‌چپ. سامانه‌ی ASA-Study را با Next.js 15 و next-intl ساخته‌ایم و صفحه‌های فارسی و انگلیسی‌اش با رفتار کامل RTL کار می‌کنند.",
        details: [{ kind: "links", items: [{ label: "سامانه پذیرش ASA-Study", href: "/work/asa-study" }] }],
      },
      {
        q: "ویرایش محتوا بدون برنامه‌نویس چطور ممکن است؟",
        a: "با یک CMS هدلس که پشت نکست جی اس می‌نشیند. در پایگاه علمی خبری دانه از Payload CMS استفاده کرده‌ایم تا تحریریه مطلب‌ها، برچسب‌ها و نویسنده‌ها را خودش مدیریت کند و قواعد تحریریه (منبع، لید، کپشن، اعتبار تصویر) اعتبارسنجی شود.",
        details: [{ kind: "links", items: [{ label: "پایگاه علمی خبری دانه", href: "/work/dane-news" }] }],
      },
      {
        q: "با نکست جی اس چه پروژه‌هایی ساخته‌اید؟",
        a: "مدرسه مهارت یاسین (Next.js 15)، پایگاه علمی خبری دانه (Next.js 16)، ASA-Study (Next.js 15 و next-intl)، فروشگاه مجسمه سعیدی (Next.js 15)، پلتفرم محتوایی کانتمو و اکوسیستم خانه شمیم (هر دو Next.js 16)، و همین سایت.",
        details: [
          {
            kind: "links",
            items: [
              { label: "مدرسه مهارت یاسین", href: "/work/yasin" },
              { label: "پایگاه علمی خبری دانه", href: "/work/dane-news" },
              { label: "فروشگاه مجسمه سعیدی", href: "/work/mojasame-saidi" },
              { label: "پلتفرم محتوایی کانتمو", href: "/work/contemo" },
              { label: "اکوسیستم خانه شمیم", href: "/work/shamim-house" },
            ],
          },
        ],
      },
      {
        q: "چه زمانی نکست جی اس انتخاب مناسبی نیست؟",
        a: "اگر سایت کوچکی می‌خواهید که فقط یک نفر از تیم‌تان بدون هیچ برنامه‌نویسی هر روز ساختارش را عوض کند، یک ابزار آماده ممکن است ساده‌تر باشد. نکست جی اس زمانی می‌ارزد که سرعت، سئو، امنیت یا قابلیت‌های اختصاصی برای کسب‌وکارتان مهم است. در بررسی رایگان صادقانه می‌گوییم کدام مناسب است.",
      },
    ],
    en: [
      {
        q: "What is Next.js and why is it good for SEO?",
        a: "Next.js is a React-based framework that builds each page on the server. The complete text reaches Google in the first response, so a search engine does not have to run JavaScript to see the content; that means easier indexing and faster loading on mobile.",
      },
      {
        q: "Why does server rendering matter for AI assistants?",
        a: "AI agents and assistants that read a page usually do not run JavaScript. If the text is only built after a script runs, they see an empty page. With server rendering, all text is in the first response and stays readable to search engines and AI assistants.",
      },
      {
        q: "Next.js or WordPress, which is better?",
        a: "WordPress starts quickly and is ready for content editing; Next.js is custom-built, so it stays faster, leaner and more secure but needs a developer for structural changes. With a headless CMS such as Payload, editing without a developer is possible too.",
        details: [
          {
            kind: "table",
            caption: "Next.js compared with WordPress",
            head: ["Criterion", "Next.js", "WordPress"],
            rows: [
              ["Speed", "Custom, lean code; only what is needed loads", "Depends on the theme and plugins"],
              ["Security", "Smaller attack surface; fewer third-party plugins", "Plugins are the main source of vulnerabilities and need constant updating"],
              ["Content editing", "Possible with a headless CMS such as Payload", "Ready and familiar from the start"],
              ["Maintenance cost", "Less tied to plugin updates; structural changes need a developer", "Constant updates to core, theme and plugins"],
              ["SEO", "Full control of structure, metadata and structured data", "Through an SEO plugin; less control of the code"],
            ],
          },
        ],
      },
      {
        q: "How is a bilingual site built with next-intl?",
        a: "next-intl is a library for routing and translation in Next.js. Each language gets its own URLs and full translation, with right-to-left layout for Persian. We built the ASA-Study platform on Next.js 15 with next-intl, with separate Persian and English pages and full RTL behaviour.",
        details: [{ kind: "links", items: [{ label: "ASA-Study admissions platform", href: "/work/asa-study" }] }],
      },
      {
        q: "How can content be edited without a developer?",
        a: "With a headless CMS behind Next.js. On Dane Scientific News we used Payload CMS so the newsroom manages posts, tags and authors itself, with editorial rules (source, lead, caption, image credit) validated.",
        details: [{ kind: "links", items: [{ label: "Dane Scientific News", href: "/work/dane-news" }] }],
      },
      {
        q: "Which projects have you built with Next.js?",
        a: "Yasin Skill School (Next.js 15), Dane Scientific News (Next.js 16), ASA-Study (Next.js 15 with next-intl), the Mojasame Saidi store (Next.js 15), the Contemo content platform and Shamim House (both Next.js 16), and this site.",
        details: [
          {
            kind: "links",
            items: [
              { label: "Yasin Skill School", href: "/work/yasin" },
              { label: "Dane Scientific News", href: "/work/dane-news" },
              { label: "Mojasame Saidi store", href: "/work/mojasame-saidi" },
              { label: "Contemo content platform", href: "/work/contemo" },
              { label: "Shamim House", href: "/work/shamim-house" },
            ],
          },
        ],
      },
      {
        q: "When is Next.js not the right choice?",
        a: "If you want a small site where one team member changes the structure every day without any development, a ready-made tool may be simpler. Next.js pays off when speed, SEO, security or custom features matter to your business. In the free audit we tell you honestly which fits.",
      },
    ],
  },

  // ======================================================================================= e-commerce (D3)
  ecommerce: {
    fa: [
      {
        q: "فروشگاه‌ساز آماده یا فروشگاه اختصاصی؟",
        a: "فروشگاه‌ساز آماده زودتر باز می‌شود و برای شروع ساده خوب است. فروشگاه اختصاصی حول شیوه‌ی فروش شما ساخته می‌شود: سریع‌تر است، شبیه برند شماست و امکاناتی مثل خرید هدایت‌شده یا سفارش اختصاصی را می‌پذیرد که قالب نمی‌دهد.",
        details: [
          {
            kind: "table",
            caption: "فروشگاه‌ساز آماده در برابر فروشگاه اختصاصی",
            head: ["معیار", "فروشگاه‌ساز آماده", "فروشگاه اختصاصی"],
            rows: [
              ["راه‌اندازی", "سریع‌تر", "زمان طراحی و ساخت لازم دارد"],
              ["ظاهر و تجربه‌ی خرید", "محدود به قالب‌های موجود", "حول برند و مسیر خرید شما"],
              ["امکانات خاص", "وابسته به افزونه‌های آماده", "هر چیزی که کسب‌وکار نیاز دارد"],
              ["سرعت و سئو", "وابسته به پلتفرم", "ساختار و سرعت از ابتدا برنامه‌ریزی می‌شود"],
              ["مالکیت", "وابسته به پلتفرم", "کد و داده‌ها مال شماست"],
            ],
          },
        ],
        // The same comparison, in long form, lives in /guides/custom-vs-store-builder.
      },
      {
        q: "سئوی فروشگاه اینترنتی چه چیزهایی دارد؟",
        a: "صفحه‌ی محصول و دسته‌بندی با عنوان و توضیح یکتا، آدرس‌های تمیز، سرعت بالا روی موبایل و داده‌ی ساختاریافته‌ی Product (نام، قیمت، موجودی) تا گوگل بتواند محصول را بشناسد. این کارها از ساخت فروشگاه شروع می‌شود، نه بعد از آن.",
        details: [
          {
            kind: "steps",
            items: [
              "عنوان، توضیح و آدرس یکتا برای هر محصول و دسته",
              "دسته‌بندی روشن که هم مشتری و هم گوگل را راهنمایی می‌کند",
              "داده‌ی ساختاریافته‌ی Product روی صفحه‌ی محصول",
              "سرعت بالا روی موبایل و تصویرهای بهینه",
              "نقشه‌ی سایت و آدرس‌های استاندارد",
            ],
          },
        ],
      },
      {
        q: "فروشگاه سبزینو چه چالشی داشت و چطور ساخته شد؟",
        a: "سبزینو، کسب‌وکار اجتماعی محصولات سبزی‌محور، ادویه‌های بین‌المللی و نوشیدنی‌های طبیعی، فروشگاه واقعی می‌خواست نه کاتالوگ. سبد خرید واکنش‌گرا، حساب مشتری، پرداخت آنلاین با زرین‌پال و پنل مدیریت مستقلی ساختیم که تیم خودش محصول، موجودی، قیمت و سفارش را اداره می‌کند.",
        details: [{ kind: "links", items: [{ label: "فروشگاه اجتماعی سبزینو", href: "/work/sabzino" }] }],
      },
      {
        q: "عطر نیرا چطور؟",
        a: "نیرا عطر اورجینال می‌فروشد و برای شرکت‌ها عطر اختصاصی می‌سازد. فروشگاه باید هر دو را با حس آرام و لوکس یک خانه‌ی عطر، به فارسی، نشان می‌داد. ویترین برندمحور، بخش ساخت عطر سازمانی، گالری و آرشیو و جست‌وجوی محصول و سبد خرید را ساختیم.",
        details: [{ kind: "links", items: [{ label: "عطر نیرا", href: "/work/nira-perfume" }] }],
      },
      {
        q: "فروشگاه مجسمه سعیدی چه ویژگی‌هایی دارد؟",
        a: "فروشگاه پریمیوم فارسی برای مجسمه و دکور دست‌ساز است؛ اثر دست‌ساز باید دیده شود و روی موبایل حس لوکس بدهد. فروشگاه موبایل‌محور و سئومحور با دسته‌بندی روشن، سبد خرید پایدار، فرم‌های اعتبارسنجی‌شده در مسیر خرید و لایه‌ی داده‌ی آماده‌ی تولید با Prisma و PostgreSQL ساخته شد.",
        details: [{ kind: "links", items: [{ label: "فروشگاه مجسمه سعیدی", href: "/work/mojasame-saidi" }] }],
      },
      {
        q: "فروشگاه تخصصی علم‌کالا چه می‌کند؟",
        a: "خریدار تجهیزات آزمایشگاه، رباتیک یا کلاس معمولاً نمی‌داند کدام محصول به کارش می‌آید. علم‌کالا فروشگاهی هدایت‌شده است: کشف محصول بر پایه‌ی دسته‌بندی و محصولات منتخب، راهنمای کاربرد برای هر دسته و مسیر مشاوره‌محور برای خریدارانی که در انتخاب کمک می‌خواهند.",
        details: [{ kind: "links", items: [{ label: "فروشگاه تخصصی علم‌کالا", href: "/work/elm-kala" }] }],
      },
      {
        q: "پرداخت آنلاین و پنل مدیریت چطور کار می‌کند؟",
        a: "مشتری در تسویه‌حساب با درگاه ایرانی (مثل زرین‌پال که در سبزینو وصل کرده‌ایم) پرداخت می‌کند و سفارش در پنل مدیریت ثبت می‌شود. تیم شما از همان پنل محصول، موجودی، قیمت و سفارش‌ها را بدون برنامه‌نویس مدیریت می‌کند.",
      },
    ],
    en: [
      {
        q: "Store builder or custom online store?",
        a: "A store builder opens sooner and is fine for a simple start. A custom store is built around how you sell: it is faster, looks like your brand and supports features such as guided buying or a custom-order flow that a template does not.",
        details: [
          {
            kind: "table",
            caption: "Store builder compared with a custom store",
            head: ["Criterion", "Store builder", "Custom store"],
            rows: [
              ["Getting started", "Faster", "Needs design and build time"],
              ["Look and shopping experience", "Limited to the available templates", "Built around your brand and buying path"],
              ["Special features", "Depend on ready-made plugins", "Whatever the business needs"],
              ["Speed and SEO", "Depend on the platform", "Structure and speed planned from the start"],
              ["Ownership", "Depends on the platform", "Code and data are yours"],
            ],
          },
        ],
      },
      {
        q: "What does online-store SEO involve?",
        a: "Unique titles and descriptions for product and category pages, clean URLs, fast pages on mobile and Product structured data (name, price, availability) so Google can recognise the product. This work starts when the store is built, not after.",
        details: [
          {
            kind: "steps",
            items: [
              "A unique title, description and URL for every product and category",
              "A clear category structure that guides both customers and Google",
              "Product structured data on product pages",
              "Fast pages on mobile and optimised images",
              "Sitemap and standard URLs",
            ],
          },
        ],
      },
      {
        q: "What was the challenge with Sabzino and how was it built?",
        a: "Sabzino, a social enterprise selling vegetable-based products, international spices and natural drinks, wanted a real store, not a catalogue. We built a responsive cart, customer accounts, online payment through Zarinpal and an independent admin panel where the team manages products, stock, prices and orders.",
        details: [{ kind: "links", items: [{ label: "Sabzino online store", href: "/work/sabzino" }] }],
      },
      {
        q: "What about Nira Perfume?",
        a: "Nira sells original perfume and creates custom perfume for companies. The store had to present both with the calm, luxurious feel of a perfume house, in Persian. We built a brand-led storefront, a corporate perfume-creation section, gallery and archive pages, product search and a cart.",
        details: [{ kind: "links", items: [{ label: "Nira Perfume", href: "/work/nira-perfume" }] }],
      },
      {
        q: "What features does the Mojasame Saidi store have?",
        a: "A premium Persian store for handmade sculpture and decor, where each piece must be seen and feel luxurious on a phone. We built a mobile-first, SEO-focused store with clear categories, a persistent cart, validated forms in the checkout path and a production-ready data layer with Prisma and PostgreSQL.",
        details: [{ kind: "links", items: [{ label: "Mojasame Saidi store", href: "/work/mojasame-saidi" }] }],
      },
      {
        q: "What does the Elm-Kala store do?",
        a: "A buyer of laboratory, robotics or classroom equipment often does not know which product fits. Elm-Kala is a guided store: category-led discovery with featured products, a use-case guide for each category and a consultation-first path for buyers who need help choosing.",
        details: [{ kind: "links", items: [{ label: "Elm-Kala store", href: "/work/elm-kala" }] }],
      },
      {
        q: "How do online payment and the admin panel work?",
        a: "The customer pays at checkout through an Iranian gateway (such as Zarinpal, which we connected for Sabzino) and the order is recorded in the admin panel. Your team manages products, stock, prices and orders from there without a developer.",
      },
    ],
  },

  // ======================================================================================= corporate (D4)
  corporate: {
    fa: [
      {
        q: "یک سایت شرکتی چه صفحه‌هایی لازم دارد؟",
        a: "صفحه‌ی اصلی با یک پیشنهاد روشن، صفحه‌های خدمات، درباره‌ی ما، نمونه‌کارها و تماس. بقیه‌ی صفحه‌ها (وبلاگ، پرسش‌های متداول، فرصت‌های شغلی) به کسب‌وکار شما بستگی دارند و فقط در صورت نیاز اضافه می‌شوند.",
        details: [
          {
            kind: "steps",
            items: [
              "صفحه‌ی اصلی: پیشنهاد روشن و مسیر تماس",
              "خدمات: یک صفحه برای هر خدمت اصلی",
              "درباره‌ی ما: تیم و شیوه‌ی کار",
              "نمونه‌کار: پروژه‌های واقعی با توضیح چالش و نتیجه",
              "تماس: فرم، ایمیل و راه‌های ارتباطی",
            ],
          },
        ],
      },
      {
        q: "فرم‌ها چطور به ایمیل و CRM وصل می‌شوند؟",
        a: "فرم‌ها به ایمیل، تلگرام یا CRM شما وصل می‌شوند تا هر درخواست سر جایش برسد. با اتوماسیون هوش مصنوعی هم می‌شود هر پیام را در چند ثانیه جواب داد و پیگیری کرد، نه اینکه در صندوق ایمیل بماند.",
      },
      {
        q: "سایت شرکتی چطور اعتماد می‌سازد؟",
        a: "با چیزهای واقعی: نمونه‌کار تحویل‌شده، معرفی شفاف تیم، توضیح روشن روش کار و قیمت‌گذاری، و راه‌های تماس که کار می‌کنند. ادعای بی‌پشتوانه اعتماد نمی‌آورد؛ ما فقط چیزهایی را در سایت می‌گذاریم که بتوانید ثابتشان کنید.",
      },
      {
        q: "جامعه خیرین مدرسه‌ساز کشور چه نیازی داشت؟",
        a: "یک خیریه‌ی ملی جایی عمومی می‌خواست برای پروژه‌های اخیر، خبرهای همه‌ی استان‌ها و راه‌های روشن مشارکت خیرین. پرتال را با معماری اطلاعات بر پایه‌ی خبر، پروژه و استان، مسیرهای روشن مشارکت و طراحی فارسی واکنش‌گرا ساختیم.",
        details: [{ kind: "links", items: [{ label: "جامعه خیرین مدرسه‌ساز کشور", href: "/work/school-builders" }] }],
      },
      {
        q: "اکوسیستم خانه شمیم چطور؟",
        a: "خانه شمیم مجموعه‌ای از کسب‌وکارهای به‌هم‌پیوسته است و سایت باید نشان می‌داد این‌ها چطور کنار هم قرار می‌گیرند و راه ورود شریک‌ها را روشن می‌کرد. لندینگ داستان‌محور، فرم‌های ساختاریافته‌ی همکاری و یک سیستم طراحی مقیاس‌پذیر برای چند برند زیرمجموعه ساختیم.",
        details: [{ kind: "links", items: [{ label: "اکوسیستم خانه شمیم", href: "/work/shamim-house" }] }],
      },
      {
        q: "میکروشمیم، مرکز نوآوری، چه سایتی گرفت؟",
        a: "میکروشمیم یادگیری، کار اشتراکی و تولید محتوا را زیر یک سقف آورده است و سایت باید همه‌ی فضاها را روشن توضیح می‌داد. طراحی هنری بازیگوش با حال‌وهوای کلاژ و صفحه‌هایی برای مدرسه‌ی مهارت، فضای کار اشتراکی، استودیو محتوا و رویدادها ساختیم.",
        details: [{ kind: "links", items: [{ label: "میکروشمیم", href: "/work/microshamim" }] }],
      },
      {
        q: "چرا سایت شرکتی را بدون قالب بسازیم؟",
        a: "سایت شرکتی اولین برداشت مشتری از شماست. طراحی اختصاصی یعنی ساختار حول پیشنهاد شما نوشته می‌شود، سرعت و سئو از اول برنامه‌ریزی می‌شود و محتوا را تیم خودتان با CMS ویرایش می‌کند، بدون اینکه به قالب یا افزونه‌ی دیگران وابسته باشید.",
      },
    ],
    en: [
      {
        q: "Which pages does a corporate website need?",
        a: "A home page built around one clear offer, service pages, an about page, case studies and a contact page. Other pages (blog, FAQ, careers) depend on your business and are added only if needed.",
        details: [
          {
            kind: "steps",
            items: [
              "Home page: a clear offer and a path to contact",
              "Services: one page per core service",
              "About: the team and how you work",
              "Case studies: real projects with the challenge and the outcome",
              "Contact: a form, email and other ways to reach you",
            ],
          },
        ],
      },
      {
        q: "How do forms connect to email and a CRM?",
        a: "Forms connect to your email, Telegram or CRM so every request reaches the right place. With AI automation, every message can also be answered and followed up in seconds instead of waiting in an inbox.",
      },
      {
        q: "How does a corporate site build trust?",
        a: "With real things: delivered case studies, a transparent introduction of the team, a clear account of how you work and price, and contact channels that work. Unsupported claims do not build trust; we only put things on a site that you can prove.",
      },
      {
        q: "What did the Iran School-Builders Charity need?",
        a: "A national charity wanted a public place for recent projects, news from every province and clear ways for donors to take part. We built the portal with information architecture based on news, projects and provinces, clear participation paths and responsive Persian design.",
        details: [{ kind: "links", items: [{ label: "Iran School-Builders Charity", href: "/work/school-builders" }] }],
      },
      {
        q: "What about the Shamim House ecosystem?",
        a: "Shamim House is a set of connected ventures, and the site had to show how they fit together and make the way in for partners clear. We built a story-led landing page, structured partnership forms and a scalable design system for several sub-brands.",
        details: [{ kind: "links", items: [{ label: "Shamim House", href: "/work/shamim-house" }] }],
      },
      {
        q: "What site did the Microshamim innovation hub get?",
        a: "Microshamim brings learning, coworking and content production under one roof, and the site had to explain every space clearly. We built a playful, art-directed collage design with pages for the skills school, coworking, content studio and events.",
        details: [{ kind: "links", items: [{ label: "Microshamim", href: "/work/microshamim" }] }],
      },
      {
        q: "Why build a corporate site without a template?",
        a: "A corporate site is the customer's first impression of you. A custom design means the structure is written around your offer, speed and SEO are planned from the start, and your own team edits content in a CMS without depending on someone else's template or plugins.",
      },
    ],
  },

  // ======================================================================================= bilingual (D5)
  bilingual: {
    fa: [
      {
        q: "ساختار آدرس در سایت دوزبانه چطور باید باشد؟",
        a: "هر زبان آدرس جدا دارد: مثلاً زبان اصلی روی ریشه (/) و زبان دوم زیر یک پیشوند (/en). هر صفحه در هر دو زبان وجود دارد و به معادلش لینک می‌دهد. این خیلی بهتر از یک آدرس است که با جاوااسکریپت زبانش عوض می‌شود، چون گوگل فقط آدرس‌های جدا را ایندکس می‌کند.",
      },
      {
        q: "hreflang چیست و چرا لازم است؟",
        a: "hreflang برچسبی است که به گوگل می‌گوید این صفحه معادل کدام صفحه در زبان دیگر است تا کاربر فارسی نسخه‌ی فارسی و کاربر انگلیسی نسخه‌ی انگلیسی را ببیند. هر دو صفحه باید به هم اشاره کنند و یک نسخه به‌عنوان x-default مشخص شود.",
        details: [
          { kind: "p", text: "نمونه (در بخش head صفحه‌ی فارسی): hreflang=\"fa\" برای همین صفحه، hreflang=\"en\" برای معادل انگلیسی، و hreflang=\"x-default\" برای نسخه‌ی پیش‌فرض. همین سایت از همین الگو استفاده می‌کند." },
        ],
      },
      {
        q: "راست‌به‌چپ (RTL) واقعی یعنی چه؟",
        a: "یعنی فقط متن را راست‌چین نکنیم؛ چیدمان، آیکن‌ها، جهت فلش‌ها، ترتیب ستون‌ها، فونت فارسی، ارقام فارسی و فاصله‌ی حروف همه برای فارسی تنظیم شوند. نیم‌فاصله و حروف درست (ی و ک فارسی) هم جزو کار است.",
        details: [
          {
            kind: "steps",
            items: [
              "چیدمان و ترتیب ستون‌ها آینه می‌شود",
              "جهت فلش‌ها و آیکن‌ها درست می‌شود",
              "فونت فارسی مناسب و وزن‌های لازم",
              "ارقام فارسی در متن فارسی",
              "نیم‌فاصله و ی و ک فارسی",
            ],
          },
        ],
      },
      {
        q: "ویرایش محتوا در دو زبان چطور مدیریت می‌شود؟",
        a: "محتوای هر دو زبان از یک جا و با یک ساختار مدیریت می‌شود تا هیچ صفحه‌ای فقط در یک زبان نماند و هیچ بخشی فراموش نشود. در ASA-Study هر دانشگاه یک سند مستقل و دوزبانه است که آماده‌ی CMS ساخته شد.",
        details: [{ kind: "links", items: [{ label: "سامانه پذیرش ASA-Study", href: "/work/asa-study" }] }],
      },
      {
        q: "ASA-Study چطور یک سایت دوزبانه شد؟",
        a: "دانشجوی بین‌المللی برای انتخاب دانشگاه در ایران باید شهرها، دانشگاه‌ها و رشته‌ها را به زبان خودش مقایسه کند. مسیریابی فارسی و انگلیسی با رفتار کامل راست‌به‌چپ، فهرست قابل جست‌وجوی دانشگاه‌ها با فیلتر شهر و پروفایل داده‌محور برای هر دانشگاه ساختیم.",
      },
      {
        q: "اشتباه‌های رایج در طراحی سایت دوزبانه چیست؟",
        a: "ترجمه‌ی ماشینی بدون بازبینی، آینه‌کردن ساده‌ی صفحه‌ی انگلیسی برای فارسی، یک آدرس واحد با تغییر زبان توسط جاوااسکریپت، نبودن hreflang، و مخلوط شدن ارقام و فونت‌ها. هر کدام یا تجربه‌ی کاربر را خراب می‌کند یا سئو را.",
        details: [
          {
            kind: "steps",
            items: [
              "ترجمه‌ی ماشینی که کسی بازبینی نکرده",
              "نسخه‌ی راست‌به‌چپ که فقط آینه‌ی نسخه‌ی انگلیسی است",
              "یک آدرس برای هر دو زبان",
              "نبودن hreflang یا اشاره‌ی یک‌طرفه",
              "ارقام و فونت‌های مخلوط",
            ],
          },
        ],
      },
    ],
    en: [
      {
        q: "How should the URLs of a bilingual site be structured?",
        a: "Each language has its own URLs: for example the main language at the root (/) and the second under a prefix (/en). Every page exists in both languages and links to its counterpart. This is much better than one URL that switches language with JavaScript, since Google indexes separate URLs.",
      },
      {
        q: "What is hreflang and why is it needed?",
        a: "hreflang is a tag that tells Google which page is the equivalent in another language, so a Persian reader gets the Persian page and an English reader the English one. Both pages must point at each other, and one version is marked x-default.",
        details: [
          { kind: "p", text: "Example (in the head of the Persian page): hreflang=\"fa\" for the page itself, hreflang=\"en\" for its English equivalent and hreflang=\"x-default\" for the default version. This site uses exactly this pattern." },
        ],
      },
      {
        q: "What does real right-to-left (RTL) mean?",
        a: "It means not just right-aligning the text: layout, icons, arrow direction, column order, the Persian typeface, Persian digits and letter spacing are all set for Persian. Correct zero-width spaces and Persian letterforms are part of the work.",
        details: [
          {
            kind: "steps",
            items: [
              "Layout and column order are mirrored",
              "Arrow and icon direction is corrected",
              "A suitable Persian typeface and the weights needed",
              "Persian digits in Persian text",
              "Zero-width spaces and Persian letterforms",
            ],
          },
        ],
      },
      {
        q: "How is content edited in two languages?",
        a: "Content for both languages is managed from one place with one structure, so no page exists in only one language and nothing is forgotten. In ASA-Study each university is an independent bilingual document, built to be CMS-ready.",
        details: [{ kind: "links", items: [{ label: "ASA-Study admissions platform", href: "/work/asa-study" }] }],
      },
      {
        q: "How did ASA-Study become a bilingual site?",
        a: "An international student choosing a university in Iran must compare cities, universities and programmes in their own language. We built Persian and English routing with full right-to-left behaviour, a searchable university list with a city filter and a data-driven profile for each university.",
      },
      {
        q: "What are common mistakes in bilingual website design?",
        a: "Unreviewed machine translation, simply mirroring the English page for Persian, one URL with JavaScript switching the language, missing hreflang, and mixed digits and typefaces. Each one either ruins the user experience or the SEO.",
        details: [
          {
            kind: "steps",
            items: [
              "Machine translation nobody reviewed",
              "A right-to-left version that is only a mirror of the English one",
              "One URL for both languages",
              "Missing or one-way hreflang",
              "Mixed digits and typefaces",
            ],
          },
        ],
      },
    ],
  },

  // ======================================================================================= redesign (D6)
  redesign: {
    fa: [
      {
        q: "چک‌لیست انتقال سایت بدون افت سئو چیست؟",
        a: "پنج کار: فهرست کردن همه‌ی آدرس‌های فعلی، ریدایرکت دائمی (۳۰۱) برای هر آدرس قدیمی به معادل جدیدش، حفظ عنوان‌ها و محتوای صفحه‌های پرترافیک، ثبت نقشه‌ی سایت جدید و پایش گزارش‌های Search Console بعد از انتشار.",
        details: [
          {
            kind: "steps",
            items: [
              "نقشه‌ی آدرس‌ها: فهرست کامل آدرس‌های قدیمی و جدید",
              "ریدایرکت ۳۰۱ برای هر آدرس قدیمی",
              "حفظ عنوان‌ها و محتوای صفحه‌های پرترافیک",
              "ثبت نقشه‌ی سایت جدید در Search Console",
              "پایش بعد از انتشار: خطاهای ۴۰۴ و تغییر ایندکس",
            ],
          },
        ],
      },
      {
        q: `پایگاه علمی خبری دانه چطور از وردپرس منتقل شد؟`,
        a: `دانه روی وردپرس بود. ${fa(dane.migratedPosts)} مطلب با ${fa(dane.categoriesBefore)} دسته، ${fa(dane.tags)} برچسب و ${fa(dane.authors)} نویسنده به پلتفرم اختصاصی Next.js و Payload CMS منتقل شد، طبقه‌بندی به ${fa(dane.categoriesAfter)} دسته و ${fa(dane.topics)} موضوع بازطراحی شد و ${fa(dane.redirects)} ریدایرکت دائمی گذاشتیم تا هیچ لینک قدیمی نشکند.`,
        details: [{ kind: "links", items: [{ label: "نمونه‌کار: پایگاه علمی خبری دانه", href: "/work/dane-news" }] }],
      },
      {
        q: "طبقه‌بندی شلوغ چطور مرتب می‌شود؟",
        a: `قبل از انتقال، دسته‌ها و برچسب‌ها را بازنگری می‌کنیم: در دانه ${fa(dane.categoriesBefore)} دسته و ${fa(dane.tags)} برچسب به ${fa(dane.categoriesAfter)} دسته و ${fa(dane.topics)} موضوع تبدیل شد. طبقه‌بندی ساده‌تر هم برای مخاطب بهتر است و هم برای گوگل.`,
      },
      {
        q: "ریدایرکت ۳۰۱ چیست و چرا مهم است؟",
        a: "ریدایرکت ۳۰۱ به مرورگر و گوگل می‌گوید صفحه برای همیشه به آدرس جدید رفته است. بدون آن، لینک‌های قدیمی خطای ۴۰۴ می‌دهند و اعتباری که آن صفحه‌ها در گوگل داشتند از دست می‌رود. برای هر آدرس قدیمی یک مقصد مشخص تعریف می‌کنیم.",
      },
      {
        q: "سایت در طول بازطراحی آنلاین می‌ماند؟",
        a: "بله. سایت جدید جداگانه ساخته و تست می‌شود و فقط وقتی آماده شد جای قبلی را می‌گیرد. می‌شود سایت فعلی را هم قدم‌به‌قدم بهتر کرد؛ مثلاً اول اتوماسیون را به آن وصل کنیم و بازطراحی را بعداً انجام دهیم.",
      },
      {
        q: "بعد از انتشار سایت جدید چه چیزهایی را پایش می‌کنید؟",
        a: "تعداد صفحه‌های ایندکس‌شده، خطاهای ۴۰۴ و ریدایرکت‌ها، تغییر نمایش و کلیک در Search Console و سرعت صفحه‌ها. اگر چیزی از مسیر خارج شود، سریع اصلاح می‌شود؛ پایش بعد از تحویل جزو هر همکاری است.",
      },
    ],
    en: [
      {
        q: "What is the checklist for migrating a site without losing SEO?",
        a: "Five jobs: list every current URL, add a permanent (301) redirect from each old URL to its new equivalent, keep titles and content on high-traffic pages, submit the new sitemap and monitor Search Console reports after launch.",
        details: [
          {
            kind: "steps",
            items: [
              "URL map: a full list of old and new addresses",
              "A 301 redirect for every old URL",
              "Keep titles and content on high-traffic pages",
              "Submit the new sitemap in Search Console",
              "Monitor after launch: 404 errors and index changes",
            ],
          },
        ],
      },
      {
        q: "How was Dane Scientific News moved off WordPress?",
        a: `Dane ran on WordPress. ${en(dane.migratedPosts)} posts with ${en(dane.categoriesBefore)} categories, ${en(dane.tags)} tags and ${en(dane.authors)} authors moved to a custom Next.js and Payload CMS platform, the taxonomy was redesigned into ${en(dane.categoriesAfter)} categories and ${en(dane.topics)} topics, and ${en(dane.redirects)} permanent redirects kept every old link working.`,
        details: [{ kind: "links", items: [{ label: "Case study: Dane Scientific News", href: "/work/dane-news" }] }],
      },
      {
        q: "How is a sprawling taxonomy tidied?",
        a: `Before the move we review categories and tags: at Dane ${en(dane.categoriesBefore)} categories and ${en(dane.tags)} tags became ${en(dane.categoriesAfter)} categories and ${en(dane.topics)} topics. A simpler taxonomy is better for readers and for Google.`,
      },
      {
        q: "What is a 301 redirect and why does it matter?",
        a: "A 301 redirect tells browsers and Google that a page has moved to a new address for good. Without it, old links return a 404 error and the standing those pages had in Google is lost. We define a specific destination for every old URL.",
      },
      {
        q: "Does the site stay online during a redesign?",
        a: "Yes. The new site is built and tested separately and replaces the old one only when it is ready. We can also improve the current site step by step, for example by connecting automation first and redesigning later.",
      },
      {
        q: "What do you monitor after launch?",
        a: "The number of indexed pages, 404 errors and redirects, changes in impressions and clicks in Search Console, and page speed. If anything drifts it is corrected quickly; monitoring after handover is part of every engagement.",
      },
    ],
  },

  // ======================================================================================= cost guide (D9)
  "website-design-cost": {
    fa: [
      {
        q: "طراحی سایت در چند سطح انجام می‌شود و هر سطح چه دارد؟",
        a: "چهار سطح معمول: سایت معرفی یا لندینگ، سایت شرکتی، سایت فروشگاهی و پلتفرم یا وب‌اپ. هر سطح نسبت به قبلی صفحه‌ها، امکانات و اتصال‌های بیشتری دارد و برای همین زمان و هزینه‌اش بیشتر است.",
        details: [
          {
            kind: "table",
            caption: "سطح‌های طراحی سایت و آنچه شامل می‌شوند (قیمت هر سطح بعد از بررسی رایگان و به‌صورت قطعی اعلام می‌شود)",
            head: ["سطح", "برای چه کسی", "معمولاً شامل"],
            rows: [
              ["سایت معرفی / لندینگ‌پیج", "معرفی یک پیشنهاد یا کمپین", "یک تا چند صفحه، فرم تماس، سرعت و سئوی پایه"],
              ["سایت شرکتی", "شرکت یا سازمانی که می‌خواهد حرفه‌ای دیده شود", "صفحه‌های خدمات، درباره، نمونه‌کار و تماس؛ CMS؛ اتصال فرم به ایمیل یا CRM"],
              ["سایت فروشگاهی", "فروش آنلاین محصول", "دسته‌بندی، سبد خرید، پرداخت آنلاین، حساب مشتری و پنل مدیریت"],
              ["پلتفرم یا وب‌اپ", "محصولی با حساب کاربری و منطق اختصاصی", "طراحی محصول، دیتابیس، API، پنل مدیریت و نگهداری"],
            ],
          },
        ],
      },
      {
        q: "طراحی با قالب آماده یا اختصاصی، از نظر هزینه چه فرقی دارد؟",
        a: "قالب آماده هزینه‌ی شروع کمتری دارد؛ طراحی اختصاصی هزینه‌ی شروع بیشتر ولی کنترل کامل روی ظاهر، سرعت و سئو، و وابستگی کمتر به افزونه‌ها دارد. مقایسه‌ی منصفانه باید هزینه‌ی نگهداری و محدودیت‌های سال‌های بعد را هم بشمارد، نه فقط قیمت روز اول را.",
      },
      {
        q: "از هر شرکت یا آژانس طراحی سایت چه بپرسیم؟",
        a: "قبل از انتخاب، این سؤال‌ها را از هر آژانسی بپرسید و جواب‌ها را مکتوب بخواهید. جواب‌های روشن به این سؤال‌ها نشانه‌ی شفاف بودن همکاری است.",
        details: [
          {
            kind: "steps",
            items: [
              "قیمت و دامنه‌ی کار مکتوب است و فقط برای همان دامنه پرداخت می‌کنم؟",
              "کد، دامنه و حساب‌های هاست به نام چه کسی است؟",
              "بعد از تحویل چه پشتیبانی‌ای هست و تا کی؟",
              "سایت با قالب آماده ساخته می‌شود یا اختصاصی؟",
              "چه کسی محتوا را می‌نویسد و ویرایش آن بعداً چطور است؟",
              "سرعت روی موبایل و سئوی پایه جزو کار است؟",
              "نمونه‌کار واقعی و قابل بررسی دارید؟",
            ],
          },
        ],
      },
    ],
    en: [
      {
        q: "What levels of website design are there and what does each include?",
        a: "Four common levels: an intro site or landing page, a corporate site, an online store and a platform or web app. Each adds pages, features and integrations over the previous one, which is why it takes more time and costs more.",
        details: [
          {
            kind: "table",
            caption: "Website design levels and what they include (the price of each level is stated as a fixed quote after the free audit)",
            head: ["Level", "For whom", "Usually includes"],
            rows: [
              ["Intro site / landing page", "Presenting one offer or campaign", "One to a few pages, a contact form, speed and baseline SEO"],
              ["Corporate site", "A company or organisation that wants to look professional", "Service, about, case-study and contact pages; a CMS; forms connected to email or a CRM"],
              ["Online store", "Selling products online", "Categories, cart, online payment, customer accounts and an admin panel"],
              ["Platform or web app", "A product with accounts and custom logic", "Product design, database, API, admin panel and maintenance"],
            ],
          },
        ],
      },
      {
        q: "What is the cost difference between a template and a custom design?",
        a: "A template has a lower starting cost; a custom design costs more at the start but gives full control of look, speed and SEO and less dependence on plugins. A fair comparison counts maintenance and the limits you will hit in later years, not just day-one price.",
      },
      {
        q: "What should you ask any website design agency?",
        a: "Before choosing, ask every agency these questions and get the answers in writing. Clear answers to them are a sign of a transparent engagement, and vague ones are worth a follow-up before you sign.",
        details: [
          {
            kind: "steps",
            items: [
              "Are price and scope written down, and do I only pay for that scope?",
              "Whose name are the code, domain and hosting accounts in?",
              "What support is there after delivery, and for how long?",
              "Is the site built from a template or custom?",
              "Who writes the content, and how do I edit it later?",
              "Are mobile speed and baseline SEO part of the work?",
              "Do you have real case studies I can check?",
            ],
          },
        ],
      },
    ],
  },
};
