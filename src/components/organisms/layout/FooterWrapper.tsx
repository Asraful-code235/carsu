import { sanityFetch } from '@/sanity/lib/live';
import { FOOTER_QUERY } from '@/sanity/lib/queries/footerQueries';
import { Footer } from './Footer';
import type { Locale } from '@/lib/i18n/config';

interface FooterWrapperProps {
  locale?: Locale;
}

export async function FooterWrapper({ locale = 'en' }: FooterWrapperProps) {
  try {
    const { data: footerData } = await sanityFetch({
      query: FOOTER_QUERY,
    });

    if (!footerData) {
      // Return a minimal footer if no data is found
      return (
        <footer className="bg-white py-20 px-6 lg:px-24">
          <div className="container mx-auto text-center">
            <p className="text-gray-400">
              © {new Date().getFullYear()} Your Company Name. All rights reserved.
            </p>
          </div>
        </footer>
      );
    }

    return <Footer data={footerData} locale={locale} />;
  } catch (error) {
    console.error('Error fetching footer data:', error);
    
    return (
      <footer className="bg-white py-20 px-6 lg:px-24">
        <div className="container mx-auto text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Your Company Name. All rights reserved.
          </p>
        </div>
      </footer>
    );
  }
}
