import React from "react";

interface EducationCardProps {
  title: string;
  school: string;
  graduation: string;
  detail: string;
}

const EducationCard: React.FC<EducationCardProps> = ({
  title,
  school,
  graduation,
  detail,
}) => {
  return (
    <li className="grid gap-x-8 gap-y-1 border-t py-6 md:grid-cols-[14rem_minmax(0,1fr)]">
      <p className="whitespace-nowrap text-sm tabular-nums text-muted-foreground md:pt-1">
        {graduation}
      </p>
      <div className="space-y-1">
        <h3 className="text-lg font-semibold md:text-xl">{title}</h3>
        <p className="font-medium text-primary">{school}</p>
        <p className="max-w-[60ch] pt-1 text-muted-foreground">{detail}</p>
      </div>
    </li>
  );
};

export default EducationCard;
