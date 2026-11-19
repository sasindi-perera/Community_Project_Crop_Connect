import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Palette, Spacing, BorderRadius, Shadows } from '../constants/theme';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { useResponsive } from '../hooks/useResponsive';
import { useTheme } from '../hooks/useTheme';
import { INITIAL_MOCK_LISTINGS } from '../services/mockDataService';
import { formatDistance } from '../services/locationService';

export const ListingDetailScreen: React.FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { scaleSize, scaleFont, contentPadding } = useResponsive();
  const { isDark } = useTheme();

  const listing = INITIAL_MOCK_LISTINGS.find((l) => l.id === id) || INITIAL_MOCK_LISTINGS[0];
  const isRescue = listing.isRescueCrop;

  return (
    <View style={[styles.screen, { backgroundColor: isDark ? '#121815' : Palette.warmCream }]}>
      {/* Top Header Bar */}
      <View
        style={[
          styles.topBar,
          {
            paddingHorizontal: scaleSize(contentPadding),
            borderBottomColor: isDark ? '#223028' : Palette.warmBorder,
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={[
            styles.backBtn,
            {
              backgroundColor: isDark ? '#1F2A23' : Palette.white,
              borderColor: isDark ? '#2E4035' : Palette.warmBorder,
            },
          ]}
        >
          <Ionicons name="arrow-back" size={scaleSize(20)} color={isDark ? Palette.white : Palette.charcoal} />
        </TouchableOpacity>

        <Text
          style={[
            styles.topBarTitle,
            { fontSize: scaleFont(16), color: isDark ? Palette.white : Palette.charcoal },
          ]}
        >
          {listing.cropName} Details
        </Text>

        <TouchableOpacity
          style={[
            styles.backBtn,
            {
              backgroundColor: isDark ? '#1F2A23' : Palette.white,
              borderColor: isDark ? '#2E4035' : Palette.warmBorder,
            },
          ]}
        >
          <Ionicons name="share-social-outline" size={scaleSize(18)} color={isDark ? Palette.white : Palette.charcoal} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 110 }}>
        {/* Crop Hero Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: listing.images[0] || 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=500&q=80' }}
            style={{ width: '100%', height: scaleSize(220) }}
            resizeMode="cover"
          />

          <View style={styles.imageOverlayBadges}>
            {isRescue ? (
              <Badge
                label={`RESCUE - ${listing.rescueDiscountPercentage}% OFF`}
                variant="rescue"
                size="md"
              />
            ) : (
              <Badge label="AI FAIR PRICE VERIFIED" variant="aiFair" size="md" />
            )}
            <Badge label={`Grade ${listing.grade}`} variant="grade" size="md" />
          </View>
        </View>

        {/* Content Body */}
        <View style={{ paddingHorizontal: scaleSize(contentPadding), paddingTop: scaleSize(14) }}>
          {/* Title & Price Header */}
          <View style={styles.titleRow}>
            <View style={{ flex: 1 }}>
              <Text
                style={[
                  styles.cropName,
                  { fontSize: scaleFont(22), color: isDark ? Palette.white : Palette.charcoal },
                ]}
              >
                {listing.cropName}
              </Text>
              {listing.sinhalaName && (
                <Text
                  style={[
                    styles.localName,
                    { fontSize: scaleFont(14), color: isDark ? '#94A3B8' : Palette.slateMedium },
                  ]}
                >
                  {listing.sinhalaName} • {listing.tamilName}
                </Text>
              )}
            </View>

            <View style={styles.priceCol}>
              <Text style={[styles.priceTag, { fontSize: scaleFont(24), color: isRescue ? Palette.rescueRed : Palette.forestGreen }]}>
                Rs. {listing.askingPricePerKg}
              </Text>
              <Text style={[styles.priceSub, { fontSize: scaleFont(11) }]}>per kg</Text>
            </View>
          </View>

          {/* Rescue Urgency Banner */}
          {isRescue && (
            <View
              style={[
                styles.rescueAlertBox,
                {
                  backgroundColor: isDark ? '#3D1C1C' : '#FFF1F2',
                  borderColor: isDark ? '#5C2828' : '#FECDD3',
                  padding: scaleSize(12),
                  borderRadius: BorderRadius.md,
                },
              ]}
            >
              <Ionicons name="time" size={scaleSize(20)} color={Palette.rescueRed} />
              <View style={{ flex: 1, marginLeft: 8 }}>
                <Text style={[styles.rescueAlertTitle, { fontSize: scaleFont(13) }]}>
                  {listing.hoursRemaining} Hours Remaining Until Spoilage
                </Text>
                <Text style={[styles.rescueAlertDesc, { fontSize: scaleFont(11) }]}>
                  Urgent farm-gate clearance price offered to avoid harvest waste.
                </Text>
              </View>
            </View>
          )}

          {/* Key Harvest Metrics */}
          <View
            style={[
              styles.metricsCard,
              {
                backgroundColor: isDark ? '#1C2721' : Palette.white,
                borderColor: isDark ? '#2E4035' : Palette.warmBorder,
                padding: scaleSize(14),
                borderRadius: BorderRadius.lg,
                ...(isDark ? {} : Shadows.soft),
              },
            ]}
          >
            <View style={styles.metricItem}>
              <Text style={[styles.metricLabel, { fontSize: scaleFont(11) }]}>Total Quantity</Text>
              <Text style={[styles.metricVal, { fontSize: scaleFont(16) }]}>
                {listing.quantityKg.toLocaleString()} kg
              </Text>
            </View>
            <View style={styles.metricDivider} />
            <View style={styles.metricItem}>
              <Text style={[styles.metricLabel, { fontSize: scaleFont(11) }]}>Minimum Order</Text>
              <Text style={[styles.metricVal, { fontSize: scaleFont(16) }]}>
                {listing.minOrderKg} kg
              </Text>
            </View>
            <View style={styles.metricDivider} />
            <View style={styles.metricItem}>
              <Text style={[styles.metricLabel, { fontSize: scaleFont(11) }]}>Harvest Date</Text>
              <Text style={[styles.metricVal, { fontSize: scaleFont(14) }]}>
                {listing.harvestDate}
              </Text>
            </View>
          </View>

          {/* Farmer & Location Info */}
          <View
            style={[
              styles.farmerCard,
              {
                backgroundColor: isDark ? '#1C2721' : Palette.white,
                borderColor: isDark ? '#2E4035' : Palette.warmBorder,
                padding: scaleSize(14),
                borderRadius: BorderRadius.lg,
                marginVertical: scaleSize(12),
                ...(isDark ? {} : Shadows.soft),
              },
            ]}
          >
            <View style={styles.farmerHeader}>
              <Ionicons name="person-circle" size={scaleSize(36)} color={Palette.forestGreen} />
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text
                  style={[
                    styles.farmerNameText,
                    { fontSize: scaleFont(15), color: isDark ? Palette.white : Palette.charcoal },
                  ]}
                >
                  {listing.farmerName}
                </Text>
                <Text style={[styles.farmerSubText, { fontSize: scaleFont(12) }]}>
                  ★ {listing.farmerRating} Rating • Verified Agrarian Farmer
                </Text>
              </View>
            </View>

            <View style={styles.farmerLocationRow}>
              <Ionicons name="location" size={scaleSize(16)} color={Palette.forestGreen} />
              <Text
                style={[
                  styles.farmerLocationText,
                  { fontSize: scaleFont(12), color: isDark ? '#CBD5E1' : Palette.slateDark },
                ]}
              >
                {listing.location.address} ({formatDistance(listing.distanceKm)})
              </Text>
            </View>
          </View>

          {/* AI Fair Price Validation Card */}
          <View
            style={[
              styles.aiValidationCard,
              {
                backgroundColor: isDark ? '#1A2E22' : Palette.paleGreen,
                borderColor: isDark ? '#2A4D38' : Palette.sageGreen,
                padding: scaleSize(14),
                borderRadius: BorderRadius.lg,
              },
            ]}
          >
            <View style={styles.aiValTop}>
              <Ionicons name="sparkles" size={scaleSize(18)} color={Palette.forestGreen} />
              <Text style={[styles.aiValTitle, { fontSize: scaleFont(13) }]}>
                AI Fair-Price Verification
              </Text>
            </View>
            <Text style={[styles.aiValDesc, { fontSize: scaleFont(12) }]}>
              The asking price of Rs. {listing.askingPricePerKg}/kg is within the optimal wholesale bracket (Rs. {listing.aiSuggestedPrice?.minPricePerKg || 260} - Rs. {listing.aiSuggestedPrice?.maxPricePerKg || 310}/kg) evaluated by the CropConnect price model.
            </Text>
          </View>

          {/* Description */}
          <View style={{ marginTop: scaleSize(12) }}>
            <Text
              style={[
                styles.descHeader,
                { fontSize: scaleFont(14), color: isDark ? Palette.white : Palette.charcoal },
              ]}
            >
              Produce Details
            </Text>
            <Text
              style={[
                styles.descBody,
                { fontSize: scaleFont(13), color: isDark ? '#CBD5E1' : Palette.slateDark },
              ]}
            >
              {listing.description}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Fixed Bottom Action Bar */}
      <View
        style={[
          styles.bottomBar,
          {
            backgroundColor: isDark ? '#1A231E' : Palette.white,
            borderTopColor: isDark ? '#2E3F35' : Palette.warmBorder,
            paddingHorizontal: scaleSize(contentPadding),
            paddingVertical: scaleSize(12),
          },
        ]}
      >
        <Button
          title={isRescue ? 'Rescue Produce Now' : 'Make Direct Offer'}
          variant={isRescue ? 'rescue' : 'primary'}
          size="lg"
          icon={isRescue ? 'flash' : 'chatbubble-ellipses-outline'}
          fullWidth
          onPress={() => {
            alert(`Opening negotiation channel with ${listing.farmerName}!`);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  topBarTitle: {
    fontWeight: '700',
  },
  imageContainer: {
    position: 'relative',
  },
  imageOverlayBadges: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    flexDirection: 'row',
    gap: 8,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  cropName: {
    fontWeight: '800',
  },
  localName: {
    marginTop: 2,
    fontWeight: '500',
  },
  priceCol: {
    alignItems: 'flex-end',
  },
  priceTag: {
    fontWeight: '900',
  },
  priceSub: {
    color: Palette.slateMedium,
    fontWeight: '600',
  },
  rescueAlertBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    marginVertical: 8,
  },
  rescueAlertTitle: {
    fontWeight: '800',
    color: Palette.rescueRed,
  },
  rescueAlertDesc: {
    color: Palette.slateDark,
    marginTop: 2,
  },
  metricsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderWidth: 1,
    marginVertical: 8,
  },
  metricItem: {
    alignItems: 'center',
  },
  metricLabel: {
    color: Palette.slateMedium,
    fontWeight: '600',
    marginBottom: 2,
  },
  metricVal: {
    fontWeight: '800',
  },
  metricDivider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.08)',
  },
  farmerCard: {
    borderWidth: 1,
  },
  farmerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  farmerNameText: {
    fontWeight: '700',
  },
  farmerSubText: {
    color: Palette.slateMedium,
    marginTop: 2,
  },
  farmerLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.06)',
  },
  farmerLocationText: {
    fontWeight: '500',
  },
  aiValidationCard: {
    borderWidth: 1,
  },
  aiValTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  aiValTitle: {
    fontWeight: '800',
    color: Palette.forestGreen,
  },
  aiValDesc: {
    color: Palette.slateDark,
    lineHeight: 18,
  },
  descHeader: {
    fontWeight: '700',
    marginBottom: 4,
  },
  descBody: {
    lineHeight: 20,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
  },
});

export default ListingDetailScreen;
