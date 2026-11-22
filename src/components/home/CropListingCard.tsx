import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CropListing } from '../../types/listing';
import { Palette, BorderRadius, Spacing, Shadows } from '../../constants/theme';
import { Badge } from '../common/Badge';
import { useResponsive } from '../../hooks/useResponsive';
import { useTheme } from '../../hooks/useTheme';
import { formatDistance } from '../../services/locationService';

interface CropListingCardProps {
  listing: CropListing;
  onPress: () => void;
  onRescuePress?: () => void;
}

export const CropListingCard: React.FC<CropListingCardProps> = ({
  listing,
  onPress,
  onRescuePress,
}) => {
  const { scaleSize, scaleFont } = useResponsive();
  const { isDark } = useTheme();

  const isRescue = listing.isRescueCrop;

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={[
        styles.card,
        {
          backgroundColor: isDark ? '#1C2621' : Palette.white,
          borderColor: isRescue
            ? isDark ? '#5C2222' : '#FCA5A5'
            : isDark ? '#2D3D34' : Palette.warmBorder,
          borderRadius: BorderRadius.lg,
          padding: scaleSize(Spacing.md),
          marginHorizontal: scaleSize(Spacing.base),
          marginBottom: scaleSize(Spacing.md),
          ...(isDark ? {} : Shadows.soft),
        },
      ]}
    >
      <View style={styles.topRow}>
        <View style={styles.badgeRow}>
          {isRescue ? (
            <Badge
              label={`RESCUE - ${listing.rescueDiscountPercentage}% OFF`}
              variant="rescue"
              size="sm"
            />
          ) : (
            <Badge label="AI FAIR PRICE" variant="aiFair" size="sm" />
          )}
          <Badge label={`Grade ${listing.grade}`} variant="grade" size="sm" />
        </View>

        <View style={styles.distanceRow}>
          <Ionicons name="location-outline" size={scaleSize(13)} color={Palette.slateMedium} />
          <Text
            style={[
              styles.distanceText,
              {
                fontSize: scaleFont(11),
                color: isDark ? '#94A3B8' : Palette.slateMedium,
              },
            ]}
          >
            {formatDistance(listing.distanceKm)}
          </Text>
        </View>
      </View>

      <View style={styles.contentRow}>
        <Image
          source={{ uri: listing.images[0] || 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=500&q=80' }}
          style={[
            styles.image,
            {
              width: scaleSize(78),
              height: scaleSize(78),
              borderRadius: BorderRadius.md,
            },
          ]}
        />

        <View style={styles.infoCol}>
          <View style={styles.titleLine}>
            <Text
              style={[
                styles.cropTitle,
                {
                  fontSize: scaleFont(16),
                  color: isDark ? Palette.white : Palette.charcoal,
                },
              ]}
              numberOfLines={1}
            >
              {listing.cropName}
            </Text>
            {listing.sinhalaName && (
              <Text
                style={[
                  styles.sinhalaTag,
                  {
                    fontSize: scaleFont(12),
                    color: isDark ? '#94A3B8' : Palette.slateMedium,
                  },
                ]}
              >
                ({listing.sinhalaName})
              </Text>
            )}
          </View>

          <View style={styles.farmerLine}>
            <Ionicons name="person-circle-outline" size={scaleSize(14)} color={Palette.forestGreen} />
            <Text
              style={[
                styles.farmerName,
                {
                  fontSize: scaleFont(12),
                  color: isDark ? '#CBD5E1' : Palette.slateDark,
                },
              ]}
            >
              {listing.farmerName} • {listing.location.district}
            </Text>
          </View>

          <View style={styles.quantityLine}>
            <Text
              style={[
                styles.quantityText,
                {
                  fontSize: scaleFont(12),
                  color: isDark ? '#94A3B8' : Palette.slateMedium,
                },
              ]}
            >
              Available: <Text style={{ fontWeight: '700', color: isDark ? Palette.white : Palette.charcoal }}>{listing.quantityKg.toLocaleString()} kg</Text> (Min: {listing.minOrderKg} kg)
            </Text>
          </View>

          {isRescue && listing.hoursRemaining && (
            <View style={styles.urgencyLine}>
              <Ionicons name="time" size={scaleSize(12)} color={Palette.rescueRed} />
              <Text style={[styles.urgencyText, { fontSize: scaleFont(11) }]}>
                {listing.hoursRemaining} hours left before spoilage
              </Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.bottomRow}>
        <View style={styles.priceContainer}>
          <Text
            style={[
              styles.priceLabel,
              {
                fontSize: scaleFont(10),
                color: isDark ? '#94A3B8' : Palette.slateMedium,
              },
            ]}
          >
            ASKING PRICE
          </Text>
          <View style={styles.priceNumberRow}>
            <Text
              style={[
                styles.priceValue,
                {
                  fontSize: scaleFont(19),
                  color: isRescue ? Palette.rescueRed : isDark ? Palette.white : Palette.forestGreen,
                },
              ]}
            >
              Rs. {listing.askingPricePerKg}
            </Text>
            <Text
              style={[
                styles.priceUnit,
                {
                  fontSize: scaleFont(12),
                  color: isDark ? '#94A3B8' : Palette.slateMedium,
                },
              ]}
            >
              /kg
            </Text>

            {isRescue && listing.originalPricePerKg && (
              <Text
                style={[
                  styles.strikethroughPrice,
                  {
                    fontSize: scaleFont(13),
                  },
                ]}
              >
                Rs. {listing.originalPricePerKg}
              </Text>
            )}
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={isRescue ? onRescuePress || onPress : onPress}
          style={[
            styles.actionButton,
            {
              backgroundColor: isRescue ? Palette.rescueRed : Palette.forestGreen,
              paddingHorizontal: scaleSize(14),
              paddingVertical: scaleSize(8),
              borderRadius: BorderRadius.sm,
            },
          ]}
        >
          <Text style={[styles.actionButtonText, { fontSize: scaleFont(12) }]}>
            {isRescue ? 'Rescue Deal' : 'View & Offer'}
          </Text>
          <Ionicons
            name="chevron-forward"
            size={scaleSize(14)}
            color={Palette.white}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    overflow: 'hidden',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  distanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  distanceText: {
    fontWeight: '500',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  image: {
    backgroundColor: '#E2E8F0',
  },
  infoCol: {
    flex: 1,
    justifyContent: 'center',
  },
  titleLine: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2,
  },
  cropTitle: {
    fontWeight: '800',
    flexShrink: 1,
  },
  sinhalaTag: {
    fontWeight: '500',
  },
  farmerLine: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  farmerName: {
    fontWeight: '500',
  },
  quantityLine: {
    marginBottom: 2,
  },
  quantityText: {},
  urgencyLine: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  urgencyText: {
    color: Palette.rescueRed,
    fontWeight: '700',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.06)',
    paddingTop: 10,
    marginTop: 10,
  },
  priceContainer: {},
  priceLabel: {
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  priceNumberRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  priceValue: {
    fontWeight: '900',
  },
  priceUnit: {
    fontWeight: '500',
  },
  strikethroughPrice: {
    textDecorationLine: 'line-through',
    color: Palette.slateLight,
    marginLeft: 4,
    fontWeight: '600',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  actionButtonText: {
    color: Palette.white,
    fontWeight: '700',
  },
});

export default CropListingCard;
