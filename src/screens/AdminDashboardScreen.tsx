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
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../hooks/useAuth';

export const AdminDashboardScreen: React.FC = () => {
  const { scaleSize, scaleFont, contentPadding } = useResponsive();
  const { isDark } = useTheme();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.replace('/welcome');
  };

  return (
    <View style={[styles.screen, { backgroundColor: isDark ? '#121815' : Palette.background }]}>
      <Header
        title="Admin Control Hub"
        subtitle="Department of Agrarian Development Liaison"
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
        {/* KPI Banner */}
        <View
          style={[
            styles.kpiCard,
            {
              padding: scaleSize(Spacing.base),
              borderRadius: BorderRadius.xl,
              ...Shadows.soft,
            },
          ]}
        >
          <View style={styles.kpiTopRow}>
            <View>
              <Text style={[styles.kpiSuperTitle, { fontSize: scaleFont(11) }]}>
                NATIONAL CROP RESCUE IMPACT
              </Text>
              <Text style={[styles.kpiMainNumber, { fontSize: scaleFont(28) }]}>
                148,500 <Text style={{ fontSize: scaleFont(16), color: Palette.slateMedium }}>kg</Text>
              </Text>
              <Text style={[styles.kpiSub, { fontSize: scaleFont(12) }]}>
                Agricultural surplus saved from post-harvest rot
              </Text>
            </View>

            <View style={styles.impactBadge}>
              <Ionicons name="leaf" size={scaleSize(20)} color={Palette.primary} />
              <Text style={[styles.impactBadgeText, { fontSize: scaleFont(11) }]}>
                38.4% Waste Prevented
              </Text>
            </View>
          </View>

          {/* 3 Metrics Row */}
          <View style={styles.metricsRow}>
            <View style={styles.metricCol}>
              <Text style={[styles.metricVal, { fontSize: scaleFont(16) }]}>Rs. 42.8M</Text>
              <Text style={[styles.metricLbl, { fontSize: scaleFont(11) }]}>Total Trade Value</Text>
            </View>
            <View style={styles.metricSep} />
            <View style={styles.metricCol}>
              <Text style={[styles.metricVal, { fontSize: scaleFont(16) }]}>1,280</Text>
              <Text style={[styles.metricLbl, { fontSize: scaleFont(11) }]}>Verified Farmers</Text>
            </View>
            <View style={styles.metricSep} />
            <View style={styles.metricCol}>
              <Text style={[styles.metricVal, { fontSize: scaleFont(16) }]}>412</Text>
              <Text style={[styles.metricLbl, { fontSize: scaleFont(11) }]}>Active Buyers</Text>
            </View>
          </View>
        </View>

        {/* AI Model Health Card */}
        <View
          style={[
            styles.aiHealthCard,
            {
              padding: scaleSize(Spacing.md),
              borderRadius: BorderRadius.lg,
              marginVertical: scaleSize(12),
              ...Shadows.soft,
            },
          ]}
        >
          <View style={styles.aiHealthTop}>
            <View style={styles.sparkleBox}>
              <Ionicons name="hardware-chip-outline" size={scaleSize(20)} color={Palette.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.aiHealthTitle, { fontSize: scaleFont(14) }]}>
                Scikit-Learn Price Prediction Engine: Healthy
              </Text>
              <Text style={[styles.aiHealthSub, { fontSize: scaleFont(11) }]}>
                Synchronized with Hector Kobbekaduwa Agrarian Research Institute (HARTI) wholesale index.
              </Text>
            </View>
            <Badge label="94.6% Accuracy" variant="aiFair" size="sm" />
          </View>
        </View>

        {/* Quick Admin Actions */}
        <Text style={[styles.sectionHeader, { fontSize: scaleFont(15) }]}>
          Administrative Controls
        </Text>

        <View style={{ gap: scaleSize(10), marginVertical: scaleSize(8) }}>
          {/* Action 1 */}
          <TouchableOpacity
            activeOpacity={0.88}
            onPress={() => router.push('/price-comparison')}
            style={[styles.adminActionCard, { padding: scaleSize(14), borderRadius: BorderRadius.lg }]}
          >
            <View style={[styles.adminIconBox, { backgroundColor: Palette.primaryTint }]}>
              <Ionicons name="trending-up" size={scaleSize(20)} color={Palette.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.actionTitle, { fontSize: scaleFont(14) }]}>
                Market Price Baseline Manager
              </Text>
              <Text style={[styles.actionSub, { fontSize: scaleFont(11) }]}>
                Inspect and recalibrate Dambulla, Keppetipola & Pettah baseline prices
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={scaleSize(18)} color={Palette.slateMedium} />
          </TouchableOpacity>

          {/* Action 2 */}
          <TouchableOpacity
            activeOpacity={0.88}
            onPress={() => router.push('/nearby-buyers')}
            style={[styles.adminActionCard, { padding: scaleSize(14), borderRadius: BorderRadius.lg }]}
          >
            <View style={[styles.adminIconBox, { backgroundColor: Palette.accentTint }]}>
              <Ionicons name="shield-checkmark" size={scaleSize(20)} color={Palette.warning} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.actionTitle, { fontSize: scaleFont(14) }]}>
                User Verification Queue (6 Pending)
              </Text>
              <Text style={[styles.actionSub, { fontSize: scaleFont(11) }]}>
                Review farmer land deeds and wholesale business registration licenses
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={scaleSize(18)} color={Palette.slateMedium} />
          </TouchableOpacity>

          {/* Action 3 */}
          <TouchableOpacity
            activeOpacity={0.88}
            onPress={() => router.push('/notifications')}
            style={[styles.adminActionCard, { padding: scaleSize(14), borderRadius: BorderRadius.lg }]}
          >
            <View style={[styles.adminIconBox, { backgroundColor: Palette.rescueLight }]}>
              <Ionicons name="megaphone" size={scaleSize(20)} color={Palette.rescueRed} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.actionTitle, { fontSize: scaleFont(14) }]}>
                Broadcast Agrarian Weather / Spoilage Warning
              </Text>
              <Text style={[styles.actionSub, { fontSize: scaleFont(11) }]}>
                Send SMS & Push notification to farmers in high-rain districts
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={scaleSize(18)} color={Palette.slateMedium} />
          </TouchableOpacity>
        </View>

        {/* Pending Verifications Preview */}
        <Text style={[styles.sectionHeader, { fontSize: scaleFont(15), marginTop: scaleSize(14) }]}>
          Recent Verification Requests
        </Text>

        <View style={{ gap: scaleSize(8), marginTop: scaleSize(8) }}>
          <View style={[styles.verifyItem, { padding: scaleSize(12), borderRadius: BorderRadius.md }]}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.verifyName, { fontSize: scaleFont(13) }]}>
                P. B. Wijesinghe (Farmer • Nuwara Eliya)
              </Text>
              <Text style={[styles.verifyDetail, { fontSize: scaleFont(11) }]}>
                Uploaded: Agrarian Land Certificate (3.2 Acres Potato/Carrot)
              </Text>
            </View>
            <View style={styles.verifyActionRow}>
              <Button
                title="Verify"
                size="sm"
                variant="primary"
                onPress={() => alert('Farmer account verified!')}
              />
            </View>
          </View>

          <View style={[styles.verifyItem, { padding: scaleSize(12), borderRadius: BorderRadius.md }]}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.verifyName, { fontSize: scaleFont(13) }]}>
                Cargills Agro Liaison Hub (Buyer • Dambulla)
              </Text>
              <Text style={[styles.verifyDetail, { fontSize: scaleFont(11) }]}>
                Uploaded: Company BR PV-88421 & Tax Clearance Certificate
              </Text>
            </View>
            <View style={styles.verifyActionRow}>
              <Button
                title="Verify"
                size="sm"
                variant="primary"
                onPress={() => alert('Buyer business account verified!')}
              />
            </View>
          </View>
        </View>

        {/* Administrator Session Controls */}
        <View style={{ marginTop: scaleSize(16), gap: scaleSize(8) }}>
          <Button
            title="Switch Active Role Sandbox"
            variant="outline"
            icon="swap-horizontal"
            onPress={() => router.push('/role-selection')}
          />
          <Button
            title="Sign Out from CropConnect"
            variant="ghost"
            icon="log-out-outline"
            textStyle={{ color: Palette.rescueRed }}
            onPress={handleLogout}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  kpiCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: Palette.warmBorder,
  },
  kpiTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  kpiSuperTitle: {
    fontWeight: '800',
    color: Palette.primary,
    letterSpacing: 0.5,
  },
  kpiMainNumber: {
    fontWeight: '900',
    color: Palette.charcoal,
    marginTop: 2,
  },
  kpiSub: {
    color: Palette.slateMedium,
    marginTop: 2,
  },
  impactBadge: {
    backgroundColor: Palette.primaryTint,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    gap: 4,
  },
  impactBadgeText: {
    fontWeight: '700',
    color: Palette.primary,
  },
  metricsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: Palette.subtleBorder,
    paddingTop: 12,
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
    fontWeight: '500',
  },
  metricSep: {
    width: 1,
    height: 24,
    backgroundColor: Palette.subtleBorder,
  },
  aiHealthCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: Palette.warmBorder,
  },
  aiHealthTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  sparkleBox: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: Palette.primaryTint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiHealthTitle: {
    fontWeight: '800',
    color: Palette.charcoal,
  },
  aiHealthSub: {
    color: Palette.slateMedium,
    marginTop: 2,
    lineHeight: 15,
  },
  sectionHeader: {
    fontWeight: '800',
    color: Palette.charcoal,
    marginTop: 4,
  },
  adminActionCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: Palette.warmBorder,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  adminIconBox: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionTitle: {
    fontWeight: '800',
    color: Palette.charcoal,
  },
  actionSub: {
    color: Palette.slateMedium,
    marginTop: 2,
    lineHeight: 15,
  },
  verifyItem: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: Palette.warmBorder,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  verifyName: {
    fontWeight: '700',
    color: Palette.charcoal,
  },
  verifyDetail: {
    color: Palette.slateMedium,
    marginTop: 2,
  },
  verifyActionRow: {},
});

export default AdminDashboardScreen;
