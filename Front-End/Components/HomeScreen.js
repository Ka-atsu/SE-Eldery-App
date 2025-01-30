import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, Dimensions } from 'react-native';
import axios from 'axios';
import { Audio } from 'expo-av';
import { Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomComponent from './Bottom';

const { width } = Dimensions.get('window');
const API_URL = 'http://192.168.18.81:8000/api';

const HomeScreen = ({ navigation }) => {
  const [name, setName] = useState(''); // Store the user's name
  const [emergencyContact, setEmergencyContact] = useState(null);
  const [loading, setLoading] = useState(true);

  // Play the emergency alert sound
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

  // Get user details including emergency contact
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
      setName(userData.name);  // Set the user's name
      setEmergencyContact(userData.emergency_contact || 'No emergency contact set');
    } catch (error) {
      console.log('Error fetching user details:', error);
      Alert.alert('Error', 'Failed to load user data.');
    } finally {
      setLoading(false);
    }
  };

  // Handle button press for sending emergency SMS
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
        formattedEmergencyContact = '+63' + formattedEmergencyContact.slice(1);  // Replace leading '0' with '+63'
      } else if (!formattedEmergencyContact.startsWith('+63') && formattedEmergencyContact.length === 10) {
        formattedEmergencyContact = '+63' + formattedEmergencyContact;
      }

      console.log('Formatted Emergency Contact:', formattedEmergencyContact);

      // Insert spaces for formatting the number
      formattedEmergencyContact = formattedEmergencyContact.replace(/^(\+63)(\d{3})(\d{3})(\d{4})$/, '$1 $2 $3 $4');

      console.log('Formatted Emergency Contact with Spaces:', formattedEmergencyContact);

      // Validate the format before sending it
      const phoneRegex = /^\+63 \d{3} \d{3} \d{4}$/;
      if (!phoneRegex.test(formattedEmergencyContact)) {
        Alert.alert('Error', 'Invalid phone number format. Ensure it starts with +63 and is followed by 10 digits with spaces.');
        return;
      }

      // Define the message to be sent, now including the user's name
      const message = `This is an emergency message from ${name}. Please take action immediately.`;

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
        Alert.alert('Error', 'An error occurred while sending SMS.');
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
    backgroundColor: '#F8F8F8', // Soft background color for a calm, non-intrusive look
    marginTop: 20,
    paddingHorizontal: 15,
  },
  header: {
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 28, // Clear, readable font size
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    textAlign: 'center',
    fontSize: 20, // Slightly larger text for better readability
    color: '#666',
    marginBottom: 30, // Extra spacing for better readability
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  circleButton: {
    width: width * 0.8,  // Larger button for easier interaction
    height: width * 0.8,
    borderRadius: (width * 0.8) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4682B4', // Calming blue for a safe emergency tone
    elevation: 8, // Moderate outer shadow
    shadowColor: '#2F4F4F', // Darker shadow for better visibility
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    borderWidth: 2,
    borderColor: '#5F9EA0', // Slightly lighter blue for glossy look
  },
  innerShadow: {
    width: '90%',
    height: '90%',
    borderRadius: (width * 0.8) / 2,
    backgroundColor: '#5A9FD4', // Slightly lighter blue for inner depth
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#1E3F66',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  buttonTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default HomeScreen;