// src/app/personalized.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { HistoryService } from '../services/HistoryService'; // Import the service

const Personalized = () => {
  const { answer } = useLocalSearchParams();
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!answer) return;

    setSaving(true);
    // Calls the service (Future Backend Call)
    await HistoryService.addHistoryItem(answer as string);
    setSaving(false);

    // Navigate to history
    router.replace('/(tabs)/history');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Your Personalized Answer</Text>
      <Text style={styles.answer}>{answer}</Text>

      <Pressable style={styles.button} onPress={handleSave} disabled={saving}>
        {saving ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Save & View History</Text>
        )}
      </Pressable>
    </ScrollView>
  );
};

export default Personalized;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  answer: { fontSize: 16, lineHeight: 24, marginBottom: 30 },
  button: { backgroundColor: '#6a5acd', padding: 15, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
});