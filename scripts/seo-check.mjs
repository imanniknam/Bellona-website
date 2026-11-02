#!/usr/bin/env node
/**
 * SEO acceptance tests (SEO-GUIDELINE v2, section 12). Every group must print PASS.
 *
 * Runs against a production build: starts `next start` on a free port (run `npm run build` first),
 * or checks an already-running server / the live site when SEO_CHECK_BASE is set
 * (e.g. SEO_CHECK_BASE=http://localhost:3000 or SEO_CHECK_BASE=https://bellonaagency.com).
 *
 * Groups: sitemap, lastmod, canonical, hreflang, title, description, h1, jsonld, og, redirect, 404, icon,
 * links, leak, content (a case study needs >= 500 words in <main>, without the closing contact block).
 * Also (not in the table, kept from v1): placeholders "[...]", language/direction, robots.txt, service-page links.
 * Warnings never fail the run: empty alt on content images, links to redirects, thin guides.
 *
 * Usage: npm run seo:check
 */
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ORIGIN = (process.env.SEO_CANONICAL_ORIGIN || "https://bellonaagency.com").replace(/\/$/, "");
const PLACEHOLDER = /\[[^\]\n]{2,}\]/g;
const AI_SEARCH_CRAWLERS = ["OAI-SearchBot", "ChatGPT-User", "Claude-SearchBot", "Claude-User", "PerplexityBot", "Perplexity-User"];
const BRAND = { fa: "آژانس بلونا", en: "Bellona Agency" };
const MIN_CASE_STUDY_WORDS = 500;

// Redirects that must stay in place: each is ONE hop to a 200 page (section 1-a).
const REDIRECTS = [
  ["/fa", "/"],
  ["/fa/", "/"],
  ["/industries/realEstate", "/industries/real-estate"],
  ["/industries/realestate", "/industries/real-estate"],
  ["/fa/industries/realEstate", "/industries/real-estate"],
  ["/en/industries/realEstate", "/en/industries/real-estate"],
  ["/industries/finance", "/industries"],
  ["/industries/healthcare", "/industries"],
  ["/industries/consulting", "/industries"],
  ["/fa/industries/healthcare", "/industries"],
  ["/fa/industries/consulting", "/industries"],
  ["/en/industries/finance", "/en/industries"],
];
const ICONS = ["/favicon.ico", "/apple-icon.png", "/manifest.webmanifest"];
// Reachable pages kept out of the sitemap (noindex). Always checked for placeholders, linked or not.
const EXTRA_PAGES = ["/privacy", "/terms", "/en/privacy", "/en/terms"];

const GROUPS = ["sitemap", "lastmod", "canonical", "hreflang", "title", "description", "h1", "jsonld", "og", "redirect", "404", "icon", "links", "leak", "content", "other"];
const errors = [];
const warnings = [];
const err = (where, msg, cat = "other") => errors.push({ where, msg, cat });
const warn = (where, msg) => warnings.push(`${where}: ${msg}`);

// ---------------------------------------------------------------------------------------------- server
async function startServer() {
  if (process.env.SEO_CHECK_BASE) return { base: process.env.SEO_CHECK_BASE.replace(/\/$/, ""), stop: () => {} };
  if (!existsSync(path.join(root, ".next", "BUILD_ID"))) {
    console.error("No production build found. Run `npm run build` first (or set SEO_CHECK_BASE).");
    process.exit(2);
  }
  const port = 3900 + Math.floor(Math.random() * 90);
  const child = spawn(process.execPath, [path.join(root, "node_modules/next/dist/bin/next"), "start", "-p", String(port)], {
    cwd: root,
    stdio: "ignore",
    env: { ...process.env, NODE_ENV: "production" },
  });
  const base = `http://localhost:${port}`;
  for (let i = 0; i < 120; i++) {
    try {
      if ((await fetch(base + "/robots.txt")).ok) return { base, stop: () => child.kill() };
    } catch {}
    await new Promise((r) => setTimeout(r, 500));
  }
  child.kill();
  console.error("Server did not start within 60 s.");
  process.exit(2);
}

