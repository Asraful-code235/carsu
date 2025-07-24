import { PortableText, PortableTextComponents } from '@portabletext/react';
import { cn } from '@/lib/utils/cn';

interface RichTextRendererProps {
  content: any[];
  className?: string;
}

const colorClasses = {
  primary: 'text-blue-600',
  secondary: 'text-green-600', 
  accent: 'text-orange-500',
  success: 'text-green-500',
  warning: 'text-yellow-500',
  error: 'text-red-500',
};

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="text-[#4D525E] leading-relaxed">{children}</p>,
    h1: ({ children }) => <h1 className="text-4xl md:text-[56px] font-bold text-[#363849]">{children}</h1>,
    h2: ({ children }) => <h2 className="text-3xl font-bold text-gray-900">{children}</h2>,
    h3: ({ children }) => <h3 className="text-2xl font-semibold text-gray-900">{children}</h3>,
    h4: ({ children }) => <h4 className="text-xl font-semibold text-gray-900">{children}</h4>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ children, value }) => (
      <a
        href={value?.href}
        className="text-blue-600 hover:text-blue-800 underline transition-colors"
        target={value?.blank ? "_blank" : undefined}
        rel={value?.blank ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    ),
    coloredText: ({ children, value }) => {
      const colorClass = value?.customColor?.hex
        ? `text-[${value.customColor.hex}]`
        : colorClasses[value?.color as keyof typeof colorClasses] || colorClasses.primary;

      const fontWeightClass = value?.fontWeight === 'normal' ? 'font-normal' :
                             value?.fontWeight === 'medium' ? 'font-medium' :
                             value?.fontWeight === 'bold' ? 'font-bold' : 'font-semibold';

      return (
        <span
          className={cn(fontWeightClass, colorClass)}
          style={value?.customColor?.hex ? { color: value.customColor.hex } : undefined}
        >
          {children}
        </span>
      );
    },
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc list-inside space-y-1 text-gray-700">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal list-inside space-y-1 text-gray-700">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
};

export function RichTextRenderer({ content, className }: RichTextRendererProps) {
  if (!content || content.length === 0) {
    return null;
  }

  return (
    <div className={cn("prose prose-gray max-w-none", className)}>
      <PortableText value={content} components={components} />
    </div>
  );
}
