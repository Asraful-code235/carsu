import { defineField, defineType } from 'sanity';
import { CreditCardIcon } from '@sanity/icons';

export const pricingSectionType = defineType({
  name: 'pricingSection',
  title: 'Pricing Section',
  type: 'object',
  icon: CreditCardIcon,
  fields: [
    defineField({
      name: 'type',
      title: 'Section Type',
      type: 'string',
      readOnly: true,
      initialValue: 'pricing',
    }),
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'localeRichTextBlock',
      description: 'Main title for the pricing section (localized)',
    }),
    defineField({
      name: 'subtitle',
      title: 'Section Subtitle',
      type: 'localeString',
      description: 'Optional subtitle below the main title',
    }),
    defineField({
      name: 'billingToggle',
      title: 'Billing Toggle',
      type: 'object',
      fields: [
        defineField({
          name: 'yearlyText',
          title: 'Yearly Text',
          type: 'localeString',
          description: 'Text for yearly billing option (e.g., "Yearly SAVE 18%")',
        }),
        defineField({
          name: 'monthlyText',
          title: 'Monthly Text',
          type: 'localeString',
          description: 'Text for monthly billing option (e.g., "Monthly")',
        }),
      ],
      description: 'Billing period toggle text (yearly/monthly)',
    }),
    defineField({
      name: 'pricingPlans',
      title: 'Pricing Plans',
      type: 'array',
      of: [
        defineField({
          name: 'pricingPlan',
          title: 'Pricing Plan',
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Plan Name',
              type: 'localeString',
              validation: (Rule) => Rule.required(),
              description: 'Name of the pricing plan (e.g., Starter, Pro, Enterprise)',
            }),
            defineField({
              name: 'price',
              title: 'Price',
              type: 'localeString',
              validation: (Rule) => Rule.required(),
              description: 'Price display (e.g., €19, €49, €79)',
            }),
            defineField({
              name: 'period',
              title: 'Billing Period',
              type: 'localeString',
              description: 'Billing period (e.g., /month, /year, one-time)',
            }),
            defineField({
              name: 'description',
              title: 'Plan Description',
              type: 'localeString',
              description: 'Short description of what this plan is for',
            }),
            defineField({
              name: 'subdescription',
              title: 'Plan Subdescription',
              type: 'localeString',
              description: 'Additional description text below the main description',
            }),
            defineField({
              name: 'features',
              title: 'Plan Features',
              type: 'array',
              of: [
                defineField({
                  name: 'feature',
                  title: 'Feature',
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'text',
                      title: 'Feature Text',
                      type: 'localeRichTextBlock',
                      validation: (Rule) => Rule.required(),
                      description: 'Feature text with rich formatting support (bold, italic, etc.)',
                    }),
                    defineField({
                      name: 'included',
                      title: 'Included in Plan',
                      type: 'boolean',
                      initialValue: true,
                      description: 'Whether this feature is included or not',
                    }),
                  ],
                  preview: {
                    select: {
                      text: 'text.en',
                      included: 'included',
                    },
                    prepare({ text, included }) {
                      // Extract plain text from rich text for preview
                      const featureText = text?.[0]?.children?.map((child: any) => child.text).join('') || 'Feature';
                      return {
                        title: featureText,
                        subtitle: included ? 'Included' : 'Not included',
                      };
                    },
                  },
                }),
              ],
              validation: (Rule) => Rule.max(10),
              description: 'List of features for this plan (max 10)',
            }),
            defineField({
              name: 'ctaButton',
              title: 'CTA Button',
              type: 'ctaButton',
              description: 'Call-to-action button for this plan',
            }),
            defineField({
              name: 'isPopular',
              title: 'Most Popular Plan',
              type: 'boolean',
              initialValue: false,
              description: 'Mark this plan as the most popular (only one should be selected)',
            }),
          ],
          preview: {
            select: {
              name: 'name.en',
              price: 'price.en',
              isPopular: 'isPopular',
            },
            prepare({ name, price, isPopular }) {
              return {
                title: name || 'Pricing Plan',
                subtitle: `${price || 'No price'}${isPopular ? ' • Most Popular' : ''}`,
                media: CreditCardIcon,
              };
            },
          },
        }),
      ],
      validation: (Rule) => Rule.min(1).max(3),
      description: 'Pricing plans to display (1-3 plans)',
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'backgroundColor',
      description: 'Optional background color for the pricing section',
    }),
    defineField({
      name: 'padding',
      title: 'Section Spacing',
      type: 'paddingControls',
      description: 'Control top and bottom padding for the section',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      pricingPlans: 'pricingPlans',
    },
    prepare({ title, pricingPlans }) {
      // Extract plain text from rich text for preview
      const titleText = title?.[0]?.children?.map((child: any) => child.text).join('') || 'Pricing Section';
      const planCount = pricingPlans?.length || 0;
      const popularPlan = pricingPlans?.find((plan: any) => plan.isPopular);
      const popularInfo = popularPlan ? ` • Popular: ${popularPlan.name?.en || 'Plan'}` : '';
      
      return {
        title: titleText,
        subtitle: `${planCount} plan${planCount !== 1 ? 's' : ''}${popularInfo}`,
        media: CreditCardIcon,
      };
    },
  },
});
