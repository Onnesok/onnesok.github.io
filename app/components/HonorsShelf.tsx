"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, Pause, Play } from "lucide-react";
import { allMilestones } from "../data/milestones";
import { mediaPath } from "../data/media";
import SectionHeading from "./SectionHeading";

const honors = ["vc-award", "uihp-grant", "technoxian-world-cup"].flatMap(
  (id) => allMilestones.filter((item) => item.id === id),
);

export default function HonorsShelf() {
  const viewport = useRef<HTMLDivElement>(null);
  const firstGroup = useRef<HTMLDivElement>(null);
  const interaction = useRef({ hovered: false, focused: false, until: 0 });
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const windowElement = viewport.current;
    const group = firstGroup.current;
    if (!windowElement || !group || paused || reduceMotion) return;
    let frame = 0;
    let previousTime = 0;
    let position = windowElement.scrollLeft;
    function move(time: number) {
      const elapsed = previousTime ? Math.min(time - previousTime, 40) : 0;
      previousTime = time;
      const blocked = interaction.current;
      if (blocked.hovered || blocked.focused || time < blocked.until) {
        position = windowElement!.scrollLeft;
      } else {
        position += elapsed * 0.026;
        const stride = group!.offsetWidth;
        if (stride > 0 && position >= stride) position -= stride;
        windowElement!.scrollLeft = position;
      }
      frame = requestAnimationFrame(move);
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        cancelAnimationFrame(frame);
        previousTime = 0;
        position = windowElement.scrollLeft;
        if (entry.isIntersecting) frame = requestAnimationFrame(move);
      },
      { threshold: 0.1 },
    );
    observer.observe(windowElement);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [paused, reduceMotion]);

  return (
    <section
      id="achievements"
      className="portfolio-section honors-scene"
      aria-label="Recognition and achievements"
    >
      <SectionHeading
        number="05"
        label="SELECTED AWARDS & RECOGNITION"
        title="SELECTED ACHIEVEMENTS"
        description="Highlights from many awards, competition results, and grants."
        action={
          <Link className="scene-button secondary" href="/awards/">
            More achievements <ArrowUpRight size={16} />
          </Link>
        }
      />
      <div className="honors-motion-tools">
        <button
          className="honors-motion-button"
          aria-label={
            paused
              ? "Play achievement scrolling"
              : "Pause achievement scrolling"
          }
          aria-pressed={paused}
          onClick={() => setPaused(!paused)}
        >
          {paused ? <Play size={13} /> : <Pause size={13} />}{" "}
          {paused ? "Play" : "Pause"}
        </button>
      </div>
      <div
        className="recognition-gallery"
        ref={viewport}
        data-paused={paused}
        role="region"
        aria-label="Achievement cards"
        onPointerEnter={(event) => {
          if (event.pointerType === "mouse") interaction.current.hovered = true;
        }}
        onPointerLeave={() => {
          interaction.current.hovered = false;
        }}
        onPointerDown={() => {
          interaction.current.until = performance.now() + 5000;
        }}
        onPointerUp={() => {
          interaction.current.until = performance.now() + 1800;
        }}
        onPointerCancel={() => {
          interaction.current.until = performance.now() + 1800;
        }}
        onWheel={() => {
          interaction.current.until = performance.now() + 2500;
        }}
        onFocusCapture={() => {
          interaction.current.focused = true;
        }}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget))
            interaction.current.focused = false;
        }}
      >
        <div className="recognition-track">
          {[0, 1].map((copy) => (
            <div
              className="recognition-group"
              ref={copy === 0 ? firstGroup : undefined}
              aria-hidden={copy === 1 ? true : undefined}
              key={copy}
            >
              {honors.map((item) => (
                <Link
                  href={`/awards/#${item.id}`}
                  className="recognition-card"
                  key={item.id}
                  tabIndex={copy === 1 ? -1 : undefined}
                >
                  <svg
                    width="0"
                    height="0"
                    className="clip-definitions"
                    aria-hidden="true"
                  >
                    <defs>
                      <clipPath
                        id={`honor-${item.id}-${copy}`}
                        clipPathUnits="objectBoundingBox"
                      >
                        <path d="M .07,0 L .93,0 Q 1,0 1,.09 L 1,.57 Q 1,.63 .96,.68 L .72,.95 Q .68,1 .62,1 L .07,1 Q 0,1 0,.91 L 0,.09 Q 0,0 .07,0 Z" />
                      </clipPath>
                    </defs>
                  </svg>
                  <div className="recognition-image-wrap">
                    <div
                      className="recognition-image"
                      style={{ clipPath: `url(#honor-${item.id}-${copy})` }}
                    >
                      {item.image && (
                        <Image
                          src={mediaPath(item.image)}
                          alt={copy === 1 ? "" : item.title}
                          fill
                          sizes="(max-width:760px) 90vw, 30vw"
                        />
                      )}
                    </div>
                    <span className="honor-arrow">
                      <ArrowUpRight size={22} />
                    </span>
                  </div>
                  <div className="recognition-card-copy">
                    <span className="sculpted-category">{item.tag}</span>
                    <h3>{item.title}</h3>
                    <p>{item.subtitle}</p>
                    <span className="honor-view-link">
                      View achievement <ArrowRight size={15} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
