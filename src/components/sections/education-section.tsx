import React from "react";
import { Badge } from "@/components/ui/badge";
import { GraduationCap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslations } from "next-intl";

const EducationSection = () => {
  const t = useTranslations("education");
  return (
    <section
      id="education"
      className="scroll-mt-20"
      aria-labelledby="education-heading"
    >
      <div className="space-y-6">
        <Badge variant="outline">{t("nav")}</Badge>
        <h2 className="text-3xl font-bold tracking-tight">{t("title")}</h2>
        {["bachelor", "highschool"].map((eduKey) => (
          <Card key={eduKey}>
            <CardContent className="pt-6">
              <div className="flex flex-col space-y-4">
                <div className="flex items-start gap-4">
                  <GraduationCap className="h-10 w-10 text-primary" />
                  <div>
                    <h3 className="text-xl font-bold">
                      {t(`${eduKey}.title`)}
                    </h3>
                    <p className="text-primary">{t(`${eduKey}.school`)}</p>
                    <Badge variant="secondary" className="mt-1">
                      {t(`${eduKey}.graduation`)}
                    </Badge>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  {eduKey === "bachelor"
                    ? t(`${eduKey}.thesis`)
                    : t(`${eduKey}.subjects`)}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default EducationSection;
