import React from 'react';
import { View, Text, StyleSheet, Image, Pressable, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import PageHeader from '@/components/PageHeader'; // ✅ Import Custom Header

const Profile = () => {
  const router = useRouter();

  const MenuItem = ({ icon, title, subtitle, route, color }: any) => (
    <Pressable 
      style={({ pressed }) => [styles.menuItem, pressed && styles.pressed]}
      onPress={() => route ? router.push(route) : null}
    >
      <View style={[styles.iconBox, { backgroundColor: color + '15' }]}> 
        <Ionicons name={icon} size={22} color={color} />
      </View>
      <View style={styles.menuTextContainer}>
        <Text style={styles.menuTitle}>{title}</Text>
        {subtitle && <Text style={styles.menuSubtitle}>{subtitle}</Text>}
      </View>
      <View style={styles.arrowBox}>
         <Ionicons name="chevron-forward" size={16} color="#b2bec3" />
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <PageHeader title="My Profile" subtitle="Account Settings" />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* User Card */}
        <View style={styles.profileCard}>
          <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.avatar} />
          <View>
            <Text style={styles.name}>John Doe</Text>
            <Text style={styles.email}>john.doe@example.com</Text>
          </View>
        </View>

        <Text style={styles.sectionHeader}>General</Text>
        <View style={styles.menuGroup}>
          <MenuItem icon="person" title="Edit Profile" subtitle="Personal Details" route="/editprofile" color="#6a5acd" />
          <MenuItem icon="settings" title="App Settings" subtitle="Notifications, Dark Mode" route="/settings" color="#f39c12" />
        </View>

        <Text style={styles.sectionHeader}>Support</Text>
        <View style={styles.menuGroup}>
          <MenuItem icon="help-buoy" title="Help & Support" route="/help" color="#3498db" />
          <MenuItem icon="shield-checkmark" title="Privacy Policy" route="/privacy" color="#2ecc71" />
          <MenuItem icon="log-out" title="Log Out" route="/logout" color="#e74c3c" />
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  scrollContent: { padding: 20, paddingBottom: 100 },

  profileCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#fff', padding: 20, borderRadius: 24,
    marginBottom: 30,
    shadowColor: '#6a5acd', shadowOpacity: 0.1, shadowOffset: { width: 0, height: 10 }, shadowRadius: 15, elevation: 10,
  },
  avatar: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#eee', marginRight: 15 },
  name: { fontSize: 20, fontWeight: 'bold', color: '#2d3436' },
  email: { fontSize: 14, color: '#a4b0be' },

  sectionHeader: { fontSize: 14, fontWeight: '700', color: '#b2bec3', marginBottom: 10, marginLeft: 10, textTransform: 'uppercase', letterSpacing: 1 },
  
  menuGroup: {
    backgroundColor: '#fff', borderRadius: 24, overflow: 'hidden', marginBottom: 25,
    shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 10, elevation: 2,
  },
  menuItem: {
    flexDirection: 'row', alignItems: 'center',
    padding: 18, borderBottomWidth: 1, borderBottomColor: '#f8f9fa',
  },
  pressed: { backgroundColor: '#fafafa' },
  iconBox: { width: 45, height: 45, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  menuTextContainer: { flex: 1 },
  menuTitle: { fontSize: 16, fontWeight: '600', color: '#2d3436' },
  menuSubtitle: { fontSize: 12, color: '#b2bec3', marginTop: 2 },
  arrowBox: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#f8f9fa', justifyContent: 'center', alignItems: 'center' },
});