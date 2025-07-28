import type { AboutSection as AboutSectionType } from "@/types/page";
import type { Locale } from "@/lib/i18n/config";
import { RichTextRenderer } from "@/components/atoms/text/RichTextRenderer";
import { cn } from "@/lib/utils/cn";
import { getLocalizedRichText } from "@/lib/i18n/utils";

interface AboutSectionProps {
  data: AboutSectionType;
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
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

export function AboutSection({ data, locale = 'en' }: AboutSectionProps) {
  const {
    title,
    subtitle,
    content,
    textAlign = 'center',
    backgroundColor,
    padding = { top: 'large', bottom: 'large' }
  } = data;

  const topPadding = paddingClasses[padding.top as keyof typeof paddingClasses] || paddingClasses.large;
  const bottomPadding = paddingClasses[padding.bottom as keyof typeof paddingClasses] || paddingClasses.large;
  const alignmentClass = alignmentClasses[textAlign] || alignmentClasses.center;

  return (
    <section
      className={cn(topPadding, bottomPadding, "relative")}
      style={{
        backgroundColor: backgroundColor?.hex || undefined,
      }}
    >
      <div className="container mx-auto px-6 lg:px-24">
        <div className={alignmentClass}>
          {/* Title */}
          <RichTextRenderer
            content={getLocalizedRichText(title, locale)}
            className="prose prose-gray max-w-none mb-8"
          />

          {/* Subtitle */}
          {subtitle && (
            <div className="max-w-3xl mx-auto mb-8">
              <p className="text-xl text-gray-600 leading-relaxed">
                {subtitle}
              </p>
            </div>
          )}

          {/* Content */}
          {content && (
            <div className="max-w-3xl mx-auto">
              <RichTextRenderer
                content={getLocalizedRichText(content, locale)}
                className="prose prose-gray max-w-none"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
