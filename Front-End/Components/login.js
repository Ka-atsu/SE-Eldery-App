import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text } from 'react-native';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); 
  const [isRegistering, setIsRegistering] = useState(false);

  const handleLogin = () => {
    if (username && password) {
      Alert.alert('Login Successful');
    } else {
      Alert.alert('Please enter both username and password');
    }
  };

  const handleRegister = () => {
    if (!username || !password || !confirmPassword) {
      Alert.alert('Please fill in all fields');
    } else if (password !== confirmPassword) {
      Alert.alert('Passwords do not match');
    } else {
      Alert.alert('Registration Successful');
    }
  };

  return (
    <View style={styles.container}>
      {/* Toggle between Login and Register forms */}
      {isRegistering ? (
        <>
          <Text style={styles.header}>Register</Text>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <Button title="Register" onPress={handleRegister} />  {/* Register Button */}
          <Text style={styles.switchText} onPress={() => setIsRegistering(false)}>
            Already have an account? Login here.
          </Text>
        </>
      ) : (
        <>
          <Text style={styles.header}>Login</Text>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <Button title="Login" onPress={handleLogin} />
          <Text style={styles.switchText} onPress={() => setIsRegistering(true)}>
            Don't have an account? Register here.
          </Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 5,
  },
  switchText: {
    color: '#007BFF',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default LoginScreen;