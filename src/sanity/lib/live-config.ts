// Configuration for Sanity Live based on environment
export interface LiveConfig {
  enabled: boolean;
  useCdn: boolean;
  perspective: "published" | "previewDrafts";
}

export const liveConfig = {
  // Use different strategies for different environments
  production: {
    // Enable live updates in production for sales demos and presentations
    enabled: true,
    // Don't use CDN for live editing to work properly
    useCdn: false,
    // Use previewDrafts for editing capabilities
    perspective: "previewDrafts" as const,
  },

  development: {
    // Enable live updates in development
    enabled: true,
    // Don't use CDN for real-time updates
    useCdn: false,
    // Use previewDrafts for editing
    perspective: "previewDrafts" as const,
  },

  // Fallback configuration for connection issues
  fallback: {
    maxRetries: 3,
    retryDelay: 1000,
    timeout: 5000,
  },
};

// Helper to get environment-specific config
export function getLiveConfig(): LiveConfig {
  const isDevelopment = process.env.NODE_ENV === "development";
  const isLiveDisabled =
    process.env.NEXT_PUBLIC_DISABLE_LIVE_EDITING === "true";

  // Allow disabling live editing with explicit env var
  if (isLiveDisabled) {
    return {
      enabled: false,
      useCdn: true,
      perspective: "published",
    };
  }

  // Return appropriate config based on environment
  // Both development and production now have live editing enabled by default
  if (isDevelopment) {
    return liveConfig.development;
  }

  return liveConfig.production;
}
