import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { cn } from '@/lib/utils/cn';

interface TestimonialCardProps {
  testimonial: {
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
  };
  className?: string;
}

export function TestimonialCard({ testimonial, className }: TestimonialCardProps) {
  const { name, title, company, quote, avatar, rating } = testimonial;

  // Generate star rating
  const stars = Array.from({ length: 5 }, (_, index) => (
    <span
      key={index}
      className={cn(
        "text-lg",
        index < rating ? "text-yellow-400" : "text-gray-300"
      )}
    >
      ★
    </span>
  ));

  return (
    <div
      className={cn(
        "bg-white rounded-xl border border-gray-200 p-6 shadow-sm",
        "hover:shadow-md transition-shadow duration-200",
        "h-full flex flex-col",
        className
      )}
    >
      {/* Rating */}
      <div className="flex items-center mb-4">
        {stars}
      </div>

      {/* Quote */}
      <blockquote className="text-gray-700 leading-relaxed mb-6 flex-grow">
        &ldquo;{quote}&rdquo;
      </blockquote>

      {/* Author Info */}
      <div className="flex items-center">
        {/* Avatar */}
        <div className="flex-shrink-0 mr-4">
          {avatar?.asset ? (
            <Image
              src={urlFor(avatar.asset).width(48).height(48).url()}
              alt={avatar.alt || `${name}'s avatar`}
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

        {/* Name and Title */}
        <div className="min-w-0 flex-1">
          <p className="text-gray-900 font-semibold text-sm truncate">
            {name}
          </p>
          {(title || company) && (
            <p className="text-gray-600 text-sm truncate">
              {[title, company].filter(Boolean).join(', ')}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
