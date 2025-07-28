import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'
import { getLiveConfig } from './live-config'

// Get the appropriate studio URL based on environment
function getStudioUrl(): string {
  // Use environment variable if available
  if (process.env.NEXT_PUBLIC_SANITY_STUDIO_URL) {
    return process.env.NEXT_PUBLIC_SANITY_STUDIO_URL;
  }

  // Check if we're on Vercel
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}/studio`;
  }

  // Default fallback
  return 'http://localhost:3000/studio';
}

const config = getLiveConfig();

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token: process.env.SANITY_VIEWER_TOKEN,
  useCdn: config.useCdn,
  stega: {
    studioUrl: getStudioUrl(),
    // Only enable stega when live editing is enabled
    enabled: config.enabled,
  },
})
