import { defineLive } from "next-sanity";
import { client } from "./client";
import { apiVersion } from "../env";

const token = process.env.SANITY_VIEWER_TOKEN;

// Production-safe live configuration with error handling
const createLiveDefinition = () => {
  try {
    return defineLive({
      client: client.withConfig({
        apiVersion,
        useCdn: false, // Disable CDN for live updates
        perspective: 'published', // Use published perspective in production
      }),
      serverToken: token,
      browserToken: token,
    });
  } catch (error) {
    console.warn('Failed to initialize Sanity Live in production, falling back to regular fetch:', error);
    // Fallback when live fails to initialize
    return {
      sanityFetch: client.fetch.bind(client),
      SanityLive: () => null,
    };
  }
};

export const { sanityFetch, SanityLive } = createLiveDefinition();