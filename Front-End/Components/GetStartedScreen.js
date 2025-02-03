import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const GetStartedScreen = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* App Introduction */}
      <Text style={styles.header}>Welcome! SeniorReach is an emergency app for elderly.</Text>
      <Text style={styles.description}>
        Let’s help you get started with setting up your account and understanding key features.
      </Text>

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

      <Text style={styles.feature}>• <Text style={styles.bold}>Notify Others</Text>: Send a message to your emergency contact with one click to let them know you need help.</Text>
      <Text style={styles.feature}>• <Text style={styles.bold}>Emergency Button</Text>: A quick emergency button that alerts your contact instantly.</Text>

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
    fontSize: 32,  // Increased font size for better readability
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#2C3E50',  // Darker blue for high contrast
  },
  description: {
    fontSize: 20,  // Larger font size
    marginBottom: 30,
    textAlign: 'center',
    color: '#555',
  },
  stepTitle: {
    fontSize: 24,  // Larger font size for section titles
    fontWeight: 'bold',
    marginTop: 30,
    color: '#333',
  },
  stepDescription: {
    fontSize: 20,  // Larger font size
    marginBottom: 20,
    color: '#666',
  },
  feature: {
    fontSize: 20,  // Larger font size
    marginBottom: 15,
    color: '#333',
  },
  bold: {
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#4CAF50',  // Green for positive action
    paddingVertical: 20,
    paddingHorizontal: 60,  // Wider buttons for easier tapping
    borderRadius: 12,
    marginTop: 50,  // More space to separate the button
    alignItems: 'center',
    elevation: 5,  // Shadow effect for button
  },
  buttonText: {
    fontSize: 24,  // Larger button text
    fontWeight: 'bold',
    color: 'white',
  },
});

export default GetStartedScreen;