import React from "react";
import { Badge } from "../ui/badge";
import { ArrowUpRight } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { useTranslations } from "next-intl";
import Link from "next/link";

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
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <h3 className="text-xl font-bold">{t("kg.title")}</h3>
                <p className="text-muted-foreground">{t("kg.description")}</p>
                <div
                  className="flex flex-wrap gap-2"
                  aria-label="Verwendete Technologien"
                >
                  {[
                    "Next.js",
                    "Tailwindcss",
                    "Drizzle",
                    "Postgres",
                    "Auth.js",
                    "Shadcn/ui",
                  ].map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button
                    asChild
                    variant="outline"
                    className="hover:bg-primary group"
                  >
                    <Link
                      className=" flex gap-1 "
                      href="https://github.com/ItsValerius/kg-work-plan"
                      target="_blank"
                    >
                      Github
                      <ArrowUpRight className="w-6 h-6 group-hover:translate-x-0.5 duration-200 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="hover:bg-primary group"
                  >
                    <Link
                      className=" flex gap-1 "
                      href="https://arbeitsplan.knallkoepp-golkrath.de/"
                      target="_blank"
                    >
                      Website
                      <ArrowUpRight className="w-6 h-6 group-hover:translate-x-0.5 duration-200 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <h3 className="text-xl font-bold">{t("cbis.title")}</h3>
                <p className="text-muted-foreground">{t("cbis.description")}</p>
                <div
                  className="flex flex-wrap gap-2"
                  aria-label="Verwendete Technologien"
                >
                  {[
                    "Next.js",
                    "Tailwindcss",
                    "Drizzle",
                    "Postgres",
                    "Auth.js",
                    "Shadcn/ui",
                    "Redis",
                  ].map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Button
                  asChild
                  variant="outline"
                  className="hover:bg-primary group"
                >
                  <Link
                    className=" flex gap-1 "
                    href="https://github.com/ItsValerius/cbis"
                    target="_blank"
                  >
                    Github
                    <ArrowUpRight className="w-6 h-6 group-hover:translate-x-0.5 duration-200 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <h3 className="text-xl font-bold"> {t("mowas.title")}</h3>
                <p className="text-muted-foreground">
                  {t("mowas.description")}
                </p>
                <div
                  className="flex flex-wrap gap-2"
                  aria-label="Verwendete Technologien"
                >
                  {["Backend", "Integration", "Warnmeldungen", "DOOH"].map(
                    (tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    )
                  )}
                </div>
                <p className="text-muted-foreground">{t("mowas.paragraph")}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
