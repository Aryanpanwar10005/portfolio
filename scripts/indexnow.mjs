// Tells IndexNow engines (Bing, Yandex, Seznam, Naver and others) that pages
// changed, so they recrawl them soon. Run it by hand after a deploy goes live:
//
//   npm run index:now -- /writing/some-post /case-studies/fitwardrobe
//   npm run index:now -- https://aryanpanwar.in/privacy
//
// The key is the public file public/<key>.txt, which IndexNow fetches from the
// live site to verify ownership. Google does not use IndexNow; request
// indexing for Google by hand in Search Console.
import fs from 'node:fs';

const HOST = 'aryanpanwar.in';
const keyFile = fs
  .readdirSync(new URL('../public/', import.meta.url))
  .find((f) => /^[a-f0-9]{32}\.txt$/.test(f));
if (!keyFile) {
  console.error('No IndexNow key file (32 hex characters + .txt) found in public/.');
  process.exit(1);
}
const key = keyFile.replace('.txt', '');

const urls = process.argv
  .slice(2)
  .map((u) => (u.startsWith('http') ? u : `https://${HOST}${u.startsWith('/') ? '' : '/'}${u}`));
if (urls.length === 0) {
  console.error('Pass at least one URL or path, e.g. npm run index:now -- /privacy');
  process.exit(1);
}
const foreign = urls.filter((u) => new URL(u).host !== HOST);
if (foreign.length) {
  console.error(`Only ${HOST} URLs can be submitted: ${foreign.join(', ')}`);
  process.exit(1);
}

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key, keyLocation: `https://${HOST}/${keyFile}`, urlList: urls }),
});
// 200 = accepted, 202 = accepted, key check pending. Anything else is an error.
console.log(`IndexNow: HTTP ${res.status} for ${urls.length} URL(s)`);
if (res.status !== 200 && res.status !== 202) {
  console.error(await res.text());
  process.exit(1);
}
