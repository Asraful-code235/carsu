# 🏗️ Sanity Schema Architecture Guide

## Overview
This document outlines the refactored Sanity schema architecture that promotes reusability, maintainability, and consistency across the CMS.

## 📁 Folder Structure

```
src/sanity/schemaTypes/
├── index.ts                    # Main schema export
├── documents/                  # Document types
│   ├── testimonialType.ts     # Testimonial documents
│   ├── postType.ts           # Blog post documents
│   ├── authorType.ts         # Author documents
│   ├── categoryType.ts       # Category documents
│   ├── headerType.ts         # Header configurations
│   ├── footerType.ts         # Footer configurations
│   ├── layoutType.ts         # Site layout configurations
│   └── pageType.ts           # Page configurations
├── objects/                    # Reusable object schemas
│   ├── ctaButton.ts          # CTA button object
│   ├── richTextBlock.ts      # Rich text with colored text
│   ├── imageWithAlt.ts       # Image with alt text
│   ├── seoFields.ts          # SEO meta fields
│   ├── paddingControls.ts    # Padding/spacing controls
│   ├── featureListItem.ts    # Feature list item with icon
│   └── colorField.ts         # Color picker fields
├── shared/                     # Shared configurations
│   ├── colorPalette.ts       # Color options
│   ├── buttonVariants.ts     # Button style variants
│   ├── iconOptions.ts        # Icon type definitions
│   └── spacingOptions.ts     # Spacing and layout options
└── sections/                   # Page section types
    ├── heroSectionType.ts    # Hero sections
    ├── featureSectionType.ts # Feature sections
    ├── testimonialSectionType.ts # Testimonial carousels
    └── aboutSectionType.ts   # About sections
```

## 🧩 Reusable Components

### Object Schemas

#### 1. **CTA Button Object** (`objects/ctaButton.ts`)
```typescript
// Usage in any schema
defineField({
  name: 'ctaButtons',
  type: 'array',
  of: [ctaButtonObject],
})
```

**Features:**
- Text, URL, variant, size, icon
- Open in new tab option
- Disabled state support
- Consistent preview display

#### 2. **Rich Text Block** (`objects/richTextBlock.ts`)
```typescript
// Usage in any schema
defineField({
  name: 'content',
  ...richTextBlockObject,
})
```

**Features:**
- Colored text annotations with custom colors
- Font weight control (normal, medium, semibold, bold)
- Links with new tab option
- Inline images with captions
- Standard formatting (headings, lists, etc.)

#### 3. **Image with Alt** (`objects/imageWithAlt.ts`)
```typescript
// Usage in any schema
defineField({
  name: 'image',
  ...imageWithAltObject,
})
```

**Features:**
- Required alt text for accessibility
- Optional caption
- Display width/height overrides
- Priority loading flag for above-the-fold images
- Hotspot support

#### 4. **SEO Fields** (`objects/seoFields.ts`)
```typescript
// Usage in any schema
defineField({
  name: 'seo',
  ...seoFieldsObject,
})
```

**Features:**
- Meta title and description with character limits
- Open Graph title, description, and image
- No-index and no-follow options
- Canonical URL
- Focus keywords array

#### 5. **Padding Controls** (`objects/paddingControls.ts`)
```typescript
// Usage in any schema
defineField({
  name: 'padding',
  ...paddingControlsObject,
})
```

**Features:**
- Top, bottom, left, right padding controls
- Consistent spacing options (none, small, medium, large, xl)
- Preview display of spacing values

#### 6. **Feature List Item** (`objects/featureListItem.ts`)
```typescript
// Usage in any schema
defineField({
  name: 'features',
  type: 'array',
  of: [featureListItemObject],
})
```

**Features:**
- Feature text and description
- Icon selection with color options
- Highlighted feature flag
- Optional feature links
- Rich preview display

### Shared Configurations

#### 1. **Color Palette** (`shared/colorPalette.ts`)
Centralized color definitions used across all schemas:
- Primary, secondary, accent colors
- Success, warning, error colors
- Background color options
- TypeScript type exports

#### 2. **Button Variants** (`shared/buttonVariants.ts`)
Consistent button styling options:
- Primary, secondary, outline, ghost variants
- Small, medium, large sizes
- TypeScript type exports

#### 3. **Icon Options** (`shared/iconOptions.ts`)
Standardized icon selections:
- General icons (check, star, arrow, etc.)
- Social media icons
- TypeScript type exports

#### 4. **Spacing Options** (`shared/spacingOptions.ts`)
Layout and spacing configurations:
- Padding and margin options
- Text alignment options
- Layout direction options
- TypeScript type exports

## 🎯 Section Types

### 1. **Hero Section** (`sections/heroSectionType.ts`)
**Features:**
- Rich text heading with colored text support
- Multiple CTA buttons
- Hero image with background elements
- Full viewport height option
- Parallax effects
- Scroll indicators

### 2. **Feature Section** (`sections/featureSectionType.ts`)
**Features:**
- Flexible layout (content left/right/center)
- Rich text title and description
- Feature list with icons
- Multiple CTA buttons
- Image with aspect ratio control
- Background colors and spacing

### 3. **Testimonials Section** (`sections/testimonialSectionType.ts`)
**Features:**
- Rich text title
- Reference to testimonial documents
- Carousel settings (autoplay, navigation, etc.)
- Responsive items per view
- Background and spacing controls

### 4. **About Section** (`sections/aboutSectionType.ts`)
**Features:**
- Rich text title and content
- Multiple layout options (text only, with image, two columns)
- Statistics display
- CTA buttons
- Text alignment controls

## 🔄 Migration Benefits

### Before Refactoring
- ❌ Duplicated field definitions across schemas
- ❌ Inconsistent validation rules
- ❌ Hard to maintain and update
- ❌ No shared styling options
- ❌ Scattered configuration

### After Refactoring
- ✅ Single source of truth for common elements
- ✅ Consistent validation and behavior
- ✅ Easy to maintain and extend
- ✅ Shared configuration options
- ✅ Organized, scalable structure

## 🚀 Usage Examples

### Creating a New Section Type
```typescript
import { defineField, defineType } from 'sanity';
import { richTextBlockObject } from '../objects/richTextBlock';
import { ctaButtonObject } from '../objects/ctaButton';
import { paddingControlsObject } from '../objects/paddingControls';

export const newSectionType = defineType({
  name: 'newSection',
  title: 'New Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      ...richTextBlockObject,
    }),
    defineField({
      name: 'buttons',
      type: 'array',
      of: [ctaButtonObject],
    }),
    defineField({
      name: 'padding',
      ...paddingControlsObject,
    }),
  ],
});
```

### Adding to Schema Index
```typescript
// In src/sanity/schemaTypes/index.ts
import { newSectionType } from './sections/newSectionType';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // ... existing types
    newSectionType,
  ],
};
```

## 🎨 Frontend Integration

The refactored schemas work seamlessly with existing frontend components:

- **RichTextRenderer** supports the enhanced rich text with colored text and font weights
- **Section components** continue to work with the new section types
- **Type definitions** are automatically generated and remain compatible

## 📝 Best Practices

1. **Always use shared objects** instead of inline definitions
2. **Import from shared configurations** for consistent options
3. **Add TypeScript types** for better development experience
4. **Use descriptive field descriptions** for content editors
5. **Include validation rules** for data quality
6. **Provide meaningful previews** for better content management

This architecture ensures scalability, maintainability, and consistency across your Sanity CMS while providing a great experience for both developers and content editors.
