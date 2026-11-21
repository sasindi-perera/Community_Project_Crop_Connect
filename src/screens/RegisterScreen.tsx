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
import { Palette, Spacing, BorderRadius } from '../constants/theme';
import { SRI_LANKA_DISTRICTS } from '../constants/sriLanka';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { useResponsive } from '../hooks/useResponsive';
import { useAuth } from '../hooks/useAuth';
import { UserRole } from '../types/user';

export const RegisterScreen: React.FC = () => {
  const { scaleSize, scaleFont, contentPadding } = useResponsive();
  const { register, loading, error, clearError } = useAuth();

  const [role, setRole] = useState<UserRole>('farmer');
  const [fullName, setFullName] = useState('Anura Kumara Wickramasinghe');
  const [email, setEmail] = useState('anura.k@cropconnect.lk');
  const [phone, setPhone] = useState('+94 77 444 8899');
  const [selectedDistrict, setSelectedDistrict] = useState(SRI_LANKA_DISTRICTS[0].name);
  const [entityName, setEntityName] = useState('Kotmale Terraced Farm');
  const [password, setPassword] = useState('LankaCrop#2026');
  const [confirmPassword, setConfirmPassword] = useState('LankaCrop#2026');
  const [localError, setLocalError] = useState<string | null>(null);

  const handleRegister = async () => {
    setLocalError(null);
    clearError();

    // Validation
    if (!fullName.trim() || fullName.trim().length < 3) {
      setLocalError('Please enter your full name (minimum 3 characters).');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      setLocalError('Please enter a valid email address.');
      return;
    }

    const phoneDigits = phone.replace(/[^0-9]/g, '');
    if (phoneDigits.length < 9) {
      setLocalError('Please enter a valid mobile number (e.g. +94 77 123 4567).');
      return;
    }

    if (!password || password.length < 6) {
      setLocalError('Password must be at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setLocalError('Passwords do not match. Please re-enter.');
      return;
    }

    try {
      const profile = await register({
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        password,
        role: role === 'buyer' ? 'buyer' : 'farmer', // strictly sanitize
        district: selectedDistrict,
        farmOrBusinessName: entityName.trim(),
      });

      // Role-based redirection
      if (profile.role === 'buyer') {
        router.replace('/(buyer)');
      } else {
        router.replace('/(farmer)');
      }
    } catch (err: any) {
      setLocalError(err?.message || 'Registration failed. Please try again.');
    }
  };

  const displayError = localError || error;

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
        {/* Back Button */}
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

        <View style={styles.titleSection}>
          <Text style={[styles.mainTitle, { fontSize: scaleFont(26) }]}>Create Account</Text>
          <Text style={[styles.subTitle, { fontSize: scaleFont(14) }]}>
            Join the Sri Lankan zero-waste agricultural trade network.
          </Text>
        </View>

        {/* Error Banner */}
        {displayError && (
          <View
            style={[
              styles.errorBanner,
              {
                padding: scaleSize(10),
                borderRadius: BorderRadius.md,
                marginBottom: scaleSize(12),
              },
            ]}
          >
            <Ionicons name="alert-circle" size={scaleSize(18)} color={Palette.rescueRed} />
            <Text style={[styles.errorBannerText, { fontSize: scaleFont(12) }]}>
              {displayError}
            </Text>
          </View>
        )}

        {/* Role Toggle Selector */}
        <Text style={[styles.fieldLabel, { fontSize: scaleFont(12) }]}>I AM JOINING AS A:</Text>
        <View style={styles.roleChoiceRow}>
          <TouchableOpacity
            onPress={() => {
              setRole('farmer');
              setEntityName('Kotmale Terraced Farm');
            }}
            style={[
              styles.roleChoiceCard,
              role === 'farmer' && styles.roleChoiceCardActive,
              { padding: scaleSize(12), borderRadius: BorderRadius.md },
            ]}
          >
            <Ionicons
              name="leaf"
              size={scaleSize(22)}
              color={role === 'farmer' ? Palette.primary : Palette.slateMedium}
            />
            <Text
              style={[
                styles.roleChoiceTitle,
                role === 'farmer' && styles.roleChoiceTitleActive,
                { fontSize: scaleFont(13) },
              ]}
            >
              Farmer (ගොවි)
            </Text>
            <Text style={[styles.roleChoiceDesc, { fontSize: scaleFont(11) }]}>
              Sell crops at fair AI prices
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setRole('buyer');
              setEntityName('Colombo Central Food Supplies');
            }}
            style={[
              styles.roleChoiceCard,
              role === 'buyer' && styles.roleChoiceCardActive,
              { padding: scaleSize(12), borderRadius: BorderRadius.md },
            ]}
          >
            <Ionicons
              name="cart"
              size={scaleSize(22)}
              color={role === 'buyer' ? Palette.primary : Palette.slateMedium}
            />
            <Text
              style={[
                styles.roleChoiceTitle,
                role === 'buyer' && styles.roleChoiceTitleActive,
                { fontSize: scaleFont(13) },
              ]}
            >
              Buyer (ගැනුම්කරු)
            </Text>
            <Text style={[styles.roleChoiceDesc, { fontSize: scaleFont(11) }]}>
              Wholesaler, retail, hotel
            </Text>
          </TouchableOpacity>
        </View>

        {/* Input Fields */}
        <Input
          label="FULL NAME"
          value={fullName}
          onChangeText={(val) => {
            setFullName(val);
            setLocalError(null);
          }}
          leftIcon="person-outline"
        />

        <Input
          label="EMAIL ADDRESS"
          value={email}
          onChangeText={(val) => {
            setEmail(val);
            setLocalError(null);
          }}
          keyboardType="email-address"
          autoCapitalize="none"
          leftIcon="mail-outline"
        />

        <Input
          label="MOBILE NUMBER"
          value={phone}
          onChangeText={(val) => {
            setPhone(val);
            setLocalError(null);
          }}
          keyboardType="phone-pad"
          leftIcon="call-outline"
        />

        <Input
          label={role === 'farmer' ? 'FARM OR LAND NAME' : 'BUSINESS OR TRADING NAME'}
          value={entityName}
          onChangeText={(val) => {
            setEntityName(val);
            setLocalError(null);
          }}
          leftIcon="business-outline"
        />

        {/* District Selector Chips */}
        <Text style={[styles.fieldLabel, { fontSize: scaleFont(12) }]}>PRIMARY DISTRICT</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: scaleSize(6), marginBottom: scaleSize(14) }}
        >
          {SRI_LANKA_DISTRICTS.slice(0, 10).map((d) => {
            const active = selectedDistrict === d.name;
            return (
              <TouchableOpacity
                key={d.name}
                onPress={() => setSelectedDistrict(d.name)}
                style={[
                  styles.districtChip,
                  active && styles.districtChipActive,
                  { paddingHorizontal: scaleSize(12), paddingVertical: scaleSize(6) },
                ]}
              >
                <Text
                  style={[
                    styles.districtChipText,
                    active && styles.districtChipTextActive,
                    { fontSize: scaleFont(12) },
                  ]}
                >
                  {d.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <Input
          label="PASSWORD (MIN 6 CHARACTERS)"
          value={password}
          onChangeText={(val) => {
            setPassword(val);
            setLocalError(null);
          }}
          secureTextEntry
          leftIcon="lock-closed-outline"
        />

        <Input
          label="CONFIRM PASSWORD"
          value={confirmPassword}
          onChangeText={(val) => {
            setConfirmPassword(val);
            setLocalError(null);
          }}
          secureTextEntry
          leftIcon="lock-closed-outline"
        />

        <Button
          title={`Register as ${role === 'farmer' ? 'Farmer' : 'Buyer'}`}
          onPress={handleRegister}
          variant="primary"
          size="lg"
          loading={loading}
          icon="checkmark-circle-outline"
          fullWidth
          style={{ marginTop: scaleSize(Spacing.md) }}
        />
      </View>

      {/* Footer */}
      <View style={styles.footerRow}>
        <Text style={[styles.footerText, { fontSize: scaleFont(13) }]}>
          Already registered?
        </Text>
        <TouchableOpacity onPress={() => router.push('/login')}>
          <Text style={[styles.loginLink, { fontSize: scaleFont(13) }]}>Sign In</Text>
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
  titleSection: {
    marginBottom: 12,
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
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Palette.rescueLight,
    borderWidth: 1,
    borderColor: Palette.rescueBorder,
  },
  errorBannerText: {
    color: Palette.rescueRed,
    fontWeight: '600',
    flex: 1,
  },
  fieldLabel: {
    fontWeight: '700',
    color: Palette.slateMedium,
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  roleChoiceRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 14,
  },
  roleChoiceCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: Palette.warmBorder,
  },
  roleChoiceCardActive: {
    borderColor: Palette.primary,
    backgroundColor: Palette.primaryTint,
  },
  roleChoiceTitle: {
    fontWeight: '800',
    color: Palette.charcoal,
    marginTop: 6,
  },
  roleChoiceTitleActive: {
    color: Palette.primary,
  },
  roleChoiceDesc: {
    color: Palette.slateMedium,
    marginTop: 2,
  },
  districtChip: {
    backgroundColor: '#FFFFFF',
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: Palette.warmBorder,
  },
  districtChipActive: {
    backgroundColor: Palette.primary,
    borderColor: Palette.primary,
  },
  districtChipText: {
    color: Palette.charcoal,
    fontWeight: '500',
  },
  districtChipTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 14,
  },
  footerText: {
    color: Palette.slateMedium,
  },
  loginLink: {
    color: Palette.primary,
    fontWeight: '800',
  },
});

export default RegisterScreen;
