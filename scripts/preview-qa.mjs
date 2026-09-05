/**
 * Preview / Production デプロイ後の検証スクリプト。
 *
 *   PUPPETEER_EXECUTABLE_PATH=/path/to/chrome \
 *   node scripts/preview-qa.mjs https://<preview-url>
 *
 * Visual System v1.0（NEUMANN_DESIGN.md）の不変条件を実測で確認する。
 * デザイン変更の検討には使わない。回帰の検出のみに使う。
 */
import puppeteer from "puppeteer-core";
import { mkdir, writeFile } from "node:fs/promises";

const BASE = process.argv[2];
const EXEC = process.env.PUPPETEER_EXECUTABLE_PATH;
if (!BASE || !EXEC) {
  console.error("usage: PUPPETEER_EXECUTABLE_PATH=... node scripts/preview-qa.mjs <url>");
  process.exit(1);
}

const WIDTHS = [320, 768, 1440];
const PATHS = ["/", "/privacy"];

const probe = () => {
  const all = [...document.querySelectorAll("body *")].filter((e) => !e.closest("vercel-live-feedback"));
  const cs = (e) => getComputedStyle(e);
  const visible = all.filter((e) => {
    const r = e.getBoundingClientRect();
    return r.width > 0 && r.height > 0 && r.bottom > 0 && r.top < innerHeight &&
      r.right > 0 && r.left < innerWidth && cs(e).visibility !== "hidden";
  });
  const styles = all.flatMap((e) => [cs(e), ...["::before", "::after"].map((p) => getComputedStyle(e, p)).filter((s) => !["none", "normal"].includes(s.content))]);
  const RED = /rgb\(\s*(120,\s*21,\s*34|165,\s*31,\s*50|77,\s*11,\s*19)\s*\)/;
  const header = document.querySelector("header");
  const h1 = document.querySelector("h1");
  return {
    headerH: header ? +header.getBoundingClientRect().height.toFixed(1) : null,
    headerToken: cs(document.documentElement).getPropertyValue("--header-h").trim(),
    canvas: cs(document.body).backgroundColor,
    overflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    weightGE600: all.filter((e) => parseInt(cs(e).fontWeight, 10) >= 600).length,
    radii: [...new Set(all.map((e) => cs(e).borderRadius).filter((r) => r !== "0px"))].sort(),
    shadows: styles.filter((s) => s.boxShadow !== "none").length,
    blurs: styles.filter((s) => s.backdropFilter !== "none" || s.filter.includes("blur")).length,
    gradients: styles.filter((s) => s.backgroundImage.includes("gradient")).length,
    animations: styles.filter((s) => s.animationName !== "none").length,
    rowRadii: all.filter((e) => e.matches("article, main section, dl, form") && cs(e).borderRadius !== "0px").length,
    invalidRadii: all.filter((e) => {
      const r = cs(e).borderRadius;
      return r !== "0px" && !(r === "4px" && e.matches("a, button, input, select, textarea")) &&
        !(r === "9999px" && e.matches('li') && e.closest('[aria-label="ステータス"]'));
    }).length,
    transitions: [...new Set(all.map((e) => cs(e).transitionDuration).filter((d) => d !== "0s"))].sort(),
    redElements: visible.filter((e) => [cs(e).backgroundColor, cs(e).color, cs(e).fill, cs(e).stroke, cs(e).borderColor].some((c) => RED.test(c))).length,
    // 日本語フォントが実際に配信されているか（フォールバックとの判別）
    // document.fonts.check() は OS にインストール済みの同名フォントでも true を返すため
    // 配信確認には使えない。@font-face 由来の FontFace が読み込まれたかで判定する。
    notoLoaded: document.fonts
      ? [...document.fonts].some(
          (f) => /noto sans jp/i.test(f.family) && f.status === "loaded"
        )
      : null,
    // Geist は next/font/local により生成名になるため、読み込み済みフォント名で判定する
    geistLoaded: document.fonts
      ? [...document.fonts].some((f) => /geist/i.test(f.family) && f.status === "loaded")
      : null,
    h1Family: h1 ? cs(h1).fontFamily : null,
  };
};

const EXPECT = {
  headerH: 64,
  overflowX: 0,
  weightGE600: 0,
  shadows: 0,
  blurs: 0,
  transitions: ["0.18s"],
  radiiAllowed: ["4px", "9999px"],
};

const browser = await puppeteer.launch({
  executablePath: EXEC,
  headless: "new",
  args: ["--no-sandbox", "--hide-scrollbars"],
});

