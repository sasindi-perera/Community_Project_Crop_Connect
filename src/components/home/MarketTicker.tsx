import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MarketTickerItem } from '../../types/ai';
import { Palette, BorderRadius, Spacing } from '../../constants/theme';
import { useResponsive } from '../../hooks/useResponsive';
import { useTheme } from '../../hooks/useTheme';

interface MarketTickerProps {
  items: MarketTickerItem[];
  onItemPress?: (item: MarketTickerItem) => void;
}

export const MarketTicker: React.FC<MarketTickerProps> = ({ items, onItemPress }) => {
  const { scaleSize, scaleFont } = useResponsive();
  const { isDark } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.liveIndicator}>
          <View style={styles.pulseDot} />
          <Text
            style={[
              styles.sectionTitle,
              {
                fontSize: scaleFont(13),
                color: isDark ? '#E2E8F0' : Palette.forestGreen,
              },
            ]}
          >
            LIVE SRI LANKA WHOLESALE TICKER (DAMBULLA & PETTAH)
          </Text>
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: scaleSize(Spacing.base),
          paddingVertical: scaleSize(4),
          gap: scaleSize(8),
        }}
      >
        {items.map((item, index) => {
          const isUp = item.trend === 'up';
          const isDown = item.trend === 'down';
          const trendColor = isUp ? Palette.leafGreen : isDown ? Palette.rescueRed : Palette.slateMedium;
          const trendBg = isUp ? Palette.paleGreen : isDown ? Palette.rescueLight : Palette.parchment;

          return (
            <TouchableOpacity
              key={`${item.cropName}-${index}`}
              activeOpacity={0.8}
              onPress={() => onItemPress?.(item)}
              style={[
                styles.tickerPill,
                {
                  backgroundColor: isDark ? '#1C2721' : Palette.white,
                  borderColor: isDark ? '#2D3D34' : Palette.warmBorder,
                  paddingHorizontal: scaleSize(12),
                  paddingVertical: scaleSize(8),
                },
              ]}
            >
              <View style={styles.cropTitleRow}>
                <Text
                  style={[
                    styles.cropName,
                    {
                      fontSize: scaleFont(13),
                      color: isDark ? Palette.white : Palette.charcoal,
                    },
                  ]}
                >
                  {item.cropName}
                </Text>
                <Text
                  style={[
                    styles.sinhalaName,
                    {
                      fontSize: scaleFont(11),
                      color: isDark ? '#94A3B8' : Palette.slateMedium,
                    },
                  ]}
                >
                  ({item.sinhalaName})
                </Text>
              </View>

              <View style={styles.priceRow}>
                <Text
                  style={[
                    styles.price,
                    {
                      fontSize: scaleFont(14),
                      color: isDark ? Palette.white : Palette.charcoal,
                    },
                  ]}
                >
                  Rs. {item.currentAvgLkr}
                  <Text style={{ fontSize: scaleFont(10), color: Palette.slateMedium }}>/kg</Text>
                </Text>

                <View
                  style={[
                    styles.trendBadge,
                    {
                      backgroundColor: trendBg,
                      paddingHorizontal: scaleSize(5),
                      paddingVertical: scaleSize(2),
                    },
                  ]}
                >
                  <Ionicons
                    name={isUp ? 'caret-up' : isDown ? 'caret-down' : 'remove'}
                    size={scaleSize(10)}
                    color={trendColor}
                  />
                  <Text
                    style={[
                      styles.trendText,
                      {
                        fontSize: scaleFont(10),
                        color: trendColor,
                      },
                    ]}
                  >
                    {Math.abs(item.change24h)}%
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 6,
  },
  headerRow: {
    paddingHorizontal: 16,
    marginBottom: 6,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Palette.rescueRed,
  },
  sectionTitle: {
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  tickerPill: {
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    minWidth: 140,
  },
  cropTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  cropName: {
    fontWeight: '700',
  },
  sinhalaName: {
    fontWeight: '500',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  price: {
    fontWeight: '800',
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: BorderRadius.xs,
    gap: 2,
  },
  trendText: {
    fontWeight: '700',
  },
});

export default MarketTicker;
