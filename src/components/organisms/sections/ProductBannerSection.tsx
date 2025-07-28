import { urlFor } from "@/sanity/lib/image";
import { cn } from "@/lib/utils/cn";
import { RichTextRenderer } from "@/components/atoms/text/RichTextRenderer";
import { CTAButton } from "@/components/atoms/ui/CTAButton";
import { GradientEllipse } from "@/components/atoms/decorative/GradientEllipse";
import type { Locale } from "@/lib/i18n/config";
import { getLocalizedRichText } from "@/lib/i18n/utils";

interface CTAButtonData {
  text: any; // Localized string
  href: any; // Localized string
  variant?: string;
  size?: string;
  icon?: string;
  iconPosition?: 'left' | 'right';
  openInNewTab?: boolean;
}

interface ProductBannerSectionData {
  type: 'productBanner';
  title: any; // Localized rich text
  description?: any; // Localized rich text
  primaryButton?: CTAButtonData;
  secondaryButton?: CTAButtonData;
  backgroundStyle?: {
    type: 'solid' | 'gradient' | 'image';
    primaryColor?: { hex: string };
    secondaryColor?: { hex: string };
    gradientDirection?: string;
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
  };
  textAlignment?: {
    desktop: 'left' | 'center' | 'right';
    mobile: 'left' | 'center' | 'right';
  };
  padding?: {
    top: string;
    bottom: string;
  };
  borderRadius?: string;
}

interface ProductBannerSectionProps {
  data: ProductBannerSectionData;
  locale?: Locale;
}

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

const gradientDirectionClasses = {
  'to-b': 'bg-gradient-to-b',
  'to-bl': 'bg-gradient-to-bl',
  'to-l': 'bg-gradient-to-l',
  'to-tl': 'bg-gradient-to-tl',
  'to-t': 'bg-gradient-to-t',
  'to-tr': 'bg-gradient-to-tr',
  'to-r': 'bg-gradient-to-r',
  'to-br': 'bg-gradient-to-br',
};

