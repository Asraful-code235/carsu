import Link from "next/link";
import { CheckIcon, StarIcon, ArrowRightIcon, PlusIcon, HeartIcon, ShieldCheckIcon, BoltIcon, GlobeAltIcon, CogIcon, UserIcon } from "@heroicons/react/24/outline";
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
  secondary: "bg-gray-600 text-white hover:bg-gray-700 border-gray-600",
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
    backgroundImage,
    backgroundOverlay,
    sectionItems,
    ctaButtons,
    textAlign,
    backgroundColor,
    padding,
  } = data;

  // Get padding classes
  const topPadding = paddingClasses[padding.top as keyof typeof paddingClasses] || paddingClasses.large;
  const bottomPadding = paddingClasses[padding.bottom as keyof typeof paddingClasses] || paddingClasses.large;

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

      <div className="relative max-w-7xl mx-auto px-6 lg:px-24">
        <div className={cn("max-w-4xl", alignmentClass, {
          "mx-auto": textAlign === "center",
          "ml-0": textAlign === "left",
          "mr-0": textAlign === "right",
        })}>
          {/* Main Content */}
          <div className="mb-8">
            <RichTextRenderer
              content={content}
              className="prose-p:text-lg prose-p:text-[#4D525E] prose-p:leading-relaxed"
            />
          </div>

          {/* Section Items/Features */}
          {sectionItems && sectionItems.length > 0 && (
            <div className="mb-8">
              <ul className={cn("space-y-4", alignmentClass)}>
                {sectionItems.map((item, index) => {
                  const IconComponent = iconComponents[item.icon as keyof typeof iconComponents] || CheckIcon;
                  const iconColorClass = iconColorClasses[item.iconColor] || iconColorClasses.primary;
                  
                  return (
                    <li
                      key={index}
                      className={cn(
                        "flex items-start",
                        item.highlighted && "bg-blue-50 p-4 rounded-lg",
                        textAlign === "center" && "justify-center",
                        textAlign === "right" && "justify-end"
                      )}
                    >
                      <IconComponent className={cn("w-5 h-5 mr-3 flex-shrink-0 mt-0.5", iconColorClass)} />
                      <div className="flex-1">
                        <span className="text-gray-900 font-medium">{item.text}</span>
                        {item.description && (
                          <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                        )}
                        {item.link && (
                          <Link
                            href={item.link.href}
                            target={item.link.openInNewTab ? "_blank" : undefined}
                            rel={item.link.openInNewTab ? "noopener noreferrer" : undefined}
                            className="text-blue-600 hover:text-blue-800 text-sm underline mt-1 inline-block"
                          >
                            {item.link.text}
                          </Link>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {/* CTA Buttons */}
          {ctaButtons && ctaButtons.length > 0 && (
            <div className={cn("flex flex-wrap gap-4", {
              "justify-center": textAlign === "center",
              "justify-start": textAlign === "left",
              "justify-end": textAlign === "right",
            })}>
              {ctaButtons.map((button, index) => (
                <Link
                  key={index}
                  href={button.href}
                  target={button.openInNewTab ? "_blank" : undefined}
                  rel={button.openInNewTab ? "noopener noreferrer" : undefined}
                  className={cn(
                    "px-6 py-3 rounded-full transition-all duration-200 font-medium border",
                    buttonVariants[button.variant],
                    button.disabled && "opacity-50 cursor-not-allowed"
                  )}
                >
                  {button.text}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
