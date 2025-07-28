import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { cn } from '@/lib/utils/cn';
import type { Locale } from '@/lib/i18n/config';
import { getLocalizedValue } from '@/lib/i18n/utils';

interface TestimonialCardProps {
  testimonial: {
    _id: string;
    name: string;
    title?: any; // Localized string
    company?: any; // Localized string
    quote: any; // Localized string
    avatar?: {
      asset: {
        _id: string;
        url: string;
      };
      alt: any; // Localized string
    };
    rating: number;
  };
  className?: string;
  locale?: Locale;
}

export function TestimonialCard({ testimonial, className, locale = 'en' }: TestimonialCardProps) {
  const { name, title, company, quote, avatar } = testimonial;

  return (
    <div
      className={cn(
        "text-center max-w-md mx-auto",
        "h-full flex flex-col",
        className
      )}
    >
      {/* Avatar */}
      <div className="flex justify-center mb-5">
        {avatar?.asset ? (
          <Image
            src={urlFor(avatar.asset).width(48).height(48).url()}
            alt={getLocalizedValue(avatar.alt, locale) || `${name}'s avatar`}
            width={48}
            height={48}
            className="rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-gray-500 font-medium text-sm">
              {name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
      </div>

      {/* Quote */}
      <blockquote className="text-[#4D525E] text-lg leading-relaxed mb-6 flex-grow">
        {getLocalizedValue(quote, locale)}
      </blockquote>

      {/* Author Info */}
      <div>
        <p className="font-bold text-xl text-[#363849] mb-1">
          {name}
        </p>
        {(title || company) && (
          <p className="text-gray-400 text-base">
            {[getLocalizedValue(title, locale), getLocalizedValue(company, locale)].filter(Boolean).join(', ')}
          </p>
        )}
      </div>
    </div>
  );
}
