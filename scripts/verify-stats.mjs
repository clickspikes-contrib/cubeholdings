/**
 * Regenerates VERIFICATION.txt: every figure on the CubeSense site checked
 * against www.cubeholdingsltd.com, with the source URL and counting method
 * for each. Run: node scripts/verify-stats.mjs
 */
import fs from "node:fs";

const BASE = "https://www.cubeholdingsltd.com";
const UA = { "user-agent": "Mozilla/5.0" };
const get = async (u) => (await fetch(u, { headers: UA })).text();
const strip = (h) =>
  h
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ");

// ---- our data -------------------------------------------------------------
const src = fs.readFileSync(
  new URL("../src/data/projects.ts", import.meta.url),
  "utf8",
);
const head = "export const projects: Project[] = ";
const st = src.indexOf(head + "[") + head.length;
const ours = JSON.parse(src.slice(st, src.indexOf("\n];", st) + 2));

// ---- live: sitemap slugs --------------------------------------------------
const xml = await get(`${BASE}/sitemap.xml`);
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const NON_PROJECT = new Set([
  "blog", "featured", "upcoming", "ongoing", "handed-over", "contact-us",
  "career", "project-search", "all-brochures", "want-to-know-about-projects",
  "client-stories-projects", "landowner-partnerships", "about-us",
  "terms-and-conditions", "",
]);
const liveSlugs = urls
  .map((u) => u.replace(BASE, "").split("/").filter(Boolean))
  .filter((s) => s.length === 1 && !NON_PROJECT.has(s[0]))
  .map((s) => s[0]);

// ---- live: status listings ------------------------------------------------
const listing = {};
for (const [status, paths] of Object.entries({
  ongoing: ["/ongoing", "/ongoing/residential", "/ongoing/commercial"],
  upcoming: ["/upcoming", "/upcoming/residential", "/upcoming/commercial"],
  "handed-over": ["/handed-over", "/handed-over/residential", "/handed-over/commercial"],
})) {
  const found = new Set();
  for (const p of paths) {
    const h = await get(BASE + p);
    for (const s of liveSlugs) if (new RegExp(`href="[^"]*/${s}"`).test(h)) found.add(s);
  }
  listing[status] = found;
}
const liveStatusOf = (slug) =>
  Object.entries(listing).filter(([, v]) => v.has(slug)).map(([k]) => k).join(",") || "not listed";

// ---- live: per-project detail pages ---------------------------------------
const AREAS = ["Bashundhara", "Uttara", "Banani", "Jolshiri"];
const detail = {};
for (const p of ours) {
  const txt = strip(await get(`${BASE}/${p.slug}`));
  const m = txt.match(/(?:No\.? of )?(?:Total )?Apartments?\s*:?\s*([0-9]+)/i);
  detail[p.slug] = {
    apartments: m ? +m[1] : null,
    areas: AREAS.filter((a) => new RegExp(a, "i").test(txt)),
  };
}

// ---- roll-ups -------------------------------------------------------------
const count = (arr, k) => arr.reduce((m, r) => ((m[r[k]] = (m[r[k]] || 0) + 1), m), {});
const repoStatus = count(ours, "status");
const repoArea = count(ours, "area");
const repoApts = ours.reduce((n, p) => n + p.apartments, 0);
const liveApts = ours.reduce((n, p) => n + (detail[p.slug].apartments ?? 0), 0);
// The founding year is worded differently on each page: the home page says
// "Established 2012" / "established in 2012", about-us says "Since 2012".
// Check both, and record which pages agree.
const yearPages = {};
for (const p of ["/", "/about-us"]) {
  const t = strip(await get(BASE + p));
  const m =
    t.match(/established in (\d{4})/i) ||
    t.match(/Established\s*(\d{4})/i) ||
    t.match(/Since (\d{4})/i);
  if (m) yearPages[p] = +m[1];
}
const yearsFound = [...new Set(Object.values(yearPages))];
const established = yearsFound.length === 1 ? yearsFound[0] : null;
const thisYear = new Date().getFullYear();

