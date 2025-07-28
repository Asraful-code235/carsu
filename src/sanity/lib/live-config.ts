// Configuration for Sanity Live based on environment
export interface LiveConfig {
  enabled: boolean;
  useCdn: boolean;
  perspective: "published" | "previewDrafts";
}

export const liveConfig = {
  // Use different strategies for different environments
  production: {
    // Disable live updates in production by default
    enabled: false,
    // Use CDN for better performance
    useCdn: true,
    // Use published perspective
    perspective: "published" as const,
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
  const isLiveEnabled = process.env.NEXT_PUBLIC_ENABLE_LIVE_EDITING === "true";

  // Determine if live should be enabled
  const enabled = isDevelopment || isLiveEnabled;

  // Return appropriate config based on environment
  if (isDevelopment) {
    return {
      ...liveConfig.development,
      enabled,
    };
  }

  return {
    ...liveConfig.production,
    enabled,
  };
}
