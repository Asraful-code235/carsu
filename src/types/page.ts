import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

export interface SEOSettings {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: SanityImageSource;
}

export interface PageCTAButton {
  text: string;
  href: string;
  variant: 'primary' | 'secondary';
}

export interface BackgroundElement {
  image: SanityImageSource;
  position: {
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
  };
  size: 'sm' | 'md' | 'lg';
  opacity: number;
  rotation: number;
}

export interface HeroSection {
  type: 'hero';
  heading: {
    line1: string;
    line2: string;
  };
  subtitle: string;
  ctaButtons: PageCTAButton[];
  dashboardImage: {
    asset: SanityImageSource;
    alt: string;
  };
  backgroundColor?: {
    hex: string;
    alpha: number;
    hsl: {
      h: number;
      s: number;
      l: number;
      a: number;
    };
    hsv: {
      h: number;
      s: number;
      v: number;
      a: number;
    };
    rgb: {
      r: number;
      g: number;
      b: number;
      a: number;
    };
  };
  backgroundElements?: BackgroundElement[];
}

export interface AboutSection {
  type: 'about';
  title: string;
  content?: string;
}

export type PageSection = HeroSection | AboutSection;

export interface PageConfiguration {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  isHomePage: boolean;
  seo?: SEOSettings;
  sections: PageSection[];
}

export interface PageProps {
  data: PageConfiguration;
}
