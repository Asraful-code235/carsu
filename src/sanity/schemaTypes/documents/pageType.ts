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
      type: 'seoFields',
    }),
    defineField({
      name: 'sections',
      title: 'Page Sections',
      type: 'array',
      of: [
        { type: 'heroSection' },
        { type: 'aboutSection' },
        { type: 'pageHeroSection' },
        { type: 'contentSection' },
        { type: 'featureSection' },
        { type: 'servicesSection' },
        { type: 'testimonialSection' },
        { type: 'tryCarsuBanner' },
        { type: 'contactFormSection' },
        { type: 'faqSection' },
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
