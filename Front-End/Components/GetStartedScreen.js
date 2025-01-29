import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';

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

      <Text style={styles.stepTitle}>Step 3: Customize Your Profile</Text>
      <Text style={styles.stepDescription}>
        Add a profile picture, update your name, and make sure your contact information is up-to-date. This helps emergency responders and your contacts find you quickly.
      </Text>

      {/* Step 4: Adding Emergency Contacts */}
      <Text style={styles.stepTitle}>Step 4: Add Emergency Contacts</Text>
      <Text style={styles.stepDescription}>
        In case of an emergency, you can add important contacts such as family members, friends, and doctors. Ensure their phone numbers and hospital contact information are up to date.
      </Text>

      {/* Step 5: Set Up Account Settings */}
      <Text style={styles.stepTitle}>Step 5: Account Settings</Text>
      <Text style={styles.stepDescription}>
        You can manage your contacts and emergency numbers in the account settings. Make sure to add all necessary contacts.
      </Text>

      {/* Step 6: Summary of Features */}
      <Text style={styles.stepTitle}>Summary</Text>
      <Text style={styles.stepDescription}>
        SeniorReach helps you manage your emergency contacts and quickly send emergency alerts.Once you have set up your profile and contacts, you're all set to start using the app!
      </Text>

      {/* Get Started Button */}
      <Button
        title="Let's Get Started!"
        onPress={() => navigation.navigate('Login')} 
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
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    marginTop: 10,
  },
  description: {
    fontSize: 18,
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
  feature: {
    fontSize: 16,
    marginBottom: 10,
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default GetStartedScreen;