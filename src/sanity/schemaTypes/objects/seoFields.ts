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
      type: 'localeString',
      description: 'Title that appears in search results and browser tabs',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'localeString',
      description: 'Description that appears in search results',
    }),
    defineField({
      name: 'ogTitle',
      title: 'Open Graph Title',
      type: 'localeString',
      description: 'Title for social media sharing (optional, defaults to meta title)',
    }),
    defineField({
      name: 'ogDescription',
      title: 'Open Graph Description',
      type: 'localeString',
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
          type: 'localeString',
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
      title: 'metaTitle.en',
      titleEs: 'metaTitle.es',
      description: 'metaDescription.en',
      descriptionEs: 'metaDescription.es',
      noIndex: 'noIndex',
    },
    prepare({ title, titleEs, description, descriptionEs, noIndex }) {
      const seoTitle = title || 'SEO Settings';
      const seoDescription = description || 'No description';
      const translations = [titleEs, descriptionEs].filter(Boolean);
      const translationInfo = translations.length > 0 ? ` • ES: ${translations.join(', ').substring(0, 30)}...` : '';

      return {
        title: seoTitle,
        subtitle: `${seoDescription.substring(0, 50)}${seoDescription.length > 50 ? '...' : ''}${noIndex ? ' • No Index' : ''}${translationInfo}`,
      };
    },
  },
};
