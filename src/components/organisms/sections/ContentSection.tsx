import Link from "next/link";
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
} from "@heroicons/react/24/outline";
import { RichTextRenderer } from "@/components/atoms/text/RichTextRenderer";
import { urlFor } from "@/sanity/lib/image";
import { cn } from "@/lib/utils/cn";

interface CTAButton {
  text: string;
  href: string;
  variant: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  openInNewTab: boolean;
  icon?: string;
  disabled?: boolean;
}

interface FeatureListItem {
  text: string;
  description?: string;
  icon: string;
  iconColor: "primary" | "success" | "warning" | "error" | "gray";
  highlighted: boolean;
  link?: {
    href: string;
    text: string;
    openInNewTab: boolean;
  };
}

interface ContentSectionProps {
  data: {
    type: "content";
    content: any[]; // Rich text array (Portable Text)
    isContentCenter?: boolean;
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
    backgroundOverlay?: {
      color?: {
        hex: string;
      };
      opacity?: number;
    };
    sectionItems?: FeatureListItem[];
    ctaButtons?: CTAButton[];
    textAlign: "left" | "center" | "right";
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
  none: "py-0",
  small: "py-8",
  medium: "py-12",
  large: "py-16",
  xl: "py-24",
};

const alignmentClasses = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

const buttonVariants = {
  primary: "bg-blue-600 text-white hover:bg-blue-700 border-blue-600",
  secondary: "bg-white text-black hover:bg-gray-100 border-white",
  outline: "bg-transparent text-blue-600 hover:bg-blue-50 border-blue-600",
  ghost: "bg-transparent text-gray-600 hover:bg-gray-50 border-transparent",
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
};

const iconColorClasses = {
  primary: "text-blue-600",
  success: "text-green-600",
  warning: "text-orange-500",
  error: "text-red-500",
  gray: "text-gray-500",
};

export function ContentSection({ data }: ContentSectionProps) {
  const {
    content,
    isContentCenter = false,
    backgroundImage,
    backgroundOverlay,
    sectionItems,
    ctaButtons,
    textAlign,
    backgroundColor,
    padding,
  } = data;

  // Get padding classes
  const topPadding =
    paddingClasses[padding.top as keyof typeof paddingClasses] ||
    paddingClasses.large;
  const bottomPadding =
    paddingClasses[padding.bottom as keyof typeof paddingClasses] ||
    paddingClasses.large;

  // Get alignment classes
  const alignmentClass = alignmentClasses[textAlign] || alignmentClasses.left;

  // Background image styles
  const getBackgroundImageStyles = () => {
    if (!backgroundImage?.image?.asset) return {};

    const imageUrl = urlFor(backgroundImage.image.asset).url();
    const position = backgroundImage.position || "center";
    const size = backgroundImage.size || "cover";
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
      backgroundPosition: positionMap[position] || "center center",
      backgroundSize: size,
      backgroundRepeat: repeat,
      "--bg-opacity": opacity,
    } as React.CSSProperties;
  };

  const backgroundImageStyles = getBackgroundImageStyles();

  if (isContentCenter) {
    return (
      <section
        className={cn(topPadding, bottomPadding, "relative")}
        style={{
          backgroundColor: backgroundColor?.hex || undefined,
          ...backgroundImageStyles,
        }}
      >
        {backgroundOverlay?.color && (
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: backgroundOverlay.color.hex,
              opacity: backgroundOverlay.opacity || 0.5,
            }}
          />
        )}

        <div className="relative max-w-7xl mx-auto px-6 lg:px-24 py-16 md:py-32">
          <div className="text-center">
            <RichTextRenderer
              content={content}
              textWhite={true}
              textCenter={true}
              extraClassName="mb-8"
              className="prose prose-lg max-w-none text-center"
            />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className={cn(topPadding, bottomPadding, "relative")}
      style={{
        backgroundColor: backgroundColor?.hex || undefined,
        ...backgroundImageStyles,
      }}
    >
      {/* Background Overlay */}
      {backgroundOverlay?.color && (
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: backgroundOverlay.color.hex,
            opacity: backgroundOverlay.opacity || 0.5,
          }}
        />
      )}

      <div className="relative max-w-7xl mx-auto px-6 lg:px-24 py-16 md:py-32">
        {/* Two column grid layout for md+ screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Left Column - Rich Text Content */}
          <div className={cn("order-1", alignmentClass)}>
            <RichTextRenderer
              
              content={content}
              extraClassName="text-[48px] md:text-[64px] xl:!text-[92px] text-white leading-none max-md:text-center max-md:whitespace-nowrap"
            />
          </div>

          {/* Right Column - Section Items/Features */}
          <div className="order-2 space-y-16 md:space-y-8 h-full flex flex-col justify-center items-center md:items-start ">
            {sectionItems && sectionItems.length > 0 && (
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8 ">
                {sectionItems.map((item, index) => {
                  const IconComponent =
                    iconComponents[item.icon as keyof typeof iconComponents] ||
                    CheckIcon;
                  const iconColorClass =
                    iconColorClasses[item.iconColor] ||
                    iconColorClasses.primary;

                  return (
                    <div
                      key={index}
                      className={cn(
                        "flex flex-col items-center text-center gap-8 "
                      )}
                    >
                      <div className="flex flex-col gap-8">
                        <h3 className="text-white font-semibold text-[22px]">
                          {item.text}
                        </h3>
                        {item.description && (
                          <p className="text-white/80 text-sm leading-relaxed">
                            {item.description}
                          </p>
                        )}
                        {item.link && item.link.href && (
                          <Link
                            href={item.link.href}
                            target={
                              item.link.openInNewTab ? "_blank" : undefined
                            }
                            rel={
                              item.link.openInNewTab
                                ? "noopener noreferrer"
                                : undefined
                            }
                            className="text-blue-400 hover:text-blue-300 text-sm underline mt-2 inline-block"
                          >
                            {item.link.text}
                          </Link>
                        )}
                      </div>

                      {/* Icon */}
                      <div className="">
                        <IconComponent
                          className={cn("w-8 h-8", iconColorClass)}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {ctaButtons && ctaButtons.length > 0 && (
              <div className="flex flex-col sm:flex-row gap-6 ">
                {ctaButtons.map((button, index) => {
                  if (!button.href) {
                    return null;
                  }

                  return (
                    <Link
                      key={index}
                      href={button.href}
                      target={button.openInNewTab ? "_blank" : undefined}
                      rel={
                        button.openInNewTab ? "noopener noreferrer" : undefined
                      }
                      className={cn(
                        "px-6 py-3 rounded-full transition-all duration-200 font-medium border text-center",
                        buttonVariants[button.variant],
                        button.disabled && "opacity-50 cursor-not-allowed"
                      )}
                    >
                      {button.text}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
