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
    <div className="min-h-screen bg-[url('/pencil-dots-colored.svg')] dark:bg-[url('/pencil-dots-colored-dark.svg')] bg-repeat bg-[length:60px_60px] bg-fixed">
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
