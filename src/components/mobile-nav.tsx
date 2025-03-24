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
          className="md:hidden focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          aria-label="Menü öffnen"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-[250px] sm:w-[300px] px-6 py-8 flex flex-col gap-8"
      >
        <nav className="flex flex-col gap-5" aria-label="Mobile Navigation">
          {[
            { href: "#about", label: "Über mich" },
            { href: "#experience", label: "Erfahrung" },
            { href: "#education", label: "Bildung" },
            { href: "#skills", label: "Kenntnisse" },
            { href: "#interests", label: "Interessen" },
            { href: "#projects", label: "Projekte" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={handleLinkClick}
              className="text-base font-medium text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
