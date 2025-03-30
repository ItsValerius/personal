// components/ExperienceItem.jsx

import React from "react";
import { Badge } from "@/components/ui/badge"; // or wherever your Badge component lives

interface ExperienceItemProps {
  title: string;
  start: string;
  company: string;
  tasks: string[];
  technologies?: string[];
}

const ExperienceItem: React.FC<ExperienceItemProps> = ({
  title,
  start,
  company,
  tasks = [],
  technologies = [],
}) => {
  return (
    <div className="relative pl-8 border-l-2 border-muted pb-8 last:pb-0">
      <div
        className="absolute w-4 h-4 bg-primary rounded-full -left-[9px] top-1"
        aria-hidden="true"
      ></div>
      <div className="space-y-2">
        {/* Title row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h3 className="text-xl font-bold">{title}</h3>
          <Badge variant="secondary">{start}</Badge>
        </div>

        {/* Company name (optional if you need it) */}
        {company && <p className="text-lg text-primary">{company}</p>}

        {/* Tasks list */}
        <ul className="list-disc pl-5 text-muted-foreground space-y-1">
          {tasks.map((task, idx) => (
            <li key={idx}>{task}</li>
          ))}
        </ul>

        {/* Technologies badges */}
        {technologies.length > 0 && (
          <div
            className="flex flex-wrap gap-2 pt-2"
            aria-label="Verwendete Technologien"
          >
            {technologies.map((tech) => (
              <Badge key={tech} variant="outline">
                {tech}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExperienceItem;
