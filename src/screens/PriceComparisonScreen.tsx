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
import { Button } from '../components/common/Button';
import { useResponsive } from '../hooks/useResponsive';

interface PriceTier {
  channel: string;
  location: string;
  pricePerKg: number;
  type: 'farm_gate' | 'ai_fair' | 'wholesale' | 'retail';
  description: string;
}

const COMPARISONS: Record<string, PriceTier[]> = {
  Carrot: [
    { channel: 'Farmer Farm-Gate Price', location: 'Nuwara Eliya Field', pricePerKg: 280, type: 'farm_gate', description: 'What the farmer asks directly' },
    { channel: 'CropConnect AI Fair Benchmark', location: 'National ML Regression', pricePerKg: 285, type: 'ai_fair', description: 'Scientifically balanced wholesale equilibrium' },
    { channel: 'Dambulla Dedicated Economic Centre', location: 'Matale Wholesale Hub', pricePerKg: 310, type: 'wholesale', description: 'Traditional intermediary wholesale broker auction' },
    { channel: 'Pettah Manning Wholesale Market', location: 'Colombo Central Market', pricePerKg: 325, type: 'wholesale', description: 'Transported terminal wholesale rate' },
    { channel: 'Colombo Supermarket Retail Shelf', location: 'Retail Supermarket Chain', pricePerKg: 420, type: 'retail', description: 'End consumer retail price (48% middleman spread)' },
  ],
  Tomato: [
    { channel: 'Farmer Farm-Gate Price', location: 'Dambulla Outskirts', pricePerKg: 175, type: 'farm_gate', description: 'Surplus clearance asking price' },
    { channel: 'CropConnect AI Fair Benchmark', location: 'National ML Regression', pricePerKg: 210, type: 'ai_fair', description: 'Fair baseline avoiding crop spoilage' },
    { channel: 'Dambulla Dedicated Economic Centre', location: 'Matale Wholesale Hub', pricePerKg: 245, type: 'wholesale', description: 'Broker auction rate' },
    { channel: 'Pettah Manning Wholesale Market', location: 'Colombo Central Market', pricePerKg: 280, type: 'wholesale', description: 'Terminal market wholesale' },
    { channel: 'Colombo Supermarket Retail Shelf', location: 'Retail Supermarket Chain', pricePerKg: 360, type: 'retail', description: 'Consumer retail price' },
  ],
};

