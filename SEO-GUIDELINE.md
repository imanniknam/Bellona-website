# راهنمای سئو bellonaagency.com — نسخه‌ی ۲ (برای Claude Code)

تاریخ: ۲ نوامبر ۲۰۲۶ (۱۱ آبان ۱۴۰۵)
مبنا: بازبینی خودکار **سایت زنده** (هر ۱۰۰ آدرس سایت‌مپ، HTML خام سرور، هدرها، ریدایرکت‌ها، JSON-LD، لینک‌های داخلی) + خروجی Google Search Console (Pages، HTTPS، Performance).

این نسخه جای نسخه‌ی ۱ را می‌گیرد. بیشتر نسخه‌ی ۱ اجرا شده و درست کار می‌کند؛ این فایل فقط کارهای باقی‌مانده، اشتباه‌های اجرای قبلی و قدم‌های بعدی را دارد.

---

## ۰. قواعد کار

1. **همه‌ی بخش‌ها اجرا شود.** اولویت‌بندی لازم نیست؛ ترتیب بخش‌ها فقط ترتیب وابستگی فنی است.
2. **چیزهایی که در بخش ۱ «درست» علامت خورده را خراب نکن.** بعد از هر تغییر، بخش ۱۲ (آزمون‌های پذیرش) را دوباره اجرا کن؛ هیچ‌کدام نباید پسرفت کند.
3. طراحی بصری، رنگ، انیمیشن و چیدمان را تغییر نده، مگر جایی که صریحاً گفته شده.
4. هیچ عدد، قیمت، نظر مشتری، نام مشتری، تلفن، آدرس، دامنه یا تاریخی از خودت نساز. هرجا داده‌ی واقعی لازم است، `TODO(owner): ...` بگذار. **این TODOها هرگز نباید در HTML منتشرشده دیده شوند**؛ در کد، کامنت یا فایل داده بمانند و تا وقتی مالک پر نکرده، آن بخش رندر نشود.
5. هر تغییر فارسی، معادل انگلیسی (`/en`) هم داشته باشد. فارسی با نیم‌فاصله‌ی درست و «ی/ک» فارسی.
6. هر بخش یک commit جدا (`seo: schema-fixes`، `seo: brand-names`، ...).
7. پیش از شروع، ساختار پروژه را بخوان و برنامه‌ی کوتاه بنویس؛ بعد بدون انتظار برای تأیید شروع کن.

---

## ۱. وضعیت فعلی سایت (بازبینی‌شده روی نسخه‌ی زنده)

### ۱-الف. درست است؛ دست نزن

| مورد | وضعیت بررسی‌شده |
| --- | --- |
| سایت‌مپ | ۱۰۰ آدرس (۵۰ فارسی + ۵۰ انگلیسی)، همه با `xhtml:link` برای fa، en، x-default؛ هیچ آدرس قدیمی‌ای در آن نیست |
| وضعیت HTTP | هر ۱۰۰ آدرس ۲۰۰ می‌دهند، بدون ریدایرکت و بدون noindex |
| ریدایرکت‌های قدیمی | `/fa`، `/fa/`، `/industries/realEstate`، `/industries/realestate`، `/fa/industries/*`، `/industries/{finance,healthcare,consulting}`، `/en/industries/realEstate` همه تک‌مرحله‌ای به مقصد درست می‌روند |
| www، http، اسلش پایانی | `http://www.bellonaagency.com/services/` → `https://bellonaagency.com/services` |
| ۴۰۴ | آدرس ناموجود وضعیت ۴۰۴ واقعی با `noindex` می‌دهد |
| canonical | خودارجاع روی همه‌ی ۱۰۰ صفحه |
| hreflang | دوطرفه و درست (مثلاً `/work/codechee` ↔ `/en/work/codechee`)، x-default به فارسی |
| `lang` و `dir` | فارسی `fa`/`rtl`، انگلیسی `en`/`ltr` |
| title و description | هر ۱۰۰ صفحه عنوان یکتا و توضیح یکتا دارند؛ هیچ تکراری نیست |
| H1 | دقیقاً یک H1 در هر صفحه |
| تأیید Search Console | تگ `google-site-verification` روی صفحه‌ی اصلی هست |
| robots.txt | باز، `Disallow: /api/` با `Allow: /api/og`، ربات‌های جستجوی هوش مصنوعی مجاز، اشاره به سایت‌مپ |
| breadcrumb | قابل مشاهده و `BreadcrumbList` روی همه‌ی صفحه‌های داخلی |
| alt تصاویر | همه‌ی تصاویر alt دارند و alt نمونه‌کارها توصیفی است |
| لینک داخلی | صفر لینک شکسته، صفر صفحه‌ی یتیم، صفر anchor عمومی («اینجا»، «بیشتر») |
| og:type راهنماها | `article` |
| تصویر OG | کش `public, max-age=86400, immutable` |
| هدرها | Brotli، HSTS، `X-Content-Type-Options`، `Referrer-Policy`، `X-Frame-Options`، `Permissions-Policy` |
| وزن صفحه | HTML اصلی ۴۹ KB فشرده، جاوااسکریپت حدود ۱۱۰ KB، CLS برابر ۰ |
| صفحه‌های جدید | `/services/seo`، `/services/website-design/landing-page`، `/services/ai-automation/{n8n,crm,chatbot}`، `/guides` و ۶ راهنمای جدید منتشر شده‌اند |
| `/privacy` و `/terms` | `noindex, follow` و بیرون از سایت‌مپ (درست است) |

