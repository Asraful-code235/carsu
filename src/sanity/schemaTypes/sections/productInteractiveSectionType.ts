import { ComponentIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const productInteractiveSectionType = defineType({
  name: 'productInteractiveSection',
  title: 'Product Interactive Section',
  type: 'object',
  icon: ComponentIcon,
  fields: [
    defineField({
      name: 'type',
      title: 'Section Type',
      type: 'string',
      readOnly: true,
      initialValue: 'productInteractive',
    }),
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'localeRichTextBlock',
      validation: (Rule) => Rule.required(),
      description: 'Main title for the interactive section (localized)',
    }),
    defineField({
      name: 'items',
      title: 'Interactive Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Item Title',
              type: 'localeString',
              validation: (Rule) => Rule.required(),
              description: 'Title that appears in the left sidebar',
            }),
            defineField({
              name: 'content',
              title: 'Content',
              type: 'localeRichTextBlock',
              validation: (Rule) => Rule.required(),
              description: 'Content that appears on the right when this item is active',
            }),
            defineField({
              name: 'image',
              title: 'Content Image',
              type: 'imageWithAlt',
              description: 'Image that appears with the content on the right',
            }),
          ],
          preview: {
            select: {
              title: 'title.en',
              titleEs: 'title.es',
              image: 'image.image',
            },
            prepare({ title, titleEs, image }) {
              return {
                title: title || 'Interactive Item',
                subtitle: titleEs ? `ES: ${titleEs}` : 'No Spanish translation',
                media: image,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(2).max(8),
      description: 'Interactive items (2-8 items recommended)',
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
          name: 'defaultActiveItem',
          title: 'Default Active Item',
          type: 'number',
          validation: (Rule) => Rule.min(0),
          initialValue: 0,
          description: 'Index of the item that should be active by default (0 = first item)',
        }),
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
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      items: 'items',
    },
    prepare({ title, items }) {
      // Extract plain text from rich text for preview
      const titleText = title?.en?.[0]?.children?.map((child: any) => child.text).join('') || 
                       title?.[0]?.children?.map((child: any) => child.text).join('') || 
                       'Product Interactive Section';
      const itemCount = items?.length || 0;
      
      return {
        title: titleText,
        subtitle: `${itemCount} interactive item${itemCount !== 1 ? 's' : ''}`,
      };
    },
  },
});
