import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Palette, Spacing, BorderRadius, Shadows } from '../constants/theme';
import { useResponsive } from '../hooks/useResponsive';

interface OnboardingSlide {
  id: number;
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  sinhalaTitle: string;
  description: string;
  highlight: string;
  badge: string;
}

const SLIDES: OnboardingSlide[] = [
  {
    id: 0,
    icon: 'people',
    title: 'Direct Farmer-Buyer Matchmaking',
    sinhalaTitle: 'ගොවි-ගැනුම්කරු ඍජු සබඳතාව',
    description: 'Eliminate middlemen brokers. Connect directly with trusted wholesalers, supermarkets, and hotels within your district radius.',
    highlight: '0% Broker Fee • Fair Transparency',
    badge: 'Direct Trade',
  },
  {
    id: 1,
    icon: 'sparkles',
    title: 'AI Fair-Price Prediction',
    sinhalaTitle: 'කෘතිම බුද්ධි සාධාරණ මිල පුරෝකථනය',
    description: 'Understand true market value before selling. Our machine learning model benchmarks daily rates against Dambulla and Pettah markets.',
    highlight: 'Trained on Sri Lankan Agrarian Data',
    badge: 'AI Intelligence',
  },
  {
    id: 2,
    icon: 'flash',
    title: 'Zero-Waste Crop Rescue',
    sinhalaTitle: 'අතිරික්ත අස්වැන්න සුරැකීම',
    description: 'Prevent food waste. Alert nearby bulk buyers to surplus or rapidly perishable harvests at attractive clearance discounts.',
    highlight: 'Over 35% of Post-Harvest Waste Prevented',
    badge: 'Zero Spoilage',
  },
];

export const OnboardingScreen: React.FC = () => {
  const { scaleSize, scaleFont, contentPadding } = useResponsive();
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < SLIDES.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      router.replace('/welcome');
    }
  };

  const handleSkip = () => {
    router.replace('/welcome');
  };

  const slide = SLIDES[currentSlide];

  return (
    <View style={styles.container}>
      {/* Top Header */}
      <View
        style={[
          styles.topBar,
          {
            paddingHorizontal: scaleSize(contentPadding),
            paddingTop: scaleSize(Spacing.lg),
          },
        ]}
      >
        <View style={styles.brandRow}>
          <Ionicons name="leaf" size={scaleSize(20)} color={Palette.primary} />
          <Text style={[styles.brandTitle, { fontSize: scaleFont(16) }]}>CropConnect</Text>
        </View>

        <TouchableOpacity onPress={handleSkip} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Text style={[styles.skipText, { fontSize: scaleFont(13) }]}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Main Slide Card */}
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          paddingHorizontal: scaleSize(contentPadding),
          paddingVertical: scaleSize(Spacing.base),
        }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            styles.card,
            {
              padding: scaleSize(Spacing.xl),
              borderRadius: BorderRadius.xxl,
              ...Shadows.medium,
            },
          ]}
        >
          {/* Badge */}
          <View style={styles.badgePill}>
            <Text style={[styles.badgeText, { fontSize: scaleFont(11) }]}>{slide.badge}</Text>
          </View>

          {/* Large Visual Icon Box */}
          <View
            style={[
              styles.iconCircle,
              {
                width: scaleSize(96),
                height: scaleSize(96),
                borderRadius: scaleSize(48),
                marginVertical: scaleSize(Spacing.lg),
              },
            ]}
          >
            <Ionicons name={slide.icon} size={scaleSize(48)} color={Palette.primary} />
          </View>

          <Text style={[styles.title, { fontSize: scaleFont(22) }]}>
            {slide.title}
          </Text>

          <Text style={[styles.sinhalaTitle, { fontSize: scaleFont(13) }]}>
            {slide.sinhalaTitle}
          </Text>

          <Text style={[styles.description, { fontSize: scaleFont(14) }]}>
            {slide.description}
          </Text>

          <View style={styles.highlightPill}>
            <Ionicons name="checkmark-circle" size={scaleSize(16)} color={Palette.primary} />
            <Text style={[styles.highlightText, { fontSize: scaleFont(12) }]}>
              {slide.highlight}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation Controls */}
      <View
        style={[
          styles.bottomControls,
          {
            paddingHorizontal: scaleSize(contentPadding),
            paddingBottom: scaleSize(Spacing.xl),
          },
        ]}
      >
        {/* Pagination Dots */}
        <View style={styles.dotsContainer}>
          {SLIDES.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                {
                  backgroundColor: i === currentSlide ? Palette.primary : Palette.slateBorder,
                  width: i === currentSlide ? scaleSize(24) : scaleSize(8),
                  height: scaleSize(8),
                  borderRadius: scaleSize(4),
                },
              ]}
            />
          ))}
        </View>

        {/* Action Button */}
        <TouchableOpacity
          activeOpacity={0.88}
          onPress={handleNext}
          style={[
            styles.nextButton,
            {
              paddingVertical: scaleSize(14),
              paddingHorizontal: scaleSize(28),
              borderRadius: BorderRadius.full,
            },
          ]}
        >
          <Text style={[styles.nextButtonText, { fontSize: scaleFont(15) }]}>
            {currentSlide === SLIDES.length - 1 ? 'Get Started' : 'Next'}
          </Text>
          <Ionicons
            name="arrow-forward"
            size={scaleSize(18)}
            color="#FFFFFF"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Palette.background,
    justifyContent: 'space-between',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  brandTitle: {
    fontWeight: '800',
    color: Palette.primary,
  },
  skipText: {
    color: Palette.slateMedium,
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Palette.warmBorder,
  },
  badgePill: {
    backgroundColor: Palette.primaryTint,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 9999,
  },
  badgeText: {
    color: Palette.primary,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  iconCircle: {
    backgroundColor: Palette.primaryTint,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(36, 92, 70, 0.15)',
  },
  title: {
    fontWeight: '800',
    color: Palette.charcoal,
    textAlign: 'center',
    marginBottom: 4,
  },
  sinhalaTitle: {
    color: Palette.secondary,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 12,
  },
  description: {
    color: Palette.slateDark,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 16,
  },
  highlightPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Palette.surfaceAlt,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: BorderRadius.md,
  },
  highlightText: {
    color: Palette.primaryDark,
    fontWeight: '700',
  },
  bottomControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dotsContainer: {
    flexDirection: 'row',
    gap: 6,
  },
  dot: {},
  nextButton: {
    backgroundColor: Palette.primary,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});

export default OnboardingScreen;
