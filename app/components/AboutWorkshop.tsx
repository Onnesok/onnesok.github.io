import { MapPin } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { profile, skills } from "../data/profile";

export default function AboutWorkshop() {
  return (
    <section
      id="about"
      className="portfolio-section about-scene"
      aria-label="About Ratul Hasan"
    >
      <SectionHeading
        number="03"
        label="BACKGROUND"
        title="ABOUT ME"
        description="Software developer, robotics engineer, and researcher based in Bangladesh."
      />
      <div className="about-simple-grid">
        <div className="about-biography">
          <h3>
            Ratul Hasan <span>/ Onnesok</span>
          </h3>
          <p>
            I’m a Research Assistant at BRAC University and the founder of
            Onnesok. I build apps and games, work on robotics projects, and
            teach app development.
          </p>
          <p>
            My projects use Flutter, Godot, React, and ROS, along with circuit
            design and 3D modeling.
          </p>
          <div className="about-location">
            <MapPin size={16} />
            <span>{profile.location}</span>
          </div>
        </div>
        <div className="about-skills">
          <h3>Skills & tools</h3>
          <div className="skill-list">
            {skills.map((group) => (
              <div key={group.name}>
                <h4>{group.name}</h4>
                <p>{group.items.join(" · ")}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