### ۱-ب. مشکل‌های باقی‌مانده (همه در بخش‌های ۲ تا ۱۰ حل می‌شوند)

| # | مشکل | شواهد | بخش |
| --- | --- | --- | --- |
| 1 | دو بلوک `FAQPage` در یک صفحه | `/offers`، `/services/ai-automation`، `/services/business-development`، `/services/website-design` و معادل انگلیسی هرکدام (۸ صفحه) | ۲-۱ |
| 2 | سؤال‌های FAQ تکراری بین صفحه‌ها | «هزینه‌ی طراحی سایت چقدر است؟» روی `/`، `/offers` و `/services/website-design`؛ چهار سؤال دیگر عیناً روی `/` و `/offers`؛ در `/services/website-design` دو بلوک FAQ هر دو درباره‌ی هزینه | ۲-۲ |
| 3 | نوع `ProfessionalService` بدون آدرس | این نوع زیرمجموعه‌ی `LocalBusiness` است و بدون `address` در Rich Results Test هشدار می‌گیرد | ۲-۳ |
| 4 | نام موجودیت برند هنوز تنها «Bellona» است | `Organization.name: "Bellona"`، `WebSite.name: "بلونا"`، `og:site_name` و `application-name` برابر «بلونا»، پسوند عنوان همه‌ی صفحه‌ها «· بلونا» / «· Bellona» | ۳ |
| 5 | لوگوی schema فقط SVG است | `logo: /brand/bellona-app-icon.svg` | ۲-۳ |
| 6 | `sameAs` فقط اینستاگرام | — | ۲-۳ و ۱۰ |
| 7 | نویسنده‌ی Article لینک ندارد و تصویر Article عمومی است | `author` بدون `url`؛ `image` برای همه‌ی راهنماها `/api/og?...title=Bellona%20Agency` | ۲-۴ |
| 8 | ۲۵ توضیح متا بیش از ۱۶۰ نویسه | فهرست در ۴-۱ | ۴-۱ |
| 9 | ۵ توضیح متا کمتر از ۹۰ نویسه | `/contact` (۸۳)، `/en/contact` (۶۸)، `/work/elm-kala` (۶۵)، `/en/work/elm-kala` (۸۴)، `/industries` (۸۸) | ۴-۱ |
| 10 | عنوان انگلیسی نمونه‌کارها بدون کلمه‌ی کلیدی | مثل `Codechee: Education, Programming & AI · Bellona` | ۴-۲ |
| 11 | H1 صفحه‌ی تماس کلمه‌ی کلیدی ندارد | «بگویید مشکل کجاست.» | ۴-۳ |
| 12 | نمونه‌کارها کم‌محتوا | ۱۹۰ تا ۴۲۴ کلمه در کل صفحه (جدول ۵-۱) | ۵-۱ |
| 13 | متن ناقص در پشته‌ی فنی علم‌کالا | بخش «تکنولوژی»: «Production web app، Railway» | ۵-۱ |
| 14 | صفحه‌های مرکزی کم‌محتوا | `/contact` ۱۹۶، `/industries` ۲۲۱، `/guides` ۲۶۵، `/services` ۳۱۴، `/industries/real-estate` ۲۷۹، `/industries/media` ۲۸۳ کلمه | ۵-۲ |
| 15 | `/partner` هم‌پوشان با `/` و `/about` و فقط ۱ لینک ورودی | — | ۵-۳ |
| 16 | تصویر اصلی نمونه‌کارها اولویت بارگذاری ندارد | تصویر cover بدون `fetchpriority="high"` / `priority` | ۶-۱ |
| 17 | آیکن‌ها | `/favicon.ico` ۴۰۴، `apple-icon` ۴۰۴، `manifest` ۴۰۴؛ فقط `icon.svg` | ۶-۲ |
| 18 | `lastmod` غیرواقعی | ۸۶ آدرس از ۱۰۰ یک زمان یکسان دارند (`2026-11-02T06:34:39Z`، زمان استقرار) | ۷-۱ |
| 19 | شکل آدرس ریشه یکدست نیست | canonical و `og:url` صفحه‌ی اصلی بدون اسلش (`https://bellonaagency.com`)، سایت‌مپ و hreflang با اسلش | ۷-۲ |
| 20 | لینک به دامنه‌های آزمایشی مشتری | `microshamim-rosy.vercel.app` و `asastudy-website.vercel.app` | ۸ |
| 21 | TTFB حدود ۱٫۳ ثانیه از شبکه‌ی مالک | سرور Vercel در فرانکفورت (`fra1`)، کش HIT | ۹ |
| 22 | راه تماس فقط ایمیل جیمیل | — | ۱۰ |

---

## ۲. داده‌ی ساختاریافته (JSON-LD)

