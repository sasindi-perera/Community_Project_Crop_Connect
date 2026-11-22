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
import { useResponsive } from '../hooks/useResponsive';
import {
  MOCK_PRICE_HISTORY_CARROT,
  MOCK_PRICE_HISTORY_TOMATO,
  PriceHistoryPoint,
} from '../services/mockDataService';

export const PriceHistoryScreen: React.FC = () => {
  const { scaleSize, scaleFont, contentPadding } = useResponsive();
  const [selectedCrop, setSelectedCrop] = useState<'Carrot' | 'Tomato'>('Carrot');

  const history: PriceHistoryPoint[] =
    selectedCrop === 'Carrot'
      ? MOCK_PRICE_HISTORY_CARROT
      : MOCK_PRICE_HISTORY_TOMATO;

  const maxVal = Math.max(...history.map((h) => h.pettahRetailPrice));

  return (
    <View style={styles.screen}>
      <Header
        title="Price History & Trends"
        subtitle="HARTI & Dambulla Market Indices"
        onNotificationPress={() => router.push('/notifications')}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: scaleSize(contentPadding),
          paddingBottom: scaleSize(90),
          paddingTop: scaleSize(10),
        }}
      >
        {/* Crop Toggle */}
        <View style={styles.toggleRow}>
          {(['Carrot', 'Tomato'] as const).map((crop) => {
            const active = selectedCrop === crop;
            return (
              <TouchableOpacity
                key={crop}
                onPress={() => setSelectedCrop(crop)}
                style={[
                  styles.toggleBtn,
                  active && styles.toggleBtnActive,
                  { paddingVertical: scaleSize(8), borderRadius: BorderRadius.full },
                ]}
              >
                <Text
                  style={[
                    styles.toggleBtnText,
                    active && styles.toggleBtnTextActive,
                    { fontSize: scaleFont(13) },
                  ]}
                >
                  {crop === 'Carrot' ? 'Upcountry Carrot' : 'Field Tomato'}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* 30-Day Metrics Bar */}
        <View
          style={[
            styles.metricsCard,
            {
              padding: scaleSize(14),
              borderRadius: BorderRadius.lg,
              marginBottom: scaleSize(12),
              ...Shadows.soft,
            },
          ]}
        >
          <View style={styles.metricItem}>
            <Text style={[styles.metricLbl, { fontSize: scaleFont(11) }]}>30-Day Low</Text>
            <Text style={[styles.metricVal, { fontSize: scaleFont(16) }]}>
              Rs. {Math.min(...history.map((h) => h.farmerGatePrice))}
            </Text>
          </View>
          <View style={styles.metricSep} />
          <View style={styles.metricItem}>
            <Text style={[styles.metricLbl, { fontSize: scaleFont(11) }]}>30-Day High</Text>
            <Text style={[styles.metricVal, { fontSize: scaleFont(16), color: Palette.primary }]}>
              Rs. {Math.max(...history.map((h) => h.farmerGatePrice))}
            </Text>
          </View>
          <View style={styles.metricSep} />
          <View style={styles.metricItem}>
            <Text style={[styles.metricLbl, { fontSize: scaleFont(11) }]}>24h Trend</Text>
            <Text style={[styles.metricVal, { fontSize: scaleFont(16), color: Palette.leafGreen }]}>
              +3.2% ▲
            </Text>
          </View>
        </View>

        {/* Interactive Responsive Bar Chart Card */}
        <View
          style={[
            styles.chartCard,
            {
              padding: scaleSize(Spacing.md),
              borderRadius: BorderRadius.xl,
              marginBottom: scaleSize(14),
              ...Shadows.soft,
            },
          ]}
        >
          <View style={styles.chartHeader}>
            <Text style={[styles.chartTitle, { fontSize: scaleFont(15) }]}>
              6-Week Price Trajectory (LKR/kg)
            </Text>
            <Badge label="Wholesale vs Farm" variant="aiFair" size="sm" />
          </View>

          {/* Chart Legend */}
          <View style={styles.legendRow}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: Palette.primary }]} />
              <Text style={styles.legendText}>Farm-Gate</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: Palette.warning }]} />
              <Text style={styles.legendText}>Dambulla Wholesale</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: Palette.slateLight }]} />
              <Text style={styles.legendText}>Retail</Text>
            </View>
          </View>

          {/* Bars */}
          <View style={[styles.barsContainer, { height: scaleSize(160) }]}>
            {history.map((point, index) => {
              const farmHeight = (point.farmerGatePrice / maxVal) * 100;
              const dambullaHeight = (point.dambullaWholesalePrice / maxVal) * 100;

              return (
                <View key={index} style={styles.barCol}>
                  <View style={styles.barPair}>
                    {/* Dambulla wholesale bar */}
                    <View
                      style={[
                        styles.barItem,
                        {
                          height: `${dambullaHeight}%`,
                          backgroundColor: Palette.warning,
                        },
                      ]}
                    />
                    {/* Farmer price bar */}
                    <View
                      style={[
                        styles.barItem,
                        {
                          height: `${farmHeight}%`,
                          backgroundColor: Palette.primary,
                        },
                      ]}
                    />
                  </View>
                  <Text style={[styles.barLabel, { fontSize: scaleFont(10) }]}>
                    {point.label}
                  </Text>
                  <Text style={[styles.barPrice, { fontSize: scaleFont(10) }]}>
                    {point.farmerGatePrice}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Agrarian Insight Note */}
        <View
          style={[
            styles.insightCard,
            {
              padding: scaleSize(14),
              borderRadius: BorderRadius.lg,
            },
          ]}
        >
          <View style={styles.insightTop}>
            <Ionicons name="information-circle" size={scaleSize(18)} color={Palette.primary} />
            <Text style={[styles.insightTitle, { fontSize: scaleFont(13) }]}>
              Seasonal Market Analysis (HARTI Reference)
            </Text>
          </View>
          <Text style={[styles.insightDesc, { fontSize: scaleFont(12) }]}>
            High rainfall in the hill country (Nuwara Eliya & Badulla) has slowed down harvesting lorries, reducing wholesale inflows to Dambulla by 14%. Prices are expected to remain buoyant over the coming 10 days.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Palette.background,
  },
  toggleRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 10,
  },
  toggleBtn: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: Palette.warmBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleBtnActive: {
    backgroundColor: Palette.primary,
    borderColor: Palette.primary,
  },
  toggleBtnText: {
    color: Palette.charcoal,
    fontWeight: '600',
  },
  toggleBtnTextActive: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  metricsCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: Palette.warmBorder,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  metricItem: {
    alignItems: 'center',
  },
  metricLbl: {
    color: Palette.slateMedium,
    fontWeight: '600',
  },
  metricVal: {
    fontWeight: '900',
    color: Palette.charcoal,
    marginTop: 2,
  },
  metricSep: {
    width: 1,
    height: 24,
    backgroundColor: Palette.subtleBorder,
  },
  chartCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: Palette.warmBorder,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  chartTitle: {
    fontWeight: '800',
    color: Palette.charcoal,
  },
  legendRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 11,
    color: Palette.slateMedium,
    fontWeight: '500',
  },
  barsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: Palette.subtleBorder,
    paddingBottom: 6,
  },
  barCol: {
    alignItems: 'center',
    flex: 1,
  },
  barPair: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 3,
    height: '80%',
    width: 24,
    justifyContent: 'center',
  },
  barItem: {
    width: 8,
    borderRadius: 3,
  },
  barLabel: {
    color: Palette.slateMedium,
    marginTop: 4,
    fontWeight: '600',
  },
  barPrice: {
    color: Palette.charcoal,
    fontWeight: '700',
  },
  insightCard: {
    backgroundColor: Palette.primaryTint,
    borderWidth: 1,
    borderColor: 'rgba(36, 92, 70, 0.25)',
  },
  insightTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  insightTitle: {
    fontWeight: '800',
    color: Palette.primary,
  },
  insightDesc: {
    color: Palette.slateDark,
    lineHeight: 18,
  },
});

export default PriceHistoryScreen;
