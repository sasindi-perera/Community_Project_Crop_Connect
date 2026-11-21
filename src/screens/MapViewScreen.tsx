import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Palette, Spacing, BorderRadius, Shadows } from '../constants/theme';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { useResponsive } from '../hooks/useResponsive';
import { ALL_MOCK_LISTINGS } from '../services/mockDataService';

interface MapPinItem {
  id: string;
  name: string;
  district: string;
  crop: string;
  pricePerKg: number;
  isRescue: boolean;
  distanceKm: number;
  listingId: string;
  xPct: number;
  yPct: number;
}

const SRI_LANKA_MAP_PINS: MapPinItem[] = [
  { id: 'pin_1', name: 'Sunil Bandara Farm', district: 'Nuwara Eliya', crop: 'Carrot', pricePerKg: 280, isRescue: false, distanceKm: 8.4, listingId: 'crop_001', xPct: 48, yPct: 58 },
  { id: 'pin_2', name: 'Gunasekara Tomato Farm', district: 'Matale', crop: 'Field Tomatoes', pricePerKg: 175, isRescue: true, distanceKm: 14.2, listingId: 'crop_002', xPct: 47, yPct: 44 },
  { id: 'pin_3', name: 'Murugan Red Onions', district: 'Jaffna', crop: 'Red Onion', pricePerKg: 380, isRescue: false, distanceKm: 42.5, listingId: 'crop_003', xPct: 44, yPct: 14 },
  { id: 'pin_4', name: 'Ranjith Leeks Field', district: 'Badulla', crop: 'Welimada Leeks', pricePerKg: 155, isRescue: true, distanceKm: 26.8, listingId: 'crop_004', xPct: 56, yPct: 62 },
  { id: 'pin_5', name: 'Nihal Paddy Store', district: 'Polonnaruwa', crop: 'Keeri Samba', pricePerKg: 142, isRescue: false, distanceKm: 68.0, listingId: 'crop_005', xPct: 55, yPct: 38 },
];

