/**
 * Shared color palette configuration for consistent color usage across schemas
 */

export const colorOptions = [
  { title: 'Primary Blue', value: 'primary' },
  { title: 'Secondary Green', value: 'secondary' },
  { title: 'Accent Orange', value: 'accent' },
  { title: 'Success Green', value: 'success' },
  { title: 'Warning Yellow', value: 'warning' },
  { title: 'Error Red', value: 'error' },
];

export const backgroundColorOptions = [
  { title: 'White', value: 'white' },
  { title: 'Light Gray', value: 'gray-50' },
  { title: 'Blue Light', value: 'blue-50' },
  { title: 'Green Light', value: 'green-50' },
  { title: 'Custom', value: 'custom' },
];

export type ColorOption = typeof colorOptions[number]['value'];
export type BackgroundColorOption = typeof backgroundColorOptions[number]['value'];
