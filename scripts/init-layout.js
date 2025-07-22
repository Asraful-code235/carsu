/**
 * Script to initialize the singleton layout document
 * Run this once to create the initial layout configuration
 */

import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2025-07-22',
  token: process.env.SANITY_VIEWER_TOKEN,
  useCdn: false,
});

const initLayoutDocument = async () => {
  try {
    // Check if the layout document already exists
    const existingLayout = await client.fetch('*[_type == "siteLayout" && _id == "siteLayout"][0]');
    
    if (existingLayout) {
      console.log('Layout configuration already exists');
      return;
    }

    // Create the initial layout document
    const layoutDoc = {
      _id: 'siteLayout',
      _type: 'siteLayout',
      title: 'Site Layout Configuration',
      sections: [],
      seo: {
        includeInSitemap: true,
        noIndex: false,
      },
    };

    const result = await client.create(layoutDoc);
    console.log('Layout configuration created successfully:', result._id);
  } catch (error) {
    console.error('Error creating layout configuration:', error);
  }
};

initLayoutDocument();
