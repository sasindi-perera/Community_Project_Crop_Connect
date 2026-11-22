import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Palette, Spacing, BorderRadius, Shadows } from '../constants/theme';
import { Header } from '../components/common/Header';
import { Badge } from '../components/common/Badge';
import { useResponsive } from '../hooks/useResponsive';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';
import { UserRole } from '../types/user';

export const ProfileScreen: React.FC = () => {
  const { scaleSize, scaleFont, contentPadding } = useResponsive();
  const { user, role, switchRole } = useAuth();
  const { isDark, setMode } = useTheme();

  const roles: { id: UserRole; title: string; icon: keyof typeof Ionicons.glyphMap }[] = [
    { id: 'farmer', title: 'Farmer', icon: 'leaf' },
    { id: 'buyer', title: 'Buyer / Wholesaler', icon: 'cart' },
    { id: 'admin', title: 'Administrator', icon: 'shield-checkmark' },
  ];

  return (
    <View style={[styles.screen, { backgroundColor: isDark ? '#121815' : Palette.warmCream }]}>
      <Header title="My Profile" subtitle="Account, Verification & Settings" showRoleBadge={false} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: scaleSize(contentPadding),
          paddingBottom: scaleSize(100),
          paddingTop: scaleSize(10),
        }}
      >
        {/* User Card */}
        <View
          style={[
            styles.userCard,
            {
              backgroundColor: isDark ? '#1C2721' : Palette.white,
              borderColor: isDark ? '#2E4035' : Palette.warmBorder,
              padding: scaleSize(Spacing.lg),
              borderRadius: BorderRadius.xl,
              ...(isDark ? {} : Shadows.soft),
            },
          ]}
        >
          <View style={styles.userTop}>
            <View
              style={[
                styles.avatarBox,
                {
                  width: scaleSize(56),
                  height: scaleSize(56),
                  borderRadius: scaleSize(28),
                  backgroundColor: Palette.paleGreen,
                },
              ]}
            >
              <Ionicons name="person" size={scaleSize(28)} color={Palette.forestGreen} />
            </View>

            <View style={{ flex: 1, marginLeft: scaleSize(12) }}>
              <View style={styles.nameRow}>
                <Text
                  style={[
                    styles.userName,
                    {
                      fontSize: scaleFont(18),
                      color: isDark ? Palette.white : Palette.charcoal,
                    },
                  ]}
                >
                  {user?.fullName}
                </Text>
                {user?.isVerified && (
                  <Badge label="Verified" variant="verified" size="sm" />
                )}
              </View>

              <Text
                style={[
                  styles.userPhone,
                  { fontSize: scaleFont(13), color: Palette.slateMedium },
                ]}
              >
                {user?.phone} • {user?.email}
              </Text>

              <Text
                style={[
                  styles.userLocation,
                  { fontSize: scaleFont(12), color: isDark ? '#CBD5E1' : Palette.slateDark },
                ]}
              >
                📍 {user?.location.address || user?.location.district}
              </Text>
            </View>
          </View>

          {/* Stats Bar */}
          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Text style={[styles.statNum, { fontSize: scaleFont(17) }]}>
                {user?.rating || 4.8} ★
              </Text>
              <Text style={[styles.statLabel, { fontSize: scaleFont(11) }]}>Rating</Text>
            </View>
            <View style={styles.statSep} />
            <View style={styles.statBox}>
              <Text style={[styles.statNum, { fontSize: scaleFont(17) }]}>
                {user?.dealsCompleted || 42}
              </Text>
              <Text style={[styles.statLabel, { fontSize: scaleFont(11) }]}>
                Completed Deals
              </Text>
            </View>
            <View style={styles.statSep} />
            <View style={styles.statBox}>
              <Text
                style={[
                  styles.statNum,
                  { fontSize: scaleFont(17), color: Palette.leafGreen },
                ]}
              >
                100%
              </Text>
              <Text style={[styles.statLabel, { fontSize: scaleFont(11) }]}>Fair-Priced</Text>
            </View>
          </View>
        </View>

        {/* Role Switcher Sandbox */}
        <View
          style={[
            styles.sectionCard,
            {
              backgroundColor: isDark ? '#1C2721' : Palette.white,
              borderColor: isDark ? '#2E4035' : Palette.warmBorder,
              padding: scaleSize(Spacing.base),
              borderRadius: BorderRadius.lg,
              marginVertical: scaleSize(12),
              ...(isDark ? {} : Shadows.soft),
            },
          ]}
        >
          <Text
            style={[
              styles.sectionTitle,
              { fontSize: scaleFont(15), color: isDark ? Palette.white : Palette.charcoal },
            ]}
          >
            Switch Active Role (Testing & Demo Sandbox)
          </Text>
          <Text
            style={[
              styles.sectionSub,
              { fontSize: scaleFont(12), color: Palette.slateMedium },
            ]}
          >
            Toggle between Farmer, Buyer, and Admin modes to preview user-specific dashboards and features.
          </Text>

          <View style={styles.rolesGrid}>
            {roles.map((r) => {
              const active = role === r.id;
              return (
                <TouchableOpacity
                  key={r.id}
                  onPress={() => switchRole(r.id)}
                  style={[
                    styles.roleBtn,
                    {
                      backgroundColor: active
                        ? Palette.forestGreen
                        : isDark
                        ? '#223028'
                        : Palette.parchment,
                      borderColor: active ? Palette.forestGreen : Palette.warmBorder,
                      padding: scaleSize(10),
                      borderRadius: BorderRadius.md,
                    },
                  ]}
                >
                  <Ionicons
                    name={r.icon}
                    size={scaleSize(18)}
                    color={active ? Palette.white : isDark ? Palette.white : Palette.charcoal}
                  />
                  <Text
                    style={[
                      styles.roleBtnText,
                      {
                        fontSize: scaleFont(12),
                        color: active ? Palette.white : isDark ? Palette.white : Palette.charcoal,
                        fontWeight: active ? '700' : '500',
                      },
                    ]}
                  >
                    {r.title}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Appearance & Preferences */}
        <View
          style={[
            styles.sectionCard,
            {
              backgroundColor: isDark ? '#1C2721' : Palette.white,
              borderColor: isDark ? '#2E4035' : Palette.warmBorder,
              padding: scaleSize(Spacing.base),
              borderRadius: BorderRadius.lg,
              marginBottom: scaleSize(12),
              ...(isDark ? {} : Shadows.soft),
            },
          ]}
        >
          <Text
            style={[
              styles.sectionTitle,
              { fontSize: scaleFont(15), color: isDark ? Palette.white : Palette.charcoal },
            ]}
          >
            App Theme & Language
          </Text>

          <View style={styles.prefRow}>
            <View style={styles.prefLeft}>
              <Ionicons
                name={isDark ? 'moon' : 'sunny'}
                size={scaleSize(18)}
                color={Palette.forestGreen}
              />
              <Text
                style={[
                  styles.prefLabel,
                  { fontSize: scaleFont(14), color: isDark ? Palette.white : Palette.charcoal },
                ]}
              >
                Dark Theme Mode
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => setMode(isDark ? 'light' : 'dark')}
              style={[
                styles.themeToggleBtn,
                {
                  backgroundColor: isDark ? Palette.forestGreen : Palette.parchment,
                  paddingHorizontal: scaleSize(12),
                  paddingVertical: scaleSize(6),
                },
              ]}
            >
              <Text
                style={[
                  styles.themeToggleText,
                  {
                    fontSize: scaleFont(12),
                    color: isDark ? Palette.white : Palette.forestGreen,
                  },
                ]}
              >
                {isDark ? 'Dark (Active)' : 'Light (Active)'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Project Info Badge */}
        <View
          style={[
            styles.projectCard,
            {
              backgroundColor: isDark ? '#1C2721' : Palette.parchment,
              borderColor: isDark ? '#2E4035' : Palette.warmBorder,
              padding: scaleSize(Spacing.md),
              borderRadius: BorderRadius.lg,
            },
          ]}
        >
          <View style={styles.projectHeader}>
            <Ionicons name="school-outline" size={scaleSize(18)} color={Palette.forestGreen} />
            <Text style={[styles.projectTitle, { fontSize: scaleFont(13) }]}>
              University Community Software Project
            </Text>
          </View>
          <Text style={[styles.projectDesc, { fontSize: scaleFont(11) }]}>
            AI-Powered Crop Rescue & Fair-Price Matcher (Sri Lankan Agricultural Community).
            Developed with React Native, Expo Router, Scikit-learn and Firebase.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  userCard: {
    borderWidth: 1,
  },
  userTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarBox: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  userName: {
    fontWeight: '800',
  },
  userPhone: {
    marginBottom: 4,
  },
  userLocation: {
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.06)',
    paddingTop: 14,
    marginTop: 14,
  },
  statBox: {
    alignItems: 'center',
  },
  statNum: {
    fontWeight: '800',
  },
  statLabel: {
    color: Palette.slateMedium,
    marginTop: 2,
    fontWeight: '500',
  },
  statSep: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.08)',
  },
  sectionCard: {
    borderWidth: 1,
  },
  sectionTitle: {
    fontWeight: '800',
    marginBottom: 4,
  },
  sectionSub: {
    lineHeight: 16,
    marginBottom: 12,
  },
  rolesGrid: {
    gap: 8,
  },
  roleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
  },
  roleBtnText: {},
  prefRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  prefLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  prefLabel: {
    fontWeight: '600',
  },
  themeToggleBtn: {
    borderRadius: BorderRadius.full,
  },
  themeToggleText: {
    fontWeight: '700',
  },
  projectCard: {
    borderWidth: 1,
  },
  projectHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  projectTitle: {
    fontWeight: '700',
    color: Palette.forestGreen,
  },
  projectDesc: {
    color: Palette.slateMedium,
    lineHeight: 16,
  },
});

export default ProfileScreen;
