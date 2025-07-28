
import { defineLive } from "next-sanity";
import { client } from "./client";
import { apiVersion } from "../env";
import { getLiveConfig } from "./live-config";

const token = process.env.SANITY_VIEWER_TOKEN;
const config = getLiveConfig();

// Production-ready live configuration with error handling
const createLiveDefinition = () => {
  if (!config.enabled) {
    // Fallback for when live is disabled - match the defineLive API
    return {
      sanityFetch: async ({ query, params }: { query: string; params?: any }) => {
        const result = await client.fetch(query, params || {});
        return { data: result };
      },
      SanityLive: () => null,
    };
  }

  try {
    // Try to initialize live editing
    return defineLive({
      client: client.withConfig({
        apiVersion,
        useCdn: config.useCdn,
        perspective: config.perspective,
      }),
      serverToken: token,
      browserToken: token,
    });
  } catch (error) {
    // Graceful fallback if live initialization fails
    console.warn('Live editing initialization failed, falling back to regular fetch:', error);
    return {
      sanityFetch: async ({ query, params }: { query: string; params?: any }) => {
        const result = await client.fetch(query, params || {});
        return { data: result };
      },
      SanityLive: () => null,
    };
  }
};

export const { sanityFetch, SanityLive } = createLiveDefinition();
