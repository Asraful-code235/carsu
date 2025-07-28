import { client } from '@/sanity/lib/client';
import { BLOG_HEADER_QUERY, BLOG_POSTS_QUERY, BLOG_POST_QUERY } from '@/sanity/lib/queries/pageQueries';

export interface BlogHeaderData {
  title: string;
  mostPopularText?: any; // Localized string
  slides: Array<{
    title: any; // Localized string
    bulletPoints: Array<any>; // Array of localized strings
    ctaButton: {
      text: any; // Localized string
      href: string;
      openInNewTab?: boolean;
    };
    heroImage: {
      image: any;
      alt?: any; // Localized string
    };
    isActive: boolean;
  }>;
  backgroundColor?: string;
  settings?: {
    autoplay?: boolean;
    autoplayInterval?: number;
    showIndicators?: boolean;
    height?: string;
  };
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  excerpt?: string;
  publishedAt: string;
  mainImage?: any;
  author?: {
    name: string;
    image?: any;
  };
  categories?: Array<{
    title: string;
    slug: {
      current: string;
    };
  }>;
}

export interface BlogPostDetail extends BlogPost {
  body?: any[];
  author?: {
    name: string;
    image?: any;
    bio?: string;
  };
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string;
  };
}

export interface BlogData {
  blogHeader: BlogHeaderData | null;
  blogPosts: BlogPost[];
}

/**
 * Fetches blog header configuration and blog posts
 */
export async function getBlogData(): Promise<BlogData> {
  try {


    const [blogHeader, blogPosts] = await Promise.all([
      client.fetch(BLOG_HEADER_QUERY),
      client.fetch(BLOG_POSTS_QUERY)
    ]);



    return {
      blogHeader,
      blogPosts: blogPosts || []
    };
  } catch (error) {
    console.error('Error fetching blog data:', error);
    return {
      blogHeader: null,
      blogPosts: []
    };
  }
}

/**
 * Fetches a single blog post by slug
 */
export async function getBlogPost(slug: string): Promise<BlogPostDetail | null> {
  try {
    const post = await client.fetch(BLOG_POST_QUERY, { slug });
    return post;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

/**
 * Fetches only blog header configuration
 */
export async function getBlogHeader(): Promise<BlogHeaderData | null> {
  try {
    const blogHeader = await client.fetch(BLOG_HEADER_QUERY);
    return blogHeader;
  } catch (error) {
    console.error('Error fetching blog header:', error);
    return null;
  }
}

/**
 * Fetches only blog posts
 */
export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const blogPosts = await client.fetch(BLOG_POSTS_QUERY);
    return blogPosts || [];
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}
