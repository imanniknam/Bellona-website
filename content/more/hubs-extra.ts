import type { Answer } from "../spokes";
import type { Locale } from "../types";

/**
 * Fuller hub and industry pages (SEO-GUIDELINE v2, 5-2): one paragraph per industry on /industries, one per service
 * on /services, what to send on /contact, and deeper sections on the real-estate, media and e-commerce pages.
 * Everything restates what is already on the site: the case studies in content/work.ts, the free-audit steps in
 * content/{en,fa}.ts and the service pages. No figure, price, result, date or quote is added.
 * TODO(owner): a promised reply time for /contact (not written until it is confirmed), and a Telegram/WhatsApp
 * channel or phone for the "other ways to reach us" answer.
 */
type Extra = Record<string, Record<Locale, Answer[]>>;

const p = (text: string) => ({ kind: "p" as const, text });
const links = (...items: [string, string][]) => ({ kind: "links" as const, items: items.map(([label, href]) => ({ label, href })) });

// ================================================================================================ hub pages
export const pageExtra: Extra = {
  "/industries": {
    fa: [
      {
        q: "طراحی سایت آموزشی: چه ساخته‌ایم؟",
        a: "شش پروژه در حوزه‌ی آموزش داریم: کدچی، کنجد، یاسین، میکروشمیم، ASA-Study و علم‌کالا. مشکل این حوزه معمولاً این است که یادگیری باید جذاب باشد و ثبت‌نام و پیگیری هم ساده بماند.",
        details: [p("برای همین بعضی پروژه‌ها بازی‌وار هستند، مثل کدچی و کنجد، و بعضی دوزبانه و داده‌محور، مثل ASA-Study. پرونده‌ی هرکدام را در صفحه‌ی صنعت آموزش ببینید."), links(["طراحی سایت آموزشی", "/industries/education"])],
      },
      {
        q: "طراحی سایت فروشگاهی: چه ساخته‌ایم؟",
        a: "چهار فروشگاه داریم: سبزینو، عطر نیرا، مجسمه سعیدی و علم‌کالا. مشکل فروشگاه اینترنتی فقط ویترین نیست؛ پرداخت، سبد خرید، حساب مشتری و پنل مدیریت هم باید درست کار کنند.",
        details: [p("هر فروشگاه مسئله‌ی خودش را داشت: سبزینو پرداخت و مدیریت موجودی، نیرا حس لوکس، سعیدی محصول دست‌ساز و علم‌کالا راهنمایی خریدار."), links(["طراحی سایت فروشگاهی", "/industries/ecommerce"])],
      },
      {
        q: "طراحی سایت و اتوماسیون املاک: چه ساخته‌ایم؟",
        a: "یک پروژه در حوزه‌ی املاک داریم: سیستم فروش خودکار kharazie.at. فروش پروژه‌های ملکی یعنی پیدا کردن سرمایه‌گذار، سنجیدن او، نوشتن و پیگیری، و آماده کردن سند، هر روز.",
        details: [p("سیستم این زنجیره را با ۱۲ گردش‌کار n8n و یک CRM هفت‌جدولی اداره می‌کند و برای تحویل آماده شد."), links(["سایت و اتوماسیون املاک", "/industries/real-estate"])],
      },
      {
        q: "طراحی سایت خبری و رسانه: چه ساخته‌ایم؟",
        a: "یک پروژه در حوزه‌ی رسانه داریم: پایگاه علمی خبری دانه. مشکل رسانه‌ها معمولاً سایت کند یا قدیمی و ترس از خراب شدن لینک‌ها هنگام تغییر پلتفرم است.",
        details: [p("دانه از وردپرس به Next.js و Payload CMS رفت و برای هر یک از ۲۷۸ مطلبش ریدایرکت دائمی گرفت."), links(["سایت خبری و رسانه", "/industries/media"])],
      },
    ],
    en: [
      {
        q: "Education website design: what have we built?",
        a: "We have six education projects: Codechee, Konjed, Yasin, Microshamim, ASA-Study and Elm-Kala. The problem in this field is usually that learning has to feel engaging while enrollment and follow-up stay simple.",
        details: [p("So some projects are game-like, such as Codechee and Konjed, and some are bilingual and data-driven, such as ASA-Study. See each one on the education industry page."), links(["Education website design", "/industries/education"])],
      },
      {
        q: "Online store design: what have we built?",
        a: "We have four stores: Sabzino, Nira Perfume, Mojasame Saidi and Elm-Kala. An online store is more than a shop window; payment, the cart, customer accounts and the admin all have to work.",
        details: [p("Each store had its own problem: Sabzino payment and inventory, Nira a luxury feel, Saidi a handmade product and Elm-Kala guiding the buyer."), links(["Online store design", "/industries/ecommerce"])],
      },
      {
        q: "Real estate websites and automation: what have we built?",
        a: "We have one real-estate project: the automated sales system for kharazie.at. Selling real-estate projects means finding an investor, qualifying them, writing and following up, and preparing documents, every day.",
        details: [p("The system runs that chain with 12 n8n workflows and a seven-table CRM, and was prepared for handover."), links(["Real estate websites and automation", "/industries/real-estate"])],
      },
      {
        q: "News and media website design: what have we built?",
        a: "We have one media project: Dane Scientific News. The usual problems for media are a slow or dated site and the fear of broken links when changing platform.",
        details: [p("Dane moved from WordPress to Next.js and Payload CMS and got a permanent redirect for each of its 278 posts."), links(["News and media websites", "/industries/media"])],
      },
    ],
  },
  "/partner": {
    fa: [
      {
        q: "تفاوت آژانس دیجیتال همه‌کاره با چند پیمانکار چیست؟",
        a: "با چند پیمانکار، هر نفر بخشی از کار را برمی‌دارد و هماهنگی روی دوش شماست؛ وقتی چیزی خراب می‌شود، کسی مسئولش نیست. در یک آژانس همه‌کاره یک تیم، یک برنامه و یک مسئول دارید که از طراحی تا رشد را پیش می‌برد.",
        details: [p("بلونا استراتژی، طراحی، ساخت، اتوماسیون، مارکتینگ و پشتیبانی را در یک مسیر انجام می‌دهد، پس سایت، فرم‌ها و CRM از همان اول با هم هماهنگ‌اند."), links(["خدمات بلونا", "/services"], ["نمونه‌کارها", "/work"])],
      },
      {
        q: "همراهی ماهانه‌ی رشد چیست؟",
        a: "ماه به ماه می‌سازیم، خودکار می‌کنیم و رشد می‌دهیم: صفحه‌ی جدید، اتوماسیون جدید، کمپین و گزارش، روی یک نقشه‌ی راه مستمر. این همراهی نقشه‌ی راه ماهانه، پایش و بهینه‌سازی دارد.",
        details: [p("شروع معمولاً با بررسی رایگان رشد است و بعد، اگر به توافق برسیم، دامنه و قیمت مکتوب می‌شود."), links(["بسته‌ها و تعهدهای ما", "/offers"])],
      },
      {
        q: "چه کسب‌وکاری از یک آژانس همه‌کاره بیشتر سود می‌برد؟",
        a: "کسب‌وکاری که هم‌زمان سایت، اتوماسیون و مارکتینگ لازم دارد و نمی‌خواهد خودش بین چند تیم پیام‌رسان باشد. اگر فقط یک کار مشخص دارید، پروژه‌ای شروع کنید؛ لازم نیست همه‌چیز را یک‌جا بخرید.",
        details: [links(["رزرو بررسی رایگان رشد", "/contact"])],
      },
    ],
    en: [
      {
        q: "How is an all-in-one digital agency different from several contractors?",
        a: "With several contractors each person takes a piece of the work and coordination falls on you; when something breaks, nobody owns it. With an all-in-one agency you have one team, one plan and one person responsible from design to growth.",
        details: [p("Bellona does strategy, design, build, automation, marketing and support in one path, so the website, the forms and the CRM are in step from the start."), links(["Bellona services", "/services"], ["Case studies", "/work"])],
      },
      {
        q: "What is the monthly growth partnership?",
        a: "We build, automate and grow month after month: new pages, new automations, campaigns and reports on one rolling roadmap. The partnership has a monthly roadmap, monitoring and optimization.",
        details: [p("It usually starts with the free growth audit and then, if we agree, the scope and price are written down."), links(["Packages and our commitments", "/offers"])],
      },
      {
        q: "Which businesses gain most from an all-in-one agency?",
        a: "A business that needs a website, automation and marketing at the same time and does not want to be the messenger between several teams. If you have one specific job, start with a project; there is no need to buy everything at once.",
        details: [links(["Book the free growth audit", "/contact"])],
      },
    ],
  },
  "/contact": {
    fa: [
      {
        q: "چه اطلاعاتی را در پیام بنویسم؟",
        a: "کافی است بگویید کسب‌وکارتان چیست، چه چیزی را می‌خواهید بهتر کنید و اگر سایتی دارید، آدرسش را بنویسید. لازم نیست قیمت یا فناوری مشخص کنید؛ آن‌ها را در تماس با هم پیدا می‌کنیم.",
        details: [p("فرم چند گزینه برای نیاز دارد، از سایت و محصول تا هوش مصنوعی و رشد. اگر مطمئن نیستید، گزینه‌ی «مطمئن نیستم (بررسی رایگان)» را بزنید؛ تماس برای همین است.")],
      },
      {
        q: "تماس رایگان ۳۰ دقیقه‌ای شامل چه چیزهایی است؟",
        a: "تماس با یک مهندس است، نه فروشنده. سایت، قیف فروش و نحوه‌ی پیگیری مشتری‌ها را می‌خوانیم، سه اصلاحی را که بیشترین سود را دارند می‌گوییم و اگر بخواهید ما بسازیم، قیمت قطعی و مکتوب می‌دهیم.",
        details: [p("بررسی رایگان است و تعهدی ایجاد نمی‌کند. فقط اگر به توافق برسیم، برای دامنه‌ی توافق‌شده پرداخت می‌کنید.")],
      },
    ],
    en: [
      {
        q: "What should I write in my message?",
        a: "Say what your business does, what you want to improve and, if you have a site, its address. You do not need to specify a price or a technology; we find those together on the call.",
        details: [p("The form has a few choices for what you need, from a website and a product to AI and growth. If you are not sure, pick the \"not sure\" option; that is what the call is for.")],
      },
      {
        q: "What does the free 30-minute call include?",
        a: "It is a call with an engineer, not a salesperson. We read your site, your sales funnel and how you follow up customers, tell you the three fixes with the biggest payoff and, if you want us to build, give you a fixed quote in writing.",
        details: [p("The audit is free and carries no obligation. Only if we agree do you pay, and only for the scope agreed.")],
      },
    ],
  },
  "/services": {
    fa: [
      {
        q: "طراحی سایت در بلونا شامل چه چیزهایی است؟",
        a: "سایت اختصاصی و کدنویسی‌شده، بدون قالب آماده: شرکتی، فروشگاهی، دوزبانه یا لندینگ. هر سایت سریع روی موبایل و آماده‌ی سئو تحویل داده می‌شود و فرم‌هایش به ایمیل، تلگرام یا CRM وصل است.",
        details: [p("زیرصفحه‌های این خدمت را جدا ببینید: Next.js، فروشگاهی، شرکتی، دوزبانه، بازطراحی و لندینگ‌پیج. نمونه‌ی فروشگاهی ما سبزینو و نمونه‌ی انتقال از وردپرس، دانه است."), links(["طراحی سایت", "/services/website-design"], ["طراحی سایت Next.js", "/services/website-design/nextjs"], ["طراحی سایت فروشگاهی", "/services/website-design/ecommerce"], ["طراحی سایت شرکتی", "/services/website-design/corporate"], ["سایت دوزبانه", "/services/website-design/bilingual"], ["بازطراحی سایت", "/services/website-design/redesign"], ["لندینگ‌پیج", "/services/website-design/landing-page"], ["نمونه: سبزینو", "/work/sabzino"])],
      },
      {
        q: "توسعه‌ی فول‌استک و محصول در بلونا شامل چه چیزهایی است؟",
        a: "وب‌اپ، داشبورد و ابزار داخلی، از پایگاه داده تا رابط کاربری، از MVP تا راه‌اندازی. همراه آن API و اتصال‌هایی هستند که محصول را به بقیه‌ی سیستم‌های شما وصل می‌کنند.",
        details: [p("کدچی و کنجد دو پلتفرم آموزشی هستند که به‌صورت پروژه ساخته شدند و Prowem یک اپلیکیشن موبایل است."), links(["توسعه‌ی فول‌استک", "/services/full-stack-development"], ["نمونه: کدچی", "/work/codechee"])],
      },
      {
        q: "اتوماسیون هوش مصنوعی در بلونا شامل چه چیزهایی است؟",
        a: "ایجنت هوش مصنوعی و گردش‌کار n8n که کارهای تکراری و پیگیری مشتری را خودکار می‌کند. اتوماسیون متصل به CRM و ایمیل است و خطاها را گزارش می‌دهد.",
        details: [p("زیرصفحه‌ها: پیاده‌سازی n8n، اتوماسیون CRM و چت‌بات هوش مصنوعی برای سایت. بزرگ‌ترین نمونه‌ی ما سیستم فروش خودکار املاک با ۱۲ گردش‌کار n8n است."), links(["اتوماسیون هوش مصنوعی", "/services/ai-automation"], ["پیاده‌سازی n8n", "/services/ai-automation/n8n"], ["اتوماسیون CRM", "/services/ai-automation/crm"], ["چت‌بات هوش مصنوعی", "/services/ai-automation/chatbot"], ["نمونه: سیستم فروش املاک", "/work/ai-real-estate-os"])],
      },
      {
        q: "مارکتینگ و رشد در بلونا شامل چه چیزهایی است؟",
        a: "سئو سایت، تولید محتوا، کمپین و سیستم جذب لید. هدف این است که مشتری درست را به سایت بیاورد و به فروش تحویل دهد، نه فقط ترافیک بیشتر.",
        details: [p("سئو صفحه‌ی خدمت جداگانه‌ی خودش را دارد، و راهنمای فنی سئو برای Next.js هم منتشر شده است."), links(["مارکتینگ و رشد", "/services/marketing-growth"], ["سئو سایت", "/services/seo"], ["راهنمای سئو Next.js", "/guides/nextjs-seo-checklist"])],
      },
      {
        q: "توسعه‌ی کسب‌وکار در بلونا شامل چه چیزهایی است؟",
        a: "یک برنامه‌ی رشد مکتوب که مشخص می‌کند چه چیزی طراحی، ساخته، خودکار و بازاریابی شود تا همه به سمت یک هدف حرکت کنند. بعد آن را با CRM و فرایند فروش اجرا می‌کنیم.",
        details: [p("این خدمت هم مشاوره است و هم اجرا: برنامه را می‌نویسیم و بعد CRM، فرایند فروش و سیستم‌هایی را که اجرایش می‌کنند راه می‌اندازیم."), links(["توسعه‌ی کسب‌وکار", "/services/business-development"], ["بسته‌ها", "/offers"], ["آژانس دیجیتال همه‌کاره", "/partner"])],
      },
    ],
    en: [
      {
        q: "What does website design at Bellona include?",
        a: "A custom, hand-coded website with no off-the-shelf template: corporate, e-commerce, bilingual or a landing page. Every site is fast on mobile and SEO-ready, and its forms connect to email, Telegram or a CRM.",
        details: [p("See the sub-pages of this service: Next.js, e-commerce, corporate, bilingual, redesign and landing pages. Our store example is Sabzino and our WordPress migration example is Dane."), links(["Website design", "/services/website-design"], ["Next.js website design", "/services/website-design/nextjs"], ["E-commerce website design", "/services/website-design/ecommerce"], ["Corporate website design", "/services/website-design/corporate"], ["Bilingual websites", "/services/website-design/bilingual"], ["Website redesign", "/services/website-design/redesign"], ["Landing pages", "/services/website-design/landing-page"], ["Example: Sabzino", "/work/sabzino"])],
      },
      {
        q: "What does full-stack and product development at Bellona include?",
        a: "Web apps, dashboards and internal tools, from the database to the interface, from MVP to launch. Alongside come the APIs and integrations that connect the product to your other systems.",
        details: [p("Codechee and Konjed are two learning platforms built as projects, and Prowem is a mobile app."), links(["Full-stack development", "/services/full-stack-development"], ["Example: Codechee", "/work/codechee"])],
      },
      {
        q: "What does AI automation at Bellona include?",
        a: "AI agents and n8n workflows that automate repetitive work and customer follow-up. The automation connects to your CRM and email and reports its own errors.",
        details: [p("Sub-pages: n8n implementation, CRM automation and an AI chatbot for your website. Our biggest example is the automated real-estate sales system with 12 n8n workflows."), links(["AI automation", "/services/ai-automation"], ["n8n implementation", "/services/ai-automation/n8n"], ["CRM automation", "/services/ai-automation/crm"], ["AI chatbot", "/services/ai-automation/chatbot"], ["Example: the real-estate system", "/work/ai-real-estate-os"])],
      },
      {
        q: "What does marketing and growth at Bellona include?",
        a: "Website SEO, content production, campaigns and a lead-generation system. The aim is to bring the right customer to the site and hand them over to sales, not just more traffic.",
        details: [p("SEO has its own service page, and a technical SEO guide for Next.js is published too."), links(["Marketing and growth", "/services/marketing-growth"], ["SEO services", "/services/seo"], ["Next.js SEO checklist", "/guides/nextjs-seo-checklist"])],
      },
      {
        q: "What does business development at Bellona include?",
        a: "A written growth plan that says what to design, build, automate and market so everyone moves toward one goal. We then carry it out with a CRM and a sales process.",
        details: [p("It is both advice and execution: we write the plan and then set up the CRM, the sales process and the systems that carry it out."), links(["Business development", "/services/business-development"], ["Packages", "/offers"], ["An all-in-one digital agency", "/partner"])],
      },
    ],
  },
};

