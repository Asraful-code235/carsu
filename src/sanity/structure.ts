import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content Management")
    .items([
      // Blog content
      S.listItem()
        .title("Blog")
        .child(
          S.list()
            .title("Blog Content")
            .items([
              S.documentTypeListItem("post").title("Posts"),
              S.documentTypeListItem("category").title("Categories"),
              S.documentTypeListItem("author").title("Authors"),
              S.divider(),
              S.documentTypeListItem("blogHeader").title("Blog Header Configurations"),
            ])
        ),

      S.divider(),

      // Pages
      S.listItem()
        .title("Pages")
        .child(
          S.list()
            .title("Page Management")
            .items([S.documentTypeListItem("page").title("All Pages")])
        ),

      // Site Configuration
      S.listItem()
        .title("Site Configuration")
        .child(
          S.list()
            .title("Site Settings")
            .items([
              // Singleton Layout Configuration
              S.listItem()
                .title("Layout Configuration")
                .id("siteLayout")
                .child(
                  S.document()
                    .schemaType("siteLayout")
                    .documentId("siteLayout")
                    .title("Site Layout Configuration")
                ),

              // Header configurations
              S.documentTypeListItem("header").title("Header Configurations"),

              // Footer configurations
              S.documentTypeListItem("footer").title("Footer Configurations"),

              S.divider(),

            ])
        ),

      S.divider(),

      // Filter out the documents we've already included above
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() &&
          ![
            "post",
            "category",
            "author",
            "blogHeader",
            "header",
            "footer",
            "siteLayout",
            "page",
            "testimonial",
            'testimonialSection',
            'productBenefitsListSection'

          ].includes(item.getId()!)
      ),
    ]);
