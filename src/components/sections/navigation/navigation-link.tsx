"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";

interface NavigationLinkProps {
  item: string;
  onClick?: () => void;
}

const NavigationLink: React.FC<NavigationLinkProps> = ({ item, onClick }) => {
  const t = useTranslations(item);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  // If we're not on the home page, link to home page with hash
  // Otherwise, use hash link for same-page navigation
  const href = isHomePage ? `#${item}` : `/#${item}`;

  return (
    <Link
      href={href}
      onClick={onClick}
      className="text-sm font-medium hover:text-primary transition-colors
               focus-visible:outline-none focus-visible:ring-2
               focus-visible:ring-primary focus-visible:ring-offset-2"
    >
      {t("nav")}
    </Link>
  );
};

export default NavigationLink;
