import { defineField, defineType } from 'sanity';
import { HelpCircleIcon } from '@sanity/icons';

export const faqSectionType = defineType({
  name: 'faqSection',
  title: 'FAQ Section',
  type: 'object',
  icon: HelpCircleIcon,
  fields: [
    defineField({
      name: 'type',
      title: 'Section Type',
      type: 'string',
      readOnly: true,
      initialValue: 'faq',
    }),
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'richTextBlock',
      description: 'Main heading for the FAQ section',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Section Description',
      type: 'richTextBlock',
      description: 'Introductory text below the title',
    }),
    defineField({
      name: 'faqCategories',
      title: 'FAQ Categories',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'faqCategory',
          title: 'FAQ Category',
          fields: [
            defineField({
              name: 'categoryName',
              title: 'Category Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
              description: 'Name of the FAQ category (e.g., "General", "Pricing", "Technical")',
            }),
            defineField({
              name: 'questions',
              title: 'Questions',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'faqQuestion',
                  title: 'FAQ Question',
                  fields: [
                    defineField({
                      name: 'question',
                      title: 'Question',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                      description: 'The question text',
                    }),
                    defineField({
                      name: 'answer',
                      title: 'Answer',
                      type: 'richTextBlock',
                      validation: (Rule) => Rule.required(),
                      description: 'Detailed answer with rich text formatting',
                    }),
                    defineField({
                      name: 'featured',
                      title: 'Featured Question',
                      type: 'boolean',
                      initialValue: false,
                      description: 'Mark this question as important/featured',
                    }),
                  ],
                  preview: {
                    select: {
                      question: 'question',
                      featured: 'featured',
                    },
                    prepare({ question, featured }) {
                      return {
                        title: question || 'FAQ Question',
                        subtitle: featured ? 'Featured' : 'Regular',
                        media: HelpCircleIcon,
                      };
                    },
                  },
                },
              ],
              validation: (Rule) => Rule.required().min(1),
              description: 'List of questions and answers for this category',
            }),
          ],
          preview: {
            select: {
              categoryName: 'categoryName',
              questions: 'questions',
            },
            prepare({ categoryName, questions }) {
              const questionCount = questions?.length || 0;
              return {
                title: categoryName || 'FAQ Category',
                subtitle: `${questionCount} question${questionCount !== 1 ? 's' : ''}`,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
      description: 'Organize questions into categories',
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'backgroundColor',
      description: 'Optional background color for the section',
    }),
    defineField({
      name: 'padding',
      title: 'Section Spacing',
      type: 'paddingControls',
      description: 'Control top and bottom padding for the section',
    }),
    defineField({
      name: 'settings',
      title: 'Section Settings',
      type: 'object',
      fields: [
        defineField({
          name: 'layout',
          title: 'Layout Style',
          type: 'string',
          options: {
            list: [
              { title: 'Two Column Grid', value: 'twoColumn' },
              { title: 'Single Column', value: 'singleColumn' },
              { title: 'Tabbed Categories', value: 'tabbed' },
            ],
          },
          initialValue: 'twoColumn',
          description: 'Choose how to display the FAQ content',
        }),
        defineField({
          name: 'showCategoryTabs',
          title: 'Show Category Tabs',
          type: 'boolean',
          initialValue: true,
          description: 'Display category navigation tabs',
        }),
        defineField({
          name: 'allowMultipleOpen',
          title: 'Allow Multiple Open',
          type: 'boolean',
          initialValue: false,
          description: 'Allow multiple questions to be open at the same time',
        }),
        defineField({
          name: 'highlightFeatured',
          title: 'Highlight Featured Questions',
          type: 'boolean',
          initialValue: true,
          description: 'Visually highlight featured questions',
        }),
        defineField({
          name: 'fullWidth',
          title: 'Full Width Section',
          type: 'boolean',
          initialValue: false,
          description: 'Extend section to full browser width',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      faqCategories: 'faqCategories',
    },
    prepare({ title, faqCategories }) {
      // Extract plain text from rich text for preview
      const titleText = title?.[0]?.children?.map((child: any) => child.text).join('') || 'FAQ Section';
      const categoryCount = faqCategories?.length || 0;
      const totalQuestions = faqCategories?.reduce((total: number, category: any) => {
        return total + (category.questions?.length || 0);
      }, 0) || 0;
      
      const subtitle = [
        categoryCount > 0 ? `${categoryCount} categor${categoryCount !== 1 ? 'ies' : 'y'}` : null,
        totalQuestions > 0 ? `${totalQuestions} question${totalQuestions !== 1 ? 's' : ''}` : null,
      ].filter(Boolean).join(' • ');

      return {
        title: titleText,
        subtitle: subtitle || 'FAQ Section',
        media: HelpCircleIcon,
      };
    },
  },
});
