#!/usr/bin/env node
/**
 * Repeated-sentence check (SEO-GUIDELINE v2, 5-4): a sentence of more than 12 words must not appear word for word on
 * two pages of the same language. Header, footer and the closing contact block are left out (shared components), and
 * so are shared sections (data-shared="") and the text inside link cards (<a>), which only preview another page.
 * Usage: node scripts/dupes-check.mjs [baseUrl]   (default http://localhost:3100; run `npm run build && npm start` first)
 */
const base = (process.argv[2] || process.env.SEO_CHECK_BASE || "http://localhost:3100").replace(/\/$/, "");
const MIN_WORDS = 13;
const decode = (s) => s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;|&#160;/g, " ");

/** Removes every <section data-shared=""> with everything inside it (sections may nest). */
function stripShared(html) {
  for (;;) {
    const m = html.match(/<section\b[^>]*\sdata-shared=""[^>]*>/);
    if (!m) return html;
    let depth = 1;
    let end = html.length;
    const re = /<(\/?)section\b/g;
    re.lastIndex = m.index + m[0].length;
    for (let t = re.exec(html); t; t = re.exec(html)) {
      depth += t[1] ? -1 : 1;
      if (!depth) {
        end = html.indexOf(">", t.index) + 1;
        break;
      }
    }
    html = html.slice(0, m.index) + " " + html.slice(end);
  }
}

const text = (h) =>
  decode(
    h
      .replace(/<a\s[^>]*>[\s\S]*?<\/a>/g, " ")
      .replace(/<script[\s\S]*?<\/script>/g, " ")
      .replace(/<style[\s\S]*?<\/style>/g, " ")
      .replace(/<(code|pre)[\s\S]*?<\/\1>/g, " ")
      .replace(/<(li|p|h\d|dt|dd|td|th|figcaption|summary)[\s>]/g, ". $&")
      .replace(/<[^>]+>/g, " "),
  ).replace(/\s+/g, " ");

const xml = await (await fetch(base + "/sitemap.xml")).text();
const pages = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
const seen = new Map(); // "lang|sentence" -> pages
for (const p of pages) {
  const html = await (await fetch(base + p)).text();
  let main = html.slice(html.indexOf("<main"), html.indexOf("</main>"));
  const cut = main.indexOf('<section id="contact"');
  if (cut > 0) main = main.slice(0, cut);
  main = stripShared(main);
  const lang = p === "/en" || p.startsWith("/en/") ? "en" : "fa";
  const sentences = text(main)
    .split(/(?<=[.!?؟؛])\s+|\s\.\s/)
    .map((s) => s.trim().replace(/^[.\s]+|[\s.]+$/g, ""));
  for (const s of new Set(sentences)) {
    if (s.split(" ").filter((w) => /[\p{L}\p{N}]/u.test(w)).length < MIN_WORDS) continue;
    const key = `${lang}|${s}`;
    seen.set(key, [...(seen.get(key) ?? []), p]);
  }
}
const dupes = [...seen].filter(([, ps]) => ps.length > 1);
for (const [key, ps] of dupes) console.log(`${ps.join(", ")}\n   ${key.slice(3, 130)}…\n`);
console.log(`dupes-check ${base}: ${pages.length} pages, ${dupes.length} repeated sentences`);
process.exitCode = dupes.length ? 1 : 0;
