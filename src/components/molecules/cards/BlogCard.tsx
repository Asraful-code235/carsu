import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/sanity/lib/image';
import type { Locale } from '@/lib/i18n/config';

interface BlogCardProps {
  id: string;
  image?: any;
  title: string;
  description: string;
  author: string;
  timeAgo: string;
  slug: string;
  locale: Locale;
  size?: 'large' | 'medium';
}

export function BlogCard({ 
  id,
  image, 
  title, 
  description, 
  author, 
  timeAgo, 
  slug,
  locale,
  size = 'medium' 
}: BlogCardProps) {
  if (size === 'large') {
    return (
      <Link href={`/${locale}/blog/${slug}`} className="group">
        <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-[68px]">
          {image ? (
            <Image
              src={urlFor(image).width(628).height(410).url()}
              alt={title}
              width={628}
              height={410}
              className="w-full lg:w-[628px] h-[228px] lg:h-[410px] object-cover rounded-[14px] group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full lg:w-[628px] h-[228px] lg:h-[410px] bg-gray-200 rounded-[14px] flex items-center justify-center">
              <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
          <div className="flex flex-col justify-center items-start gap-8 py-8 lg:py-[32px] flex-1">
            <h2 className="text-[#363849] font-poppins text-[36px] font-bold leading-[42px] group-hover:text-blue-600 transition-colors">
              {title}
            </h2>
            <div className="flex flex-col gap-8">
              <p className="text-[#4D525E] font-dm-sans text-base leading-7">
                {description}
              </p>
            </div>
            <div className="flex items-center gap-2 w-full">
              <span className="text-[#4D525E] font-dm-sans text-base leading-7">
                {author}
              </span>
              <span className="text-[#4D525E] font-dm-sans text-base leading-7">
                |
              </span>
              <span className="text-[#4D525E] font-dm-sans text-base leading-7 flex-1">
                {timeAgo}
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/${locale}/blog/${slug}`} className="group">
      <div className="flex flex-col gap-6">
        {image ? (
          <Image
            src={urlFor(image).width(400).height(205).url()}
            alt={title}
            width={400}
            height={205}
            className="w-full h-[205px] object-cover rounded-[14px] group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-[205px] bg-gray-200 rounded-[14px] flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        <div className="flex flex-col justify-center items-start gap-6">
          <h3 className="text-[#363849] font-poppins text-xl font-bold leading-6 group-hover:text-blue-600 transition-colors">
            {title}
          </h3>
          <div className="flex flex-col gap-8">
            <p className="text-[#4D525E] font-dm-sans text-base leading-7">
              {description}
            </p>
          </div>
          <div className="flex items-center gap-2 w-full">
            <span className="text-[#4D525E] font-dm-sans text-base leading-7">
              {author}
            </span>
            <span className="text-[#4D525E] font-dm-sans text-base leading-7">
              |
            </span>
            <span className="text-[#4D525E] font-dm-sans text-base leading-7 flex-1">
              {timeAgo}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
