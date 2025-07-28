import { defineField, defineType } from 'sanity';
import { CogIcon } from '@sanity/icons';

export const layoutType = defineType({
  name: 'siteLayout',
  title: 'Site Layout Configuration',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Configuration Title',
      type: 'string',
      description: 'Internal title for this layout configuration',
      initialValue: 'Site Layout Configuration',
      readOnly: true,
    }),
    defineField({
      name: 'sections',
      title: 'Layout Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'headerSection',
          title: 'Header Section',
          fields: [
            defineField({
              name: 'type',
              title: 'Section Type',
              type: 'string',
              readOnly: true,
              initialValue: 'header',
            }),
            defineField({
              name: 'header',
              title: 'Header Configuration',
              type: 'reference',
              to: [{ type: 'header' }],
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'sticky',
              title: 'Sticky Header',
              type: 'boolean',
              initialValue: true,
            }),
            defineField({
              name: 'transparent',
              title: 'Transparent Background',
              type: 'boolean',
              initialValue: false,
            }),
          ],
          preview: {
            select: {
              headerTitle: 'header.title',
              sticky: 'sticky',
              transparent: 'transparent',
            },
            prepare({ headerTitle, sticky, transparent }) {
              return {
                title: 'Header Section',
                subtitle: `${headerTitle || 'No header selected'}${sticky ? ' • Sticky' : ''}${transparent ? ' • Transparent' : ''}`,
              };
            },
          },
        },
        {
          type: 'object',
          name: 'footerSection',
          title: 'Footer Section',
          fields: [
            defineField({
              name: 'type',
              title: 'Section Type',
              type: 'string',
              readOnly: true,
              initialValue: 'footer',
            }),
            defineField({
              name: 'footer',
              title: 'Footer Configuration',
              type: 'reference',
              to: [{ type: 'footer' }],
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              footerTitle: 'footer.title',
            },
            prepare({ footerTitle }) {
              return {
                title: 'Footer Section',
                subtitle: footerTitle || 'No footer selected',
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
      description: 'Configure the global layout sections for your site',
    }),
    defineField({
      name: 'seo',
      title: 'Global SEO Settings',
      type: 'seoFields',
      description: 'Default SEO settings that apply to all pages unless overridden',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      sections: 'sections',
    },
    prepare({ title, sections }) {
      const sectionCount = sections?.length || 0;
      return {
        title: title || 'Site Layout Configuration',
        subtitle: `${sectionCount} section${sectionCount !== 1 ? 's' : ''}`,
      };
    },
  },
});
