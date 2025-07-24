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

      {/* Quote */}
      <blockquote className="text-[#4D525E] text-lg leading-relaxed mb-6 flex-grow">
        {quote}
      </blockquote>

      {/* Author Info */}
      <div>
        <p className="font-bold text-xl text-[#363849] mb-1">
          {name}
        </p>
        {(title || company) && (
          <p className="text-gray-400 text-base">
            {[title, company].filter(Boolean).join(', ')}
          </p>
        )}
      </div>
    </div>
  );
}
