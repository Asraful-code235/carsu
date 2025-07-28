import { Metadata } from 'next';
import { BlogHeader } from '@/components/organisms/blog/BlogHeader';
import { BlogPostsGrid } from '@/components/organisms/blog/BlogPostsGrid';
import { getBlogData } from '@/lib/services/blogService';
import { generateBlogMetadata } from '@/lib/metadata/blogMetadata';
import type { Locale } from '@/lib/i18n/config';

interface BlogPageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { locale } = await params;
  return generateBlogMetadata(locale);
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = await params;
  const { blogHeader, blogPosts } = await getBlogData();

  return (
    <main className="min-h-screen container mx-auto w-full px-6 lg:px-24">
      {/* Blog Header */}
      {blogHeader && (
        <BlogHeader
          data={blogHeader}
          locale={locale}
        />
      )}

      {/* Blog Posts Grid */}
      <BlogPostsGrid
        posts={blogPosts}
        locale={locale}
        blogHeader={blogHeader}
      />
    </main>
  );
}
