"use server";

import { cookies, headers } from "next/headers";
import { Locale, defaultLocale, locales } from "@/i18n/config";

// In this example the locale is read from a cookie. You could alternatively
// also read it from a database, backend service, or any other source.
const COOKIE_NAME = "NEXT_LOCALE";

export async function getUserLocale() {
  const languageHeader = (await headers()).get("accept-language");
  const languageCookie = (await cookies()).get(COOKIE_NAME)?.value;
  if (!languageCookie && languageHeader) {
    const languages = languageHeader.split(",").map((lang) => {
      const [code, qualityStr] = lang.trim().split(";");
      // Extract quality value, default to 1 if not specified
      const quality = qualityStr ? parseFloat(qualityStr.replace("q=", "")) : 1;
      return { code, quality };
    });
    const sortedLanguages = languages.sort((a, b) => b.quality - a.quality);
    console.log(sortedLanguages);
    // Find the first supported language
    for (const lang of sortedLanguages) {
      // Check full locale (de-DE) first
      if (locales.includes(lang.code as Locale)) {
        return lang.code as Locale;
      }

      // Then check language code (de, en)
      const languageCode = lang.code.split("-")[0];
      if (locales.includes(languageCode as Locale)) {
        return languageCode as Locale;
      }
    }
  }
  return languageCookie || defaultLocale;
}

export async function setUserLocale(locale: Locale) {
  (await cookies()).set(COOKIE_NAME, locale);
}
