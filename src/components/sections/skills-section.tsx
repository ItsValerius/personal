import { useTranslations } from "next-intl";
import SkillField from "./skills/skill-field";

const SkillsSection = () => {
  const t = useTranslations("skills");

  // core = the focus named in the hero line, set large in the field
  const skills = [
    {
      titleKey: "backend",
      core: ["Laravel", "Filament"],
      skills: [
        "PHP",
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
      core: ["Vue", "React"],
      skills: [
        "TypeScript",
        "JavaScript",
        "Next.js",
        "Blade",
        "jQuery",
        "Tailwind CSS",
        "CSS",
        "SCSS",
      ],
    },
    {
      titleKey: "testing",
      skills: ["PHPUnit", "Pest", "Vitest"],
    },
    {
      titleKey: "devops",
      skills: [
        "Git",
        "Docker",
        "GitHub Actions",
        "Bitbucket Pipelines",
        "Envoyer",
        "AWS",
        "Vercel",
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
        <SkillField
          allLabel={t("all")}
          groups={skills.map((item) => ({
            key: item.titleKey,
            title: t(item.titleKey),
            core: item.core,
            skills: item.skills,
          }))}
        />
      </div>
    </section>
  );
};

export default SkillsSection;
