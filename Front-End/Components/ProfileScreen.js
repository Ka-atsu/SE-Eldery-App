import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, Alert, ActivityIndicator, ScrollView } from "react-native";
import { Icon } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../config";

const ProfileScreen = ({ navigation }) => {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@example.com");
  const [profilePic, setProfilePic] = useState(null);  // Null initially to show placeholder
  const [emergencyContact, setEmergencyContact] = useState("No emergency contact set");
  const [isEditing, setIsEditing] = useState(false); // To toggle between edit and view mode
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null); // Store user ID
  const [dummyContacts, setDummyContacts] = useState([]); // State for dummy contacts

  useEffect(() => {
    getUserDetails();
    loadDummyContacts(); // Load dummy contacts when the component mounts
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
  
      // Fetch user data from the backend API
      const response = await axios.get(`${API_URL}/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      const userData = response.data;
      setUserId(userData.id); // Set the user ID
      setName(userData.name);
      setEmail(userData.email);
      setEmergencyContact(userData.emergency_contact || "No emergency contact set");
  
      // Retrieve the profile picture URI from AsyncStorage and set it
      const savedProfilePic = await AsyncStorage.getItem("profilePic");
      setProfilePic(savedProfilePic || userData.profile_pic || null);
  
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
          emergency_contact: emergencyContact, // Send the phone number as is (no formatting)
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
        const imageUri = result.assets[0].uri;
        setProfilePic(imageUri);
  
        // Save the URI to AsyncStorage
        await AsyncStorage.setItem("profilePic", imageUri);
      }
    } catch (error) {
      Alert.alert("Error", "There was a problem opening the image picker.");
    }
  };
  

  const handleLogout = async () => {
    try {
      // Remove the token and user-related data from AsyncStorage
      await AsyncStorage.removeItem("userToken");
      await AsyncStorage.removeItem("emergencyContact");
      await AsyncStorage.removeItem("userId");
      await AsyncStorage.removeItem("profilePic");

      // Clear the dummy contacts when logging out
      setDummyContacts([]);

      // Redirect to the Login screen after logging out
      navigation.navigate("Login");
    } catch (error) {
      console.log("Error clearing AsyncStorage:", error);
      Alert.alert("Error", "An error occurred while logging out.");
    }
  };

  // Load dummy contacts from AsyncStorage when the component mounts
  const loadDummyContacts = async () => {
    try {
      const savedContacts = await AsyncStorage.getItem("dummyContacts");
      if (savedContacts) {
        setDummyContacts(JSON.parse(savedContacts)); // Load contacts into state
      }
    } catch (error) {
      console.log("Error loading dummy contacts from AsyncStorage:", error);
    }
  };

  // Save dummy contacts to AsyncStorage when they change
  useEffect(() => {
    saveDummyContacts(dummyContacts);
  }, [dummyContacts]);

  // Save dummy contacts to AsyncStorage
  const saveDummyContacts = async (contacts) => {
    try {
      await AsyncStorage.setItem("dummyContacts", JSON.stringify(contacts)); // Save updated contacts
    } catch (error) {
      console.log("Error saving dummy contacts to AsyncStorage:", error);
    }
  };

  // Add new dummy contact with separate input fields for name and phone number
  const addDummyContact = () => {
    const newContact = {
      id: Math.random().toString(36).substring(7), // Generate a random ID
      name: "",
      phone: "",
    };
    setDummyContacts([...dummyContacts, newContact]);
  };

  // Handle changes in name or phone number for each dummy contact
  const handleContactChange = (id, field, value) => {
    setDummyContacts(
      dummyContacts.map((contact) =>
        contact.id === id ? { ...contact, [field]: value } : contact
      )
    );
  };

  // Remove a dummy contact
  const removeDummyContact = (id) => {
    setDummyContacts(dummyContacts.filter((contact) => contact.id !== id));
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={35} color="#0056b3" />
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
              <Icon name="person" size={80} color="#fff" />
            </View>
          )}
          <TouchableOpacity style={styles.editButton} onPress={handleEditProfilePic}>
            <Icon name="edit" size={25} color="#fff" />
          </TouchableOpacity>
        </View>

          {/* Profile Information */}
          <Text style={styles.label}>Email</Text>
          <Text style={styles.inputTextNonEditable}>{email || "No email provided"}</Text>

          <Text style={styles.label}>Name</Text>
          {isEditing ? (
            <TextInput style={styles.input} value={name} onChangeText={setName} />
          ) : (
            <Text style={styles.inputText}>{name}</Text>
          )}

          <Text style={styles.label}>Emergency Contacts</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={emergencyContact}
              onChangeText={setEmergencyContact}
              keyboardType="phone-pad"
            />
          ) : (
            <Text style={styles.inputText}>{emergencyContact}</Text>
          )}

          {/* Dummy Contacts Section */}
          {dummyContacts.map((contact) => (
            <View key={contact.id} style={styles.dummyContactContainer}>
              {isEditing ? (
                <TextInput
                  style={styles.dummyContactInput}
                  value={contact.phone}
                  onChangeText={(text) => handleContactChange(contact.id, "phone", text)}
                  placeholder="Phone"
                  keyboardType="phone-pad"
                />
              ) : (
                <Text style={styles.inputText}>{contact.phone}</Text> 
              )}

              {isEditing && (
                <TouchableOpacity onPress={() => removeDummyContact(contact.id)} style={styles.deleteButton}>
                  <Icon name="delete" size={20} color="#dc3545" />
                </TouchableOpacity>
              )}
            </View>
          ))}

          {/* Add Contact Button */}
          {isEditing && (
            <TouchableOpacity style={styles.addContactButton} onPress={addDummyContact}>
              <Text style={styles.buttonText}>Add Contact</Text>
            </TouchableOpacity>
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "flex-start", // Ensure content starts below the fixed profile picture
    alignItems: "center",
    paddingTop: 100,  // Add enough top padding to prevent overlap with profile picture
    padding: 40,
    backgroundColor: "#FFFFFF",
  },
  
  backButton: {
    position: 'absolute',
    top: 40,
    left: 10,
    backgroundColor: 'transparent',
    padding: 10,
  },
  profilePicContainer: {
    position: "relative",
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePic: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
    borderWidth: 3,
    borderColor: "#007bff",
  },
  profilePicPlaceholder: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  editButton: {
    position: "absolute",
    bottom: 5,
    right: 5,
    backgroundColor: "#007bff",
    borderRadius: 20,
    padding: 8,
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginBottom: 8,
    marginTop: 15,
  },
  input: {
    width: "100%",
    height: 45,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 15,
    fontSize: 18,
    marginBottom: 10,
  },
  inputText: {
    width: "100%",
    paddingLeft: 15,
    fontSize: 18,
    marginBottom: 10,
  },
  inputTextNonEditable: {
    alignSelf: "flex-start",
    paddingLeft: 15,
    fontSize: 18,
    color: "#555",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
  saveButton: {
    flex: 1,
    backgroundColor: "#28a745",
    paddingVertical: 15,
    borderRadius: 10,
    marginRight: 10,
    alignItems: "center",
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#dc3545",
    paddingVertical: 15,
    borderRadius: 10,
    marginLeft: 10,
    alignItems: "center",
  },
  editProfileButton: {
    backgroundColor: "#007bff",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 25,
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: "#dc3545",
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  dummyContactContainer: {
    width: "100%",
  },
  dummyContactInput: {
    width: "100%",
    paddingLeft: 15,
    fontSize: 18,
    height: 45,
    marginBottom: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
  },
  deleteButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  addContactButton: {
    backgroundColor: "#007bff",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 15,
  },
});

export default ProfileScreen;