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

export interface ProductHeroSection {
  type: 'productHero';
  pillText?: any; // Localized string
  title: any; // Localized rich text object
  subtitle?: any; // Localized string
  description?: any; // Localized rich text object
  ctaButtons?: Array<{
    text: any; // Localized string
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
    alt?: any; // Localized string
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

export interface ProductFeatureSection {
  type: 'productFeature';
  image: {
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
    alt?: any; // Localized string
    caption?: string;
    width?: number;
    height?: number;
    priority?: boolean;
  };
  content: any; // Localized rich text object
  layout?: 'imageLeft' | 'contentLeft';
  backgroundColor?: {
    hex: string;
  };
  padding?: {
    top: string;
    bottom: string;
  };
  settings?: {
    maxWidth?: string;
    horizontalPadding?: string;
    gap?: string;
  };
}

export interface ProductInteractiveSection {
  type: 'productInteractive';
  title: any; // Localized rich text
  items: Array<{
    title: any; // Localized string
    content: any; // Localized rich text
    image?: {
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
      alt?: any; // Localized string
      caption?: string;
      width?: number;
      height?: number;
      priority?: boolean;
    };
  }>;
  backgroundColor?: {
    hex: string;
  };
  padding?: {
    top: string;
    bottom: string;
  };
  settings?: {
    defaultActiveItem?: number;
    animationDuration?: string;
  };
}

export interface AboutSection {
  type: 'about';
  title: any; // Localized rich text object
  subtitle?: string;
  content?: any; // Localized rich text object
  layout?: 'textOnly' | 'textWithImage' | 'twoColumns';
  image?: {
    image?: {
      asset?: {
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
    alt?: string;
    caption?: string;
    width?: number;
    height?: number;
    priority?: boolean;
  };
  imagePosition?: 'contentLeft' | 'contentRight';
  stats?: Array<{
    number: string;
    label: string;
    description?: string;
  }>;
  textAlign?: 'left' | 'center' | 'right';
  backgroundColor?: {
    hex: string;
  };
  padding?: {
    top: string;
    bottom: string;
  };
}

export interface FeatureSection {
  type: 'feature';
  layout: 'contentLeft' | 'contentRight';
  badge?: {
    text: string;
    color: 'primary' | 'success' | 'warning' | 'error' | 'info' | 'purple' | 'pink' | 'indigo' | 'gray' | 'custom';
    customColor?: {
      hex: string;
    };
    variant: 'filled' | 'outline' | 'soft';
    size: 'sm' | 'md' | 'lg';
  };
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
  isContentCenter?: boolean;
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

export interface TryCarsuBannerSection {
  type: 'tryCarsuBanner';
  title?: any[]; // Rich text array
  description?: any[]; // Rich text array
  ctaButton?: {
    text: string;
    href: string;
    variant: 'primary' | 'secondary' | 'outline' | 'ghost';
    openInNewTab: boolean;
  };
  backgroundColor?: {
    hex: string;
  };
  mainImage?: {
    image: {
      asset: {
        _id: string;
        url: string;
      };
    };
    alt: string;
  };
  glowImage?: {
    image: {
      asset: {
        _id: string;
        url: string;
      };
    };
    alt: string;
  };
  padding?: {
    top: string;
    bottom: string;
    left: string;
    right: string;
  };
  settings?: {
    fullWidth?: boolean;
    borderRadius?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
    textAlignment?: {
      desktop: 'left' | 'center';
      mobile: 'left' | 'center';
    };
    imagePosition?: 'left' | 'right';
  };
}

export interface ContactFormSection {
  type: 'contactForm';
  title?: any[]; // Rich text array
  badge?: {
    text: string;
    color: 'primary' | 'success' | 'warning' | 'error' | 'info' | 'purple' | 'pink' | 'indigo' | 'gray' | 'custom';
    customColor?: {
      hex: string;
    };
    variant: 'filled' | 'outline' | 'soft';
    size: 'sm' | 'md' | 'lg';
  };
  features?: Array<{
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
  formHeading?: any[]; // Rich text array
  formFields: Array<{
    name: string;
    label: string;
    placeholder: string;
    type: 'text' | 'email' | 'tel' | 'textarea';
    required: boolean;
    width: 'half' | 'full';
  }>;
  submitButton: {
    text: string;
    href: string;
    variant: 'primary' | 'secondary' | 'outline' | 'ghost';
    openInNewTab: boolean;
  };
  backgroundColor?: {
    hex: string;
  };
  padding?: {
    top: string;
    bottom: string;
  };
  settings?: {
    layout: 'contentLeft' | 'contentRight';
    fullWidth?: boolean;
  };
}

export interface FAQSection {
  type: 'faq';
  title?: any[]; // Rich text array
  description?: any[]; // Rich text array
  faqCategories: Array<{
    categoryName: string;
    questions: Array<{
      question: string;
      answer: any[]; // Rich text array
      featured: boolean;
    }>;
  }>;
  backgroundColor?: {
    hex: string;
  };
  padding?: {
    top: string;
    bottom: string;
  };
  settings?: {
    layout: 'sideBySide' | 'twoColumn' | 'singleColumn' | 'tabbed';
    showCategoryTabs?: boolean;
    allowMultipleOpen?: boolean;
    highlightFeatured?: boolean;
    fullWidth?: boolean;
  };
}

export type PageSection = HeroSection | ProductHeroSection | ProductFeatureSection | ProductInteractiveSection | AboutSection | PageHeroSection | ContentSection | FeatureSection | ServicesSection | TestimonialsSection | TryCarsuBannerSection | ContactFormSection | FAQSection;

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
