/**
 * Shared spacing and padding configuration for consistent layout controls
 */

export const paddingOptions = [
  { title: 'None', value: 'none' },
  { title: 'Small', value: 'small' },
  { title: 'Medium', value: 'medium' },
  { title: 'Large', value: 'large' },
  { title: 'Extra Large', value: 'xl' },
];

export const marginOptions = [
  { title: 'None', value: 'none' },
  { title: 'Small', value: 'small' },
  { title: 'Medium', value: 'medium' },
  { title: 'Large', value: 'large' },
  { title: 'Extra Large', value: 'xl' },
];

export const alignmentOptions = [
  { title: 'Left', value: 'left' },
  { title: 'Center', value: 'center' },
  { title: 'Right', value: 'right' },
];

export const layoutOptions = [
  { title: 'Content Left, Image Right', value: 'contentLeft' },
  { title: 'Content Right, Image Left', value: 'contentRight' },
  { title: 'Content Center', value: 'contentCenter' },
];

export type PaddingOption = typeof paddingOptions[number]['value'];
export type MarginOption = typeof marginOptions[number]['value'];
export type AlignmentOption = typeof alignmentOptions[number]['value'];
export type LayoutOption = typeof layoutOptions[number]['value'];
