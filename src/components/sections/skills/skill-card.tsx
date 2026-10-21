import React, { useId } from "react";
import { Badge } from "@/components/ui/badge";

interface SkillCardProps {
  title: string;
  skills: string[];
}

const SkillCard: React.FC<SkillCardProps> = ({
  title,
  skills,
}) => {
  const headingId = useId();
  return (
    <div className="border-t-2 border-primary pt-4 space-y-4">
      <h3 id={headingId} className="text-lg font-semibold">
        {title}
      </h3>
      <ul className="flex flex-wrap gap-2" aria-labelledby={headingId}>
        {skills.map((skill) => (
          <li key={skill}>
            <Badge variant="secondary" className="px-2.5 py-1 text-sm font-normal">
              {skill}
            </Badge>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SkillCard;
