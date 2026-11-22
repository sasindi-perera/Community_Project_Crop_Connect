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
import { Input } from '../components/common/Input';
import { useResponsive } from '../hooks/useResponsive';
import { useAuth } from '../hooks/useAuth';
import { UserRole } from '../types/user';

export const LoginScreen: React.FC = () => {
  const { scaleSize, scaleFont, contentPadding } = useResponsive();
  const { login, loading, error, clearError } = useAuth();

  const [selectedRole, setSelectedRole] = useState<UserRole>('farmer');
  const [identifier, setIdentifier] = useState('sunil.bandara@cropconnect.lk');
  const [password, setPassword] = useState('CropConnect#2026');
  const [secureText, setSecureText] = useState(true);
  const [localError, setLocalError] = useState<string | null>(null);

  const handleQuickFill = (role: UserRole) => {
    setSelectedRole(role);
    setLocalError(null);
    clearError();
    if (role === 'farmer') {
      setIdentifier('sunil.bandara@cropconnect.lk');
      setPassword('CropConnect#2026');
    } else if (role === 'buyer') {
      setIdentifier('dilan.freshmart@cropconnect.lk');
      setPassword('CropConnect#2026');
    } else {
      setIdentifier('senarath.agrarian@gov.lk');
      setPassword('CropConnect#2026');
    }
  };

  const handleLogin = async () => {
    setLocalError(null);
    clearError();

    if (!identifier.trim()) {
      setLocalError('Please enter your email address.');
      return;
    }
    if (!password) {
      setLocalError('Please enter your password.');
      return;
    }

    try {
      const profile = await login(identifier.trim(), password, selectedRole);

      // Redirect according to user role
      if (profile.role === 'farmer') {
        router.replace('/(farmer)');
      } else if (profile.role === 'buyer') {
        router.replace('/(buyer)');
      } else {
        router.replace('/(admin)');
      }
    } catch (err: any) {
      setLocalError(err?.message || 'Login failed. Please verify your credentials.');
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
        {/* Top Header */}
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
          <Text style={[styles.mainTitle, { fontSize: scaleFont(26) }]}>Sign In</Text>
          <Text style={[styles.subTitle, { fontSize: scaleFont(14) }]}>
            Access your agricultural dashboard and real-time market deals.
          </Text>
        </View>

        {/* Role Selector Tabs */}
        <View style={[styles.roleTabContainer, { marginVertical: scaleSize(Spacing.md) }]}>
          {(['farmer', 'buyer', 'admin'] as UserRole[]).map((r) => {
            const active = selectedRole === r;
            const label = r === 'farmer' ? '🌾 Farmer' : r === 'buyer' ? '🛒 Buyer' : '⚙️ Admin';
            return (
              <TouchableOpacity
                key={r}
                onPress={() => handleQuickFill(r)}
                style={[
                  styles.roleTab,
                  {
                    backgroundColor: active ? Palette.primary : 'transparent',
                    paddingVertical: scaleSize(8),
                    borderRadius: BorderRadius.md,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.roleTabText,
                    {
                      fontSize: scaleFont(13),
                      color: active ? '#FFFFFF' : Palette.slateMedium,
                      fontWeight: active ? '700' : '500',
                    },
                  ]}
                >
                  {label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Demo Fast Login Box */}
        <View
          style={[
            styles.demoBox,
            {
              padding: scaleSize(Spacing.md),
              borderRadius: BorderRadius.lg,
              marginBottom: scaleSize(Spacing.md),
              ...Shadows.soft,
            },
          ]}
        >
          <View style={styles.demoHeader}>
            <Ionicons name="flash" size={scaleSize(16)} color={Palette.warning} />
            <Text style={[styles.demoTitle, { fontSize: scaleFont(12) }]}>
              ONE-TAP DEMO SIGN IN (UNIVERSITY PROJECT PREVIEW)
            </Text>
          </View>
          <Text style={[styles.demoSub, { fontSize: scaleFont(11) }]}>
            Tap below to fill credentials and test any user role:
          </Text>
          <View style={styles.quickFillRow}>
            <TouchableOpacity
              onPress={() => handleQuickFill('farmer')}
              style={[
                styles.quickChip,
                selectedRole === 'farmer' && styles.quickChipActive,
              ]}
            >
              <Text style={styles.quickChipText}>Farmer Sunil</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleQuickFill('buyer')}
              style={[
                styles.quickChip,
                selectedRole === 'buyer' && styles.quickChipActive,
              ]}
            >
              <Text style={styles.quickChipText}>Buyer Dilan</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleQuickFill('admin')}
              style={[
                styles.quickChip,
                selectedRole === 'admin' && styles.quickChipActive,
              ]}
            >
              <Text style={styles.quickChipText}>Admin Senarath</Text>
            </TouchableOpacity>
          </View>
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

        {/* Input Fields */}
        <Input
          label="REGISTERED EMAIL ADDRESS"
          value={identifier}
          onChangeText={(val) => {
            setIdentifier(val);
            setLocalError(null);
          }}
          leftIcon="mail-outline"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Input
          label="PASSWORD"
          value={password}
          onChangeText={(val) => {
            setPassword(val);
            setLocalError(null);
          }}
          secureTextEntry={secureText}
          leftIcon="lock-closed-outline"
          rightIcon={secureText ? 'eye-outline' : 'eye-off-outline'}
          onRightIconPress={() => setSecureText(!secureText)}
        />

        <TouchableOpacity
          onPress={() => router.push('/forgot-password')}
          style={styles.forgotBtn}
        >
          <Text style={[styles.forgotText, { fontSize: scaleFont(12) }]}>Forgot Password?</Text>
        </TouchableOpacity>

        {/* Submit Button */}
        <Button
          title={`Sign In as ${selectedRole.toUpperCase()}`}
          onPress={handleLogin}
          variant="primary"
          size="lg"
          loading={loading}
          icon="log-in-outline"
          fullWidth
          style={{ marginTop: scaleSize(Spacing.sm) }}
        />
      </View>

      {/* Footer */}
      <View style={styles.footerRow}>
        <Text style={[styles.footerText, { fontSize: scaleFont(13) }]}>
          Don&apos;t have an account yet?
        </Text>
        <TouchableOpacity onPress={() => router.push('/register')}>
          <Text style={[styles.registerLink, { fontSize: scaleFont(13) }]}>Register Now</Text>
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
  roleTabContainer: {
    flexDirection: 'row',
    backgroundColor: Palette.surfaceAlt,
    borderRadius: BorderRadius.md,
    padding: 4,
    borderWidth: 1,
    borderColor: Palette.warmBorder,
  },
  roleTab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  roleTabText: {},
  demoBox: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: Palette.warmBorder,
  },
  demoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  demoTitle: {
    fontWeight: '800',
    color: Palette.charcoal,
  },
  demoSub: {
    color: Palette.slateMedium,
    marginBottom: 8,
  },
  quickFillRow: {
    flexDirection: 'row',
    gap: 6,
  },
  quickChip: {
    flex: 1,
    backgroundColor: Palette.surfaceAlt,
    paddingVertical: 6,
    alignItems: 'center',
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
    borderColor: Palette.warmBorder,
  },
  quickChipActive: {
    backgroundColor: Palette.primaryTint,
    borderColor: Palette.primary,
  },
  quickChipText: {
    fontSize: 11,
    fontWeight: '700',
    color: Palette.primary,
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
  forgotBtn: {
    alignSelf: 'flex-end',
    marginBottom: 12,
  },
  forgotText: {
    color: Palette.primary,
    fontWeight: '600',
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
  registerLink: {
    color: Palette.primary,
    fontWeight: '800',
  },
});

export default LoginScreen;
