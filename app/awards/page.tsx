import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "../components/Navbar";
import ContactFooter from "../components/ContactFooter";
import AwardsGallery from "../components/AwardsGallery";
import AnimatedTitle from "../components/AnimatedTitle";
export const metadata: Metadata = {
  title: "Awards & Milestones",
  description:
    "Recognition, grants, research presentations, certifications, and robotics milestones from Ratul Hasan’s journey.",
};
export default function AwardsPage() {
  return (
    <>
      <Navbar />
      <main className="page-width">
        <div className="archive-intro">
          <div className="detail-topline">
            <Link href="/#achievements">
              <ArrowLeft size={15} /> Back to the workshop
            </Link>
            <span>THE COLLECTION</span>
          </div>
          <AnimatedTitle
            as="h1"
            text={"Moments that\nmade a difference."}
            accentWords={["made", "a", "difference."]}
          />
          <p>
            A collection of recognition, research presentations, grants,
            competitions, and certifications. Every one is a part of the
            journey.
          </p>
        </div>
        <AwardsGallery />
      </main>
      <ContactFooter />
    </>
  );
}
