"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";

export function MobileNav() {
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
          className="md:hidden"
          aria-label="Menü öffnen"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[250px] sm:w-[300px]">
        <div className="flex flex-col gap-6 py-6">
          <nav className="flex flex-col gap-4" aria-label="Mobile Navigation">
            <Link
              href="#about"
              className="text-base font-medium hover:text-primary transition-colors"
              onClick={handleLinkClick}
            >
              Über mich
            </Link>
            <Link
              href="#experience"
              className="text-base font-medium hover:text-primary transition-colors"
              onClick={handleLinkClick}
            >
              Erfahrung
            </Link>
            <Link
              href="#education"
              className="text-base font-medium hover:text-primary transition-colors"
              onClick={handleLinkClick}
            >
              Bildung
            </Link>
            <Link
              href="#skills"
              className="text-base font-medium hover:text-primary transition-colors"
              onClick={handleLinkClick}
            >
              Kenntnisse
            </Link>
            <Link
              href="#interests"
              className="text-base font-medium hover:text-primary transition-colors"
              onClick={handleLinkClick}
            >
              Interessen
            </Link>
            <Link
              href="#projects"
              className="text-base font-medium hover:text-primary transition-colors"
              onClick={handleLinkClick}
            >
              Projekte
            </Link>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
}
