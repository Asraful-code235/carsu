/**
 * Footer-related GROQ queries for Sanity CMS
 */
import { LOCALE_STRING_FRAGMENT } from "./fragments";

export const FOOTER_QUERY = `*[_type == "footer"][0] {
  title,
  logo {
    image {
      asset-> {
        _id,
        url
      }
    },
    alt ${LOCALE_STRING_FRAGMENT},
    width,
    height
  },
  description,
  columns[] {
    title ${LOCALE_STRING_FRAGMENT},
    links[] {
      title ${LOCALE_STRING_FRAGMENT},
      href,
      openInNewTab
    }
  },
  socialLinks[] {
    platform,
    url
  },
  copyrightText ${LOCALE_STRING_FRAGMENT},
  showBackToTop,
  newsletter {
    enabled,
    title ${LOCALE_STRING_FRAGMENT},
    description ${LOCALE_STRING_FRAGMENT},
    placeholder ${LOCALE_STRING_FRAGMENT},
    buttonText ${LOCALE_STRING_FRAGMENT}
  }
}`;
