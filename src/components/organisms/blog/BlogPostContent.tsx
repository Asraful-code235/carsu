'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import { BlogTableOfContents } from '@/components/molecules/blog/BlogTableOfContents';
import { portableTextComponents } from '@/lib/portableText/components';
import type { BlogPostDetail } from '@/lib/services/blogService';
import type { Locale } from '@/lib/i18n/config';
import { BlogPostHeader } from '@/components/molecules/blog/BlogPostHeader';

interface BlogPostContentProps {
  post: BlogPostDetail;
  locale: Locale;
}

interface TableOfContentsItem {
  id: string;
  title: string;
  level: number;
}

export function BlogPostContent({ post, locale }: BlogPostContentProps) {
  const [activeSection, setActiveSection] = useState<string>('');
  const [tableOfContents, setTableOfContents] = useState<TableOfContentsItem[]>([]);

  // Extract table of contents from portable text
  useEffect(() => {
    if (!post.body) return;

    const headings: TableOfContentsItem[] = [];

    post.body.forEach((block: any, index: number) => {
      if (block._type === 'block' && block.style &&
          ['h1', 'h2', 'h3', 'h4'].includes(block.style)) {
        const text = block.children
          ?.map((child: any) => child.text)
          .join('') || '';

        if (text.trim()) {
          const id = `section-${block._key || index}`;
          headings.push({
            id,
            title: text.trim(),
            level: parseInt(block.style.replace('h', ''))
          });
        }
      }
    });

    setTableOfContents(headings);
  }, [post.body]);

  // Handle scroll spy for active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = tableOfContents.map(item => 
        document.getElementById(item.id)
      ).filter(Boolean);

      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(tableOfContents[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [tableOfContents]);



  return (
    <div className="container mx-auto w-full px-6 lg:px-24 py-8">
      {/* Blog Post Header */}
      <BlogPostHeader 
        title={post.title}
        excerpt={post.excerpt}
        mainImage={post.mainImage}
        publishedAt={post.publishedAt}
        author={post.author}
        categories={post.categories}
        locale={locale}
      />

      {/* Main Content Layout */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 lg:mt-12">
        {/* Table of Contents - Left Sidebar */}
        <aside className="lg:w-1/4 hidden lg:sticky lg:top-8 lg:self-start">
          <BlogTableOfContents 
            items={tableOfContents}
            activeSection={activeSection}
            locale={locale}
          />
        </aside>

        {/* Main Content - Right Side */}
        <article className="lg:w-3/4 -mt-8">
          <div className="prose prose-lg max-w-none">
            {post.body && (
              <PortableText
                value={post.body}
                components={portableTextComponents}
              />
            )}
          </div>

        

          {/* Back to Blog Link */}
          <div className="mt-12">
            <Link 
              href={`/${locale}/blog`}
              className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {locale === 'es' ? 'Volver al Blog' : locale === 'it' ? 'Torna al Blog' : 'Back to Blog'}
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
