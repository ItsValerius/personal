import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Github } from "lucide-react";

export interface LinkItem {
  text: string;
  url: string;
}

export interface Screenshot {
  src: string;
  alt: string;
}

export interface ProjectCardProps {
  title: string;
  meta?: string;
  description: React.ReactNode;
  technologies: string[];
  links?: LinkItem[];
  repo?: string;
  screenshots?: Screenshot[];
  /** short name set large on a typographic cover when there are no screenshots */
  cover?: string;
}

export const TechList = ({ technologies }: { technologies: string[] }) => (
  <ul className="flex flex-wrap gap-x-2.5 gap-y-1 text-xs font-medium md:gap-x-3 md:text-sm">
    {technologies.map((tech) => (
      <li key={tech} className="whitespace-nowrap">
        {tech}
      </li>
    ))}
  </ul>
);

const shotClass =
  "absolute w-[78%] h-auto rounded-lg border border-border shadow-[0_12px_32px_-12px_rgb(0_0_0/0.35)]";

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  meta,
  description,
  technologies,
  links = [],
  repo,
  screenshots = [],
  cover,
}) => {
  const [front, back] = screenshots;
  return (
    <Card className="flex h-full flex-col gap-0 overflow-hidden py-0 lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
      <div className="flex flex-1 flex-col gap-3 p-5 md:gap-4 md:p-8">
        <div className="space-y-1">
          <h3 className="text-xl font-bold tracking-tight md:text-2xl">{title}</h3>
          {meta && <p className="text-sm text-muted-foreground">{meta}</p>}
        </div>
        <p className="max-w-[60ch] text-sm text-muted-foreground md:text-base">
          {description}
        </p>
        <TechList technologies={technologies} />
        {(links.length > 0 || repo) && (
          <div className="mt-auto flex flex-wrap items-center gap-2 pt-1 md:pt-2">
            {links.map((link) => (
              <Button
                key={link.url}
                asChild
                variant="outline"
                size="sm"
                className="group md:h-9 md:px-4"
              >
                <Link href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.text}
                  <ArrowUpRight
                    className="text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 duration-200 transition-transform"
                    aria-hidden="true"
                  />
                </Link>
              </Button>
            ))}
            {repo && (
              <Button asChild variant="ghost" size="sm" className="md:h-9 md:px-4">
                <Link href={repo} target="_blank" rel="noopener noreferrer">
                  <Github aria-hidden="true" />
                  GitHub
                </Link>
              </Button>
            )}
          </div>
        )}
      </div>
      {/* phones: visual becomes a short banner above the text */}
      {front ? (
        <div className="relative order-first aspect-[2/1] overflow-hidden bg-secondary/60 lg:order-none lg:aspect-auto lg:min-h-96">
          {back && (
            <Image
              src={back.src}
              alt={back.alt}
              width={1920}
              height={1200}
              sizes="(min-width: 1024px) 40vw, 80vw"
              className={cn(shotClass, "right-[-6%] top-[8%] opacity-90")}
            />
          )}
          <Image
            src={front.src}
            alt={front.alt}
            width={1920}
            height={1200}
            sizes="(min-width: 1024px) 40vw, 80vw"
            className={cn(
              shotClass,
              back ? "left-[6%] bottom-[-10%]" : "left-[11%] bottom-[-12%]"
            )}
          />
        </div>
      ) : (
        cover && (
          <div
            aria-hidden="true"
            className="order-first flex aspect-[2/1] items-end bg-primary p-5 text-primary-foreground md:p-8 lg:order-none lg:aspect-auto lg:min-h-96"
          >
            <p className="text-4xl font-bold tracking-tighter md:text-7xl">
              {cover}
            </p>
          </div>
        )
      )}
    </Card>
  );
};

export default ProjectCard;
