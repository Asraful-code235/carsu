import { defineType, defineArrayMember } from 'sanity';
import { colorOptions } from '../shared/colorPalette';

/**
 * Reusable Rich Text Block with colored text support
 * Consistent rich text configuration across all sections
 */
export const richTextBlockObject = defineType({
  title: 'Rich Text Block',
  name: 'richTextBlock',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H1', value: 'h1' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'Quote', value: 'blockquote' },
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Numbered', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Code', value: 'code' },
        ],
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
                validation: (Rule) => Rule.required(),
              },
              {
                title: 'Open in new tab',
                name: 'blank',
                type: 'boolean',
                initialValue: true,
              },
            ],
          },
          {
            title: 'Colored Text',
            name: 'coloredText',
            type: 'object',
            fields: [
              {
                title: 'Color',
                name: 'color',
                type: 'string',
                options: {
                  list: colorOptions,
                },
                initialValue: 'primary',
                validation: (Rule) => Rule.required(),
              },
              {
                title: 'Custom Color',
                name: 'customColor',
                type: 'color',
                description: 'Override with custom color (optional)',
              },
              {
                title: 'Font Weight',
                name: 'fontWeight',
                type: 'string',
                options: {
                  list: [
                    { title: 'Normal', value: 'normal' },
                    { title: 'Medium', value: 'medium' },
                    { title: 'Semibold', value: 'semibold' },
                    { title: 'Bold', value: 'bold' },
                  ],
                },
                initialValue: 'semibold',
              },
            ],
            preview: {
              select: {
                color: 'color',
                customColor: 'customColor',
                fontWeight: 'fontWeight',
              },
              prepare({ color, customColor, fontWeight }) {
                return {
                  title: `Colored Text: ${color}`,
                  subtitle: `${fontWeight}${customColor ? ` • Custom: ${customColor.hex}` : ''}`,
                };
              },
            },
          },
        ],
      },
    }),
    // Allow images in rich text
    defineArrayMember({
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'localeString',
          title: 'Alternative Text',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'caption',
          type: 'localeString',
          title: 'Caption',
        },
      ],
    }),
  ],
});
