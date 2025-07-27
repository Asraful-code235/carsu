import { HeroSection } from "@/components/organisms/sections/HeroSection";
import { ProductHeroSection } from "@/components/organisms/sections/ProductHeroSection";
import { ProductFeatureSection } from "@/components/organisms/sections/ProductFeatureSection";
import { ProductInteractiveSection } from "@/components/organisms/sections/ProductInteractiveSection";
import { ProductBannerSection } from "@/components/organisms/sections/ProductBannerSection";
import { ProductPromotionBannerSection } from "@/components/organisms/sections/ProductPromotionBannerSection";
import { AboutSection } from "@/components/organisms/sections/AboutSection";
import { PageHeroSection } from "@/components/organisms/sections/PageHeroSection";
import { ContentSection } from "@/components/organisms/sections/ContentSection";
import { FeatureSection } from "@/components/organisms/sections/FeatureSection";
import { ServicesSection } from "@/components/organisms/sections/ServicesSection";
import { TestimonialsSection } from "@/components/organisms/sections/TestimonialsSection";
import { TryCarsuBanner } from "@/components/organisms/sections/TryCarsuBanner";
import { ContactFormSection } from "@/components/organisms/sections/ContactFormSection";
import { FAQSection } from "@/components/organisms/sections/FAQSection";
import type { PageSection } from "@/types/page";
import type { Locale } from "@/lib/i18n/config";

interface PageSectionsRendererProps {
  sections: PageSection[];
  locale?: Locale;
}

export function PageSectionsRenderer({ sections, locale = 'en' }: PageSectionsRendererProps) {
  if (!sections || sections.length === 0) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            No sections configured
          </h2>
          <p className="text-gray-600">
            Add sections to this page in Sanity Studio to see content here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {sections.map((section, index) => {
        switch (section.type) {
          case 'hero':
            return <HeroSection key={index} data={section} locale={locale} />;
          case 'productHero':
            return <ProductHeroSection key={index} data={section} locale={locale} />;
          case 'productFeature':
            return <ProductFeatureSection key={index} data={section} locale={locale} />;
          case 'productInteractive':
            return <ProductInteractiveSection key={index} data={section} locale={locale} />;
          case 'productBanner':
            return <ProductBannerSection key={index} data={section} locale={locale} />;
          case 'productPromotionBanner':
            return <ProductPromotionBannerSection key={index} data={section} locale={locale} />;
          case 'about':
            return <AboutSection key={index} data={section} locale={locale} />;
          case 'pageHero':
            return <PageHeroSection key={index} data={section} locale={locale} />;
          case 'content':
            return <ContentSection key={index} data={section} locale={locale} />;
          case 'feature':
            return <FeatureSection key={index} data={section} locale={locale} />;
          case 'services':
            return <ServicesSection key={index} data={section} locale={locale} />;
          case 'testimonials':
            return <TestimonialsSection key={index} data={section} locale={locale} />;
          case 'tryCarsuBanner':
            return <TryCarsuBanner key={index} {...section} locale={locale} />;
          case 'contactForm':
            return <ContactFormSection key={index} {...section} locale={locale} />;
          case 'faq':
            return <FAQSection key={index} {...section} locale={locale} />;
          default:
            return (
              <div key={index} className="py-8 bg-yellow-50 border border-yellow-200">
                <div className="container mx-auto px-6 text-center">
                  <p className="text-yellow-800">
                    Unknown section type: {(section as unknown as any).type}
                  </p>
                </div>
              </div>
            );
        }
      })}
    </>
  );
}
