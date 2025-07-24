import { HeroSection } from "@/components/organisms/sections/HeroSection";
import { AboutSection } from "@/components/organisms/sections/AboutSection";
import { FeatureSection } from "@/components/organisms/sections/FeatureSection";
import { ServicesSection } from "@/components/organisms/sections/ServicesSection";
import { TestimonialsSection } from "@/components/organisms/sections/TestimonialsSection";
import type { PageSection } from "@/types/page";

interface PageSectionsRendererProps {
  sections: PageSection[];
}

export function PageSectionsRenderer({ sections }: PageSectionsRendererProps) {
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
            return <HeroSection key={index} data={section} />;
          case 'about':
            return <AboutSection key={index} data={section} />;
          case 'feature':
            return <FeatureSection key={index} data={section} />;
          case 'services':
            return <ServicesSection key={index} data={section} />;
          case 'testimonials':
            return <TestimonialsSection key={index} data={section} />;
          default:
            return (
              <div key={index} className="py-8 bg-yellow-50 border border-yellow-200">
                <div className="max-w-7xl mx-auto px-6 text-center">
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
