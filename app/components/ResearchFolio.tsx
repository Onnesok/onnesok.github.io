import { ArrowUpRight } from "lucide-react";
import { profile } from "../data/profile";
import SectionHeading from "./SectionHeading";
import ResearchPapers from "./ResearchPapers";
import ResearchHighlights from "./ResearchHighlights";

export default function ResearchFolio() {
  return (
    <section
      id="research"
      className="portfolio-section research-scene"
      aria-label="Research"
    >
      <SectionHeading
        number="01"
        label="ACADEMIC WORK"
        title="RESEARCH"
        description="Research Assistant at BRAC University, Department of Computer Science & Engineering."
        action={
          <a
            href="/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="scene-button secondary"
          >
            Academic CV <ArrowUpRight size={16} />
          </a>
        }
      />
      <div className="research-facts">
        <div>
          <h3>Research interests</h3>
          <p>
            Robotics · Computer vision · Biomedical AI · Assistive technology
          </p>
        </div>
        <div>
          <h3>Supervisor</h3>
          <p>
            <a
              className="supervisor-link"
              href={profile.supervisorUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {profile.supervisor} <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </p>
        </div>
      </div>
      <ResearchPapers />
      <ResearchHighlights />
    </section>
  );
}
