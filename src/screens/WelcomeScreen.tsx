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
import { Button } from '../components/common/Button';
import { useResponsive } from '../hooks/useResponsive';

export const WelcomeScreen: React.FC = () => {
  const { scaleSize, scaleFont, contentPadding } = useResponsive();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'space-between',
        paddingHorizontal: scaleSize(contentPadding),
        paddingVertical: scaleSize(Spacing.xl),
      }}
      showsVerticalScrollIndicator={false}
    >
      {/* Brand Header */}
      <View style={styles.header}>
        <View
          style={[
            styles.logoBadge,
            {
              width: scaleSize(64),
              height: scaleSize(64),
              borderRadius: scaleSize(32),
              marginBottom: scaleSize(Spacing.md),
            },
          ]}
        >
          <Ionicons name="leaf" size={scaleSize(32)} color={Palette.primary} />
        </View>

        <Text style={[styles.welcomeTitle, { fontSize: scaleFont(28) }]}>
          Welcome to CropConnect
        </Text>
        <Text style={[styles.welcomeSinhala, { fontSize: scaleFont(15) }]}>
          ශ්‍රී ලාංකික කෘෂිකාර්මික වෙළඳපොළ
        </Text>

        <Text style={[styles.welcomeSubtitle, { fontSize: scaleFont(14) }]}>
          The trusted digital bridge for Sri Lankan farmers, bulk buyers, and agrarian communities.
        </Text>
      </View>

      {/* Role Feature Cards */}
      <View style={{ gap: scaleSize(12), marginVertical: scaleSize(Spacing.lg) }}>
        {/* For Farmers Card */}
        <View
          style={[
            styles.roleCard,
            {
              padding: scaleSize(Spacing.md),
              borderRadius: BorderRadius.lg,
              ...Shadows.soft,
            },
          ]}
        >
          <View style={[styles.roleIconCircle, { backgroundColor: Palette.primaryTint }]}>
            <Ionicons name="leaf" size={scaleSize(20)} color={Palette.primary} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.roleTitle, { fontSize: scaleFont(15) }]}>For Farmers (ගොවීන්)</Text>
            <Text style={[styles.roleDesc, { fontSize: scaleFont(12) }]}>
              Check AI fair prices, find nearby buyers, and clear perishable harvests fast with Crop Rescue alerts.
            </Text>
          </View>
        </View>

        {/* For Buyers Card */}
        <View
          style={[
            styles.roleCard,
            {
              padding: scaleSize(Spacing.md),
              borderRadius: BorderRadius.lg,
              ...Shadows.soft,
            },
          ]}
        >
          <View style={[styles.roleIconCircle, { backgroundColor: Palette.accentTint }]}>
            <Ionicons name="cart" size={scaleSize(20)} color={Palette.warning} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.roleTitle, { fontSize: scaleFont(15) }]}>For Buyers (ගැනුම්කරුවන්)</Text>
            <Text style={[styles.roleDesc, { fontSize: scaleFont(12) }]}>
              Source fresh wholesale produce straight from farm fields. Save on broker fees and unlock rescue produce discounts.
            </Text>
          </View>
        </View>
      </View>

      {/* Primary Actions */}
      <View style={{ gap: scaleSize(10) }}>
        <Button
          title="Sign In to Your Account"
          onPress={() => router.push('/login')}
          variant="primary"
          size="lg"
          icon="log-in-outline"
          fullWidth
        />

        <Button
          title="Create New Account"
          onPress={() => router.push('/register')}
          variant="secondary"
          size="lg"
          icon="person-add-outline"
          fullWidth
        />

        <TouchableOpacity
          onPress={() => router.push('/role-selection')}
          style={[styles.demoLink, { paddingVertical: scaleSize(10) }]}
        >
          <Text style={[styles.demoLinkText, { fontSize: scaleFont(13) }]}>
            Explore Role Selection & Quick Demo ➔
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Palette.background,
  },
  header: {
    alignItems: 'center',
    marginTop: 10,
  },
  logoBadge: {
    backgroundColor: Palette.primaryTint,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(36, 92, 70, 0.2)',
  },
  welcomeTitle: {
    fontWeight: '900',
    color: Palette.charcoal,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  welcomeSinhala: {
    color: Palette.secondaryDark,
    fontWeight: '700',
    marginTop: 4,
  },
  welcomeSubtitle: {
    color: Palette.slateMedium,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
    maxWidth: 320,
  },
  roleCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: Palette.warmBorder,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  roleIconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
  roleTitle: {
    fontWeight: '800',
    color: Palette.charcoal,
    marginBottom: 2,
  },
  roleDesc: {
    color: Palette.slateDark,
    lineHeight: 17,
  },
  demoLink: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  demoLinkText: {
    color: Palette.primary,
    fontWeight: '700',
  },
});

export default WelcomeScreen;
