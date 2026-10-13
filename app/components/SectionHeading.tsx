import type { ReactNode } from "react";
import AnimatedTitle from "./AnimatedTitle";

export default function SectionHeading({
  number,
  label,
  title,
  description,
  action,
  titleAside,
}: {
  number: string;
  label: string;
  title: string;
  description: string;
  action?: ReactNode;
  titleAside?: ReactNode;
}) {
  return (
    <div className="portfolio-section-heading">
      <div className="scene-section-label">
        <span className="section-number">{number}</span>
        <span>{label}</span>
        <span className="section-heading-rule" />
      </div>
      <div className="portfolio-heading-row">
        <div>
          <div className="portfolio-title-line">
            <AnimatedTitle text={title} />
            {titleAside}
          </div>
          <p>{description}</p>
        </div>
        {action}
      </div>
    </div>
  );
}
