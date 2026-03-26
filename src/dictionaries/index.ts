import "server-only";

const dictionaries = {
  tr: () => import("./tr.json").then((module) => module.default),
  en: () => import("./en.json").then((module) => module.default),
  de: () => import("./de.json").then((module) => module.default),
};

export type Locale = keyof typeof dictionaries;
export const locales: Locale[] = ["tr", "en", "de"];
export const defaultLocale: Locale = "tr";

export const hasLocale = (locale: string): locale is Locale =>
  locale in dictionaries;

export const getDictionary = async (locale: Locale) => dictionaries[locale]();

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;
