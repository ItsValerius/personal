"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  Briefcase,
  GraduationCap,
  Code,
  BookOpen,
  Gamepad2,
  Languages,
  Heart,
  Moon,
  Sun,
  ArrowUpRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "lucide-react";
import { basketball } from "@lucide/lab";
import { useEffect, useState } from "react";
import { MobileNav } from "@/components/mobile-nav";

export default function Home() {
  // State for dark mode toggle
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Effect to initialize dark mode based on user preference
  useEffect(() => {
    // Check for user preference in localStorage
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div
      className={`min-h-screen bg-[url('/pencil-dots-colored.svg')] dark:bg-[url('/pencil-dots-colored-dark.svg')] bg-repeat bg-[length:60px_60px] bg-fixed ${
        isDarkMode ? "dark" : ""
      }`}
    >
      {/* Skip to content link for keyboard users */}
      <a href="#about" className="skip-to-content">
        Zum Inhalt springen
      </a>

      {/* Header */}
      <header
        className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        role="banner"
      >
        <div className="container flex h-16 items-center md:justify-between justify-end p-4 mx-auto">
          <nav className="hidden md:flex gap-6" aria-label="Hauptnavigation">
            <Link
              href="#about"
              className="text-sm font-medium hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              Über mich
            </Link>
            <Link
              href="#experience"
              className="text-sm font-medium hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              Erfahrung
            </Link>
            <Link
              href="#education"
              className="text-sm font-medium hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              Bildung
            </Link>
            <Link
              href="#skills"
              className="text-sm font-medium hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              Kenntnisse
            </Link>
            <Link
              href="#interests"
              className="text-sm font-medium hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              Interessen
            </Link>
            <Link
              href="#projects"
              className="text-sm font-medium hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              Projekte
            </Link>
          </nav>

          {/* Dark mode toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            aria-pressed={isDarkMode}
            aria-label={
              isDarkMode
                ? "Zum hellen Modus wechseln"
                : "Zum dunklen Modus wechseln"
            }
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
          <MobileNav />
        </div>
      </header>

      <main
        className="container py-10 space-y-20 mx-auto px-2"
        id="main-content"
      >
        {/* Hero Section */}
        <section
          className="py-12 md:py-20 md:flex md:flex-row grid items-center gap-8 md:gap-16"
          aria-labelledby="hero-heading"
        >
          <div className="w-full md:w-1/2 space-y-6 flex justify-center flex-col items-center md:items-start ">
            <h1
              id="hero-heading"
              className="text-4xl md:text-6xl font-bold tracking-tight"
            >
              Hi! Ich bin <span className="text-primary">Valentin</span>
            </h1>
            <p className="text-xl text-muted-foreground text-center md:text-start">
              Full Stack Entwickler mit Fokus auf PHP/Laravel und
              JavaScript/TypeScript
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
              />
            </div>
          </div>
        </section>

        {/* About Section */}
        <section
          id="about"
          className="scroll-mt-20 "
          aria-labelledby="about-heading"
        >
          <div className="space-y-6">
            <div className="space-y-2">
              <Badge variant="outline" className="text-sm font-medium">
                Über mich
              </Badge>
              <h2
                id="about-heading"
                className="text-3xl font-bold tracking-tight"
              >
                Persönliche Informationen
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Ich bin ein Full Stack Entwickler mit Erfahrung in der
                  Entwicklung von Webanwendungen mit PHP/Laravel und
                  JavaScript/TypeScript. Derzeit studiere ich
                  Wirtschaftsinformatik an der FH Aachen und arbeite als
                  Werkstudent bei{" "}
                  <Link
                    href="https://johnnybytes.com"
                    className="underline text-primary"
                    target="_blank"
                  >
                    Johnny Bytes GmbH
                  </Link>
                </p>
                <div className="grid grid-cols-1 gap-4 pt-4">
                  <div className="flex items-center gap-2">
                    <MapPin
                      className="h-5 w-5 text-primary"
                      aria-hidden="true"
                    />
                    <Link
                      className="underline text-primary"
                      href="https://www.google.com/maps/search/?api=1&query=erkelenz"
                      target="_blank"
                    >
                      Erkelenz, Deutschland
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
                    <span>Werkstudent Software Engineer</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section
          id="experience"
          className="scroll-mt-20"
          aria-labelledby="experience-heading"
        >
          <div className="space-y-6">
            <div className="space-y-2">
              <Badge variant="outline" className="text-sm font-medium">
                Erfahrung
              </Badge>
              <h2
                id="experience-heading"
                className="text-3xl font-bold tracking-tight"
              >
                Mein beruflicher Werdegang
              </h2>
            </div>
            <div className="space-y-8">
              <div className="relative pl-8 border-l-2 border-muted pb-8">
                <div
                  className="absolute w-4 h-4 bg-primary rounded-full -left-[9px] top-1"
                  aria-hidden="true"
                ></div>
                <div className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <h3 className="text-xl font-bold">
                      Werkstudent Software Engineer/ Full Stack Entwickler
                    </h3>
                    <Badge variant="secondary">seit September 2023</Badge>
                  </div>
                  <p className="text-lg text-primary">
                    Johnny Bytes GmbH (Köln, DE)
                  </p>
                  <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                    <li>
                      Wartung und Instandhaltung von Bestandssystemen Backend
                      (Laravel) / Frontend (Vue, Blade, JQuery, SCSS)
                    </li>
                    <li>
                      Entwicklung von Backends und Admin Panel (Laravel,
                      Filament)
                    </li>
                  </ul>
                  <div
                    className="flex flex-wrap gap-2 pt-2"
                    aria-label="Verwendete Technologien"
                  >
                    {[
                      "Laravel",
                      "Vue",
                      "Blade",
                      "JQuery",
                      "SCSS",
                      "Filament",
                    ].map((skill) => (
                      <Badge key={skill} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="relative pl-8 border-l-2 border-muted pb-8 last:pb-0">
                <div
                  className="absolute w-4 h-4 bg-primary rounded-full -left-[9px] top-1"
                  aria-hidden="true"
                ></div>
                <div className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <h3 className="text-xl font-bold">
                      Werkstudent DOOH IT & Administration
                    </h3>
                    <Badge variant="secondary">
                      Oktober 2021 - September 2023
                    </Badge>
                  </div>
                  <p className="text-lg text-primary">
                    RBL Media GmbH (Erkelenz, DE)
                  </p>
                  <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                    <li>
                      Sicherstellung des Betriebs bestehender Digitaler
                      Außenwerbeflächen
                    </li>
                    <li>Support bei Errichtung neuer Werbeflächen</li>
                    <li>
                      Entwicklung eines Backends zur Integration von MoWaS
                      Warnmeldungen
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section
          id="education"
          className="scroll-mt-20"
          aria-labelledby="education-heading"
        >
          <div className="space-y-6">
            <div className="space-y-2">
              <Badge variant="outline" className="text-sm font-medium">
                Bildung
              </Badge>
              <h2
                id="education-heading"
                className="text-3xl font-bold tracking-tight"
              >
                Meine Ausbildung
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-start gap-4">
                      <GraduationCap
                        className="h-10 w-10 text-primary"
                        aria-hidden="true"
                      />
                      <div>
                        <h3 className="text-xl font-bold">
                          Studium der Wirtschaftsinformatik (Bachelor of
                          Science)
                        </h3>
                        <p className="text-primary">
                          FH Aachen - University of Applied Sciences
                        </p>
                        <Badge variant="secondary" className="mt-1">
                          voraussichtlich Mai 2025
                        </Badge>
                      </div>
                    </div>
                    <p className="text-muted-foreground">
                      Abschlussarbeit: &quot;Konzeption und Realisierung einer
                      skalierbaren Integrations- und Transformationsarchitektur
                      für digitales Marketing&quot;
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-start gap-4">
                      <GraduationCap
                        className="h-10 w-10 text-primary"
                        aria-hidden="true"
                      />
                      <div>
                        <h3 className="text-xl font-bold">Abitur</h3>
                        <p className="text-primary">
                          Cusanus Gymnasium Erkelenz
                        </p>
                        <Badge variant="secondary" className="mt-1">
                          Mai 2018
                        </Badge>
                      </div>
                    </div>
                    <p className="text-muted-foreground">
                      Leistungskurse: Englisch, Geschichte
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section
          id="skills"
          className="scroll-mt-20"
          aria-labelledby="skills-heading"
        >
          <div className="space-y-6">
            <div className="space-y-2">
              <Badge variant="outline" className="text-sm font-medium">
                Kenntnisse
              </Badge>
              <h2
                id="skills-heading"
                className="text-3xl font-bold tracking-tight"
              >
                Meine Fähigkeiten
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center justify-center">
                      <Code
                        className="h-10 w-10 text-primary"
                        aria-hidden="true"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-center">
                      Backend Entwicklung
                    </h3>
                    <div
                      className="flex flex-wrap gap-2 justify-center"
                      aria-label="Backend Technologien"
                    >
                      <Badge className="px-3 py-1">PHP</Badge>
                      <Badge className="px-3 py-1">Laravel</Badge>
                      <Badge className="px-3 py-1">Filament</Badge>
                      <Badge className="px-3 py-1">Node.js</Badge>
                      <Badge className="px-3 py-1">MySQL</Badge>
                      <Badge className="px-3 py-1">PostgreSQL</Badge>
                      <Badge className="px-3 py-1">Redis</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center justify-center">
                      <Code
                        className="h-10 w-10 text-primary"
                        aria-hidden="true"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-center">
                      Frontend Entwicklung
                    </h3>
                    <div
                      className="flex flex-wrap gap-2 justify-center"
                      aria-label="Frontend Technologien"
                    >
                      <Badge className="px-3 py-1">JavaScript</Badge>
                      <Badge className="px-3 py-1">TypeScript</Badge>
                      <Badge className="px-3 py-1">Vue</Badge>
                      <Badge className="px-3 py-1">React</Badge>
                      <Badge className="px-3 py-1">Next.js</Badge>
                      <Badge className="px-3 py-1">CSS</Badge>
                      <Badge className="px-3 py-1">Tailwind</Badge>
                      <Badge className="px-3 py-1">SCSS</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center justify-center">
                      <Code
                        className="h-10 w-10 text-primary"
                        aria-hidden="true"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-center">
                      Weitere Technologien
                    </h3>
                    <div
                      className="flex flex-wrap gap-2 justify-center"
                      aria-label="Weitere Technologien"
                    >
                      <Badge className="px-3 py-1">Docker</Badge>
                      <Badge className="px-3 py-1">Git</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center justify-center">
                      <Languages
                        className="h-10 w-10 text-primary"
                        aria-hidden="true"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-center">Sprachen</h3>
                    <div
                      className="flex flex-wrap gap-2 justify-center"
                      aria-label="Sprachkenntnisse"
                    >
                      <Badge className="px-3 py-1">
                        Deutsch (Muttersprache)
                      </Badge>
                      <Badge className="px-3 py-1">Englisch (fließend)</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Interests Section */}
        <section
          id="interests"
          className="scroll-mt-20"
          aria-labelledby="interests-heading"
        >
          <div className="space-y-6">
            <div className="space-y-2">
              <Badge variant="outline" className="text-sm font-medium">
                Interessen
              </Badge>
              <h2
                id="interests-heading"
                className="text-3xl font-bold tracking-tight"
              >
                Was mich begeistert
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {[
                {
                  title: "Programmieren",
                  icon: (
                    <Code
                      className="h-10 w-10 text-primary"
                      aria-hidden="true"
                    />
                  ),
                  description:
                    "Entwicklung von Webanwendungen und Erlernen neuer Technologien.",
                },
                {
                  title: "Basketball",
                  icon: (
                    <Icon
                      iconNode={basketball}
                      className="h-10 w-10 text-primary"
                      aria-hidden="true"
                    />
                  ),
                  description:
                    "Seit mehr als 10 Jahren aktiv im lokalen Verein.",
                },
                {
                  title: "Lesen",
                  icon: (
                    <BookOpen
                      className="h-10 w-10 text-primary"
                      aria-hidden="true"
                    />
                  ),
                  description:
                    "Bücher über Science-Fiction, Fantasy oder was mir gerade so gefällt.",
                },
                {
                  title: "Videospiele",
                  icon: (
                    <Gamepad2
                      className="h-10 w-10 text-primary"
                      aria-hidden="true"
                    />
                  ),
                  description:
                    "Kompetitive Online-Games oder entspannte Aufbauspiele.",
                },
              ].map((interest, index) => (
                <Card key={index}>
                  <CardContent className="pt-6 flex flex-col items-center text-center">
                    <div className="space-y-4">
                      <div className="flex justify-center items-center">
                        {interest.icon}
                      </div>
                      <h3 className="text-xl font-bold">{interest.title}</h3>
                      <p className="text-muted-foreground">
                        {interest.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section
          id="projects"
          className="scroll-mt-20"
          aria-labelledby="projects-heading"
        >
          <div className="space-y-6">
            <div className="space-y-2">
              <Badge variant="outline" className="text-sm font-medium">
                Projekte
              </Badge>
              <h2
                id="projects-heading"
                className="text-3xl font-bold tracking-tight"
              >
                Meine Arbeit
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold">
                      Arbeitsplan für Karnevalsgesellschaft
                    </h3>
                    <p className="text-muted-foreground">
                      Konzeption und Realisierung einer Platform zur
                      Organisation von Arbeitsplänen
                    </p>
                    <div
                      className="flex flex-wrap gap-2"
                      aria-label="Verwendete Technologien"
                    >
                      {[
                        "Next.js",
                        "Tailwindcss",
                        "Drizzle",
                        "Postgres",
                        "Auth.js",
                        "Shadcn/ui",
                      ].map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        asChild
                        variant="outline"
                        className="hover:bg-primary group"
                      >
                        <Link
                          className=" flex gap-1 "
                          href="https://github.com/ItsValerius/kg-work-plan"
                          target="_blank"
                        >
                          Github
                          <ArrowUpRight className="w-6 h-6 group-hover:translate-x-0.5 duration-200 group-hover:-translate-y-0.5 transition-transform" />
                        </Link>
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        className="hover:bg-primary group"
                      >
                        <Link
                          className=" flex gap-1 "
                          href="https://arbeitsplan.knallkoepp-golkrath.de/"
                          target="_blank"
                        >
                          Website
                          <ArrowUpRight className="w-6 h-6 group-hover:translate-x-0.5 duration-200 group-hover:-translate-y-0.5 transition-transform" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold">
                      CBIS Projekt - Billsplit
                    </h3>
                    <p className="text-muted-foreground">
                      Entwicklung einer Fullstack App zum hochladen und
                      aufteilen von Rechnungen im Rahmen der Veranstaltung
                      &quot;Cloud-basierte Informationssysteme&quot;
                    </p>
                    <div
                      className="flex flex-wrap gap-2"
                      aria-label="Verwendete Technologien"
                    >
                      {[
                        "Next.js",
                        "Tailwindcss",
                        "Drizzle",
                        "Postgres",
                        "Auth.js",
                        "Shadcn/ui",
                        "Redis",
                      ].map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Button
                      asChild
                      variant="outline"
                      className="hover:bg-primary group"
                    >
                      <Link
                        className=" flex gap-1 "
                        href="https://github.com/ItsValerius/cbis"
                        target="_blank"
                      >
                        Github
                        <ArrowUpRight className="w-6 h-6 group-hover:translate-x-0.5 duration-200 group-hover:-translate-y-0.5 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold">MoWaS Integration</h3>
                    <p className="text-muted-foreground">
                      Entwicklung eines Backends zur Integration von MoWaS
                      Warnmeldungen für digitale Außenwerbeflächen
                    </p>
                    <div
                      className="flex flex-wrap gap-2"
                      aria-label="Verwendete Technologien"
                    >
                      {["Backend", "Integration", "Warnmeldungen", "DOOH"].map(
                        (tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        )
                      )}
                    </div>
                    <p className="text-muted-foreground">
                      Abgeschlossen während der Tätigkeit bei RBL Media GmbH
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer
        className="border-t py-3 md:py-5 bg-background/95 "
        role="contentinfo"
      >
        <div className="container flex flex-col justify-center items-center mx-auto gap-4 text-center">
          <div className="flex gap-1">
            Made with
            <Heart
              className="h-6 w-6 fill-primary stroke-primary"
              aria-hidden="true"
            />
            <span className="sr-only">Liebe</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
