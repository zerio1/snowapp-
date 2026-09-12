import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

test("native loader prefers the canonical platform binding over timestamped leftovers", () => {
  const loader = readFileSync(join(process.cwd(), "native", "index.cjs"), "utf8");
  const canonical = loader.indexOf("...canonicalCandidates");
  const versioned = loader.indexOf("...platformCandidates");

  assert.ok(canonical >= 0 && versioned > canonical);
  assert.match(loader, /`snow_native\.\$\{name\}\.node`/);
  assert.match(loader, /!canonicalCandidates\.includes\(file\)/);
});

test("desktop package includes canonical bindings without Rust build caches", () => {
  const packageJson = JSON.parse(
    readFileSync(join(process.cwd(), "package.json"), "utf8"),
  ) as { build: { files: string[] } };

  assert.ok(packageJson.build.files.includes("native/index.cjs"));
  assert.ok(
    packageJson.build.files.includes("native/snow_native.win32-x64-msvc.node"),
  );
  assert.ok(
    packageJson.build.files.some((entry) => entry.includes("darwin-universal")),
  );
  assert.ok(
    packageJson.build.files.some((entry) => entry.includes("linux-x64-gnu")),
  );
  assert.ok(!packageJson.build.files.includes("native/**/*"));
  assert.ok(!packageJson.build.files.some((entry) => entry.includes("target")));
});
