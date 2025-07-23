import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageSectionsRenderer } from "@/components/organisms/layout/PageSectionsRenderer";
import { sanityFetch } from "@/sanity/lib/live";
import { PAGE_BY_SLUG_QUERY } from "@/sanity/lib/queries/pageQueries";

interface PageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
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

    return {
      title: pageData.seo?.metaTitle || pageData.title || "Carsu",
      description: pageData.seo?.metaDescription || "Manage your car shop in one powerful app",
      openGraph: pageData.seo?.ogImage ? {
        images: [pageData.seo.ogImage.asset.url],
      } : undefined,
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Carsu",
      description: "Manage your car shop in one powerful app",
    };
  }
}

export default async function Page({ params }: PageProps) {
  try {
    const { slug } = await params;
    const slugString = slug.join('/');
    
    const { data: pageData } = await sanityFetch({
      query: PAGE_BY_SLUG_QUERY,
      params: { slug: slugString },
    });

    if (!pageData) {
      notFound();
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
