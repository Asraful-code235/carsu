import { BlogCard } from '@/components/molecules/cards/BlogCard';
import { Pagination } from '@/components/molecules/navigation/Pagination';
import type { Locale } from '@/lib/i18n/config';
import type { BlogPost } from '@/lib/services/blogService';

interface BlogPostsGridProps {
  posts: BlogPost[];
  locale: Locale;
}

const LOCALIZED_TEXT = {
  en: {
    mostPopular: 'Most Popular',
    noPosts: 'No posts available.',
    by: 'By'
  },
  es: {
    mostPopular: 'Más Popular',
    noPosts: 'No hay publicaciones disponibles.',
    by: 'Por'
  },
  it: {
    mostPopular: 'Più Popolare',
    noPosts: 'Nessun articolo disponibile.',
    by: 'Di'
  }
};

export function BlogPostsGrid({ posts, locale }: BlogPostsGridProps) {
  const text = LOCALIZED_TEXT[locale] || LOCALIZED_TEXT.en;

  // Helper function to format time ago
  const formatTimeAgo = (publishedAt: string, locale: Locale) => {
    const date = new Date(publishedAt);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) {
      return locale === 'es' ? 'Hoy' : locale === 'it' ? 'Oggi' : 'Today';
    } else if (diffInDays === 1) {
      return locale === 'es' ? 'Ayer' : locale === 'it' ? 'Ieri' : 'Yesterday';
    } else if (diffInDays < 7) {
      const daysText = locale === 'es' ? 'días' : locale === 'it' ? 'giorni' : 'days';
      return `${diffInDays} ${daysText} ago`;
    } else {
      return date.toLocaleDateString(locale);
    }
  };

  if (!posts || posts.length === 0) {
    return (
      <section className="w-full ">
        <div className="max-w-[1920px] mx-auto lg:px-[319px]">
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {text.noPosts}
            </p>
          </div>
        </div>
      </section>
    );
  }

  const featuredPost = posts[0];
  const remainingPosts = posts.slice(1);

  return (
    <section className="w-full px-4 lg:px-0 py-16 lg:py-24">
      <div className="">
        <div className="flex flex-col gap-[58px] lg:gap-[58px] max-w-[1280px] mx-auto">
          <h2 className="text-[#363849] font-poppins text-[36px] font-bold leading-[42px]">
            {text.mostPopular}
          </h2>

          {/* Featured Post */}
          <BlogCard
            id={featuredPost._id}
            image={featuredPost.mainImage}
            title={featuredPost.title}
            description={featuredPost.excerpt || ''}
            author={featuredPost.author?.name || 'Unknown Author'}
            timeAgo={formatTimeAgo(featuredPost.publishedAt, locale)}
            slug={featuredPost.slug.current}
            locale={locale}
            size="large"
          />

          {/* Blog Grid */}
          {remainingPosts.length > 0 && (
            <div className="flex flex-col gap-6">
              {/* First Row - 3 columns */}
              {remainingPosts.slice(0, 3).length > 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-6">
                  {remainingPosts.slice(0, 3).map((post) => (
                    <BlogCard
                      key={post._id}
                      id={post._id}
                      image={post.mainImage}
                      title={post.title}
                      description={post.excerpt || ''}
                      author={post.author?.name || 'Unknown Author'}
                      timeAgo={formatTimeAgo(post.publishedAt, locale)}
                      slug={post.slug.current}
                      locale={locale}
                    />
                  ))}
                </div>
              )}

              {/* Second Row - 3 columns */}
              {remainingPosts.slice(3, 6).length > 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-6">
                  {remainingPosts.slice(3, 6).map((post) => (
                    <BlogCard
                      key={post._id}
                      id={post._id}
                      image={post.mainImage}
                      title={post.title}
                      description={post.excerpt || ''}
                      author={post.author?.name || 'Unknown Author'}
                      timeAgo={formatTimeAgo(post.publishedAt, locale)}
                      slug={post.slug.current}
                      locale={locale}
                    />
                  ))}
                </div>
              )}

              {/* Third Row - 3 columns */}
              {remainingPosts.slice(6, 9).length > 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-6">
                  {remainingPosts.slice(6, 9).map((post) => (
                    <BlogCard
                      key={post._id}
                      id={post._id}
                      image={post.mainImage}
                      title={post.title}
                      description={post.excerpt || ''}
                      author={post.author?.name || 'Unknown Author'}
                      timeAgo={formatTimeAgo(post.publishedAt, locale)}
                      slug={post.slug.current}
                      locale={locale}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Pagination */}
          <div className="flex justify-start w-full">
            <Pagination />
          </div>
        </div>
      </div>
    </section>
  );
}


