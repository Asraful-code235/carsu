'use client';

import { useState } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { cn } from "@/lib/utils/cn";
import { RichTextRenderer } from "@/components/atoms/text/RichTextRenderer";
import type { Locale } from "@/lib/i18n/config";
import { getLocalizedValue, getLocalizedRichText } from "@/lib/i18n/utils";

interface InteractiveItem {
  title: any; // Localized string
  content: any; // Localized rich text
  image?: {
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
}

interface ProductInteractiveSectionData {
  type: 'productInteractive';
  title: any; // Localized rich text
  items: InteractiveItem[];
  backgroundColor?: {
    hex: string;
  };
  padding?: {
    top: string;
    bottom: string;
  };
  settings?: {
    defaultActiveItem?: number;
    animationDuration?: string;
  };
}

interface ProductInteractiveSectionProps {
  data: ProductInteractiveSectionData;
  locale?: Locale;
}

const paddingClasses = {
  none: "py-0",
  small: "py-8",
  medium: "py-12",
  large: "py-16",
  xl: "py-24",
};

const animationClasses = {
  fast: "transition-all duration-200 ease-in-out",
  normal: "transition-all duration-300 ease-in-out",
  slow: "transition-all duration-500 ease-in-out",
};

export function ProductInteractiveSection({ data, locale = 'en' }: ProductInteractiveSectionProps) {
  const {
    title,
    items,
    backgroundColor,
    padding = { top: 'large', bottom: 'large' },
    settings = {
      defaultActiveItem: 0,
      animationDuration: 'normal'
    }
  } = data;

  const [activeIndex, setActiveIndex] = useState(settings.defaultActiveItem || 0);

  const topPadding = paddingClasses[padding.top as keyof typeof paddingClasses] || paddingClasses.large;
  const bottomPadding = paddingClasses[padding.bottom as keyof typeof paddingClasses] || paddingClasses.large;
  const animationClass = animationClasses[settings.animationDuration as keyof typeof animationClasses] || animationClasses.normal;

  const activeItem = items[activeIndex];

  return (
    <section
      className={cn(topPadding, bottomPadding, "relative")}
      style={{
        backgroundColor: backgroundColor?.hex || '#ffffff',
      }}
    >
      <div className="container mx-auto w-full px-6 lg:px-24">
        {/* Section Title */}
        <div className="mb-12 lg:mb-16">
          <RichTextRenderer
            content={getLocalizedRichText(title, locale)}
            className="prose prose-xl max-w-none text-center [&_h1]:text-4xl [&_h1]:md:text-5xl [&_h1]:font-bold [&_h1]:text-[#363849] [&_h2]:text-3xl [&_h2]:md:text-4xl [&_h2]:font-bold [&_h2]:text-[#363849]"
          />
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-16">
          {/* Left Side - Interactive Menu */}
          <div className="space-y-0">
            {items.map((item, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "w-full text-left p-6 border-l-4 relative group",
                  animationClass,
                  activeIndex === index
                    ? "lg:border-l-blue-500 "
                    : "lg:border-l-gray-50 lg:hover:border-l-blue-300 "
                )}
              >
                <h3 className={cn(
                  "text-lg font-medium leading-relaxed",
                  animationClass,
                  activeIndex === index
                    ? "text-gray-900 font-semibold"
                    : "text-gray-700 group-hover:text-blue-700"
                )}>
                  {getLocalizedValue(item.title, locale)}
                </h3>
              </button>
            ))}
          </div>

          {/* Right Side - Content */}
          <div className={cn("relative", animationClass)}>
            {activeItem && (
              <div className="space-y-6">
                {/* Image */}
                {activeItem.image && activeItem.image.image && activeItem.image.image.asset && (
                  <div className="mb-6">
                    <Image
                      src={urlFor(activeItem.image.image.asset).width(600).height(400).url()}
                      alt={getLocalizedValue(activeItem.image.alt, locale) || "Interactive content image"}
                      width={activeItem.image.width || activeItem.image.image.asset.metadata?.dimensions?.width || 600}
                      height={activeItem.image.height || activeItem.image.image.asset.metadata?.dimensions?.height || 400}
                      className="w-full h-auto "
                      priority={activeItem.image.priority}
                    />
                  </div>
                )}

                {/* Content */}
                <div className="prose prose-lg max-w-none">
                  <RichTextRenderer
                    content={getLocalizedRichText(activeItem.content, locale)}
                    className="[&_p]:text-[#4D525E] [&_p]:leading-relaxed [&_strong]:font-bold [&_strong]:text-inherit"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden space-y-8">
          {items.map((item, index) => (
            <div key={index} className="space-y-4">
              {/* Title */}
              <h3 className="text-xl font-medium text-gray-900  pl-4">
                {getLocalizedValue(item.title, locale)}
              </h3>

              {/* Image */}
              {item.image && item.image.image && item.image.image.asset && (
                <div className="mb-4">
                  <Image
                    src={urlFor(item.image.image.asset).width(600).height(400).url()}
                    alt={getLocalizedValue(item.image.alt, locale) || "Interactive content image"}
                    width={item.image.width || item.image.image.asset.metadata?.dimensions?.width || 600}
                    height={item.image.height || item.image.image.asset.metadata?.dimensions?.height || 400}
                    className="w-full h-auto rounded-lg shadow-lg"
                    priority={item.image.priority}
                  />
                </div>
              )}

              {/* Content */}
              <div className="prose max-w-none">
                <RichTextRenderer
                  content={getLocalizedRichText(item.content, locale)}
                  className="[&_p]:text-[#4D525E] [&_p]:leading-relaxed [&_strong]:font-bold [&_strong]:text-inherit"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
