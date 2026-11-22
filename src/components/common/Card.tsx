import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  StyleProp,
} from 'react-native';
import { Palette, BorderRadius, Shadows, Spacing } from '../../constants/theme';
import { useResponsive } from '../../hooks/useResponsive';
import { useTheme } from '../../hooks/useTheme';

interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  elevated?: boolean;
  variant?: 'white' | 'cream' | 'forest' | 'rescue';
  padding?: keyof typeof Spacing;
  noBorder?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  onPress,
  style,
  elevated = true,
  variant = 'white',
  padding = 'base',
  noBorder = false,
}) => {
  const { scaleSize } = useResponsive();
  const { isDark } = useTheme();

  const getBackgroundColor = () => {
    if (isDark) {
      if (variant === 'forest') return '#1B3828';
      if (variant === 'rescue') return '#3B1818';
      return '#1E2621';
    }
    switch (variant) {
      case 'cream':
        return Palette.parchment;
      case 'forest':
        return Palette.forestGreen;
      case 'rescue':
        return Palette.rescueLight;
      case 'white':
      default:
        return Palette.white;
    }
  };

  const cardStyle: ViewStyle = {
    backgroundColor: getBackgroundColor(),
    borderRadius: BorderRadius.lg,
    padding: scaleSize(Spacing[padding]),
    borderWidth: noBorder ? 0 : 1,
    borderColor: isDark ? '#2D3A32' : variant === 'rescue' ? '#FECACA' : Palette.warmBorder,
    ...(elevated && !isDark ? Shadows.soft : {}),
  };

  if (onPress) {
    return (
      <TouchableOpacity
        activeOpacity={0.88}
        onPress={onPress}
        style={[styles.base, cardStyle, style]}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={[styles.base, cardStyle, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  base: {
    overflow: 'hidden',
  },
});

export default Card;
