import { defineType } from 'sanity';

// Supported languages for the project
const supportedLanguages = [
  { id: 'en', title: 'English', isDefault: true },
  { id: 'es', title: 'Español' },
  { id: 'it', title: 'Italiano' }
];

export const baseLanguage = supportedLanguages.find(l => l.isDefault);

export const localeStringObject = defineType({
  title: 'Localized String',
  name: 'localeString',
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
    type: 'string',
    fieldset: lang.isDefault ? undefined : 'translations'
  })),
  preview: {
    select: {
      title: `${baseLanguage?.id}`,
      subtitle: 'es'
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'No translation',
        subtitle: subtitle ? `ES: ${subtitle}` : 'No Spanish translation'
      };
    }
  }
});
