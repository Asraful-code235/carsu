import { defineField, defineType } from 'sanity';
import { ComponentIcon } from '@sanity/icons';

export const productBenefitsListSectionType = defineType({
  name: 'productBenefitsListSection',
  title: 'Product Benefits List Section',
  type: 'document',
  icon: ComponentIcon,
  fields: [
    defineField({
      name: 'type',
      title: 'Section Type',
      type: 'string',
      initialValue: 'productBenefitsList',
      hidden: true,
    }),
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'localeRichTextBlock',
      validation: (Rule) => Rule.required(),
      description: 'Main heading for the benefits section',
    }),
    defineField({
      name: 'description',
      title: 'Section Description',
      type: 'localeRichTextBlock',
      description: 'Optional description text below the title',
    }),
    defineField({
      name: 'benefits',
      title: 'Benefits List',
      type: 'array',
      of: [
        defineField({
          name: 'benefit',
          title: 'Benefit Item',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Benefit Title',
              type: 'localeString',
              validation: (Rule) => Rule.required(),
              description: 'Short title for this benefit',
            }),
            defineField({
              name: 'description',
              title: 'Benefit Description',
              type: 'localeRichTextBlock',
              description: 'Detailed description of this benefit',
            }),
            defineField({
              name: 'image',
              title: 'Benefit Image',
              type: 'imageWithAlt',
              validation: (Rule) => Rule.required(),
              description: 'Image that will be displayed when this benefit is active/selected',
            }),
          ],
          preview: {
            select: {
              title: 'title.en',
              description: 'description.en',
            },
            prepare({ title, description }) {
              return {
                title: title || 'Untitled Benefit',
                subtitle: description?.[0]?.children?.[0]?.text || 'No description',
              };
            },
          },
        }),
      ],
      validation: (Rule) => Rule.min(1).max(6),
      description: 'List of benefits (1-6 items recommended)',
    }),
    defineField({
      name: 'layout',
      title: 'Layout Direction',
      type: 'string',
      options: {
        list: [
          { title: 'Image Left, Content Right', value: 'imageLeft' },
          { title: 'Content Left, Image Right', value: 'contentLeft' },
        ],
      },
      initialValue: 'imageLeft',
      description: 'Choose the layout direction for desktop view',
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'color',
      description: 'Optional background color for the section',
    }),
    defineField({
      name: 'padding',
      title: 'Section Padding',
      type: 'object',
      fields: [
        defineField({
          name: 'top',
          title: 'Top Padding',
          type: 'string',
          options: {
            list: [
              { title: 'None', value: 'none' },
              { title: 'Small', value: 'small' },
              { title: 'Medium', value: 'medium' },
              { title: 'Large', value: 'large' },
              { title: 'Extra Large', value: 'xlarge' },
            ],
          },
          initialValue: 'large',
        }),
        defineField({
          name: 'bottom',
          title: 'Bottom Padding',
          type: 'string',
          options: {
            list: [
              { title: 'None', value: 'none' },
              { title: 'Small', value: 'small' },
              { title: 'Medium', value: 'medium' },
              { title: 'Large', value: 'large' },
              { title: 'Extra Large', value: 'xlarge' },
            ],
          },
          initialValue: 'large',
        }),
      ],
      description: 'Control the vertical spacing around the section',
    }),
  ],
  preview: {
    select: {
      title: 'title.en',
      benefits: 'benefits',
      backgroundColor: 'backgroundColor.hex',
    },
    prepare({ title, benefits, backgroundColor }) {
      const benefitCount = benefits?.length || 0;
      const bgColor = backgroundColor ? ` • Background: ${backgroundColor}` : '';
      
      return {
        title: 'Product Benefits List',
        subtitle: `${title?.[0]?.children?.[0]?.text || 'No title'} • ${benefitCount} benefit${benefitCount !== 1 ? 's' : ''}${bgColor}`,
        media: ComponentIcon,
      };
    },
  },
});
