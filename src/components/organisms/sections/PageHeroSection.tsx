import Image from "next/image";
import { RichTextRenderer } from "@/components/atoms/text/RichTextRenderer";
import { InteractiveHeroCards } from "@/components/molecules/cards/InteractiveHeroCards";
import { cn } from "@/lib/utils/cn";
import type { Locale } from "@/lib/i18n/config";
import { getLocalizedRichText } from "@/lib/i18n/utils";

interface PageHeroSectionProps {
  data: {
    type: "pageHero";
    title: any; // Localized rich text object
    description: any; // Localized rich text object
    textAlign: "left" | "center" | "right";
    cards?: Array<{
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
      title: any; // Localized string
      expandedTitle: any; // Localized rich text
      expandedDescription: any; // Localized rich text
      expandedImage: {
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
    }>;
    defaultActiveCard?: number;
    backgroundColor?: {
      hex: string;
    };
    padding: {
      top: string;
      bottom: string;
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

const alignmentClasses = {
  left: "text-left md:text-left",
  center: "text-center md:text-left",
  right: "text-right md:text-left",
};

export function PageHeroSection({ data, locale = "en" }: PageHeroSectionProps) {
  const { title, description, textAlign, cards, backgroundColor, padding, defaultActiveCard } =
    data;

  const topPadding =
    paddingClasses[padding.top as keyof typeof paddingClasses] ||
    paddingClasses.large;
  const bottomPadding =
    paddingClasses[padding.bottom as keyof typeof paddingClasses] ||
    paddingClasses.large;

  const alignmentClass = alignmentClasses[textAlign] || alignmentClasses.center;

  return (
    <section
      className={cn(topPadding, bottomPadding, "relative")}
      style={{
        backgroundColor: backgroundColor?.hex || undefined,
      }}
    >
      <div className="container mx-auto px-6 lg:px-24">
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
        {/* Two column grid layout for md+ screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Left Column - Content */}
          <div className={cn("order-1", alignmentClass)}>
            {/* Hero Title */}
            <RichTextRenderer
              content={getLocalizedRichText(title, locale)}
              className="prose-headings:text-4xl prose-headings:md:text-5xl prose-headings:lg:text-6xl prose-headings:font-bold prose-headings:leading-tight prose-headings:text-[#363849] prose-headings:mb-0"
            />
          </div>

          <div className="order-2">
            <RichTextRenderer
              content={getLocalizedRichText(description, locale)}
              className="prose-p:text-lg prose-p:text-[#4D525E] prose-p:leading-relaxed prose-p:mb-0"
            />
          </div>
        </div>

        {/* Hero Cards */}
        {cards && cards.length > 0 && (
          <InteractiveHeroCards
            cards={cards}
            defaultActiveCard={defaultActiveCard || 0}
            locale={locale}
          />
        )}
      </div>
    </section>
  );
}
