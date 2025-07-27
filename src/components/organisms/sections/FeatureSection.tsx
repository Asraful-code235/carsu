import Image from "next/image";
import Link from "next/link";
import {
  CheckIcon,
  StarIcon,
  ArrowRightIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { RichTextRenderer } from "@/components/atoms/text/RichTextRenderer";
import { Badge } from "@/components/atoms/ui/Badge";
import { urlFor } from "@/sanity/lib/image";
import { cn } from "@/lib/utils/cn";
import type { Locale } from "@/lib/i18n/config";
import { getLocalizedValue, getLocalizedRichText, getLocalizedHref } from "@/lib/i18n/utils";

interface FeatureSectionProps {
  data: {
    type: "feature";
    layout: "contentLeft" | "contentRight";
    badge?: {
      text: any; // Localized string
      color:
        | "primary"
        | "success"
        | "warning"
        | "error"
        | "info"
        | "purple"
        | "pink"
        | "indigo"
        | "gray"
        | "custom";
      customColor?: {
        hex: string;
      };
      variant: "filled" | "outline" | "soft";
      size: "sm" | "md" | "lg";
    };
    title: any; // Localized rich text object
    subtitle?: any; // Localized string
    description?: any; // Localized rich text object
    features?: Array<{
      text: any; // Localized string
      icon: "check" | "star" | "arrowRight" | "plus";
    }>;
    subdescription?: any; // Localized rich text object
    ctaButtons?: Array<{
      text: any; // Localized string
      href: string;
      variant: "primary" | "secondary" | "outline" | "ghost";
      openInNewTab: boolean;
    }>;
    image?: {
      image?: {
        asset?: {
          _id: string;
          url: string;
          metadata?: {
            dimensions: {
              width: number;
              height: number;
            };
          };
        } | null;
      } | null;
      alt?: any; // Localized string
      caption?: string;
      width?: number;
      height?: number;
      priority?: boolean;
    } | null;
    backgroundColor?: {
      hex: string;
    };
    padding: {
      top: string;
      bottom: string;
    };
    settings?: {
      fullWidth?: boolean;
      centerContent?: boolean;
      imageAspectRatio?: string;
      textAlignment?: {
        desktop: "left" | "center" | "right";
        mobile: "left" | "center" | "right";
      };
    };
  };
  locale?: Locale;
}

const paddingClasses = {
  none: "py-0",
  small: "py-8",
  medium: "py-12",
  large: "py-16",
  xl: "py-24",
};

const buttonVariants = {
  primary: "bg-blue-600 text-white hover:bg-blue-700 border-blue-600",
  secondary: "bg-gray-600 text-white hover:bg-gray-700 border-gray-600",
  outline: "bg-transparent text-blue-600 hover:bg-blue-50 border-blue-600",
  ghost: "bg-transparent text-gray-600 hover:bg-gray-50 border-transparent",
};

const iconComponents = {
  check: CheckIcon,
  star: StarIcon,
  arrowRight: ArrowRightIcon,
  plus: PlusIcon,
};

export function FeatureSection({ data, locale = 'en' }: FeatureSectionProps) {
  const {
    layout,
    badge,
    title,
    subtitle,
    description,
    features,
    subdescription,
    ctaButtons,
    image,
    backgroundColor,
    padding,
    settings,
  } = data;

  const topPadding = paddingClasses[padding.top as keyof typeof paddingClasses];
  const bottomPadding =
    paddingClasses[padding.bottom as keyof typeof paddingClasses];

  const isContentLeft = layout === "contentLeft";

  // Text alignment classes
  const desktopAlignment = settings?.textAlignment?.desktop || "left";
  const mobileAlignment = settings?.textAlignment?.mobile || "center";

  const getAlignmentClasses = () => {
    const desktop =
      desktopAlignment === "center"
        ? "md:text-center"
        : desktopAlignment === "right"
          ? "md:text-right"
          : "md:text-left";
    const mobile =
      mobileAlignment === "center"
        ? "text-center"
        : mobileAlignment === "right"
          ? "text-right"
          : "text-left";
    return `${mobile} ${desktop}`;
  };

  const alignmentClasses = getAlignmentClasses();

  const ContentSection = () => (
    <div className="flex flex-col justify-center w-full">
      {/* Title */}
      <div className={alignmentClasses}>
        <RichTextRenderer content={getLocalizedRichText(title, locale)} className="mb-4" />
      </div>

      {/* Badge */}
      {badge && (
        <div className={cn("mb-4", alignmentClasses)}>
          <Badge
            text={badge.text}
            color={badge.color}
            customColor={badge.customColor?.hex}
            variant={badge.variant}
            size={badge.size}
            locale={locale}
          />
        </div>
      )}

      {/* Subtitle */}
      {subtitle && (
        <p className={cn("text-lg text-[#4D525E] mb-6", alignmentClasses)}>
          {getLocalizedValue(subtitle, locale)}
        </p>
      )}

      {/* Description */}
      {description && (
        <div className={cn("mb-6", alignmentClasses)}>
          <RichTextRenderer content={getLocalizedRichText(description, locale)} />
        </div>
      )}

      {/* Features List */}
      {features && features.length > 0 && (
        <ul className={cn("space-y-3 mb-8", alignmentClasses)}>
          {features.map((feature, index) => {
            const IconComponent = iconComponents[feature.icon];
            return (
              <li key={index} className="flex items-center">
                <IconComponent className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
                <span className="text-gray-700">{getLocalizedValue(feature.text, locale)}</span>
              </li>
            );
          })}
        </ul>
      )}

      {/* Sub Description */}
      {subdescription && (
        <div className={cn("mb-6", alignmentClasses)}>
          <RichTextRenderer content={getLocalizedRichText(subdescription, locale)} />
        </div>
      )}

      {/* CTA Buttons */}
      {ctaButtons && ctaButtons.length > 0 && (
        <div
          className={cn(
            "flex flex-col w-full sm:flex-row gap-4",
            alignmentClasses
          )}
        >
          {ctaButtons.map((button, index) => {
            // Skip buttons with null/undefined href
            if (!button.href) {
              return null;
            }

            return (
              <Link
                key={index}
                href={getLocalizedHref(button.href, locale)}
                target={button.openInNewTab ? "_blank" : undefined}
                rel={button.openInNewTab ? "noopener noreferrer" : undefined}
                className={cn(
                  "inline-flex max-sm:w-full !text-center max-sm:text-center items-center justify-center px-6 py-3 border rounded-full font-medium transition-colors",
                  buttonVariants[button.variant]
                )}
              >
                {getLocalizedValue(button.text, locale)}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );

  const ImageSection = () => {
    // Don't render anything if image or image.image.asset is null
    if (!image || !image.image || !image.image.asset) {
      return null;
    }

    return (
      <div className="relative">
        <Image
          src={urlFor(image.image.asset).url()}
          alt={image.alt ? getLocalizedValue(image.alt, locale) : "Feature image"}
          width={
            image.width || image.image.asset.metadata?.dimensions?.width || 600
          }
          height={
            image.height ||
            image.image.asset.metadata?.dimensions?.height ||
            400
          }
          className=" object-contain w-full h-auto "
          priority={image.priority}
        />
        {image.caption && (
          <p className="text-sm text-gray-600 mt-2 text-center">
            {image.caption}
          </p>
        )}
      </div>
    );
  };

  return (
    <section
      className={cn(topPadding, bottomPadding)}
      style={{
        backgroundColor: backgroundColor?.hex || undefined,
      }}
    >
      <div className="container mx-auto px-6 lg:px-24">
        {/* If no image, use single column layout */}
        {!image || !image.image || !image.image.asset ? (
          <div className="max-w-4xl mx-auto">
            <ContentSection />
          </div>
        ) : (
          <div
            className={cn(
              "grid grid-cols-1 md:grid-cols-2 gap-12 items-center",
              isContentLeft
                ? "max-md:flex max-md:flex-col"
                : "max-md:flex max-md:flex-col-reverse"
            )}
          >
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
        )}
      </div>
    </section>
  );
}
