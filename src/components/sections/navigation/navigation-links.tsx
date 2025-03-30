import React from "react";
import NavigationLink from "./navigation-link";

interface NavigationLinksProps {
  items: string[];
  onClick?: () => void;
}

const NavigationLinks: React.FC<NavigationLinksProps> = ({
  items,
  onClick,
}) => {
  return (
    <>
      {items.map((item) => (
        <NavigationLink key={item} item={item} onClick={onClick} />
      ))}
    </>
  );
};

export default NavigationLinks;
