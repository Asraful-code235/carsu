import type { Locale } from '@/lib/i18n/config';

// Type for Sanity localized string object
export interface LocalizedString {
  en?: string;
  es?: string;
  it?: string;
}

// Type for Sanity localized string array format
export interface LocalizedStringArray {
  _type: string;
  _key: string;
  value: string;
}

// Type for Sanity localized rich text object
export interface LocalizedRichText {
  en?: any[]; // Rich text array (Portable Text)
  es?: any[]; // Rich text array (Portable Text)
  it?: any[]; // Rich text array (Portable Text)
}

/**
 * Extract localized value from Sanity localized field
 * Supports both object format and array format
 * Falls back to default language (en) if requested locale is not available
 */
export function getLocalizedValue(
  localizedField: LocalizedString | LocalizedStringArray[] | string | undefined,
  locale: Locale = 'en'
): string {
  // Handle undefined or null
  if (!localizedField) {
    return '';
  }

  // Handle plain string (non-localized content)
  if (typeof localizedField === 'string') {
    return localizedField;
  }

  // Handle array format
  if (Array.isArray(localizedField)) {
    const localeItem = localizedField.find(item => item._key === locale);
    if (localeItem?.value) {
      return localeItem.value;
    }
    
    // Fallback to English
    const fallbackItem = localizedField.find(item => item._key === 'en');
    return fallbackItem?.value || '';
  }

  // Handle object format
  if (typeof localizedField === 'object') {
    const value = localizedField[locale];
    if (value) {
      return value;
    }
    
    // Fallback to English
    return localizedField.en || '';
  }

  return '';
}

/**
 * Extract localized rich text content from Sanity localized rich text field
 * Returns the rich text array for the specified locale with fallback to English
 */
export function getLocalizedRichText(
  localizedRichText: LocalizedRichText | any[] | undefined,
  locale: Locale = 'en'
): any[] {
  // Handle undefined or null
  if (!localizedRichText) {
    return [];
  }

  // Handle plain rich text array (non-localized content)
  if (Array.isArray(localizedRichText)) {
    return localizedRichText;
  }

  // Handle localized rich text object
  if (typeof localizedRichText === 'object') {
    const content = localizedRichText[locale];
    if (content && Array.isArray(content)) {
      return content;
    }

    // Fallback to English
    const fallbackContent = localizedRichText.en;
    return Array.isArray(fallbackContent) ? fallbackContent : [];
  }

  return [];
}

/**
 * Check if a localized field has content for a specific locale
 */
export function hasLocalizedValue(
  localizedField: LocalizedString | LocalizedStringArray[] | string | undefined,
  locale: Locale
): boolean {
  if (!localizedField) {
    return false;
  }

  if (typeof localizedField === 'string') {
    return true;
  }

  if (Array.isArray(localizedField)) {
    return localizedField.some(item => item._key === locale && item.value);
  }

  if (typeof localizedField === 'object') {
    return Boolean(localizedField[locale]);
  }

  return false;
}

/**
 * Get all available locales for a localized field
 */
export function getAvailableLocales(
  localizedField: LocalizedString | LocalizedStringArray[] | string | undefined
): Locale[] {
  if (!localizedField) {
    return [];
  }

  if (typeof localizedField === 'string') {
    return ['en']; // Assume default language for plain strings
  }

  if (Array.isArray(localizedField)) {
    return localizedField
      .filter(item => item.value)
      .map(item => item._key as Locale);
  }

  if (typeof localizedField === 'object') {
    return Object.entries(localizedField)
      .filter(([, value]) => value)
      .map(([key]) => key as Locale);
  }

  return [];
}
