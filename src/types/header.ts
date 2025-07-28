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
  image?: {
    asset: SanityImageSource;
    alt?: string;
  };
  badge?: {
    text: string;
    color: 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'gray';
  };
}

export interface DropdownLayout {
  columns: 1 | 2 | 3 | 4;
  showImages: boolean;
  width: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export interface NavigationLink {
  title: string;
  href?: string;
  hasDropdown: boolean;
  dropdownLayout?: DropdownLayout;
  dropdownItems?: DropdownItem[];
}

export interface CTAButton {
  text: string;
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
