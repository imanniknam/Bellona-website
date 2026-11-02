import { facts, fmt } from "../facts";
import type { Answer } from "../spokes";
import type { Locale } from "../types";
import { projectsForIndustry } from "../work";

/**
 * Industry pages (SEO-GUIDELINE D13): the industry's problem, what we build, the work for that industry with a
 * short summary of each project, and FAQ. Counts come from the project data, so they can never drift.
 */
type More = Record<string, Record<Locale, Answer[]>>;

const re = facts.projects.realEstate;
const dane = facts.projects.dane;
const nEn = (v: number) => fmt.n(v, "en");
const nFa = (v: number) => fmt.n(v, "fa");
const count = (id: string) => projectsForIndustry(id).length;
const links = (id: string, locale: Locale) => ({
  kind: "links" as const,
  items: projectsForIndustry(id).map((p) => ({ label: p[locale].title, href: `/work/${p.slug}` })),
});

export const more: More = {
  // ======================================================================================= education
  education: {
    fa: [
      {
        q: "سایت و پلتفرم آموزشی چه چالش‌هایی دارد؟",
        a: "یادگیری آنلاین باید با بازی رقابت کند: اگر پلتفرم خسته‌کننده باشد، دانش‌آموز می‌رود. چالش اصلی این است که یادگیری حس بازی بدهد، پیشرفت دیده شود، ثبت‌نام ساده باشد و سایت روی موبایل و با اینترنت ضعیف هم روان بماند.",
      },
      {
        q: "برای حوزه‌ی آموزش چه می‌سازیم؟",
        a: "پلتفرم یادگیری گیمیفای‌شده با مسیرهای سطح‌بندی‌شده، قیف ثبت‌نام، حساب دانش‌آموز با پیگیری پیشرفت، سایت مدرسه و مرکز مهارت، و ایجنت پشتیبانی دانش‌آموز. همه‌ی این‌ها اختصاصی و کدنویسی‌شده است و در دسترس‌ترین شکل روی موبایل طراحی می‌شود.",
      },
      {
        q: "در حوزه‌ی آموزش چه پروژه‌هایی داریم؟",
        a: `${nFa(count("education"))} پروژه در این حوزه داریم: کدچی (پلتفرم یادگیری برنامه‌نویسی و هوش مصنوعی با استارکمپ‌ها)، مدرسه مهارت یاسین (تجربه‌ی ماجراجویی برای یادگیری مهارت)، کنجد (مهارت‌های زندگی با بازی)، میکروشمیم (مرکز نوآوری)، ASA-Study (پذیرش دانشجوی بین‌المللی) و علم‌کالا (فروشگاه تجهیزات علمی و آموزشی).`,
        details: [links("education", "fa")],
      },
      {
        q: "فرق پلتفرم گیمیفای‌شده با سایت آموزشی معمولی چیست؟",
        a: "در سایت آموزشی معمولی محتوا فهرست می‌شود؛ در پلتفرم گیمیفای‌شده مسیر، مأموریت، امتیاز و دستاورد دارد تا یادگیرنده انگیزه‌ی ادامه دادن پیدا کند. کدچی با استارکمپ‌ها و کنجد با مأموریت‌ها و امتیازها همین رویکرد را دارند.",
      },
      {
        q: "ثبت‌نام و پشتیبانی دانش‌آموز چطور خودکار می‌شود؟",
        a: "فرم ثبت‌نام به ایمیل یا CRM وصل می‌شود و ایجنت هوش مصنوعی می‌تواند سؤال‌های رایج دانش‌آموز و والدین را در چند ثانیه جواب دهد و موارد خاص را به انسان بسپارد.",
        details: [{ kind: "links", items: [{ label: "اتوماسیون کسب‌وکار با هوش مصنوعی", href: "/services/ai-automation" }] }],
      },
    ],
    en: [
      {
        q: "What challenges do education websites and platforms have?",
        a: "Online learning has to compete with play: if a platform is dull, the student leaves. The core challenge is making learning feel like a game, making progress visible, keeping sign-up simple and keeping the site smooth on phones and weak connections.",
      },
      {
        q: "What do we build for education?",
        a: "Gamified learning platforms with levelled paths, enrolment funnels, student accounts with progress tracking, sites for schools and skill centres, and student-support agents. All of it is custom and hand-coded, designed to be as accessible as possible on a phone.",
      },
      {
        q: "Which education projects have we done?",
        a: `We have ${nEn(count("education"))} projects in this field: Codechee (a programming and AI learning platform with Starcamps), Yasin Skill School (an adventure-style experience for learning skills), Konjed (life skills through play), Microshamim (an innovation hub), ASA-Study (international student admissions) and Elm-Kala (a store for scientific and educational equipment).`,
        details: [links("education", "en")],
      },
      {
        q: "How is a gamified platform different from an ordinary education site?",
        a: "On an ordinary education site content is listed; on a gamified platform there are paths, missions, points and achievements so the learner stays motivated to continue. Codechee with its Starcamps and Konjed with its missions and points take this approach.",
      },
      {
        q: "How can enrolment and student support be automated?",
        a: "The enrolment form connects to email or a CRM, and an AI agent can answer common questions from students and parents in seconds and hand special cases to a person.",
        details: [{ kind: "links", items: [{ label: "Business AI automation", href: "/services/ai-automation" }] }],
      },
    ],
  },

  // ======================================================================================= e-commerce
  ecommerce: {
    fa: [
      {
        q: "چالش‌های فروشگاه اینترنتی چیست؟",
        a: "فروشگاه اینترنتی باید همزمان سریع، قابل اعتماد و ساده‌ی خرید باشد: محصول پیدا شود، پرداخت بی‌دردسر انجام شود، و تیم فروشگاه بدون برنامه‌نویس محصول، موجودی و سفارش را مدیریت کند. روی موبایل و در جست‌وجو هم باید دیده شود.",
      },
      {
        q: "برای فروشگاه‌ها چه می‌سازیم؟",
        a: "فروشگاه اختصاصی با دسته‌بندی و جست‌وجو، سبد خرید و تسویه‌حساب، پرداخت آنلاین با درگاه ایرانی مثل زرین‌پال، پنل مدیریت و پشتیبانی هوشمند. فروشگاه را بدون قالب آماده و حول شیوه‌ی فروش شما طراحی می‌کنیم.",
      },
      {
        q: "در حوزه‌ی فروش آنلاین چه پروژه‌هایی داریم؟",
        a: `${nFa(count("ecommerce"))} فروشگاه: سبزینو (فروشگاه کسب‌وکار اجتماعی با پرداخت زرین‌پال)، عطر نیرا (خانه‌ی عطر با بخش ساخت عطر سازمانی)، فروشگاه مجسمه سعیدی (فروشگاه پریمیوم دست‌ساز) و علم‌کالا (فروشگاه هدایت‌شده‌ی تجهیزات علمی).`,
        details: [links("ecommerce", "fa")],
      },
      {
        q: "اتوماسیون چطور فروش را جلو می‌برد؟",
        a: "پیگیری سفارش، پاسخ به پرسش‌های مشتری و ثبت مشتری در CRM می‌تواند خودکار شود. ایجنت هوش مصنوعی در چند ثانیه جواب می‌دهد و موارد خاص را به انسان می‌سپارد.",
        details: [{ kind: "links", items: [{ label: "طراحی سایت فروشگاهی", href: "/services/website-design/ecommerce" }] }],
      },
    ],
    en: [
      {
        q: "What are the challenges of an online store?",
        a: "An online store has to be fast, trustworthy and easy to buy from all at once: products must be findable, payment painless, and the store team must manage products, stock and orders without a developer. It also has to be seen on mobile and in search.",
      },
      {
        q: "What do we build for stores?",
        a: "Custom stores with categories and search, cart and checkout, online payment through an Iranian gateway such as Zarinpal, an admin panel and smart support. We design the store without a ready-made template, around how you sell.",
      },
      {
        q: "Which online-sales projects have we done?",
        a: `${nEn(count("ecommerce"))} stores: Sabzino (a social-enterprise store with Zarinpal payments), Nira Perfume (a perfume house with a corporate custom-perfume section), the Mojasame Saidi store (a premium handmade store) and Elm-Kala (a guided scientific-equipment store).`,
        details: [links("ecommerce", "en")],
      },
      {
        q: "How does automation help sales?",
        a: "Order follow-up, answers to customer questions and logging customers in a CRM can all be automated. An AI agent answers in seconds and hands special cases to a person.",
        details: [{ kind: "links", items: [{ label: "E-commerce website design", href: "/services/website-design/ecommerce" }] }],
      },
    ],
  },

  // ======================================================================================= real estate
  "real-estate": {
    fa: [
      {
        q: "مشکل اصلی فروش در املاک چیست؟",
        a: "فروش پروژه‌ی ملکی به سرمایه‌گذار یعنی هر روز پیدا کردن، سنجیدن، نوشتن، پیگیری و آماده کردن سند. اگر این زنجیره دستی بماند، فرصت‌ها در پیگیری‌های عقب‌افتاده گم می‌شوند و CRM پر از مخاطبی می‌شود که کسی سراغشان نرفته.",
      },
      {
        q: "برای کسب‌وکار املاک چه می‌سازیم؟",
        a: "سایت آگهی‌ها و پروژه‌ها، پیگیری خودکار خریدار و سرمایه‌گذار، تطبیق فایل و یادآوری قرار ملاقات، و اتوماسیون CRM. هدف این است که هیچ مشتری بالقوه‌ای بی‌جواب نماند.",
      },
      {
        q: "نمونه‌ی ما در املاک چیست؟",
        a: `برای kharazie.at سیستم‌عامل هوشمند فروش املاک ساختیم: ${nFa(re.n8nWorkflows)} گردش‌کار n8n، CRM با ${nFa(re.crmTables)} جدول در Baserow، تولید محتوا با Claude و ارسال و دریافت ایمیل خودکار. ${nFa(count("real-estate"))} پروژه‌ی املاک در نمونه‌کارهای ما منتشر شده است.`,
        details: [links("real-estate", "fa")],
      },
      {
        q: "از کجا شروع کنیم؟",
        a: "با بررسی رایگان: فرایند فعلی فروش و پیگیری شما را می‌خوانیم و می‌گوییم کدام بخش‌ها خودکار می‌شوند. تماس ۳۰ دقیقه‌ای است و اگر به توافق برسیم، قیمت قطعی و مکتوب می‌گیرید.",
        details: [{ kind: "links", items: [{ label: "اتوماسیون فروش با هوش مصنوعی", href: "/services/ai-automation" }, { label: "رزرو بررسی رایگان", href: "/contact?need=ai" }] }],
      },
    ],
    en: [
      {
        q: "What is the main sales problem in real estate?",
        a: "Selling a property project to an investor means finding, qualifying, writing to, following up and preparing documents every day. If that chain stays manual, opportunities get lost in late follow-ups and the CRM fills with contacts nobody got to.",
      },
      {
        q: "What do we build for real-estate businesses?",
        a: "Listing and project websites, automatic buyer and investor follow-up, file matching and appointment reminders, and CRM automation. The aim is that no prospect goes unanswered.",
      },
      {
        q: "What is our real-estate example?",
        a: `For kharazie.at we built an AI real-estate operating system: ${nEn(re.n8nWorkflows)} n8n workflows, a ${nEn(re.crmTables)}-table Baserow CRM, content generation with Claude and automated email sending and receiving. ${nEn(count("real-estate"))} real-estate project is published in our case studies.`,
        details: [links("real-estate", "en")],
      },
      {
        q: "Where do we start?",
        a: "With the free audit: we read your current sales and follow-up process and tell you which parts can be automated. The call takes 30 minutes and, if it fits, you get a fixed quote in writing.",
        details: [{ kind: "links", items: [{ label: "AI sales automation", href: "/services/ai-automation" }, { label: "Book the free audit", href: "/contact?need=ai" }] }],
      },
    ],
  },

  // ======================================================================================= media
  media: {
    fa: [
      {
        q: "رسانه‌ها هنگام مهاجرت از وردپرس چه چالشی دارند؟",
        a: "بزرگ‌ترین ریسک از دست رفتن لینک‌ها و ترافیک است: هر مطلب قدیمی باید به آدرس جدیدش برسد و طبقه‌بندی شلوغ دسته‌ها و برچسب‌ها مرتب شود. تحریریه هم باید بتواند مطلب را بدون برنامه‌نویس منتشر کند و قواعد تحریریه رعایت شود.",
      },
      {
        q: "برای رسانه و انتشار چه می‌سازیم؟",
        a: "پلتفرم انتشار با CMS هدلس، قواعد تحریریه‌ی داخلی (منبع، لید، کپشن، اعتبار تصویر)، مهاجرت محتوا و ریدایرکت‌های سئو تا هیچ لینک قدیمی نشکند. نمونه‌ی ما، پایگاه علمی خبری دانه، همین رویکرد را دارد.",
      },
      {
        q: "نمونه‌ی ما در رسانه چیست؟",
        a: `پایگاه علمی خبری دانه: ${nFa(dane.migratedPosts)} مطلب با ${nFa(dane.tags)} برچسب و ${nFa(dane.authors)} نویسنده از وردپرس به Next.js و Payload CMS منتقل شد، طبقه‌بندی به ${nFa(dane.categoriesAfter)} دسته و ${nFa(dane.topics)} موضوع بازطراحی شد و ${nFa(dane.redirects)} ریدایرکت دائمی گذاشتیم.`,
        details: [links("media", "fa")],
      },
      {
        q: "می‌خواهم سایت خبری‌ام را منتقل کنم؛ چه کنم؟",
        a: "با بررسی رایگان شروع کنید؛ آدرس‌ها و محتوای فعلی را می‌خوانیم، ریسک‌های مهاجرت را می‌گوییم و قیمت قطعی و مکتوب می‌دهیم. تماس ۳۰ دقیقه‌ای است و فقط برای دامنه‌ی توافق‌شده پرداخت می‌کنید.",
        details: [{ kind: "links", items: [{ label: "بازطراحی سایت و انتقال از وردپرس", href: "/services/website-design/redesign" }] }],
      },
    ],
    en: [
      {
        q: "What challenges do media sites face when leaving WordPress?",
        a: "The biggest risk is losing links and traffic: every old post must reach its new address and a sprawling taxonomy of categories and tags must be tidied. The newsroom must also be able to publish without a developer, with editorial rules respected.",
      },
      {
        q: "What do we build for media and publishing?",
        a: "Publishing platforms with a headless CMS, in-house editorial rules (source, lead, caption, image credit), content migration and SEO redirects so no old link breaks. Our example, Dane Scientific News, takes this approach.",
      },
      {
        q: "What is our media example?",
        a: `Dane Scientific News: ${nEn(dane.migratedPosts)} posts with ${nEn(dane.tags)} tags and ${nEn(dane.authors)} authors moved from WordPress to Next.js and Payload CMS, the taxonomy was redesigned into ${nEn(dane.categoriesAfter)} categories and ${nEn(dane.topics)} topics, and ${nEn(dane.redirects)} permanent redirects were put in place.`,
        details: [links("media", "en")],
      },
      {
        q: "I want to migrate my news site; what do I do?",
        a: "Start with the free audit; we read your current URLs and content, tell you the migration risks and give you a fixed quote in writing. The call takes 30 minutes and you pay only for the agreed scope.",
        details: [{ kind: "links", items: [{ label: "Website redesign and WordPress migration", href: "/services/website-design/redesign" }] }],
      },
    ],
  },
};
