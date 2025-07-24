import { defineQuery } from "next-sanity";

export const ALL_TESTIMONIALS_QUERY = defineQuery(`
  *[_type == 'testimonial'] | order(order asc, featured desc, _createdAt desc) {
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
    rating,
    featured,
    order
  }
`);

export const FEATURED_TESTIMONIALS_QUERY = defineQuery(`
  *[_type == 'testimonial' && featured == true] | order(order asc, _createdAt desc) {
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
    rating,
    featured,
    order
  }
`);

export const TESTIMONIAL_BY_ID_QUERY = defineQuery(`
  *[_type == 'testimonial' && _id == $testimonialId][0] {
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
    rating,
    featured,
    order
  }
`);