export function ProductBannerSection({ data, locale = 'en' }: ProductBannerSectionProps) {
  const {
    title,
    description,
    primaryButton,
    secondaryButton,
    backgroundStyle = {
      type: 'gradient',
      primaryColor: { hex: '#3B82F6' },
      secondaryColor: { hex: '#1D4ED8' },
      gradientDirection: 'to-br'
    },
    textAlignment = { desktop: 'center', mobile: 'center' },
    padding = { top: 'large', bottom: 'large' },
    borderRadius = 'xl'
  } = data;

  const topPadding = paddingClasses[padding.top as keyof typeof paddingClasses] || paddingClasses.large;
  const bottomPadding = paddingClasses[padding.bottom as keyof typeof paddingClasses] || paddingClasses.large;
  const borderRadiusClass = borderRadiusClasses[borderRadius as keyof typeof borderRadiusClasses] || borderRadiusClasses.xl;
  
  const desktopAlignment = textAlignmentClasses[textAlignment.desktop] || textAlignmentClasses.center;
  const mobileAlignment = textAlignmentClasses[textAlignment.mobile] || textAlignmentClasses.center;

  // Generate background styles
  const getBackgroundStyle = () => {
    const style: React.CSSProperties = {};

    if (backgroundStyle.type === 'solid' && backgroundStyle.primaryColor) {
      style.backgroundColor = backgroundStyle.primaryColor.hex;
    } else if (backgroundStyle.type === 'image' && backgroundStyle.backgroundImage?.image?.asset) {
      style.backgroundImage = `url(${urlFor(backgroundStyle.backgroundImage.image.asset).width(1920).height(600).url()})`;
      style.backgroundSize = 'cover';
      style.backgroundPosition = 'center';
      style.backgroundRepeat = 'no-repeat';
    }

    return style;
  };

  const getGradientClasses = () => {
    if (backgroundStyle.type !== 'gradient') return '';
    
    const direction = gradientDirectionClasses[backgroundStyle.gradientDirection as keyof typeof gradientDirectionClasses] || gradientDirectionClasses['to-br'];
    const fromColor = backgroundStyle.primaryColor?.hex || '#3B82F6';
    const toColor = backgroundStyle.secondaryColor?.hex || '#1D4ED8';
    
    return `${direction} from-[${fromColor}] to-[${toColor}]`;
  };

  const getOverlayStyle = () => {
    if (backgroundStyle.type !== 'image' || !backgroundStyle.overlay?.enabled) return {};
    
    return {
      backgroundColor: backgroundStyle.overlay.color.hex,
      opacity: backgroundStyle.overlay.opacity,
    };
  };

  return (
    <section className="relative">
      <GradientEllipse
        color="#93F4B8"
        position="top"
        size="lg"
        opacity={0.6}
        blur="xl"
        className="z-0"
      />

      <div className="max-w-[1920px] mx-auto px-4 lg:px-[320px] relative z-10">
        <div
          className={cn(
            "relative overflow-hidden",
            topPadding,
            bottomPadding,
            borderRadiusClass,
            backgroundStyle.type === 'gradient' ? getGradientClasses() : ''
          )}
          style={getBackgroundStyle()}
        >
          {/* Background Image Overlay */}
          {backgroundStyle.type === 'image' && backgroundStyle.overlay?.enabled && (
            <div
              className="absolute inset-0"
              style={getOverlayStyle()}
            />
          )}

          {/* Content */}
          <div className={cn(
            "relative z-10 max-w-[1048px] mx-auto px-6 ",
            `lg:${desktopAlignment}`,
            mobileAlignment
          )}>
            {/* Title */}
            <div className="mb-6">
              <RichTextRenderer
                content={getLocalizedRichText(title, locale)}
                className="prose prose-xl max-w-none [&_h1]:text-3xl [&_h1]:md:text-4xl [&_h1]:lg:text-5xl [&_h1]:font-bold [&_h1]:text-white [&_h1]:leading-tight [&_h2]:text-2xl [&_h2]:md:text-3xl [&_h2]:lg:text-4xl [&_h2]:font-bold [&_h2]:text-white [&_h2]:leading-tight [&_p]:text-white [&_p]:text-xl [&_p]:md:text-2xl [&_p]:font-medium"
              />
            </div>

            {/* Description */}
            {description && (
              <div className="mb-8">
                <RichTextRenderer
                  content={getLocalizedRichText(description, locale)}
                  className="prose prose-lg max-w-none [&_p]:text-white/90 [&_p]:text-base [&_p]:md:text-lg [&_p]:leading-relaxed [&_strong]:font-semibold [&_strong]:text-white"
                />
              </div>
            )}

            {/* CTA Buttons */}
            {(primaryButton || secondaryButton) && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center ">
                {primaryButton && (
                  <CTAButton
                    text={primaryButton.text}
                    href={primaryButton.href}
                    variant={primaryButton.variant as 'primary' | 'secondary' | 'outline' | 'ghost' || 'primary'}
                    size={primaryButton.size as 'sm' | 'md' | 'lg' || 'md'}
                    openInNewTab={primaryButton.openInNewTab}
                    icon={primaryButton.icon}
                    locale={locale}
                    className="bg-white text-blue-600 hover:bg-gray-50 border-white"
                  />
                )}
                {secondaryButton && (
                  <CTAButton
                    text={secondaryButton.text}
                    href={secondaryButton.href}
                    variant={secondaryButton.variant as 'primary' | 'secondary' | 'outline' | 'ghost' || 'outline'}
                    size={secondaryButton.size as 'sm' | 'md' | 'lg' || 'md'}
                    openInNewTab={secondaryButton.openInNewTab}
                    icon={secondaryButton.icon}
                    locale={locale}
                    className="bg-transparent text-white border-white hover:bg-white/10"
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
