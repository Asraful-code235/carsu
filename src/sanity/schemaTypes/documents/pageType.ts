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
        // === HERO SECTIONS ===
        {
          type: 'heroSection',
          title: '🎯 Hero Section',
          description: 'Main landing section with title, subtitle, CTA buttons and hero image. Best for homepage top section.'
        },
        {
          type: 'pageHeroSection',
          title: '📄 Page Hero Section',
          description: 'Two-column hero for internal pages with title and description. Good for service/info page headers.'
        },

        // === PRODUCT SECTIONS ===
        {
          type: 'productHeroSection',
          title: '🚀 Product Hero Section',
          description: 'Product-focused hero with pill text, title, description, CTAs and product image. Perfect for product pages.'
        },
        {
          type: 'productFeatureSection',
          title: '⭐ Product Feature Section',
          description: 'Single feature showcase with title, description, feature list and image. Great for highlighting key product benefits.'
        },
        {
          type: 'productFeaturesGridSection',
          title: '🔲 Product Features Grid',
          description: '2x2 grid of feature cards with alternating heights. Perfect for showcasing 4 key features.'
        },
        {
          type: 'productBenefitsListSection',
          title: '📋 Product Benefits List',
          description: 'Benefits list with image, title, description and bullet points with dividers. Great for detailed feature explanations.'
        },
        {
          type: 'productInteractiveSection',
          title: '🎮 Product Interactive Section',
          description: 'Interactive section with clickable titles showing different content. Perfect for feature comparisons.'
        },
        {
          type: 'productBannerSection',
          title: '📢 Product Banner Section',
          description: 'Simple banner with title, description and CTA. Good for announcements or secondary CTAs.'
        },
        {
          type: 'productPromotionBannerSection',
          title: '🎨 Product Promotion Banner',
          description: 'Full-width promotional banner with background image, overlay, badge and CTAs. Perfect for campaigns.'
        },

        // === FEATURE SECTIONS ===
        {
          type: 'featureSection',
          title: '✨ Feature Section',
          description: 'Feature grid with cards, icons, titles and descriptions. Great for showcasing multiple features.'
        },
        {
          type: 'featureCardsSection',
          title: '🃏 Feature Cards Section',
          description: 'Grid of feature cards with icons, titles and descriptions. Good for feature overviews.'
        },

        // === CONTENT SECTIONS ===
        {
          type: 'contentSection',
          title: '📝 Content Section',
          description: 'Flexible rich text content section with background options. Perfect for long-form content.'
        },
        {
          type: 'aboutSection',
          title: '📖 About Section',
          description: 'Simple content section with title, subtitle and rich text content. Perfect for about pages.'
        },
        {
          type: 'servicesSection',
          title: '🛠️ Services Section',
          description: 'Services showcase with cards and descriptions. Perfect for service offerings.'
        },

        // === SOCIAL PROOF & ENGAGEMENT ===
        {
          type: 'testimonialSection',
          title: '💬 Testimonials Section',
          description: 'Customer testimonials carousel with quotes, names and companies. Essential for social proof.'
        },

        // === INTERACTIVE SECTIONS ===
        {
          type: 'contactFormSection',
          title: '📧 Contact Form Section',
          description: 'Contact form with fields and submission handling. Perfect for contact pages.'
        },
        {
          type: 'faqSection',
          title: '❓ FAQ Section',
          description: 'Frequently asked questions with expandable answers. Great for support pages.'
        },
        {
          type: 'pricingCalculatorSection',
          title: '💰 Pricing Calculator',
          description: 'Interactive pricing calculator. Perfect for pricing pages.'
        },
        {
          type: 'pricingSection',
          title: '💳 Pricing Section',
          description: 'Pricing plans with features and CTA buttons. Perfect for pricing pages with up to 3 plans.'
        },

        // === CTA BANNERS ===
        {
          type: 'tryCarsuBanner',
          title: '🚗 Try Carsu Banner',
          description: 'Carsu-specific CTA banner. Use for encouraging trial signups.'
        },
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
