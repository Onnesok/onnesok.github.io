"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";

export default function TextReveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const element = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  useEffect(() => {
    const target = element.current;
    if (!target || reduceMotion) return;
    let animation: Animation | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        animation = target.animate(
          [
            { opacity: 0.45, translate: "0 12px" },
            { opacity: 1, translate: "0 0" },
          ],
          { duration: 540, easing: "cubic-bezier(.22,1,.36,1)" },
        );
        observer.disconnect();
      },
      { threshold: 0.15 },
    );
    observer.observe(target);
    return () => {
      observer.disconnect();
      animation?.cancel();
    };
  }, [reduceMotion]);
  return (
    <div ref={element} className={className}>
      {children}
    </div>
  );
}
