import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';

const SettingsScreen = ({ navigation }) => {
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleNotification = () => setIsNotificationEnabled((prev) => !prev);
  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <Text style={[styles.title, isDarkMode && styles.darkText]}>Settings</Text>

      {/* Notifications Setting */}
      <View style={styles.settingItem}>
        <Text style={[styles.settingText, isDarkMode && styles.darkText]}>Enable Notifications</Text>
        <Switch
          value={isNotificationEnabled}
          onValueChange={toggleNotification}
          thumbColor={isNotificationEnabled ? '#28a745' : '#ccc'}
          trackColor={{ false: '#ddd', true: '#28a745' }}
        />
      </View>

      {/* Account Management */}
      <TouchableOpacity
        style={styles.settingItem}
        onPress={() => alert('Account Settings')}
      >
        <Text style={[styles.settingText, isDarkMode && styles.darkText]}>Account Settings</Text>
      </TouchableOpacity>

      {/* Privacy Policy */}
      <TouchableOpacity
        style={styles.settingItem}
        onPress={() => alert('Privacy Policy')}
      >
        <Text style={[styles.settingText, isDarkMode && styles.darkText]}>Privacy Policy</Text>
      </TouchableOpacity>

      {/* About Section */}
      <TouchableOpacity
        style={styles.settingItem}
        onPress={() => alert('App Version: 1.0.0')}
      >
        <Text style={[styles.settingText, isDarkMode && styles.darkText]}>About</Text>
      </TouchableOpacity>

      {/* Go Back Button */}
      <TouchableOpacity
        style={styles.goBackButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.goBackButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: '#f8f9fa',
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 28, // Larger font size
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  },
  darkText: {
    color: '#fff',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20, // Increased padding for touch targets
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  settingText: {
    fontSize: 20, // Larger font for readability
    fontWeight: '500', // Semi-bold for emphasis
    color: '#333',
  },
  goBackButton: {
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: '#007bff',
  },
  goBackButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default SettingsScreen;