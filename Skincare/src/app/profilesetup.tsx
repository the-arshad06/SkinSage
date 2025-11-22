import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Pressable, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import MyButton from '@/components/MyButton';
import PageHeader from '@/components/PageHeader'; // Ensure this exists from previous steps
import { Ionicons } from '@expo/vector-icons';

const ProfileSetup = () => {
  const router = useRouter();

  // Form State
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState(''); // 'Male' | 'Female' | 'Other'
  const [skinType, setSkinType] = useState(''); // 'Normal' | 'Dry' | 'Oily' | 'Combination' | 'Sensitive'
  const [allergies, setAllergies] = useState('');
  
  // Concerns State
  const [concerns, setConcerns] = useState<{[key: string]: boolean}>({
    acne: false,
    pigmentation: false,
    aging: false,
    dryness: false,
    sensitivity: false,
    blackheads: false,
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleToggleConcern = (key: string) => {
    setConcerns(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const validateForm = () => {
    let valid = true;
    let newErrors: {[key: string]: string} = {};

    if (!name.trim()) { newErrors.name = 'Name is required'; valid = false; }
    if (!age || isNaN(Number(age)) || Number(age) > 120) { newErrors.age = 'Valid age required'; valid = false; }
    if (!gender) { newErrors.gender = 'Select a gender'; valid = false; }
    if (!skinType) { newErrors.skinType = 'Select a skin type'; valid = false; }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      Alert.alert("Missing Info", "Please fill in all required fields.");
      return;
    }

    const profileData = {
      name,
      age,
      gender,
      skinType,
      allergies,
      concerns: Object.keys(concerns).filter(key => concerns[key]),
    };

    console.log('Profile Saved:', profileData);
    // TODO: Send to backend API here
    
    // Navigate to Home after successful setup
    router.replace('/(tabs)/home');
  };

  // Reusable Selection Chip Component
  const SelectionChip = ({ label, selected, onPress }: { label: string, selected: boolean, onPress: () => void }) => (
    <Pressable 
      onPress={onPress}
      style={[styles.chip, selected && styles.chipSelected]}
    >
      <Text style={[styles.chipText, selected && styles.chipTextSelected]}>{label}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <PageHeader title="Profile Setup" subtitle="Let's get to know you" />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* 1. Personal Info Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Details</Text>
          
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            placeholder="e.g. Jane Doe"
            style={[styles.input, errors.name && styles.inputError]}
            value={name}
            onChangeText={(t) => { setName(t); setErrors({...errors, name: ''}) }}
          />

          <Text style={styles.label}>Age</Text>
          <TextInput
            placeholder="e.g. 25"
            keyboardType="numeric"
            style={[styles.input, errors.age && styles.inputError]}
            value={age}
            onChangeText={(t) => { setAge(t); setErrors({...errors, age: ''}) }}
          />

          <Text style={styles.label}>Gender</Text>
          <View style={styles.chipRow}>
            {['Male', 'Female', 'Other'].map((opt) => (
              <SelectionChip 
                key={opt} 
                label={opt} 
                selected={gender === opt} 
                onPress={() => { setGender(opt); setErrors({...errors, gender: ''}) }} 
              />
            ))}
          </View>
          {errors.gender && <Text style={styles.errorText}>{errors.gender}</Text>}
        </View>

        {/* 2. Skin Details Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skin Profile</Text>
          
          <Text style={styles.label}>Skin Type</Text>
          <View style={styles.chipGrid}>
            {['Normal', 'Dry', 'Oily', 'Combination', 'Sensitive'].map((opt) => (
              <SelectionChip 
                key={opt} 
                label={opt} 
                selected={skinType === opt} 
                onPress={() => { setSkinType(opt); setErrors({...errors, skinType: ''}) }} 
              />
            ))}
          </View>
          {errors.skinType && <Text style={styles.errorText}>{errors.skinType}</Text>}

          <Text style={styles.label}>Skin Concerns (Select all that apply)</Text>
          <View style={styles.chipGrid}>
            {Object.keys(concerns).map((key) => (
              <Pressable
                key={key}
                style={[styles.concernChip, concerns[key] && styles.concernChipSelected]}
                onPress={() => handleToggleConcern(key)}
              >
                {concerns[key] && <Ionicons name="checkmark-circle" size={16} color="#fff" style={{marginRight: 4}} />}
                <Text style={[styles.concernText, concerns[key] && styles.concernTextSelected]}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* 3. Allergies Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Medical</Text>
          <Text style={styles.label}>Allergies (Optional)</Text>
          <TextInput
            placeholder="List any skin allergies..."
            style={[styles.input, styles.textArea]}
            value={allergies}
            onChangeText={setAllergies}
            multiline
          />
        </View>

        {/* Submit Button */}
        <View style={styles.footer}>
          <MyButton title="Complete Setup" onPress={handleSubmit} />
        </View>

      </ScrollView>
    </View>
  );
};

export default ProfileSetup;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  scrollContent: { padding: 20, paddingBottom: 40 },
  
  section: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 10, elevation: 2,
  },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#2d3436', marginBottom: 15 },
  
  label: { fontSize: 14, fontWeight: '600', color: '#636e72', marginBottom: 8, marginTop: 5 },
  input: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1, borderColor: '#e1e1e1', borderRadius: 12,
    padding: 14, fontSize: 16, color: '#2d3436',
    marginBottom: 15,
  },
  inputError: { borderColor: '#ff6b6b', backgroundColor: '#fff5f5' },
  textArea: { height: 80, textAlignVertical: 'top' },
  errorText: { color: '#ff6b6b', fontSize: 12, marginTop: -10, marginBottom: 10 },

  // Chips
  chipRow: { flexDirection: 'row', gap: 10, marginBottom: 15 },
  chipGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 15 },
  
  chip: {
    paddingVertical: 10, paddingHorizontal: 20,
    borderRadius: 25,
    backgroundColor: '#f1f2f6',
    borderWidth: 1, borderColor: 'transparent',
  },
  chipSelected: {
    backgroundColor: '#ece9fc',
    borderColor: '#6a5acd',
  },
  chipText: { color: '#636e72', fontWeight: '600' },
  chipTextSelected: { color: '#6a5acd', fontWeight: '700' },

  // Concern Chips
  concernChip: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 10, paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
    borderWidth: 1, borderColor: '#e1e1e1',
  },
  concernChipSelected: {
    backgroundColor: '#6a5acd',
    borderColor: '#6a5acd',
  },
  concernText: { color: '#636e72', fontSize: 14 },
  concernTextSelected: { color: '#fff', fontWeight: '600' },

  footer: { marginTop: 10, marginBottom: 20 },
});