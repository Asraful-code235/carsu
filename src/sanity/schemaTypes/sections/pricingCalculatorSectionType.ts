import { CalculatorIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';

export const pricingCalculatorSectionType = defineType({
  name: 'pricingCalculatorSection',
  title: 'Pricing Calculator Section',
  type: 'object',
  icon: CalculatorIcon,
  fields: [
    defineField({
      name: 'type',
      title: 'Section Type',
      type: 'string',
      readOnly: true,
      initialValue: 'pricingCalculator',
    }),
    defineField({
      name: 'badge',
      title: 'Section Badge',
      type: 'badge',
      description: 'Optional badge that appears above the title',
    }),
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'localeRichTextBlock',
      validation: (Rule) => Rule.required(),
      description: 'Main title for the pricing calculator section (localized)',
    }),
    defineField({
      name: 'subtitle',
      title: 'Section Subtitle',
      type: 'localeRichTextBlock',
      description: 'Optional subtitle below the main title (localized)',
    }),
    defineField({
      name: 'calculatorTitle',
      title: 'Calculator Form Title',
      type: 'localeString',
      description: 'Title displayed above the calculator form (localized)',
      initialValue: {
        en: 'Get Your Estimate',
        es: 'Obtén tu Presupuesto',
        it: 'Ottieni il tuo Preventivo',
      },
    }),
    defineField({
      name: 'serviceSelectPlaceholder',
      title: 'Service Select Placeholder',
      type: 'localeString',
      description: 'Placeholder text for service selection dropdown (localized)',
      initialValue: {
        en: 'Select a Service',
        es: 'Selecciona un Servicio',
        it: 'Seleziona un Servizio',
      },
    }),
    defineField({
      name: 'optionSelectPlaceholder',
      title: 'Option Select Placeholder',
      type: 'localeString',
      description: 'Placeholder text for option selection dropdown (localized)',
      initialValue: {
        en: 'Select Option',
        es: 'Seleccionar Opción',
        it: 'Seleziona Opzione',
      },
    }),
    defineField({
      name: 'vehicleInfoTitle',
      title: 'Vehicle Information Title',
      type: 'localeString',
      description: 'Title for vehicle information section (localized)',
      initialValue: {
        en: 'Vehicle Information',
        es: 'Información del Vehículo',
        it: 'Informazioni del Veicolo',
      },
    }),
    defineField({
      name: 'makeModelPlaceholder',
      title: 'Make/Model Placeholder',
      type: 'localeString',
      description: 'Placeholder text for make/model dropdowns (localized)',
      initialValue: {
        en: 'Make/Model',
        es: 'Marca/Modelo',
        it: 'Marca/Modello',
      },
    }),
    defineField({
      name: 'mileagePlaceholder',
      title: 'Mileage Placeholder',
      type: 'localeString',
      description: 'Placeholder text for mileage dropdown (localized)',
      initialValue: {
        en: 'Mileage',
        es: 'Kilometraje',
        it: 'Chilometraggio',
      },
    }),
    defineField({
      name: 'estimateButtonText',
      title: 'Estimate Button Text',
      type: 'localeString',
      description: 'Text for the estimate button (localized)',
      initialValue: {
        en: 'Start an Estimate',
        es: 'Iniciar Presupuesto',
        it: 'Inizia Preventivo',
      },
    }),
    defineField({
      name: 'totalLabel',
      title: 'Total Label',
      type: 'localeString',
      description: 'Label for the total amount (localized)',
      initialValue: {
        en: 'Total',
        es: 'Total',
        it: 'Totale',
      },
    }),
    defineField({
      name: 'discountLabel',
      title: 'Discount Label',
      type: 'localeString',
      description: 'Label for discount display (localized)',
      initialValue: {
        en: 'Discount',
        es: 'Descuento',
        it: 'Sconto',
      },
    }),
    defineField({
      name: 'vatLabel',
      title: 'VAT Label',
      type: 'localeString',
      description: 'Label for VAT display (localized)',
      initialValue: {
        en: 'VAT',
        es: 'IVA',
        it: 'IVA',
      },
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'backgroundColor',
      description: 'Section background color',
    }),
    defineField({
      name: 'padding',
      title: 'Section Spacing',
      type: 'paddingControls',
    }),
  ],
  preview: {
    select: {
      title: 'title.en',
      titleEs: 'title.es',
      badge: 'badge.text.en',
      backgroundColor: 'backgroundColor.hex',
    },
    prepare({ title, titleEs, badge, backgroundColor }) {
      // Extract plain text from rich text for preview
      const titleText = title?.[0]?.children?.map((child: any) => child.text).join('') || 'Pricing Calculator';
      const titleEsText = titleEs?.[0]?.children?.map((child: any) => child.text).join('') || '';
      const bgColor = backgroundColor ? ` • ${backgroundColor}` : '';
      const badgeText = badge ? ` • Badge: ${badge}` : '';
      const translationInfo = titleEsText ? ` • ES: ${titleEsText.substring(0, 30)}...` : '';

      return {
        title: titleText,
        subtitle: `Pricing Calculator${bgColor}${badgeText}${translationInfo}`,
        media: CalculatorIcon,
      };
    },
  },
});