export const MapViewScreen: React.FC = () => {
  const { scaleSize, scaleFont, contentPadding } = useResponsive();
  const [selectedRadius, setSelectedRadius] = useState('50 km');
  const [selectedPin, setSelectedPin] = useState<MapPinItem>(SRI_LANKA_MAP_PINS[1]);

  const activeListing =
    ALL_MOCK_LISTINGS.find((l) => l.id === selectedPin.listingId) ||
    ALL_MOCK_LISTINGS[0];

  return (
    <View style={styles.screen}>
      {/* Top Floating Controls */}
      <View
        style={[
          styles.topControlCard,
          {
            marginHorizontal: scaleSize(contentPadding),
            padding: scaleSize(10),
            borderRadius: BorderRadius.lg,
            ...Shadows.medium,
          },
        ]}
      >
        <View style={styles.searchRow}>
          <TouchableOpacity onPress={() => router.back()} style={styles.iconBtn}>
            <Ionicons name="arrow-back" size={scaleSize(20)} color={Palette.charcoal} />
          </TouchableOpacity>
          <View style={{ flex: 1, marginHorizontal: 8 }}>
            <Text style={[styles.mapHeaderTitle, { fontSize: scaleFont(14) }]}>
              Sri Lanka Agricultural Map
            </Text>
            <Text style={[styles.mapHeaderSub, { fontSize: scaleFont(11) }]}>
              {SRI_LANKA_MAP_PINS.length} Verified Farms in Radius
            </Text>
          </View>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="locate" size={scaleSize(20)} color={Palette.primary} />
          </TouchableOpacity>
        </View>

        {/* Radius Chips */}
        <View style={styles.radiusRow}>
          {['15 km', '35 km', '50 km', '100 km', 'All Island'].map((r) => {
            const active = selectedRadius === r;
            return (
              <TouchableOpacity
                key={r}
                onPress={() => setSelectedRadius(r)}
                style={[
                  styles.radiusChip,
                  active && styles.radiusChipActive,
                  { paddingHorizontal: scaleSize(10), paddingVertical: scaleSize(4) },
                ]}
              >
                <Text
                  style={[
                    styles.radiusText,
                    active && styles.radiusTextActive,
                    { fontSize: scaleFont(11) },
                  ]}
                >
                  {r}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Visual Interactive Map Canvas */}
      <View style={styles.mapCanvas}>
        {/* Map Background Grid Representation */}
        <View style={styles.islandSilhoutte}>
          <Text style={styles.islandWatermark}>SRI LANKA AGRARIAN RADAR</Text>
          <View style={styles.watermarkCentroid}>
            <Ionicons name="navigate-circle-outline" size={scaleSize(180)} color="rgba(36, 92, 70, 0.06)" />
          </View>
        </View>

        {/* Major Market Hub Labels */}
        <View style={[styles.hubTag, { top: '42%', left: '42%' }]}>
          <Ionicons name="storefront" size={scaleSize(12)} color={Palette.warning} />
          <Text style={styles.hubText}>Dambulla DEC</Text>
        </View>

        <View style={[styles.hubTag, { top: '65%', left: '26%' }]}>
          <Ionicons name="storefront" size={scaleSize(12)} color={Palette.primary} />
          <Text style={styles.hubText}>Pettah Manning</Text>
        </View>

        <View style={[styles.hubTag, { top: '56%', left: '55%' }]}>
          <Ionicons name="storefront" size={scaleSize(12)} color={Palette.secondaryDark} />
          <Text style={styles.hubText}>Keppetipola Hub</Text>
        </View>

        {/* Pins */}
        {SRI_LANKA_MAP_PINS.map((pin) => {
          const isSelected = selectedPin.id === pin.id;
          return (
            <TouchableOpacity
              key={pin.id}
              activeOpacity={0.88}
              onPress={() => setSelectedPin(pin)}
              style={[
                styles.mapPin,
                {
                  top: `${pin.yPct}%`,
                  left: `${pin.xPct}%`,
                  transform: [{ scale: isSelected ? 1.25 : 1 }],
                },
              ]}
            >
              <View
                style={[
                  styles.pinCallout,
                  pin.isRescue && styles.pinCalloutRescue,
                  isSelected && styles.pinCalloutSelected,
                ]}
              >
                <Ionicons
                  name={pin.isRescue ? 'flash' : 'leaf'}
                  size={scaleSize(12)}
                  color={pin.isRescue ? '#FFFFFF' : '#FFFFFF'}
                />
                <Text style={styles.pinCropText}>{pin.crop}</Text>
              </View>
              <View
                style={[
                  styles.pinArrow,
                  pin.isRescue && { borderTopColor: Palette.rescueRed },
                  isSelected && { borderTopColor: Palette.primaryDark },
                ]}
              />
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Selected Farm Callout Card */}
      <View
        style={[
          styles.bottomCard,
          {
            marginHorizontal: scaleSize(contentPadding),
            padding: scaleSize(Spacing.md),
            borderRadius: BorderRadius.xl,
            ...Shadows.elevated,
          },
        ]}
      >
        <View style={styles.bottomCardTop}>
          <Image
            source={{ uri: activeListing.images[0] || 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&q=80' }}
            style={[
              styles.calloutImg,
              {
                width: scaleSize(68),
                height: scaleSize(68),
                borderRadius: BorderRadius.md,
              },
            ]}
          />

          <View style={{ flex: 1, marginLeft: 10 }}>
            <View style={styles.badgeRow}>
              {activeListing.isRescueCrop ? (
                <Badge label="RESCUE DEAL" variant="rescue" size="sm" />
              ) : (
                <Badge label="AI FAIR PRICE" variant="aiFair" size="sm" />
              )}
              <Text style={styles.distanceTag}>{selectedPin.distanceKm} km away</Text>
            </View>

            <Text style={[styles.calloutTitle, { fontSize: scaleFont(15) }]}>
              {activeListing.cropName}
            </Text>
            <Text style={[styles.calloutFarmer, { fontSize: scaleFont(12) }]}>
              {activeListing.farmerName} • {activeListing.location.district}
            </Text>

            <Text style={[styles.calloutPrice, { fontSize: scaleFont(17) }]}>
              Rs. {activeListing.askingPricePerKg}
              <Text style={{ fontSize: scaleFont(11), color: Palette.slateMedium }}> / kg</Text>
            </Text>
          </View>
        </View>

        <View style={styles.calloutActions}>
          <Button
            title="View Details & Negotiate"
            size="md"
            variant={activeListing.isRescueCrop ? 'rescue' : 'primary'}
            icon="arrow-forward"
            iconPosition="right"
            fullWidth
            onPress={() =>
              router.push({
                pathname: '/crop/[id]',
                params: { id: activeListing.id },
              })
            }
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#EAE6DC',
  },
  topControlCard: {
    position: 'absolute',
    top: 14,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: Palette.warmBorder,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Palette.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapHeaderTitle: {
    fontWeight: '800',
    color: Palette.charcoal,
  },
  mapHeaderSub: {
    color: Palette.slateMedium,
  },
  radiusRow: {
    flexDirection: 'row',
    gap: 6,
  },
  radiusChip: {
    backgroundColor: Palette.surfaceAlt,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: Palette.warmBorder,
  },
  radiusChipActive: {
    backgroundColor: Palette.primary,
    borderColor: Palette.primary,
  },
  radiusText: {
    fontWeight: '600',
    color: Palette.charcoal,
  },
  radiusTextActive: {
    color: '#FFFFFF',
  },
  mapCanvas: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#F0ECE1',
  },
  islandSilhoutte: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  islandWatermark: {
    fontSize: 14,
    fontWeight: '900',
    color: 'rgba(36, 92, 70, 0.12)',
    letterSpacing: 2,
    position: 'absolute',
    top: 90,
  },
  watermarkCentroid: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  hubTag: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: BorderRadius.xs,
    borderWidth: 1,
    borderColor: Palette.warmBorder,
  },
  hubText: {
    fontSize: 10,
    fontWeight: '700',
    color: Palette.charcoal,
  },
  mapPin: {
    position: 'absolute',
    alignItems: 'center',
    zIndex: 5,
  },
  pinCallout: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Palette.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
  },
  pinCalloutRescue: {
    backgroundColor: Palette.rescueRed,
  },
  pinCalloutSelected: {
    backgroundColor: Palette.primaryDark,
    borderWidth: 2,
    borderColor: Palette.accent,
  },
  pinCropText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '800',
  },
  pinArrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderTopWidth: 6,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: Palette.primary,
    alignSelf: 'center',
  },
  bottomCard: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: Palette.warmBorder,
  },
  bottomCardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  calloutImg: {
    backgroundColor: Palette.slateBorder,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  distanceTag: {
    fontSize: 11,
    color: Palette.slateMedium,
    fontWeight: '600',
  },
  calloutTitle: {
    fontWeight: '800',
    color: Palette.charcoal,
  },
  calloutFarmer: {
    color: Palette.slateMedium,
    marginBottom: 2,
  },
  calloutPrice: {
    fontWeight: '900',
    color: Palette.primary,
  },
  calloutActions: {
    borderTopWidth: 1,
    borderTopColor: Palette.subtleBorder,
    paddingTop: 10,
  },
});

export default MapViewScreen;
