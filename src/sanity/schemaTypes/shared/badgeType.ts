import { defineField, defineType } from 'sanity';
import { TagIcon } from '@sanity/icons';

export const badgeType = defineType({
  name: 'badge',
  title: 'Badge',
  type: 'object',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'text',
      title: 'Badge Text',
      type: 'localeString',
      description: 'Short text for the badge',
    }),
    defineField({
      name: 'color',
      title: 'Badge Color',
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
          { title: 'Custom', value: 'custom' },
        ],
      },
      initialValue: 'primary',
    }),
    defineField({
      name: 'customColor',
      title: 'Custom Color',
      type: 'color',
      description: 'Custom color when "Custom" is selected above',
      hidden: ({ parent }) => parent?.color !== 'custom',
    }),
    defineField({
      name: 'variant',
      title: 'Badge Style',
      type: 'string',
      options: {
        list: [
          { title: 'Filled', value: 'filled' },
          { title: 'Outline', value: 'outline' },
          { title: 'Soft', value: 'soft' },
        ],
      },
      initialValue: 'soft',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'size',
      title: 'Badge Size',
      type: 'string',
      options: {
        list: [
          { title: 'Small', value: 'sm' },
          { title: 'Medium', value: 'md' },
          { title: 'Large', value: 'lg' },
        ],
      },
      initialValue: 'md',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      text: 'text.en',
      textEs: 'text.es',
      color: 'color',
      variant: 'variant',
      customColor: 'customColor',
    },
    prepare({ text, textEs, color, variant, customColor }) {
      const colorDisplay = color === 'custom' && customColor?.hex
        ? `Custom (${customColor.hex})`
        : color;
      const badgeText = text || 'Badge';
      const subtitle = `${colorDisplay} • ${variant}${textEs ? ` • ES: ${textEs}` : ''}`;

      return {
        title: badgeText,
        subtitle: subtitle,
        media: TagIcon,
      };
    },
  },
});
