import React, { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface SkillCardProps {
  icon: ReactNode;
  title: string;
  skills: string[];
  ariaLabel?: string;
}

const SkillCard: React.FC<SkillCardProps> = ({
  icon,
  title,
  skills,
  ariaLabel = "Technologien",
}) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-center">{icon}</div>
          <h3 className="text-xl font-bold text-center">{title}</h3>
          <div
            className="flex flex-wrap gap-2 justify-center"
            aria-label={ariaLabel}
          >
            {skills.map((skill) => (
              <Badge key={skill} className="px-3 py-1">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillCard;
