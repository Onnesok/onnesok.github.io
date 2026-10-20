import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { realpathSync } from "node:fs";
import path from "node:path";

const require = createRequire(import.meta.url);
const pluginRequire = createRequire(require.resolve("@next/eslint-plugin-next"));
assert.equal(
  realpathSync(pluginRequire.resolve("fast-glob")),
  realpathSync(path.resolve("tools/next-eslint-glob/index.cjs")),
  "Next.js must use the patched glob adapter",
);
const { getRootDirs } = pluginRequire("./utils/get-root-dirs.js");
const cwd = process.cwd();
const normalize = (dirs) => dirs.map((dir) => path.resolve(dir)).sort();
const cases = [
  [undefined, [cwd]],
  [cwd, [cwd]],
  ["app", ["app"]],
  ["{app,lib,scripts}", ["app", "lib", "scripts"]],
  [["app", "lib"], ["app", "lib"]],
  ["package.json", []],
  ["missing-project-root", []],
];
for (const [rootDir, expected] of cases) {
  const actual = getRootDirs({ cwd, settings: { next: { rootDir } } });
  assert.deepEqual(normalize(actual), normalize(expected));
}
console.log("Next.js lint project-root glob compatibility: 7 checks passed.");
