
const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';

// Get preview origin with fallback logic
function getPreviewOrigin(): string {
  // Check for explicit override first
  if (process.env.SANITY_STUDIO_PREVIEW_ORIGIN) {
    return process.env.SANITY_STUDIO_PREVIEW_ORIGIN;
  }

  // Use NEXT_PUBLIC_SITE_URL if available
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }

  // Check if we're on Vercel
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  // Default to localhost for development
  return 'http://localhost:3000';
}

export const previewOrigin = getPreviewOrigin();

// Debug logging (only in development)
if (isDevelopment) {
  console.log('🔧 Sanity Preview Origin:', previewOrigin);
  console.log('🔧 Environment:', {
    NODE_ENV: process.env.NODE_ENV,
    VERCEL: process.env.VERCEL,
    VERCEL_URL: process.env.VERCEL_URL,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    SANITY_STUDIO_PREVIEW_ORIGIN: process.env.SANITY_STUDIO_PREVIEW_ORIGIN,
  });
}

export const studioConfig = {
  previewOrigin,
  isDevelopment,
  isProduction,
};
