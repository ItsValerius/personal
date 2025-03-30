import { useTranslations } from "next-intl";
import NavigationItem from "./navigation-item";
interface NavigationProps {
  items: string[];
}

const Navigation: React.FC<NavigationProps> = ({ items }) => {
  const t = useTranslations();
  return (
    <nav className="hidden md:flex gap-6" aria-label="Hauptnavigation">
      {items.map((item) => (
        <NavigationItem key={item} item={t(`${item}.nav`)} />
      ))}
    </nav>
  );
};

export default Navigation;
