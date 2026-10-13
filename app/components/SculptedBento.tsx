import Image from "next/image";
import type { ReactNode } from "react";
import BentoPanel from "./BentoPanel";

/** Curved copy recess + large image + detached diagonal corner, from the supplied reference. */
export default function SculptedBento({
  id,
  image,
  imageAlt,
  intro,
  caption,
  detail,
  className = "",
}: {
  id: string;
  image: string;
  imageAlt: string;
  intro: ReactNode;
  caption?: ReactNode;
  detail: ReactNode;
  className?: string;
}) {
  return (
    <BentoPanel interactive className={`sculpted-frame ${className}`}>
      <svg width="0" height="0" className="clip-definitions" aria-hidden="true">
        <defs>
          <clipPath id={`${id}-main`} clipPathUnits="objectBoundingBox">
            <path d="M .56,.015 L .95,.015 Q .995,.015 .995,.085 L .995,.54 Q .995,.575 .967,.612 L .684,.958 Q .659,.99 .621,.99 L .055,.99 Q .005,.99 .005,.92 L .005,.49 Q .005,.423 .055,.423 L .365,.423 Q .409,.423 .433,.366 L .496,.09 Q .514,.015 .56,.015 Z" />
          </clipPath>
          <clipPath id={`${id}-corner`} clipPathUnits="objectBoundingBox">
            <path d="M .748,.99 L .954,.99 Q .995,.99 .995,.934 L .995,.718 Q .995,.666 .967,.701 L .730,.953 Q .699,.99 .748,.99 Z" />
          </clipPath>
        </defs>
      </svg>
      <div className="sculpted-main" style={{ clipPath: `url(#${id}-main)` }}>
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(max-width:760px) 100vw, 85vw"
        />
        <div className="sculpted-image-shade" />
        {caption && <div className="sculpted-caption">{caption}</div>}
      </div>
      <div
        className="sculpted-corner"
        style={{ clipPath: `url(#${id}-corner)` }}
        aria-hidden="true"
      >
        <div className="sculpted-corner-symbol">{detail}</div>
      </div>
      <div className="sculpted-copy">{intro}</div>
    </BentoPanel>
  );
}
