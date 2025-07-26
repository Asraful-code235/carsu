import { defineField, defineType } from 'sanity';
import { UserIcon } from '@sanity/icons';

export const testimonialType = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Customer Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Job Title / Position',
      type: 'localeString',
      description: 'e.g., "Shop Owner", "Manager", etc.',
    }),
    defineField({
      name: 'company',
      title: 'Company / Shop Name',
      type: 'localeString',
    }),
    defineField({
      name: 'quote',
      title: 'Testimonial Quote',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
      description: 'Keep testimonials concise and impactful',
    }),
    defineField({
      name: 'avatar',
      title: 'Customer Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'localeString',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      options: {
        list: [
          { title: '5 Stars', value: 5 },
          { title: '4 Stars', value: 4 },
          { title: '3 Stars', value: 3 },
          { title: '2 Stars', value: 2 },
          { title: '1 Star', value: 1 },
        ],
      },
      initialValue: 5,
      validation: (Rule) => Rule.required().min(1).max(5),
    }),
    defineField({
      name: 'featured',
      title: 'Featured Testimonial',
      type: 'boolean',
      description: 'Mark as featured to prioritize in displays',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      name: 'name',
      company: 'company',
      quote: 'quote',
      avatar: 'avatar',
      rating: 'rating',
      featured: 'featured',
    },
    prepare({ name, company, quote, avatar, rating, featured }) {
      const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating);
      return {
        title: `${name}${company ? ` - ${company}` : ''}`,
        subtitle: `${stars} ${featured ? '⭐ Featured' : ''} - "${quote?.substring(0, 50)}..."`,
        media: avatar,
      };
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [
        { field: 'order', direction: 'asc' },
        { field: 'featured', direction: 'desc' },
      ],
    },
    {
      title: 'Rating (High to Low)',
      name: 'ratingDesc',
      by: [{ field: 'rating', direction: 'desc' }],
    },
  ],
});
