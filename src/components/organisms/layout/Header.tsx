/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { urlFor } from "@/sanity/lib/image";
import type { HeaderProps, CTAButton, NavigationLink, DropdownItem } from "@/types/header";
import { LanguageSwitcher } from "@/components/molecules/navigation/LanguageSwitcher";
import type { Locale } from "@/lib/i18n/config";
import { getLocalizedValue, getLocalizedHref } from "@/lib/i18n/utils";

export function Header({ data, sticky = true, transparent = false, className, locale = 'en' }: HeaderProps & { locale?: Locale }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  if (!data) {
    return null;
  }

  const { logo, navigation, ctaButtons, mobileSettings } = data;

  // Function to check if a link is active
  const isLinkActive = (href: string) => {
    if (!href || href === '#') return false;

    // Remove locale prefix from pathname for comparison
    const cleanPathname = pathname.replace(/^\/[a-z]{2}(\/|$)/, '/');
    const cleanHref = href.replace(/^\/[a-z]{2}(\/|$)/, '/');

    // Exact match for home page
    if (cleanHref === '/' && cleanPathname === '/') return true;

    // For other pages, check if pathname starts with href
    if (cleanHref !== '/' && cleanPathname.startsWith(cleanHref)) return true;

    return false;
  };

  // Function to check if dropdown has active item
  const hasActiveDropdownItem = (dropdownItems: DropdownItem[]) => {
    return dropdownItems.some(item => isLinkActive(item.href));
  };



  const handleDropdownToggle = (title: string) => {
    setOpenDropdown(openDropdown === title ? null : title);
  };

  const renderCTAButton = (button: CTAButton, isMobile = false) => {
    const baseClasses = "px-6 py-3 rounded-full transition-all duration-200 font-medium";
    const variantClasses = {
      primary: "bg-blue-600 text-white hover:bg-blue-700",
      secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
      outline: "border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white",
    };
    
    const mobileClasses = isMobile ? "block text-center mb-3" : "";
    
    return (
      <Link
        key={getLocalizedValue(button.text, locale)}
        href={getLocalizedHref(button.href, locale)}
        target={button.openInNewTab ? "_blank" : undefined}
        rel={button.openInNewTab ? "noopener noreferrer" : undefined}
        className={cn(baseClasses, variantClasses[button.variant], mobileClasses)}
        onClick={() => isMobile && setIsMenuOpen(false)}
      >
        {getLocalizedValue(button.text, locale)}
      </Link>
    );
  };

  const getDropdownWidth = (width: string) => {
    const widthMap = {
      sm: 'w-[120px]', 
      md: 'w-[480px]', 
      lg: 'w-[640px]', 
      xl: 'w-[800px]', 
      full: 'w-screen container',
    };
    return widthMap[width as keyof typeof widthMap] || 'w-[480px]';
  };

  const getGridColumns = (columns: number) => {
    const columnMap = {
      1: 'grid-cols-1',
      2: 'grid-cols-2',
      3: 'grid-cols-3',
      4: 'grid-cols-4',
    };
    return columnMap[columns as keyof typeof columnMap] || 'grid-cols-1';
  };

  const renderDropdownItem = (item: DropdownItem, showImages: boolean) => {
    const isActive = isLinkActive(item.href);


    return (
      <Link
        key={item.href}
        href={getLocalizedHref(item.href, locale)}
        className={cn(
          "block p-3 transition-colors rounded-lg",
          isActive
            ? "bg-blue-50 text-blue-600 font-medium"
            : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
        )}
      >
        <div className="flex items-center space-x-2">

          {showImages && 
    
          item?.image?.image?.asset && (
            <div className="flex-shrink-0 overflow-hidden">
              <Image
                src={urlFor(item.image.image.asset).width(48).height(48).url()}
                alt={getLocalizedValue(item.image.alt, locale) || getLocalizedValue(item.title, locale)}
                width={48}
                height={48}
                className="rounded-lg object-cover object-center"
              />
            </div>
          )}

          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <div className="font-medium text-sm truncate">{getLocalizedValue(item.title, locale)}</div>
            </div>
            {item.description && (
              <div className="text-xs text-gray-500 mt-1 line-clamp-2">{getLocalizedValue(item.description, locale)}</div>
            )}
          </div>
        </div>
      </Link>
    );
  };

  const renderNavigationLink = (link: NavigationLink, isMobile = false) => {

    if (link.hasDropdown && link.dropdownItems?.length) {
      const layout = link.dropdownLayout || { columns: 1, showImages: false, width: 'md' };
      const isDropdownActive = hasActiveDropdownItem(link.dropdownItems);

      return (
        <div key={getLocalizedValue(link.title, locale)} className={cn("relative", isMobile ? "w-full" : "group")}>
          <button
            onClick={() => isMobile && handleDropdownToggle(getLocalizedValue(link.title, locale))}
            className={cn(
              "flex items-center text-base transition-colors rounded-lg hover:bg-gray-50",
              isDropdownActive
                ? "text-blue-600 font-medium"
                : "text-[#363849] hover:text-blue-600",
              isMobile ? "justify-between w-full py-3 px-4" : ""
            )}
          >
            {getLocalizedValue(link.title, locale)}
            <ChevronDown className={cn("ml-2 h-4 w-4", isMobile && openDropdown === getLocalizedValue(link.title, locale) && "rotate-180")} />
          </button>

          {!isMobile && (
            <div className={cn(
              "absolute left-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50",
              getDropdownWidth(layout.width)
            )}>
              <div className={cn(
                " grid gap-1",
                getGridColumns(layout.columns)
              )}>
                {link.dropdownItems.map((item) => renderDropdownItem(item, layout.showImages))}
              </div>
            </div>
          )}
          
          {isMobile && openDropdown === getLocalizedValue(link.title, locale) && (
            <div className="pl-4 border-l-2 border-gray-100 ml-4">
              {link.dropdownItems.map((item) => {
                const isActive = isLinkActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={getLocalizedHref(item.href, locale)}
                    className={cn(
                      "block  py-2 transition-colors",
                      isActive
                        ? "text-blue-600 font-medium"
                        : "text-gray-600 hover:text-blue-600"
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {getLocalizedValue(item.title, locale)}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      );
    }

    const isActive = isLinkActive(link.href || "#");

    return (
      <Link
        key={getLocalizedValue(link.title, locale)}
        href={getLocalizedHref(link.href || "#", locale)}
        className={cn(
          "transition-colors px-4 py-2 rounded-lg hover:bg-gray-50",
          isActive
            ? "text-blue-600 font-medium"
            : "text-gray-900 hover:text-blue-600",
          isMobile ? "block py-3" : ""
        )}
        onClick={() => isMobile && setIsMenuOpen(false)}
      >
        {getLocalizedValue(link.title, locale)}
      </Link>
    );
  };

  return (
    <header
      className={cn(
        "w-full border-b border-gray-100 z-50",
        sticky && "sticky top-0",
        transparent ? "bg-transparent" : "bg-white/98 backdrop-blur-sm",
        className
      )}
    >
      <div className="container mx-auto px-6 lg:px-24">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center">
            {logo?.image && (
              <Image
                src={urlFor(logo.image).width(logo.width || 120).height(logo.height || 32).url()}
                alt={logo.alt}
                width={logo.width || 120}
                height={logo.height || 32}
                className="h-8 w-auto"
                priority
              />
            )}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-7 flex-1 justify-center">
            {navigation?.map((link) => renderNavigationLink(link, false))}
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {ctaButtons?.map((button) => renderCTAButton(button, false))}
            <LanguageSwitcher currentLocale={locale} />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 text-black"
            aria-label="Toggle mobile menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col space-y-2">
              {navigation?.map((link) => renderNavigationLink(link, true))}
              
              {mobileSettings?.showCTAInMobile && ctaButtons?.length && (
                <div className="pt-4 border-t border-gray-100 mt-4">
                  {ctaButtons.map((button) => renderCTAButton(button, true))}
                </div>
              )}

              {/* Mobile Language Switcher */}
              <div className="pt-4 border-t border-gray-100 mt-4">
                <LanguageSwitcher currentLocale={locale} className="w-full" />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
