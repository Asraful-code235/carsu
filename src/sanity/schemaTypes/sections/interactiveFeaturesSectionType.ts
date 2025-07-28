import { ComponentIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const interactiveFeaturesSectionType = defineType({
  name: 'interactiveFeaturesSection',
  title: 'Interactive Features Section',
  type: 'object',
  icon: ComponentIcon,
  fields: [
    defineField({
      name: 'type',
      title: 'Section Type',
      type: 'string',
      readOnly: true,
      initialValue: 'interactiveFeatures',
    }),
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'localeRichTextBlock',
      validation: (Rule) => Rule.required(),
      description: 'Main title for the section (supports rich text and colored text)',
    }),
    defineField({
      name: 'pillText',
      title: 'Pill Text',
      type: 'localeString',
      description: 'Small text that appears above the title in a pill/badge style',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localeRichTextBlock',
      description: 'Description text below the title (supports rich text)',
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
      description: 'Secondary call-to-action button',
    }),

    defineField({
      name: 'featureCards',
      title: 'Feature Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Card Title',
              type: 'localeString',
              validation: (Rule) => Rule.required(),
              description: 'Title of the feature card',
            }),
            defineField({
              name: 'description',
              title: 'Card Description',
              type: 'localeRichTextBlock',
              validation: (Rule) => Rule.required(),
              description: 'Description of the feature (supports rich text)',
            }),
            defineField({
              name: 'icon',
              title: 'Card Icon',
              type: 'imageWithAlt',
              description: 'Icon or image for the feature card',
            }),
            defineField({
              name: 'centerImage',
              title: 'Center Image',
              type: 'imageWithAlt',
              validation: (Rule) => Rule.required(),
              description: 'Main image displayed in the center when this card is active',
            }),
            defineField({
              name: 'isDefault',
              title: 'Default Active Card',
              type: 'boolean',
              initialValue: false,
              description: 'Mark this card as the default active card (only one should be active)',
            }),
          ],
          preview: {
            select: {
              title: 'title.en',
              titleEs: 'title.es',
              isDefault: 'isDefault',
              icon: 'icon.image',
              centerImage: 'centerImage.image',
            },
            prepare({ title, titleEs, isDefault, icon, centerImage }) {
              return {
                title: title || 'Feature Card',
                subtitle: `${isDefault ? '⭐ Default Active' : ''} ${titleEs ? `• ES: ${titleEs}` : ''} ${centerImage ? '• Has Center Image' : '• No Center Image'}`,
                media: centerImage || icon,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(3).max(8),
      description: 'Feature cards (3-8 cards recommended). One should be marked as default active.',
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
          name: 'animationDuration',
          title: 'Animation Duration',
          type: 'string',
          options: {
            list: [
              { title: 'Fast (200ms)', value: 'fast' },
              { title: 'Normal (300ms)', value: 'normal' },
              { title: 'Slow (500ms)', value: 'slow' },
            ],
          },
          initialValue: 'normal',
        }),
        defineField({
          name: 'showAllCardsOnMobile',
          title: 'Show All Cards on Mobile',
          type: 'boolean',
          initialValue: false,
          description: 'If false, only the default active card will be shown on mobile',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      pillText: 'pillText.en',
      featureCards: 'featureCards',
    },
    prepare({ title, pillText, featureCards }) {
      // Extract plain text from rich text for preview
      const titleText = title?.en?.[0]?.children?.map((child: any) => child.text).join('') || 
                       title?.[0]?.children?.map((child: any) => child.text).join('') || 
                       'Interactive Features Section';
      const cardCount = featureCards?.length || 0;
      const subtitle = `${pillText ? `${pillText} • ` : ''}${cardCount} feature card${cardCount !== 1 ? 's' : ''}`;
      
      return {
        title: titleText,
        subtitle: subtitle,
      };
    },
  },
});
