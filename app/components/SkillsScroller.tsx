"use client";

import Image from "next/image";
import { useState } from "react";
import { Pause, Play } from "lucide-react";
import skills from "../data/skills.json";

type Skill = { label: string; icon: string; invert?: boolean };
const rows: Skill[][] = skills;

export default function SkillsScroller() {
  const [paused, setPaused] = useState(false);
  return (
    <section
      className="skills-scroller-section"
      aria-labelledby="skills-strip-heading"
      data-paused={paused}
    >
      <div className="skills-strip-heading">
        <h2 id="skills-strip-heading">
          SKILLS & TOOLS <span>Technologies I use</span>
        </h2>
        <button
          className="skills-pause"
          aria-label={
            paused ? "Play skills animation" : "Pause skills animation"
          }
          aria-pressed={paused}
          onClick={() => setPaused(!paused)}
        >
          {paused ? <Play size={13} /> : <Pause size={13} />}
          <span>{paused ? "Play" : "Pause"}</span>
        </button>
      </div>
      <div className="skills-marquee">
        {rows.map((row, rowIndex) => (
          <div className="skills-track-window" key={rowIndex}>
            <div
              className={`skills-track ${rowIndex ? "skills-track-reverse" : ""}`}
            >
              {[0, 1].map((copy) => (
                <ul
                  className={`skills-group ${copy ? "skills-group-repeat" : ""}`}
                  aria-hidden={copy ? true : undefined}
                  key={copy}
                >
                  {row.map((skill) => (
                    <li className="skill-badge" key={skill.label}>
                      <Image
                        src={skill.icon}
                        alt=""
                        width={24}
                        height={24}
                        loading="eager"
                        className={
                          skill.invert
                            ? "skill-logo skill-logo-invert"
                            : "skill-logo"
                        }
                      />
                      <span>{skill.label}</span>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
