"use client";
import Image from "next/image";
import { ArrowRight, ArrowDown, FileText } from "lucide-react";
import { useRef } from "react";
import AnimatedTitle from "./AnimatedTitle";

export default function WorkshopHero() {
  const scene = useRef<HTMLDivElement>(null);
  function move(event: React.PointerEvent<HTMLDivElement>) {
    if (
      event.pointerType !== "mouse" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const rect = event.currentTarget.getBoundingClientRect();
    scene.current?.style.setProperty(
      "--scene-x",
      `${((event.clientX - rect.left) / rect.width - 0.5) * 8}px`,
    );
    scene.current?.style.setProperty(
      "--scene-y",
      `${((event.clientY - rect.top) / rect.height - 0.5) * 5}px`,
    );
  }
  return (
    <section
      id="home"
      className="hero scene-panel"
      aria-labelledby="hero-title"
      onPointerMove={move}
      onPointerLeave={() => {
        scene.current?.style.setProperty("--scene-x", "0px");
        scene.current?.style.setProperty("--scene-y", "0px");
      }}
    >
      <div className="hero-scene" ref={scene}>
        <Image src="/design/workshop.webp" alt="" fill priority sizes="100vw" />
      </div>
      <svg width="0" height="0" className="clip-definitions" aria-hidden="true">
        <defs>
          <clipPath id="hero-sculpt" clipPathUnits="objectBoundingBox">
            <path d="M .53,0 L 1,0 L 1,1 L 0,1 L 0,.92 Q .12,.96 .21,.86 L .35,.61 Q .44,.48 .445,.31 L .464,.10 Q .479,0 .53,0 Z" />
          </clipPath>
          <clipPath id="research-sculpt" clipPathUnits="objectBoundingBox">
            <path d="M .31,0 L 1,.09 L 1,1 L .54,.96 Q .38,.95 .31,.76 L .25,.57 Q .21,.41 .28,.26 Q .32,.16 .31,0 Z" />
          </clipPath>
          <clipPath id="about-sculpt" clipPathUnits="objectBoundingBox">
            <path d="M .46,0 L 1,.07 L 1,1 L .44,.97 Q .32,.95 .31,.72 L .34,.51 Q .39,.39 .45,.33 Q .50,.22 .46,0 Z" />
          </clipPath>
          <clipPath id="contact-sculpt" clipPathUnits="objectBoundingBox">
            <path d="M .43,0 L 1,0 L 1,1 L .40,1 Q .27,.95 .27,.73 L .29,.49 Q .35,.34 .34,.17 Q .32,.04 .43,0 Z" />
          </clipPath>
        </defs>
      </svg>
      <div className="hero-intro">
        <span className="intro-label">HI, I’M</span>
        <AnimatedTitle as="h1" id="hero-title" text="RATUL HASAN" />
        <p className="hero-affiliation">Research Assistant · BRAC University</p>
        <p className="hero-role">Researcher. Engineer. Inventor.</p>
        <p className="hero-summary">
          Exploring intelligent systems through <br />
          research, robotics, hardware, <br />
          software and games.
        </p>
        <div className="hero-actions">
          <a href="#projects" className="scene-button animated-cta">
            <span className="button-disc">
              <ArrowRight size={18} />
            </span>
            <span className="hero-button-label">
              Explore work
              <span
                aria-hidden="true"
                className="hero-button-ghost"
                data-text="Explore work"
              />
            </span>
          </a>
          <a
            href="/cv.pdf"
            className="scene-button secondary animated-cta"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FileText size={16} />
            <span className="hero-button-label">
              View CV
              <span
                aria-hidden="true"
                className="hero-button-ghost"
                data-text="View CV"
              />
            </span>
          </a>
        </div>
      </div>
      <a
        href="#research"
        className="hero-scroll"
        aria-label="Scroll to research"
      >
        <ArrowDown size={16} />
      </a>
      <div className="scene-seam" aria-hidden="true" />
    </section>
  );
}
