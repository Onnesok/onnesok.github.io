import Navbar from "./components/Navbar";
import WorkshopHero from "./components/WorkshopHero";
import SkillsScroller from "./components/SkillsScroller";
import ResearchFolio from "./components/ResearchFolio";
import SelectedExhibits from "./components/SelectedExhibits";
import AboutWorkshop from "./components/AboutWorkshop";
import ExperienceSection from "./components/ExperienceSection";
import HonorsShelf from "./components/HonorsShelf";
import ContactFooter from "./components/ContactFooter";

export default function Home() {
  return (
    <div className="workshop-world">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Navbar />
      <main id="main-content">
        <WorkshopHero />
        <SkillsScroller />
        <ResearchFolio />
        <section id="projects" className="work-scene portfolio-section">
          <SelectedExhibits />
        </section>
        <AboutWorkshop />
        <ExperienceSection />
        <HonorsShelf />
      </main>
      <ContactFooter />
    </div>
  );
}
