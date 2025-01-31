import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

const SettingsScreen = ({ navigation }) => {
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);

  const toggleNotification = () => setIsNotificationEnabled((prev) => !prev);

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={30} color="#007bff" />
      </TouchableOpacity>

      <Text style={styles.title}>Settings</Text>

      {/* Notifications Setting */}
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Enable Notifications</Text>
        <Switch
          value={isNotificationEnabled}
          onValueChange={toggleNotification}
          thumbColor={isNotificationEnabled ? '#28a745' : '#ccc'}
          trackColor={{ false: '#ddd', true: '#28a745' }}
        />
      </View>

      {/* Privacy Policy */}
      <TouchableOpacity style={styles.settingItem} onPress={() => alert('Privacy Policy')}>
        <Text style={styles.settingText}>Privacy Policy</Text>
      </TouchableOpacity>

      {/* About Section */}
      <TouchableOpacity style={styles.settingItem} onPress={() => alert('App Version: 1.0.0')}>
        <Text style={styles.settingText}>About</Text>
      </TouchableOpacity>

      {/* Help Button */}
      <TouchableOpacity style={styles.settingItem} onPress={() => navigation.navigate('Help')}>
        <Text style={styles.settingText}>Help</Text>
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
    marginTop: 60, 
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
});

export default SettingsScreen;