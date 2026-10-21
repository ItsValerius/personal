import { Briefcase, Mail, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
const AboutSection = () => {
  const t = useTranslations("about");
  return (
    <section
      id="about"
      className="scroll-mt-20"
      aria-labelledby="about-heading"
    >
      <div className="space-y-6">
        <h2 id="about-heading" className="text-3xl font-bold tracking-tight">
          {t("nav")}
        </h2>
        <div className="max-w-2xl">
          <div className="space-y-4">
            <p className="text-lg text-muted-foreground">
              {t.rich("description", {
                link: (chunks) => (
                  <Link
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline underline-offset-4"
                    href="https://johnnybytes.com"
                  >
                    {chunks}
                  </Link>
                ),
              })}
            </p>
            <div className="grid grid-cols-1 gap-3 pt-2">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" aria-hidden="true" />
                <Link
                  className="underline underline-offset-4 text-primary"
                  href="https://www.google.com/maps/search/?api=1&query=erkelenz"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("location")}
                </Link>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" aria-hidden="true" />
                <Link
                  className="underline underline-offset-4 text-primary"
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
