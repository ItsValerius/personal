import React, { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface InterestCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

const InterestCard: React.FC<InterestCardProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <Card>
      <CardContent className="pt-6 flex flex-col items-center text-center">
        <div className="space-y-4">
          <div className="flex justify-center items-center">{icon}</div>
          <h3 className="text-xl font-bold">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default InterestCard;
