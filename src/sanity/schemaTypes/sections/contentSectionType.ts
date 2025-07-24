import { defineField, defineType } from "sanity";
import { DocumentTextIcon } from "@sanity/icons";

/**
 * Content Section Type
 * Reusable section for page content areas with background image support
 * Features rich text content, background image with overlay, section items, and CTA buttons
 */
export const contentSectionType = defineType({
  name: "contentSection",
  title: "Content Section Banner (About, Contact etc.)",
  type: "object",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "type",
      title: "Section Type",
      type: "string",
      readOnly: true,
      initialValue: "content",
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "richTextBlock",
      validation: (Rule) => Rule.required(),
      description: "Main content with rich text formatting and colored text support",
    }),
    defineField({
      name: "backgroundImage",
      title: "Background Image",
      type: "object",
      fields: [
        defineField({
          name: "image",
          title: "Background Image",
          type: "image",
          options: {
            hotspot: true,
          },
          description: "Background image for the section",
        }),
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          description: "Alternative text for the background image",
        }),
        defineField({
          name: "position",
          title: "Image Position",
          type: "string",
          options: {
            list: [
              { title: "Top Left", value: "top-left" },
              { title: "Top Center", value: "top-center" },
              { title: "Top Right", value: "top-right" },
              { title: "Center Left", value: "center-left" },
              { title: "Center", value: "center" },
              { title: "Center Right", value: "center-right" },
              { title: "Bottom Left", value: "bottom-left" },
              { title: "Bottom Center", value: "bottom-center" },
              { title: "Bottom Right", value: "bottom-right" },
            ],
          },
          initialValue: "center",
          description: "Position of the background image",
        }),
        defineField({
          name: "size",
          title: "Image Size",
          type: "string",
          options: {
            list: [
              { title: "Cover", value: "cover" },
              { title: "Contain", value: "contain" },
              { title: "Auto", value: "auto" },
              { title: "Small (25%)", value: "25%" },
              { title: "Medium (50%)", value: "50%" },
              { title: "Large (75%)", value: "75%" },
              { title: "Full (100%)", value: "100%" },
            ],
          },
          initialValue: "cover",
          description: "Size of the background image",
        }),
        defineField({
          name: "opacity",
          title: "Image Opacity",
          type: "number",
          validation: (Rule) => Rule.min(0).max(1),
          initialValue: 1,
          description: "Opacity of the background image (0 = transparent, 1 = opaque)",
        }),
        defineField({
          name: "repeat",
          title: "Image Repeat",
          type: "string",
          options: {
            list: [
              { title: "No Repeat", value: "no-repeat" },
              { title: "Repeat", value: "repeat" },
              { title: "Repeat X", value: "repeat-x" },
              { title: "Repeat Y", value: "repeat-y" },
            ],
          },
          initialValue: "no-repeat",
          description: "How the background image should repeat",
        }),
      ],
      description: "Optional background image with positioning and styling controls",
    }),
    defineField({
      name: "backgroundOverlay",
      title: "Background Overlay",
      type: "object",
      fields: [
        defineField({
          name: "color",
          title: "Overlay Color",
          type: "color",
          description: "Color for the background overlay",
        }),
        defineField({
          name: "opacity",
          title: "Overlay Opacity",
          type: "number",
          validation: (Rule) => Rule.min(0).max(1),
          initialValue: 0.5,
          description: "Opacity of the overlay (0 = transparent, 1 = opaque)",
        }),
      ],
      description: "Optional color overlay on top of background image",
    }),
    defineField({
      name: "sectionItems",
      title: "Section Items/Features",
      type: "array",
      of: [{ type: "featureListItem" }],
      validation: (Rule) => Rule.max(6),
      description: "Optional list of features or items to highlight",
    }),
    defineField({
      name: "ctaButtons",
      title: "Call-to-Action Buttons",
      type: "array",
      of: [{ type: "ctaButton" }],
      validation: (Rule) => Rule.max(3),
      description: "Optional CTA buttons for the section",
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
      initialValue: "left",
      description: "Text alignment for content and items",
    }),
    defineField({
      name: "backgroundColor",
      title: "Background Color",
      type: "backgroundColor",
      description: "Optional background color (used if no background image)",
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
      content: "content",
      backgroundImage: "backgroundImage.image",
      sectionItems: "sectionItems",
      ctaButtons: "ctaButtons",
    },
    prepare({ content, backgroundImage, sectionItems, ctaButtons }) {
      // Extract plain text from rich text for preview
      const contentText =
        content?.[0]?.children?.map((child: any) => child.text).join("") ||
        "About Content Section";
      
      const itemsCount = sectionItems?.length || 0;
      const buttonsCount = ctaButtons?.length || 0;
      
      const subtitle = [
        itemsCount > 0 ? `${itemsCount} item${itemsCount !== 1 ? "s" : ""}` : null,
        buttonsCount > 0 ? `${buttonsCount} CTA${buttonsCount !== 1 ? "s" : ""}` : null,
        backgroundImage ? "Background Image" : null,
      ].filter(Boolean).join(" • ");
      
      return {
        title: contentText.substring(0, 60) + (contentText.length > 60 ? "..." : ""),
        subtitle: subtitle || "Content Section",
        media: backgroundImage,
      };
    },
  },
});
