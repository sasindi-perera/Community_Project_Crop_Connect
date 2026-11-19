import { useWindowDimensions, PixelRatio, Platform } from 'react-native';

const BASE_WIDTH = 375; // Standard mobile base width (e.g. iPhone SE / common Android)

export interface ResponsiveValues {
  width: number;
  height: number;
  isSmallDevice: boolean;
  isMediumDevice: boolean;
  isTablet: boolean;
  isLandscape: boolean;
  scaleSize: (size: number) => number;
  scaleFont: (size: number) => number;
  contentPadding: number;
  numColumns: number;
  isIOS: boolean;
  isAndroid: boolean;
}

export function useResponsive(): ResponsiveValues {
  const { width, height, fontScale } = useWindowDimensions();

  const isSmallDevice = width < 360;
  const isTablet = width >= 600;
  const isMediumDevice = !isSmallDevice && !isTablet;
  const isLandscape = width > height;

  // Scale based on device width relative to base width, bounded to prevent extremes
  const scale = width / BASE_WIDTH;
  const boundedScale = Math.min(Math.max(scale, 0.85), 1.3);

  const scaleSize = (size: number): number => {
    return Math.round(size * boundedScale);
  };

  const scaleFont = (size: number): number => {
    const calculated = size * (boundedScale / Math.max(fontScale, 1));
    return Math.round(PixelRatio.roundToNearestPixel(calculated));
  };

  const contentPadding = isTablet ? 32 : isSmallDevice ? 12 : 16;
  const numColumns = isTablet ? 3 : isLandscape ? 2 : 1;

  return {
    width,
    height,
    isSmallDevice,
    isMediumDevice,
    isTablet,
    isLandscape,
    scaleSize,
    scaleFont,
    contentPadding,
    numColumns,
    isIOS: Platform.OS === 'ios',
    isAndroid: Platform.OS === 'android',
  };
}

export default useResponsive;
