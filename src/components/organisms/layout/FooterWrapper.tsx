import { sanityFetch } from '@/sanity/lib/live';
import { FOOTER_QUERY } from '@/sanity/lib/queries/footerQueries';
import { Footer } from './Footer';

export async function FooterWrapper() {
  try {
    const { data: footerData } = await sanityFetch({
      query: FOOTER_QUERY,
    });

    if (!footerData) {
      // Return a minimal footer if no data is found
      return (
        <footer className="bg-white py-20 px-6 lg:px-24">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-gray-400">
              © {new Date().getFullYear()} Your Company Name. All rights reserved.
            </p>
          </div>
        </footer>
      );
    }

    return <Footer data={footerData} />;
  } catch (error) {
    console.error('Error fetching footer data:', error);
    
    return (
      <footer className="bg-white py-20 px-6 lg:px-24">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Your Company Name. All rights reserved.
          </p>
        </div>
      </footer>
    );
  }
}
