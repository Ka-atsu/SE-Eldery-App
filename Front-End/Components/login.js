import React, { useState } from 'react';
import { View, TextInput, Alert, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons'; // For password visibility toggle
import { Button } from 'react-native-elements'; // Use Button from react-native-elements for better styling
import { API_URL } from '../config';

const LoginScreen = () => {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  // Handle Registration
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

      Alert.alert('Success', 'Registration Successful! Please log in.');
      setIsRegistering(false);
    } catch (error) {
      Alert.alert('Registration Failed', error.response?.data?.message || 'Something went wrong');
    }
  };

  // Handle Login
  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });

      const token = response.data.token;
      await AsyncStorage.setItem('userToken', token);
      await AsyncStorage.setItem('emergencyContact', emergencyContact || '');
      await AsyncStorage.setItem('userId', response.data.user_id.toString()); 

      Alert.alert('Login Successful');
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Login Failed', error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      {isRegistering ? (
        <>
          <Text style={styles.header}>Register</Text>
          <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
          <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
          
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Password"
              secureTextEntry={!isPasswordVisible}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)} style={styles.icon}>
              <Ionicons name={isPasswordVisible ? 'eye-off' : 'eye'} size={24} color="gray" />
            </TouchableOpacity>
          </View>

          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Confirm Password"
              secureTextEntry={!isConfirmPasswordVisible}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)} style={styles.icon}>
              <Ionicons name={isConfirmPasswordVisible ? 'eye-off' : 'eye'} size={24} color="gray" />
            </TouchableOpacity>
          </View>
          
          <TextInput
            style={styles.input}
            placeholder="Emergency Contact"
            keyboardType="phone-pad"
            value={emergencyContact}
            onChangeText={setEmergencyContact}
          />
          <Button 
            title="Register" 
            onPress={handleRegister} 
            buttonStyle={styles.buttonStyle}
            titleStyle={styles.buttonTitle}
          />
          <Text style={styles.switchText} onPress={() => setIsRegistering(false)}>
            Already have an account? Login here.
          </Text>
        </>
      ) : (
        <>
          <Text style={styles.header}>Login</Text>
          <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
          
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Password"
              secureTextEntry={!isPasswordVisible}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)} style={styles.icon}>
              <Ionicons name={isPasswordVisible ? 'eye-off' : 'eye'} size={24} color="gray" />
            </TouchableOpacity>
          </View>
          
          <Button 
            title="Login" 
            onPress={handleLogin} 
            buttonStyle={styles.buttonStyle}
            titleStyle={styles.buttonTitle}
          />
          <Text style={styles.switchText} onPress={() => setIsRegistering(true)}>
            Don't have an account? Register here.
          </Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#ffffff' },
  header: { fontSize: 24, textAlign: 'center', marginBottom: 30, fontWeight: 'bold' },
  input: { height: 45, borderColor: '#ccc', borderWidth: 1, marginBottom: 15, paddingLeft: 10, borderRadius: 8, backgroundColor: '#fff' },
  switchText: { color: '#007BFF', textAlign: 'center', marginTop: 10, fontWeight: 'bold' },
  logo: { height: 250, resizeMode: 'contain', alignSelf: 'center', marginBottom: 10 },
  passwordContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  passwordInput: { flex: 1, height: 45, borderColor: '#ccc', borderWidth: 1, paddingLeft: 10, borderRadius: 8, backgroundColor: '#fff' },
  icon: { position: 'absolute', right: 10, padding: 10 },
  buttonStyle: { backgroundColor: '#007bff', borderRadius: 8, paddingVertical: 12, paddingHorizontal: 40 },
  buttonTitle: { fontWeight: 'bold' },
});

export default LoginScreen;