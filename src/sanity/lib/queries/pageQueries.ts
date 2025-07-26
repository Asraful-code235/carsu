import { defineQuery } from "next-sanity";
import { 
  LOCALE_STRING_FRAGMENT, 
  LOCALIZED_SEO_FRAGMENT, 
  LOCALIZED_IMAGE_FRAGMENT, 
  LOCALIZED_CTA_BUTTON_FRAGMENT,
  LOCALIZED_BADGE_FRAGMENT,
  LOCALIZED_FEATURE_ITEM_FRAGMENT,
  LOCALIZED_TESTIMONIAL_FRAGMENT
} from "./fragments";

// Common section fragments
const HERO_SECTION_FRAGMENT = `
  _type == 'heroSection' => {
    type,
    heading,
    subtitle ${LOCALE_STRING_FRAGMENT},
    ctaButtons[] ${LOCALIZED_CTA_BUTTON_FRAGMENT},
    heroImage ${LOCALIZED_IMAGE_FRAGMENT},
    backgroundColor {
      hex,
      alpha,
      hsl { h, s, l, a },
      hsv { h, s, v, a },
      rgb { r, g, b, a }
    },
    backgroundElements[] {
      image {
        asset-> {
          _id,
          url,
          metadata {
            dimensions { width, height }
          }
        }
      },
      position { top, left, right, bottom },
      size,
      opacity,
      rotation,
      zIndex
    },
    settings {
      fullHeight,
      centerContent,
      showScrollIndicator,
      parallaxEffect
    }
  }
`;

const FEATURE_SECTION_FRAGMENT = `
  _type == 'featureSection' => {
    type,
    layout,
    badge ${LOCALIZED_BADGE_FRAGMENT},
    title,
    subtitle ${LOCALE_STRING_FRAGMENT},
    description,
    features[] ${LOCALIZED_FEATURE_ITEM_FRAGMENT},
    subdescription,
    ctaButtons[] ${LOCALIZED_CTA_BUTTON_FRAGMENT},
    image ${LOCALIZED_IMAGE_FRAGMENT},
    backgroundColor { hex },
    padding { top, bottom },
    settings {
      fullWidth,
      centerContent,
      imageAspectRatio,
      textAlignment { desktop, mobile }
    }
  }
`;

const TESTIMONIAL_SECTION_FRAGMENT = `
  _type == 'testimonialSection' => {
    type,
    title,
    subtitle ${LOCALE_STRING_FRAGMENT},
    testimonials[]-> ${LOCALIZED_TESTIMONIAL_FRAGMENT},
    displaySettings {
      itemsPerView { mobile, tablet, desktop },
      autoplay,
      autoplaySpeed,
      showDots,
      showArrows,
      infiniteLoop
    },
    styling {
      backgroundColor { hex },
      textAlign,
      padding { top, bottom }
    }
  }
`;

const TRY_CARSU_BANNER_FRAGMENT = `
  _type == 'tryCarsuBanner' => {
    type,
    title,
    description,
    ctaButton ${LOCALIZED_CTA_BUTTON_FRAGMENT},
    backgroundColor { hex },
    mainImage ${LOCALIZED_IMAGE_FRAGMENT},
    glowImage ${LOCALIZED_IMAGE_FRAGMENT},
    padding { top, bottom, left, right },
    settings {
      fullWidth,
      borderRadius,
      textAlignment { desktop, mobile },
      imagePosition
    }
  }
`;

const CONTENT_SECTION_FRAGMENT = `
  _type == 'contentSection' => {
    type,
    content,
    isContentCenter,
    backgroundImage {
      image {
        asset-> { _id, url }
      },
      alt ${LOCALE_STRING_FRAGMENT},
      position,
      size,
      opacity,
      repeat
    },
    backgroundOverlay {
      color { hex },
      opacity
    },
    sectionItems[] ${LOCALIZED_FEATURE_ITEM_FRAGMENT},
    ctaButtons[] ${LOCALIZED_CTA_BUTTON_FRAGMENT},
    textAlign,
    backgroundColor { hex },
    padding { top, bottom }
  }
`;

const PAGE_HERO_SECTION_FRAGMENT = `
  _type == 'pageHeroSection' => {
    type,
    title ${LOCALE_STRING_FRAGMENT},
    description ${LOCALE_STRING_FRAGMENT},
    textAlign,
    backgroundColor { hex },
    padding { top, bottom }
  }
`;

const ABOUT_SECTION_FRAGMENT = `
  _type == 'aboutSection' => {
    type,
    title,
    content
  }
`;

// Combined sections fragment
const ALL_SECTIONS_FRAGMENT = `
  sections[] {
    ${HERO_SECTION_FRAGMENT},
    ${FEATURE_SECTION_FRAGMENT},
    ${TESTIMONIAL_SECTION_FRAGMENT},
    ${TRY_CARSU_BANNER_FRAGMENT},
    ${CONTENT_SECTION_FRAGMENT},
    ${PAGE_HERO_SECTION_FRAGMENT},
    ${ABOUT_SECTION_FRAGMENT}
  }
`;

export const HOME_PAGE_QUERY = defineQuery(`
  *[_type == 'page' && isHomePage == true][0] {
    _id,
    title ${LOCALE_STRING_FRAGMENT},
    slug,
    isHomePage,
    seo ${LOCALIZED_SEO_FRAGMENT},
    ${ALL_SECTIONS_FRAGMENT}
  }
`);

export const PAGE_BY_SLUG_QUERY = defineQuery(`
  *[_type == 'page' && slug.current == $slug][0] {
    _id,
    title ${LOCALE_STRING_FRAGMENT},
    slug,
    isHomePage,
    seo ${LOCALIZED_SEO_FRAGMENT},
    ${ALL_SECTIONS_FRAGMENT}
  }
`);

export const ALL_PAGES_QUERY = defineQuery(`
  *[_type == 'page'] | order(isHomePage desc, title.en asc) {
    _id,
    title ${LOCALE_STRING_FRAGMENT},
    slug,
    isHomePage,
    sections
  }
`);
