import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('johndoe@example.com');
  const [profilePic, setProfilePic] = useState('https://randomuser.me/api/portraits/men/1.jpg');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode for all fields

  const navigation = useNavigation();

  const handleSave = () => {
    // Logic for saving profile
    console.log('Profile saved:', { name, email, emergencyContact });
    setIsEditing(false); // Exit edit mode after saving
  };

  const handleEditProfilePic = () => {
    // Logic for editing profile picture
    console.log('Edit profile picture');
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={30} color="#007bff" />
      </TouchableOpacity>

      {/* Profile Picture */}
      <View style={styles.profilePicContainer}>
        <Image source={{ uri: profilePic }} style={styles.profilePic} />
        <TouchableOpacity style={styles.editButton} onPress={handleEditProfilePic}>
          <Icon name="edit" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Profile Information */}
      <Text style={styles.label}>Name</Text>
      {isEditing ? (
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
        />
      ) : (
        <Text style={styles.inputText}>{name}</Text>
      )}

      <Text style={styles.label}>Email</Text>
      {isEditing ? (
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      ) : (
        <Text style={styles.inputText}>{email}</Text>
      )}

      {/* Emergency Contact Information */}
      <Text style={styles.label}>Emergency Contact</Text>
      {isEditing ? (
        <TextInput
          style={styles.input}
          value={emergencyContact}
          onChangeText={setEmergencyContact}
          keyboardType="phone-pad"
          placeholder="Enter emergency contact"
        />
      ) : (
        <Text style={styles.inputText}>{emergencyContact || "No emergency contact set"}</Text>
      )}

      {/* Conditional buttons to edit or save the profile */}
      {isEditing ? (
        <>
          <Button title="Save Profile" onPress={handleSave} />
          <View style={styles.buttonSpacing} /> {/* Add spacing here */}
          <Button title="Cancel" onPress={() => setIsEditing(false)} />
        </>
      ) : (
        <TouchableOpacity onPress={() => setIsEditing(true)}>
          <Text style={styles.editText}>Edit Profile</Text>
        </TouchableOpacity>
      )}

      {/* Log out button (optional) */}
      <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.logoutButtonText}>Log out</Text>
      </TouchableOpacity>
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
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
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
    marginBottom: 20,
  },
  inputText: {
    width: '100%',
    height: 40,
    paddingLeft: 10,
    marginBottom: 20,
    lineHeight: 40, // Align text vertically
  },
  editText: {
    color: '#007bff',
    textAlign: 'center',
    marginTop: 10,
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: '#dc3545',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonSpacing: {
    marginVertical: 10, 
  },
});

export default ProfileScreen;