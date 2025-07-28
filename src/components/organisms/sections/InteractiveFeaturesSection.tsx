"use client";

import { useState } from "react";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";
import { getLocalizedValue, getLocalizedRichText } from "@/lib/i18n/utils";
import { CTAButton } from "@/components/atoms/ui/CTAButton";
import { cn } from "@/lib/utils/cn";
import type { Locale } from "@/lib/i18n/config";
import { RichTextRenderer } from "@/components/atoms/text/RichTextRenderer";

interface FeatureCard {
  title: any; // Localized string
  description: any; // Localized rich text
  icon?: {
    image: any;
    alt?: any;
  };
  isDefault: boolean;
}

interface InteractiveFeaturesSectionProps {
  data: {
    type: string;
    title?: any; // Localized rich text
    pillText?: any; // Localized string
    description?: any; // Localized rich text
    primaryButton?: {
      text: any;
      href: string;
      variant?: string;
      size?: string;
      openInNewTab?: boolean;
      icon?: string;
    };
    secondaryButton?: {
      text: any;
      href: string;
      variant?: string;
      size?: string;
      openInNewTab?: boolean;
      icon?: string;
    };
    centerImage?: {
      image: any;
      alt?: any;
    };
    featureCards?: FeatureCard[];
    backgroundColor?: { hex: string };
    padding?: { top: string; bottom: string };
    settings?: {
      animationDuration?: string;
      showAllCardsOnMobile?: boolean;
    };
  };
  locale: Locale;
}

