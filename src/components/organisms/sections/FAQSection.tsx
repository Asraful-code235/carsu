'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils/cn';
import { RichTextRenderer } from '@/components/atoms/text/RichTextRenderer';
import { ChevronDownIcon, ChevronUpIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import type { Locale } from '@/lib/i18n/config';

interface FAQQuestion {
  question: string;
  answer: any[]; // Rich text array
  featured: boolean;
}

interface FAQCategory {
  categoryName: string;
  questions: FAQQuestion[];
}

interface FAQSectionProps {
  title?: any[]; // Rich text array
  description?: any[]; // Rich text array
  faqCategories: FAQCategory[];
  backgroundColor?: {
    hex: string;
  };
  padding?: {
    top: string;
    bottom: string;
  };
  settings?: {
    layout: 'sideBySide' | 'twoColumn' | 'singleColumn' | 'tabbed';
    showCategoryTabs?: boolean;
    allowMultipleOpen?: boolean;
    highlightFeatured?: boolean;
    fullWidth?: boolean;
  };
  locale?: Locale;
}

const paddingClasses = {
  none: 'py-0',
  small: 'py-8',
  medium: 'py-12',
  large: 'py-16',
  xl: 'py-24',
};

export function FAQSection({
  title,
  description,
  faqCategories,
  backgroundColor,
  padding,
  settings,
  locale = 'en',
}: FAQSectionProps) {
  // Flatten all questions from all categories for easier handling
  const allQuestions = faqCategories.flatMap((category, categoryIndex) =>
    category.questions.map((question, questionIndex) => ({
      ...question,
      categoryIndex,
      questionIndex,
      categoryName: category.categoryName,
      id: `${categoryIndex}-${questionIndex}`,
    }))
  );

  const [activeItem, setActiveItem] = useState(allQuestions[0]?.id || '');
  const [openQuestions, setOpenQuestions] = useState<Set<string>>(new Set());

  const {
    allowMultipleOpen = false,
    highlightFeatured = true,
    fullWidth = false,
  } = settings || {};

  // Get padding classes
  const topPadding = paddingClasses[padding?.top as keyof typeof paddingClasses] || paddingClasses.large;
  const bottomPadding = paddingClasses[padding?.bottom as keyof typeof paddingClasses] || paddingClasses.large;

  const activeItemData = allQuestions.find(item => item.id === activeItem);

  const toggleQuestion = (questionId: string) => {
    // For mobile accordion behavior
    if (allowMultipleOpen) {
      const newOpenQuestions = new Set(openQuestions);
      if (newOpenQuestions.has(questionId)) {
        newOpenQuestions.delete(questionId);
      } else {
        newOpenQuestions.add(questionId);
      }
      setOpenQuestions(newOpenQuestions);
    } else {
      setOpenQuestions(openQuestions.has(questionId) ? new Set() : new Set([questionId]));
    }
  };

  const handleQuestionClick = (questionId: string) => {
    setActiveItem(questionId);
    // Also toggle for mobile
    toggleQuestion(questionId);
  };

  const handleKeyDown = (e: React.KeyboardEvent, questionId: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleQuestionClick(questionId);
    }
  };

  const isQuestionOpen = (questionId: string) => {
    return openQuestions.has(questionId);
  };

  const renderDesktopLayout = () => {
    return (
      <div className="hidden lg:flex justify-center items-center bg-white px-6 lg:px-24 py-12 md:py-16 lg:py-[92px]">
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-[68px] w-full container">

          {/* Left Column - FAQ Items */}
          <div className="w-full lg:max-w-[358px] xl:max-w-[480px] lg:flex-shrink-0">
            <div className="flex flex-col items-start gap-4 lg:gap-6 self-stretch">
              <div className="flex flex-col items-start self-stretch">
                {allQuestions.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setActiveItem(item.id)}
                    className={cn(
                      'flex py-4 lg:py-6 justify-center items-center gap-3 lg:gap-4 self-stretch cursor-pointer transition-colors',
                      activeItem === item.id ? 'bg-gray-50/20' : 'hover:bg-gray-50/10'
                    )}
                  >
                    {activeItem === item.id ? (
                      <QuestionMarkCircleIcon className="w-6 h-6 lg:w-8 lg:h-8 text-[#1D6EE7] flex-shrink-0 " strokeWidth={2} />
                    ) : (
                      <div className="w-6 h-6 lg:w-8 lg:h-8 flex-shrink-0"></div>
                    )}
                    <div className={cn(
                      'flex-1 text-[#4D525E] font-dm-sans text-xl lg:text-2xl leading-[28px] lg:leading-[30px]',
                      activeItem === item.id ? 'font-bold' : 'font-normal'
                    )}>
                      {item.question}
                    </div>
                    {activeItem === item.id && (
                      <ChevronRightIcon className="w-5 h-5 lg:w-6 lg:h-6 text-black transform -rotate-90 flex-shrink-0" strokeWidth={2} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="flex flex-col items-start gap-6 lg:gap-8 flex-1 w-full">
            <div className="flex flex-col justify-center items-center gap-8 lg:gap-[58px] self-stretch">
              <div className="flex p-4 md:p-6 lg:p-8 items-start gap-8 lg:gap-12 self-stretch rounded-[14px] bg-gray-50/20 lg:bg-transparent">
                {activeItemData && (
                  <div className="flex flex-col items-start gap-6 lg:gap-8 flex-1">
                    <div className="self-stretch">
                      <RichTextRenderer
                        content={activeItemData.answer}
                        className="prose prose-gray max-w-none text-[#4D525E]"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderMobileLayout = () => {
    return (
      <div className="lg:hidden space-y-4">
        {allQuestions.map((item) => {
          const isOpen = isQuestionOpen(item.id);
          return (
            <div
              key={item.id}
              className={cn(
                ' rounded-lg overflow-hidden transition-all duration-200',
                highlightFeatured && item.featured && '',
                isOpen && ''
              )}
            >
              <button
                onClick={() => handleQuestionClick(item.id)}
                className={cn(
                  'w-full px-6 py-4 text-left flex items-center justify-between',
                  '',
                  'focus:outline-none ',
                  highlightFeatured && item.featured && ''
                )}
                aria-expanded={isOpen}
                onKeyDown={(e) => handleKeyDown(e, item.id)}
              >
                <span className={cn(
                  'font-medium text-gray-900 pr-4',
                  highlightFeatured && item.featured && ''
                )}>
                  {item.question}
                </span>
                <div className="flex-shrink-0">
                  {isOpen ? (
                    <ChevronUpIcon className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDownIcon className="w-5 h-5 text-gray-500" />
                  )}
                </div>
              </button>

              <div
                className={cn(
                  'overflow-hidden transition-all duration-300 ease-in-out',
                  isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                )}
              >
                <div className="px-6 pb-4 pt-2 border-t border-gray-100">
                  <RichTextRenderer
                    content={item.answer}
                    className="prose prose-gray max-w-none text-gray-600"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };





  return (
    <section
      className={cn(
        topPadding,
        bottomPadding,
        'relative',
        fullWidth ? 'w-full' : 'container mx-auto w-full'
      )}
      style={{
        backgroundColor: backgroundColor?.hex || undefined,
      }}
    >
      {/* Header */}
      {(title || description) && (
        <div className="text-center mb-12 px-6 lg:px-24">
          {title && (
            <RichTextRenderer
              content={title}
              className="prose prose-gray max-w-none mb-8"
            />
          )}
          {description && (
            <RichTextRenderer
              content={description}
              className="prose prose-gray max-w-[846px] mx-auto w-full text-gray-600"
            />
          )}
        </div>
      )}

      {/* Desktop Layout */}
      {renderDesktopLayout()}

      {/* Mobile Layout */}
      <div className="px-6 lg:px-24">
        {renderMobileLayout()}
      </div>
    </section>
  );
}
