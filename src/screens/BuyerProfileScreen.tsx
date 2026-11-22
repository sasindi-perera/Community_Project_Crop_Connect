import React from 'react';
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
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';

export const BuyerProfileScreen: React.FC = () => {
  const { scaleSize, scaleFont, contentPadding } = useResponsive();
  const { user, logout } = useAuth();
  const { isDark } = useTheme();

  const handleLogout = async () => {
    await logout();
    router.replace('/welcome');
  };

  return (
    <View style={[styles.screen, { backgroundColor: isDark ? '#121815' : Palette.background }]}>
      <Header
        title="Buyer Profile"
        subtitle="Wholesale & Sourcing Account"
        showRoleBadge={false}
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
        {/* Buyer Identity Card */}
        <View
          style={[
            styles.idCard,
            {
              padding: scaleSize(Spacing.lg),
              borderRadius: BorderRadius.xl,
              ...Shadows.soft,
            },
          ]}
        >
          <View style={styles.idCardHeader}>
            <View
              style={[
                styles.avatarCircle,
                {
                  width: scaleSize(64),
                  height: scaleSize(64),
                  borderRadius: scaleSize(32),
                },
              ]}
            >
              <Ionicons name="cart" size={scaleSize(32)} color={Palette.primary} />
            </View>

            <View style={{ flex: 1, marginLeft: 12 }}>
              <View style={styles.nameRow}>
                <Text style={[styles.buyerName, { fontSize: scaleFont(19) }]}>
                  {user?.fullName || 'Dilan Perera'}
                </Text>
                <Badge label="Verified Buyer" variant="verified" size="sm" />
              </View>

              <Text style={[styles.businessName, { fontSize: scaleFont(13) }]}>
                Pettah Fresh Wholesale Hub
              </Text>
              <Text style={[styles.buyerDistrict, { fontSize: scaleFont(12) }]}>
                📍 Manning Wholesale Market, Colombo
              </Text>
            </View>
          </View>

          {/* Sourcing Stats */}
          <View style={styles.statsBar}>
            <View style={styles.statCol}>
              <Text style={[styles.statNum, { fontSize: scaleFont(17) }]}>94</Text>
              <Text style={[styles.statLbl, { fontSize: scaleFont(11) }]}>Orders Bought</Text>
            </View>
            <View style={styles.statDiv} />
            <View style={styles.statCol}>
              <Text style={[styles.statNum, { fontSize: scaleFont(17) }]}>182 MT</Text>
              <Text style={[styles.statLbl, { fontSize: scaleFont(11) }]}>Sourced Volume</Text>
            </View>
            <View style={styles.statDiv} />
            <View style={styles.statCol}>
              <Text style={[styles.statNum, { fontSize: scaleFont(17), color: Palette.primary }]}>
                42 MT
              </Text>
              <Text style={[styles.statLbl, { fontSize: scaleFont(11) }]}>Rescued Crops</Text>
            </View>
          </View>
        </View>

        {/* Quick Edit Action */}
        <Button
          title="Edit Buyer Business Profile"
          variant="outline"
          size="md"
          icon="create-outline"
          fullWidth
          onPress={() => router.push('/edit-profile')}
          style={{ marginVertical: scaleSize(12) }}
        />

        {/* Preferred Sourcing Zones */}
        <View
          style={[
            styles.zonesCard,
            {
              padding: scaleSize(14),
              borderRadius: BorderRadius.lg,
              marginBottom: scaleSize(12),
            },
          ]}
        >
          <Text style={[styles.zonesTitle, { fontSize: scaleFont(13) }]}>
            Preferred Production Zones
          </Text>
          <View style={styles.zonesRow}>
            {['Nuwara Eliya', 'Matale (Dambulla)', 'Badulla (Welimada)', 'Jaffna'].map((zone) => (
              <View key={zone} style={styles.zoneChip}>
                <Ionicons name="location" size={scaleSize(11)} color={Palette.primary} />
                <Text style={styles.zoneChipText}>{zone}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Nav Links */}
        <View style={styles.linksContainer}>
          <TouchableOpacity
            onPress={() => router.push('/(buyer)/map')}
            style={styles.linkRow}
          >
            <View style={styles.linkLeft}>
              <Ionicons name="map-outline" size={scaleSize(18)} color={Palette.primary} />
              <Text style={[styles.linkTitle, { fontSize: scaleFont(14) }]}>Nearby Farm Map & Centroids</Text>
            </View>
            <Ionicons name="chevron-forward" size={scaleSize(18)} color={Palette.slateMedium} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push('/price-comparison')}
            style={styles.linkRow}
          >
            <View style={styles.linkLeft}>
              <Ionicons name="swap-vertical-outline" size={scaleSize(18)} color={Palette.primary} />
              <Text style={[styles.linkTitle, { fontSize: scaleFont(14) }]}>Wholesale Price Comparison Engine</Text>
            </View>
            <Ionicons name="chevron-forward" size={scaleSize(18)} color={Palette.slateMedium} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push('/settings')}
            style={styles.linkRow}
          >
            <View style={styles.linkLeft}>
              <Ionicons name="settings-outline" size={scaleSize(18)} color={Palette.primary} />
              <Text style={[styles.linkTitle, { fontSize: scaleFont(14) }]}>Account Settings & Preferences</Text>
            </View>
            <Ionicons name="chevron-forward" size={scaleSize(18)} color={Palette.slateMedium} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push('/role-selection')}
            style={styles.linkRow}
          >
            <View style={styles.linkLeft}>
              <Ionicons name="swap-horizontal" size={scaleSize(18)} color={Palette.warning} />
              <Text style={[styles.linkTitle, { fontSize: scaleFont(14), color: Palette.warning }]}>
                Switch Active Role Sandbox
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={scaleSize(18)} color={Palette.slateMedium} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleLogout}
            style={[styles.linkRow, { borderBottomWidth: 0 }]}
          >
            <View style={styles.linkLeft}>
              <Ionicons name="log-out-outline" size={scaleSize(18)} color={Palette.rescueRed} />
              <Text style={[styles.linkTitle, { fontSize: scaleFont(14), color: Palette.rescueRed }]}>
                Sign Out from CropConnect
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={scaleSize(18)} color={Palette.slateMedium} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  idCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: Palette.warmBorder,
  },
  idCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  avatarCircle: {
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
    marginBottom: 2,
  },
  buyerName: {
    fontWeight: '900',
    color: Palette.charcoal,
  },
  businessName: {
    color: Palette.secondaryDark,
    fontWeight: '700',
    marginBottom: 2,
  },
  buyerDistrict: {
    color: Palette.slateDark,
    fontWeight: '500',
  },
  statsBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: Palette.subtleBorder,
    paddingTop: 12,
    marginTop: 14,
  },
  statCol: {
    alignItems: 'center',
  },
  statNum: {
    fontWeight: '900',
    color: Palette.charcoal,
  },
  statLbl: {
    color: Palette.slateMedium,
    marginTop: 2,
  },
  statDiv: {
    width: 1,
    height: 22,
    backgroundColor: Palette.subtleBorder,
  },
  zonesCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: Palette.warmBorder,
  },
  zonesTitle: {
    fontWeight: '800',
    color: Palette.charcoal,
    marginBottom: 8,
  },
  zonesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  zoneChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Palette.primaryTint,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: BorderRadius.full,
  },
  zoneChipText: {
    fontSize: 11,
    color: Palette.primary,
    fontWeight: '700',
  },
  linksContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Palette.warmBorder,
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: Palette.subtleBorder,
  },
  linkLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  linkTitle: {
    fontWeight: '600',
    color: Palette.charcoal,
  },
});

export default BuyerProfileScreen;
