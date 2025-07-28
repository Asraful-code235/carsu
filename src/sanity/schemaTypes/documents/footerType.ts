import { defineField, defineType } from "sanity";
import { ComponentIcon } from "@sanity/icons";
import { socialIconOptions } from "../shared/iconOptions";

export const footerType = defineType({
  name: "footer",
  title: "Footer Configuration",
  type: "document",
  icon: ComponentIcon,
  fields: [
    defineField({
      name: "title",
      title: "Footer Title",
      type: "string",
      description: "Internal title for this footer configuration",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Footer Logo",
      type: "object",
      fields: [
        defineField({
          name: "image",
          title: "Logo Image",
          type: "image",
          options: {
            hotspot: true,
          },
        }),
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "localeString",
        }),
        defineField({
          name: "width",
          title: "Width (pixels)",
          type: "number",
          initialValue: 100,
        }),
        defineField({
          name: "height",
          title: "Height (pixels)",
          type: "number",
          initialValue: 28,
        }),
      ],
    }),
    defineField({
      name: "description",
      title: "Footer Description",
      type: "localeRichTextBlock",
      description:
        "Brief description or tagline for your company (translatable)",
    }),
    defineField({
      name: "columns",
      title: "Footer Columns",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Column Title",
              type: "localeString",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "links",
              title: "Column Links",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    defineField({
                      name: "title",
                      title: "Link Title",
                      type: "localeString",
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: "href",
                      title: "Link URL",
                      type: "string",
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: "openInNewTab",
                      title: "Open in New Tab",
                      type: "boolean",
                      initialValue: false,
                    }),
                  ],
                  preview: {
                    select: {
                      title: "title.en", // Select the English version of the localized title
                      href: "href",
                    },
                    prepare({ title, href }) {
                      return {
                        title: title || "Untitled Link",
                        subtitle: href,
                      };
                    },
                  },
                },
              ],
              validation: (Rule) => Rule.max(10),
            }),
          ],
          preview: {
            select: {
              title: "title.en", // Select the English version of the localized title
              links: "links",
            },
            prepare({ title, links }) {
              const linkCount = links?.length || 0;
              return {
                title: title || "Untitled Column",
                subtitle: `${linkCount} link${linkCount !== 1 ? "s" : ""}`,
              };
            },
          },
        },
      ],
      validation: (Rule) =>
        Rule.max(4).warning("Consider limiting to 4 columns for better layout"),
    }),
    defineField({
      name: "socialLinks",
      title: "Social Media Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "platform",
              title: "Platform",
              type: "string",
              options: {
                list: socialIconOptions,
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "url",
              title: "Profile URL",
              type: "url",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              platform: "platform",
              url: "url",
            },
            prepare({ platform, url }) {
              return {
                title: platform,
                subtitle: url,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.max(8),
    }),
    defineField({
      name: "copyrightText",
      title: "Copyright Text",
      type: "localeString",
      description:
        "Copyright notice (year will be automatically added with {year})",
      initialValue: {
        en: "© {year} Your Company Name. All rights reserved.",
        es: "© {year} Tu Nombre de Empresa. Todos los derechos reservados.",
        it: "© {year} Il Nome della Tua Azienda. Tutti i diritti riservati.",
      },
    }),
    defineField({
      name: "showBackToTop",
      title: "Show Back to Top Button",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "newsletter",
      title: "Newsletter Signup",
      type: "object",
      fields: [
        defineField({
          name: "enabled",
          title: "Enable Newsletter Signup",
          type: "boolean",
          initialValue: false,
        }),
        defineField({
          name: "title",
          title: "Newsletter Title",
          type: "localeString",
          initialValue: {
            en: "Subscribe to our newsletter",
            es: "Suscríbete a nuestro boletín",
            it: "Iscriviti alla nostra newsletter",
          },
        }),
        defineField({
          name: "description",
          title: "Newsletter Description",
          type: "localeString",
          initialValue: {
            en: "Get the latest updates and news delivered to your inbox.",
            es: "Recibe las últimas actualizaciones y noticias en tu bandeja de entrada.",
            it: "Ricevi gli ultimi aggiornamenti e notizie nella tua casella di posta.",
          },
        }),
        defineField({
          name: "placeholder",
          title: "Email Placeholder",
          type: "localeString",
          initialValue: {
            en: "Enter your email address",
            es: "Ingresa tu dirección de correo electrónico",
            it: "Inserisci il tuo indirizzo email",
          },
        }),
        defineField({
          name: "buttonText",
          title: "Subscribe Button Text",
          type: "localeString",
          initialValue: {
            en: "Subscribe",
            es: "Suscribirse",
            it: "Iscriviti",
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      logo: "logo.image",
      columns: "columns",
    },
    prepare({ title, logo, columns }) {
      const columnCount = columns?.length || 0;
      return {
        title,
        subtitle: `${columnCount} column${columnCount !== 1 ? "s" : ""}`,
        media: logo,
      };
    },
  },
});
