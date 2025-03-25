import React from "react";
import { Badge } from "@/components/ui/badge";
import { useMessages, useTranslations } from "next-intl";

const ExperienceSection = () => {
  const t = useTranslations("experience");
  const messages = useMessages();
  return (
    <section
      id="experience"
      className="scroll-mt-20"
      aria-labelledby="experience-heading"
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <Badge variant="outline" className="text-sm font-medium">
            {t("nav")}
          </Badge>
          <h2
            id="experience-heading"
            className="text-3xl font-bold tracking-tight"
          >
            {t("title")}
          </h2>
        </div>
        <div className="space-y-8">
          <div className="relative pl-8 border-l-2 border-muted pb-8">
            <div
              className="absolute w-4 h-4 bg-primary rounded-full -left-[9px] top-1"
              aria-hidden="true"
            ></div>
            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="text-xl font-bold">{t("jb.title")}</h3>
                <Badge variant="secondary"> {t("jb.start")}</Badge>
              </div>
              <p className="text-lg text-primary">{t("jb.title")}</p>
              <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                {Object.keys(messages.experience.jb.tasks).map((task) => (
                  <li key={task}>{t(`jb.tasks.${task}`)}</li>
                ))}
              </ul>
              <div
                className="flex flex-wrap gap-2 pt-2"
                aria-label="Verwendete Technologien"
              >
                {["Laravel", "Vue", "Blade", "JQuery", "SCSS", "Filament"].map(
                  (skill) => (
                    <Badge key={skill} variant="outline">
                      {skill}
                    </Badge>
                  )
                )}
              </div>
            </div>
          </div>

          <div className="relative pl-8 border-l-2 border-muted pb-8 last:pb-0">
            <div
              className="absolute w-4 h-4 bg-primary rounded-full -left-[9px] top-1"
              aria-hidden="true"
            ></div>
            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="text-xl font-bold">{t("rbl.title")} </h3>
                <Badge variant="secondary">{t("jb.start")}</Badge>
              </div>
              <p className="text-lg text-primary">{t("jb.company")}</p>
              <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                {Object.keys(messages.experience.rbl.tasks).map((task) => (
                  <li key={task}>{t(`rbl.tasks.${task}`)}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
