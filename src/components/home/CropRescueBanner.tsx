import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Palette, BorderRadius, Spacing, Shadows } from '../../constants/theme';
import { useResponsive } from '../../hooks/useResponsive';
import { useTheme } from '../../hooks/useTheme';

interface CropRescueBannerProps {
  urgentCount: number;
  totalKgAtRisk: number;
  onPress: () => void;
}

export const CropRescueBanner: React.FC<CropRescueBannerProps> = ({
  urgentCount,
  totalKgAtRisk,
  onPress,
}) => {
  const { scaleSize, scaleFont } = useResponsive();
  const { isDark } = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={[
        styles.container,
        {
          padding: scaleSize(Spacing.base),
          borderRadius: BorderRadius.lg,
          backgroundColor: isDark ? '#3D1717' : '#FFF5F5',
          borderColor: isDark ? '#5C2222' : '#FECACA',
          ...(isDark ? {} : Shadows.soft),
        },
      ]}
    >
      <View style={styles.topRow}>
        <View style={styles.badgeContainer}>
          <View style={styles.pulseDot} />
          <Text
            style={[
              styles.badgeText,
              {
                fontSize: scaleFont(11),
                color: Palette.rescueRed,
              },
            ]}
          >
            ACTIVE CROP RESCUE ALERT
          </Text>
        </View>

        <View style={styles.timerBadge}>
          <Ionicons name="time-outline" size={scaleSize(12)} color={Palette.rescueRed} />
          <Text style={[styles.timerText, { fontSize: scaleFont(11) }]}>Urgent Clearance</Text>
        </View>
      </View>

      <Text
        style={[
          styles.title,
          {
            fontSize: scaleFont(17),
            color: isDark ? Palette.white : Palette.charcoal,
          },
        ]}
      >
        {urgentCount} Surplus Harvests Need Fast Pickup
      </Text>

      <Text
        style={[
          styles.subtitle,
          {
            fontSize: scaleFont(13),
            color: isDark ? '#E2E8F0' : Palette.slateDark,
          },
        ]}
      >
        Over {totalKgAtRisk.toLocaleString()} kg of fresh produce at risk of spoilage. Available at 25%-35% rescue discounts.
      </Text>

      <View style={styles.footerRow}>
        <View style={styles.ecoImpact}>
          <Ionicons name="leaf-outline" size={scaleSize(15)} color={Palette.leafGreen} />
          <Text style={[styles.ecoText, { fontSize: scaleFont(12) }]}>Zero Waste Mission</Text>
        </View>

        <View style={styles.actionButton}>
          <Text style={[styles.actionText, { fontSize: scaleFont(12) }]}>Browse Deals</Text>
          <Ionicons name="arrow-forward" size={scaleSize(13)} color={Palette.rescueRed} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 10,
    borderWidth: 1.5,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  pulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Palette.rescueRed,
  },
  badgeText: {
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  timerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Palette.rescueLight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 9999,
  },
  timerText: {
    color: Palette.rescueRed,
    fontWeight: '700',
  },
  title: {
    fontWeight: '800',
    marginBottom: 4,
  },
  subtitle: {
    lineHeight: 18,
    marginBottom: 12,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(220, 38, 38, 0.15)',
    paddingTop: 10,
  },
  ecoImpact: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  ecoText: {
    color: Palette.leafGreen,
    fontWeight: '600',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  actionText: {
    color: Palette.rescueRed,
    fontWeight: '700',
  },
});

export default CropRescueBanner;
