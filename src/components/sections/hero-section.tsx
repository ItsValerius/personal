import { Github, Linkedin, Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
const HeroSection = () => {
  const t = useTranslations("hero");
  return (
    <section
      className="py-12 md:py-20 md:flex md:flex-row grid items-center gap-8 md:gap-16"
      aria-labelledby="hero-heading"
    >
      <div className="w-full md:w-1/2 space-y-6 flex justify-center flex-col items-center md:items-start ">
        <h1
          id="hero-heading"
          className="text-4xl md:text-6xl font-bold tracking-tight text-center md:text-start"
        >
          {t("title")}
          <span className="text-primary">Valentin</span> :)
        </h1>
        <p className="text-xl text-muted-foreground text-center md:text-start text-balance">
          {t("subtitle")}
        </p>
        <div className="flex flex-wrap justify-center md:justify-start gap-3 pt-2">
          <Button asChild size="lg">
            <Link href="mailto:kueck.valentin@googlemail.com">
              <Mail aria-hidden="true" />
              E-Mail
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link
              href="https://github.com/ItsValerius"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github aria-hidden="true" />
              GitHub
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link
              href="https://www.linkedin.com/in/kueck-valentin"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin aria-hidden="true" />
              LinkedIn
            </Link>
          </Button>
        </div>
      </div>
      <div className="w-full md:w-1/2 flex justify-center md:justify-start row-start-1">
        <div className="relative w-48 h-48 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary">
          <Image
            src="/me.jpg"
            alt="Valentin Kück"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 192px, 320px"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
