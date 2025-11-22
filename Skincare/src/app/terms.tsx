import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const Terms = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.lastUpdated}>Last Updated: November 2025</Text>
      
      <Text style={styles.heading}>1. Introduction</Text>
      <Text style={styles.paragraph}>
        Welcome to our application. By accessing or using our app, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must strictly not use our services.
      </Text>

      <Text style={styles.heading}>2. User Responsibilities</Text>
      <Text style={styles.paragraph}>
        You are responsible for maintaining the confidentiality of your account credentials. You agree to accept responsibility for all activities that occur under your account.
      </Text>
      <View style={styles.bulletPoint}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.bulletText}>You must be at least 13 years old to use this service.</Text>
      </View>
      <View style={styles.bulletPoint}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.bulletText}>You agree not to misuse our scanning technology for illegal purposes.</Text>
      </View>

      <Text style={styles.heading}>3. Intellectual Property</Text>
      <Text style={styles.paragraph}>
        All content, features, and functionality (including but not limited to all information, software, text, displays, images, video, and audio) are owned by us and are protected by international copyright, trademark, and other intellectual property laws.
      </Text>

      <Text style={styles.heading}>4. Termination</Text>
      <Text style={styles.paragraph}>
        We may terminate or suspend access to our service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
      </Text>

      <Text style={styles.heading}>5. Changes to Terms</Text>
      <Text style={styles.paragraph}>
        We reserve the right to modify or replace these Terms at any time. What constitutes a material change will be determined at our sole discretion.
      </Text>

      {/* Bottom Padding */}
      <View style={{ height: 40 }} />
    </ScrollView>
  );
};

export default Terms;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 25 },
  lastUpdated: { fontSize: 12, color: '#888', marginBottom: 20, fontStyle: 'italic' },
  heading: { fontSize: 18, fontWeight: '700', color: '#2d3436', marginTop: 20, marginBottom: 10 },
  paragraph: { fontSize: 15, lineHeight: 24, color: '#636e72', marginBottom: 10 },
  bulletPoint: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8, paddingLeft: 10 },
  bullet: { fontSize: 16, color: '#6a5acd', marginRight: 10, marginTop: 2 },
  bulletText: { fontSize: 15, lineHeight: 22, color: '#636e72', flex: 1 },
});