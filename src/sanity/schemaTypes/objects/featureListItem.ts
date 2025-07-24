import { defineField } from 'sanity';
import { iconOptions } from '../shared/iconOptions';

/**
 * Reusable feature list item object
 * Used in feature sections, comparison tables, etc.
 */
export const featureListItemObject = {
  type: 'object',
  name: 'featureListItem',
  title: 'Feature Item',
  fields: [
    defineField({
      name: 'text',
      title: 'Feature Text',
      type: 'string',
      validation: (Rule) => Rule.required().max(100),
      description: 'Keep feature descriptions concise and clear',
    }),
    defineField({
      name: 'description',
      title: 'Feature Description (Optional)',
      type: 'text',
      rows: 2,
      description: 'Additional details about this feature',
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      options: {
        list: iconOptions,
      },
      initialValue: 'check',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'iconColor',
      title: 'Icon Color',
      type: 'string',
      options: {
        list: [
          { title: 'Primary Blue', value: 'primary' },
          { title: 'Success Green', value: 'success' },
          { title: 'Warning Orange', value: 'warning' },
          { title: 'Error Red', value: 'error' },
          { title: 'Gray', value: 'gray' },
        ],
      },
      initialValue: 'primary',
    }),
    defineField({
      name: 'highlighted',
      title: 'Highlighted Feature',
      type: 'boolean',
      initialValue: false,
      description: 'Mark as highlighted to emphasize this feature',
    }),
    defineField({
      name: 'link',
      title: 'Feature Link (Optional)',
      type: 'object',
      fields: [
        defineField({
          name: 'href',
          title: 'URL',
          type: 'string',
        }),
        defineField({
          name: 'text',
          title: 'Link Text',
          type: 'string',
          initialValue: 'Learn more',
        }),
        defineField({
          name: 'openInNewTab',
          title: 'Open in New Tab',
          type: 'boolean',
          initialValue: false,
        }),
      ],
      description: 'Optional link for more information about this feature',
    }),
  ],
  preview: {
    select: {
      text: 'text',
      icon: 'icon',
      highlighted: 'highlighted',
      iconColor: 'iconColor',
    },
    prepare({ text, icon, highlighted, iconColor }) {
      const iconMap = {
        check: '✓',
        star: '★',
        arrowRight: '→',
        plus: '+',
        heart: '♥',
        shield: '🛡',
        lightning: '⚡',
        globe: '🌐',
        cog: '⚙',
        user: '👤',
      };
      
      return {
        title: text || 'Feature Item',
        subtitle: `${iconMap[icon as keyof typeof iconMap] || icon} • ${iconColor}${highlighted ? ' • Highlighted' : ''}`,
      };
    },
  },
};