await mkdir("qa-results", { recursive: true });
const results = [];
let failures = 0;
for (const path of PATHS) {
  for (const width of WIDTHS) {
    const page = await browser.newPage();
    const runtimeErrors = [];
    const fontResponses = [];
    const fontFailures = [];
    page.on("pageerror", (error) => runtimeErrors.push(error.message));
    page.on("response", (res) => {
      if (/fonts\.(googleapis|gstatic)\.com/.test(res.url())) fontResponses.push({ url: res.url(), status: res.status() });
    });
    page.on("requestfailed", (req) => {
      if (/fonts\.(googleapis|gstatic)\.com/.test(req.url())) fontFailures.push({ url: req.url(), error: req.failure()?.errorText });
    });
    await page.setViewport({ width, height: 900, deviceScaleFactor: 2 });
    const res = await page.goto(BASE + path, { waitUntil: "networkidle0", timeout: 60000 });
    await page.evaluate(() => document.fonts?.ready);
    const m = await page.evaluate(probe);

    const bad = [];
    if (![200, 304].includes(res.status())) bad.push(`status=${res.status()}`);
    if (m.headerH !== EXPECT.headerH) bad.push(`headerH=${m.headerH}`);
    if (m.headerToken !== "64px") bad.push(`--header-h=${m.headerToken}`);
    if (m.canvas !== "rgb(8, 8, 8)") bad.push(`canvas=${m.canvas}`);
    if (m.overflowX !== 0) bad.push(`overflowX=${m.overflowX}`);
    if (m.weightGE600 !== 0) bad.push(`weight>=600=${m.weightGE600}`);
    if (m.shadows !== 0) bad.push(`shadows=${m.shadows}`);
    if (m.blurs !== 0) bad.push(`blurs=${m.blurs}`);
    for (const key of ["gradients", "animations", "rowRadii", "invalidRadii"]) {
      if (m[key] !== 0) bad.push(`${key}=${m[key]}`);
    }
    if (m.transitions.some((t) => !EXPECT.transitions.includes(t))) bad.push(`transitions=${m.transitions}`);
    if (m.radii.some((r) => !EXPECT.radiiAllowed.includes(r))) bad.push(`radii=${m.radii}`);
    if (m.redElements > 2) bad.push(`red=${m.redElements}`);
    if (m.notoLoaded === false) bad.push("Noto Sans JP 未配信");
    if (m.geistLoaded !== true) bad.push("Geist 未配信");
    if (runtimeErrors.length) bad.push(`runtime=${runtimeErrors.join("; ")}`);

    // Check the fixed-header red budget and motion at each section while scrolling.
    const scrollChecks = [];
    for (const y of await page.evaluate(() => [...document.querySelectorAll("main section, footer")].map((e) => e.getBoundingClientRect().top + scrollY))) {
      await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), y);
      scrollChecks.push(await page.evaluate(probe));
    }
    if (scrollChecks.some((s) => s.redElements > 2 || s.overflowX !== 0 || s.animations !== 0)) bad.push("scroll regression");
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));

    if (width === 320) {
      await page.click('button[aria-controls="mobile-menu"]');
      const menu = await page.evaluate(probe);
      const locked = await page.evaluate(() => document.body.style.overflow === "hidden");
      if (!locked || menu.headerH !== 64 || menu.overflowX || menu.redElements > 2) bad.push("mobile menu regression");
      await page.keyboard.press("Escape");
      if (await page.evaluate(() => document.body.style.overflow === "hidden")) bad.push("mobile scroll lock not restored");
      // The accessibility focus ring is expected while the menu button is focused.
      await page.evaluate(() => document.activeElement?.blur());
    }

    const metadata = await page.evaluate(() => ({
      icons: [...document.querySelectorAll('link[rel="icon"],link[rel="apple-touch-icon"]')].map((e) => e.href),
      og: document.querySelector('meta[property="og:image"]')?.content,
    }));
    if (metadata.icons.length < 2 || !metadata.og?.startsWith("http")) bad.push("missing icons/absolute OGP");
    for (const url of [...metadata.icons, metadata.og].filter(Boolean)) {
      const asset = await page.goto(url, { waitUntil: "load", timeout: 30000 });
      if (asset.status() !== 200 || !asset.headers()["content-type"]?.startsWith("image/")) bad.push(`asset failed: ${url}`);
    }
    await page.goto(BASE + path, { waitUntil: "networkidle0", timeout: 60000 });
    await page.evaluate(() => document.fonts?.ready);
    await page.screenshot({ path: `qa-results/${path === "/" ? "home" : "privacy"}-${width}.png`, fullPage: true });
    results.push({ path, width, measurements: m, scrollChecks, metadata, fontResponses, fontFailures, runtimeErrors, failures: bad });

    failures += bad.length ? 1 : 0;
    console.log(
      `${bad.length ? "FAIL" : "ok  "} ${path.padEnd(9)} ${String(width).padStart(4)} ` +
        `header=${m.headerH} ovf=${m.overflowX} red=${m.redElements} radii=${m.radii.join(",")} ` +
        `noto=${m.notoLoaded}${bad.length ? "  << " + bad.join(", ") : ""}`
    );
    await page.close();
  }
}

await browser.close();
await writeFile("qa-results/results.json", JSON.stringify(results, null, 2));
process.exit(failures ? 1 : 0);
