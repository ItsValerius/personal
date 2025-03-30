// ExperienceSection.jsx
import { Badge } from "@/components/ui/badge";
import { useMessages, useTranslations } from "next-intl";

import ExperienceItem from "./experience/experience-item";

const ExperienceSection = () => {
  const t = useTranslations("experience");
  const messages = useMessages();

  // Create an array of job data
  const jobs = [
    {
      title: t("jb.title"),
      start: t("jb.start"),
      company: t("jb.title"),
      tasks: Object.keys(messages.experience.jb.tasks).map((task) =>
        t(`jb.tasks.${task}`)
      ),
      technologies: ["Laravel", "Vue", "Blade", "JQuery", "SCSS", "Filament"],
    },
    {
      title: t("rbl.title"),
      start: t("rbl.start"),
      company: t("rbl.company"),
      tasks: Object.keys(messages.experience.rbl.tasks).map((task) =>
        t(`rbl.tasks.${task}`)
      ),
    },
  ];

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
          {jobs.map((job, idx) => (
            <ExperienceItem
              key={idx}
              title={job.title}
              start={job.start}
              company={job.company}
              tasks={job.tasks}
              technologies={job.technologies}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
