import assert from "node:assert/strict";
import { resolveSiteUrl } from "../lib/site-url.mjs";

// HTTP metadata QA only. This does not certify visuals, fonts or hydration.
const base = new URL(process.env.PREVIEW_QA_URL || "http://localhost:3000");
const canonicalOrigin = resolveSiteUrl(process.env.PREVIEW_QA_CANONICAL_ORIGIN || base.origin);
function attributes(tag) {
  return Object.fromEntries([...tag.matchAll(/([\w:-]+)\s*=\s*["']([^"']*)["']/g)].map((m) => [m[1].toLowerCase(), m[2].replaceAll("&amp;", "&")]));
}
for (const path of ["/", "/privacy", "/lp"]) {
  const response = await fetch(new URL(path, base), { signal: AbortSignal.timeout(30_000) });
  assert.equal(response.status, 200, `${path}: HTTP status (check deployment protection if 401)`);
  const html = await response.text();
  const tags = [...html.matchAll(/<(?:link|meta)\b[^>]*>/gi)].map((m) => attributes(m[0]));
  const expected = new URL(path, canonicalOrigin).href;
  assert.deepEqual(tags.filter((t) => t.rel === "canonical").map((t) => new URL(t.href).href), [expected], `${path}: canonical`);
  assert.deepEqual(tags.filter((t) => t.property === "og:url").map((t) => new URL(t.content).href), [expected], `${path}: og:url`);
  assert.match(html, /<html[^>]*lang="ja"/, `${path}: document language`);
  const robots = tags.find((t) => t.name === "robots")?.content || "";
  if (path === "/lp" || process.env.PREVIEW_QA_EXPECT_NOINDEX === "1") {
    assert.match(robots, /\bnoindex\b/, `${path}: noindex`);
  }
  const assets = tags.filter((t) => ["icon", "apple-touch-icon"].includes(t.rel) || t.property === "og:image");
  for (const asset of assets) {
    const raw = asset.href || asset.content;
    if (asset.property === "og:image") assert.match(raw, /^https?:\/\//, `${path}: absolute OGP image`);
    const url = new URL(raw, base);
    // Metadata can target Production; fetch same-origin assets from the QA deployment.
    if (url.origin === canonicalOrigin) {
      url.host = base.host;
      url.protocol = base.protocol;
    }
    const image = await fetch(url, { signal: AbortSignal.timeout(30_000) });
    assert.equal(image.status, 200, `${path}: asset ${url.pathname}`);
    assert.match(image.headers.get("content-type") || "", /^image\//, `${path}: asset content type`);
  }
  console.log(`PASS ${path}: canonical, og:url, language, robots; ${assets.length} declared image/icon assets checked`);
  for (const [label, present] of [
    ["favicon", tags.some((t) => t.rel === "icon")],
    ["apple icon", tags.some((t) => t.rel === "apple-touch-icon")],
    ["OGP image", tags.some((t) => t.property === "og:image")],
  ]) if (!present) console.warn(`BLOCKED ${path}: ${label} not declared in current repository`);
}
console.log("Metadata QA passed. Frozen visual regression, Japanese font loading and hydration require separate browser QA.");
