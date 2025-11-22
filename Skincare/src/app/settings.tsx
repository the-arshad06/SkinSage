import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, Pressable, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const Settings = () => {
  const router = useRouter();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', style: 'destructive', onPress: () => router.replace('/login') },
    ]);
  };

  const SettingItem = ({ icon, title, type = 'link', value, onToggle, route, color = '#333' }: any) => (
    <Pressable 
      style={({ pressed }) => [styles.item, pressed && type === 'link' && { backgroundColor: '#f5f5f5' }]} 
      onPress={() => type === 'link' && route ? router.push(route) : null}
    >
      <View style={styles.itemLeft}>
        <View style={[styles.iconContainer, { backgroundColor: color + '15' }]}>
          <Ionicons name={icon} size={20} color={color} />
        </View>
        <Text style={styles.itemText}>{title}</Text>
      </View>
      
      {type === 'toggle' ? (
        <Switch 
          trackColor={{ false: '#767577', true: '#6a5acd' }}
          thumbColor={'#f4f3f4'}
          onValueChange={onToggle}
          value={value}
        />
      ) : (
        <Ionicons name="chevron-forward" size={20} color="#ccc" />
      )}
    </Pressable>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Account Section */}
      <Text style={styles.sectionTitle}>Account</Text>
      <View style={styles.section}>
        <SettingItem icon="person-outline" title="Edit Profile" route="/editprofile" color="#6a5acd" />
        <SettingItem icon="shield-checkmark-outline" title="Privacy Policy" route="/privacy" color="#2ecc71" />
      </View>

      {/* Preferences Section */}
      <Text style={styles.sectionTitle}>Preferences</Text>
      <View style={styles.section}>
        <SettingItem 
          icon="notifications-outline" 
          title="Notifications" 
          type="toggle" 
          value={notifications} 
          onToggle={setNotifications} 
          color="#f39c12"
        />
        <SettingItem 
          icon="moon-outline" 
          title="Dark Mode" 
          type="toggle" 
          value={darkMode} 
          onToggle={setDarkMode} 
          color="#34495e"
        />
      </View>

      {/* Support Section */}
      <Text style={styles.sectionTitle}>Support</Text>
      <View style={styles.section}>
        <SettingItem icon="help-circle-outline" title="Help & Support" route="/help" color="#3498db" />
        <SettingItem icon="document-text-outline" title="Terms of Service" route="/terms" color="#9b59b6" />
      </View>

      {/* Logout Button */}
      <Pressable style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Log Out</Text>
      </Pressable>

      <Text style={styles.version}>Version 1.0.0</Text>
    </ScrollView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa', padding: 20 },
  sectionTitle: { fontSize: 14, fontWeight: 'bold', color: '#888', marginBottom: 10, marginTop: 10, marginLeft: 5 },
  section: { backgroundColor: '#fff', borderRadius: 12, overflow: 'hidden', marginBottom: 20, elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5 },
  item: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 15, paddingHorizontal: 15, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  itemLeft: { flexDirection: 'row', alignItems: 'center', gap: 15 },
  iconContainer: { width: 35, height: 35, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  itemText: { fontSize: 16, color: '#333', fontWeight: '500' },
  logoutButton: { marginTop: 10, backgroundColor: '#ffeaea', padding: 15, borderRadius: 12, alignItems: 'center' },
  logoutText: { color: '#e74c3c', fontWeight: 'bold', fontSize: 16 },
  version: { textAlign: 'center', color: '#ccc', marginTop: 30, fontSize: 12 },
});