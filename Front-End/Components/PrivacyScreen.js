import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';

const PrivacyScreen = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={35} color="#007bff" />
      </TouchableOpacity>

      {/* Terms and Agreement Section */}
      <View style={styles.termsContainer}>
        <Text style={styles.title}>Privacy Policy</Text>
        <Text style={styles.text}>
          By using Senior Reach, you agree to provide an emergency contact number. This number will be used in case of an emergency to ensure your safety and well-being. Please ensure that the contact number provided is valid and reachable. Your emergency contact will only be used for emergency situations, and we will not share or use it for any other purpose.
        </Text>

        <Text style={styles.text}>
          We prioritize your privacy and the security of your information. Your data, including the emergency contact information, is stored securely and will not be shared with any third parties without your consent, except in emergency situations where it is necessary to ensure your safety. 
        </Text>

        <Text style={styles.text}>
          It is important that you keep your contact information up to date in case of an emergency. Please take the time to review and update your profile regularly to ensure your emergency contact details are correct and accessible.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 40, // Increased padding for a more open layout
    backgroundColor: '#ffffff',
    paddingBottom: 50, // Adjusted bottom padding for proper spacing
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: 'transparent',
    padding: 15,
  },
  termsContainer: {
    marginTop: 60, // Adds space before the terms section
  },
  title: {
    fontSize: 38, // Larger title for better visibility
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
    color: '#0056b3', 
  },
  text: {
    fontSize: 18, // Increased font size for readability
    color: '#555555',
    lineHeight: 28, // Adjusted line height for better clarity
    marginBottom: 20, // Added spacing between paragraphs
  },
});

export default PrivacyScreen;