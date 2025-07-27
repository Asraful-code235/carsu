import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageSectionsRenderer } from "@/components/organisms/layout/PageSectionsRenderer";
import { sanityFetch } from "@/sanity/lib/live";
import { PAGE_BY_SLUG_QUERY } from "@/sanity/lib/queries/pageQueries";
import { isValidLocale } from "@/lib/i18n/config";
import type { Locale } from "@/lib/i18n/config";
import { getLocalizedValue } from "@/lib/i18n/utils";

interface PageProps {
  params: Promise<{
    locale: string;
    slug: string[];
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const { locale: localeParam, slug } = await params;
    
    if (!isValidLocale(localeParam)) {
      return {
        title: "Page Not Found",
        description: "The requested page could not be found",
      };
    }

    const slugString = slug.join('/');
    
    const { data: pageData } = await sanityFetch({
      query: PAGE_BY_SLUG_QUERY,
      params: { slug: slugString },
    });

    if (!pageData) {
      return {
        title: "Page Not Found",
        description: "The requested page could not be found",
      };
    }

    const locale: Locale = localeParam;

    return {
      title: getLocalizedValue(pageData.seo?.metaTitle, locale) || getLocalizedValue(pageData.title, locale) || "Carsu",
      description: getLocalizedValue(pageData.seo?.metaDescription, locale) || "Manage your car shop in one powerful app",
      openGraph: pageData.seo?.ogImage ? {
        images: [pageData.seo.ogImage.asset.url],
      } : undefined,
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Error",
      description: "An error occurred while loading the page",
    };
  }
}

export default async function Page({ params }: PageProps) {
  try {
    const { locale: localeParam, slug } = await params;
    
    if (!isValidLocale(localeParam)) {
      notFound();
    }

    const locale: Locale = localeParam;
    const slugString = slug.join('/');

    const { data: pageData } = await sanityFetch({
      query: PAGE_BY_SLUG_QUERY,
      params: { slug: slugString },
    });

    if (!pageData) {
      notFound();
    }

    return <PageSectionsRenderer sections={pageData.sections || []} locale={locale} />;
  } catch (error) {
    console.error("Error fetching page data:", error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-red-600 mb-2">
            Error loading page
          </h1>
          <p className="text-gray-600">
            There was an error loading the page content. Please try again later.
          </p>
        </div>
      </div>
    );
  }
}
