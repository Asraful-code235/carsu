import { ComponentIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const productFeatureSectionType = defineType({
  name: 'productFeatureSection',
  title: 'Product Feature Section',
  type: 'object',
  icon: ComponentIcon,
  fields: [
    defineField({
      name: 'type',
      title: 'Section Type',
      type: 'string',
      readOnly: true,
      initialValue: 'productFeature',
    }),
    defineField({
      name: 'image',
      title: 'Feature Image',
      type: 'imageWithAlt',
      validation: (Rule) => Rule.required(),
      description: 'Image showcasing the product feature',
    }),
    defineField({
      name: 'content',
      title: 'Feature Content',
      type: 'localeRichTextBlock',
      validation: (Rule) => Rule.required(),
      description: 'Rich text content describing the feature with bold text support (localized)',
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
      description: 'Choose the layout direction for image and content',
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'backgroundColor',
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
              { title: 'Extra Large', value: 'xl' },
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
              { title: 'Extra Large', value: 'xl' },
            ],
          },
          initialValue: 'large',
        }),
      ],
    }),
    defineField({
      name: 'settings',
      title: 'Section Settings',
      type: 'object',
      fields: [
        defineField({
          name: 'maxWidth',
          title: 'Maximum Width',
          type: 'string',
          options: {
            list: [
              { title: 'Standard (1200px)', value: 'standard' },
              { title: 'Wide (1400px)', value: 'wide' },
              { title: 'Extra Wide (1920px)', value: 'extraWide' },
              { title: 'Full Width', value: 'full' },
            ],
          },
          initialValue: 'extraWide',
        }),
        defineField({
          name: 'horizontalPadding',
          title: 'Horizontal Padding',
          type: 'string',
          options: {
            list: [
              { title: 'Standard (24px)', value: 'standard' },
              { title: 'Large (64px)', value: 'large' },
              { title: 'Extra Large (320px)', value: 'extraLarge' },
            ],
          },
          initialValue: 'extraLarge',
          description: 'Horizontal padding for desktop screens',
        }),
        defineField({
          name: 'gap',
          title: 'Content Gap',
          type: 'string',
          options: {
            list: [
              { title: 'Small (48px)', value: 'small' },
              { title: 'Medium (64px)', value: 'medium' },
              { title: 'Large (96px)', value: 'large' },
            ],
          },
          initialValue: 'large',
          description: 'Gap between image and content',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      content: 'content',
      image: 'image.image',
      layout: 'layout',
    },
    prepare({ content, image, layout }) {
      // Extract plain text from rich text for preview
      const contentText = content?.en?.[0]?.children?.map((child: any) => child.text).join('') || 
                         content?.[0]?.children?.map((child: any) => child.text).join('') || 
                         'Product Feature Section';
      
      return {
        title: contentText.substring(0, 60) + (contentText.length > 60 ? '...' : ''),
        subtitle: `Layout: ${layout === 'imageLeft' ? 'Image Left' : 'Content Left'}`,
        media: image,
      };
    },
  },
});
