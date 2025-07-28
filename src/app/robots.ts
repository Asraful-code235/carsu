import { MetadataRoute } from 'next';

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
 * Generate robots.txt configuration
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = getBaseUrl();
  const isProduction = process.env.NODE_ENV === 'production';
  const isVercelProduction = process.env.VERCEL_ENV === 'production';

  // In development or preview environments, restrict crawling
  if (!isProduction || !isVercelProduction) {
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
    };
  }

  // Production robots.txt configuration
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/studio*',           // Sanity Studio
          '/api/*',             // API routes
          '/_next/*',           // Next.js internal files
          '/admin*',            // Admin areas
          '/private*',          // Private content
          '*.json',             // JSON files
          '*.xml',              // XML files (except sitemap)
          '/draft*',            // Draft content
          '/preview*',          // Preview content
          '/search*',           // Search results pages
          '/*?*',               // URLs with query parameters
          '/404',               // Error pages
          '/500',               // Error pages
        ],
        crawlDelay: 1,          // Be respectful to servers
      },
      // AI/ML bots that we want to block
      {
        userAgent: 'GPTBot',
        disallow: '/',
      },
      {
        userAgent: 'ChatGPT-User',
        disallow: '/',
      },
      {
        userAgent: 'CCBot',
        disallow: '/',
      },
      {
        userAgent: 'anthropic-ai',
        disallow: '/',
      },
      {
        userAgent: 'Claude-Web',
        disallow: '/',
      },
      {
        userAgent: 'Baiduspider',
        disallow: '/',
      },
      {
        userAgent: 'YandexBot',
        disallow: '/',
      },
      // Allow major search engines with specific rules
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/studio*',
          '/api/*',
          '/admin*',
          '/private*',
          '/draft*',
          '/preview*',
        ],
        crawlDelay: 0.5,
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: [
          '/studio*',
          '/api/*',
          '/admin*',
          '/private*',
          '/draft*',
          '/preview*',
        ],
        crawlDelay: 1,
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
