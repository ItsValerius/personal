import { useTranslations } from "next-intl";
import EducationCard from "./education/education-card";

const EducationSection = () => {
  const t = useTranslations("education");
  const education = [
    ["bachelor", "thesis"],
    ["highschool", "subjects"],
  ] as const;
  return (
    <section
      id="education"
      className="scroll-mt-20"
      aria-labelledby="education-heading"
    >
      <div className="space-y-6">
        <h2
          id="education-heading"
          className="text-3xl font-bold tracking-tight"
        >
          {t("nav")}
        </h2>
        <ol className="border-b">
          {education.map(([eduKey, detailKey]) => (
            <EducationCard
              key={eduKey}
              title={t(`${eduKey}.title`)}
              school={t(`${eduKey}.school`)}
              graduation={t(`${eduKey}.graduation`)}
              detail={t(`${eduKey}.${detailKey}`)}
            />
          ))}
        </ol>
      </div>
    </section>
  );
};

export default EducationSection;
