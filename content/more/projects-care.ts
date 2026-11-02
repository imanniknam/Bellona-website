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
        q: "در کدچی بیشترین دقت صرف چه چیزی شد؟",
        a: "سه چیز باید درست از آب درمی‌آمد: سطح‌بندی دوره‌ها، حس بازی در تمرین‌ها و حساب کاربری دانش‌آموز. اگر یکی از این‌ها کم بود، پلتفرم به یک سایت آموزشی معمولی تبدیل می‌شد.",
        details: [steps(["مسیرهای یادگیری با سطح‌های روشن", "گیم‌پلی، کوییز و اتاق فرار برای تمرین", "حساب دانش‌آموز با پیگیری پیشرفت"])],
      },
    ],
    en: [
      {
        q: "What took the most care on Codechee?",
        a: "Three things had to come out right: levelled courses, a sense of play in the exercises, and the student account. If any one were weak, the platform would turn into an ordinary education site.",
        details: [steps(["Learning paths with clear levels", "Gameplay, quizzes and an escape room for practice", "A student account that tracks progress"])],
      },
    ],
  },
  yasin: {
    fa: [
      {
        q: "در سایت یاسین بیشترین دقت صرف چه چیزی شد؟",
        a: "تعادل میان جلوه و سرعت. روایت بازی‌گونه باید زیبا بماند، ولی سایت روی موبایل و با اینترنت ایران نباید کند شود؛ پس هر افکت باید ارزش وزنش را نشان می‌داد.",
        details: [
          p("به همین دلیل متن‌ها یک‌جا نگه‌داری می‌شوند، رسانه برای دسکتاپ و موبایل جدا بهینه می‌شود و افکت‌ها با توان دستگاه کم و زیاد می‌شوند. نتیجه، سایتی است که مسیر دوره‌ها، مربی‌ها و ثبت‌نام را بدون کندی نشان می‌دهد."),
        ],
      },
    ],
    en: [
      {
        q: "What took the most care on the Yasin site?",
        a: "The balance between spectacle and speed. The game-like narrative has to stay beautiful, but the site must not slow down on phones or on Iranian connections, so every effect had to earn its weight.",
        details: [
          p("That is why the copy is kept in one place, media is optimised separately for desktop and mobile, and effects scale with the power of the device. The result is a site that presents the course paths, mentors and registration without lag."),
        ],
      },
    ],
  },
  konjed: {
    fa: [
      {
        q: "در کنجد بیشترین دقت صرف چه چیزی شد؟",
        a: "حس بازی بودن در همه‌ی بخش‌ها. از ورود سینمایی تا آرکید، از مأموریت‌ها تا ویترین پروژه‌ها، هر بخش باید مثل ادامه‌ی همان دنیای تصویرسازی‌شده به نظر می‌رسید، نه صفحه‌ای جدا.",
        details: [
          steps(["ورود سینمایی در دنیای بازی", "آرکید مینی‌گیم‌های مهارتی", "مأموریت، امتیاز و دستاورد", "مدرسه‌ی مهارت و ویترین پروژه‌ها"]),
          p("وقتی ساختار یکدست باشد، نوجوان فرق بین بازی و یادگیری را حس نمی‌کند، و این همان چیزی است که کنجد می‌خواست. برای همین مأموریت‌ها و امتیازها فقط تزئین نیستند؛ آن‌ها همان راهی هستند که پیشرفت را به نوجوان نشان می‌دهند و او را به قدم بعدی می‌برند، چه روی گوشی باشد چه روی کامپیوتر."),
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
        q: "در میکروشمیم بیشترین دقت صرف چه چیزی شد؟",
        a: "اینکه هر فضا روشن توضیح داده شود بدون اینکه هنر بازیگوش سایت کم‌رنگ شود. صفحه‌ها ساده‌اند، ولی هرکدام یک دعوت روشن دارند.",
        details: [p("این تعادل میان جسارت بصری و وضوح، دشوارترین بخش کار بود و ساختار چهار صفحه‌ی اصلی، یعنی مدرسه‌ی مهارت، فضای کار اشتراکی، استودیو محتوا و رویدادها، از همین تعادل آمد.")],
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
        q: "در سبزینو بیشترین دقت صرف چه چیزی شد؟",
        a: "بخش‌هایی که در یک کاتالوگ لازم نیستند ولی در فروشگاه واقعی حیاتی‌اند: پرداخت، حساب مشتری و مدیریت موجودی. اگر اشتباه کار کنند، فروش متوقف می‌شود.",
        details: [
          steps(["تسویه‌حساب و پرداخت آنلاین با زرین‌پال", "حساب مشتری و سابقه‌ی سفارش‌ها", "پنل مدیریت محصول، موجودی، قیمت و سفارش"]),
          p("این سه بخش با هم کار می‌کنند: سفارشی که پرداخت می‌شود باید در پنل مدیریت دیده شود و موجودی را به‌روز کند."),
        ],
      },
    ],
    en: [
      {
        q: "What took the most care on Sabzino?",
        a: "The parts a catalogue does not need but a real store depends on: payment, customer accounts and inventory management. If any of them fails, sales stop.",
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
        q: "در سایت نیرا بیشترین دقت صرف چه چیزی شد؟",
        a: "نشان دادن دو کار متفاوت نیرا در یک سایت آرام: فروش عطر اورجینال و ساخت عطر اختصاصی برای شرکت‌ها. هرکدام باید جای خودش را داشته باشد و هیچ‌کدام شلوغ نشود.",
        details: [
          steps(["ویترین مجموعه‌ی نیرا", "بخش ساخت عطر سازمانی", "گالری و آرشیو", "جست‌وجوی محصول و سبد خرید"]),
          p("ساختار ساده به این دلیل انتخاب شد که حس لوکس از فضای خالی می‌آید، نه از تعداد عناصر."),
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
        q: "در کانتمو بیشترین دقت صرف چه چیزی شد؟",
        a: "موتور قیمت‌گذاری مشترک. اگر برآورد هزینه و ثبت پروژه دو محاسبه‌ی جدا بودند، روزی عددهایشان فرق می‌کرد؛ برای همین فقط یک موتور ساخته شد.",
        details: [p("تیم کانتمو باید بدون برنامه‌نویس متن‌ها را عوض کند و بازدیدکننده همان لحظه قیمت را ببیند. هر دو خواسته به یک تصمیم برمی‌گشتند: منطق و محتوا باید یک‌جا باشند، نه پراکنده در صفحه‌ها.")],
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
        q: "در سایت خانه شمیم بیشترین دقت صرف چه چیزی شد؟",
        a: "نشان دادن اینکه مجموعه یک کل است، نه چند کسب‌وکار پراکنده. داستان لندینگ، سیستم طراحی مشترک و فرم‌های همکاری هرکدام بخشی از این پیام‌اند.",
        details: [
          steps(["لندینگ داستان‌محور با انیمیشن پیشرفته", "سیستم طراحی مقیاس‌پذیر برای برندهای زیرمجموعه", "فرم‌های همکاری ساختاریافته با اعتبارسنجی", "چیدمان واکنش‌گرا در همه‌ی بخش‌ها"]),
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
        q: "در ASA-Study بیشترین دقت صرف چه چیزی شد؟",
        a: "دوزبانه بودن واقعی: آدرس جدا برای هر زبان، راست‌به‌چپ کامل برای فارسی و پروفایل دانشگاه‌ها به‌صورت داده. این سه باعث می‌شوند هم کاربر و هم گوگل هر زبان را درست بفهمند.",
        details: [p("چون هر دانشگاه یک سند مستقل و دوزبانه است، افزودن دانشگاه جدید یعنی افزودن یک سند، نه ساختن یک صفحه‌ی تازه از صفر.")],
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
        q: "در Prowem بیشترین دقت صرف چه چیزی شد؟",
        a: "همگام ماندن داده میان اپ iOS، اپ اندروید و پلتفرم رویداد. کاربر باید وسط بازی همان نتیجه‌ای را ببیند که مدیر مسابقه ثبت کرده است.",
        details: [steps(["یک کد Flutter برای هر دو سیستم‌عامل", "REST API میان اپ و پلتفرم رویداد", "معماری ماژولار برای مدیریت تیم و بازیکن"])],
      },
    ],
    en: [
      {
        q: "What took the most care on Prowem?",
        a: "Keeping data in sync between the iOS app, the Android app and the event platform. A fan has to see mid-match the same result the organiser recorded.",
        details: [steps(["One Flutter codebase for both operating systems", "A REST API between the app and the event platform", "A modular architecture for team and player management"])],
      },
    ],
  },
  "mojasame-saidi": {
    fa: [
      {
        q: "در فروشگاه سعیدی بیشترین دقت صرف چه چیزی شد؟",
        a: "اینکه اثر دست‌ساز روی موبایل لوکس دیده شود و در جست‌وجو پیدا شود. تصمیم‌ها، از ساختار دسته‌بندی تا سبد خرید، برای همین دو هدف گرفته شدند.",
        details: [steps(["فروشگاه mobile-first و سئومحور", "سبد خرید پایدار با مرز روشن احراز هویت", "فرم‌های اعتبارسنجی‌شده در مسیر خرید", "لایه‌ی داده با Prisma و PostgreSQL"])],
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
        q: "در علم‌کالا بیشترین دقت صرف چه چیزی شد؟",
        a: "اینکه فروشگاه جای مشاور را نگیرد، ولی خریدار را تنها هم نگذارد. دسته‌بندی و راهنمای کاربرد بیشتر مشتریان را به انتخاب می‌رسانند و بقیه مسیر مشاوره را دارند.",
        details: [
          steps(["کشف محصول بر پایه‌ی دسته‌بندی و محصولات منتخب", "راهنمای کاربرد برای هر دسته", "مسیر مشاوره‌محور برای خریداری که کمک می‌خواهد"]),
          p("این سه لایه از ساده به شخصی پیش می‌روند: اول سایت جواب می‌دهد، و فقط اگر کافی نبود انسان وارد می‌شود. به این ترتیب خریدار مطمئن سریع به محصول می‌رسد و خریدار بلاتکلیف هم بدون شرم از پرسیدن، راه مشاوره را پیدا می‌کند."),
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
        q: "در پرتال خیرین بیشترین دقت صرف چه چیزی شد؟",
        a: "اینکه خیر بدون راهنما بفهمد چه شده و چه می‌تواند بکند. معماری اطلاعات بر پایه‌ی خبر، پروژه و استان است و مسیر مشارکت جداگانه و صریح نمایش داده می‌شود.",
        details: [
          steps(["خبر: آخرین اتفاق‌ها", "پروژه: مدرسه‌هایی که ساخته می‌شوند", "استان: خبرها و پروژه‌ها به تفکیک منطقه", "مشارکت: مسیرهای روشن برای خیرین"]),
          p("این چهار محور در طراحی فارسی واکنش‌گرا کنار هم می‌نشینند و هر کدام از بقیه یک کلیک فاصله دارند؛ پس خیری که فقط می‌خواهد ببیند پروژه‌ها به کجا رسیده، و خیری که می‌خواهد مشارکت کند، هر دو سریع به مقصدشان می‌رسند."),
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
