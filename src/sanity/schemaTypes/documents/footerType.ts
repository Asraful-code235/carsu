import { defineField, defineType } from 'sanity';
import { ComponentIcon } from '@sanity/icons';
import { socialIconOptions } from '../shared/iconOptions';

export const footerType = defineType({
  name: 'footer',
  title: 'Footer Configuration',
  type: 'document',
  icon: ComponentIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Footer Title',
      type: 'string',
      description: 'Internal title for this footer configuration',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Footer Logo',
      type: 'object',
      fields: [
        defineField({
          name: 'image',
          title: 'Logo Image',
          type: 'image',
          options: {
            hotspot: true,
          },
        }),
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        }),
        defineField({
          name: 'width',
          title: 'Width (pixels)',
          type: 'number',
          initialValue: 100,
        }),
        defineField({
          name: 'height',
          title: 'Height (pixels)',
          type: 'number',
          initialValue: 28,
        }),
      ],
    }),
    defineField({
      name: 'description',
      title: 'Footer Description',
      type: 'richTextBlock',
      description: 'Brief description or tagline for your company',
    }),
    defineField({
      name: 'columns',
      title: 'Footer Columns',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Column Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'links',
              title: 'Column Links',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'title',
                      title: 'Link Title',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'href',
                      title: 'Link URL',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'openInNewTab',
                      title: 'Open in New Tab',
                      type: 'boolean',
                      initialValue: false,
                    }),
                  ],
                  preview: {
                    select: {
                      title: 'title',
                      href: 'href',
                    },
                    prepare({ title, href }) {
                      return {
                        title,
                        subtitle: href,
                      };
                    },
                  },
                },
              ],
              validation: (Rule) => Rule.max(10),
            }),
          ],
          preview: {
            select: {
              title: 'title',
              links: 'links',
            },
            prepare({ title, links }) {
              const linkCount = links?.length || 0;
              return {
                title,
                subtitle: `${linkCount} link${linkCount !== 1 ? 's' : ''}`,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.max(4).warning('Consider limiting to 4 columns for better layout'),
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: socialIconOptions,
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'Profile URL',
              type: 'url',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              platform: 'platform',
              url: 'url',
            },
            prepare({ platform, url }) {
              return {
                title: platform,
                subtitle: url,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.max(8),
    }),
    defineField({
      name: 'copyrightText',
      title: 'Copyright Text',
      type: 'string',
      description: 'Copyright notice (year will be automatically added)',
      initialValue: '© {year} Your Company Name. All rights reserved.',
    }),
    defineField({
      name: 'showBackToTop',
      title: 'Show Back to Top Button',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'newsletter',
      title: 'Newsletter Signup',
      type: 'object',
      fields: [
        defineField({
          name: 'enabled',
          title: 'Enable Newsletter Signup',
          type: 'boolean',
          initialValue: false,
        }),
        defineField({
          name: 'title',
          title: 'Newsletter Title',
          type: 'string',
          initialValue: 'Subscribe to our newsletter',
        }),
        defineField({
          name: 'description',
          title: 'Newsletter Description',
          type: 'text',
          rows: 2,
          initialValue: 'Get the latest updates and news delivered to your inbox.',
        }),
        defineField({
          name: 'placeholder',
          title: 'Email Placeholder',
          type: 'string',
          initialValue: 'Enter your email address',
        }),
        defineField({
          name: 'buttonText',
          title: 'Subscribe Button Text',
          type: 'string',
          initialValue: 'Subscribe',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      logo: 'logo.image',
      columns: 'columns',
    },
    prepare({ title, logo, columns }) {
      const columnCount = columns?.length || 0;
      return {
        title,
        subtitle: `${columnCount} column${columnCount !== 1 ? 's' : ''}`,
        media: logo,
      };
    },
  },
});
