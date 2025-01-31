import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { Icon } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://192.168.18.81:8000/api"; // Replace with your Laravel API IP

const ProfileScreen = ({ navigation }) => {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@example.com");
  const [profilePic, setProfilePic] = useState(null);  // Null initially to show placeholder
  const [emergencyContact, setEmergencyContact] = useState("No emergency contact set");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null); // Store user ID

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("userToken");

      if (!token) {
        Alert.alert("Error", "User not authenticated. Please log in.");
        navigation.navigate("Login");
        return;
      }

      // Make API call to fetch user details using the token
      const response = await axios.get(`${API_URL}/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const userData = response.data;
      setUserId(userData.id); // Set the user ID
      setName(userData.name);
      setEmail(userData.email);
      setEmergencyContact(userData.emergency_contact || "No emergency contact set");
      setProfilePic(userData.profile_pic || null); // Set the profile picture if available
    } catch (error) {
      console.log("Error fetching user details:", error);
      Alert.alert("Error", "Failed to load user data.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");

      // Send updated name and emergency contact (no formatting needed) to the backend API
      const response = await axios.put(
        `${API_URL}/user/update/${userId}`, // Use the user ID in the URL for updating the correct user
        {
          name,
          emergency_contact: emergencyContact // Send the phone number as is (no formatting)
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      if (response.status === 200) {
        Alert.alert("Success", "Profile updated successfully!");
        setIsEditing(false); // Disable editing after saving
      }
    } catch (error) {
      console.log("Update Error:", error);
      Alert.alert("Error", "Failed to update profile.");
    }
  };  

  const handleEditProfilePic = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (result.assets && result.assets.length > 0) {
        setProfilePic(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert("Error", "There was a problem opening the image picker.");
    }
  };

  const handleLogout = async () => {
    try {
      // Remove the token and user-related data from AsyncStorage
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('emergencyContact');
      await AsyncStorage.removeItem('userId');
  
      // Redirect to the Login screen after logging out
      navigation.navigate('Login');
    } catch (error) {
      console.log('Error clearing AsyncStorage:', error);
      Alert.alert('Error', 'An error occurred while logging out.');
    }
  };  

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={30} color="#007bff" />
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <>
          {/* Profile Picture */}
          <View style={styles.profilePicContainer}>
            {profilePic ? (
              <Image source={{ uri: profilePic }} style={styles.profilePic} />
            ) : (
              <View style={styles.profilePicPlaceholder}>
                <Icon name="person" size={50} color="#fff" />
              </View>
            )}
            <TouchableOpacity style={styles.editButton} onPress={handleEditProfilePic}>
              <Icon name="edit" size={20} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Profile Information */}
          <Text style={styles.label}>Email</Text>
          <Text style={styles.inputTextNonEditable}>{email}</Text> {/* Email is now non-editable */}

          <Text style={styles.label}>Name</Text>
          {isEditing ? (
            <TextInput style={styles.input} value={name} onChangeText={setName} />
          ) : (
            <Text style={styles.inputText}>{name}</Text>
          )}

          <Text style={styles.label}>Emergency Contact</Text>
          {isEditing ? (
            <TextInput style={styles.input} value={emergencyContact} onChangeText={setEmergencyContact} keyboardType="phone-pad" />
          ) : (
            <Text style={styles.inputText}>{emergencyContact}</Text>
          )}

          {/* Buttons */}
          {isEditing ? (
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.buttonText}>Save Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setIsEditing(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity onPress={() => setIsEditing(true)} style={styles.editProfileButton}>
              <Text style={styles.buttonText}>Edit Profile</Text>
            </TouchableOpacity>
          )}
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Text style={styles.logoutButtonText}>Log out</Text>
            </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: 'transparent',
    padding: 10,
  },
  profilePicContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
    borderWidth: 3,
    borderColor: '#007bff',
  },
  profilePicPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  editButton: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#007bff',
    borderRadius: 15,
    padding: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginBottom: 5,
    marginTop: 15,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
  },
  inputText: {
    width: '100%',
    paddingLeft: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#28a745',
    paddingVertical: 12,
    borderRadius: 8,
    marginRight: 10,
    alignItems: 'center',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#dc3545',
    paddingVertical: 12,
    borderRadius: 8,
    marginLeft: 10,
    alignItems: 'center',
  },
  editProfileButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 20,
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: '#dc3545',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  inputTextNonEditable: {
    alignSelf: 'flex-start',
    paddingLeft: 10,
  }
});

export default ProfileScreen;