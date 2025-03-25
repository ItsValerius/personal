import AboutSection from "@/components/sections/about-section";
import EducationSection from "@/components/sections/education-section";
import ExperienceSection from "@/components/sections/experience-section";
import Footer from "@/components/sections/footer";
import Header from "@/components/sections/header";
import HeroSection from "@/components/sections/hero-section";
import InterestsSection from "@/components/sections/interests-section";
import ProjectsSection from "@/components/sections/projects-section";
import SkillsSection from "@/components/sections/skills-section";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations();

  return (
    <div className="min-h-screen bg-[url('/pencil-dots-colored.svg')] dark:bg-[url('/pencil-dots-colored-dark.svg')] bg-repeat bg-[length:60px_60px] bg-fixed">
      <a href="#about" className="skip-to-content">
        {t("nav.about")}
      </a>
      <Header />

      <main
        className="container py-10 space-y-20 mx-auto px-2"
        id="main-content"
      >
        {/* Hero Section */}
        <HeroSection />

        {/* About Section */}
        <AboutSection />
        {/* Experience Section */}
        <ExperienceSection />

        {/* Education Section */}
        <EducationSection />

        {/* Skills Section */}
        <SkillsSection />

        {/* Interests Section */}
        <InterestsSection />

        {/* Projects Section */}
        <ProjectsSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
