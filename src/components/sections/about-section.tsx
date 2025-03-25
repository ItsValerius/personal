import React from "react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { MapPin, Mail, Briefcase } from "lucide-react";
import { useTranslations } from "next-intl";
const AboutSection = () => {
  const t = useTranslations("about");
  return (
    <section
      id="about"
      className="scroll-mt-20"
      aria-labelledby="about-heading"
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <Badge variant="outline" className="text-sm font-medium">
            {t("nav")}
          </Badge>
          <h2 id="about-heading" className="text-3xl font-bold tracking-tight">
            {t("title")}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <p className="text-muted-foreground">
              {t.rich("description", {
                link: (chunks) => (
                  <Link
                    target="_blank"
                    className="text-primary underline"
                    href="https://johnnybytes.com"
                  >
                    {chunks}
                  </Link>
                ),
              })}
            </p>
            <div className="grid grid-cols-1 gap-4 pt-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" aria-hidden="true" />
                <Link
                  className="underline text-primary"
                  href="https://www.google.com/maps/search/?api=1&query=erkelenz"
                  target="_blank"
                >
                  {t("location")}
                </Link>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" aria-hidden="true" />
                <Link
                  className="underline text-primary"
                  href="mailto:kueck.valentin@googlemail.com"
                >
                  kueck.valentin@googlemail.com
                </Link>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase
                  className="h-5 w-5 text-primary"
                  aria-hidden="true"
                />
                <span>{t("position")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