### ۲-۱. یک FAQPage در هر صفحه
- در هر صفحه حداکثر **یک** اسکریپت با `@type: FAQPage` باشد. اگر صفحه دو بخش FAQ قابل مشاهده دارد، سؤال‌ها را در یک `mainEntity` ادغام کن.
- صفحه‌های فعلی دارای دو بلوک: `/offers`، `/services/ai-automation`، `/services/business-development`، `/services/website-design` و هر چهار معادل `/en`.
- ریشه‌ی مشکل را پیدا کن (احتمالاً کامپوننت FAQ پیش‌فرض صفحه + FAQ اختصاصی هر دو JSON-LD می‌سازند) و در همان جا حل کن، نه با حذف دستی.
- هر سؤالی که در JSON-LD است باید عیناً در HTML قابل مشاهده باشد، و برعکس.

### ۲-۲. سؤال‌های FAQ یکتا
- یک سؤال یکسان نباید در FAQ بیش از یک صفحه بیاید.
- `/` و `/offers`: پنج سؤال مشترک دارند (هزینه، زمان، «سایت داریم»، مالکیت کد، مشتری خارج از ایران). در `/offers` با سؤال‌های مخصوص پکیج‌ها جایگزین کن، مثل «تفاوت پکیج لانچ و سیستم رشد چیست؟»، «پرداخت چند مرحله‌ای است؟» (`TODO(owner)` برای پاسخ‌هایی که داده‌ی تجاری لازم دارند)، «بعد از اسپرینت اتوماسیون چه تحویل می‌گیرم؟».
- «هزینه‌ی طراحی سایت چقدر است؟»: فقط در `/services/website-design` بماند و با لینک به `/guides/website-design-cost` جواب بدهد. در `/` به «هزینه‌ی پروژه چطور تعیین می‌شود؟» تغییر کند.
- در `/services/website-design` بعد از ادغام، سؤال‌های هم‌معنی («هزینه و زمان طراحی سایت چقدر است؟» و «هزینه‌ی طراحی سایت چقدر است؟»، «ساخت سایت چقدر طول می‌کشد؟») را یکی کن.

### ۲-۳. موجودیت سازمان
روی همه‌ی صفحه‌ها یک گره با `@id: https://bellonaagency.com/#organization`:
- `@type`: `Organization`. نوع `ProfessionalService` را فقط وقتی بگذار که مالک آدرس واقعی داد (`TODO(owner): آدرس`)؛ در آن صورت `["Organization","ProfessionalService"]` با `address` کامل.
- `name`: `آژانس بلونا` در صفحه‌های فارسی و `Bellona Agency` در صفحه‌های انگلیسی. `alternateName`: `["Bellona Agency", "آژانس بلونا", "بلونا", "بلونا ایجنسی", "bellonaagency"]` (حذف `Bellona AI` مگر مالک تأیید کند نام فعلی است).
- `logo`: نسخه‌ی **PNG** مربعی، حداقل ۵۱۲×۵۱۲، پس‌زمینه‌ی ساده، در `/brand/bellona-logo-512.png` (از SVG فعلی بساز). `image` همان لوگو یا تصویر OG.
- `url`: `https://bellonaagency.com/` (با اسلش، هماهنگ با ۷-۲).
- `sameAs`: اینستاگرام + هر پروفایل واقعی‌ای که مالک بدهد (`TODO(owner)`: لینکدین، گیت‌هاب، Clutch و ...).
- `founder` و `employee` را نگه دار؛ به هر `Person` یک `@id` بده (`https://bellonaagency.com/about#amirhossein-bazdar` و ...) و در صفحه‌ی `/about` روی کارت هر نفر همان `id` را بگذار.
- `WebSite`: `name` برابر `آژانس بلونا` (فارسی) / `Bellona Agency` (انگلیسی)، `alternateName` مثل بالا.

### ۲-۴. Article (راهنماها)
- `author`: ارجاع به `@id` همان `Person` در ۲-۳ و `url` به `/about#...`.
- `image`: تصویر OG اختصاصی هر راهنما با عنوان خودش (`/api/og?locale=fa&title=<عنوان راهنما>`)، نه تصویر عمومی برند. همین آدرس برای `og:image` همان صفحه.
- `datePublished` و `dateModified` از داده‌ی واقعی هر راهنما (الان در داده هست؛ هماهنگ با سایت‌مپ نگه دار).

### ۲-۵. CreativeWork (نمونه‌کارها)
- `url` سایت مشتری فقط دامنه‌ی نهایی (بخش ۸).
- `dateCreated` فقط اگر سال پروژه معلوم است (`TODO(owner)`).
- `about` یا `keywords` با نوع پروژه (فروشگاه اینترنتی، پلتفرم آموزشی، ...).

### ۲-۶. اعتبارسنجی
هر نوع صفحه (اصلی، خدمات، زیرخدمات، راهنما، نمونه‌کار، درباره، تماس، صنعت) را در Rich Results Test و validator.schema.org بزن؛ صفر خطا و صفر هشدار.

---

## ۳. نام برند (جدا شدن از «Bellona»های دیگر)

Search Console نشان می‌دهد همه‌ی ۲۱ جستجوی نمایش‌داده‌شده نسخه‌ای از «bellona» است و کاربرانشان دنبال هتل، آژانس مدل، Marvel و برندهای دیگرند. «بلونا» فارسی جایگاه ۵۵ دارد. نام ترکیبی، موجودیت مستقل می‌سازد.

