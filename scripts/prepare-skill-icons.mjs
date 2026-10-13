import { mkdir, readFile, writeFile } from "node:fs/promises";

const rows = JSON.parse(
  await readFile(new URL("../app/data/skills.json", import.meta.url), "utf8"),
);
const skills = rows.flat();
await mkdir(new URL("../public/icons/skills/", import.meta.url), {
  recursive: true,
});
for (let start = 0; start < skills.length; start += 6) {
  await Promise.all(
    skills.slice(start, start + 6).map(async (skill) => {
      if (!/^\/icons\/skills\/[a-z0-9-]+\.svg$/.test(skill.icon))
        throw new Error(`Invalid icon path: ${skill.icon}`);
      const response = await fetch(skill.source, {
        signal: AbortSignal.timeout(30000),
      });
      if (!response.ok)
        throw new Error(`${skill.label}: HTTP ${response.status}`);
      const svg = await response.text();
      if (!svg.includes("<svg"))
        throw new Error(`${skill.label}: expected SVG`);
      await writeFile(new URL(`../public${skill.icon}`, import.meta.url), svg);
      console.log(`Saved ${skill.label}`);
    }),
  );
}
console.log(`${skills.length} skill logos saved locally.`);
