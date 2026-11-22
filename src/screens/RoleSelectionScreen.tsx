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
import { Button } from '../components/common/Button';
import { useResponsive } from '../hooks/useResponsive';
import { useAuth } from '../hooks/useAuth';
import { UserRole } from '../types/user';

interface RoleCardData {
  id: UserRole;
  title: string;
  sinhalaTitle: string;
  badge: string;
  icon: keyof typeof Ionicons.glyphMap;
  description: string;
  features: string[];
}

const ROLES: RoleCardData[] = [
  {
    id: 'farmer',
    title: 'Farmer (ගොවි)',
    sinhalaTitle: 'අස්වැන්නට සාධාරණ මිලක් ලබාගන්න',
    badge: 'Producer',
    icon: 'leaf',
    description: 'Sell your harvest directly to verified buyers across Sri Lanka. Leverage Scikit-learn AI pricing to know fair market rates.',
    features: [
      'AI Fair-Price calculator for 25 districts',
      'Urgent Crop Rescue alerts for perishable surplus',
      'Direct order negotiation with wholesale buyers',
    ],
  },
  {
    id: 'buyer',
    title: 'Buyer (ගැනුම්කරු)',
    sinhalaTitle: 'ගොවිපළෙන්ම නැවුම් අස්වැන්න මිලදී ගන්න',
    badge: 'Aggregator / Wholesale',
    icon: 'cart',
    description: 'Source direct-from-field vegetables, fruits, and paddy. Benefit from 25%-35% discounts on rescued surplus lots.',
    features: [
      'Interactive radius map with farm distance tags',
      'Zero-waste Crop Rescue discount catalog',
      'Post bulk requirements to nearby farmers',
    ],
  },
  {
    id: 'admin',
    title: 'Administrator (පරිපාලක)',
    sinhalaTitle: 'පද්ධති පාලනය සහ වෙළඳපොළ නිරීක්ෂණය',
    badge: 'Agrarian Officer',
    icon: 'shield-checkmark',
    description: 'Platform oversight, farmer identity verification, market baseline price calibrations, and post-harvest rescue metrics.',
    features: [
      'HARTI & Central Bank price index manager',
      'Farmer & buyer verification approval queue',
      'National crop rescue impact analytics',
    ],
  },
];

