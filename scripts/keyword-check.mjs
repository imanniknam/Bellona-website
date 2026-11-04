#!/usr/bin/env node
/**
 * Keyword-map checker (SEO-GUIDELINE F). For every page in docs/seo/keyword-map.json it fetches the Persian and the
 * English page and checks that the main keyword appears in: <title>, the <h1>, the first 100 words of the main
 * text, at least one <h2> and the meta description. It also checks that no two pages share a main keyword.
 *
 *   SEO_CHECK_BASE=http://localhost:3100 npm run seo:keywords        (default base: https://bellonaagency.com)
 *   node scripts/keyword-check.mjs --markdown                          prints docs/seo/KEYWORD_MAP.md to stdout
 * Exit code 1 if a main keyword is missing from the title, H1 (unless exempt) or meta description.
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const BASE = (process.env.SEO_CHECK_BASE || "https://bellonaagency.com").replace(/\/$/, "");
const here = path.dirname(fileURLToPath(import.meta.url));
const map = JSON.parse(readFileSync(path.join(here, "../docs/seo/keyword-map.json"), "utf8"));

const decode = (s) => s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const strip = (s) => decode(s.replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<style[\s\S]*?<\/style>/g, " ").replace(/<[^>]*>/g, " ")).replace(/\s+/g, " ").trim();
/** Case-insensitive; the zero-width non-joiner and Persian/Arabic letter variants are treated as the same. */
const norm = (s) =>
  s
    .toLowerCase()
    .replace(/\u200cی(?=\s)/g, "") // ezafe written with a ZWNJ is the same word
    .replace(/[‌‏‎]/g, " ")
    .replace(/ي/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/[-–‑]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
const has = (hay, kw) => norm(hay).includes(norm(kw));

if (process.argv.includes("--markdown")) {
  const rows = map.pages.map((p) => `| \`${p.path}\` | ${p.cluster} | ${p.fa} | ${p.en} | ${p.related.join("، ") || "—"} |`);
  console.log(`# Keyword map (SEO-GUIDELINE F)

One main keyword per page, never shared; related terms are used naturally in the text, headings, FAQ and image alt text.
The English column applies to the same path under \`/en\`. Generated from \`docs/seo/keyword-map.json\`; verify with
\`npm run seo:keywords\`.

TODO(owner): search volume and current ranking for each keyword, from Search Console and a keyword tool (none are measured here).

| Page | Cluster | Main keyword (fa) | Main keyword (en) | Related terms (fa) |
| --- | --- | --- | --- | --- |
${rows.join("\n")}
`);
  process.exit(0);
}

const errors = [];
const warns = [];
const rowsOut = [];
for (const kind of ["fa", "en"]) {
  const seen = new Map();
  for (const p of map.pages) {
    const kw = p[kind];
    if (seen.has(norm(kw))) errors.push(`${kind}: "${kw}" is the main keyword of both ${seen.get(norm(kw))} and ${p.path}`);
    seen.set(norm(kw), p.path);
  }
}
for (const p of map.pages) {
  for (const kind of ["fa", "en"]) {
    const url = `${BASE}${kind === "en" ? "/en" : ""}${p.path === "/" ? (kind === "en" ? "" : "/") : p.path}`;
    const res = await fetch(url);
    if (res.status !== 200) {
      errors.push(`${url}: HTTP ${res.status}`);
      continue;
    }
    const html = await res.text();
    const title = strip((html.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || "");
    const desc = decode((html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || "");
    const main = html.slice(html.indexOf("<main"), html.indexOf("</main>"));
    const h1 = strip((main.match(/<h1[\s\S]*?<\/h1>/) || [""])[0]);
    const h2s = [...main.matchAll(/<h2[\s\S]*?<\/h2>/g)].map((m) => strip(m[0]));
    const first100 = strip(main).split(" ").slice(0, 100).join(" ");
    const kw = p[kind];
    const slots = { title: has(title, kw), h1: has(h1, kw), first100: has(first100, kw), h2: h2s.some((h) => has(h, kw)), description: has(desc, kw) };
    rowsOut.push({ url: url.replace(BASE, "") || "/", kw, slots });
    if (!slots.title) errors.push(`${url}: "${kw}" missing from the title`);
    if (!slots.description) errors.push(`${url}: "${kw}" missing from the meta description`);
    if (!slots.h1 && !p.h1Exempt) errors.push(`${url}: "${kw}" missing from the H1`);
    if (!slots.first100) warns.push(`${url}: "${kw}" not in the first 100 words`);
    if (!slots.h2) warns.push(`${url}: "${kw}" not in any H2`);
  }
}
const ok = (b) => (b ? "✓" : "✗");
console.log(`keyword:check ${BASE}: ${map.pages.length} pages × 2 languages`);
console.log("title h1 100w h2 desc  page → keyword");
for (const r of rowsOut) console.log(` ${ok(r.slots.title)}    ${ok(r.slots.h1)}   ${ok(r.slots.first100)}    ${ok(r.slots.h2)}   ${ok(r.slots.description)}   ${r.url} → ${r.kw}`);
if (warns.length) console.log(`\nWarnings (${warns.length}):\n  ${warns.slice(0, 200).join("\n  ")}`);
if (errors.length) {
  console.log(`\nErrors (${errors.length}):\n  ${errors.slice(0, 200).join("\n  ")}`);
  process.exit(1);
}
console.log("\nNo errors.");
