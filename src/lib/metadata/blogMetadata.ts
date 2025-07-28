import { Metadata } from 'next';
import type { Locale } from '@/lib/i18n/config';

interface BlogMetadataConfig {
  title: string;
  description: string;
  keywords: string;
}

const BLOG_METADATA: Record<Locale, BlogMetadataConfig> = {
  en: {
    title: 'Blog | Carsu - Auto Shop Management Insights',
    description: 'Discover the latest insights, tips, and updates for auto shop management. Learn how Carsu can transform your automotive business operations.',
    keywords: 'auto shop management, automotive business, car repair software, garage management system, automotive insights'
  },
  es: {
    title: 'Blog | Carsu - Perspectivas de Gestión de Talleres',
    description: 'Descubre las últimas perspectivas, consejos y actualizaciones para la gestión de talleres automotrices. Aprende cómo Carsu puede transformar las operaciones de tu negocio automotriz.',
    keywords: 'gestión de talleres, negocio automotriz, software de reparación de autos, sistema de gestión de garajes, perspectivas automotrices'
  },
  it: {
    title: 'Blog | Carsu - Approfondimenti sulla Gestione delle Officine',
    description: 'Scopri le ultime intuizioni, consigli e aggiornamenti per la gestione delle officine automobilistiche. Scopri come Carsu può trasformare le operazioni della tua attività automobilistica.',
    keywords: 'gestione officine, business automobilistico, software riparazione auto, sistema gestione garage, approfondimenti automobilistici'
  }
};

/**
 * Generates metadata for the blog page
 */
export function generateBlogMetadata(locale: Locale): Metadata {
  const config = BLOG_METADATA[locale] || BLOG_METADATA.en;

  return {
    title: config.title,
    description: config.description,
    keywords: config.keywords,
    openGraph: {
      title: config.title,
      description: config.description,
      type: 'website',
      locale: locale,
      siteName: 'Carsu',
    },
    twitter: {
      card: 'summary_large_image',
      title: config.title,
      description: config.description,
    },
    alternates: {
      canonical: `/blog`,
      languages: {
        'en': '/en/blog',
        'es': '/es/blog',
        'it': '/it/blog',
      },
    },
  };
}
