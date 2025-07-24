/**
 * Shared button variant configuration for consistent button styling
 */

export const buttonVariants = [
  { title: 'Primary', value: 'primary' },
  { title: 'Secondary', value: 'secondary' },
  { title: 'Outline', value: 'outline' },
  { title: 'Ghost', value: 'ghost' },
];

export const buttonSizes = [
  { title: 'Small', value: 'sm' },
  { title: 'Medium', value: 'md' },
  { title: 'Large', value: 'lg' },
];

export type ButtonVariant = typeof buttonVariants[number]['value'];
export type ButtonSize = typeof buttonSizes[number]['value'];
