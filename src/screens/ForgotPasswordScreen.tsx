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

export const ForgotPasswordScreen: React.FC = () => {
  const { scaleSize, scaleFont, contentPadding } = useResponsive();
  const { forgotPassword, loading, error, clearError } = useAuth();

  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [localError, setLocalError] = useState('');

  const handleReset = async () => {
    setLocalError('');
    clearError();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      setLocalError('Please enter a valid registered email address.');
      return;
    }

    try {
      await forgotPassword(email.trim());
      setSuccess(true);
    } catch (err: any) {
      setLocalError(err?.message || 'Failed to send password reset email.');
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
          <View
            style={[
              styles.iconCircle,
              {
                width: scaleSize(56),
                height: scaleSize(56),
                borderRadius: scaleSize(28),
                marginBottom: scaleSize(12),
              },
            ]}
          >
            <Ionicons name="key" size={scaleSize(26)} color={Palette.primary} />
          </View>
          <Text style={[styles.mainTitle, { fontSize: scaleFont(26) }]}>Reset Password</Text>
          <Text style={[styles.subTitle, { fontSize: scaleFont(14) }]}>
            Enter your registered email address and we will send you secure instructions to reset your account password.
          </Text>
        </View>

        {success ? (
          <View
            style={[
              styles.successCard,
              {
                padding: scaleSize(Spacing.md),
                borderRadius: BorderRadius.lg,
                marginVertical: scaleSize(16),
                ...Shadows.soft,
              },
            ]}
          >
            <View style={styles.successHeader}>
              <Ionicons name="checkmark-circle" size={scaleSize(24)} color={Palette.primary} />
              <Text style={[styles.successTitle, { fontSize: scaleFont(15) }]}>
                Reset Link Sent!
              </Text>
            </View>
            <Text style={[styles.successBody, { fontSize: scaleFont(13) }]}>
              A password reset link has been dispatched to <Text style={{ fontWeight: '800' }}>{email}</Text>. Please check your inbox or spam folder.
            </Text>

            <Button
              title="Return to Sign In"
              variant="primary"
              size="md"
              icon="log-in-outline"
              fullWidth
              onPress={() => router.replace('/login')}
              style={{ marginTop: scaleSize(12) }}
            />
          </View>
        ) : (
          <View style={{ marginTop: scaleSize(10) }}>
            <Input
              label="REGISTERED EMAIL ADDRESS"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setLocalError('');
              }}
              placeholder="e.g. sunil.bandara@cropconnect.lk"
              keyboardType="email-address"
              autoCapitalize="none"
              leftIcon="mail-outline"
              error={localError || error || undefined}
            />

            <Button
              title="Send Password Reset Email"
              onPress={handleReset}
              variant="primary"
              size="lg"
              loading={loading}
              icon="mail-unread-outline"
              fullWidth
              style={{ marginTop: scaleSize(Spacing.md) }}
            />
          </View>
        )}
      </View>

      <View style={styles.footerRow}>
        <Text style={[styles.footerText, { fontSize: scaleFont(13) }]}>
          Remember your password?
        </Text>
        <TouchableOpacity onPress={() => router.replace('/login')}>
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
    marginBottom: 14,
  },
  backBtn: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: Palette.warmBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircle: {
    backgroundColor: Palette.primaryTint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleSection: {
    marginBottom: 16,
  },
  mainTitle: {
    fontWeight: '900',
    color: Palette.charcoal,
    letterSpacing: -0.5,
  },
  subTitle: {
    color: Palette.slateMedium,
    marginTop: 4,
    lineHeight: 20,
  },
  successCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: Palette.primary,
  },
  successHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  successTitle: {
    fontWeight: '800',
    color: Palette.primary,
  },
  successBody: {
    color: Palette.slateDark,
    lineHeight: 18,
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

export default ForgotPasswordScreen;
