import { defineField } from 'sanity';
import { backgroundColorOptions } from '../shared/colorPalette';

/**
 * Reusable color field object
 * Consistent color picker configuration across schemas
 */
export const colorFieldObject = {
  type: 'object',
  name: 'colorField',
  title: 'Color Settings',
  fields: [
    defineField({
      name: 'preset',
      title: 'Preset Color',
      type: 'string',
      options: {
        list: backgroundColorOptions,
      },
      initialValue: 'white',
    }),
    defineField({
      name: 'custom',
      title: 'Custom Color',
      type: 'color',
      description: 'Override preset with custom color',
      hidden: ({ parent }) => parent?.preset !== 'custom',
    }),
    defineField({
      name: 'opacity',
      title: 'Opacity',
      type: 'number',
      validation: (Rule) => Rule.min(0).max(100),
      initialValue: 100,
      description: 'Color opacity (0-100%)',
    }),
  ],
  preview: {
    select: {
      preset: 'preset',
      custom: 'custom',
      opacity: 'opacity',
    },
    prepare({ preset, custom, opacity }) {
      const colorDisplay = preset === 'custom' && custom 
        ? custom.hex 
        : preset;
      
      return {
        title: 'Color Settings',
        subtitle: `${colorDisplay} • ${opacity}% opacity`,
      };
    },
  },
};

/**
 * Simple background color object
 */
export const backgroundColorObject = {
  type: 'color',
  name: 'backgroundColor',
  title: 'Background Color',
  description: 'Optional background color for the section',
};
