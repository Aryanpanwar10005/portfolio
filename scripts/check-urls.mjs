// Checks that search engines can still reach every page:
// - every sitemap URL returns 200 directly, with no redirect
// - every old URL in legacy-urls.json redirects to its expected page, which returns 200
// Old URLs come from Search Console and Bing data (Oct 2026). Add new ones there
// whenever a page moves, so a later change can't quietly turn them into 404s.
//
// Usage: node scripts/check-urls.mjs [baseUrl]   (default https://aryanpanwar.in)
import fs from 'fs';

const base = (process.argv[2] || 'https://aryanpanwar.in').replace(/\/$/, '');
const legacy = JSON.parse(fs.readFileSync(new URL('./legacy-urls.json', import.meta.url), 'utf8'));
const MAX_HOPS = 3;

// Follows redirects one hop at a time so the hop count is known.
async function resolve(path) {
  let url = base + path;
  for (let hops = 0; hops <= MAX_HOPS; hops++) {
    const res = await fetch(url, { redirect: 'manual' });
    if (res.status < 300 || res.status >= 400) return { status: res.status, hops, url };
    url = new URL(res.headers.get('location'), url).href;
  }
  return { status: 'too many redirects', hops: MAX_HOPS + 1, url };
}

const failures = [];

const sitemap = await (await fetch(base + '/sitemap.xml')).text();
const pages = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
if (!pages.length) failures.push('sitemap.xml has no URLs');
for (const path of pages) {
  const r = await resolve(path);
  if (r.status !== 200 || r.hops) failures.push(`sitemap ${path}: ${r.status} after ${r.hops} redirect(s)`);
}

for (const [from, to] of Object.entries(legacy)) {
  const r = await resolve(from);
  const landed = r.url.slice(base.length) || '/';
  if (r.status !== 200 || landed !== to) failures.push(`legacy ${from}: ${r.status} at ${landed}, expected 200 at ${to}`);
}

console.log(`Checked ${pages.length} sitemap URLs and ${Object.keys(legacy).length} old URLs on ${base}`);
if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}
console.log('All URLs OK');