- `og:site_name` و `application-name`: فارسی `آژانس بلونا`، انگلیسی `Bellona Agency`.
- پسوند عنوان: فارسی `· آژانس بلونا`، انگلیسی `· Bellona Agency`.
- قاعده‌ی طول: عنوان کامل حداکثر حدود ۶۵ نویسه. اگر با پسوند جدید بلندتر می‌شود، بخش اول را کوتاه کن، نه پسوند را. فهرست عنوان‌های قبل و بعد را در گزارش بیاور.
- عنوان صفحه‌ی اصلی همان فعلی بماند (`آژانس بلونا | ...` و `Bellona Agency | ...`).
- صفحه‌ی ۴۰۴: `صفحه پیدا نشد · آژانس بلونا` / `Page not found · Bellona Agency`.
- در متن صفحه‌ی اصلی فارسی یک جمله‌ی صریح موجودیت: «آژانس بلونا تیم طراحی سایت و اتوماسیون هوش مصنوعی از مهندسان دانشگاه صنعتی شریف است.» (شهر را فقط اگر مالک تأیید کرد اضافه کن: `TODO(owner)`).
- لوگوی متنی هدر: `alt` یا `aria-label` برابر `آژانس بلونا` / `Bellona Agency`.

---

## ۴. عنوان، توضیح و H1

### ۴-۱. طول توضیح متا
هدف: ۱۲۰ تا ۱۶۰ نویسه، با کلمه‌ی اصلی صفحه در نیمه‌ی اول، و پایان با یک دعوت روشن («بررسی رایگان»، «Free audit»).

کوتاه کن (بالای ۱۶۰):
`/en` (۱۷۱)، `/en/guides/ai-search-readiness` (۲۰۷)، `/en/guides/bilingual-website-hreflang-rtl` (۱۶۷)، `/en/guides/lead-follow-up-automation-n8n` (۱۸۲)، `/en/guides/migrate-wordpress-to-nextjs` (۱۹۵)، `/en/guides/nextjs-seo-checklist` (۱۷۵)، `/en/guides/website-design-cost` (۱۷۷)، `/en/industries/education` (۱۷۰)، `/en/industries/real-estate` (۱۶۹)، `/en/services/ai-automation/crm` (۱۷۰)، `/en/services/seo` (۱۶۹)، `/en/services/website-design` (۱۷۲)، `/en/services/website-design/bilingual` (۲۲۲)، `/en/services/website-design/corporate` (۱۷۳)، `/en/services/website-design/ecommerce` (۱۷۷)، `/en/services/website-design/landing-page` (۱۷۳)، `/en/services/website-design/nextjs` (۱۶۹)، `/en/services/website-design/redesign` (۱۹۰)، `/en/work/ai-real-estate-os` (۱۶۶)، `/guides/migrate-wordpress-to-nextjs` (۱۶۹)، `/services/ai-automation/n8n` (۱۷۱)، `/services/website-design/bilingual` (۱۹۱)، `/services/website-design/corporate` (۱۹۳)، `/services/website-design/ecommerce` (۱۶۹)، `/services/website-design/redesign` (۱۸۸).

بلند کن (زیر ۹۰): `/contact`، `/en/contact`، `/work/elm-kala`، `/en/work/elm-kala`، `/industries`.

یک تست خودکار بنویس که در build یا CI طول title (≤ ۶۵) و description (۱۰۰ تا ۱۶۰) همه‌ی صفحه‌ها را بسنجد و تکراری بودن را هم بگیرد.

### ۴-۲. عنوان نمونه‌کارها
الگو بر اساس نوع پروژه (فیلد `type` که در نسخه‌ی ۱ اضافه شد):

| نوع | فارسی | انگلیسی |
| --- | --- | --- |
| website | `طراحی سایت <نام>؛ <حوزه> · آژانس بلونا` | `<Name> website design: <domain> · Bellona Agency` |
| product | `طراحی و توسعه‌ی پلتفرم <نام>؛ <حوزه> · آژانس بلونا` | `<Name> platform design & development · Bellona Agency` |
| automation | `<نام>؛ اتوماسیون هوش مصنوعی و n8n · آژانس بلونا` | `<Name>: AI & n8n automation case study · Bellona Agency` |
| mobile-app | `توسعه‌ی اپلیکیشن <نام>؛ <حوزه> · آژانس بلونا` | `<Name> mobile app development · Bellona Agency` |

نمونه: `Codechee: Education, Programming & AI · Bellona` → `Codechee e-learning platform design & development · Bellona Agency`. قاعده‌ی طول ۴-۱ رعایت شود.

### ۴-۳. H1 صفحه‌ی تماس
H1 فعلی «بگویید مشکل کجاست.» به `تماس با آژانس بلونا و رزرو مشاوره‌ی رایگان` تغییر کند. جمله‌ی فعلی را به‌عنوان زیرعنوان نگه دار. انگلیسی: `Contact Bellona Agency and book a free audit`.

---

## ۵. محتوا

### ۵-۱. نمونه‌کارها (هر ۳۰ صفحه، فارسی و انگلیسی)
شمار کلمه‌ی فعلی کل صفحه (فارسی/انگلیسی؛ شامل بلوک دعوت به اقدام پایین صفحه، پس متن واقعی کمتر است):

