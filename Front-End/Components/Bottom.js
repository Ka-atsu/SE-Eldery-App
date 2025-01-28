import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';

const BottomComponent = ({ navigation, disableButton }) => {
    const renderButton = (iconName, gradientColors, navigateTo, key) => {
        // Conditionally render the button based on the `disableButton` prop
        if (disableButton === navigateTo) {
            return null; // Do not render the button if it's disabled
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
            {renderButton('account-circle', ['#ffc107', '#ff8f00'], 'Profile', 'profile')} {/* New Profile button */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        paddingVertical: 10,
        backgroundColor: '#f8f9fa',
        borderTopWidth: 1,
        borderTopColor: '#ddd',
    },
    gradientButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 5,
    },
    gradientBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
    },
});

export default BottomComponent;