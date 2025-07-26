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
        }),
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'localeString',
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
      title: 'Navigation Menu',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Menu Item Title',
              type: 'localeString',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'href',
              title: 'Link URL',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'hasDropdown',
              title: 'Has Dropdown Menu',
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
                  initialValue: 2,
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
                      { title: 'Small (300px)', value: 'small' },
                      { title: 'Medium (500px)', value: 'medium' },
                      { title: 'Large (700px)', value: 'large' },
                      { title: 'Extra Large (900px)', value: 'xl' },
                    ],
                  },
                  initialValue: 'medium',
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
                      type: 'localeString',
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
                      title: 'Item Description',
                      type: 'localeString',
                    }),
                    defineField({
                      name: 'image',
                      title: 'Item Image',
                      type: 'imageWithAlt',
                    }),
                    defineField({
                      name: 'badge',
                      title: 'Badge',
                      type: 'object',
                      fields: [
                        defineField({
                          name: 'text',
                          title: 'Badge Text',
                          type: 'localeString',
                          validation: (Rule) => Rule.max(10),
                        }),
                        defineField({
                          name: 'color',
                          title: 'Badge Color',
                          type: 'string',
                          options: {
                            list: [
                              { title: 'Blue', value: 'blue' },
                              { title: 'Green', value: 'green' },
                              { title: 'Yellow', value: 'yellow' },
                              { title: 'Red', value: 'red' },
                              { title: 'Purple', value: 'purple' },
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
                      badge: 'badge.text',
                    },
                    prepare({ title, description, badge }) {
                      return {
                        title,
                        subtitle: `${description || 'No description'}${badge ? ` • ${badge}` : ''}`,
                      };
                    },
                  },
                },
              ],
              hidden: ({ parent }) => !parent?.hasDropdown,
              validation: (Rule) => Rule.max(12),
            }),
          ],
          preview: {
            select: {
              title: 'title',
              hasDropdown: 'hasDropdown',
              dropdownItems: 'dropdownItems',
            },
            prepare({ title, hasDropdown, dropdownItems }) {
              const itemCount = dropdownItems?.length || 0;
              return {
                title,
                subtitle: hasDropdown ? `Dropdown (${itemCount} items)` : 'Link',
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.max(8).warning('Consider limiting to 8 main navigation items'),
    }),
    defineField({
      name: 'ctaButtons',
      title: 'CTA Buttons',
      type: 'array',
      of: [{ type: 'ctaButton' }],
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
      navigation: 'navigation',
    },
    prepare({ title, logo, navigation }) {
      const navCount = navigation?.length || 0;
      return {
        title,
        subtitle: `${navCount} navigation item${navCount !== 1 ? 's' : ''}`,
        media: logo,
      };
    },
  },
});
