"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight, Bot, Code2, Gamepad2 } from "lucide-react";
import SculptedBento from "./SculptedBento";
import SectionHeading from "./SectionHeading";
import AnimatedTitle from "./AnimatedTitle";

const selections = [
  {
    slug: "pixi-v2-humanoid",
    category: "hardware",
    label: "ROBOTICS",
    title: "Pixi v2.0",
    description:
      "A humanoid robot with facial recognition and voice interaction.",
    image: "/projects/hardware/pixi v2_humanoid robot.webp",
    alt: "Ratul Hasan with the Pixi v2.0 humanoid robot",
    tools: "ROS · Python · AI",
    icon: Bot,
    style: "sculpted-pixi",
  },
  {
    slug: "texlab-online",
    category: "software",
    label: "WEB APPLICATION",
    title: "TexLab Online",
    description: "Write and compile LaTeX documents in your browser.",
    image: "/projects/software/texlab.webp",
    alt: "TexLab Online website and editor",
    tools: "React · Next.js · LaTeX",
    icon: Code2,
    style: "sculpted-software",
  },
  {
    slug: "shooterx",
    category: "software",
    label: "GAME DEVELOPMENT",
    title: "ShooterX",
    description: "An indie action arcade shooter.",
    image: "/projects/software/shooterx.webp",
    alt: "ShooterX game artwork",
    tools: "Flutter · Dart",
    icon: Gamepad2,
    style: "sculpted-game",
  },
  {
    slug: "axelia-quadruped-robot",
    category: "hardware",
    label: "ROBOTICS",
    title: "Axelia",
    description: "A four-legged robot with terrain navigation.",
    image: "/projects/hardware/axelia.webp",
    alt: "Axelia quadruped robot",
    tools: "ROS · Python · Computer vision",
    icon: Bot,
    style: "sculpted-axelia",
  },
];

export default function SelectedExhibits() {
  return (
    <div className="selected-exhibits">
      <SectionHeading
        number="02"
        label="ROBOTICS / SOFTWARE / GAMES"
        title="PROJECTS"
        description="Selected projects in robotics, software, and games."
        titleAside={
          <span className="project-heading-count">
            <strong>113+</strong>
            <span>projects built</span>
          </span>
        }
        action={
          <Link href="/projects/" className="scene-button collection-link">
            Explore projects <ArrowUpRight size={19} />
          </Link>
        }
      />
      <div className="sculpted-project-grid">
        {selections.map(
          ({
            slug,
            category,
            label,
            title,
            description,
            image,
            alt,
            tools,
            icon: Icon,
            style,
          }) => (
            <Link
              href={`/projects/${category}/${slug}/`}
              key={slug}
              className="sculpted-link feature-exhibit"
            >
              <SculptedBento
                id={slug}
                image={image}
                imageAlt={alt}
                className={style}
                intro={
                  <>
                    <span className="sculpted-category">{label}</span>
                    <AnimatedTitle as="h3" text={title} />
                    <p>{description}</p>
                    <span className="sculpted-action project-view-link">
                      View project <ArrowRight size={16} />
                    </span>
                  </>
                }
                caption={
                  <>
                    <span>BUILT WITH</span>
                    <strong>{tools}</strong>
                  </>
                }
                detail={<Icon strokeWidth={1.1} />}
              />
            </Link>
          ),
        )}
      </div>
    </div>
  );
}
