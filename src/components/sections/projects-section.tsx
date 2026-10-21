import { useTranslations } from "next-intl";
import ProjectCarousel from "./projectes/project-carousel";

const ProjectsSection = () => {
  const t = useTranslations("projects");
  return (
    <section
      id="projects"
      className="scroll-mt-20"
      aria-labelledby="projects-heading"
    >
      <ProjectCarousel
        heading={t("nav")}
        headingId="projects-heading"
        projects={[
          {
            title: t("kg.title"),
            meta: t("kg.meta"),
            description: t("kg.description"),
            technologies: ["Next.js", "TypeScript", "Drizzle", "Postgres"],
            links: [
              {
                text: "Arbeitsplan",
                url: "https://arbeitsplan.knallkoepp-golkrath.de/",
              },
              {
                text: "Sessionsplan",
                url: "https://sessionsplan.knallkoepp-golkrath.de/",
              },
              {
                text: "Biwak",
                url: "https://biwak.knallkoepp-golkrath.de/",
              },
            ],
            repo: "https://github.com/ItsValerius/kg-work-plan",
            screenshots: [
              {
                src: "/projects/arbeitsplan.png",
                alt: t("kg.screenshots.arbeitsplan"),
              },
              {
                src: "/projects/sessionsplan.png",
                alt: t("kg.screenshots.sessionsplan"),
              },
            ],
          },
          {
            title: t("mowas.title"),
            meta: t("mowas.paragraph"),
            description: t("mowas.description"),
            technologies: ["Node.js", "REST-APIs", "Broadsign", "DOOH"],
            cover: "MoWaS",
          },
          {
            title: t("cbis.title"),
            description: t("cbis.description"),
            technologies: ["Next.js", "Tailwind CSS", "Drizzle", "Postgres"],
            repo: "https://github.com/ItsValerius/cbis",
            cover: "Billsplit",
          },
          {
            title: t("personal.title"),
            description: t("personal.description"),
            technologies: ["Next.js", "Tailwind CSS", "shadcn/ui"],
            links: [{ text: "Website", url: "https://kueck.me/" }],
            repo: "https://github.com/ItsValerius/personal",
            screenshots: [
              {
                src: "/projects/personal.png",
                alt: t("personal.screenshot"),
              },
            ],
          },
        ]}
      />
    </section>
  );
};

export default ProjectsSection;
