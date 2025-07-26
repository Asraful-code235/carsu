/**
 * Common query fragments for localized content
 * These fragments can be reused across different queries
 */

// Localized string fragment
export const LOCALE_STRING_FRAGMENT = `{
  en,
  es,
  it
}`;

// Localized SEO fields fragment
export const LOCALIZED_SEO_FRAGMENT = `{
  metaTitle ${LOCALE_STRING_FRAGMENT},
  metaDescription ${LOCALE_STRING_FRAGMENT},
  ogTitle ${LOCALE_STRING_FRAGMENT},
  ogDescription ${LOCALE_STRING_FRAGMENT},
  ogImage {
    asset-> {
      _id,
      url,
      metadata {
        dimensions {
          width,
          height
        }
      }
    },
    alt ${LOCALE_STRING_FRAGMENT}
  },
  noIndex,
  noFollow,
  canonicalUrl,
  keywords
}`;

// Localized image with alt fragment
export const LOCALIZED_IMAGE_FRAGMENT = `{
  image {
    asset-> {
      _id,
      url,
      metadata {
        dimensions {
          width,
          height
        }
      }
    }
  },
  alt ${LOCALE_STRING_FRAGMENT},
  caption ${LOCALE_STRING_FRAGMENT},
  width,
  height,
  priority
}`;

// Localized CTA button fragment
export const LOCALIZED_CTA_BUTTON_FRAGMENT = `{
  text ${LOCALE_STRING_FRAGMENT},
  href,
  variant,
  size,
  openInNewTab,
  icon,
  disabled
}`;

// Localized badge fragment
export const LOCALIZED_BADGE_FRAGMENT = `{
  text ${LOCALE_STRING_FRAGMENT},
  color,
  customColor {
    hex
  },
  variant,
  size
}`;

// Localized feature list item fragment
export const LOCALIZED_FEATURE_ITEM_FRAGMENT = `{
  text ${LOCALE_STRING_FRAGMENT},
  description ${LOCALE_STRING_FRAGMENT},
  icon,
  iconColor,
  highlighted,
  link {
    href,
    text ${LOCALE_STRING_FRAGMENT},
    openInNewTab
  }
}`;

// Localized testimonial fragment
export const LOCALIZED_TESTIMONIAL_FRAGMENT = `{
  _id,
  name,
  title ${LOCALE_STRING_FRAGMENT},
  company ${LOCALE_STRING_FRAGMENT},
  quote ${LOCALE_STRING_FRAGMENT},
  avatar {
    asset-> {
      _id,
      url
    },
    alt ${LOCALE_STRING_FRAGMENT}
  },
  rating,
  featured,
  order
}`;
