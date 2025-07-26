import type { Metadata } from "next";
import { PageSectionsRenderer } from "@/components/organisms/layout/PageSectionsRenderer";
import { sanityFetch } from "@/sanity/lib/live";
import { HOME_PAGE_QUERY } from "@/sanity/lib/queries/pageQueries";
import { isValidLocale, defaultLocale } from "@/lib/i18n/config";
import type { Locale } from "@/lib/i18n/config";
import { notFound } from "next/navigation";

interface HomePageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  try {
    const { locale: localeParam } = await params;
    
    if (!isValidLocale(localeParam)) {
      return {
        title: "Carsu - Car Shop Management",
        description: "Manage your car shop in one powerful app",
      };
    }

    const { data: pageData } = await sanityFetch({
      query: HOME_PAGE_QUERY,
    });

    if (!pageData) {
      return {
        title: "Carsu - Car Shop Management",
        description: "Manage your car shop in one powerful app",
      };
    }

    return {
      title: pageData.seo?.metaTitle || pageData.title || "Carsu - Car Shop Management",
      description: pageData.seo?.metaDescription || "Manage your car shop in one powerful app",
      openGraph: pageData.seo?.ogImage ? {
        images: [pageData.seo.ogImage.asset.url],
      } : undefined,
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Carsu - Car Shop Management",
      description: "Manage your car shop in one powerful app",
    };
  }
}

export default async function Home({ params }: HomePageProps) {
  try {
    const { locale: localeParam } = await params;
    
    if (!isValidLocale(localeParam)) {
      notFound();
    }

    const locale: Locale = localeParam;

    const { data: pageData } = await sanityFetch({
      query: HOME_PAGE_QUERY,
    });

    if (!pageData) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              No home page configured
            </h1>
            <p className="text-gray-600">
              Please configure a home page in Sanity Studio by creating a page and marking it as &apos;Is Home Page&apos;.
            </p>
          </div>
        </div>
      );
    }

    return <PageSectionsRenderer sections={pageData.sections || []} />;
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
