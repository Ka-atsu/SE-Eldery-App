import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';

const HelpScreen = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={35} color="#007bff" />
      </TouchableOpacity>

      <Text style={styles.title}>Help</Text>
      <Text style={styles.content}>
        Welcome to the app help page. Here you can find information about how to use the app effectively.
      </Text>

      <Text style={styles.subTitle}>How to Use the App:</Text>
      
      <Text style={styles.content}>
        <Text style={styles.bold}>1. Notify Mode: </Text>In case you want to notify someone, go to the "Notify Mode" screen (the blue button at the bottom) and press the large "Notify" button to send an alert to your emergency contact.
      </Text>

      <Text style={styles.content}>
        <Text style={styles.bold}>2. Emergency Mode: </Text>If there's an emergency, navigate to the "Emergency Mode" screen (the red button at the bottom) and press the large "Emergency" button to send an alert to your emergency contact.
      </Text>

      <Text style={styles.content}>
        <Text style={styles.bold}>3. Edit Profile: </Text>You can edit your profile, including your name and emergency contact, from the "Profile" screen. Simply tap (the yellow button) on the home screen or emergency screen to access your profile.
      </Text>

      <Text style={styles.content}>
        <Text style={styles.bold}>4. Logout: </Text>To log out, go to your profile screen and tap the "Log out" button.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 40, // Increased padding for a more open layout
    backgroundColor: '#ffffff',
    paddingBottom: 50,  
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: 'transparent',
    padding: 15,
  },
  title: {
    fontSize: 38, // Larger title for better visibility
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
    marginTop: 60,
    color: '#0056b3',  // Contrasting color for clarity
  },
  subTitle: {
    fontSize: 30, // Slightly larger subtitle
    fontWeight: 'bold',
    marginTop: 30,
    textAlign: 'left',
    color: '#333',
  },
  content: {
    fontSize: 24, // Larger font size for better readability
    lineHeight: 36, // Increase line height for better text clarity
    marginBottom: 30, // Increased margin for better spacing
    textAlign: 'left',
    color: '#333',
  },
  bold: {
    fontWeight: 'bold',
    color: '#007bff',
  },
});

export default HelpScreen;