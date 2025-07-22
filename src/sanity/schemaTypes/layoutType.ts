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
              const features = [];
              if (sticky) features.push('sticky');
              if (transparent) features.push('transparent');
              
              return {
                title: 'Header Section',
                subtitle: `${headerTitle || 'No header selected'}${features.length ? ` (${features.join(', ')})` : ''}`,
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
      options: {
        sortable: true,
      },
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        defineField({
          name: 'includeInSitemap',
          title: 'Include in Sitemap',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'noIndex',
          title: 'No Index',
          type: 'boolean',
          description: 'Prevent search engines from indexing pages using this layout',
          initialValue: false,
        }),
      ],
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
