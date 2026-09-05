import assert from "node:assert/strict";
import test from "node:test";
import { resolveSiteUrl, validateProductionSiteUrl } from "../lib/site-url.mjs";

test("explicit origin wins, with whitespace and trailing slash normalized", () => {
  assert.equal(resolveSiteUrl(" https://example.org/ ", "preview.vercel.app"), "https://example.org");
});
test("preview hostname and HTTPS URL resolve identically", () => {
  for (const value of ["preview.vercel.app", "https://preview.vercel.app/"]) {
    assert.equal(resolveSiteUrl("", value), "https://preview.vercel.app");
  }
});
test("local fallback needs no Vercel variables", () => {
  assert.equal(resolveSiteUrl(), "http://localhost:3000");
});
for (const value of ["relative", "ftp://example.org", "https://user:pass@example.org", "https://example.org/path", "https://example.org/?x=1", "https://example.org/#x"]) {
  test(`reject malformed origin: ${value}`, () => assert.throws(() => resolveSiteUrl(value)));
}
for (const value of [undefined, "", "https://preview.vercel.app", "https://PREVIEW.VERCEL.APP./", "http://example.org", "https://localhost", "https://127.0.0.1", "https://[::1]", "https://company.test", "https://example.com", "https://company.example", "https://example.org:444"]) {
  test(`Production refuses unsafe/missing domain: ${value}`, () => {
    for (const environment of [{ VERCEL_ENV: "production" }, { DEPLOYMENT_ENV: "production" }]) {
      assert.throws(() => validateProductionSiteUrl({ ...environment, NEXT_PUBLIC_SITE_URL: value }));
    }
  });
}
test("a real HTTPS origin is accepted by the structural guard", () => {
  // This fixture tests validation only. It is never a deployment setting.
  assert.doesNotThrow(() => validateProductionSiteUrl({ VERCEL_ENV: "production", NEXT_PUBLIC_SITE_URL: "https://github.com" }));
});
test("Preview and ordinary local production-mode builds do not require an official domain", () => {
  assert.doesNotThrow(() => validateProductionSiteUrl({ VERCEL_ENV: "preview" }));
  assert.doesNotThrow(() => validateProductionSiteUrl({ NODE_ENV: "production" }));
});