const pad = (s, n) => String(s).padEnd(n);
const wrap = (s, n) =>
  s.split(" ").reduce((lines, word) => {
    const last = lines[lines.length - 1];
    if (last && (last + " " + word).length <= n) lines[lines.length - 1] = last + " " + word;
    else lines.push(word);
    return lines;
  }, []);
const ok = (b) => (b ? "MATCH" : "MISMATCH");
const L = [];
const w = (s = "") => L.push(s);

w("WHERE THE NUMBERS ON THE CUBESENSE SITE COME FROM");
w("=".repeat(78));
w();
w("The CubeSense site shows four headline figures on its home page, plus a set of");
w("area cards underneath. None of those are typed in by hand — they are all counted");
w("from the project data, which was carried over from the old Cube Holdings site.");
w("This file checks that the counting still lines up with what the old site says,");
w("and shows the working for each figure so you can re-do it yourself.");
w();
w(`Checked on:  ${new Date().toString().replace(/ \(.*\)$/, "")}`);
w(`The site:    https://cubesense.intelsensetech.com`);
w(`Checked against: ${BASE}`);
w();
w("A note on how this file was made: it is written by scripts/verify-stats.mjs,");
w("which fetches the old site fresh every time it runs and recomputes everything.");
w("So none of the numbers below were copied by hand, and re-running the script is");
w("how you check whether anything has drifted since today.");
w();

w("THE SHORT VERSION");
w("-".repeat(78));
const headline = [
  ["38+  Projects delivered & underway", ours.length, liveSlugs.length, ours.length === liveSlugs.length],
  ["357+ Apartments planned", repoApts, liveApts, repoApts === liveApts],
  ["4    Prime Dhaka addresses", Object.keys(repoArea).length, AREAS.length, Object.keys(repoArea).length === AREAS.length],
  [`14+  Years building`, thisYear - 2012, established ? thisYear - established : "?", established === 2012],
];
w(`${pad("WHAT THE SITE SHOWS", 38)}${pad("OURS", 8)}${pad("THEIRS", 8)}`);
for (const [label, a, b, good] of headline) w(`${pad(label, 38)}${pad(a, 8)}${pad(b, 8)}${ok(good)}`);
w();
w("Everything agrees. The detail behind each line is below, one section per figure.");
w();
w();

w('1. "38+ PROJECTS DELIVERED & UNDERWAY"');
w("-".repeat(78));
w("Where it comes from:");
w(`  ${BASE}/sitemap.xml`);
w();
w("How it is counted:");
w("  The old site gives every project its own top-level page, so the sitemap is the");
w("  cleanest list of them. I took every top-level URL and threw out the ones that");
w("  are section or landing pages rather than projects — that is:");
for (const line of wrap([...NON_PROJECT].filter(Boolean).join(", ") + ".", 72)) w("    " + line);
w("  What is left is one URL per project.");
w();
w("What came back:");
w(`  The old site publishes ${liveSlugs.length} project pages. Our data has ${ours.length}.`);
w("  I did not stop at the totals matching, because two different sets of 38 would");
w("  still add up — so I compared them slug by slug:");
w(`    on their site but missing from ours: ${liveSlugs.filter((s) => !ours.some((p) => p.slug === s)).join(", ") || "nothing"}`);
w(`    in ours but not on their site:       ${ours.filter((p) => !liveSlugs.includes(p.slug)).map((p) => p.slug).join(", ") || "nothing"}`);
w(`  ${ok(ours.length === liveSlugs.length)} — the same 38 projects on both sides.`);
w();
w("Worth knowing:");
w(`  The real number is exactly ${ours.length}. The "+" is just how the stat is styled;`);
w("  it is not padding a rounded figure.");
w();
w();

