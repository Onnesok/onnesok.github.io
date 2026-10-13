import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import WorkExplorer from "../components/WorkExplorer";
import AnimatedTitle from "../components/AnimatedTitle";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "113+ projects built by Ratul Hasan. Explore selected robotics, hardware, software, and game projects.",
};

export default function ProjectsPage() {
  return (
    <div className="projects-archive page-width">
      <header className="catalog-intro">
        <Link href="/#projects" className="catalog-back">
          <ArrowLeft size={16} /> Back to home
        </Link>
        <span className="sculpted-category">THE PROJECT COLLECTION</span>
        <AnimatedTitle
          as="h1"
          text="113+ projects built."
          accentWords={["113+"]}
        />
        <p>
          Robots, apps, games, and hardware. Explore selected projects, how they
          work, and what I built them with.
        </p>
      </header>
      <WorkExplorer />
    </div>
  );
}
