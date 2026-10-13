import ExperienceTimeline from "./ExperienceTimeline";
import SectionHeading from "./SectionHeading";

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      className="portfolio-section experience-section"
      aria-label="Professional experience"
    >
      <SectionHeading
        number="04"
        label="WORK & TEACHING"
        title="EXPERIENCE"
        description="Research, product development, teaching, and robotics."
      />
      <ExperienceTimeline />
    </section>
  );
}
