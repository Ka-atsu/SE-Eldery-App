import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, Dimensions } from 'react-native';
import axios from 'axios';
import { Audio } from 'expo-av';
import { Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import BottomComponent from './Bottom';
import { API_URL } from '../config';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [emergencyContact, setEmergencyContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isBottomComponentTemporarilyDisabled, setIsBottomComponentTemporarilyDisabled] = useState(false);

  // Play the emergency alert sound
  const playSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/Notify.mp3')
      );
      await sound.playAsync();
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

  // Using useFocusEffect to reload user details when the screen is focused
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
      setName(userData.name); // Set the user's name
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
      if (isButtonDisabled || isBottomComponentTemporarilyDisabled) return;
      setIsButtonDisabled(true);
      setIsBottomComponentTemporarilyDisabled(true);

      playSound();

      if (!emergencyContact || emergencyContact === 'No emergency contact set') {
        Alert.alert('Error', 'No emergency contact found.');
        setIsButtonDisabled(false);
        setIsBottomComponentTemporarilyDisabled(false);
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
        setIsButtonDisabled(false);
        setIsBottomComponentTemporarilyDisabled(false);
        return;
      }

      const message = `This is a notification from ${name}. I need your help. Please take action immediately.`;

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
        Alert.alert('Error', 'An error occurred while sending SMS.');
      } finally {
        setTimeout(() => {
          setIsButtonDisabled(false); // Re-enable button after delay
          setIsBottomComponentTemporarilyDisabled(false);
        }, 30000); // Disable for 30 seconds
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text h4 style={styles.header}>Notify Mode</Text>
      <Text style={styles.description}>Press the button below to notify someone.</Text>

      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.circleButton,
              { opacity: isButtonDisabled || isBottomComponentTemporarilyDisabled ? 0.6 : 1 }
            ]}
            onPress={() => handlePress('notify')}
            disabled={isButtonDisabled || isBottomComponentTemporarilyDisabled}
            accessibilityLabel="Notify Button"
            accessibilityRole="button"
          >
            <View style={styles.innerShadow}>
              <Icon name="notifications" color="white" size={60} />
              <Text style={styles.buttonTitle}>
                {(isButtonDisabled || isBottomComponentTemporarilyDisabled) ? 'Processing...' : 'Notify Others'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      )}

      <BottomComponent
        navigation={navigation}
        disableButton={'Home'}
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
    backgroundColor: '#F0F4F8', // Soft light background color for a modern feel
  },
  header: {
    marginTop: 30,
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '600',
    color: '#333',
    letterSpacing: 0.5,
  },
  description: {
    textAlign: 'center',
    fontSize: 18,
    color: '#666',
    fontWeight: '300',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 180,
  },
  circleButton: {
    width: width * 0.75,
    height: width * 0.75,
    borderRadius: (width * 0.75) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0077CC', // Modern blue color
    elevation: 10,
    shadowColor: '#1C1C1C', 
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    borderWidth: 2,
    borderColor: '#005fa3',
  },
  innerShadow: {
    width: '85%',
    height: '85%',
    borderRadius: (width * 0.75) / 2,
    backgroundColor: '#005fa3', // Darker shade for inner button
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#003b6b',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  buttonTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
    marginTop: 10,
  },
});

export default HomeScreen;