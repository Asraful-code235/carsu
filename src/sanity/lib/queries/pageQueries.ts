import { defineQuery } from "next-sanity";
import {
  LOCALE_STRING_FRAGMENT,
  LOCALE_RICH_TEXT_FRAGMENT,
  LOCALIZED_SEO_FRAGMENT,
  LOCALIZED_IMAGE_FRAGMENT,
  LOCALIZED_VIDEO_FRAGMENT,
  LOCALIZED_CTA_BUTTON_FRAGMENT,
  LOCALIZED_BADGE_FRAGMENT,
  LOCALIZED_FEATURE_ITEM_FRAGMENT,
  LOCALIZED_TESTIMONIAL_FRAGMENT
} from "./fragments";

// Common section fragments
const HERO_SECTION_FRAGMENT = `
  _type == 'heroSection' => {
    type,
    heading ${LOCALE_RICH_TEXT_FRAGMENT},
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

const PRODUCT_HERO_SECTION_FRAGMENT = `
  _type == 'productHeroSection' => {
    type,
    pillText ${LOCALE_STRING_FRAGMENT},
    title ${LOCALE_RICH_TEXT_FRAGMENT},
    subtitle ${LOCALE_STRING_FRAGMENT},
    description ${LOCALE_RICH_TEXT_FRAGMENT},
    ctaButtons[] ${LOCALIZED_CTA_BUTTON_FRAGMENT},
    heroVideo ${LOCALIZED_VIDEO_FRAGMENT},
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

const PRODUCT_FEATURE_SECTION_FRAGMENT = `
  _type == 'productFeatureSection' => {
    type,
    image ${LOCALIZED_IMAGE_FRAGMENT},
    content ${LOCALE_RICH_TEXT_FRAGMENT},
    layout,
    backgroundColor { hex },
    padding { top, bottom },
    settings {
      maxWidth,
      horizontalPadding,
      gap
    }
  }
`;

const PRODUCT_INTERACTIVE_SECTION_FRAGMENT = `
  _type == 'productInteractiveSection' => {
    type,
    title ${LOCALE_RICH_TEXT_FRAGMENT},
    items[] {
      title ${LOCALE_STRING_FRAGMENT},
      content ${LOCALE_RICH_TEXT_FRAGMENT},
      image ${LOCALIZED_IMAGE_FRAGMENT}
    },
    backgroundColor { hex },
    padding { top, bottom },
    settings {
      defaultActiveItem,
      animationDuration
    }
  }
`;

const PRODUCT_BANNER_SECTION_FRAGMENT = `
  _type == 'productBannerSection' => {
    type,
    title ${LOCALE_RICH_TEXT_FRAGMENT},
    description ${LOCALE_RICH_TEXT_FRAGMENT},
    primaryButton ${LOCALIZED_CTA_BUTTON_FRAGMENT},
    secondaryButton ${LOCALIZED_CTA_BUTTON_FRAGMENT},
    backgroundStyle {
      type,
      primaryColor { hex },
      secondaryColor { hex },
      gradientDirection,
      backgroundImage ${LOCALIZED_IMAGE_FRAGMENT},
      overlay {
        enabled,
        color { hex },
        opacity
      }
    },
    textAlignment { desktop, mobile },
    padding { top, bottom },
    borderRadius
  }
`;

const PRODUCT_PROMOTION_BANNER_SECTION_FRAGMENT = `
  _type == 'productPromotionBannerSection' => {
    type,
    badge ${LOCALIZED_BADGE_FRAGMENT},
    title ${LOCALE_RICH_TEXT_FRAGMENT},
    subtitle ${LOCALE_RICH_TEXT_FRAGMENT},
    description ${LOCALE_RICH_TEXT_FRAGMENT},
    primaryButton ${LOCALIZED_CTA_BUTTON_FRAGMENT},
    secondaryButton ${LOCALIZED_CTA_BUTTON_FRAGMENT},
    backgroundImage ${LOCALIZED_IMAGE_FRAGMENT},
    overlay {
      enabled,
      color { hex },
      opacity
    },
    textAlignment { desktop, mobile },
    height,
    padding { top, bottom },
    borderRadius
  }
`;

const FEATURE_SECTION_FRAGMENT = `
  _type == 'featureSection' => {
    type,
    layout,
    badge ${LOCALIZED_BADGE_FRAGMENT},
    title ${LOCALE_RICH_TEXT_FRAGMENT},
    subtitle ${LOCALE_STRING_FRAGMENT},
    description ${LOCALE_RICH_TEXT_FRAGMENT},
    features[] ${LOCALIZED_FEATURE_ITEM_FRAGMENT},
    subdescription ${LOCALE_RICH_TEXT_FRAGMENT},
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
    title ${LOCALE_RICH_TEXT_FRAGMENT},
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
    content ${LOCALE_RICH_TEXT_FRAGMENT},
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
    title ${LOCALE_RICH_TEXT_FRAGMENT},
    description ${LOCALE_RICH_TEXT_FRAGMENT},
    textAlign,
    cards[] {
      icon ${LOCALIZED_IMAGE_FRAGMENT},
      title ${LOCALE_STRING_FRAGMENT}
    },
    backgroundColor { hex },
    padding { top, bottom }
  }
`;

const ABOUT_SECTION_FRAGMENT = `
  _type == 'aboutSection' => {
    type,
    title ${LOCALE_RICH_TEXT_FRAGMENT},
    content ${LOCALE_RICH_TEXT_FRAGMENT}
  }
`;

const SERVICES_SECTION_FRAGMENT = `
  _type == 'servicesSection' => {
    type,
    title ${LOCALE_RICH_TEXT_FRAGMENT},
    description ${LOCALE_RICH_TEXT_FRAGMENT},
    services[] {
      title,
      description,
      icon
    },
    backgroundColor { hex },
    padding { top, bottom },
    settings {
      textAlignment { desktop, mobile }
    }
  }
`;

const FAQ_SECTION_FRAGMENT = `
  _type == 'faqSection' => {
    type,
    title ${LOCALE_RICH_TEXT_FRAGMENT},
    description ${LOCALE_RICH_TEXT_FRAGMENT},
    faqCategories[] {
      categoryName,
      questions[] {
        question,
        answer ${LOCALE_RICH_TEXT_FRAGMENT},
        featured
      }
    },
    backgroundColor { hex },
    padding { top, bottom },
    settings {
      layout,
      showCategoryTabs,
      allowMultipleOpen,
      highlightFeatured,
      fullWidth
    }
  }
`;

const CONTACT_FORM_SECTION_FRAGMENT = `
  _type == 'contactFormSection' => {
    type,
    title ${LOCALE_RICH_TEXT_FRAGMENT},
    badge ${LOCALIZED_BADGE_FRAGMENT},
    features[] ${LOCALIZED_FEATURE_ITEM_FRAGMENT},
    formHeading ${LOCALE_RICH_TEXT_FRAGMENT},
    formFields[] {
      name,
      label,
      type,
      required,
      placeholder,
      options[]
    },
    submitButton {
      text ${LOCALE_STRING_FRAGMENT},
      href,
      variant,
      openInNewTab
    },
    backgroundColor { hex },
    padding { top, bottom },
    settings {
      layout,
      formWidth,
      showFeatures
    }
  }
`;

const PRICING_CALCULATOR_SECTION_FRAGMENT = `
  _type == 'pricingCalculatorSection' => {
    type,
    badge ${LOCALIZED_BADGE_FRAGMENT},
    title ${LOCALE_RICH_TEXT_FRAGMENT},
    subtitle ${LOCALE_RICH_TEXT_FRAGMENT},
    calculatorTitle ${LOCALE_STRING_FRAGMENT},
    serviceSelectPlaceholder ${LOCALE_STRING_FRAGMENT},
    optionSelectPlaceholder ${LOCALE_STRING_FRAGMENT},
    vehicleInfoTitle ${LOCALE_STRING_FRAGMENT},
    makeModelPlaceholder ${LOCALE_STRING_FRAGMENT},
    mileagePlaceholder ${LOCALE_STRING_FRAGMENT},
    estimateButtonText ${LOCALE_STRING_FRAGMENT},
    totalLabel ${LOCALE_STRING_FRAGMENT},
    discountLabel ${LOCALE_STRING_FRAGMENT},
    vatLabel ${LOCALE_STRING_FRAGMENT},
    backgroundColor { hex },
    padding { top, bottom }
  }
`;

const FEATURE_CARDS_SECTION_FRAGMENT = `
  _type == 'featureCardsSection' => {
    type,
    title ${LOCALE_RICH_TEXT_FRAGMENT},
    subtitle ${LOCALE_RICH_TEXT_FRAGMENT},
    featureCards[] {
      icon ${LOCALIZED_IMAGE_FRAGMENT},
      iconBackgroundColor,
      title ${LOCALE_STRING_FRAGMENT},
      description ${LOCALE_STRING_FRAGMENT}
    },
    layout {
      columns,
      cardSpacing
    },
    textAlignment { desktop, mobile },
    backgroundColor { hex },
    padding { top, bottom }
  }
`;

const PRODUCT_FEATURES_GRID_SECTION_FRAGMENT = `
  _type == 'productFeaturesGridSection' => {
    type,
    featureItems[] {
      title ${LOCALE_RICH_TEXT_FRAGMENT},
      description ${LOCALE_RICH_TEXT_FRAGMENT},
      features[] {
        text ${LOCALE_STRING_FRAGMENT},
        icon
      },
      image ${LOCALIZED_IMAGE_FRAGMENT},
      imageSize
    },
    backgroundColor { hex },
    padding { top, bottom }
  }
`;

const PRODUCT_BENEFITS_LIST_SECTION_FRAGMENT = `
  _type == 'productBenefitsListSection' => {
    type,
    title ${LOCALE_RICH_TEXT_FRAGMENT},
    description ${LOCALE_RICH_TEXT_FRAGMENT},
    benefits[] {
      title ${LOCALE_STRING_FRAGMENT},
      description ${LOCALE_RICH_TEXT_FRAGMENT},
      image ${LOCALIZED_IMAGE_FRAGMENT}
    },
    layout,
    backgroundColor { hex },
    padding { top, bottom }
  }
`;

const PRICING_SECTION_FRAGMENT = `
  _type == 'pricingSection' => {
    type,
    title ${LOCALE_RICH_TEXT_FRAGMENT},
    subtitle ${LOCALE_STRING_FRAGMENT},
    billingToggle {
      yearlyText ${LOCALE_STRING_FRAGMENT},
      monthlyText ${LOCALE_STRING_FRAGMENT}
    },
    pricingPlans[] {
      name ${LOCALE_STRING_FRAGMENT},
      price ${LOCALE_STRING_FRAGMENT},
      period ${LOCALE_STRING_FRAGMENT},
      description ${LOCALE_STRING_FRAGMENT},
      subdescription ${LOCALE_STRING_FRAGMENT},
      features[] {
        text ${LOCALE_RICH_TEXT_FRAGMENT},
        included
      },
      ctaButton ${LOCALIZED_CTA_BUTTON_FRAGMENT},
      isPopular
    },
    backgroundColor { hex },
    padding { top, bottom }
  }
`;

// Combined sections fragment
const ALL_SECTIONS_FRAGMENT = `
  sections[] {
    ${HERO_SECTION_FRAGMENT},
    ${PRODUCT_HERO_SECTION_FRAGMENT},
    ${PRODUCT_FEATURE_SECTION_FRAGMENT},
    ${PRODUCT_INTERACTIVE_SECTION_FRAGMENT},
    ${PRODUCT_BANNER_SECTION_FRAGMENT},
    ${PRODUCT_PROMOTION_BANNER_SECTION_FRAGMENT},
    ${FEATURE_SECTION_FRAGMENT},
    ${TESTIMONIAL_SECTION_FRAGMENT},
    ${TRY_CARSU_BANNER_FRAGMENT},
    ${CONTENT_SECTION_FRAGMENT},
    ${PAGE_HERO_SECTION_FRAGMENT},
    ${ABOUT_SECTION_FRAGMENT},
    ${SERVICES_SECTION_FRAGMENT},
    ${FAQ_SECTION_FRAGMENT},
    ${CONTACT_FORM_SECTION_FRAGMENT},
    ${PRICING_CALCULATOR_SECTION_FRAGMENT},
    ${FEATURE_CARDS_SECTION_FRAGMENT},
    ${PRODUCT_FEATURES_GRID_SECTION_FRAGMENT},
    ${PRODUCT_BENEFITS_LIST_SECTION_FRAGMENT},
    ${PRICING_SECTION_FRAGMENT}
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
