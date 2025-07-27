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
      type: 'localeString',
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
        { type: 'productHeroSection' },
        { type: 'productFeatureSection' },
        { type: 'productInteractiveSection' },
        { type: 'productBannerSection' },
        { type: 'productPromotionBannerSection' },
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
      title: 'title.en',
      titleEs: 'title.es',
      isHomePage: 'isHomePage',
      sections: 'sections',
    },
    prepare({ title, titleEs, isHomePage, sections }) {
      const sectionCount = sections?.length || 0;
      const pageTitle = title || 'Untitled Page';
      const subtitle = `${sectionCount} section${sectionCount !== 1 ? 's' : ''}${titleEs ? ` • ES: ${titleEs}` : ''}`;
      return {
        title: `${pageTitle}${isHomePage ? ' (Home)' : ''}`,
        subtitle: subtitle,
      };
    },
  },
});
