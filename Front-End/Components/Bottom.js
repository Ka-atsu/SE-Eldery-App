import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';

const BottomComponent = ({ navigation, disableButton }) => {
    const renderButton = (iconName, gradientColors, navigateTo, key, label) => {
        if (disableButton === navigateTo) {
          return null; // Hide button if it's disabled
        }
      
        return (
          <TouchableOpacity
            key={key}
            style={styles.gradientButton}
            onPress={() => navigation.navigate(navigateTo)}
            activeOpacity={0.8}
          >
            <LinearGradient colors={gradientColors} style={styles.gradientBackground}>
              <Icon name={iconName} size={35} color="white" />
            </LinearGradient>
          </TouchableOpacity>
        );
      };      

    return (
        <View style={styles.container}>
            {renderButton('home', ['#4A90E2', '#6B8DFF'], 'Home', 'home', 'Home')} {/* Softer blue tones */}
            {renderButton('warning', ['#FF7043', '#FF5722'], 'Emergency', 'emergency', 'Emergency')} {/* Warm red tones */}
            {renderButton('settings', ['#66BB6A', '#43A047'], 'Settings', 'settings', 'Settings')} {/* Calming green tones */}
            {renderButton('account-circle', ['#FFD54F', '#FFB300'], 'Profile', 'profile', 'Profile')} {/* Soft yellow tones */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        paddingVertical: 15, 
        borderTopWidth: 1,
        borderTopColor: '#ddd',
    },
    gradientButton: {
        width: 70, // Increased size for easier tapping
        height: 70, // Increased size for easier tapping
        borderRadius: 35, // Making the button circular
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.10,
        shadowRadius: 100,
        elevation: 5,
    },
    gradientBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 35, // Ensures circular shape
        padding: 10, // Adding padding for the icons
    },
    iconLabel: {
        color: 'white',
        fontSize: 12, // Adjust size based on your design
        marginTop: 5, // Optional for spacing the label
    },
});

export default BottomComponent;