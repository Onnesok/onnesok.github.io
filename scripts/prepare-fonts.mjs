import { mkdir, writeFile } from "node:fs/promises";
await mkdir("public/fonts", { recursive: true });
const url =
  "https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700&family=DM+Sans:wght@400..700&family=Instrument+Serif:ital@0;1&display=swap";
const response = await fetch(url, {
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
  },
});
if (!response.ok) throw new Error(`Font stylesheet: ${response.status}`);
const css = await response.text();
const fonts = css.match(/@font-face\s*\{[^}]+\}/g) || [];
for (const block of fonts) {
  if (!block.includes("U+0000-00FF")) continue;
  const family = block.match(/font-family:\s*'([^']+)'/)[1];
  const style = block.match(/font-style:\s*([^;]+);/)[1];
  const weight = block.match(/font-weight:\s*([^;]+);/)[1];
  const remote = block.match(/url\(([^)]+)\)/)[1];
  const filename = `${family.toLowerCase().replaceAll(" ", "-")}-${style}-${weight.replaceAll(" ", "-")}.woff2`;
  const asset = await fetch(remote);
  if (!asset.ok) throw new Error(`Font file: ${asset.status}`);
  await writeFile(
    `public/fonts/${filename}`,
    Buffer.from(await asset.arrayBuffer()),
  );
  console.log(
    `@font-face{font-family:'${family}';font-style:${style};font-weight:${weight};font-display:swap;src:url('/fonts/${filename}') format('woff2')}`,
  );
}
