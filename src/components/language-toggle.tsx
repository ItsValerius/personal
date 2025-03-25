// components/language-toggle.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Locale } from "@/i18n/config";
import { setUserLocale } from "@/services/locale";
import { useLocale } from "next-intl";
import { useTransition } from "react";

export function LanguageToggle() {
  const [isPending, startTransition] = useTransition();
  const locale = useLocale();
  const toggleLanguage = (value: Locale) => {
    startTransition(() => {
      setUserLocale(value);
    });
  };

  return (
    <Button
      onClick={() => toggleLanguage(locale === "de" ? "en" : "de")}
      variant="ghost"
      className="text-sm px-3"
      disabled={isPending}
    >
      {locale === "de" ? "EN" : "DE"}
    </Button>
  );
}
