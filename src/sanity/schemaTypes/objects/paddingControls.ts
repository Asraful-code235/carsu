import { defineField } from 'sanity';
import { paddingOptions } from '../shared/spacingOptions';

/**
 * Reusable padding controls object
 * Consistent spacing configuration across all sections
 */
export const paddingControlsObject = {
  type: 'object',
  name: 'paddingControls',
  title: 'Section Spacing',
  fields: [
    defineField({
      name: 'top',
      title: 'Top Padding',
      type: 'string',
      options: {
        list: paddingOptions,
      },
      initialValue: 'large',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bottom',
      title: 'Bottom Padding',
      type: 'string',
      options: {
        list: paddingOptions,
      },
      initialValue: 'large',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'left',
      title: 'Left Padding',
      type: 'string',
      options: {
        list: paddingOptions,
      },
      initialValue: 'medium',
      description: 'Horizontal padding (optional)',
    }),
    defineField({
      name: 'right',
      title: 'Right Padding',
      type: 'string',
      options: {
        list: paddingOptions,
      },
      initialValue: 'medium',
      description: 'Horizontal padding (optional)',
    }),
  ],
  initialValue: {
    top: 'large',
    bottom: 'large',
    left: 'medium',
    right: 'medium',
  },
  preview: {
    select: {
      top: 'top',
      bottom: 'bottom',
      left: 'left',
      right: 'right',
    },
    prepare({ top, bottom, left, right }) {
      return {
        title: 'Section Spacing',
        subtitle: `T:${top} B:${bottom} L:${left} R:${right}`,
      };
    },
  },
};

/**
 * Simple padding controls for basic use cases
 */
export const simplePaddingObject = {
  type: 'object',
  name: 'simplePadding',
  title: 'Padding',
  fields: [
    defineField({
      name: 'top',
      title: 'Top Padding',
      type: 'string',
      options: {
        list: paddingOptions,
      },
      initialValue: 'large',
    }),
    defineField({
      name: 'bottom',
      title: 'Bottom Padding',
      type: 'string',
      options: {
        list: paddingOptions,
      },
      initialValue: 'large',
    }),
  ],
  initialValue: {
    top: 'large',
    bottom: 'large',
  },
};
