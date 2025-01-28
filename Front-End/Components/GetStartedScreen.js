import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';

const GetStartedScreen = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Welcome to Our App!</Text>
      <Text style={styles.description}>Let’s help you get started.</Text>

      <Text style={styles.stepTitle}>Step 1: Create Your Account</Text>
      <Text style={styles.stepDescription}>
        To begin, create your account by providing a username and password.
      </Text>

      <Text style={styles.stepTitle}>Step 2: Customize Your Profile</Text>
      <Text style={styles.stepDescription}>
        Add a profile picture and update your contact information.
      </Text>

      <Text style={styles.stepTitle}>Step 3: Start Exploring</Text>
      <Text style={styles.stepDescription}>
        Once you're all set, start exploring the features of the app!
      </Text>

      <Button
        title="Let's Go!"
        onPress={() => navigation.navigate('Home')} // Navigate to the Home screen
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  stepDescription: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default GetStartedScreen;