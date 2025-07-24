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
        heading,
        subtitle,
        ctaButtons[] {
          text,
          href,
          variant,
          size,
          openInNewTab,
          icon,
          disabled
        },
        heroImage {
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
          caption,
          width,
          height,
          priority
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
          rotation,
          zIndex
        },
        settings {
          fullHeight,
          centerContent,
          showScrollIndicator,
          parallaxEffect
        }
      },
      _type == 'aboutSection' => {
        type,
        title,
        content
      },
      _type == 'pageHeroSection' => {
        type,
        title,
        description,
        textAlign,
        backgroundColor {
          hex
        },
        padding {
          top,
          bottom
        }
      },
      _type == 'contentSection' => {
        type,
        content,
        backgroundImage {
          image {
            asset-> {
              _id,
              url
            }
          },
          alt,
          position,
          size,
          opacity,
          repeat
        },
        backgroundOverlay {
          color {
            hex
          },
          opacity
        },
        sectionItems[] {
          text,
          description,
          icon,
          iconColor,
          highlighted,
          link {
            href,
            text,
            openInNewTab
          }
        },
        ctaButtons[] {
          text,
          href,
          variant,
          size,
          openInNewTab,
          icon,
          disabled
        },
        textAlign,
        backgroundColor {
          hex
        },
        padding {
          top,
          bottom
        }
      },
      _type == 'featureSection' => {
        type,
        layout,
        badge {
          text,
          color,
          customColor {
            hex
          },
          variant,
          size
        },
        title,
        subtitle,
        description,
        features[] {
          text,
          icon
        },
        subdescription,
        ctaButtons[] {
          text,
          href,
          variant,
          openInNewTab
        },
        image {
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
          caption,
          width,
          height,
          priority
        },
        backgroundColor {
          hex
        },
        padding {
          top,
          bottom
        },
        settings {
          fullWidth,
          centerContent,
          imageAspectRatio,
          textAlignment {
            desktop,
            mobile
          }
        }
      },
      _type == 'servicesSection' => {
        type,
        title,
        description,
        services[] {
          title,
          description,
          icon
        },
        backgroundColor {
          hex
        },
        backgroundImage {
          image {
            asset-> {
              _id,
              url
            }
          },
          alt,
          position,
          size,
          opacity,
          repeat
        },
        padding {
          top,
          bottom
        },
        settings {
          layout,
          textAlignment {
            desktop,
            mobile
          }
        }
      },
      _type == 'testimonialSection' => {
        type,
        title,
        subtitle,
        testimonials[]-> {
          _id,
          name,
          title,
          company,
          quote,
          avatar {
            asset-> {
              _id,
              url
            },
            alt
          },
          rating
        },
        displaySettings {
          itemsPerView {
            mobile,
            tablet,
            desktop
          },
          autoplay,
          autoplaySpeed,
          showDots,
          showArrows,
          infiniteLoop
        },
        styling {
          backgroundColor {
            hex
          },
          textAlign,
          padding {
            top,
            bottom
          }
        }
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
        heading,
        subtitle,
        ctaButtons[] {
          text,
          href,
          variant,
          size,
          openInNewTab,
          icon,
          disabled
        },
        heroImage {
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
          caption,
          width,
          height,
          priority
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
          rotation,
          zIndex
        },
        settings {
          fullHeight,
          centerContent,
          showScrollIndicator,
          parallaxEffect
        }
      },
      _type == 'aboutSection' => {
        type,
        title,
        content
      },
      _type == 'pageHeroSection' => {
        type,
        title,
        description,
        textAlign,
        backgroundColor {
          hex
        },
        padding {
          top,
          bottom
        }
      },
      _type == 'contentSection' => {
        type,
        content,
        backgroundImage {
          image {
            asset-> {
              _id,
              url
            }
          },
          alt,
          position,
          size,
          opacity,
          repeat
        },
        backgroundOverlay {
          color {
            hex
          },
          opacity
        },
        sectionItems[] {
          text,
          description,
          icon,
          iconColor,
          highlighted,
          link {
            href,
            text,
            openInNewTab
          }
        },
        ctaButtons[] {
          text,
          href,
          variant,
          size,
          openInNewTab,
          icon,
          disabled
        },
        textAlign,
        backgroundColor {
          hex
        },
        padding {
          top,
          bottom
        }
      },
      _type == 'featureSection' => {
        type,
        layout,
        badge {
          text,
          color,
          customColor {
            hex
          },
          variant,
          size
        },
        title,
        subtitle,
        description,
        features[] {
          text,
          icon
        },
        subdescription,
        ctaButtons[] {
          text,
          href,
          variant,
          openInNewTab
        },
        image {
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
          caption,
          width,
          height,
          priority
        },
        backgroundColor {
          hex
        },
        padding {
          top,
          bottom
        },
        settings {
          fullWidth,
          centerContent,
          imageAspectRatio,
          textAlignment {
            desktop,
            mobile
          }
        }
      },
      _type == 'servicesSection' => {
        type,
        title,
        description,
        services[] {
          title,
          description,
          icon
        },
        backgroundColor {
          hex
        },
        backgroundImage {
          image {
            asset-> {
              _id,
              url
            }
          },
          alt,
          position,
          size,
          opacity,
          repeat
        },
        padding {
          top,
          bottom
        },
        settings {
          layout,
          textAlignment {
            desktop,
            mobile
          }
        }
      },
      _type == 'testimonialSection' => {
        type,
        title,
        subtitle,
        testimonials[]-> {
          _id,
          name,
          title,
          company,
          quote,
          avatar {
            asset-> {
              _id,
              url
            },
            alt
          },
          rating
        },
        displaySettings {
          itemsPerView {
            mobile,
            tablet,
            desktop
          },
          autoplay,
          autoplaySpeed,
          showDots,
          showArrows,
          infiniteLoop
        },
        styling {
          backgroundColor {
            hex
          },
          textAlign,
          padding {
            top,
            bottom
          }
        }
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
