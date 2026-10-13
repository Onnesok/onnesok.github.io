import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const highlights = [
  {
    id: "research-poster",
    title: "ADAS research",
    label: "POSTER PRESENTATION",
    description: "Advanced Driver Assistance Systems for future mobility.",
    image: "/projects/milestone/research poster .webp",
    alt: "Event photograph from the ADAS research poster presentation",
    className: "research-presentation",
  },
  {
    id: "ieee-gold",
    title: "IEEE Gold Award",
    label: "IEEE R10-HTC 2024",
    description: "Bionic Arm with Sensory Feedback.",
    image: "/projects/milestone/ieee gold award.webp",
    alt: "IEEE Gold Award certificate for Bionic Arm with Sensory Feedback",
    className: "research-award",
  },
];

export default function ResearchHighlights() {
  return (
    <div
      className="research-highlights"
      aria-label="Research presentations and awards"
    >
      {highlights.map((item) => (
        <Link
          key={item.id}
          href={`/awards/#${item.id}`}
          className={`research-highlight-card ${item.className}`}
        >
          <svg
            width="0"
            height="0"
            className="clip-definitions"
            aria-hidden="true"
          >
            <defs>
              <clipPath
                id={`compact-${item.id}-image`}
                clipPathUnits="objectBoundingBox"
              >
                <path d="M .70,.01 L .96,.01 Q .995,.01 .995,.09 L .995,.58 Q .995,.64 .97,.68 L .83,.94 Q .80,.99 .76,.99 L .51,.99 Q .47,.99 .50,.88 L .59,.48 Q .63,.34 .63,.20 Q .64,.01 .70,.01 Z" />
              </clipPath>
              <clipPath
                id={`compact-${item.id}-corner`}
                clipPathUnits="objectBoundingBox"
              >
                <path d="M .855,.99 L .96,.99 Q .995,.99 .995,.91 L .995,.76 Q .995,.71 .97,.76 L .845,.94 Q .82,.99 .855,.99 Z" />
              </clipPath>
            </defs>
          </svg>
          <div
            className="research-highlight-image"
            style={{ clipPath: `url(#compact-${item.id}-image)` }}
          >
            <Image
              src={item.image}
              alt={item.alt}
              fill
              sizes="(max-width:760px) 90vw, 45vw"
            />
          </div>
          <div className="research-highlight-copy">
            <span>{item.label}</span>
            <h3
              id={
                item.id === "research-poster" ? "research-heading" : undefined
              }
            >
              {item.title}
            </h3>
            <p>{item.description}</p>
          </div>
          <div
            className="research-highlight-corner"
            style={{ clipPath: `url(#compact-${item.id}-corner)` }}
            aria-hidden="true"
          >
            <ArrowUpRight size={19} />
          </div>
        </Link>
      ))}
    </div>
  );
}
