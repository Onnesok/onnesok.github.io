"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

export default function AnimatedTitle({
  text,
  as: Tag = "h2",
  id,
  className = "",
  accentWords = [],
}: {
  text: string;
  as?: "h1" | "h2" | "h3";
  id?: string;
  className?: string;
  accentWords?: string[];
}) {
  const heading = useRef<HTMLHeadingElement>(null);
  const reduceMotion = useReducedMotion();
  useEffect(() => {
    const target = heading.current;
    if (!target || reduceMotion) return;
    let visible = false;
    let ready =
      !document.querySelector(".site-loader") ||
      document.documentElement.dataset.portfolioReady === "true";
    let played = false;
    const animations: Animation[] = [];
    const play = () => {
      if (!visible || !ready || played) return;
      played = true;
      target
        .querySelectorAll<HTMLElement>(".title-word-text")
        .forEach((word, index) => {
          animations.push(
            word.animate(
              [
                { opacity: 0.35, translate: "0 16px", filter: "blur(3px)" },
                { opacity: 1, translate: "0 0", filter: "blur(0)" },
              ],
              {
                duration: 560,
                delay: Math.min(index * 45, 180),
                easing: "cubic-bezier(.22,1,.36,1)",
                fill: "backwards",
              },
            ),
          );
        });
      observer.disconnect();
      window.removeEventListener("portfolio-ready", onReady);
    };
    const onReady = () => {
      ready = true;
      play();
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        play();
      },
      { threshold: 0.2 },
    );
    window.addEventListener("portfolio-ready", onReady);
    observer.observe(target);
    return () => {
      observer.disconnect();
      window.removeEventListener("portfolio-ready", onReady);
      animations.forEach((animation) => animation.cancel());
    };
  }, [text, reduceMotion]);

  return (
    <Tag ref={heading} id={id} className={`animated-title ${className}`}>
      {text.split(/(\s+)/).map((part, index) =>
        /\s/.test(part) ? (
          part.includes("\n") ? (
            <br key={index} />
          ) : (
            part
          )
        ) : (
          <span className="title-word" key={index}>
            <span
              className={`title-word-text ${accentWords.includes(part) ? "title-word-accent" : ""}`}
            >
              {part}
            </span>
          </span>
        ),
      )}
    </Tag>
  );
}
