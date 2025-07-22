import { defineField, defineType } from 'sanity';
import { ComponentIcon } from '@sanity/icons';

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
      type: 'text',
      rows: 3,
      description: 'Brief description or tagline for the footer',
    }),
    defineField({
      name: 'linkColumns',
      title: 'Link Columns',
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
              title: 'Links',
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
                list: [
                  { title: 'Facebook', value: 'facebook' },
                  { title: 'Twitter', value: 'twitter' },
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'LinkedIn', value: 'linkedin' },
                  { title: 'YouTube', value: 'youtube' },
                  { title: 'GitHub', value: 'github' },
                ],
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
  ],
  preview: {
    select: {
      title: 'title',
      logo: 'logo.image',
    },
    prepare({ title, logo }) {
      return {
        title,
        media: logo,
      };
    },
  },
});
