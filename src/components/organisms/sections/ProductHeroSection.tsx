import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { cn } from "@/lib/utils/cn";
import { RichTextRenderer } from "@/components/atoms/text/RichTextRenderer";
import { CTAButton } from "@/components/atoms/ui/CTAButton";
import type { Locale } from "@/lib/i18n/config";
import { getLocalizedValue, getLocalizedRichText } from "@/lib/i18n/utils";

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

interface ProductHeroSectionData {
  type: "productHero";
  pillText?: any; // Localized string
  title: any; // Localized rich text object
  subtitle?: any; // Localized string
  description?: any; // Localized rich text object
  ctaButtons?: CTAButton[];
  heroVideo?: {
    video: {
      asset: {
        _id: string;
        url: string;
        mimeType: string;
        size: number;
        metadata?: {
          dimensions: {
            width: number;
            height: number;
          };
        };
      };
    };
    poster?: {
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
    caption?: any; // Localized string
    width?: number;
    height?: number;
    autoplay?: boolean;
    loop?: boolean;
    muted?: boolean;
    controls?: boolean;
  };
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
    case "sm":
      return "w-16 h-16";
    case "md":
      return "w-24 h-24";
    case "lg":
      return "w-32 h-32";
    case "xl":
      return "w-48 h-48";
    default:
      return "w-24 h-24";
  }
};

export function ProductHeroSection({
  data,
  locale = "en",
}: ProductHeroSectionProps) {
  const {
    pillText,
    title,
    subtitle,
    description,
    ctaButtons,
    heroVideo,
    heroImage,
    backgroundColor,
    backgroundElements,
    settings,
  } = data;

  const backgroundStyle = backgroundColor?.hex
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

      <div className="relative container mx-auto px-6 lg:px-24 pt-20 pb-32">
        <div className="text-center">
          {/* Pill Text */}
          {pillText && (
            <div className="inline-flex items-center px-4 py-2 rounded-full  text-blue-600 text-sm font-medium mb-6">
              {getLocalizedValue(pillText, locale)}
            </div>
          )}

          {/* Title */}
          <div className="max-w-[1280px] mx-auto mb-8">
            <RichTextRenderer
              content={getLocalizedRichText(title, locale)}
              className="prose-headings:text-4xl prose-headings:sm:text-5xl prose-headings:lg:text-6xl prose-headings:font-bold prose-headings:leading-tight prose-headings:text-gray-900 prose-headings:mb-0"
            />
          </div>

          {/* Subtitle */}
          {subtitle && (
            <div className="max-w-[1280px] mx-auto mb-6">
              <p className="text-lg text-[#4D525E] leading-normal">
                {getLocalizedValue(subtitle, locale)}
              </p>
            </div>
          )}

          {/* Description */}
          {description && (
            <div className="max-w-[1280px] mx-auto mb-8">
              <RichTextRenderer
                content={getLocalizedRichText(description, locale)}
                className="prose prose-lg prose-gray max-w-none text-[#4D525E]"
              />
            </div>
          )}

          {/* CTA Buttons */}
          {ctaButtons && ctaButtons.length > 0 && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              {ctaButtons.map((button, index) => (
                <CTAButton
                  key={index}
                  text={button.text}
                  href={button.href}
                  variant={button.variant}
                  size="lg"
                  openInNewTab={button.openInNewTab}
                  icon={button.icon}
                  disabled={button.disabled}
                  locale={locale}
                  className="max-sm:w-full min-w-[140px]"
                />
              ))}
            </div>
          )}

          {/* Hero Video or Image */}
          {heroVideo && heroVideo?.video && heroVideo?.video?.asset ? (
            <div className="container mx-auto w-full">
              <div className="relative">
                <video
                  src={heroVideo.video.asset.url}
                  poster={
                    heroVideo.poster?.asset?.url
                      ? urlFor(heroVideo.poster.asset)
                          .width(2304)
                          .height(1440)
                          .url()
                      : undefined
                  }
                  width={
                    heroVideo.width ||
                    heroVideo.video.asset.metadata?.dimensions?.width ||
                    2304
                  }
                  height={
                    heroVideo.height ||
                    heroVideo.video.asset.metadata?.dimensions?.height ||
                    1440
                  }
                  className="w-full h-auto rounded-2xl"
                  autoPlay={heroVideo.autoplay}
                  loop={heroVideo.loop}
                  muted={heroVideo.muted}
                  controls={heroVideo.controls}
                  playsInline
                  aria-label={
                    getLocalizedValue(heroVideo.alt, locale) ||
                    "Product hero video"
                  }
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          ) : heroImage && heroImage?.image && heroImage?.image?.asset ? (
            <div className="container mx-auto w-full">
              <div className="relative">
                <Image
                  src={urlFor(heroImage.image.asset)
                    .width(2304)
                    .height(1440)
                    .url()}
                  alt={
                    getLocalizedValue(heroImage.alt, locale) ||
                    "Product hero image"
                  }
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
          ) : null}
        </div>
      </div>
    </section>
  );
}
