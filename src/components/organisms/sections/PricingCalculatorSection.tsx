'use client';

import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { RichTextRenderer } from '@/components/atoms/text/RichTextRenderer';
import { Badge } from '@/components/atoms/ui/Badge';
import { cn } from '@/lib/utils/cn';
import type { Locale } from '@/lib/i18n/config';
import { getLocalizedRichText, getLocalizedValue } from '@/lib/i18n/utils';

interface PricingCalculatorSectionData {
  type: 'pricingCalculator';
  badge?: {
    text: any;
    color?: string;
    customColor?: { hex: string };
    variant?: 'filled' | 'outline' | 'soft';
    size?: 'sm' | 'md' | 'lg';
  };
  title: any; // Localized rich text
  subtitle?: any; // Localized rich text
  calculatorTitle: any; // Localized string
  serviceSelectPlaceholder: any; // Localized string
  optionSelectPlaceholder: any; // Localized string
  vehicleInfoTitle: any; // Localized string
  makeModelPlaceholder: any; // Localized string
  mileagePlaceholder: any; // Localized string
  estimateButtonText: any; // Localized string
  totalLabel: any; // Localized string
  discountLabel: any; // Localized string
  vatLabel: any; // Localized string
  backgroundColor?: { hex: string };
  padding?: {
    top: string;
    bottom: string;
  };
}

interface PricingCalculatorSectionProps {
  data: PricingCalculatorSectionData;
  locale?: Locale;
}

const paddingClasses = {
  none: 'py-0',
  small: 'py-8',
  medium: 'py-12',
  large: 'py-16',
  xl: 'py-24',
};