| پروژه | کلمه | پروژه | کلمه |
| --- | --- | --- | --- |
| elm-kala | 190 / 192 | shamim-house | 250 / 270 |
| nira-perfume | 205 / 225 | mojasame-saidi | 257 / 269 |
| codechee | 217 / 220 | microshamim | 261 / 263 |
| school-builders | 221 / 242 | asa-study | 263 / 257 |
| prowem | 236 / 258 | contemo | 273 / 273 |
| konjed | 248 / 274 | sabzino | 284 / 311 |
| yasin | 289 / 307 | dane-news | 378 / 395 |
| ai-real-estate-os | 424 / 410 | | |

`dane-news` قالب کامل را دارد (چالش، چه ساختیم، نتیجه، تکنولوژی، «چطور انجام شد؟»، «چرا این فناوری؟»، «نتیجه‌ی قابل اندازه‌گیری»). همین قالب را برای همه‌ی پروژه‌ها کامل کن، فقط با اطلاعاتی که در کد، داده‌ی پروژه، سایت مشتری یا صفحه‌های فعلی هست:
1. چالش (۲ تا ۴ جمله)
2. چه ساختیم (فهرست)
3. تکنولوژی (دقیق)
4. «چطور ساخته شد؟» (مراحل، ۱۰۰ تا ۲۰۰ کلمه)
5. «چرا این راه‌حل؟» (تصمیم‌های فنی و طراحی)
6. نتیجه: فقط عدد واقعی؛ در غیر این صورت بخش نتیجه رندر نشود و `TODO(owner)` در داده بماند
7. نقل‌قول مشتری: فقط واقعی، وگرنه رندر نشود
8. «پروژه‌ای مثل <نام> دارید؟» با لینک به خدمت مرتبط

هدف: ۵۰۰ تا ۸۰۰ کلمه‌ی مفید در هر نمونه‌کار، بدون پرکردن.
- **علم‌کالا:** «Production web app، Railway» را با پشته‌ی واقعی از کد یا مستندات پروژه جایگزین کن؛ اگر معلوم نیست، `TODO(owner)` و بخش رندر نشود.

### ۵-۲. صفحه‌های مرکزی
- **`/contact`** (۱۹۶ کلمه): H1 جدید (۴-۳)، فرم، ایمیل، پاسخ‌گویی (مثلاً «در یک روز کاری»، فقط اگر مالک تأیید کند: `TODO(owner)`)، چه اطلاعاتی بفرستند، روند بعد از تماس (موجود)، کانال‌های دیگر (بخش ۱۰)، FAQ یکتا.
- **`/industries`** (۲۲۱): برای هر صنعت یک پاراگراف ۶۰ تا ۱۰۰ کلمه‌ای (مشکل صنعت، آنچه می‌سازیم، شمار پروژه‌ها: آموزش ۶، فروش آنلاین ۴، املاک ۱، رسانه ۱) و لینک.
- **`/guides`** (۲۶۵): یک پاراگراف معرفی، کارت هر راهنما با خلاصه‌ی دو جمله‌ای، تاریخ به‌روزرسانی و نویسنده، گروه‌بندی موضوعی (طراحی سایت، سئو، اتوماسیون)، و `ItemList` در JSON-LD.
- **`/services`** (۳۱۴): برای هر خدمت اصلی یک پاراگراف ۸۰ تا ۱۲۰ کلمه‌ای با لینک به همه‌ی زیرصفحه‌هایش و یک نمونه‌کار.
- **`/industries/real-estate`** (۲۷۹) و **`/industries/media`** (۲۸۳): بخش‌های «مشکل»، «چه می‌سازیم» با جزئیات، مطالعه‌ی موردی خلاصه (kharazie.at / دانه با عددهای موجود)، خدمات مرتبط، FAQ؛ هدف ۶۰۰ کلمه‌ی مفید.
- **`/industries/ecommerce`** (۳۶۶): همین کار با چهار فروشگاه موجود.

### ۵-۳. صفحه‌ی `/partner`
محتوای آن با `/` و `/about` هم‌پوشانی دارد و فقط ۱ لینک ورودی می‌گیرد. یکی از این دو راه را اجرا کن و دلیلش را در گزارش بنویس:
- **راه اول (پیش‌فرض):** صفحه را روی کلمه‌ی «آژانس دیجیتال همه‌کاره / همراه دیجیتال» متمایز کن: title و H1 با این کلمه، مقایسه‌ی «یک تیم یا چند پیمانکار» (موجود)، مدل همکاری ماهانه، و لینک از `/about`، `/services`، `/offers` و فوتر.
- **راه دوم:** اگر صفحه پیشنهاد مستقلی ندارد، محتوایش را در `/about` ادغام کن و `/partner` → `/about` ریدایرکت ۳۰۱ (و `/en/partner` → `/en/about`) شود و از سایت‌مپ حذف شود.

### ۵-۴. کیفیت متن
- هیچ جمله‌ای بین دو صفحه عیناً تکرار نشود (به‌جز اجزای مشترک مثل هدر، فوتر و بلوک دعوت به اقدام). یک اسکریپت بنویس که جمله‌های بلندتر از ۱۲ کلمه را در `main` همه‌ی صفحه‌ها مقایسه کند و تکراری‌ها را گزارش دهد؛ تکراری‌ها را بازنویسی کن.
- متن انگلیسی را با یک بازخوانی انسانی‌گونه یکدست کن: املای آمریکایی، بدون ترجمه‌ی تحت‌اللفظی.

