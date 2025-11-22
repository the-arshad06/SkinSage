import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const Privacy = () => {
  const Section = ({ title, content }: { title: string, content: string }) => (
    <View style={styles.section}>
      <Text style={styles.heading}>{title}</Text>
      <Text style={styles.text}>{content}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.intro}>
        Your privacy is important to us. This policy outlines how we handle your personal data.
      </Text>

      <Section 
        title="1. Information We Collect" 
        content="We collect information you provide directly to us, such as when you create an account, update your profile, or use our skin scanning features. This may include your name, email, and image data."
      />

      <Section 
        title="2. How We Use Your Data" 
        content="We use the information solely to provide, maintain, and improve our services. Your skin images are processed to provide analysis and are not shared with third parties for marketing purposes."
      />

      <Section 
        title="3. Data Security" 
        content="We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction."
      />

      <Section 
        title="4. Your Rights" 
        content="You have the right to access, correct, or delete your personal data at any time. You can manage these settings directly within the app's Profile section."
      />

      <View style={styles.footer}>
        <Text style={styles.footerText}>Questions? Contact us at privacy@skincareapp.com</Text>
      </View>
    </ScrollView>
  );
};

export default Privacy;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 25 },
  intro: { fontSize: 16, color: '#636e72', lineHeight: 24, marginBottom: 20, fontStyle: 'italic' },
  
  section: { marginBottom: 25 },
  heading: { fontSize: 18, fontWeight: '700', color: '#2d3436', marginBottom: 8 },
  text: { fontSize: 15, lineHeight: 24, color: '#636e72', textAlign: 'justify' },
  
  footer: { marginTop: 20, paddingTop: 20, borderTopWidth: 1, borderTopColor: '#f0f0f0' },
  footerText: { fontSize: 14, color: '#6a5acd', textAlign: 'center', fontWeight: '500' },
});