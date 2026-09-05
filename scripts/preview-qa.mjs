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

const BASE = process.argv[2];
const EXEC = process.env.PUPPETEER_EXECUTABLE_PATH;
if (!BASE || !EXEC) {
  console.error("usage: PUPPETEER_EXECUTABLE_PATH=... node scripts/preview-qa.mjs <url>");
  process.exit(1);
}

const WIDTHS = [320, 768, 1440];
const PATHS = ["/", "/privacy"];

const probe = () => {
  const all = [...document.querySelectorAll("*")];
  const cs = (e) => getComputedStyle(e);
  const RED = /rgb\(\s*(120,\s*21,\s*34|165,\s*31,\s*50|77,\s*11,\s*19)\s*\)/;
  const header = document.querySelector("header");
  const h1 = document.querySelector("h1");
  return {
    headerH: header ? +header.getBoundingClientRect().height.toFixed(1) : null,
    overflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    weightGE600: all.filter((e) => parseInt(cs(e).fontWeight, 10) >= 600).length,
    radii: [...new Set(all.map((e) => cs(e).borderRadius).filter((r) => r !== "0px"))].sort(),
    shadows: all.filter((e) => cs(e).boxShadow !== "none").length,
    blurs: all.filter((e) => cs(e).backdropFilter !== "none" || cs(e).filter.includes("blur")).length,
    transitions: [...new Set(all.map((e) => cs(e).transitionDuration).filter((d) => d !== "0s"))].sort(),
    redElements: all.filter((e) => RED.test(cs(e).backgroundColor) || RED.test(cs(e).color)).length,
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

let failures = 0;
for (const path of PATHS) {
  for (const width of WIDTHS) {
    const page = await browser.newPage();
    await page.setViewport({ width, height: 900, deviceScaleFactor: 2 });
    const res = await page.goto(BASE + path, { waitUntil: "networkidle0", timeout: 60000 });
    await page.evaluate(() => document.fonts?.ready);
    const m = await page.evaluate(probe);

    const bad = [];
    if (![200, 304].includes(res.status())) bad.push(`status=${res.status()}`);
    if (m.headerH !== EXPECT.headerH) bad.push(`headerH=${m.headerH}`);
    if (m.overflowX !== 0) bad.push(`overflowX=${m.overflowX}`);
    if (m.weightGE600 !== 0) bad.push(`weight>=600=${m.weightGE600}`);
    if (m.shadows !== 0) bad.push(`shadows=${m.shadows}`);
    if (m.blurs !== 0) bad.push(`blurs=${m.blurs}`);
    if (m.transitions.some((t) => !EXPECT.transitions.includes(t))) bad.push(`transitions=${m.transitions}`);
    if (m.radii.some((r) => !EXPECT.radiiAllowed.includes(r))) bad.push(`radii=${m.radii}`);
    if (m.redElements > 2) bad.push(`red=${m.redElements}`);
    if (m.notoLoaded === false) bad.push("Noto Sans JP 未配信");

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
process.exit(failures ? 1 : 0);
