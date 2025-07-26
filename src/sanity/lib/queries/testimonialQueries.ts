import { defineQuery } from "next-sanity";
import { LOCALIZED_TESTIMONIAL_FRAGMENT } from "./fragments";

export const ALL_TESTIMONIALS_QUERY = defineQuery(`
  *[_type == 'testimonial'] | order(order asc, featured desc, _createdAt desc) ${LOCALIZED_TESTIMONIAL_FRAGMENT}
`);

export const FEATURED_TESTIMONIALS_QUERY = defineQuery(`
  *[_type == 'testimonial' && featured == true] | order(order asc, _createdAt desc) ${LOCALIZED_TESTIMONIAL_FRAGMENT}
`);

export const TESTIMONIAL_BY_ID_QUERY = defineQuery(`
  *[_type == 'testimonial' && _id == $testimonialId][0] ${LOCALIZED_TESTIMONIAL_FRAGMENT}
`);
