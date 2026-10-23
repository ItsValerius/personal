"use client";

import { Button } from "@/components/ui/button";
import { Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";
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
      lang={locale === "de" ? "en" : "de"}
      aria-label={locale === "de" ? "EN – English" : "DE – Deutsch"}
      className={cn(
        "h-10 text-sm px-3 cursor-pointer",
        isPending && "pointer-events-none opacity-60"
      )}
      disabled={isPending}
    >
      {locale === "de" ? "EN" : "DE"}
    </Button>
  );
}
