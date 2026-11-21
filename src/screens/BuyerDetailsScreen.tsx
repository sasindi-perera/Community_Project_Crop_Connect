import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Palette, Spacing, BorderRadius, Shadows } from '../constants/theme';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { useResponsive } from '../hooks/useResponsive';
import { MOCK_NEARBY_BUYERS } from '../services/mockDataService';

export const BuyerDetailsScreen: React.FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { scaleSize, scaleFont, contentPadding } = useResponsive();

  const buyer =
    MOCK_NEARBY_BUYERS.find((b) => b.id === id) || MOCK_NEARBY_BUYERS[0];

  return (
    <View style={styles.screen}>
      {/* Top Header */}
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
            styles.backBtn,
            {
              width: scaleSize(38),
              height: scaleSize(38),
              borderRadius: scaleSize(19),
            },
          ]}
        >
          <Ionicons name="arrow-back" size={scaleSize(20)} color={Palette.charcoal} />
        </TouchableOpacity>

        <Text style={[styles.topTitle, { fontSize: scaleFont(16) }]}>
          Buyer Profile & Requirements
        </Text>

        <View style={{ width: 38 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: scaleSize(contentPadding),
          paddingVertical: scaleSize(Spacing.base),
          paddingBottom: scaleSize(100),
        }}
      >
        {/* Buyer Business Card */}
        <View
          style={[
            styles.businessCard,
            {
              padding: scaleSize(Spacing.lg),
              borderRadius: BorderRadius.xl,
              ...Shadows.soft,
            },
          ]}
        >
          <View style={styles.cardHeader}>
            <View
              style={[
                styles.companyBubble,
                {
                  width: scaleSize(56),
                  height: scaleSize(56),
                  borderRadius: scaleSize(28),
                },
              ]}
            >
              <Ionicons name="business" size={scaleSize(28)} color={Palette.primary} />
            </View>

            <View style={{ flex: 1, marginLeft: 12 }}>
              <View style={styles.nameRow}>
                <Text style={[styles.companyName, { fontSize: scaleFont(18) }]}>
                  {buyer.companyName}
                </Text>
              </View>
              <Text style={[styles.repName, { fontSize: scaleFont(13) }]}>
                Representative: {buyer.name}
              </Text>
              <View style={styles.badgeRow}>
                <Badge label="Verified Buyer" variant="verified" size="sm" />
                <Badge label={buyer.type} variant="category" size="sm" />
              </View>
            </View>
          </View>

          <View style={styles.metricsBar}>
            <View style={styles.metricCol}>
              <Text style={[styles.metricVal, { fontSize: scaleFont(16) }]}>★ {buyer.rating}</Text>
              <Text style={[styles.metricLbl, { fontSize: scaleFont(11) }]}>Payment Rating</Text>
            </View>
            <View style={styles.metricDiv} />
            <View style={styles.metricCol}>
              <Text style={[styles.metricVal, { fontSize: scaleFont(16) }]}>{buyer.distanceKm} km</Text>
              <Text style={[styles.metricLbl, { fontSize: scaleFont(11) }]}>Distance</Text>
            </View>
            <View style={styles.metricDiv} />
            <View style={styles.metricCol}>
              <Text style={[styles.metricVal, { fontSize: scaleFont(16), color: Palette.primary }]}>Same-Day</Text>
              <Text style={[styles.metricLbl, { fontSize: scaleFont(11) }]}>Farm Pickup</Text>
            </View>
          </View>
        </View>

        {/* Current Sourcing Requirement */}
        <View
          style={[
            styles.demandCard,
            {
              padding: scaleSize(Spacing.md),
              borderRadius: BorderRadius.lg,
              marginVertical: scaleSize(12),
            },
          ]}
        >
          <View style={styles.demandHeader}>
            <Ionicons name="cart" size={scaleSize(18)} color={Palette.primary} />
            <Text style={[styles.demandTitle, { fontSize: scaleFont(14) }]}>
              Active Sourcing Order
            </Text>
          </View>

          <Text style={[styles.cropTarget, { fontSize: scaleFont(17) }]}>
            {buyer.lookingFor}
          </Text>

          <View style={styles.quotaRow}>
            <View style={styles.quotaItem}>
              <Text style={styles.quotaLbl}>Required Quantity:</Text>
              <Text style={styles.quotaVal}>{buyer.targetQuantityKg.toLocaleString()} kg</Text>
            </View>
            <View style={styles.quotaItem}>
              <Text style={styles.quotaLbl}>Maximum Budget:</Text>
              <Text style={[styles.quotaVal, { color: Palette.primary }]}>Rs. {buyer.maxBudgetPerKg} / kg</Text>
            </View>
          </View>
        </View>

        {/* Commercial & Transport Terms */}
        <View
          style={[
            styles.termsCard,
            {
              padding: scaleSize(Spacing.md),
              borderRadius: BorderRadius.lg,
              marginBottom: scaleSize(12),
              ...Shadows.soft,
            },
          ]}
        >
          <Text style={[styles.termsTitle, { fontSize: scaleFont(14) }]}>
            Trading & Logistics Terms
          </Text>

          <View style={styles.termItem}>
            <Ionicons name="car-outline" size={scaleSize(16)} color={Palette.primary} />
            <Text style={[styles.termText, { fontSize: scaleFont(12) }]}>
              Transport: Buyer provides 5-ton enclosed canter lorry for farm-gate pickup.
            </Text>
          </View>

          <View style={styles.termItem}>
            <Ionicons name="cash-outline" size={scaleSize(16)} color={Palette.primary} />
            <Text style={[styles.termText, { fontSize: scaleFont(12) }]}>
              Payment: Direct LankaPay bank transfer or cash upon loading at farm.
            </Text>
          </View>

          <View style={styles.termItem}>
            <Ionicons name="time-outline" size={scaleSize(16)} color={Palette.primary} />
            <Text style={[styles.termText, { fontSize: scaleFont(12) }]}>
              Crop Rescue: Ready to collect emergency surplus produce within 6 hours.
            </Text>
          </View>
        </View>

        {/* Past Farmer Reviews */}
        <View
          style={[
            styles.reviewsCard,
            {
              padding: scaleSize(Spacing.md),
              borderRadius: BorderRadius.lg,
              ...Shadows.soft,
            },
          ]}
        >
          <Text style={[styles.reviewsTitle, { fontSize: scaleFont(14) }]}>
            Verified Farmer Endorsements (Sri Lanka)
          </Text>

          <View style={styles.reviewItem}>
            <Text style={styles.reviewerName}>Bandara H. (Welimada Leeks Grower):</Text>
            <Text style={styles.reviewBody}>
              &ldquo;Prompt pickup with their own crates. Agreed on Rs. 210/kg as suggested by CropConnect AI and paid immediately on site.&rdquo;
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action */}
      <View
        style={[
          styles.bottomBar,
          {
            paddingHorizontal: scaleSize(contentPadding),
            paddingVertical: scaleSize(12),
          },
        ]}
      >
        <Button
          title={`Call ${buyer.name} (${buyer.phone})`}
          variant="primary"
          size="lg"
          icon="call-outline"
          fullWidth
          onPress={() => alert(`Calling ${buyer.name} on ${buyer.phone}...`)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Palette.background,
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
  backBtn: {
    backgroundColor: Palette.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topTitle: {
    fontWeight: '800',
    color: Palette.charcoal,
  },
  businessCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: Palette.warmBorder,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  companyBubble: {
    backgroundColor: Palette.primaryTint,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: Palette.primary,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  companyName: {
    fontWeight: '900',
    color: Palette.charcoal,
  },
  repName: {
    color: Palette.slateMedium,
    marginTop: 2,
    marginBottom: 4,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 6,
  },
  metricsBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: Palette.subtleBorder,
    paddingTop: 12,
    marginTop: 14,
  },
  metricCol: {
    alignItems: 'center',
  },
  metricVal: {
    fontWeight: '900',
    color: Palette.charcoal,
  },
  metricLbl: {
    color: Palette.slateMedium,
    marginTop: 2,
  },
  metricDiv: {
    width: 1,
    height: 22,
    backgroundColor: Palette.subtleBorder,
  },
  demandCard: {
    backgroundColor: Palette.primaryTint,
    borderWidth: 1,
    borderColor: 'rgba(36, 92, 70, 0.25)',
  },
  demandHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  demandTitle: {
    fontWeight: '800',
    color: Palette.primary,
  },
  cropTarget: {
    fontWeight: '900',
    color: Palette.charcoal,
    marginBottom: 8,
  },
  quotaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quotaItem: {},
  quotaLbl: {
    fontSize: 11,
    color: Palette.slateMedium,
    fontWeight: '500',
  },
  quotaVal: {
    fontSize: 14,
    fontWeight: '800',
    color: Palette.charcoal,
    marginTop: 2,
  },
  termsCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: Palette.warmBorder,
    gap: 8,
  },
  termsTitle: {
    fontWeight: '800',
    color: Palette.charcoal,
    marginBottom: 4,
  },
  termItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  termText: {
    color: Palette.slateDark,
    flex: 1,
    lineHeight: 18,
  },
  reviewsCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: Palette.warmBorder,
  },
  reviewsTitle: {
    fontWeight: '800',
    color: Palette.charcoal,
    marginBottom: 8,
  },
  reviewItem: {
    backgroundColor: Palette.surfaceAlt,
    padding: 10,
    borderRadius: BorderRadius.md,
  },
  reviewerName: {
    fontWeight: '700',
    fontSize: 12,
    color: Palette.primaryDark,
    marginBottom: 2,
  },
  reviewBody: {
    fontSize: 12,
    color: Palette.slateDark,
    lineHeight: 17,
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

export default BuyerDetailsScreen;
