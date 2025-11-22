// src/app/camera.tsx
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Camera } from 'expo-camera';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import TextRecognition from 'react-native-text-recognition';

const CameraScreen = () => {
  const router = useRouter();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [recognizedText, setRecognizedText] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const cameraRef = useRef<camera | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (!cameraRef.current) return;

    const photo = await cameraRef.current.takePictureAsync({ quality: 1 });
    console.log("Captured photo URI:", photo.uri);

    setLoading(true);
    try {
      const result = await TextRecognition.recognize(photo.uri);
      const text = result.join('\n');
      console.log("Recognized Text:", text);
      setRecognizedText(text);

      // Example user profile
      const userProfile = { skinType: "Sensitive", allergies: "None" };
      const personalizedAnswer = generatePersonalizedAnswer(text, userProfile);

      router.push({
        pathname: "/personalized",
        params: { answer: personalizedAnswer },
      });
    } catch (err) {
      console.error("OCR error:", err);
      alert("Failed to recognize text from the image");
    } finally {
      setLoading(false);
    }
  };

  if (hasPermission === null) return <View><Text>Requesting camera permission...</Text></View>;
  if (hasPermission === false) return <View><Text>No access to camera</Text></View>;

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        ref={(ref) => (cameraRef.current = ref)}
        type={Camera}
      />

      <Pressable style={styles.captureButton} onPress={takePicture}>
        <Ionicons name="camera-outline" size={40} color="#fff" />
      </Pressable>

      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#6a5acd" />
          <Text>Recognizing text...</Text>
        </View>
      )}

      {recognizedText ? (
        <ScrollView style={styles.textContainer}>
          <Text style={styles.recognizedText}>{recognizedText}</Text>
        </ScrollView>
      ) : null}
    </View>
  );
};

// Personalized output builder
const generatePersonalizedAnswer = (ingredientsText: string, profile: any) => {
  return `
Detected Ingredients:\n${ingredientsText}

Skin Type: ${profile.skinType}
Allergies: ${profile.allergies}

Pros: ...
Cons: ...
Recommendations: ...
`;
};

export default CameraScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: { flex: 1 },
  captureButton: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    backgroundColor: '#6a5acd',
    borderRadius: 40,
    padding: 15,
  },
  textContainer: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
    maxHeight: 200,
    backgroundColor: 'rgba(255,255,255,0.9)',
    padding: 10,
    borderRadius: 10,
  },
  recognizedText: {
    color: '#000',
    fontSize: 14,
  },
  loading: {
    position: 'absolute',
    top: 80,
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
    padding: 15,
    borderRadius: 10,
  },
});
