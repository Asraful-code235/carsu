import { type SchemaTypeDefinition } from 'sanity'

// Document types
import { postType } from './documents/postType'
import { authorType } from './documents/authorType'
import { categoryType } from './documents/categoryType'
import { testimonialType } from './documents/testimonialType'
import { headerType } from './documents/headerType'
import { footerType } from './documents/footerType'
import { layoutType } from './documents/layoutType'
import { pageType } from './documents/pageType'

// Object types
import { richTextBlockObject } from './objects/richTextBlock'
import { localeRichTextBlockObject } from './objects/localeRichTextBlock'
import { ctaButtonObject } from './objects/ctaButton'
import { imageWithAltObject } from './objects/imageWithAlt'
import { seoFieldsObject } from './objects/seoFields'
import { paddingControlsObject } from './objects/paddingControls'
import { featureListItemObject } from './objects/featureListItem'
import { colorFieldObject, backgroundColorObject } from './objects/colorField'
import { localeStringObject } from './objects/localeString'

// Shared types
import { badgeType } from './shared/badgeType'

// Section types
import { heroSectionType } from './sections/heroSectionType'
import { productHeroSectionType } from './sections/productHeroSectionType'
import { productFeatureSectionType } from './sections/productFeatureSectionType'
import { productInteractiveSectionType } from './sections/productInteractiveSectionType'
import { productBannerSectionType } from './sections/productBannerSectionType'
import { productPromotionBannerSectionType } from './sections/productPromotionBannerSectionType'
import { aboutSectionType } from './sections/aboutSectionType'
import { pageHeroSectionType } from './sections/pageHeroSectionType'
import { contentSectionType } from './sections/contentSectionType'
import { featureSectionType } from './sections/featureSectionType'
import { testimonialSectionType } from './sections/testimonialSectionType'
import { servicesSectionType } from './sections/servicesSectionType'
import { tryCarsuBannerType } from './sections/tryCarsuBannerType'
import { contactFormSectionType } from './sections/contactFormSectionType'
import { faqSectionType } from './sections/faqSectionType'

// Legacy block content (keeping for backward compatibility)
import { blockContentType } from './blockContentType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Document types
    postType,
    authorType,
    categoryType,
    testimonialType,
    headerType,
    footerType,
    layoutType,
    pageType,

    // Object types
    richTextBlockObject,
    localeRichTextBlockObject,
    ctaButtonObject,
    imageWithAltObject,
    seoFieldsObject,
    paddingControlsObject,
    featureListItemObject,
    colorFieldObject,
    backgroundColorObject,
    localeStringObject,

    // Shared types
    badgeType,

    // Section types
    heroSectionType,
    productHeroSectionType,
    productFeatureSectionType,
    productInteractiveSectionType,
    productBannerSectionType,
    productPromotionBannerSectionType,
    aboutSectionType,
    pageHeroSectionType,
    contentSectionType,
    featureSectionType,
    testimonialSectionType,
    servicesSectionType,
    tryCarsuBannerType,
    contactFormSectionType,
    faqSectionType,

    // Legacy types (for backward compatibility)
    blockContentType,
  ],
}
