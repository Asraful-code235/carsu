'use client';

import { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { TestimonialCard } from '@/components/molecules/cards/TestimonialCard';
import { RichTextRenderer } from '@/components/atoms/text/RichTextRenderer';
import { cn } from '@/lib/utils/cn';
import type { Locale } from '@/lib/i18n/config';
import { getLocalizedValue, getLocalizedRichText } from '@/lib/i18n/utils';

interface TestimonialsSectionProps {
  data: {
    type: 'testimonials';
    title: any; // Localized rich text object
    subtitle?: any; // Localized string
    testimonials: Array<{
      _id: string;
      name: string;
      title?: string;
      company?: string;
      quote: string;
      avatar?: {
        asset: {
          _id: string;
          url: string;
        };
        alt: string;
      };
      rating: number;
    }>;
    displaySettings: {
      itemsPerView: {
        mobile: number;
        tablet: number;
        desktop: number;
      };
      autoplay: boolean;
      autoplaySpeed: number;
      showDots: boolean;
      showArrows: boolean;
      infiniteLoop: boolean;
    };
    styling: {
      backgroundColor?: {
        hex: string;
      };
      textAlign: 'left' | 'center' | 'right';
      padding: {
        top: string;
        bottom: string;
      };
    };
  };
  locale?: Locale;
}

const paddingClasses = {
  none: 'py-0',
  small: 'py-8',
  medium: 'py-12',
  large: 'py-16',
  xl: 'py-24',
};

export function TestimonialsSection({ data, locale = 'en' }: TestimonialsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(data.displaySettings.itemsPerView.desktop);

  const { testimonials, displaySettings, styling } = data;

  // Handle responsive items per view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(displaySettings.itemsPerView.mobile);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(displaySettings.itemsPerView.tablet);
      } else {
        setItemsPerView(displaySettings.itemsPerView.desktop);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [displaySettings.itemsPerView]);

  // Auto-play functionality
  useEffect(() => {
    if (!displaySettings.autoplay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const maxIndex = testimonials.length - itemsPerView;
        if (displaySettings.infiniteLoop) {
          return prevIndex >= maxIndex ? 0 : prevIndex + 1;
        }
        return Math.min(prevIndex + 1, maxIndex);
      });
    }, displaySettings.autoplaySpeed * 1000);

    return () => clearInterval(interval);
  }, [displaySettings.autoplay, displaySettings.autoplaySpeed, displaySettings.infiniteLoop, testimonials.length, itemsPerView]);

  const maxIndex = Math.max(0, testimonials.length - itemsPerView);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => {
      if (displaySettings.infiniteLoop) {
        return prevIndex <= 0 ? maxIndex : prevIndex - 1;
      }
      return Math.max(prevIndex - 1, 0);
    });
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => {
      if (displaySettings.infiniteLoop) {
        return prevIndex >= maxIndex ? 0 : prevIndex + 1;
      }
      return Math.min(prevIndex + 1, maxIndex);
    });
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(Math.min(index, maxIndex));
  };

  const topPadding = paddingClasses[styling.padding.top as keyof typeof paddingClasses];
  const bottomPadding = paddingClasses[styling.padding.bottom as keyof typeof paddingClasses];

  return (
    <section
      className={cn(
        topPadding,
        bottomPadding,
        "relative overflow-hidden",
        !styling.backgroundColor?.hex && "bg-gradient-to-b from-gray-50/30 to-white"
      )}
      style={{
        backgroundColor: styling.backgroundColor?.hex || undefined,
      }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative container mx-auto px-6 lg:px-24">
        {/* Header */}
        <div className={cn("mb-16 lg:mb-20", `text-${styling.textAlign}`)}>
          <div className="mb-6">
            <RichTextRenderer
              content={getLocalizedRichText(data.title, locale)}
              className="prose-headings:text-4xl prose-headings:md:text-5xl prose-headings:lg:text-6xl prose-headings:font-bold prose-headings:leading-tight prose-headings:text-[#363849] prose-headings:mb-0"
            />
          </div>
          {data.subtitle && (
            <p className="text-xl text-[#4D525E] leading-relaxed max-w-3xl mx-auto">
              {getLocalizedValue(data.subtitle, locale)}
            </p>
          )}
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          {displaySettings.showArrows && testimonials.length > itemsPerView && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-200 hover:scale-110 shadow-sm"
                aria-label="Previous testimonials"
              >
                <ChevronLeftIcon className="w-5 h-5 text-blue-600" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-200 hover:scale-110 shadow-sm"
                aria-label="Next testimonials"
              >
                <ChevronRightIcon className="w-5 h-5 text-blue-600" />
              </button>
            </>
          )}

          {/* Testimonials Grid */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${(currentIndex * 100) / itemsPerView}%)`,
              }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial._id}
                  className="flex-shrink-0 px-4 lg:px-8 relative"
                  style={{ width: `${100 / itemsPerView}%` }}
                >
                  <TestimonialCard testimonial={testimonial} />

                  {/* Divider - positioned absolutely so it doesn't affect layout */}
                  {index < testimonials.length - 1 && itemsPerView > 1 && (
                    <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-72 bg-gray-300 opacity-35"></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Dots Navigation */}
          {displaySettings.showDots && testimonials.length > itemsPerView && (
            <div className="flex justify-center mt-16 space-x-2">
              {Array.from({ length: maxIndex + 1 }, (_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-200",
                    currentIndex === index
                      ? "bg-blue-600"
                      : "bg-gray-300 hover:bg-gray-400"
                  )}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
