'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ProductBenefitsListSection as ProductBenefitsListSectionType } from '@/types/page';
import { getLocalizedValue, getLocalizedRichText } from '@/lib/i18n/utils';
import { urlFor } from '@/sanity/lib/image';
import { cn } from '@/lib/utils/cn';
import { RichTextRenderer } from '@/components/atoms/text/RichTextRenderer';
import type { Locale } from '@/lib/i18n/config';

interface ProductBenefitsListSectionProps {
  section: ProductBenefitsListSectionType;
  locale: Locale;
}

// Padding classes
const paddingClasses = {
  none: 'py-0',
  small: 'py-8 md:py-12',
  medium: 'py-12 md:py-16',
  large: 'py-16 md:py-24',
  xlarge: 'py-24 md:py-32',
};

export function ProductBenefitsListSection({ section, locale }: ProductBenefitsListSectionProps) {
  const { title, description, benefits, layout, backgroundColor, padding } = section;

  // State for active benefit (defaults to first benefit)
  const [activeBenefitIndex, setActiveBenefitIndex] = useState(0);
  const activeBenefit = benefits[activeBenefitIndex];

  const paddingClass = paddingClasses[padding?.top as keyof typeof paddingClasses] || paddingClasses.large;
  const backgroundStyle = backgroundColor?.hex ? { backgroundColor: backgroundColor.hex } : {};

  const isImageLeft = layout === 'imageLeft';

  return (
    <section
      className={cn('relative overflow-hidden', paddingClass)}
      style={backgroundStyle}
    >
      <div className="container mx-auto px-6 lg:px-24">
        <div className={cn(
          'grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start',
          isImageLeft ? 'lg:grid-cols-[1fr_1fr]' : 'lg:grid-cols-[1fr_1fr]'
        )}>
          {/* Image Section */}
          <div className={cn(
            'relative space-y-[68px] max-lg:hidden',
            isImageLeft ? 'lg:order-1' : 'lg:order-2'
          )}>

            {description && (
                <div className="max:hidden">
                  <RichTextRenderer
                    content={getLocalizedRichText(description, locale)}
                    className="prose prose-base max-w-none [&_p]:text-gray-600 [&_p]:text-base [&_p]:md:text-lg [&_p]:leading-relaxed [&_p]:mb-0"
                  />
                </div>
              )}
            {/* Image */}
            <div className="relative aspect-[4/3] w-full max-w-lg mx-auto lg:max-w-[352px] lg:max-h-[259px]]">
              {activeBenefit?.image?.image?.asset && (
                <Image
                  src={urlFor(activeBenefit.image.image.asset).width(600).height(450).url()}
                  alt={getLocalizedValue(activeBenefit.image.alt, locale) || 'Benefit illustration'}
                  fill
                  className="object-contain transition-opacity duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
                />
              )}
            </div>

            {/* Active Benefit Description (below image) */}
            {activeBenefit?.description && (
              <div className="max-w-[576px] mx-auto w-full lg:max-w-none p-8 rounded-2xl bg-white shadow-md">
                <RichTextRenderer
                  content={getLocalizedRichText(activeBenefit.description, locale)}
                  className=" transition-opacity duration-300"
                />
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className={cn(
            'space-y-8',
            isImageLeft ? 'lg:order-2' : 'lg:order-1'
          )}>
            {/* Title */}
            <div className="space-y-4">
              <RichTextRenderer
                content={getLocalizedRichText(title, locale)}
                className="prose prose-lg max-w-none [&_h1]:text-2xl [&_h1]:md:text-3xl [&_h1]:lg:text-4xl [&_h1]:font-bold [&_h1]:text-gray-900 [&_h1]:leading-tight [&_h1]:mb-0 [&_h2]:text-xl [&_h2]:md:text-2xl [&_h2]:lg:text-3xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:leading-tight [&_h2]:mb-0 [&_p]:text-2xl [&_p]:md:text-3xl [&_p]:lg:text-4xl [&_p]:font-bold [&_p]:text-gray-900 [&_p]:leading-tight [&_p]:mb-0"
              />

              {/* Section Description - Only show on mobile */}
              {description && (
                <div className="lg:hidden">
                  <RichTextRenderer
                    content={getLocalizedRichText(description, locale)}
                    className="prose prose-base max-w-none [&_p]:text-gray-600 [&_p]:text-base [&_p]:md:text-lg [&_p]:leading-relaxed [&_p]:mb-0"
                  />
                </div>
              )}
            </div>

            {/* Benefits List */}
            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className={cn(
                    "space-y-3 cursor-pointer transition-all duration-200 rounded-lg",
                    activeBenefitIndex === index
                      ? ""
                      : "hover:bg-gray-50"
                  )}
                  onClick={() => setActiveBenefitIndex(index)}
                >
                  {/* Benefit Title */}
                  <div className="flex items-start gap-3">
                    {/* Bullet Point */}
                    <div className={cn(
                      "flex-shrink-0 w-2 h-2 rounded-full mt-2 transition-colors duration-200",
                      activeBenefitIndex === index ? "bg-blue-600" : "hidden"
                    )}></div>
                    <h3 className={cn(
                      "text-lg md:text-xl  leading-tight transition-colors duration-200",
                      activeBenefitIndex === index ? "text-[#4D525E] font-bold" : "text-[#4D525E]"
                    )}>
                      {getLocalizedValue(benefit.title, locale)}
                    </h3>
                  </div>

                  {benefit.description && (
                    <div className="ml-5 lg:hidden">
                      <RichTextRenderer
                        content={getLocalizedRichText(benefit.description, locale)}
                        className={cn(
                          "prose prose-sm max-w-none [&_p]:text-sm [&_p]:md:text-base [&_p]:leading-relaxed [&_p]:mb-0 transition-colors duration-200",
                          activeBenefitIndex === index ? "[&_p]:text-blue-800" : "[&_p]:text-gray-600"
                        )}
                      />
                    </div>
                  )}

                  {/* Divider (except for last item) */}
                  {index < benefits.length - 1 && (
                    <div className="ml-5 pt-3">
                      <div className="w-full h-px bg-gray-200"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
