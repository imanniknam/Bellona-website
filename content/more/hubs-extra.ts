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
        a: "شش پروژه در حوزه‌ی آموزش داریم: کدچی، کنجد، یاسین، میکروشمیم، ASA-Study و علم‌کالا. چالش همیشگی این حوزه این است که یادگیری جذاب باشد و ثبت‌نام و پیگیری هم ساده بماند.",
        details: [p("برای همین بعضی پروژه‌ها بازی‌وارند، مثل کدچی و کنجد، و بعضی دوزبانه و داده‌محور، مثل ASA-Study. جزئیات هر کدام را در صفحه‌ی صنعت آموزش ببینید."), links(["طراحی سایت آموزشی", "/industries/education"])],
      },
      {
        q: "طراحی سایت فروشگاهی: چه ساخته‌ایم؟",
        a: "چهار فروشگاه ساخته‌ایم: سبزینو، عطر نیرا، مجسمه سعیدی و علم‌کالا. فروشگاه اینترنتی فقط ویترین نیست؛ پرداخت، سبد خرید، حساب کاربری مشتری و پنل مدیریت هم باید درست کار کنند.",
        details: [p("هر فروشگاه مسئله‌ی خودش را داشت: سبزینو پرداخت و مدیریت موجودی، نیرا حس لوکس، سعیدی محصول دست‌ساز و علم‌کالا راهنمایی خریدار."), links(["طراحی سایت فروشگاهی", "/industries/ecommerce"])],
      },
      {
        q: "طراحی سایت و اتوماسیون املاک: چه ساخته‌ایم؟",
        a: "یک پروژه در حوزه‌ی املاک داریم: سیستم فروش خودکار kharazie.at. فروش پروژه‌های ملکی یعنی هر روز پیدا کردن سرمایه‌گذار، سنجیدنش، نوشتن برایش، پیگیری و آماده کردن سند.",
        details: [p("سیستم این زنجیره را با ۱۲ گردش‌کار n8n و یک CRM هفت‌جدولی اداره می‌کند و آماده‌ی تحویل شد."), links(["سایت و اتوماسیون املاک", "/industries/real-estate"])],
      },
      {
        q: "طراحی سایت خبری و رسانه: چه ساخته‌ایم؟",
        a: "یک پروژه در حوزه‌ی رسانه داریم: پایگاه علمی‌خبری دانه. دردسر رایج رسانه‌ها سایت کند یا قدیمی است و ترس از شکستن لینک‌ها هنگام عوض کردن پلتفرم.",
        details: [p("دانه از وردپرس به Next.js و Payload CMS رفت و هر یک از ۲۷۸ مطلبش ریدایرکت دائمی گرفت."), links(["سایت خبری و رسانه", "/industries/media"])],
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
        q: "آژانس دیجیتال یکپارچه با چند پیمانکار جدا چه فرقی دارد؟",
        a: "با چند پیمانکار، هر کس تکه‌ای از کار را برمی‌دارد و هماهنگی گردن شماست؛ وقتی چیزی خراب می‌شود، کسی پاسخ‌گو نیست. در آژانس یکپارچه یک تیم، یک برنامه و یک مسئول دارید که کار را از طراحی تا رشد پیش می‌برد.",
        details: [p("بلونا استراتژی، طراحی، ساخت، اتوماسیون، بازاریابی و پشتیبانی را در یک مسیر انجام می‌دهد؛ پس سایت، فرم‌ها و CRM از همان اول با هم هماهنگ‌اند."), links(["خدمات بلونا", "/services"], ["نمونه‌کارها", "/work"])],
      },
      {
        q: "همراهی ماهانه‌ی رشد چیست؟",
        a: "هر ماه چیزی می‌سازیم، چیزی را خودکار می‌کنیم و رشد را جلو می‌بریم: صفحه یا اتوماسیون تازه، کمپین و گزارش، طبق یک نقشه‌ی راه پیوسته. این همراهی نقشه‌ی راه ماهانه، پایش و بهینه‌سازی را در بر دارد.",
        details: [p("معمولاً با بررسی رایگان رشد شروع می‌کنیم و بعد، اگر به توافق برسیم، دامنه‌ی کار و قیمت مکتوب می‌شود."), links(["بسته‌ها و تعهدهای ما", "/offers"])],
      },
      {
        q: "کدام کسب‌وکارها بیشتر از آژانس یکپارچه سود می‌برند؟",
        a: "کسب‌وکاری که هم‌زمان سایت، اتوماسیون و بازاریابی لازم دارد و نمی‌خواهد خودش میان چند تیم پیغام‌رسان باشد. اگر فقط یک کار مشخص دارید، آن را پروژه‌ای شروع کنید؛ لازم نیست همه‌چیز را یک‌جا بخرید.",
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
        q: "در پیامم چه بنویسم؟",
        a: "کافی است بگویید کسب‌وکارتان چیست، چه چیزی را می‌خواهید بهتر کنید و اگر سایت دارید، آدرسش را بنویسید. لازم نیست قیمت یا فناوری را مشخص کنید؛ آن‌ها را در تماس با هم پیدا می‌کنیم.",
        details: [p("فرم برای نیازتان چند گزینه دارد، از سایت و محصول تا هوش مصنوعی و رشد. اگر مطمئن نیستید، «مطمئن نیستم (بررسی رایگان)» را بزنید؛ این تماس برای همین است.")],
      },
      {
        q: "تماس رایگان ۳۰ دقیقه‌ای چه چیزهایی را در بر می‌گیرد؟",
        a: "طرف صحبتتان یک مهندس است، نه فروشنده. سایت، مسیر فروش و شیوه‌ی پیگیری مشتری‌ها را بررسی می‌کنیم، سه اصلاحی را که بیشترین سود را دارند می‌گوییم و اگر بخواهید ساختش با ما باشد، قیمت قطعی و مکتوب می‌دهیم.",
        details: [p("بررسی رایگان است و تعهدی نمی‌آورد. فقط اگر به توافق برسیم، برای همان دامنه‌ی توافق‌شده پرداخت می‌کنید.")],
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
        q: "طراحی سایت در بلونا چه چیزهایی را در بر می‌گیرد؟",
        a: "سایت اختصاصی و کدنویسی‌شده، بی‌قالب آماده: شرکتی، فروشگاهی، دوزبانه یا لندینگ. هر سایت سریع روی موبایل و آماده‌ی سئو تحویل داده می‌شود و فرم‌هایش به ایمیل، تلگرام یا CRM وصل است.",
        details: [p("زیرشاخه‌های این خدمت را جدا ببینید: Next.js، فروشگاهی، شرکتی، دوزبانه، بازطراحی و لندینگ پیج. نمونه‌ی فروشگاهی‌مان سبزینو است و نمونه‌ی انتقال از وردپرس، دانه."), links(["طراحی سایت", "/services/website-design"], ["طراحی سایت Next.js", "/services/website-design/nextjs"], ["طراحی سایت فروشگاهی", "/services/website-design/ecommerce"], ["طراحی سایت شرکتی", "/services/website-design/corporate"], ["سایت دوزبانه", "/services/website-design/bilingual"], ["بازطراحی سایت", "/services/website-design/redesign"], ["لندینگ‌پیج", "/services/website-design/landing-page"], ["نمونه: سبزینو", "/work/sabzino"])],
      },
      {
        q: "ساخت نرم‌افزار و محصول در بلونا چه چیزهایی را در بر می‌گیرد؟",
        a: "وب‌اپ، داشبورد و ابزار داخلی، از پایگاه داده تا رابط کاربری، از نسخه‌ی اولیه (MVP) تا عرضه؛ همراه با API و اتصال‌هایی که محصول را به بقیه‌ی سیستم‌هایتان وصل می‌کنند.",
        details: [p("کدچی و کنجد دو پلتفرم آموزشی‌اند که به‌صورت پروژه‌ای ساخته شدند و Prowem یک اپلیکیشن موبایل است."), links(["نرم‌افزار و محصول", "/services/full-stack-development"], ["نمونه: کدچی", "/work/codechee"])],
      },
      {
        q: "اتوماسیون هوش مصنوعی در بلونا چه چیزهایی را در بر می‌گیرد؟",
        a: "ایجنت هوش مصنوعی و گردش‌کار n8n که کارهای تکراری و پیگیری مشتری را خودکار می‌کنند. اتوماسیون به CRM و ایمیل وصل است و خطاها را گزارش می‌دهد.",
        details: [p("زیرشاخه‌ها: پیاده‌سازی n8n، اتوماسیون CRM و چت‌بات هوش مصنوعی برای سایت. بزرگ‌ترین نمونه‌مان سیستم فروش خودکار املاک با ۱۲ گردش‌کار n8n است."), links(["اتوماسیون هوش مصنوعی", "/services/ai-automation"], ["پیاده‌سازی n8n", "/services/ai-automation/n8n"], ["اتوماسیون CRM", "/services/ai-automation/crm"], ["چت‌بات هوش مصنوعی", "/services/ai-automation/chatbot"], ["نمونه: سیستم فروش املاک", "/work/ai-real-estate-os"])],
      },
      {
        q: "بازاریابی و رشد در بلونا چه چیزهایی را در بر می‌گیرد؟",
        a: "سئوی سایت، تولید محتوا، کمپین و سیستم جذب مشتری. هدف آوردن مشتری درست به سایت و رساندنش به تیم فروش است، نه فقط بازدید بیشتر.",
        details: [p("سئو صفحه‌ی خدمت جداگانه‌ی خودش را دارد و راهنمای فنی سئوی Next.js هم منتشر شده است."), links(["بازاریابی و رشد", "/services/marketing-growth"], ["سئو سایت", "/services/seo"], ["راهنمای سئوی Next.js", "/guides/nextjs-seo-checklist"])],
      },
      {
        q: "توسعه‌ی کسب‌وکار در بلونا چه چیزهایی را در بر می‌گیرد؟",
        a: "یک برنامه‌ی رشد مکتوب که مشخص می‌کند چه چیزی طراحی، ساخته، خودکار و تبلیغ شود تا همه برای یک هدف کار کنند. بعد آن را با CRM و فرایند فروش اجرا می‌کنیم.",
        details: [p("این خدمت هم مشاوره است و هم اجرا: برنامه را می‌نویسیم و بعد CRM، فرایند فروش و سیستم‌هایی را که اجرایش می‌کنند راه می‌اندازیم."), links(["توسعه‌ی کسب‌وکار", "/services/business-development"], ["بسته‌ها", "/offers"], ["آژانس دیجیتال یکپارچه", "/partner"])],
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
        q: "سایت املاک برای جذب سرمایه‌گذار چه چیزهایی لازم دارد؟",
        a: "سایت kharazie.at بخش‌های پروژه‌های جاری، خرید مستقیم از مالک، و سرمایه‌گذاران و سازندگان را دارد. سرمایه‌گذار می‌بیند چه پروژه‌هایی در جریان است، زمین‌ها و پروژه‌ها چطور بررسی می‌شوند و کجا درخواست بدهد.",
        details: [p("فرم بخش سرمایه‌گذاران جایی است که سرمایه‌گذار درخواستش را ثبت می‌کند. سایت و سیستم فروش خودکار هر دو برای یک هدف ساخته شدند: فروش پروژه‌های ملکی.")],
      },
      {
        q: "سیستم فروش خودکار املاک چه کارهایی را از دوش تیم برمی‌دارد؟",
        a: "پیدا کردن سرمایه‌گذار، سنجیدنش، نوشتن پیام، دریافت پاسخ، تحلیل پروژه و آماده کردن سند؛ یعنی همان زنجیره‌ای که فروش پروژه‌ی ملکی هر روز تکرارش می‌کند.",
        details: [p("گزارش روزانه به تیم می‌گوید چه کارهایی انجام شده. اگر مرحله‌ای خطا بدهد، مدیریت متمرکز خطا خبر می‌دهد؛ پس سیستم بی‌صدا از کار نمی‌افتد.")],
      },
      {
        q: "چرا CRM در کسب‌وکار املاک مهم است؟",
        a: "مشتری ملک با یک تماس خرید نمی‌کند؛ فرایند چندمرحله‌ای است و چند هفته طول می‌کشد. CRM هفت‌جدولی این سیستم پروژه‌ها، مخاطبان، کمپین‌ها، تعامل‌ها، کارها و اسناد را کنار هم نگه می‌دارد تا هیچ پیگیری‌ای گم نشود.",
        details: [p("Baserow به‌عنوان CRM انتخاب شد و هر تعامل در آن ثبت می‌شود. اگر CRM دیگری دارید، مثل HubSpot، همین منطق را روی آن هم می‌شود ساخت.")],
      },
      {
        q: "کدام کسب‌وکارهای املاک بیشتر از خودکارسازی فروش سود می‌برند؟",
        a: "کسب‌وکاری که پروژه‌های ملکی را به سرمایه‌گذار می‌فروشد و هر روز باید سرمایه‌گذار تازه پیدا کند، بسنجد، برایش بنویسد و پیگیری کند. چون این زنجیره تکراری است، بیشترین صرفه‌جویی هم همین‌جاست.",
        details: [p("اگر در ماه چند مشتری بیشتر ندارید و فروشتان پیگیری طولانی نمی‌خواهد، شاید به این حجم از اتوماسیون نیاز نداشته باشید. در بررسی رایگان رک می‌گوییم کدام حالت مال شماست، پیش از آنکه برای ساخت چیزی قیمت بدهیم.")],
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
        q: "انتقال از وردپرس چطور بی‌شکستن لینک‌ها انجام می‌شود؟",
        a: "با فهرست کردن همه‌ی آدرس‌ها پیش از انتقال و تعریف یک ریدایرکت دائمی ۳۰۱ برای هر کدام. در دانه یعنی ۲۷۸ ریدایرکت برای ۲۷۸ مطلب، تا هیچ لینک قدیمی‌ای نشکند.",
        details: [p("با ریدایرکت دائمی برای هر مطلب، اعتباری که آدرس‌های قدیمی در گوگل و لینک‌های بیرونی جمع کرده‌اند به آدرس تازه منتقل می‌شود."), links(["راهنمای انتقال از وردپرس به Next.js", "/guides/migrate-wordpress-to-nextjs"])],
      },
      {
        q: "تحریریه‌ی یک سایت خبری علمی چه ابزاری لازم دارد؟",
        a: "ابزاری که قواعد تحریریه را بشناسد. در دانه، Payload CMS مدیریت مطلب، برچسب و نویسنده را به دست تحریریه می‌دهد و منبع، لید خبر، زیرنویس، اعتبار تصویر و ساختار مطالب بلند را بررسی می‌کند.",
        details: [p("این قواعد در خود سیستم است، نه در حافظه‌ی آدم‌ها؛ پس خطاهای رایج، مثل مطلب بی‌منبع یا تصویر بی‌اعتبار، به چشم می‌آیند.")],
      },
      {
        q: "دسته‌بندی سایت خبری چطور باید باشد؟",
        a: "ساده و قابل دنبال کردن. دانه با ۱۵ دسته و ۱٬۰۵۷ برچسب شلوغ شده بود؛ دسته‌بندی به ۸ دسته و ۱۰۵ موضوع رسید تا هم خواننده مسیرش را پیدا کند و هم موتور جست‌وجو.",
        details: [p("انتقال سایت فرصت خوبی برای سامان دادن به دسته‌بندی است: چیزی که سال‌ها در وردپرس بی‌حساب بزرگ شده، در پلتفرم تازه از اول با ساختاری سنجیده شروع می‌شود.")],
      },
      {
        q: "کدام سایت‌های خبری باید انتقال از وردپرس را جدی بگیرند؟",
        a: "سایتی که سال‌ها مطلب منتشر کرده و صدها مطلب، برچسب‌های زیاد و لینک‌های بیرونی دارد. برای چنین سایتی جابه‌جایی بی‌برنامه یعنی خطر شکستن لینک‌ها؛ دانه با ۲۷۸ مطلب و ۱٬۰۵۷ برچسب دقیقاً همین وضع را داشت.",
        details: [p("اگر سایتتان کوچک است و مطلب زیادی ندارد، انتقال ساده‌تر است. در هر دو حالت، بررسی رایگان ما فهرست آدرس‌ها و خطرهای واقعی را پیش از هر تصمیمی روشن می‌کند.")],
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
        a: "پرداخت آنلاین، حساب کاربری مشتری و پنلی که تیم فروشگاه خودش بگرداند. در سبزینو پرداخت با زرین‌پال انجام می‌شود و یک پنل مستقل، محصولات، موجودی، قیمت و سفارش‌ها را مدیریت می‌کند.",
        details: [p("بدون این‌ها فروشگاه فقط یک کاتالوگ است. مهم این است که تیم برای هر تغییر قیمت یا موجودی منتظر برنامه‌نویس نماند.")],
      },
      {
        q: "فروشگاه محصول دست‌ساز یا لوکس را چطور بسازیم؟",
        a: "محصول را در مرکز بگذارید و دورش را خلوت نگه دارید. مجسمه سعیدی با چیدمان موبایل‌محور و دسته‌بندی روشن ساخته شد و نیرا با ظاهر آرام یک عطرسرا.",
        details: [p("در هر دو فروشگاه، خریدار پیش از قیمت به حس صفحه اعتماد می‌کند؛ برای همین قالب آماده معمولاً انتخاب خوبی نیست.")],
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
