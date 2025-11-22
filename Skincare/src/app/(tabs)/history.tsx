import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl, Pressable } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { HistoryService, HistoryItem } from '@/services/HistoryService';
import PageHeader from '@/components/PageHeader'; // ✅ Import Custom Header

const History = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const loadData = async () => {
    setLoading(true);
    const data = await HistoryService.getHistory();
    setHistory(data);
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  return (
    <View style={styles.container}>
      {/* ✅ Consistent Header */}
      <PageHeader title="Scan History" subtitle="Your Records" />

      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={loadData} colors={['#6a5acd']} />}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <View style={styles.emptyIconBg}>
              <Ionicons name="document-text-outline" size={40} color="#ccc" />
            </View>
            <Text style={styles.emptyTitle}>No Scans Yet</Text>
            <Text style={styles.emptyText}>Your analysis results will appear here.</Text>
          </View>
        }
        renderItem={({ item }) => (
          <Pressable 
            style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
            onPress={() => router.push({ pathname: '/history-detail', params: { date: item.date, content: item.content } })}
          >
            <View style={styles.cardHeader}>
              <View style={styles.dateBadge}>
                <Ionicons name="calendar" size={12} color="#fff" />
                <Text style={styles.dateText}>{item.date}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#cbd5e0" />
            </View>
            <Text numberOfLines={2} style={styles.content}>{item.content}</Text>
          </Pressable>
        )}
      />
    </View>
  );
};

export default History;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  listContent: { padding: 20, paddingBottom: 100 }, // Space for floating tab bar
  
  // Card Styles
  card: { 
    backgroundColor: '#fff', 
    padding: 20, 
    borderRadius: 20, 
    marginBottom: 15, 
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#f1f2f6',
  },
  cardPressed: { transform: [{ scale: 0.98 }] },
  
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  dateBadge: { 
    flexDirection: 'row', alignItems: 'center', gap: 6, 
    backgroundColor: '#6a5acd', paddingVertical: 6, paddingHorizontal: 12, 
    borderRadius: 20 
  },
  dateText: { color: '#fff', fontWeight: '700', fontSize: 12 },
  content: { color: '#4a4a4a', fontSize: 15, lineHeight: 22 },

  // Empty State
  emptyState: { alignItems: 'center', marginTop: 80 },
  emptyIconBg: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#f0f0f0', justifyContent: 'center', alignItems: 'center', marginBottom: 15 },
  emptyTitle: { fontSize: 18, fontWeight: 'bold', color: '#2d3436', marginBottom: 5 },
  emptyText: { color: '#a4b0be', fontSize: 14 },
});