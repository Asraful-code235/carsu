import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { cn } from "@/lib/utils/cn";
import { RichTextRenderer } from "@/components/atoms/text/RichTextRenderer";
import type { Locale } from "@/lib/i18n/config";
import { getLocalizedValue, getLocalizedRichText, getLocalizedHref } from "@/lib/i18n/utils";

interface CTAButton {
  text: any; // Localized string
  href: string;
  variant: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  openInNewTab: boolean;
  icon?: string;
  disabled?: boolean;
}

interface BackgroundElement {
  image: {
    asset: {
      _id: string;
      url: string;
    };
  };
  position: {
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
  };
  size: 'sm' | 'md' | 'lg' | 'xl';
  opacity: number;
  rotation: number;
  zIndex?: number;
}

interface ProductHeroSectionData {
  type: 'productHero';
  pillText?: any; // Localized string
  title: any; // Localized rich text object
  subtitle?: any; // Localized string
  description?: any; // Localized rich text object
  ctaButtons?: CTAButton[];
  heroImage: {
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
    caption?: string;
    width?: number;
    height?: number;
    priority?: boolean;
  };
  backgroundColor?: {
    hex: string;
  };
  backgroundElements?: BackgroundElement[];
  settings?: {
    fullHeight?: boolean;
    centerContent?: boolean;
    showScrollIndicator?: boolean;
    parallaxEffect?: boolean;
  };
}

interface ProductHeroSectionProps {
  data: ProductHeroSectionData;
  locale?: Locale;
}

const getSizeClass = (size: string) => {
  switch (size) {
    case 'sm': return 'w-16 h-16';
    case 'md': return 'w-24 h-24';
    case 'lg': return 'w-32 h-32';
    case 'xl': return 'w-48 h-48';
    default: return 'w-24 h-24';
  }
};

export function ProductHeroSection({ data, locale = 'en' }: ProductHeroSectionProps) {
  const {
    pillText,
    title,
    subtitle,
    description,
    ctaButtons,
    heroImage,
    backgroundColor,
    backgroundElements,
    settings
  } = data;

  const backgroundStyle = backgroundColor?.hex 
    ? { backgroundColor: backgroundColor.hex }
    : {};

  return (
    <section
      className={cn(
        "relative overflow-hidden",
        settings?.fullHeight ? "min-h-screen" : "py-16 lg:py-24",
        !backgroundColor && "bg-gradient-to-b from-blue-50/30 to-transparent"
      )}
      style={backgroundStyle}
    >
      {/* Background decorative elements */}
      {backgroundElements && backgroundElements.length > 0 && (
        <div className="absolute inset-0 overflow-hidden">
          {backgroundElements.map((element, index) => {
            if (!element.image?.asset) {
              return null;
            }

            return (
              <div
                key={index}
                className="absolute"
                style={{
                  top: element.position?.top,
                  left: element.position?.left,
                  right: element.position?.right,
                  bottom: element.position?.bottom,
                  opacity: element.opacity || 1,
                  transform: `rotate(${element.rotation || 0}deg)`,
                  zIndex: element.zIndex || -1,
                }}
              >
                <Image
                  src={urlFor(element.image.asset).width(320).height(320).url()}
                  alt=""
                  width={320}
                  height={320}
                  className={cn("object-contain", getSizeClass(element.size))}
                />
              </div>
            );
          })}
        </div>
      )}

      <div className="relative container mx-auto px-6 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <div className="text-center lg:text-left">
            {/* Pill Text */}
            {pillText && (
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-600 text-sm font-medium mb-6">
                {getLocalizedValue(pillText, locale)}
              </div>
            )}

            {/* Title */}
            <div className="mb-6">
              <RichTextRenderer
                content={getLocalizedRichText(title, locale)}
                className="prose-headings:text-4xl prose-headings:md:text-5xl prose-headings:lg:text-6xl prose-headings:font-bold prose-headings:leading-tight prose-headings:text-gray-900 prose-headings:mb-0"
              />
            </div>

            {/* Subtitle */}
            {subtitle && (
              <div className="mb-6">
                <p className="text-xl text-gray-600 leading-relaxed">
                  {getLocalizedValue(subtitle, locale)}
                </p>
              </div>
            )}

            {/* Description */}
            {description && (
              <div className="mb-8">
                <RichTextRenderer
                  content={getLocalizedRichText(description, locale)}
                  className="prose prose-lg prose-gray max-w-none text-gray-600"
                />
              </div>
            )}

            {/* CTA Buttons */}
            {ctaButtons && ctaButtons.length > 0 && (
              <div className="flex flex-col sm:flex-row items-center lg:items-start lg:justify-start justify-center gap-4">
                {ctaButtons.map((button, index) => {
                  if (!button.href) {
                    return null;
                  }

                  return (
                    <Link
                      key={index}
                      href={getLocalizedHref(button.href, locale)}
                      className={cn(
                        "px-8 py-4 rounded-full transition-all duration-200 text-lg font-medium max-sm:w-full min-w-[140px] text-center",
                        button.variant === 'primary'
                          ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl"
                          : button.variant === 'secondary'
                          ? "bg-gray-100 text-gray-900 hover:bg-gray-200"
                          : "border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                      )}
                      target={button.openInNewTab ? "_blank" : undefined}
                      rel={button.openInNewTab ? "noopener noreferrer" : undefined}
                    >
                      {getLocalizedValue(button.text, locale)}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Column - Hero Image */}
          {heroImage && heroImage.image && heroImage.image.asset && (
            <div className="relative">
              <div className="relative">
                <Image
                  src={urlFor(heroImage.image.asset).width(1200).height(800).url()}
                  alt={getLocalizedValue(heroImage.alt, locale) || "Product hero image"}
                  width={heroImage.width || heroImage.image.asset.metadata?.dimensions?.width || 1200}
                  height={heroImage.height || heroImage.image.asset.metadata?.dimensions?.height || 800}
                  className="w-full h-auto rounded-2xl shadow-2xl"
                  priority={heroImage.priority}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
