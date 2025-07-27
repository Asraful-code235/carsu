import { StarIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const productHeroSectionType = defineType({
  name: 'productHeroSection',
  title: 'Product Hero Section',
  type: 'object',
  icon: StarIcon,
  fields: [
    defineField({
      name: 'type',
      title: 'Section Type',
      type: 'string',
      readOnly: true,
      initialValue: 'productHero',
    }),
    defineField({
      name: 'pillText',
      title: 'Pill Text',
      type: 'localeString',
      description: 'Small text that appears in a pill/badge above the title',
    }),
    defineField({
      name: 'title',
      title: 'Main Title',
      type: 'localeRichTextBlock',
      description: 'Main hero title with colored text support (localized)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'localeString',
      description: 'Supporting subtitle text below the main title',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localeRichTextBlock',
      description: 'Detailed description text (localized)',
    }),
    defineField({
      name: 'ctaButtons',
      title: 'CTA Buttons',
      type: 'array',
      of: [{ type: 'ctaButton' }],
      validation: (Rule) => Rule.max(3),
      description: 'Primary action buttons for the hero section',
    }),
    defineField({
      name: 'heroVideo',
      title: 'Hero Video',
      type: 'videoWithAlt',
      description: 'Main hero video (product demo, walkthrough, etc.) - takes priority over image if provided',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'imageWithAlt',
      validation: (Rule) => Rule.required(),
      description: 'Main hero image (product screenshot, dashboard, etc.) - shown if no video is provided',
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'backgroundColor',
    }),
    defineField({
      name: 'backgroundElements',
      title: 'Background Elements',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Background Image',
              type: 'image',
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'position',
              title: 'Position',
              type: 'object',
              fields: [
                defineField({
                  name: 'top',
                  title: 'Top (%)',
                  type: 'string',
                  description: 'e.g., "10%" or "auto"',
                }),
                defineField({
                  name: 'left',
                  title: 'Left (%)',
                  type: 'string',
                  description: 'e.g., "20%" or "auto"',
                }),
                defineField({
                  name: 'right',
                  title: 'Right (%)',
                  type: 'string',
                  description: 'e.g., "15%" or "auto"',
                }),
                defineField({
                  name: 'bottom',
                  title: 'Bottom (%)',
                  type: 'string',
                  description: 'e.g., "5%" or "auto"',
                }),
              ],
            }),
            defineField({
              name: 'size',
              title: 'Size',
              type: 'string',
              options: {
                list: [
                  { title: 'Small', value: 'sm' },
                  { title: 'Medium', value: 'md' },
                  { title: 'Large', value: 'lg' },
                  { title: 'Extra Large', value: 'xl' },
                ],
              },
              initialValue: 'md',
            }),
            defineField({
              name: 'opacity',
              title: 'Opacity (%)',
              type: 'number',
              validation: (Rule) => Rule.min(0).max(100),
              initialValue: 50,
              description: 'Transparency level (0-100%)',
            }),
            defineField({
              name: 'rotation',
              title: 'Rotation (degrees)',
              type: 'number',
              validation: (Rule) => Rule.min(-360).max(360),
              initialValue: 0,
              description: 'Rotation angle (-360 to 360 degrees)',
            }),
            defineField({
              name: 'zIndex',
              title: 'Layer Order',
              type: 'number',
              initialValue: -1,
              description: 'Higher numbers appear in front',
            }),
          ],
          preview: {
            select: {
              image: 'image',
              size: 'size',
              opacity: 'opacity',
            },
            prepare({ image, size, opacity }) {
              return {
                title: 'Background Element',
                subtitle: `${size} • ${opacity}% opacity`,
                media: image,
              };
            },
          },
        },
      ],
      description: 'Decorative background elements for visual enhancement',
    }),
    defineField({
      name: 'settings',
      title: 'Hero Settings',
      type: 'object',
      fields: [
        defineField({
          name: 'fullHeight',
          title: 'Full Viewport Height',
          type: 'boolean',
          initialValue: false,
          description: 'Make hero section fill the entire viewport height',
        }),
        defineField({
          name: 'centerContent',
          title: 'Center Content',
          type: 'boolean',
          initialValue: false,
          description: 'Center content vertically and horizontally',
        }),
        defineField({
          name: 'showScrollIndicator',
          title: 'Show Scroll Indicator',
          type: 'boolean',
          initialValue: false,
          description: 'Display a scroll down indicator at the bottom',
        }),
        defineField({
          name: 'parallaxEffect',
          title: 'Enable Parallax Effect',
          type: 'boolean',
          initialValue: false,
          description: 'Add parallax scrolling effect to background elements',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      pillText: 'pillText',
      heroVideo: 'heroVideo.poster',
      heroImage: 'heroImage.image',
      ctaButtons: 'ctaButtons',
    },
    prepare({ title, pillText, heroVideo, heroImage, ctaButtons }) {
      // Extract plain text from rich text for preview
      const titleText = title?.[0]?.children?.map((child: any) => child.text).join('') || 'Product Hero Section';
      const buttonCount = ctaButtons?.length || 0;
      const pillTextValue = pillText?.en || pillText || '';
      const mediaType = heroVideo ? 'Video' : 'Image';

      return {
        title: titleText,
        subtitle: `${pillTextValue ? `${pillTextValue} • ` : ''}${mediaType} • ${buttonCount} CTA button${buttonCount !== 1 ? 's' : ''}`,
        media: heroVideo || heroImage,
      };
    },
  },
});
