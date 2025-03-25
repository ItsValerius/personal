import React from "react";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Code, Gamepad2, Icon } from "lucide-react";
import { basketball } from "@lucide/lab";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslations } from "next-intl";

const InterestsSection = () => {
  const t = useTranslations("interests");
  return (
    <section
      id="interests"
      className="scroll-mt-20"
      aria-labelledby="interests-heading"
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <Badge variant="outline" className="text-sm font-medium">
            {t("nav")}
          </Badge>
          <h2
            id="interests-heading"
            className="text-3xl font-bold tracking-tight"
          >
            {t("title")}
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[
            {
              title: t("items.code.title"),
              icon: (
                <Code className="h-10 w-10 text-primary" aria-hidden="true" />
              ),
              description: t("items.code.description"),
            },
            {
              title: t("items.basketball.title"),
              icon: (
                <Icon
                  iconNode={basketball}
                  className="h-10 w-10 text-primary"
                  aria-hidden="true"
                />
              ),
              description: t("items.basketball.description"),
            },
            {
              title: t("items.reading.title"),
              icon: (
                <BookOpen
                  className="h-10 w-10 text-primary"
                  aria-hidden="true"
                />
              ),
              description: t("items.reading.description"),
            },
            {
              title: t("items.gaming.title"),
              icon: (
                <Gamepad2
                  className="h-10 w-10 text-primary"
                  aria-hidden="true"
                />
              ),
              description: t("items.gaming.description"),
            },
          ].map((interest, index) => (
            <Card key={index}>
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <div className="space-y-4">
                  <div className="flex justify-center items-center">
                    {interest.icon}
                  </div>
                  <h3 className="text-xl font-bold">{interest.title}</h3>
                  <p className="text-muted-foreground">
                    {interest.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InterestsSection;