// ================================================================================================ industry pages
export const industryExtra: Extra = {
  "real-estate": {
    fa: [
      {
        q: "سایت املاک برای سرمایه‌گذار باید چه چیزهایی داشته باشد؟",
        a: "سایت kharazie.at بخش‌های پروژه‌های جاری، خرید مستقیم از مالک و سرمایه‌گذاران و سازندگان را دارد. سرمایه‌گذار می‌بیند چه پروژه‌هایی در دست است، زمین‌ها و پروژه‌ها چطور بررسی می‌شوند و کجا درخواست بدهد.",
        details: [p("فرم بخش سرمایه‌گذاران همان جایی است که سرمایه‌گذار می‌تواند درخواست بدهد. سایت و سیستم فروش خودکار هر دو برای یک هدف ساخته شدند: فروش پروژه‌های ملکی.")],
      },
      {
        q: "سیستم فروش خودکار املاک چه کارهایی را از دوش تیم برمی‌دارد؟",
        a: "پیدا کردن سرمایه‌گذار، سنجیدن او، نوشتن پیام، دریافت پاسخ، تحلیل پروژه و آماده کردن سند، یعنی همان زنجیره‌ای که فروش پروژه‌ی ملکی هر روز می‌خواهد.",
        details: [p("گزارش روزانه به تیم می‌گوید چه انجام شده است. اگر یک مرحله خطا بدهد، مدیریت متمرکز خطا خبر می‌دهد، پس سیستم بی‌صدا از کار نمی‌افتد.")],
      },
      {
        q: "چرا CRM در کسب‌وکار املاک مهم است؟",
        a: "مشتری ملکی با یک تماس نمی‌خرد؛ فرایند چند مرحله و چند هفته است. CRM هفت‌جدولی این سیستم پروژه‌ها، مخاطبان، کمپین‌ها، تعامل‌ها، وظایف و اسناد را کنار هم نگه می‌دارد تا هیچ پیگیری گم نشود.",
        details: [p("Baserow به‌عنوان CRM انتخاب شد و هر تعامل در آن ثبت می‌شود. اگر شما CRM دیگری دارید، مثل HubSpot، می‌توان همین منطق را روی آن ساخت.")],
      },
      {
        q: "چه کسب‌وکار املاکی از خودکارسازی فروش بیشتر سود می‌برد؟",
        a: "کسب‌وکاری که پروژه‌های ملکی را به سرمایه‌گذار می‌فروشد و هر روز باید سرمایه‌گذار تازه پیدا کند، بسنجد، برایش بنویسد و پیگیری کند. چون این زنجیره تکراری است، بیشترین صرفه‌جویی را در همین جا دارد.",
        details: [p("اگر فروش شما چند مشتری در ماه و بدون پیگیری طولانی است، شاید به این اندازه اتوماسیون لازم نداشته باشید. در بررسی رایگان صادقانه می‌گوییم کدام حالت مال شماست، پیش از آنکه برای ساخت چیزی قیمت بدهیم.")],
      },
    ],
    en: [
      {
        q: "What should a real-estate website offer an investor?",
        a: "The kharazie.at site has sections for current projects, buying directly from owners, and investors and developers. An investor sees which projects are under way, how plots and projects are checked and where to make an enquiry.",
        details: [p("The investors' form is where an investor can make an enquiry. The website and the automated sales system were both built for one goal: selling real-estate projects.")],
      },
      {
        q: "What work does the automated real-estate sales system take off the team?",
        a: "Finding an investor, qualifying them, writing the message, receiving the reply, analyzing the project and preparing documents: the chain a real-estate sale needs every day.",
        details: [p("A daily digest tells the team what was done. If a step fails, central error handling reports it, so the system does not stop silently.")],
      },
      {
        q: "Why does a real-estate business need a CRM?",
        a: "A property buyer does not buy after one call; it is a process of several steps over several weeks. The seven-table CRM in this system keeps projects, contacts, campaigns, interactions, tasks and documents together so no follow-up is lost.",
        details: [p("Baserow was chosen as the CRM and every interaction is recorded in it. If you already use another CRM, such as HubSpot, the same logic can be built on top of it.")],
      },
      {
        q: "Which real-estate businesses gain most from automating sales?",
        a: "A business that sells property projects to investors and has to find, qualify, write to and follow up new investors every day. Because that chain is repetitive, it is where automation saves the most.",
        details: [p("If your sales are a few customers a month without long follow-up, you may not need this much automation. In the free audit we tell you honestly which case is yours, before we quote anything to build.")],
      },
    ],
  },
  media: {
    fa: [
      {
        q: "مهاجرت از وردپرس چطور بدون شکستن لینک‌ها انجام می‌شود؟",
        a: "با فهرست‌برداری از همه‌ی آدرس‌ها پیش از انتقال، و تعریف یک ریدایرکت دائمی ۳۰۱ برای هر کدام. در دانه این یعنی ۲۷۸ ریدایرکت برای ۲۷۸ مطلب، تا هیچ لینک قدیمی نشکند.",
        details: [p("با ریدایرکت دائمی برای هر مطلب، جایگاهی که آدرس‌های قدیمی در گوگل و در لینک‌های بیرونی ساخته‌اند به آدرس جدید می‌رسد."), links(["راهنمای انتقال از وردپرس به Next.js", "/guides/migrate-wordpress-to-nextjs"])],
      },
      {
        q: "تحریریه‌ی یک سایت خبری علمی چه ابزاری لازم دارد؟",
        a: "ابزاری که قواعد تحریریه را بداند. در دانه، Payload CMS مدیریت مطلب، برچسب و نویسنده را به تحریریه می‌دهد و اعتبارسنجی منبع، لید، کپشن، اعتبار تصویر و ساختار مطالب بلند را انجام می‌دهد.",
        details: [p("این قواعد در خود سیستم هستند، نه در حافظه‌ی افراد، پس خطاهای رایج مثل مطلب بدون منبع یا تصویر بدون اعتبار دیده می‌شوند.")],
      },
      {
        q: "طبقه‌بندی سایت خبری چطور باید باشد؟",
        a: "ساده و قابل دنبال کردن. دانه با ۱۵ دسته و ۱٬۰۵۷ برچسب شلوغ شده بود؛ طبقه‌بندی به ۸ دسته و ۱۰۵ موضوع رسید تا خواننده و موتور جست‌وجو هر دو مسیر را بفهمند.",
        details: [p("مهاجرت فرصت خوبی است برای مرتب کردن طبقه‌بندی: چیزی که در وردپرس سال‌ها بزرگ شده، در پلتفرم جدید از اول با ساختار سنجیده شروع می‌شود.")],
      },
      {
        q: "چه سایت خبری‌ای باید مهاجرت از وردپرس را جدی بگیرد؟",
        a: "سایتی که سال‌ها مطلب منتشر کرده و صدها مطلب، برچسب‌های زیاد و لینک‌های بیرونی دارد. برای چنین سایتی جابه‌جایی بدون برنامه یعنی ریسک شکستن لینک‌ها؛ دانه با ۲۷۸ مطلب و ۱٬۰۵۷ برچسب همین وضعیت را داشت.",
        details: [p("اگر سایت شما کوچک است و مطلب زیادی ندارد، مهاجرت ساده‌تر است. در هر دو حالت، بررسی رایگان ما فهرست آدرس‌ها و ریسک‌های واقعی را پیش از هر تصمیمی روشن می‌کند.")],
      },
    ],
    en: [
      {
        q: "How is a WordPress migration done without breaking links?",
        a: "By listing every URL before the move and defining a permanent 301 redirect for each one. For Dane that meant 278 redirects for 278 posts, so no old link breaks.",
        details: [p("With a permanent redirect for each post, the standing that the old addresses built in Google and in outside links passes to the new address."), links(["Guide: migrating from WordPress to Next.js", "/guides/migrate-wordpress-to-nextjs"])],
      },
      {
        q: "What tools does the newsroom of a science news site need?",
        a: "A tool that knows the editorial rules. On Dane, Payload CMS gives the newsroom control of posts, tags and authors and validates sources, leads, captions, image credits and the structure of long-form pieces.",
        details: [p("These rules sit in the system rather than in people's memory, so common mistakes such as a piece without a source or an image without a credit are caught.")],
      },
      {
        q: "How should a news site's taxonomy look?",
        a: "Simple and easy to follow. Dane had become crowded with 15 categories and 1,057 tags; the taxonomy became 8 categories and 105 topics so that readers and search engines can both follow the path.",
        details: [p("A migration is a good moment to tidy it: what grew for years in WordPress starts in the new platform with a structure chosen on purpose.")],
      },
      {
        q: "Which news sites should take a WordPress migration seriously?",
        a: "A site that has published for years and has hundreds of posts, many tags and outside links. For such a site, moving without a plan means a risk of broken links; Dane, with 278 posts and 1,057 tags, was in exactly this position.",
        details: [p("If your site is small and has few posts, the migration is simpler. In both cases our free audit lays out the real list of URLs and risks before any decision is made.")],
      },
    ],
  },
  ecommerce: {
    fa: [
      {
        q: "پرداخت و پنل مدیریت فروشگاه چه چیزهایی باید داشته باشد؟",
        a: "پرداخت آنلاین، حساب مشتری و پنلی که تیم فروشگاه خودش اداره کند. در سبزینو پرداخت با زرین‌پال انجام می‌شود و پنل مستقل محصول، موجودی، قیمت و سفارش را مدیریت می‌کند.",
        details: [p("بدون این‌ها فروشگاه فقط کاتالوگ است. مهم است که تیم برای هر تغییر قیمت یا موجودی منتظر برنامه‌نویس نماند.")],
      },
      {
        q: "فروشگاه محصول دست‌ساز یا لوکس را چطور بسازیم؟",
        a: "محصول را در مرکز بگذارید و دور آن فضای خالی بگذارید. مجسمه سعیدی با چیدمان موبایل‌محور و دسته‌بندی روشن ساخته شد و نیرا با ظاهر آرام یک خانه‌ی عطر.",
        details: [p("در هر دو فروشگاه، خریدار قبل از قیمت، به حس صفحه اعتماد می‌کند. بنابراین قالب آماده معمولاً انتخاب خوبی نیست.")],
      },
    ],
    en: [
      {
        q: "What should a store's payment and admin offer?",
        a: "Online payment, customer accounts and an admin the store's own team can run. At Sabzino payment is through Zarinpal and an independent admin manages products, inventory, pricing and orders.",
        details: [p("Without these a store is just a catalog. What matters is that the team does not wait for a developer for each price or stock change.")],
      },
      {
        q: "How do you build a store for handmade or luxury products?",
        a: "Put the product at the center and leave space around it. Mojasame Saidi was built with a mobile-first layout and clear categories, and Nira with a calm look like a fragrance house.",
        details: [p("In both stores the buyer trusts the feel of the page before the price. That is why an off-the-shelf template is usually not a good choice.")],
      },
    ],
  },
};

/** Adds `extra` answers to `base`: appended, or placed before the closing "where do we start" answer. */
export function mergeMore(base: Extra, add: Extra, beforeLast = false): Extra {
  const out: Extra = { ...base };
  for (const [key, byLocale] of Object.entries(add)) {
    const cur = out[key] ?? { fa: [], en: [] };
    out[key] = Object.fromEntries(
      (["fa", "en"] as const).map((l) => [l, beforeLast && cur[l].length ? [...cur[l].slice(0, -1), ...byLocale[l], ...cur[l].slice(-1)] : [...cur[l], ...byLocale[l]]]),
    ) as Record<Locale, Answer[]>;
  }
  return out;
}
