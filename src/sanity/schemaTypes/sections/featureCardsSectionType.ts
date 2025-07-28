import { defineField, defineType } from 'sanity';
import { ComponentIcon } from '@sanity/icons';

export const featureCardsSectionType = defineType({
  name: 'featureCardsSection',
  title: 'Feature Cards Section',
  type: 'object',
  icon: ComponentIcon,
  fields: [
    defineField({
      name: 'type',
      title: 'Section Type',
      type: 'string',
      readOnly: true,
      initialValue: 'featureCards',
    }),
  
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'localeRichTextBlock',
      description: 'Main title for the feature cards section (localized)',
    }),
    defineField({
      name: 'subtitle',
      title: 'Section Subtitle',
      type: 'localeRichTextBlock',
      description: 'Optional subtitle below the main title (localized)',
    }),
    defineField({
      name: 'featureCards',
      title: 'Feature Cards',
      type: 'array',
      of: [
        defineField({
          name: 'featureCard',
          title: 'Feature Card',
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Card Icon',
              type: 'imageWithAlt',
              description: 'Icon image to display on the card (SVG or PNG recommended)',
            }),
            defineField({
              name: 'iconBackgroundColor',
              title: 'Icon Background Color',
              type: 'string',
              options: {
                list: [
                  { title: 'Primary Blue', value: 'primary' },
                  { title: 'Success Green', value: 'success' },
                  { title: 'Warning Yellow', value: 'warning' },
                  { title: 'Error Red', value: 'error' },
                  { title: 'Info Cyan', value: 'info' },
                  { title: 'Purple', value: 'purple' },
                  { title: 'Pink', value: 'pink' },
                  { title: 'Indigo', value: 'indigo' },
                  { title: 'Gray', value: 'gray' },
                ],
              },
              initialValue: 'primary',
              description: 'Background color for the icon container',
            }),
            defineField({
              name: 'title',
              title: 'Card Title',
              type: 'localeString',
              description: 'Title for the feature card (localized)',
            }),
            defineField({
              name: 'description',
              title: 'Card Description',
              type: 'localeString',
              description: 'Description text for the feature card (localized)',
            }),
          ],
          preview: {
            select: {
              title: 'title.en',
              description: 'description.en',
              icon: 'icon.image',
              iconBackgroundColor: 'iconBackgroundColor',
            },
            prepare({ title, description, icon, iconBackgroundColor }) {
              return {
                title: title || 'Feature Card',
                subtitle: `${iconBackgroundColor} • ${description?.substring(0, 50)}...` || '',
                media: icon || ComponentIcon,
              };
            },
          },
        }),
      ],
      validation: (Rule) => Rule.min(1).max(6),
      description: 'Feature cards to display (1-6 cards recommended)',
    }),
    defineField({
      name: 'layout',
      title: 'Cards Layout',
      type: 'object',
      fields: [
        defineField({
          name: 'columns',
          title: 'Number of Columns',
          type: 'string',
          options: {
            list: [
              { title: '2 Columns', value: '2' },
              { title: '3 Columns', value: '3' },
              { title: '4 Columns', value: '4' },
            ],
          },
          initialValue: '3',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'cardSpacing',
          title: 'Card Spacing',
          type: 'string',
          options: {
            list: [
              { title: 'Small', value: 'small' },
              { title: 'Medium', value: 'medium' },
              { title: 'Large', value: 'large' },
            ],
          },
          initialValue: 'medium',
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
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'backgroundColor',
      description: 'Section background color',
    }),
    defineField({
      name: 'padding',
      title: 'Section Spacing',
      type: 'paddingControls',
    }),
  ],
  preview: {
    select: {
      title: 'title.en',
      titleEs: 'title.es',
      badge: 'badge.text.en',
      featureCards: 'featureCards',
      backgroundColor: 'backgroundColor.hex',
    },
    prepare({ title, titleEs, badge, featureCards, backgroundColor }) {
      // Extract plain text from rich text for preview
      const titleText = title?.[0]?.children?.map((child: any) => child.text).join('') || 'Feature Cards';
      const titleEsText = titleEs?.[0]?.children?.map((child: any) => child.text).join('') || '';
      const cardCount = featureCards?.length || 0;
      const bgColor = backgroundColor ? ` • ${backgroundColor}` : '';
      const badgeText = badge ? ` • Badge: ${badge}` : '';
      const translationInfo = titleEsText ? ` • ES: ${titleEsText.substring(0, 30)}...` : '';

      return {
        title: titleText,
        subtitle: `${cardCount} cards${bgColor}${badgeText}${translationInfo}`,
        media: ComponentIcon,
      };
    },
  },
});