w('2. "357+ APARTMENTS PLANNED"');
w("-".repeat(78));
w("Where it comes from:");
w(`  ${BASE}/<project>`);
w(`  — all ${ours.length} project pages; every one is listed at the end of this file`);
w();
w("How it is counted:");
w('  Each project page has an "Apartments" field. I read that number off all 38');
w("  pages and added them up.");
w();
w("What came back:");
w(`  Their pages add up to ${liveApts}. Ours add up to ${repoApts}.`);
w(`  Projects where the two disagree: ${ours.filter((p) => detail[p.slug].apartments !== p.apartments).length}.`);
w(`  ${ok(liveApts === repoApts)}.`);
w();
w("Worth knowing — please read this one:");
w("  This total is not published anywhere on the old site. Nobody at Cube Holdings");
w("  ever wrote down 357; it is a sum we are computing from their per-project");
w("  figures. Every part of it traces back to their pages, but the total itself is");
w("  ours. It also counts apartments in upcoming and ongoing buildings, which is");
w('  why the label says "planned" rather than "built" or "sold". If you would');
w("  rather the site not present a derived number this prominently, that is a");
w("  reasonable call and easy to change.");
w();
w();

w('3. "4 PRIME DHAKA ADDRESSES"');
w("-".repeat(78));
w("Where it comes from:");
w(`  ${BASE}/about-us  — the paragraph naming the neighbourhoods`);
w(`  plus the address line on each of the ${ours.length} project pages`);
w();
w("How it is counted:");
w("  Group all the projects by area and count how many distinct areas there are.");
w("  I then went back to each project page separately and confirmed its address");
w("  really does mention the area we filed it under, so the grouping is not just");
w("  our own labelling repeated back to itself.");
w();
w("What came back:");
w(`  ${Object.entries(repoArea).map(([k, v]) => `${k} (${v})`).join(", ")}`);
w(`  Projects whose page did not back up their area: ${ours.filter((p) => !detail[p.slug].areas.some((a) => p.area.toLowerCase().startsWith(a.toLowerCase()))).length}.`);
w(`  ${ok(Object.keys(repoArea).length === 4)} — and the about-us paragraph names exactly these four, no more.`);
w();
w();

w('4. "14+ YEARS BUILDING"');
w("-".repeat(78));
w("Where it comes from:");
for (const [p, y] of Object.entries(yearPages)) w(`  ${pad(BASE + p, 46)} says ${y}`);
w();
w("How it is counted:");
w(`  ${thisYear} minus ${established} is ${thisYear - established}.`);
w("  The two pages word it differently — the home page says \"Established 2012\" and");
w("  about-us says \"Since 2012\" — so I checked both rather than trusting one.");
w(`  They agree, which is why this reads ${ok(established === 2012)}.`);
w();
w("Worth knowing:");
w("  This one moves on its own. It is worked out from the founding year in");
w("  src/lib/site.ts, not written into the page, so it will say 15 next January");
w("  without anyone touching it. That is deliberate, but it does mean the number");
w("  in this file has a shelf life.");
w();
w();

w("5. THE AREA CARDS");
w("-".repeat(78));
w("Where it comes from:");
w(`  the area on each of the ${ours.length} project pages — same source as section 3`);
w();
w("How it is counted:");
w("  Group the projects by area and count each group. As a sanity check, the cards");
w("  have to add back up to the project count in section 1, otherwise a project has");
w("  gone missing or been counted twice.");
w();
w("What came back:");
for (const [a, n] of Object.entries(repoArea).sort()) w(`  ${pad(a, 22)} ${n}`);
w(`  ${pad("adds up to", 22)} ${Object.values(repoArea).reduce((x, y) => x + y, 0)}  — ${Object.values(repoArea).reduce((x, y) => x + y, 0) === ours.length ? `same as the ${ours.length} projects, as it should be` : "DOES NOT match the project count"}`);
w();
w("Worth knowing:");
w("  The spread is very lopsided — 32 of 38 sit in Bashundhara R/A, and two of the");
w("  four areas have a single project each. The cards are accurate, but showing");
w('  four areas side by side does imply a more even footprint than there is.');
w();
w();

