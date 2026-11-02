import type { Dict, Locale } from "./types";
import type { Project } from "./work";

/**
 * Descriptive alt text for every case-study image (SEO-GUIDELINE B5), written from what each screenshot
 * actually shows. `gallery` follows the order of `project.gallery` (desktop shots first, then mobile).
 * Cover images use the per-type pattern in content/{en,fa}.ts › work.coverAlt (B6).
 */
type L = { en: string; fa: string };
const l = (en: string, fa: string): L => ({ en, fa });

export const workAlt: Record<string, { gallery: L[] }> = {
  "ai-real-estate-os": {
    gallery: [
      l("Current projects section of the kharazie.at real-estate website: land and housing projects in Austria", "بخش پروژه‌های جاری در سایت املاک kharazie.at: پروژه‌های زمین و مسکونی در اتریش"),
      l("Direct-from-owner section of kharazie.at, explaining how plots and development projects are checked", "بخش خرید مستقیم از مالک در سایت kharazie.at و روش بررسی زمین و پروژه‌ها"),
      l("Investors and developers section with the enquiry form on kharazie.at", "بخش سرمایه‌گذاران و سازندگان همراه با فرم درخواست در سایت kharazie.at"),
      l("Footer and newsletter sign-up of the kharazie.at website", "پانویس و عضویت در خبرنامه‌ی سایت kharazie.at"),
      l("kharazie.at home page on a phone", "صفحه‌ی اصلی سایت kharazie.at روی موبایل"),
    ],
  },
  codechee: {
    gallery: [
      l("Smart learning section of the Codechee website, from talent discovery to personal goals", "بخش آموزش هوشمندانه در سایت کدچی؛ از شناسایی استعداد تا هدف‌گذاری شخصی"),
      l("Codechee learning paths (Starcamps): digital creativity, data analysis with Python, hacking and security", "مسیرهای یادگیری کدچی (استارکمپ‌ها): خلاقیت دیجیتال، تحلیل داده با پایتون، هک و امنیت"),
      l("Student project videos in the experience section of the Codechee website", "ویدیوی پروژه‌های دانش‌آموزان در بخش تجربه‌ی سایت کدچی"),
      l("Frequently asked questions on the Codechee website", "پرسش‌های متداول در سایت کدچی"),
      l("Codechee home page on a phone", "صفحه‌ی اصلی کدچی روی موبایل"),
    ],
  },
  yasin: {
    gallery: [
      l("Illustrated adventure map on the Yasin Skill School home page", "نقشه‌ی تصویرسازی‌شده‌ی ماجراجویی در صفحه‌ی اصلی مدرسه مهارت یاسین"),
      l("Life-skills and future-skills cards on the Yasin Skill School website", "کارت‌های مهارت‌های زندگی و مهارت‌های آینده در سایت مدرسه مهارت یاسین"),
      l("Specialized courses at Yasin Skill School: ICDL, graphic design, digital marketing, accounting and more", "دوره‌های تخصصی مدرسه مهارت یاسین: ICDL، طراحی گرافیک، دیجیتال مارکتینگ، حسابداری و بیشتر"),
      l("Yasin Skill School home page on a phone", "صفحه‌ی اصلی مدرسه مهارت یاسین روی موبایل"),
    ],
  },
  konjed: {
    gallery: [
      l("Konjed Arcade: game cards for money management, problem solving and idea-to-execution", "کنجد آرکید: کارت‌های بازی مدیریت پول، حل مسئله و ایده تا اجرا"),
      l("The Konjed journey in three steps: play, complete a mission, earn points and achievements", "ماجراجویی در کنجد در سه قدم: بازی کن، مأموریت انجام بده، امتیاز و دستاورد بگیر"),
      l("Konjed home page on a phone", "صفحه‌ی اصلی کنجد روی موبایل"),
    ],
  },
  microshamim: {
    gallery: [
      l("Floor-plan model of the Microshamim space, shown before visiting", "ماکت پلان فضای میکروشمیم برای دیدن محل پیش از مراجعه"),
      l("Skills you can learn at Microshamim, shown as colored tags", "مهارت‌هایی که در میکروشمیم یاد می‌گیرید، به‌شکل برچسب‌های رنگی"),
      l("Microshamim home page on a phone", "صفحه‌ی اصلی میکروشمیم روی موبایل"),
    ],
  },
  sabzino: {
    gallery: [
      l("Sabzino product categories: natural drinks, international spices and vegetable-based products", "دسته‌بندی محصولات سبزینو: نوشیدنی‌های طبیعی، ادویه‌های بین‌المللی و محصولات بر پایه‌ی سبزی"),
      l("Sabzino product catalog with natural verjuice and prepared aubergine products", "فهرست محصولات سبزینو با آبغوره‌ی طبیعی و محصولات بادمجان آماده"),
      l("Brand story section of the Sabzino online store", "بخش داستان برند در فروشگاه اینترنتی سبزینو"),
      l("Sabzino store home page on a phone", "صفحه‌ی اصلی فروشگاه سبزینو روی موبایل"),
    ],
  },
  "dane-news": {
    gallery: [
      l("Dane Scientific News home page: breaking-news list and category sidebar", "صفحه‌ی اصلی پایگاه علمی خبری دانه: فهرست اخبار تازه و دسته‌بندی‌ها"),
      l("Space and astronomy section on the Dane Scientific News home page", "بخش فضا و نجوم در صفحه‌ی اصلی پایگاه علمی خبری دانه"),
      l("Technology news section of Dane Scientific News", "بخش اخبار فناوری در پایگاه علمی خبری دانه"),
      l("Dane Scientific News on a phone", "پایگاه علمی خبری دانه روی موبایل"),
    ],
  },
  "nira-perfume": {
    gallery: [
      l("Nira collection: perfume bottles in the Nira Perfume online store", "مجموعه‌ی عطرهای نیرا در فروشگاه اینترنتی عطر نیرا"),
      l("Custom perfume creation for brands, a section of the Nira Perfume website", "بخش ساخت عطر اختصاصی برای برندها در سایت عطر نیرا"),
      l("About section of Nira Perfume: perfume as the art of lasting emotion", "بخش درباره‌ی عطر نیرا: عطر، هنر خلق احساس ماندگار"),
      l("Nira Perfume home page on a phone", "صفحه‌ی اصلی عطر نیرا روی موبایل"),
    ],
  },
  contemo: {
    gallery: [
      l("Your story on Contemo: from submitting a project to delivery, four steps", "داستان شما در کانتمو: از ثبت پروژه تا اجرا در چهار مرحله"),
      l("Contemo content services: video, audio, text and image content production", "خدمات کانتمو: تولید محتوای ویدیویی، صوتی، متنی و تصویری"),
      l("Contemo freelancers section: video editing, graphic design and copywriting", "بخش کارپذیرهای کانتمو: تدوین ویدیو، طراحی گرافیک و محتوانویسی"),
      l("Contemo home page on a phone", "صفحه‌ی اصلی کانتمو روی موبایل"),
    ],
  },
  "shamim-house": {
    gallery: [
      l("Shamim House ecosystem: a list of areas, from technology to education and venture building", "اکوسیستم خانه شمیم: فهرست حوزه‌ها از فناوری و آموزش تا سرمایه‌گذاری"),
      l("Things built together in the Shamim House ecosystem", "چیزهایی که در اکوسیستم خانه شمیم با هم ساخته شده"),
      l("Where do you fit in the Shamim House ecosystem? Paths for collaboration", "جای شما در اکوسیستم شمیم کجاست؟ مسیرهای همکاری"),
      l("Shamim House home page on a phone", "صفحه‌ی اصلی خانه شمیم روی موبایل"),
    ],
  },
  "asa-study": {
    gallery: [
      l("ASA-Study: a trusted partner for studying in Iran, with its services overview", "ASA-Study: همراه مطمئن برای تحصیل در ایران و مرور خدمات"),
      l("ASA-Study admission journey: submit an application, evaluation, university selection, documents, admission", "مسیر پذیرش در ASA-Study: ارسال درخواست، ارزیابی پرونده، انتخاب دانشگاه، آماده‌سازی مدارک و دریافت پذیرش"),
      l("ASA-Study university directory with medical universities and city filters", "فهرست دانشگاه‌های ASA-Study با دانشگاه‌های علوم پزشکی و فیلتر شهر"),
      l("ASA-Study home page on a phone", "صفحه‌ی اصلی ASA-Study روی موبایل"),
    ],
  },
  prowem: {
    gallery: [l("Illustration of the Prowem sports app: live match scores and standings on two phone screens", "تصویرسازی اپلیکیشن ورزشی Prowem: نتیجه‌ی زنده‌ی بازی‌ها و جدول رده‌بندی روی دو صفحه‌ی موبایل")],
  },
  "mojasame-saidi": {
    gallery: [l("Illustration of the Mojasame Saidi store: handmade sculpture and decor with the phone storefront", "تصویرسازی فروشگاه مجسمه سعیدی: مجسمه و دکور دست‌ساز در کنار ویترین موبایل")],
  },
  "elm-kala": {
    gallery: [l("Illustration of the Elm-Kala store: laboratory, robotics and education categories with a help-me-choose box", "تصویرسازی فروشگاه علم‌کالا: دسته‌های آزمایشگاهی، رباتیک و آموزشی با بخش کمک برای انتخاب")],
  },
  "school-builders": {
    gallery: [l("Illustration of the Iran School-Builders Charity portal: a school under construction with project and province news cards", "تصویرسازی پرتال جامعه خیرین مدرسه‌ساز کشور: مدرسه‌ی در حال ساخت با کارت‌های پروژه و اخبار استان‌ها")],
  },
};

/**
 * Hand-written meta descriptions for summaries that do not fit 100–160 characters once the invitation is added
 * (lib/metadata.ts › caseStudyDescription). Every other case study derives its description from its summary.
 */
export const workMeta: Record<string, Partial<Record<Locale, string>>> = {
  "ai-real-estate-os": {
    en: "A complete sales-automation system for real estate: investor discovery, outreach, replies, project analysis and documents. Bellona Agency case study.",
  },
};

/** Alt text for a project's cover (card and case-study hero): the per-type pattern with the client's name. */
export function coverAltText(p: Project, d: Dict): string {
  return d.work.coverAlt[p.type].replace("{name}", p[d.locale].client);
}

/** Alt text for gallery image `i` (falls back to the client name plus a number if none was written). */
export function galleryAltText(p: Project, i: number, locale: Locale): string {
  return workAlt[p.slug]?.gallery[i]?.[locale] ?? `${p[locale].client} ${i + 1}`;
}
