import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Palette, Spacing } from '../../constants/theme';
import { useResponsive } from '../../hooks/useResponsive';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  showRoleBadge?: boolean;
  onNotificationPress?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  title = 'CropConnect',
  subtitle,
  showRoleBadge = true,
  onNotificationPress,
}) => {
  const { scaleSize, scaleFont } = useResponsive();
  const { role, switchRole } = useAuth();
  const { isDark } = useTheme();

  const handleRoleToggle = () => {
    // Quick role toggle for demonstration and testing of Farmer vs Buyer views
    if (role === 'farmer') {
      switchRole('buyer');
    } else if (role === 'buyer') {
      switchRole('admin');
    } else {
      switchRole('farmer');
    }
  };

  const roleLabel =
    role === 'farmer' ? '🌾 Farmer View' : role === 'buyer' ? '🛒 Buyer View' : '⚙️ Admin View';

  return (
    <View
      style={[
        styles.container,
        {
          paddingHorizontal: scaleSize(Spacing.base),
          paddingTop: scaleSize(Spacing.sm),
          paddingBottom: scaleSize(Spacing.md),
          borderBottomColor: isDark ? '#233028' : Palette.warmBorder,
        },
      ]}
    >
      <View style={styles.leftSection}>
        <View style={styles.titleRow}>
          <View style={[styles.leafBadge, { width: scaleSize(28), height: scaleSize(28) }]}>
            <Ionicons name="leaf" size={scaleSize(16)} color={Palette.forestGreen} />
          </View>
          <Text
            style={[
              styles.title,
              {
                fontSize: scaleFont(20),
                color: isDark ? Palette.white : Palette.forestGreen,
              },
            ]}
          >
            {title}
          </Text>
        </View>
        {subtitle && (
          <Text
            style={[
              styles.subtitle,
              {
                fontSize: scaleFont(12),
                color: isDark ? '#94A3B8' : Palette.slateMedium,
              },
            ]}
          >
            {subtitle}
          </Text>
        )}
      </View>

      <View style={styles.rightSection}>
        {showRoleBadge && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleRoleToggle}
            style={[
              styles.roleBadge,
              {
                backgroundColor: isDark ? '#203227' : Palette.parchment,
                borderColor: isDark ? '#2F4738' : Palette.warmBorder,
                paddingHorizontal: scaleSize(10),
                paddingVertical: scaleSize(5),
              },
            ]}
          >
            <Text
              style={[
                styles.roleText,
                {
                  fontSize: scaleFont(11),
                  color: isDark ? Palette.sageGreen : Palette.forestGreen,
                },
              ]}
            >
              {roleLabel}
            </Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={onNotificationPress}
          style={[
            styles.iconButton,
            {
              width: scaleSize(38),
              height: scaleSize(38),
              backgroundColor: isDark ? '#1F2B24' : Palette.white,
              borderColor: isDark ? '#2F4036' : Palette.warmBorder,
            },
          ]}
        >
          <Ionicons
            name="notifications-outline"
            size={scaleSize(18)}
            color={isDark ? Palette.white : Palette.charcoal}
          />
          <View style={styles.notificationDot} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
  },
  leftSection: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leafBadge: {
    backgroundColor: Palette.paleGreen,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  title: {
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  subtitle: {
    marginTop: 2,
    fontWeight: '500',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  roleBadge: {
    borderRadius: 9999,
    borderWidth: 1,
  },
  roleText: {
    fontWeight: '700',
  },
  iconButton: {
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: Palette.rescueRed,
  },
});

export default Header;
