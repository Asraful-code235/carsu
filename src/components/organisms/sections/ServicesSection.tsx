'use client';

import { useState } from 'react';
import {
  CheckIcon,
  StarIcon,
  ArrowRightIcon,
  PlusIcon,
  HeartIcon,
  ShieldCheckIcon,
  BoltIcon,
  GlobeAltIcon,
  CogIcon,
  UserIcon,
  ChatBubbleLeftRightIcon,
  CircleStackIcon,
  BookOpenIcon,
  PhoneIcon,
  EnvelopeIcon,
  CloudIcon
} from '@heroicons/react/24/outline';
import { RichTextRenderer } from '@/components/atoms/text/RichTextRenderer';
import { urlFor } from '@/sanity/lib/image';
import { cn } from '@/lib/utils/cn';

interface ServicesSectionProps {
  data: {
    type: 'services';
    title: any[];
    description?: any[];
    services: Array<{
      title: string;
      description: string;
      icon: string;
    }>;
    backgroundColor?: {
      hex: string;
    };
    backgroundImage?: {
      image?: {
        asset?: {
          _id: string;
          url: string;
        };
      };
      alt?: string;
      position?: string;
      size?: string;
      opacity?: number;
      repeat?: string;
    };
    padding: {
      top: string;
      bottom: string;
    };
    settings?: {
      layout: 'grid-2' | 'grid-3' | 'grid-4' | 'list';
      textAlignment?: {
        desktop: 'left' | 'center' | 'right';
        mobile: 'left' | 'center' | 'right';
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

const iconComponents = {
  check: CheckIcon,
  star: StarIcon,
  arrowRight: ArrowRightIcon,
  plus: PlusIcon,
  heart: HeartIcon,
  shield: ShieldCheckIcon,
  lightning: BoltIcon,
  globe: GlobeAltIcon,
  cog: CogIcon,
  user: UserIcon,
  chat: ChatBubbleLeftRightIcon,
  database: CircleStackIcon,
  book: BookOpenIcon,
  settings: CogIcon,
  cloud: CloudIcon,
  phone: PhoneIcon,
  email: EnvelopeIcon,
};

const layoutClasses = {
  'grid-2': 'grid-cols-1 md:grid-cols-2',
  'grid-3': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  'grid-4': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  'list': 'grid-cols-1',
};

export function ServicesSection({ data }: ServicesSectionProps) {
  const {
    title,
    description,
    services,
    backgroundColor,
    backgroundImage,
    padding,
    settings,
  } = data;

  // State for active service (first one is active by default)
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);

  const topPadding = paddingClasses[padding.top as keyof typeof paddingClasses];
  const bottomPadding = paddingClasses[padding.bottom as keyof typeof paddingClasses];

  // Text alignment classes
  const desktopAlignment = settings?.textAlignment?.desktop || 'center';
  const mobileAlignment = settings?.textAlignment?.mobile || 'center';
  
  const getAlignmentClasses = () => {
    const desktop = desktopAlignment === 'center' ? 'md:text-center' : 
                   desktopAlignment === 'right' ? 'md:text-right' : 'md:text-left';
    const mobile = mobileAlignment === 'center' ? 'text-center' : 
                  mobileAlignment === 'right' ? 'text-right' : 'text-left';
    return `${mobile} ${desktop}`;
  };

  const alignmentClasses = getAlignmentClasses();
  const layout = settings?.layout || 'grid-3';
  const gridClasses = layoutClasses[layout];

  // Background image styles
  const getBackgroundImageStyles = () => {
    if (!backgroundImage?.image?.asset) return {};

    const imageUrl = urlFor(backgroundImage.image.asset).url();
    const position = backgroundImage.position || 'bottom-center';
    const size = backgroundImage.size || 'auto';
    const opacity = backgroundImage.opacity ?? 1;
    const repeat = backgroundImage.repeat || 'no-repeat';

    // Convert position to CSS background-position
    const positionMap: Record<string, string> = {
      'top-left': 'top left',
      'top-center': 'top center',
      'top-right': 'top right',
      'center-left': 'center left',
      'center': 'center center',
      'center-right': 'center right',
      'bottom-left': 'bottom left',
      'bottom-center': 'bottom center',
      'bottom-right': 'bottom right',
    };

    return {
      backgroundImage: `url(${imageUrl})`,
      backgroundPosition: positionMap[position] || 'bottom center',
      backgroundSize: size,
      backgroundRepeat: repeat,
      '--bg-opacity': opacity,
    } as React.CSSProperties;
  };

  const backgroundImageStyles = getBackgroundImageStyles();

  return (
    <section
      className={cn(topPadding, bottomPadding, "relative")}
      style={{
        backgroundColor: backgroundColor?.hex || undefined,
        ...backgroundImageStyles,
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-24">
        {/* Header */}
        <div className={cn("mb-16", alignmentClasses)}>
          {/* Title */}
          <div className="mb-6">
            <RichTextRenderer content={title} />
          </div>

          {/* Description */}
          {description && (
            <div className="max-w-3xl mx-auto">
              <RichTextRenderer content={description} />
            </div>
          )}
        </div>

        {/* Services Grid */}
        <div className={cn("grid gap-8", gridClasses)}>
          {services.map((service, index) => {
            const IconComponent = iconComponents[service.icon as keyof typeof iconComponents] || CogIcon;
            const isActive = activeServiceIndex === index;

            return (
              <div
                key={index}
                onClick={() => setActiveServiceIndex(index)}
                className={cn(
                  "rounded-[20px] p-8 cursor-pointer transition-all duration-300",
                  layout === 'list' ? 'flex items-start gap-6' : 'text-center',
                  isActive
                    ? "bg-white/50 shadow-[10px_31px_51px_0_rgba(26,102,216,0.24)]"
                    : "bg-white/50"
                )}
              >
                {layout === 'list' ? (
                  // List Layout
                  <>
                    {/* Icon */}
                    <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-8 h-8 text-blue-600" />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">
                        {service.title}
                      </h3>
                      {isActive && (
                        <p className="text-gray-600 leading-relaxed">
                          {service.description}
                        </p>
                      )}
                    </div>
                  </>
                ) : (
                  // Grid Layout
                  <>
                    {/* Icon */}
                    <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-6">
                      <IconComponent className="w-8 h-8 text-blue-600" />
                    </div>

                    {/* Content */}
                    <div>
                      <h3 className={cn(
                        "text-xl font-bold text-gray-900",
                        isActive ? "mb-4" : "mb-0",
                        alignmentClasses
                      )}>
                        {service.title}
                      </h3>
                      {isActive && (
                        <p className={cn(
                          "text-gray-600 leading-relaxed",
                          alignmentClasses
                        )}>
                          {service.description}
                        </p>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