export const PriceComparisonScreen: React.FC = () => {
  const { scaleSize, scaleFont, contentPadding } = useResponsive();
  const [selectedCrop, setSelectedCrop] = useState('Carrot');

  const tiers = COMPARISONS[selectedCrop] || COMPARISONS['Carrot'];
  const farmPrice = tiers[0].pricePerKg;
  const retailPrice = tiers[tiers.length - 1].pricePerKg;
  const middlemanMargin = retailPrice - farmPrice;

  return (
    <View style={styles.screen}>
      <Header
        title="Price Comparison Engine"
        subtitle="Farm Gate vs. Wholesale vs. Retail"
        onNotificationPress={() => router.push('/notifications')}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: scaleSize(contentPadding),
          paddingBottom: scaleSize(100),
          paddingTop: scaleSize(10),
        }}
      >
        {/* Crop Selector */}
        <View style={styles.cropSelectorRow}>
          {['Carrot', 'Tomato'].map((crop) => {
            const active = selectedCrop === crop;
            return (
              <TouchableOpacity
                key={crop}
                onPress={() => setSelectedCrop(crop)}
                style={[
                  styles.cropBtn,
                  active && styles.cropBtnActive,
                  { paddingVertical: scaleSize(8), borderRadius: BorderRadius.full },
                ]}
              >
                <Text
                  style={[
                    styles.cropBtnText,
                    active && styles.cropBtnTextActive,
                    { fontSize: scaleFont(13) },
                  ]}
                >
                  {crop} Comparison
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Spread Impact Card */}
        <View
          style={[
            styles.spreadCard,
            {
              padding: scaleSize(Spacing.md),
              borderRadius: BorderRadius.lg,
              marginBottom: scaleSize(14),
            },
          ]}
        >
          <View style={styles.spreadTop}>
            <Ionicons name="swap-vertical" size={scaleSize(20)} color={Palette.warning} />
            <Text style={[styles.spreadTitle, { fontSize: scaleFont(13) }]}>
              Middleman Price Margin: Rs. {middlemanMargin} / kg
            </Text>
          </View>
          <Text style={[styles.spreadBody, { fontSize: scaleFont(12) }]}>
            In traditional trade, intermediaries absorb {Math.round((middlemanMargin / retailPrice) * 100)}% of the total price. CropConnect cuts out the broker fee, passing savings directly to Sri Lankan farmers and buyers.
          </Text>
        </View>

        {/* Price Tiers Waterfall */}
        <View style={{ gap: scaleSize(10) }}>
          {tiers.map((tier, index) => {
            const isAIFair = tier.type === 'ai_fair';
            const isFarm = tier.type === 'farm_gate';
            const isRetail = tier.type === 'retail';

            return (
              <View
                key={index}
                style={[
                  styles.tierCard,
                  isAIFair && styles.tierCardAI,
                  {
                    padding: scaleSize(12),
                    borderRadius: BorderRadius.lg,
                    ...Shadows.soft,
                  },
                ]}
              >
                <View style={styles.tierTop}>
                  <View style={{ flex: 1 }}>
                    <View style={styles.channelBadgeRow}>
                      <Text
                        style={[
                          styles.channelName,
                          {
                            fontSize: scaleFont(14),
                            color: isAIFair ? Palette.primary : Palette.charcoal,
                          },
                        ]}
                      >
                        {tier.channel}
                      </Text>
                      {isAIFair && (
                        <Badge label="OPTIMAL FAIR" variant="aiFair" size="sm" />
                      )}
                      {isFarm && (
                        <Badge label="PRODUCER GATE" variant="category" size="sm" />
                      )}
                      {isRetail && (
                        <Badge label="RETAIL SHELF" variant="grade" size="sm" />
                      )}
                    </View>
                    <Text style={[styles.locationText, { fontSize: scaleFont(11) }]}>
                      📍 {tier.location}
                    </Text>
                  </View>

                  <Text
                    style={[
                      styles.priceValue,
                      {
                        fontSize: scaleFont(20),
                        color: isAIFair
                          ? Palette.primary
                          : isRetail
                          ? Palette.rescueRed
                          : Palette.charcoal,
                      },
                    ]}
                  >
                    Rs. {tier.pricePerKg}
                    <Text style={{ fontSize: scaleFont(11), color: Palette.slateMedium }}> /kg</Text>
                  </Text>
                </View>

                <Text style={[styles.tierDesc, { fontSize: scaleFont(11) }]}>
                  {tier.description}
                </Text>
              </View>
            );
          })}
        </View>

        <Button
          title="View Historical Price Trends"
          variant="secondary"
          size="lg"
          icon="calendar-outline"
          fullWidth
          onPress={() => router.push('/price-history')}
          style={{ marginTop: scaleSize(16) }}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Palette.background,
  },
  cropSelectorRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  cropBtn: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: Palette.warmBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cropBtnActive: {
    backgroundColor: Palette.primary,
    borderColor: Palette.primary,
  },
  cropBtnText: {
    color: Palette.charcoal,
    fontWeight: '600',
  },
  cropBtnTextActive: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  spreadCard: {
    backgroundColor: Palette.accentTint,
    borderWidth: 1,
    borderColor: 'rgba(244, 201, 93, 0.4)',
  },
  spreadTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  spreadTitle: {
    fontWeight: '800',
    color: Palette.charcoal,
  },
  spreadBody: {
    color: Palette.slateDark,
    lineHeight: 17,
  },
  tierCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: Palette.warmBorder,
  },
  tierCardAI: {
    backgroundColor: Palette.primaryTint,
    borderWidth: 1.5,
    borderColor: Palette.primary,
  },
  tierTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  channelBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 2,
  },
  channelName: {
    fontWeight: '800',
  },
  locationText: {
    color: Palette.slateMedium,
  },
  priceValue: {
    fontWeight: '900',
  },
  tierDesc: {
    color: Palette.slateMedium,
    lineHeight: 15,
  },
});

export default PriceComparisonScreen;
