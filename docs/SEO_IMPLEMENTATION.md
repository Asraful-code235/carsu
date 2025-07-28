# SEO Implementation Guide for Carsu

This document outlines the comprehensive SEO implementation for the Carsu Next.js 14 App Router project.

## 📁 SEO File Structure

```
src/
├── app/
│   ├── sitemap.ts                    # Dynamic sitemap generation
│   ├── robots.ts                     # Robots.txt configuration
│   ├── manifest.ts                   # PWA manifest
│   ├── opengraph-image.tsx           # Default OG image
│   ├── not-found.tsx                 # Custom 404 page
│   └── [locale]/
│       └── opengraph-image.tsx       # Localized OG images
├── lib/seo/
│   ├── structuredData.ts             # JSON-LD schema generators
│   ├── metadataUtils.ts              # Metadata generation utilities
│   ├── openGraphImages.ts            # Dynamic OG image generation
│   └── analytics.ts                  # Analytics tracking utilities
└── components/molecules/seo/
    └── StructuredDataScript.tsx      # JSON-LD injection component
```

## 🚀 Key Features

### 1. Dynamic Sitemap Generation (`app/sitemap.ts`)
- **Multi-language support**: Generates sitemaps for en, es, it locales
- **Dynamic content**: Pulls pages and blog posts from Sanity CMS
- **Proper priorities**: Home (1.0), Blog index (0.8), Pages (0.7), Posts (0.6)
- **Change frequencies**: Daily for home/blog, weekly for pages, monthly for posts
- **Alternate languages**: Includes hreflang attributes for all locales

### 2. Enhanced Robots.txt (`app/robots.ts`)
- **Environment-aware**: Blocks crawling in development/preview
- **AI bot blocking**: Prevents GPTBot, ChatGPT, Claude, etc.
- **Specific bot rules**: Custom rules for Googlebot and Bingbot
- **Comprehensive disallows**: Blocks admin areas, APIs, drafts, etc.
- **Crawl delays**: Respectful crawling with appropriate delays

### 3. PWA Manifest (`app/manifest.ts`)
- **App-like experience**: Enables installation on devices
- **Proper icons**: Supports maskable and any purpose icons
- **Theme colors**: Consistent branding with blue theme
- **Categories**: Business, productivity, utilities

### 4. Dynamic OpenGraph Images
- **Default OG image**: `app/opengraph-image.tsx`
- **Localized OG images**: `app/[locale]/opengraph-image.tsx`
- **Dynamic generation**: `lib/seo/openGraphImages.ts`
- **Type-specific styling**: Different colors for blog vs pages

### 5. Structured Data (JSON-LD)
- **Organization schema**: Company information and contact details
- **Website schema**: Site-wide information with search action
- **Breadcrumb schema**: Navigation breadcrumbs
- **Software Application schema**: Product-specific structured data
- **Article schema**: Blog post structured data

### 6. Enhanced Metadata Utilities
- **Localized metadata**: Full i18n support for all metadata
- **Canonical URLs**: Proper canonical and alternate language links
- **OpenGraph optimization**: Complete OG and Twitter card support
- **SEO best practices**: Keywords, descriptions, author information

## 🔧 Implementation Examples

### Adding Structured Data to a Page

```tsx
import { StructuredDataScript } from '@/components/molecules/seo/StructuredDataScript';
import { generateOrganizationSchema } from '@/lib/seo/structuredData';

export default function HomePage() {
  const organizationSchema = generateOrganizationSchema();
  
  return (
    <>
      <StructuredDataScript data={organizationSchema} id="organization" />
      {/* Your page content */}
    </>
  );
}
```

### Using Enhanced Metadata

```tsx
import { generateEnhancedMetadata } from '@/lib/seo/metadataUtils';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  
  return generateEnhancedMetadata({
    title: 'Your Page Title',
    description: 'Your page description',
    locale,
    path: '/your-page',
    keywords: 'relevant, keywords, here',
    ogType: 'article',
  });
}
```

### Tracking Analytics Events

```tsx
import { trackEvent, trackContentEngagement } from '@/lib/seo/analytics';

// Track user interactions
const handleButtonClick = () => {
  trackEvent({
    action: 'click',
    category: 'engagement',
    label: 'cta-button',
  });
};

// Track content engagement
const handleArticleRead = (articleId: string) => {
  trackContentEngagement('blog', articleId, 'read_complete');
};
```

## 🌐 Internationalization (i18n) SEO

### Locale-Specific Features
- **Hreflang attributes**: Proper alternate language declarations
- **Localized metadata**: Titles, descriptions in each language
- **Localized OG images**: Language-specific social media images
- **Canonical URLs**: Proper canonical structure for each locale

### URL Structure
```
https://carsu.com/en/          # English homepage
https://carsu.com/es/          # Spanish homepage
https://carsu.com/it/          # Italian homepage
https://carsu.com/en/blog/     # English blog
https://carsu.com/es/blog/     # Spanish blog
```

## 📊 SEO Monitoring & Analytics

### Built-in Tracking
- **Page views**: Automatic tracking for SPA navigation
- **Search queries**: Track internal search usage
- **Content engagement**: Monitor user interaction with content
- **Language switching**: Track internationalization usage

### Environment Variables Required
```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
VERCEL_URL=your-vercel-url.vercel.app
```

## 🔍 SEO Checklist

### ✅ Implemented
- [x] Dynamic sitemap with multi-language support
- [x] Comprehensive robots.txt with AI bot blocking
- [x] PWA manifest for app-like experience
- [x] Dynamic OpenGraph image generation
- [x] Structured data (JSON-LD) schemas
- [x] Enhanced metadata utilities
- [x] Custom 404 page with proper SEO
- [x] Localized OpenGraph images
- [x] Analytics tracking utilities

### 🎯 Recommendations for Further Enhancement
- [ ] Add Google Analytics 4 integration
- [ ] Implement Core Web Vitals monitoring
- [ ] Add schema markup for reviews/ratings
- [ ] Create XML news sitemap for blog posts
- [ ] Implement breadcrumb navigation with structured data
- [ ] Add FAQ schema for relevant pages
- [ ] Set up Google Search Console integration
- [ ] Implement automatic image optimization with alt text

## 🚀 Performance Considerations

### Optimizations Included
- **Edge runtime**: OG image generation runs on edge
- **Efficient caching**: Proper cache headers for static assets
- **Minimal bundle impact**: Tree-shaking friendly utilities
- **Lazy loading**: Structured data only when needed

### Best Practices
- Keep metadata concise but descriptive
- Use appropriate image sizes for OG images (1200x630)
- Implement proper error handling for CMS data
- Monitor Core Web Vitals regularly
- Test with Google's Rich Results Test

This SEO implementation provides a solid foundation for search engine optimization while maintaining flexibility for future enhancements.
