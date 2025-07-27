import { cn } from '@/lib/utils/cn';
import type { Locale } from '@/lib/i18n/config';
import { getLocalizedValue } from '@/lib/i18n/utils';

interface BadgeProps {
  text: any; // Can be string or localized object {en, es, it}
  color?: 'primary' | 'success' | 'warning' | 'error' | 'info' | 'purple' | 'pink' | 'indigo' | 'gray' | 'custom';
  customColor?: string;
  variant?: 'filled' | 'outline' | 'soft';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  locale?: Locale;
}

const colorVariants = {
  primary: {
    filled: 'bg-blue-600 text-white border-blue-600',
    outline: 'bg-transparent text-blue-600 border-blue-600',
    soft: 'bg-blue-50 text-blue-700 border-blue-200',
  },
  success: {
    filled: 'bg-green-600 text-white border-green-600',
    outline: 'bg-transparent text-green-600 border-green-600',
    soft: 'bg-green-50 text-green-700 border-green-200',
  },
  warning: {
    filled: 'bg-yellow-600 text-white border-yellow-600',
    outline: 'bg-transparent text-yellow-600 border-yellow-600',
    soft: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  },
  error: {
    filled: 'bg-red-600 text-white border-red-600',
    outline: 'bg-transparent text-red-600 border-red-600',
    soft: 'bg-red-50 text-red-700 border-red-200',
  },
  info: {
    filled: 'bg-cyan-600 text-white border-cyan-600',
    outline: 'bg-transparent text-cyan-600 border-cyan-600',
    soft: 'bg-cyan-50 text-cyan-700 border-cyan-200',
  },
  purple: {
    filled: 'bg-purple-600 text-white border-purple-600',
    outline: 'bg-transparent text-purple-600 border-purple-600',
    soft: 'bg-purple-50 text-purple-700 border-purple-200',
  },
  pink: {
    filled: 'bg-pink-600 text-white border-pink-600',
    outline: 'bg-transparent text-pink-600 border-pink-600',
    soft: 'bg-pink-50 text-pink-700 border-pink-200',
  },
  indigo: {
    filled: 'bg-indigo-600 text-white border-indigo-600',
    outline: 'bg-transparent text-indigo-600 border-indigo-600',
    soft: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  },
  gray: {
    filled: 'bg-gray-600 text-white border-gray-600',
    outline: 'bg-transparent text-gray-600 border-gray-600',
    soft: 'bg-gray-50 text-gray-700 border-gray-200',
  },
  custom: {
    filled: '',
    outline: '',
    soft: '',
  },
};

const sizeVariants = {
  sm: 'px-2 py-1 text-xs',
  md: 'px-3 py-1.5 text-sm',
  lg: 'px-4 py-2 text-base',
};

export function Badge({
  text,
  color = 'primary',
  customColor,
  variant = 'soft',
  size = 'md',
  className,
  locale = 'en',
}: BadgeProps) {
  const baseClasses = 'inline-flex items-center font-medium rounded-full border transition-colors';
  
  let colorClasses = '';
  let customStyles: React.CSSProperties = {};

  if (color === 'custom' && customColor) {
    // Handle custom color
    if (variant === 'filled') {
      customStyles = {
        backgroundColor: customColor,
        borderColor: customColor,
        color: 'white',
      };
    } else if (variant === 'outline') {
      customStyles = {
        backgroundColor: 'transparent',
        borderColor: customColor,
        color: customColor,
      };
    } else if (variant === 'soft') {
      // Create a lighter version for soft variant
      customStyles = {
        backgroundColor: `${customColor}${Math.round(255 * 0.5).toString(16).padStart(2, '0')}`,
        borderColor: `${customColor}${Math.round(255 * 0.3).toString(16).padStart(2, '0')}`,
        color: customColor,
      };
    }
  } else {
    colorClasses = colorVariants[color][variant];
  }

  const sizeClasses = sizeVariants[size];

  // Handle both string and localized text
  const displayText = typeof text === 'string' ? text : getLocalizedValue(text, locale);

  return (
    <span
      className={cn(baseClasses, colorClasses, sizeClasses, className)}
      style={Object.keys(customStyles).length > 0 ? customStyles : undefined}
    >
      {displayText}
    </span>
  );
}
