import { Suspense, useEffect } from 'react';
import Navigation from '../components/portfolio/Navigation';
import HeroSection from '../components/portfolio/HeroSection';
import GridOverlay from '../components/portfolio/GridOverlay';
import MagneticCursor from '../components/portfolio/MagneticCursor';
import AboutSection from '../components/portfolio/AboutSection';
import ExperienceSection from '../components/portfolio/ExperienceSection';
import ProjectsSection from '../components/portfolio/ProjectsSection';
import SkillsSection from '../components/portfolio/SkillsSection';
import AchievementsSection from '../components/portfolio/AchievementsSection';
import ContactSection from '../components/portfolio/ContactSection';
import FooterSection from '../components/portfolio/FooterSection';
import ScrollDepthScene from '../components/portfolio/ScrollDepthScene';
import AppErrorBoundary from '../components/AppErrorBoundary';
import { profile, seo } from '@/data/portfolio';

const LoadingFallback = () => (
  <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
    <div className="text-center">
      <h1 className="font-mono text-3xl text-primary glow-text mb-4">{profile.brand}// loading</h1>
      <p className="text-muted-foreground">Initializing the portfolio experience</p>
    </div>
  </div>
);

export default function Portfolio() {
  useEffect(() => {
    document.title = seo.title;
    const description = document.querySelector('meta[name="description"]');
    if (description) {
      description.setAttribute('content', seo.description);
    }
  }, []);

  return (
    <Suspense fallback={<LoadingFallback />}>
      <AppErrorBoundary>
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
          <GridOverlay />
          <ScrollDepthScene />
          <MagneticCursor />
          <Navigation />
          <main className="relative z-10">
            <HeroSection />
            <AboutSection />
            <ExperienceSection />
            <ProjectsSection />
            <SkillsSection />
            <AchievementsSection />
            <ContactSection />
          </main>
          <FooterSection />
        </div>
      </AppErrorBoundary>
    </Suspense>
  );
}
// Dummy
