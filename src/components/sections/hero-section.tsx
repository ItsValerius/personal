"use client";
import React from "react";
import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
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
          className="text-4xl md:text-6xl font-bold tracking-tight"
        >
          {t("title")}
          <span className="text-primary">Valentin </span> :)
        </h1>
        <p className="text-xl text-muted-foreground text-center md:text-start">
          {t("subtitle")}
        </p>
        <div className="flex gap-4 pt-4">
          <Link
            href="https://github.com/ItsValerius"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            aria-label="GitHub Profil"
          >
            <Github className="h-6 w-6" />
          </Link>
          <Link
            href="https://www.linkedin.com/in/kueck-valentin"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            aria-label="LinkedIn Profil"
          >
            <Linkedin className="h-6 w-6" />
          </Link>
          <Link
            href="mailto:kueck.valentin@googlemail.com"
            className="text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            aria-label="E-Mail senden"
          >
            <Mail className="h-6 w-6" />
          </Link>
        </div>
      </div>
      <div className="w-full md:w-1/2 flex justify-center md:justify-start row-start-1">
        <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary">
          <Image
            src="/me.jpg"
            alt="Porträtfoto von Valentin Kück"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 256px, 320px"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
