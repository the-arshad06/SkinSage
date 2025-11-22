import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const HistoryDetail = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  // Safely extract strings to avoid rendering issues
  const date = Array.isArray(params.date) ? params.date[0] : params.date;
  const content = Array.isArray(params.content) ? params.content[0] : params.content;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </Pressable>
        <Text style={styles.headerTitle}>Result Details</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.dateContainer}>
          <Ionicons name="calendar-outline" size={16} color="#6a5acd" />
          <Text style={styles.dateText}>{date || 'Unknown Date'}</Text>
        </View>

        <View style={styles.contentCard}>
          <Text style={styles.label}>Analysis Result:</Text>
          <Text style={styles.contentText}>{content || 'No details available.'}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default HistoryDetail;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  backButton: { padding: 5 },
  
  scrollContent: { padding: 20 },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    gap: 8,
  },
  dateText: { fontSize: 14, color: '#666', fontWeight: '500' },
  
  contentCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  label: { fontSize: 14, fontWeight: 'bold', color: '#6a5acd', marginBottom: 10 },
  contentText: { fontSize: 16, lineHeight: 24, color: '#2d3436' },
});