import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, Icon } from 'react-native-elements';
import BottomComponent from './Bottom';

const HomeScreen = ({ navigation }) => {
    console.log("App executed");

    const handleNotifyPress = () => {
        console.log('Notify Others Pressed');
    };

    const handleEmergencyPress = () => {
        console.log('Emergency Pressed');
    };

    return (
        <View style={styles.container}>
            <Text h4 style={styles.header}>Emergency Alert System</Text>
            <Text style={styles.description}>
                Press the button below to notify someone in case of an emergency.
            </Text>
            <View style={styles.buttonContainer}>
                <Button 
                    title="Notify Others" 
                    onPress={handleNotifyPress} 
                    buttonStyle={styles.circleButton} 
                    titleStyle={styles.buttonTitle} 
                    icon={<Icon name="notifications" color="white" />} // Add an icon for clarity
                />
                <Button 
                    title="Emergency" 
                    onPress={handleEmergencyPress} 
                    buttonStyle={[styles.circleButton, styles.emergencyButton]} 
                    titleStyle={styles.buttonTitle} 
                    icon={<Icon name="warning" color="white" />} // Add an icon for clarity
                />
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
        fontSize: 28, // Larger font size for better readability
        color: '#333', // Darker color for better contrast
    },
    description: {
        marginBottom: 120,
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
        width: 200, 
        height: 200, 
        borderRadius: 125, 
        backgroundColor: '#007bff', 
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
    emergencyButton: {
        backgroundColor: 'red', 
    },
    buttonTitle: {
        fontSize: 24, // Larger font size for button text
        fontWeight: 'bold', 
    },
});

export default HomeScreen;