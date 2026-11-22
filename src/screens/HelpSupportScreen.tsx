import React, { useState } from 'react';
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
import { Button } from '../components/common/Button';
import { useResponsive } from '../hooks/useResponsive';

interface FAQItem {
  q: string;
  a: string;
}

const FAQS: FAQItem[] = [
  {
    q: 'How does the AI Fair-Price Predictor work?',
    a: 'CropConnect uses a Scikit-learn regression model trained on daily wholesale price records from Hector Kobbekaduwa Agrarian Research Institute (HARTI), Dambulla DEC, and Pettah markets. It evaluates crop variety, district supply, season, and quality grade to suggest an equitable price range.',
  },
  {
    q: 'What is a "Crop Rescue" listing?',
    a: 'When a farmer faces sudden transport cancellations or has highly perishable crops (like tomatoes, leeks, or leafy greens) nearing spoilage, they can list as "Crop Rescue". These are highlighted with countdown timers and offered at 25%-35% discounts to guarantee same-day bulk buyer pickup.',
  },
  {
    q: 'How is transport arranged between farmer and buyer?',
    a: 'Buyers often have their own 5-ton or canter transport lorries and collect directly at the farm-gate. The buyer detail screen indicates whether farm-gate pickup or transport assistance is provided.',
  },
  {
    q: 'Is there any intermediary broker fee on CropConnect?',
    a: 'Zero. CropConnect is a university community software project created to empower Sri Lankan agriculture. 100% of the agreed transaction value goes between farmer and buyer.',
  },
];

export const HelpSupportScreen: React.FC = () => {
  const { scaleSize, scaleFont, contentPadding } = useResponsive();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <View style={styles.screen}>
      <Header
        title="Help & Agrarian Support"
        subtitle="Hotlines, FAQs & Extension Guidance"
        showRoleBadge={false}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: scaleSize(contentPadding),
          paddingBottom: scaleSize(90),
          paddingTop: scaleSize(10),
        }}
      >
        {/* Sri Lanka Agrarian Hotline Banner */}
        <View
          style={[
            styles.hotlineCard,
            {
              padding: scaleSize(Spacing.md),
              borderRadius: BorderRadius.xl,
              marginBottom: scaleSize(14),
              ...Shadows.soft,
            },
          ]}
        >
          <View style={styles.hotlineTop}>
            <View style={styles.phoneBubble}>
              <Ionicons name="call" size={scaleSize(22)} color="#FFFFFF" />
            </View>
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={[styles.hotlineTitle, { fontSize: scaleFont(14) }]}>
                Sri Lanka Agrarian Hotline: 1920
              </Text>
              <Text style={[styles.hotlineSub, { fontSize: scaleFont(11) }]}>
                Government Department of Agriculture Toll-Free Agricultural Extension Service (Sinhala / Tamil / English)
              </Text>
            </View>
          </View>

          <Button
            title="Dial 1920 Hotline Now"
            variant="secondary"
            size="md"
            icon="call-outline"
            fullWidth
            onPress={() => alert('Dialing Department of Agriculture Hotline 1920...')}
            style={{ marginTop: scaleSize(8) }}
          />
        </View>

        {/* Crop Rescue WhatsApp Support */}
        <View
          style={[
            styles.whatsappCard,
            {
              padding: scaleSize(14),
              borderRadius: BorderRadius.lg,
              marginBottom: scaleSize(14),
            },
          ]}
        >
          <View style={styles.waTop}>
            <Ionicons name="chatbubble-ellipses" size={scaleSize(18)} color={Palette.primary} />
            <Text style={[styles.waTitle, { fontSize: scaleFont(13) }]}>
              Emergency Crop Rescue Desk
            </Text>
          </View>
          <Text style={[styles.waSub, { fontSize: scaleFont(11) }]}>
            Have over 1,000 kg of perishable produce that must be moved today? Message our community team for emergency broadcast to supermarket aggregators.
          </Text>
          <TouchableOpacity
            onPress={() => alert('Opening WhatsApp Agrarian Help Channel...')}
            style={styles.waBtn}
          >
            <Text style={styles.waBtnText}>Message Agrarian Rescue Team ➔</Text>
          </TouchableOpacity>
        </View>

        {/* FAQs Section */}
        <Text style={[styles.faqSectionHeader, { fontSize: scaleFont(15) }]}>
          Frequently Asked Questions
        </Text>

        <View style={{ gap: scaleSize(8), marginTop: scaleSize(8) }}>
          {FAQS.map((faq, index) => {
            const isExpanded = expandedIndex === index;
            return (
              <TouchableOpacity
                key={index}
                activeOpacity={0.88}
                onPress={() => toggleAccordion(index)}
                style={[
                  styles.faqCard,
                  isExpanded && styles.faqCardExpanded,
                  { padding: scaleSize(14), borderRadius: BorderRadius.lg },
                ]}
              >
                <View style={styles.faqTop}>
                  <Text
                    style={[
                      styles.faqQuestion,
                      isExpanded && { color: Palette.primary },
                      { fontSize: scaleFont(13) },
                    ]}
                  >
                    {faq.q}
                  </Text>
                  <Ionicons
                    name={isExpanded ? 'chevron-up' : 'chevron-down'}
                    size={scaleSize(18)}
                    color={isExpanded ? Palette.primary : Palette.slateMedium}
                  />
                </View>
                {isExpanded && (
                  <Text style={[styles.faqAnswer, { fontSize: scaleFont(12) }]}>
                    {faq.a}
                  </Text>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Palette.background,
  },
  hotlineCard: {
    backgroundColor: Palette.primary,
  },
  hotlineTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  phoneBubble: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hotlineTitle: {
    fontWeight: '900',
    color: '#FFFFFF',
  },
  hotlineSub: {
    color: '#E8F3EE',
    marginTop: 2,
    lineHeight: 15,
  },
  whatsappCard: {
    backgroundColor: Palette.primaryTint,
    borderWidth: 1,
    borderColor: 'rgba(36, 92, 70, 0.25)',
  },
  waTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  waTitle: {
    fontWeight: '800',
    color: Palette.primary,
  },
  waSub: {
    color: Palette.slateDark,
    lineHeight: 16,
    marginBottom: 6,
  },
  waBtn: {
    alignSelf: 'flex-start',
    marginTop: 2,
  },
  waBtnText: {
    color: Palette.primary,
    fontWeight: '800',
    fontSize: 12,
  },
  faqSectionHeader: {
    fontWeight: '800',
    color: Palette.charcoal,
  },
  faqCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: Palette.warmBorder,
  },
  faqCardExpanded: {
    borderColor: Palette.primary,
  },
  faqTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqQuestion: {
    fontWeight: '800',
    color: Palette.charcoal,
    flex: 1,
    marginRight: 8,
  },
  faqAnswer: {
    color: Palette.slateDark,
    marginTop: 10,
    lineHeight: 18,
    borderTopWidth: 1,
    borderTopColor: Palette.subtleBorder,
    paddingTop: 8,
  },
});

export default HelpSupportScreen;
