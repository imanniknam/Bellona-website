#!/usr/bin/env node
/**
 * SEO regression check (docs/seo, backlog P0-01 / G-01 and §4 "Validation").
 *
 * Runs against a production build: starts `next start` on a free port (run `npm run build` first),
 * or checks an already-running server when SEO_CHECK_BASE is set (e.g. SEO_CHECK_BASE=http://localhost:3000).
 *
 * Errors (exit code 1):
 *  - every sitemap URL: HTTP 200, exactly one <h1>, non-empty unique <title> and meta description,
 *    self-canonical on the production origin, reciprocal hreflang en/fa/x-default, correct lang/dir,
 *    not noindex, JSON-LD parses
 *  - no "[placeholder]" token in visible text, <title>/meta/OG/Twitter or JSON-LD string values, on
 *    every sitemap URL and every other internal page they link to (e.g. footer-linked legal pages)
 *  - no internal link that returns 404
 *  - old production URLs redirect permanently (301/308) in a single hop to a 200
 *  - robots.txt: "User-agent: *" + "Allow: /", no root Disallow, no Host line, Sitemap line, explicit AI-search
 *    crawler group (G-02)
 *  - schema (P1-08): the full ProfessionalService entity only on the home pages; a Service node on each service
 *    page and nowhere else; a WebSite node on every page
 *  - every page links to every service page (footer, P1-07)
 *  - sitemap lastmod is stable between two fetches and never in the future (TA-13)
 * Warnings: content images with empty alt that aren't marked decorative; internal links to redirects;
 * titles outside ~30–65 characters; direct answers (data-answer, G-04) outside ~25–90 words.
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

// Old bellonaagency.com URLs (docs/seo/SEO_SITE_ARCHITECTURE.md, redirect map). Each must be a
// permanent single-hop redirect, or (where a real page now exists at the same path) a 200.
const OLD_URLS = ["realEstate", "finance", "healthcare", "ecommerce", "consulting", "education"].flatMap((s) => [
  `/industries/${s}`,
  `/en/industries/${s}`,
]);

// Reachable pages kept out of the sitemap (noindex). Always checked for placeholders, linked or not.
const EXTRA_PAGES = ["/privacy", "/terms", "/en/privacy", "/en/terms"];

const errors = [];
const warnings = [];
const err = (where, msg) => errors.push(`${where}: ${msg}`);
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

function placeholderChecks(where, html) {
  const head = html.slice(0, html.indexOf("</head>"));
  const body = html.slice(html.indexOf("<body"));
  for (const m of visibleText(body).match(PLACEHOLDER) || []) err(where, `placeholder in visible text: ${m}`);
  const meta = [
    head.match(/<title>([^<]*)<\/title>/)?.[1],
    metaContent(head, "description"),
    ...[...head.matchAll(/<meta[^>]+(?:name|property)="(?:og|twitter):[^"]+"[^>]*>/gi)].map((m) => attr(m[0], "content")),
  ]
    .filter(Boolean)
    .map(decode);
  for (const t of meta) for (const m of t.match(PLACEHOLDER) || []) err(where, `placeholder in meta: ${m}`);
  for (const block of jsonLdBlocks(html)) {
    let data;
    try {
      data = JSON.parse(block);
    } catch {
      err(where, "JSON-LD does not parse");
      continue;
    }
    for (const s of stringsIn(data)) for (const m of s.match(PLACEHOLDER) || []) err(where, `placeholder in JSON-LD: ${m}`);
  }
}

// ---------------------------------------------------------------------------------------------- checks
async function checkPage(base, p, seen) {
  const res = await fetch(base + p, { redirect: "manual" });
  if (res.status !== 200) return err(p, `HTTP ${res.status}`);
  const html = await res.text();
  const head = html.slice(0, html.indexOf("</head>"));
  const body = html.slice(html.indexOf("<body"));
  const fa = !(p === "/en" || p.startsWith("/en/"));

  const htmlTag = html.match(/<html[^>]*>/)?.[0];
  if (attr(htmlTag, "lang") !== (fa ? "fa" : "en")) err(p, `lang="${attr(htmlTag, "lang")}"`);
  if (fa && attr(htmlTag, "dir") !== "rtl") err(p, `dir="${attr(htmlTag, "dir")}" (expected rtl)`);

  const h1 = (body.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) err(p, `${h1} <h1> elements`);

  const title = decode(head.match(/<title>([^<]*)<\/title>/)?.[1] || "").trim();
  const desc = (metaContent(head, "description") || "").trim();
  if (!title) err(p, "empty <title>");
  else if (title.length < 30 || title.length > 65) warn(p, `title is ${title.length} characters`);
  if (!desc) err(p, "empty meta description");
  (seen.titles[title] ||= []).push(p);
  (seen.descs[desc] ||= []).push(p);

  const robots = metaContent(head, "robots") || "";
  if (/noindex/i.test(robots)) err(p, `in sitemap but robots="${robots}"`);

  const canonical = attr(head.match(/<link[^>]+rel="canonical"[^>]*>/)?.[0], "href");
  const want = ORIGIN + (p === "/" ? "" : p);
  if ((canonical || "").replace(/\/$/, "") !== want) err(p, `canonical ${canonical} (expected ${want})`);

  const alts = Object.fromEntries([...head.matchAll(/<link[^>]+rel="alternate"[^>]*>/g)].map((m) => [attr(m[0], "hrefLang") ?? attr(m[0], "hreflang"), attr(m[0], "href")]));
  const enPath = fa ? pairOf(p) : p;
  const faPath = fa ? p : pairOf(p);
  const abs = (x) => ORIGIN + (x === "/" ? "" : x);
  const norm = (u) => (u || "").replace(/\/$/, "");
  if (norm(alts.en) !== abs(enPath)) err(p, `hreflang en=${alts.en} (expected ${abs(enPath)})`);
  if (norm(alts.fa) !== abs(faPath)) err(p, `hreflang fa=${alts.fa} (expected ${abs(faPath)})`);
  if (!alts["x-default"]) err(p, "hreflang x-default missing");

  placeholderChecks(p, html);

  const types = jsonLdBlocks(html).flatMap((b) => {
    try {
      return [JSON.parse(b)["@type"]];
    } catch {
      return [];
    }
  });
  const isHome = p === "/" || p === "/en";
  const isService = /^(\/en)?\/services\/[^/]+$/.test(p);
  if (isHome !== types.includes("ProfessionalService")) err(p, isHome ? "home page lacks the ProfessionalService entity" : "full ProfessionalService entity outside the home page");
  if (isService !== types.includes("Service")) err(p, isService ? "service page lacks its Service node" : "Service node outside a service page");
  if (!types.includes("WebSite")) err(p, "no WebSite node");

  const links = internalLinks(body);
  for (const sp of seen.servicePaths) {
    const want = fa ? sp : `/en${sp}`;
    if (!links.includes(want)) err(p, `no link to ${want}`);
  }

  for (const m of body.matchAll(/<p[^>]*\sdata-answer=""[^>]*>([\s\S]*?)<\/p>/g)) {
    const words = visibleText(m[1]).split(" ").filter((w) => /[\p{L}\p{N}]/u.test(w)).length;
    if (words < 25 || words > 90) warn(p, `direct answer is ${words} words`);
  }

  for (const img of body.match(/<img\s[^>]*>/g) || []) {
    const alt = attr(img, "alt");
    if (alt === undefined) err(p, `<img> without alt: ${attr(img, "src")?.slice(0, 60)}`);
    else if (alt.trim() === "" && !/aria-hidden="true"|role="presentation"/.test(img)) warn(p, `empty alt on content image ${attr(img, "src")?.slice(0, 70)}`);
  }
  return links;
}

async function main() {
  const { base, stop } = await startServer();
  try {
    const xml = await (await fetch(base + "/sitemap.xml")).text();
    const pages = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
    if (!pages.length) err("/sitemap.xml", "no URLs");
    for (const p of pages) if (!pages.includes(pairOf(p))) err(p, `language twin ${pairOf(p)} missing from sitemap`);

    const seen = { titles: {}, descs: {}, servicePaths: pages.filter((p) => /^\/services\/[^/]+$/.test(p)) };
    const links = new Map();
    for (const p of pages) for (const l of (await checkPage(base, p, seen)) || []) if (!links.has(l)) links.set(l, p);
    for (const [t, ps] of Object.entries(seen.titles)) if (t && ps.length > 1) err(ps.join(", "), `duplicate <title> "${t}"`);
    for (const [d, ps] of Object.entries(seen.descs)) if (d && ps.length > 1) err(ps.join(", "), `duplicate meta description "${d.slice(0, 60)}…"`);

    // Every internal link target: no 404s; pages outside the sitemap (legal, filtered views) must not show placeholders either.
    for (const [href, from] of links) {
      const res = await fetch(base + href, { redirect: "manual" });
      if (res.status === 404) err(from, `links to 404: ${href}`);
      else if (res.status >= 300 && res.status < 400) warn(from, `links to a redirect: ${href} → ${res.headers.get("location")}`);
      else if (res.status === 200 && !pages.includes(href.split("?")[0])) placeholderChecks(href, await res.text());
    }

    for (const p of EXTRA_PAGES) {
      if (links.has(p)) continue; // already checked above
      const res = await fetch(base + p, { redirect: "manual" });
      if (res.status === 200) placeholderChecks(p, await res.text());
      else err(p, `HTTP ${res.status}`);
    }

    for (const u of OLD_URLS) {
      const res = await fetch(base + u, { redirect: "manual" });
      if (res.status === 200) continue; // a real page now lives at this path
      if (res.status !== 301 && res.status !== 308) {
        err(u, `old URL returns ${res.status} (expected 301/308 or 200)`);
        continue;
      }
      const loc = new URL(res.headers.get("location"), base);
      const next = await fetch(loc, { redirect: "manual" });
      if (next.status !== 200) err(u, `redirects to ${loc.pathname} which returns ${next.status} (not a single hop to 200)`);
    }

    await new Promise((r) => setTimeout(r, 1500));
    const xml2 = await (await fetch(base + "/sitemap.xml")).text();
    const mods = (x) => [...x.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map((m) => m[1]);
    if (mods(xml).join() !== mods(xml2).join()) err("/sitemap.xml", "lastmod changes between fetches (request time, not content time)");
    for (const m of mods(xml)) if (new Date(m) > new Date(Date.now() + 60_000)) err("/sitemap.xml", `lastmod in the future: ${m}`);

    const robots = await (await fetch(base + "/robots.txt")).text();
    for (const ua of AI_SEARCH_CRAWLERS)
      if (!new RegExp(`^user-agent:\\s*${ua}\\s*$`, "im").test(robots)) err("/robots.txt", `no explicit group for ${ua}`);
    if (!/^user-agent:\s*\*\s*$/im.test(robots)) err("/robots.txt", "no 'User-agent: *' group");
    if (!/^allow:\s*\/\s*$/im.test(robots)) err("/robots.txt", "no 'Allow: /'");
    if (/^disallow:\s*\/\s*$/im.test(robots)) err("/robots.txt", "root 'Disallow: /'");
    if (/^host:/im.test(robots)) err("/robots.txt", "non-standard 'Host:' line");
    if (!new RegExp(`^sitemap:\\s*${ORIGIN.replace(/[.]/g, "\\.")}/sitemap\\.xml\\s*$`, "im").test(robots)) err("/robots.txt", "missing Sitemap line");

    console.log(`seo:check ${base}: ${pages.length} sitemap URLs, ${links.size} internal links, ${OLD_URLS.length} old URLs`);
    if (warnings.length) {
      const byMsg = {};
      for (const w of warnings) (byMsg[w.replace(/^[^:]+: /, "").replace(/ \S+$/, "")] ||= []).push(w);
      console.log(`\nWarnings (${warnings.length}):`);
      for (const [m, ws] of Object.entries(byMsg)) console.log(`  ${ws.length} × ${m}  (e.g. ${ws[0].split(":")[0]})`);
    }
    if (errors.length) {
      console.log(`\nErrors (${errors.length}):`);
      for (const e of errors) console.log("  " + e);
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
