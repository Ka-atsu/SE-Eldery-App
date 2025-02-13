import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';

const PrivacyScreen = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={35} color="#0056b3" />
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
    padding: 40,
    backgroundColor: '#FFFFFF',
    paddingBottom: 30,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 10,
    backgroundColor: 'transparent',
    padding: 10,
  },
  termsContainer: {
    marginTop: 60,
  },
  title: {
    fontSize: 40, // Large font size for title
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#0056b3',
  },
  text: {
    fontSize: 24, // Larger text for readability
    color: '#333',
    lineHeight: 30, // Improved line height for easier reading
    marginBottom: 15 // More space between paragraphs
  },
  confirmButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 40,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 22, // Large font size for the button text
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default PrivacyScreen;