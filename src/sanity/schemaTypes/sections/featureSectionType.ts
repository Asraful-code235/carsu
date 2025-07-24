import { defineField, defineType } from 'sanity';
import { ComponentIcon } from '@sanity/icons';
import { layoutOptions } from '../shared/spacingOptions';

export const featureSectionType = defineType({
  name: 'featureSection',
  title: 'Feature Section',
  type: 'object',
  icon: ComponentIcon,
  fields: [
    defineField({
      name: 'type',
      title: 'Section Type',
      type: 'string',
      readOnly: true,
      initialValue: 'feature',
    }),
    defineField({
      name: 'layout',
      title: 'Layout Direction',
      type: 'string',
      options: {
        list: layoutOptions,
      },
      initialValue: 'contentLeft',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'richTextBlock',
      description: 'Use colored text marks for highlighted words like "ultimate tool"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 2,
      description: 'Optional subtitle below the main title',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'richTextBlock',
      description: 'Main content description',
    }),
    defineField({
      name: 'features',
      title: 'Feature List',
      type: 'array',
      of: [{ type: 'featureListItem' }],
      description: 'List of features or benefits (like the workshop checklist)',
      validation: (Rule) => Rule.max(10),
    }),
    defineField({
      name: 'ctaButtons',
      title: 'Call-to-Action Buttons',
      type: 'array',
      of: [{ type: 'ctaButton' }],
      validation: (Rule) => Rule.max(3),
    }),
    defineField({
      name: 'image',
      title: 'Feature Image',
      type: 'imageWithAlt',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'backgroundColor',
    }),
    defineField({
      name: 'padding',
      title: 'Section Spacing',
      type: 'paddingControls',
    }),
    defineField({
      name: 'settings',
      title: 'Section Settings',
      type: 'object',
      fields: [
        defineField({
          name: 'fullWidth',
          title: 'Full Width Section',
          type: 'boolean',
          initialValue: false,
          description: 'Extend section to full browser width',
        }),
        defineField({
          name: 'centerContent',
          title: 'Center Content Vertically',
          type: 'boolean',
          initialValue: true,
          description: 'Center content vertically within the section',
        }),
        defineField({
          name: 'imageAspectRatio',
          title: 'Image Aspect Ratio',
          type: 'string',
          options: {
            list: [
              { title: 'Auto', value: 'auto' },
              { title: 'Square (1:1)', value: 'square' },
              { title: 'Landscape (4:3)', value: 'landscape' },
              { title: 'Wide (16:9)', value: 'wide' },
            ],
          },
          initialValue: 'auto',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      layout: 'layout',
      image: 'image.image',
      features: 'features',
    },
    prepare({ title, layout, image, features }) {
      // Extract plain text from rich text for preview
      const titleText = title?.[0]?.children?.map((child: any) => child.text).join('') || 'Feature Section';
      const featureCount = features?.length || 0;
      const layoutText = layout === 'contentLeft' ? 'Content Left' :
                        layout === 'contentRight' ? 'Content Right' : 'Content Center';

      return {
        title: titleText,
        subtitle: `${layoutText} • ${featureCount} feature${featureCount !== 1 ? 's' : ''}`,
        media: image,
      };
    },
  },
});
