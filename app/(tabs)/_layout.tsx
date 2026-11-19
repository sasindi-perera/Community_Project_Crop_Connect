import React from 'react';
import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Palette } from '@/src/constants/theme';
import { useTheme } from '@/src/hooks/useTheme';

export default function TabLayout() {
  const { isDark } = useTheme();

  const activeColor = isDark ? Palette.sageGreen : Palette.forestGreen;
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
          fontSize: 11,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Market',
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'leaf' : 'leaf-outline'}
              size={22}
              color={focused ? activeColor : inactiveColor}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="rescue"
        options={{
          title: 'Rescue Hub',
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'flash' : 'flash-outline'}
              size={22}
              color={focused ? Palette.rescueRed : inactiveColor}
            />
          ),
          tabBarActiveTintColor: Palette.rescueRed,
        }}
      />
      <Tabs.Screen
        name="advisor"
        options={{
          title: 'AI Advisor',
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'sparkles' : 'sparkles-outline'}
              size={22}
              color={focused ? activeColor : inactiveColor}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'person' : 'person-outline'}
              size={22}
              color={focused ? activeColor : inactiveColor}
            />
          ),
        }}
      />
    </Tabs>
  );
}