export function InteractiveFeaturesSection({
  data,
  locale,
}: InteractiveFeaturesSectionProps) {
  const {
    title,
    pillText,
    description,
    primaryButton,
    secondaryButton,
    centerImage,
    featureCards = [],
    backgroundColor,
    padding,
    settings,
  } = data;

  // Find default active card or use first card
  const defaultActiveIndex =
    featureCards.findIndex((card) => card.isDefault) || 0;
  const [activeCardIndex, setActiveCardIndex] = useState(defaultActiveIndex);

  const getPaddingClass = (paddingValue: string) => {
    switch (paddingValue) {
      case "none":
        return "py-0";
      case "small":
        return "py-8";
      case "medium":
        return "py-16";
      case "large":
        return "py-24";
      case "xl":
        return "py-32";
      default:
        return "py-24";
    }
  };

  const getAnimationDuration = () => {
    switch (settings?.animationDuration) {
      case "fast":
        return "duration-200";
      case "slow":
        return "duration-500";
      default:
        return "duration-300";
    }
  };

  const paddingTop = getPaddingClass(padding?.top || "large");
  const paddingBottom = getPaddingClass(padding?.bottom || "large");

  return (
    <section
      className={cn(paddingTop, paddingBottom)}
      style={{ backgroundColor: backgroundColor?.hex || "#ffffff" }}
    >
      <div className="container mx-auto px-4">
        {/* Header Content */}
        <div className="text-center mb-16">
          {/* Pill Text */}
          {/* Title */}
          {title && getLocalizedRichText(title, locale) && (
            <h2 className="text-[#363849] font-poppins text-[36px] font-bold leading-[42px] mb-6 max-w-4xl mx-auto">
              <RichTextRenderer
                content={getLocalizedRichText(title, locale)}
               
              />
            </h2>
          )}
          {pillText && (
            <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-600 text-sm font-medium rounded-full mb-6">
              {getLocalizedValue(pillText, locale)}
            </div>
          )}
          ƒ{/* Description */}
          {description && getLocalizedRichText(description, locale) && (
            <div className="text-[#4D525E] font-dm-sans text-base leading-7 mb-8 max-w-3xl mx-auto">
              <RichTextRenderer content={getLocalizedRichText(description, locale)} />
            </div>
          )}
          {/* Buttons */}
          {(primaryButton || secondaryButton) && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              {primaryButton && (
                <CTAButton
                  text={primaryButton.text}
                  href={primaryButton.href}
                  variant={primaryButton.variant as any}
                  size={primaryButton.size as any}
                  className="max-sm:w-full"
                  openInNewTab={primaryButton.openInNewTab}
                  icon={primaryButton.icon}
                  locale={locale}
                />
              )}
              {secondaryButton && (
                <CTAButton
                  text={secondaryButton.text}
                  href={secondaryButton.href}
                  className="max-sm:w-full"
                  variant={secondaryButton.variant as any}
                  size={secondaryButton.size as any}
                  openInNewTab={secondaryButton.openInNewTab}
                  icon={secondaryButton.icon}
                  locale={locale}
                />
              )}
            </div>
          )}
        </div>

        {/* Main Content Layout: Cards + Center Image + Cards */}
        {featureCards.length > 0 && (
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
            {/* Left Side Cards (First 3 cards) */}
            <div className="flex flex-col gap-6 lg:w-1/3">
              {featureCards.slice(0, 3).map((card, index) => {
                const isActive = index === activeCardIndex;
                const isDefaultCard = card.isDefault;

                return (
                  <div
                    key={index}
                    className={cn(
                      "p-6 rounded-xl lg:max-w-[302px] w-full mx-auto cursor-pointer transition-all",
                      getAnimationDuration(),
                      "hidden lg:block",
                      isActive ? "border shadow-lg border-blue-200 " : "",
                      // Mobile: Only show default card
                      settings?.showAllCardsOnMobile
                        ? "block"
                        : isDefaultCard
                          ? "hidden lg:block"
                          : "hidden lg:block"
                    )}
                    onClick={() => setActiveCardIndex(index)}
                  >
                    {/* Icon */}
                    {card.icon?.image?.asset && (
                      <div className="mb-4">
                        <Image
                          src={urlFor(card.icon.image)
                            .width(48)
                            .height(48)
                            .url()}
                          alt={getLocalizedValue(card.icon.alt, locale) || ""}
                          width={48}
                          height={48}
                          className="w-12 h-12 object-contain"
                        />
                      </div>
                    )}

                    {/* Title */}
                    <h3 className="text-[#363849] font-poppins text-lg font-semibold mb-3">
                      {getLocalizedValue(card.title, locale)}
                    </h3>

                    {/* Description */}
                    {card.description &&
                      getLocalizedRichText(card.description, locale) && (
                        <div className="text-[#4D525E] font-dm-sans text-sm leading-6">
                          <PortableText
                            value={getLocalizedRichText(
                              card.description,
                              locale
                            )}
                          />
                        </div>
                      )}
                  </div>
                );
              })}
            </div>

            {/* Center Image */}
            {centerImage?.image?.asset && (
              <div className="flex justify-center w-full lg:w-1/3 h-full ">
                <div className="relative w-full lg:max-w-md min-h-[300px] lg:min-h-[526px]">
                  <Image
                    src={urlFor(centerImage.image).width(800).height(600).url()}
                    alt={getLocalizedValue(centerImage.alt, locale) || ""}
                    fill
                    className="aspect-auto object-contain"
                    priority
                  />
                </div>
              </div>
            )}

            {/* Right Side Cards (Last 3 cards) */}
            <div className="flex flex-col gap-6 lg:w-1/3">
              {featureCards.slice(3, 6).map((card, index) => {
                const actualIndex = index + 3; // Adjust index for the slice
                const isActive = actualIndex === activeCardIndex;
                const isDefaultCard = card.isDefault;

                return (
                  <div
                    key={actualIndex}
                    className={cn(
                      "p-6 rounded-xl lg:max-w-[302px] w-full mx-auto cursor-pointer transition-all",
                      getAnimationDuration(),
                      // Desktop: Show all cards, highlight active with shadow
                      "hidden lg:block",
                      isActive ? "border shadow-lg border-blue-200 " : "",
                      // Mobile: Only show default card
                      settings?.showAllCardsOnMobile
                        ? "block"
                        : isDefaultCard
                          ? "hidden lg:block"
                          : "hidden lg:block"
                    )}
                    onClick={() => setActiveCardIndex(actualIndex)}
                  >
                    {/* Icon */}
                    {card.icon?.image?.asset && (
                      <div className="mb-4">
                        <Image
                          src={urlFor(card.icon.image)
                            .width(48)
                            .height(48)
                            .url()}
                          alt={getLocalizedValue(card.icon.alt, locale) || ""}
                          width={48}
                          height={48}
                          className="w-12 h-12 object-contain"
                        />
                      </div>
                    )}

                    {/* Title */}
                    <h3 className="text-[#363849] font-poppins text-lg font-semibold mb-3">
                      {getLocalizedValue(card.title, locale)}
                    </h3>

                    {/* Description */}
                    {card.description &&
                      getLocalizedRichText(card.description, locale) && (
                        <div className="text-[#4D525E] font-dm-sans text-sm leading-6">
                          <PortableText
                            value={getLocalizedRichText(
                              card.description,
                              locale
                            )}
                          />
                        </div>
                      )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Mobile: Show only default active card below image */}
        {!settings?.showAllCardsOnMobile && featureCards.length > 0 && (
          <div className="block lg:hidden mt-8">
            {featureCards
              .filter((card) => card.isDefault)
              .map((card, index) => (
                <div
                  key={`mobile-${index}`}
                  className="p-6 rounded-xl border shadow-lg border-blue-200 bg-blue-50/30"
                >
                  {/* Icon */}
                  {card.icon?.image?.asset && (
                    <div className="mb-4">
                      <Image
                        src={urlFor(card.icon.image).width(48).height(48).url()}
                        alt={getLocalizedValue(card.icon.alt, locale) || ""}
                        width={48}
                        height={48}
                        className="w-12 h-12 object-contain"
                      />
                    </div>
                  )}

                  {/* Title */}
                  <h3 className="text-[#363849] font-poppins text-lg font-semibold mb-3">
                    {getLocalizedValue(card.title, locale)}
                  </h3>

                  {/* Description */}
                  {card.description &&
                    getLocalizedRichText(card.description, locale) && (
                      <div className="text-[#4D525E] font-dm-sans text-sm leading-6">
                        <PortableText
                          value={getLocalizedRichText(card.description, locale)}
                        />
                      </div>
                    )}
                </div>
              ))}
          </div>
        )}
      </div>
    </section>
  );
}
