import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import PageHeader from '@/components/PageHeader';
import MyButton from '@/components/MyButton';

const EditProfile = () => {
  const router = useRouter();
  // ... (Keep your existing state logic here)
  const [name, setName] = useState('John Doe');
  const [age, setAge] = useState('25');
  const [gender, setGender] = useState('Male');
  const [skinType, setSkinType] = useState('Normal');
  const [allergies, setAllergies] = useState('');
  
  // Placeholder logic
  const handleSave = () => router.back();

  const InputField = ({ label, value, onChange, placeholder, multiline = false }: any) => (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, multiline && { height: 100, textAlignVertical: 'top' }]}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        multiline={multiline}
        placeholderTextColor="#ccc"
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <PageHeader title="Edit Profile" subtitle="Update Info" showBack />

      <ScrollView contentContainerStyle={styles.form}>
        <InputField label="Full Name" value={name} onChange={setName} placeholder="Enter your name" />
        <View style={styles.row}>
          <View style={{ flex: 1, marginRight: 10 }}>
            <InputField label="Age" value={age} onChange={setAge} placeholder="25" />
          </View>
          <View style={{ flex: 1 }}>
            <InputField label="Gender" value={gender} onChange={setGender} placeholder="Male" />
          </View>
        </View>
        <InputField label="Skin Type" value={skinType} onChange={setSkinType} placeholder="e.g. Oily, Dry" />
        <InputField label="Allergies" value={allergies} onChange={setAllergies} placeholder="List any allergies..." multiline />

        <View style={{ marginTop: 20 }}>
          <MyButton title="Save Changes" onPress={handleSave} />
        </View>
      </ScrollView>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  form: { padding: 25, paddingBottom: 50 },
  
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: '700', color: '#636e72', marginBottom: 8 },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1, borderColor: '#dfe6e9', borderRadius: 12,
    padding: 15, fontSize: 16, color: '#2d3436',
    shadowColor: '#000', shadowOpacity: 0.02, shadowRadius: 4, elevation: 1,
  },
  row: { flexDirection: 'row' },
});