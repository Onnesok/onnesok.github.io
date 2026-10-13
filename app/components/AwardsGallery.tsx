"use client";
import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { allMilestones } from "../data/milestones";
import { mediaPath } from "../data/media";
const filters = [
  "All moments",
  "Research",
  "Robotics",
  "Software",
  "Grants & honors",
  "Certifications",
] as const;
export default function AwardsGallery() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All moments");
  const visible = allMilestones.filter(
    (item) =>
      filter === "All moments" ||
      (filter === "Certifications" && item.tag === "Cert") ||
      (filter === "Research" && item.type === "research") ||
      (filter === "Robotics" && item.type === "robotics") ||
      (filter === "Software" && item.type === "software") ||
      (filter === "Grants & honors" &&
        ["honor", "funding", "summit"].includes(item.type) &&
        item.tag !== "Cert"),
  );
  return (
    <>
      <div className="work-toolbar">
        <div
          className="filter-list archive-filters"
          role="group"
          aria-label="Filter achievements"
        >
          {filters.map((name) => (
            <button
              key={name}
              aria-pressed={filter === name}
              className={filter === name ? "active" : ""}
              onClick={() => setFilter(name)}
            >
              {name}
            </button>
          ))}
        </div>
        <span className="muted">{visible.length} moments</span>
      </div>
      <div className="archive-grid" aria-live="polite">
        {visible.map((item) => (
          <article key={item.id} id={item.id} className="archive-card">
            {item.image && (
              <a
                href={item.image}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${item.title} image`}
              >
                <div className="honor-image">
                  <Image
                    src={mediaPath(item.image)}
                    alt={item.title}
                    fill
                    sizes="(max-width:400px) 100vw, (max-width:760px) 50vw, 33vw"
                  />
                  <span>
                    {item.tag === "Cert" ? "Certification" : item.tag}{" "}
                    <ArrowUpRight size={10} />
                  </span>
                </div>
              </a>
            )}
            <h2>{item.title}</h2>
            <h3>{item.subtitle}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </>
  );
}
