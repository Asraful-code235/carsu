import { defineField, defineType } from "sanity";
import { layoutOptions, alignmentOptions } from "../shared/spacingOptions";
import { UserIcon } from "@sanity/icons";

export const aboutSectionType = defineType({
  name: "aboutSection",
  title: "About Section",
  type: "object",
  icon: UserIcon,
  fields: [
    defineField({
      name: "type",
      title: "Section Type",
      type: "string",
      readOnly: true,
      initialValue: "about",
    }),
    defineField({
      name: "title",
      title: "Section Title",
      type: "richTextBlock",
      validation: (Rule) => Rule.required(),
      description: "Main title for the about section",
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "text",
      rows: 2,
      description: "Optional subtitle below the main title",
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "richTextBlock",
      description: "Main about content with rich text formatting",
    }),
    defineField({
      name: "layout",
      title: "Layout Style",
      type: "string",
      options: {
        list: [
          { title: "Text Only", value: "textOnly" },
          { title: "Text with Image", value: "textWithImage" },
          { title: "Two Columns", value: "twoColumns" },
        ],
      },
      initialValue: "textOnly",
    }),
    defineField({
      name: "image",
      title: "About Image",
      type: "imageWithAlt",
      description: "Optional image for text with image layout",
      hidden: ({ parent }) => parent?.layout === "textOnly",
    }),
    defineField({
      name: "imagePosition",
      title: "Image Position",
      type: "string",
      options: {
        list: layoutOptions,
      },
      initialValue: "contentLeft",
      hidden: ({ parent }) => parent?.layout !== "textWithImage",
    }),
    defineField({
      name: "ctaButtons",
      title: "Call-to-Action Buttons",
      type: "array",
      of: [{ type: "ctaButton" }],
      validation: (Rule) => Rule.max(2),
      description: "Optional action buttons",
    }),
    defineField({
      name: "stats",
      title: "Statistics",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "number",
              title: "Statistic Number",
              type: "string",
              validation: (Rule) => Rule.required(),
              description: 'e.g., "100+", "5M", "$2.5B"',
            }),
            defineField({
              name: "label",
              title: "Statistic Label",
              type: "string",
              validation: (Rule) => Rule.required(),
              description: 'e.g., "Happy Customers", "Downloads"',
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 2,
              description: "Optional additional context",
            }),
          ],
          preview: {
            select: {
              number: "number",
              label: "label",
            },
            prepare({ number, label }) {
              return {
                title: `${number} ${label}`,
                subtitle: "Statistic",
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.max(4),
      description: "Optional statistics to highlight achievements",
    }),
    defineField({
      name: "textAlign",
      title: "Text Alignment",
      type: "string",
      options: {
        list: alignmentOptions,
      },
      initialValue: "left",
    }),
    defineField({
      name: "backgroundColor",
      title: "Background Color",
      type: "backgroundColor",
    }),
    defineField({
      name: "padding",
      title: "Section Spacing",
      type: "paddingControls",
    }),
  ],
  preview: {
    select: {
      title: "title",
      layout: "layout",
      image: "image.image",
      stats: "stats",
    },
    prepare({ title, layout, image, stats }) {
      // Extract plain text from rich text for preview
      const titleText =
        title?.[0]?.children?.map((child: any) => child.text).join("") ||
        "About Section";
      const statsCount = stats?.length || 0;
      const layoutText =
        layout === "textOnly"
          ? "Text Only"
          : layout === "textWithImage"
            ? "Text + Image"
            : "Two Columns";

      return {
        title: titleText,
        subtitle: `${layoutText}${statsCount > 0 ? ` • ${statsCount} stat${statsCount !== 1 ? "s" : ""}` : ""}`,
        media: image,
      };
    },
  },
});
