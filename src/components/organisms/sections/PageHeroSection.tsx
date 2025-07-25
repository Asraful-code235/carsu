import { RichTextRenderer } from "@/components/atoms/text/RichTextRenderer";
import { cn } from "@/lib/utils/cn";

interface PageHeroSectionProps {
  data: {
    type: "pageHero";
    title: any[]; // Rich text array (Portable Text)
    description: any[]; // Rich text array (Portable Text)
    textAlign: "left" | "center" | "right";
    backgroundColor?: {
      hex: string;
    };
    padding: {
      top: string;
      bottom: string;
    };
  };
}

const paddingClasses = {
  none: "py-0",
  small: "py-8",
  medium: "py-12",
  large: "py-16",
  xl: "py-24",
};

const alignmentClasses = {
  left: "text-left md:text-left",
  center: "text-center md:text-left",
  right: "text-right md:text-left",
};

export function PageHeroSection({ data }: PageHeroSectionProps) {
  const { title, description, textAlign, backgroundColor, padding } = data;

  const topPadding =
    paddingClasses[padding.top as keyof typeof paddingClasses] ||
    paddingClasses.large;
  const bottomPadding =
    paddingClasses[padding.bottom as keyof typeof paddingClasses] ||
    paddingClasses.large;

  const alignmentClass = alignmentClasses[textAlign] || alignmentClasses.center;

  return (
    <section
      className={cn(topPadding, bottomPadding, "relative")}
      style={{
        backgroundColor: backgroundColor?.hex || undefined,
      }}
    >
      <div className="container mx-auto px-6 lg:px-24">
        {/* Two column grid layout for md+ screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Left Column - Content */}
          <div className={cn("order-1", alignmentClass)}>
            {/* Hero Title */}
            <RichTextRenderer
              content={title}
              className="prose-headings:text-4xl prose-headings:md:text-5xl prose-headings:lg:text-6xl prose-headings:font-bold prose-headings:leading-tight prose-headings:text-[#363849] prose-headings:mb-0"
            />
          </div>

          <div className="order-2">
            <RichTextRenderer
              content={description}
              className="prose-p:text-lg prose-p:text-[#4D525E] prose-p:leading-relaxed prose-p:mb-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
