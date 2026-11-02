// Broken-link crawl (SEO-GUIDELINE G / section 15). Usage: node scripts/link-check.mjs [baseUrl]
// Reads <base>/sitemap.xml, fetches every page, and checks that each internal link and image answers 200
// (redirects and 404s are reported). Exits 1 when anything is broken, so it can run in CI.
const base = (process.argv[2] || "http://localhost:3100").replace(/\/$/, "");
const origin = new URL(base).origin;

const get = async (url, init) => {
  try {
    return await fetch(url, { redirect: "manual", ...init });
  } catch (e) {
    return { status: 0, error: String(e) };
  }
};

const sm = await (await fetch(`${base}/sitemap.xml`)).text();
const pages = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
console.log(`sitemap: ${pages.length} URLs`);

const seen = new Map(); // path -> status
const referrers = new Map();
const note = (target, from) => {
  if (!referrers.has(target)) referrers.set(target, from);
};

for (const p of pages) {
  const res = await get(base + p);
  seen.set(p, res.status);
  if (res.status !== 200) continue;
  const html = await res.text();
  for (const m of html.matchAll(/(?:href|src)="([^"#]+)(?:#[^"]*)?"/g)) {
    let u;
    try {
      u = new URL(m[1].replace(/&amp;/g, "&"), origin + p);
    } catch {
      continue;
    }
    if (u.origin !== origin) continue;
    const t = u.pathname + u.search;
    if (/^\/_next\/(static|image)/.test(t) || t.startsWith("/_next/data")) continue;
    note(t, p);
    if (!seen.has(t)) seen.set(t, null);
  }
}

const bad = [];
for (const [t, status] of seen) {
  let s = status;
  if (s === null) s = (await get(base + t)).status;
  seen.set(t, s);
  if (s !== 200) bad.push(`${s}  ${t}  (linked from ${referrers.get(t) || "sitemap"})`);
}

console.log(`checked: ${seen.size} URLs`);
if (bad.length) {
  console.log(bad.join("\n"));
  process.exit(1);
}
console.log("no broken internal links");
