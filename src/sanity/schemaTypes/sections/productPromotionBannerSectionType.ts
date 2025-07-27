import { ComponentIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const productPromotionBannerSectionType = defineType({
  name: 'productPromotionBannerSection',
  title: 'Product Promotion Banner Section',
  type: 'object',
  icon: ComponentIcon,
  fields: [
    defineField({
      name: 'type',
      title: 'Section Type',
      type: 'string',
      readOnly: true,
      initialValue: 'productPromotionBanner',
    }),
    defineField({
      name: 'title',
      title: 'Banner Title',
      type: 'localeRichTextBlock',
      validation: (Rule) => Rule.required(),
      description: 'Main title for the promotion banner (localized)',
    }),
    defineField({
      name: 'subtitle',
      title: 'Banner Subtitle',
      type: 'localeRichTextBlock',
      description: 'Subtitle text below the main title (localized)',
    }),
    defineField({
      name: 'description',
      title: 'Banner Description',
      type: 'localeRichTextBlock',
      description: 'Optional description text (localized)',
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
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'imageWithAlt',
      description: 'Background image for the promotion banner (optional - will show gray background if not provided)',
    }),
    defineField({
      name: 'overlay',
      title: 'Background Overlay',
      type: 'object',
      fields: [
        defineField({
          name: 'enabled',
          title: 'Enable Overlay',
          type: 'boolean',
          initialValue: false,
          description: 'Add a dark overlay to improve text readability',
        }),
        defineField({
          name: 'color',
          title: 'Overlay Color',
          type: 'color',
          initialValue: { hex: '#000000' },
          hidden: ({ parent }) => !parent?.enabled,
        }),
        defineField({
          name: 'opacity',
          title: 'Overlay Opacity',
          type: 'number',
          validation: (Rule) => Rule.min(0).max(1),
          initialValue: 0.5,
          description: 'Overlay opacity (0 = transparent, 1 = opaque)',
          hidden: ({ parent }) => !parent?.enabled,
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
      name: 'height',
      title: 'Banner Height',
      type: 'string',
      options: {
        list: [
          { title: 'Small (300px)', value: 'small' },
          { title: 'Medium (400px)', value: 'medium' },
          { title: 'Large (500px)', value: 'large' },
          { title: 'Extra Large (600px)', value: 'xl' },
          { title: 'Full Screen (100vh)', value: 'fullscreen' },
        ],
      },
      initialValue: 'medium',
    }),
    defineField({
      name: 'padding',
      title: 'Content Padding',
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
      subtitle: 'subtitle',
      image: 'backgroundImage.image',
    },
    prepare({ title, subtitle, image }) {
      // Extract plain text from rich text for preview
      const titleText = title?.en?.[0]?.children?.map((child: any) => child.text).join('') || 
                       title?.[0]?.children?.map((child: any) => child.text).join('') || 
                       'Product Promotion Banner';
      const subtitleText = subtitle?.en?.[0]?.children?.map((child: any) => child.text).join('') || 
                          subtitle?.[0]?.children?.map((child: any) => child.text).join('') || '';
      
      return {
        title: titleText,
        subtitle: subtitleText || 'Product Promotion Banner',
        media: image,
      };
    },
  },
});
