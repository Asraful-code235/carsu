/**
 * Shared icon configuration for consistent icon usage across schemas
 */

export const iconOptions = [
  { title: 'Check Mark', value: 'check' },
  { title: 'Star', value: 'star' },
  { title: 'Arrow Right', value: 'arrowRight' },
  { title: 'Plus', value: 'plus' },
  { title: 'Heart', value: 'heart' },
  { title: 'Shield', value: 'shield' },
  { title: 'Lightning', value: 'lightning' },
  { title: 'Globe', value: 'globe' },
  { title: 'Cog', value: 'cog' },
  { title: 'User', value: 'user' },
];

export const socialIconOptions = [
  { title: 'Facebook', value: 'facebook' },
  { title: 'Twitter', value: 'twitter' },
  { title: 'Instagram', value: 'instagram' },
  { title: 'LinkedIn', value: 'linkedin' },
  { title: 'YouTube', value: 'youtube' },
  { title: 'GitHub', value: 'github' },
  { title: 'Discord', value: 'discord' },
  { title: 'TikTok', value: 'tiktok' },
];

export type IconOption = typeof iconOptions[number]['value'];
export type SocialIconOption = typeof socialIconOptions[number]['value'];
