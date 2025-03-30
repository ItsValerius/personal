import React from "react";
import { Badge } from "@/components/ui/badge";
import { Code, Languages } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import SkillCard from "./skills/skill-card";

const SkillsSection = () => {
  const t = useTranslations("skills");

  const skills = [
    {
      icon: <Code className="h-10 w-10 text-primary" aria-hidden="true" />,
      titleKey: "backend",
      skills: [
        "PHP",
        "Laravel",
        "Filament",
        "Node.js",
        "MySQL",
        "PostgreSQL",
        "Redis",
      ],
      ariaLabel: "Backend Technologien",
    },
    {
      icon: <Code className="h-10 w-10 text-primary" aria-hidden="true" />,
      titleKey: "frontend",
      skills: [
        "JavaScript",
        "TypeScript",
        "Vue",
        "React",
        "Next.js",
        "CSS",
        "Tailwind",
        "SCSS",
      ],
      ariaLabel: "Frontend Technologien",
    },
    {
      icon: <Code className="h-10 w-10 text-primary" aria-hidden="true" />,
      titleKey: "others",
      skills: ["Docker", "Git"],
      ariaLabel: "Weitere Technologien",
    },
    {
      icon: <Languages className="h-10 w-10 text-primary" aria-hidden="true" />,
      titleKey: "languages",
      skills: [t("languageBadges.german"), t("languageBadges.english")],
      ariaLabel: "Sprachkenntnisse",
    },
  ];

  return (
    <section
      id="skills"
      className="scroll-mt-20"
      aria-labelledby="skills-heading"
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <Badge variant="outline" className="text-sm font-medium">
            {t("nav")}
          </Badge>
          <h2 id="skills-heading" className="text-3xl font-bold tracking-tight">
            {t("title")}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((item, index) => (
            <SkillCard
              key={index}
              icon={item.icon}
              title={t(item.titleKey)}
              skills={item.skills}
              ariaLabel={item.ariaLabel}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
