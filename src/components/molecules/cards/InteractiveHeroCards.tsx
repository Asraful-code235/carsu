"use client";

import Image from "next/image";
import { useState } from "react";
import { RichTextRenderer } from "@/components/atoms/text/RichTextRenderer";
import { cn } from "@/lib/utils/cn";
import { urlFor } from "@/sanity/lib/image";
import type { Locale } from "@/lib/i18n/config";
import { getLocalizedRichText, getLocalizedValue } from "@/lib/i18n/utils";

interface InteractiveHeroCardsProps {
  cards: Array<{
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
  defaultActiveCard: number;
  locale: Locale;
}

export function InteractiveHeroCards({ 
  cards, 
  defaultActiveCard, 
  locale 
}: InteractiveHeroCardsProps) {
  const [activeCardIndex, setActiveCardIndex] = useState(defaultActiveCard);

  if (!cards || cards.length === 0) {
    return null;
  }

  return (
    <div className="mt-14 lg:mt-[200px]">
      {/* Cards Grid */}
      <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 mb-12">
        {cards.map((card, index) => (
          <button
            key={index}
            onClick={() => setActiveCardIndex(index)}
            className={cn(
              "bg-white rounded-xl p-12 z-20 shadow-lg w-full h-full hover:shadow-xl transition-all duration-300 max-w-[242.8px] cursor-pointer",
              activeCardIndex === index 
                ? "ring-2 ring-blue-500 shadow-xl transform scale-105" 
                : "hover:transform hover:scale-102"
            )}
          >
            <div className="flex flex-col items-center text-center h-full">
              {/* Icon */}
              {card.icon?.image?.asset && (
                <div className="mb-6">
                  <Image
                    src={urlFor(card.icon.image.asset)
                      .width(64)
                      .height(64)
                      .url()}
                    alt={
                      getLocalizedValue(card.icon.alt, locale) ||
                      "Card icon"
                    }
                    width={64}
                    height={64}
                    className="w-[72px] h-[72px] object-contain object-center"
                  />
                </div>
              )}

              {/* Title */}
              <h3 className={cn(
                "font-semibold leading-tight text-lg w-full transition-colors duration-300",
                activeCardIndex === index ? "text-blue-600" : "text-gray-900"
              )}>
                {getLocalizedValue(card.title, locale)}
              </h3>
            </div>
          </button>
        ))}
      </div>

      {/* Expanded Content */}
      {cards[activeCardIndex] && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start mt-12 pt-12">
          {/* Left Column - Text Content */}
          <div className="space-y-6">
            {/* Expanded Title */}
            <RichTextRenderer
              content={getLocalizedRichText(cards[activeCardIndex].expandedTitle, locale)}
              className=""
            />
            
            {/* Expanded Description */}
            <RichTextRenderer
              content={getLocalizedRichText(cards[activeCardIndex].expandedDescription, locale)}
              className=""
            />
          </div>

          {/* Right Column - Image */}
          <div className="order-first lg:order-last">
            {cards[activeCardIndex].expandedImage?.image?.asset && (
              <div className="relative rounded-xl overflow-hidden">
                <Image
                  src={urlFor(cards[activeCardIndex].expandedImage.image.asset)
                    .width(600)
                    .height(400)
                    .url()}
                  alt={
                    getLocalizedValue(cards[activeCardIndex].expandedImage.alt, locale) ||
                    "Expanded content image"
                  }
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
