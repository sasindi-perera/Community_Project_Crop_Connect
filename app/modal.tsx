import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Palette, Spacing, BorderRadius } from '@/src/constants/theme';
import { Button } from '@/src/components/common/Button';
import { useResponsive } from '@/src/hooks/useResponsive';
import { useTheme } from '@/src/hooks/useTheme';

export default function ModalScreen() {
  const { scaleSize, scaleFont, contentPadding } = useResponsive();
  const { isDark } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#121815' : Palette.warmCream }]}>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />

      <View
        style={[
          styles.headerBar,
          {
            paddingHorizontal: scaleSize(contentPadding),
            borderBottomColor: isDark ? '#233028' : Palette.warmBorder,
          },
        ]}
      >
        <Text
          style={[
            styles.headerTitle,
            { fontSize: scaleFont(17), color: isDark ? Palette.white : Palette.forestGreen },
          ]}
        >
          About CropConnect
        </Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.closeBtn}>
          <Ionicons name="close" size={scaleSize(22)} color={isDark ? Palette.white : Palette.charcoal} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: scaleSize(contentPadding),
          paddingVertical: scaleSize(Spacing.base),
        }}
      >
        {/* Project Card */}
        <View
          style={[
            styles.infoCard,
            {
              backgroundColor: isDark ? '#1C2721' : Palette.white,
              borderColor: isDark ? '#2E4035' : Palette.warmBorder,
              padding: scaleSize(Spacing.base),
              borderRadius: BorderRadius.lg,
            },
          ]}
        >
          <View style={styles.badgeRow}>
            <View style={styles.leafIcon}>
              <Ionicons name="leaf" size={scaleSize(18)} color={Palette.forestGreen} />
            </View>
            <Text
              style={[
                styles.projectTag,
                { fontSize: scaleFont(12), color: Palette.forestGreen },
              ]}
            >
              UNIVERSITY COMMUNITY SOFTWARE PROJECT
            </Text>
          </View>

          <Text
            style={[
              styles.cardTitle,
              { fontSize: scaleFont(18), color: isDark ? Palette.white : Palette.charcoal },
            ]}
          >
            AI-Powered Crop Rescue & Fair-Price Matcher
          </Text>

          <Text
            style={[
              styles.cardBody,
              { fontSize: scaleFont(13), color: isDark ? '#CBD5E1' : Palette.slateDark },
            ]}
          >
            Developed specifically for the Sri Lankan agricultural ecosystem, CropConnect tackles two deep-seated agrarian crises:
          </Text>

          <View style={styles.pointRow}>
            <Ionicons name="checkmark-circle" size={scaleSize(18)} color={Palette.forestGreen} />
            <Text
              style={[
                styles.pointText,
                { fontSize: scaleFont(12), color: isDark ? Palette.white : Palette.charcoal },
              ]}
            >
              <Text style={{ fontWeight: '700' }}>Unfair Intermediary Margins:</Text> Farmers receive a fraction of market value while consumers pay inflated retail rates. Our Scikit-learn AI model computes authentic wholesale equilibrium brackets.
            </Text>
          </View>

          <View style={styles.pointRow}>
            <Ionicons name="checkmark-circle" size={scaleSize(18)} color={Palette.rescueRed} />
            <Text
              style={[
                styles.pointText,
                { fontSize: scaleFont(12), color: isDark ? Palette.white : Palette.charcoal },
              ]}
            >
              <Text style={{ fontWeight: '700' }}>Post-Harvest Spoilage & Gluts:</Text> 30-40% of perishables rot in field bins due to transport bottlenecks. The Crop Rescue engine routes urgent stock to bulk buyers before expiry.
            </Text>
          </View>
        </View>

        {/* Tech Stack Reference */}
        <View
          style={[
            styles.infoCard,
            {
              backgroundColor: isDark ? '#1C2721' : Palette.white,
              borderColor: isDark ? '#2E4035' : Palette.warmBorder,
              padding: scaleSize(Spacing.base),
              borderRadius: BorderRadius.lg,
              marginTop: scaleSize(12),
            },
          ]}
        >
          <Text
            style={[
              styles.cardTitle,
              { fontSize: scaleFont(15), color: isDark ? Palette.white : Palette.charcoal },
            ]}
          >
            Integrated Architecture
          </Text>

          <View style={styles.techList}>
            <Text style={[styles.techItem, { fontSize: scaleFont(12) }]}>• Mobile: React Native, Expo SDK 58, Expo Router, TypeScript</Text>
            <Text style={[styles.techItem, { fontSize: scaleFont(12) }]}>• Geospatial: Expo Location, React Native Maps, Haversine Engine</Text>
            <Text style={[styles.techItem, { fontSize: scaleFont(12) }]}>• Cloud & Auth: Firebase Authentication, Cloud Firestore</Text>
            <Text style={[styles.techItem, { fontSize: scaleFont(12) }]}>• AI Engine: Python, Pandas, NumPy, Scikit-learn Regression</Text>
          </View>
        </View>

        <Button
          title="Got it, Continue"
          variant="primary"
          size="lg"
          fullWidth
          onPress={() => router.back()}
          style={{ marginTop: scaleSize(18) }}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontWeight: '800',
  },
  closeBtn: {
    padding: 4,
  },
  infoCard: {
    borderWidth: 1,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  leafIcon: {
    width: 24,
    height: 24,
    borderRadius: 6,
    backgroundColor: Palette.paleGreen,
    alignItems: 'center',
    justifyContent: 'center',
  },
  projectTag: {
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  cardTitle: {
    fontWeight: '800',
    marginBottom: 8,
  },
  cardBody: {
    lineHeight: 18,
    marginBottom: 12,
  },
  pointRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 8,
  },
  pointText: {
    flex: 1,
    lineHeight: 18,
  },
  techList: {
    gap: 6,
    marginTop: 6,
  },
  techItem: {
    color: Palette.slateMedium,
  },
});
