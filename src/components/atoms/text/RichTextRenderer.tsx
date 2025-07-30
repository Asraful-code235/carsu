import { PortableText, PortableTextComponents } from '@portabletext/react';
import { cn } from '@/lib/utils/cn';

interface RichTextRendererProps {
  content: any[];
  className?: string;
  extraClassName?:string
  textWhite?: boolean;
  textCenter?:boolean
}

const colorClasses = {
  primary: 'text-blue-600',
  secondary: 'text-green-600', 
  accent: 'text-orange-500',
  success: 'text-green-500',
  warning: 'text-yellow-500',
  error: 'text-red-500',
};

const createComponents = (extraClassName?: string,textWhite?: boolean,textCenter?:boolean): PortableTextComponents => ({
  block: {
    normal: ({ children }) => <p className={cn("text-[#4D525E] leading-relaxed text-lg",textWhite ? "!text-white text-left":"", textCenter ? "text-center" : "")}>{children}</p>,
    h1: ({ children }) => <h1 className={cn("text-4xl md:text-[56px] font-bold text-[#363849]", extraClassName)}>{children}</h1>,
    h2: ({ children }) => <h2 className={cn("text-3xl md:text-4xl font-bold text-gray-900", extraClassName)}>{children}</h2>,
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
      const fontWeightClass = value?.fontWeight === 'normal' ? 'font-normal' :
                             value?.fontWeight === 'medium' ? 'font-medium' :
                             value?.fontWeight === 'bold' ? 'font-bold' : 'font-semibold';

      if (value?.customColor?.hex) {
        return (
          <span
            className={cn("font-bold,",fontWeightClass, textCenter ? "text-center" : "")}
            style={{
              color: value.customColor.hex,
              fontWeight: value?.fontWeight === 'normal' ? 'normal' :
                         value?.fontWeight === 'medium' ? '500' :
                         value?.fontWeight === 'bold' ? 'bold' : '600'
            }}
          >
            {children}
          </span>
        );
      }

      // For predefined colors, use Tailwind classes
      const colorClass = colorClasses[value?.color as keyof typeof colorClasses] || colorClasses.primary;

      return (
        <span
          className={cn(fontWeightClass, colorClass, textCenter ? "text-center" : "")}
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
});

export function RichTextRenderer({ content, className, extraClassName,textWhite = false ,textCenter = false }: RichTextRendererProps) {
  if (!content || content.length === 0) {
    return null;
  }

  const components = createComponents(extraClassName,textWhite,textCenter);

  return (
    <div className={cn("prose prose-gray max-w-none", className)}>
      <PortableText value={content} components={components} />
    </div>
  );
}
