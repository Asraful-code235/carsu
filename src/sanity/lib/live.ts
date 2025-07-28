
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
      // Fallback for when live is disabled
      sanityFetch: client.fetch.bind(client),
      SanityLive: () => null,
    };

export const { sanityFetch, SanityLive } = liveDefinition;
