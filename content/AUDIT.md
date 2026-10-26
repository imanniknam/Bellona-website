# Bellona: content audit of the current site

Crawled on 2026-10-21: https://bellonaagency.com (EN), https://bellonaagency.com/fa (FA), the 12 industry pages (`/industries/*`, `/fa/industries/*`), `robots.txt` and `sitemap.xml`.
I opened every FAQ item to capture the answers, which only render after a click.

**Verdicts**
- **keep**: carry over as-is (light copy edits at most).
- **sharpen**: keep the idea, rewrite or tighten it.
- **merge**: fold it into another block.
- **drop**: don't carry it over.

> Copy is quoted verbatim from the live site. EN first, then FA.

---

## 0. Site inventory

| URL | Status | Notes |
|---|---|---|
| `/` | 200 | One long single-page home (EN) |
| `/fa` | 200 | Persian mirror, `dir="rtl"`, Vazirmatn font |
| `/industries/{realEstate,finance,healthcare,ecommerce,consulting,education}` | 200 | **All 6 are empty**: "Projects coming soon" |
| `/fa/industries/*` | 200 | **All 6 are empty**: «به‌زودی اضافه می‌شود» |
| `/about`, `/services`, `/privacy`, `/terms` | 404 | Footer "Privacy" and "Terms" link to `#` |
| `robots.txt` | 200 | Allow all, points to sitemap |
| `sitemap.xml` | 200 | 14 URLs (home ×2 + 12 empty industry pages) |

**Meta (EN)**
- Title: "Bellona — AI Systems That Work While You Sleep"
- Description: "Bellona designs AI agents, automations, and intelligent systems that replace repetitive work and help businesses scale faster."
- OG description: "Build Your AI Workforce with Bellona."
- JSON-LD: `Organization` only, `sameAs: []`.

**Meta (FA)**
- Title: «بلونا — معماری هوشمند برای رشد بی‌وقفه»
- Description: «بلونا سیستم‌های هوش مصنوعی و اتوماسیون اختصاصی می‌سازد تا کارهای تکراری حذف شود و تیم شما روی رشد تمرکز کند.»
- hreflang `en`/`fa` pair is present.

**Verdict: sharpen.** Keep the title idea ("…while you sleep" is now the approved hero line). Rewrite descriptions for the full-service positioning. Add `ProfessionalService` and `FAQPage` JSON-LD.

---

## 1. Header

| | EN | FA |
|---|---|---|
| Nav | How It Works · Services · Industries · About · فارسی | مسیر همکاری · خدمات · حوزه‌های فعالیت · تیم ما · English |
| CTA | Get Started (→ `#cta`, an email field) | شروع همکاری |

**Verdict: sharpen.**
- The nav points to anchors only. The new nav uses real pages.
- The language switch is a `<button>`, not a link, so crawlers can't follow it.
- "Get Started" leads to a bare email field. Replace it with "Book a 30-min free call" plus the full contact form.
- **Keep** the FA label «مسیر همکاری» ("path of working together"). It's a good fit for the new partner journey.

---

## 2. Hero

| | EN | FA |
|---|---|---|
| Eyebrow | Your operations, running 24/7 | بلونا · آژانس سیستم‌های هوش مصنوعی |
| Headline | It's Not Just / You Anymore. | کسب‌وکاری که / حتی در سکوت، رشد می‌کند. |
| Copy | Your agents get deployed. Your workflows run. / Your leads get qualified. Your ops scale. / You just... move on with your day. | ایجنت‌ها راه می‌افتند، گردش‌کارها خودکار جلو می‌روند. / مشتریان بالقوه غربال می‌شوند، عملیات بدون توقف گسترش می‌یابد. / شما فقط تصمیم‌های مهم را می‌گیرید. |
| CTA | Get Started | شروع همکاری |
| Proof | 100+ automations built · 24/7 AI operations · Free strategy audit | بیش از ۱۰۰ اتوماسیون اجراشده · پشتیبانی عملیاتی ۲۴ ساعته · جلسه مشاوره رایگان |

