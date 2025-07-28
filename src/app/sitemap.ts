import { MetadataRoute } from 'next';
import { client } from '@/sanity/lib/client';
import { ALL_PAGES_QUERY, BLOG_POSTS_QUERY } from '@/sanity/lib/queries/pageQueries';
import { locales, defaultLocale } from '@/lib/i18n/config';
import type { Locale } from '@/lib/i18n/config';

interface SanityPage {
  _id: string;
  title: {
    en?: string;
    es?: string;
    it?: string;
  };
  slug: {
    current: string;
  };
  isHomePage: boolean;
  _updatedAt?: string;
}

interface SanityBlogPost {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  publishedAt: string;
  _updatedAt?: string;
}

/**
 * Get the base URL from environment variables
 */
function getBaseUrl(): string {
  // In production, use VERCEL_URL or custom domain
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  
  // Use custom site URL if provided
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }
  
  // Fallback to localhost for development
  return 'http://localhost:3000';
}

/**
 * Generate sitemap entries for static routes
 */
function generateStaticRoutes(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();
  const staticRoutes: MetadataRoute.Sitemap = [];

  // Add localized home pages
  locales.forEach((locale) => {
    staticRoutes.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: locale === defaultLocale ? 1.0 : 0.9,
      alternates: {
        languages: Object.fromEntries(
          locales.map((loc) => [loc, `${baseUrl}/${loc}`])
        ),
      },
    });

    // Add blog index pages
    staticRoutes.push({
      url: `${baseUrl}/${locale}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((loc) => [loc, `${baseUrl}/${loc}/blog`])
        ),
      },
    });
  });

  return staticRoutes;
}

/**
 * Generate sitemap entries for dynamic pages from Sanity
 */
async function generatePageRoutes(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseUrl();
  const pageRoutes: MetadataRoute.Sitemap = [];

  try {
    const pages: SanityPage[] = await client.fetch(ALL_PAGES_QUERY);

    pages.forEach((page) => {
      // Skip home page as it's handled in static routes
      if (page.isHomePage) return;

      const lastModified = page._updatedAt ? new Date(page._updatedAt) : new Date();

      locales.forEach((locale) => {
        // Check if page has content for this locale
        const hasContent = page.title?.[locale];
        
        if (hasContent) {
          pageRoutes.push({
            url: `${baseUrl}/${locale}/${page.slug.current}`,
            lastModified,
            changeFrequency: 'weekly',
            priority: 0.7,
            alternates: {
              languages: Object.fromEntries(
                locales
                  .filter((loc) => page.title?.[loc]) // Only include locales with content
                  .map((loc) => [loc, `${baseUrl}/${loc}/${page.slug.current}`])
              ),
            },
          });
        }
      });
    });
  } catch (error) {
    console.error('Error fetching pages for sitemap:', error);
  }

  return pageRoutes;
}

/**
 * Generate sitemap entries for blog posts
 */
async function generateBlogRoutes(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseUrl();
  const blogRoutes: MetadataRoute.Sitemap = [];

  try {
    const posts: SanityBlogPost[] = await client.fetch(BLOG_POSTS_QUERY);

    posts.forEach((post) => {
      const lastModified = post._updatedAt 
        ? new Date(post._updatedAt) 
        : new Date(post.publishedAt);

      locales.forEach((locale) => {
        blogRoutes.push({
          url: `${baseUrl}/${locale}/blog/${post.slug.current}`,
          lastModified,
          changeFrequency: 'monthly',
          priority: 0.6,
          alternates: {
            languages: Object.fromEntries(
              locales.map((loc) => [loc, `${baseUrl}/${loc}/blog/${post.slug.current}`])
            ),
          },
        });
      });
    });
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error);
  }

  return blogRoutes;
}

/**
 * Main sitemap generation function
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [staticRoutes, pageRoutes, blogRoutes] = await Promise.all([
    generateStaticRoutes(),
    generatePageRoutes(),
    generateBlogRoutes(),
  ]);

  return [
    ...staticRoutes,
    ...pageRoutes,
    ...blogRoutes,
  ];
}
