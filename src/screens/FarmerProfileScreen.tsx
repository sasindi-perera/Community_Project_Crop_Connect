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

export const FarmerProfileScreen: React.FC = () => {
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
        title="Farmer Profile"
        subtitle="Agrarian ID & Farm Credentials"
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
        {/* Profile Identity Card */}
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
              <Ionicons name="person" size={scaleSize(32)} color={Palette.primary} />
            </View>

            <View style={{ flex: 1, marginLeft: 12 }}>
              <View style={styles.nameRow}>
                <Text style={[styles.farmerName, { fontSize: scaleFont(19) }]}>
                  {user?.fullName || 'Sunil Bandara'}
                </Text>
                <Badge label="Verified" variant="verified" size="sm" />
              </View>

              <Text style={[styles.farmerPhone, { fontSize: scaleFont(13) }]}>
                {user?.phone || '+94 77 123 4567'}
              </Text>
              <Text style={[styles.farmerDistrict, { fontSize: scaleFont(12) }]}>
                📍 {user?.location.district} District ({user?.location.province} Province)
              </Text>
            </View>
          </View>

          {/* Farm Details Badge Grid */}
          <View style={styles.farmGrid}>
            <View style={styles.farmCol}>
              <Text style={[styles.farmMetaLbl, { fontSize: scaleFont(11) }]}>Farm Name</Text>
              <Text style={[styles.farmMetaVal, { fontSize: scaleFont(13) }]}>
                {user?.farmName || 'Green Mountain Hill Farm'}
              </Text>
            </View>

            <View style={styles.farmCol}>
              <Text style={[styles.farmMetaLbl, { fontSize: scaleFont(11) }]}>Cultivation Land</Text>
              <Text style={[styles.farmMetaVal, { fontSize: scaleFont(13) }]}>
                {user?.farmSizeAcres || 4.5} Acres
              </Text>
            </View>
          </View>

          {/* Stats Bar */}
          <View style={styles.statsBar}>
            <View style={styles.statCol}>
              <Text style={[styles.statNum, { fontSize: scaleFont(17) }]}>4.8 ★</Text>
              <Text style={[styles.statLbl, { fontSize: scaleFont(11) }]}>Farmer Rating</Text>
            </View>
            <View style={styles.statDiv} />
            <View style={styles.statCol}>
              <Text style={[styles.statNum, { fontSize: scaleFont(17) }]}>48</Text>
              <Text style={[styles.statLbl, { fontSize: scaleFont(11) }]}>Deals Completed</Text>
            </View>
            <View style={styles.statDiv} />
            <View style={styles.statCol}>
              <Text style={[styles.statNum, { fontSize: scaleFont(17), color: Palette.primary }]}>
                100%
              </Text>
              <Text style={[styles.statLbl, { fontSize: scaleFont(11) }]}>Rescue Clearance</Text>
            </View>
          </View>
        </View>

        {/* Quick Edit Action */}
        <Button
          title="Edit Farm Profile & Credentials"
          variant="outline"
          size="md"
          icon="create-outline"
          fullWidth
          onPress={() => router.push('/edit-profile')}
          style={{ marginVertical: scaleSize(12) }}
        />

        {/* Agrarian Verified ID Card */}
        <View
          style={[
            styles.govCard,
            {
              padding: scaleSize(14),
              borderRadius: BorderRadius.lg,
              marginBottom: scaleSize(12),
            },
          ]}
        >
          <View style={styles.govHeader}>
            <Ionicons name="shield-checkmark" size={scaleSize(18)} color={Palette.primary} />
            <Text style={[styles.govTitle, { fontSize: scaleFont(13) }]}>
              Sri Lanka Agrarian Services Registration
            </Text>
          </View>
          <Text style={[styles.govBody, { fontSize: scaleFont(11) }]}>
            Agrarian Farmer ID: AGR-NUW-2024-8842 • Kandapola Agrarian Service Center. Verified for direct market access and fertilizer subsidies.
          </Text>
        </View>

        {/* Nav Links */}
        <View style={styles.linksContainer}>
          <TouchableOpacity
            onPress={() => router.push('/(farmer)/my-crops')}
            style={styles.linkRow}
          >
            <View style={styles.linkLeft}>
              <Ionicons name="basket-outline" size={scaleSize(18)} color={Palette.primary} />
              <Text style={[styles.linkTitle, { fontSize: scaleFont(14) }]}>Manage My Crop Listings</Text>
            </View>
            <Ionicons name="chevron-forward" size={scaleSize(18)} color={Palette.slateMedium} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push('/price-history')}
            style={styles.linkRow}
          >
            <View style={styles.linkLeft}>
              <Ionicons name="analytics-outline" size={scaleSize(18)} color={Palette.primary} />
              <Text style={[styles.linkTitle, { fontSize: scaleFont(14) }]}>Market Price History & Trends</Text>
            </View>
            <Ionicons name="chevron-forward" size={scaleSize(18)} color={Palette.slateMedium} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push('/settings')}
            style={styles.linkRow}
          >
            <View style={styles.linkLeft}>
              <Ionicons name="settings-outline" size={scaleSize(18)} color={Palette.primary} />
              <Text style={[styles.linkTitle, { fontSize: scaleFont(14) }]}>App Settings & Language</Text>
            </View>
            <Ionicons name="chevron-forward" size={scaleSize(18)} color={Palette.slateMedium} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push('/help')}
            style={styles.linkRow}
          >
            <View style={styles.linkLeft}>
              <Ionicons name="help-buoy-outline" size={scaleSize(18)} color={Palette.primary} />
              <Text style={[styles.linkTitle, { fontSize: scaleFont(14) }]}>Agrarian Help & Extension Hotline</Text>
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
  farmerName: {
    fontWeight: '900',
    color: Palette.charcoal,
  },
  farmerPhone: {
    color: Palette.slateMedium,
    marginBottom: 2,
  },
  farmerDistrict: {
    color: Palette.slateDark,
    fontWeight: '500',
  },
  farmGrid: {
    flexDirection: 'row',
    backgroundColor: Palette.surfaceAlt,
    padding: 10,
    borderRadius: BorderRadius.md,
    gap: 12,
  },
  farmCol: {
    flex: 1,
  },
  farmMetaLbl: {
    color: Palette.slateMedium,
    fontWeight: '600',
  },
  farmMetaVal: {
    color: Palette.charcoal,
    fontWeight: '800',
    marginTop: 2,
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
  govCard: {
    backgroundColor: Palette.primaryTint,
    borderWidth: 1,
    borderColor: 'rgba(36, 92, 70, 0.2)',
  },
  govHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  govTitle: {
    fontWeight: '800',
    color: Palette.primary,
  },
  govBody: {
    color: Palette.slateDark,
    lineHeight: 16,
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

export default FarmerProfileScreen;
