"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useState } from "react";
import NavigationLinks from "./navigation-links";

interface NavigationProps {
  items: string[];
}

const MobileNavigation: React.FC<NavigationProps> = ({ items }) => {
  const [open, setOpen] = useState(false);

  const handleLinkClick = () => {
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          aria-label="Menü öffnen"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[250px] sm:w-[300px] px-6 py-8 flex flex-col gap-8"
      >
        <nav className="flex flex-col gap-5" aria-label="Mobile Navigation">
          <NavigationLinks items={items} onClick={handleLinkClick} />
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavigation;
