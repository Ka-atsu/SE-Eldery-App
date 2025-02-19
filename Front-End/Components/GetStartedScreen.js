import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

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

       <View style={styles.imageRow}>
          <Image
            source={require('../assets/gsLogin.png')}  // Image 1
            style={styles.image}
          />
          <Image
            source={require('../assets/gsRegister.png')}  // Image 2 (use different image for Step 2)
            style={styles.image}
          />
        </View>
      

      {/* Step 2: Understanding Key Functionalities */}
      <Text style={styles.stepTitle}>Step 2: Key Features of SeniorReach</Text>
      <Text style={styles.stepDescription}>
        SeniorReach offers key emergency functionalities to ensure your safety:
      </Text>

      <Text style={styles.feature}>• <Text style={styles.bold}>Notify Others</Text>: Send a message to your emergency contact with one click to let them know you need help.</Text>
      <Image
        source={require('../assets/Step1-b.png')}  // Image 1
        style={styles.image}
      />
      <Text style={styles.feature}>• <Text style={styles.bold}>Emergency Button</Text>: A quick emergency button that alerts your contact instantly.</Text>
      <Image
        source={require('../assets/Step2-a.png')}  // Image 1
        style={styles.image}
      />
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
    marginTop:20,
  },
  description: {
    fontSize: 20,  // Larger font size
    textAlign: 'center',
    color: '#333333',
  },
  stepTitle: {
    fontSize: 24,  // Larger font size for section titles
    fontWeight: 'bold',
    marginTop: 30,
    color: '#2C3E50',
  },
  stepDescription: {
    fontSize: 20,  // Larger font size
    marginBottom: 20,
    color: '#333333',
  },
  feature: {
    fontSize: 20,  // Larger font size
    marginBottom: 15,
    color: '#2C3E50',
  },
  bold: {
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    elevation: 5,
  },
  buttonText: {
    fontSize: 24,  // Larger button text
    fontWeight: 'bold',
    color: 'white',
  },
  imageRow: {
    flexDirection: 'row',  // Arranges the images horizontally
    justifyContent: 'space-between',  // Adds space between the images
    marginBottom: 20,  // Adds space below the row of images
  },
  image: {
    width: '48%',  // Adjust the width to fit both images on the same line (space them out a bit)
    height: 300,
    resizeMode: 'contain',  // Ensures the image maintains its aspect ratio
  },
});

export default GetStartedScreen;