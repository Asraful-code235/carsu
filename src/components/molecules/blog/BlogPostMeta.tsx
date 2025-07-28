import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import type { Locale } from '@/lib/i18n/config';

interface BlogPostMetaProps {
  author: {
    name: string;
    image?: any;
    bio?: string;
  };
  publishedAt: string;
  locale: Locale;
}

const LOCALIZED_TEXT = {
  en: {
    aboutAuthor: 'About the Author',
    publishedOn: 'Published on'
  },
  es: {
    aboutAuthor: 'Sobre el Autor',
    publishedOn: 'Publicado el'
  },
  it: {
    aboutAuthor: 'Informazioni sull\'Autore',
    publishedOn: 'Pubblicato il'
  }
};

export function BlogPostMeta({ author, publishedAt, locale }: BlogPostMetaProps) {
  const text = LOCALIZED_TEXT[locale] || LOCALIZED_TEXT.en;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {text.aboutAuthor}
      </h3>
      
      <div className="flex items-start gap-4">
        {/* Author Image */}
        {author.image ? (
          <Image
            src={urlFor(author.image).width(80).height(80).url()}
            alt={author.name}
            width={80}
            height={80}
            className="rounded-full flex-shrink-0"
          />
        ) : (
          <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-gray-600 font-medium text-xl">
              {author.name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}

        {/* Author Info */}
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 mb-1">
            {author.name}
          </h4>
          
          {author.bio && (
            <p className="text-gray-600 text-sm mb-2 leading-relaxed">
              {author.bio}
            </p>
          )}
          
          <p className="text-xs text-gray-500">
            {text.publishedOn} {formatDate(publishedAt)}
          </p>
        </div>
      </div>
    </div>
  );
}
