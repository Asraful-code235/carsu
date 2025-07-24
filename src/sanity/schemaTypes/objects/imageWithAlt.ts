import { defineField } from 'sanity';

/**
 * Reusable Image object with alt text and hotspot
 * Consistent image configuration across all schemas
 */
export const imageWithAltObject = {
  type: 'object',
  name: 'imageWithAlt',
  title: 'Image',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
      validation: (Rule) => Rule.required().max(125),
      description: 'Describe the image for screen readers and SEO (max 125 characters)',
    }),
    defineField({
      name: 'caption',
      title: 'Caption (Optional)',
      type: 'string',
      description: 'Optional caption displayed below the image',
    }),
    defineField({
      name: 'width',
      title: 'Display Width (pixels)',
      type: 'number',
      description: 'Optional: Override default width',
    }),
    defineField({
      name: 'height',
      title: 'Display Height (pixels)',
      type: 'number',
      description: 'Optional: Override default height',
    }),
    defineField({
      name: 'priority',
      title: 'High Priority Loading',
      type: 'boolean',
      initialValue: false,
      description: 'Enable for above-the-fold images (hero sections)',
    }),
  ],
  preview: {
    select: {
      alt: 'alt',
      image: 'image',
      caption: 'caption',
    },
    prepare({ alt, image, caption }) {
      return {
        title: alt || 'Image',
        subtitle: caption || 'No caption',
        media: image,
      };
    },
  },
};

/**
 * Simple image object for basic use cases
 */
export const simpleImageObject = {
  type: 'image',
  name: 'simpleImage',
  title: 'Image',
  options: {
    hotspot: true,
  },
  fields: [
    defineField({
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
};
