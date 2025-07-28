import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getBlogPost } from '@/lib/services/blogService';
import type { Locale } from '@/lib/i18n/config';
import { BlogPostContent } from '@/components/organisms/blog/BlogPostContent';

interface BlogPostPageProps {
  params: Promise<{
    locale: Locale;
    slug: string;
  }>;
}



export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }

  const title = post.seo?.metaTitle || post.title || 'Blog Post';
  const description = post.seo?.metaDescription || post.excerpt || 'Read this blog post on Carsu.';

  return {
    title: `${title} | Carsu Blog`,
    description,
    keywords: post.seo?.keywords,
    openGraph: {
      title,
      description,
      type: 'article',
      locale: locale,
      siteName: 'Carsu',
      publishedTime: post.publishedAt,
      authors: post.author?.name ? [post.author.name] : undefined,
      images: post.mainImage ? [
        {
          url: post.mainImage.asset?.url || '',
          width: 1200,
          height: 630,
          alt: title,
        }
      ] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `/blog/${slug}`,
      languages: {
        'en': `/en/blog/${slug}`,
        'es': `/es/blog/${slug}`,
        'it': `/it/blog/${slug}`,
      },
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale, slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <BlogPostContent 
        post={post} 
        locale={locale}
      />
    </main>
  );
}
