/**
 * Environment-aware configuration for Sanity Studio
 */

// Get the current environment
const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';

// Determine the base URL based on environment
function getBaseUrl(): string {
  // Check if we're running on Vercel (production environment)
  const isVercel = process.env.VERCEL || process.env.VERCEL_URL;

  if (isVercel) {
    // We're on Vercel, use production URL
    if (process.env.VERCEL_URL) {
      return `https://${process.env.VERCEL_URL}`;
    }
    if (process.env.NEXT_PUBLIC_VERCEL_URL) {
      return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
    }
    // Fallback to your known production URL
    return 'https://carsu-three.vercel.app';
  }

  // We're in local development, always use localhost
  if (isDevelopment) {
    return 'http://localhost:3000';
  }

  // If explicitly set and not in development, use that
  if (process.env.SANITY_STUDIO_PREVIEW_ORIGIN && isProduction) {
    return process.env.SANITY_STUDIO_PREVIEW_ORIGIN;
  }

  // Final fallback
  return 'http://localhost:3000';
}

export const previewOrigin = getBaseUrl();

// Debug logging (only in development)
if (process.env.NODE_ENV === 'development') {
  console.log('🔧 Sanity Preview Origin:', previewOrigin);
  console.log('🔧 Environment:', {
    NODE_ENV: process.env.NODE_ENV,
    VERCEL: process.env.VERCEL,
    VERCEL_URL: process.env.VERCEL_URL,
    SANITY_STUDIO_PREVIEW_ORIGIN: process.env.SANITY_STUDIO_PREVIEW_ORIGIN,
  });
}

export const studioConfig = {
  previewOrigin,
  isDevelopment,
  isProduction,
};
