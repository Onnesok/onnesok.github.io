const { statSync } = require("node:fs");
const path = require("node:path");
const { globSync: glob } = require("glob");

// Next.js uses only globSync(pattern, { onlyDirectories: true }) from fast-glob.
// Preserve that API with glob, avoiding fast-glob's unpatched braces dependency.
function globSync(pattern, { onlyDirectories = false, ...options } = {}) {
  const matches = glob(pattern, options);
  if (!onlyDirectories) return matches;
  return matches.filter((match) => {
    try {
      return statSync(path.resolve(options.cwd || process.cwd(), match)).isDirectory();
    } catch {
      return false;
    }
  });
}

module.exports = { globSync };