export function PricingCalculatorSection({ data, locale = 'en' }: PricingCalculatorSectionProps) {
  const [selectedService, setSelectedService] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedMileage, setSelectedMileage] = useState('');

  const {
    badge,
    title,
    subtitle,
    calculatorTitle,
    serviceSelectPlaceholder,
    optionSelectPlaceholder,
    vehicleInfoTitle,
    makeModelPlaceholder,
    mileagePlaceholder,
    estimateButtonText,
    totalLabel,
    discountLabel,
    vatLabel,
    backgroundColor,
    padding = { top: 'large', bottom: 'large' }
  } = data;

  // Calculate pricing (mock calculation for demo)
  const basePrice = 15.50;
  const serviceMultiplier = selectedService ? 1.2 : 1;
  const optionMultiplier = selectedOption ? 1.1 : 1;
  const subtotal = basePrice * serviceMultiplier * optionMultiplier;
  const discountPercent = 10;
  const discountAmount = subtotal * (discountPercent / 100);
  const afterDiscount = subtotal - discountAmount;
  const vatPercent = 22;
  const vatAmount = afterDiscount * (vatPercent / 100);
  const total = afterDiscount + vatAmount;

  const paddingClass = paddingClasses[padding.top as keyof typeof paddingClasses] || paddingClasses.large;
  const backgroundStyle = backgroundColor?.hex ? { backgroundColor: backgroundColor.hex } : {};

  return (
    <section 
      className={cn('relative', paddingClass)}
      style={backgroundStyle}
    >
      <div className="container mx-auto px-6 lg:px-24 -mt-24">
        <div className="text-start mb-12">
          {/* Badge */}
          {badge?.text && (
            <div className="mb-6">
              <Badge
                text={badge.text}
                color={badge.color as any}
                customColor={badge.customColor?.hex}
                variant={badge.variant}
                size={badge.size}
                locale={locale}
              />
            </div>
          )}

          {/* Title */}
          <div className="mb-6">
            <RichTextRenderer
              content={getLocalizedRichText(title, locale)}
              className="prose-headings:text-3xl prose-headings:md:text-4xl prose-headings:lg:text-5xl prose-headings:font-bold prose-headings:text-gray-900 prose-headings:mb-0"
            />
          </div>

          {/* Subtitle */}
          {subtitle && (
            <div className="">
              <RichTextRenderer
                content={getLocalizedRichText(subtitle, locale)}
                className="prose-p:text-lg prose-p:text-gray-600 prose-p:mb-0"
              />
            </div>
          )}
        </div>

        {/* Calculator Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 ">
          {/* Left Side - Form */}
          <div className="space-y-6 border border-[#EBEBEB] rounded-2xl p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              {getLocalizedValue(calculatorTitle, locale)}
            </h3>

            {/* Service Selection */}
            <div className="space-y-4">
              <div className="relative">
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-[#FCFCFC] text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                >
                  <option value="">{getLocalizedValue(serviceSelectPlaceholder, locale)}</option>
                  <option value="basic">Basic Service</option>
                  <option value="premium">Premium Service</option>
                  <option value="deluxe">Deluxe Service</option>
                </select>
                <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>

              <div className="relative">
                <select
                  value={selectedOption}
                  onChange={(e) => setSelectedOption(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-[#FCFCFC] text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                >
                  <option value="">{getLocalizedValue(optionSelectPlaceholder, locale)}</option>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </select>
                <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Vehicle Information */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-gray-900">
                {getLocalizedValue(vehicleInfoTitle, locale)}
              </h4>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <select
                    value={selectedMake}
                    onChange={(e) => setSelectedMake(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-[#FCFCFC] text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                  >
                    <option value="">{getLocalizedValue(makeModelPlaceholder, locale)}</option>
                    <option value="toyota">Toyota</option>
                    <option value="bmw">BMW</option>
                    <option value="mercedes">Mercedes</option>
                  </select>
                  <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>

                <div className="relative">
                  <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-[#FCFCFC] text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                  >
                    <option value="">{getLocalizedValue(makeModelPlaceholder, locale)}</option>
                    <option value="model1">Model 1</option>
                    <option value="model2">Model 2</option>
                    <option value="model3">Model 3</option>
                  </select>
                  <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <select
                    value={selectedMileage}
                    onChange={(e) => setSelectedMileage(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-[#FCFCFC] text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                  >
                    <option value="">{getLocalizedValue(mileagePlaceholder, locale)}</option>
                    <option value="low">0-50k km</option>
                    <option value="medium">50k-100k km</option>
                    <option value="high">100k+ km</option>
                  </select>
                  <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>

                <div className="relative">
                  <select
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-[#FCFCFC] text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                  >
                    <option value="">{getLocalizedValue(makeModelPlaceholder, locale)}</option>
                  </select>
                  <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Estimate Button */}
            <button className="inline-flex items-center px-6 py-3 text-base justify-center gap-2 rounded-full transition-all duration-200 font-medium border text-center bg-blue-600 text-white hover:bg-blue-700 border-blue-600">
              {getLocalizedValue(estimateButtonText, locale)}
            </button>
             
          </div>

          {/* Right Side - Pricing Display */}
          <div className="gap-7 grid lg:grid-cols-2">
            {/* Total Card */}
            <div className="bg-blue-600 text-white p-8 rounded-xl row-span-1 lg:row-span-2 h-full col-span-1 flex flex-col items-start justify-end">
              <div className="flex items-center justify-center mb-12 p-4 bg-white rounded-lg">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <span className="text-3xl text-blue-600">€</span>
                </div>
              </div>
              <div className="text-start">
                <p className="!text-white mb-2 text-3xl lg:text-4xl">{getLocalizedValue(totalLabel, locale)}</p>
                <p className="text-5xl lg:text-6xl font-bold !text-white">{total.toFixed(2)} €</p>
              </div>
            </div>

            {/* Discount Card */}
            <div className="bg-[#9DC2F95C] p-4 rounded-lg row-span-1 col-span-1 h-full">
              <div className="flex flex-col items-start justify-center">
                <div className="flex flex-col items-start gap-8 space-x-3 h-full justify-end mt-6">
                  <div className="w-12 h-12 flex items-center justify-center p-4 bg-white rounded-lg">
                    <span className="text-blue-600 text-sm">%</span>
                  </div>
                  <div>
                    <p className="font-medium text-xl text-gray-900">{getLocalizedValue(discountLabel, locale)}</p>
                    <p className="text-2xl lg:text-[44px] font-bold text-gray-900">{discountPercent}%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* VAT Card */}
         <div className="bg-[#9DC2F95C] p-4 rounded-lg row-span-1 col-span-1 h-full">
              <div className="flex flex-col items-start justify-center">
                <div className="flex flex-col items-start gap-8 space-x-3 h-full justify-end mt-6">
                  <div className="w-12 h-12 flex items-center justify-center p-4 bg-white rounded-lg">
                    <span className="text-blue-600 text-sm">📄</span>
                  </div>
                  <div>
                    <p className="font-medium text-xl text-gray-900">{getLocalizedValue(vatLabel, locale)} {vatPercent}%</p>
                    <p className="text-2xl lg:text-[44px] font-bold text-gray-900">{vatAmount.toFixed(2)} €</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