| Block | Verdict | Reason |
|---|---|---|
| Headline "It's Not Just You Anymore." | **drop** | Replaced by the approved "AI systems that work while you sleep." (BRIEF). See Q1 in TODO-OWNER on whether the headline should widen beyond AI. |
| FA headline «کسب‌وکاری که حتی در سکوت، رشد می‌کند» | **drop** (keep as an alternative) | Strong line. Kept as a fallback if you want a growth-led FA headline. |
| Three-line copy | **sharpen** | The rhythm is good, but it covers AI only. The new sub-copy names all five pillars. |
| Proof pill | **keep** | All three items are approved facts. Becomes the stats pill under the hero CTAs. |

---

## 3. Hero dashboard: ⚠ MOCK DATA

```
Your automations this week · All on track
🤖 AI Agents: 12 active & learning
⚡ Workflows: 47 running smoothly
📊 Leads: 2,847 processed this week
💰 Revenue: $847K attributed
🔗 CRM Sync: Live & syncing
IN SR · Handled by your AI team
```
FA: «۱۲ ایجنت فعال · ۴۷ فرایند در حال اجرا · ۲٬۸۴۷ مورد این هفته · ۸۴۷ هزار دلار»

**Verdict: drop.**
- These are illustrative numbers shown as "your automations this week" with no label saying so. A visitor reads them as real client results.
- The same "47 active" number repeats in the Monday section (§6).
- **These numbers must not appear anywhere on the new site.** The animated cube mark replaces this visual.

---

## 4. Stats counter row

