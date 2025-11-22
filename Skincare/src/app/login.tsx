import MyButton from '@/components/MyButton';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

const Login = () => {
  const router = useRouter();

  // Input states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // ---------------------------
  // Handle Login Button Press
  // ---------------------------
  const onLogin = () => {
    // Directly navigate to profile setup screen
    router.navigate('/profilesetup');
  };

  // ---------------------------
  // Navigate to Signup Page
  // ---------------------------
  const onSignupNavigate = () => {
    router.navigate('/signup');
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Image
        source={require('@/assets/images/Logo.png')}
        style={{ width: '70%', height: 300, left: 60, top: 30 }}
        resizeMode="cover"
      />

  

      <View style={{ padding: 20, gap: 10 }}>
        {/* Email Input */}
        <TextInput
          placeholder="Enter Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        {/* Password Input with Eye Icon */}
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Enter Password"
            style={styles.passwordInput}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <Pressable onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? 'eye-off' : 'eye'}
              size={22}
              color="#6a5acd"
            />
          </Pressable>
        </View>

        {/* Login Button */}
        <MyButton title="Login" onPress={onLogin} />

        {/* Signup Link */}
        <Text style={styles.text}>
          Don't Have an Account?{' '}
          <Text style={styles.text_link} onPress={onSignupNavigate}>
            Signup
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  welcomeText: {
    fontSize: 35,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    height: 50,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: 'white',
    borderColor: '#ccc',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    height: 50,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  passwordInput: {
    flex: 1,
    height: 50,
  },
  text: {
    textAlign: 'center',
    color: 'gray',
    marginTop: 20,
  },
  text_link: {
    color: '#6a5acd',
  },
});

export default Login;
