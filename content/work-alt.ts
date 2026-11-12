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
  konjed: {
    gallery: [
      l("Konjed Arcade: game cards for money management, problem solving and idea-to-execution", "کنجد آرکید: کارت‌های بازی مدیریت پول، حل مسئله و ایده تا اجرا"),
      l("The Konjed journey in three steps: play, complete a mission, earn points and achievements", "ماجراجویی در کنجد در سه قدم: بازی کن، مأموریت انجام بده، امتیاز و دستاورد بگیر"),
      l("Konjed home page on a phone", "صفحه‌ی اصلی کنجد روی موبایل"),
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
  prowem: {
    gallery: [l("Illustration of the Prowem sports app: live match scores and standings on two phone screens", "تصویرسازی اپلیکیشن ورزشی Prowem: نتیجه‌ی زنده‌ی بازی‌ها و جدول رده‌بندی روی دو صفحه‌ی موبایل")],
  },
  "mojasame-saidi": {
    gallery: [l("Illustration of the Mojasame Saidi store: handmade sculpture and decor with the phone storefront", "تصویرسازی فروشگاه مجسمه سعیدی: مجسمه و دکور دست‌ساز در کنار ویترین موبایل")],
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
