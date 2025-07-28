import { defineField, defineType } from 'sanity';
import { UsersIcon } from '@sanity/icons';
import { alignmentOptions } from '../shared/spacingOptions';

export const testimonialSectionType = defineType({
  name: 'testimonialSection',
  title: 'Testimonials Section',
  type: 'object',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'type',
      title: 'Section Type',
      type: 'string',
      readOnly: true,
      initialValue: 'testimonials',
    }),
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'localeRichTextBlock',
      description: 'Main title for the testimonials section (localized)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'localeString',
      description: 'Optional subtitle below the main title',
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'testimonial' }],
        },
      ],
      validation: (Rule) => Rule.required().min(2).max(10),
      description: 'Select testimonials to display (2-10 recommended)',
    }),
    defineField({
      name: 'displaySettings',
      title: 'Display Settings',
      type: 'object',
      fields: [
        defineField({
          name: 'itemsPerView',
          title: 'Items Per View',
          type: 'object',
          fields: [
            defineField({
              name: 'mobile',
              title: 'Mobile (1 item recommended)',
              type: 'number',
              initialValue: 1,
              validation: (Rule) => Rule.min(1).max(2),
            }),
            defineField({
              name: 'tablet',
              title: 'Tablet',
              type: 'number',
              initialValue: 2,
              validation: (Rule) => Rule.min(1).max(3),
            }),
            defineField({
              name: 'desktop',
              title: 'Desktop',
              type: 'number',
              initialValue: 2,
              validation: (Rule) => Rule.min(1).max(4),
            }),
          ],
        }),
        defineField({
          name: 'autoplay',
          title: 'Auto-play Carousel',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'autoplaySpeed',
          title: 'Auto-play Speed (seconds)',
          type: 'number',
          initialValue: 5,
          validation: (Rule) => Rule.min(2).max(10),
          hidden: ({ parent }) => !parent?.autoplay,
        }),
        defineField({
          name: 'showDots',
          title: 'Show Navigation Dots',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'showArrows',
          title: 'Show Navigation Arrows',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'infiniteLoop',
          title: 'Infinite Loop',
          type: 'boolean',
          initialValue: true,
        }),
      ],
      initialValue: {
        itemsPerView: {
          mobile: 1,
          tablet: 2,
          desktop: 2,
        },
        autoplay: true,
        autoplaySpeed: 5,
        showDots: true,
        showArrows: true,
        infiniteLoop: true,
      },
    }),
    defineField({
      name: 'styling',
      title: 'Section Styling',
      type: 'object',
      fields: [
        defineField({
          name: 'backgroundColor',
          title: 'Background Color',
          type: 'backgroundColor',
        }),
        defineField({
          name: 'textAlign',
          title: 'Text Alignment',
          type: 'string',
          options: {
            list: alignmentOptions,
          },
          initialValue: 'center',
        }),
        defineField({
          name: 'padding',
          title: 'Section Spacing',
          type: 'paddingControls',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      testimonials: 'testimonials',
    },
    prepare({ title, testimonials }) {
      // Extract plain text from rich text for preview
      const titleText = title?.[0]?.children?.map((child: any) => child.text).join('') || 'Testimonials Section';
      const count = testimonials?.length || 0;
      return {
        title: titleText,
        subtitle: `${count} testimonial${count !== 1 ? 's' : ''}`,
      };
    },
  },
});
