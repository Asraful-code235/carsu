import { defineType, defineField } from 'sanity';

// Supported languages for the project
const supportedLanguages = [
  { id: 'en', title: 'English', isDefault: true },
  { id: 'es', title: 'Español' },
  { id: 'it', title: 'Italiano' }
];

export const baseLanguage = supportedLanguages.find(l => l.isDefault);

/**
 * Localized Rich Text Block
 * Provides rich text content in multiple languages
 * Each language has its own rich text editor with colored text support
 */
export const localeRichTextBlockObject = defineType({
  title: 'Localized Rich Text Block',
  name: 'localeRichTextBlock',
  type: 'object',
  fieldsets: [
    {
      title: 'Translations',
      name: 'translations',
      options: { collapsible: true, collapsed: false }
    }
  ],
  fields: supportedLanguages.map(lang => ({
    title: lang.title,
    name: lang.id,
    type: 'richTextBlock',
    fieldset: lang.isDefault ? undefined : 'translations'
  })),
  preview: {
    select: {
      title: `${baseLanguage?.id}`,
      subtitle: 'es'
    },
    prepare({ title, subtitle }) {
      // Extract plain text from rich text for preview
      const titleText = title?.[0]?.children?.map((child: any) => child.text).join('') || 'No content';
      const subtitleText = subtitle?.[0]?.children?.map((child: any) => child.text).join('') || '';
      
      return {
        title: titleText,
        subtitle: subtitleText ? `ES: ${subtitleText.substring(0, 50)}${subtitleText.length > 50 ? '...' : ''}` : 'No Spanish translation'
      };
    }
  }
});
