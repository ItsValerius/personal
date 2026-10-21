"use client";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import React from "react";
import { LanguageToggle } from "../language-toggle";
import MobileNavigation from "./navigation/mobile-navigation";
import { Button } from "../ui/button";
import Navigation from "./navigation/desktop-navigation";
const Header = () => {
  const t = useTranslations("header");
  const { setTheme, resolvedTheme } = useTheme();

  const toggleTheme = React.useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme, setTheme]);

  const navItems = [
    "about",
    "projects",
    "experience",
    "skills",
    "education",
    "interests",
  ];

  return (
    <header
      className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      role="banner"
    >
      <div className="container flex h-16 items-center md:justify-between justify-end p-4 mx-auto">
        <Navigation items={navItems} />
        <div className="flex justify-center items-center">
          <LanguageToggle />
          <Button
            variant="ghost"
            className="size-10 cursor-pointer"
            onClick={toggleTheme}
          >
            <SunIcon className="hidden [html.dark_&]:block" />
            <MoonIcon className="hidden [html.light_&]:block" />
            <span className="sr-only">{t("toggleTheme")}</span>
          </Button>
        </div>
        <MobileNavigation items={navItems} />
      </div>
    </header>
  );
};

export default Header;
