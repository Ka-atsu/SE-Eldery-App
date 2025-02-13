import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, BackHandler, Button } from 'react-native';
import CheckBox from 'react-native-check-box'; // Import from the community package

const TermsAndAgreementScreen = ({ navigation }) => {
  const [isAgreed, setIsAgreed] = useState(false);

  const handleAgree = () => {
    if (isAgreed) {
      navigation.navigate('GetStarted');
    } else {
      alert('You must agree to the terms and conditions before proceeding.');
    }
  };

  const handleExit = () => {
    BackHandler.exitApp(); 
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Terms and Agreement Content */}
      <Text style={styles.header}>Terms and Agreement</Text>

      <Text style={styles.text}>
        By using Senior Reach, you agree to provide an emergency contact number. This number will be used in case of an emergency to ensure your safety and well-being. Please ensure that the contact number provided is valid and reachable. Your emergency contact will only be used for emergency situations, and we will not share or use it for any other purpose.
      </Text>

      <Text style={styles.text}>
        We prioritize your privacy and the security of your information. Your data, including the emergency contact information, is stored securely and will not be shared with any third parties without your consent, except in emergency situations where it is necessary to ensure your safety. 
      </Text>

      <Text style={styles.text}>
        It is important that you keep your contact information up to date in case of an emergency. Please take the time to review and update your profile regularly to ensure your emergency contact details are correct and accessible.
      </Text>

      <Text style={styles.text}>
        By agreeing to these terms, you acknowledge that you understand the purpose of the emergency contact feature and are willing to provide accurate and current information. We appreciate your trust in us to keep you safe in case of an emergency.
      </Text>

      {/* Checkbox */}
      <View style={styles.checkboxContainer}>
        <CheckBox
          isChecked={isAgreed}
          onClick={() => setIsAgreed(!isAgreed)}
          style={styles.checkbox}
        />
        <Text style={styles.checkboxLabel}>I Agree to the Terms and Agreement</Text>
      </View>

      <TouchableOpacity style={styles.buttonDecline} onPress={handleExit}>
        <Text style={styles.buttonText}>Decline</Text>
      </TouchableOpacity>
      {/* Agree Button */}
      <TouchableOpacity
        style={[styles.button, !isAgreed && styles.disabledButton]}
        onPress={handleAgree}
        disabled={!isAgreed}
      >
        <Text style={styles.buttonText}>Agree and Continue</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 40,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  text: {
    fontSize: 20,
    lineHeight: 28,
    marginBottom: 20,
    color: '#333333',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    marginRight: 15,
  },
  checkboxLabel: {
    fontSize: 18,
    color: '#555',
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
  buttonDecline: {
    backgroundColor: '#FF7F50',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    elevation: 5,
  },
  disabledButton: {
    backgroundColor: '#b0d9b0',
  },
  buttonText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default TermsAndAgreementScreen;