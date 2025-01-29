import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

const SettingsScreen = ({ navigation }) => {
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleNotification = () => setIsNotificationEnabled((prev) => !prev);
  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={30} color="#007bff" />
      </TouchableOpacity>

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
      <TouchableOpacity style={styles.settingItem} onPress={() => alert('Account Settings')}>
        <Text style={[styles.settingText, isDarkMode && styles.darkText]}>Account Settings</Text>
      </TouchableOpacity>

      {/* Privacy Policy */}
      <TouchableOpacity style={styles.settingItem} onPress={() => alert('Privacy Policy')}>
        <Text style={[styles.settingText, isDarkMode && styles.darkText]}>Privacy Policy</Text>
      </TouchableOpacity>

      {/* About Section */}
      <TouchableOpacity style={styles.settingItem} onPress={() => alert('App Version: 1.0.0')}>
        <Text style={[styles.settingText, isDarkMode && styles.darkText]}>About</Text>
      </TouchableOpacity>

      {/* Help Button */}
      <TouchableOpacity style={styles.settingItem} onPress={() => navigation.navigate('Help')}>
        <Text style={[styles.settingText, isDarkMode && styles.darkText]}>Help</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  darkContainer: {
    backgroundColor: '#333',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: 'transparent',
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 60, // Ensures title is properly aligned below the back button
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  settingText: {
    fontSize: 18,
  },
  darkText: {
    color: '#ffffff',
  },
});

export default SettingsScreen;