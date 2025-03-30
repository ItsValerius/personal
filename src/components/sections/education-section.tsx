import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";
import EducationCard from "./education/education-card";

const EducationSection = () => {
  const t = useTranslations("education");
  const education = ["bachelor", "highschool"];
  return (
    <section
      id="education"
      className="scroll-mt-20"
      aria-labelledby="education-heading"
    >
      <div className="space-y-6">
        <Badge variant="outline">{t("nav")}</Badge>
        <h2 className="text-3xl font-bold tracking-tight">{t("title")}</h2>
        {education.map((eduKey) => (
          <EducationCard
            eduKey={eduKey}
            key={eduKey}
            title={t(`${eduKey}.title`)}
            school={t(`${eduKey}.school`)}
            graduation={t(`${eduKey}.graduation`)}
            thesis={eduKey === "bachelor" ? t(`${eduKey}.thesis`) : undefined}
            subjects={
              eduKey === "highschool" ? t(`${eduKey}.subjects`) : undefined
            }
          />
        ))}
      </div>
    </section>
  );
};

export default EducationSection;
