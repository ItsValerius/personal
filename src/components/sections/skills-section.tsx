import { useTranslations } from "next-intl";
import SkillCard from "./skills/skill-card";

const SkillsSection = () => {
  const t = useTranslations("skills");

  const skills = [
    {
      titleKey: "backend",
      skills: [
        "PHP",
        "Laravel",
        "Filament",
        "Node.js",
        "REST-APIs",
        "MySQL",
        "PostgreSQL",
        "SQLite",
        "Drizzle ORM",
        "Redis",
      ],
    },
    {
      titleKey: "frontend",
      skills: [
        "JavaScript",
        "TypeScript",
        "Vue",
        "React",
        "Next.js",
        "Blade",
        "jQuery",
        "CSS",
        "Tailwind CSS",
        "SCSS",
      ],
    },
    {
      titleKey: "others",
      skills: [
        "Docker",
        "Git",
        "AWS",
        "GitHub Actions",
        "Bitbucket Pipelines",
        "Envoyer",
        "Vercel",
        "PHPUnit",
        "Pest",
        "Vitest",
      ],
    },
    {
      titleKey: "languages",
      skills: [t("languageBadges.german"), t("languageBadges.english")],
    },
  ];

  return (
    <section
      id="skills"
      className="scroll-mt-20"
      aria-labelledby="skills-heading"
    >
      <div className="space-y-6">
        <h2 id="skills-heading" className="text-3xl font-bold tracking-tight">
          {t("nav")}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
          {skills.map((item, index) => (
            <SkillCard
              key={index}
              title={t(item.titleKey)}
              skills={item.skills}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
