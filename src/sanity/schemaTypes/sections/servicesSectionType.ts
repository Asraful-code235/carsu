import { defineField, defineType } from 'sanity';
import { CogIcon } from '@sanity/icons';
import { iconOptions } from '../shared/iconOptions';

export const servicesSectionType = defineType({
  name: 'servicesSection',
  title: 'Services Section',
  type: 'object',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'type',
      title: 'Section Type',
      type: 'string',
      initialValue: 'services',
      hidden: true,
    }),
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'localeRichTextBlock',
      description: 'Main heading for the services section (localized)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Section Description',
      type: 'localeRichTextBlock',
      description: 'Description text that appears below the title (localized)',
    }),
    defineField({
      name: 'services',
      title: 'Services',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Service Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Service Description',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'icon',
              title: 'Service Icon',
              type: 'string',
              options: {
                list: [
                  ...iconOptions,
                  { title: 'Chat/Support', value: 'chat' },
                  { title: 'Database', value: 'database' },
                  { title: 'Book/Knowledge', value: 'book' },
                  { title: 'Settings/Tools', value: 'settings' },
                  { title: 'Shield/Security', value: 'shield' },
                  { title: 'Cloud', value: 'cloud' },
                  { title: 'Phone', value: 'phone' },
                  { title: 'Email', value: 'email' },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'title',
              description: 'description',
              icon: 'icon',
            },
            prepare({ title, description, icon }) {
              return {
                title,
                subtitle: `${icon} • ${description?.substring(0, 50)}...`,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1).max(6),
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'color',
      description: 'Optional background color for the section',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'object',
      fields: [
        defineField({
          name: 'image',
          title: 'Background Image',
          type: 'image',
          options: {
            hotspot: true,
          },
          description: 'Background image (e.g., decorative SVG, glow effects)',
        }),
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Alternative text for the background image',
        }),
        defineField({
          name: 'position',
          title: 'Image Position',
          type: 'string',
          options: {
            list: [
              { title: 'Top Left', value: 'top-left' },
              { title: 'Top Center', value: 'top-center' },
              { title: 'Top Right', value: 'top-right' },
              { title: 'Center Left', value: 'center-left' },
              { title: 'Center', value: 'center' },
              { title: 'Center Right', value: 'center-right' },
              { title: 'Bottom Left', value: 'bottom-left' },
              { title: 'Bottom Center', value: 'bottom-center' },
              { title: 'Bottom Right', value: 'bottom-right' },
            ],
          },
          initialValue: 'bottom-center',
          description: 'Position of the background image within the section',
        }),
        defineField({
          name: 'size',
          title: 'Image Size',
          type: 'string',
          options: {
            list: [
              { title: 'Cover', value: 'cover' },
              { title: 'Contain', value: 'contain' },
              { title: 'Auto', value: 'auto' },
              { title: 'Small (25%)', value: '25%' },
              { title: 'Medium (50%)', value: '50%' },
              { title: 'Large (75%)', value: '75%' },
              { title: 'Full (100%)', value: '100%' },
            ],
          },
          initialValue: 'auto',
          description: 'Size of the background image',
        }),
        defineField({
          name: 'opacity',
          title: 'Image Opacity',
          type: 'number',
          validation: (Rule) => Rule.min(0).max(1),
          initialValue: 1,
          description: 'Opacity of the background image (0 = transparent, 1 = opaque)',
        }),
        defineField({
          name: 'repeat',
          title: 'Image Repeat',
          type: 'string',
          options: {
            list: [
              { title: 'No Repeat', value: 'no-repeat' },
              { title: 'Repeat', value: 'repeat' },
              { title: 'Repeat X', value: 'repeat-x' },
              { title: 'Repeat Y', value: 'repeat-y' },
            ],
          },
          initialValue: 'no-repeat',
          description: 'How the background image should repeat',
        }),
      ],
      description: 'Optional background image for decorative effects (like green glow)',
    }),
    defineField({
      name: 'padding',
      title: 'Section Padding',
      type: 'object',
      fields: [
        defineField({
          name: 'top',
          title: 'Top Padding',
          type: 'string',
          options: {
            list: [
              { title: 'None', value: 'none' },
              { title: 'Small', value: 'small' },
              { title: 'Medium', value: 'medium' },
              { title: 'Large', value: 'large' },
              { title: 'Extra Large', value: 'xl' },
            ],
          },
          initialValue: 'large',
        }),
        defineField({
          name: 'bottom',
          title: 'Bottom Padding',
          type: 'string',
          options: {
            list: [
              { title: 'None', value: 'none' },
              { title: 'Small', value: 'small' },
              { title: 'Medium', value: 'medium' },
              { title: 'Large', value: 'large' },
              { title: 'Extra Large', value: 'xl' },
            ],
          },
          initialValue: 'large',
        }),
      ],
    }),
    defineField({
      name: 'settings',
      title: 'Section Settings',
      type: 'object',
      fields: [
        defineField({
          name: 'layout',
          title: 'Services Layout',
          type: 'string',
          options: {
            list: [
              { title: 'Grid (2 columns)', value: 'grid-2' },
              { title: 'Grid (3 columns)', value: 'grid-3' },
              { title: 'Grid (4 columns)', value: 'grid-4' },
              { title: 'List (vertical)', value: 'list' },
            ],
          },
          initialValue: 'grid-3',
        }),
        defineField({
          name: 'textAlignment',
          title: 'Text Alignment',
          type: 'object',
          fields: [
            defineField({
              name: 'desktop',
              title: 'Desktop Alignment',
              type: 'string',
              options: {
                list: [
                  { title: 'Left', value: 'left' },
                  { title: 'Center', value: 'center' },
                  { title: 'Right', value: 'right' },
                ],
              },
              initialValue: 'center',
            }),
            defineField({
              name: 'mobile',
              title: 'Mobile Alignment',
              type: 'string',
              options: {
                list: [
                  { title: 'Left', value: 'left' },
                  { title: 'Center', value: 'center' },
                  { title: 'Right', value: 'right' },
                ],
              },
              initialValue: 'center',
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      services: 'services',
    },
    prepare({ title, services }) {
      const titleText = title?.[0]?.children?.map((child: any) => child.text).join('') || 'Services Section';
      const serviceCount = services?.length || 0;
      return {
        title: titleText,
        subtitle: `${serviceCount} service${serviceCount !== 1 ? 's' : ''}`,
      };
    },
  },
});
