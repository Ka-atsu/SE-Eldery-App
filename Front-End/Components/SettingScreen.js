import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Switch, TouchableOpacity } from 'react-native';

const SettingsScreen = ({ navigation }) => {
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleNotification = () => setIsNotificationEnabled(prev => !prev);
  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      {/* Notifications Setting */}
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Enable Notifications</Text>
        <Switch
          value={isNotificationEnabled}
          onValueChange={toggleNotification}
        />
      </View>

      {/* Dark Mode Setting */}
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Dark Mode</Text>
        <Switch
          value={isDarkMode}
          onValueChange={toggleDarkMode}
        />
      </View>

      {/* Account Management */}
      <TouchableOpacity style={styles.settingItem} onPress={() => alert('Account Settings')}>
        <Text style={styles.settingText}>Account Settings</Text>
      </TouchableOpacity>

      {/* Privacy Policy */}
      <TouchableOpacity style={styles.settingItem} onPress={() => alert('Privacy Policy')}>
        <Text style={styles.settingText}>Privacy Policy</Text>
      </TouchableOpacity>

      {/* About Section */}
      <TouchableOpacity style={styles.settingItem} onPress={() => alert('App Version: 1.0.0')}>
        <Text style={styles.settingText}>About</Text>
      </TouchableOpacity>

      {/* Navigation Button */}
      <Button
        title="Go Back"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: '#f8f9fa',
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  settingText: {
    fontSize: 18,
  },
  pickerWrapper: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    overflow: 'hidden',
  },
  picker: {
    height: 40,
    width: 150,
  },
});

export default SettingsScreen;