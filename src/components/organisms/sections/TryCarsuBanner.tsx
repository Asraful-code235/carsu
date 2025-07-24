import { cn } from '@/lib/utils/cn';
import { RichTextRenderer } from '@/components/atoms/text/RichTextRenderer';
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';
import Link from 'next/link';

interface TryCarsuBannerProps {
  title?: any[]; // Rich text array (Portable Text)
  description?: any[]; // Rich text array (Portable Text)
  ctaButton?: {
    text: string;
    href: string;
    variant: 'primary' | 'secondary' | 'outline' | 'ghost';
    openInNewTab: boolean;
  };
  backgroundColor?: {
    hex: string;
  };
  mainImage?: {
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
    alt: string;
    width?: number;
    height?: number;
  };
  glowImage?: {
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
    alt: string;
  };
  padding?: {
    top: string;
    bottom: string;
    left: string;
    right: string;
  };
  settings?: {
    fullWidth?: boolean;
    borderRadius?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
    textAlignment?: {
      desktop: 'left' | 'center';
      mobile: 'left' | 'center';
    };
    imagePosition?: 'left' | 'right';
  };
}

export function TryCarsuBanner({
  title,
  description,
  ctaButton,
  backgroundColor,
  mainImage,
  glowImage,
  padding,
  settings,
}: TryCarsuBannerProps) {
  const {
    fullWidth = false,
    borderRadius = 'xl',
    textAlignment = { desktop: 'left', mobile: 'center' },
    imagePosition = 'right',
  } = settings || {};

  const borderRadiusClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full',
  };

  const textAlignmentClasses = {
    left: 'text-left',
    center: 'text-center',
  };

  const containerClasses = cn(
    'relative overflow-hidden',
    borderRadiusClasses[borderRadius],
    fullWidth ? 'w-full' : 'max-w-6xl mx-auto',
    padding?.top && `pt-${padding.top}`,
    padding?.bottom && `pb-${padding.bottom}`,
    padding?.left && `pl-${padding.left}`,
    padding?.right && `pr-${padding.right}`
  );

  const contentClasses = cn(
    'relative z-10 px-12 lg:px-24 py-16 lg:py-20',
    'grid gap-8 lg:gap-12',
    imagePosition === 'right' ? 'lg:grid-cols-2' : 'lg:grid-cols-2',
    imagePosition === 'left' && 'lg:[&>*:first-child]:order-2'
  );

  const textContentClasses = cn(
    'flex flex-col justify-center space-y-6',
    textAlignmentClasses[textAlignment.mobile],
    `lg:${textAlignmentClasses[textAlignment.desktop]}`
  );

  const backgroundStyle = backgroundColor?.hex
    ? { backgroundColor: backgroundColor.hex }
    : { backgroundColor: '#2563eb' }; // Default blue

  return (
    <section className={cn('py-16 px-6 lg:px-20 relative ', !fullWidth && 'max-w-7xl mx-auto')}>
      <div className={containerClasses}>
        {/* Glow Effect */}
        {glowImage && glowImage.image && glowImage.image.asset && (
          <div className="absolute -top-40 left-1/2 transform -translate-x-1/2 z-10 opacity-100">
            <Image
              src={urlFor(glowImage.image.asset).width(384).height(384).url()}
              alt={glowImage.alt || 'Glow effect'}
              width={384}
              height={384}
              className="w-96 h-96 object-contain rounded-full"
            />
          </div>
        )}

        {/* Main Banner Container */}
        <div
          className="z-20"
          style={backgroundStyle}
        >
          <div className={contentClasses}>
            {/* Text Content */}
            <div className={textContentClasses}>
              {title && (
                <RichTextRenderer
                  content={title}
                  extraClassName="text-white font-bold text-3xl lg:text-4xl leading-tight text-left"
                />
              )}

              {description && (
                <RichTextRenderer
                  content={description}
                  extraClassName="text-white text-lg leading-relaxed"
                  textWhite={true}
                />
              )}

              {ctaButton && ctaButton.href && (
                <div className={cn(
                  'flex',
                  textAlignment.mobile === 'center' && 'justify-center',
                  textAlignment.desktop === 'center' && 'lg:justify-center',
                  textAlignment.mobile === 'left' && 'justify-start',
                  textAlignment.desktop === 'left' && 'lg:justify-start'
                )}>
                  <Link
                    href={ctaButton.href}
                    target={ctaButton.openInNewTab ? '_blank' : undefined}
                    rel={ctaButton.openInNewTab ? 'noopener noreferrer' : undefined}
                    className={cn(
                      'inline-flex px-12 py-4 bg-white text-lg font-bold rounded-full',
                      'hover:bg-gray-50 transition-all duration-200 text-center'
                    )}
                    style={{
                      color: backgroundColor?.hex || '#2563eb',
                    }}
                  >
                    {ctaButton.text}
                  </Link>
                </div>
              )}
            </div>

            {/* Main Image */}
            {mainImage && mainImage.image && mainImage.image.asset && (
              <div className="relative flex items-center justify-center lg:justify-end">
                <Image
                  src={urlFor(mainImage.image.asset).width(600).height(400).url()}
                  alt={mainImage.alt || 'Banner image'}
                  width={mainImage.width || mainImage.image.asset.metadata?.dimensions?.width || 600}
                  height={mainImage.height || mainImage.image.asset.metadata?.dimensions?.height || 400}
                  className="w-full max-w-lg h-auto object-contain"
                  priority
                />
              </div>
            )}
          </div>

          {/* Decorative Elements Overlay */}
          <div className="absolute inset-0 pointer-events-none">
            {/* You can add decorative elements here similar to the original */}
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-xl" />
            <div className="absolute top-1/4 right-1/4 w-16 h-16 bg-white/10 rounded-full blur-lg" />
          </div>
        </div>
      </div>
    </section>
  );
}
