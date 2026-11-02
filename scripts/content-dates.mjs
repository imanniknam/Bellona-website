// Writes content-dates.json: the date of the last commit that touched each content file (SEO-GUIDELINE 7-1).
// app/sitemap.ts reads it for <lastmod>, so a sitemap entry carries the date its page's content really changed, not
// the deploy time. Deploy hosts clone shallowly, where every file looks like it changed in the newest commit, so this
// script keeps the committed file when run in a shallow clone. Run `npm run dates` and commit the result after
// content changes (the `prebuild` hook does it on every local build).
import { execFileSync } from "node:child_process";
import { existsSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const git = (...args) => execFileSync("git", args, { cwd: root, encoding: "utf8", maxBuffer: 64 * 1024 * 1024 }).trim();
const out = path.join(root, "content-dates.json");

try {
  if (git("rev-parse", "--is-shallow-repository") === "true") {
    console.log("content-dates: shallow clone, keeping the committed content-dates.json");
    process.exit(0);
  }
  if (git("rev-parse", "--is-inside-work-tree") !== "true") throw new Error("not a git work tree");
} catch {
  console.log(existsSync(out) ? "content-dates: no git history here, keeping content-dates.json" : "content-dates: no git history and no content-dates.json");
  process.exit(0);
}

const tracked = new Set(git("ls-files", "content", "components/pages", "public/work", "lib/drafts.ts").split("\n").filter(Boolean));
const dates = {};
let date = "";
// Newest commits come first, so the first date seen for a file is its last change.
for (const line of git("log", "--format=@@%cI", "--name-only", "--", "content", "components/pages", "public/work", "lib/drafts.ts").split("\n")) {
  if (line.startsWith("@@")) date = line.slice(2);
  else if (line && tracked.has(line) && !dates[line]) dates[line] = date;
}
const sorted = Object.fromEntries(Object.entries(dates).sort(([a], [b]) => a.localeCompare(b)));
writeFileSync(out, JSON.stringify(sorted, null, 1) + "\n");
console.log(`content-dates: ${Object.keys(sorted).length} files`);
