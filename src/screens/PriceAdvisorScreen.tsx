import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Palette, Spacing, BorderRadius, Shadows } from '../constants/theme';
import { POPULAR_CROPS, SRI_LANKA_DISTRICTS } from '../constants/sriLanka';
import { Header } from '../components/common/Header';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Badge } from '../components/common/Badge';
import { useResponsive } from '../hooks/useResponsive';
import { useTheme } from '../hooks/useTheme';
import { predictFairPrice } from '../services/aiService';
import { CropQualityGrade, AIPricePredictionResponse } from '../types/ai';

export const PriceAdvisorScreen: React.FC = () => {
  const { scaleSize, scaleFont, contentPadding } = useResponsive();
  const { isDark } = useTheme();

  const [selectedCrop, setSelectedCrop] = useState(POPULAR_CROPS[0].name);
  const [selectedDistrict, setSelectedDistrict] = useState(SRI_LANKA_DISTRICTS[0].name);
  const [selectedGrade, setSelectedGrade] = useState<CropQualityGrade>('A');
  const [quantity, setQuantity] = useState('500');
  const [isRescue, setIsRescue] = useState(false);
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState<AIPricePredictionResponse | null>(null);

  useEffect(() => {
    let isMounted = true;

    const timer = setTimeout(() => {
      if (!isMounted) return;
      setLoading(true);
      predictFairPrice({
        cropName: selectedCrop,
        district: selectedDistrict,
        grade: selectedGrade,
        quantityKg: parseFloat(quantity) || 500,
        isRescue,
      })
        .then((result) => {
          if (isMounted) {
            setPrediction(result);
          }
        })
        .finally(() => {
          if (isMounted) {
            setLoading(false);
          }
        });
    }, 150);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [selectedCrop, selectedDistrict, selectedGrade, quantity, isRescue]);

  const grades: CropQualityGrade[] = ['A', 'B', 'C'];

  return (
    <View style={[styles.screen, { backgroundColor: isDark ? '#121815' : Palette.warmCream }]}>
      <Header
        title="AI Fair-Price Predictor"
        subtitle="Machine Learning Market Intelligence"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: scaleSize(contentPadding),
          paddingBottom: scaleSize(100),
          paddingTop: scaleSize(10),
        }}
      >
        {/* Intro Card */}
        <View
          style={[
            styles.bannerCard,
            {
              backgroundColor: isDark ? '#1D2E24' : Palette.paleGreen,
              borderColor: isDark ? '#2D4536' : Palette.sageGreen,
              padding: scaleSize(Spacing.md),
              borderRadius: BorderRadius.lg,
            },
          ]}
        >
          <View style={styles.bannerHeader}>
            <View style={styles.aiSparkleIcon}>
              <Ionicons name="sparkles" size={scaleSize(18)} color={Palette.forestGreen} />
            </View>
            <Text
              style={[
                styles.bannerTitle,
                { fontSize: scaleFont(15), color: isDark ? Palette.white : Palette.forestGreen },
              ]}
            >
              Sri Lankan Agrarian Price Engine
            </Text>
          </View>
          <Text
            style={[
              styles.bannerSub,
              { fontSize: scaleFont(12), color: isDark ? '#CBD5E1' : Palette.slateDark },
            ]}
          >
            Trained on historical wholesale price patterns from Dambulla Economic Centre, Pettah Manning Market, and district supply cycles.
          </Text>
        </View>

        {/* Input Parameters Form */}
        <View
          style={[
            styles.formCard,
            {
              backgroundColor: isDark ? '#1A231E' : Palette.white,
              borderColor: isDark ? '#293A30' : Palette.warmBorder,
              padding: scaleSize(Spacing.base),
              borderRadius: BorderRadius.lg,
              marginVertical: scaleSize(12),
              ...(isDark ? {} : Shadows.soft),
            },
          ]}
        >
          <Text
            style={[
              styles.formHeader,
              { fontSize: scaleFont(15), color: isDark ? Palette.white : Palette.charcoal },
            ]}
          >
            Crop Parameters
          </Text>

          {/* Select Crop */}
          <Text style={[styles.fieldLabel, { fontSize: scaleFont(12) }]}>SELECT CROP</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: scaleSize(8), marginBottom: scaleSize(12) }}
          >
            {POPULAR_CROPS.slice(0, 8).map((crop) => {
              const active = selectedCrop === crop.name;
              return (
                <TouchableOpacity
                  key={crop.id}
                  onPress={() => setSelectedCrop(crop.name)}
                  style={[
                    styles.paramPill,
                    {
                      backgroundColor: active
                        ? Palette.forestGreen
                        : isDark
                        ? '#223028'
                        : Palette.parchment,
                      borderColor: active ? Palette.forestGreen : Palette.warmBorder,
                      paddingVertical: scaleSize(6),
                      paddingHorizontal: scaleSize(12),
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.paramPillText,
                      {
                        fontSize: scaleFont(12),
                        color: active ? Palette.white : isDark ? Palette.white : Palette.charcoal,
                        fontWeight: active ? '700' : '500',
                      },
                    ]}
                  >
                    {crop.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Select District */}
          <Text style={[styles.fieldLabel, { fontSize: scaleFont(12) }]}>PRODUCING / SELLING DISTRICT</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: scaleSize(8), marginBottom: scaleSize(12) }}
          >
            {SRI_LANKA_DISTRICTS.slice(0, 8).map((district) => {
              const active = selectedDistrict === district.name;
              return (
                <TouchableOpacity
                  key={district.name}
                  onPress={() => setSelectedDistrict(district.name)}
                  style={[
                    styles.paramPill,
                    {
                      backgroundColor: active
                        ? Palette.leafGreen
                        : isDark
                        ? '#223028'
                        : Palette.parchment,
                      borderColor: active ? Palette.leafGreen : Palette.warmBorder,
                      paddingVertical: scaleSize(6),
                      paddingHorizontal: scaleSize(12),
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.paramPillText,
                      {
                        fontSize: scaleFont(12),
                        color: active ? Palette.white : isDark ? Palette.white : Palette.charcoal,
                        fontWeight: active ? '700' : '500',
                      },
                    ]}
                  >
                    {district.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Quality Grade & Quantity */}
          <View style={styles.twoCol}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.fieldLabel, { fontSize: scaleFont(12) }]}>QUALITY GRADE</Text>
              <View style={styles.gradeRow}>
                {grades.map((g) => {
                  const active = selectedGrade === g;
                  return (
                    <TouchableOpacity
                      key={g}
                      onPress={() => setSelectedGrade(g)}
                      style={[
                        styles.gradeBtn,
                        {
                          backgroundColor: active
                            ? Palette.harvestGold
                            : isDark
                            ? '#243229'
                            : Palette.parchment,
                          borderColor: active ? Palette.harvestGold : Palette.warmBorder,
                          paddingVertical: scaleSize(8),
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.gradeBtnText,
                          {
                            fontSize: scaleFont(13),
                            color: active ? Palette.white : isDark ? Palette.white : Palette.charcoal,
                          },
                        ]}
                      >
                        Grade {g}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            <View style={{ flex: 1, marginLeft: scaleSize(12) }}>
              <Input
                label="QUANTITY (KG)"
                value={quantity}
                onChangeText={setQuantity}
                keyboardType="numeric"
                leftIcon="scale-outline"
              />
            </View>
          </View>

          {/* Rescue Toggle */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setIsRescue(!isRescue)}
            style={[
              styles.rescueToggleRow,
              {
                backgroundColor: isRescue
                  ? isDark ? '#3D1B1B' : Palette.rescueLight
                  : isDark ? '#223028' : Palette.parchment,
                borderColor: isRescue ? Palette.rescueRed : Palette.warmBorder,
                padding: scaleSize(10),
                borderRadius: BorderRadius.md,
              },
            ]}
          >
            <View style={styles.rescueToggleLeft}>
              <Ionicons
                name={isRescue ? 'alert-circle' : 'alert-circle-outline'}
                size={scaleSize(18)}
                color={isRescue ? Palette.rescueRed : Palette.slateMedium}
              />
              <View style={{ marginLeft: 8 }}>
                <Text
                  style={[
                    styles.rescueToggleTitle,
                    {
                      fontSize: scaleFont(13),
                      color: isRescue ? Palette.rescueRed : isDark ? Palette.white : Palette.charcoal,
                    },
                  ]}
                >
                  Urgent Surplus / Crop Rescue Mode
                </Text>
                <Text
                  style={[
                    styles.rescueToggleSub,
                    { fontSize: scaleFont(11), color: Palette.slateMedium },
                  ]}
                >
                  Calculates emergency discount to ensure same-day pickup
                </Text>
              </View>
            </View>
            <Ionicons
              name={isRescue ? 'checkbox' : 'square-outline'}
              size={scaleSize(22)}
              color={isRescue ? Palette.rescueRed : Palette.slateMedium}
            />
          </TouchableOpacity>
        </View>

        {/* AI Prediction Result Box */}
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={Palette.forestGreen} />
            <Text style={[styles.loadingText, { fontSize: scaleFont(13) }]}>
              Calculating agrarian regression vectors...
            </Text>
          </View>
        ) : prediction ? (
          <View
            style={[
              styles.resultCard,
              {
                backgroundColor: isDark ? '#1C2721' : Palette.white,
                borderColor: isDark ? '#2E4336' : Palette.sageGreen,
                padding: scaleSize(Spacing.lg),
                borderRadius: BorderRadius.xl,
                ...(isDark ? {} : Shadows.elevated),
              },
            ]}
          >
            <View style={styles.resultHeader}>
              <View style={styles.badgeGroup}>
                <Badge label="AI FAIR PRICE ENGINE" variant="aiFair" />
                <Badge
                  label={`${Math.round(prediction.confidenceScore * 100)}% Confidence`}
                  variant="verified"
                />
              </View>

              <View style={styles.trendRow}>
                <Ionicons
                  name={prediction.marketTrend === 'rising' ? 'trending-up' : 'trending-down'}
                  size={scaleSize(18)}
                  color={prediction.marketTrend === 'rising' ? Palette.leafGreen : Palette.rescueRed}
                />
                <Text
                  style={[
                    styles.trendText,
                    {
                      fontSize: scaleFont(12),
                      color:
                        prediction.marketTrend === 'rising'
                          ? Palette.leafGreen
                          : Palette.rescueRed,
                    },
                  ]}
                >
                  Trend: {prediction.marketTrend.toUpperCase()} (+{prediction.marketTrendPercentage}%)
                </Text>
              </View>
            </View>

            {/* Central Price Display */}
            <View style={styles.priceHeroBox}>
              <Text style={[styles.heroPriceLabel, { fontSize: scaleFont(11) }]}>
                RECOMMENDED FAIR WHOLESALE PRICE
              </Text>
              <View style={styles.heroPriceRow}>
                <Text
                  style={[
                    styles.heroPriceValue,
                    {
                      fontSize: scaleFont(36),
                      color: isDark ? Palette.white : Palette.forestGreen,
                    },
                  ]}
                >
                  Rs. {prediction.fairPricePerKg}
                </Text>
                <Text style={[styles.heroPriceUnit, { fontSize: scaleFont(16) }]}>/ kg</Text>
              </View>
            </View>

            {/* Lower / Upper Bound Range */}
            <View style={styles.rangeRow}>
              <View style={styles.rangeCol}>
                <Text style={[styles.rangeLabel, { fontSize: scaleFont(11) }]}>Fair Min</Text>
                <Text style={[styles.rangeValue, { fontSize: scaleFont(16) }]}>
                  Rs. {prediction.minPricePerKg}
                </Text>
              </View>

              <View style={styles.rangeBarContainer}>
                <View style={styles.rangeBarBase}>
                  <View style={styles.rangeBarFill} />
                </View>
                <Text style={[styles.rangeBarText, { fontSize: scaleFont(10) }]}>
                  Safe Negotiating Bracket
                </Text>
              </View>

              <View style={styles.rangeCol}>
                <Text style={[styles.rangeLabel, { fontSize: scaleFont(11) }]}>Fair Max</Text>
                <Text style={[styles.rangeValue, { fontSize: scaleFont(16) }]}>
                  Rs. {prediction.maxPricePerKg}
                </Text>
              </View>
            </View>

            {/* Rescue Price Recommendation */}
            <View
              style={[
                styles.rescueRecommendationBox,
                {
                  backgroundColor: isDark ? '#3D1C1C' : '#FFF1F2',
                  borderColor: isDark ? '#5C2B2B' : '#FECDD3',
                  padding: scaleSize(10),
                },
              ]}
            >
              <Ionicons name="flash" size={scaleSize(16)} color={Palette.rescueRed} />
              <View style={{ flex: 1, marginLeft: 8 }}>
                <Text style={[styles.rescueRecTitle, { fontSize: scaleFont(12) }]}>
                  Urgent Rescue Clearance Price: Rs. {prediction.recommendedRescuePrice} / kg
                </Text>
                <Text style={[styles.rescueRecSub, { fontSize: scaleFont(11) }]}>
                  Recommended if harvest has less than 24 hours of shelf life remaining.
                </Text>
              </View>
            </View>

            {/* AI Agrarian Insight */}
            <View style={styles.insightBox}>
              <Ionicons name="bulb-outline" size={scaleSize(16)} color={Palette.harvestGold} />
              <Text
                style={[
                  styles.insightText,
                  { fontSize: scaleFont(12), color: isDark ? '#CBD5E1' : Palette.slateDark },
                ]}
              >
                {prediction.insight}
              </Text>
            </View>

            {/* Action */}
            <Button
              title="Post Listing at This Price"
              icon="add-circle-outline"
              variant="primary"
              size="lg"
              fullWidth
              onPress={() => {
                alert(`Starting listing creation for ${selectedCrop} at Rs. ${prediction.fairPricePerKg}/kg!`);
              }}
              style={{ marginTop: scaleSize(14) }}
            />
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  bannerCard: {
    borderWidth: 1,
  },
  bannerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  aiSparkleIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerTitle: {
    fontWeight: '800',
  },
  bannerSub: {
    lineHeight: 18,
  },
  formCard: {
    borderWidth: 1,
  },
  formHeader: {
    fontWeight: '800',
    marginBottom: 12,
  },
  fieldLabel: {
    fontWeight: '700',
    color: Palette.slateMedium,
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  paramPill: {
    borderRadius: BorderRadius.full,
    borderWidth: 1,
  },
  paramPillText: {},
  twoCol: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 4,
  },
  gradeRow: {
    flexDirection: 'row',
    gap: 6,
    height: 48,
  },
  gradeBtn: {
    flex: 1,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradeBtnText: {
    fontWeight: '700',
  },
  rescueToggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    marginTop: 8,
  },
  rescueToggleLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  rescueToggleTitle: {
    fontWeight: '700',
  },
  rescueToggleSub: {
    marginTop: 2,
  },
  loadingContainer: {
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    color: Palette.slateMedium,
    marginTop: 10,
    fontWeight: '600',
  },
  resultCard: {
    borderWidth: 1.5,
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  badgeGroup: {
    flexDirection: 'row',
    gap: 6,
  },
  trendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trendText: {
    fontWeight: '700',
  },
  priceHeroBox: {
    alignItems: 'center',
    marginVertical: 10,
  },
  heroPriceLabel: {
    fontWeight: '700',
    color: Palette.slateMedium,
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  heroPriceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  heroPriceValue: {
    fontWeight: '900',
  },
  heroPriceUnit: {
    fontWeight: '600',
    color: Palette.slateMedium,
    marginLeft: 6,
  },
  rangeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.06)',
    marginVertical: 10,
  },
  rangeCol: {
    alignItems: 'center',
  },
  rangeLabel: {
    fontWeight: '600',
    color: Palette.slateMedium,
    marginBottom: 2,
  },
  rangeValue: {
    fontWeight: '800',
  },
  rangeBarContainer: {
    flex: 1,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  rangeBarBase: {
    width: '100%',
    height: 6,
    backgroundColor: '#E2E8F0',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 4,
  },
  rangeBarFill: {
    width: '70%',
    height: '100%',
    backgroundColor: Palette.forestGreen,
    borderRadius: 3,
    alignSelf: 'center',
  },
  rangeBarText: {
    color: Palette.slateMedium,
    fontWeight: '500',
  },
  rescueRecommendationBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    marginVertical: 8,
  },
  rescueRecTitle: {
    fontWeight: '700',
    color: Palette.rescueRed,
  },
  rescueRecSub: {
    color: Palette.slateDark,
    marginTop: 2,
  },
  insightBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginTop: 8,
    paddingHorizontal: 4,
  },
  insightText: {
    flex: 1,
    lineHeight: 18,
  },
});

export default PriceAdvisorScreen;
