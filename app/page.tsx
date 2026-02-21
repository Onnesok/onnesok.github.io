import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import SkillsScroller from './components/SkillsScroller';
import AboutSection from './components/AboutSection';
import WorkSection from './components/WorkSection';
import AchievementsSection from './components/AchievementsSection';
import SoftwareProjectsSection from './components/SoftwareProjectsSection';
import HardwareProjectsSection from './components/HardwareProjectsSection';
import ContactFooter from './components/ContactFooter';

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <SkillsScroller />
      <AboutSection />
      <WorkSection />
      <AchievementsSection />
      <SoftwareProjectsSection />
      <HardwareProjectsSection />
      <ContactFooter />
    </main>
  );
}
