import path from "node:path";
import { readdir, copyFile } from "node:fs/promises";
const root = path.resolve("out");
let copied = 0;
async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) await walk(target);
    else if (entry.name.endsWith(".txt")) {
      const parts = path.relative(root, target).split(path.sep);
      const index = parts.findIndex((part) => part.startsWith("__next."));
      if (index >= 0 && index < parts.length - 1) {
        const destination = path.join(
          root,
          ...parts.slice(0, index),
          parts.slice(index).join("."),
        );
        await copyFile(target, destination);
        copied++;
      }
    }
  }
}
await walk(root);
console.log(`Prepared ${copied} static navigation payloads for hosting.`);
