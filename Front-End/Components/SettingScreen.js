import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

const SettingsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={35} color="#0056b3" />
      </TouchableOpacity>

      <Text style={styles.title}>Settings</Text>

      {/* Privacy Policy */}
      <TouchableOpacity style={styles.settingItem} onPress={() => navigation.navigate('Privacy')}>
        <Text style={styles.settingText}>Privacy Policy</Text>
      </TouchableOpacity>

      {/* About Section */}
      <TouchableOpacity style={styles.settingItem} onPress={() => navigation.navigate('About')}>
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
    padding: 30,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 10,
    backgroundColor: 'transparent',
    padding: 10,
  },
  title: {
    fontSize: 40,  // Slightly larger title for better readability
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 70, 
    color: '#0056b3', 
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,  // Increased padding for better touch targets
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  settingText: {
    fontSize: 22,  // Larger text for readability
    color: '#333',  // Darker text color for better contrast
  },
});

export default SettingsScreen;