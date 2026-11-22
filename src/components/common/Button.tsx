import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Palette, BorderRadius } from '../../constants/theme';
import { useResponsive } from '../../hooks/useResponsive';

type ButtonVariant = 'primary' | 'secondary' | 'rescue' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: keyof typeof Ionicons.glyphMap;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  style,
  textStyle,
  fullWidth = false,
}) => {
  const { scaleSize, scaleFont } = useResponsive();

  const getVariantStyles = (): { container: ViewStyle; text: TextStyle; iconColor: string } => {
    switch (variant) {
      case 'primary':
        return {
          container: {
            backgroundColor: disabled ? Palette.slateLight : Palette.forestGreen,
            borderWidth: 0,
          },
          text: { color: Palette.white },
          iconColor: Palette.white,
        };
      case 'rescue':
        return {
          container: {
            backgroundColor: disabled ? Palette.slateLight : Palette.rescueRed,
            borderWidth: 0,
          },
          text: { color: Palette.white },
          iconColor: Palette.white,
        };
      case 'secondary':
        return {
          container: {
            backgroundColor: Palette.parchment,
            borderWidth: 1,
            borderColor: Palette.warmBorder,
          },
          text: { color: Palette.forestGreen },
          iconColor: Palette.forestGreen,
        };
      case 'outline':
        return {
          container: {
            backgroundColor: 'transparent',
            borderWidth: 1.5,
            borderColor: disabled ? Palette.slateBorder : Palette.forestGreen,
          },
          text: { color: disabled ? Palette.slateLight : Palette.forestGreen },
          iconColor: disabled ? Palette.slateLight : Palette.forestGreen,
        };
      case 'ghost':
        return {
          container: {
            backgroundColor: 'transparent',
            borderWidth: 0,
          },
          text: { color: Palette.forestGreen },
          iconColor: Palette.forestGreen,
        };
    }
  };

  const getSizeStyles = (): { container: ViewStyle; fontSize: number; iconSize: number } => {
    switch (size) {
      case 'sm':
        return {
          container: {
            paddingVertical: scaleSize(8),
            paddingHorizontal: scaleSize(12),
            borderRadius: BorderRadius.sm,
          },
          fontSize: scaleFont(13),
          iconSize: scaleSize(15),
        };
      case 'lg':
        return {
          container: {
            paddingVertical: scaleSize(16),
            paddingHorizontal: scaleSize(24),
            borderRadius: BorderRadius.lg,
          },
          fontSize: scaleFont(17),
          iconSize: scaleSize(22),
        };
      case 'md':
      default:
        return {
          container: {
            paddingVertical: scaleSize(12),
            paddingHorizontal: scaleSize(18),
            borderRadius: BorderRadius.md,
          },
          fontSize: scaleFont(15),
          iconSize: scaleSize(18),
        };
    }
  };

  const variantStyle = getVariantStyles();
  const sizeStyle = getSizeStyles();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.base,
        variantStyle.container,
        sizeStyle.container,
        fullWidth && styles.fullWidth,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={variantStyle.iconColor} size="small" />
      ) : (
        <View style={styles.contentRow}>
          {icon && iconPosition === 'left' && (
            <Ionicons
              name={icon}
              size={sizeStyle.iconSize}
              color={variantStyle.iconColor}
              style={{ marginRight: scaleSize(6) }}
            />
          )}
          <Text
            style={[
              styles.text,
              { fontSize: sizeStyle.fontSize },
              variantStyle.text,
              textStyle,
            ]}
          >
            {title}
          </Text>
          {icon && iconPosition === 'right' && (
            <Ionicons
              name={icon}
              size={sizeStyle.iconSize}
              color={variantStyle.iconColor}
              style={{ marginLeft: scaleSize(6) }}
            />
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  fullWidth: {
    width: '100%',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default Button;
