import NavigationLinks from "./navigation-links";

interface NavigationProps {
  items: string[];
}

const Navigation: React.FC<NavigationProps> = ({ items }) => {
  return (
    <nav className="hidden md:flex gap-6" aria-label="Desktop Navigation">
      <NavigationLinks items={items} />
    </nav>
  );
};

export default Navigation;
