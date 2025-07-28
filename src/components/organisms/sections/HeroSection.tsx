import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { cn } from "@/lib/utils/cn";
import { RichTextRenderer } from "@/components/atoms/text/RichTextRenderer";
import type { Locale } from "@/lib/i18n/config";
import {
  getLocalizedValue,
  getLocalizedRichText,
  getLocalizedHref,
} from "@/lib/i18n/utils";

interface CTAButton {
  text: any; // Localized string
  href: string;
  variant: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
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
  size: "sm" | "md" | "lg" | "xl";
  opacity: number;
  rotation: number;
  zIndex?: number;
}

interface HeroSectionData {
  type: "hero";
  heading: any; // Localized rich text object
  subtitle: any; // Localized string
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
    alt: any; // Localized string
    caption?: any; // Localized string
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

interface HeroSectionProps {
  data: HeroSectionData;
  locale?: Locale;
}

export function HeroSection({ data, locale = "en" }: HeroSectionProps) {
  const {
    heading,
    subtitle,
    ctaButtons,
    heroImage,
    backgroundElements,
    backgroundColor,
    settings,
  } = data;

  const getSizeClass = (size: string) => {
    const sizeMap = {
      sm: "w-32 h-32",
      md: "w-56 h-56",
      lg: "w-80 h-80",
    };
    return sizeMap[size as keyof typeof sizeMap] || "w-56 h-56";
  };

  // Generate background style
  const backgroundStyle = backgroundColor
    ? { backgroundColor: backgroundColor.hex }
    : {};

  return (
    <section
      className={cn(
        "relative overflow-hidden",
        settings?.fullHeight ? "lg:min-h-screen" : "lg:min-h-[90vh]",
        !backgroundColor && "bg-gradient-to-b from-blue-50/50 to-transparent"
      )}
      style={backgroundStyle}
    >
      <Image
        src={"/icon 2.svg"}
        alt="icon 2"
        width={100}
        loading="lazy"
        height={100}
        className="absolute top-44 left-0 h-auto object-contain w-[88px] "
      />

      <Image
        src={"/icon3.svg"}
        alt="icon 2"
        width={100}
        height={100}
        className="absolute top-[40%] right-44 h-auto object-contain w-[465.83px] "
      />

      <Image
        src={"/icon 4.svg"}
        alt="icon 2"
        width={100}
        height={100}
        className="absolute top-[40%] left-44 h-auto object-contain w-[57.65px] "
      />

      {/* Background decorative elements */}
      {backgroundElements && backgroundElements.length > 0 && (
        <div className="absolute inset-0 overflow-hidden">
          {backgroundElements.map((element, index) => {
            // Skip elements with null/undefined image assets
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

      <div className="relative container mx-auto px-6 lg:px-24 pt-20 pb-32">
        <div className="text-center">
          <div className="max-w-4xl mx-auto mb-8">
            <div className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              <RichTextRenderer
                content={getLocalizedRichText(heading, locale)}
                className="prose-headings:text-4xl prose-headings:sm:text-5xl prose-headings:lg:text-6xl prose-headings:font-bold prose-headings:leading-tight prose-headings:text-gray-900 prose-headings:mb-0"
              />
            </div>
          </div>

          {/* Subtitle */}
          <div className="max-w-2xl mx-auto mb-8">
            <p className="text-lg text-[#4D525E] leading-normal">
              {getLocalizedValue(subtitle, locale)}
            </p>
          </div>

          {/* CTA Buttons */}
          {ctaButtons && ctaButtons.length > 0 && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              {ctaButtons.map((button, index) => {
                // Skip buttons with null/undefined href
                if (!button.href) {
                  return null;
                }

                return (
                  <Link
                    key={index}
                    href={getLocalizedHref(button.href, locale)}
                    className={cn(
                      "px-8 py-4 rounded-full transition-all duration-200 text-lg font-medium max-sm:w-full min-w-[140px]",
                      button.variant === "primary"
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                    )}
                  >
                    {getLocalizedValue(button.text, locale)}
                  </Link>
                );
              })}
            </div>
          )}

          {/* Hero Image */}
          {heroImage && heroImage.image && heroImage.image.asset && (
            <div className="container mx-auto w-full ">
              <div className="relative">
                <Image
                  src={urlFor(heroImage.image.asset)
                    .width(2304)
                    .height(1440)
                    .url()}
                  alt={getLocalizedValue(heroImage.alt, locale) || "Hero image"}
                  width={
                    heroImage.width ||
                    heroImage.image.asset.metadata?.dimensions?.width ||
                    2304
                  }
                  height={
                    heroImage.height ||
                    heroImage.image.asset.metadata?.dimensions?.height ||
                    1440
                  }
                  className="w-full h-auto rounded-2xl"
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
