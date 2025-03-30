// EducationCard.tsx
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap } from "lucide-react";

interface EducationCardProps {
  eduKey: string;
  title: string;
  school: string;
  graduation: string;
  thesis?: string;
  subjects?: string;
}

const EducationCard: React.FC<EducationCardProps> = ({
  eduKey,
  title,
  school,
  graduation,
  thesis,
  subjects,
}) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col space-y-4">
          <div className="flex items-start gap-4">
            <GraduationCap className="h-10 w-10 text-primary" />
            <div>
              <h3 className="text-xl font-bold">{title}</h3>
              <p className="text-primary">{school}</p>
              <Badge variant="secondary" className="mt-1">
                {graduation}
              </Badge>
            </div>
          </div>
          <p className="text-muted-foreground">
            {eduKey === "bachelor" ? thesis : subjects}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default EducationCard;
