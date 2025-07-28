'use client';

import { useState, useEffect } from 'react';
import type { Locale } from '@/lib/i18n/config';

interface TableOfContentsItem {
  id: string;
  title: string;
  level: number;
}

interface BlogTableOfContentsProps {
  items: TableOfContentsItem[];
  activeSection: string;
  locale: Locale;
}

const LOCALIZED_TEXT = {
  en: {
    tableOfContents: 'Table of Contents',
    readingTime: 'min read'
  },
  es: {
    tableOfContents: 'Tabla de Contenidos',
    readingTime: 'min de lectura'
  },
  it: {
    tableOfContents: 'Indice',
    readingTime: 'min di lettura'
  }
};

export function BlogTableOfContents({
  items,
  activeSection,
  locale
}: BlogTableOfContentsProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [readingProgress, setReadingProgress] = useState(0);
  const text = LOCALIZED_TEXT[locale] || LOCALIZED_TEXT.en;

  // Calculate reading progress
  useEffect(() => {
    const updateReadingProgress = () => {
      const article = document.querySelector('article');
      if (!article) return;

      const scrollTop = window.scrollY;
      const docHeight = article.offsetHeight;
      const winHeight = window.innerHeight;
      const scrollPercent = scrollTop / (docHeight - winHeight);
      const progress = Math.min(100, Math.max(0, scrollPercent * 100));

      setReadingProgress(progress);

      // Update progress bar
      const progressBar = document.getElementById('reading-progress-bar');
      const progressText = document.getElementById('reading-progress-text');

      if (progressBar) {
        progressBar.style.width = `${progress}%`;
      }

      if (progressText) {
        progressText.textContent = `${Math.round(progress)}%`;
      }
    };

    window.addEventListener('scroll', updateReadingProgress);
    updateReadingProgress(); // Initial calculation

    return () => window.removeEventListener('scroll', updateReadingProgress);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Account for sticky header
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="bg-white  rounded-lg ">
    

      {/* Table of Contents List */}
      <nav className={`${isExpanded ? 'block' : 'hidden lg:block'}`}>
        <ul className="space-y-2">
          {items.map((item) => {
            const isActive = activeSection === item.id;
            
            return (
              <li key={item.id} >
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={`
                    w-full text-left text-sm py-2 rounded-md transition-all duration-200
                     hover:text-blue-700
                    ${isActive 
                      ? 'font-semibold text-gray-800' 
                      : 'text-gray-600 hover:text-gray-900'
                    }
                  `}
                >
                  <span className="line-clamp-2">
                    {item.title}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
