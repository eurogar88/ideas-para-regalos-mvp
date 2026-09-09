'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');

function filesUnder(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) return filesUnder(absolute);
    return [absolute];
  });
}

const htmlFiles = filesUnder(root).filter((file) => path.basename(file) === 'index.html');
assert.equal(htmlFiles.length, 28, `expected 28 public index pages, got ${htmlFiles.length}`);

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8');
  const relative = path.relative(root, file);
  assert.match(html, /<html\s+lang="[a-z]{2}"/, `${relative} is missing a valid language`);
  assert.match(html, /\/theme\.js\?v=theme-1/, `${relative} is missing the theme runtime`);
  assert.match(html, /\/analytics\.js\?v=analytics-4/, `${relative} is missing shared analytics`);
  assert.match(html, /styles\.css\?v=growth-ui-16/, `${relative} points to an old stylesheet`);
  assert.doesNotMatch(html, /Tu elección|Yo elegiría|Compartir el reto|Compartir reto|radar/i, `${relative} contains retired product copy`);
  const structuredData = [...html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)];
  for (const match of structuredData) {
    assert.doesNotThrow(() => JSON.parse(match[1].trim()), `${relative} has invalid JSON-LD`);
  }
}

const rootHtml = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
for (const language of ['es', 'en', 'de', 'fr', 'it', 'x-default']) {
  assert.match(rootHtml, new RegExp(`hreflang="${language}"`), `root is missing ${language} hreflang`);
}
for (const language of ['en', 'de', 'fr', 'it']) {
  const localized = fs.readFileSync(path.join(root, language, 'index.html'), 'utf8');
  assert.match(localized, new RegExp(`rel="canonical" href="https://regalazo\\.xyz/${language}/"`));
  assert.match(localized, /hreflang="x-default"/);
}

const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
for (const url of ['/', '/en/', '/de/', '/fr/', '/it/', '/como-funciona/']) {
  assert.match(sitemap, new RegExp(`https://regalazo\\.xyz${url.replaceAll('/', '\\/')}`), `sitemap is missing ${url}`);
}

const netlify = fs.readFileSync(path.join(root, 'netlify.toml'), 'utf8');
assert.match(netlify, /Content-Security-Policy/);
assert.match(netlify, /from = "https:\/\/ideas-para-regalos-mvp\.netlify\.app\/\*"[\s\S]*to = "https:\/\/regalazo\.xyz\/:splat"[\s\S]*status = 301/);
assert.match(netlify, /from = "\/README\.md"[\s\S]*status = 404/);
assert.match(netlify, /from = "\/docs\/\*"[\s\S]*status = 404/);
assert.match(netlify, /from = "\/docs"[\s\S]*status = 404/);
assert.match(netlify, /from = "\/tests\/\*"[\s\S]*status = 404/);
assert.match(netlify, /from = "\/tests"[\s\S]*status = 404/);
assert.match(netlify, /from = "\/\.git\/\*"[\s\S]*status = 404/);

const serviceWorker = fs.readFileSync(path.join(root, 'sw.js'), 'utf8');
assert.match(serviceWorker, /regalazo-shell-growth-v11/);
assert.match(serviceWorker, /event\.request\.mode === 'navigate'/);
assert.match(serviceWorker, /fetch\(event\.request\)/);
assert.match(serviceWorker, /analytics\.js\?v=analytics-4/);

const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
assert.match(app, /value: 'any', label: 'Cualquiera'/);
assert.match(app, /data-feedback="owned"/);
assert.match(app, /data-feedback="not-fit"/);
assert.match(app, /params\.set\('ideas'/);
assert.match(app, /function affiliateTagFor/);
assert.match(app, /rel="sponsored nofollow noopener"/);

console.log(`PASS: ${htmlFiles.length} HTML pages, JSON-LD, hreflang, sitemap, CSP, cache and retired-copy checks`);
