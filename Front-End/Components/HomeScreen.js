import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import { Audio } from 'expo-av';
import { Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomComponent from './Bottom';

const API_URL = 'http://192.168.18.81:8000/api';

const HomeScreen = ({ navigation }) => {
  const [emergencyContact, setEmergencyContact] = useState(null);
  const [loading, setLoading] = useState(true);

  const playSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/notifalert.mp3')
      );
      await sound.playAsync();
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

  const getUserDetails = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('userToken');
      
      if (!token) {
        Alert.alert('Error', 'User not authenticated. Please log in.');
        navigation.navigate('Login');
        return;
      }

      const response = await axios.get(`${API_URL}/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const userData = response.data;
      setEmergencyContact(userData.emergency_contact || 'No emergency contact set');
    } catch (error) {
      console.log('Error fetching user details:', error);
      Alert.alert('Error', 'Failed to load user data.');
    } finally {
      setLoading(false);
    }
  };

  const handlePress = async (type) => {
    if (type === 'notify') {
        console.log('Notify Others Pressed');
        playSound();

        if (!emergencyContact || emergencyContact === 'No emergency contact set') {
            Alert.alert('Error', 'No emergency contact found.');
            return;
        }

        // Clean and format the emergency contact number
        let formattedEmergencyContact = emergencyContact.trim();  // Remove extra spaces

        // If the number starts with '0', prepend '+63' and remove the '0'
        if (formattedEmergencyContact.startsWith('0') && formattedEmergencyContact.length === 11) {
            // If it's in local format (11 digits with leading 0), replace '0' with '+63'
            formattedEmergencyContact = '+63' + formattedEmergencyContact.slice(1);  // Replace leading '0' with '+63'
        } else if (!formattedEmergencyContact.startsWith('+63') && formattedEmergencyContact.length === 10) {
            // If the number is already in international format (10 digits), prepend '+63'
            formattedEmergencyContact = '+63' + formattedEmergencyContact;
        }

        console.log('Formatted Emergency Contact:', formattedEmergencyContact);

        // Insert spaces for formatting the number
        // This format will split the number after the country code, after the first 3 digits, then the next 3, then the final 4 digits.
        formattedEmergencyContact = formattedEmergencyContact.replace(/^(\+63)(\d{3})(\d{3})(\d{4})$/, '$1 $2 $3 $4');

        console.log('Formatted Emergency Contact with Spaces:', formattedEmergencyContact);

        // Validate the format before sending it
        const phoneRegex = /^\+63 \d{3} \d{3} \d{4}$/;  // Validate that it matches '+63 xxx xxx xxxx'
        if (!phoneRegex.test(formattedEmergencyContact)) {
            Alert.alert('Error', 'Invalid phone number format. Ensure it starts with +63 and is followed by 10 digits with spaces.');
            return;
        }

        // Define the message to be sent
        const message = 'This is an emergency message from the app. Please take action immediately.';

        // Prepare the data to send
        const dataToSend = {
            emergency_contact: formattedEmergencyContact,
            message: message,
        };

        // Send SMS to the emergency contact using your backend
        try {
            const response = await axios.post(`${API_URL}/send-sms`, dataToSend, {
                headers: {
                    'Content-Type': 'application/json',  // Explicitly setting Content-Type as JSON
                },
            });

            if (response.data.status === 'success') {
                Alert.alert('Success', 'SMS sent successfully');
            } else {
                Alert.alert('Failure', 'Failed to send SMS');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'An error occurred while sending SMS check your env twilio auth token i removed it just in case');
        }
    }
};

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <View style={styles.container}>
      <Text h4 style={styles.header}>Notify Mode</Text>
      <Text style={styles.description}>Press the button below to notify someone.</Text>

      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.circleButton}
            onPress={() => handlePress('notify')}
            accessibilityLabel="Notify Button"
            accessibilityRole="button"
          >
            <View style={styles.innerShadow}>
              <Icon name="notifications" color="white" size={60} />
              <Text style={styles.buttonTitle}>Notify Others</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}

      <BottomComponent navigation={navigation} disableButton={'Home'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    marginTop: 20,
  },
  header: {
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    textAlign: 'center',
    fontSize: 24,
    color: '#555',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  circleButton: {
    width: 200,
    height: 200,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4682B4', // Blue tone for notification
    elevation: 12, // Outer shadow
    shadowColor: '#2F4F4F', // Darker blue shadow
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    borderWidth: 3,
    borderColor: '#5F9EA0', // Slightly lighter blue for glossy look
  },
  innerShadow: {
    width: '95%',
    height: '95%',
    borderRadius: 100,
    backgroundColor: '#5A9FD4',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#1E3F66',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  buttonTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
  },
});

export default HomeScreen;