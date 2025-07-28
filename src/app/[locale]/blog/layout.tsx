import { Metadata } from 'next';
import type { Locale } from '@/lib/i18n/config';

interface BlogLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    locale: Locale;
  }>;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  
  // Define metadata for different languages
  const metadata = {
    en: {
      title: 'Blog | Carsu',
      description: 'Auto shop management insights, tips, and updates from Carsu.',
    },
    es: {
      title: 'Blog | Carsu',
      description: 'Perspectivas, consejos y actualizaciones sobre gestión de talleres de Carsu.',
    },
    it: {
      title: 'Blog | Carsu',
      description: 'Approfondimenti, consigli e aggiornamenti sulla gestione delle officine da Carsu.',
    }
  };

  const currentMetadata = metadata[locale] || metadata.en;

  return {
    title: {
      template: `%s | ${currentMetadata.title}`,
      default: currentMetadata.title,
    },
    description: currentMetadata.description,
  };
}

export default function BlogLayout({ children }: BlogLayoutProps) {
  return (
    <>
      {children}
    </>
  );
}
