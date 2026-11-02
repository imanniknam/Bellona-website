import type { Answer } from "../spokes";
import type { Locale } from "../types";

/**
 * Longer case studies (SEO-GUIDELINE v2, 5-1): a visitor's-eye tour, the decisions behind the project and the problem
 * it answers. Everything here restates what content/work.ts, the screenshots (content/work-alt.ts) and the project's
 * stack already say; no figure, result, date or quote is added.
 * TODO(owner): for every project, a measurable result and a client quote. Until they exist those sections are not
 * rendered (content/work.ts results: [] and no quote).
 * Merged into the case-study page before the closing "where do we start" question (content/more/projects.ts).
 */
type Extra = Record<string, Record<Locale, Answer[]>>;

const p = (text: string) => ({ kind: "p" as const, text });

export const extra: Extra = {
  // ======================================================================================= ai-real-estate-os
  "ai-real-estate-os": {
    fa: [
      {
        q: "بعد از تحویل، نگه‌داری سیستم املاک چطور است؟",
        a: "سیستم از اول برای تحویل ساخته شد: مدیریت متمرکز خطا، گزارش روزانه، و مستندات پشتیبان‌گیری و امنیت. تیم صاحب سیستم بداند چه چیزی کجا کار می‌کند و اگر اتصالی قطع شد، خبردار شود.",
        details: [
          p("گردش‌کارهای n8n یک نقطه‌ی مشترک برای خطا دارند، پس شکست یک مرحله بی‌صدا نمی‌ماند. گزارش روزانه هم نشان می‌دهد شب گذشته چه کارهایی انجام شده است. سندهای تحویل، یعنی راهنمای پشتیبان‌گیری و امنیت، به تیم کمک می‌کنند بدون وابستگی به سازنده سیستم را اداره کنند."),
          p("سایت kharazie.at بخش‌های پروژه‌های جاری، خرید مستقیم از مالک و سرمایه‌گذاران و سازندگان را دارد؛ فرم سرمایه‌گذاران همان جایی است که زنجیره‌ی خودکار از آن شروع می‌شود."),
        ],
      },
    ],
    en: [
      {
        q: "How is the real-estate system looked after once it is handed over?",
        a: "The system was built to be handed over from the start: central error handling, a daily digest, and written backup and security documentation. The team that owns it knows what runs where and hears about it when a connection drops.",
        details: [
          p("The n8n workflows share one place for errors, so a failing step never stays silent, and the daily digest shows what ran overnight. The handover documents, the backup and security guides, let the team run the system without depending on its builder."),
          p("The kharazie.at website has sections for current projects, buying directly from owners, and investors and developers; the investors' enquiry form is where the automated chain begins."),
        ],
      },
    ],
  },

  // ======================================================================================= dane-news
  "dane-news": {
    fa: [
      {
        q: "اعتبارسنجی تحریریه در دانه چه چیزهایی را می‌سنجد؟",
        a: "پلتفرم دانه برای یک تحریریه‌ی علمی ساخته شد، پس قواعد تحریریه در خود سیستم هستند: منبع، لید، کپشن، اعتبار تصویر و ساختار مطالب بلند اعتبارسنجی می‌شوند و این‌ها در خود سیستم بررسی می‌شوند.",
        details: [
          p("مهاجرت فقط انتقال متن نبود. هر مطلب با برچسب‌ها و نویسنده‌اش منتقل شد و طبقه‌بندی شلوغ قبلی به ۸ دسته و ۱۰۵ موضوع رسید تا خواننده و موتور جست‌وجو بتوانند مسیر را دنبال کنند."),
          p("صفحه‌ی اصلی فهرست خبرهای مهم و ستون دسته‌بندی را نشان می‌دهد و بخش‌هایی مثل فضا و نجوم و فناوری هرکدام صفحه و ساختار خودشان را دارند. تحریریه این بخش‌ها را از Payload CMS مدیریت می‌کند، نه از قالب وردپرس."),
        ],
      },
    ],
    en: [
      {
        q: "What does editorial validation check on Dane?",
        a: "The Dane platform was built for a science newsroom, so the editorial rules live in the system itself: sources, leads, captions, image credits and the structure of long-form pieces are validated, and are checked inside the system.",
        details: [
          p("The migration was more than moving text. Every post moved with its tags and author, and the sprawling old taxonomy became 8 categories and 105 topics, so readers and search engines can follow a clear path."),
          p("The home page shows a list of breaking news and a category sidebar, and sections such as space and astronomy and technology each have their own page and structure. The newsroom manages them in Payload CMS rather than in a WordPress theme."),
        ],
      },
    ],
  },

  // ======================================================================================= codechee
  codechee: {
    fa: [
      {
        q: "در کدچی دانش‌آموز چه چیزهایی می‌بیند؟",
        a: "صفحه‌ی اصلی مسیر یادگیری را از شناسایی استعداد تا هدف‌گذاری شخصی نشان می‌دهد؛ بعد به مسیرهای یادگیری (استارکمپ‌ها)، ویدیوی پروژه‌های دانش‌آموزان و پرسش‌های متداول می‌رسد. هر بخش یک سؤال را جواب می‌دهد: چه یاد می‌گیرم، چطور پیش می‌روم و دیگران چه ساخته‌اند؟",
        details: [
          p("استارکمپ‌ها چند مسیر مشخص‌اند، از خلاقیت دیجیتال و تحلیل داده با پایتون تا هک و امنیت. بخش تجربه ویدیوی پروژه‌هایی را نشان می‌دهد که دانش‌آموزان ساخته‌اند و چیزی است که یک بروشور نمی‌تواند نشان بدهد. پرسش‌های متداول هم پیش از هر تماسی جواب سؤال‌های معمول را می‌دهد."),
        ],
      },
      {
        q: "چه تصمیم‌هایی یادگیری کدچی را شبیه بازی کرد؟",
        a: "چالش اصلی این بود که یادگیری حس بازی بدهد و پیشرفت دیده شود. برای همین دوره‌ها سطح‌بندی شدند، گیم‌پلی، کوییز و اتاق فرار کنار آن‌ها آمدند و هر دانش‌آموز حساب کاربری با پیگیری پیشرفت دارد.",
        details: [
          p("سطح‌های روشن به دانش‌آموز می‌گویند الان کجاست و قدم بعدی چیست؛ پیگیری پیشرفت همین تصویر را نگه می‌دارد. کوییز و اتاق فرار هم تمرین را به چالش تبدیل می‌کنند، نه تکلیف. برای مدرسه‌ها و رویدادهایی مثل شریف کاپ هم برنامه‌های جدایی در سایت معرفی شده است."),
        ],
      },
      {
        q: "کدچی چه مشکلی را حل می‌کند و برای چه کسانی است؟",
        a: "کدچی پایتون، داده، هوش مصنوعی و امنیت سایبری را به دانش‌آموزان آموزش می‌دهد. موضوع‌هایی را که معمولاً خشک به نظر می‌رسند به مسیرهایی تبدیل می‌کند که نوجوان دوست دارد ادامه بدهد.",
        details: [
          p("برای یک کسب‌وکار آموزشی، مشکل فقط ساخت سایت نیست؛ باید روشن باشد محصول چیست، برای چه کسی است و ثبت‌نام چطور انجام می‌شود. در کدچی این‌ها در ساختار صفحه‌ها و حساب کاربری دانش‌آموز جا گرفته‌اند، و این همان چیزی است که در یک پلتفرم آموزشی از سایت معمولی جدایش می‌کند."),
        ],
      },
    ],
    en: [
      {
        q: "What does a student find on Codechee?",
        a: "The home page walks through learning from talent discovery to personal goals, then moves on to the learning paths (Starcamps), videos of student projects and the frequently asked questions. Each section answers one question: what will I learn, how do I progress, and what have others built?",
        details: [
          p("The Starcamps are distinct paths, from digital creativity and data analysis with Python to hacking and security. The experience section plays videos of projects students made, something a brochure cannot show. The FAQ answers the common questions before anyone has to make a call."),
        ],
      },
      {
        q: "Which decisions made learning on Codechee feel like play?",
        a: "The main challenge was making learning feel like play while keeping progress visible. So courses are leveled, gameplay, quizzes and an escape room sit next to them, and each student has an account that tracks progress.",
        details: [
          p("Clear levels tell a student where they are and what comes next, and progress tracking keeps that picture. Quizzes and the escape room turn practice into a challenge rather than homework. Separate programs for schools and events such as Sharif Cup are presented on the site as well."),
        ],
      },
      {
        q: "What problem does Codechee solve, and for whom?",
        a: "Codechee teaches Python, data, AI and cybersecurity to school students. It turns subjects that usually look dry into paths a teenager wants to keep following.",
        details: [
          p("For an education business the problem is not just building a website; it must be clear what the product is, who it is for and how enrollment works. On Codechee those answers sit in the page structure and in the student account, which is what separates a learning platform from an ordinary site."),
        ],
      },
    ],
  },

  // ======================================================================================= yasin
  yasin: {
    fa: [
      {
        q: "در مدرسه‌ی مهارت یاسین بازدیدکننده چه می‌بیند؟",
        a: "صفحه‌ی اصلی با یک نقشه‌ی ماجراجویی تصویرسازی‌شده شروع می‌شود، بعد کارت‌های مهارت‌های زندگی و مهارت‌های آینده می‌آیند و در ادامه دوره‌های تخصصی مثل ICDL، گرافیک، بازاریابی دیجیتال و حسابداری معرفی می‌شوند.",
        details: [
          p("همه‌ی این‌ها در یک روایت پیوسته چیده شده‌اند تا مهارت‌آموزی شبیه ماجراجویی باشد. مسیرهای دوره‌ها، مربی‌ها و ثبت‌نام هم بخشی از همین روایت‌اند و بازدیدکننده از کنجکاوی به ثبت‌نام می‌رسد بدون اینکه از تجربه بیرون بیفتد."),
        ],
      },
      {
        q: "چه تصمیم‌هایی سایت را سبک نگه داشت؟",
        a: "محتوا یک‌جا متمرکز است، تصویرهای دسکتاپ و موبایل جدا بهینه شده‌اند و افکت‌ها با توان دستگاه تنظیم می‌شوند. فونت‌ها هم روی خود سایت قرار دارند تا بارگذاری به سرویس بیرونی وابسته نباشد.",
        details: [
          p("روایت بازی‌گونه با GSAP و Three.js و Lenis ساخته شده، ولی سنگینی آن‌ها فقط وقتی تحمل می‌شود که روی موبایل و با اینترنت ایران روان بماند. به همین دلیل افکت‌ها دستگاه‌محور هستند و کپی و رسانه جداگانه مدیریت می‌شوند."),
        ],
      },
    ],
    en: [
      {
        q: "What does a visitor see on Yasin Skill School?",
        a: "The home page opens with an illustrated adventure map, then cards for life skills and future skills, followed by specialized courses such as ICDL, graphic design, digital marketing and accounting.",
        details: [
          p("All of it is laid out as one continuous story, so building a skill feels like an adventure. Course paths, mentors and registration are part of that story too, so a visitor moves from curiosity to signing up without leaving the experience."),
        ],
      },
      {
        q: "Which decisions kept the site light?",
        a: "Copy is centralised, desktop and mobile media are optimized separately, and effects adapt to the device. Fonts are hosted on the site itself so loading does not depend on an outside service.",
        details: [
          p("The game-like narrative is built with GSAP, Three.js and Lenis, but that weight is only acceptable if it stays smooth on phones and on Iranian connections. That is why effects are device-aware and the copy and media are managed separately."),
        ],
      },
    ],
  },

  // ======================================================================================= konjed
  konjed: {
    fa: [
      {
        q: "در کنجد نوجوان چه مسیری را می‌رود؟",
        a: "مسیر کنجد سه قدم است: بازی کن، مأموریت را کامل کن، امتیاز و دستاورد بگیر. آرکید کارت‌هایی برای مدیریت پول، حل مسئله و تبدیل ایده به اجرا دارد و هر قدم نتیجه‌اش را نشان می‌دهد.",
        details: [
          p("ورود به سایت یک تجربه‌ی سینمایی در دنیای تصویرسازی‌شده‌ی بازی است، نه صفحه‌ی ثبت‌نام. بعد از آن مدرسه‌ی مهارت و ویترین پروژه‌های مهارت‌آموزها می‌آید تا نوجوان ببیند دیگران چه ساخته‌اند و خودش هم بخواهد چیزی بسازد."),
        ],
      },
      {
        q: "چه تصمیم‌هایی کنجد را اول بازی و بعد کلاس کرد؟",
        a: "ترتیب محصول عمداً برعکس یک دوره‌ی معمولی است: اول بازی و مأموریت، بعد آموزش. پاداش‌ها، یعنی امتیاز و دستاورد، به پیشرفت وصل‌اند و صفحه‌ها برای هر اندازه‌ی نمایشگر و به فارسی طراحی شده‌اند.",
        details: [
          p("مهارت‌هایی مثل مدیریت پول، حل مسئله و کارآفرینی برای نوجوان‌ها خشک به نظر می‌رسند. وقتی مینی‌گیم‌ها این مهارت‌ها را تمرین می‌دهند، یادگیری جزو بازی می‌شود و ویترین پروژه‌ها هم نتیجه‌ی واقعی آن را نشان می‌دهد."),
        ],
      },
    ],
    en: [
      {
        q: "What path does a teenager follow on Konjed?",
        a: "The path has three steps: play, complete a mission, earn points and achievements. The arcade has game cards for money management, problem solving and turning an idea into execution, and each step shows its result.",
        details: [
          p("Entering the site is a cinematic experience in an illustrated game world, not a sign-up form. After that come the skill school and a showcase of learners' projects, so a teenager can see what others made and want to make something too."),
        ],
      },
      {
        q: "Which decisions made Konjed a game first and a course second?",
        a: "The order is deliberately the reverse of an ordinary course: games and missions first, teaching after. Rewards, meaning points and achievements, are tied to progress, and the pages work on any screen in Persian.",
        details: [
          p("Skills such as money management, problem solving and entrepreneurship sound dry to teenagers. When mini-games practise them, learning becomes part of the play, and the showcase of projects shows the real output."),
        ],
      },
    ],
  },

  // ======================================================================================= microshamim
  microshamim: {
    fa: [
      {
        q: "در میکروشمیم بازدیدکننده چه چیزهایی می‌بیند؟",
        a: "سایت پیش از اینکه کسی به مجموعه بیاید، آن را نشان می‌دهد: یک ماکت پلان طبقه‌ای از فضا، مهارت‌هایی که می‌شود یاد گرفت به شکل برچسب‌های رنگی، و صفحه‌های جدا برای مدرسه‌ی مهارت، فضای کار اشتراکی، استودیو محتوا و رویدادها.",
        details: [
          p("هر فضا صفحه‌ی خودش را دارد تا کسی که فقط دنبال میز کار اشتراکی است مجبور نباشد همه‌ی مجموعه را بخواند. بخش مجله هم محتوای مجموعه را کنار معرفی فضاها نگه می‌دارد، و دعوت به درخواست استفاده از فضا در سراسر سایت تکرار می‌شود."),
        ],
      },
      {
        q: "چه تصمیم‌هایی سایت را جسور و در عین حال روشن نگه داشت؟",
        a: "حال‌وهوای کلاژ و بازیگوش برای مخاطب جوان انتخاب شد، ولی ساختار صفحه‌ها ساده ماند: هر فضا یک صفحه، هر صفحه یک دعوت روشن. هنر جسور قرار نبود جلوی فهمیدن کارکرد فضاها را بگیرد.",
        details: [
          p("میکروشمیم فضایی برای زنان جوان است و یادگیری، کار اشتراکی و تولید محتوا را زیر یک سقف جمع می‌کند. سایت باید این سه را بدون سردرگمی توضیح می‌داد، و همان جا بود که ساختار ساده ارزش پیدا کرد."),
        ],
      },
      {
        q: "میکروشمیم چه مشکلی را حل می‌کند؟",
        a: "مرکزهای نوآوری معمولاً چند کار می‌کنند و سایتشان یا همه را قاطی می‌کند یا یکی را فراموش. اینجا هر کار جایگاه جدا دارد، ولی همه به یک دعوت یکسان، یعنی درخواست استفاده از فضا، می‌رسند.",
        details: [
          p("اگر کسب‌وکار شما هم چند خدمت زیر یک نام دارد، همین الگو قابل استفاده است: صفحه‌ی جدا برای هر خدمت، یک مسیر مشترک برای تماس، و یک زبان بصری که برند را از رقبا جدا کند."),
        ],
      },
    ],
    en: [
      {
        q: "What does a visitor see on Microshamim?",
        a: "The site shows the space before anyone visits: a floor-plan model of the building, the skills you can learn shown as colored tags, and separate pages for the skill school, the co-working space, the content studio and events.",
        details: [
          p("Each space has its own page, so someone who only wants a co-working desk does not have to read about everything else. A magazine section keeps the hub's content next to the introductions of the spaces, and the call to request use of the space repeats throughout the site."),
        ],
      },
      {
        q: "Which decisions kept the site bold yet clear?",
        a: "A playful, collage-style look was chosen for a young audience, but the page structure stayed simple: one page per space and one clear invitation per page. The bold art direction was never meant to get in the way of understanding what each space does.",
        details: [
          p("Microshamim is a space for young women that brings learning, co-working and content production under one roof. The site had to explain all three without confusion, and that is where the simple structure paid off."),
        ],
      },
      {
        q: "What problem does Microshamim solve?",
        a: "Innovation hubs usually do several things, and their websites either blur them together or forget one. Here every activity has its own place, but all of them lead to the same invitation: request to use the space.",
        details: [
          p("If your business also has several services under one name, the same pattern applies: a separate page for each service, one shared way to get in touch, and a visual language that sets the brand apart from its competitors."),
        ],
      },
    ],
  },

  // ======================================================================================= sabzino
  sabzino: {
    fa: [
      {
        q: "در فروشگاه سبزینو مشتری چه چیزهایی می‌بیند؟",
        a: "فروشگاه سه دسته‌ی اصلی دارد: نوشیدنی‌های طبیعی، ادویه‌های بین‌المللی و محصولات بر پایه‌ی سبزی. فهرست محصولات مثل آبغوره‌ی طبیعی و محصولات بادمجان آماده را نشان می‌دهد و یک بخش داستان برند توضیح می‌دهد سبزینو چرا ساخته شده است.",
        details: [
          p("چون سبزینو کسب‌وکاری اجتماعی است، داستان برند بخشی از تصمیم خرید است و در صفحه‌ی اصلی جا دارد. سبد خرید، حساب مشتری و تسویه‌حساب هم واکنش‌گرا هستند و روی موبایل همان‌طور کار می‌کنند که روی دسکتاپ."),
        ],
      },
      {
        q: "چه تصمیم‌هایی سبزینو را از کاتالوگ به فروشگاه واقعی رساند؟",
        a: "سه چیز لازم بود که یک کاتالوگ ندارد: پرداخت آنلاین از طریق زرین‌پال، حساب مشتری، و پنل مدیریتی مستقل که تیم سبزینو بدون برنامه‌نویس محصول، موجودی، قیمت و سفارش را در آن اداره کند.",
        details: [
          p("داده‌ی فروشگاه در Cloudflare D1 با Drizzle ORM نگه‌داری می‌شود و ابزار استقرار امن کار انتشار را ساده می‌کند. نتیجه این است که تیم می‌تواند خودش فروشگاه را اداره کند و برای هر تغییر کوچک منتظر توسعه‌دهنده نماند."),
        ],
      },
    ],
    en: [
      {
        q: "What does a customer see in the Sabzino store?",
        a: "The store has three main categories: natural drinks, international spices and vegetable-based products. The catalog shows items such as natural verjuice and prepared aubergine products, and a brand story section explains why Sabzino exists.",
        details: [
          p("Because Sabzino is a social enterprise, the brand story is part of the buying decision and has a place on the home page. The cart, customer account and checkout are responsive too and work on a phone just as they do on a desktop."),
        ],
      },
      {
        q: "Which decisions took Sabzino from a catalog to a real store?",
        a: "Three things were needed that a catalog does not have: online payment through Zarinpal, customer accounts, and an independent admin where the Sabzino team manages products, inventory, pricing and orders without a developer.",
        details: [
          p("The store's data lives in Cloudflare D1 with Drizzle ORM, and secure deployment tooling keeps releases simple. The result is that the team can run the store itself and does not wait for a developer for every small change."),
        ],
      },
    ],
  },

  // ======================================================================================= nira-perfume
  "nira-perfume": {
    fa: [
      {
        q: "در سایت عطر نیرا بازدیدکننده چه می‌بیند؟",
        a: "ویترین با مجموعه‌ی عطرهای نیرا شروع می‌شود، بعد بخشی برای ساخت عطر اختصاصی برندها می‌آید و در ادامه بخش درباره‌ی نیرا با این جمله که عطر هنر ماندگار کردن احساس است. صفحه‌های گالری و آرشیو هم بخشی از سایت‌اند.",
        details: [
          p("جست‌وجوی محصول و سبد خرید کنار این بخش‌ها هستند تا خریدار عطر آماده بدون مانع بخرد و مشتری سازمانی هم مسیر جدا و روشنی برای درخواست عطر اختصاصی داشته باشد."),
        ],
      },
      {
        q: "چه تصمیم‌هایی به سایت حس یک خانه‌ی عطر لوکس داد؟",
        a: "نیرا دو کار متفاوت می‌کند: عطر اورجینال می‌فروشد و برای شرکت‌ها عطر اختصاصی می‌سازد. سایت این دو را جدا نگه داشت تا هیچ‌کدام دیگری را کم‌رنگ نکند و حس آرام و لوکس را با فضای خالی و تصویر محصول ساخت. متن فارسی هم با همان آرامش طراحی شد.",
        details: [
          p("در عطر، خریدار پیش از بو کردن، با تصویر و لحن تصمیم می‌گیرد. برای همین ظاهر ساده و آرام انتخاب شد و متن‌ها کوتاه ماندند."),
        ],
      },
      {
        q: "نیرا چه مشکلی را حل می‌کند؟",
        a: "برندی که هم به مصرف‌کننده و هم به شرکت‌ها می‌فروشد، معمولاً سایتی دارد که فقط با یکی از آن دو حرف می‌زند. نیرا هر دو مخاطب را در یک سایت دارد، بدون اینکه یکی در دیگری گم شود.",
        details: [
          p("اگر شما هم دو نوع مشتری دارید، مثلاً مصرف‌کننده و سازمان، همین ساختار کمک می‌کند هرکدام ویترین خودش را ببیند و مسیر خرید یا درخواستش کوتاه بماند."),
        ],
      },
    ],
    en: [
      {
        q: "What does a visitor see on the Nira Perfume website?",
        a: "The storefront opens with the Nira collection of perfumes, followed by a section on custom perfumes for brands and an about section that describes perfume as the art of lasting emotion. Gallery and archive pages are part of the site as well.",
        details: [
          p("Product search and a cart sit alongside these sections, so a shopper can buy a ready-made fragrance without obstacles while a corporate customer has a separate, clear way to ask for a custom scent."),
        ],
      },
      {
        q: "Which decisions gave the site the feel of a luxury fragrance house?",
        a: "Nira does two different things: it sells original perfumes and creates custom scents for companies. The site keeps them apart so neither dims the other, and it builds the calm, premium mood with white space and product imagery.",
        details: [
          p("With fragrance, a buyer decides on image and tone before ever smelling the product. So the look stayed quiet and the copy stayed short."),
        ],
      },
      {
        q: "What problem does Nira solve?",
        a: "A brand that sells both to consumers and to companies often has a site that only speaks to one of them. Nira has both audiences on one site without either getting lost in the other.",
        details: [
          p("If you also have two kinds of customer, for example consumers and organizations, the same structure lets each see its own storefront and keeps the path to buying or asking short."),
        ],
      },
    ],
  },

  // ======================================================================================= contemo
  contemo: {
    fa: [
      {
        q: "در کانتمو بازدیدکننده چه چیزهایی می‌بیند؟",
        a: "کانتمو مسیر را در چهار قدم نشان می‌دهد: از ثبت پروژه تا تحویل. خدمات تولید محتوا، یعنی ویدیو، صدا، متن و تصویر، جدا معرفی شده‌اند و بخش کارپذیرها ویرایش ویدیو، طراحی گرافیک و کپی‌رایتینگ را دارد.",
        details: [
          p("بازدیدکننده می‌تواند همان لحظه قیمت را ببیند، چون موتور قیمت‌گذاری در همه جای سایت یکی است و هم برای برآورد هزینه و هم برای ثبت پروژه کار می‌کند."),
        ],
      },
      {
        q: "چه تصمیم‌هایی کانتمو را برای تیم غیرفنی قابل اداره کرد؟",
        a: "محتوا یک‌جا متمرکز شد تا تیم کانتمو متن‌ها را خودش ویرایش کند. موتور قیمت‌گذاری هم یک‌بار نوشته شد و پشت هر دو بخش، برآورد و ثبت پروژه، قرار گرفت تا قیمت‌ها هیچ‌وقت ناسازگار نشوند.",
        details: [
          p("حرکت‌ها دسترس‌پذیر ماندند، جزئیات راست‌به‌چپ با دقت بررسی شد و منو روی موبایل واکنش‌گراست. این‌ها چیزهایی هستند که کاربر متوجهشان نمی‌شود، ولی نبودنشان را حس می‌کند."),
        ],
      },
      {
        q: "کانتمو چه مشکلی را حل می‌کند؟",
        a: "کانتمو خدمات محتوا می‌فروشد و هم‌زمان تولیدکننده جذب می‌کند، یعنی دو مخاطب با دو نیاز. سایت هر دو را در یک پلتفرم کنار هم می‌گذارد: مشتری قیمت می‌گیرد و تولیدکننده راه همکاری را پیدا می‌کند.",
        details: [
          p("پلتفرم‌های خدماتی که قیمت‌شان به ورودی مشتری بستگی دارد، معمولاً با فرم و تماس دستی کند می‌شوند. موتور قیمت زنده این مرحله را کوتاه می‌کند و تیم را از برآوردهای تکراری آزاد می‌کند."),
        ],
      },
    ],
    en: [
      {
        q: "What does a visitor see on Contemo?",
        a: "Contemo shows the journey in four steps, from submitting a project to delivery. Content production services, meaning video, audio, text and image, are introduced separately, and the freelancers section covers video editing, graphic design and copywriting.",
        details: [
          p("A visitor can see a price on the spot, because one pricing engine runs everywhere on the site and serves both the estimate and the project intake."),
        ],
      },
      {
        q: "Which decisions made Contemo manageable for a non-technical team?",
        a: "Content was centralised so the Contemo team can edit copy themselves. The pricing engine was written once and sits behind both the estimate and project intake, so prices never disagree.",
        details: [
          p("Motion stays accessible, right-to-left details were checked carefully and the menu is responsive on phones. Visitors rarely notice these things, but they feel it when they are missing."),
        ],
      },
      {
        q: "What problem does Contemo solve?",
        a: "Contemo sells content services and recruits creators at the same time, two audiences with two needs. The site puts both on one platform: customers get a price and creators find a way in.",
        details: [
          p("Service platforms whose price depends on what the customer enters are often slowed down by forms and manual calls. A live pricing engine shortens that step and frees the team from repeated estimates."),
        ],
      },
    ],
  },

  // ======================================================================================= shamim-house
  "shamim-house": {
    fa: [
      {
        q: "در سایت خانه شمیم بازدیدکننده چه چیزهایی می‌بیند؟",
        a: "سایت اکوسیستم را در فهرست حوزه‌ها نشان می‌دهد، از فناوری و آموزش تا استارتاپ‌سازی، بخشی برای چیزهایی که در اکوسیستم با هم ساخته شده، و بخش «جای شما کجاست؟» با مسیرهای همکاری.",
        details: [
          p("لندینگ داستان‌محور است و با انیمیشن پیشرفته جلو می‌رود تا بازدیدکننده قبل از رسیدن به فرم‌ها، تصویر کلی اکوسیستم را بفهمد. فرم‌های همکاری ساختاریافته‌اند و با Zod اعتبارسنجی می‌شوند."),
        ],
      },
      {
        q: "چه تصمیم‌هایی چند برند زیرمجموعه را کنار هم نشاند؟",
        a: "به‌جای ساخت یک سایت جدا برای هر برند، یک سیستم طراحی مقیاس‌پذیر ساخته شد که همه‌ی برندهای زیرمجموعه از آن استفاده می‌کنند. بخش‌های جدید با همان اجزا ساخته می‌شوند و ظاهر یکدست می‌ماند.",
        details: [
          p("خانه شمیم مجموعه‌ای از کسب‌وکارهای به‌هم‌پیوسته است، پس مهم‌ترین سؤال این بود که این‌ها چطور کنار هم قرار می‌گیرند. چیدمان واکنش‌گرا در همه‌ی بخش‌ها همین پاسخ را روی هر صفحه‌نمایشی نگه می‌دارد."),
        ],
      },
      {
        q: "خانه شمیم چه مشکلی را حل می‌کند؟",
        a: "اکوسیستم‌هایی که چند برند دارند، معمولاً شریک بالقوه را سردرگم می‌کنند: از کجا شروع کنم؟ خانه شمیم راه ورود را روشن می‌کند و هر نوع همکاری را با یک فرم مشخص به مسیر درست می‌فرستد.",
        details: [
          p("اگر کسب‌وکار شما هم چند زیرمجموعه دارد، سایت باید قبل از معرفی هر برند، ارتباط آن‌ها را توضیح بدهد؛ بعد شریک بداند کجای نقشه ایستاده است."),
        ],
      },
    ],
    en: [
      {
        q: "What does a visitor see on the Shamim House site?",
        a: "The site shows the ecosystem as a list of areas, from technology and education to venture building, a section on things built together within the ecosystem, and a \"where do you fit?\" section with paths for collaboration.",
        details: [
          p("The landing page is story-led and moves with advanced motion, so a visitor grasps the whole ecosystem before reaching any form. The collaboration forms are structured and validated with Zod."),
        ],
      },
      {
        q: "Which decisions put several subsidiary brands side by side?",
        a: "Instead of building a separate site for each brand, a scalable design system was built that all subsidiary brands use. New sections are assembled from the same parts, so the look stays consistent.",
        details: [
          p("Shamim House is a set of connected ventures, so the key question was how they fit together. A responsive layout in every section keeps that answer intact on any screen size."),
        ],
      },
      {
        q: "What problem does Shamim House solve?",
        a: "Ecosystems with several brands tend to confuse a prospective partner: where do I start? Shamim House makes the way in clear and sends each kind of collaboration to the right path through a defined form.",
        details: [
          p("If your business also has several subsidiaries, the site should explain how they relate before introducing any single brand; then a partner knows where on the map they stand."),
        ],
      },
    ],
  },

  // ======================================================================================= asa-study
  "asa-study": {
    fa: [
      {
        q: "در ASA-Study دانشجوی بین‌المللی چه مسیری را می‌رود؟",
        a: "مسیر پذیرش در پنج قدم نمایش داده می‌شود: ثبت درخواست، ارزیابی، انتخاب دانشگاه، مدارک و پذیرش. فهرست دانشگاه‌ها شامل دانشگاه‌های علوم پزشکی است و با فیلتر شهر می‌شود دانشگاه‌ها را مقایسه کرد.",
        details: [
          p("صفحه‌ی اصلی ASA-Study را شریک مورد اعتماد برای تحصیل در ایران معرفی می‌کند و نمای کلی خدمات را نشان می‌دهد. هر دانشگاه پروفایل داده‌محور دارد، پس مقایسه‌ی دانشگاه‌ها بدون خواندن چند صفحه‌ی بلند ممکن است."),
        ],
      },
      {
        q: "چه تصمیم‌هایی سایت را واقعاً دوزبانه کرد؟",
        a: "فارسی و انگلیسی دو آدرس جدا دارند و چیدمان راست‌به‌چپ فقط برای فارسی اعمال می‌شود، نه یک ترجمه‌ی ساده روی همان صفحه. هر دانشگاه یک سند مستقل و دوزبانه است تا محتوا بعداً به CMS وصل شود.",
        details: [
          p("دانشجوی بین‌المللی باید دانشگاه‌ها، شهرها و رشته‌ها را به زبان خودش مقایسه کند. برای همین مسیریابی دوزبانه با next-intl و رفتار کامل RTL از اول جزو معماری بود، نه افزونه‌ای که آخر کار اضافه شود."),
        ],
      },
      {
        q: "ASA-Study چه مشکلی را حل می‌کند؟",
        a: "انتخاب دانشگاه در کشوری دیگر، بدون اطلاعات به زبان خود، تصمیمی پرریسک است. ASA-Study اطلاعات دانشگاه‌ها را در یک فهرست قابل جست‌وجو و به دو زبان کنار هم می‌گذارد و مسیر پذیرش را شفاف می‌کند.",
        details: [
          p("اگر مخاطب شما هم از کشورهای مختلف می‌آید، سایت دوزبانه تنها ترجمه نیست؛ ساختار آدرس، برچسب زبان برای گوگل و رفتار صفحه برای هر زبان باید درست باشد."),
        ],
      },
    ],
    en: [
      {
        q: "What journey does an international student follow on ASA-Study?",
        a: "The admission journey is shown in five steps: submit an application, evaluation, university selection, documents, admission. The university directory includes medical universities and can be filtered by city to compare them.",
        details: [
          p("The home page introduces ASA-Study as a trusted partner for studying in Iran and gives an overview of its services. Each university has a data-driven profile, so comparing them does not mean reading several long pages."),
        ],
      },
      {
        q: "Which decisions made the site genuinely bilingual?",
        a: "Persian and English have separate URLs and right-to-left layout applies to Persian only, rather than a simple translation laid over the same page. Each university is an independent, bilingual document, ready to connect to a CMS later.",
        details: [
          p("An international student has to compare universities, cities and programs in their own language. So bilingual routing with next-intl and full RTL behavior were part of the architecture from the start, not an add-on at the end."),
        ],
      },
      {
        q: "What problem does ASA-Study solve?",
        a: "Choosing a university in another country without information in your own language is a risky decision. ASA-Study puts university information in a searchable, two-language directory and makes the admission path transparent.",
        details: [
          p("If your audience also comes from several countries, a bilingual site is more than translation; URL structure, language labels for search engines and page behavior all have to be right for each language."),
        ],
      },
    ],
  },

  // ======================================================================================= prowem
  prowem: {
    fa: [
      {
        q: "اپلیکیشن Prowem برای کاربر چه چیزهایی دارد؟",
        a: "نتیجه‌ی زنده‌ی بازی‌ها، برنامه‌ی مسابقات، جدول رده‌بندی و فهرست گلزنان در دو صفحه‌ی گوشی نمایش داده می‌شوند. همان داده برای مدیران مسابقه هم در دسترس است تا تیم‌ها و بازیکن‌ها را مدیریت کنند.",
        details: [
          p("کاربر می‌خواهد وسط بازی ببیند نتیجه چیست؛ پس به‌روزرسانی زنده مهم‌ترین امکان است. مدیر مسابقه هم در همان اپ تیم و بازیکن را اداره می‌کند، و به همین دلیل معماری برنامه ماژولار نوشته شده است."),
        ],
      },
      {
        q: "چه تصمیم‌هایی iOS، اندروید و پلتفرم رویداد را هماهنگ نگه داشت؟",
        a: "یک کد Flutter هر دو سیستم‌عامل را می‌سازد و یک API از نوع REST بین اپ موبایل و پلتفرم رویداد داده را همگام می‌کند. نتیجه این است که هر تغییر یک‌بار انجام می‌شود و روی هر دو سیستم‌عامل یکسان است.",
        details: [
          p("مسابقات، تیم‌ها، بازیکن‌ها و مکان‌ها باید همیشه با هم هماهنگ باشند و نتیجه‌ها همان وقت بازی به‌روز شوند. با یک منبع داده و یک پایگاه کد، احتمال اینکه iOS چیزی غیر از اندروید نشان بدهد کم می‌شود."),
        ],
      },
      {
        q: "Prowem چه مشکلی را حل می‌کند؟",
        a: "برگزارکننده‌ی مسابقه هم‌زمان با چند چیز سروکار دارد: ثبت تیم‌ها، تعیین برنامه، اعلام نتیجه و اطلاع‌رسانی به تماشاگر. اپ این‌ها را از یک جا اداره می‌کند و نتیجه را همان لحظه به کاربر می‌رساند.",
        details: [
          p("اگر محصول شما نیاز دارد داده‌ی زنده را به اپ موبایل و سایت برساند، همین الگو، یعنی یک API مشترک و یک پایگاه کد برای هر دو سیستم‌عامل، هزینه و خطا را کم می‌کند."),
        ],
      },
    ],
    en: [
      {
        q: "What does the Prowem app offer a user?",
        a: "Live match results, schedules, standings and a top-scorers list appear on two phone screens. The same data is available to organizers so they can manage teams and players.",
        details: [
          p("A fan wants to know the score while the match is still on, so live updating is the most important feature. Organizers manage teams and players in the same app, which is why the app is built on a modular architecture."),
        ],
      },
      {
        q: "Which decisions kept iOS, Android and the event platform in sync?",
        a: "One Flutter codebase builds both operating systems and a REST API syncs data between the mobile app and the event platform. Each change is made once and behaves the same on both platforms.",
        details: [
          p("Tournaments, teams, players and venues must always agree, and results must update while a match is on. With one source of data and one codebase, the chance of iOS showing something different from Android shrinks."),
        ],
      },
      {
        q: "What problem does Prowem solve?",
        a: "A tournament organizer deals with several things at once: registering teams, setting the schedule, announcing results and keeping spectators informed. The app runs these from one place and delivers results to users the moment they happen.",
        details: [
          p("If your product also needs to deliver live data to a mobile app and a website, the same pattern, a shared API and a single codebase for both operating systems, lowers both cost and errors."),
        ],
      },
    ],
  },

  // ======================================================================================= mojasame-saidi
  "mojasame-saidi": {
    fa: [
      {
        q: "در فروشگاه مجسمه سعیدی مشتری چه می‌بیند؟",
        a: "فروشگاه مجسمه و دکور دست‌ساز را با چیدمان موبایل‌محور نشان می‌دهد: دسته‌بندی روشن محصولات، صفحه‌ی هر محصول، سبد خرید پایدار و مسیر خرید با فرم‌های اعتبارسنجی‌شده.",
        details: [
          p("چون اثر دست‌ساز باید دیده شود، تصویر محصول بیشترین جا را می‌گیرد و متن‌ها کوتاه می‌مانند. سبد خرید حتی با بسته شدن صفحه حفظ می‌شود، که برای کسی که چند روز درباره‌ی یک اثر فکر می‌کند مهم است."),
        ],
      },
      {
        q: "چه تصمیم‌هایی فروشگاه را لوکس و قابل پیدا شدن کرد؟",
        a: "فروشگاه از ابتدا برای سئو و موبایل ساخته شد: دسته‌بندی محصولات منطقی است تا گوگل آن را بفهمد. لایه‌ی داده با Prisma و PostgreSQL آماده‌ی تولید است.",
        details: [
          p("مرزبندی روشن احراز هویت، یعنی اینکه چه چیزی برای مهمان است و چه چیزی برای حساب کاربری، باعث می‌شود پنل مدیریت بعداً بدون بازنویسی اضافه شود."),
        ],
      },
      {
        q: "مجسمه سعیدی چه مشکلی را حل می‌کند؟",
        a: "محصول دست‌ساز را نمی‌شود با قالب فروشگاهی عمومی خوب نشان داد. این فروشگاه اثر را در مرکز می‌گذارد، در جست‌وجو پیدا می‌شود و اگر لازم شد پنل مدیریت هم به آن اضافه می‌شود.",
        details: [
          p("اگر محصول شما دست‌ساز، کم‌تعداد یا گران است، خریدار بیشتر از قیمت به حس صفحه اعتماد می‌کند. همین موضوع دلیل ساخت اختصاصی فروشگاه بود، نه استفاده از قالب."),
        ],
      },
    ],
    en: [
      {
        q: "What does a customer see in the Mojasame Saidi store?",
        a: "The store presents handmade sculpture and decor in a mobile-first layout: clear product categories, a page for each product, a cart that persists, and a checkout with validated forms.",
        details: [
          p("Because a handmade piece needs to be seen, the product image gets the most room and the copy stays short. The cart survives closing the page, which matters to someone who thinks about one piece for several days."),
        ],
      },
      {
        q: "Which decisions made the store premium and easy to find?",
        a: "The store was built for search and for phones from the start: the product taxonomy is logical so Google can understand it. The data layer, Prisma with PostgreSQL, is production-ready.",
        details: [
          p("Clear authentication boundaries, meaning what is for guests and what needs an account, mean the admin side can be added later without a rewrite."),
        ],
      },
      {
        q: "What problem does Mojasame Saidi solve?",
        a: "A handmade product cannot be shown well in a generic store template. This store puts the piece at the center, shows up in search and can grow an admin panel when it is needed.",
        details: [
          p("If your product is handmade, limited or expensive, a buyer trusts the feel of the page more than the price. That is why the store was built custom rather than on a template."),
        ],
      },
    ],
  },

  // ======================================================================================= elm-kala
  "elm-kala": {
    fa: [
      {
        q: "در علم‌کالا خریدار چه مسیری را می‌رود؟",
        a: "فروشگاه از دسته‌بندی شروع می‌کند: تجهیزات آزمایشگاهی، رباتیک و آموزشی، با محصولات منتخب در ابتدا. هر دسته راهنمای کاربرد دارد و یک جعبه‌ی «انتخاب را به من کمک کنید» خریدار را به مشاوره می‌رساند.",
        details: [
          p("این ترتیب برعکس فروشگاه معمولی است که از فهرست محصولات شروع می‌کند. اینجا اول می‌پرسد خریدار می‌خواهد با تجهیزات چه کاری انجام دهد، بعد محصول مناسب را نشان می‌دهد."),
        ],
      },
      {
        q: "چه تصمیم‌هایی فروشگاه را «هدایت‌شده» کرد؟",
        a: "سه مسیر کنار هم ساخته شد: کشف محصول از طریق دسته‌بندی، راهنمای کاربرد برای هر دسته، و مسیر مشاوره‌محور برای کسی که مطمئن نیست چه می‌خواهد. هیچ‌کدام خریدار را مجبور نمی‌کند اصطلاح فنی بداند.",
        details: [
          p("تجهیزات علمی معمولاً با نام فنی فروخته می‌شوند و خریدار مدرسه یا کلاس همیشه آن را نمی‌داند. به همین دلیل زبان سایت بر پایه‌ی کاربرد نوشته شده و مشاوره همیشه یک قدم دورتر نیست."),
        ],
      },
      {
        q: "علم‌کالا چه مشکلی را حل می‌کند؟",
        a: "خریدار تجهیزات آزمایشگاه، رباتیک یا کلاس معمولاً نمی‌داند کدام محصول به کارش می‌آید. علم‌کالا به‌جای فهرست خالی، او را قدم‌به‌قدم به انتخاب نزدیک می‌کند و در صورت نیاز به مشاور وصل می‌کند.",
        details: [
          p("هر کسب‌وکاری که محصول تخصصی می‌فروشد با همین مشکل روبه‌رو است: مشتری دانش محصول را ندارد. فروشگاه هدایت‌شده یک راه‌حل است، ولی همیشه بهترین نیست؛ در بررسی رایگان همین را می‌سنجیم."),
        ],
      },
    ],
    en: [
      {
        q: "What path does a buyer follow on Elm-Kala?",
        a: "The store starts from categories: laboratory, robotics and educational equipment, with featured products first. Each category has use-case guidance and a \"help me choose\" box that leads the buyer to a consultation.",
        details: [
          p("This order is the reverse of an ordinary store, which starts from a product list. Here the first question is what the buyer wants to do with the equipment, and only then does the store show the right product."),
        ],
      },
      {
        q: "Which decisions made the store \"guided\"?",
        a: "Three paths were built side by side: discovery through categories, use-case guidance for each category, and a consultation-first path for someone who is not sure what they need. None of them requires the buyer to know technical terms.",
        details: [
          p("Scientific equipment is usually sold under technical names that a school or classroom buyer does not always know. That is why the site's language is written around use, and a consultation is never far away."),
        ],
      },
      {
        q: "What problem does Elm-Kala solve?",
        a: "People buying lab, robotics or classroom equipment often do not know which product fits. Instead of an empty list, Elm-Kala moves them step by step towards a choice and connects them to an adviser when they need one.",
        details: [
          p("Any business that sells specialized products faces the same problem: the customer lacks product knowledge. A guided store is one answer, but not always the best; the free audit is where we weigh that."),
        ],
      },
    ],
  },

  // ======================================================================================= school-builders
  "school-builders": {
    fa: [
      {
        q: "در پرتال جامعه خیرین مدرسه‌ساز بازدیدکننده چه می‌بیند؟",
        a: "پرتال سه محور دارد: خبر، پروژه و استان. کارت‌های پروژه‌های اخیر و خبرهای استان‌ها کنار تصویر یک مدرسه در حال ساخت قرار می‌گیرند و مسیرهای مشارکت برای خیرین از همان صفحه‌ها در دسترس است.",
        details: [
          p("چون جامعه خیرین کشوری است، استان یکی از محورهای اصلی ناوبری است؛ خیر می‌تواند ببیند در منطقه‌ی خودش یا استان مورد علاقه‌اش چه می‌گذرد."),
        ],
      },
      {
        q: "چه تصمیم‌هایی پرتال را برای خیرین روشن کرد؟",
        a: "معماری اطلاعات بر پایه‌ی خبر، پروژه و استان ساخته شد تا هر خیر بتواند بدون راهنما به آنچه می‌خواهد برسد. مسیرهای مشارکت هم جدا و صریح هستند، نه یک دکمه‌ی گم‌شده در پانویس.",
        details: [
          p("طراحی فارسی واکنش‌گرا و ساخته‌شده روی Next.js 16 است، پس صفحه‌ها روی موبایل هم روشن و سریع باز می‌شوند. این برای سازمانی که مخاطبانش از سنین و دستگاه‌های مختلف می‌آیند اهمیت دارد."),
        ],
      },
      {
        q: "این پرتال چه مشکلی را حل می‌کند؟",
        a: "یک خیریه‌ی ملی جایی عمومی می‌خواست برای پروژه‌های اخیر، خبرهای همه‌ی استان‌ها و راه‌های روشن مشارکت. پرتال این سه را کنار هم می‌گذارد تا خیر بداند کار چه شد و خودش چه می‌تواند بکند.",
        details: [
          p("برای سازمان‌های غیرانتفاعی، اعتماد از شفافیت می‌آید: دیدن پروژه‌ها و خبرها، و روشن بودن اینکه مشارکت چطور انجام می‌شود. همین دو چیز اساس ساختار این سایت بود."),
        ],
      },
    ],
    en: [
      {
        q: "What does a visitor see on the Iran School-Builders Charity portal?",
        a: "The portal has three axes: news, projects and provinces. Cards for recent projects and provincial news sit beside an image of a school under construction, and the ways for donors to take part are reachable from the same pages.",
        details: [
          p("Because the charity is national, the province is one of the main ways to navigate; a donor can see what is happening in their own region or a province they care about."),
        ],
      },
      {
        q: "Which decisions made the portal clear for donors?",
        a: "The information architecture is built around news, projects and provinces so a donor can reach what they want without a guide. The ways to take part are separate and explicit, not a lost button in the footer.",
        details: [
          p("The Persian design is responsive and built on Next.js 16, so pages open clearly and quickly on phones too. That matters for an organization whose audience comes from many ages and devices."),
        ],
      },
      {
        q: "What problem does this portal solve?",
        a: "A national charity wanted one public place for its recent projects, news from every province and clear ways for donors to get involved. The portal puts the three side by side so a donor knows what was done and what they can do.",
        details: [
          p("For non-profits, trust comes from transparency: seeing projects and news, and knowing how participation works. Those two things were the foundation of this site's structure."),
        ],
      },
    ],
  },
};
