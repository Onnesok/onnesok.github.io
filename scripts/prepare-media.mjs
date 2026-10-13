import sharp from "sharp";
import { readdir, mkdir } from "node:fs/promises";
import path from "node:path";
async function convert(directory) {
  for (const item of await readdir(directory, { withFileTypes: true })) {
    const source = path.join(directory, item.name);
    if (item.isDirectory()) await convert(source);
    else if (/\.(png|jpe?g)$/i.test(item.name))
      await sharp(source)
        .rotate()
        .resize({ width: 1400, withoutEnlargement: true })
        .webp({ quality: 83 })
        .toFile(source.replace(/\.(png|jpe?g)$/i, ".webp"));
  }
}
await convert(path.resolve("public/projects"));
await mkdir("public/design", { recursive: true });
if (process.argv[2]) {
  await sharp(process.argv[2])
    .resize({ width: 2000, withoutEnlargement: true })
    .webp({ quality: 88 })
    .toFile("public/design/workshop.webp");
  await sharp(process.argv[2])
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile("public/design/workshop-small.webp");
}
console.log("Optimized project images and workshop artwork ready.");
if (process.argv[3]) {
  await sharp(process.argv[3]).resize({ height: 1500, withoutEnlargement: true }).webp({ quality: 88 }).toFile('public/design/pixi-cutout.webp');
  console.log('Transparent Pixi exhibit image ready.');
}
