"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ChevronDown, Globe } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { locales, localeNames, localeFlags } from "@/lib/i18n/config";
import type { Locale } from "@/lib/i18n/config";

interface LanguageSwitcherProps {
  currentLocale: Locale;
  className?: string;
}

export function LanguageSwitcher({ currentLocale, className }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: Locale) => {
    // Remove current locale from pathname
    const segments = pathname.split('/');
    const pathWithoutLocale = segments.slice(2).join('/');
    
    // Create new path with new locale
    const newPath = `/${newLocale}${pathWithoutLocale ? `/${pathWithoutLocale}` : ''}`;
    
    // Set locale cookie for persistence
    document.cookie = `locale=${newLocale}; path=/; max-age=31536000`; // 1 year
    
    // Navigate to new locale
    router.push(newPath);
    setIsOpen(false);
  };

  return (
    <div className={cn("relative", className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center space-x-2 px-3 py-3.5 rounded-full",
          "text-gray-700 hover:text-gray-900 hover:bg-gray-50",
          "transition-colors duration-200",
          "border border-blue-500 hover:bg-blue-500 hover:text-white"
        )}
        aria-label={`Current language: ${localeNames[currentLocale]}`}
      >
        <Globe className="h-4 w-4" />
        <span className="text-sm font-medium">
          {localeFlags[currentLocale]} {localeNames[currentLocale]}
        </span>
        <ChevronDown 
          className={cn(
            "h-4 w-4 transition-transform duration-200",
            isOpen && "rotate-180"
          )} 
        />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 top-full mt-2 w-48 z-20">
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 py-1">
              {locales.map((locale) => (
                <button
                  key={locale}
                  onClick={() => switchLocale(locale)}
                  className={cn(
                    "w-full flex items-center space-x-3 px-4 py-2 text-left text-black",
                    "hover:bg-gray-50 transition-colors duration-150",
                    locale === currentLocale && "bg-blue-50 text-blue-700"
                  )}
                  disabled={locale === currentLocale}
                >
                  <span className="text-lg">{localeFlags[locale]}</span>
                  <span className="text-sm font-medium">{localeNames[locale]}</span>
                  {locale === currentLocale && (
                    <span className="ml-auto text-xs text-blue-600">✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
