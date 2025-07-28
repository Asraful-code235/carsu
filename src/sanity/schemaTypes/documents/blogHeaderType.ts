import { defineField, defineType } from 'sanity';
import { DocumentTextIcon } from '@sanity/icons';

export const blogHeaderType = defineType({
  name: 'blogHeader',
  title: 'Blog Header Configuration',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Configuration Title',
      type: 'string',
      description: 'Internal title for this blog header configuration',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slides',
      title: 'Header Slides',
      type: 'array',
      of: [
        defineField({
          name: 'slide',
          title: 'Header Slide',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Slide Title',
              type: 'localeString',
              validation: (Rule) => Rule.required(),
              description: 'Main title for the slide (e.g., "5 Reasons to Switch to Carsu Today")',
            }),
            defineField({
              name: 'bulletPoints',
              title: 'Bullet Points',
              type: 'array',
              of: [
                {
                  type: 'localeString',
                  validation: (Rule) => Rule.required(),
                }
              ],
              validation: (Rule) => Rule.min(1).max(10),
              description: 'List of bullet points (e.g., "Easy-to-use interface")',
            }),
            defineField({
              name: 'ctaButton',
              title: 'CTA Button',
              type: 'object',
              fields: [
                defineField({
                  name: 'text',
                  title: 'Button Text',
                  type: 'localeString',
                  validation: (Rule) => Rule.required(),
                  description: 'Text for the CTA button (e.g., "Read More")',
                }),
                defineField({
                  name: 'href',
                  title: 'Button Link',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                  description: 'URL or path for the button link',
                }),
                defineField({
                  name: 'openInNewTab',
                  title: 'Open in New Tab',
                  type: 'boolean',
                  initialValue: false,
                }),
              ],
              description: 'Call-to-action button for the slide',
            }),
            defineField({
              name: 'heroImage',
              title: 'Hero Image',
              type: 'imageWithAlt',
              validation: (Rule) => Rule.required(),
              description: 'Main image for the slide (736x410px recommended)',
            }),
            defineField({
              name: 'isActive',
              title: 'Active Slide',
              type: 'boolean',
              initialValue: false,
              description: 'Mark this slide as the currently active one (only one should be active)',
            }),
          ],
          preview: {
            select: {
              title: 'title.en',
              titleEs: 'title.es',
              isActive: 'isActive',
              heroImage: 'heroImage.image',
              bulletPoints: 'bulletPoints',
            },
            prepare({ title, titleEs, isActive, heroImage, bulletPoints }) {
              const pointCount = bulletPoints?.length || 0;
              const translationInfo = titleEs ? ` • ES: ${titleEs}` : '';
              const activeInfo = isActive ? ' • ACTIVE' : '';
              
              return {
                title: title || 'Blog Header Slide',
                subtitle: `${pointCount} point${pointCount !== 1 ? 's' : ''}${activeInfo}${translationInfo}`,
                media: heroImage,
              };
            },
          },
        }),
      ],
      validation: (Rule) => Rule.min(1).max(10),
      description: 'Slides for the blog header carousel (1-10 slides)',
    }),
    defineField({
      name: 'mostPopularText',
      title: 'Most Popular Section Title',
      type: 'localeString',
      description: 'Title for the "Most Popular" section below the header (e.g., "Most Popular", "Más Popular")',
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      initialValue: '#FCFBFC',
      description: 'Background color for the header section (default: #FCFBFC)',
    }),
    defineField({
      name: 'settings',
      title: 'Header Settings',
      type: 'object',
      fields: [
        defineField({
          name: 'autoplay',
          title: 'Autoplay Slides',
          type: 'boolean',
          initialValue: false,
          description: 'Automatically advance slides',
        }),
        defineField({
          name: 'autoplayInterval',
          title: 'Autoplay Interval (seconds)',
          type: 'number',
          initialValue: 5,
          validation: (Rule) => Rule.min(1).max(30),
          description: 'Time between slide transitions (1-30 seconds)',
          hidden: ({ parent }) => !parent?.autoplay,
        }),
        defineField({
          name: 'showIndicators',
          title: 'Show Slide Indicators',
          type: 'boolean',
          initialValue: true,
          description: 'Show dot indicators for slides',
        }),
        defineField({
          name: 'height',
          title: 'Header Height',
          type: 'string',
          options: {
            list: [
              { title: 'Small (480px)', value: '480px' },
              { title: 'Medium (680px)', value: '680px' },
              { title: 'Large (800px)', value: '800px' },
              { title: 'Extra Large (1000px)', value: '1000px' },
            ],
          },
          initialValue: '680px',
          description: 'Height of the header section',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      slides: 'slides',
    },
    prepare({ title, slides }) {
      const slideCount = slides?.length || 0;
      const activeSlide = slides?.find((slide: any) => slide.isActive);
      const activeInfo = activeSlide ? ` • Active: ${activeSlide.title?.en || 'Slide'}` : '';
      
      return {
        title: title || 'Blog Header Configuration',
        subtitle: `${slideCount} slide${slideCount !== 1 ? 's' : ''}${activeInfo}`,
        media: DocumentTextIcon,
      };
    },
  },
});
