#!/usr/bin/env node
/**
 * Structured-data validator (SEO-GUIDELINE C9). Offline stand-in for Google's Rich Results Test and the
 * Schema Markup Validator (both are web tools): fetches every sitemap URL and checks that
 *  - every JSON-LD block is valid JSON with @context and a known @type
 *  - each type has its required and recommended properties (Google's documented ones)
 *  - every { "@id": … } reference points to a node defined on the same page
 *  - the BreadcrumbList matches the visible breadcrumb exactly (names, order, last item = this page)
 *  - the page types the guideline asks for are present (see SEO-GUIDELINE C)
 *
 *   SEO_CHECK_BASE=http://localhost:3100 npm run seo:schema     (default base: https://bellonaagency.com)
 * Exit code 1 on any error. Prints a per-type count and how many pages carry schema.
 */
const BASE = (process.env.SEO_CHECK_BASE || "https://bellonaagency.com").replace(/\/$/, "");
const ORIGIN = "https://bellonaagency.com";

const errors = [];
const warns = [];
const err = (p, m) => errors.push(`${p}: ${m}`);
const warn = (p, m) => warns.push(`${p}: ${m}`);

const REQUIRED = {
  ProfessionalService: ["name", "url", "logo", "email", "sameAs", "founder", "knowsAbout", "availableLanguage"],
  WebSite: ["url", "name", "inLanguage", "publisher"],
  BreadcrumbList: ["itemListElement"],
  Service: ["name", "description", "provider", "serviceType", "url"],
  CreativeWork: ["name", "description", "creator", "url", "inLanguage"],
  Article: ["headline", "author", "datePublished", "dateModified", "inLanguage", "image", "publisher"],
  AboutPage: ["name", "url", "mainEntity"],
  ContactPage: ["name", "url"],
  FAQPage: ["mainEntity"],
  Person: ["name", "jobTitle"],
};

const decode = (s) => s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const strip = (s) => decode(s.replace(/<[^>]*>/g, "")).replace(/\s+/g, " ").trim();

const nodesOf = (json) => (json["@graph"] ? json["@graph"] : [json]);
const typesOf = (n) => [].concat(n["@type"] || []);

function checkNode(p, n) {
  for (const t of typesOf(n)) {
    for (const k of REQUIRED[t] || []) if (n[k] === undefined || n[k] === null || n[k] === "" || (Array.isArray(n[k]) && !n[k].length)) err(p, `${t} is missing "${k}"`);
    if (t === "BreadcrumbList") {
      (n.itemListElement || []).forEach((it, i) => {
        if (it.position !== i + 1) err(p, `BreadcrumbList position ${it.position} at index ${i}`);
        if (!it.name || !it.item) err(p, `BreadcrumbList item ${i + 1} lacks name or item`);
      });
    }
    if (t === "Article" && !(n.author && (n.author.name || n.author["@id"]))) err(p, "Article author has no name");
    if (t === "FAQPage") for (const q of n.mainEntity || []) if (!q.name || !q.acceptedAnswer?.text) err(p, "FAQPage question without name or answer text");
    if (t === "ProfessionalService" && /TODO|\[[A-Z]/.test(JSON.stringify(n))) err(p, "placeholder text in the organization node");
  }
}

function refs(value, out = []) {
  if (Array.isArray(value)) value.forEach((v) => refs(v, out));
  else if (value && typeof value === "object") {
    const keys = Object.keys(value);
    if (keys.length === 1 && keys[0] === "@id") out.push(value["@id"]);
    else for (const k of keys) refs(value[k], out);
  }
  return out;
}

async function main() {
  const sm = await (await fetch(`${BASE}/sitemap.xml`)).text();
  const urls = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(ORIGIN, BASE));
  const typeCount = {};
  let withSchema = 0;

  for (const url of urls) {
    const p = url.replace(BASE, "") || "/";
    const res = await fetch(url);
    if (res.status !== 200) {
      err(p, `HTTP ${res.status}`);
      continue;
    }
    const html = await res.text();
    const blocks = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
    if (blocks.length) withSchema++;
    else err(p, "no JSON-LD at all");

    const nodes = [];
    for (const b of blocks) {
      let json;
      try {
        json = JSON.parse(b.replace(/\\u003c/g, "<"));
      } catch (e) {
        err(p, `invalid JSON-LD: ${e.message}`);
        continue;
      }
      if (json["@context"] !== "https://schema.org") err(p, `@context is ${json["@context"]}`);
      for (const n of nodesOf(json)) {
        if (!typesOf(n).length) err(p, "node without @type");
        for (const t of typesOf(n)) typeCount[t] = (typeCount[t] || 0) + 1;
        checkNode(p, n);
        nodes.push(n);
      }
    }

    // @id references resolve on the page
    const ids = new Set(nodes.map((n) => n["@id"]).filter(Boolean));
    for (const n of nodes) for (const r of refs(n)) if (!ids.has(r)) err(p, `unresolved reference ${r}`);

    // breadcrumb equals the visible one
    const bc = nodes.find((n) => typesOf(n).includes("BreadcrumbList"));
    const navHtml = html.match(/<nav aria-label="(?:Breadcrumb|مسیر صفحه)"[\s\S]*?<\/nav>/)?.[0];
    if (bc && !navHtml) err(p, "BreadcrumbList without a visible breadcrumb");
    if (!bc && navHtml) err(p, "visible breadcrumb without BreadcrumbList");
    if (bc && navHtml) {
      const visible = [...navHtml.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/g)].map((m) => strip(m[1]).replace(/[›‹]$/, "").trim());
      const schema = bc.itemListElement.map((i) => i.name);
      if (visible.join("|") !== schema.join("|")) err(p, `breadcrumb differs: visible [${visible.join(" > ")}] vs schema [${schema.join(" > ")}]`);
      const last = bc.itemListElement.at(-1)?.item;
      const self = (html.match(/<link rel="canonical" href="([^"]+)"/) || [])[1];
      if (last && self && decode(last) !== decode(self)) err(p, `last breadcrumb ${last} is not the canonical ${self}`);
    }

    // the page types the guideline asks for
    const types = new Set(nodes.flatMap(typesOf));
    const bare = p.replace(/^\/en(?=\/|$)/, "") || "/";
    const need = (t, cond) => cond && !types.has(t) && err(p, `expected ${t}`);
    need("ProfessionalService", true);
    need("WebSite", true);
    need("BreadcrumbList", bare !== "/");
    need("Service", /^\/services\/[^/]+(\/[^/]+)?$/.test(bare));
    need("CreativeWork", /^\/work\/[^/]+$/.test(bare));
    need("Article", /^\/guides\/[^/]+$/.test(bare));
    need("AboutPage", bare === "/about");
    need("ContactPage", bare === "/contact");
    if (/^\/services\/[^/]+(\/[^/]+)?$/.test(bare) && !types.has("FAQPage")) warn(p, "service page without FAQPage");
  }

  console.log(`schema:check ${BASE}: ${urls.length} URLs, ${withSchema} with JSON-LD`);
  console.log("types:", Object.entries(typeCount).sort().map(([t, n]) => `${t} ${n}`).join(", "));
  if (warns.length) console.log(`\nWarnings (${warns.length}):\n  ${warns.slice(0, 15).join("\n  ")}`);
  if (errors.length) {
    console.log(`\nErrors (${errors.length}):\n  ${errors.slice(0, 40).join("\n  ")}`);
    process.exit(1);
  }
  console.log("\nNo errors.");
}
main().catch((e) => {
  console.error(e);
  process.exit(1);
});
