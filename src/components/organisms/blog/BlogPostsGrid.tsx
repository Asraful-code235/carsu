import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/sanity/lib/image';
import type { Locale } from '@/lib/i18n/config';
import type { BlogPost } from '@/lib/services/blogService';

interface BlogPostsGridProps {
  posts: BlogPost[];
  locale: Locale;
}

const LOCALIZED_TEXT = {
  en: {
    latestPosts: 'Latest Posts',
    description: 'Stay updated with the latest trends and insights in auto shop management.',
    noPosts: 'No posts available.',
    by: 'By'
  },
  es: {
    latestPosts: 'Últimas Publicaciones',
    description: 'Mantente actualizado con las últimas tendencias y consejos en gestión de talleres automotrices.',
    noPosts: 'No hay publicaciones disponibles.',
    by: 'Por'
  },
  it: {
    latestPosts: 'Ultimi Articoli',
    description: 'Rimani aggiornato con le ultime tendenze e consigli nella gestione delle officine automobilistiche.',
    noPosts: 'Nessun articolo disponibile.',
    by: 'Di'
  }
};

export function BlogPostsGrid({ posts, locale }: BlogPostsGridProps) {
  const text = LOCALIZED_TEXT[locale] || LOCALIZED_TEXT.en;

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6 lg:px-24">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {text.latestPosts}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {text.description}
          </p>
        </div>

        {/* Blog Posts Grid */}
        {posts && posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <BlogPostCard 
                key={post._id} 
                post={post} 
                locale={locale}
                byText={text.by}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {text.noPosts}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

interface BlogPostCardProps {
  post: BlogPost;
  locale: Locale;
  byText: string;
}

function BlogPostCard({ post, locale, byText }: BlogPostCardProps) {
  return (
    <Link
      href={`/${locale}/blog/${post.slug.current}`}
      className="group"
    >
      <article className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden h-full">
        {/* Post Image */}
        {post.mainImage ? (
          <div className="aspect-video overflow-hidden">
            <Image
              src={urlFor(post.mainImage).width(400).height(225).url()}
              alt={post.title}
              width={400}
              height={225}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        ) : (
          <div className="aspect-video bg-gray-200 flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}

        {/* Post Content */}
        <div className="p-6 flex flex-col h-full">
          {/* Categories */}
          {post.categories && post.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {post.categories.slice(0, 2).map((category) => (
                <span 
                  key={category.slug.current}
                  className="px-3 py-1 bg-blue-100 text-blue-600 text-xs font-medium rounded-full"
                >
                  {category.title}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {post.title}
          </h3>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
              {post.excerpt}
            </p>
          )}

          {/* Meta */}
          <div className="flex items-center justify-between text-sm text-gray-500 mt-auto">
            <div className="flex items-center">
              {post.author?.name && (
                <span>{byText} {post.author.name}</span>
              )}
            </div>
            {post.publishedAt && (
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString(locale)}
              </time>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
