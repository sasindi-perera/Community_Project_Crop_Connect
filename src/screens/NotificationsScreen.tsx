import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Palette, BorderRadius, Shadows } from '../constants/theme';
import { Header } from '../components/common/Header';
import { useResponsive } from '../hooks/useResponsive';
import { useAuth } from '../hooks/useAuth';
import { MOCK_NOTIFICATIONS, NotificationItem } from '../services/mockDataService';
import { getUserNotifications, markAllNotificationsAsRead } from '../services/firestoreService';

export const NotificationsScreen: React.FC = () => {
  const { scaleSize, scaleFont, contentPadding } = useResponsive();
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<NotificationItem[]>(MOCK_NOTIFICATIONS);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      try {
        const userId = user?.id || 'farmer_001';
        const list = await getUserNotifications(userId);
        if (isMounted && list.length > 0) {
          setNotifications(
            list.map((n) => ({
              id: n.id,
              title: n.title,
              message: n.message,
              timestamp: n.createdAt,
              read: n.isRead,
              type: n.type === 'rescue_alert' ? 'rescue_alert' : n.type === 'price_surge' ? 'price_surge' : 'deal_accepted',
            }))
          );
        }
      } catch {
        // Retain initial list
      }
    }
    load();
    return () => {
      isMounted = false;
    };
  }, [user?.id]);

  const handleMarkAllRead = async () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
    try {
      const userId = user?.id || 'farmer_001';
      await markAllNotificationsAsRead(userId);
    } catch {
      // Handled
    }
  };

  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'rescue_alert':
        return { name: 'alert-circle' as const, color: Palette.rescueRed, bg: Palette.rescueLight };
      case 'price_surge':
        return { name: 'trending-up' as const, color: Palette.leafGreen, bg: Palette.primaryTint };
      case 'inquiry':
        return { name: 'chatbubble-ellipses' as const, color: Palette.warning, bg: Palette.accentTint };
      case 'deal_accepted':
        return { name: 'checkmark-circle' as const, color: Palette.primary, bg: Palette.primaryTint };
      default:
        return { name: 'notifications' as const, color: Palette.slateMedium, bg: Palette.surfaceAlt };
    }
  };

  return (
    <View style={styles.screen}>
      <Header
        title="Notifications"
        subtitle="Market Alerts & Rescue Updates"
        showRoleBadge={false}
      />

      {/* Top Controls */}
      <View
        style={[
          styles.controlsBar,
          {
            paddingHorizontal: scaleSize(contentPadding),
            paddingVertical: scaleSize(10),
          },
        ]}
      >
        <Text style={[styles.unreadCount, { fontSize: scaleFont(13) }]}>
          {notifications.filter((n) => !n.read).length} Unread Alerts
        </Text>
        <TouchableOpacity onPress={handleMarkAllRead}>
          <Text style={[styles.markReadText, { fontSize: scaleFont(12) }]}>Mark all as read</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: scaleSize(contentPadding),
          paddingBottom: scaleSize(90),
        }}
      >
        <View style={{ gap: scaleSize(10) }}>
          {notifications.map((item) => {
            const iconConfig = getIcon(item.type);
            return (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.88}
                onPress={() => {
                  if (item.actionRoute) {
                    router.push(item.actionRoute as any);
                  }
                }}
                style={[
                  styles.notifCard,
                  !item.read && styles.notifCardUnread,
                  {
                    padding: scaleSize(14),
                    borderRadius: BorderRadius.lg,
                    ...Shadows.soft,
                  },
                ]}
              >
                <View style={styles.cardRow}>
                  <View
                    style={[
                      styles.iconCircle,
                      {
                        backgroundColor: iconConfig.bg,
                        width: scaleSize(40),
                        height: scaleSize(40),
                        borderRadius: scaleSize(20),
                      },
                    ]}
                  >
                    <Ionicons name={iconConfig.name} size={scaleSize(20)} color={iconConfig.color} />
                  </View>

                  <View style={{ flex: 1, marginLeft: 10 }}>
                    <View style={styles.notifTop}>
                      <Text
                        style={[
                          styles.notifTitle,
                          {
                            fontSize: scaleFont(14),
                            color: !item.read ? Palette.charcoal : Palette.slateDark,
                          },
                        ]}
                      >
                        {item.title}
                      </Text>
                      {!item.read && <View style={styles.unreadDot} />}
                    </View>

                    <Text style={[styles.notifMessage, { fontSize: scaleFont(12) }]}>
                      {item.message}
                    </Text>

                    <Text style={[styles.notifTime, { fontSize: scaleFont(11) }]}>
                      {item.timestamp}
                    </Text>
                  </View>
                </View>
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
  controlsBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: Palette.warmBorder,
    marginBottom: 10,
  },
  unreadCount: {
    fontWeight: '700',
    color: Palette.charcoal,
  },
  markReadText: {
    color: Palette.primary,
    fontWeight: '700',
  },
  notifCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: Palette.warmBorder,
  },
  notifCardUnread: {
    backgroundColor: '#FFFFFF',
    borderColor: Palette.primary,
    borderWidth: 1.5,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconCircle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  notifTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  notifTitle: {
    fontWeight: '800',
    flex: 1,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Palette.primary,
    marginLeft: 6,
  },
  notifMessage: {
    color: Palette.slateDark,
    lineHeight: 18,
    marginVertical: 4,
  },
  notifTime: {
    color: Palette.slateMedium,
    fontWeight: '500',
  },
});

export default NotificationsScreen;