export const RoleSelectionScreen: React.FC = () => {
  const { scaleSize, scaleFont, contentPadding } = useResponsive();
  const { switchRole } = useAuth();
  const [selectedRole, setSelectedRole] = useState<UserRole>('farmer');

  const handleConfirmRole = () => {
    switchRole(selectedRole);
    if (selectedRole === 'farmer') {
      router.replace('/(farmer)');
    } else if (selectedRole === 'buyer') {
      router.replace('/(buyer)');
    } else {
      router.replace('/(admin)');
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        flexGrow: 1,
        paddingHorizontal: scaleSize(contentPadding),
        paddingVertical: scaleSize(Spacing.lg),
        justifyContent: 'space-between',
      }}
      showsVerticalScrollIndicator={false}
    >
      <View>
        {/* Header */}
        <View style={styles.topBar}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={[
              styles.backBtn,
              {
                width: scaleSize(38),
                height: scaleSize(38),
                borderRadius: scaleSize(19),
              },
            ]}
          >
            <Ionicons name="arrow-back" size={scaleSize(20)} color={Palette.charcoal} />
          </TouchableOpacity>
        </View>

        <View style={styles.header}>
          <Text style={[styles.mainTitle, { fontSize: scaleFont(26) }]}>Select Your Role</Text>
          <Text style={[styles.subTitle, { fontSize: scaleFont(14) }]}>
            Choose how you will participate in the CropConnect agrarian ecosystem.
          </Text>
        </View>

        {/* Roles List */}
        <View style={{ gap: scaleSize(14), marginVertical: scaleSize(Spacing.md) }}>
          {ROLES.map((r) => {
            const isSelected = selectedRole === r.id;
            return (
              <TouchableOpacity
                key={r.id}
                activeOpacity={0.9}
                onPress={() => setSelectedRole(r.id)}
                style={[
                  styles.roleCard,
                  isSelected && styles.roleCardActive,
                  {
                    padding: scaleSize(Spacing.base),
                    borderRadius: BorderRadius.xl,
                    ...(isSelected ? Shadows.medium : Shadows.soft),
                  },
                ]}
              >
                <View style={styles.cardTopRow}>
                  <View
                    style={[
                      styles.iconCircle,
                      {
                        backgroundColor: isSelected ? Palette.primary : Palette.primaryTint,
                        width: scaleSize(44),
                        height: scaleSize(44),
                        borderRadius: scaleSize(22),
                      },
                    ]}
                  >
                    <Ionicons
                      name={r.icon}
                      size={scaleSize(22)}
                      color={isSelected ? '#FFFFFF' : Palette.primary}
                    />
                  </View>

                  <View style={{ flex: 1, marginLeft: 10 }}>
                    <Text
                      style={[
                        styles.roleCardTitle,
                        { fontSize: scaleFont(16), color: isSelected ? Palette.primary : Palette.charcoal },
                      ]}
                    >
                      {r.title}
                    </Text>
                    <Text style={[styles.roleCardSinhala, { fontSize: scaleFont(12) }]}>
                      {r.sinhalaTitle}
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.radioButton,
                      isSelected && styles.radioButtonActive,
                      {
                        width: scaleSize(22),
                        height: scaleSize(22),
                        borderRadius: scaleSize(11),
                      },
                    ]}
                  >
                    {isSelected && <View style={styles.radioInner} />}
                  </View>
                </View>

                <Text style={[styles.roleDesc, { fontSize: scaleFont(13) }]}>
                  {r.description}
                </Text>

                <View style={styles.featuresList}>
                  {r.features.map((feat, i) => (
                    <View key={i} style={styles.featureItem}>
                      <Ionicons
                        name="checkmark-circle"
                        size={scaleSize(15)}
                        color={isSelected ? Palette.primary : Palette.secondary}
                      />
                      <Text style={[styles.featureText, { fontSize: scaleFont(12) }]}>
                        {feat}
                      </Text>
                    </View>
                  ))}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <Button
        title={`Continue as ${selectedRole.toUpperCase()}`}
        onPress={handleConfirmRole}
        variant="primary"
        size="lg"
        icon="arrow-forward"
        iconPosition="right"
        fullWidth
        style={{ marginTop: scaleSize(Spacing.md) }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Palette.background,
  },
  topBar: {
    marginBottom: 10,
  },
  backBtn: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: Palette.warmBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    marginBottom: 8,
  },
  mainTitle: {
    fontWeight: '900',
    color: Palette.charcoal,
    letterSpacing: -0.5,
  },
  subTitle: {
    color: Palette.slateMedium,
    marginTop: 4,
  },
  roleCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: Palette.warmBorder,
  },
  roleCardActive: {
    borderColor: Palette.primary,
    backgroundColor: '#FFFFFF',
  },
  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconCircle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  roleCardTitle: {
    fontWeight: '800',
  },
  roleCardSinhala: {
    color: Palette.secondaryDark,
    marginTop: 1,
    fontWeight: '500',
  },
  radioButton: {
    borderWidth: 2,
    borderColor: Palette.slateBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonActive: {
    borderColor: Palette.primary,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Palette.primary,
  },
  roleDesc: {
    color: Palette.slateDark,
    lineHeight: 18,
    marginBottom: 12,
  },
  featuresList: {
    gap: 6,
    borderTopWidth: 1,
    borderTopColor: Palette.subtleBorder,
    paddingTop: 10,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  featureText: {
    color: Palette.charcoal,
    fontWeight: '500',
  },
});

export default RoleSelectionScreen;
