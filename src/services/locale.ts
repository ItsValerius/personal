"use server";

import { cookies, headers } from "next/headers";
import { Locale, defaultLocale, locales } from "@/i18n/config";

const COOKIE_NAME = "NEXT_LOCALE";

const isLocale = (value: unknown): value is Locale =>
  locales.includes(value as Locale);

export async function getUserLocale() {
  const languageHeader = (await headers()).get("accept-language");
  const languageCookie = (await cookies()).get(COOKIE_NAME)?.value;
  if (!isLocale(languageCookie) && languageHeader) {
    const languages = languageHeader.split(",").map((lang) => {
      const [rawCode, qualityStr] = lang.trim().split(";");
      const code = rawCode.trim().toLowerCase();
      // Extract quality value, default to 1 if not specified
      const quality = qualityStr ? parseFloat(qualityStr.replace("q=", "")) : 1;
      return { code, quality };
    });
    const sortedLanguages = languages.sort((a, b) => b.quality - a.quality);
    // Find the first supported language
    for (const lang of sortedLanguages) {
      // Check full locale (de-DE) first
      if (isLocale(lang.code)) {
        return lang.code;
      }

      // Then check language code (de, en)
      const languageCode = lang.code.split("-")[0];
      if (isLocale(languageCode)) {
        return languageCode;
      }
    }
  }
  // The cookie is client-controlled; an unknown value would fail the messages import.
  return isLocale(languageCookie) ? languageCookie : defaultLocale;
}

// Server action: callable from any client, so the argument is untrusted.
export async function setUserLocale(locale: Locale) {
  if (!isLocale(locale)) return;
  (await cookies()).set(COOKIE_NAME, locale, {
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
  });
}
