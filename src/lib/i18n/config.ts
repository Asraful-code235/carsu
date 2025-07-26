export const locales = ['en', 'es', 'it'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  es: 'Español', 
  it: 'Italiano',
};

export const localeFlags: Record<Locale, string> = {
  en: '🇺🇸',
  es: '🇪🇸',
  it: '🇮🇹',
};

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}
