import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { cn } from "@/lib/utils/cn";
import type { HeroSection as HeroSectionType } from "@/types/page";

interface HeroSectionProps {
  data: HeroSectionType;
}

export function HeroSection({ data }: HeroSectionProps) {
  const { heading, subtitle, ctaButtons, dashboardImage, backgroundElements, backgroundColor } = data;

  const getSizeClass = (size: string) => {
    const sizeMap = {
      sm: 'w-32 h-32',
      md: 'w-56 h-56',
      lg: 'w-80 h-80',
    };
    return sizeMap[size as keyof typeof sizeMap] || 'w-56 h-56';
  };

  // Generate background style
  const backgroundStyle = backgroundColor
    ? { backgroundColor: backgroundColor.hex }
    : {};

  return (
    <section
      className={cn(
        "relative min-h-[90vh] overflow-hidden",
        !backgroundColor && "bg-gradient-to-b from-blue-50/50 to-transparent"
      )}
      style={backgroundStyle}
    >
      {/* Background decorative elements */}
      {backgroundElements && backgroundElements.length > 0 && (
        <div className="absolute inset-0 overflow-hidden">
          {backgroundElements.map((element, index) => (
            <div
              key={index}
              className="absolute"
              style={{
                top: element.position.top,
                left: element.position.left,
                right: element.position.right,
                bottom: element.position.bottom,
                opacity: element.opacity,
                transform: `rotate(${element.rotation}deg)`,
              }}
            >
              <Image
                src={urlFor(element.image).width(320).height(320).url()}
                alt=""
                width={320}
                height={320}
                className={cn("object-contain", getSizeClass(element.size))}
              />
            </div>
          ))}
        </div>
      )}

      <div className="relative max-w-7xl mx-auto px-6 lg:px-24 pt-20 pb-32">
        <div className="text-center">
          {/* Main Heading */}
          <div className="max-w-4xl mx-auto mb-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-gray-500">
                {heading.line1}
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                {heading.line2}
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <div className="max-w-2xl mx-auto mb-8">
            <p className="text-lg text-gray-600 leading-normal">
              {subtitle}
            </p>
          </div>

          {/* CTA Buttons */}
          {ctaButtons && ctaButtons.length > 0 && (
            <div className="flex flex-row flex-wrap items-center justify-center gap-4 mb-16">
              {ctaButtons.map((button, index) => (
                <Link
                  key={index}
                  href={button.href}
                  className={cn(
                    "px-8 py-4 rounded-full transition-all duration-200 text-lg font-medium min-w-[140px]",
                    button.variant === 'primary'
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                  )}
                >
                  {button.text}
                </Link>
              ))}
            </div>
          )}

          {/* Dashboard Preview */}
          {dashboardImage && (
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Image
                  src={urlFor(dashboardImage.asset).width(2304).height(1440).url()}
                  alt={dashboardImage.alt}
                  width={2304}
                  height={1440}
                  className="w-full h-auto rounded-2xl "
                  priority
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
