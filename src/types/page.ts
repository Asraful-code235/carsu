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
  image: {
    asset: {
      _id: string;
      url: string;
      metadata?: {
        dimensions: {
          width: number;
          height: number;
        };
      };
    };
  };
  position: {
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
  };
  size: 'sm' | 'md' | 'lg' | 'xl';
  opacity: number;
  rotation: number;
  zIndex?: number;
}

export interface HeroSection {
  type: 'hero';
  heading: any[]; // Rich text array (Portable Text)
  subtitle: string;
  ctaButtons?: Array<{
    text: string;
    href: string;
    variant: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    openInNewTab: boolean;
    icon?: string;
    disabled?: boolean;
  }>;
  heroImage: {
    image: {
      asset: {
        _id: string;
        url: string;
        metadata?: {
          dimensions: {
            width: number;
            height: number;
          };
        };
      };
    };
    alt: string;
    caption?: string;
    width?: number;
    height?: number;
    priority?: boolean;
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
  settings?: {
    fullHeight?: boolean;
    centerContent?: boolean;
    showScrollIndicator?: boolean;
    parallaxEffect?: boolean;
  };
}

export interface AboutSection {
  type: 'about';
  title: string;
  content?: string;
}

export interface FeatureSection {
  type: 'feature';
  layout: 'contentLeft' | 'contentRight';
  title: any[];
  subtitle?: string;
  description?: any[];
  features?: Array<{
    text: string;
    icon: 'check' | 'star' | 'arrowRight' | 'plus';
  }>;
  ctaButtons?: Array<{
    text: string;
    href: string;
    variant: 'primary' | 'secondary' | 'outline' | 'ghost';
    openInNewTab: boolean;
  }>;
  image: {
    asset: {
      _id: string;
      url: string;
      metadata?: {
        dimensions: {
          width: number;
          height: number;
        };
      };
    };
    alt: string;
  };
  backgroundColor?: {
    hex: string;
  };
  padding: {
    top: string;
    bottom: string;
  };
}

export interface TestimonialsSection {
  type: 'testimonials';
  title: any[];
  subtitle?: string;
  testimonials: Array<{
    _id: string;
    name: string;
    title?: string;
    company?: string;
    quote: string;
    avatar?: {
      asset: {
        _id: string;
        url: string;
      };
      alt: string;
    };
    rating: number;
  }>;
  displaySettings: {
    itemsPerView: {
      mobile: number;
      tablet: number;
      desktop: number;
    };
    autoplay: boolean;
    autoplaySpeed: number;
    showDots: boolean;
    showArrows: boolean;
    infiniteLoop: boolean;
  };
  styling: {
    backgroundColor?: {
      hex: string;
    };
    textAlign: 'left' | 'center' | 'right';
    padding: {
      top: string;
      bottom: string;
    };
  };
}

export interface ServicesSection {
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
}

export interface PageHeroSection {
  type: 'pageHero';
  title: any[]; // Rich text array (Portable Text)
  description: any[]; // Rich text array (Portable Text)
  textAlign: 'left' | 'center' | 'right';
  backgroundColor?: {
    hex: string;
  };
  padding: {
    top: string;
    bottom: string;
  };
}

export interface ContentSection {
  type: 'content';
  content: any[]; // Rich text array (Portable Text)
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
  backgroundOverlay?: {
    color?: {
      hex: string;
    };
    opacity?: number;
  };
  sectionItems?: Array<{
    text: string;
    description?: string;
    icon: string;
    iconColor: 'primary' | 'success' | 'warning' | 'error' | 'gray';
    highlighted: boolean;
    link?: {
      href: string;
      text: string;
      openInNewTab: boolean;
    };
  }>;
  ctaButtons?: Array<{
    text: string;
    href: string;
    variant: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    openInNewTab: boolean;
    icon?: string;
    disabled?: boolean;
  }>;
  textAlign: 'left' | 'center' | 'right';
  backgroundColor?: {
    hex: string;
  };
  padding: {
    top: string;
    bottom: string;
  };
}

export type PageSection = HeroSection | AboutSection | PageHeroSection | ContentSection | FeatureSection | ServicesSection | TestimonialsSection;

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
