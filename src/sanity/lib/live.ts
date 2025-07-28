
import { defineLive } from "next-sanity";
import { client } from "./client";
import { apiVersion } from "../env";
import { getLiveConfig } from "./live-config";

const token = process.env.SANITY_VIEWER_TOKEN;
const config = getLiveConfig();

// Conditionally define live functionality based on environment
const liveDefinition = config.enabled 
  ? defineLive({
      client: client.withConfig({
        apiVersion,
        useCdn: config.useCdn,
        perspective: config.perspective,
      }),
      serverToken: token,
      browserToken: token,
    })
  : {
      // Fallback for when live is disabled - match the defineLive API
      sanityFetch: async ({ query, params }: { query: string; params?: any }) => {
        const result = await client.fetch(query, params || {});
        return { data: result };
      },
      SanityLive: () => null,
    };

export const { sanityFetch, SanityLive } = liveDefinition;
