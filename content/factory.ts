// Type-only import: the 3D module (three.js) stays in its own lazily loaded chunk.
import type { FactoryCopy } from "@/components/factory/AgenticFactory3D";

const faDigits = (n: number) => String(n).padStart(2, "0").replace(/[0-9]/g, (c) => "۰۱۲۳۴۵۶۷۸۹"[Number(c)]);

/**
 * Persian copy for the 3D Lead → Revenue machine. Built from the English copy (which ships with the
 * component) once the scene module has loaded; untranslated canvas strings fall back to English.
 */
export const faFactoryCopy = (en: FactoryCopy): FactoryCopy => ({
  rtl: true,
  numerals: faDigits,
  stepLabel: "مرحله",
  stations: {
    cabinet: { name: "ورودی مشتری", desc: "پیدا کردن، تکمیل اطلاعات و غربال خودکار مشتری‌های بالقوه.", output: "سرنخ" },
    engine: { name: "دستیار هوشمند", desc: "دستیار دیجیتال برای کارهای تکراری، پیگیری و تصمیم‌گیری.", output: "سرنخ غربال‌شده" },
    admin: { name: "CRM", desc: "مسیر فروش، پیگیری‌ها و وضعیت معامله‌ها، خودکار.", output: "رکورد" },
    storefront: { name: "گزارش و تحلیل", desc: "گزارش‌ها خودکار ساخته و فرستاده می‌شوند.", output: "گزارش" },
    cashdesk: { name: "درآمد", desc: "تیم شما روی بستن قرارداد تمرکز می‌کند.", output: "پرداخت" },
  },
  journey: [
    ["مشتری تازه", "ورودی مشتری · یک سرنخ تازه"],
    ["غربال سرنخ", "دستیار هوشمند · تکمیل و امتیازدهی"],
    ["به‌روزرسانی CRM", "CRM · رکورد خودکار هماهنگ شد"],
    ["گزارش‌گیری", "تحلیل · گزارش ساخته و فرستاده شد"],
    ["پرداخت دریافت شد", "درآمد · ثبت در مسیر فروش"],
  ],
  ui: {
    sceneLabel:
      "ماشین سه‌بعدی تعاملی با پنج ایستگاه: ورودی مشتری، دستیار هوشمند، CRM، گزارش و تحلیل، و درآمد. برای چرخاندن بکشید و برای دیدن جزئیات، نشانگر را روی هر ایستگاه ببرید یا لمسش کنید.",
    running: "ماشین در حال کار",
    paused: "ماشین متوقف است",
    heading: "مسیر فروش، در قالب یک ماشین",
    coords: "از سرنخ تا درآمد",
    modes: { assembled: "کامل", cutaway: "برش", stations: "ایستگاه‌ها", order: "دنبال کردن یک سرنخ" },
    modeAria: "حالت ماشین",
    view: "نما",
    cameras: { overview: "کلی", side: "کنار", top: "بالا", station: "ایستگاه", flight: "پرواز" },
    cameraAria: "دوربین",
    pause: "توقف انیمیشن",
    resume: "ادامه‌ی انیمیشن",
    hint: "بچرخانید و ببینید.",
    loading: "در حال سوار کردن ماشین",
    errorTitle: "صحنه‌ی سه‌بعدی بارگذاری نشد",
    errorBody: "مطمئن شوید WebGL در مرورگرتان فعال است.",
    retry: "دوباره",
    webglMissing: "WebGL در دسترس نیست. شتاب‌دهنده‌ی سخت‌افزاری مرورگر را روشن کنید و صفحه را دوباره باز کنید.",
    contextLost: "ارتباط گرافیکی قطع شد. همین که WebGL در دسترس باشد، صحنه خودش برمی‌گردد.",
  },
  screens: {
    ...en.screens,
    engraveSub: "·  بساز  ·  خودکار کن  ·  رشد کن",
    engraveLine: "سایت  ·  محصول  ·  اتوماسیون هوش مصنوعی  ·  رشد    /    از سرنخ تا درآمد",
    card: { made: "دستیار هوشمند", by: "در حال کار.", lines: ["سرنخ تکمیل شد؛", "امتیاز گرفت و ارجاع شد.", "پیگیری فرستاده شد،", "طبق برنامه."] },
    queue: { title: "مسیر فروش در CRM", items: ["سرنخ غربال‌شده", "پیگیری سررسیده", "معامله‌ی در جریان"], busy: "به‌روزرسانی", waiting: "هماهنگ" },
    web: {
      ...en.screens.web,
      brand: "تحلیل",
      nav: "نمای کلی    گزارش‌ها    مسیر فروش",
      h1: "گزارش‌ها",
      h2a: "گزارش‌ها ساخته",
      h2b: "و فرستاده شدند.",
      p1: "همه‌ی مراحل مسیر فروش،",
      p2: "خلاصه و خودکار.",
      cta: "مشاهده‌ی گزارش",
      tag1: "ساخته شد",
      tag2: "فرستاده شد",
    },
    flyer: "گزارش",
    orders: {
      title: "سرنخ‌های تازه",
      sub: "ورودی · ۳ مورد تازه",
      names: ["سرنخ ۰۱", "سرنخ ۰۲", "سرنخ ۰۳"],
      statuses: ["سرنخ تازه", "در حال غربال", "غربال شد"],
      initials: ["۱", "۲", "۳"],
    },
    incoming: { initial: "س", name: "سرنخ", note: "سرنخ تازه +" },
    cash: { title: "پرداخت دریافت شد", amount: "+ $" },
    receipt: { brand: "BELLONA", title: "رسید", line: "درآمد", qty: "ثبت‌شده", paid: "پرداخت شد", thanks: "ممنون!", no: "شماره ۰۰۰۱" },
    packets: { newTitle: "تازه", newSub: "سرنخ", newName: "سرنخ", newFoot: "سرنخ / ۰۱", scriptTitle: "غربال شد", scriptSub: "۰۱ / امتیاز", scriptDone: "انجام شد ✓" },
  },
});
