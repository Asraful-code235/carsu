import Link from "next/link";
import {
  ArrowRightIcon,
  ArrowTopRightOnSquareIcon,
  ArrowDownTrayIcon,
  PlayIcon,
  CheckIcon,
  StarIcon,
  PlusIcon,
  HeartIcon,
  ShieldCheckIcon,
  BoltIcon,
  GlobeAltIcon,
  CogIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils/cn";
import type { Locale } from "@/lib/i18n/config";
import { getLocalizedValue, getLocalizedHref } from "@/lib/i18n/utils";

interface CTAButtonProps {
  text: any; // Localized string
  href: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  openInNewTab?: boolean;
  icon?: string;
  disabled?: boolean;
  className?: string;
  locale?: Locale;
}

const buttonVariants = {
  primary: "bg-blue-600 text-white hover:bg-blue-700 border-blue-600",
  secondary: "bg-white text-[#4D525E] border border-[#4D525E] hover:border-blue-500 hover:text-blue-500",
  outline: "bg-transparent text-blue-600 hover:bg-blue-50 border-blue-600",
  ghost: "bg-transparent text-gray-600 hover:bg-gray-50 border-transparent",
};

const sizeVariants = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

const iconComponents = {
  arrowRight: ArrowRightIcon,
  externalLink: ArrowTopRightOnSquareIcon,
  download: ArrowDownTrayIcon,
  play: PlayIcon,
  check: CheckIcon,
  star: StarIcon,
  plus: PlusIcon,
  heart: HeartIcon,
  shield: ShieldCheckIcon,
  lightning: BoltIcon,
  globe: GlobeAltIcon,
  cog: CogIcon,
  user: UserIcon,
};

export function CTAButton({
  text,
  href,
  variant = 'primary',
  size = 'md',
  openInNewTab = false,
  icon,
  disabled = false,
  className,
  locale = 'en',
}: CTAButtonProps) {
  if (!href) {
    return null;
  }

  const IconComponent = icon ? iconComponents[icon as keyof typeof iconComponents] : null;
  
  const baseClasses = "inline-flex items-center justify-center gap-2 rounded-full transition-all duration-200 font-medium border text-center";
  const variantClasses = buttonVariants[variant];
  const sizeClasses = sizeVariants[size];
  
  const buttonContent = (
    <>
      {getLocalizedValue(text, locale)}
      {IconComponent && (
        <IconComponent className="w-4 h-4" />
      )}
    </>
  );

  return (
    <Link
      href={getLocalizedHref(href, locale)}
      target={openInNewTab ? "_blank" : undefined}
      rel={openInNewTab ? "noopener noreferrer" : undefined}
      className={cn(
        baseClasses,
        variantClasses,
        sizeClasses,
        disabled && "opacity-50 cursor-not-allowed pointer-events-none",
        className
      )}
    >
      {buttonContent}
    </Link>
  );
}