| EN | FA | Verdict |
|---|---|---|
| 100+ Automations Built | اتوماسیون اجراشده | **keep** |
| 24/7 AI Operations | عملیات هوشمند | **keep** |
| 80% Time Saved | صرفه‌جویی زمانی | **keep**, add context: "time saved on automated tasks" [CONFIRM how it's measured] |
| 3X Operational Efficiency | افزایش بهره‌وری | **keep**, add context [CONFIRM source] |

**Note:** the server-rendered HTML prints these as **"0+", "0/7", "0%", "0X"**. They only count up after JavaScript runs, so crawlers and no-JS visitors see zeros. The new build renders final values in HTML.

---

## 5. Problem section

- **EN headline:** "Everything Your Business Needs. / None of the Chaos."
- **FA headline:** «ایده دارید، ابزار دارید، / اما سیستم ندارید.»

| Card | EN quote | FA quote | Bullets (EN) |
|---|---|---|---|
| Manual Operations / کارهای تکراری | "You know what needs automating. But between client work and daily fires, your workflows stay half-built and your team stays overwhelmed." | «می‌دانید کجاها باید خودکار شود، اما بین پروژه مشتری و کارهای فوری، همیشه عقب می‌افتید.» | Tasks repeated every single day · Bottlenecks killing your growth · No time to build what you planned |
| Lead & Sales Chaos / فروش پراکنده | "Leads come in. Follow-ups slip. Your CRM is a graveyard of missed opportunities because nobody has time to nurture properly." | «مشتری جدید می‌آید، پیگیری عقب می‌افتد، CRM پر است از فرصت‌هایی که هیچ‌وقت پیگیری نشدند.» | Leads going cold within hours · Follow-ups always 'tomorrow' · Pipeline data you can't trust |
| Broken Automations / اتوماسیون نیمه‌کاره | "You didn't start a business to spend weekends fixing Zapier flows or wondering why your integrations broke again." | «ابزار خریدید، اتصال زدید، یک هفته بعد خراب شد — و دوباره همه‌چیز دستی شد.» | Integrations that silently fail · Tools that don't talk to each other · Weekends lost to tech debt |

- **Closing line (EN):** "The strategy isn't the problem. / You've never had enough systems."
- **Closing line (FA):** «مشکل از نداشتن برنامه نیست. / مشکل از نداشتن زیرساخت است.»

| Block | Verdict | Reason |
|---|---|---|
| "Everything Your Business Needs. None of the Chaos." | **merge** → services header | Becomes the pillars sub-line: "Everything your business needs from one team. None of the chaos." |
| FA «ایده دارید، ابزار دارید، اما سیستم ندارید» | **keep** | Better than the EN line. Translate it back for EN: "You have ideas. You have tools. You don't have a system." |
| 3 pain cards | **merge** → `/services/ai-automation` | Real and specific, but AI-only. They fit the AI pillar page better than the home. |
| Closing line | **keep** | Short and true. Used as the bridge into "Why Bellona". |

---

## 6. Capabilities (six services)

- **EN:** "CAPABILITIES · Intelligent Systems We Build · Six core automation capabilities engineered to eliminate manual work and compound your operational leverage."
- **FA:** «خدمات ما · شش سیستم هوشمند برای رشد شما · از ایجنت گرفته تا یکپارچه‌سازی — همه‌چیز برای حذف کار دستی و آزاد کردن تیم شما.»

| EN | Copy (EN) | FA | Copy (FA) |
|---|---|---|---|
| AI Agents | Autonomous digital workers that handle repetitive tasks, outreach, and decision-making around the clock. | ایجنت هوش مصنوعی | دستیار دیجیتال که پیام‌ها، پیگیری‌ها و کارهای تکراری را بدون حضور شما انجام می‌دهد. |
| Workflow Automation | End-to-end process automation connecting your tools, teams, and data flows without manual handoffs. | اتوماسیون فرایند | کل مسیر کار — از دریافت داده تا اقدام نهایی — بدون دخالت دستی پیش می‌رود. |
| Lead Generation Systems | Automated prospecting, enrichment, and qualification pipelines that deliver sales-ready leads daily. | جذب و غربال مشتری | سیستمی که مشتریان تازه را پیدا می‌کند، ارزیابی می‌کند و آماده فروش تحویل می‌دهد. |
| AI Customer Support | Intelligent chat and voice systems that resolve inquiries instantly and escalate only when needed. | پشتیبانی هوشمند | پاسخ‌گویی سریع به مشتری در چت و تماس؛ فقط موارد خاص به انسان ارجاع می‌شود. |
| CRM Automation | Sales pipelines, follow-ups, and deal tracking automated so your team focuses on closing. | مدیریت فروش خودکار | پیگیری، یادآوری و به‌روزرسانی وضعیت معاملات بدون فراموشی و بدون تأخیر. |
| Custom Integrations | Bespoke API bridges and middleware that unify your entire business stack into one intelligent system. | اتصال ابزارها | همه نرم‌افزارهای کسب‌وکار شما در یک جریان واحد و قابل اعتماد به هم وصل می‌شوند. |

**Verdict: merge.** The six capabilities become the "What's included" list on `/services/ai-automation`.
- **Lead Generation Systems** also appears under Marketing & growth.
- **Custom Integrations** also appears under Full-stack development.
- **Sharpen** the header copy. "Compound your operational leverage" is jargon.

---

## 7. "Imagine This": Monday before / after

- **EN headline:** "It's Monday Morning. / Everything's Already Done."
- **FA headline:** «صبح شنبه، لپ‌تاپ را باز می‌کنید / و کارها از قبل انجام شده‌اند.» (Localised to Saturday, the Iranian work-week start. Keep this.)

| Column | EN | FA |
|---|---|---|
| Before: intro | You open your laptop. Everything hits at once: | لیست کارها بلند است و زمان کم: |
| Before: list | Reply to leads manually?? · Fix broken automation · Update CRM by hand · URGENT: Follow up 40 contacts · Build workflow (again) · Process invoices · Train new hire on ops | پاسخ به مشتریان جدید · پیگیری معوقات فروش · به‌روزرسانی CRM · رفع خطای اتوماسیون · تهیه گزارش هفتگی · آموزش نیروی تازه · رسیدگی به فاکتورها |
| Before: outro | Ops pushed to "tomorrow." Again. | باز هم می‌گویید: «فردا درستش می‌کنم.» |
| After: intro | You open your laptop. Your systems already ran overnight: | شبانه سیستم کار کرده و صبح این‌ها آماده است: |
| After: list | AI agents qualifying leads overnight · Workflows running — **47 active** · CRM synced automatically · Follow-ups sent on schedule · New automation deployed · Reports generated & delivered · Team focused on strategy | مشتریان جدید غربال و دسته‌بندی شدند · پیگیری‌ها طبق برنامه ارسال شد · CRM خودکار به‌روز شد · گزارش‌ها آماده تحویل است · فرایند جدید بدون خطا اجرا شد · تیم روی تصمیم‌گیری تمرکز دارد · هیچ کار عقب‌افتاده‌ای نمانده |
| After: outro | That's not a dream. **That's what Bellona clients wake up to.** | این آینده نیست — **وضعیت روزانه مشتریان ماست.** |
| CTA | See How It Works | مسیر همکاری را ببینید |

| Block | Verdict | Reason |
|---|---|---|
| Monday story | **keep**, on `/services/ai-automation` | The best storytelling on the site. HomeBWO already echoes it in step 03 ("It's Monday morning, and everything's already done."). |
| "47 active" | **drop** | Same mock number as the dashboard. |
| "That's what Bellona clients wake up to." | **sharpen** | This is a client-outcome claim. Soften it to "That's what a Bellona system is built to do." unless you confirm it. |
| The marquee list | **sharpen** | The list is duplicated in the DOM for the scrolling effect, so screen readers read it twice. Render it once. |

---

## 8. Process: "How Bellona Works"

- **EN:** "A proven five-step framework from audit to optimization — deployed in weeks, not months."
- **FA:** «از ایده تا اجرا · پنج مرحله مشخص — معمولاً در چند هفته به نتیجه می‌رسید، نه چند ماه.»

| # | EN | Copy (EN) | FA | Copy (FA) |
|---|---|---|---|---|
| 1 | Audit | We map your operations, identify bottlenecks, and pinpoint the highest-ROI automation opportunities. | بررسی | فرایندهای فعلی شما را می‌خوانیم، گلوگاه‌ها را پیدا می‌کنیم و اولویت‌ها را مشخص می‌کنیم. |
| 2 | Design | Our architects blueprint custom AI workflows, agent behaviors, and integration paths for your stack. | طراحی | معماری سیستم، نقش ایجنت‌ها و اتصال ابزارها را دقیق طراحی می‌کنیم. |
| 3 | Build | We engineer your automation systems with rigorous testing and zero disruption to daily operations. | پیاده‌سازی | سیستم را می‌سازیم، تست می‌کنیم و مطمئن می‌شویم کار روزانه تیم مختل نشود. |
| 4 | Deploy | Systems go live integrated with your existing tools — fully operational from day one. | راه‌اندازی | سیستم را در محیط واقعی فعال می‌کنیم و از همان روز اول قابل استفاده است. |
| 5 | Optimize | Continuous monitoring, performance tuning, and scaling as your business evolves. | بهبود مستمر | عملکرد را پایش می‌کنیم، اصلاح می‌کنیم و با رشد کسب‌وکار شما گسترش می‌دهیم. |

**Verdict: merge.**
- On the home page, the 6-step partner journey (Strategy → Design → Build → Automate → Grow → Support) replaces this. The steps map almost one-to-one: Audit → Strategy, Optimize → Support.
- The 5-step version stays as the delivery process on `/services/ai-automation`.
- **Sharpen** "zero disruption" and "fully operational from day one". Both are absolutes; soften them unless confirmed.

---

## 9. "From Lead to Revenue" (system architecture)

- **EN:** "SYSTEM ARCHITECTURE · From Lead to Revenue · Every Bellona deployment follows a unified intelligence pipeline — connecting acquisition, automation, and revenue in one seamless flow."
- **FA:** «نگاه کلی سیستم · از جذب مشتری تا درآمد · یک مسیر واحد: جذب، پردازش هوشمند، اجرای خودکار و تبدیل به نتیجه مالی.»
- **Nodes:** Lead Source → AI Agent → CRM → Automation Engine → Analytics → Revenue
- **Nodes (FA):** ورودی مشتری → ایجنت هوشمند → مدیریت ارتباط → موتور اجرا → گزارش و تحلیل → درآمد

**Verdict: keep, then sharpen.**
- This flow is the strongest bridge into the full-service story. Each node maps to a pillar:
  - Website + Marketing bring the lead.
  - AI qualifies it.
  - Full-stack + Biz-dev own CRM and integrations.
  - Marketing reads the analytics.
- New copy tags each node with its pillar (see COPY.md).

---

## 10. Industries: "Built for Your Sector"

- **EN:** "Tailored AI systems for the workflows, compliance, and growth patterns of your industry."
- **FA:** «راه‌حل اختصاصی برای صنعت شما · برای هر حوزه، سیستمی می‌سازیم که با قوانین، فرایند و ریتم رشد همان صنعت هماهنگ باشد.»

| EN | Copy (EN) | FA | Copy (FA) |
|---|---|---|---|
| Real Estate | Lead nurturing, property matching, and client follow-ups on autopilot. | املاک | پیگیری خریدار، تطبیق فایل و یادآوری قرار ملاقات به‌صورت خودکار. |
| Finance | Compliance workflows, reporting, and client onboarding at scale. | مالی و سرمایه | گزارش‌گیری، بررسی مدارک و پذیرش مشتری با سرعت و دقت بالاتر. |
| Healthcare | Appointment scheduling, patient intake, and admin automation. | سلامت | نوبت‌دهی، پذیرش بیمار و پیگیری‌های اداری بدون بار اضافه برای پرسنل. |
| E-Commerce | Inventory sync, order processing, and support automation. | فروش آنلاین | مدیریت سفارش، موجودی و پشتیبانی مشتری در یک جریان یکپارچه. |
| Consulting | Proposal generation, client reporting, and project workflows. | مشاوره | تهیه پیشنهاد، گزارش پروژه و پیگیری قراردادها با اتوماسیون هوشمند. |
| Education | Enrollment, student support, and content delivery systems. | آموزش | ثبت‌نام، پاسخ به پرسش‌ها و مدیریت مسیر یادگیری دانشجو. |

- **CTA on each card:** "View portfolio" / «مشاهده نمونه‌کارها». It leads to an empty page.

| Block | Verdict | Reason |
|---|---|---|
| 6 industries + one-liners | **keep** | Real, specific copy. Add one website/growth line per industry later (see COPY.md). |
| 12 industry pages | **drop** (for now) | All 12 are empty "coming soon" pages. That's thin content in the sitemap and a dead-end CTA. Use one `/industries` page with anchors, and 301-redirect the old URLs. |
| "View portfolio" CTA | **drop** | Replace it with "Talk about your [industry] project" until case studies exist. |

---

## 11. Comparison: "Traditional Team vs Bellona AI"

- **EN:** "WHY BELLONA · See why forward-thinking companies choose intelligent systems over endless hiring."
- **FA:** «مزیت بلونا · استخدام بیشتر یا سیستم بهتر؟ · وقتی زیرساخت هوشمند دارید، رشد به معنی استخدام انبوه نیست.»

| Row | Traditional (EN) | Bellona (EN) | تیم سنتی | سیستم بلونا | Verdict |
|---|---|---|---|---|---|
| Availability / زمان فعالیت | Business hours only | 24/7/365 autonomous | محدود به ساعات اداری | ۲۴ ساعته، هر روز هفته | **keep** |
| Scalability / مقیاس | Hire more people | **Infinite, instant scale** | نیاز به نیروی جدید | گسترش سریع بدون استخدام | **sharpen**: "infinite" is unsupportable. Use the FA wording. |
| Cost / هزینه | Salaries + overhead | One-time build, ongoing ROI | حقوق ماهانه + سربار | هزینه ساخت + بازگشت بلندمدت | **keep** |
| Speed / سرعت اجرا | Weeks to onboard | Deployed in days | هفته‌ها تا آمادگی نیرو | راه‌اندازی در چند روز | **sharpen**: the FAQ says 2–4 weeks for most systems, which contradicts "days". |
| Consistency / ثبات | Human error prone | **100% process accuracy** | وابسته به تمرکز انسان | اجرای یکنواخت فرایند | **sharpen**: "100% accuracy" is unsupportable. Use the FA wording ("same process, every time"). |
| Intelligence / تصمیم‌گیری | Manual decisions | AI-driven automation | دستی و زمان‌بر | هوشمند و خودکار | **keep** |

**Note:** the FA version is consistently more careful than the EN one. Use the FA claims as the canonical source for both languages.

---

## 12. Founders: "Meet the Founders"

- **EN:** "LEADERSHIP · The engineers behind Bellona — building the AI systems that run your business while you sleep."
- **FA:** «تیم بلونا · با بنیان‌گذاران آشنا شوید · تیمی که سیستم‌های هوش مصنوعی می‌سازد تا کسب‌وکار شما حتی در ساعات استراحت هم جلو برود.»

| Name | Role | Bio (EN) | Bio (FA) |
|---|---|---|---|
| Iman Niknam / ایمان نیک‌نام | Co-Founder · Automation Engineer / مهندس اتوماسیون | Architects end-to-end automation systems — from workflow design to production deployment across complex business stacks. | طراحی و اجرای سیستم‌های اتوماسیون سازمانی؛ از نقشه فرایند تا استقرار در محیط واقعی. |
| Sina Razi / سینا راضی | Co-Founder · AI Specialist / متخصص هوش مصنوعی | Builds intelligent AI agents and machine learning pipelines that power Bellona's autonomous business systems. | توسعه ایجنت‌های هوشمند و مدل‌های یادگیری ماشین برای سیستم‌های خودکار کسب‌وکار. |

**Verdict: keep.**
- Real names and roles. Avatars are initials only (IN, SR), so we need photos.
- BRIEF.md lists founders as "not yet supplied", but they're on the live site. **Please confirm** we can use these names and bios on the new site.
- On FA the "Co-Founder" label is left in English. Translate it to «هم‌بنیان‌گذار».

---

## 13. FAQ: "Common Questions"

- **EN sub:** "Everything you need to know before building your AI workforce."
- **FA sub:** «پیش از شروع، بدانید · پاسخ سوال‌هایی که معمولاً قبل از ساخت تیم هوش مصنوعی مطرح می‌شود.»

| # | Q (EN) | A (EN) | Verdict |
|---|---|---|---|
| 1 | What types of businesses does Bellona work with? | Growth-stage companies across finance, e-commerce, real estate, healthcare, consulting, and education. If your business has repeatable processes, we can automate them. | **sharpen**: widen beyond automation |
| 2 | How long does deployment take? | Most systems go live within 2–4 weeks. Simple automations deploy in days; complex multi-agent systems take 4–6 weeks. | **keep** (AI page); add website/app timelines [CONFIRM] |
| 3 | Do I need technical knowledge? | No. We build intuitive dashboards and provide full training. Your team uses simple interfaces while AI handles the complexity. | **keep** |
| 4 | What platforms do you integrate with? | **200+ platforms** including Salesforce, HubSpot, Slack, n8n, Make, Zapier, and any tool with an API or webhook. | **keep**, but [CONFIRM "200+"] |
| 5 | How is Bellona different from hiring? | Traditional hiring adds headcount and overhead. Bellona builds self-running AI systems that **scale infinitely** without additional payroll. | **sharpen**: drop "infinitely" |
| 6 | What ROI can I expect? | Clients typically see **40% cost reduction and 65% improvement in key metrics within 90 days**. We project ROI during the audit phase. | **sharpen**: ⚠ the 40% / 65% figures are EN-only (FA says only "lower costs and better KPIs within 90 days"). They aren't in the approved facts list. Use the FA wording unless you can source them. |
| 7 | Do you offer ongoing support? | Yes. Every engagement includes monitoring, optimization, and scaling support. Your systems evolve with your business. | **keep**: it's the source for the "Support" journey step |
| 8 | How do I get started? | Book a free audit. We assess your operations and show exactly where AI delivers the highest impact. | **sharpen**: becomes "free strategy audit" across all pillars |

**FA answers (verbatim):**
1. برای شرکت‌های در حال رشد در حوزه مالی، فروش آنلاین، املاک، سلامت، مشاوره و آموزش. اگر فرایند تکرارشونده دارید، می‌توانیم آن را هوشمند کنیم.
2. پروژه‌های معمولی بین ۲ تا ۴ هفته. کارهای ساده‌تر چند روزه و پروژه‌های بزرگ‌تر ۴ تا ۶ هفته زمان می‌برد.
3. خیر. ما رابط ساده طراحی می‌کنیم و آموزش می‌دهیم. تیم شما فقط استفاده می‌کند؛ پیچیدگی را سیستم مدیریت می‌کند.
4. بیش از ۲۰۰ پلتفرم از جمله Salesforce، HubSpot، Slack، n8n، Make، Zapier و هر سرویسی که API داشته باشد.
5. استخدام هزینه ثابت ماهانه ایجاد می‌کند. سیستم هوشمند یک‌بار ساخته می‌شود و با رشد شما گسترش می‌یابد بدون افزایش خطی هزینه نیرو.
6. در بسیاری از پروژه‌ها ظرف ۹۰ روز کاهش هزینه عملیاتی و بهبود شاخص‌های کلیدی دیده می‌شود. در جلسه بررسی اولیه، پیش‌بینی دقیق ارائه می‌دهیم.
7. بله. پایش، اصلاح و توسعه سیستم بخشی از همکاری ماست تا با تغییر نیازهای شما به‌روز بماند.
8. یک جلسه بررسی رایگان رزرو کنید. وضعیت فعلی را می‌سنجیم و دقیق می‌گوییم از کجا باید شروع کرد.

**Also note:** answers 2–8 are not in the HTML until clicked, so search engines can't read them. The site has no FAQPage schema either. The new build renders answers in `<details>` and adds `FAQPage` JSON-LD.

---

## 14. Closing CTA

- **EN:** "Stop Hiring More People. / Build Better Systems. · Join companies using Bellona to build AI workforces that operate around the clock." [Your email] [Get Started]
- **FA:** «به‌جای استخدام بیشتر، / سیستم قوی‌تر بسازید. · به کسب‌وکارهایی بپیوندید که با بلونا تیم هوش مصنوعی ساختند و حالا ۲۴ ساعته جلو می‌روند.» [ایمیل شما] [شروع همکاری]

| Block | Verdict | Reason |
|---|---|---|
| Headline | **keep** → "Why Bellona" heading (HomeBWO already uses it there) | Strong, real, approved in the mockup |
| "Join companies using Bellona…" | **sharpen** | Implies a client base we can't show yet. Drop it until logos or testimonials exist. |
| Email-only form | **drop** | Replaced by the full contact form (pillar chips, budget, message) plus booking. |

---

## 15. Footer

- **EN:** Bellona · "AI Systems That Work While You Sleep" · Services · Process · Team · FAQ · Contact · © 2026 Bellona. All rights reserved. · bellona.ai.team@gmail.com · Privacy · Terms
- **FA:** «معماری هوشمند برای رشد بی‌وقفه» · خدمات · مسیر همکاری · تیم · پرسش‌های متداول · ارتباط با ما · © 2026 Bellona. تمامی حقوق محفوظ است.

**Verdict: sharpen.**
- **Keep** the email (the only real contact detail on the site).
- Privacy, Terms and the social icons all point to `#`. They need real pages and URLs, or must be removed (see TODO-OWNER).

---

## Data to carry forward (sourced)

| Item | Value | Source |
|---|---|---|
| Stats | 100+ automations built · 24/7 AI operations · 80% time saved · 3X operational efficiency | Hero + counters (and BRIEF) |
| Offer | Free strategy audit / جلسه مشاوره رایگان | Hero proof, FAQ 8 |
| Timelines | Most systems 2–4 weeks · simple automations in days · complex multi-agent 4–6 weeks | FAQ 2 |
| Integrations | Salesforce, HubSpot, Slack, n8n, Make, Zapier, any API/webhook ("200+" to confirm) | FAQ 4 |
| Support | Monitoring, optimization and scaling support in every engagement · full training | FAQ 3, 7 |
| Services (AI) | AI agents · Workflow automation · Lead generation systems · AI customer support · CRM automation · Custom integrations | §6 |
| Industries | Real estate · Finance · Healthcare · E-commerce · Consulting · Education | §10 |
| Process | Audit → Design → Build → Deploy → Optimize | §8 |
| Lead → Revenue | Lead source → AI agent → CRM → Automation engine → Analytics → Revenue | §9 |
| Comparison | 6 rows (§11), FA wording as canonical | §11 |
| Founders | Iman Niknam (Co-founder, Automation Engineer) · Sina Razi (Co-founder, AI Specialist) | §12 |
| FAQ | 8 Q&As EN + FA | §13 |
| Contact | bellona.ai.team@gmail.com | Footer, JSON-LD |
| Not found on site | phone, address, social URLs, booking link, client names, testimonials, prices, case studies | n/a |

---

## ⚠ Mock or illustrative data that must not appear as results

| Where | Value | Action |
|---|---|---|
| Hero dashboard | 12 active agents · 47 workflows · **2,847 leads this week** · **$847K attributed revenue** · "All on track" | Remove entirely |
| Monday "after" list | "Workflows running — 47 active" | Remove the number |
| Monday outro | "That's what Bellona clients wake up to." | Soften (claim) |
| FAQ 6 (EN only) | "40% cost reduction and 65% improvement in key metrics within 90 days" | Ask owner; FA has no numbers |
| FAQ 4 | "200+ platforms" | Ask owner |
| Comparison | "Infinite, instant scale" · "100% process accuracy" · "Deployed in days" | Soften |
| Closing CTA | "Join companies using Bellona…" | Drop until there's proof |
| Industry cards | "View portfolio" → empty pages | Drop |

---

## Weak spots on the current site

1. **The hero is blank until JS loads.**
   - The server HTML puts inline `opacity:0` on the `<h1>` and about 90 other elements (Framer Motion initial states).
   - In the in-app browser the hero was an empty dark panel for around 3 seconds on first paint.
   - This hurts LCP, no-JS users and crawlers.
2. **Counters render as zeros** in the HTML (0+, 0/7, 0%, 0X).
3. **Emoji icons** (🤖 ⚡ 📊 💰 🔗) in the dashboard. The brand rule is line icons only.
4. **The logo is too small and raster.**
   - `bellona-icon.png` is shown at 40×40 in the header and 56×56 elsewhere. It's a PNG, not the SVG mark.
   - There's no wordmark lockup, and the cube logo has no presence on the page.
5. **Off-brand visual system.**
   - Navy background `#060a12`, blue/purple gradient text, glows.
   - Vazirmatn for Persian; the brand uses Estedad.
   - None of the black · white · orange palette.
6. **The copy only talks about AI.** Nothing on the site mentions websites, full-stack builds, marketing or business development, so the new positioning starts from zero.
7. **Thin pages.**
   - 12 empty industry pages are listed in the sitemap.
   - Their only CTA, "View portfolio", leads to "coming soon".
8. **No proof.** No clients, case studies or testimonials.
   - The mock dashboard was standing in for proof. That's risky.
9. **Weak conversion path.**
   - The only CTA is an email field.
   - No booking link, no "what do you need" form, no budget question.
10. **Hidden FAQ answers.** Not in the DOM until clicked, and no FAQPage schema.
11. **Broken links.**
    - Privacy, Terms and the social icons all point to `#`.
    - `/about` and `/services` return 404 even though the nav says "About".
12. **Language switch.**
    - It's a `<button>` that sets a `NEXT_LOCALE` cookie.
    - Once the cookie is `fa`, visiting `/` redirects to `/fa`, so the URL for one language can serve the other. The new build uses plain links and no auto-redirect.
13. **EN/FA drift.** FA copy is consistently more careful (no 40% / 65%, no "100% accuracy", no "infinite"). The two versions make different claims.
14. **Accessibility.** The marquee list is duplicated in the DOM. The founder "avatars" are initials inside divs.
