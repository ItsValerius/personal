import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";

interface LinkItem {
  text: string;
  url: string;
}

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  links?: LinkItem[];
  additionalParagraph?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  technologies,
  links = [],
  additionalParagraph,
}) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <h3 className="text-xl font-bold">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
          <div
            className="flex flex-wrap gap-2"
            aria-label="Verwendete Technologien"
          >
            {technologies.map((tech) => (
              <Badge key={tech} variant="secondary">
                {tech}
              </Badge>
            ))}
          </div>

          {additionalParagraph && (
            <p className="text-muted-foreground">{additionalParagraph}</p>
          )}

          {links.length > 0 && (
            <div className="flex gap-2">
              {links.map((link, index) => (
                <Button
                  key={index}
                  asChild
                  variant="outline"
                  className="hover:bg-primary group"
                >
                  <Link className="flex gap-1" href={link.url} target="_blank">
                    {link.text}
                    <ArrowUpRight className="w-6 h-6 group-hover:translate-x-0.5 duration-200 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </Button>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
