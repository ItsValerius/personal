import { Github, Heart, Linkedin, Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

const Footer = () => {
  const t = useTranslations("footer");
  return (
    <footer
      className="border-t py-6 md:py-8 bg-background/95"
      role="contentinfo"
    >
      <div className="container flex flex-col justify-center items-center mx-auto gap-4 px-4 text-center">
        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
          <li>
            <Link
              href="mailto:kueck.valentin@googlemail.com"
              className="inline-flex items-center gap-2 py-2 hover:text-primary transition-colors"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              kueck.valentin@googlemail.com
            </Link>
          </li>
          <li>
            <Link
              href="https://github.com/ItsValerius"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 py-2 hover:text-primary transition-colors"
            >
              <Github className="h-4 w-4" aria-hidden="true" />
              GitHub
            </Link>
          </li>
          <li>
            <Link
              href="https://www.linkedin.com/in/kueck-valentin"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 py-2 hover:text-primary transition-colors"
            >
              <Linkedin className="h-4 w-4" aria-hidden="true" />
              LinkedIn
            </Link>
          </li>
        </ul>
        <div className="flex items-center gap-1 text-muted-foreground">
          {t("made_with")}
          <Heart
            className="h-6 w-6 fill-primary stroke-primary"
            aria-hidden="true"
          />
          <span className="sr-only">{t("love")}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
