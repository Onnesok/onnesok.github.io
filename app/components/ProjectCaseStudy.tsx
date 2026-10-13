import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Github,
  ExternalLink,
  Play,
  Download,
} from "lucide-react";
import type { FeaturedProject } from "../data/projects";
import { hardwareProjects, softwareProjects } from "../data/projects";
import { cleanText, mediaPath } from "../data/media";
import AnimatedTitle from "./AnimatedTitle";

export default function ProjectCaseStudy({
  project,
}: {
  project: FeaturedProject;
}) {
  const collection =
    project.category === "hardware" ? hardwareProjects : softwareProjects;
  const next =
    collection[
      (collection.findIndex((item) => item.slug === project.slug) + 1) %
        collection.length
    ];
  const actions = [
    project.websiteUrl && {
      title: "Visit website",
      href: project.websiteUrl,
      icon: ExternalLink,
    },
    project.demoUrl &&
      project.demoUrl !== project.websiteUrl && {
        title: "Try the demo",
        href: project.demoUrl,
        icon: Play,
      },
    project.videoId && {
      title: "Watch the demo",
      href: `https://www.youtube.com/watch?v=${project.videoId}`,
      icon: Play,
    },
    project.playStoreUrl && {
      title: "Get on Google Play",
      href: project.playStoreUrl,
      icon: Download,
    },
    project.githubUrl && {
      title: "Source code",
      href: project.githubUrl,
      icon: Github,
    },
    project.facebookUrl && {
      title: "Project on Facebook",
      href: project.facebookUrl,
      icon: ExternalLink,
    },
    project.instagramUrl && {
      title: "Project on Instagram",
      href: project.instagramUrl,
      icon: ExternalLink,
    },
  ].filter((action) => !!action);
  return (
    <article className="detail-page page-width">
      <div className="detail-topline">
        <Link href="/#projects">
          <ArrowLeft size={15} /> Back to the workshop
        </Link>
        <span>
          {project.category === "hardware"
            ? "PHYSICAL EXPLORATION"
            : "DIGITAL EXPLORATION"}{" "}
          / {project.categoryLabel}
        </span>
      </div>
      <div className="detail-heading">
        <div>
          <span className="detail-label">
            {project.categoryLabel || project.category}
          </span>
          <AnimatedTitle as="h1" text={project.title} />
        </div>
        <p>{cleanText(project.description)}</p>
      </div>
      <div className={`detail-visual ${project.category}`}>
        <Image
          src={mediaPath(project.imageUrl)}
          alt={project.title}
          fill
          priority
          sizes="100vw"
        />
      </div>
      {!!actions.length && (
        <div className="detail-actions">
          {actions.map((action) => (
            <a
              href={action.href}
              target="_blank"
              rel="noopener noreferrer"
              className="pill-button"
              key={action.title}
            >
              <action.icon size={15} />
              {action.title}
              <ArrowUpRight size={15} />
            </a>
          ))}
        </div>
      )}
      <div className="detail-body">
        <div className="detail-copy">
          <section>
            <h2>The idea.</h2>
            {(project.longDescription || project.description)
              .split("\n\n")
              .map((paragraph, index) => (
                <p key={index}>{cleanText(paragraph)}</p>
              ))}
          </section>
          {!!project.features?.length && (
            <section>
              <h2>
                {project.category === "hardware"
                  ? "Inside the system."
                  : "What it does."}
              </h2>
              <ul className="detail-features">
                {project.features.map((feature) => (
                  <li key={feature}>{cleanText(feature)}</li>
                ))}
              </ul>
            </section>
          )}
          {!!project.gallery?.length && (
            <section>
              <h2>A closer look.</h2>
              <div className="detail-gallery">
                {project.gallery.map((image, index) => (
                  <div key={`${image}-${index}`}>
                    <Image
                      src={mediaPath(image)}
                      alt={`${project.title}: ${project.category === "hardware" ? "hardware" : "interface"} view ${index + 1}`}
                      fill
                      sizes="(max-width:760px) 100vw, 65vw"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
        <aside className="detail-stack">
          <span className="detail-label">TOOLS OF THE TRADE</span>
          <h3>Built with</h3>
          <div className="work-tags">
            {project.technologies.map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>
          <div style={{ marginTop: 35 }}>
            <span className="detail-label">COLLECTION</span>
            <p className="muted">
              {project.category === "hardware"
                ? "Hardware & robotics"
                : "Software & games"}
            </p>
          </div>
        </aside>
      </div>
      <div className="detail-related">
        <p>There’s another idea around the corner.</p>
        <Link
          className="pill-button"
          href={`/projects/${next.category}/${next.slug}/`}
        >
          Next: {next.title}
          <ArrowUpRight size={16} />
        </Link>
      </div>
    </article>
  );
}
