import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";

interface NavigationLinkProps {
  item: string;
  onClick?: () => void;
}

const NavigationLink: React.FC<NavigationLinkProps> = ({ item, onClick }) => {
  const t = useTranslations();
  return (
    <Link
      href={`#${item}`}
      onClick={onClick}
      className="text-sm font-medium hover:text-primary transition-colors
               focus-visible:outline-none focus-visible:ring-2
               focus-visible:ring-primary focus-visible:ring-offset-2"
    >
      {t(`${item}.nav`)}
    </Link>
  );
};

export default NavigationLink;
