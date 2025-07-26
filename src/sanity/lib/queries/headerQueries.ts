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
      alt {
        en,
        es,
        it
      },
      width,
      height
    },
    navigation[] {
      title {
        en,
        es,
        it
      },
      href,
      hasDropdown,
      dropdownLayout {
        columns,
        showImages,
        width
      },
      dropdownItems[] {
        title {
          en,
          es,
          it
        },
        href,
        description {
          en,
          es,
          it
        },
        image {
          asset-> {
            _id,
            url
          },
          alt {
            en,
            es,
            it
          }
        },
        badge {
          text {
            en,
            es,
            it
          },
          color
        }
      }
    },
    ctaButtons[] {
      text {
        en,
        es,
        it
      },
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
      alt {
        en,
        es,
        it
      },
      width,
      height
    },
    navigation[] {
      title {
        en,
        es,
        it
      },
      href,
      hasDropdown,
      dropdownLayout {
        columns,
        showImages,
        width
      },
      dropdownItems[] {
        title {
          en,
          es,
          it
        },
        href,
        description {
          en,
          es,
          it
        },
        image {
          asset-> {
            _id,
            url
          },
          alt {
            en,
            es,
            it
          }
        },
        badge {
          text {
            en,
            es,
            it
          },
          color
        }
      }
    },
    ctaButtons[] {
      text {
        en,
        es,
        it
      },
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
            alt {
              en,
              es,
              it
            },
            width,
            height
          },
          navigation[] {
            title {
              en,
              es,
              it
            },
            href,
            hasDropdown,
            dropdownLayout {
              columns,
              showImages,
              width
            },
            dropdownItems[] {
              title {
                en,
                es,
                it
              },
              href,
              description {
                en,
                es,
                it
              },
              image {
                asset-> {
                  _id,
                  url
                },
                alt {
                  en,
                  es,
                  it
                }
              },
              badge {
                text {
                  en,
                  es,
                  it
                },
                color
              }
            }
          },
          ctaButtons[] {
            text {
              en,
              es,
              it
            },
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
