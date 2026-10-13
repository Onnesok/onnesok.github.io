import type { MetadataRoute } from "next";
import { hardwareProjects, softwareProjects } from "./data/projects";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://onnesok.github.io";
  return [
    { url: base, priority: 1 },
    { url: `${base}/projects/`, priority: 0.8 },
    { url: `${base}/awards/`, priority: 0.6 },
    ...[...hardwareProjects, ...softwareProjects].map((project) => ({
      url: `${base}/projects/${project.category}/${project.slug}/`,
      priority: 0.7,
    })),
  ];
}
