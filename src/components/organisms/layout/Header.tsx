"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { urlFor } from "@/sanity/lib/image";
import type { HeaderProps, CTAButton, NavigationLink, DropdownItem } from "@/types/header";

export function Header({ data, sticky = true, transparent = false, className }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  if (!data) {
    return null;
  }

  const { logo, navigation, ctaButtons, mobileSettings } = data;

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
        key={button.title}
        href={button.href}
        target={button.openInNewTab ? "_blank" : undefined}
        rel={button.openInNewTab ? "noopener noreferrer" : undefined}
        className={cn(baseClasses, variantClasses[button.variant], mobileClasses)}
        onClick={() => isMobile && setIsMenuOpen(false)}
      >
        {button.title}
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
    console.log('🔧 Dropdown width setting:', width, '→', widthMap[width as keyof typeof widthMap]);
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
    return (
      <Link
        key={item.href}
        href={item.href}
        className="block p-3 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors rounded-lg"
      >
        <div className="flex items-center space-x-2">
          {showImages && item.image && (
            <div className="flex-shrink-0 overflow-hidden">
              <Image
                src={urlFor(item.image.asset).width(48).height(48).url()}
                alt={item.image.alt || item.title}
                width={48}
                height={48}
                className="rounded-lg object-cover object-center"
              />
            </div>
          )}

          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <div className="font-medium text-sm truncate">{item.title}</div>
            </div>
            {item.description && (
              <div className="text-xs text-gray-500 mt-1 line-clamp-2">{item.description}</div>
            )}
          </div>
        </div>
      </Link>
    );
  };

  const renderNavigationLink = (link: NavigationLink, isMobile = false) => {
    if (link.hasDropdown && link.dropdownItems?.length) {
      const layout = link.dropdownLayout || { columns: 1, showImages: false, width: 'md' };

      return (
        <div key={link.title} className={cn("relative", isMobile ? "w-full" : "group")}>
          <button
            onClick={() => isMobile && handleDropdownToggle(link.title)}
            className={cn(
              "flex items-center text-gray-900 hover:text-blue-600 transition-colors px-4 py-2 rounded-lg hover:bg-gray-50",
              isMobile ? "justify-between w-full py-3" : ""
            )}
          >
            {link.title}
            <ChevronDown className={cn("ml-2 h-4 w-4", isMobile && openDropdown === link.title && "rotate-180")} />
          </button>

          {!isMobile && (
            <div className={cn(
              "absolute left-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50",
              getDropdownWidth(layout.width)
            )}>
              <div className={cn(
                "p-3 grid gap-1",
                getGridColumns(layout.columns)
              )}>
                {link.dropdownItems.map((item) => renderDropdownItem(item, layout.showImages))}
              </div>
            </div>
          )}
          
          {isMobile && openDropdown === link.title && (
            <div className="pl-4 border-l-2 border-gray-100 ml-4">
              {link.dropdownItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-2 text-gray-600 hover:text-blue-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          )}
        </div>
      );
    }

    return (
      <Link
        key={link.title}
        href={link.href || "#"}
        className={cn(
          "text-gray-900 hover:text-blue-600 transition-colors px-4 py-2 rounded-lg hover:bg-gray-50",
          isMobile ? "block py-3" : ""
        )}
        onClick={() => isMobile && setIsMenuOpen(false)}
      >
        {link.title}
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
          <Link href="/" className="flex items-center">
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
          <nav className="hidden lg:flex items-center space-x-8 flex-1 justify-center">
            {navigation?.map((link) => renderNavigationLink(link, false))}
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {ctaButtons?.map((button) => renderCTAButton(button, false))}
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
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
