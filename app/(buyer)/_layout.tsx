import React from 'react';
import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Palette } from '@/src/constants/theme';
import { useTheme } from '@/src/hooks/useTheme';

export default function BuyerTabLayout() {
  const { isDark } = useTheme();

  const activeColor = isDark ? Palette.secondary : Palette.primary;
  const inactiveColor = isDark ? '#64748B' : Palette.slateMedium;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: isDark ? '#141C17' : '#FFFFFF',
          borderTopColor: isDark ? '#233229' : Palette.warmBorder,
          borderTopWidth: 1,
          height: Platform.OS === 'ios' ? 88 : 65,
          paddingBottom: Platform.OS === 'ios' ? 28 : 10,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontWeight: '700',
          fontSize: 10,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Market',
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'storefront' : 'storefront-outline'}
              size={21}
              color={focused ? activeColor : inactiveColor}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="rescue"
        options={{
          title: 'Rescue Deals',
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'flash' : 'flash-outline'}
              size={21}
              color={focused ? Palette.rescueRed : inactiveColor}
            />
          ),
          tabBarActiveTintColor: Palette.rescueRed,
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: 'Farm Map',
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'map' : 'map-outline'}
              size={21}
              color={focused ? activeColor : inactiveColor}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Buyer Profile',
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'person' : 'person-outline'}
              size={21}
              color={focused ? activeColor : inactiveColor}
            />
          ),
        }}
      />
    </Tabs>
  );
}
