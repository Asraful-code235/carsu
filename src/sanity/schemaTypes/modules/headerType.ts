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
              name: 'dropdownLayout',
              title: 'Dropdown Layout',
              type: 'object',
              fields: [
                defineField({
                  name: 'columns',
                  title: 'Number of Columns',
                  type: 'number',
                  options: {
                    list: [
                      { title: '1 Column', value: 1 },
                      { title: '2 Columns', value: 2 },
                      { title: '3 Columns', value: 3 },
                      { title: '4 Columns', value: 4 },
                    ],
                  },
                  initialValue: 1,
                  validation: (Rule) => Rule.min(1).max(4),
                }),
                defineField({
                  name: 'showImages',
                  title: 'Show Images in Dropdown',
                  type: 'boolean',
                  initialValue: false,
                }),
                defineField({
                  name: 'width',
                  title: 'Dropdown Width',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Small (320px)', value: 'sm' },
                      { title: 'Medium (480px)', value: 'md' },
                      { title: 'Large (640px)', value: 'lg' },
                      { title: 'Extra Large (800px)', value: 'xl' },
                      { title: 'Full Width', value: 'full' },
                    ],
                  },
                  initialValue: 'md',
                }),
              ],
              hidden: ({ parent }) => !parent?.hasDropdown,
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
                    defineField({
                      name: 'image',
                      title: 'Item Image',
                      type: 'image',
                      options: {
                        hotspot: true,
                      },
                      fields: [
                        defineField({
                          name: 'alt',
                          title: 'Alt Text',
                          type: 'string',
                        }),
                      ],
                      description: 'Only visible when "Show Images in Dropdown" is enabled for this navigation item',
                    }),
                    defineField({
                      name: 'badge',
                      title: 'Badge',
                      type: 'object',
                      fields: [
                        defineField({
                          name: 'text',
                          title: 'Badge Text',
                          type: 'string',
                        }),
                        defineField({
                          name: 'color',
                          title: 'Badge Color',
                          type: 'string',
                          options: {
                            list: [
                              { title: 'Blue', value: 'blue' },
                              { title: 'Green', value: 'green' },
                              { title: 'Red', value: 'red' },
                              { title: 'Yellow', value: 'yellow' },
                              { title: 'Purple', value: 'purple' },
                              { title: 'Gray', value: 'gray' },
                            ],
                          },
                          initialValue: 'blue',
                        }),
                      ],
                    }),
                  ],
                  preview: {
                    select: {
                      title: 'title',
                      description: 'description',
                      image: 'image',
                      badge: 'badge.text',
                    },
                    prepare({ title, description, image, badge }) {
                      return {
                        title,
                        subtitle: badge ? `${description || ''} • ${badge}` : description,
                        media: image,
                      };
                    },
                  },
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