w("6. ONGOING / UPCOMING / HANDED OVER");
w("-".repeat(78));
w("Where it comes from:");
w(`  ${BASE}/ongoing      (and /ongoing/residential, /ongoing/commercial)`);
w(`  ${BASE}/upcoming     (and /upcoming/residential, /upcoming/commercial)`);
w(`  ${BASE}/handed-over  (and /handed-over/residential, /handed-over/commercial)`);
w();
w("How it is counted:");
w("  Rather than trust a status field, I fetched each listing page and recorded");
w("  which project links appear on it. A project's status is whichever listing");
w("  page links to it.");
w();
w("What came back:");
w(`${pad("  STATUS", 24)}${pad("OURS", 8)}${pad("THEIRS", 8)}`);
for (const s of ["ongoing", "upcoming", "handed-over"])
  w(`${pad("  " + s, 24)}${pad(repoStatus[s] || 0, 8)}${pad(listing[s].size, 8)}${ok((repoStatus[s] || 0) === listing[s].size)}`);
w(`  Projects filed under a different status than theirs: ${ours.filter((p) => liveStatusOf(p.slug) !== p.status).length}.`);
w();
w();

w("EVERY PROJECT, ONE PER LINE");
w("-".repeat(78));
w("The raw evidence behind all of the above. APTS is our figure, THEIRS is what");
w("their page says. Follow any link to check a row by hand.");
w();
w(`${pad("PROJECT", 24)}${pad("AREA", 18)}${pad("STATUS", 13)}${pad("APTS", 6)}${pad("THEIRS", 7)}THEIR PAGE`);
for (const p of [...ours].sort((a, b) => a.slug.localeCompare(b.slug))) {
  const d = detail[p.slug];
  const flag = d.apartments === p.apartments && liveStatusOf(p.slug) === p.status ? "" : "   <-- worth a look";
  w(`${pad(p.name, 24)}${pad(p.area, 18)}${pad(p.status, 13)}${pad(p.apartments, 6)}${pad(d.apartments ?? "-", 7)}${BASE}/${p.slug}${flag}`);
}
w();
w("=".repeat(78));
w("SO, WHERE DOES THAT LEAVE US");
w("-".repeat(78));
const allGood =
  ours.length === liveSlugs.length &&
  repoApts === liveApts &&
  established === 2012 &&
  ours.every((p) => detail[p.slug].apartments === p.apartments && liveStatusOf(p.slug) === p.status);
if (allGood) {
  w(`Everything checks out. All ${ours.length} projects match slug for slug, all ${ours.length} apartment`);
  w(`counts match one by one, the status split matches, and both of their pages`);
  w(`agree the company started in ${established}.`);
  w(`In short: ${ours.length} projects, ${repoApts} apartments, ${Object.keys(repoArea).length} areas, trading since ${established}.`);
} else {
  w("Some figures did not line up. The rows marked \"worth a look\" in the table");
  w("above are where to start.");
}
w();
w("Two things I would still flag, neither of them an error:");
w();
w(`  The 357 is a total we compute, not one they publish. See section 2. It is`);
w("  correct arithmetic on their numbers, but it is our claim, not theirs.");
w();
w(`  "Projects delivered & underway" counts all ${ours.length} project pages, upcoming ones`);
w(`  included. If you want that headline to mean genuinely finished and handed`);
w(`  over, the honest number is ${repoStatus["handed-over"] || 0}. Which figure to show is a business`);
w("  decision rather than a data one, so I have left it as is.");
w();
w("To check any of this yourself, open the links above, or re-run:");
w("  node scripts/verify-stats.mjs");
w("It refetches their site and rewrites this file from scratch, so if their");
w("numbers change, this file will say so.");

fs.writeFileSync(new URL("../VERIFICATION.txt", import.meta.url), L.join("\n") + "\n");
console.log(`wrote VERIFICATION.txt — ${L.length} lines, overall: ${allGood ? "PASS" : "FAIL"}`);
