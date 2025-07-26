"use client";

import { useState } from "react";
import {
  CheckIcon,
  StarIcon,
  ArrowRightIcon,
  PlusIcon,
  HeartIcon,
  ShieldCheckIcon,
  BoltIcon,
  GlobeAltIcon,
  CogIcon,
  UserIcon,
  ChatBubbleLeftRightIcon,
  CircleStackIcon,
  BookOpenIcon,
  PhoneIcon,
  EnvelopeIcon,
  CloudIcon,
} from "@heroicons/react/24/outline";
import { RichTextRenderer } from "@/components/atoms/text/RichTextRenderer";
import { urlFor } from "@/sanity/lib/image";
import { cn } from "@/lib/utils/cn";
import type { Locale } from "@/lib/i18n/config";
import { getLocalizedRichText } from "@/lib/i18n/utils";

interface ServicesSectionProps {
  data: {
    type: "services";
    title: any; // Localized rich text object
    description?: any; // Localized rich text object
    services: Array<{
      title: string;
      description: string;
      icon: string;
    }>;
    backgroundColor?: {
      hex: string;
    };
    backgroundImage?: {
      image?: {
        asset?: {
          _id: string;
          url: string;
        };
      };
      alt?: string;
      position?: string;
      size?: string;
      opacity?: number;
      repeat?: string;
    };
    padding: {
      top: string;
      bottom: string;
    };
    settings?: {
      layout: "grid-2" | "grid-3" | "grid-4" | "list";
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

const iconComponents = {
  check: CheckIcon,
  star: StarIcon,
  arrowRight: ArrowRightIcon,
  plus: PlusIcon,
  heart: HeartIcon,
  shield: ShieldCheckIcon,
  lightning: BoltIcon,
  globe: GlobeAltIcon,
  cog: CogIcon,
  user: UserIcon,
  chat: ChatBubbleLeftRightIcon,
  database: CircleStackIcon,
  book: BookOpenIcon,
  settings: CogIcon,
  cloud: CloudIcon,
  phone: PhoneIcon,
  email: EnvelopeIcon,
};

export function ServicesSection({ data, locale = 'en' }: ServicesSectionProps) {
  const {
    title,
    description,
    services,
    backgroundColor,
    backgroundImage,
    padding,
    settings,
  } = data;

  // State for active service (first one is active by default)
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);

  const topPadding = paddingClasses[padding.top as keyof typeof paddingClasses];
  const bottomPadding =
    paddingClasses[padding.bottom as keyof typeof paddingClasses];

  // Text alignment classes
  const desktopAlignment = settings?.textAlignment?.desktop || "center";
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

  // Background image styles
  const getBackgroundImageStyles = () => {
    if (!backgroundImage?.image?.asset) return {};

    const imageUrl = urlFor(backgroundImage.image.asset).url();
    const position = backgroundImage.position || "bottom-center";
    const size = backgroundImage.size || "auto";
    const opacity = backgroundImage.opacity ?? 1;
    const repeat = backgroundImage.repeat || "no-repeat";

    // Convert position to CSS background-position
    const positionMap: Record<string, string> = {
      "top-left": "top left",
      "top-center": "top center",
      "top-right": "top right",
      "center-left": "center left",
      center: "center center",
      "center-right": "center right",
      "bottom-left": "bottom left",
      "bottom-center": "bottom center",
      "bottom-right": "bottom right",
    };

    return {
      backgroundImage: `url(${imageUrl})`,
      backgroundPosition: positionMap[position] || "bottom center",
      backgroundSize: size,
      backgroundRepeat: repeat,
      "--bg-opacity": opacity,
    } as React.CSSProperties;
  };

  const backgroundImageStyles = getBackgroundImageStyles();

  return (
    <section
      className={cn(topPadding, bottomPadding, "relative")}
      style={{
        backgroundColor: backgroundColor?.hex || undefined,
        ...backgroundImageStyles,
      }}
    >
      <div className="container mx-auto px-6 lg:px-24">
        {/* Header */}
        <div className={cn("mb-16", alignmentClasses)}>
          {/* Title */}
          <div className="mb-6">
            <RichTextRenderer content={getLocalizedRichText(title, locale)} />
          </div>

          {/* Description */}
          {description && (
            <div className="max-w-3xl mx-auto">
              <RichTextRenderer content={getLocalizedRichText(description, locale)} />
            </div>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-6 md:gap-8 justify-center items-stretch">
          {services.map((service, index) => {
            const IconComponent =
              iconComponents[service.icon as keyof typeof iconComponents] ||
              CogIcon;
            const isActive = activeServiceIndex === index;

            return (
              <div
                key={index}
                onClick={() => setActiveServiceIndex(index)}
                className={cn(
                  "rounded-[20px] p-6 md:p-8 cursor-pointer transition-all duration-500 ease-in-out md:h-[477.781px]",
                  "flex flex-col items-center justify-start",
                  "w-full md:w-auto",
                  isActive
                    ? "bg-white/50 shadow-[10px_31px_51px_0_rgba(26,102,216,0.24)] md:flex-[2] md:min-w-[300px]"
                    : "bg-white/50 md:flex-[1] md:min-w-[200px] md:max-w-[250px] justify-center"
                )}
              >
                {/* Icon */}
                <div
                  className={cn(
                    " rounded-xl flex  w-full items-center justify-center ",
                    isActive ? "hidden" : "mb-6"
                  )}
                >
                  <IconComponent
                    className={cn("text-blue-600 w-[90px] h-[90px]")}
                  />
                </div>

                {/* Content */}
                <div className={cn("text-center flex items-center justify-center  flex-col gap-4",isActive ? "h-full":"")}>
                  <h3
                    className={cn(
                      "font-bold text-gray-900",
                      isActive ? "text-[44px]" : "text-2xl "
                    )}
                  >
                    {service.title}
                  </h3>

                  {isActive && (
                    <p className="text-[#4D525E] leading-[28px] text-lg max-w-[340.596px] mx-auto w-full">
                      {service.description}
                    </p>
                  )}

                  <div
                    className={cn(
                      " rounded-xl flex items-center justify-center mb-6 w-full",
                      isActive ? "w-16 h-16" : "hidden"
                    )}
                  >
                    <IconComponent
                      className={cn(
                        "text-blue-600",
                        isActive ? "w-[120px] h-[120px]" : "hidden"
                      )}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
