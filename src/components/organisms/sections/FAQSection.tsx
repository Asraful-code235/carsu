'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils/cn';
import { RichTextRenderer } from '@/components/atoms/text/RichTextRenderer';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

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
    layout: 'twoColumn' | 'singleColumn' | 'tabbed';
    showCategoryTabs?: boolean;
    allowMultipleOpen?: boolean;
    highlightFeatured?: boolean;
    fullWidth?: boolean;
  };
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
}: FAQSectionProps) {
  const [activeCategory, setActiveCategory] = useState(0);
  const [openQuestions, setOpenQuestions] = useState<Set<string>>(new Set());

  const {
    layout = 'twoColumn',
    showCategoryTabs = true,
    allowMultipleOpen = false,
    highlightFeatured = true,
    fullWidth = false,
  } = settings || {};

  // Get padding classes
  const topPadding = paddingClasses[padding?.top as keyof typeof paddingClasses] || paddingClasses.large;
  const bottomPadding = paddingClasses[padding?.bottom as keyof typeof paddingClasses] || paddingClasses.large;

  const toggleQuestion = (categoryIndex: number, questionIndex: number) => {
    const questionId = `${categoryIndex}-${questionIndex}`;

    if (allowMultipleOpen) {
      const newOpenQuestions = new Set(openQuestions);
      if (newOpenQuestions.has(questionId)) {
        newOpenQuestions.delete(questionId);
      } else {
        newOpenQuestions.add(questionId);
      }
      setOpenQuestions(newOpenQuestions);
    } else {
      // Only allow one question open at a time
      setOpenQuestions(openQuestions.has(questionId) ? new Set() : new Set([questionId]));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, categoryIndex: number, questionIndex: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleQuestion(categoryIndex, questionIndex);
    }
  };

  const isQuestionOpen = (categoryIndex: number, questionIndex: number) => {
    return openQuestions.has(`${categoryIndex}-${questionIndex}`);
  };

  const renderQuestion = (question: FAQQuestion, categoryIndex: number, questionIndex: number) => {
    const isOpen = isQuestionOpen(categoryIndex, questionIndex);
    const questionId = `${categoryIndex}-${questionIndex}`;

    return (
      <div
        key={questionId}
        className={cn(
          'border border-gray-200 rounded-lg overflow-hidden transition-all duration-200',
          highlightFeatured && question.featured && 'ring-2 ring-blue-500/20 border-blue-200',
          isOpen && 'shadow-md'
        )}
      >
        <button
          id={`question-${questionId}`}
          onClick={() => toggleQuestion(categoryIndex, questionIndex)}
          className={cn(
            'w-full px-6 py-4 text-left flex items-center justify-between',
            'hover:bg-gray-50 transition-colors duration-200',
            'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset',
            highlightFeatured && question.featured && 'bg-blue-50/50'
          )}
          aria-expanded={isOpen}
          aria-controls={`answer-${questionId}`}
          onKeyDown={(e) => handleKeyDown(e, categoryIndex, questionIndex)}
        >
          <span className={cn(
            'font-medium text-gray-900 pr-4',
            highlightFeatured && question.featured && 'text-blue-900'
          )}>
            {question.question}
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
          id={`answer-${questionId}`}
          className={cn(
            'overflow-hidden transition-all duration-300 ease-in-out',
            isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          )}
          role="region"
          aria-labelledby={`question-${questionId}`}
        >
          <div className="px-6 pb-4 pt-2 border-t border-gray-100">
            <RichTextRenderer
              content={question.answer}
              className="prose prose-gray max-w-none text-gray-600"
            />
          </div>
        </div>
      </div>
    );
  };

  const renderCategoryTabs = () => {
    if (!showCategoryTabs || faqCategories.length <= 1) return null;

    return (
      <div className="flex flex-wrap gap-2 mb-8">
        {faqCategories.map((category, index) => (
          <button
            key={index}
            onClick={() => setActiveCategory(index)}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
              activeCategory === index
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            )}
          >
            {category.categoryName}
          </button>
        ))}
      </div>
    );
  };

  const renderTwoColumnLayout = () => {
    const leftCategories = faqCategories.filter((_, index) => index % 2 === 0);
    const rightCategories = faqCategories.filter((_, index) => index % 2 === 1);

    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left Column */}
        <div className="space-y-8">
          {leftCategories.map((category, categoryIndex) => {
            const actualIndex = categoryIndex * 2;
            return (
              <div key={actualIndex}>
                {faqCategories.length > 1 && (
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {category.categoryName}
                  </h3>
                )}
                <div className="space-y-4">
                  {category.questions.map((question, questionIndex) =>
                    renderQuestion(question, actualIndex, questionIndex)
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {rightCategories.map((category, categoryIndex) => {
            const actualIndex = categoryIndex * 2 + 1;
            return (
              <div key={actualIndex}>
                {faqCategories.length > 1 && (
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {category.categoryName}
                  </h3>
                )}
                <div className="space-y-4">
                  {category.questions.map((question, questionIndex) =>
                    renderQuestion(question, actualIndex, questionIndex)
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderSingleColumnLayout = () => {
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        {faqCategories.map((category, categoryIndex) => (
          <div key={categoryIndex}>
            {faqCategories.length > 1 && (
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                {category.categoryName}
              </h3>
            )}
            <div className="space-y-4">
              {category.questions.map((question, questionIndex) =>
                renderQuestion(question, categoryIndex, questionIndex)
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderTabbedLayout = () => {
    const currentCategory = faqCategories[activeCategory];
    
    return (
      <div className="max-w-4xl mx-auto">
        {renderCategoryTabs()}
        <div className="space-y-4">
          {currentCategory?.questions.map((question, questionIndex) =>
            renderQuestion(question, activeCategory, questionIndex)
          )}
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (layout) {
      case 'singleColumn':
        return renderSingleColumnLayout();
      case 'tabbed':
        return renderTabbedLayout();
      case 'twoColumn':
      default:
        return renderTwoColumnLayout();
    }
  };

  return (
    <section
      className={cn(
        topPadding,
        bottomPadding,
        'relative',
        fullWidth ? 'w-full' : 'container mx-auto'
      )}
      style={{
        backgroundColor: backgroundColor?.hex || undefined,
      }}
    >
      <div className="px-6 lg:px-24">
        {/* Header */}
        <div className="text-center mb-12">
          {title && (
            <RichTextRenderer
              content={title}
              className="prose prose-gray max-w-none mb-4"
            />
          )}
          {description && (
            <RichTextRenderer
              content={description}
              className="prose prose-gray max-w-none text-gray-600"
            />
          )}
        </div>

        {/* FAQ Content */}
        {renderContent()}
      </div>
    </section>
  );
}
