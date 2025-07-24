/**
 * Footer-related GROQ queries for Sanity CMS
 */

export const FOOTER_QUERY = `*[_type == "footer"][0] {
  title,
  logo {
    image {
      asset-> {
        _id,
        url
      }
    },
    alt,
    width,
    height
  },
  description,
  columns[] {
    title,
    links[] {
      title,
      href,
      openInNewTab
    }
  },
  socialLinks[] {
    platform,
    url
  },
  copyrightText,
  showBackToTop,
  newsletter {
    enabled,
    title,
    description,
    placeholder,
    buttonText
  }
}`;
