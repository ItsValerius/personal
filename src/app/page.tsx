import AboutSection from "@/components/sections/about-section";
import EducationSection from "@/components/sections/education-section";
import ExperienceSection from "@/components/sections/experience-section";
import Footer from "@/components/sections/footer";
import Header from "@/components/sections/header";
import HeroSection from "@/components/sections/hero-section";
import ProjectsSection from "@/components/sections/projects-section";
import SkillsSection from "@/components/sections/skills-section";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations();

  return (
    // Fixed pseudo-element instead of bg-fixed, which repaints on every scroll in mobile Safari.
    <div className="min-h-screen isolate before:fixed before:inset-0 before:-z-10 before:bg-[url('/pencil-dots-colored.svg')] dark:before:bg-[url('/pencil-dots-colored-dark.svg')] before:bg-repeat before:bg-[length:60px_60px]">
      <a href="#main-content" className="skip-to-content">
        {t("skipToContent")}
      </a>
      <Header />

      <main
        className="container py-10 space-y-24 mx-auto px-4"
        id="main-content"
      >
        {/* Hero Section */}
        <HeroSection />

        {/* About Section */}
        <AboutSection />

        {/* Projects Section */}
        <ProjectsSection />

        {/* Experience Section */}
        <ExperienceSection />

        {/* Skills Section */}
        <SkillsSection />

        {/* Education Section */}
        <EducationSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
