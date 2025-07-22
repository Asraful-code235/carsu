import { defineQuery } from "next-sanity";

export const HOME_PAGE_QUERY = defineQuery(`
  *[_type == 'page' && isHomePage == true][0] {
    _id,
    title,
    slug,
    isHomePage,
    seo {
      metaTitle,
      metaDescription,
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
        }
      }
    },
    sections[] {
      _type == 'heroSection' => {
        type,
        heading {
          line1,
          line2
        },
        subtitle,
        ctaButtons[] {
          text,
          href,
          variant
        },
        dashboardImage {
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
          alt
        },
        backgroundColor {
          hex,
          alpha,
          hsl {
            h,
            s,
            l,
            a
          },
          hsv {
            h,
            s,
            v,
            a
          },
          rgb {
            r,
            g,
            b,
            a
          }
        },
        backgroundElements[] {
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
          position {
            top,
            left,
            right,
            bottom
          },
          size,
          opacity,
          rotation
        }
      },
      _type == 'aboutSection' => {
        type,
        title,
        content
      }
    }
  }
`);

export const PAGE_BY_SLUG_QUERY = defineQuery(`
  *[_type == 'page' && slug.current == $slug][0] {
    _id,
    title,
    slug,
    isHomePage,
    seo {
      metaTitle,
      metaDescription,
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
        }
      }
    },
    sections[] {
      _type == 'heroSection' => {
        type,
        heading {
          line1,
          line2
        },
        subtitle,
        ctaButtons[] {
          text,
          href,
          variant
        },
        dashboardImage {
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
          alt
        },
        backgroundColor {
          hex,
          alpha,
          hsl {
            h,
            s,
            l,
            a
          },
          hsv {
            h,
            s,
            v,
            a
          },
          rgb {
            r,
            g,
            b,
            a
          }
        },
        backgroundElements[] {
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
          position {
            top,
            left,
            right,
            bottom
          },
          size,
          opacity,
          rotation
        }
      },
      _type == 'aboutSection' => {
        type,
        title,
        content
      }
    }
  }
`);

export const ALL_PAGES_QUERY = defineQuery(`
  *[_type == 'page'] | order(isHomePage desc, title asc) {
    _id,
    title,
    slug,
    isHomePage,
    sections
  }
`);
