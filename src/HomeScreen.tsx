import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Palette, Spacing, BorderRadius } from '../constants/theme';
import { CROP_CATEGORIES } from '../constants/sriLanka';
import { Header } from '../components/common/Header';
import { MarketTicker } from '../components/home/MarketTicker';
import { CropRescueBanner } from '../components/home/CropRescueBanner';
import { CropListingCard } from '../components/home/CropListingCard';
import { useResponsive } from '../hooks/useResponsive';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';
import { getMockMarketTickers } from '../services/aiService';
import { INITIAL_MOCK_LISTINGS } from '../services/mockDataService';
import { CropListing } from '../types/listing';

export const HomeScreen: React.FC = () => {
  const { scaleSize, scaleFont, contentPadding } = useResponsive();
  const { role, user } = useAuth();
  const { isDark } = useTheme();

  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [listings] = useState<CropListing[]>(INITIAL_MOCK_LISTINGS);

  const marketTickers = getMockMarketTickers();
  const rescueListings = listings.filter((l) => l.isRescueCrop);
  const totalKgAtRisk = rescueListings.reduce((sum, l) => sum + l.quantityKg, 0);

  const filteredListings = listings.filter((l) => {
    if (selectedCategory === 'all') return true;
    return l.category === selectedCategory;
  });

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 800);
  };

  const handleCardPress = (id: string) => {
    router.push({
      pathname: '/listing/[id]',
      params: { id },
    });
  };

  const handleRescuePress = () => {
    router.push('/(tabs)/rescue');
  };

  const handleAdvisorPress = () => {
    router.push('/(tabs)/advisor');
  };

  return (
    <View style={[styles.screen, { backgroundColor: isDark ? '#121815' : Palette.warmCream }]}>
      <Header
        title="CropConnect"
        subtitle="AI-Powered Crop Rescue & Fair Price"
        onNotificationPress={() => {
          router.push('/modal');
        }}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        contentContainerStyle={{ paddingBottom: scaleSize(90) }}
      >
        {/* Welcome Section */}
        <View style={[styles.welcomeCard, { marginHorizontal: scaleSize(contentPadding) }]}>
          <View style={styles.welcomeLeft}>
            <Text
              style={[
                styles.welcomeGreeting,
                { fontSize: scaleFont(13), color: isDark ? Palette.sageGreen : Palette.forestGreen },
              ]}
            >
              Ayubowan, {user?.fullName.split(' ')[0] || 'Friend'}! 🇱🇰
            </Text>
            <Text
              style={[
                styles.welcomeTitle,
                { fontSize: scaleFont(19), color: isDark ? Palette.white : Palette.charcoal },
              ]}
            >
              {role === 'farmer'
                ? 'Empowering your harvest with fair prices'
                : 'Direct from Sri Lankan fields to your doorstep'}
            </Text>
            <Text
              style={[
                styles.welcomeLocation,
                { fontSize: scaleFont(12), color: isDark ? '#94A3B8' : Palette.slateMedium },
              ]}
            >
              📍 {user?.location.district} District ({user?.location.province} Province)
            </Text>
          </View>
        </View>

        {/* Live Wholesale Ticker */}
        <MarketTicker items={marketTickers} onItemPress={handleAdvisorPress} />

        {/* Farmer Specific Quick Actions */}
        {role === 'farmer' && (
          <View
            style={[
              styles.farmerActionRow,
              { marginHorizontal: scaleSize(contentPadding), gap: scaleSize(10) },
            ]}
          >
            <TouchableOpacity
              activeOpacity={0.88}
              onPress={handleAdvisorPress}
              style={[
                styles.actionCard,
                {
                  backgroundColor: isDark ? '#1C2B22' : Palette.paleGreen,
                  borderColor: isDark ? '#2D4536' : Palette.sageGreen,
                  padding: scaleSize(Spacing.md),
                },
              ]}
            >
              <View style={styles.actionIconBox}>
                <Ionicons name="sparkles" size={scaleSize(20)} color={Palette.forestGreen} />
              </View>
              <Text style={[styles.actionTitle, { fontSize: scaleFont(14) }]}>
                AI Price Advisor
              </Text>
              <Text style={[styles.actionDesc, { fontSize: scaleFont(11) }]}>
                Check fair market rates before selling
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.88}
              onPress={handleRescuePress}
              style={[
                styles.actionCard,
                {
                  backgroundColor: isDark ? '#381A1A' : Palette.rescueLight,
                  borderColor: isDark ? '#5C2828' : '#FCA5A5',
                  padding: scaleSize(Spacing.md),
                },
              ]}
            >
              <View style={[styles.actionIconBox, { backgroundColor: '#FEE2E2' }]}>
                <Ionicons name="flash" size={scaleSize(20)} color={Palette.rescueRed} />
              </View>
              <Text
                style={[
                  styles.actionTitle,
                  { fontSize: scaleFont(14), color: Palette.rescueRed },
                ]}
              >
                Post Crop Rescue
              </Text>
              <Text
                style={[
                  styles.actionDesc,
                  { fontSize: scaleFont(11), color: isDark ? '#FCA5A5' : Palette.slateDark },
                ]}
              >
                Clear surplus stock at urgent discount
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Crop Rescue Urgency Banner */}
        <CropRescueBanner
          urgentCount={rescueListings.length}
          totalKgAtRisk={totalKgAtRisk}
          onPress={handleRescuePress}
        />

        {/* Category Filter Chips */}
        <View style={styles.categorySection}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: scaleSize(contentPadding),
              gap: scaleSize(8),
              paddingVertical: 4,
            }}
          >
            {CROP_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <TouchableOpacity
                  key={cat.id}
                  activeOpacity={0.8}
                  onPress={() => setSelectedCategory(cat.id)}
                  style={[
                    styles.categoryChip,
                    {
                      backgroundColor: isSelected
                        ? Palette.forestGreen
                        : isDark
                        ? '#1E2822'
                        : Palette.white,
                      borderColor: isSelected
                        ? Palette.forestGreen
                        : isDark
                        ? '#2E3D34'
                        : Palette.warmBorder,
                      paddingVertical: scaleSize(8),
                      paddingHorizontal: scaleSize(14),
                    },
                  ]}
                >
                  <Ionicons
                    name={cat.icon as any}
                    size={scaleSize(15)}
                    color={isSelected ? Palette.white : isDark ? Palette.white : Palette.charcoal}
                    style={{ marginRight: 6 }}
                  />
                  <Text
                    style={[
                      styles.categoryLabel,
                      {
                        fontSize: scaleFont(12),
                        color: isSelected ? Palette.white : isDark ? Palette.white : Palette.charcoal,
                        fontWeight: isSelected ? '700' : '500',
                      },
                    ]}
                  >
                    {cat.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Section Header: Available Harvests */}
        <View
          style={[
            styles.feedHeader,
            { paddingHorizontal: scaleSize(contentPadding), marginVertical: scaleSize(10) },
          ]}
        >
          <View>
            <Text
              style={[
                styles.feedTitle,
                { fontSize: scaleFont(17), color: isDark ? Palette.white : Palette.charcoal },
              ]}
            >
              {role === 'farmer' ? 'Current Farm Listings' : 'Nearby Direct-from-Farm Produce'}
            </Text>
            <Text
              style={[
                styles.feedSub,
                { fontSize: scaleFont(12), color: isDark ? '#94A3B8' : Palette.slateMedium },
              ]}
            >
              Verified fair prices • No middleman broker markup
            </Text>
          </View>

          <TouchableOpacity onPress={() => setSelectedCategory('all')}>
            <Text
              style={[
                styles.viewAllText,
                { fontSize: scaleFont(12), color: Palette.forestGreen },
              ]}
            >
              {filteredListings.length} Available
            </Text>
          </TouchableOpacity>
        </View>

        {/* Listings Feed */}
        {filteredListings.map((listing) => (
          <CropListingCard
            key={listing.id}
            listing={listing}
            onPress={() => handleCardPress(listing.id)}
            onRescuePress={() => handleCardPress(listing.id)}
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
  welcomeCard: {
    marginVertical: 10,
    padding: 14,
    borderRadius: BorderRadius.lg,
    backgroundColor: 'rgba(30, 81, 40, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(30, 81, 40, 0.12)',
  },
  welcomeLeft: {},
  welcomeGreeting: {
    fontWeight: '700',
    marginBottom: 4,
  },
  welcomeTitle: {
    fontWeight: '800',
    lineHeight: 24,
    marginBottom: 4,
  },
  welcomeLocation: {
    fontWeight: '500',
  },
  farmerActionRow: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  actionCard: {
    flex: 1,
    borderRadius: BorderRadius.md,
    borderWidth: 1.5,
  },
  actionIconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  actionTitle: {
    fontWeight: '800',
    marginBottom: 2,
  },
  actionDesc: {
    lineHeight: 14,
  },
  categorySection: {
    marginVertical: 6,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: BorderRadius.full,
    borderWidth: 1,
  },
  categoryLabel: {},
  feedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  feedTitle: {
    fontWeight: '800',
  },
  feedSub: {
    marginTop: 2,
  },
  viewAllText: {
    fontWeight: '700',
  },
});

export default HomeScreen;
