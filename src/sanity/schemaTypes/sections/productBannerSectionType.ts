import { ComponentIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const productBannerSectionType = defineType({
  name: 'productBannerSection',
  title: 'Product Banner Section',
  type: 'object',
  icon: ComponentIcon,
  fields: [
    defineField({
      name: 'type',
      title: 'Section Type',
      type: 'string',
      readOnly: true,
      initialValue: 'productBanner',
    }),
    defineField({
      name: 'title',
      title: 'Banner Title',
      type: 'localeRichTextBlock',
      validation: (Rule) => Rule.required(),
      description: 'Main title for the banner (localized)',
    }),
    defineField({
      name: 'description',
      title: 'Banner Description',
      type: 'localeRichTextBlock',
      description: 'Optional description text below the title (localized)',
    }),
    defineField({
      name: 'primaryButton',
      title: 'Primary Button',
      type: 'ctaButton',
      description: 'Main call-to-action button',
    }),
    defineField({
      name: 'secondaryButton',
      title: 'Secondary Button',
      type: 'ctaButton',
      description: 'Optional secondary button',
    }),
    defineField({
      name: 'backgroundStyle',
      title: 'Background Style',
      type: 'object',
      fields: [
        defineField({
          name: 'type',
          title: 'Background Type',
          type: 'string',
          options: {
            list: [
              { title: 'Solid Color', value: 'solid' },
              { title: 'Gradient', value: 'gradient' },
              { title: 'Image', value: 'image' },
            ],
          },
          initialValue: 'gradient',
        }),
        defineField({
          name: 'primaryColor',
          title: 'Primary Color',
          type: 'color',
          description: 'Main background color or gradient start color',
          initialValue: { hex: '#3B82F6' }, // Blue-500
        }),
        defineField({
          name: 'secondaryColor',
          title: 'Secondary Color',
          type: 'color',
          description: 'Gradient end color (only used for gradient type)',
          initialValue: { hex: '#1D4ED8' }, // Blue-700
        }),
        defineField({
          name: 'gradientDirection',
          title: 'Gradient Direction',
          type: 'string',
          options: {
            list: [
              { title: 'Top to Bottom', value: 'to-b' },
              { title: 'Top Right to Bottom Left', value: 'to-bl' },
              { title: 'Right to Left', value: 'to-l' },
              { title: 'Bottom Right to Top Left', value: 'to-tl' },
              { title: 'Bottom to Top', value: 'to-t' },
              { title: 'Bottom Left to Top Right', value: 'to-tr' },
              { title: 'Left to Right', value: 'to-r' },
              { title: 'Top Left to Bottom Right', value: 'to-br' },
            ],
          },
          initialValue: 'to-br',
          hidden: ({ parent }) => parent?.type !== 'gradient',
        }),
        defineField({
          name: 'backgroundImage',
          title: 'Background Image',
          type: 'imageWithAlt',
          hidden: ({ parent }) => parent?.type !== 'image',
        }),
        defineField({
          name: 'overlay',
          title: 'Image Overlay',
          type: 'object',
          fields: [
            defineField({
              name: 'enabled',
              title: 'Enable Overlay',
              type: 'boolean',
              initialValue: true,
            }),
            defineField({
              name: 'color',
              title: 'Overlay Color',
              type: 'color',
              initialValue: { hex: '#3B82F6' },
            }),
            defineField({
              name: 'opacity',
              title: 'Overlay Opacity',
              type: 'number',
              validation: (Rule) => Rule.min(0).max(1),
              initialValue: 0.8,
            }),
          ],
          hidden: ({ parent }) => parent?.type !== 'image',
        }),
      ],
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
              { title: 'Right', value: 'right' },
            ],
          },
          initialValue: 'center',
        }),
        defineField({
          name: 'mobile',
          title: 'Mobile Alignment',
          type: 'string',
          options: {
            list: [
              { title: 'Left', value: 'left' },
              { title: 'Center', value: 'center' },
              { title: 'Right', value: 'right' },
            ],
          },
          initialValue: 'center',
        }),
      ],
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
          { title: '2X Large', value: '2xl' },
          { title: '3X Large', value: '3xl' },
        ],
      },
      initialValue: 'xl',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      primaryButton: 'primaryButton.text',
      backgroundType: 'backgroundStyle.type',
    },
    prepare({ title, primaryButton, backgroundType }) {
      // Extract plain text from rich text for preview
      const titleText = title?.en?.[0]?.children?.map((child: any) => child.text).join('') || 
                       title?.[0]?.children?.map((child: any) => child.text).join('') || 
                       'Product Banner';
      const buttonText = primaryButton?.en || primaryButton || '';
      
      return {
        title: titleText,
        subtitle: `${backgroundType || 'gradient'} background${buttonText ? ` • ${buttonText}` : ''}`,
      };
    },
  },
});
