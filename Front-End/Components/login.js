import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://192.168.18.81:8000/api'; // Replace with your correct local IP

const LoginScreen = () => {
  const navigation = useNavigation(); // Enable navigation

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  // ✅ Handle Registration
  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword || !emergencyContact) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}/register`,
        {
          name,
          email,
          password,
          password_confirmation: confirmPassword,
          emergency_contact: emergencyContact,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        }
      );

      console.log('Registration Success:', response.data);
      Alert.alert('Success', 'Registration Successful! Please log in.');

      // ✅ Switch to Login Screen after registration
      setIsRegistering(false);
    } catch (error) {
      console.log('Error Response:', error.response);
      Alert.alert(
        'Registration Failed',
        error.response?.data?.message || JSON.stringify(error.response?.data) || 'Something went wrong'
      );
    }
  };

  // ✅ Handle Login
  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });

      const token = response.data.token;

      await AsyncStorage.setItem('userToken', token); // ✅ Save token for later use

      Alert.alert('Login Successful');

      // ✅ Navigate to Home after login
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert(
        'Login Failed',
        error.response?.data?.message || 'Something went wrong'
      );
    }
  };

  return (
    <View style={styles.container}>
      {isRegistering ? (
        <>
          <Text style={styles.header}>Register</Text>
          <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
          <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
          <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
          <TextInput style={styles.input} placeholder="Confirm Password" secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} />
          <TextInput style={styles.input} placeholder="Emergency Contact" keyboardType="phone-pad" value={emergencyContact} onChangeText={setEmergencyContact} />
          <Button title="Register" onPress={handleRegister} />
          <Text style={styles.switchText} onPress={() => setIsRegistering(false)}>Already have an account? Login here.</Text>
        </>
      ) : (
        <>
          <Text style={styles.header}>Login</Text>
          <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
          <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
          <Button title="Login" onPress={handleLogin} />
          <Text style={styles.switchText} onPress={() => setIsRegistering(true)}>Don't have an account? Register here.</Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#f5f5f5' },
  header: { fontSize: 24, textAlign: 'center', marginBottom: 30, fontWeight: 'bold' },
  input: { height: 45, borderColor: '#ccc', borderWidth: 1, marginBottom: 15, paddingLeft: 10, borderRadius: 8, backgroundColor: '#fff' },
  switchText: { color: '#007BFF', textAlign: 'center', marginTop: 10, fontWeight: 'bold' },
});

export default LoginScreen;