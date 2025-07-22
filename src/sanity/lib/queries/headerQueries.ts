import { defineQuery } from "next-sanity";

export const HEADER_QUERY = defineQuery(`
  *[_type == 'header' && _id == $headerId][0] {
    _id,
    title,
    logo {
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
      alt,
      width,
      height
    },
    navigation[] {
      title,
      href,
      hasDropdown,
      dropdownItems[] {
        title,
        href,
        description
      }
    },
    ctaButtons[] {
      title,
      href,
      variant,
      openInNewTab
    },
    mobileSettings {
      showCTAInMobile,
      mobileMenuPosition
    }
  }
`);

export const DEFAULT_HEADER_QUERY = defineQuery(`
  *[_type == 'header'][0] {
    _id,
    title,
    logo {
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
      alt,
      width,
      height
    },
    navigation[] {
      title,
      href,
      hasDropdown,
      dropdownItems[] {
        title,
        href,
        description
      }
    },
    ctaButtons[] {
      title,
      href,
      variant,
      openInNewTab
    },
    mobileSettings {
      showCTAInMobile,
      mobileMenuPosition
    }
  }
`);

export const SITE_LAYOUT_HEADER_QUERY = defineQuery(`
  *[_type == 'siteLayout' && _id == 'siteLayout'][0] {
    sections[] {
      _type == 'headerSection' => {
        type,
        sticky,
        transparent,
        header-> {
          _id,
          title,
          logo {
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
            alt,
            width,
            height
          },
          navigation[] {
            title,
            href,
            hasDropdown,
            dropdownItems[] {
              title,
              href,
              description
            }
          },
          ctaButtons[] {
            title,
            href,
            variant,
            openInNewTab
          },
          mobileSettings {
            showCTAInMobile,
            mobileMenuPosition
          }
        }
      }
    }[_type == 'headerSection'][0]
  }
`);

export const ALL_HEADERS_QUERY = defineQuery(`
  *[_type == 'header'] | order(title asc) {
    _id,
    title
  }
`);
