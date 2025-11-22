import React, { useState, useCallback } from 'react';
import { 
  View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator, 
  Alert, TouchableWithoutFeedback 
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useFocusEffect } from 'expo-router';

// ⚠️ Keep your API Key here
const GOOGLE_CLOUD_VISION_API_KEY = 'AIzaSyDiPdKQ-SYsdHT9dk_6fOcR3TwFsI6yZ5U'; 

const Home = () => {
  const router = useRouter();
  const [photo, setPhoto] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false); 

  // Reset loading state when screen is focused
  useFocusEffect(
    useCallback(() => {
      setLoading(false);
      setMenuVisible(false);
    }, [])
  );

  // --- 1. CAMERA & PERMISSION LOGIC ---
  const handleScanPress = async () => {
    // Request Permission explicitly
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert(
        'Permission Denied', 
        'We need camera access to scan ingredients. Please enable it in your settings.'
      );
      return;
    }

    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
        base64: true,
      });

      if (!result.canceled && result.assets?.[0]) {
        setPhoto(result.assets[0].uri);
        // Auto-process the image
        processImage(result.assets[0].base64); 
      }
    } catch (error) {
      console.error('Camera error:', error);
      Alert.alert('Error', 'Failed to open camera.');
    }
  };

  const processImage = async (base64: string | null | undefined) => {
    if (!base64) return;
    setLoading(true);

    try {
      const response = await fetch(
        `https://vision.googleapis.com/v1/images:annotate?key=${GOOGLE_CLOUD_VISION_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            requests: [{ image: { content: base64 }, features: [{ type: 'TEXT_DETECTION' }] }],
          }),
        }
      );

      const data = await response.json();
      const detectedText = data.responses?.[0]?.fullTextAnnotation?.text;

      if (detectedText) {
        router.push({ pathname: '/personalized', params: { answer: detectedText } });
      } else {
        Alert.alert('No Text', 'No ingredients detected. Please Retake.');
        setLoading(false);
      }
    } catch (error) {
      Alert.alert('Error', 'Could not analyze image.');
      setLoading(false);
    }
  };

  // --- NAVIGATION HANDLERS ---
  const navigateTo = (route: string) => {
    setMenuVisible(false);
    if (route === 'profile') router.push('/(tabs)/profile');
    if (route === 'skin') router.push('/editprofile'); 
    if (route === 'settings') router.push('/settings'); 
  };

  return (
    <View style={styles.container}>
      
      {/* --- 2. CUSTOM HEADER --- */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)}>
            <Image 
              source={require('@/assets/images/Logo.png')} 
              style={styles.logo} 
              resizeMode="contain"
            />
          </TouchableOpacity>
          <View>
            <Text style={styles.welcomeSmall}>Hello, User!</Text>
            <Text style={styles.welcomeBig}>Let's Scan.</Text>
          </View>
        </View>
      </View>

      {/* --- 3. DROPDOWN MENU --- */}
      {menuVisible && (
        <>
          <TouchableWithoutFeedback onPress={() => setMenuVisible(false)}>
            <View style={styles.modalOverlay} />
          </TouchableWithoutFeedback>
          
          <View style={styles.dropdownMenu}>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('profile')}>
              <Ionicons name="person-circle-outline" size={20} color="#444" />
              <Text style={styles.menuText}>Profile</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('skin')}>
              <Ionicons name="color-wand-outline" size={20} color="#444" />
              <Text style={styles.menuText}>Your Skin Data</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('settings')}>
              <Ionicons name="settings-outline" size={20} color="#444" />
              <Text style={styles.menuText}>Settings</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {/* --- MAIN CONTENT --- */}
      <View style={styles.content}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <Image source={{ uri: photo || '' }} style={styles.previewImage} />
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color="#fff" />
              <Text style={styles.loadingText}>Analyzing...</Text>
            </View>
          </View>
        ) : (
          <>
            <TouchableOpacity style={styles.scanButton} onPress={handleScanPress}>
              <View style={styles.iconCircle}>
                <Ionicons name="camera" size={45} color="#6a5acd" />
              </View>
              <Text style={styles.scanText}>{photo ? 'Scan New' : 'Tap to Scan'}</Text>
            </TouchableOpacity>

            {/* --- 4. RETAKE OPTION --- */}
            {photo && (
              <TouchableOpacity style={styles.retakeButton} onPress={() => setPhoto(null)}>
                <Ionicons name="refresh" size={18} color="#6a5acd" />
                <Text style={styles.retakeText}>Clear / Retake</Text>
              </TouchableOpacity>
            )}
          </>
        )}
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa', paddingTop: 50 },
  
  header: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 10, 
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 15 },
  logo: { width: 50, height: 50, borderRadius: 25, borderWidth: 2, borderColor: '#eee' },
  welcomeSmall: { fontSize: 14, color: '#888', fontWeight: '600' },
  welcomeBig: { fontSize: 20, color: '#2d3436', fontWeight: 'bold' },

  modalOverlay: {
    position: 'absolute', top: 0, bottom: 0, left: 0, right: 0,
    zIndex: 20,
  },
  dropdownMenu: {
    position: 'absolute',
    top: 110, 
    left: 25,
    width: 180,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 10,
    zIndex: 30,
  },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 15, gap: 10 },
  menuText: { fontSize: 14, color: '#333', fontWeight: '500' },
  divider: { height: 1, backgroundColor: '#f0f0f0', marginHorizontal: 10 },

  content: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingBottom: 80 },
  scanButton: {
    width: 220, height: 220, backgroundColor: '#fff', borderRadius: 110,
    justifyContent: 'center', alignItems: 'center',
    shadowColor: '#6a5acd', shadowOpacity: 0.15, shadowRadius: 20, elevation: 8,
  },
  iconCircle: {
    width: 90, height: 90, backgroundColor: '#f3f0ff', borderRadius: 45,
    justifyContent: 'center', alignItems: 'center', marginBottom: 15,
  },
  scanText: { fontSize: 18, fontWeight: 'bold', color: '#6a5acd' },

  retakeButton: {
    marginTop: 30, flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: '#fff', paddingVertical: 10, paddingHorizontal: 20,
    borderRadius: 30, borderWidth: 1, borderColor: '#eee',
  },
  retakeText: { color: '#6a5acd', fontWeight: '600' },

  loadingContainer: { width: 250, height: 350, borderRadius: 20, overflow: 'hidden' },
  previewImage: { width: '100%', height: '100%' },
  loadingOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center' },
  loadingText: { color: '#fff', marginTop: 15, fontSize: 16, fontWeight: '600' },
});