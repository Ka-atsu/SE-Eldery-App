import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';

const BottomComponent = ({ navigation, disableButton }) => {
    const renderButton = (iconName, gradientColors, navigateTo, key) => {
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
                <LinearGradient
                    colors={gradientColors}
                    style={styles.gradientBackground}
                >
                    <Icon name={iconName} size={30} color="white" />
                </LinearGradient>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            {renderButton('home', ['#007bff', '#0056b3'], 'Home', 'home')}
            {renderButton('warning', ['#dc3545', '#b21f2d'], 'Emergency', 'emergency')}
            {renderButton('settings', ['#28a745', '#218838'], 'Settings', 'settings')}
            {renderButton('account-circle', ['#ffc107', '#ff8f00'], 'Profile', 'profile')}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        paddingVertical: 12, 
        backgroundColor: '#ffffff',
        borderTopWidth: 1,
        borderTopColor: '#ddd',
    },
    gradientButton: {
        width: 50, // Adjusted width
        height: 50, // Adjusted height
        borderRadius: 32.5, 
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
        borderRadius: 32.5, 
        padding: 5, 
    },
});

export default BottomComponent;