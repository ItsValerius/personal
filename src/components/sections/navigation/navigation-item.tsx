import React from "react";
import Link from "next/link";

interface NavigationItemProps {
  item: string;
}

const NavigationItem: React.FC<NavigationItemProps> = ({ item }) => {
  return (
    <Link
      key={item}
      href={`#${item}`}
      className="text-sm font-medium hover:text-primary transition-colors
               focus-visible:outline-none focus-visible:ring-2
               focus-visible:ring-primary focus-visible:ring-offset-2"
    >
      {item}
    </Link>
  );
};

export default NavigationItem;
