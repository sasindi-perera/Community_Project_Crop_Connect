import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TextInputProps,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Palette, BorderRadius, Spacing } from '../../constants/theme';
import { useResponsive } from '../../hooks/useResponsive';
import { useTheme } from '../../hooks/useTheme';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightIconPress?: () => void;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  onRightIconPress,
  containerStyle,
  inputStyle,
  onFocus,
  onBlur,
  ...restProps
}) => {
  const { scaleSize, scaleFont } = useResponsive();
  const { isDark } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.wrapper, containerStyle]}>
      {label && (
        <Text
          style={[
            styles.label,
            {
              fontSize: scaleFont(13),
              color: isDark ? '#E2E8F0' : Palette.charcoal,
            },
          ]}
        >
          {label}
        </Text>
      )}

      <View
        style={[
          styles.inputContainer,
          {
            backgroundColor: isDark ? '#1C2520' : Palette.white,
            borderColor: error
              ? Palette.rescueRed
              : isFocused
              ? Palette.forestGreen
              : isDark
              ? '#2E3B33'
              : Palette.warmBorder,
            paddingHorizontal: scaleSize(Spacing.md),
            height: scaleSize(48),
            borderRadius: BorderRadius.md,
          },
        ]}
      >
        {leftIcon && (
          <Ionicons
            name={leftIcon}
            size={scaleSize(18)}
            color={
              error
                ? Palette.rescueRed
                : isFocused
                ? Palette.forestGreen
                : Palette.slateLight
            }
            style={{ marginRight: scaleSize(8) }}
          />
        )}

        <TextInput
          placeholderTextColor={isDark ? '#64748B' : Palette.slateLight}
          style={[
            styles.input,
            {
              fontSize: scaleFont(15),
              color: isDark ? Palette.white : Palette.charcoal,
            },
            inputStyle,
          ]}
          onFocus={(e) => {
            setIsFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur?.(e);
          }}
          {...restProps}
        />

        {rightIcon && (
          <TouchableOpacity
            onPress={onRightIconPress}
            disabled={!onRightIconPress}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons
              name={rightIcon}
              size={scaleSize(18)}
              color={Palette.slateLight}
            />
          </TouchableOpacity>
        )}
      </View>

      {error ? (
        <Text style={[styles.errorText, { fontSize: scaleFont(12) }]}>
          {error}
        </Text>
      ) : helperText ? (
        <Text
          style={[
            styles.helperText,
            {
              fontSize: scaleFont(12),
              color: isDark ? '#64748B' : Palette.slateMedium,
            },
          ]}
        >
          {helperText}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: Spacing.md,
  },
  label: {
    fontWeight: '600',
    marginBottom: 6,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
  },
  input: {
    flex: 1,
    height: '100%',
    padding: 0,
  },
  errorText: {
    color: Palette.rescueRed,
    marginTop: 4,
    fontWeight: '500',
  },
  helperText: {
    marginTop: 4,
  },
});

export default Input;
