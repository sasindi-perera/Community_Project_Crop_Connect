import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Palette, Spacing, BorderRadius, Shadows } from '../constants/theme';
import { Header } from '../components/common/Header';
import { Badge } from '../components/common/Badge';
import { CropListingCard } from '../components/home/CropListingCard';
import { useResponsive } from '../hooks/useResponsive';
import { useTheme } from '../hooks/useTheme';
import { INITIAL_MOCK_LISTINGS } from '../services/mockDataService';
import { CropListing } from '../types/listing';

export const RescueScreen: React.FC = () => {
  const { scaleSize, scaleFont, contentPadding } = useResponsive();
  const { isDark } = useTheme();

  const [activeDistrict, setActiveDistrict] = useState('All');
  const [listings] = useState<CropListing[]>(
    INITIAL_MOCK_LISTINGS.filter((l) => l.isRescueCrop)
  );

  const districts = ['All', 'Matale', 'Badulla', 'Nuwara Eliya', 'Anuradhapura'];

  const filtered = listings.filter((l) => {
    if (activeDistrict === 'All') return true;
    return l.location.district === activeDistrict;
  });

  const totalKg = filtered.reduce((acc, curr) => acc + curr.quantityKg, 0);

  const handleListingPress = (id: string) => {
    router.push({
      pathname: '/listing/[id]',
      params: { id },
    });
  };

  return (
    <View style={[styles.screen, { backgroundColor: isDark ? '#121815' : Palette.warmCream }]}>
      <Header
        title="Crop Rescue Hub"
        subtitle="Zero-Waste Surplus Produce Matcher"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: scaleSize(90) }}
      >
        {/* Mission Card */}
        <View
          style={[
            styles.missionCard,
            {
              backgroundColor: isDark ? '#3A1818' : '#FFF0F0',
              borderColor: isDark ? '#5A2626' : '#FECACA',
              marginHorizontal: scaleSize(contentPadding),
              padding: scaleSize(Spacing.base),
              borderRadius: BorderRadius.lg,
            },
          ]}
        >
          <View style={styles.missionTop}>
            <View style={styles.rescueIconBadge}>
              <Ionicons name="shield-checkmark" size={scaleSize(20)} color={Palette.rescueRed} />
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={[
                  styles.missionTitle,
                  { fontSize: scaleFont(16), color: isDark ? Palette.white : Palette.charcoal },
                ]}
              >
                Save Fresh Harvests from Spoilage
              </Text>
              <Text
                style={[
                  styles.missionSub,
                  { fontSize: scaleFont(12), color: isDark ? '#E2E8F0' : Palette.slateDark },
                ]}
              >
                In Sri Lanka, 30-40% of vegetables spoil post-harvest due to transport delays or sudden glut. By rescuing these crops, you support farmers and get peak quality at wholesale discounts.
              </Text>
            </View>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statCol}>
              <Text style={[styles.statValue, { fontSize: scaleFont(18), color: Palette.rescueRed }]}>
                {listings.length}
              </Text>
              <Text style={[styles.statLabel, { fontSize: scaleFont(11) }]}>Urgent Harvests</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statCol}>
              <Text style={[styles.statValue, { fontSize: scaleFont(18), color: Palette.rescueRed }]}>
                {totalKg.toLocaleString()} kg
              </Text>
              <Text style={[styles.statLabel, { fontSize: scaleFont(11) }]}>Surplus at Risk</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statCol}>
              <Text style={[styles.statValue, { fontSize: scaleFont(18), color: Palette.leafGreen }]}>
                25-35%
              </Text>
              <Text style={[styles.statLabel, { fontSize: scaleFont(11) }]}>Clearance Discount</Text>
            </View>
          </View>
        </View>

        {/* District Filter */}
        <View style={{ marginVertical: scaleSize(10) }}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: scaleSize(contentPadding),
              gap: scaleSize(8),
            }}
          >
            {districts.map((d) => {
              const selected = activeDistrict === d;
              return (
                <TouchableOpacity
                  key={d}
                  onPress={() => setActiveDistrict(d)}
                  style={[
                    styles.districtChip,
                    {
                      backgroundColor: selected
                        ? Palette.rescueRed
                        : isDark
                        ? '#1F2A23'
                        : Palette.white,
                      borderColor: selected
                        ? Palette.rescueRed
                        : isDark
                        ? '#2F4035'
                        : Palette.warmBorder,
                      paddingVertical: scaleSize(6),
                      paddingHorizontal: scaleSize(12),
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.districtLabel,
                      {
                        fontSize: scaleFont(12),
                        color: selected ? Palette.white : isDark ? Palette.white : Palette.charcoal,
                        fontWeight: selected ? '700' : '500',
                      },
                    ]}
                  >
                    {d}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Rescue Listings List */}
        {filtered.map((listing) => (
          <CropListingCard
            key={listing.id}
            listing={listing}
            onPress={() => handleListingPress(listing.id)}
            onRescuePress={() => handleListingPress(listing.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  missionCard: {
    marginVertical: 12,
    borderWidth: 1.5,
  },
  missionTop: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  rescueIconBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  missionTitle: {
    fontWeight: '800',
    marginBottom: 4,
  },
  missionSub: {
    lineHeight: 18,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: 'rgba(220, 38, 38, 0.15)',
    paddingTop: 10,
  },
  statCol: {
    alignItems: 'center',
  },
  statValue: {
    fontWeight: '900',
  },
  statLabel: {
    color: Palette.slateMedium,
    fontWeight: '600',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(220, 38, 38, 0.2)',
  },
  districtChip: {
    borderRadius: BorderRadius.full,
    borderWidth: 1,
  },
  districtLabel: {},
});

export default RescueScreen;
