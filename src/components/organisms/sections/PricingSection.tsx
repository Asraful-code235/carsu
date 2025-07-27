import { RichTextRenderer } from "@/components/atoms/text/RichTextRenderer";
import { CTAButton } from "@/components/atoms/ui/CTAButton";
import { cn } from "@/lib/utils/cn";
import type { Locale } from "@/lib/i18n/config";
import { getLocalizedRichText, getLocalizedValue } from "@/lib/i18n/utils";

interface PricingPlan {
  name: any; // Localized string
  price: any; // Localized string
  period?: any; // Localized string
  description?: any; // Localized string
  subdescription?: any; // Localized string
  features: Array<{
    text: any; // Localized rich text
    included: boolean;
  }>;
  ctaButton?: {
    text: any; // Localized string
    href: string;
    variant: "primary" | "secondary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
    openInNewTab: boolean;
    icon?: string;
    disabled?: boolean;
  };
  isPopular: boolean;
}

interface PricingSectionData {
  type: "pricing";
  title?: any; // Localized rich text
  subtitle?: any; // Localized string
  billingToggle?: {
    yearlyText?: any; // Localized string
    monthlyText?: any; // Localized string
  };
  pricingPlans: PricingPlan[];
  backgroundColor?: { hex: string };
  padding?: {
    top: string;
    bottom: string;
  };
}

interface PricingSectionProps {
  data: PricingSectionData;
  locale?: Locale;
}

const paddingClasses = {
  none: "py-0",
  small: "py-8",
  medium: "py-12",
  large: "py-16",
  xl: "py-24",
};

export function PricingSection({ data, locale = "en" }: PricingSectionProps) {
  const {
    title,
    subtitle,
    billingToggle,
    pricingPlans,
    backgroundColor,
    padding,
  } = data;

  const topPadding =
    paddingClasses[padding?.top as keyof typeof paddingClasses] ||
    paddingClasses.large;
  const bottomPadding =
    paddingClasses[padding?.bottom as keyof typeof paddingClasses] ||
    paddingClasses.large;

  const backgroundStyle = backgroundColor?.hex
    ? { backgroundColor: backgroundColor.hex }
    : {};

  return (
    <section
      className={cn("relative", topPadding, bottomPadding)}
      style={backgroundStyle}
    >
      <div className="container mx-auto px-6 lg:px-24">
        {/* Header */}
        {(title || subtitle || billingToggle) && (
          <div className="text-center mb-16">
            {title && (
              <div className="mb-6">
                <RichTextRenderer
                  content={getLocalizedRichText(title, locale)}
                  className="prose-headings:text-3xl prose-headings:md:text-4xl prose-headings:lg:text-5xl prose-headings:font-bold prose-headings:text-gray-900 prose-headings:mb-0"
                />
              </div>
            )}
            {subtitle && (
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                {getLocalizedValue(subtitle, locale)}
              </p>
            )}

            {/* Billing Toggle */}
            {billingToggle &&
              (billingToggle.yearlyText || billingToggle.monthlyText) && (
                <div className="flex items-center justify-end gap-4 text-sm lg:mt-[111px]">
                  {billingToggle.yearlyText && (
                    <span className="text-blue-600 font-medium">
                      {getLocalizedValue(billingToggle.yearlyText, locale)}
                    </span>
                  )}
                  {billingToggle.yearlyText && billingToggle.monthlyText && (
                    <span className="text-gray-400">|</span>
                  )}
                  {billingToggle.monthlyText && (
                    <span className="text-gray-600">
                      {getLocalizedValue(billingToggle.monthlyText, locale)}
                    </span>
                  )}
                </div>
              )}
          </div>
        )}

        {/* Pricing Cards */}
        <div
          className={cn(
            "grid gap-8 max-w-7xl mx-auto",
            pricingPlans.length === 1
              ? "grid-cols-1 max-w-md"
              : pricingPlans.length === 2
                ? "grid-cols-1 md:grid-cols-2 max-w-4xl"
                : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          )}
        >
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={cn(
                "relative bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden",
                "hover:shadow-xl transition-all duration-300",
                plan.isPopular &&
                  "border-t-0 border-b border-l border-r border-blue-500"
              )}
            >
              {/* Most Popular Header */}
              {plan.isPopular && (
                <div className="bg-gray-800 text-white text-center py-3 px-6">
                  <span className="text-sm font-medium">Most Popular</span>
                </div>
              )}

              {/* Plan Content */}
              <div className="p-8">
                {/* Plan Header */}
                <div className="text-left mb-8 space-y-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-8">
                    {getLocalizedValue(plan.name, locale)}
                  </h3>

                  <div className="mb-8">
                    <span className="text-4xl font-bold text-gray-900">
                      {getLocalizedValue(plan.price, locale)}
                    </span>
                    {plan.period && (
                      <span className="text-gray-600 ml-1">
                        {getLocalizedValue(plan.period, locale)}
                      </span>
                    )}
                  </div>

                
                </div>

                {/* CTA Button */}
                {plan.ctaButton && (
                  <div className="my-8">
                    <CTAButton
                      text={plan.ctaButton.text}
                      href={plan.ctaButton.href}
                      variant={
                        plan.isPopular ? "primary" : plan.ctaButton.variant
                      }
                      size="lg"
                      openInNewTab={plan.ctaButton.openInNewTab}
                      icon={plan.ctaButton.icon}
                      disabled={plan.ctaButton.disabled}
                      locale={locale}
                      className="w-fit justify-center"
                    />
                  </div>
                )}

                  {plan.description && (
                    <p className="text-[#4D525E] text-lg font-bold pb-8 ">
                      {getLocalizedValue(plan.description, locale)}
                    </p>
                  )}

                {/* Features List */}

                {plan.subdescription && (
                  <p className="text-base text-[#4D525E] mb-8 pt-8 border-t border-gray-200">
                    {getLocalizedValue(plan.subdescription, locale)}
                  </p>
                )}
                {plan.features && plan.features.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4">
                      Includes:
                    </h4>
                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <div
                            className={cn(
                              "flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mr-3 mt-0.5",
                              feature.included
                                ? "bg-green-100 text-green-600"
                                : "bg-gray-100 text-gray-400"
                            )}
                          >
                            {feature.included ? (
                              <svg
                                className="w-3 h-3"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            ) : (
                              <svg
                                className="w-3 h-3"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            )}
                          </div>
                          <div
                            className={cn(
                              "text-sm",
                              feature.included
                                ? "text-gray-700"
                                : "text-gray-400 line-through"
                            )}
                          >
                            <RichTextRenderer
                              content={getLocalizedRichText(
                                feature.text,
                                locale
                              )}
                              className="prose prose-sm max-w-none prose-p:mb-0 prose-p:leading-relaxed"
                            />
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
