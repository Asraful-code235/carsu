'use client';

import { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { TestimonialCard } from '@/components/molecules/cards/TestimonialCard';
import { RichTextRenderer } from '@/components/atoms/text/RichTextRenderer';
import { cn } from '@/lib/utils/cn';

interface TestimonialsSectionProps {
  data: {
    type: 'testimonials';
    title: any[];
    subtitle?: string;
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
}

const paddingClasses = {
  none: 'py-0',
  small: 'py-8',
  medium: 'py-12',
  large: 'py-16',
  xl: 'py-24',
};

export function TestimonialsSection({ data }: TestimonialsSectionProps) {
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
      className={cn(topPadding, bottomPadding)}
      style={{
        backgroundColor: styling.backgroundColor?.hex || undefined,
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className={cn("mb-12", `text-${styling.textAlign}`)}>
          <RichTextRenderer 
            content={data.title} 
            className="mb-4"
          />
          {data.subtitle && (
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {data.subtitle}
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
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow"
                aria-label="Previous testimonials"
              >
                <ChevronLeftIcon className="w-6 h-6 text-gray-600" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow"
                aria-label="Next testimonials"
              >
                <ChevronRightIcon className="w-6 h-6 text-gray-600" />
              </button>
            </>
          )}

          {/* Testimonials Grid */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{
                transform: `translateX(-${(currentIndex * 100) / itemsPerView}%)`,
              }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial._id}
                  className="flex-shrink-0 px-3"
                  style={{ width: `${100 / itemsPerView}%` }}
                >
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </div>
          </div>

          {/* Dots Navigation */}
          {displaySettings.showDots && testimonials.length > itemsPerView && (
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: maxIndex + 1 }, (_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={cn(
                    "w-3 h-3 rounded-full transition-colors",
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
