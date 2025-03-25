import React from "react";
import { Badge } from "@/components/ui/badge";
import { Code, Languages } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslations } from "next-intl";

const SkillsSection = () => {
  const t = useTranslations("skills");
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
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col space-y-4">
                <div className="flex items-center justify-center">
                  <Code className="h-10 w-10 text-primary" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-center">
                  {t(`backend`)}
                </h3>
                <div
                  className="flex flex-wrap gap-2 justify-center"
                  aria-label="Backend Technologien"
                >
                  <Badge className="px-3 py-1">PHP</Badge>
                  <Badge className="px-3 py-1">Laravel</Badge>
                  <Badge className="px-3 py-1">Filament</Badge>
                  <Badge className="px-3 py-1">Node.js</Badge>
                  <Badge className="px-3 py-1">MySQL</Badge>
                  <Badge className="px-3 py-1">PostgreSQL</Badge>
                  <Badge className="px-3 py-1">Redis</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col space-y-4">
                <div className="flex items-center justify-center">
                  <Code className="h-10 w-10 text-primary" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-center">
                  {t(`frontend`)}
                </h3>
                <div
                  className="flex flex-wrap gap-2 justify-center"
                  aria-label="Frontend Technologien"
                >
                  <Badge className="px-3 py-1">JavaScript</Badge>
                  <Badge className="px-3 py-1">TypeScript</Badge>
                  <Badge className="px-3 py-1">Vue</Badge>
                  <Badge className="px-3 py-1">React</Badge>
                  <Badge className="px-3 py-1">Next.js</Badge>
                  <Badge className="px-3 py-1">CSS</Badge>
                  <Badge className="px-3 py-1">Tailwind</Badge>
                  <Badge className="px-3 py-1">SCSS</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col space-y-4">
                <div className="flex items-center justify-center">
                  <Code className="h-10 w-10 text-primary" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-center">{t(`others`)}</h3>
                <div
                  className="flex flex-wrap gap-2 justify-center"
                  aria-label="Weitere Technologien"
                >
                  <Badge className="px-3 py-1">Docker</Badge>
                  <Badge className="px-3 py-1">Git</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col space-y-4">
                <div className="flex items-center justify-center">
                  <Languages
                    className="h-10 w-10 text-primary"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="text-xl font-bold text-center">
                  {t(`languages`)}
                </h3>
                <div
                  className="flex flex-wrap gap-2 justify-center"
                  aria-label="Sprachkenntnisse"
                >
                  <Badge className="px-3 py-1">
                    {t(`languageBadges.german`)}
                  </Badge>
                  <Badge className="px-3 py-1">
                    {t(`languageBadges.english`)}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
