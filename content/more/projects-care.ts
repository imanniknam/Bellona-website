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
};
