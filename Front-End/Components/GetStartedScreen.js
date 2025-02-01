import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const GetStartedScreen = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* App Introduction */}
      <Text style={styles.header}>Welcome! SeniorReach is an emergency app for elderly.</Text>
      <Text style={styles.description}>Let’s help you get started with setting up your account and understanding key features.</Text>

      {/* Step 1: Creating Account */}
      <Text style={styles.stepTitle}>Step 1: Create Your Account</Text>
      <Text style={styles.stepDescription}>
        To begin, create your account by providing a username, email, emergency contact, and password. 
        This is crucial as we will use your emergency contact for notifications in case of emergencies.
      </Text>

      {/* Step 2: Understanding Key Functionalities */}
      <Text style={styles.stepTitle}>Step 2: Key Features of SeniorReach</Text>
      <Text style={styles.stepDescription}>
        SeniorReach offers key emergency functionalities to ensure your safety:
      </Text>

      <Text style={styles.feature}>• <Text style={styles.bold}>Notify Others</Text>: With just a click, you can send a message to your emergency contacts, letting them know you need help.</Text>
      <Text style={styles.feature}>• <Text style={styles.bold}>Emergency Button</Text>: A quick emergency button that alerts your contacts.</Text>

      <Text style={styles.stepTitle}>Step 3: Customize Your Profile (optional)</Text>
      <Text style={styles.stepDescription}>
        Add a profile picture, update your name, and make sure your contact information is up-to-date.
      </Text>

      {/* Get Started Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.buttonText}>Let's Get Started!</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 30,
    backgroundColor: '#ffffff',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#4b6a9b',
  },
  description: {
    fontSize: 18,
    marginBottom: 25,
    textAlign: 'center',
    color: '#555',
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 25,
    color: '#333',
  },
  stepDescription: {
    fontSize: 18,
    marginBottom: 15,
    color: '#666',
  },
  feature: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333',
  },
  bold: {
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 40,
    alignItems: 'center',
    elevation: 5, // Shadow effect
  },
  buttonText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default GetStartedScreen;