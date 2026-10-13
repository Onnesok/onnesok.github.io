"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Search, X } from "lucide-react";
import { hardwareProjects, softwareProjects } from "../data/projects";
import { mediaPath } from "../data/media";

const allProjects = [...hardwareProjects, ...softwareProjects];
const filters = ["All projects", "Hardware", "Software", "Games"] as const;

export default function WorkExplorer() {
  const [filter, setFilter] =
    useState<(typeof filters)[number]>("All projects");
  const [query, setQuery] = useState("");
  const matches = allProjects.filter((project) => {
    const categoryMatch =
      filter === "All projects" ||
      (filter === "Hardware" && project.category === "hardware") ||
      (filter === "Software" &&
        project.category === "software" &&
        project.categoryLabel !== "Game") ||
      (filter === "Games" && project.categoryLabel === "Game");
    return (
      categoryMatch &&
      `${project.title} ${project.description} ${project.technologies.join(" ")}`
        .toLowerCase()
        .includes(query.trim().toLowerCase())
    );
  });

  return (
    <section className="project-catalog" aria-label="Project collection">
      <div className="work-toolbar">
        <div className="filter-list" role="group" aria-label="Filter projects">
          {filters.map((name) => (
            <button
              key={name}
              className={filter === name ? "active" : ""}
              aria-pressed={filter === name}
              onClick={() => setFilter(name)}
            >
              {name}
            </button>
          ))}
        </div>
        <label className="project-search">
          <Search size={17} aria-hidden="true" />
          <span className="sr-only">Search projects</span>
          <input
            placeholder="Find a project or technology"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          {query && (
            <button aria-label="Clear search" onClick={() => setQuery("")}>
              <X size={16} />
            </button>
          )}
        </label>
      </div>
      <p className="catalog-result-count" role="status">
        {matches.length} selected{" "}
        {matches.length === 1 ? "project" : "projects"}
        {filter !== "All projects" ? ` · ${filter}` : ""}
      </p>
      <div className="project-catalog-grid">
        {matches.map((project) => (
          <Link
            href={`/projects/${project.category}/${project.slug}/`}
            key={project.slug}
            className="work-card catalog-project"
          >
            <div className="catalog-image">
              <Image
                src={mediaPath(project.imageUrl)}
                alt={project.title}
                fill
                sizes="(max-width:600px) 90vw, (max-width:1024px) 45vw, 30vw"
              />
              <span className="catalog-project-arrow">
                <ArrowUpRight size={19} aria-hidden="true" />
              </span>
            </div>
            <div className="catalog-project-copy">
              <span className="sculpted-category">{project.categoryLabel}</span>
              <h2>{project.title}</h2>
              <p>{project.description}</p>
              <div className="catalog-tools">
                {project.technologies.slice(0, 3).map((tool) => (
                  <span key={tool}>{tool}</span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
      {!matches.length && (
        <div className="empty-search">
          <h2>No projects found.</h2>
          <p>Try another name or technology.</p>
          <button
            className="pill-button"
            onClick={() => {
              setQuery("");
              setFilter("All projects");
            }}
          >
            Reset filters <ArrowUpRight size={16} />
          </button>
        </div>
      )}
    </section>
  );
}
