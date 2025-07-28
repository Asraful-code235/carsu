"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { urlFor } from "@/sanity/lib/image";
import { getLocalizedValue, getLocalizedHref } from "@/lib/i18n/utils";
import type { Locale } from "@/lib/i18n/config";

interface BlogHeaderSlide {
  title: any; // Localized string
  bulletPoints: Array<any>; // Array of localized strings
  ctaButton: {
    text: any; // Localized string
    href: string;
    openInNewTab?: boolean;
  };
  heroImage: {
    image: any;
    alt?: any; // Localized string
  };
  isActive: boolean;
}

interface BlogHeaderData {
  title: string;
  slides: BlogHeaderSlide[];
  backgroundColor?: string;
  settings?: {
    autoplay?: boolean;
    autoplayInterval?: number;
    showIndicators?: boolean;
    height?: string;
  };
}

interface BlogHeaderProps {
  data: BlogHeaderData;
  locale?: Locale;
  className?: string;
}

export function BlogHeader({ data, locale = 'en', className }: BlogHeaderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { slides, backgroundColor = '#ffffff', settings } = data;

  // Find initially active slide or default to first
  useEffect(() => {
    const activeIndex = slides.findIndex(slide => slide.isActive);
    if (activeIndex !== -1) {
      setCurrentSlide(activeIndex);
    }
  }, [slides]);

  // Autoplay functionality
  useEffect(() => {
    if (settings?.autoplay && slides.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, (settings.autoplayInterval || 5) * 1000);

      return () => clearInterval(interval);
    }
  }, [settings?.autoplay, settings?.autoplayInterval, slides.length]);

  if (!slides || slides.length === 0) {
    return null;
  }

  const currentSlideData = slides[currentSlide];
  const height = settings?.height || '680px';



  return (
    <div 
      className={cn("w-full relative", className)}
      style={{ 
        height,
      }}
    >
      <div className="w-full h-full ">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-6 lg:gap-[24px] pt-9 lg:pt-[70px] w-full">
          {/* Text Content */}
          <div className="w-full lg:w-[520px] flex flex-col justify-center items-start gap-8 py-8 lg:py-[32px]">
            {/* Title */}
            <h1 className="text-[#363849] font-poppins text-[36px] font-bold leading-[42px] lg:leading-[42px]">
              {getLocalizedValue(currentSlideData.title, locale)}
            </h1>
            
            {/* Bullet Points */}
            <div className="flex flex-col gap-8">
              <div className="text-[#4D525E] font-dm-sans text-base leading-7">
                {currentSlideData.bulletPoints && currentSlideData.bulletPoints.length > 0 ? (
                  currentSlideData.bulletPoints.map((bullet, index) => {
                    const bulletText = getLocalizedValue(bullet, locale);

                    // Skip if no text available
                    if (!bulletText) {
                      return null;
                    }

                    return (
                      <div key={index}>
                        - {bulletText}
                        {index < currentSlideData.bulletPoints.length - 1 && <br />}
                      </div>
                    );
                  }).filter(Boolean)
                ) : (
                  <div className="text-red-500">⚠️ No bullet points configured. Please add bullet points in Sanity Studio.</div>
                )}
              </div>
            </div>

            {/* CTA Button */}
            <div className="flex items-center gap-6">
              <Link
                href={getLocalizedHref(currentSlideData.ctaButton.href, locale)}
                target={currentSlideData.ctaButton.openInNewTab ? "_blank" : undefined}
                rel={currentSlideData.ctaButton.openInNewTab ? "noopener noreferrer" : undefined}
                className="flex items-center gap-2 py-4 rounded-[40px] hover:opacity-80 transition-opacity"
              >
                <span className="text-[#1D6EE7] font-dm-sans text-sm font-bold leading-[18px]">
                  {getLocalizedValue(currentSlideData.ctaButton.text, locale)}
                </span>
                <svg width="16" height="16" viewBox="0 0 17 16" fill="none">
                  <path 
                    d="M8.92188 2.35547L14.5625 7.99605L8.92188 13.6366" 
                    stroke="#1D6EE7" 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                  <path 
                    d="M14.5624 8L2.5625 8" 
                    stroke="#1D6EE7" 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>

            {/* Slide Indicators */}
            {settings?.showIndicators !== false && slides.length > 1 && (
              <div className="flex items-center gap-[10px] p-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={cn(
                      "rounded-full transition-all duration-200 hover:opacity-80",
                      index === currentSlide
                        ? "w-4 h-4 bg-[#1D6EE7]"
                        : "w-3 h-3 bg-[#999999] opacity-50"
                    )}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Hero Image */}
          <div className="w-full h-[228px] lg:h-[410px]">
            {currentSlideData.heroImage?.image && (
              <Image
                src={urlFor(currentSlideData.heroImage.image).width(1472).height(820).url()}
                alt={getLocalizedValue(currentSlideData.heroImage.alt, locale) || getLocalizedValue(currentSlideData.title, locale)}
                width={1472}
                height={820}
                className="w-full h-full object-cover rounded-[14px]"
                priority={currentSlide === 0}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
