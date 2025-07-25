'use client';

import Image from 'next/image';
import Link from 'next/link';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube, 
  Github,
  MessageCircle,
  ArrowUp
} from 'lucide-react';
import { RichTextRenderer } from '@/components/atoms/text/RichTextRenderer';
import { urlFor } from '@/sanity/lib/image';

interface FooterProps {
  data: {
    title: string;
    logo?: {
      image?: {
        asset?: {
          _id: string;
          url: string;
        };
      };
      alt?: string;
      width?: number;
      height?: number;
    };
    description?: any[];
    columns?: Array<{
      title: string;
      links: Array<{
        title: string;
        href: string;
        openInNewTab: boolean;
      }>;
    }>;
    socialLinks?: Array<{
      platform: 'facebook' | 'twitter' | 'instagram' | 'linkedin' | 'youtube' | 'github' | 'discord' | 'tiktok';
      url: string;
    }>;
    copyrightText?: string;
    showBackToTop?: boolean;
    newsletter?: {
      enabled: boolean;
      title?: string;
      description?: string;
      placeholder?: string;
      buttonText?: string;
    };
  };
}

const socialIcons = {
  facebook: Facebook,
  twitter: Twitter,
  instagram: Instagram,
  linkedin: Linkedin,
  youtube: Youtube,
  github: Github,
  discord: MessageCircle,
  tiktok: MessageCircle, // Using MessageCircle as fallback for TikTok
};

export function Footer({ data }: FooterProps) {
  const {
    logo,
    description,
    columns,
    socialLinks,
    copyrightText,
    showBackToTop,
    newsletter,
  } = data;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();
  const processedCopyright = copyrightText?.replace('{year}', currentYear.toString()) || 
    `© ${currentYear} Your Company Name. All rights reserved.`;

  return (
    <footer className="bg-white py-20 px-6 relative">
      <div className="container mx-auto px-6 lg:px-24">
        <div className="grid lg:grid-cols-4 gap-12 lg:gap-16">
          {/* Left Column - Logo, Description, and Social Links */}
          <div className="lg:col-span-1">
            {/* Logo */}
            {logo?.image?.asset && (
              <div className="mb-8">
                <Image
                  src={urlFor(logo.image.asset).url()}
                  alt={logo.alt || 'Company Logo'}
                  width={logo.width || 100}
                  height={logo.height || 28}
                  className="h-auto"
                />
              </div>
            )}

            {/* Description */}
            {description && (
              <div className="text-gray-600 text-lg leading-relaxed mb-12 max-w-sm">
                <RichTextRenderer content={description} />
              </div>
            )}

            {/* Social Media Icons */}
            {socialLinks && socialLinks.length > 0 && (
              <div className="flex gap-4">
                {socialLinks.map((social, index) => {
                  const IconComponent = socialIcons[social.platform];
                  return (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 bg-gray-50 rounded-lg flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors group"
                    >
                      <IconComponent className="w-4 h-4 text-blue-600 group-hover:text-white" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Columns - Navigation Links */}
          {columns && columns.length > 0 && (
            <div className="lg:col-span-3 grid md:grid-cols-3 gap-12">
              {columns.map((column, index) => (
                <div key={index}>
                  <h3 className="text-xl font-bold text-gray-800 mb-10">
                    {column.title}
                  </h3>
                  <ul className="space-y-4">
                    {column.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <Link
                          href={link.href}
                          target={link.openInNewTab ? '_blank' : undefined}
                          rel={link.openInNewTab ? 'noopener noreferrer' : undefined}
                          className="text-gray-600 hover:text-blue-600 transition-colors text-lg"
                        >
                          {link.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Newsletter Section */}
        {newsletter?.enabled && (
          <div className="mt-16 pt-16 border-t border-gray-200">
            <div className="max-w-md mx-auto text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {newsletter.title}
              </h3>
              {newsletter.description && (
                <p className="text-gray-600 mb-6">
                  {newsletter.description}
                </p>
              )}
              <form className="flex gap-3">
                <input
                  type="email"
                  placeholder={newsletter.placeholder}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  {newsletter.buttonText}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Footer Bottom - Copyright */}
        <div className="mt-20 pt-6 border-t border-gray-200">
          <p className="text-gray-400 text-center text-base leading-relaxed">
            {processedCopyright}
          </p>
        </div>
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors flex items-center justify-center z-50"
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </footer>
  );
}
