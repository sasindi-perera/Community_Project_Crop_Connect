/**
 * CropConnect - Design System & Theme
 * Primary: Forest Green (#245C46)
 * Secondary: Fresh Green (#70A879)
 * Background: Warm Cream (#F8F7F0)
 * Accent: Golden Yellow (#F4C95D)
 */

export const Palette = {
  // Brand Agricultural Colors
  primary: '#245C46',        // Forest Green
  primaryDark: '#1A4333',
  primaryLight: '#307A5D',
  primaryTint: '#E8F3EE',    // Very soft green tint

  secondary: '#70A879',      // Fresh Green
  secondaryDark: '#568E5F',
  secondaryLight: '#8BC194',
  secondaryTint: '#F0F7F2',

  accent: '#F4C95D',         // Golden Yellow
  accentDark: '#D8AB3A',
  accentLight: '#FBE8B3',
  accentTint: '#FEF9ED',

  background: '#F8F7F0',     // Warm Cream
  surface: '#FFFFFF',        // Pure White Card
  surfaceAlt: '#F2EFE6',     // Slightly darker cream
  warmBorder: '#E8E4D8',
  subtleBorder: '#EBE7DC',

  // Alert & Crop Rescue Urgency
  rescueRed: '#DC2626',
  rescueLight: '#FEE2E2',
  rescueDark: '#B91C1C',
  rescueBorder: '#FECACA',

  // Neutrals & Text
  white: '#FFFFFF',
  black: '#0F172A',
  charcoal: '#1E293B',
  slateDark: '#334155',
  slateMedium: '#64748B',
  slateLight: '#94A3B8',
  slateBorder: '#E2E8F0',
  disabled: '#CBD5E1',

  // Semantic Status
  success: '#15803D',
  successLight: '#DCFCE7',
  warning: '#D97706',
  warningLight: '#FEF3C7',
  info: '#0284C7',
  infoLight: '#E0F2FE',

  // Backward-compatibility aliases
  forestGreen: '#245C46',
  leafGreen: '#70A879',
  emeraldGreen: '#307A5D',
  sageGreen: '#8BC194',
  paleGreen: '#E8F3EE',
  warmCream: '#F8F7F0',
  parchment: '#F2EFE6',
  harvestGold: '#F4C95D',
  amberLight: '#FBE8B3',
};

export const Colors = {
  light: {
    primary: Palette.primary,
    primaryLight: Palette.secondary,
    primaryMuted: Palette.primaryTint,
    secondary: Palette.accent,
    secondaryLight: Palette.accentLight,
    background: Palette.background,
    card: Palette.surface,
    surface: Palette.surface,
    surfaceAlt: Palette.surfaceAlt,
    text: Palette.charcoal,
    textSecondary: Palette.slateMedium,
    textMuted: Palette.slateLight,
    border: Palette.warmBorder,
    borderLight: Palette.subtleBorder,
    rescue: Palette.rescueRed,
    rescueBackground: Palette.rescueLight,
    success: Palette.success,
    tint: Palette.primary,
    tabIconDefault: Palette.slateMedium,
    tabIconSelected: Palette.primary,
  },
  dark: {
    primary: Palette.secondary,
    primaryLight: Palette.primaryLight,
    primaryMuted: '#1E362A',
    secondary: Palette.accent,
    secondaryLight: '#5C4410',
    background: '#121815',
    card: '#1C2621',
    surface: '#1C2621',
    surfaceAlt: '#233029',
    text: '#F1F5F9',
    textSecondary: '#94A3B8',
    textMuted: '#64748B',
    border: '#2A3C34',
    borderLight: '#32473D',
    rescue: '#F87171',
    rescueBackground: '#451A1A',
    success: Palette.secondary,
    tint: Palette.secondary,
    tabIconDefault: '#64748B',
    tabIconSelected: Palette.secondary,
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 40,
};

export const BorderRadius = {
  xs: 6,
  sm: 10,
  md: 14,
  lg: 18,
  xl: 22,
  xxl: 28,
  full: 9999,
};

export const Typography = {
  sizes: {
    xs: 11,
    sm: 13,
    base: 15,
    md: 17,
    lg: 20,
    xl: 24,
    xxl: 28,
    hero: 34,
  },
  lineHeights: {
    xs: 15,
    sm: 18,
    base: 22,
    md: 24,
    lg: 28,
    xl: 32,
    xxl: 36,
    hero: 42,
  },
};

export const Shadows = {
  soft: {
    shadowColor: '#245C46',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  medium: {
    shadowColor: '#245C46',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.12,
    shadowRadius: 14,
    elevation: 5,
  },
  elevated: {
    shadowColor: '#245C46',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 20,
    elevation: 8,
  },
};

export default Colors;
