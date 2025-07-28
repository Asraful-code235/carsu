import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/sanity/lib/image';
import type { Locale } from '@/lib/i18n/config';

interface BlogPostHeaderProps {
  title: string;
  excerpt?: string;
  mainImage?: any;
  publishedAt: string;
  author?: {
    name: string;
    image?: any;
    bio?: string;
  };
  categories?: Array<{
    title: string;
    slug: { current: string };
  }>;
  locale: Locale;
}

export function BlogPostHeader({
  title,
  excerpt,
  mainImage,
  publishedAt,
  author,
  categories,
  locale
}: BlogPostHeaderProps) {
  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
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
      const date = new Date(dateString);
      return date.toLocaleDateString(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
  };

  return (
    <div className="w-full bg-white">
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-6 lg:gap-[24px] pt-9 lg:pt-[70px] w-full">
        {/* Text Content */}
        <div className="w-full lg:w-[520px] flex flex-col justify-center items-start gap-8 pb-8 lg:py-[32px]">
          {/* Categories */}
          {categories && categories.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Link
                  key={category.slug.current}
                  href={`/${locale}/blog/category/${category.slug.current}`}
                  className="px-3 py-1 bg-blue-100 text-blue-600 text-sm font-medium rounded-full hover:bg-blue-200 transition-colors"
                >
                  {category.title}
                </Link>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-[#363849] font-poppins text-[36px] font-bold leading-[42px] lg:leading-[42px]">
            {title}
          </h1>

          {/* Content Points */}
          <div className="flex flex-col gap-8">
            <div className="text-[#4D525E] font-dm-sans text-base leading-7">
              {/* Excerpt */}
              {excerpt && (
                <div className="mb-4">
                  {excerpt}
                </div>
              )}

              {/* Meta Information */}
              <div className="flex flex-col gap-2">
                {/* Author */}
                {author && (
                  <div className="flex items-center gap-3 max-w-[736px] w-full lg:ml-auto">
                    {author.image ? (
                      <Image
                        src={urlFor(author.image).width(32).height(32).url()}
                        alt={author.name}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                        <span className="text-gray-600 font-medium text-xs">
                          {author.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                    <span className="font-medium">{author.name}</span>
                    <span className="text-gray-300">|</span>
                    <time dateTime={publishedAt} className="text-[#4D525E]">
                      {formatTimeAgo(publishedAt)}
                    </time>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="w-full h-[228px] lg:h-[410px]">
          {mainImage && (
            <Image
              src={urlFor(mainImage).width(1472).height(820).url()}
              alt={title}
              width={1472}
              height={820}
              className="w-full h-full object-cover rounded-[14px]"
              priority
            />
          )}
        </div>
      </div>
    </div>
  );
}