// ---------------------------------------------------------------------------------------------- html helpers
const decode = (s) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;|&#160;/g, " ");
const visibleText = (html) =>
  decode(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<(code|pre)[\s\S]*?<\/\1>/gi, " ")
      .replace(/<[^>]+>/g, " "),
  ).replace(/\s+/g, " ");
const attr = (tag, name) => {
  const m = tag?.match(new RegExp(`\\s${name}="([^"]*)"`, "i"));
  return m ? decode(m[1]) : undefined;
};
const metaContent = (head, key) => attr(head.match(new RegExp(`<meta[^>]+(?:name|property)="${key}"[^>]*>`, "i"))?.[0], "content");
const jsonLdBlocks = (html) => [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]);
const stringsIn = (v, out = []) => {
  if (typeof v === "string") out.push(v);
  else if (v && typeof v === "object") Object.values(v).forEach((x) => stringsIn(x, out));
  return out;
};
const internalLinks = (html) =>
  [...html.matchAll(/<a\s[^>]*href="(\/[^"]*)"/g)].map((m) => decode(m[1]).split("#")[0]).filter((h) => h && !h.startsWith("/_next") && !h.startsWith("/api/"));
const pairOf = (p) => (p === "/en" ? "/" : p.startsWith("/en/") ? p.slice(3) : p === "/" ? "/en" : `/en${p}`);
const countWords = (text) => text.split(" ").filter((w) => /[\p{L}\p{N}]/u.test(w)).length;
const asArray = (v) => (Array.isArray(v) ? v : v === undefined ? [] : [v]);

/** Every JSON-LD node on the page (flattening @graph), or null for a block that doesn't parse. */
function jsonLdNodes(html) {
  const nodes = [];
  for (const block of jsonLdBlocks(html)) {
    let data;
    try {
      data = JSON.parse(block);
    } catch {
      return null;
    }
    if (Array.isArray(data["@graph"])) nodes.push(...data["@graph"]);
    else nodes.push(data);
  }
  return nodes;
}