---

## ۶. تصاویر و آیکن‌ها

### ۶-۱. اولویت تصویر LCP
- تصویر cover بالای صفحه‌ی هر نمونه‌کار، تصویر hero صفحه‌ی اصلی (اگر تصویر است)، و تصویر بالای هر راهنما و صفحه‌ی صنعت: `priority` در `next/image` (خروجی `fetchpriority="high"` و بدون `loading="lazy"`).
- بقیه‌ی تصاویر `loading="lazy"` بمانند (الان درست است).

### ۶-۲. آیکن‌ها و manifest
در `app/` (قرارداد فایلی Next.js):
- `favicon.ico` (۴۸×۴۸ و ۳۲×۳۲ و ۱۶×۱۶)
- `icon.png` (۱۹۲×۱۹۲) کنار `icon.svg` فعلی
- `apple-icon.png` (۱۸۰×۱۸۰)
- `manifest.ts` با `name: "آژانس بلونا"`، `short_name: "بلونا"`، آیکن‌های ۱۹۲ و ۵۱۲، `theme_color` و `background_color` فعلی سایت
گوگل در نتایج جستجو favicon را نشان می‌دهد و آیکن مربعی حداقل ۴۸ پیکسل می‌خواهد.

---

## ۷. سایت‌مپ و یکدستی آدرس

### ۷-۱. `lastmod` واقعی
الان ۸۶ آدرس از ۱۰۰ زمان یکسان استقرار را دارند. برای هر صفحه تاریخ آخرین تغییر واقعی محتوای همان صفحه را بگذار:
- راهنماها و نمونه‌کارها: فیلد `updatedAt` در داده (اگر نیست اضافه کن و از تاریخ آخرین commit همان فایل داده پر کن).
- صفحه‌های خدمات، صنعت و ثابت: تاریخ آخرین commit فایل‌های محتوای همان صفحه (`git log -1 --format=%cI -- <files>`) در زمان build؛ اگر محیط build تاریخچه‌ی git ندارد، یک فایل `content-dates.json` در build بساز و commit کن.
- زمان build را برای همه نگذار.

### ۷-۲. شکل آدرس ریشه
canonical و `og:url` صفحه‌ی اصلی الان `https://bellonaagency.com` (بدون اسلش) است، ولی سایت‌مپ و hreflang `https://bellonaagency.com/`. هر دو یکی هستند، ولی یکدست کن: برای ریشه در canonical، `og:url`، hreflang، سایت‌مپ و JSON-LD همه‌جا `https://bellonaagency.com/` باشد. برای بقیه‌ی صفحه‌ها بدون اسلش پایانی (همین الان درست است).

---

## ۸. لینک‌های بیرونی به سایت مشتری‌ها
- دو پروژه به دامنه‌ی آزمایشی Vercel لینک می‌دهند: `https://microshamim-rosy.vercel.app` و `https://asastudy-website.vercel.app`. `TODO(owner)`: دامنه‌ی نهایی این دو را بده. تا آن موقع لینک «مشاهده‌ی سایت» این دو را نمایش نده (لینک به دامنه‌ی آزمایشی حرفه‌ای نیست و ممکن است آن نسخه‌ها هم ایندکس شده باشند).
- `TODO(owner)`: روی سایت‌های تحویل‌شده‌ی خودتان (`danenews.ir`، `codechee.ir`، `sabzinow.ir`، `yasinow.ir`، `contemo.ir`، `konjed.top`، `niraperfume.com`، `mojasamesaidi.ir`، `shamimhouse.ir`، `prowem.com`، `kharazie.at` و ...) با رضایت مشتری یک خط فوتر «طراحی و توسعه: آژانس بلونا» با لینک به `https://bellonaagency.com/` (یا به صفحه‌ی همان نمونه‌کار) بگذارید. این‌ها مرتبط‌ترین بک‌لینک‌هایی است که می‌توانید داشته باشید.
- اگر سایت‌های آزمایشی Vercel مشتری‌ها در دسترس عموم‌اند، `TODO(owner)`: روی آن‌ها `noindex` یا محافظت با رمز.

---

## ۹. سرعت و دسترسی از ایران
- TTFB صفحه‌ی اصلی از شبکه‌ی مالک حدود ۱٫۳ ثانیه بود (سرور `fra1`، کش HIT). همه‌ی صفحه‌ها را تا جای ممکن استاتیک نگه دار (الان `x-nextjs-prerender: 1` است؛ حفظ شود) و هیچ صفحه‌ای را بی‌دلیل dynamic نکن.
- `TODO(owner)`: PageSpeed Insights (موبایل) را برای `/`، `/services/website-design`، `/work/dane-news` و `/guides/website-design-cost` اجرا کن و عدد LCP، INP و CLS را در گزارش بگذار. هدف: LCP < ۲٫۵ ثانیه، INP < ۲۰۰ میلی‌ثانیه، CLS < ۰٫۱.
- `TODO(owner)`: سایت را از ایران روی موبایل، با اینترنت همراه و بدون VPN باز کن و زمان باز شدن را بنویس. اگر کند یا گاهی در دسترس نبود، گزینه‌ی CDN یا میزبان دیگر بررسی شود. مخاطب اصلی سایت فارسی در ایران است.
- کتابخانه‌های سنگین (GSAP، Three.js، Lenis) فقط در صفحه‌هایی که لازم دارند بارگذاری شوند. با `next build` و تحلیل bundle بررسی کن که روی صفحه‌های خدمات و راهنماها نیستند.

