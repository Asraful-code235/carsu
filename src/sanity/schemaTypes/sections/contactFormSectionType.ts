import { defineField, defineType } from 'sanity';
import { EnvelopeIcon } from '@sanity/icons';

export const contactFormSectionType = defineType({
  name: 'contactFormSection',
  title: 'Contact Form Section',
  type: 'object',
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: 'type',
      title: 'Section Type',
      type: 'string',
      readOnly: true,
      initialValue: 'contactForm',
    }),
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'richTextBlock',
      description: 'Main heading for the contact section',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'badge',
      title: 'Badge',
      type: 'badge',
      description: 'Optional badge that appears above the title',
    }),
    defineField({
      name: 'features',
      title: 'Feature List',
      type: 'array',
      of: [{ type: 'featureListItem' }],
      description: 'List of features or benefits to highlight',
      validation: (Rule) => Rule.max(8),
    }),
    defineField({
      name: 'formHeading',
      title: 'Form Heading',
      type: 'richTextBlock',
      description: 'Heading text for the contact form',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'formFields',
      title: 'Form Fields',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'formField',
          title: 'Form Field',
          fields: [
            defineField({
              name: 'name',
              title: 'Field Name/ID',
              type: 'string',
              validation: (Rule) => Rule.required().regex(/^[a-zA-Z][a-zA-Z0-9_]*$/, {
                name: 'valid field name',
                invert: false
              }),
              description: 'Unique identifier for the form field (e.g., "name", "email", "message")',
            }),
            defineField({
              name: 'label',
              title: 'Field Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
              description: 'Display label for the form field',
            }),
            defineField({
              name: 'placeholder',
              title: 'Placeholder Text',
              type: 'string',
              validation: (Rule) => Rule.required(),
              description: 'Placeholder text shown in the field',
            }),
            defineField({
              name: 'type',
              title: 'Field Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Text', value: 'text' },
                  { title: 'Email', value: 'email' },
                  { title: 'Phone', value: 'tel' },
                  { title: 'Textarea', value: 'textarea' },
                ],
              },
              initialValue: 'text',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'required',
              title: 'Required Field',
              type: 'boolean',
              initialValue: false,
              description: 'Mark this field as required',
            }),
            defineField({
              name: 'width',
              title: 'Field Width',
              type: 'string',
              options: {
                list: [
                  { title: 'Half Width', value: 'half' },
                  { title: 'Full Width', value: 'full' },
                ],
              },
              initialValue: 'full',
              description: 'Width of the form field',
            }),
          ],
          preview: {
            select: {
              label: 'label',
              type: 'type',
              required: 'required',
            },
            prepare({ label, type, required }) {
              return {
                title: label,
                subtitle: `${type}${required ? ' (required)' : ''}`,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
      description: 'Configure the form fields to display',
    }),
    defineField({
      name: 'submitButton',
      title: 'Submit Button',
      type: 'ctaButton',
      description: 'Submit button configuration',
      validation: (Rule) => Rule.required(),
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
          title: 'Layout',
          type: 'string',
          options: {
            list: [
              { title: 'Content Left, Form Right', value: 'contentLeft' },
              { title: 'Content Right, Form Left', value: 'contentRight' },
            ],
          },
          initialValue: 'contentLeft',
          description: 'Position of content vs form',
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
      formFields: 'formFields',
      features: 'features',
    },
    prepare({ title, formFields, features }) {
      // Extract plain text from rich text for preview
      const titleText = title?.[0]?.children?.map((child: any) => child.text).join('') || 'Contact Form Section';
      const fieldsCount = formFields?.length || 0;
      const featuresCount = features?.length || 0;
      
      const subtitle = [
        fieldsCount > 0 ? `${fieldsCount} field${fieldsCount !== 1 ? 's' : ''}` : null,
        featuresCount > 0 ? `${featuresCount} feature${featuresCount !== 1 ? 's' : ''}` : null,
      ].filter(Boolean).join(' • ');

      return {
        title: titleText,
        subtitle: subtitle || 'Contact Form Section',
      };
    },
  },
});
