import { Stack } from "expo-router";
import React from 'react';

const _layout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" />
        <Stack.Screen name="signup" />
        <Stack.Screen name="(tabs)" />
        
        {/* ✅ Add Settings Screen with Header */}
        <Stack.Screen 
          name="settings" 
          options={{ 
            headerShown: true, 
            title: 'Settings',
            headerBackTitle: 'Back',
            headerTintColor: '#2d3436',
            headerStyle: { backgroundColor: '#fff' }
          }} 
        />
        
        <Stack.Screen 
          name="personalized" 
          options={{ 
            headerShown: true, 
            title: 'Result', 
            headerTintColor: '#2d3436' 
          }} 
        />
        <Stack.Screen name="history-detail" options={{ headerShown: false }} />
    </Stack>
  );
}

export default _layout;