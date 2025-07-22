import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

export interface HeaderLogo {
  image: SanityImageSource;
  alt: string;
  width?: number;
  height?: number;
}

export interface DropdownItem {
  title: string;
  href: string;
  description?: string;
}

export interface NavigationLink {
  title: string;
  href?: string;
  hasDropdown: boolean;
  dropdownItems?: DropdownItem[];
}

export interface CTAButton {
  title: string;
  href: string;
  variant: 'primary' | 'secondary' | 'outline';
  openInNewTab?: boolean;
}

export interface MobileSettings {
  showCTAInMobile: boolean;
  mobileMenuPosition: 'below' | 'overlay';
}

export interface HeaderConfiguration {
  _id: string;
  title: string;
  logo: HeaderLogo;
  navigation: NavigationLink[];
  ctaButtons: CTAButton[];
  mobileSettings: MobileSettings;
}

export interface HeaderSectionConfig {
  type: 'header';
  header: HeaderConfiguration;
  sticky: boolean;
  transparent: boolean;
}

export interface HeaderProps {
  data: HeaderConfiguration;
  sticky?: boolean;
  transparent?: boolean;
  className?: string;
}
