import { defineField, defineType } from 'sanity';
import { MenuIcon } from '@sanity/icons';

export const headerType = defineType({
  name: 'header',
  title: 'Header Configuration',
  type: 'document',
  icon: MenuIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Header Title',
      type: 'string',
      description: 'Internal title for this header configuration',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'object',
      fields: [
        defineField({
          name: 'image',
          title: 'Logo Image',
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
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'width',
          title: 'Width (pixels)',
          type: 'number',
          initialValue: 120,
        }),
        defineField({
          name: 'height',
          title: 'Height (pixels)',
          type: 'number',
          initialValue: 32,
        }),
      ],
    }),
    defineField({
      name: 'navigation',
      title: 'Navigation Links',
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
              description: 'Use relative paths for internal links (e.g., /about)',
            }),
            defineField({
              name: 'hasDropdown',
              title: 'Has Dropdown',
              type: 'boolean',
              initialValue: false,
            }),
            defineField({
              name: 'dropdownItems',
              title: 'Dropdown Items',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'title',
                      title: 'Item Title',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'href',
                      title: 'Item URL',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'description',
                      title: 'Description',
                      type: 'text',
                      rows: 2,
                    }),
                  ],
                },
              ],
              hidden: ({ parent }) => !parent?.hasDropdown,
            }),
          ],
          preview: {
            select: {
              title: 'title',
              hasDropdown: 'hasDropdown',
            },
            prepare({ title, hasDropdown }) {
              return {
                title,
                subtitle: hasDropdown ? 'Has dropdown' : 'Simple link',
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: 'ctaButtons',
      title: 'CTA Buttons',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Button Text',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'href',
              title: 'Button URL',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'variant',
              title: 'Button Style',
              type: 'string',
              options: {
                list: [
                  { title: 'Primary', value: 'primary' },
                  { title: 'Secondary', value: 'secondary' },
                  { title: 'Outline', value: 'outline' },
                ],
              },
              initialValue: 'primary',
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
              variant: 'variant',
            },
            prepare({ title, variant }) {
              return {
                title,
                subtitle: `${variant} button`,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.max(3).warning('Consider limiting to 3 CTA buttons for better UX'),
    }),
    defineField({
      name: 'mobileSettings',
      title: 'Mobile Menu Settings',
      type: 'object',
      fields: [
        defineField({
          name: 'showCTAInMobile',
          title: 'Show CTA Buttons in Mobile Menu',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'mobileMenuPosition',
          title: 'Mobile Menu Position',
          type: 'string',
          options: {
            list: [
              { title: 'Below Header', value: 'below' },
              { title: 'Overlay', value: 'overlay' },
            ],
          },
          initialValue: 'below',
        }),
      ],
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
