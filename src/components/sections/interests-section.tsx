import { basketball } from "@lucide/lab";
import { BookOpen, Code, Gamepad2, Icon } from "lucide-react";
import { useTranslations } from "next-intl";
import type { ReactNode } from "react";
import InterestCard from "./interests/interest-card";

const InterestsSection = () => {
  const t = useTranslations("interests");
  const nb = (chunks: ReactNode) => (
    <span className="whitespace-nowrap">{chunks}</span>
  );

  const interests = [
    {
      title: t("items.code.title"),
      icon: <Code className="h-6 w-6 text-primary" aria-hidden="true" />,
      description: t("items.code.description"),
    },
    {
      title: t("items.basketball.title"),
      icon: (
        <Icon
          iconNode={basketball}
          className="h-6 w-6 text-primary"
          aria-hidden="true"
        />
      ),
      description: t("items.basketball.description"),
    },
    {
      title: t("items.reading.title"),
      icon: <BookOpen className="h-6 w-6 text-primary" aria-hidden="true" />,
      description: t.rich("items.reading.description", { nb }),
    },
    {
      title: t("items.gaming.title"),
      icon: <Gamepad2 className="h-6 w-6 text-primary" aria-hidden="true" />,
      description: t("items.gaming.description"),
    },
  ];

  return (
    <section
      id="interests"
      className="scroll-mt-20"
      aria-labelledby="interests-heading"
    >
      <div className="space-y-6">
        <h2
          id="interests-heading"
          className="text-3xl font-bold tracking-tight"
        >
          {t("nav")}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-8">
          {interests.map((interest, index) => (
            <InterestCard
              key={index}
              icon={interest.icon}
              title={interest.title}
              description={interest.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default InterestsSection;
