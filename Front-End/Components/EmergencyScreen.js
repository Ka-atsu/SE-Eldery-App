import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, Dimensions } from 'react-native';
import axios from 'axios';
import { Audio } from 'expo-av';
import { Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomComponent from './Bottom';
import { useFocusEffect } from '@react-navigation/native'; // Importing useFocusEffect
import { API_URL } from '../config';
const { width } = Dimensions.get('window');


const EmergencyScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [emergencyContact, setEmergencyContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isBottomComponentTemporarilyDisabled, setIsBottomComponentTemporarilyDisabled] = useState(false);

  // Play the emergency alert sound
  const playSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/EmergencySound.mp3')
      );
      await sound.playAsync();
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

  // Fetch user details when the screen is focused
  useFocusEffect(
    React.useCallback(() => {
      getUserDetails();
    }, [])
  );

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
  
      // Debugging the values:
      console.log('Name:', userData.name);
      console.log('Emergency Contact:', userData.emergency_contact || 'No emergency contact set');
    } catch (error) {
      console.log('Error fetching user details:', error);
      Alert.alert('Error', 'Failed to load user data.');
    } finally {
      setLoading(false);
    }
  };

  const handleEmergencyPress = async () => {
    if (isButtonDisabled) return; // Prevent multiple clicks
    setIsButtonDisabled(true); // Disable button
    setIsBottomComponentTemporarilyDisabled(true); // Temporarily disable bottom component

    console.log('Emergency Pressed');
    playSound();

    if (!emergencyContact || emergencyContact === 'No emergency contact set') {
      Alert.alert('Error', 'No emergency contact found.');
      setIsButtonDisabled(false); // Re-enable button if no contact is found
      setIsBottomComponentTemporarilyDisabled(false); // Re-enable bottom component
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
      setIsButtonDisabled(false); // Re-enable button on error
      setIsBottomComponentTemporarilyDisabled(false); // Re-enable bottom component
      return;
    }

    const message = `This is an emergency message from ${name}. I need your help.`;
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
    } finally {
      setTimeout(() => {
        setIsButtonDisabled(false); // Re-enable button after delay
        setIsBottomComponentTemporarilyDisabled(false); // Re-enable bottom component
      }, 19000); // Disable for 19 seconds
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Emergency Mode</Text>
      <Text style={styles.description}>
        Press the button below for an emergency alert.
      </Text>

      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.circleButton, isButtonDisabled && styles.buttonDisabled]}
            onPress={handleEmergencyPress}
            disabled={isButtonDisabled}
            accessibilityLabel="Emergency Button"
            accessibilityRole="button"
          >
            <View style={styles.innerShadow}>
              <Icon name="warning" color="white" size={60} />
              <Text style={styles.buttonTitle}>
                {isButtonDisabled ? 'Processing...' : 'Emergency'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      )}

      <BottomComponent 
        navigation={navigation} 
        disableButton={'Emergency'} 
        isBottomComponentTemporarilyDisabled={isBottomComponentTemporarilyDisabled} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F0F4F8',
  },
  header: {
    marginTop: 40,
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 32,
    fontWeight: '600',
    color: '#333',
    letterSpacing: 0.5,
  },
  description: {
    textAlign: 'center',
    fontSize: 18,
    color: '#555',
    fontWeight: '300',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',  // Centers the button vertically
    alignItems: 'center',      // Centers the button horizontally
    marginBottom: 180,
  },
  circleButton: {
    width: width * 0.75,
    height: width * 0.75,
    borderRadius: (width * 0.75) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF4C4C', // Emergency Red
    elevation: 10,
    shadowColor: '#B83A3A',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    borderWidth: 2,
    borderColor: '#FF1C1C',
    transition: 'background-color 0.3s ease', // Smooth background change transition
  },
  buttonDisabled: {
    backgroundColor: '#E57373', // Light red when disabled
    opacity: 0.7,
  },
  innerShadow: {
    width: '85%',
    height: '85%',
    borderRadius: (width * 0.75) / 2,
    backgroundColor: '#FF6347',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#D85A5A',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  buttonTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: 'white',
    marginTop: 10,
  },
});

export default EmergencyScreen;