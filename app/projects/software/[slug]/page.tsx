import type { Metadata } from "next";
import { softwareProjects } from "../../../data/projects";
import { notFound } from "next/navigation";
import ProjectCaseStudy from "../../../components/ProjectCaseStudy";
export function generateStaticParams() {
  return softwareProjects.map((project) => ({ slug: project.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = softwareProjects.find((item) => item.slug === slug);
  return project
    ? {
        title: project.title,
        description: project.description,
        openGraph: { images: [project.imageUrl] },
      }
    : {};
}
export default async function SoftwareProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = softwareProjects.find((item) => item.slug === slug);
  if (!project) notFound();
  return <ProjectCaseStudy project={project} />;
}
