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
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { useResponsive } from '../hooks/useResponsive';
import { MOCK_NEARBY_BUYERS, NearbyBuyerItem } from '../services/mockDataService';

export const NearbyBuyersScreen: React.FC = () => {
  const { scaleSize, scaleFont, contentPadding } = useResponsive();
  const [search, setSearch] = useState('');
  const [buyers] = useState<NearbyBuyerItem[]>(MOCK_NEARBY_BUYERS);

  const filtered = buyers.filter(
    (b) =>
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.companyName.toLowerCase().includes(search.toLowerCase()) ||
      b.lookingFor.toLowerCase().includes(search.toLowerCase()) ||
      b.district.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.screen}>
      <Header
        title="Nearby Active Buyers"
        subtitle="Wholesale Demands in Proximity"
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
        <Input
          placeholder="Filter by crop, company or district..."
          value={search}
          onChangeText={setSearch}
          leftIcon="search-outline"
        />

        <View style={styles.summaryBar}>
          <Text style={[styles.summaryText, { fontSize: scaleFont(13) }]}>
            Found {filtered.length} Verified Buyers Seeking Harvests
          </Text>
          <TouchableOpacity onPress={() => router.push('/(buyer)/map')}>
            <Text style={[styles.mapLink, { fontSize: scaleFont(12) }]}>View on Map 📍</Text>
          </TouchableOpacity>
        </View>

        {/* Buyers List */}
        <View style={{ gap: scaleSize(12) }}>
          {filtered.map((buyer) => (
            <TouchableOpacity
              key={buyer.id}
              activeOpacity={0.9}
              onPress={() =>
                router.push({ pathname: '/buyer/[id]', params: { id: buyer.id } })
              }
              style={[
                styles.buyerCard,
                {
                  padding: scaleSize(Spacing.md),
                  borderRadius: BorderRadius.lg,
                  ...Shadows.soft,
                },
              ]}
            >
              <View style={styles.cardHeader}>
                <View
                  style={[
                    styles.avatarBubble,
                    {
                      width: scaleSize(44),
                      height: scaleSize(44),
                      borderRadius: scaleSize(22),
                    },
                  ]}
                >
                  <Ionicons name="business" size={scaleSize(20)} color={Palette.primary} />
                </View>

                <View style={{ flex: 1, marginLeft: 10 }}>
                  <View style={styles.nameRow}>
                    <Text style={[styles.buyerName, { fontSize: scaleFont(15) }]}>
                      {buyer.companyName}
                    </Text>
                    {buyer.verified && (
                      <Badge label="Verified" variant="verified" size="sm" />
                    )}
                  </View>
                  <Text style={[styles.buyerContact, { fontSize: scaleFont(12) }]}>
                    Contact: {buyer.name} • ★ {buyer.rating}
                  </Text>
                </View>
              </View>

              <View style={styles.demandBox}>
                <View style={styles.demandTop}>
                  <Text style={[styles.demandLbl, { fontSize: scaleFont(11) }]}>LOOKING FOR</Text>
                  {buyer.urgentNeeds && (
                    <Badge label="URGENT DEMAND" variant="rescue" size="sm" />
                  )}
                </View>
                <Text style={[styles.demandCrop, { fontSize: scaleFont(14) }]}>
                  {buyer.lookingFor}
                </Text>

                <View style={styles.demandMetrics}>
                  <Text style={[styles.demandMeta, { fontSize: scaleFont(12) }]}>
                    Target: <Text style={{ fontWeight: '800' }}>{buyer.targetQuantityKg.toLocaleString()} kg</Text>
                  </Text>
                  <Text style={[styles.demandMeta, { fontSize: scaleFont(12) }]}>
                    Budget: <Text style={{ fontWeight: '800', color: Palette.primary }}>Up to Rs. {buyer.maxBudgetPerKg}/kg</Text>
                  </Text>
                </View>
              </View>

              <View style={styles.cardFooter}>
                <View style={styles.distanceBadge}>
                  <Ionicons name="location" size={scaleSize(13)} color={Palette.primary} />
                  <Text style={[styles.distanceText, { fontSize: scaleFont(11) }]}>
                    {buyer.district} ({buyer.distanceKm} km away)
                  </Text>
                </View>

                <Button
                  title="Contact Buyer"
                  size="sm"
                  variant="primary"
                  icon="call-outline"
                  onPress={() => alert(`Calling ${buyer.name} (${buyer.phone})...`)}
                />
              </View>
            </TouchableOpacity>
          ))}
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
  summaryBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryText: {
    fontWeight: '700',
    color: Palette.charcoal,
  },
  mapLink: {
    fontWeight: '700',
    color: Palette.primary,
  },
  buyerCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: Palette.warmBorder,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatarBubble: {
    backgroundColor: Palette.primaryTint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buyerName: {
    fontWeight: '800',
    color: Palette.charcoal,
  },
  buyerContact: {
    color: Palette.slateMedium,
    marginTop: 2,
  },
  demandBox: {
    backgroundColor: Palette.surfaceAlt,
    padding: 10,
    borderRadius: BorderRadius.md,
    marginBottom: 10,
  },
  demandTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  demandLbl: {
    fontWeight: '700',
    color: Palette.slateMedium,
    letterSpacing: 0.5,
  },
  demandCrop: {
    fontWeight: '800',
    color: Palette.primaryDark,
    marginBottom: 4,
  },
  demandMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  demandMeta: {
    color: Palette.slateDark,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: Palette.subtleBorder,
    paddingTop: 8,
  },
  distanceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  distanceText: {
    color: Palette.slateDark,
    fontWeight: '600',
  },
});

export default NearbyBuyersScreen;
