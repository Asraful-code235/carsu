import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { RichTextRenderer } from '@/components/atoms/text/RichTextRenderer';
import { cn } from '@/lib/utils/cn';
import type { Locale } from '@/lib/i18n/config';
import { getLocalizedRichText, getLocalizedValue } from '@/lib/i18n/utils';

interface FeatureCard {
  icon?: {
    image: {
      asset: {
        _id: string;
        url: string;
        metadata?: {
          dimensions: {
            width: number;
            height: number;
          };
        };
      };
    };
    alt?: any; // Localized string
  };
  iconBackgroundColor?: 'primary' | 'success' | 'warning' | 'error' | 'info' | 'purple' | 'pink' | 'indigo' | 'gray';
  title: any; // Localized string
  description: any; // Localized string
}

interface FeatureCardsSectionData {
  type: 'featureCards';
  title: any; // Localized rich text
  subtitle?: any; // Localized rich text
  featureCards: FeatureCard[];
  layout?: {
    columns: '2' | '3' | '4';
    cardSpacing?: 'small' | 'medium' | 'large';
  };
  textAlignment?: {
    desktop: 'left' | 'center' | 'right';
    mobile: 'left' | 'center' | 'right';
  };
  backgroundColor?: { hex: string };
  padding?: {
    top: string;
    bottom: string;
  };
}

interface FeatureCardsSectionProps {
  data: FeatureCardsSectionData;
  locale?: Locale;
}

// Removed icon components - now using Sanity images

const iconBackgroundClasses = {
  primary: 'bg-[#1D6EE7]',
  success: 'bg-green-100',
  warning: 'bg-yellow-100',
  error: 'bg-red-100',
  info: 'bg-cyan-100',
  purple: 'bg-purple-100',
  pink: 'bg-pink-100',
  indigo: 'bg-indigo-100',
  gray: 'bg-gray-100',
};

const paddingClasses = {
  none: 'py-0',
  small: 'py-8',
  medium: 'py-12',
  large: 'py-16',
  xl: 'py-24',
};

const columnClasses = {
  '2': 'grid-cols-1 md:grid-cols-2',
  '3': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  '4': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
};

const spacingClasses = {
  small: 'gap-6',
  medium: 'gap-8',
  large: 'gap-10',
};

export function FeatureCardsSection({ data, locale = 'en' }: FeatureCardsSectionProps) {
  const {
    title,
    subtitle,
    featureCards,
    layout = { columns: '4', cardSpacing: 'medium' },
    textAlignment = { desktop: 'center', mobile: 'center' },
    backgroundColor,
    padding = { top: 'large', bottom: 'large' }
  } = data;

  const paddingClass = paddingClasses[padding.top as keyof typeof paddingClasses] || paddingClasses.large;
  const backgroundStyle = backgroundColor?.hex ? { backgroundColor: backgroundColor.hex } : {};
  const columnClass = columnClasses[layout.columns];
  const spacingClass = spacingClasses[layout.cardSpacing || 'medium'];

  return (
    <section 
      className={cn('relative', paddingClass)}
      style={backgroundStyle}
    >
      <div className="container mx-auto w-full px-6 lg:px-24">
        {/* Grid with Title and Feature Cards */}
        <div className={cn('grid', columnClass, spacingClass, ' items-start')}>
          {/* Title Column */}
          <div className={cn(
            'flex flex-col justify-start',
            textAlignment.desktop === 'center' ? 'text-center' : textAlignment.desktop === 'right' ? 'text-right' : 'text-left',
            'md:text-left' // Always left-align on mobile and tablet for better readability
          )}>
            {/* Title */}
            <div className="mb-6">
              <RichTextRenderer
                content={getLocalizedRichText(title, locale)}
                className="prose-headings:text-2xl prose-headings:md:text-3xl prose-headings:lg:text-4xl prose-headings:font-bold prose-headings:text-gray-900 prose-headings:mb-0 prose-headings:leading-tight"
              />
            </div>

            {/* Subtitle */}
            {subtitle && (
              <div>
                <RichTextRenderer
                  content={getLocalizedRichText(subtitle, locale)}
                  className="prose-p:text-base prose-p:text-gray-600 prose-p:mb-0 prose-p:leading-relaxed"
                />
              </div>
            )}
          </div>

          {/* Feature Cards */}
          {featureCards.map((card, index) => {
            const iconBackgroundClass = iconBackgroundClasses[card.iconBackgroundColor || 'primary'];

            return (
              <div
                key={index}
                className={cn(
                  'group relative bg-white rounded-xl px-8  ',
                  'hover:shadow-xl transition-all duration-300 ease-in-out',
                  'hover:-translate-y-1',
                  textAlignment.desktop === 'center' ? 'text-center' : textAlignment.desktop === 'right' ? 'text-right' : 'text-left',
                  'md:text-left' // Always center on mobile and tablet
                )}
              >
                {/* Icon */}
                {card.icon?.image?.asset && (
                  <div
                   style={{
                    boxShadow:"7px 13px 26px 0 rgba(26, 102, 216, 0.36);"
                   }}
                  className={cn(
                    'inline-flex items-center justify-center w-16 h-16 rounded-xl mb-6 p-3',
                    'group-hover:scale-110 transition-transform duration-300',
                    iconBackgroundClass
                  )}>
                    <Image
                      src={urlFor(card.icon.image.asset).width(40).height(40).url()}
                      alt={getLocalizedValue(card.icon.alt, locale) || 'Feature icon'}
                      width={40}
                      height={40}
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-4 leading-tight">
                  {getLocalizedValue(card.title, locale)}
                </h3>

              

                {/* Subtle background decoration */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-gray-50/30 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
