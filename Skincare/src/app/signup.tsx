import MyButton from '@/components/MyButton';
import { Ionicons } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

// --- Validation Regex ---
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Signup = () => {
  const router = useRouter();

  // --- Add state for Name ---
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');

  // States for inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChecked, setChecked] = useState(false);

  // States for errors
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [generalError, setGeneralError] = useState('');

  // States for showing/hiding password
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // --- Helper function to validate form ---
  const validateForm = () => {
    let isValid = true;
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');
    setGeneralError('');

    if (!EMAIL_REGEX.test(email)) {
      setEmailError('Enter a valid email');
      isValid = false;
    }

    if (!PASSWORD_REGEX.test(password)) {
      setPasswordError('Password must have 8 chars, uppercase, lowercase, number, special char');
      isValid = false;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      isValid = false;
    }

    if (!isChecked) {
      setGeneralError('You must agree to Terms & Conditions');
      isValid = false;
    }

    return isValid;
  };

  const onSignup = async () => {
    if (!validateForm()) {
      setGeneralError('Please fix the errors above to continue.');
      return;
    }

    try {
      // 1️⃣ Send POST request to backend
      const response = await fetch('https://madad-c0ci.onrender.com/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, terms: true}),
      });

      // 2️⃣ Convert response to JSON
      const data = await response.json();

      // 3️⃣ Handle backend response
      if (data.success) {
        setGeneralError('Sign up successful! Redirecting...');
        setTimeout(() => router.navigate('/login'), 500);
      } else {
        setGeneralError(data.message || 'Signup failed. Try again.');
      }
    } catch (error) {
      setGeneralError('Network error. Please try again.');
      console.error(error);
    }
  };


  const onTerms = () => router.navigate('/terms');

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Image
        source={require('@/assets/images/Logo.png')}
        style={{ width: '70%', height: 300, left: 60, top: 30 }}
        resizeMode="cover"
      />

      <View style={{ padding: 20, gap: 10 }}>
        {/* General error/success message */}
        {generalError ? (
          <Text
            style={{
              color: generalError.includes('successful') ? 'green' : 'red',
              marginBottom: 5,
            }}
          >
            {generalError}
          </Text>
        ) : null}

        <TextInput
          placeholder="Enter Name"
          style={[styles.input, nameError ? styles.inputError : {}]}
          value={name}
          onChangeText={(e) => {
            setName(e);
            setNameError('');
          }}
        />
        {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}

        {/* Email input */}
        <TextInput
          placeholder="Enter Email"
          style={[styles.input, emailError ? styles.inputError : {}]}
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setEmailError('');
          }}
          keyboardType="email-address"
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

        {/* Password input with eye icon */}
        <View style={[styles.passwordContainer, passwordError ? styles.inputError : {}]}>
          <TextInput
            placeholder="Enter Password"
            secureTextEntry={!showPassword}
            style={styles.passwordInput}
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setPasswordError('');
            }}
          />
          <Pressable onPress={() => setShowPassword(!showPassword)}>
            <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={22} color="#6a5acd" />
          </Pressable>
        </View>
        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

        {/* Confirm password input */}
        <View style={[styles.passwordContainer, confirmPasswordError ? styles.inputError : {}]}>
          <TextInput
            placeholder="Confirm Password"
            secureTextEntry={!showConfirmPassword}
            style={styles.passwordInput}
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text);
              setConfirmPasswordError('');
            }}
          />
          <Pressable onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
            <Ionicons name={showConfirmPassword ? 'eye-off' : 'eye'} size={22} color="#6a5acd" />
          </Pressable>
        </View>
        {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}

        {/* Checkbox */}
        <View style={styles.checkboxContainer}>
          <Checkbox
            value={isChecked}
            onValueChange={setChecked}
            color={isChecked ? '#77c4f7ff' : undefined}
            style={styles.checkbox}
          />
          <Text style={styles.checkboxLabel}>
            I agree to the{' '}
            <Text style={styles.termsLink} onPress={onTerms}>
              Terms & Conditions
            </Text>
          </Text>
        </View>

        {/* Signup Button */}
        <MyButton
          title="Signup"
          onPress={onSignup}
          disabled={!isChecked || !email || !password || !confirmPassword}
        />
      </View>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    height: 50,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderColor: '#ccc',
    backgroundColor: 'white',
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 5,
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
    marginTop: 5,
  },
  passwordInput: {
    flex: 1,
    height: 50,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  checkbox: {
    marginRight: 8,
    borderRadius: 3,
  },
  checkboxLabel: {
    fontSize: 14,
  },
  termsLink: {
    color: '#6a5acd',
    textDecorationLine: 'underline',
  },
});
