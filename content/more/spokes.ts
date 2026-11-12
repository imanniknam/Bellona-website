import type { Answer } from "../spokes";
import type { Locale } from "../types";

/**
 * Extra questions for the sub-pages and guides (SEO-GUIDELINE D2–D6, D9), keyed by spoke slug. content/spokes.ts
 * inserts them before each page's last answer. Every claim about Bellona comes from content/work.ts or
 * content/facts.ts; general explanations (what Next.js is, how hreflang works) are labeled as general.
 * TODO(owner): a price range per level for the cost guide, CMS choice and typical timelines
 * (docs/seo/QUESTIONS_FOR_TEAM.md #3, #4, #30); they stay out of the text until confirmed.
 */
type More = Record<string, Record<Locale, Answer[]>>;


export const more: More = {
  // ======================================================================================= Next.js (D2)
  nextjs: {
    fa: [
      {
        q: "نکست جی اس (Next.js) چیست و چرا برای سئو مناسب است؟",
        a: "نکست جی اس (Next.js) چارچوبی بر پایه‌ی React برای ساخت سایت است که صفحه را کامل روی سرور می‌سازد. متن کامل در همان پاسخ اول به گوگل می‌رسد و موتور جست‌وجو برای دیدن محتوا لازم نیست جاوااسکریپت اجرا کند؛ یعنی نمایه شدن راحت‌تر و بارگذاری سریع‌تر روی موبایل.",
      },
      {
        q: "رندر سمت سرور چه کمکی به دیده شدن در هوش مصنوعی می‌کند؟",
        a: "دستیارهای هوش مصنوعی که صفحه‌ها را می‌خوانند معمولاً جاوااسکریپت اجرا نمی‌کنند. اگر متن فقط پس از اجرای اسکریپت ساخته شود، صفحه را خالی می‌بینند. در رندر سمت سرور، همه‌ی متن در همان پاسخ اول است و هم برای موتور جست‌وجو خواناست و هم برای دستیار هوش مصنوعی.",
      },
      {
        q: "نکست جی اس بهتر است یا وردپرس؟",
        a: "وردپرس زود راه می‌افتد و برای ویرایش محتوا آماده است؛ نکست جی اس اختصاصی ساخته می‌شود و سریع‌تر، سبک‌تر و امن‌تر می‌ماند، ولی تغییر ساختارش برنامه‌نویس می‌خواهد. با یک CMS هدلس مثل Payload، ویرایش بی‌برنامه‌نویس هم ممکن است.",
        details: [
          {
            kind: "table",
            caption: "مقایسه‌ی نکست جی اس و وردپرس (Next.js و WordPress)",
            head: ["معیار", "Next.js", "وردپرس"],
            rows: [
              ["سرعت", "کد اختصاصی و سبک؛ فقط آنچه لازم است بار می‌شود", "وابسته به قالب و افزونه‌ها"],
              ["امنیت", "نقاط نفوذ کمتر؛ افزونه‌ی شخص ثالث کمتر", "افزونه‌ها بزرگ‌ترین منشأ آسیب‌پذیری‌اند و مدام به‌روزرسانی می‌خواهند"],
              ["ویرایش محتوا", "با CMS هدلس (مثل Payload) ممکن است", "از اول آماده و آشنا"],
              ["هزینه‌ی نگهداری", "وابستگی کمتر به به‌روزرسانی افزونه‌ها؛ تغییر ساختار با برنامه‌نویس", "به‌روزرسانی پیوسته‌ی هسته، قالب و افزونه‌ها"],
              ["سئو", "کنترل کامل روی ساختار، متادیتا و داده‌ی ساختاریافته", "با افزونه‌ی سئو؛ کنترل کمتر بر کد"],
            ],
          },
        ],
      },
      {
        q: "سایت دوزبانه با next-intl چطور ساخته می‌شود؟",
        a: "next-intl کتابخانه‌ای برای مسیرها و ترجمه در نکست جی اس است. هر زبان آدرس و ترجمه‌ی کامل خودش را می‌گیرد و فارسی چیدمان راست‌چین دارد. صفحه‌های فارسی و انگلیسی با رفتار کامل راست‌چین و چپ‌چین کار می‌کنند.",
        details: [],
      },
      {
        q: "ویرایش محتوا بی‌برنامه‌نویس چطور ممکن است؟",
        a: "با یک CMS هدلس که پشت نکست جی اس قرار می‌گیرد. Payload CMS یکی از گزینه‌هاست تا تحریریه خودش مطلب‌ها، برچسب‌ها و نویسنده‌ها را مدیریت کند و قواعد تحریریه (منبع، لید خبر، زیرنویس، اعتبار تصویر) پیش از انتشار بررسی شود.",
        details: [],
      },
      {
        q: "با نکست جی اس چه پروژه‌هایی ساخته‌اید؟",
        a: "فروشگاه مجسمه سعیدی (Next.js 15) و همین سایت.",
        details: [
          {
            kind: "links",
            items: [
              
              
              { label: "فروشگاه مجسمه سعیدی", href: "/work/mojasame-saidi" },
              
              
            ],
          },
        ],
      },
      {
        q: "نکست جی اس کجا انتخاب مناسبی نیست؟",
        a: "اگر سایت کوچکی می‌خواهید که یک نفر از تیمتان بی‌هیچ برنامه‌نویسی هر روز ساختارش را عوض کند، شاید یک ابزار آماده ساده‌تر باشد. نکست جی اس وقتی می‌ارزد که سرعت، سئو، امنیت یا امکانات اختصاصی برای کسب‌وکارتان مهم باشد. در بررسی رایگان رک می‌گوییم کدام به کارتان می‌آید.",
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
        a: "next-intl is a library for routing and translation in Next.js. Each language gets its own URLs and full translation, with right-to-left layout for Persian. Persian and English pages work separately, with full right-to-left and left-to-right behavior.",
        details: [],
      },
      {
        q: "How can content be edited without a developer?",
        a: "With a headless CMS behind Next.js. Payload CMS is one option, so the newsroom manages posts, tags and authors itself, with editorial rules (source, lead, caption, image credit) validated.",
        details: [],
      },
      {
        q: "Which projects have you built with Next.js?",
        a: "The Mojasame Saidi store (Next.js 15) and this site.",
        details: [
          {
            kind: "links",
            items: [
              
              
              { label: "Mojasame Saidi store", href: "/work/mojasame-saidi" },
              
              
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
        a: "فروشگاه‌ساز آماده زودتر راه می‌افتد و برای شروع ساده خوب است. فروشگاه اختصاصی بر پایه‌ی شیوه‌ی فروش شما ساخته می‌شود: سریع‌تر است، شبیه برند شماست و امکاناتی مثل راهنمایی در خرید یا سفارش اختصاصی را دارد که قالب‌ها ندارند.",
        details: [
          {
            kind: "table",
            caption: "فروشگاه‌ساز آماده در برابر فروشگاه اختصاصی",
            head: ["معیار", "فروشگاه‌ساز آماده", "فروشگاه اختصاصی"],
            rows: [
              ["راه‌اندازی", "سریع‌تر", "به زمان طراحی و ساخت نیاز دارد"],
              ["ظاهر و تجربه‌ی خرید", "محدود به قالب‌های موجود", "بر پایه‌ی برند و مسیر خرید شما"],
              ["امکانات خاص", "وابسته به افزونه‌های آماده", "هر چه کسب‌وکارتان لازم دارد"],
              ["سرعت و سئو", "وابسته به پلتفرم", "ساختار و سرعت از اول برنامه‌ریزی می‌شود"],
              ["مالکیت", "وابسته به پلتفرم", "کد و داده‌ها مال شماست"],
            ],
          },
        ],
        // The same comparison, in long form, lives in /guides/custom-vs-store-builder.
      },
      {
        q: "سئوی فروشگاه اینترنتی چه چیزهایی را در بر می‌گیرد؟",
        a: "صفحه‌ی محصول و دسته با عنوان و توضیح یکتا، آدرس‌های تمیز، سرعت بالا روی موبایل و داده‌ی ساختاریافته‌ی Product (نام، قیمت، موجودی) تا گوگل محصول را بشناسد. این کارها از همان ساخت فروشگاه شروع می‌شود، نه بعد از آن.",
        details: [
          {
            kind: "steps",
            items: [
              "عنوان، توضیح و آدرس یکتا برای هر محصول و دسته",
              "دسته‌بندی روشن که هم مشتری را راهنمایی می‌کند و هم گوگل را",
              "داده‌ی ساختاریافته‌ی Product روی صفحه‌ی محصول",
              "سرعت بالا روی موبایل و تصویرهای بهینه",
              "نقشه‌ی سایت و آدرس‌های استاندارد",
            ],
          },
        ],
      },
      {
        q: "عطر نیرا چه؟",
        a: "نیرا عطر اصل می‌فروشد و برای شرکت‌ها عطر اختصاصی می‌سازد. فروشگاه باید هر دو را با حس آرام و لوکس یک عطرسرا و به زبان فارسی نشان دهد. ویترین برندمحور، بخش ساخت عطر سازمانی، گالری و آرشیو، و جست‌وجوی محصول و سبد خرید را ساختیم.",
        details: [{ kind: "links", items: [{ label: "عطر نیرا", href: "/work/nira-perfume" }] }],
      },
      {
        q: "فروشگاه مجسمه سعیدی چه ویژگی‌هایی دارد؟",
        a: "فروشگاهی فارسی و لوکس برای مجسمه و دکور دست‌ساز؛ اثر دست‌ساز باید دیده شود و روی موبایل حس لوکس بدهد. فروشگاهی موبایل‌محور و سئومحور ساختیم با دسته‌بندی روشن، سبد خرید پایدار، فرم‌های خرید با بررسی خودکار ورودی‌ها و لایه‌ی داده‌ی آماده‌ی بهره‌برداری با Prisma و PostgreSQL.",
        details: [{ kind: "links", items: [{ label: "فروشگاه مجسمه سعیدی", href: "/work/mojasame-saidi" }] }],
      },
      {
        q: "پرداخت آنلاین و پنل مدیریت چطور کار می‌کند؟",
        a: "مشتری هنگام تسویه‌حساب از درگاهی ایرانی (مثل زرین‌پال) پرداخت می‌کند و سفارش در پنل مدیریت ثبت می‌شود. تیمتان از همان پنل، بی‌برنامه‌نویس، محصولات، موجودی، قیمت و سفارش‌ها را مدیریت می‌کند.",
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
        a: "Unique titles and descriptions for product and category pages, clean URLs, fast pages on mobile and Product structured data (name, price, availability) so Google can recognize the product. This work starts when the store is built, not after.",
        details: [
          {
            kind: "steps",
            items: [
              "A unique title, description and URL for every product and category",
              "A clear category structure that guides both customers and Google",
              "Product structured data on product pages",
              "Fast pages on mobile and optimized images",
              "Sitemap and standard URLs",
            ],
          },
        ],
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
        q: "How do online payment and the admin panel work?",
        a: "The customer pays at checkout through an Iranian gateway (such as Zarinpal) and the order is recorded in the admin panel. Your team manages products, stock, prices and orders from there without a developer.",
      },
    ],
  },

  // ======================================================================================= corporate (D4)
  corporate: {
    fa: [
      {
        q: "یک سایت شرکتی چه صفحه‌هایی لازم دارد؟",
        a: "صفحه‌ی اصلی با یک پیشنهاد روشن، صفحه‌های خدمات، درباره‌ی ما، نمونه‌کارها و تماس. صفحه‌های دیگر (وبلاگ، پرسش‌های متداول، فرصت‌های شغلی) به کسب‌وکار شما بستگی دارند و فقط در صورت نیاز اضافه می‌شوند.",
        details: [
          {
            kind: "steps",
            items: [
              "صفحه‌ی اصلی: پیشنهاد روشن و مسیر تماس",
              "خدمات: یک صفحه برای هر خدمت اصلی",
              "درباره‌ی ما: تیم و شیوه‌ی کار",
              "نمونه‌کار: پروژه‌های واقعی با شرح چالش و نتیجه",
              "تماس: فرم، ایمیل و راه‌های ارتباطی",
            ],
          },
        ],
      },
      {
        q: "فرم‌ها چطور به ایمیل و CRM وصل می‌شوند؟",
        a: "فرم‌ها به ایمیل، تلگرام یا CRM شما وصل می‌شوند تا هر درخواست به دست آدم درست برسد. با اتوماسیون هوش مصنوعی هم می‌شود به هر پیام در چند ثانیه جواب داد و پیگیری‌اش کرد، به‌جای آنکه در صندوق ایمیل بماند.",
      },
      {
        q: "سایت شرکتی چطور اعتماد می‌سازد؟",
        a: "با چیزهای واقعی: نمونه‌کار تحویل‌شده، معرفی شفاف تیم، توضیح روشن شیوه‌ی کار و قیمت‌گذاری، و راه‌های تماسی که واقعاً کار می‌کنند. ادعای بی‌پشتوانه اعتماد نمی‌سازد؛ فقط چیزهایی را در سایت می‌گذاریم که بشود ثابتشان کرد.",
      },
      {
        q: "چرا سایت شرکتی را بی‌قالب بسازیم؟",
        a: "سایت شرکتی اولین تصویری است که مشتری از شما می‌بیند. طراحی اختصاصی یعنی ساختار بر پایه‌ی پیشنهاد شما نوشته می‌شود، سرعت و سئو از اول برنامه‌ریزی می‌شود و تیم خودتان محتوا را با CMS ویرایش می‌کند، بی‌آنکه به قالب یا افزونه‌ی دیگران وابسته باشید.",
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
        a: "هر زبان آدرس جدا دارد: مثلاً زبان اصلی روی ریشه (/) و زبان دوم زیر یک پیشوند (/en). هر صفحه در هر دو زبان وجود دارد و به معادلش لینک می‌دهد. این خیلی بهتر از آدرس واحدی است که زبانش با جاوااسکریپت عوض می‌شود، چون گوگل فقط آدرس‌های جدا را نمایه می‌کند.",
      },
      {
        q: "hreflang چیست و چرا لازم است؟",
        a: "hreflang برچسبی است که به گوگل می‌گوید این صفحه معادل کدام صفحه در زبان دیگر است تا کاربر فارسی‌زبان نسخه‌ی فارسی و کاربر انگلیسی‌زبان نسخه‌ی انگلیسی را ببیند. هر دو صفحه باید به هم اشاره کنند و یک نسخه هم با x-default پیش‌فرض اعلام شود.",
        details: [
          { kind: "p", text: "نمونه (در بخش head صفحه‌ی فارسی): hreflang=\"fa\" برای همین صفحه، hreflang=\"en\" برای معادل انگلیسی و hreflang=\"x-default\" برای نسخه‌ی پیش‌فرض. همین سایت هم از همین الگو استفاده می‌کند." },
        ],
      },
      {
        q: "راست‌چین (RTL) واقعی یعنی چه؟",
        a: "یعنی فقط متن را راست‌چین نکنیم؛ چیدمان، آیکن‌ها، جهت فلش‌ها، ترتیب ستون‌ها، فونت فارسی، ارقام فارسی و فاصله‌ی حروف همه برای فارسی تنظیم شوند. نیم‌فاصله و حروف درست (ی و ک فارسی) هم بخشی از کار است.",
        details: [
          {
            kind: "steps",
            items: [
              "چیدمان و ترتیب ستون‌ها قرینه می‌شود",
              "جهت فلش‌ها و آیکن‌ها درست می‌شود",
              "فونت فارسی مناسب و وزن‌های لازم",
              "ارقام فارسی در متن فارسی",
              "نیم‌فاصله و ی و ک فارسی",
            ],
          },
        ],
      },
      {
        q: "محتوای دو زبان چطور مدیریت می‌شود؟",
        a: "محتوای هر دو زبان از یک جا و با یک ساختار مدیریت می‌شود تا هیچ صفحه‌ای فقط به یک زبان نماند و هیچ بخشی از قلم نیفتد.",
        details: [],
      },
      {
        q: "اشتباه‌های رایج در طراحی سایت دوزبانه چیست؟",
        a: "ترجمه‌ی ماشینیِ بازبینی‌نشده، قرینه کردن ساده‌ی صفحه‌ی انگلیسی برای فارسی، آدرس واحدی که زبانش با جاوااسکریپت عوض می‌شود، نبودن hreflang و قاطی شدن ارقام و فونت‌ها. هر کدام یا تجربه‌ی کاربر را خراب می‌کند یا سئو را.",
        details: [
          {
            kind: "steps",
            items: [
              "ترجمه‌ی ماشینی که کسی بازبینی نکرده",
              "نسخه‌ی راست‌چینی که فقط قرینه‌ی نسخه‌ی انگلیسی است",
              "یک آدرس برای هر دو زبان",
              "نبودن hreflang یا اشاره‌ی یک‌طرفه",
              "ارقام و فونت‌های قاطی",
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
        a: "Content for both languages is managed from one place with one structure, so no page exists in only one language and nothing is forgotten.",
        details: [],
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
        a: "پنج کار: فهرست کردن همه‌ی آدرس‌های فعلی، ریدایرکت دائمی (۳۰۱) از هر آدرس قدیمی به معادل تازه‌اش، حفظ عنوان‌ها و محتوای صفحه‌های پربازدید، ثبت نقشه‌ی سایت تازه و زیر نظر گرفتن گزارش‌های Search Console پس از انتشار.",
        details: [
          {
            kind: "steps",
            items: [
              "نقشه‌ی آدرس‌ها: فهرست کامل آدرس‌های قدیمی و جدید",
              "ریدایرکت ۳۰۱ برای هر آدرس قدیمی",
              "حفظ عنوان‌ها و محتوای صفحه‌های پربازدید",
              "ثبت نقشه‌ی سایت جدید در Search Console",
              "پایش پس از انتشار: خطاهای ۴۰۴ و تغییر نمایه‌شدن صفحه‌ها",
            ],
          },
        ],
      },
      {
        q: "دسته‌بندی شلوغ چطور سامان می‌گیرد؟",
        a: "پیش از انتقال، دسته‌ها و برچسب‌ها را بازبینی می‌کنیم و دسته‌بندی شلوغ را ساده می‌کنیم. دسته‌بندی ساده‌تر هم برای مخاطب بهتر است و هم برای گوگل.",
      },
      {
        q: "ریدایرکت ۳۰۱ چیست و چرا مهم است؟",
        a: "ریدایرکت ۳۰۱ به مرورگر و گوگل می‌گوید صفحه برای همیشه به آدرس تازه رفته است. بدون آن، لینک‌های قدیمی خطای ۴۰۴ می‌دهند و اعتباری که آن صفحه‌ها در گوگل داشتند از دست می‌رود. برای هر آدرس قدیمی یک مقصد مشخص تعریف می‌کنیم.",
      },
      {
        q: "سایت در طول بازطراحی در دسترس می‌ماند؟",
        a: "بله. نسخه‌ی تازه جدا از سایت فعلی ساخته و آزموده می‌شود و تا آماده نشده، جای آن را نمی‌گیرد. می‌شود سایت فعلی را هم قدم‌به‌قدم بهتر کرد؛ مثلاً اول اتوماسیون را به آن وصل کنیم و بازطراحی را بعد انجام دهیم.",
      },
      {
        q: "پس از انتشار سایت تازه چه چیزهایی را زیر نظر دارید؟",
        a: "تعداد صفحه‌های نمایه‌شده، خطاهای ۴۰۴ و ریدایرکت‌ها، تغییر نمایش و کلیک در Search Console و سرعت صفحه‌ها. اگر چیزی از مسیرش خارج شود، زود اصلاح می‌شود؛ پایش پس از تحویل بخشی از هر همکاری است.",
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
        q: "How is a sprawling taxonomy tidied?",
        a: "Before the move we review categories and tags and simplify a crowded taxonomy. A simpler taxonomy is better for readers and for Google.",
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

  // ======================================================================================= n8n (E1)
  n8n: {
    fa: [
      {
        q: "اتوماسیون n8n چیست و به چه کاری می‌آید؟",
        a: "n8n ابزار متن‌باز اتوماسیون گردش‌کار است که اپ‌ها و سرویس‌ها را با نودهای تصویری به هم وصل می‌کند. برای هر کاری که چند ابزار و چند قدم دارد مناسب است: پیگیری مشتری‌ها، به‌روزرسانی CRM، ساخت سند، گزارش روزانه، ارسال و دریافت ایمیل و اجرای ایجنت هوش مصنوعی وسط یک فرایند.",
        details: [{ kind: "links", items: [{ label: "راهنما: اتوماسیون پیگیری لید با n8n", href: "/guides/lead-follow-up-automation-n8n" }] }],
      },
      {
        q: "n8n روی سرور خودمان یعنی چه؟",
        a: "n8n را می‌شود روی سرویس ابری خودش اجرا کرد یا روی سرور خودتان. روی سرور خودتان، داده‌ها و اطلاعات ورود درون زیرساخت شما می‌مانند و برای گردش‌کارهای طولانی یا پر از هوش مصنوعی هم مناسب‌تر است. اگر بخواهید، n8n را روی سرور خودتان راه‌اندازی می‌کنیم.",
      },
      {
        q: "کدام فرایندها را اول خودکار کنیم؟",
        a: "فرایندی که هر روز تکرار می‌شود، وقت زیادی می‌گیرد و قاعده‌اش روشن است: پیگیری مشتری‌های تازه، ثبت اطلاعات در CRM، ساخت سند و گزارش روزانه. با یک فرایند شروع کنید و آن را از اول تا آخر خودکار کنید؛ این همان یک دوره‌ی اتوماسیون است.",
      },
      {
        q: "خطاها و پایداری گردش‌کارها چطور مدیریت می‌شود؟",
        a: "هشدار خطا جزو کار است: گردش‌کاری که خراب شود به تیم هشدار می‌دهد و بی‌صدا متوقف نمی‌شود. سیستم املاکی که ساختیم مدیریت متمرکز خطا و گزارش روزانه دارد و مستندات پشتیبان‌گیری و امنیت هم همراهش تحویل شد.",
      },
      {
        q: "تیم ما پس از تحویل چطور با آن کار می‌کند؟",
        a: "مستندات و آموزش تیم بخشی از کار است: می‌دانید چه چیزی کجا اجرا می‌شود، هشدارها را چطور بخوانید و چه چیزی را خودتان می‌توانید عوض کنید. پس از تحویل هم می‌توانید با همراهی ماهانه ادامه دهید تا گردش‌کارها گسترش پیدا کنند.",
      },
    ],
    en: [
      {
        q: "What is n8n automation and what is it good for?",
        a: "n8n is an open-source workflow automation tool that connects apps and services with visual nodes. It suits any job with several tools and several steps: following up leads, updating a CRM, creating documents, a daily report, sending and receiving email and running an AI agent in the middle of a process.",
        details: [{ kind: "links", items: [{ label: "Guide: automate lead follow-up with n8n", href: "/guides/lead-follow-up-automation-n8n" }] }],
      },
      {
        q: "What does n8n on our own server mean?",
        a: "n8n can run on its own cloud or on your server. On your own server, data and credentials stay inside your infrastructure, which also suits long or AI-heavy workflows. If you prefer, we set up n8n on your own server.",
      },
      {
        q: "Which processes should we automate first?",
        a: "One that repeats every day, takes a lot of time and has clear rules: following up new leads, logging information in a CRM, creating documents and the daily report. Start with one process and automate it end to end; that is exactly what one automation sprint is.",
      },
      {
        q: "How are errors and reliability handled?",
        a: "Error alerts are part of the work: a workflow that fails alerts the team and does not stop silently. Our real-estate system has central error handling and a daily digest, and backup and security documentation was prepared for handover.",
      },
      {
        q: "How does our team use it after handover?",
        a: "Documentation and team training are part of the work: you know what runs where, how to read the alerts and what you can change yourselves. After handover you can continue with the monthly partnership so the workflows keep growing.",
      },
    ],
  },

  // ======================================================================================= cost guide (D9)
  "website-design-cost": {
    fa: [
      {
        q: "طراحی سایت چند سطح دارد و هر سطح چه چیزهایی دارد؟",
        a: "چهار سطح رایج: سایت معرفی یا لندینگ، سایت شرکتی، سایت فروشگاهی و پلتفرم یا وب‌اپ. هر سطح نسبت به قبلی صفحه‌ها، امکانات و اتصال‌های بیشتری دارد و برای همین زمان و هزینه‌اش هم بیشتر است.",
        details: [
          {
            kind: "table",
            caption: "سطح‌های طراحی سایت و آنچه در بر دارند (قیمت هر سطح پس از بررسی رایگان و به‌صورت قطعی اعلام می‌شود)",
            head: ["سطح", "برای چه کسی", "معمولاً شامل"],
            rows: [
              ["سایت معرفی / لندینگ پیج", "معرفی یک پیشنهاد یا کمپین", "یک تا چند صفحه، فرم تماس، سرعت و سئوی پایه"],
              ["سایت شرکتی", "شرکت یا سازمانی که می‌خواهد حرفه‌ای دیده شود", "صفحه‌های خدمات، درباره‌ی ما، نمونه‌کار و تماس؛ CMS؛ اتصال فرم به ایمیل یا CRM"],
              ["سایت فروشگاهی", "فروش آنلاین محصول", "دسته‌بندی، سبد خرید، پرداخت آنلاین، حساب کاربری مشتری و پنل مدیریت"],
              ["پلتفرم یا وب‌اپ", "محصولی با حساب کاربری و منطق اختصاصی", "طراحی محصول، پایگاه داده، API، پنل مدیریت و نگهداری"],
            ],
          },
        ],
      },
      {
        q: "قالب آماده یا طراحی اختصاصی: از نظر هزینه چه فرقی دارند؟",
        a: "قالب آماده هزینه‌ی شروع کمتری دارد؛ طراحی اختصاصی در شروع گران‌تر است، ولی کنترل کامل بر ظاهر، سرعت و سئو و وابستگی کمتر به افزونه‌ها می‌دهد. مقایسه‌ی منصفانه باید هزینه‌ی نگهداری و محدودیت‌های سال‌های بعد را هم حساب کند، نه فقط قیمت روز اول را.",
      },
      {
        q: "پیشنهاد قیمت مکتوب باید چه چیزهایی داشته باشد؟",
        a: "دامنه‌ی دقیق کار (کدام صفحه‌ها و امکانات)، قیمت کل، زمان‌بندی، آنچه شامل نمی‌شود، تعداد دفعات اصلاح، مالکیت کد و دامنه و شرایط پشتیبانی پس از تحویل. هر کدام از این‌ها که در پیشنهاد نیاید، بعداً سرش اختلاف پیش می‌آید؛ پس پیش از امضا بخواهید روشن نوشته شوند.",
        details: [
          {
            kind: "steps",
            items: [
              "فهرست صفحه‌ها و امکاناتی که در کار هست",
              "قیمت کل و شیوه‌ی پرداخت",
              "تاریخ شروع و تحویل",
              "آنچه در کار نیست و هزینه‌ی اضافه کردنش",
              "تعداد دفعات اصلاح",
              "مالکیت کد، دامنه و حساب‌های هاست",
              "پشتیبانی پس از تحویل",
            ],
          },
        ],
      },
      {
        q: "چرا دو پیشنهاد برای «یک» سایت می‌توانند خیلی با هم فرق کنند؟",
        a: "چون «یک سایت» معنای ثابتی ندارد: یکی قالب آماده را شخصی‌سازی می‌کند و دیگری طراحی و کد اختصاصی می‌نویسد؛ یکی فقط چند صفحه می‌سازد و دیگری فرم، CMS، دوزبانگی و سئو را هم در بر دارد. پیش از مقایسه‌ی قیمت‌ها، دامنه‌ی کار هر پیشنهاد را کنار هم بگذارید.",
      },
      {
        q: "چطور جلوی هزینه‌های پنهان را بگیریم؟",
        a: "با قیمت قطعی و مکتوب برای دامنه‌ی مشخص، فهرست جداگانه‌ی هزینه‌های پس از راه‌اندازی (دامنه، هاست، سرویس‌های پولی، نگهداری) و روشن بودن اینکه تغییر دامنه‌ی کار چطور قیمت‌گذاری می‌شود. در بلونا قیمت قطعی پس از بررسی رایگان داده می‌شود و فقط برای دامنه‌ی توافق‌شده پرداخت می‌کنید.",
        details: [{ kind: "links", items: [{ label: "رزرو بررسی رایگان رشد", href: "/contact?need=web" }] }],
      },
      {
        q: "از هر شرکت یا آژانس طراحی سایت چه بپرسیم؟",
        a: "پیش از انتخاب، این سؤال‌ها را از هر آژانسی بپرسید و جواب‌ها را مکتوب بخواهید. جواب روشن به این سؤال‌ها نشانه‌ی همکاری شفاف است.",
        details: [
          {
            kind: "steps",
            items: [
              "قیمت و دامنه‌ی کار مکتوب است و فقط برای همان دامنه پرداخت می‌کنم؟",
              "کد، دامنه و حساب‌های هاست به نام چه کسی است؟",
              "پس از تحویل چه پشتیبانی‌ای هست و تا کی؟",
              "سایت با قالب آماده ساخته می‌شود یا اختصاصی است؟",
              "محتوا را چه کسی می‌نویسد و بعداً چطور ویرایش می‌شود؟",
              "سرعت روی موبایل و سئوی پایه هم جزو کار است؟",
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
              ["Corporate site", "A company or organization that wants to look professional", "Service, about, case-study and contact pages; a CMS; forms connected to email or a CRM"],
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
        q: "What should a written quote contain?",
        a: "The exact scope (which pages and features), the total price, the timeline, what is not included, the number of revision rounds, who owns the code and domain, and the support terms after delivery. If any of these is missing it becomes a point of dispute later, so ask for them to be written down before you sign.",
        details: [
          {
            kind: "steps",
            items: [
              "A list of the pages and features included",
              "The total price and how it is paid",
              "Start and delivery dates",
              "What is not included, and what adding it costs",
              "The number of revision rounds",
              "Ownership of code, domain and hosting accounts",
              "Support after delivery",
            ],
          },
        ],
      },
      {
        q: "Why can two quotes for \"a website\" differ so much?",
        a: "Because \"a website\" has no single meaning: one agency customizes a template while another designs and codes from scratch, one builds a few pages and another includes forms, a CMS, a second language and SEO. Before comparing prices, put the scope of each quote side by side.",
      },
      {
        q: "How do you avoid hidden costs?",
        a: "With a fixed, written price for a defined scope, a separate list of costs after launch (domain, hosting, paid services, maintenance), and clarity on how a change of scope is priced. At Bellona the fixed price comes after the free audit and you pay only for the agreed scope.",
        details: [{ kind: "links", items: [{ label: "Book the free growth audit", href: "/contact?need=web" }] }],
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
