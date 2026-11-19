/**
 * CropConnect - Design System & Theme
 * Premium Agricultural Palette: Natural Green, White, and Warm Cream.
 */

export const Palette = {
  // Natural Greens
  forestGreen: '#1E5128',
  leafGreen: '#2D6A4F',
  emeraldGreen: '#40916C',
  sageGreen: '#74C69D',
  mintGreen: '#D8F3DC',
  paleGreen: '#EAF7ED',

  // Warm Creams & Earth Tones
  warmCream: '#FAF7F2',
  parchment: '#F5EFE6',
  linen: '#EBE3D5',
  sand: '#DFD3C3',
  clay: '#C7B198',

  // Harvest & Accents
  harvestGold: '#D97706',
  amberLight: '#FEF3C7',
  rescueRed: '#DC2626',
  rescueLight: '#FEE2E2',
  infoBlue: '#0284C7',
  infoLight: '#E0F2FE',

  // Neutrals
  white: '#FFFFFF',
  black: '#0F172A',
  charcoal: '#1E293B',
  slateDark: '#334155',
  slateMedium: '#64748B',
  slateLight: '#94A3B8',
  slateBorder: '#E2E8F0',
  warmBorder: '#EAE3D6',
  cardBackground: '#FFFFFF',
};

export const Colors = {
  light: {
    primary: Palette.forestGreen,
    primaryLight: Palette.leafGreen,
    primaryMuted: Palette.paleGreen,
    secondary: Palette.harvestGold,
    secondaryLight: Palette.amberLight,
    background: Palette.warmCream,
    card: Palette.cardBackground,
    surface: Palette.white,
    surfaceAlt: Palette.parchment,
    text: Palette.charcoal,
    textSecondary: Palette.slateMedium,
    textMuted: Palette.slateLight,
    border: Palette.warmBorder,
    borderLight: Palette.slateBorder,
    rescue: Palette.rescueRed,
    rescueBackground: Palette.rescueLight,
    success: Palette.leafGreen,
    tint: Palette.forestGreen,
    tabIconDefault: Palette.slateMedium,
    tabIconSelected: Palette.forestGreen,
  },
  dark: {
    primary: Palette.sageGreen,
    primaryLight: Palette.emeraldGreen,
    primaryMuted: '#1B3828',
    secondary: '#FBBF24',
    secondaryLight: '#78350F',
    background: '#121815',
    card: '#1A231F',
    surface: '#1F2B26',
    surfaceAlt: '#26342E',
    text: '#F1F5F9',
    textSecondary: '#94A3B8',
    textMuted: '#64748B',
    border: '#2A3C34',
    borderLight: '#374941',
    rescue: '#F87171',
    rescueBackground: '#451A1A',
    success: Palette.sageGreen,
    tint: Palette.sageGreen,
    tabIconDefault: '#64748B',
    tabIconSelected: Palette.sageGreen,
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
  fontFamily: {
    regular: 'System',
    medium: 'System',
    semibold: 'System',
    bold: 'System',
  },
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
    shadowColor: '#1E293B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  medium: {
    shadowColor: '#1E293B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  elevated: {
    shadowColor: '#1E5128',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 6,
  },
};

export default Colors;
