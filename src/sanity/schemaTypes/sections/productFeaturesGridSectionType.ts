import { defineField, defineType } from 'sanity';
import { ComponentIcon } from '@sanity/icons';

export const productFeaturesGridSectionType = defineType({
  name: 'productFeaturesGridSection',
  title: 'Product Features Grid Section',
  type: 'object',
  icon: ComponentIcon,
  fields: [
    defineField({
      name: 'type',
      title: 'Section Type',
      type: 'string',
      readOnly: true,
      initialValue: 'productFeaturesGrid',
    }),
    defineField({
      name: 'featureItems',
      title: 'Feature Items',
      type: 'array',
      of: [
        defineField({
          name: 'featureItem',
          title: 'Feature Item',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Feature Title',
              type: 'localeRichTextBlock',
              validation: (Rule) => Rule.required(),
              description: 'Title for the feature item (localized)',
            }),
            defineField({
              name: 'description',
              title: 'Feature Description',
              type: 'localeRichTextBlock',
              description: 'Description text for the feature item (localized)',
            }),
            defineField({
              name: 'features',
              title: 'Feature List',
              type: 'array',
              of: [
                defineField({
                  name: 'feature',
                  title: 'Feature',
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'text',
                      title: 'Feature Text',
                      type: 'localeString',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'icon',
                      title: 'Feature Icon',
                      type: 'string',
                      options: {
                        list: [
                          { title: 'Check Mark', value: 'check' },
                          { title: 'Star', value: 'star' },
                          { title: 'Arrow Right', value: 'arrowRight' },
                          { title: 'Plus', value: 'plus' },
                          { title: 'Bullet Point', value: 'bullet' },
                        ],
                      },
                      initialValue: 'bullet',
                    }),
                  ],
                  preview: {
                    select: {
                      title: 'text.en',
                      icon: 'icon',
                    },
                    prepare({ title, icon }) {
                      return {
                        title: title || 'Feature',
                        subtitle: `Icon: ${icon}`,
                      };
                    },
                  },
                }),
              ],
              description: 'List of features with bullet points',
            }),
            defineField({
              name: 'image',
              title: 'Feature Image',
              type: 'imageWithAlt',
              validation: (Rule) => Rule.required(),
              description: 'Image to display for this feature',
            }),

            defineField({
              name: 'imageSize',
              title: 'Image Size',
              type: 'string',
              options: {
                list: [
                  { title: 'Small', value: 'small' },
                  { title: 'Medium', value: 'medium' },
                  { title: 'Large', value: 'large' },
                ],
              },
              initialValue: 'medium',
              description: 'Controls the height of the image area',
            }),
          ],
          preview: {
            select: {
              title: 'title.en',
              layout: 'layout',
              image: 'image.image',
              imageSize: 'imageSize',
            },
            prepare({ title, layout, image, imageSize }) {
              // Extract plain text from rich text for preview
              const titleText = title?.[0]?.children?.map((child: any) => child.text).join('') || 'Feature Item';
              
              return {
                title: titleText,
                subtitle: `${layout} • ${imageSize} image`,
                media: image || ComponentIcon,
              };
            },
          },
        }),
      ],
      validation: (Rule) => Rule.min(1).max(6),
      description: 'Feature items to display (1-6 items recommended)',
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
      featureItems: 'featureItems',
      backgroundColor: 'backgroundColor.hex',
    },
    prepare({ featureItems, backgroundColor }) {
      const itemCount = featureItems?.length || 0;
      const bgColor = backgroundColor ? ` • ${backgroundColor}` : '';

      return {
        title: 'Product Features Grid (2x2)',
        subtitle: `${itemCount} feature card${itemCount !== 1 ? 's' : ''} in grid layout${bgColor}`,
        media: ComponentIcon,
      };
    },
  },
});
