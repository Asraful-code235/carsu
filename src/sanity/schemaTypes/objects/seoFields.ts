import { defineField } from 'sanity';

/**
 * Reusable SEO fields object
 * Consistent SEO configuration across pages and layouts
 */
export const seoFieldsObject = {
  type: 'object',
  name: 'seoFields',
  title: 'SEO Settings',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      validation: (Rule) => 
        Rule.max(60).warning('Keep under 60 characters for optimal SEO'),
      description: 'Title that appears in search results and browser tabs',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => 
        Rule.max(160).warning('Keep under 160 characters for optimal SEO'),
      description: 'Description that appears in search results',
    }),
    defineField({
      name: 'ogTitle',
      title: 'Open Graph Title',
      type: 'string',
      validation: (Rule) => Rule.max(95),
      description: 'Title for social media sharing (optional, defaults to meta title)',
    }),
    defineField({
      name: 'ogDescription',
      title: 'Open Graph Description',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.max(200),
      description: 'Description for social media sharing (optional, defaults to meta description)',
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
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
      description: 'Image for social media sharing (1200x630px recommended)',
    }),
    defineField({
      name: 'noIndex',
      title: 'No Index',
      type: 'boolean',
      initialValue: false,
      description: 'Prevent search engines from indexing this page',
    }),
    defineField({
      name: 'noFollow',
      title: 'No Follow',
      type: 'boolean',
      initialValue: false,
      description: 'Prevent search engines from following links on this page',
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL',
      type: 'url',
      description: 'Specify the canonical URL if different from the page URL',
    }),
    defineField({
      name: 'keywords',
      title: 'Focus Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
      validation: (Rule) => Rule.max(10),
      description: 'Primary keywords for this page (max 10)',
    }),
  ],
  preview: {
    select: {
      title: 'metaTitle',
      description: 'metaDescription',
      noIndex: 'noIndex',
    },
    prepare({ title, description, noIndex }) {
      return {
        title: title || 'SEO Settings',
        subtitle: `${description ? description.substring(0, 50) + '...' : 'No description'}${noIndex ? ' • No Index' : ''}`,
      };
    },
  },
};
