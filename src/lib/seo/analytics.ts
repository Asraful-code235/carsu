/**
 * Analytics and tracking utilities for SEO
 * Provides type-safe analytics event tracking
 */

export interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

/**
 * Track custom events for SEO insights
 */
export function trackEvent({ action, category, label, value }: AnalyticsEvent) {
  // Google Analytics 4 (gtag)
  if (typeof window !== 'undefined' && 'gtag' in window) {
    (window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }

  // You can add other analytics providers here
  // Example: Facebook Pixel, Microsoft Clarity, etc.
}

/**
 * Track page views for SPA navigation
 */
export function trackPageView(url: string, title?: string) {
  if (typeof window !== 'undefined' && 'gtag' in window) {
    (window as any).gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
      page_location: url,
      page_title: title,
    });
  }
}

/**
 * Track search queries for SEO insights
 */
export function trackSearch(query: string, results?: number) {
  trackEvent({
    action: 'search',
    category: 'engagement',
    label: query,
    value: results,
  });
}

/**
 * Track content engagement
 */
export function trackContentEngagement(contentType: string, contentId: string, action: string) {
  trackEvent({
    action,
    category: 'content_engagement',
    label: `${contentType}:${contentId}`,
  });
}

/**
 * Track language changes for internationalization insights
 */
export function trackLanguageChange(fromLocale: string, toLocale: string) {
  trackEvent({
    action: 'language_change',
    category: 'internationalization',
    label: `${fromLocale}_to_${toLocale}`,
  });
}
