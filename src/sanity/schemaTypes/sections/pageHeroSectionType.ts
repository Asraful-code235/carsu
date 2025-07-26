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
    },
    prepare({ title, description, textAlign }) {
      // Extract plain text from rich text for preview
      const titleText =
        title?.[0]?.children?.map((child: any) => child.text).join("") ||
        "About Hero Section";
      const descriptionText =
        description?.[0]?.children?.map((child: any) => child.text).join("") ||
        "";
      
      return {
        title: titleText,
        subtitle: `${textAlign} aligned${descriptionText ? ` • ${descriptionText.substring(0, 50)}${descriptionText.length > 50 ? "..." : ""}` : ""}`,
      };
    },
  },
});
