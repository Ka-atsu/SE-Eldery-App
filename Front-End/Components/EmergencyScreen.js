import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, Dimensions } from 'react-native';
import axios from 'axios';
import { Audio } from 'expo-av';
import { Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomComponent from './Bottom';

const { width } = Dimensions.get('window');
const API_URL = 'http://192.168.18.81:8000/api';

const EmergencyScreen = ({ navigation }) => {
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
      setEmergencyContact(userData.emergency_contact || 'No emergency contact set');
    } catch (error) {
      console.log('Error fetching user details:', error);
      Alert.alert('Error', 'Failed to load user data.');
    } finally {
      setLoading(false);
    }
  };

  // Handle button press for sending emergency SMS
  const handleEmergencyPress = async () => {
    console.log('Emergency Pressed');
    playSound();

    if (!emergencyContact || emergencyContact === 'No emergency contact set') {
      Alert.alert('Error', 'No emergency contact found.');
      return;
    }

    let formattedEmergencyContact = emergencyContact.trim();

    if (formattedEmergencyContact.startsWith('0') && formattedEmergencyContact.length === 11) {
      formattedEmergencyContact = '+63' + formattedEmergencyContact.slice(1);
    } else if (!formattedEmergencyContact.startsWith('+63') && formattedEmergencyContact.length === 10) {
      formattedEmergencyContact = '+63' + formattedEmergencyContact;
    }

    formattedEmergencyContact = formattedEmergencyContact.replace(/^(\+63)(\d{3})(\d{3})(\d{4})$/, '$1 $2 $3 $4');

    const phoneRegex = /^\+63 \d{3} \d{3} \d{4}$/;
    if (!phoneRegex.test(formattedEmergencyContact)) {
      Alert.alert('Error', 'Invalid phone number format. Ensure it starts with +63 and is followed by 10 digits with spaces.');
      return;
    }

    const message = 'This is an emergency message from the app. Please take action immediately.';
    const dataToSend = {
      emergency_contact: formattedEmergencyContact,
      message: message,
    };

    try {
      const response = await axios.post(`${API_URL}/send-sms`, dataToSend, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.status === 'success') {
        Alert.alert('Success', 'SMS sent successfully');
      } else {
        Alert.alert('Failure', 'Failed to send SMS');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred while sending SMS. Please check your network or authentication.');
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <View style={styles.container}>
      <Text h4 style={styles.header}>Emergency Mode</Text>
      <Text style={styles.description}>
        Press the button below for an emergency alert.
      </Text>

      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <View style={styles.buttonContainer}>
          {/* Emergency Button with Inner Shadow Effect */}
          <TouchableOpacity
            style={styles.circleButton}
            onPress={handleEmergencyPress}
            accessibilityLabel="Emergency Button"
            accessibilityRole="button"
          >
            {/* Inner Shadow Effect inside the Button */}
            <View style={styles.innerShadow}>
              <Icon name="warning" color="white" size={60} />
              <Text style={styles.buttonTitle}>Emergency</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}

      <BottomComponent navigation={navigation} disableButton={'Emergency'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5F5F5', // Light background for readability
    marginTop: 20,
    paddingHorizontal: 15,
  },
  header: {
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 28, // Slightly smaller for easier reading
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    textAlign: 'center',
    fontSize: 18,
    color: '#555',
    marginBottom: 30, // Extra spacing for better readability
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  circleButton: {
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: (width * 0.8) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF6347', // Soft emergency red
    elevation: 8, // Outer shadow with a more moderate depth
    shadowColor: '#8B0000', // Darker red shadow for outer depth
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    borderWidth: 2,
    borderColor: '#FF4500', // Slightly lighter red for a glossy look
  },
  innerShadow: {
    width: '90%',
    height: '90%',
    borderRadius: (width * 0.8) / 2,
    backgroundColor: '#FF7F50', // A lighter red shade for inner depth
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#D84315', // Inner shadow effect (slightly darker red)
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  buttonTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default EmergencyScreen;