import { sanityFetch } from "@/sanity/lib/live";
import { DEFAULT_HEADER_QUERY, SITE_LAYOUT_HEADER_QUERY } from "@/sanity/lib/queries/headerQueries";
import { Header } from "./Header";
import type { HeaderConfiguration } from "@/types/header";

interface HeaderWrapperProps {
  headerId?: string;
  useLayoutConfig?: boolean;
  sticky?: boolean;
  transparent?: boolean;
  className?: string;
}

export async function HeaderWrapper({
  headerId,
  useLayoutConfig = false,
  sticky = true,
  transparent = false,
  className
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

    return (
      <Header
        data={headerData as HeaderConfiguration}
        sticky={sticky}
        transparent={transparent}
        className={className}
      />
    );
  } catch (error) {
    console.error('Error fetching header data:', error);
    return null;
  }
}
