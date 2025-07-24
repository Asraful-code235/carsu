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
import { ctaButtonObject } from './objects/ctaButton'
import { imageWithAltObject } from './objects/imageWithAlt'
import { seoFieldsObject } from './objects/seoFields'
import { paddingControlsObject } from './objects/paddingControls'
import { featureListItemObject } from './objects/featureListItem'
import { colorFieldObject, backgroundColorObject } from './objects/colorField'

// Section types
import { heroSectionType } from './sections/heroSectionType'
import { aboutSectionType } from './sections/aboutSectionType'
import { featureSectionType } from './sections/featureSectionType'
import { testimonialSectionType } from './sections/testimonialSectionType'
import { servicesSectionType } from './sections/servicesSectionType'

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
    ctaButtonObject,
    imageWithAltObject,
    seoFieldsObject,
    paddingControlsObject,
    featureListItemObject,
    colorFieldObject,
    backgroundColorObject,

    // Section types
    heroSectionType,
    aboutSectionType,
    featureSectionType,
    testimonialSectionType,
    servicesSectionType,

    // Legacy types (for backward compatibility)
    blockContentType,
  ],
}
