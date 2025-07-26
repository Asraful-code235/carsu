import { sanityFetch } from "@/sanity/lib/live";
import { DEFAULT_HEADER_QUERY, SITE_LAYOUT_HEADER_QUERY } from "@/sanity/lib/queries/headerQueries";
import { Header } from "./Header";
import type { HeaderConfiguration } from "@/types/header";
import type { Locale } from "@/lib/i18n/config";
import { getLocalizedValue } from "@/lib/i18n/utils";

// Function to process localized header data
function processLocalizedHeaderData(headerData: any, locale: Locale): HeaderConfiguration {
  return {
    ...headerData,
    logo: headerData.logo ? {
      ...headerData.logo,
      alt: getLocalizedValue(headerData.logo.alt, locale)
    } : undefined,
    navigation: headerData.navigation?.map((item: any) => ({
      ...item,
      title: getLocalizedValue(item.title, locale),
      dropdownItems: item.dropdownItems?.map((dropdownItem: any) => ({
        ...dropdownItem,
        title: getLocalizedValue(dropdownItem.title, locale),
        description: getLocalizedValue(dropdownItem.description, locale),
        badge: dropdownItem.badge ? {
          ...dropdownItem.badge,
          text: getLocalizedValue(dropdownItem.badge.text, locale)
        } : undefined
      }))
    })),
    ctaButtons: headerData.ctaButtons?.map((button: any) => ({
      ...button,
      text: getLocalizedValue(button.text, locale)
    }))
  };
}

interface HeaderWrapperProps {
  headerId?: string;
  useLayoutConfig?: boolean;
  sticky?: boolean;
  transparent?: boolean;
  className?: string;
  locale?: Locale;
}

export async function HeaderWrapper({
  headerId,
  useLayoutConfig = false,
  sticky = true,
  transparent = false,
  className,
  locale = 'en'
}: HeaderWrapperProps) {
  try {
    let headerData: HeaderConfiguration | null = null;

    if (useLayoutConfig) {
      const { data: layoutData } = await sanityFetch({
        query: SITE_LAYOUT_HEADER_QUERY,
      });

      if (layoutData?.header) {
        headerData = layoutData.header;
        if (layoutData.sticky !== undefined) sticky = layoutData.sticky;
        if (layoutData.transparent !== undefined) transparent = layoutData.transparent;
      }
    } else {
      const { data } = await sanityFetch({
        query: DEFAULT_HEADER_QUERY,
        params: headerId ? { headerId } : {},
      });
      headerData = data;
    }

    if (!headerData) {
      console.warn('No header configuration found');
      return null;
    }

    // Process localized content
    const localizedHeaderData = processLocalizedHeaderData(headerData, locale);

    return (
      <Header
        data={localizedHeaderData}
        sticky={sticky}
        transparent={transparent}
        className={className}
        locale={locale}
      />
    );
  } catch (error) {
    console.error('Error fetching header data:', error);
    return null;
  }
}
