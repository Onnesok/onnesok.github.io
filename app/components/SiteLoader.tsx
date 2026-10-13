"use client";

import { useEffect, useState } from "react";

export default function SiteLoader() {
  const [phase, setPhase] = useState<"loading" | "leaving" | "hidden">(
    "loading",
  );
  useEffect(() => {
    let disposed = false;
    let finished = false;
    let readyTimer: ReturnType<typeof setTimeout> | undefined;
    let exitTimer: ReturnType<typeof setTimeout> | undefined;
    const start = performance.now();
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const finish = () => {
      if (disposed || finished) return;
      finished = true;
      clearTimeout(maximumTimer);
      clearTimeout(readyTimer);
      setPhase("leaving");
      document.documentElement.dataset.portfolioReady = "true";
      window.dispatchEvent(new Event("portfolio-ready"));
      exitTimer = setTimeout(
        () => {
          if (disposed) return;
          setPhase("hidden");
        },
        reduced ? 0 : 220,
      );
    };
    const maximumTimer = setTimeout(finish, 1400);
    const image = document.querySelector<HTMLImageElement>(
      ".hero-scene img, .detail-visual img",
    );
    Promise.allSettled([document.fonts.ready, image?.decode()]).then(() => {
      if (disposed || finished) return;
      readyTimer = setTimeout(
        finish,
        Math.max(0, (reduced ? 0 : 420) - (performance.now() - start)),
      );
    });
    return () => {
      disposed = true;
      clearTimeout(maximumTimer);
      clearTimeout(readyTimer);
      clearTimeout(exitTimer);
    };
  }, []);

  if (phase === "hidden") return null;
  return (
    <div
      className={`site-loader ${phase === "leaving" ? "is-leaving" : ""}`}
      data-state={phase}
      role="status"
      aria-label="Loading portfolio"
    >
      <div className="loader-art" aria-hidden="true">
        <div className="loader-orbit" />
        <span className="loader-monogram">RH</span>
        <svg className="loader-robot" viewBox="0 0 72 52" fill="none">
          <path
            d="M36 5V1M30 1h12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <rect
            x="8"
            y="9"
            width="56"
            height="37"
            rx="13"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M3 22v13M69 22v13"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <g className="loader-eyes" strokeWidth="3" strokeLinecap="round">
            <path
              d="M20 27c2-6 8-6 10 0M42 27c2-6 8-6 10 0"
              stroke="currentColor"
            />
          </g>
          <path
            d="M30 36c4 3 8 3 12 0"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <span className="loader-caption">Loading portfolio</span>
      <div className="loader-line" aria-hidden="true">
        <span />
      </div>
    </div>
  );
}
