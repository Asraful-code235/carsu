import type { AboutSection as AboutSectionType } from "@/types/page";

interface AboutSectionProps {
  data: AboutSectionType;
}

export function AboutSection({ data }: AboutSectionProps) {
  const { title, content } = data;

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6 lg:px-24">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
            {title}
          </h2>
          {content && (
            <div className="max-w-3xl mx-auto">
              <p className="text-lg text-gray-600 leading-relaxed">
                {content}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
