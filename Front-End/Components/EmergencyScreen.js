import React from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Text, Icon } from 'react-native-elements';
import BottomComponent from './Bottom';

const { width } = Dimensions.get('window');

const EmergencyScreen = ({ navigation }) => {
    const handleEmergency = () => {
        console.log('Emergency Pressed');
    };

    const renderButton = (title, iconName, backgroundColor, onPress) => (
        <TouchableOpacity
            style={[styles.circleButton, { backgroundColor }]}
            onPress={onPress}
            accessibilityLabel={title}
            accessibilityRole="button"
        >
            <Icon name={iconName} color="white" size={50} />
            <Text style={styles.buttonTitle}>{title}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text h4 style={styles.header}>Emergency Mode</Text>
            <Text style={styles.description}>
                Press the button below for an emergency alert.
            </Text>
            <View style={styles.buttonContainer}>
                {renderButton('Emergency', 'warning', '#FF4500', handleEmergency)}
            </View>
            <BottomComponent navigation={navigation} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        padding: 20,
        marginTop: 20,
    },
    header: {
        marginBottom: 20,
        textAlign: 'center',
        fontSize: 28,
        color: '#333',
    },
    description: {
        textAlign: 'center',
        fontSize: 22,
        color: '#555',
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    circleButton: {
        width: width * 0.6,
        height: width * 0.6,
        borderRadius: (width * 0.6) / 2,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
        marginBottom: 30,
    },
    buttonTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 10,
    },
});

export default EmergencyScreen;