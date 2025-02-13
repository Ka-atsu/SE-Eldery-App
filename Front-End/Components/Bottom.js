import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';

const BottomComponent = ({ navigation, disableButton, isBottomComponentTemporarilyDisabled }) => {

  // This function renders the button with the correct styles applied based on the props
  const renderButton = (iconName, gradientColors, navigateTo, key) => {
    // If the button should be hidden based on the disableButton prop, return null
    if (disableButton === navigateTo) {
      return null; // Hide button if it's disabled
    }

    // Check if the button should be disabled (grayed out) based on the condition
    const isButtonDisabled = 
      (isBottomComponentTemporarilyDisabled && (navigateTo === 'Home' || navigateTo === 'Emergency' || navigateTo === 'Settings' || navigateTo === 'Profile')) || 
      disableButton === navigateTo;

    return (
      <TouchableOpacity
        key={key}
        style={[
          styles.gradientButton,
          isButtonDisabled && styles.disabledButton, // Apply disabled styles
        ]}
        onPress={() => !isButtonDisabled && navigation.navigate(navigateTo)} // Prevent navigation if button is disabled
        activeOpacity={0.8}
        disabled={isButtonDisabled} // Disable interaction if disabled
      >
        <LinearGradient colors={gradientColors} style={styles.gradientBackground}>
          <Icon name={iconName} size={35} color="white" />
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {renderButton('home', ['#6EC1E4', '#1E3A8A'], 'Home', 'home')} {/* Modern blue tones */}
      {renderButton('warning', ['#FF6F61', '#D32F2F'], 'Emergency', 'emergency')} {/* Vibrant orange tones */}
      {renderButton('settings', ['#66BB6A', '#388E3C'], 'Settings', 'settings')} {/* Fresh green tones */}
      {renderButton('account-circle', ['#FFD54F', '#FF7F50'], 'Profile', 'profile')} {/* Bright yellow tones */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly', // Ensure even spacing
    alignItems: 'center',
    width: '100%', // Ensure full width
    position: 'absolute', // Keep it pinned at the bottom
    bottom: 0, // Attach to bottom of screen
    backgroundColor: '#fff', 
    paddingVertical: 10,
    borderTopWidth: 2,
    borderTopColor: '#ddd',
    elevation: 10, // Add some shadow for depth
  },
  gradientButton: {
    width: 75,  // Increased size for easier tapping
    height: 75, // Increased size for easier tapping
    borderRadius: 37.5, // Making the button circular
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 5,
  },
  disabledButton: {
    opacity: 0.5, // Disable opacity when button is inactive
  },
  gradientBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 37.5, // Ensures circular shape
    padding: 12, // Padding to ensure icons are centered
  },
  iconLabel: {
    color: 'white',
    fontSize: 12,
    marginTop: 5,
  },
});

export default BottomComponent;