---

## ۱۰. اعتماد و حضور بیرونی
بیشتر این بخش دست مالک است؛ Claude Code جاهای لازم را در کد آماده کند و تا داده نیامده رندر نشوند.
- `TODO(owner)`: یک کانال گفتگوی سریع (تلگرام یا واتساپ) و در صورت وجود تلفن. Claude Code جای آن را در فوتر، `/contact` و `ContactPoint` آماده کند.
- `TODO(owner)`: ایمیل دامنه‌ای (مثل `hello@bellonaagency.com`) به‌جای جیمیل در همه‌ی صفحه‌ها و schema.
- `TODO(owner)`: صفحه‌ی لینکدین شرکت، گیت‌هاب، و برای مخاطب انگلیسی پروفایل Clutch یا GoodFirms؛ همه با نام `Bellona Agency` و لینک به سایت، و افزودن به `sameAs`.
- `TODO(owner)`: نظر واقعی دست‌کم سه مشتری (نام، سمت، شرکت، با اجازه). Claude Code یک بخش «نظر مشتریان» آماده کند که فقط با داده‌ی واقعی رندر شود.
- `TODO(owner)`: انتشار یکی دو مطلب در ویرگول یا لینکدین (مثلاً خلاصه‌ی مهاجرت دانه) با لینک به راهنمای کامل در سایت.

---

## ۱۱. Search Console

### ۱۱-۱. داده‌ی مبنا (۱ اوت تا ۳۱ اکتبر ۲۰۲۶؛ پیش از استقرار نسخه‌ی جدید)
- ایندکس: ۵ صفحه ایندکس‌شده، ۹ صفحه «Discovered - currently not indexed» (۵ + ۹ = همان ۱۴ آدرس سایت‌مپ قدیمی). داده‌ی Pages تا ۲۳ اکتبر.
- عملکرد: ۱۱ کلیک، ۳۱۴ نمایش (اوت ۲/۱۲۶، سپتامبر ۴/۹۸، اکتبر ۵/۹۰).
- صفحه‌های دارای نمایش: `/` (۲۸۱)، `/industries/healthcare` (۲۶)، `/industries/ecommerce` (۲۲)، `/fa` (۱۹)، `/fa/industries/consulting` (۷). همه‌ی این‌ها الان درست ریدایرکت یا به‌روز شده‌اند.
- جستجوها: ۲۱ جستجو، همه شکلی از «bellona»، صفر جستجوی غیربرندی. «بلونا» ۱ نمایش در جایگاه ۵۵.
- کشور: ایران ۲۰ نمایش از ۳۱۴. دستگاه: موبایل ۹۷ (جایگاه ۴٫۸)، دسکتاپ ۲۱۷ (جایگاه ۲۸٫۴).
- HTTPS: بدون مشکل. Search appearance: خالی.

### ۱۱-۲. کارهای مالک بعد از استقرار این نسخه (Claude Code چک‌لیست نهایی را در گزارش بنویسد)
1. **Sitemaps:** `sitemap.xml` را دوباره Submit کن؛ وضعیت باید «Success» با ۱۰۰ آدرس کشف‌شده (یا عدد نهایی) باشد.
2. **URL Inspection → Request indexing**، در چند روز پخش شود (سقف روزانه دارد):
   روز ۱: `/`، `/en`، `/services/website-design`، `/services/website-design/nextjs`، `/services/website-design/ecommerce`، `/guides/website-design-cost`، `/work`، `/about`
   روز ۲: `/services/website-design/{corporate,bilingual,redesign,landing-page}`، `/services/seo`، `/services/ai-automation`، `/services/ai-automation/n8n`، `/industries/education`
   روز ۳: ۶ راهنمای جدید و `/guides`
   روز ۴ به بعد: نمونه‌کارها، از `dane-news`، `ai-real-estate-os` و `sabzino` شروع شود
3. **Pages → Discovered - currently not indexed → Validate fix.**
4. هیچ آدرسی را با ابزار Removals حذف نکن؛ ریدایرکت‌ها کافی است.
5. یک ملک Domain (`bellonaagency.com`، تأیید DNS) هم بساز.
6. **Bing Webmaster Tools:** «Import from Google Search Console» و ثبت سایت‌مپ.
7. خروجی Pages، Performance و Enhancements را ۲، ۴ و ۸ هفته بعد دوباره بگیر.

