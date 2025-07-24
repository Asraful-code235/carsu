import { defineField, defineType } from 'sanity';
import { RocketIcon } from '@sanity/icons';

export const tryCarsuBannerType = defineType({
  name: 'tryCarsuBanner',
  title: 'Try Carsu Banner',
  type: 'object',
  icon: RocketIcon,
  fields: [
    defineField({
      name: 'type',
      title: 'Section Type',
      type: 'string',
      readOnly: true,
      initialValue: 'tryCarsuBanner',
    }),
    defineField({
      name: 'title',
      title: 'Banner Title',
      type: 'richTextBlock',
      description: 'Main heading for the banner',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'richTextBlock',
      description: 'Supporting text below the title',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ctaButton',
      title: 'Call-to-Action Button',
      type: 'ctaButton',
      description: 'Primary action button',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'backgroundColor',
      description: 'Banner background color',
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'imageWithAlt',
      description: 'Main image displayed on the right side',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'glowImage',
      title: 'Glow Effect Image',
      type: 'imageWithAlt',
      description: 'Optional glow effect image that appears at the top',
    }),
    defineField({
      name: 'padding',
      title: 'Section Spacing',
      type: 'paddingControls',
    }),
    defineField({
      name: 'settings',
      title: 'Banner Settings',
      type: 'object',
      fields: [
        defineField({
          name: 'fullWidth',
          title: 'Full Width Banner',
          type: 'boolean',
          initialValue: false,
          description: 'Extend banner to full browser width',
        }),
        defineField({
          name: 'borderRadius',
          title: 'Border Radius',
          type: 'string',
          options: {
            list: [
              { title: 'None', value: 'none' },
              { title: 'Small', value: 'sm' },
              { title: 'Medium', value: 'md' },
              { title: 'Large', value: 'lg' },
              { title: 'Extra Large', value: 'xl' },
              { title: 'Full', value: 'full' },
            ],
          },
          initialValue: 'xl',
          description: 'Banner corner rounding',
        }),
        defineField({
          name: 'textAlignment',
          title: 'Text Alignment',
          type: 'object',
          fields: [
            defineField({
              name: 'desktop',
              title: 'Desktop Alignment',
              type: 'string',
              options: {
                list: [
                  { title: 'Left', value: 'left' },
                  { title: 'Center', value: 'center' },
                ],
              },
              initialValue: 'left',
            }),
            defineField({
              name: 'mobile',
              title: 'Mobile Alignment',
              type: 'string',
              options: {
                list: [
                  { title: 'Left', value: 'left' },
                  { title: 'Center', value: 'center' },
                ],
              },
              initialValue: 'center',
            }),
          ],
          description: 'Text alignment for title and description',
        }),
        defineField({
          name: 'imagePosition',
          title: 'Image Position',
          type: 'string',
          options: {
            list: [
              { title: 'Right', value: 'right' },
              { title: 'Left', value: 'left' },
            ],
          },
          initialValue: 'right',
          description: 'Position of the main image',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      mainImage: 'mainImage.image',
      backgroundColor: 'backgroundColor.hex',
    },
    prepare({ title, mainImage, backgroundColor }) {
      // Extract plain text from rich text for preview
      const titleText = title?.[0]?.children?.map((child: any) => child.text).join('') || 'Try Carsu Banner';
      const bgColor = backgroundColor ? ` • ${backgroundColor}` : '';

      return {
        title: titleText,
        subtitle: `Try Carsu Banner${bgColor}`,
        media: mainImage,
      };
    },
  },
});
