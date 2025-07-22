/**
 * Script to set up the complete header system
 * This creates:
 * 1. A sample header configuration
 * 2. The singleton layout document
 * 3. Links them together
 */

import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2025-07-22',
  token: process.env.SANITY_VIEWER_TOKEN,
  useCdn: false,
});

const setupHeaderSystem = async () => {
  try {
    console.log('Setting up header system...');

    // 1. Create a sample header configuration
    const headerDoc = {
      _type: 'header',
      title: 'Main Site Header',
      logo: {
        alt: 'Carsu Logo',
        width: 120,
        height: 32,
      },
      navigation: [
        {
          title: 'Home',
          href: '/',
          hasDropdown: false,
        },
        {
          title: 'About',
          href: '/about',
          hasDropdown: false,
        },
        {
          title: 'Services',
          href: '/services',
          hasDropdown: true,
          dropdownItems: [
            {
              title: 'Web Development',
              href: '/services/web-development',
              description: 'Custom web applications',
            },
            {
              title: 'Mobile Apps',
              href: '/services/mobile-apps',
              description: 'iOS and Android development',
            },
          ],
        },
        {
          title: 'Contact',
          href: '/contact',
          hasDropdown: false,
        },
      ],
      ctaButtons: [
        {
          title: 'Login',
          href: '/login',
          variant: 'outline',
          openInNewTab: false,
        },
        {
          title: 'Get Started',
          href: '/get-started',
          variant: 'primary',
          openInNewTab: false,
        },
      ],
      mobileSettings: {
        showCTAInMobile: true,
        mobileMenuPosition: 'below',
      },
    };

    console.log('Creating header configuration...');
    const headerResult = await client.create(headerDoc);
    console.log('Header created:', headerResult._id);

    // 2. Check if layout document exists
    const existingLayout = await client.fetch('*[_type == "siteLayout" && _id == "siteLayout"][0]');
    
    if (existingLayout) {
      console.log('Layout configuration already exists, updating...');
      
      // Update existing layout to include header section
      const updatedLayout = await client
        .patch('siteLayout')
        .set({
          sections: [
            {
              _type: 'headerSection',
              type: 'header',
              sticky: true,
              transparent: false,
              header: {
                _type: 'reference',
                _ref: headerResult._id,
              },
            },
          ],
        })
        .commit();
      
      console.log('Layout updated with header section');
    } else {
      // 3. Create the singleton layout document with header section
      const layoutDoc = {
        _id: 'siteLayout',
        _type: 'siteLayout',
        title: 'Site Layout Configuration',
        sections: [
          {
            _type: 'headerSection',
            type: 'header',
            sticky: true,
            transparent: false,
            header: {
              _type: 'reference',
              _ref: headerResult._id,
            },
          },
        ],
        seo: {
          includeInSitemap: true,
          noIndex: false,
        },
      };

      console.log('Creating layout configuration...');
      const layoutResult = await client.create(layoutDoc);
      console.log('Layout created:', layoutResult._id);
    }

    console.log('✅ Header system setup complete!');
    console.log('You can now:');
    console.log('1. Visit your Sanity Studio to edit the header');
    console.log('2. Go to Site Configuration → Layout Configuration');
    console.log('3. Your header should now appear on your site');

  } catch (error) {
    console.error('Error setting up header system:', error);
  }
};

setupHeaderSystem();
