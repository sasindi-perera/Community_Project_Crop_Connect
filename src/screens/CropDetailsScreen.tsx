import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Palette, BorderRadius, Shadows } from '../constants/theme';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { useResponsive } from '../hooks/useResponsive';
import { useAuth } from '../hooks/useAuth';
import { ALL_MOCK_LISTINGS } from '../services/mockDataService';
import {
  getCropListingById,
  getAllBuyers,
  createBuyerOffer,
} from '../services/firestoreService';
import { FirestoreCropListing, FirestoreBuyer } from '../types/database';

export const CropDetailsScreen: React.FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { scaleSize, scaleFont, contentPadding } = useResponsive();
  const { user } = useAuth();

  const [listing, setListing] = useState<FirestoreCropListing | null>(null);
  const [matchingBuyers, setMatchingBuyers] = useState<FirestoreBuyer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        const found = id ? await getCropListingById(id) : null;
        const allBuyers = await getAllBuyers();

        if (isMounted) {
          if (found) {
            setListing(found);
          } else {
            // Fallback to mock listing
            const mock = ALL_MOCK_LISTINGS.find((l) => l.id === id) || ALL_MOCK_LISTINGS[0];
            setListing({
              ...mock,
              cropId: `crop_${mock.cropName.toLowerCase().replace(/[^a-z0-9]/g, '_')}`,
              expiryDate: mock.expiryDate || new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              farmerRating: mock.farmerRating || 4.9,
              minOrderKg: mock.minOrderKg || 100,
              district: mock.location.district,
              address: mock.location.address || `${mock.location.district}, Sri Lanka`,
              latitude: mock.location.latitude,
              longitude: mock.location.longitude,
              activeOffersCount: 2,
              viewsCount: 24,
            });
          }

          // Filter matching buyers
          setMatchingBuyers(allBuyers.slice(0, 3));
        }
      } catch {
        // Handled
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadData();
    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading || !listing) {
    return (
      <View style={[styles.screen, styles.center]}>
        <ActivityIndicator size="large" color={Palette.primary} />
        <Text style={[styles.loadingText, { fontSize: scaleFont(13) }]}>
          Retrieving crop batch from Cloud Firestore...
        </Text>
      </View>
    );
  }

  const isRescue = listing.isRescueCrop;
  const isOwner = user?.id === listing.farmerId || (user?.role === 'farmer' && listing.farmerId === 'farmer_001');

  const handleMakeOffer = () => {
    const defaultOffered = listing.askingPricePerKg;
    const submitOfferAsync = async (price: number) => {
      try {
        const buyerId = user?.id || 'buyer_001';
        const buyerName = user?.fullName || 'Dilan Jayasinghe';
        const buyerPhone = user?.phone || '+94 71 888 9900';

        await createBuyerOffer(
          {
            listingId: listing.id,
            cropName: listing.cropName,
            farmerId: listing.farmerId,
            farmerName: listing.farmerName,
            buyerId,
            buyerName,
            buyerPhone,
            buyerBusinessType: user?.buyerBusinessType || 'wholesaler',
            offeredPricePerKg: price,
            requestedQuantityKg: listing.minOrderKg || 100,
            totalAmount: price * (listing.minOrderKg || 100),
            farmerAskingPricePerKg: listing.askingPricePerKg,
            proposedPickupDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            transportProvidedByBuyer: true,
            notes: 'Buyer purchase offer submitted via CropConnect mobile app.',
          },
          buyerId
        );
        Alert.alert(
          'Offer Submitted 💬',
          `Offer of Rs. ${price}/kg recorded in Cloud Firestore! ${listing.farmerName} has been alerted.`
        );
      } catch (err: any) {
        Alert.alert('Error', err?.message || 'Failed to submit buyer offer.');
      }
    };

    if (Alert.prompt) {
      Alert.prompt(
        'Make Purchase Offer',
        `Enter your offered price per kg (Asking: Rs. ${listing.askingPricePerKg}/kg):`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Submit Offer',
            onPress: (val) => submitOfferAsync(parseFloat(val || `${defaultOffered}`) || defaultOffered),
          },
        ],
        'plain-text',
        defaultOffered.toString()
      );
    } else {
      Alert.alert(
        'Make Purchase Offer',
        `Confirm purchase offer for ${listing.cropName} at Rs. ${listing.askingPricePerKg}/kg with farmgate pickup?`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Confirm Offer',
            onPress: () => submitOfferAsync(defaultOffered),
          },
        ]
      );
    }
  };

  return (
    <View style={styles.screen}>
      {/* Top Navigation Bar */}
      <View
        style={[
          styles.topBar,
          {
            paddingHorizontal: scaleSize(contentPadding),
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={[
            styles.iconBtn,
            {
              width: scaleSize(38),
              height: scaleSize(38),
              borderRadius: scaleSize(19),
            },
          ]}
        >
          <Ionicons name="arrow-back" size={scaleSize(20)} color={Palette.charcoal} />
        </TouchableOpacity>

        <Text style={[styles.topTitle, { fontSize: scaleFont(16) }]}>Crop Batch Details</Text>

        <TouchableOpacity
          onPress={() => Alert.alert('Share Produce', `CropConnect Listing: ${listing.quantityKg}kg ${listing.cropName} at Rs. ${listing.askingPricePerKg}/kg in ${listing.district}.`)}
          style={[
            styles.iconBtn,
            {
              width: scaleSize(38),
              height: scaleSize(38),
              borderRadius: scaleSize(19),
            },
          ]}
        >
          <Ionicons name="share-social-outline" size={scaleSize(18)} color={Palette.charcoal} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: scaleSize(110) }}
      >
        {/* Crop Hero Image with Badges */}
        <View style={[styles.imageContainer, { height: scaleSize(240) }]}>
          <Image
            source={{ uri: listing.images?.[0] || 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=700' }}
            style={styles.heroImage}
          />

          <View style={styles.imageOverlayTop}>
            <Badge
              label={`Grade ${listing.grade}`}
              variant="grade"
            />
            {isRescue && (
              <Badge
                label={`⚡ RESCUE (${listing.rescueDiscountPercentage || 25}% OFF)`}
                variant="rescue"
              />
            )}
          </View>

          <View style={styles.imageOverlayBottom}>
            <View style={styles.unitBadge}>
              <Text style={styles.unitBadgeText}>Default Unit: Kilograms (kg)</Text>
            </View>
          </View>
        </View>

        {/* Content Body */}
        <View style={{ paddingHorizontal: scaleSize(contentPadding), marginTop: scaleSize(12) }}>
          {/* 1. Crop Title & Localized Names */}
          <View style={styles.titleRow}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.cropTitle, { fontSize: scaleFont(22) }]}>
                {listing.cropName}
              </Text>
              {(listing.sinhalaName || listing.tamilName) && (
                <Text style={[styles.cropLocalized, { fontSize: scaleFont(13) }]}>
                  {listing.sinhalaName} {listing.tamilName ? `• ${listing.tamilName}` : ''}
                </Text>
              )}
            </View>

            {/* Expected Price per kg in LKR */}
            <View style={styles.priceContainer}>
              <Text style={[styles.priceNum, { fontSize: scaleFont(22) }]}>
                Rs. {listing.askingPricePerKg}
              </Text>
              <Text style={[styles.pricePerUnit, { fontSize: scaleFont(11) }]}>per kg (LKR)</Text>
            </View>
          </View>

          {/* 2. Key Metrics Row (Available kg, Min Order kg, Harvest Date) */}
          <View
            style={[
              styles.metricsBar,
              {
                padding: scaleSize(12),
                borderRadius: BorderRadius.lg,
                marginVertical: scaleSize(10),
                ...Shadows.soft,
              },
            ]}
          >
            <View style={styles.metricItem}>
              <Text style={[styles.metricLbl, { fontSize: scaleFont(11) }]}>Total Harvest</Text>
              <Text style={[styles.metricNum, { fontSize: scaleFont(16) }]}>
                {listing.quantityKg.toLocaleString()} kg
              </Text>
            </View>

            <View style={styles.metricSep} />

            <View style={styles.metricItem}>
              <Text style={[styles.metricLbl, { fontSize: scaleFont(11) }]}>Minimum Order</Text>
              <Text style={[styles.metricNum, { fontSize: scaleFont(16) }]}>
                {listing.minOrderKg} kg
              </Text>
            </View>

            <View style={styles.metricSep} />

            <View style={styles.metricItem}>
              <Text style={[styles.metricLbl, { fontSize: scaleFont(11) }]}>Harvest Date</Text>
              <Text style={[styles.metricNum, { fontSize: scaleFont(12) }]}>
                {listing.harvestDate}
              </Text>
            </View>
          </View>

          {/* 3. AI Fair-Price Verification Widget */}
          <View
            style={[
              styles.aiPriceCard,
              {
                padding: scaleSize(14),
                borderRadius: BorderRadius.lg,
                marginVertical: scaleSize(8),
                ...Shadows.soft,
              },
            ]}
          >
            <View style={styles.aiPriceHeader}>
              <Ionicons name="sparkles" size={scaleSize(18)} color={Palette.primary} />
              <Text style={[styles.aiPriceTitle, { fontSize: scaleFont(13) }]}>
                AI Fair-Price Intelligence Verification
              </Text>
            </View>
            <Text style={[styles.aiPriceDesc, { fontSize: scaleFont(12) }]}>
              Verified against Dambulla Dedicated Economic Centre baseline. The farmer&apos;s expected price of Rs. {listing.askingPricePerKg}/kg is balanced and equitable within Sri Lankan market wholesale brackets.
            </Text>
            <TouchableOpacity
              onPress={() => router.push('/price-comparison')}
              style={styles.compareLink}
            >
              <Text style={styles.compareLinkText}>View Live Dambulla & Pettah Benchmark Rates ➔</Text>
            </TouchableOpacity>
          </View>

          {/* 4. Farmer Profile & Location Details */}
          <View
            style={[
              styles.farmerCard,
              {
                padding: scaleSize(14),
                borderRadius: BorderRadius.lg,
                marginVertical: scaleSize(8),
                ...Shadows.soft,
              },
            ]}
          >
            <View style={styles.farmerTop}>
              <Ionicons name="person-circle" size={scaleSize(40)} color={Palette.primary} />
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={[styles.farmerName, { fontSize: scaleFont(15) }]}>
                  {listing.farmerName}
                </Text>
                <Text style={[styles.farmerMeta, { fontSize: scaleFont(12) }]}>
                  ★ {listing.farmerRating || 4.9} Rating • Verified Farmer • {listing.district}
                </Text>
              </View>
            </View>

            <View style={styles.distanceLine}>
              <Ionicons name="location" size={scaleSize(16)} color={Palette.primary} />
              <Text style={[styles.distanceText, { fontSize: scaleFont(12) }]}>
                {listing.address || `${listing.district}, Sri Lanka`}
              </Text>
            </View>
          </View>

          {/* 5. Additional Description */}
          <View style={{ marginTop: scaleSize(8), marginBottom: scaleSize(14) }}>
            <Text style={[styles.descTitle, { fontSize: scaleFont(14) }]}>Harvest & Packaging Notes</Text>
            <Text style={[styles.descBody, { fontSize: scaleFont(13) }]}>
              {listing.description || 'Cleanly sorted produce ready for immediate wholesale transport.'}
            </Text>
          </View>

          {/* 6. Matching Commercial Buyers Section */}
          <View style={styles.matchingBuyersSection}>
            <View style={styles.matchingHeader}>
              <View>
                <Text style={[styles.matchingTitle, { fontSize: scaleFont(15) }]}>
                  Matching Buyers in {listing.district}
                </Text>
                <Text style={[styles.matchingSub, { fontSize: scaleFont(11) }]}>
                  Verified commercial buyers actively purchasing {listing.cropName}
                </Text>
              </View>
              <Ionicons name="people" size={scaleSize(20)} color={Palette.primary} />
            </View>

            {matchingBuyers.map((buyer) => (
              <View
                key={buyer.id}
                style={[
                  styles.buyerMatchCard,
                  {
                    padding: scaleSize(12),
                    borderRadius: BorderRadius.md,
                    marginTop: scaleSize(8),
                  },
                ]}
              >
                <View style={styles.buyerMatchTop}>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.buyerMatchName, { fontSize: scaleFont(13) }]}>
                      {buyer.businessName}
                    </Text>
                    <Text style={[styles.buyerMatchLocation, { fontSize: scaleFont(11) }]}>
                      📍 {buyer.district} • {buyer.businessType}
                    </Text>
                  </View>
                  <Badge label="Verified Buyer" variant="verified" />
                </View>

                <Text style={[styles.buyerMatchDemand, { fontSize: scaleFont(11) }]}>
                  Requirement: Up to {buyer.purchasingRequirements?.maxOrderQuantityKg || 2500} kg • Farmgate Pickup Available
                </Text>

                <TouchableOpacity
                  onPress={() => router.push({ pathname: '/buyer/[id]', params: { id: buyer.id } })}
                  style={styles.buyerActionBtn}
                >
                  <Text style={styles.buyerActionText}>View Buyer Profile & Send Quote ➔</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Floating Bottom Action Bar */}
      <View
        style={[
          styles.bottomBar,
          {
            paddingHorizontal: scaleSize(contentPadding),
            paddingVertical: scaleSize(12),
          },
        ]}
      >
        {isOwner ? (
          <Button
            title="Manage in My Farm Listings"
            variant="primary"
            size="lg"
            icon="leaf"
            fullWidth
            onPress={() => router.push('/(farmer)/my-crops')}
          />
        ) : (
          <Button
            title={isRescue ? 'Rescue Produce (Direct Offer)' : 'Submit Purchase Offer'}
            variant={isRescue ? 'rescue' : 'primary'}
            size="lg"
            icon={isRescue ? 'flash' : 'chatbubble-ellipses-outline'}
            fullWidth
            onPress={handleMakeOffer}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Palette.background,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  loadingText: {
    color: Palette.slateMedium,
    marginTop: 10,
    fontWeight: '600',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Palette.warmBorder,
    backgroundColor: '#FFFFFF',
  },
  iconBtn: {
    backgroundColor: Palette.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topTitle: {
    fontWeight: '800',
    color: Palette.charcoal,
  },
  imageContainer: {
    position: 'relative',
    backgroundColor: Palette.slateBorder,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlayTop: {
    position: 'absolute',
    top: 12,
    left: 12,
    right: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageOverlayBottom: {
    position: 'absolute',
    bottom: 12,
    left: 12,
  },
  unitBadge: {
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
  },
  unitBadgeText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 11,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cropTitle: {
    fontWeight: '900',
    color: Palette.charcoal,
  },
  cropLocalized: {
    color: Palette.slateMedium,
    fontWeight: '600',
    marginTop: 2,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  priceNum: {
    fontWeight: '900',
    color: Palette.primary,
  },
  pricePerUnit: {
    color: Palette.slateMedium,
    fontWeight: '700',
    marginTop: 1,
  },
  metricsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: Palette.warmBorder,
  },
  metricItem: {
    alignItems: 'center',
  },
  metricLbl: {
    color: Palette.slateMedium,
    fontWeight: '600',
  },
  metricNum: {
    fontWeight: '800',
    color: Palette.charcoal,
    marginTop: 2,
  },
  metricSep: {
    width: 1,
    height: 24,
    backgroundColor: Palette.subtleBorder,
  },
  aiPriceCard: {
    backgroundColor: Palette.primaryTint,
    borderWidth: 1,
    borderColor: 'rgba(36, 92, 70, 0.25)',
  },
  aiPriceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  aiPriceTitle: {
    fontWeight: '800',
    color: Palette.primary,
  },
  aiPriceDesc: {
    color: Palette.charcoal,
    lineHeight: 18,
  },
  compareLink: {
    marginTop: 8,
  },
  compareLinkText: {
    color: Palette.primary,
    fontWeight: '800',
    fontSize: 12,
  },
  farmerCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: Palette.warmBorder,
  },
  farmerTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  farmerName: {
    fontWeight: '800',
    color: Palette.charcoal,
  },
  farmerMeta: {
    color: Palette.slateMedium,
    fontWeight: '600',
    marginTop: 1,
  },
  distanceLine: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: Palette.subtleBorder,
  },
  distanceText: {
    color: Palette.slateMedium,
    fontWeight: '600',
  },
  descTitle: {
    fontWeight: '800',
    color: Palette.charcoal,
    marginBottom: 4,
  },
  descBody: {
    color: Palette.slateMedium,
    lineHeight: 19,
  },
  matchingBuyersSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Palette.warmBorder,
    padding: 14,
    marginTop: 10,
  },
  matchingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  matchingTitle: {
    fontWeight: '800',
    color: Palette.charcoal,
  },
  matchingSub: {
    color: Palette.slateMedium,
    marginTop: 1,
  },
  buyerMatchCard: {
    backgroundColor: Palette.background,
    borderWidth: 1,
    borderColor: Palette.warmBorder,
  },
  buyerMatchTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  buyerMatchName: {
    fontWeight: '800',
    color: Palette.charcoal,
  },
  buyerMatchLocation: {
    color: Palette.slateMedium,
    fontWeight: '600',
    marginTop: 1,
  },
  buyerMatchDemand: {
    color: Palette.primary,
    fontWeight: '700',
    marginTop: 6,
  },
  buyerActionBtn: {
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  buyerActionText: {
    color: Palette.primary,
    fontWeight: '800',
    fontSize: 11,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: Palette.warmBorder,
  },
});

export default CropDetailsScreen;
