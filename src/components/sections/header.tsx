"use client";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import Link from "next/link";
import React from "react";
import { LanguageToggle } from "../language-toggle";
import { MobileNav } from "../mobile-nav";
import { Button } from "../ui/button";
const Header = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const t = useTranslations();
  const toggleTheme = React.useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme, setTheme]);
  return (
    <header
      className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      role="banner"
    >
      <div className="container flex h-16 items-center md:justify-between justify-end p-4 mx-auto">
        <nav className="hidden md:flex gap-6" aria-label="Hauptnavigation">
          {[
            "about",
            "experience",
            "education",
            "skills",
            "interests",
            "projects",
          ].map((key) => (
            <Link
              key={key}
              href={`#${key}`}
              className="text-sm font-medium hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              {t(`nav.${key}`)}
            </Link>
          ))}
        </nav>
        <div className="flex justify-center items-center">
          <LanguageToggle />
          <Button
            variant="ghost"
            className={"group/toggle h-8 w-8 px-0 cursor-pointer"}
            onClick={toggleTheme}
          >
            <SunIcon className="hidden [html.dark_&]:block" />
            <MoonIcon className="hidden [html.light_&]:block" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
        <MobileNav />
      </div>
    </header>
  );
};

export default Header;
