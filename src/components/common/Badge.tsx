import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Palette, BorderRadius } from '../../constants/theme';
import { useResponsive } from '../../hooks/useResponsive';

export type BadgeVariant = 'rescue' | 'aiFair' | 'verified' | 'category' | 'grade' | 'neutral';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  icon?: keyof typeof Ionicons.glyphMap;
  size?: 'sm' | 'md';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'neutral',
  icon,
  size = 'md',
  style,
  textStyle,
}) => {
  const { scaleSize, scaleFont } = useResponsive();

  const getVariantConfig = () => {
    switch (variant) {
      case 'rescue':
        return {
          bg: Palette.rescueLight,
          border: '#F87171',
          text: Palette.rescueRed,
          defaultIcon: 'alert-circle' as const,
        };
      case 'aiFair':
        return {
          bg: Palette.paleGreen,
          border: Palette.sageGreen,
          text: Palette.forestGreen,
          defaultIcon: 'sparkles' as const,
        };
      case 'verified':
        return {
          bg: Palette.paleGreen,
          border: Palette.emeraldGreen,
          text: Palette.forestGreen,
          defaultIcon: 'checkmark-circle' as const,
        };
      case 'grade':
        return {
          bg: Palette.amberLight,
          border: '#FCD34D',
          text: Palette.harvestGold,
          defaultIcon: 'ribbon-outline' as const,
        };
      case 'category':
        return {
          bg: Palette.parchment,
          border: Palette.warmBorder,
          text: Palette.charcoal,
          defaultIcon: undefined,
        };
      case 'neutral':
      default:
        return {
          bg: Palette.parchment,
          border: Palette.slateBorder,
          text: Palette.slateDark,
          defaultIcon: undefined,
        };
    }
  };

  const config = getVariantConfig();
  const activeIcon = icon || config.defaultIcon;
  const isSmall = size === 'sm';

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: config.bg,
          borderColor: config.border,
          paddingVertical: isSmall ? scaleSize(3) : scaleSize(5),
          paddingHorizontal: isSmall ? scaleSize(6) : scaleSize(10),
        },
        style,
      ]}
    >
      {activeIcon && (
        <Ionicons
          name={activeIcon}
          size={isSmall ? scaleSize(11) : scaleSize(13)}
          color={config.text}
          style={{ marginRight: scaleSize(4) }}
        />
      )}
      <Text
        style={[
          styles.label,
          {
            color: config.text,
            fontSize: isSmall ? scaleFont(11) : scaleFont(12),
          },
          textStyle,
        ]}
      >
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  label: {
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});

export default Badge;
