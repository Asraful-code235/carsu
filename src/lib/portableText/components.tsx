import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/sanity/lib/image';
import type { PortableTextComponents } from '@portabletext/react';

export const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      
      return (
        <figure className="my-8">
          <Image
            src={urlFor(value).width(800).height(450).url()}
            alt={value.alt || 'Blog image'}
            width={800}
            height={450}
            className="rounded-lg w-full h-auto"
          />
          {value.caption && (
            <figcaption className="text-center text-sm text-gray-600 mt-2">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  
  block: {
    h1: ({ children, value }) => {
      const id = `section-${value._key || 'heading'}`;
      return (
        <h1 id={id} className="text-3xl lg:text-4xl font-bold text-gray-900 mt-12 mb-6 scroll-mt-20">
          {children}
        </h1>
      );
    },
    
    h2: ({ children, value }) => {
      const id = `section-${value._key || 'heading'}`;
      return (
        <h2 id={id} className="text-2xl lg:text-3xl font-bold text-gray-900 mt-10 mb-5 scroll-mt-20">
          {children}
        </h2>
      );
    },
    
    h3: ({ children, value }) => {
      const id = `section-${value._key || 'heading'}`;
      return (
        <h3 id={id} className="text-xl lg:text-2xl font-semibold text-gray-900 mt-8 mb-4 scroll-mt-20">
          {children}
        </h3>
      );
    },
    
    h4: ({ children, value }) => {
      const id = `section-${value._key || 'heading'}`;
      return (
        <h4 id={id} className="text-lg lg:text-xl font-semibold text-gray-900 mt-6 mb-3 scroll-mt-20">
          {children}
        </h4>
      );
    },
    
    normal: ({ children }) => (
      <p className="text-gray-700 leading-7 mb-4">
        {children}
      </p>
    ),
    
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-blue-500 pl-6 py-2 my-6 bg-blue-50 rounded-r-lg">
        <div className="text-gray-700 italic">
          {children}
        </div>
      </blockquote>
    ),
  },
  
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700">
        {children}
      </ul>
    ),
    
    number: ({ children }) => (
      <ol className="list-decimal list-inside space-y-2 mb-4 text-gray-700">
        {children}
      </ol>
    ),
  },
  
  listItem: {
    bullet: ({ children }) => (
      <li className="ml-4">{children}</li>
    ),
    
    number: ({ children }) => (
      <li className="ml-4">{children}</li>
    ),
  },
  
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-gray-900">{children}</strong>
    ),
    
    em: ({ children }) => (
      <em className="italic">{children}</em>
    ),
    
    code: ({ children }) => (
      <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm font-mono">
        {children}
      </code>
    ),
    
    link: ({ children, value }) => {
      const isExternal = value?.href?.startsWith('http');
      
      if (isExternal) {
        return (
          <a
            href={value.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline transition-colors"
          >
            {children}
          </a>
        );
      }
      
      return (
        <Link
          href={value?.href || '#'}
          className="text-blue-600 hover:text-blue-800 underline transition-colors"
        >
          {children}
        </Link>
      );
    },
  },
};
