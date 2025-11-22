import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, Platform, StyleSheet } from 'react-native';

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: Platform.OS === 'ios' ? 30 : 20,
          left: 20,
          right: 20,
          backgroundColor: '#ffffff',
          borderRadius: 30,
          height: 70,
          ...styles.shadow,
          borderTopWidth: 0,
          paddingBottom: 0,
        },
      }}
    >
      {/* 1. HISTORY (Left) */}
      <Tabs.Screen
        name="history"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabItem}>
              <Ionicons 
                name={focused ? "time" : "time-outline"} 
                size={26} 
                color={focused ? '#6a5acd' : '#b2bec3'} 
              />
              <Text style={[styles.tabLabel, focused && styles.activeLabel]}>History</Text>
            </View>
          ),
        }}
      />

      {/* 2. SCAN (Center - Floating Big Button) */}
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.fabContainer}>
              <View style={[styles.fab, focused && styles.fabFocused]}>
                <Ionicons name="scan" size={32} color="#fff" />
              </View>
            </View>
          ),
        }}
      />

      {/* 3. PROFILE (Right) */}
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabItem}>
              <Ionicons 
                name={focused ? "person" : "person-outline"} 
                size={26} 
                color={focused ? '#6a5acd' : '#b2bec3'} 
              />
              <Text style={[styles.tabLabel, focused && styles.activeLabel]}>Profile</Text>
            </View>
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    top: Platform.OS === 'ios' ? 10 : 0, // Adjust alignment
  },
  tabLabel: {
    fontSize: 10,
    marginTop: 4,
    color: '#b2bec3',
    fontWeight: '600',
  },
  activeLabel: {
    color: '#6a5acd',
    fontWeight: 'bold',
  },
  // Floating Action Button (Center)
  fabContainer: {
    top: -25, // Float above the bar
    alignItems: 'center',
    justifyContent: 'center',
  },
  fab: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    backgroundColor: '#6a5acd',
    alignItems: 'center',
    justifyContent: 'center',
    // Add Glow/Shadow
    shadowColor: '#6a5acd',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 10,
    borderWidth: 4,
    borderColor: '#f8f9fa', // Match background color to create "cutout" effect
  },
  fabFocused: {
    backgroundColor: '#5842c3', // Darker when active
    transform: [{ scale: 1.05 }], // Slight grow effect
  },
});