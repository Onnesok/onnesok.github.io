import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Github, Linkedin, FileText } from "lucide-react";
import { profile } from "../data/profile";
import BentoPanel from "./BentoPanel";
import TextReveal from "./TextReveal";
import AnimatedTitle from "./AnimatedTitle";

export default function ContactFooter() {
  return (
    <footer id="contact" className="contact-scene portfolio-footer">
      <div className="contact-bento-wrap">
        <BentoPanel className="contact-bento">
          <svg
            width="0"
            height="0"
            className="clip-definitions"
            aria-hidden="true"
          >
            <defs>
              <clipPath
                id="footer-workshop-curve"
                clipPathUnits="objectBoundingBox"
              >
                <path d="M .58,0 L .95,0 Q 1,0 1,.08 L 1,.92 Q 1,1 .95,1 L .40,1 Q .32,.97 .36,.77 L .44,.46 Q .48,.33 .50,.15 Q .52,0 .58,0 Z" />
              </clipPath>
            </defs>
          </svg>
          <div className="footer-workshop-image">
            <Image
              src="/design/contact.webp"
              alt="A small robot in a warmly lit workshop"
              fill
              sizes="(max-width:760px) 100vw, 70vw"
            />
          </div>
          <TextReveal className="contact-message">
            <div className="scene-section-label">
              <span className="section-number">06</span>
              <span>CONTACT</span>
            </div>
            <AnimatedTitle
              as="h2"
              text={"GET IN\nTOUCH."}
              accentWords={["TOUCH."]}
            />
            <p>
              Research collaborations, graduate opportunities,
              <br />
              and software or robotics projects.
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="contact-email"
              aria-label={`Email Ratul Hasan at ${profile.email}`}
            >
              <span>{profile.email}</span>
              <span className="button-disc">
                <ArrowUpRight size={19} />
              </span>
            </a>
          </TextReveal>
        </BentoPanel>
      </div>
      <div className="footer-bottom">
        <Link href="/" className="footer-name">
          Ratul Hasan<span>{profile.location}</span>
        </Link>
        <span className="footer-copyright">© {new Date().getFullYear()}</span>
        <div className="footer-socials">
          <a href={profile.github} target="_blank" rel="noopener noreferrer">
            <Github size={16} />
            GitHub
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
            <Linkedin size={16} />
            LinkedIn
          </a>
          <a href="/cv.pdf" target="_blank" rel="noopener noreferrer">
            <FileText size={16} />
            CV
          </a>
        </div>
      </div>
    </footer>
  );
}
