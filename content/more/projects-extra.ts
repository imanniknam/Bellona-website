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
        q: "نگهداری سیستم املاک پس از تحویل چطور است؟",
        a: "سیستم از اول برای تحویل ساخته شد: مدیریت متمرکز خطا، گزارش روزانه، و مستندات پشتیبان‌گیری و امنیت. تیمی که صاحب سیستم است می‌داند هر چیز کجا کار می‌کند و اگر اتصالی قطع شود، خبردار می‌شود.",
        details: [
          p("گردش‌کارهای n8n یک نقطه‌ی مشترک برای ثبت خطا دارند، پس خرابی یک مرحله بی‌صدا نمی‌ماند. گزارش روزانه هم نشان می‌دهد شب گذشته چه کارهایی انجام شده. اسناد تحویل، یعنی راهنمای پشتیبان‌گیری و امنیت، به تیم کمک می‌کند بی‌وابستگی به سازنده، سیستم را اداره کند."),
          p("سایت kharazie.at سه بخش اصلی دارد: پروژه‌های جاری، خرید مستقیم از مالک، و سرمایه‌گذاران و سازندگان؛ فرم سرمایه‌گذاران همان نقطه‌ای است که زنجیره‌ی خودکار از آن شروع می‌شود."),
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
        q: "بررسی تحریریه‌ای در دانه چه چیزهایی را می‌سنجد؟",
        a: "پلتفرم دانه برای یک تحریریه‌ی علمی ساخته شد، پس قواعد تحریریه درون خود سیستم است: منبع، لید خبر، زیرنویس، اعتبار تصویر و ساختار مطالب بلند پیش از انتشار بررسی می‌شوند.",
        details: [
          p("انتقال فقط جابه‌جا کردن متن نبود. هر مطلب با برچسب‌ها و نویسنده‌اش منتقل شد و دسته‌بندی شلوغ قبلی به ۸ دسته و ۱۰۵ موضوع رسید تا هم خواننده مسیرش را پیدا کند و هم موتور جست‌وجو."),
          p("صفحه‌ی اصلی فهرست خبرهای مهم و ستون دسته‌بندی را نشان می‌دهد و بخش‌هایی مثل فضا و نجوم یا فناوری هر کدام صفحه و ساختار خودشان را دارند. تحریریه این بخش‌ها را از Payload CMS مدیریت می‌کند، نه از قالب وردپرس."),
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
        q: "دانش‌آموز در کدچی چه چیزهایی می‌بیند؟",
        a: "صفحه‌ی اصلی مسیر یادگیری را از کشف استعداد تا هدف‌گذاری شخصی نشان می‌دهد؛ بعد به مسیرهای یادگیری (استارکمپ‌ها)، ویدیوی پروژه‌های دانش‌آموزان و پرسش‌های متداول می‌رسد. هر بخش جواب یک سؤال است: چه یاد می‌گیرم، چطور پیش می‌روم و دیگران چه ساخته‌اند؟",
        details: [
          p("استارکمپ‌ها چند مسیر مشخص‌اند، از خلاقیت دیجیتال و تحلیل داده با پایتون تا هک و امنیت. بخش تجربه ویدیوی پروژه‌هایی را نشان می‌دهد که خود دانش‌آموزان ساخته‌اند؛ چیزی که هیچ بروشوری نمی‌تواند نشان بدهد. پرسش‌های متداول هم پیش از هر تماسی جواب سؤال‌های رایج را می‌دهد."),
        ],
      },
      {
        q: "چه تصمیم‌هایی یادگیری در کدچی را شبیه بازی کرد؟",
        a: "چالش اصلی این بود که یادگیری حس بازی بدهد و پیشرفت به چشم بیاید. برای همین دوره‌ها مرحله‌بندی شدند، بازی، آزمونک و اتاق فرار کنارشان آمد و هر دانش‌آموز حساب کاربری‌ای دارد که پیشرفتش را نشان می‌دهد.",
        details: [
          p("مرحله‌های روشن به دانش‌آموز می‌گویند الان کجاست و قدم بعدی چیست؛ پیگیری پیشرفت هم همین تصویر را زنده نگه می‌دارد. آزمونک و اتاق فرار هم تمرین را به چالش تبدیل می‌کنند، نه تکلیف. برای مدرسه‌ها و رویدادهایی مثل شریف کاپ هم برنامه‌های جداگانه‌ای در سایت معرفی شده است."),
        ],
      },
      {
        q: "کدچی چه مشکلی را حل می‌کند و برای چه کسانی است؟",
        a: "کدچی پایتون، داده، هوش مصنوعی و امنیت سایبری را به دانش‌آموزان یاد می‌دهد و موضوع‌هایی را که معمولاً خشک به نظر می‌رسند به مسیرهایی تبدیل می‌کند که نوجوان دلش می‌خواهد ادامه‌شان بدهد.",
        details: [
          p("برای یک کسب‌وکار آموزشی، مسئله فقط ساختن سایت نیست؛ باید روشن باشد محصول چیست، برای کیست و ثبت‌نام چطور انجام می‌شود. در کدچی همه‌ی این‌ها در ساختار صفحه‌ها و حساب کاربری دانش‌آموز جا گرفته‌اند؛ همان چیزی که پلتفرم آموزشی را از سایت معمولی جدا می‌کند."),
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
        q: "بازدیدکننده در مدرسه مهارت یاسین چه می‌بیند؟",
        a: "صفحه‌ی اصلی با نقشه‌ای تصویرسازی‌شده از یک ماجراجویی شروع می‌شود، بعد کارت‌های مهارت‌های زندگی و مهارت‌های آینده می‌آیند و در ادامه دوره‌های تخصصی مثل ICDL، گرافیک، بازاریابی دیجیتال و حسابداری معرفی می‌شوند.",
        details: [
          p("همه‌ی این‌ها در یک روایت پیوسته چیده شده‌اند تا مهارت‌آموزی شبیه ماجراجویی باشد. مسیر دوره‌ها، مربی‌ها و ثبت‌نام هم بخشی از همین روایت‌اند و بازدیدکننده بی‌آنکه از تجربه بیرون بیفتد، از کنجکاوی به ثبت‌نام می‌رسد."),
        ],
      },
      {
        q: "چه تصمیم‌هایی سایت را سبک نگه داشت؟",
        a: "محتوا یک‌جا نگه‌داری می‌شود، تصویرهای دسکتاپ و موبایل جداگانه بهینه شده‌اند و جلوه‌ها با توان دستگاه تنظیم می‌شوند. فونت‌ها هم روی خود سایت‌اند تا بارگذاری به سرویس بیرونی وابسته نباشد.",
        details: [
          p("روایت بازی‌گونه با GSAP، Three.js و Lenis ساخته شده، ولی سنگینی این ابزارها فقط وقتی می‌ارزد که سایت روی موبایل و با اینترنت ایران روان بماند. برای همین جلوه‌ها به توان دستگاه وابسته‌اند و متن‌ها و رسانه‌ها جداگانه مدیریت می‌شوند."),
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
        q: "نوجوان در کنجد از چه مسیری می‌گذرد؟",
        a: "مسیر کنجد سه قدم دارد: بازی کن، مأموریت را تمام کن، امتیاز و دستاورد بگیر. بخش بازی کارت‌هایی برای مدیریت پول، حل مسئله و رساندن ایده به اجرا دارد و هر قدم نتیجه‌اش را نشان می‌دهد.",
        details: [
          p("ورود به سایت تجربه‌ای سینمایی در دنیای تصویرسازی‌شده‌ی بازی است، نه یک صفحه‌ی ثبت‌نام. بعد مدرسه‌ی مهارت و ویترین پروژه‌های هنرجوها می‌آید تا نوجوان ببیند دیگران چه ساخته‌اند و خودش هم هوس ساختن کند."),
        ],
      },
      {
        q: "چه تصمیم‌هایی کنجد را اول بازی کرد و بعد کلاس؟",
        a: "ترتیب محصول عمداً برعکس یک دوره‌ی معمولی است: اول بازی و مأموریت، بعد آموزش. پاداش‌ها، یعنی امتیاز و دستاورد، به پیشرفت گره خورده‌اند و صفحه‌ها برای هر اندازه‌ای از نمایشگر و به زبان فارسی طراحی شده‌اند.",
        details: [
          p("مهارت‌هایی مثل مدیریت پول، حل مسئله و کارآفرینی برای نوجوان‌ها خشک به نظر می‌رسند. وقتی مینی‌گیم‌ها این مهارت‌ها را تمرین می‌دهند، یادگیری بخشی از بازی می‌شود و ویترین پروژه‌ها هم نتیجه‌ی واقعی‌اش را نشان می‌دهد."),
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
        q: "بازدیدکننده در میکروشمیم چه چیزهایی می‌بیند؟",
        a: "سایت پیش از آنکه کسی پا به مجموعه بگذارد، آن را نشانش می‌دهد: ماکت پلان فضا، مهارت‌هایی که می‌شود یاد گرفت در قالب برچسب‌های رنگی، و صفحه‌های جداگانه برای مدرسه‌ی مهارت، فضای کار اشتراکی، استودیوی محتوا و رویدادها.",
        details: [
          p("هر فضا صفحه‌ی خودش را دارد تا کسی که فقط دنبال میز کار اشتراکی است مجبور نباشد همه‌ی مجموعه را بخواند. بخش مجله هم محتوای مجموعه را کنار معرفی فضاها نگه می‌دارد و دعوت به درخواست استفاده از فضا در سرتاسر سایت تکرار می‌شود."),
        ],
      },
      {
        q: "چه تصمیم‌هایی سایت را جسور و در عین حال روشن نگه داشت؟",
        a: "حال‌وهوای کلاژ و بازیگوش برای مخاطب جوان انتخاب شد، ولی ساختار صفحه‌ها ساده ماند: هر فضا یک صفحه، هر صفحه یک دعوت روشن. قرار نبود هنر جسورانه مانع فهمیدن کاربرد فضاها شود.",
        details: [
          p("میکروشمیم فضایی برای زنان جوان است که یادگیری، کار اشتراکی و تولید محتوا را زیر یک سقف جمع می‌کند. سایت باید این سه را بی‌سردرگمی معرفی می‌کرد و همین‌جا بود که ساختار ساده ارزشش را نشان داد."),
        ],
      },
      {
        q: "میکروشمیم چه مشکلی را حل می‌کند؟",
        a: "مرکزهای نوآوری معمولاً چند کار می‌کنند و سایتشان یا همه را قاطی می‌کند یا یکی را از قلم می‌اندازد. این‌جا هر کار جای خودش را دارد، ولی همه به یک دعوت مشترک، یعنی درخواست استفاده از فضا، ختم می‌شوند.",
        details: [
          p("اگر کسب‌وکار شما هم چند خدمت زیر یک نام دارد، همین الگو به کارتان می‌آید: صفحه‌ی جدا برای هر خدمت، یک مسیر مشترک برای تماس و یک زبان بصری که برندتان را از رقبا متمایز کند."),
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
        q: "مشتری در فروشگاه سبزینو چه چیزهایی می‌بیند؟",
        a: "فروشگاه سه دسته‌ی اصلی دارد: نوشیدنی‌های طبیعی، ادویه‌های بین‌المللی و محصولات بر پایه‌ی سبزی. فهرست محصولات چیزهایی مثل آبغوره‌ی طبیعی و محصولات آماده‌ی بادمجان را نشان می‌دهد و بخش داستان برند می‌گوید سبزینو چرا ساخته شده است.",
        details: [
          p("چون سبزینو کسب‌وکاری اجتماعی است، داستان برند بخشی از تصمیم خرید است و در صفحه‌ی اصلی جا دارد. سبد خرید، حساب کاربری و تسویه‌حساب هم واکنش‌گرا هستند و روی موبایل همان‌قدر خوب کار می‌کنند که روی دسکتاپ."),
        ],
      },
      {
        q: "چه تصمیم‌هایی سبزینو را از کاتالوگ به فروشگاه واقعی تبدیل کرد؟",
        a: "سه چیز لازم بود که کاتالوگ ندارد: پرداخت آنلاین با زرین‌پال، حساب کاربری مشتری و پنل مدیریتی مستقل که تیم سبزینو بی‌برنامه‌نویس محصولات، موجودی، قیمت و سفارش‌ها را در آن بگرداند.",
        details: [
          p("داده‌های فروشگاه در Cloudflare D1 با Drizzle ORM نگه‌داری می‌شود و ابزار انتشار امن، بیرون دادن نسخه‌ها را ساده می‌کند. نتیجه این است که تیم خودش فروشگاه را اداره می‌کند و برای هر تغییر کوچک منتظر برنامه‌نویس نمی‌ماند."),
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
        q: "بازدیدکننده در سایت عطر نیرا چه می‌بیند؟",
        a: "ویترین با مجموعه‌ی عطرهای نیرا شروع می‌شود، بعد بخشی برای ساخت عطر اختصاصی برندها می‌آید و پس از آن بخش «درباره‌ی نیرا» با این جمله که عطر، هنر ماندگار کردن احساس است. صفحه‌های گالری و آرشیو هم بخشی از سایت‌اند.",
        details: [
          p("جست‌وجوی محصول و سبد خرید کنار این بخش‌ها هستند تا خریدار عطر آماده بی‌مانع خرید کند و مشتری سازمانی هم مسیر جدا و روشنی برای سفارش عطر اختصاصی داشته باشد."),
        ],
      },
      {
        q: "چه تصمیم‌هایی به سایت حس یک عطرسرای لوکس داد؟",
        a: "نیرا دو کار متفاوت می‌کند: عطر اصل می‌فروشد و برای شرکت‌ها عطر اختصاصی می‌سازد. سایت این دو را از هم جدا نگه داشت تا هیچ‌کدام دیگری را کم‌رنگ نکند و حس آرام و لوکس را با فضای خالی و تصویر محصول ساخت. متن‌های فارسی هم با همان آرامش نوشته شدند.",
        details: [
          p("در خرید عطر، خریدار پیش از بو کردن، با تصویر و لحن تصمیم می‌گیرد. برای همین ظاهر ساده و آرام را انتخاب کردیم و متن‌ها را کوتاه نگه داشتیم."),
        ],
      },
      {
        q: "نیرا چه مشکلی را حل می‌کند؟",
        a: "برندی که هم به مصرف‌کننده می‌فروشد و هم به شرکت‌ها، معمولاً سایتی دارد که فقط با یکی از آن دو حرف می‌زند. نیرا هر دو مخاطب را در یک سایت دارد، بی‌آنکه یکی در دیگری گم شود.",
        details: [
          p("اگر شما هم دو جور مشتری دارید، مثلاً مصرف‌کننده و سازمان، همین ساختار کمک می‌کند هر کدام ویترین خودش را ببیند و مسیر خرید یا درخواستش کوتاه بماند."),
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
        q: "بازدیدکننده در کانتمو چه چیزهایی می‌بیند؟",
        a: "کانتمو مسیر کار را در چهار قدم نشان می‌دهد: از ثبت پروژه تا تحویل. خدمات تولید محتوا، یعنی ویدیو، صدا، متن و تصویر، جداگانه معرفی شده‌اند و بخش همکاران، تدوین ویدیو، طراحی گرافیک و نویسندگی تبلیغاتی را در بر دارد.",
        details: [
          p("بازدیدکننده همان لحظه قیمت را می‌بیند، چون سیستم قیمت‌گذاری در همه‌جای سایت یکی است و هم برای برآورد هزینه کار می‌کند و هم برای ثبت پروژه."),
        ],
      },
      {
        q: "چه تصمیم‌هایی کانتمو را برای تیم غیرفنی اداره‌پذیر کرد؟",
        a: "محتوا یک‌جا جمع شد تا تیم کانتمو خودش متن‌ها را ویرایش کند. سیستم قیمت‌گذاری هم یک بار نوشته شد و پشت هر دو بخش، برآورد و ثبت پروژه، قرار گرفت تا قیمت‌ها هیچ‌وقت با هم ناجور نشوند.",
        details: [
          p("حرکت‌ها دسترس‌پذیر ماندند، ریزه‌کاری‌های راست‌چین با دقت بررسی شد و منو روی موبایل واکنش‌گراست. این‌ها چیزهایی‌اند که کاربر متوجهشان نمی‌شود، ولی نبودنشان را حس می‌کند."),
        ],
      },
      {
        q: "کانتمو چه مشکلی را حل می‌کند؟",
        a: "کانتمو خدمات محتوا می‌فروشد و هم‌زمان تولیدکننده‌ی محتوا جذب می‌کند؛ یعنی دو مخاطب با دو نیاز. سایت هر دو را در یک پلتفرم کنار هم می‌نشاند: مشتری قیمت می‌گیرد و تولیدکننده راه همکاری را پیدا می‌کند.",
        details: [
          p("پلتفرم‌های خدماتی که قیمتشان به ورودی مشتری بستگی دارد، معمولاً با فرم و تماس دستی کند می‌شوند. قیمت‌گذاری زنده این مرحله را کوتاه می‌کند و تیم را از برآوردهای تکراری خلاص می‌کند."),
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
        q: "بازدیدکننده در سایت خانه شمیم چه چیزهایی می‌بیند؟",
        a: "سایت اکوسیستم را با فهرستی از حوزه‌ها نشان می‌دهد، از فناوری و آموزش تا استارتاپ‌سازی؛ بخشی هم برای چیزهایی که در این اکوسیستم با هم ساخته شده دارد، و بخش «جای شما کجاست؟» با راه‌های همکاری.",
        details: [
          p("لندینگ داستان‌محور است و با انیمیشن پیشرفته پیش می‌رود تا بازدیدکننده پیش از رسیدن به فرم‌ها، تصویر کلی اکوسیستم را بفهمد. فرم‌های همکاری منظم‌اند و ورودی‌هایشان با Zod بررسی می‌شود."),
        ],
      },
      {
        q: "چه تصمیم‌هایی چند برند زیرمجموعه را کنار هم نشاند؟",
        a: "به‌جای ساختن سایت جداگانه برای هر برند، یک سیستم طراحی گسترش‌پذیر ساختیم که همه‌ی برندهای زیرمجموعه از آن استفاده می‌کنند. بخش‌های تازه با همان اجزا ساخته می‌شوند و ظاهر یکدست می‌ماند.",
        details: [
          p("خانه شمیم مجموعه‌ای از کسب‌وکارهای به‌هم‌پیوسته است، پس مهم‌ترین سؤال این بود که این‌ها چطور کنار هم قرار می‌گیرند. چیدمان واکنش‌گرا همین جواب را روی هر صفحه‌نمایشی حفظ می‌کند."),
        ],
      },
      {
        q: "خانه شمیم چه مشکلی را حل می‌کند؟",
        a: "اکوسیستم‌های چندبرندی معمولاً شریک بالقوه را سردرگم می‌کنند: از کجا شروع کنم؟ خانه شمیم راه ورود را روشن می‌کند و هر نوع همکاری را با فرمی مشخص به مسیر درست می‌فرستد.",
        details: [
          p("اگر کسب‌وکار شما هم چند زیرمجموعه دارد، سایت باید پیش از معرفی تک‌تک برندها، رابطه‌شان را توضیح بدهد؛ تا شریک بداند کجای نقشه ایستاده است."),
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
        q: "دانشجوی بین‌المللی در ASA-Study از چه مسیری می‌گذرد؟",
        a: "مسیر پذیرش در پنج قدم نشان داده می‌شود: ثبت درخواست، ارزیابی، انتخاب دانشگاه، مدارک و پذیرش. فهرست دانشگاه‌ها دانشگاه‌های علوم پزشکی را هم دارد و با فیلتر شهر می‌شود آن‌ها را مقایسه کرد.",
        details: [
          p("صفحه‌ی اصلی، ASA-Study را همراهی مطمئن برای تحصیل در ایران معرفی می‌کند و نمای کلی خدمات را نشان می‌دهد. هر دانشگاه صفحه‌ای داده‌محور دارد، پس مقایسه‌ی دانشگاه‌ها بی‌خواندن چند صفحه‌ی طولانی ممکن است."),
        ],
      },
      {
        q: "چه تصمیم‌هایی سایت را واقعاً دوزبانه کرد؟",
        a: "فارسی و انگلیسی دو آدرس جدا دارند و چیدمان راست‌چین فقط روی نسخه‌ی فارسی اعمال می‌شود؛ یعنی ترجمه‌ای ساده روی همان صفحه نیست. هر دانشگاه یک سند مستقل و دوزبانه است تا محتوا بعداً به CMS وصل شود.",
        details: [
          p("دانشجوی بین‌المللی باید دانشگاه‌ها، شهرها و رشته‌ها را به زبان خودش مقایسه کند. برای همین ناوبری دوزبانه با next-intl و رفتار کامل راست‌چین از اول جزو معماری بود، نه وصله‌ای که آخر کار اضافه شود."),
        ],
      },
      {
        q: "ASA-Study چه مشکلی را حل می‌کند؟",
        a: "انتخاب دانشگاه در کشوری دیگر، بی‌اطلاعاتی به زبان خودتان، تصمیمی پرخطر است. ASA-Study اطلاعات دانشگاه‌ها را در فهرستی جست‌وجوپذیر و به دو زبان کنار هم می‌گذارد و مسیر پذیرش را شفاف می‌کند.",
        details: [
          p("اگر مخاطبانتان از کشورهای مختلف می‌آیند، سایت دوزبانه فقط ترجمه نیست؛ ساختار آدرس، برچسب زبان برای گوگل و رفتار صفحه در هر زبان هم باید درست باشد."),
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
        q: "اپلیکیشن Prowem برای کاربر چه دارد؟",
        a: "نتیجه‌ی زنده‌ی بازی‌ها، برنامه‌ی مسابقات، جدول رده‌بندی و فهرست گلزنان در دو صفحه‌ی گوشی نمایش داده می‌شود. همین داده در دسترس مسئولان مسابقه هم هست تا تیم‌ها و بازیکن‌ها را مدیریت کنند.",
        details: [
          p("کاربر می‌خواهد وسط بازی ببیند نتیجه چند است؛ پس به‌روزرسانی زنده مهم‌ترین امکان اپ است. مسئول مسابقه هم در همان اپ تیم و بازیکن را مدیریت می‌کند و برای همین معماری برنامه ماژولار نوشته شده است."),
        ],
      },
      {
        q: "چه تصمیم‌هایی iOS، اندروید و پلتفرم رویداد را هماهنگ نگه داشت؟",
        a: "یک پایه‌ی کد Flutter هر دو سیستم‌عامل را می‌سازد و یک REST API داده را میان اپ موبایل و پلتفرم رویداد هماهنگ می‌کند. نتیجه این است که هر تغییر یک بار انجام می‌شود و روی هر دو سیستم‌عامل یکسان است.",
        details: [
          p("مسابقات، تیم‌ها، بازیکن‌ها و مکان‌ها باید همیشه با هم هماهنگ باشند و نتیجه‌ها همان لحظه‌ی بازی به‌روز شوند. با یک منبع داده و یک پایه‌ی کد، احتمال اینکه iOS چیزی متفاوت با اندروید نشان دهد کم می‌شود."),
        ],
      },
      {
        q: "Prowem چه مشکلی را حل می‌کند؟",
        a: "برگزارکننده‌ی مسابقه هم‌زمان با چند کار درگیر است: ثبت تیم‌ها، تعیین برنامه، اعلام نتیجه و خبررسانی به تماشاگران. اپ همه‌ی این‌ها را از یک جا اداره می‌کند و نتیجه را همان لحظه به کاربر می‌رساند.",
        details: [
          p("اگر محصولتان باید داده‌ی زنده را به اپ موبایل و سایت برساند، همین الگو، یعنی یک API مشترک و یک پایه‌ی کد برای هر دو سیستم‌عامل، هزینه و خطا را کم می‌کند."),
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
        q: "مشتری در فروشگاه مجسمه سعیدی چه می‌بیند؟",
        a: "فروشگاه، مجسمه‌ها و دکورهای دست‌ساز را با چیدمان موبایل‌محور نشان می‌دهد: دسته‌بندی روشن محصولات، صفحه‌ی هر محصول، سبد خرید پایدار و مسیر خرید با فرم‌هایی که ورودی‌ها را بررسی می‌کنند.",
        details: [
          p("چون اثر دست‌ساز باید دیده شود، تصویر محصول بیشترین جا را دارد و متن‌ها کوتاه‌اند. سبد خرید حتی با بستن صفحه هم حفظ می‌شود؛ برای کسی که چند روز درباره‌ی خرید یک اثر فکر می‌کند، این مهم است."),
        ],
      },
      {
        q: "چه تصمیم‌هایی فروشگاه را لوکس و پیداشدنی کرد؟",
        a: "فروشگاه از اول برای سئو و موبایل ساخته شد: دسته‌بندی محصولات منطقی است تا گوگل آن را بفهمد. لایه‌ی داده هم با Prisma و PostgreSQL آماده‌ی بهره‌برداری است.",
        details: [
          p("مرز روشن میان کاربر مهمان و کاربر واردشده، یعنی اینکه چه چیزی برای مهمان است و چه چیزی برای حساب کاربری، باعث می‌شود پنل مدیریت بعداً بی‌بازنویسی اضافه شود."),
        ],
      },
      {
        q: "مجسمه سعیدی چه مشکلی را حل می‌کند؟",
        a: "محصول دست‌ساز را نمی‌شود با قالب فروشگاهی عمومی خوب نشان داد. این فروشگاه اثر را در مرکز می‌گذارد، در جست‌وجو پیدا می‌شود و هر وقت لازم شد، پنل مدیریت هم به آن اضافه می‌شود.",
        details: [
          p("اگر محصولتان دست‌ساز، کم‌تعداد یا گران است، خریدار بیش از قیمت به حس صفحه اعتماد می‌کند. دلیل ساختن فروشگاه اختصاصی به‌جای قالب هم همین بود."),
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
        q: "خریدار در علم‌کالا از چه مسیری می‌گذرد؟",
        a: "فروشگاه از دسته‌بندی شروع می‌شود: تجهیزات آزمایشگاهی، رباتیک و آموزشی، با محصولات برگزیده در ابتدا. هر دسته راهنمای کاربرد دارد و جعبه‌ی «در انتخاب کمکم کنید» خریدار را به مشاوره می‌رساند.",
        details: [
          p("این ترتیب برعکس فروشگاه‌های معمولی است که از فهرست محصولات شروع می‌کنند. این‌جا اول پرسیده می‌شود خریدار می‌خواهد با تجهیزات چه کند، بعد محصول مناسب نشان داده می‌شود."),
        ],
      },
      {
        q: "چه تصمیم‌هایی فروشگاه را به راهنمای خرید تبدیل کرد؟",
        a: "سه مسیر کنار هم ساخته شد: گشتن میان محصولات از راه دسته‌بندی، راهنمای کاربرد برای هر دسته و مسیر مشاوره برای کسی که مطمئن نیست چه می‌خواهد. هیچ‌کدام خریدار را مجبور نمی‌کند اصطلاح فنی بداند.",
        details: [
          p("تجهیزات علمی معمولاً با نام فنی فروخته می‌شوند و خریدار مدرسه یا کلاس همیشه آن نام را نمی‌داند. برای همین زبان سایت بر پایه‌ی کاربرد نوشته شده و مشاوره همیشه فقط یک قدم فاصله دارد."),
        ],
      },
      {
        q: "علم‌کالا چه مشکلی را حل می‌کند؟",
        a: "خریدار تجهیزات آزمایشگاه، رباتیک یا کلاس معمولاً نمی‌داند کدام محصول به کارش می‌آید. علم‌کالا به‌جای یک فهرست خشک، او را قدم‌به‌قدم به انتخاب نزدیک می‌کند و در صورت نیاز به مشاور وصلش می‌کند.",
        details: [
          p("هر کسب‌وکاری که محصول تخصصی می‌فروشد با همین مشکل روبه‌روست: مشتری محصول را خوب نمی‌شناسد. فروشگاهی که خریدار را راهنمایی کند یک راه‌حل است، ولی همیشه بهترین نیست؛ در بررسی رایگان همین را می‌سنجیم."),
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
        q: "بازدیدکننده در پرتال جامعه خیرین مدرسه‌ساز چه می‌بیند؟",
        a: "پرتال سه محور دارد: خبر، پروژه و استان. کارت‌های پروژه‌های تازه و خبرهای استان‌ها کنار تصویر مدرسه‌ای در حال ساخت قرار گرفته‌اند و مسیرهای مشارکت خیرین از همین صفحه‌ها در دسترس است.",
        details: [
          p("چون جامعه‌ی خیرین سراسری است، استان یکی از محورهای اصلی ناوبری است؛ خیر می‌تواند ببیند در استان خودش یا استانی که برایش مهم است چه می‌گذرد."),
        ],
      },
      {
        q: "چه تصمیم‌هایی پرتال را برای خیرین روشن کرد؟",
        a: "ساختار اطلاعات بر پایه‌ی خبر، پروژه و استان چیده شد تا هر خیری بتواند بی‌راهنما به آنچه می‌خواهد برسد. مسیرهای مشارکت هم جدا و صریح‌اند، نه دکمه‌ای گم‌شده در پانویس.",
        details: [
          p("طراحی فارسی و واکنش‌گراست و روی Next.js 16 ساخته شده، پس صفحه‌ها روی موبایل هم روشن و سریع باز می‌شوند. این برای سازمانی که مخاطبانش از سن‌ها و دستگاه‌های مختلف‌اند اهمیت دارد."),
        ],
      },
      {
        q: "این پرتال چه مشکلی را حل می‌کند؟",
        a: "یک خیریه‌ی ملی جایی عمومی می‌خواست برای پروژه‌های تازه، خبرهای همه‌ی استان‌ها و راه‌های روشن مشارکت. پرتال این سه را کنار هم می‌گذارد تا خیر بداند کار به کجا رسیده و خودش چه کاری از دستش برمی‌آید.",
        details: [
          p("برای سازمان‌های غیرانتفاعی، اعتماد از شفافیت می‌آید: دیدن پروژه‌ها و خبرها، و روشن بودن اینکه مشارکت چطور انجام می‌شود. ساختار این سایت بر همین دو پایه بنا شد."),
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