### ۱۱-۳. نشانه‌هایی که باید دید
- ۲ هفته: سایت‌مپ «Success»؛ آدرس‌های قدیمی در Pages به «Page with redirect» می‌روند؛ صفحه‌های اصلی خدمات «Indexed».
- ۴ هفته: صفحه‌های `/services/*`، `/work/*` و `/guides/*` نمایش دارند؛ اولین جستجوهای غیربرندی.
- ۸ هفته: «آژانس بلونا» و «بلونا» در جایگاه ۱ تا ۳؛ سهم ایران در نمایش‌ها بالا رفته؛ Breadcrumb در Search appearance.
این‌ها نشانه‌اند، نه قول. رتبه به رقابت و زمان بستگی دارد.

---

## ۱۲. آزمون‌های پذیرش
یک اسکریپت `scripts/seo-check.mjs` بنویس که روی `next start` محلی و روی سایت زنده اجرا شود و این‌ها را بسنجد. هر بند باید «PASS» شود:

| آزمون | شرط PASS |
| --- | --- |
| سایت‌مپ | هر `<loc>` ۲۰۰ می‌دهد، بدون ریدایرکت و بدون noindex؛ هر صفحه‌ی indexable در سایت‌مپ هست؛ هیچ آدرس ریدایرکت‌شده در سایت‌مپ نیست |
| lastmod | دست‌کم ۸۰٪ آدرس‌ها `lastmod` متفاوت از زمان build دارند |
| canonical | خودارجاع، مطلق، همان شکل سایت‌مپ (۷-۲) |
| hreflang | هر صفحه fa، en، x-default دارد و جفت مقابل همان را برمی‌گرداند |
| title | ≤ ۶۵ نویسه، یکتا، پسوند `· آژانس بلونا` / `· Bellona Agency` (به‌جز صفحه‌ی اصلی) |
| description | ۱۰۰ تا ۱۶۰ نویسه، یکتا |
| H1 | دقیقاً یک |
| JSON-LD | همه parse می‌شوند؛ حداکثر یک `FAQPage` در هر صفحه؛ هیچ سؤال FAQ در دو صفحه تکرار نمی‌شود؛ `Organization.name` برابر `آژانس بلونا` / `Bellona Agency`؛ `logo` با `.png` |
| og | `og:site_name` برابر `آژانس بلونا` / `Bellona Agency`؛ راهنماها `og:image` اختصاصی |
| ریدایرکت | همه‌ی آدرس‌های جدول ۱-الف تک‌مرحله‌ای به مقصد درست |
| ۴۰۴ | آدرس ناموجود → ۴۰۴ + noindex |
| آیکن | `/favicon.ico`، `/apple-icon.png`، `/manifest.webmanifest` → ۲۰۰ |
| لینک | صفر لینک داخلی شکسته؛ صفر صفحه‌ی یتیم؛ صفر لینک به `*.vercel.app` |
| نشت | هیچ `TODO`، `undefined` یا `[object` در متن قابل مشاهده‌ی HTML نیست (کلمه‌ی کامل، نه زیررشته) |
| محتوا | هر نمونه‌کار ≥ ۵۰۰ کلمه در `main` (بدون هدر، فوتر و بلوک دعوت پایانی)؛ گزارش صفحه‌هایی که نرسیده‌اند |

دستورهای سریع برای سایت زنده بعد از استقرار:

```bash
B=https://bellonaagency.com
curl -s $B/sitemap.xml | grep -c "<loc>"
for u in /fa /industries/realEstate /industries/healthcare /fa/industries/consulting /partner; do
  curl -sI "$B$u" | grep -iE "^HTTP|^location"; done
curl -s $B/ | grep -o 'og:site_name" content="[^"]*'
curl -s $B/services/website-design | grep -o '"@type":"FAQPage"' | wc -l        # باید 1 باشد
curl -s $B/ | grep -o '"name":"[^"]*","alternateName' | head -1
for f in favicon.ico apple-icon.png manifest.webmanifest; do curl -sI $B/$f | head -1; done
curl -s $B/work/codechee | grep -o 'fetchPriority="high"\|fetchpriority="high"' | head -1
```

---

## ۱۳. ممنوع‌ها
- آمار، نتیجه، نظر مشتری، قیمت یا تاریخ ساختگی.
- صفحه‌ی بی‌ارزش یا تکراری فقط برای کلمه‌ی کلیدی؛ انبار کردن کلمه‌ی کلیدی.
- متن مخفی، لینک مخفی، cloaking.
- حذف صفحه بدون ریدایرکت ۳۰۱.
- حذف یا تغییر تگ تأیید Search Console.
- تغییر slug صفحه‌های موجود (همه‌ی آدرس‌های فعلی باید بمانند).
- `noindex` کردن صفحه‌ای که در سایت‌مپ است.

---

## ۱۴. گزارش پایانی (`SEO-CHANGELOG.md`، ادامه‌ی فایل قبلی)
1. تغییرها به تفکیک بخش (۲ تا ۱۰) و commit.
2. خروجی کامل `scripts/seo-check.mjs` قبل و بعد.
3. جدول عنوان‌های قبل و بعد (بخش ۳ و ۴).
4. تصمیم و دلیل برای `/partner` (۵-۳).
5. شمار کلمه‌ی هر نمونه‌کار قبل و بعد.
6. فهرست همه‌ی `TODO(owner)` با مسیر فایل و اینکه تا پر شدن چه چیزی رندر نمی‌شود.
7. چک‌لیست Search Console برای مالک (۱۱-۲) با آدرس‌های نهایی.
