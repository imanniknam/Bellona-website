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
    cabinet: { name: "ورودی مشتری", desc: "پیدا کردن، تکمیل اطلاعات و غربال خودکار مشتری بالقوه.", output: "لید" },
    engine: { name: "ایجنت هوشمند", desc: "دستیار دیجیتال برای کارهای تکراری، پیگیری و تصمیم‌گیری.", output: "لید غربال‌شده" },
    admin: { name: "CRM", desc: "قیف فروش، پیگیری‌ها و وضعیت معاملات، به‌صورت خودکار.", output: "رکورد" },
    storefront: { name: "گزارش و تحلیل", desc: "گزارش‌ها خودکار ساخته و تحویل می‌شوند.", output: "گزارش" },
    cashdesk: { name: "درآمد", desc: "تیم شما روی بستن قرارداد تمرکز می‌کند.", output: "پرداخت" },
  },
  journey: [
    ["مشتری جدید", "ورودی مشتری · یک لید تازه"],
    ["غربال لید", "ایجنت هوشمند · تکمیل و امتیازدهی"],
    ["به‌روزرسانی CRM", "CRM · رکورد خودکار همگام شد"],
    ["گزارش‌گیری", "تحلیل · گزارش ساخته و تحویل شد"],
    ["پرداخت دریافت شد", "درآمد · ثبت در قیف فروش"],
  ],
  ui: {
    sceneLabel:
      "ماشین سه‌بعدی تعاملی با پنج ایستگاه: ورودی مشتری، ایجنت هوشمند، CRM، گزارش و تحلیل، و درآمد. برای چرخاندن بکشید و برای دیدن جزئیات روی هر ایستگاه بروید یا لمس کنید.",
    running: "ماشین در حال کار",
    paused: "ماشین متوقف است",
    heading: "قیف فروش، به شکل یک ماشین",
    coords: "از لید تا درآمد",
    modes: { assembled: "کامل", cutaway: "برش", stations: "ایستگاه‌ها", order: "دنبال کردن یک لید" },
    modeAria: "حالت ماشین",
    view: "نما",
    cameras: { overview: "کلی", side: "کنار", top: "بالا", station: "ایستگاه", flight: "پرواز" },
    cameraAria: "دوربین",
    pause: "توقف انیمیشن",
    resume: "ادامه‌ی انیمیشن",
    hint: "بچرخانید. کشف کنید.",
    loading: "در حال سرهم کردن ماشین",
    errorTitle: "صحنه‌ی سه‌بعدی اجرا نشد",
    errorBody: "مطمئن شوید WebGL در مرورگرتان فعال است.",
    retry: "دوباره",
    webglMissing: "WebGL در دسترس نیست. شتاب سخت‌افزاری مرورگر را روشن کنید و صفحه را دوباره بارگذاری کنید.",
    contextLost: "ارتباط گرافیکی قطع شد. به‌محض در دسترس بودن WebGL، صحنه خودش برمی‌گردد.",
  },
  screens: {
    ...en.screens,
    engraveSub: "·  بساز  ·  خودکار کن  ·  رشد کن",
    engraveLine: "سایت  ·  محصول  ·  اتوماسیون هوش مصنوعی  ·  رشد    /    از لید تا درآمد",
    card: { made: "ایجنت هوشمند", by: "در حال کار.", lines: ["لید تکمیل شد؛", "امتیاز گرفت و ارجاع شد.", "پیگیری ارسال شد،", "طبق برنامه."] },
    queue: { title: "قیف فروش CRM", items: ["لید غربال‌شده", "پیگیری سررسید", "معامله در جریان"], busy: "به‌روزرسانی", waiting: "همگام" },
    web: {
      ...en.screens.web,
      brand: "تحلیل",
      nav: "نمای کلی    گزارش‌ها    قیف فروش",
      h1: "گزارش‌ها",
      h2a: "گزارش‌ها ساخته",
      h2b: "و تحویل شدند.",
      p1: "همه‌ی مراحل قیف فروش،",
      p2: "خلاصه‌شده و خودکار.",
      cta: "مشاهده‌ی گزارش",
      tag1: "ساخته شد",
      tag2: "تحویل شد",
    },
    flyer: "گزارش",
    orders: {
      title: "لیدهای جدید",
      sub: "ورودی · ۳ مورد تازه",
      names: ["لید ۰۱", "لید ۰۲", "لید ۰۳"],
      statuses: ["لید جدید", "در حال غربال", "غربال شد"],
      initials: ["۱", "۲", "۳"],
    },
    incoming: { initial: "ل", name: "لید", note: "لید جدید +" },
    cash: { title: "پرداخت دریافت شد", amount: "+ $" },
    receipt: { brand: "BELLONA", title: "رسید", line: "درآمد", qty: "ثبت‌شده", paid: "پرداخت شد", thanks: "سپاس!", no: "شماره ۰۰۰۱" },
    packets: { newTitle: "جدید", newSub: "لید", newName: "لید", newFoot: "لید / ۰۱", scriptTitle: "غربال شد", scriptSub: "۰۱ / امتیاز", scriptDone: "انجام شد ✓" },
  },
});
