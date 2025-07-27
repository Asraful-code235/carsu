import Image from 'next/image';
import { ProductFeaturesGridSection as ProductFeaturesGridSectionType } from '@/types/page';
import { getLocalizedValue, getLocalizedRichText } from '@/lib/i18n/utils';
import { urlFor } from '@/sanity/lib/image';
import { cn } from '@/lib/utils/cn';
import { RichTextRenderer } from '@/components/atoms/text/RichTextRenderer';
import type { Locale } from '@/lib/i18n/config';

interface ProductFeaturesGridSectionProps {
  section: ProductFeaturesGridSectionType;
  locale: Locale;
}

// Icon components for feature lists
const FeatureIcon = ({ icon, className }: { icon: string; className?: string }) => {
  const iconClasses = cn('w-4 h-4 flex-shrink-0', className);
  
  switch (icon) {
    case 'check':
      return (
        <svg className={iconClasses} fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      );
    case 'star':
      return (
        <svg className={iconClasses} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    case 'arrowRight':
      return (
        <svg className={iconClasses} fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      );
    case 'plus':
      return (
        <svg className={iconClasses} fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
        </svg>
      );
    case 'bullet':
    default:
      return (
        <div className={cn('w-2 h-2 rounded-full bg-current', className)} />
      );
  }
};

// Padding classes
const paddingClasses = {
  none: 'py-0',
  small: 'py-8 md:py-12',
  medium: 'py-12 md:py-16',
  large: 'py-16 md:py-24',
  xlarge: 'py-24 md:py-32',
};



export function ProductFeaturesGridSection({ section, locale }: ProductFeaturesGridSectionProps) {
  const { featureItems, backgroundColor, padding } = section;

  const paddingClass = paddingClasses[padding?.top as keyof typeof paddingClasses] || paddingClasses.large;
  const backgroundStyle = backgroundColor?.hex ? { backgroundColor: backgroundColor.hex } : {};

  return (
    <section
      className={cn('relative overflow-hidden', paddingClass)}
      style={backgroundStyle}
    >
      <div className="container mx-auto px-6 lg:px-24">
        {/* Two Column Flex Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="flex flex-col gap-6">
            {featureItems
              .filter((_, index) => index % 2 === 0) // Even indices (0, 2, 4...)
              .map((item, originalIndex) => {
                const actualIndex = originalIndex * 2; // Convert back to original index
                const isTallCard = actualIndex === 0; // First card is tall
                const cardPadding = isTallCard ? 'lg:py-[118px]' : 'lg:py-[80px]';
                const cardSpacing = isTallCard ? 'space-y-[76px]' : 'space-y-[50px]';

                return (
                  <div
                    key={actualIndex}
                    className={cn(
                      'bg-[#F8FAFC] rounded-3xl p-6 lg:px-[66px] border border-[#FCFBFC]',
                      'hover:shadow-lg transition-all duration-300',
                      'flex flex-col h-full',
                      cardPadding,
                      cardSpacing
                    )}
                  >
                    {/* Content Section */}
                    <div className="flex-1 space-y-6">
                      {/* Title */}
                      <div className='max-w-[310.884px] w-full mx-auto'>
                        <RichTextRenderer
                          content={getLocalizedRichText(item.title, locale)}
                          className="text-center"
                        />
                      </div>

                      {/* Description */}
                      {item.description && (
                        <div className="text-center max-w-[430.884px] w-full mx-auto">
                          <RichTextRenderer
                            content={getLocalizedRichText(item.description, locale)}
                            className="prose-p:text-sm prose-p:lg:text-base prose-p:text-gray-600 prose-p:mb-0 prose-p:leading-relaxed prose-p:text-center"
                          />
                        </div>
                      )}

                      {/* Features List */}
                      {item.features && item.features.length > 0 && (
                        <ul className="space-y-2 text-center">
                          {item.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-center justify-center gap-2">
                              <FeatureIcon
                                icon={feature.icon}
                                className="text-blue-600 flex-shrink-0"
                              />
                              <span className="text-gray-700 text-sm lg:text-base">
                                {getLocalizedValue(feature.text, locale)}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {/* Image Section */}
                    <div className={cn(
                      'relative',
                      isTallCard ? 'h-56 md:h-64 lg:h-72' : 'h-40 md:h-48 lg:h-56',
                      'mt-auto'
                    )}>
                      {item.image?.image?.asset && (
                        <Image
                          src={urlFor(item.image.image.asset).width(500).height(300).url()}
                          alt={getLocalizedValue(item.image.alt, locale) || 'Feature image'}
                          fill
                          className="object-contain object-center"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 500px"
                        />
                      )}
                    </div>
                  </div>
                );
              })}
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-6">
            {featureItems
              .filter((_, index) => index % 2 === 1) // Odd indices (1, 3, 5...)
              .map((item, originalIndex) => {
                const actualIndex = (originalIndex * 2) + 1; // Convert back to original index
                const isTallCard = actualIndex === 3; // Fourth card is tall
                const cardPadding = isTallCard ? 'lg:py-[118px]' : 'lg:py-[80px]';
                const cardSpacing = isTallCard ? 'space-y-[76px]' : 'space-y-[50px]';

                return (
                  <div
                    key={actualIndex}
                    className={cn(
                      'bg-[#F8FAFC] rounded-3xl p-6 lg:px-[66px] border border-[#FCFBFC]',
                      'hover:shadow-lg transition-all duration-300',
                      'flex flex-col',
                      cardPadding,
                      cardSpacing
                    )}
                  >
                    {/* Content Section */}
                    <div className="flex-1 space-y-6">
                      {/* Title */}
                      <div className='max-w-[310.884px] w-full mx-auto'>
                        <RichTextRenderer
                          content={getLocalizedRichText(item.title, locale)}
                          className="text-center"
                        />
                      </div>

                      {/* Description */}
                      {item.description && (
                        <div className="text-center max-w-[430.884px] w-full mx-auto">
                          <RichTextRenderer
                            content={getLocalizedRichText(item.description, locale)}
                            className="prose-p:text-sm prose-p:lg:text-base prose-p:text-gray-600 prose-p:mb-0 prose-p:leading-relaxed prose-p:text-center"
                          />
                        </div>
                      )}

                      {/* Features List */}
                      {item.features && item.features.length > 0 && (
                        <ul className="space-y-2 text-center">
                          {item.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-center justify-center gap-2">
                              <FeatureIcon
                                icon={feature.icon}
                                className="text-blue-600 flex-shrink-0"
                              />
                              <span className="text-gray-700 text-sm lg:text-base">
                                {getLocalizedValue(feature.text, locale)}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {/* Image Section */}
                    <div className={cn(
                      'relative',
                      isTallCard ? 'h-56 md:h-64 lg:h-72' : 'h-40 md:h-48 lg:h-56',
                      'mt-auto'
                    )}>
                      {item.image?.image?.asset && (
                        <Image
                          src={urlFor(item.image.image.asset).width(500).height(300).url()}
                          alt={getLocalizedValue(item.image.alt, locale) || 'Feature image'}
                          fill
                          className="object-contain object-center"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 500px"
                        />
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
}
