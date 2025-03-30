import { useTranslations } from "next-intl";
import { Badge } from "../ui/badge";
import ProjectCard from "./projectes/project-card";

const ProjectsSection = () => {
  const t = useTranslations("projects");
  return (
    <section
      id="projects"
      className="scroll-mt-20"
      aria-labelledby="projects-heading"
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <Badge variant="outline" className="text-sm font-medium">
            {t("nav")}
          </Badge>
          <h2
            id="projects-heading"
            className="text-3xl font-bold tracking-tight"
          >
            {t("title")}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProjectCard
            title={t("kg.title")}
            description={t("kg.description")}
            technologies={[
              "Next.js",
              "Tailwindcss",
              "Drizzle",
              "Postgres",
              "Auth.js",
              "Shadcn/ui",
            ]}
            links={[
              {
                text: "Github",
                url: "https://github.com/ItsValerius/kg-work-plan",
              },
              {
                text: "Website",
                url: "https://arbeitsplan.knallkoepp-golkrath.de/",
              },
            ]}
          />
          <ProjectCard
            title={t("cbis.title")}
            description={t("cbis.description")}
            technologies={[
              "Next.js",
              "Tailwindcss",
              "Drizzle",
              "Postgres",
              "Auth.js",
              "Shadcn/ui",
              "Redis",
            ]}
            links={[
              {
                text: "Github",
                url: "https://github.com/ItsValerius/cbis",
              },
            ]}
          />
          <ProjectCard
            title={t("personal.title")}
            description={t("personal.description")}
            technologies={["Next.js", "Tailwindcss", "Shadcn/ui"]}
            links={[
              {
                text: "Github",
                url: "https://github.com/ItsValerius/personal",
              },
              {
                text: "Website",
                url: "https://kueck.me/",
              },
            ]}
          />
          <ProjectCard
            title={t("mowas.title")}
            description={t("mowas.description")}
            technologies={["Backend", "Integration", "Warnmeldungen", "DOOH"]}
            additionalParagraph={t("mowas.paragraph")}
          />
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
