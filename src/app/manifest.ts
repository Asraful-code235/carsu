import { MetadataRoute } from 'next';

/**
 * PWA Manifest configuration for Carsu
 * Provides app-like experience when installed on devices
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Carsu - Car Shop Management',
    short_name: 'Carsu',
    description: 'Manage your car shop in one powerful app',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#2563eb',
    orientation: 'portrait',
    scope: '/',
 
    categories: ['business', 'productivity', 'utilities'],
    lang: 'en',
    dir: 'ltr',
  };
}
