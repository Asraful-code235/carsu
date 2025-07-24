import Image from 'next/image';
import Link from 'next/link';
import { CheckIcon, StarIcon, ArrowRightIcon, PlusIcon } from '@heroicons/react/24/outline';
import { RichTextRenderer } from '@/components/atoms/text/RichTextRenderer';
import { urlFor } from '@/sanity/lib/image';
import { cn } from '@/lib/utils/cn';

interface FeatureSectionProps {
  data: {
    type: 'feature';
    layout: 'contentLeft' | 'contentRight';
    title: any[];
    subtitle?: string;
    description?: any[];
    features?: Array<{
      text: string;
      icon: 'check' | 'star' | 'arrowRight' | 'plus';
    }>;
    ctaButtons?: Array<{
      text: string;
      href: string;
      variant: 'primary' | 'secondary' | 'outline' | 'ghost';
      openInNewTab: boolean;
    }>;
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
      alt: string;
    };
    backgroundColor?: {
      hex: string;
    };
    padding: {
      top: string;
      bottom: string;
    };
  };
}

const paddingClasses = {
  none: 'py-0',
  small: 'py-8',
  medium: 'py-12',
  large: 'py-16',
  xl: 'py-24',
};

const buttonVariants = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 border-blue-600',
  secondary: 'bg-gray-600 text-white hover:bg-gray-700 border-gray-600',
  outline: 'bg-transparent text-blue-600 hover:bg-blue-50 border-blue-600',
  ghost: 'bg-transparent text-gray-600 hover:bg-gray-50 border-transparent',
};

const iconComponents = {
  check: CheckIcon,
  star: StarIcon,
  arrowRight: ArrowRightIcon,
  plus: PlusIcon,
};

export function FeatureSection({ data }: FeatureSectionProps) {
  const {
    layout,
    title,
    subtitle,
    description,
    features,
    ctaButtons,
    image,
    backgroundColor,
    padding,
  } = data;

  const topPadding = paddingClasses[padding.top as keyof typeof paddingClasses];
  const bottomPadding = paddingClasses[padding.bottom as keyof typeof paddingClasses];

  const isContentLeft = layout === 'contentLeft';

  const ContentSection = () => (
    <div className="flex flex-col justify-center">
      {/* Title */}
      <RichTextRenderer 
        content={title} 
        className="mb-4"
      />

      {/* Subtitle */}
      {subtitle && (
        <p className="text-xl text-gray-600 mb-6">
          {subtitle}
        </p>
      )}

      {/* Description */}
      {description && (
        <div className="mb-6">
          <RichTextRenderer content={description} />
        </div>
      )}

      {/* Features List */}
      {features && features.length > 0 && (
        <ul className="space-y-3 mb-8">
          {features.map((feature, index) => {
            const IconComponent = iconComponents[feature.icon];
            return (
              <li key={index} className="flex items-center">
                <IconComponent className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
                <span className="text-gray-700">{feature.text}</span>
              </li>
            );
          })}
        </ul>
      )}

      {/* CTA Buttons */}
      {ctaButtons && ctaButtons.length > 0 && (
        <div className="flex flex-wrap gap-4">
          {ctaButtons.map((button, index) => (
            <Link
              key={index}
              href={button.href}
              target={button.openInNewTab ? '_blank' : undefined}
              rel={button.openInNewTab ? 'noopener noreferrer' : undefined}
              className={cn(
                'inline-flex items-center px-6 py-3 border rounded-lg font-medium transition-colors',
                buttonVariants[button.variant]
              )}
            >
              {button.text}
            </Link>
          ))}
        </div>
      )}
    </div>
  );

  const ImageSection = () => (
    <div className="relative">
      <Image
        src={urlFor(image.asset).width(600).height(400).url()}
        alt={image.alt}
        width={image.asset.metadata?.dimensions.width || 600}
        height={image.asset.metadata?.dimensions.height || 400}
        className="rounded-lg shadow-lg object-cover w-full h-auto"
        priority
      />
    </div>
  );

  return (
    <section
      className={cn(topPadding, bottomPadding)}
      style={{
        backgroundColor: backgroundColor?.hex || undefined,
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {isContentLeft ? (
            <>
              <ContentSection />
              <ImageSection />
            </>
          ) : (
            <>
              <ImageSection />
              <ContentSection />
            </>
          )}
        </div>
      </div>
    </section>
  );
}
