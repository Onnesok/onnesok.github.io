import sharp from "sharp";
import { mkdir } from "node:fs/promises";
await mkdir("public/design", { recursive: true });
for (const [name, source] of [
  [
    "research",
    "C:/Users/ASUS/.codex/generated_images/01a13434-0199-73e0-87ff-aa77cf6fbdf3/exec-13d654f4-5be3-4159-aad4-38cbc4787f9d.png",
  ],
  [
    "about",
    "C:/Users/ASUS/.codex/generated_images/01a13434-0199-73e0-87ff-aa77cf6fbdf3/exec-fd3265ba-ab0d-4301-8082-80f3db462c84.png",
  ],
  [
    "contact",
    "C:/Users/ASUS/.codex/generated_images/01a13434-0199-73e0-87ff-aa77cf6fbdf3/exec-46a92997-e858-4cf9-908a-cb46b0405d32.png",
  ],
]) {
  await sharp(source)
    .resize({ width: 1800, withoutEnlargement: true })
    .webp({ quality: 86 })
    .toFile(`public/design/${name}.webp`);
  console.log(`${name} scene saved.`);
}
