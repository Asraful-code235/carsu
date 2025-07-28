import { defineField, defineType } from "sanity";
import { UserIcon } from "@sanity/icons";

/**
 * Page Hero/Banner Section Type
 * Reusable section for page hero/banner areas across all page types
 * Features rich text title and description with flexible styling
 */
export const pageHeroSectionType = defineType({
  name: "pageHeroSection",
  title: "Page Hero Section (About, Contact etc.)",
  type: "object",
  icon: UserIcon,
  fields: [
    defineField({
      name: "type",
      title: "Section Type",
      type: "string",
      readOnly: true,
      initialValue: "pageHero",
    }),
    defineField({
      name: "title",
      title: "Hero Title",
      type: "localeRichTextBlock",
      validation: (Rule) => Rule.required(),
      description: "Main hero title with rich text formatting and colored text support (localized)",
    }),
    defineField({
      name: "description",
      title: "Hero Description",
      type: "localeRichTextBlock",
      validation: (Rule) => Rule.required(),
      description: "Hero description/subtitle with rich text formatting (localized)",
    }),
    defineField({
      name: "textAlign",
      title: "Text Alignment",
      type: "string",
      options: {
        list: [
          { title: "Left", value: "left" },
          { title: "Center", value: "center" },
          { title: "Right", value: "right" },
        ],
      },
      initialValue: "center",
      description: "Text alignment for title and description",
    }),
    defineField({
      name: "backgroundColor",
      title: "Background Color",
      type: "backgroundColor",
      description: "Optional background color for the hero section",
    }),
    defineField({
      name: "cards",
      title: "Hero Cards",
      type: "array",
      of: [
        defineField({
          name: "heroCard",
          title: "Hero Card",
          type: "object",
          fields: [
            defineField({
              name: "icon",
              title: "Card Icon",
              type: "imageWithAlt",
              description: "Icon image to display on the card (SVG or PNG recommended)",
            }),
            defineField({
              name: "title",
              title: "Card Title",
              type: "localeString",
              validation: (Rule) => Rule.required(),
              description: "Title for the hero card (localized)",
            }),
          ],
          preview: {
            select: {
              title: "title.en",
              titleEs: "title.es",
              icon: "icon.image",
            },
            prepare({ title, titleEs, icon }) {
              const translationInfo = titleEs ? ` • ES: ${titleEs}` : "";
              return {
                title: title || "Hero Card",
                subtitle: `Card${translationInfo}`,
                media: icon,
              };
            },
          },
        }),
      ],
      validation: (Rule) => Rule.max(6),
      description: "Optional hero cards to display below content (max 6 cards)",
    }),
    defineField({
      name: "padding",
      title: "Section Spacing",
      type: "paddingControls",
      description: "Control top and bottom padding for the section",
    }),
  ],
  preview: {
    select: {
      title: "title",
      description: "description",
      textAlign: "textAlign",
      cards: "cards",
    },
    prepare({ title, description, textAlign, cards }) {
      // Extract plain text from rich text for preview
      const titleText =
        title?.[0]?.children?.map((child: any) => child.text).join("") ||
        "Page Hero Section";
      const descriptionText =
        description?.[0]?.children?.map((child: any) => child.text).join("") ||
        "";
      const cardCount = cards?.length || 0;
      const cardInfo = cardCount > 0 ? ` • ${cardCount} card${cardCount !== 1 ? "s" : ""}` : "";

      return {
        title: titleText,
        subtitle: `${textAlign} aligned${cardInfo}${descriptionText ? ` • ${descriptionText.substring(0, 30)}${descriptionText.length > 30 ? "..." : ""}` : ""}`,
      };
    },
  },
});
