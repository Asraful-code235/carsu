"use client";

import { useState } from "react";
import { cn } from "@/lib/utils/cn";
import { RichTextRenderer } from "@/components/atoms/text/RichTextRenderer";
import { Badge } from "@/components/atoms/ui/Badge";
import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import { getLocalizedValue, getLocalizedRichText, getLocalizedHref } from "@/lib/i18n/utils";

interface FormField {
  name: string;
  label: string;
  placeholder: string;
  type: "text" | "email" | "tel" | "textarea";
  required: boolean;
  width: "half" | "full";
}

interface FeatureListItem {
  text: any; // Localized string
  description?: any; // Localized string
  icon: string;
  iconColor: "primary" | "success" | "warning" | "error" | "gray";
  highlighted: boolean;
  link?: {
    href: string;
    text: any; // Localized string
    openInNewTab: boolean;
  };
}

interface ContactFormSectionProps {
  title?: any; // Localized rich text object
  badge?: {
    text: any; // Localized string
    color:
      | "primary"
      | "success"
      | "warning"
      | "error"
      | "info"
      | "purple"
      | "pink"
      | "indigo"
      | "gray"
      | "custom";
    customColor?: {
      hex: string;
    };
    variant: "filled" | "outline" | "soft";
    size: "sm" | "md" | "lg";
  };
  features?: FeatureListItem[];
  formHeading?: any; // Localized rich text object
  formFields: FormField[];
  submitButton: {
    text: any; // Localized string
    href: string;
    variant: "primary" | "secondary" | "outline" | "ghost";
    openInNewTab: boolean;
  };
  backgroundColor?: {
    hex: string;
  };
  padding?: {
    top: string;
    bottom: string;
  };
  settings?: {
    layout: "contentLeft" | "contentRight";
    fullWidth?: boolean;
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

export function ContactFormSection({
  title,
  badge,
  features,
  formHeading,
  formFields,
  submitButton,
  backgroundColor,
  padding,
  settings,
  locale = 'en',
}: ContactFormSectionProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { layout = "contentLeft", fullWidth = false } = settings || {};

  // Get padding classes
  const topPadding =
    paddingClasses[padding?.top as keyof typeof paddingClasses] ||
    paddingClasses.large;
  const bottomPadding =
    paddingClasses[padding?.bottom as keyof typeof paddingClasses] ||
    paddingClasses.large;

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Here you would typically send the form data to your backend
    // For now, we'll just simulate a submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Form submitted:", formData);
    setIsSubmitting(false);

    // Reset form or show success message
    setFormData({});
  };

  const ContentColumn = () => (
    <div className="space-y-8">
      {title && (
        <RichTextRenderer
          content={getLocalizedRichText(title, locale)}
          className="prose prose-gray max-w-none"
        />
      )}

      {badge && (
        <Badge
          text={badge.text}
          color={badge.color}
          customColor={badge.customColor?.hex}
          variant={badge.variant}
          size={badge.size}
          locale={locale}
        />
      )}

      {features && features.length > 0 && (
        <div className="space-y-6">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-3 max-w-[355px]">
              {/* Dot bullet point */}
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-3 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-gray-900 font-medium leading-relaxed">
                  {getLocalizedValue(feature.text, locale)}
                </p>
                {feature.description && (
                  <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                    {getLocalizedValue(feature.description, locale)}
                  </p>
                )}
                {feature.link && feature.link.href && (
                  <Link
                    href={getLocalizedHref(feature.link.href, locale)}
                    target={feature.link.openInNewTab ? "_blank" : undefined}
                    rel={
                      feature.link.openInNewTab
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="text-blue-600 hover:text-blue-700 text-sm underline mt-2 inline-block"
                  >
                    {getLocalizedValue(feature.link.text, locale)}
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const FormColumn = () => (
    <div className="">
      {formHeading && (
        <div className="mb-6">
          <RichTextRenderer
            content={getLocalizedRichText(formHeading, locale)}
            className="prose prose-gray max-w-none"
          />
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {formFields.map((field, index) => {
            const fieldClasses = cn(
              "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors",
              field.width === "full" && "md:col-span-2"
            );

            return (
              <div
                key={index}
                className={field.width === "full" ? "md:col-span-2" : ""}
              >
                <label
                  htmlFor={field.name}
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  {field.label}
                  {field.required && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </label>

                {field.type === "textarea" ? (
                  <textarea
                    id={field.name}
                    name={field.name}
                    placeholder={field.placeholder}
                    required={field.required}
                    value={formData[field.name] || ""}
                    onChange={(e) =>
                      handleInputChange(field.name, e.target.value)
                    }
                    rows={4}
                    className={fieldClasses}
                  />
                ) : (
                  <input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    placeholder={field.placeholder}
                    required={field.required}
                    value={formData[field.name] || ""}
                    onChange={(e) =>
                      handleInputChange(field.name, e.target.value)
                    }
                    className={fieldClasses}
                  />
                )}
              </div>
            );
          })}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            "w-fit px-8 py-4 rounded-full font-medium transition-all duration-200",
            "bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          )}
        >
          {isSubmitting ? "Submitting..." : getLocalizedValue(submitButton.text, locale)}
        </button>
      </form>
    </div>
  );

  return (
    <section
      className={cn(
        topPadding,
        bottomPadding,
        "relative",
        fullWidth ? "w-full" : "container mx-auto"
      )}
      style={{
        backgroundColor: backgroundColor?.hex || undefined,
      }}
    >
      <div className="px-6 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {layout === "contentLeft" ? (
            <>
              <ContentColumn />
              <FormColumn />
            </>
          ) : (
            <>
              <FormColumn />
              <ContentColumn />
            </>
          )}
        </div>
      </div>
    </section>
  );
}
