import { Heart } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

const Footer = () => {
  const t = useTranslations("footer");
  return (
    <footer
      className="border-t py-3 md:py-5 bg-background/95 "
      role="contentinfo"
    >
      <div className="container flex flex-col justify-center items-center mx-auto gap-4 text-center">
        <div className="flex gap-1">
          {t("made_with")}
          <Link href="/heartrate">
            <Heart
              className="h-6 w-6 fill-primary stroke-primary"
              aria-hidden="true"
            />
          </Link>
          <span className="sr-only">{t("love")}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
