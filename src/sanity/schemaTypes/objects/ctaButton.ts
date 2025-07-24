import { defineField } from 'sanity';
import { buttonVariants, buttonSizes } from '../shared/buttonVariants';

/**
 * Reusable CTA Button object schema
 * Used across feature sections, hero sections, headers, etc.
 */
export const ctaButtonObject = {
  type: 'object',
  name: 'ctaButton',
  title: 'CTA Button',
  fields: [
    defineField({
      name: 'text',
      title: 'Button Text',
      type: 'string',
      validation: (Rule) => Rule.required().max(50),
      description: 'Keep button text concise and action-oriented',
    }),
    defineField({
      name: 'href',
      title: 'Button URL',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Internal link (/about) or external URL (https://example.com)',
    }),
    defineField({
      name: 'variant',
      title: 'Button Style',
      type: 'string',
      options: {
        list: buttonVariants,
      },
      initialValue: 'primary',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'size',
      title: 'Button Size',
      type: 'string',
      options: {
        list: buttonSizes,
      },
      initialValue: 'md',
    }),
    defineField({
      name: 'openInNewTab',
      title: 'Open in New Tab',
      type: 'boolean',
      initialValue: false,
      description: 'Recommended for external links',
    }),
    defineField({
      name: 'icon',
      title: 'Button Icon (Optional)',
      type: 'string',
      options: {
        list: [
          { title: 'None', value: '' },
          { title: 'Arrow Right', value: 'arrowRight' },
          { title: 'External Link', value: 'externalLink' },
          { title: 'Download', value: 'download' },
          { title: 'Play', value: 'play' },
        ],
      },
      initialValue: '',
    }),
    defineField({
      name: 'disabled',
      title: 'Disabled State',
      type: 'boolean',
      initialValue: false,
      description: 'Use for coming soon or unavailable actions',
    }),
  ],
  preview: {
    select: {
      text: 'text',
      variant: 'variant',
      size: 'size',
      disabled: 'disabled',
    },
    prepare({ text, variant, size, disabled }) {
      return {
        title: text || 'Button',
        subtitle: `${variant} • ${size}${disabled ? ' • disabled' : ''}`,
      };
    },
  },
};
