import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { cn } from "@/lib/utils/cn";
import { RichTextRenderer } from "@/components/atoms/text/RichTextRenderer";
import type { Locale } from "@/lib/i18n/config";
import { getLocalizedValue, getLocalizedRichText } from "@/lib/i18n/utils";

interface ProductFeatureSectionData {
  type: 'productFeature';
  image: {
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
  content: any; // Localized rich text object
  layout?: 'imageLeft' | 'contentLeft';
  backgroundColor?: {
    hex: string;
  };
  padding?: {
    top: string;
    bottom: string;
  };
  settings?: {
    maxWidth?: string;
    horizontalPadding?: string;
    gap?: string;
  };
}

interface ProductFeatureSectionProps {
  data: ProductFeatureSectionData;
  locale?: Locale;
}

const paddingClasses = {
  none: "py-0",
  small: "py-8",
  medium: "py-12",
  large: "py-16",
  xl: "py-24",
};

const maxWidthClasses = {
  standard: "max-w-[1200px]",
  wide: "max-w-[1400px]",
  extraWide: "max-w-[1920px]",
  full: "max-w-none",
};

const horizontalPaddingClasses = {
  standard: "px-4 lg:px-6",
  large: "px-4 lg:px-16",
  extraLarge: "px-4 lg:px-[320px]",
};

const gapClasses = {
  small: "gap-12",
  medium: "gap-16",
  large: "gap-12 lg:gap-24",
};

export function ProductFeatureSection({ data, locale = 'en' }: ProductFeatureSectionProps) {
  const {
    image,
    content,
    layout = 'imageLeft',
    backgroundColor,
    padding = { top: 'large', bottom: 'large' },
    settings = {
      maxWidth: 'extraWide',
      horizontalPadding: 'extraLarge',
      gap: 'large'
    }
  } = data;

  const topPadding = paddingClasses[padding.top as keyof typeof paddingClasses] || paddingClasses.large;
  const bottomPadding = paddingClasses[padding.bottom as keyof typeof paddingClasses] || paddingClasses.large;
  const horizontalPaddingClass = horizontalPaddingClasses[settings.horizontalPadding as keyof typeof horizontalPaddingClasses] || horizontalPaddingClasses.extraLarge;
  const gapClass = gapClasses[settings.gap as keyof typeof gapClasses] || gapClasses.large;

  const isImageLeft = layout === 'imageLeft';

  return (
    <section
      className={cn(topPadding, bottomPadding, "relative")}
      style={{
        backgroundColor: backgroundColor?.hex || '#ffffff',
      }}
    >
      <div className={cn("container w-full", "mx-auto",'px-6 md:px-24' )}>
        <div className={cn("flex flex-col-reverse  lg:grid lg:grid-cols-2 items-center", gapClass)}>
          {/* Image */}
          <div className={cn(isImageLeft ? "order-1" : "order-2")}>
            {image && image.image && image.image.asset && (
              <Image
                src={urlFor(image.image.asset).width(1032).height(600).url()}
                alt={getLocalizedValue(image.alt, locale) || "Product feature image"}
                width={image.width || image.image.asset.metadata?.dimensions?.width || 1032}
                height={image.height || image.image.asset.metadata?.dimensions?.height || 600}
                className="w-full h-auto"
                priority={image.priority}
              />
            )}
          </div>

          {/* Content */}
          <div className={cn(isImageLeft ? "order-2" : "order-1")}>
            <div className="text-lg text-[#4D525E] leading-[30px]">
              <RichTextRenderer
                content={getLocalizedRichText(content, locale)}
                className="prose prose-lg max-w-none [&_p]:mb-6 [&_p:last-child]:mb-0 [&_strong]:font-bold [&_strong]:text-inherit"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