function placeholderChecks(where, html) {
  const head = html.slice(0, html.indexOf("</head>"));
  const body = html.slice(html.indexOf("<body"));
  const text = visibleText(body);
  for (const m of text.match(PLACEHOLDER) || []) err(where, `placeholder in visible text: ${m}`, "leak");
  for (const m of text.match(/\b(TODO|undefined|NaN)\b|\[object/g) || []) err(where, `"${m}" in visible text`, "leak");
  const meta = [
    head.match(/<title>([^<]*)<\/title>/)?.[1],
    metaContent(head, "description"),
    ...[...head.matchAll(/<meta[^>]+(?:name|property)="(?:og|twitter):[^"]+"[^>]*>/gi)].map((m) => attr(m[0], "content")),
  ]
    .filter(Boolean)
    .map(decode);
  for (const t of meta) for (const m of t.match(PLACEHOLDER) || []) err(where, `placeholder in meta: ${m}`, "leak");
  for (const block of jsonLdBlocks(html)) {
    let data;
    try {
      data = JSON.parse(block);
    } catch {
      err(where, "JSON-LD does not parse", "jsonld");
      continue;
    }
    for (const s of stringsIn(data)) {
      for (const m of s.match(PLACEHOLDER) || []) err(where, `placeholder in JSON-LD: ${m}`, "leak");
      if (/\bTODO\b/.test(s)) err(where, "TODO in JSON-LD", "leak");
    }
  }
}

// ---------------------------------------------------------------------------------------------- checks
async function checkPage(base, p, seen) {
  const res = await fetch(base + p, { redirect: "manual" });
  if (res.status !== 200) return err(p, `HTTP ${res.status}`, "sitemap");
  const html = await res.text();
  const head = html.slice(0, html.indexOf("</head>"));
  const body = html.slice(html.indexOf("<body"));
  const fa = !(p === "/en" || p.startsWith("/en/"));
  const bare = p.replace(/^\/en(?=\/|$)/, "") || "/";

  const htmlTag = html.match(/<html[^>]*>/)?.[0];
  if (attr(htmlTag, "lang") !== (fa ? "fa" : "en")) err(p, `lang="${attr(htmlTag, "lang")}"`);
  if (fa && attr(htmlTag, "dir") !== "rtl") err(p, `dir="${attr(htmlTag, "dir")}" (expected rtl)`);

  const h1 = (body.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) err(p, `${h1} <h1> elements`, "h1");

  const title = decode(head.match(/<title>([^<]*)<\/title>/)?.[1] || "").trim();
  const desc = (metaContent(head, "description") || "").trim();
  if (!title) err(p, "empty <title>", "title");
  else {
    if (title.length > 65) err(p, `title is ${title.length} characters (max 65): ${title}`, "title");
    const suffix = `· ${BRAND[fa ? "fa" : "en"]}`;
    if (bare !== "/" && !title.endsWith(suffix)) err(p, `title lacks the suffix "${suffix}": ${title}`, "title");
  }
  if (!desc) err(p, "empty meta description", "description");
  else if (desc.length < 100 || desc.length > 160) err(p, `meta description is ${desc.length} characters (100-160)`, "description");
  (seen.titles[title] ||= []).push(p);
  (seen.descs[desc] ||= []).push(p);

  const robots = metaContent(head, "robots") || "";
  if (/noindex/i.test(robots)) err(p, `in sitemap but robots="${robots}"`, "sitemap");

  const canonical = attr(head.match(/<link[^>]+rel="canonical"[^>]*>/)?.[0], "href");
  const want = ORIGIN + p;
  if (canonical !== want) err(p, `canonical ${canonical} (expected ${want})`, "canonical");
  if (metaContent(head, "og:url") !== want) err(p, `og:url ${metaContent(head, "og:url")} (expected ${want})`, "canonical");

  const alts = Object.fromEntries([...head.matchAll(/<link[^>]+rel="alternate"[^>]*>/g)].map((m) => [attr(m[0], "hrefLang") ?? attr(m[0], "hreflang"), attr(m[0], "href")]));
  const enPath = fa ? pairOf(p) : p;
  const faPath = fa ? p : pairOf(p);
  if (alts.en !== ORIGIN + enPath) err(p, `hreflang en=${alts.en} (expected ${ORIGIN + enPath})`, "hreflang");
  if (alts.fa !== ORIGIN + faPath) err(p, `hreflang fa=${alts.fa} (expected ${ORIGIN + faPath})`, "hreflang");
  if (alts["x-default"] !== ORIGIN + faPath) err(p, `hreflang x-default=${alts["x-default"]} (expected ${ORIGIN + faPath})`, "hreflang");

  // Open Graph
  const siteName = metaContent(head, "og:site_name");
  if (siteName !== BRAND[fa ? "fa" : "en"]) err(p, `og:site_name "${siteName}"`, "og");
  if (!metaContent(head, "og:image")) err(p, "no og:image", "og");
  if (/^\/guides\/[^/]+$/.test(bare)) {
    const ogImg = metaContent(head, "og:image") || "";
    if (!/title=/.test(ogImg) || /title=Bellona%20Agency/.test(ogImg)) err(p, "guide og:image is the generic brand image", "og");
  }

  placeholderChecks(p, html);

  // JSON-LD
  const nodes = jsonLdNodes(html);
  if (nodes === null) err(p, "JSON-LD does not parse", "jsonld");
  else {
    const types = nodes.flatMap((n) => asArray(n["@type"]));
    const faqNodes = nodes.filter((n) => asArray(n["@type"]).includes("FAQPage"));
    if (faqNodes.length > 1) err(p, `${faqNodes.length} FAQPage blocks (max 1)`, "jsonld");
    const text = visibleText(body);
    for (const f of faqNodes)
      for (const q of asArray(f.mainEntity)) {
        const name = String(q.name || "").trim();
        (seen.faq[name] ||= []).push(p);
        if (name && !text.includes(name)) err(p, `FAQ question not visible on the page: ${name.slice(0, 60)}`, "jsonld");
      }
    const org = nodes.find((n) => n["@id"] === `${ORIGIN}/#organization`);
    if (!org) err(p, "no Organization node (@id #organization)", "jsonld");
    else {
      if (org.name !== BRAND[fa ? "fa" : "en"]) err(p, `Organization.name "${org.name}"`, "jsonld");
      if (!/\.png$/i.test(String(org.logo?.url ?? org.logo ?? ""))) err(p, `Organization.logo is not a .png: ${JSON.stringify(org.logo)}`, "jsonld");
    }
    const site = nodes.find((n) => asArray(n["@type"]).includes("WebSite"));
    if (!site) err(p, "no WebSite node", "jsonld");
    else if (site.name !== BRAND[fa ? "fa" : "en"]) err(p, `WebSite.name "${site.name}"`, "jsonld");
    const isHome = bare === "/";
    const isService = /^\/services\/[^/]+(\/[^/]+)?$/.test(bare);
    if (isService !== types.includes("Service")) err(p, isService ? "service page lacks its Service node" : "Service node outside a service page", "jsonld");
    if (!isHome && !types.includes("BreadcrumbList")) err(p, "no BreadcrumbList", "jsonld");
    if (/^\/work\/[^/]+$/.test(bare) && !types.includes("CreativeWork")) err(p, "case study lacks CreativeWork", "jsonld");
    if (/^\/guides\/[^/]+$/.test(bare) && !types.includes("Article")) err(p, "guide lacks Article", "jsonld");
    if (bare === "/contact" && !types.includes("ContactPage")) err(p, "contact page lacks ContactPage", "jsonld");
  }

  const links = internalLinks(body);
  for (const sp of seen.servicePaths) {
    const w = fa ? sp : `/en${sp}`;
    if (!links.includes(w)) err(p, `no link to ${w}`);
  }
  for (const l of links) if (l.split("?")[0] !== p) (seen.inlinks[l.split("?")[0]] ||= new Set()).add(p);
  for (const m of body.matchAll(/(?:href|src)="([^"]*\.vercel\.app[^"]*)"/g)) err(p, `link to a test domain: ${decode(m[1])}`, "links");

  for (const m of body.matchAll(/<p[^>]*\sdata-answer=""[^>]*>([\s\S]*?)<\/p>/g)) {
    const words = countWords(visibleText(m[1]));
    if (words < 25 || words > 90) warn(p, `direct answer is ${words} words`);
  }

  for (const img of body.match(/<img\s[^>]*>/g) || []) {
    const alt = attr(img, "alt");
    if (alt === undefined) err(p, `<img> without alt: ${attr(img, "src")?.slice(0, 60)}`, "other");
    else if (alt.trim() === "" && !/aria-hidden="true"|role="presentation"/.test(img)) warn(p, `empty alt on content image ${attr(img, "src")?.slice(0, 70)}`);
  }

  if (/^\/work\/[^/]+$/.test(bare)) {
    const main = html.slice(html.indexOf("<main"), html.indexOf("</main>"));
    const cut = main.indexOf('<section id="contact"');
    const words = countWords(visibleText(cut > 0 ? main.slice(0, cut) : main));
    seen.words[p] = words;
    if (words < MIN_CASE_STUDY_WORDS) err(p, `${words} words in main (min ${MIN_CASE_STUDY_WORDS})`, "content");
  }
  return links;
}

async function main() {
  const { base, stop } = await startServer();
  try {
    const xml = await (await fetch(base + "/sitemap.xml")).text();
    const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    const pages = locs.map((u) => new URL(u).pathname);
    if (!pages.length) err("/sitemap.xml", "no URLs", "sitemap");
    for (const u of locs) if (u !== ORIGIN + new URL(u).pathname) err(u, "sitemap <loc> is not in canonical form", "sitemap");
    for (const p of pages) if (!pages.includes(pairOf(p))) err(p, `language twin ${pairOf(p)} missing from sitemap`, "sitemap");
    for (const block of xml.split("<url>").slice(1)) {
      const loc = block.match(/<loc>([^<]+)/)[1];
      for (const l of ["fa", "en", "x-default"]) if (!new RegExp(`hreflang="${l}"`).test(block)) err(loc, `sitemap entry lacks xhtml:link ${l}`, "sitemap");
    }

    const seen = { titles: {}, descs: {}, faq: {}, words: {}, inlinks: {}, servicePaths: pages.filter((p) => /^\/services\/[^/]+$/.test(p)) };
    const links = new Map();
    for (const p of pages) for (const l of (await checkPage(base, p, seen)) || []) if (!links.has(l)) links.set(l, p);
    for (const [t, ps] of Object.entries(seen.titles)) if (t && ps.length > 1) err(ps.join(", "), `duplicate <title> "${t}"`, "title");
    for (const [d, ps] of Object.entries(seen.descs)) if (d && ps.length > 1) err(ps.join(", "), `duplicate meta description "${d.slice(0, 60)}…"`, "description");
    for (const [q, ps] of Object.entries(seen.faq)) if (q && new Set(ps).size > 1) err([...new Set(ps)].join(", "), `FAQ question repeated on several pages: ${q.slice(0, 70)}`, "jsonld");

    // Every internal link target: no 404s; indexable pages must be in the sitemap; pages outside it get the leak checks.
    for (const [href, from] of links) {
      const res = await fetch(base + href, { redirect: "manual" });
      const bareHref = href.split("?")[0];
      if (res.status === 404) err(from, `links to 404: ${href}`, "links");
      else if (res.status >= 300 && res.status < 400) warn(from, `links to a redirect: ${href} → ${res.headers.get("location")}`);
      else if (res.status === 200 && !pages.includes(bareHref)) {
        const html = await res.text();
        placeholderChecks(href, html);
        const head = html.slice(0, html.indexOf("</head>"));
        if (!/noindex/i.test(metaContent(head, "robots") || "")) err(from, `links to an indexable page missing from the sitemap: ${href}`, "sitemap");
      }
    }
    // Orphans: every sitemap page needs a link from another page.
    for (const p of pages) if (p !== "/" && p !== "/en" && !seen.inlinks[p]?.size) err(p, "orphan page (no internal link points to it)", "links");

    for (const p of EXTRA_PAGES) {
      if (links.has(p)) continue; // already checked above
      const res = await fetch(base + p, { redirect: "manual" });
      if (res.status === 200) placeholderChecks(p, await res.text());
      else err(p, `HTTP ${res.status}`);
    }

    // Redirects: one hop, permanent, to a 200.
    for (const [from, to] of REDIRECTS) {
      const res = await fetch(base + from, { redirect: "manual" });
      if (res.status !== 301 && res.status !== 308) {
        err(from, `returns ${res.status} (expected a permanent redirect)`, "redirect");
        continue;
      }
      const loc = new URL(res.headers.get("location"), base);
      if (loc.pathname !== to) err(from, `redirects to ${loc.pathname} (expected ${to})`, "redirect");
      const next = await fetch(loc, { redirect: "manual" });
      if (next.status !== 200) err(from, `target ${loc.pathname} returns ${next.status} (not a single hop to 200)`, "redirect");
    }
    for (const p of pages) {
      const old = REDIRECTS.find(([f]) => f === p);
      if (old) err(p, "a redirected URL is in the sitemap", "sitemap");
    }

    // 404
    {
      const res = await fetch(base + "/this-page-does-not-exist-seo", { redirect: "manual" });
      const html = await res.text();
      const head = html.slice(0, html.indexOf("</head>"));
      if (res.status !== 404) err("/this-page-does-not-exist-seo", `returns ${res.status} (expected 404)`, "404");
      if (!/noindex/i.test(metaContent(head, "robots") || "")) err("/this-page-does-not-exist-seo", "404 page lacks noindex", "404");
    }
    // Icons
    for (const f of ICONS) {
      const res = await fetch(base + f, { redirect: "manual" });
      if (res.status !== 200) err(f, `returns ${res.status}`, "icon");
    }

    // lastmod: at least 80% of the URLs must differ from the deploy time, which is the one value many URLs share.
    {
      const mods = [...xml.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map((m) => m[1]);
      const count = {};
      for (const m of mods) count[m] = (count[m] || 0) + 1;
      const [top, n] = Object.entries(count).sort((a, b) => b[1] - a[1])[0] || ["", 0];
      const buildTime = n >= 30 ? top : null;
      const different = mods.filter((m) => m !== buildTime).length;
      if (mods.length < pages.length) err("/sitemap.xml", `${pages.length - mods.length} URLs have no lastmod`, "lastmod");
      if (mods.length && different / mods.length < 0.8) err("/sitemap.xml", `only ${different}/${mods.length} lastmod values differ from the shared value ${buildTime}`, "lastmod");
      for (const m of mods) if (new Date(m) > new Date(Date.now() + 60_000)) err("/sitemap.xml", `lastmod in the future: ${m}`, "lastmod");
      await new Promise((r) => setTimeout(r, 1500));
      const mods2 = [...(await (await fetch(base + "/sitemap.xml")).text()).matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map((m) => m[1]);
      if (mods.join() !== mods2.join()) err("/sitemap.xml", "lastmod changes between fetches (request time, not content time)", "lastmod");
      console.log(`lastmod: ${new Set(mods).size} distinct values over ${mods.length} URLs${buildTime ? `, most common (${n}×): ${buildTime}` : ""}`);
    }

    const robots = await (await fetch(base + "/robots.txt")).text();
    for (const ua of AI_SEARCH_CRAWLERS)
      if (!new RegExp(`^user-agent:\\s*${ua}\\s*$`, "im").test(robots)) err("/robots.txt", `no explicit group for ${ua}`);
    if (!/^user-agent:\s*\*\s*$/im.test(robots)) err("/robots.txt", "no 'User-agent: *' group");
    if (!/^allow:\s*\/\s*$/im.test(robots)) err("/robots.txt", "no 'Allow: /'");
    if (/^disallow:\s*\/\s*$/im.test(robots)) err("/robots.txt", "root 'Disallow: /'");
    if (/^host:/im.test(robots)) err("/robots.txt", "non-standard 'Host:' line");
    if (!new RegExp(`^sitemap:\\s*${ORIGIN.replace(/[.]/g, "\\.")}/sitemap\\.xml\\s*$`, "im").test(robots)) err("/robots.txt", "missing Sitemap line");

    console.log(`seo:check ${base}: ${pages.length} sitemap URLs, ${links.size} internal links, ${REDIRECTS.length} redirects`);
    const words = Object.entries(seen.words).sort((a, b) => a[1] - b[1]);
    if (words.length) console.log(`case-study words (main, no closing block): min ${words[0][1]} (${words[0][0]}), max ${words.at(-1)[1]} (${words.at(-1)[0]})`);
    if (warnings.length) {
      const byMsg = {};
      for (const w of warnings) (byMsg[w.replace(/^[^:]+: /, "").replace(/ \S+$/, "")] ||= []).push(w);
      console.log(`\nWarnings (${warnings.length}):`);
      for (const [m, ws] of Object.entries(byMsg)) console.log(`  ${ws.length} × ${m}  (e.g. ${ws[0].split(":")[0]})`);
    }
    console.log("\nGroup results:");
    for (const g of GROUPS) {
      const n = errors.filter((e) => e.cat === g).length;
      if (g === "other" && !n) continue;
      console.log(`  ${n ? "FAIL" : "PASS"}  ${g}${n ? ` (${n})` : ""}`);
    }
    if (errors.length) {
      console.log(`\nErrors (${errors.length}):`);
      const limit = Number(process.env.SEO_CHECK_MAX_ERRORS || 400);
      for (const e of errors.slice(0, limit)) console.log(`  [${e.cat}] ${e.where}: ${e.msg}`);
      if (errors.length > limit) console.log(`  … and ${errors.length - limit} more`);
      process.exitCode = 1;
    } else console.log("\nNo errors.");
  } finally {
    stop();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(2);
});
