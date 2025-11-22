import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const Logout = () => {
  const router = useRouter();

  const handleConfirm = () => {
    // Perform cleanup tasks here (e.g., clear tokens)
    router.replace('/login');
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.iconContainer}>
          <Ionicons name="log-out" size={40} color="#ff6b6b" style={{ marginLeft: 5 }} />
        </View>
        
        <Text style={styles.title}>Log Out?</Text>
        <Text style={styles.message}>
          Are you sure you want to log out?{"\n"}You will need to sign in again to access your data.
        </Text>

        <View style={styles.buttonContainer}>
          <Pressable style={styles.cancelButton} onPress={handleCancel}>
            <Text style={styles.cancelText}>Cancel</Text>
          </Pressable>
          
          <Pressable style={styles.logoutButton} onPress={handleConfirm}>
            <Text style={styles.logoutText}>Log Out</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Logout;

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent background effect
    justifyContent: 'center', 
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    width: '100%',
    maxWidth: 340,
    borderRadius: 24,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  iconContainer: {
    width: 80,
    height: 80,
    backgroundColor: '#ffeaea',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: { fontSize: 22, fontWeight: '800', color: '#2d3436', marginBottom: 10 },
  message: { fontSize: 15, color: '#636e72', textAlign: 'center', lineHeight: 22, marginBottom: 30 },
  
  buttonContainer: { flexDirection: 'row', gap: 15, width: '100%' },
  cancelButton: { flex: 1, paddingVertical: 14, borderRadius: 12, backgroundColor: '#f1f2f6', alignItems: 'center' },
  cancelText: { fontSize: 16, fontWeight: '600', color: '#2d3436' },
  
  logoutButton: { flex: 1, paddingVertical: 14, borderRadius: 12, backgroundColor: '#ff6b6b', alignItems: 'center' },
  logoutText: { fontSize: 16, fontWeight: '600', color: '#fff' },
});