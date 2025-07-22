import { defineField, defineType } from 'sanity';
import { DocumentIcon } from '@sanity/icons';

export const pageType = defineType({
  name: 'page',
  title: 'Page Configuration',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      description: 'Internal title for this page configuration',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Page Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isHomePage',
      title: 'Is Home Page',
      type: 'boolean',
      description: 'Mark this as the home page configuration',
      initialValue: false,
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          validation: (Rule) => Rule.max(60).warning('Keep under 60 characters for optimal SEO'),
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
          validation: (Rule) => Rule.max(160).warning('Keep under 160 characters for optimal SEO'),
        }),
        defineField({
          name: 'ogImage',
          title: 'Open Graph Image',
          type: 'image',
          options: {
            hotspot: true,
          },
        }),
      ],
    }),
    defineField({
      name: 'sections',
      title: 'Page Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'heroSection',
          title: 'Hero Section',
          fields: [
            defineField({
              name: 'type',
              title: 'Section Type',
              type: 'string',
              readOnly: true,
              initialValue: 'hero',
            }),
            defineField({
              name: 'heading',
              title: 'Main Heading',
              type: 'object',
              fields: [
                defineField({
                  name: 'line1',
                  title: 'First Line',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'line2',
                  title: 'Second Line (Highlighted)',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
              ],
            }),
            defineField({
              name: 'subtitle',
              title: 'Subtitle',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.required(),
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
                      name: 'text',
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
                        ],
                      },
                      initialValue: 'primary',
                    }),
                  ],
                  preview: {
                    select: {
                      title: 'text',
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
              validation: (Rule) => Rule.max(2).warning('Consider limiting to 2 CTA buttons'),
            }),
            defineField({
              name: 'dashboardImage',
              title: 'Dashboard Preview Image',
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
            }),
            defineField({
              name: 'backgroundColor',
              title: 'Background Color',
              type: 'color',
              description: 'Choose a background color for the hero section',
              options: {
                disableAlpha: false,
              },
            }),
            defineField({
              name: 'backgroundElements',
              title: 'Background Decorative Elements',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'image',
                      title: 'Decorative Image',
                      type: 'image',
                      options: {
                        hotspot: true,
                      },
                    }),
                    defineField({
                      name: 'position',
                      title: 'Position',
                      type: 'object',
                      fields: [
                        defineField({
                          name: 'top',
                          title: 'Top Position',
                          type: 'string',
                          description: 'CSS top value (e.g., "20px", "10%")',
                        }),
                        defineField({
                          name: 'left',
                          title: 'Left Position',
                          type: 'string',
                          description: 'CSS left value (e.g., "100px", "30%")',
                        }),
                        defineField({
                          name: 'right',
                          title: 'Right Position',
                          type: 'string',
                          description: 'CSS right value (e.g., "50px", "20%")',
                        }),
                        defineField({
                          name: 'bottom',
                          title: 'Bottom Position',
                          type: 'string',
                          description: 'CSS bottom value (e.g., "30px", "15%")',
                        }),
                      ],
                    }),
                    defineField({
                      name: 'size',
                      title: 'Size',
                      type: 'string',
                      options: {
                        list: [
                          { title: 'Small (128px)', value: 'sm' },
                          { title: 'Medium (224px)', value: 'md' },
                          { title: 'Large (320px)', value: 'lg' },
                        ],
                      },
                      initialValue: 'md',
                    }),
                    defineField({
                      name: 'opacity',
                      title: 'Opacity',
                      type: 'number',
                      validation: (Rule) => Rule.min(0).max(1),
                      initialValue: 0.3,
                    }),
                    defineField({
                      name: 'rotation',
                      title: 'Rotation (degrees)',
                      type: 'number',
                      validation: (Rule) => Rule.min(-180).max(180),
                      initialValue: 0,
                    }),
                  ],
                  preview: {
                    select: {
                      media: 'image',
                      position: 'position',
                      size: 'size',
                    },
                    prepare({ media, position, size }) {
                      const pos = position?.top || position?.left || position?.right || 'positioned';
                      return {
                        title: `Decorative element (${size})`,
                        subtitle: `Position: ${pos}`,
                        media,
                      };
                    },
                  },
                },
              ],
            }),
          ],
          preview: {
            select: {
              heading: 'heading.line1',
              subtitle: 'subtitle',
            },
            prepare({ heading, subtitle }) {
              return {
                title: 'Hero Section',
                subtitle: heading || subtitle || 'No content configured',
              };
            },
          },
        },
        // Placeholder for future sections
        {
          type: 'object',
          name: 'aboutSection',
          title: 'About Section',
          fields: [
            defineField({
              name: 'type',
              title: 'Section Type',
              type: 'string',
              readOnly: true,
              initialValue: 'about',
            }),
            defineField({
              name: 'title',
              title: 'Section Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'content',
              title: 'Content',
              type: 'text',
              rows: 5,
            }),
          ],
          preview: {
            select: {
              title: 'title',
            },
            prepare({ title }) {
              return {
                title: 'About Section',
                subtitle: title || 'No title configured',
              };
            },
          },
        },
      ],
      options: {
        sortable: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      isHomePage: 'isHomePage',
      sections: 'sections',
    },
    prepare({ title, isHomePage, sections }) {
      const sectionCount = sections?.length || 0;
      return {
        title: `${title}${isHomePage ? ' (Home)' : ''}`,
        subtitle: `${sectionCount} section${sectionCount !== 1 ? 's' : ''}`,
      };
    },
  },
});
