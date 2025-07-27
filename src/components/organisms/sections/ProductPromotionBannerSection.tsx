import { urlFor } from "@/sanity/lib/image";
import { cn } from "@/lib/utils/cn";
import { RichTextRenderer } from "@/components/atoms/text/RichTextRenderer";
import { CTAButton } from "@/components/atoms/ui/CTAButton";
import { Badge } from "@/components/atoms/ui/Badge";
import type { Locale } from "@/lib/i18n/config";
import { getLocalizedRichText } from "@/lib/i18n/utils";

interface CTAButtonData {
  text: any; // Localized string
  href: any; // Localized string
  variant?: string;
  size?: string;
  icon?: string;
  iconPosition?: "left" | "right";
  openInNewTab?: boolean;
}

interface ProductPromotionBannerSectionData {
  type: "productPromotionBanner";
  badge?: {
    text: any;
    color?: string;
    customColor?: { hex: string };
    variant?: "filled" | "outline" | "soft";
    size?: "sm" | "md" | "lg";
  };
  title: any; // Localized rich text
  subtitle?: any; // Localized rich text
  description?: any; // Localized rich text
  primaryButton?: CTAButtonData;
  secondaryButton?: CTAButtonData;
  backgroundImage?: {
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
  overlay?: {
    enabled: boolean;
    color: { hex: string };
    opacity: number;
  };
  textAlignment?: {
    desktop: "left" | "center" | "right";
    mobile: "left" | "center" | "right";
  };
  height?: string;
  padding?: {
    top: string;
    bottom: string;
  };
  borderRadius?: string;
}

interface ProductPromotionBannerSectionProps {
  data: ProductPromotionBannerSectionData;
  locale?: Locale;
}

const heightClasses = {
  small: "h-[300px]",
  medium: "h-[400px]",
  large: "h-[500px]",
  xl: "h-[600px]",
  fullscreen: "h-screen",
};

const paddingClasses = {
  small: "py-8",
  medium: "py-12",
  large: "py-16",
  xl: "py-20",
};

const borderRadiusClasses = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  "3xl": "rounded-3xl",
};

const textAlignmentClasses = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

export function ProductPromotionBannerSection({
  data,
  locale = "en",
}: ProductPromotionBannerSectionProps) {
  const {
    badge,
    title,
    subtitle,
    description,
    primaryButton,
    secondaryButton,
    backgroundImage,
    overlay = {
      enabled: false,
      color: { hex: "#000000" },
      opacity: 0.5,
    },
    textAlignment = { desktop: "center", mobile: "center" },
    height = "medium",
    padding = { top: "large", bottom: "large" },
    borderRadius = "xl",
  } = data;

  const heightClass =
    heightClasses[height as keyof typeof heightClasses] || heightClasses.medium;
  const topPadding =
    paddingClasses[padding.top as keyof typeof paddingClasses] ||
    paddingClasses.large;
  const bottomPadding =
    paddingClasses[padding.bottom as keyof typeof paddingClasses] ||
    paddingClasses.large;
  const borderRadiusClass =
    borderRadiusClasses[borderRadius as keyof typeof borderRadiusClasses] ||
    borderRadiusClasses.xl;

  const desktopAlignment =
    textAlignmentClasses[textAlignment.desktop] || textAlignmentClasses.center;
  const mobileAlignment =
    textAlignmentClasses[textAlignment.mobile] || textAlignmentClasses.center;

  const getOverlayStyle = () => {
    if (!overlay?.enabled) return {};

    return;
  };

  const getBackgroundImageUrl = () => {
    if (!backgroundImage?.image?.asset) {
      return "";
    }
    return urlFor(backgroundImage.image.asset).width(1920).height(600).url();
  };

  return (
    <section className="relative">
      <div className="container mx-auto w-full px-6 lg:px-24 py-20">
        <div
          className={cn(
            "relative overflow-hidden flex items-center justify-center",
            heightClass,
            borderRadiusClass
          )}
          style={{
            backgroundImage: getBackgroundImageUrl()
              ? `url(${getBackgroundImageUrl()})`
              : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Background Overlay */}
          {overlay?.enabled && (
            <div className="absolute inset-0" style={getOverlayStyle()} />
          )}

          {/* Content */}
          <div
            className={cn(
              "relative z-10 w-full max-w-none mx-auto px-6 lg:px-12",
              topPadding,
              bottomPadding,
              `lg:${desktopAlignment}`,
              mobileAlignment
            )}
          >
            {/* Title */}
            <div className="mb-4">
              <RichTextRenderer
                content={getLocalizedRichText(title, locale)}
                className="prose prose-xl max-w-none [&_h1]:text-3xl [&_h1]:md:text-4xl [&_h1]:lg:text-5xl [&_h1]:font-bold [&_h1]:text-white [&_h1]:leading-tight [&_h1]:mb-0 [&_h2]:text-2xl [&_h2]:md:text-3xl [&_h2]:lg:text-4xl [&_h2]:font-bold [&_h2]:text-white [&_h2]:leading-tight [&_h2]:mb-0 [&_p]:text-white [&_p]:text-lg [&_p]:md:text-lg [&_p]:lg:text-lg [&_p]:font-bold [&_p]:mb-0"
              />
            </div>

            {/* Badge */}
            {badge?.text && (
              <div className="mb-6">
                <Badge
                  text={badge.text}
                  color={badge.color as any}
                  customColor={badge.customColor?.hex}
                  variant={badge.variant}
                  size={badge.size}
                  locale={locale}
                />
              </div>
            )}

            {/* Subtitle */}
            {subtitle && (
              <div className="mb-6">
                <RichTextRenderer
                  content={getLocalizedRichText(subtitle, locale)}
                  className="prose prose-lg max-w-[1048px] mx-auto w-full [&_p]:text-white [&_p]:text-lg [&_p]:md:text-xl [&_p]:font-medium [&_p]:mb-0 [&_strong]:font-semibold [&_strong]:text-white"
                />
              </div>
            )}

            {/* Description */}
            {description && (
              <div className="mb-8">
                <RichTextRenderer
                  content={getLocalizedRichText(description, locale)}
                  className="prose prose-base max-w-[1048px] mx-auto w-full [&_p]:text-white/90 [&_p]:text-sm [&_p]:md:text-base [&_p]:leading-relaxed [&_p]:mb-0 [&_strong]:font-semibold [&_strong]:text-white"
                />
              </div>
            )}

            {/* CTA Buttons */}
            {(primaryButton || secondaryButton) && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {primaryButton && (
                  <CTAButton
                    text={primaryButton.text}
                    href={primaryButton.href}
                    variant={
                      (primaryButton.variant as
                        | "primary"
                        | "secondary"
                        | "outline"
                        | "ghost") || "primary"
                    }
                    size={(primaryButton.size as "sm" | "md" | "lg") || "md"}
                    openInNewTab={primaryButton.openInNewTab}
                    icon={primaryButton.icon}
                    locale={locale}
                    className="bg-blue-600 text-white hover:bg-blue-700 border-blue-600"
                  />
                )}
                {secondaryButton && (
                  <CTAButton
                    text={secondaryButton.text}
                    href={secondaryButton.href}
                    variant={
                      (secondaryButton.variant as
                        | "primary"
                        | "secondary"
                        | "outline"
                        | "ghost") || "outline"
                    }
                    size={(secondaryButton.size as "sm" | "md" | "lg") || "md"}
                    openInNewTab={secondaryButton.openInNewTab}
                    icon={secondaryButton.icon}
                    locale={locale}
                    className="bg-white text-gray-900 hover:bg-gray-100 border-white"
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
