import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";

// Approved source assets from acd420a. Replacements require brand review.
for (const [path, digest, dimensions] of [
  ["app/apple-icon.png", "4cd97f044012a269525395c1e194986ed34c13da5178dc9cc3f4297dc8329223", [180, 180]],
  ["app/opengraph-image.png", "8ed4754d6cb93c22def4844093143b0915217b854330043b385858baa55c3e9d", [1200, 630]],
  ["app/icon.svg", "e5f395c538210e3eb715b5964c631f187a5a1995947c7bd22bdd5c4e95b1c812", null],
]) {
  test(`approved asset: ${path}`, () => {
    const data = readFileSync(path);
    assert.equal(createHash("sha256").update(data).digest("hex"), digest);
    if (dimensions) {
      assert.equal(data.subarray(1, 4).toString(), "PNG");
      assert.deepEqual([data.readUInt32BE(16), data.readUInt32BE(20)], dimensions);
    }
  });
}

test("legacy routes and design components remain removed", () => {
  for (const path of ["app/lp", "components/Reveal.tsx", "components/BackdropContours.tsx", "components/Logomark.tsx", "components/corporate/Positioning.tsx", "components/corporate/ProjectCard.tsx", "components/corporate/ServiceCard.tsx", "lib/content.ts"]) {
    assert.equal(existsSync(path), false, path);
  }
});

test("NM symbol paths match the approved favicon", () => {
  const paths = (file) => [...readFileSync(file, "utf8").matchAll(/\bd="([^"]+)"/g)].map((m) => m[1].trim());
  assert.deepEqual(paths("components/brand/NeuMannMark.tsx"), paths("app/icon.svg"));
  assert.ok(readFileSync("app/opengraph-image.alt.txt", "utf8").trim());
});
