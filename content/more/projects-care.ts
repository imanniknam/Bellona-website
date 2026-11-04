import type { Answer } from "../spokes";
import type { Locale } from "../types";

/**
 * "What took the most care?" (SEO-GUIDELINE v2, 5-1): one more section per case study, listing what each project
 * had to get right and why. Like projects-extra.ts it only restates facts already in content/work.ts and the
 * screenshots; there are no figures, results or quotes here.
 */
type Care = Record<string, Record<Locale, Answer[]>>;

const p = (text: string) => ({ kind: "p" as const, text });
const steps = (items: string[]) => ({ kind: "steps" as const, items });

export const care: Care = {
  codechee: {
    fa: [
      {
        q: "در کدچی بیش از همه روی چه چیزی وسواس داشتیم؟",
        a: "سه چیز باید درست از آب درمی‌آمد: مرحله‌بندی دوره‌ها، حس بازی در تمرین‌ها و حساب کاربری دانش‌آموز. اگر یکی لنگ می‌زد، پلتفرم به یک سایت آموزشی معمولی تبدیل می‌شد.",
        details: [steps(["مسیرهای یادگیری با مرحله‌های روشن", "بازی، آزمونک و اتاق فرار برای تمرین", "حساب کاربری دانش‌آموز با پیگیری پیشرفت"])],
      },
    ],
    en: [
      {
        q: "What took the most care on Codechee?",
        a: "Three things had to come out right: leveled courses, a sense of play in the exercises, and the student account. If any one were weak, the platform would turn into an ordinary education site.",
        details: [steps(["Learning paths with clear levels", "Gameplay, quizzes and an escape room for practice", "A student account that tracks progress"])],
      },
    ],
  },
  yasin: {
    fa: [
      {
        q: "در سایت یاسین بیش از همه روی چه چیزی وسواس داشتیم؟",
        a: "تعادل میان جلوه و سرعت. روایت بازی‌گونه باید زیبا می‌ماند، ولی سایت نباید روی موبایل و با اینترنت ایران کند می‌شد؛ پس هر جلوه‌ی بصری باید ارزش وزنش را ثابت می‌کرد.",
        details: [
          p("برای همین متن‌ها یک‌جا نگه‌داری می‌شوند، رسانه‌ها برای دسکتاپ و موبایل جداگانه بهینه می‌شوند و جلوه‌ها به اندازه‌ی توان دستگاه کم و زیاد می‌شوند. نتیجه سایتی است که مسیر دوره‌ها، مربی‌ها و ثبت‌نام را بی‌کندی نشان می‌دهد."),
        ],
      },
    ],
    en: [
      {
        q: "What took the most care on the Yasin site?",
        a: "The balance between spectacle and speed. The game-like narrative has to stay beautiful, but the site must not slow down on phones or on Iranian connections, so every effect had to earn its weight.",
        details: [
          p("That is why the copy is kept in one place, media is optimized separately for desktop and mobile, and effects scale with the power of the device. The result is a site that presents the course paths, mentors and registration without lag."),
        ],
      },
    ],
  },
  konjed: {
    fa: [
      {
        q: "در کنجد بیش از همه روی چه چیزی وسواس داشتیم؟",
        a: "اینکه همه‌جا حس بازی بدهد. از ورودی سینمایی تا بخش بازی، از مأموریت‌ها تا ویترین پروژه‌ها، هر بخش باید ادامه‌ی همان دنیای تصویرسازی‌شده به نظر می‌رسید، نه صفحه‌ای جدا.",
        details: [
          steps(["ورودی سینمایی در دنیای بازی", "بخش بازی با مینی‌گیم‌های مهارتی", "مأموریت، امتیاز و دستاورد", "مدرسه‌ی مهارت و ویترین پروژه‌ها"]),
          p("وقتی ساختار یکدست باشد، نوجوان مرز بازی و یادگیری را حس نمی‌کند؛ و کنجد دقیقاً همین را می‌خواست. برای همین مأموریت‌ها و امتیازها فقط تزئین نیستند؛ همان راهی‌اند که پیشرفت را به نوجوان نشان می‌دهند و او را به قدم بعدی می‌برند، چه روی گوشی باشد چه روی کامپیوتر."),
        ],
      },
    ],
    en: [
      {
        q: "What took the most care on Konjed?",
        a: "Keeping the feeling of play in every section. From the cinematic entrance to the arcade, from missions to the project showcase, each part had to read as a continuation of the same illustrated world, not a separate page.",
        details: [
          steps(["A cinematic entrance in a game world", "An arcade of skill-based mini-games", "Missions, points and achievements", "A skill school and a showcase of projects"]),
          p("When the structure is consistent, a teenager does not feel the line between playing and learning, which is exactly what Konjed set out to do."),
        ],
      },
    ],
  },
  microshamim: {
    fa: [
      {
        q: "در میکروشمیم بیش از همه روی چه چیزی وسواس داشتیم؟",
        a: "اینکه هر فضا روشن معرفی شود، بی‌آنکه حال‌وهوای هنری و بازیگوش سایت کم‌رنگ شود. صفحه‌ها ساده‌اند، ولی هر کدام یک دعوت روشن دارند.",
        details: [p("این تعادل میان جسارت بصری و وضوح سخت‌ترین بخش کار بود و ساختار چهار صفحه‌ی اصلی، یعنی مدرسه‌ی مهارت، فضای کار اشتراکی، استودیوی محتوا و رویدادها، از دل همین تعادل درآمد.")],
      },
    ],
    en: [
      {
        q: "What took the most care on Microshamim?",
        a: "Explaining every space clearly without dimming the playful art direction. The pages are simple, yet each one carries a clear invitation.",
        details: [p("That balance between visual boldness and clarity was the hardest part, and the structure of the four main pages, the skill school, co-working space, content studio and events, came from it.")],
      },
    ],
  },
  sabzino: {
    fa: [
      {
        q: "در سبزینو بیش از همه روی چه چیزی وسواس داشتیم؟",
        a: "بخش‌هایی که کاتالوگ لازمشان ندارد ولی فروشگاه واقعی بدون آن‌ها نمی‌چرخد: پرداخت، حساب کاربری مشتری و مدیریت موجودی. اگر درست کار نکنند، فروش می‌خوابد.",
        details: [
          steps(["تسویه‌حساب و پرداخت آنلاین با زرین‌پال", "حساب کاربری مشتری و سابقه‌ی سفارش‌ها", "پنل مدیریت محصول، موجودی، قیمت و سفارش"]),
          p("این سه بخش با هم کار می‌کنند: سفارشی که پرداخت می‌شود باید در پنل مدیریت دیده شود و موجودی را به‌روز کند."),
        ],
      },
    ],
    en: [
      {
        q: "What took the most care on Sabzino?",
        a: "The parts a catalog does not need but a real store depends on: payment, customer accounts and inventory management. If any of them fails, sales stop.",
        details: [
          steps(["Checkout and online payment through Zarinpal", "Customer accounts and order history", "An admin for products, inventory, pricing and orders"]),
          p("The three work together: an order that is paid has to show up in the admin and update inventory."),
        ],
      },
    ],
  },
  "nira-perfume": {
    fa: [
      {
        q: "در سایت نیرا بیش از همه روی چه چیزی وسواس داشتیم؟",
        a: "نشان دادن دو کار متفاوت نیرا در یک سایت آرام: فروش عطر اصل و ساخت عطر اختصاصی برای شرکت‌ها. هر کدام باید جای خودش را داشته باشد و هیچ‌کدام شلوغ نشود.",
        details: [
          steps(["ویترین مجموعه‌ی نیرا", "بخش ساخت عطر سازمانی", "گالری و آرشیو", "جست‌وجوی محصول و سبد خرید"]),
          p("ساختار ساده را انتخاب کردیم، چون حس لوکس از فضای خالی می‌آید، نه از تعداد اجزا."),
        ],
      },
    ],
    en: [
      {
        q: "What took the most care on the Nira site?",
        a: "Showing Nira's two different jobs on one calm site: selling original fragrances and creating custom scents for companies. Each has to have its own place and neither can feel crowded.",
        details: [
          steps(["A storefront for the Nira collection", "A section on custom corporate perfumes", "Gallery and archive pages", "Product search and a shopping cart"]),
          p("The simple structure was chosen because a luxury feel comes from white space, not from the number of elements."),
        ],
      },
    ],
  },
  contemo: {
    fa: [
      {
        q: "در کانتمو بیش از همه روی چه چیزی وسواس داشتیم؟",
        a: "سیستم قیمت‌گذاری مشترک. اگر برآورد هزینه و ثبت پروژه دو محاسبه‌ی جدا داشتند، دیر یا زود عددهایشان با هم نمی‌خواند؛ برای همین فقط یک سیستم ساختیم.",
        details: [p("تیم کانتمو باید بی‌برنامه‌نویس متن‌ها را عوض کند و بازدیدکننده باید همان لحظه قیمت را ببیند. هر دو خواسته به یک تصمیم ختم می‌شد: منطق و محتوا باید یک‌جا باشند، نه پراکنده در صفحه‌ها.")],
      },
    ],
    en: [
      {
        q: "What took the most care on Contemo?",
        a: "The shared pricing engine. If the cost estimate and the project intake were two separate calculations, their numbers would one day disagree, so only one engine was built.",
        details: [p("The Contemo team must be able to change copy without a developer and a visitor must see a price on the spot. Both requirements came down to one decision: logic and content live in one place, not scattered across pages.")],
      },
    ],
  },
  "shamim-house": {
    fa: [
      {
        q: "در سایت خانه شمیم بیش از همه روی چه چیزی وسواس داشتیم؟",
        a: "نشان دادن اینکه این مجموعه یک کل است، نه چند کسب‌وکار پراکنده. داستان لندینگ، سیستم طراحی مشترک و فرم‌های همکاری هر کدام بخشی از این پیام‌اند.",
        details: [
          steps(["لندینگ داستان‌محور با انیمیشن پیشرفته", "سیستم طراحی گسترش‌پذیر برای برندهای زیرمجموعه", "فرم‌های منظم همکاری با بررسی خودکار ورودی‌ها", "چیدمان واکنش‌گرا در همه‌ی بخش‌ها"]),
        ],
      },
    ],
    en: [
      {
        q: "What took the most care on the Shamim House site?",
        a: "Showing that the group is one whole rather than several scattered businesses. The landing story, the shared design system and the collaboration forms each carry part of that message.",
        details: [
          steps(["A story-led landing page with advanced motion", "A scalable design system for the subsidiary brands", "Structured, validated collaboration forms", "Responsive layouts in every section"]),
        ],
      },
    ],
  },
  "asa-study": {
    fa: [
      {
        q: "در ASA-Study بیش از همه روی چه چیزی وسواس داشتیم؟",
        a: "دوزبانه بودنِ واقعی: آدرس جدا برای هر زبان، راست‌چین کامل برای فارسی و صفحه‌ی دانشگاه‌ها بر پایه‌ی داده. این سه باعث می‌شوند هم کاربر و هم گوگل هر زبان را درست بفهمند.",
        details: [p("چون هر دانشگاه یک سند مستقل و دوزبانه است، اضافه کردن دانشگاه تازه یعنی اضافه کردن یک سند، نه ساختن صفحه‌ای تازه از صفر.")],
      },
    ],
    en: [
      {
        q: "What took the most care on ASA-Study?",
        a: "Real bilingualism: a separate URL per language, full right-to-left layout for Persian and university profiles held as data. Those three let both users and Google understand each language correctly.",
        details: [p("Because each university is an independent, bilingual document, adding a university means adding one document, not building a new page from scratch.")],
      },
    ],
  },
  prowem: {
    fa: [
      {
        q: "در Prowem بیش از همه روی چه چیزی وسواس داشتیم؟",
        a: "هماهنگ ماندن داده میان اپ iOS، اپ اندروید و پلتفرم رویداد. کاربر باید وسط بازی همان نتیجه‌ای را ببیند که مسئول مسابقه ثبت کرده است.",
        details: [steps(["یک پایه‌ی کد Flutter برای هر دو سیستم‌عامل", "REST API میان اپ و پلتفرم رویداد", "معماری ماژولار برای مدیریت تیم و بازیکن"])],
      },
    ],
    en: [
      {
        q: "What took the most care on Prowem?",
        a: "Keeping data in sync between the iOS app, the Android app and the event platform. A fan has to see mid-match the same result the organizer recorded.",
        details: [steps(["One Flutter codebase for both operating systems", "A REST API between the app and the event platform", "A modular architecture for team and player management"])],
      },
    ],
  },
  "mojasame-saidi": {
    fa: [
      {
        q: "در فروشگاه سعیدی بیش از همه روی چه چیزی وسواس داشتیم؟",
        a: "اینکه اثر دست‌ساز روی موبایل لوکس دیده شود و در جست‌وجو پیدا شود. همه‌ی تصمیم‌ها، از ساختار دسته‌بندی تا سبد خرید، برای همین دو هدف گرفته شد.",
        details: [steps(["فروشگاه موبایل‌محور و سئومحور", "سبد خرید پایدار با مرز روشن میان کاربر مهمان و واردشده", "فرم‌های مسیر خرید با بررسی خودکار ورودی‌ها", "لایه‌ی داده با Prisma و PostgreSQL"])],
      },
    ],
    en: [
      {
        q: "What took the most care on the Mojasame Saidi store?",
        a: "Making a handmade piece look premium on a phone and be found in search. The decisions, from the category structure to the cart, were taken for those two goals.",
        details: [steps(["A mobile-first, SEO-focused store", "A persistent cart with clear authentication boundaries", "Validated forms through checkout", "A data layer with Prisma and PostgreSQL"])],
      },
    ],
  },
  "elm-kala": {
    fa: [
      {
        q: "در علم‌کالا بیش از همه روی چه چیزی وسواس داشتیم؟",
        a: "اینکه فروشگاه جای مشاور را نگیرد، ولی خریدار را هم تنها نگذارد. دسته‌بندی و راهنمای کاربرد بیشتر مشتری‌ها را به انتخاب می‌رسانند و بقیه می‌توانند مسیر مشاوره را بروند.",
        details: [
          steps(["گشتن میان محصولات بر پایه‌ی دسته‌بندی و محصولات برگزیده", "راهنمای کاربرد برای هر دسته", "مسیر مشاوره برای خریداری که کمک می‌خواهد"]),
          p("این سه لایه از ساده به شخصی می‌روند: اول خود سایت جواب می‌دهد و فقط اگر کافی نبود، یک آدم وارد می‌شود. این‌طور خریداری که می‌داند چه می‌خواهد زود به محصول می‌رسد و خریدار مردد هم بی‌خجالتِ پرسیدن، راه مشاوره را پیدا می‌کند."),
        ],
      },
    ],
    en: [
      {
        q: "What took the most care on Elm-Kala?",
        a: "Making sure the store does not replace an adviser, yet does not leave the buyer alone. Categories and use-case guidance bring most customers to a choice, and the rest have a consultation path.",
        details: [
          steps(["Category-led discovery with featured products", "Use-case guidance for each category", "A consultation-first path for buyers who want help"]),
          p("The three layers move from simple to personal: the site answers first, and a person steps in only if that is not enough."),
        ],
      },
    ],
  },
  "school-builders": {
    fa: [
      {
        q: "در پرتال خیرین بیش از همه روی چه چیزی وسواس داشتیم؟",
        a: "اینکه خیر بی‌راهنما بفهمد چه خبر است و چه کاری از دستش برمی‌آید. ساختار اطلاعات بر پایه‌ی خبر، پروژه و استان است و مسیر مشارکت جدا و صریح نمایش داده می‌شود.",
        details: [
          steps(["خبر: آخرین اتفاق‌ها", "پروژه: مدرسه‌هایی که ساخته می‌شوند", "استان: خبرها و پروژه‌ها به تفکیک استان", "مشارکت: مسیرهای روشن برای خیرین"]),
          p("این چهار محور در طراحی واکنش‌گرای فارسی کنار هم نشسته‌اند و هر کدام فقط یک کلیک با بقیه فاصله دارد؛ پس خیری که فقط می‌خواهد ببیند پروژه‌ها به کجا رسیده‌اند و خیری که می‌خواهد مشارکت کند، هر دو زود به مقصد می‌رسند."),
        ],
      },
    ],
    en: [
      {
        q: "What took the most care on the charity portal?",
        a: "Letting a donor understand, without a guide, what has happened and what they can do. The information architecture is built on news, projects and provinces, and the way to take part is shown separately and plainly.",
        details: [steps(["News: the latest developments", "Projects: schools being built", "Provinces: news and projects by region", "Participation: clear paths for donors"])],
      },
    ],
  },
};
