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

};
