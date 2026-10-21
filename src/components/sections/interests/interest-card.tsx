import React, { ReactNode } from "react";

interface InterestCardProps {
  icon: ReactNode;
  title: string;
  description: ReactNode;
}

const InterestCard: React.FC<InterestCardProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <div className="flex gap-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-secondary">
        {icon}
      </div>
      <div className="space-y-1">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-muted-foreground text-balance">{description}</p>
      </div>
    </div>
  );
};

export default InterestCard;
