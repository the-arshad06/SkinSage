import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Help = () => {
  const handleEmailSupport = () => {
    Linking.openURL('mailto:support@skincareapp.com');
  };

  const FAQItem = ({ question, answer }: { question: string, answer: string }) => (
    <View style={styles.faqItem}>
      <View style={styles.questionRow}>
        <Ionicons name="help-circle-outline" size={20} color="#6a5acd" style={{ marginTop: 2 }} />
        <Text style={styles.question}>{question}</Text>
      </View>
      <Text style={styles.answer}>{answer}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.title}>How can we help?</Text>
        <Text style={styles.subtitle}>Find answers to common questions or contact our team.</Text>
      </View>

      {/* FAQ Section */}
      <Text style={styles.sectionLabel}>Frequently Asked Questions</Text>
      
      <FAQItem 
        question="How accurate is the skin analysis?" 
        answer="Our AI model is trained on thousands of dermatological images to provide high-accuracy insights, but it should not replace professional medical advice."
      />
      <FAQItem 
        question="Can I retake my photo?" 
        answer="Yes! Just tap the camera icon on the Home screen again, or use the 'Retake' button after scanning."
      />
      <FAQItem 
        question="How do I change my profile details?" 
        answer="Go to Settings > Edit Profile to update your name, age, skin type, and other preferences."
      />

      {/* Contact Support Card */}
      <View style={styles.contactCard}>
        <Ionicons name="chatbubble-ellipses-outline" size={40} color="#fff" />
        <Text style={styles.contactTitle}>Still need help?</Text>
        <Text style={styles.contactText}>Our team is available 24/7 to assist you with any issues.</Text>
        <Pressable style={styles.contactButton} onPress={handleEmailSupport}>
          <Text style={styles.contactButtonText}>Contact Support</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default Help;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  header: { padding: 25, backgroundColor: '#fff', paddingBottom: 30 },
  title: { fontSize: 28, fontWeight: '800', color: '#2d3436', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#888', lineHeight: 22 },
  
  sectionLabel: { fontSize: 14, fontWeight: '700', color: '#b2bec3', marginTop: 25, marginBottom: 15, marginLeft: 20, textTransform: 'uppercase', letterSpacing: 1 },
  
  faqItem: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 5, elevation: 2,
  },
  questionRow: { flexDirection: 'row', gap: 10, marginBottom: 8 },
  question: { fontSize: 16, fontWeight: '600', color: '#2d3436', flex: 1 },
  answer: { fontSize: 14, color: '#636e72', lineHeight: 20, paddingLeft: 30 },

  contactCard: {
    backgroundColor: '#6a5acd',
    margin: 20,
    marginTop: 30,
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#6a5acd', shadowOpacity: 0.3, shadowRadius: 10, elevation: 8,
  },
  contactTitle: { fontSize: 20, fontWeight: 'bold', color: '#fff', marginTop: 10 },
  contactText: { fontSize: 14, color: 'rgba(255,255,255,0.8)', textAlign: 'center', marginVertical: 10, lineHeight: 20 },
  contactButton: { backgroundColor: '#fff', paddingVertical: 12, paddingHorizontal: 25, borderRadius: 30, marginTop: 10 },
  contactButtonText: { color: '#6a5acd', fontWeight: 'bold', fontSize: 16 },
});